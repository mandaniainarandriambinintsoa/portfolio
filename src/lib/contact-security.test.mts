import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTACT_LIMITS,
  cleanRequestMetadata,
  escapeHtmlText,
  getClientHash,
  isSameSiteRequest,
  validateContactSubmission,
} from "./contact-security.ts";

const now = 1_800_000_000_000;

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Manda R.",
    email: "manda+contact@example.com",
    message: "Bonjour,\nJ'ai un projet d'automatisation.",
    website: "",
    locale: "fr",
    formStartedAt: now - 5_000,
    turnstileToken: "token",
    ...overrides,
  };
}

test("normalizes a valid contact submission", () => {
  const result = validateContactSubmission(
    validBody({ email: "  Manda+Contact@Example.COM  ", locale: "en" }),
    now,
  );

  assert.equal(result.kind, "valid");
  if (result.kind === "valid") {
    assert.equal(result.value.email, "manda+contact@example.com");
    assert.equal(result.value.locale, "en");
  }
});

test("rejects HTML injection in every free-text field", () => {
  const payloads = [
    validBody({ name: "<img src=x onerror=alert(1)>" }),
    validBody({ message: "<script>alert('xss')</script>" }),
  ];

  for (const payload of payloads) {
    assert.equal(validateContactSubmission(payload, now).kind, "invalid");
  }
});

test("rejects header injection and malformed email addresses", () => {
  assert.equal(
    validateContactSubmission(validBody({ name: "Manda\r\nBcc: attacker@example.com" }), now).kind,
    "invalid",
  );
  assert.equal(
    validateContactSubmission(validBody({ email: "victim@example.com\r\nBcc:attacker@example.com" }), now).kind,
    "invalid",
  );
});

test("rejects submissions that are implausibly fast, stale, or oversized", () => {
  assert.equal(
    validateContactSubmission(validBody({ formStartedAt: now }), now).kind,
    "invalid",
  );
  assert.equal(
    validateContactSubmission(
      validBody({ formStartedAt: now - CONTACT_LIMITS.maxFormAgeMs - 1 }),
      now,
    ).kind,
    "invalid",
  );
  assert.equal(
    validateContactSubmission(
      validBody({ message: "a".repeat(CONTACT_LIMITS.maxMessageLength + 1) }),
      now,
    ).kind,
    "invalid",
  );
});

test("silently accepts the honeypot branch without processing", () => {
  assert.equal(
    validateContactSubmission(validBody({ website: "https://spam.example" }), now).kind,
    "honeypot",
  );
});

test("encodes untrusted text before it reaches an HTML email template", () => {
  assert.equal(
    escapeHtmlText(`<script data-x="1">alert('x')</script> &`),
    "&lt;script data-x=&quot;1&quot;&gt;alert(&#x27;x&#x27;)&lt;/script&gt; &amp;",
  );
});

test("cleans request metadata and creates stable opaque client hashes", () => {
  assert.equal(cleanRequestMetadata(" agent\r\nvalue "), "agent  value");
  assert.equal(getClientHash("203.0.113.1", "agent-a", "secret"), getClientHash("203.0.113.1", "agent-b", "secret"));
  assert.notEqual(getClientHash("203.0.113.1", "agent", "secret"), getClientHash("203.0.113.2", "agent", "secret"));
});

test("rejects cross-site browser requests", () => {
  const sameSite = new Request("https://manda-ia.com/api/contact", {
    headers: { origin: "https://manda-ia.com", "sec-fetch-site": "same-origin" },
  });
  const crossSite = new Request("https://manda-ia.com/api/contact", {
    headers: { origin: "https://evil.example", "sec-fetch-site": "cross-site" },
  });

  assert.equal(isSameSiteRequest(sameSite), true);
  assert.equal(isSameSiteRequest(crossSite), false);
});
