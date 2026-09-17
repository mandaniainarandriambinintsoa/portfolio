import assert from "node:assert/strict";
import test from "node:test";
import {
  VISITOR_DEDUPE_WINDOW_MS,
  getVisitorDedupeBucket,
  getVisitorHash,
} from "./visitor-security.ts";
import { validateVisitorDatabaseUrl } from "./visitor-database.ts";

test("creates a stable opaque visitor hash without exposing the IP address", () => {
  const ip = "203.0.113.42";
  const hash = getVisitorHash(ip, "Mozilla/5.0", "a-long-random-secret");

  assert.match(hash, /^[a-f0-9]{64}$/);
  assert.equal(hash.includes(ip), false);
  assert.equal(hash, getVisitorHash(ip, "Mozilla/5.0", "a-long-random-secret"));
  assert.notEqual(hash, getVisitorHash(ip, "Another agent", "a-long-random-secret"));
  assert.notEqual(hash, getVisitorHash(ip, "Mozilla/5.0", "another-secret"));
});

test("groups repeated visits into deterministic thirty-minute buckets", () => {
  const start = Date.UTC(2026, 8, 16, 12, 0, 0);

  assert.equal(getVisitorDedupeBucket(start + 1), new Date(start).toISOString());
  assert.equal(
    getVisitorDedupeBucket(start + VISITOR_DEDUPE_WINDOW_MS - 1),
    new Date(start).toISOString(),
  );
  assert.equal(
    getVisitorDedupeBucket(start + VISITOR_DEDUPE_WINDOW_MS),
    new Date(start + VISITOR_DEDUPE_WINDOW_MS).toISOString(),
  );
});

test("accepts only TLS-protected Neon connections for visitor data", () => {
  const neonUrl =
    "postgresql://portfolio_owner:secret@ep-example-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require";

  assert.equal(validateVisitorDatabaseUrl(neonUrl), neonUrl);
  assert.throws(() => validateVisitorDatabaseUrl(undefined), /not configured/);
  assert.throws(
    () =>
      validateVisitorDatabaseUrl(
        "postgresql://postgres:secret@db.example.supabase.co/postgres?sslmode=require",
      ),
    /dedicated Neon database/,
  );
  assert.throws(
    () =>
      validateVisitorDatabaseUrl(
        "postgresql://portfolio_owner:secret@ep-example.neon.tech/neondb?sslmode=disable",
      ),
    /require TLS/,
  );
});
