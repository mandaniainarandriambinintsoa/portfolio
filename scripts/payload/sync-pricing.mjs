import { readFile } from "node:fs/promises";
import { getPayload } from "payload";

await loadEnvLocal(".env.local");

const { default: payloadConfig } = await import("../../payload.config.ts");
const payload = await getPayload({ config: payloadConfig });

const pricingPaths = [
  ["pricing"],
  ["services", "items", 4, "landing", "faq", 1, "answer"],
  ["services", "items", 4, "landing", "faq", 4, "answer"],
  ["services", "items", 5, "landing", "sections", 3, "content"],
  ["services", "items", 5, "landing", "faq", 0, "answer"],
  ["services", "items", 6, "landing", "sections", 3, "content"],
  ["services", "items", 6, "landing", "faq", 0, "answer"],
  ["services", "items", 7, "landing", "faq", 0, "answer"],
];

const englishPathOverrides = new Map([
  ["services.items.5.landing.sections.3.content", ["services", "items", 5, "landing", "sections", 2, "content"]],
  ["services.items.6.landing.sections.3.content", ["services", "items", 6, "landing", "sections", 2, "content"]],
]);

try {
  const results = [];

  for (const locale of ["fr", "en"]) {
    const dictionary = JSON.parse(
      await readFile(`src/i18n/dictionaries/${locale}.json`, "utf8"),
    );
    const current = await payload.findGlobal({
      slug: "site-content",
      depth: 0,
      draft: false,
      fallbackLocale: false,
      locale,
    });
    const content = structuredClone(current.content ?? {});

    for (const defaultPath of pricingPaths) {
      const key = defaultPath.join(".");
      const path = locale === "en" ? englishPathOverrides.get(key) ?? defaultPath : defaultPath;
      setAtPath(content, path, getAtPath(dictionary, path));
    }

    const updated = await payload.updateGlobal({
      slug: "site-content",
      data: { content, _status: "published" },
      draft: false,
      fallbackLocale: false,
      locale,
    });

    results.push({
      locale,
      status: updated._status,
      prices: updated.content?.pricing?.lines?.map((line) => line.tiers?.[0]?.price),
      dayRate: updated.content?.pricing?.tjm_value,
    });
  }

  console.log(JSON.stringify(results, null, 2));
} finally {
  await payload.destroy();
}

function getAtPath(value, path) {
  return path.reduce((current, key) => current?.[key], value);
}

function setAtPath(value, path, nextValue) {
  const parent = path.slice(0, -1).reduce((current, key) => current[key], value);
  parent[path.at(-1)] = nextValue;
}

async function loadEnvLocal(path) {
  const source = await readFile(path, "utf8");
  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}
