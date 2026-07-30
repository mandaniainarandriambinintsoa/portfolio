import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_MESSAGE = 5000;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, locale, website } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    locale?: unknown;
    website?: unknown;
  };

  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();
  const cleanLocale = locale === "en" ? "en" : "fr";
  const cleanEmailLower = cleanEmail.toLowerCase();

  if (cleanName.length === 0 || cleanName.length > MAX_NAME) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (cleanMessage.length === 0 || cleanMessage.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const payload = {
    name: cleanName,
    email: cleanEmailLower,
    message: cleanMessage,
    locale: cleanLocale,
    source: "portfolio-contact-form",
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
    referer: request.headers.get("referer") ?? "",
    crmLeadId: "",
    crmActivityId: "",
    firstName: "",
    lastName: "",
    crmCreatedAt: "",
    crmUpdatedAt: "",
    status: "new",
    leadScore: 0,
    replyStatus: "not_contacted",
  };

  const supabase = createAdminClient();
  const nameParts = cleanName.split(/\s+/);
  const firstName = nameParts.shift() ?? cleanName;
  const lastName = nameParts.join(" ");

  try {
    const { data: existingLead, error: lookupError } = await supabase
      .from("crm_leads")
      .select("id")
      .eq("email", cleanEmailLower)
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    const leadResult = existingLead
      ? await supabase
          .from("crm_leads")
          .update({
            first_name: firstName,
            last_name: lastName,
            locale: cleanLocale,
            message: cleanMessage,
            source: "portfolio-contact-form",
            metadata: {
              referer: payload.referer,
              user_agent: payload.userAgent,
              submitted_at: payload.submittedAt,
            },
          })
          .eq("id", existingLead.id)
          .select("id, created_at, updated_at, status, lead_score, reply_status")
          .single()
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
            metadata: {
              referer: payload.referer,
              user_agent: payload.userAgent,
              submitted_at: payload.submittedAt,
            },
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
          locale: cleanLocale,
          referer: payload.referer,
          submitted_at: payload.submittedAt,
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
    payload.crmCreatedAt = leadResult.data.created_at;
    payload.crmUpdatedAt = leadResult.data.updated_at;
    payload.status = leadResult.data.status;
    payload.leadScore = leadResult.data.lead_score;
    payload.replyStatus = leadResult.data.reply_status;
  } catch (error) {
    console.error("Failed to save contact in CRM", error);
    return NextResponse.json(
      { error: "Failed to save contact" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`n8n returned ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to forward contact to n8n", error);
    return NextResponse.json(
      { error: "Forwarding failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
