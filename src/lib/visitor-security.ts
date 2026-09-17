import { createHmac } from "node:crypto";

export const VISITOR_DEDUPE_WINDOW_MS = 30 * 60 * 1_000;

export function getVisitorHash(
  ipAddress: string,
  userAgent: string,
  secret: string,
): string {
  const normalizedIp = ipAddress.trim() || "unknown";
  const normalizedAgent = userAgent.trim().slice(0, 500) || "unknown";

  return createHmac("sha256", secret)
    .update(`${normalizedIp}|${normalizedAgent}`)
    .digest("hex");
}

export function getVisitorDedupeBucket(now = Date.now()): string {
  const bucketStart = Math.floor(now / VISITOR_DEDUPE_WINDOW_MS) * VISITOR_DEDUPE_WINDOW_MS;
  return new Date(bucketStart).toISOString();
}
