import { NextRequest, NextResponse } from "next/server";

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
    email: cleanEmail,
    message: cleanMessage,
    locale: cleanLocale,
    source: "portfolio-contact-form",
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
    referer: request.headers.get("referer") ?? "",
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Forwarding failed" },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Forwarding failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
