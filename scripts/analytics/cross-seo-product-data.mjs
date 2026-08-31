import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const rootDir = process.cwd();

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;

    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function dateRange(days, offsetDays = 3) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - offsetDays);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  return { startDate: isoDate(start), endDate: isoDate(end) };
}

function previousRange({ startDate, endDate }) {
  const currentStart = new Date(`${startDate}T00:00:00Z`);
  const currentEnd = new Date(`${endDate}T00:00:00Z`);
  const days = Math.round((currentEnd - currentStart) / 86_400_000) + 1;
  const previousEnd = new Date(currentStart);
  previousEnd.setUTCDate(previousEnd.getUTCDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setUTCDate(previousStart.getUTCDate() - days + 1);
  return { startDate: isoDate(previousStart), endDate: isoDate(previousEnd) };
}

function summarize(rows = []) {
  const totals = rows.reduce(
    (acc, row) => {
      acc.clicks += row.clicks || 0;
      acc.impressions += row.impressions || 0;
      acc.positionWeight += (row.position || 0) * (row.impressions || 0);
      return acc;
    },
    { clicks: 0, impressions: 0, positionWeight: 0 },
  );

  return {
    clicks: totals.clicks,
    impressions: totals.impressions,
    ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
    position: totals.impressions ? totals.positionWeight / totals.impressions : 0,
  };
}

function normalizePath(urlOrPath) {
  if (!urlOrPath) return "/";
  try {
    const parsed = new URL(urlOrPath);
    return parsed.pathname.replace(/\/$/, "") || "/";
  } catch {
    return urlOrPath.replace(/\/$/, "") || "/";
  }
}

function base64Url(value) {
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
  const assertion = `${unsignedToken}.${base64Url(signature)}`;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(
      `Google OAuth failed (${tokenResponse.status}): ${await tokenResponse.text()}`,
    );
  }

  return (await tokenResponse.json()).access_token;
}

