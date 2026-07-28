import "server-only";

import crypto from "node:crypto";
import { unstable_cache } from "next/cache";

type GscMetricRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

type GscQueryResponse = {
  rows?: GscMetricRow[];
};

export type SearchPerformancePeriod = {
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type SearchPerformanceDay = {
  date: string;
  clicks: number;
  impressions: number;
};

export type SeoGrowthProof = {
  current: SearchPerformancePeriod;
  daily: SearchPerformanceDay[];
  source: "gsc" | "verified-snapshot";
  refreshedAt: string;
};

const VERIFIED_THREE_MONTH_SNAPSHOT: SearchPerformancePeriod = {
  startDate: "2026-04-26",
  endDate: "2026-07-25",
  clicks: 274,
  impressions: 8150,
  ctr: 0.034,
  position: 9.3,
};

function required(name: "GA4_CLIENT_EMAIL" | "GA4_PRIVATE_KEY") {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function finalizedDateRange(days = 91, delayDays = 3) {
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  end.setUTCDate(end.getUTCDate() - delayDays);

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);

  return {
    startDate: isoDate(start),
    endDate: isoDate(end),
  };
}

function enumerateDates(startDate: string, endDate: string) {
  const dates: string[] = [];
  const cursor = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  while (cursor <= end) {
    dates.push(isoDate(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

function base64Url(value: string | Buffer) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: required("GA4_CLIENT_EMAIL"),
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsignedToken = `${header}.${claims}`;
  const signature = crypto.sign(
    "RSA-SHA256",
    Buffer.from(unsignedToken),
    required("GA4_PRIVATE_KEY").replace(/\\n/g, "\n"),
  );

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedToken}.${base64Url(signature)}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google OAuth failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { access_token?: string };
  if (!payload.access_token) throw new Error("Google OAuth returned no access token");
  return payload.access_token;
}

async function querySearchConsole(
  accessToken: string,
  body: Record<string, unknown>,
): Promise<GscQueryResponse> {
  const property = process.env.GSC_SITE_URL?.trim() || "sc-domain:manda-ia.com";
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error(`Search Console query failed with status ${response.status}`);
  }

  return (await response.json()) as GscQueryResponse;
}

async function fetchCurrentSearchPerformance(): Promise<
  Pick<SeoGrowthProof, "current" | "daily">
> {
  const range = finalizedDateRange();
  const accessToken = await getGoogleAccessToken();
  const commonQuery = {
    ...range,
    type: "web",
    dataState: "final",
  };

  const [aggregatePayload, dailyPayload] = await Promise.all([
    querySearchConsole(accessToken, {
      ...commonQuery,
      rowLimit: 1,
    }),
    querySearchConsole(accessToken, {
      ...commonQuery,
      dimensions: ["date"],
      rowLimit: 25_000,
    }),
  ]);

  const aggregate = aggregatePayload.rows?.[0];
  if (!aggregate) throw new Error("Search Console returned no aggregate row");

  const rowsByDate = new Map(
    (dailyPayload.rows ?? []).flatMap((row) => {
      const date = row.keys?.[0];
      return date ? [[date, row] as const] : [];
    }),
  );
  const daily = enumerateDates(range.startDate, range.endDate).map((date) => {
    const row = rowsByDate.get(date);
    return {
      date,
      clicks: row?.clicks ?? 0,
      impressions: row?.impressions ?? 0,
    };
  });

  return {
    current: {
      ...range,
      clicks: aggregate.clicks ?? 0,
      impressions: aggregate.impressions ?? 0,
      ctr: aggregate.ctr ?? 0,
      position: aggregate.position ?? 0,
    },
    daily,
  };
}

const getCachedCurrentSearchPerformance = unstable_cache(
  fetchCurrentSearchPerformance,
  ["manda-ia-gsc-growth-proof-v2"],
  {
    revalidate: 86_400,
    tags: ["gsc-growth-proof"],
  },
);

export async function getSeoGrowthProof(): Promise<SeoGrowthProof> {
  const hasCredentials = Boolean(
    process.env.GA4_CLIENT_EMAIL?.trim() && process.env.GA4_PRIVATE_KEY?.trim(),
  );

  if (hasCredentials) {
    try {
      const proof = await getCachedCurrentSearchPerformance();
      return {
        ...proof,
        source: "gsc",
        refreshedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.warn(
        "Unable to refresh the public GSC proof block; using the verified snapshot.",
        error instanceof Error ? error.message : error,
      );
    }
  }

  return {
    current: VERIFIED_THREE_MONTH_SNAPSHOT,
    daily: [],
    source: "verified-snapshot",
    refreshedAt: VERIFIED_THREE_MONTH_SNAPSHOT.endDate,
  };
}
