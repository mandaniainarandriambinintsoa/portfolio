import { neon } from "@neondatabase/serverless";
import { unstable_cache } from "next/cache";
import type { VisitorRow } from "@/lib/visitor-data";
import { validateVisitorDatabaseUrl } from "@/lib/visitor-database";

const QUERY_TIMEOUT_MS = 4_000;
const MAX_FEED_ROWS = 6;
export const VISITOR_FEED_CACHE_TAG = "visitor-feed";

type NewVisitor = {
  city: string;
  country: string;
  countryCode: string;
  visitorHash: string;
  dedupeBucket: string;
};

function getVisitorDatabaseUrl(): string {
  return validateVisitorDatabaseUrl(process.env.VISITOR_DATABASE_URL);
}

function createVisitorSql() {
  return neon(getVisitorDatabaseUrl());
}

function parseVisitorRow(value: unknown): VisitorRow | null {
  if (!value || typeof value !== "object") return null;

  const row = value as Record<string, unknown>;
  if (
    typeof row.city !== "string" ||
    typeof row.country !== "string" ||
    typeof row.country_code !== "string"
  ) {
    return null;
  }

  const createdAt = row.created_at instanceof Date
    ? row.created_at.toISOString()
    : typeof row.created_at === "string"
      ? row.created_at
      : null;

  if (!createdAt) return null;

  return {
    city: row.city,
    country: row.country,
    country_code: row.country_code,
    created_at: createdAt,
  };
}

async function queryLatestVisitors(): Promise<VisitorRow[]> {
  const sql = createVisitorSql();
  const result: unknown = await sql.query(
    `select city, country, country_code, created_at
       from public.visitor_logs
      order by created_at desc
      limit $1`,
    [MAX_FEED_ROWS],
    { fetchOptions: { signal: AbortSignal.timeout(QUERY_TIMEOUT_MS) } },
  );

  if (!Array.isArray(result)) {
    throw new Error("Visitor database returned an invalid result");
  }

  return result.flatMap((row) => {
    const visitor = parseVisitorRow(row);
    return visitor ? [visitor] : [];
  });
}

// Keep database reads behind Next.js' persistent Data Cache. This cache key is
// independent of the request URL, so cache-busting query strings cannot force
// repeated Neon queries. Successful visitor inserts invalidate the tag.
export const getLatestVisitors = unstable_cache(
  queryLatestVisitors,
  ["visitor-feed-v1"],
  {
    tags: [VISITOR_FEED_CACHE_TAG],
    revalidate: 15 * 60,
  },
);

export async function insertVisitor(visitor: NewVisitor): Promise<boolean> {
  const sql = createVisitorSql();
  const result: unknown = await sql.query(
    `insert into public.visitor_logs (
       city,
       country,
       country_code,
       visitor_hash,
       dedupe_bucket
     ) values ($1, $2, $3, $4, $5)
     on conflict (visitor_hash, dedupe_bucket) do nothing
     returning id`,
    [
      visitor.city,
      visitor.country,
      visitor.countryCode,
      visitor.visitorHash,
      visitor.dedupeBucket,
    ],
    { fetchOptions: { signal: AbortSignal.timeout(QUERY_TIMEOUT_MS) } },
  );

  return Array.isArray(result) && result.length === 1;
}
