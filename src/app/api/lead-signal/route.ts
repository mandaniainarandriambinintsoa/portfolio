import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

type SignalBody = {
  event?: unknown;
  locale?: unknown;
  path?: unknown;
  referrer?: unknown;
  action?: unknown;
  area?: unknown;
  label?: unknown;
};

type LeadSignalEvent = "session_started" | "high_intent";

const SESSION_COOKIE = "manda_visitor_session_notified";
const BOT_USER_AGENT =
  /bot|crawler|spider|slurp|facebookexternalhit|linkedinbot|whatsapp|headless|lighthouse/i;
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function decodeHeader(value: string | null): string {
  if (!value) return "";

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getCountryName(countryCode: string, locale: string): string {
  if (!countryCode) return "";

  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(countryCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}

function isSameOriginRequest(request: NextRequest): boolean {
  if (request.headers.get("x-manda-signal") !== "portfolio") return false;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "same-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    ""
  );
}

function getDistinctId(request: NextRequest): string {
  const visitorSeed = [
    getClientIp(request),
    request.headers.get("user-agent") ?? "",
    request.headers.get("x-vercel-ip-country") ?? "",
  ].join("|");

  return `server:${createHash("sha256").update(visitorSeed).digest("hex").slice(0, 32)}`;
}

async function mirrorVisitorToSupabase(payload: {
  event: LeadSignalEvent;
  city: string;
  country: string;
  country_code: string;
}, request: NextRequest) {
  if (payload.event !== "session_started") return;

  try {
    const supabase = createAdminClient();
    const ip = getClientIp(request);
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();

    let existingQuery = supabase
      .from("visitor_logs")
      .select("id")
      .gte("created_at", thirtyMinAgo)
      .limit(1);

    if (ip) {
      existingQuery = existingQuery.eq("ip", ip);
    } else {
      existingQuery = existingQuery.eq("city", payload.city).eq("country", payload.country);
    }

    const { data: existing } = await existingQuery;
    if (existing && existing.length > 0) return;

    await supabase.from("visitor_logs").insert({
      city: payload.city,
      country: payload.country,
      country_code: payload.country_code,
      ip: ip || null,
    });
  } catch (error) {
    console.error("Lead signal Supabase mirror failed", error);
  }
}

async function mirrorSignalToPostHog(
  payload: Record<string, string>,
  request: NextRequest
) {
  if (!posthogKey) return;

  try {
    const response = await fetch(`${posthogHost.replace(/\/$/, "")}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: posthogKey,
        event: payload.event,
        distinct_id: getDistinctId(request),
        properties: {
          ...payload,
          app_surface: "portfolio",
          capture_source: "server_lead_signal",
          $ip: getClientIp(request) || undefined,
          $current_url: payload.path,
          $referrer: payload.referrer,
          user_agent: request.headers.get("user-agent") ?? "",
        },
        timestamp: payload.timestamp,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Lead signal PostHog mirror failed", response.status);
    }
  } catch (error) {
    console.error("Lead signal PostHog mirror failed", error);
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  if (BOT_USER_AGENT.test(userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

  let body: SignalBody;
  try {
    body = (await request.json()) as SignalBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = body.event;
  if (event !== "session_started" && event !== "high_intent") {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }
  const signalEvent: LeadSignalEvent = event;

  if (signalEvent === "session_started" && request.cookies.has(SESSION_COOKIE)) {
    return new NextResponse(null, { status: 204 });
  }

  const locale = body.locale === "en" ? "en" : "fr";
  const countryCode = cleanText(request.headers.get("x-vercel-ip-country"), 2).toUpperCase();
  const city = decodeHeader(request.headers.get("x-vercel-ip-city")).slice(0, 120);
  const region = decodeHeader(request.headers.get("x-vercel-ip-country-region")).slice(0, 120);
  const webhookUrl = process.env.N8N_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const payload = {
    event: signalEvent,
    source: "portfolio",
    timestamp: new Date().toISOString(),
    locale,
    path: cleanText(body.path, 500),
    referrer: cleanText(body.referrer, 500),
    action: cleanText(body.action, 100),
    area: cleanText(body.area, 100),
    label: cleanText(body.label, 160),
    city: city || "Unknown",
    region,
    country: getCountryName(countryCode, locale) || "Unknown",
    country_code: countryCode,
  };

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "webhook-visitor-header": "n8nvisitor",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      console.error("Lead signal webhook failed", webhookResponse.status);
      return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Lead signal webhook failed", error);
    return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
  }

  await Promise.all([
    mirrorVisitorToSupabase(payload, request),
    mirrorSignalToPostHog(payload, request),
  ]);

  const response = NextResponse.json({ success: true }, { status: 202 });
  if (signalEvent === "session_started") {
    response.cookies.set(SESSION_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  return response;
}
