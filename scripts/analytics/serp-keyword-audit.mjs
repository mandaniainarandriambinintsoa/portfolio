import fs from "node:fs";
import path from "node:path";

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

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function compactResult(result) {
  return {
    position: result.position ?? null,
    title: result.title ?? null,
    link: result.link ?? null,
    displayedLink: result.displayed_link ?? null,
    snippet: result.snippet ?? null,
  };
}

async function fetchSerp({ query, apiKey, language, country, domain, location }) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", query);
  url.searchParams.set("hl", language);
  url.searchParams.set("gl", country);
  url.searchParams.set("google_domain", domain);
  url.searchParams.set("location", location);
  url.searchParams.set("num", "10");
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`SerpApi failed for "${query}" (${response.status}): ${await response.text()}`);
  }
  return response.json();
}

loadEnvFile(path.join(rootDir, ".env.local"));

const apiKey = required("SERPAPI_KEY");
const language = argValue("--hl", "fr").toLowerCase();
const country = argValue("--gl", "mg").toLowerCase();
const googleDomain = argValue("--google-domain", "google.mg");
const location = argValue("--location", "Antananarivo, Madagascar");
const targetDomain = argValue("--target-domain", "manda-ia.com").toLowerCase();
const queries = argValue(
  "--queries",
  "agent ia madagascar,agence ia madagascar,développeur ia madagascar,automatisation ia madagascar",
)
  .split(",")
  .map((query) => query.trim())
  .filter(Boolean)
  .slice(0, 10);

const results = [];
for (const query of queries) {
  const payload = await fetchSerp({
    query,
    apiKey,
    language,
    country,
    domain: googleDomain,
    location,
  });
  const organic = (payload.organic_results || []).map(compactResult);
  const targetResults = organic.filter((result) => {
    try {
      return new URL(result.link).hostname.toLowerCase().endsWith(targetDomain);
    } catch {
      return false;
    }
  });
  results.push({
    query,
    checkedAt: payload.search_metadata?.created_at ?? new Date().toISOString(),
    targetPositions: targetResults,
    organic,
    relatedQuestions: (payload.related_questions || []).map((item) => item.question).filter(Boolean),
    relatedSearches: (payload.related_searches || []).map((item) => item.query).filter(Boolean),
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  provider: "SerpApi Google Search",
  parameters: { language, country, googleDomain, location, targetDomain },
  searchesUsed: queries.length,
  results,
};
const outputPath = path.resolve(
  rootDir,
  argValue("--output", ".tmp-analytics/serp-keyword-report.json"),
);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(
  `${JSON.stringify({ outputPath, generatedAt: report.generatedAt, searchesUsed: report.searchesUsed }, null, 2)}\n`,
);