async function googleApiRequest(url, accessToken, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Google API failed (${response.status}): ${await response.text()}`);
  }
  return response.json();
}

async function getSearchConsoleData() {
  const accessToken = await getGoogleAccessToken();
  const sitesResponse = await googleApiRequest(
    "https://www.googleapis.com/webmasters/v3/sites",
    accessToken,
  );
  const sites = sitesResponse.siteEntry || [];
  const preferred =
    sites.find((site) => site.siteUrl === "sc-domain:manda-ia.com") ||
    sites.find((site) => site.siteUrl?.includes("manda-ia.com"));

  if (!preferred?.siteUrl) {
    throw new Error(
      `Search Console property not accessible. Available properties: ${
        sites.map((site) => site.siteUrl).join(", ") || "none"
      }`,
    );
  }

  const current = dateRange(28);
  const previous = previousRange(current);
  const last90 = dateRange(90);

  async function query(range, dimensions, rowLimit = 25_000) {
    const response = await googleApiRequest(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
        preferred.siteUrl,
      )}/searchAnalytics/query`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
        ...range,
        dimensions,
        type: "web",
        dataState: "final",
        rowLimit,
        }),
      },
    );
    return response.rows || [];
  }

  const [
    currentTotalsRows,
    previousTotalsRows,
    currentDailyRows,
    currentPageRows,
    previousPageRows,
    currentQueryRows,
    previousQueryRows,
    pageRows,
    queryRows,
    pageQueryRows,
    countryPageQueryRows,
    countryRows,
    deviceRows,
  ] = await Promise.all([
    query(current, []),
    query(previous, []),
    query(current, ["date"]),
    query(current, ["page"]),
    query(previous, ["page"]),
    query(current, ["query"]),
    query(previous, ["query"]),
    query(last90, ["page"]),
    query(last90, ["query"]),
    query(last90, ["page", "query"]),
    query(last90, ["country", "page", "query"]),
    query(last90, ["country"]),
    query(last90, ["device"]),
  ]);

  return {
    property: preferred.siteUrl,
    ranges: { current, previous, last90 },
    current: summarize(currentTotalsRows),
    previous: summarize(previousTotalsRows),
    currentDaily: currentDailyRows.map((row) => ({
      date: row.keys?.[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    currentPages: currentPageRows.map((row) => ({
      path: normalizePath(row.keys?.[0]),
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    previousPages: previousPageRows.map((row) => ({
      path: normalizePath(row.keys?.[0]),
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    currentQueries: currentQueryRows.map((row) => ({
      query: row.keys?.[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    previousQueries: previousQueryRows.map((row) => ({
      query: row.keys?.[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    pages: pageRows.map((row) => ({
      path: normalizePath(row.keys?.[0]),
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    queries: queryRows.map((row) => ({
      query: row.keys?.[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    pageQueries: pageQueryRows.map((row) => ({
      path: normalizePath(row.keys?.[0]),
      query: row.keys?.[1],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    countryPageQueries: countryPageQueryRows.map((row) => ({
      country: row.keys?.[0],
      path: normalizePath(row.keys?.[1]),
      query: row.keys?.[2],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    countries: countryRows.map((row) => ({
      country: row.keys?.[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
    devices: deviceRows.map((row) => ({
      device: row.keys?.[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })),
  };
}

function postHogApiHost() {
  const ingestHost = required("NEXT_PUBLIC_POSTHOG_HOST");
  return ingestHost
    .replace("://eu.i.", "://eu.")
    .replace("://us.i.", "://us.")
    .replace(/\/$/, "");
}

async function runHogQl(query) {
  const response = await fetch(
    `${postHogApiHost()}/api/projects/${required("POSTHOG_PROJECT_ID")}/query/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${required("POSTHOG_PERSONAL_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`PostHog query failed (${response.status}): ${await response.text()}`);
  }

  const payload = await response.json();
  return {
    columns: payload.columns || [],
    results: payload.results || [],
  };
}

function rowsFromHogQl(data) {
  return data.results.map((result) =>
    Object.fromEntries(data.columns.map((column, index) => [column, result[index]])),
  );
}

async function getPostHogData() {
  const [coverage, pageviews, engagement, conversions, referrers, googleLandings] =
    await Promise.all([
    runHogQl(`
      SELECT
        min(timestamp) AS first_event,
        max(timestamp) AS last_event,
        count() AS total_events,
        uniqExact(distinct_id) AS visitors
      FROM events
      WHERE timestamp >= now() - INTERVAL 90 DAY
    `),
    runHogQl(`
      SELECT
        coalesce(nullIf(properties.path, ''), replaceRegexpAll(properties.$current_url, '^https?://[^/]+', '')) AS path,
        count() AS pageviews,
        uniqExact(distinct_id) AS visitors,
        uniqExact(properties.$session_id) AS sessions
      FROM events
      WHERE event = '$pageview'
        AND timestamp >= now() - INTERVAL 90 DAY
        AND properties.$current_url LIKE '%manda-ia.com%'
      GROUP BY path
      ORDER BY pageviews DESC
      LIMIT 500
    `),
    runHogQl(`
      SELECT
        coalesce(properties.path, '/') AS path,
        countIf(event = 'scroll_depth_reached' AND toInt(properties.depth_percent) >= 75) AS deep_scrolls,
        countIf(event = 'project_opened') AS project_opens,
        countIf(event = 'service_viewed' OR event = 'solution_viewed') AS offer_views,
        countIf(event = 'cta_clicked') AS cta_clicks,
        countIf(event = 'whatsapp_clicked') AS whatsapp_clicks,
        countIf(event = 'contact_form_started') AS contact_starts,
        countIf(event = 'contact_form_success') AS contact_successes
      FROM events
      WHERE timestamp >= now() - INTERVAL 90 DAY
        AND event IN (
          'scroll_depth_reached',
          'project_opened',
          'service_viewed',
          'solution_viewed',
          'cta_clicked',
          'whatsapp_clicked',
          'contact_form_started',
          'contact_form_success'
        )
      GROUP BY path
      ORDER BY deep_scrolls + project_opens + offer_views + cta_clicks + whatsapp_clicks DESC
      LIMIT 500
    `),
    runHogQl(`
      SELECT
        event,
        count() AS total,
        uniqExact(distinct_id) AS visitors
      FROM events
      WHERE timestamp >= now() - INTERVAL 90 DAY
        AND event IN (
          'cta_clicked',
          'whatsapp_clicked',
          'contact_form_started',
          'contact_form_submitted',
          'contact_form_success',
          'project_opened',
          'service_viewed',
          'solution_viewed'
        )
      GROUP BY event
      ORDER BY total DESC
    `),
    runHogQl(`
      SELECT
        coalesce(nullIf(properties.$referring_domain, ''), '(direct)') AS referrer,
        count() AS pageviews,
        uniqExact(distinct_id) AS visitors
      FROM events
      WHERE event = '$pageview'
        AND timestamp >= now() - INTERVAL 90 DAY
        AND properties.$current_url LIKE '%manda-ia.com%'
      GROUP BY referrer
      ORDER BY visitors DESC
      LIMIT 100
    `),
    runHogQl(`
      SELECT
        coalesce(nullIf(properties.path, ''), replaceRegexpAll(properties.$current_url, '^https?://[^/]+', '')) AS path,
        count() AS pageviews,
        uniqExact(distinct_id) AS visitors
      FROM events
      WHERE event = '$pageview'
        AND timestamp >= now() - INTERVAL 90 DAY
        AND properties.$current_url LIKE '%manda-ia.com%'
        AND (
          properties.$referring_domain LIKE '%google%'
          OR properties.$referrer LIKE '%google.%'
        )
      GROUP BY path
      ORDER BY visitors DESC
      LIMIT 100
    `),
  ]);

  return {
    coverage: rowsFromHogQl(coverage)[0] || {},
    pages: rowsFromHogQl(pageviews).map((row) => ({
      ...row,
      path: normalizePath(row.path),
    })),
    engagement: rowsFromHogQl(engagement).map((row) => ({
      ...row,
      path: normalizePath(row.path),
    })),
    conversions: rowsFromHogQl(conversions),
    referrers: rowsFromHogQl(referrers),
    googleLandings: rowsFromHogQl(googleLandings).map((row) => ({
      ...row,
      path: normalizePath(row.path),
    })),
  };
}

function classifyOpportunities(gsc, posthog) {
  const behaviorByPath = new Map();

  for (const page of posthog.pages) {
    behaviorByPath.set(page.path, { ...page });
  }
  for (const page of posthog.engagement) {
    behaviorByPath.set(page.path, {
      ...(behaviorByPath.get(page.path) || {}),
      ...page,
    });
  }

  return gsc.pages
    .map((page) => {
      const behavior = behaviorByPath.get(page.path) || {};
      const pageQueries = gsc.pageQueries
        .filter((row) => row.path === page.path)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 12);
      const pageviews = Number(behavior.pageviews || 0);
      const deepScrolls = Number(behavior.deep_scrolls || 0);
      const ctaClicks =
        Number(behavior.cta_clicks || 0) +
        Number(behavior.whatsapp_clicks || 0) +
        Number(behavior.contact_starts || 0);

      let action = "monitor";
      if (page.impressions >= 40 && page.position <= 12 && page.ctr < 0.03) {
        action = "rewrite_snippet";
      } else if (page.impressions >= 40 && page.position > 12 && page.position <= 30) {
        action = "expand_content";
      } else if (page.clicks >= 3 && pageviews > 0 && ctaClicks === 0) {
        action = "improve_conversion";
      } else if (page.impressions >= 20 && page.ctr >= 0.04) {
        action = "protect_and_expand";
      }

      return {
        ...page,
        ...behavior,
        deepScrollRate: pageviews ? deepScrolls / pageviews : null,
        ctaRate: pageviews ? ctaClicks / pageviews : null,
        action,
        topQueries: pageQueries,
      };
    })
    .sort((a, b) => b.impressions - a.impressions);
}

loadEnvFile(path.join(rootDir, ".env.local"));

const [gsc, posthog] = await Promise.all([
  getSearchConsoleData(),
  getPostHogData(),
]);

const report = {
  generatedAt: new Date().toISOString(),
  gsc,
  posthog,
  opportunities: classifyOpportunities(gsc, posthog),
};

const outputArgIndex = process.argv.indexOf("--output");
const outputPath =
  outputArgIndex >= 0 && process.argv[outputArgIndex + 1]
    ? path.resolve(rootDir, process.argv[outputArgIndex + 1])
    : null;
const serializedReport = `${JSON.stringify(report, null, 2)}\n`;

if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, serializedReport, "utf8");
  process.stdout.write(
    `${JSON.stringify({
      outputPath,
      generatedAt: report.generatedAt,
      currentGsc: report.gsc.current,
      previousGsc: report.gsc.previous,
      posthogPages: report.posthog.pages.length,
      opportunityPages: report.opportunities.length,
    }, null, 2)}\n`,
  );
} else {
  process.stdout.write(serializedReport);
}
