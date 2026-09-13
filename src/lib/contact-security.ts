import { createHmac, randomUUID } from "node:crypto";

export const CONTACT_LIMITS = {
  maxBodyBytes: 16_384,
  maxEmailLength: 254,
  maxNameLength: 100,
  maxMessageLength: 5_000,
  minFormAgeMs: 800,
  maxFormAgeMs: 2 * 60 * 60 * 1_000,
  maxTurnstileTokenLength: 2_048,
} as const;

const EMAIL_RE = /^[a-z0-9.!#$%*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/iu;
const CONTROL_CHARACTER_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u;
const NAME_CONTROL_CHARACTER_RE = /[\u0000-\u001F\u007F]/u;
const HTML_DELIMITER_RE = /[<>]/u;

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  locale: "fr" | "en";
  turnstileToken: string;
  formStartedAt: number;
};

export type ContactSubmissionResult =
  | { kind: "valid"; value: ContactSubmission }
  | { kind: "honeypot" }
  | { kind: "invalid" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateContactSubmission(
  body: unknown,
  now = Date.now(),
): ContactSubmissionResult {
  if (!isRecord(body)) return { kind: "invalid" };

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return { kind: "honeypot" };
  }

  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    typeof body.formStartedAt !== "number" ||
    !Number.isFinite(body.formStartedAt)
  ) {
    return { kind: "invalid" };
  }

  const name = body.name.trim().normalize("NFC");
  const email = body.email.trim().toLowerCase();
  const message = body.message.trim().replace(/\r\n?/gu, "\n").normalize("NFC");
  const formAgeMs = now - body.formStartedAt;
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";

  if (
    name.length === 0 ||
    name.length > CONTACT_LIMITS.maxNameLength ||
    NAME_CONTROL_CHARACTER_RE.test(name) ||
    HTML_DELIMITER_RE.test(name)
  ) {
    return { kind: "invalid" };
  }

  if (
    email.length === 0 ||
    email.length > CONTACT_LIMITS.maxEmailLength ||
    !EMAIL_RE.test(email)
  ) {
    return { kind: "invalid" };
  }

  if (
    message.length === 0 ||
    message.length > CONTACT_LIMITS.maxMessageLength ||
    CONTROL_CHARACTER_RE.test(message) ||
    HTML_DELIMITER_RE.test(message)
  ) {
    return { kind: "invalid" };
  }

  if (
    formAgeMs < CONTACT_LIMITS.minFormAgeMs ||
    formAgeMs > CONTACT_LIMITS.maxFormAgeMs
  ) {
    return { kind: "invalid" };
  }

  if (turnstileToken.length > CONTACT_LIMITS.maxTurnstileTokenLength) {
    return { kind: "invalid" };
  }

  return {
    kind: "valid",
    value: {
      name,
      email,
      message,
      locale: body.locale === "en" ? "en" : "fr",
      turnstileToken,
      formStartedAt: body.formStartedAt,
    },
  };
}

export function escapeHtmlText(value: string): string {
  return value.replace(/[&<>"']/gu, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#x27;";
    }
  });
}

export function cleanRequestMetadata(value: string | null, maxLength = 512): string {
  return (value ?? "")
    .replace(/[\u0000-\u001F\u007F]/gu, " ")
    .trim()
    .slice(0, maxLength);
}

export function getClientIp(headers: Headers): string {
  return cleanRequestMetadata(
    headers.get("x-vercel-forwarded-for") ??
      headers.get("x-forwarded-for")?.split(",")[0] ??
      headers.get("x-real-ip"),
    64,
  );
}

export function getClientHash(ip: string, userAgent: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(ip || `unknown-ip\n${userAgent}`)
    .digest("hex");
}

export function isSameSiteRequest(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function verifyTurnstileToken({
  token,
  remoteIp,
  secret,
}: {
  token: string;
  remoteIp: string;
  secret: string | undefined;
}): Promise<boolean> {
  if (!secret) return true;
  if (!token) return false;

  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", token);
  formData.set("idempotency_key", randomUUID());
  if (remoteIp) formData.set("remoteip", remoteIp);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      },
    );
    if (!response.ok) return false;

    const result: unknown = await response.json();
    return isRecord(result) && result.success === true;
  } catch {
    return false;
  }
}
