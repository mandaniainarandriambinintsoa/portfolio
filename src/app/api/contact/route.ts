import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  CONTACT_LIMITS,
  cleanRequestMetadata,
  escapeHtmlText,
  getClientHash,
  getClientIp,
  isSameSiteRequest,
  validateContactSubmission,
  verifyTurnstileToken,
} from "@/lib/contact-security";

const MAX_SUBMISSIONS_PER_CLIENT_PER_HOUR = 5;
const MAX_SUBMISSIONS_PER_EMAIL_PER_HOUR = 3;

function jsonResponse(
  data: { success?: boolean; error?: string },
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export async function POST(request: NextRequest) {
  if (!isSameSiteRequest(request)) {
    return jsonResponse({ error: "Request rejected" }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "Unsupported content type" }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (
    Number.isFinite(contentLength) &&
    contentLength > CONTACT_LIMITS.maxBodyBytes
  ) {
    return jsonResponse({ error: "Request too large" }, 413);
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > CONTACT_LIMITS.maxBodyBytes) {
      return jsonResponse({ error: "Request too large" }, 413);
    }
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return jsonResponse({ error: "Invalid request" }, 400);
  }

  const validation = validateContactSubmission(body);
  if (validation.kind === "honeypot") {
    return jsonResponse({ success: true }, 200);
  }
  if (validation.kind === "invalid") {
    return jsonResponse({ error: "Invalid form submission" }, 400);
  }

  const {
    name: cleanName,
    email: cleanEmailLower,
    message: cleanMessage,
    locale: cleanLocale,
    turnstileToken,
    formStartedAt,
  } = validation.value;

  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return jsonResponse({ error: "Service unavailable" }, 503);
  }

  const userAgent = cleanRequestMetadata(request.headers.get("user-agent"));
  const referer = cleanRequestMetadata(request.headers.get("referer"));
  const clientIp = getClientIp(request.headers);
  const hashSecret =
    process.env.CONTACT_RATE_LIMIT_SECRET ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!hashSecret) {
    console.error("Contact rate-limit secret is not configured");
    return jsonResponse({ error: "Service unavailable" }, 503);
  }

  const turnstileValid = await verifyTurnstileToken({
    token: turnstileToken,
    remoteIp: clientIp,
    secret: process.env.TURNSTILE_SECRET_KEY,
  });
  if (!turnstileValid) {
    return jsonResponse({ error: "Security verification failed" }, 400);
  }

  const clientHash = getClientHash(clientIp, userAgent, hashSecret);
  const submittedAt = new Date().toISOString();
  const submissionMetadata = {
    referer,
    user_agent: userAgent,
    submitted_at: submittedAt,
    client_hash: clientHash,
    form_age_ms: Date.now() - formStartedAt,
  };

  const supabase = createAdminClient();
  const rateLimitStart = new Date(Date.now() - 60 * 60 * 1_000).toISOString();

  const [clientRateResult, emailRateResult] = await Promise.all([
    supabase
      .from("crm_activities")
      .select("id", { count: "exact", head: true })
      .gte("occurred_at", rateLimitStart)
      .contains("metadata", { client_hash: clientHash }),
    supabase
      .from("crm_activities")
      .select("id", { count: "exact", head: true })
      .eq("email", cleanEmailLower)
      .gte("occurred_at", rateLimitStart),
  ]);

  if (clientRateResult.error || emailRateResult.error) {
    console.error(
      "Failed to check contact rate limit",
      clientRateResult.error ?? emailRateResult.error,
    );
    return jsonResponse({ error: "Service unavailable" }, 503);
  }

  if (
    (clientRateResult.count ?? 0) >= MAX_SUBMISSIONS_PER_CLIENT_PER_HOUR ||
    (emailRateResult.count ?? 0) >= MAX_SUBMISSIONS_PER_EMAIL_PER_HOUR
  ) {
    return jsonResponse(
      { error: "Too many submissions" },
      429,
      { "Retry-After": "3600" },
    );
  }

  const payload = {
    name: cleanName,
    email: cleanEmailLower,
    message: cleanMessage,
    locale: cleanLocale,
    source: "portfolio-contact-form",
    submittedAt,
    userAgent,
    referer,
    crmLeadId: "",
    crmActivityId: "",
    firstName: "",
    lastName: "",
    crmCreatedAt: "",
    crmUpdatedAt: "",
    status: "new",
    leadScore: 0,
    replyStatus: "not_contacted",
    htmlSafe: {
      name: escapeHtmlText(cleanName),
      email: escapeHtmlText(cleanEmailLower),
      message: escapeHtmlText(cleanMessage),
      userAgent: escapeHtmlText(userAgent),
      referer: escapeHtmlText(referer),
      firstName: "",
      lastName: "",
    },
  };

  const nameParts = cleanName.split(/\s+/);
  const firstName = nameParts.shift() ?? cleanName;
  const lastName = nameParts.join(" ");

  try {
    const { data: existingLead, error: lookupError } = await supabase
      .from("crm_leads")
      .select("id, created_at, updated_at, status, lead_score, reply_status")
      .eq("email", cleanEmailLower)
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    const leadResult = existingLead
      ? { data: existingLead, error: null }
      : await supabase
          .from("crm_leads")
          .insert({
            email: cleanEmailLower,
            first_name: firstName,
            last_name: lastName,
            locale: cleanLocale,
            message: cleanMessage,
            source: "portfolio-contact-form",
            status: "new",
            reply_status: "not_contacted",
            metadata: submissionMetadata,
          })
          .select("id, created_at, updated_at, status, lead_score, reply_status")
          .single();

    if (leadResult.error || !leadResult.data) {
      throw leadResult.error ?? new Error("Lead was not saved");
    }

    const { data: activity, error: activityError } = await supabase
      .from("crm_activities")
      .insert({
        lead_id: leadResult.data.id,
        email: cleanEmailLower,
        activity_type: "form_submission",
        channel: "website",
        direction: "inbound",
        subject: "Portfolio contact form",
        content: cleanMessage,
        metadata: {
          ...submissionMetadata,
          locale: cleanLocale,
        },
      })
      .select("id")
      .single();

    if (activityError || !activity) {
      throw activityError ?? new Error("Activity was not saved");
    }

    payload.crmLeadId = leadResult.data.id;
    payload.crmActivityId = activity.id;
    payload.firstName = firstName;
    payload.lastName = lastName;
    payload.htmlSafe.firstName = escapeHtmlText(firstName);
    payload.htmlSafe.lastName = escapeHtmlText(lastName);
    payload.crmCreatedAt = leadResult.data.created_at;
    payload.crmUpdatedAt = leadResult.data.updated_at;
    payload.status = leadResult.data.status;
    payload.leadScore = leadResult.data.lead_score;
    payload.replyStatus = leadResult.data.reply_status;
  } catch (error) {
    console.error("Failed to save contact in CRM", error);
    return jsonResponse({ error: "Failed to save contact" }, 500);
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      throw new Error(`n8n returned ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to forward contact to n8n", error);
    return jsonResponse({ error: "Forwarding failed" }, 502);
  }

  return jsonResponse({ success: true }, 201);
}
