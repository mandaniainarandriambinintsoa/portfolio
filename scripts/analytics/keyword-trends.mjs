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

function compactQuery(item) {
  return {
    query: item.query,
    value: item.value ?? item.extracted_value ?? null,
    growth: item.formattedValue ?? item.formatted_value ?? null,
    link: item.link ?? null,
  };
}

function compactTopic(item) {
  return {
    title: item.topic?.title ?? item.title ?? null,
    type: item.topic?.type ?? item.type ?? null,
    value: item.value ?? item.extracted_value ?? null,
    growth: item.formattedValue ?? item.formatted_value ?? null,
  };
}

async function fetchTrend({ keyword, geo, language, dataType, apiKey }) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_trends");
  url.searchParams.set("q", keyword);
  url.searchParams.set("data_type", dataType);
  url.searchParams.set("date", "today 12-m");
  url.searchParams.set("geo", geo);
  url.searchParams.set("hl", language);
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `SerpApi failed for "${keyword}" (${response.status}): ${await response.text()}`,
    );
  }
  return response.json();
}

function extractRelatedQueries(payload) {
  const queries = payload.related_queries || {};
  return {
    rising: (queries.rising || []).map(compactQuery),
    top: (queries.top || []).map(compactQuery),
  };
}

function extractRelatedTopics(payload) {
  const topics = payload.related_topics || {};
  return {
    rising: (topics.rising || []).map(compactTopic),
    top: (topics.top || []).map(compactTopic),
  };
}

loadEnvFile(path.join(rootDir, ".env.local"));

const apiKey = required("SERPAPI_KEY");
const geo = argValue("--geo", "MG").toUpperCase();
const language = argValue("--hl", "fr").toLowerCase();
const keywords = argValue(
  "--keywords",
  "agent ia,mobile money,n8n,développeur web,automatisation",
)
  .split(",")
  .map((keyword) => keyword.trim())
  .filter(Boolean)
  .slice(0, 10);

const results = [];
for (const keyword of keywords) {
  const [queryPayload, topicPayload] = await Promise.all([
    fetchTrend({
      keyword,
      geo,
      language,
      dataType: "RELATED_QUERIES",
      apiKey,
    }),
    fetchTrend({
      keyword,
      geo,
      language,
      dataType: "RELATED_TOPICS",
      apiKey,
    }),
  ]);
  results.push({
    keyword,
    relatedQueries: extractRelatedQueries(queryPayload),
    relatedTopics: extractRelatedTopics(topicPayload),
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  geo,
  language,
  period: "today 12-m",
  searchesUsed: keywords.length * 2,
  results,
};
const serialized = `${JSON.stringify(report, null, 2)}\n`;
const outputPath = argValue("--output", null);

if (outputPath) {
  const absoluteOutputPath = path.resolve(rootDir, outputPath);
  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.writeFileSync(absoluteOutputPath, serialized, "utf8");
  process.stdout.write(
    `${JSON.stringify({
      outputPath: absoluteOutputPath,
      generatedAt: report.generatedAt,
      geo,
      language,
      keywords,
      searchesUsed: report.searchesUsed,
    }, null, 2)}\n`,
  );
} else {
  process.stdout.write(serialized);
}
