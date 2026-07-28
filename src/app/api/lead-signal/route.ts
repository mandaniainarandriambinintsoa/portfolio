import { NextRequest, NextResponse } from "next/server";

type SignalBody = {
  event?: unknown;
  locale?: unknown;
  path?: unknown;
  referrer?: unknown;
  action?: unknown;
  area?: unknown;
  label?: unknown;
};

const SESSION_COOKIE = "manda_visitor_session_notified";
const BOT_USER_AGENT =
  /bot|crawler|spider|slurp|facebookexternalhit|linkedinbot|whatsapp|headless|lighthouse/i;

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

  if (event === "session_started" && request.cookies.has(SESSION_COOKIE)) {
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
    event,
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

  const response = NextResponse.json({ success: true }, { status: 202 });
  if (event === "session_started") {
    response.cookies.set(SESSION_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  return response;
}
