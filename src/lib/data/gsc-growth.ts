import "server-only";

import crypto from "node:crypto";
import { unstable_cache } from "next/cache";

type GscMetricRow = {
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

export type SeoGrowthProof = {
  baseline: SearchPerformancePeriod;
  current: SearchPerformancePeriod;
  source: "gsc" | "verified-snapshot";
  refreshedAt: string;
};

const BASELINE: SearchPerformancePeriod = {
  startDate: "2026-05-03",
  endDate: "2026-05-30",
  clicks: 44,
  impressions: 799,
  ctr: 0.0551,
  position: 7.49,
};

const VERIFIED_CURRENT_SNAPSHOT: SearchPerformancePeriod = {
  startDate: "2026-06-27",
  endDate: "2026-07-24",
  clicks: 146,
  impressions: 4976,
  ctr: 0.029340836012861738,
  position: 10.075763665594856,
};

function required(name: "GA4_CLIENT_EMAIL" | "GA4_PRIVATE_KEY") {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function finalizedDateRange(days = 28, delayDays = 3) {
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

async function fetchCurrentSearchPerformance(): Promise<SearchPerformancePeriod> {
  const range = finalizedDateRange();
  const accessToken = await getGoogleAccessToken();
  const property = process.env.GSC_SITE_URL?.trim() || "sc-domain:manda-ia.com";
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...range,
        type: "web",
        dataState: "final",
        rowLimit: 1,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Search Console query failed with status ${response.status}`);
  }

  const payload = (await response.json()) as GscQueryResponse;
  const row = payload.rows?.[0];
  if (!row) throw new Error("Search Console returned no aggregate row");

  return {
    ...range,
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  };
}

const getCachedCurrentSearchPerformance = unstable_cache(
  fetchCurrentSearchPerformance,
  ["manda-ia-gsc-growth-proof-v1"],
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
      const current = await getCachedCurrentSearchPerformance();
      return {
        baseline: BASELINE,
        current,
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
    baseline: BASELINE,
    current: VERIFIED_CURRENT_SNAPSHOT,
    source: "verified-snapshot",
    refreshedAt: VERIFIED_CURRENT_SNAPSHOT.endDate,
  };
}
