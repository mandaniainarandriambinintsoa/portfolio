import { readFile } from "node:fs/promises";

await loadEnvLocal(".env.local");

const targetSlugs = new Set([
  "developpeur-react-nextjs-madagascar",
  "developpeur-javascript-madagascar",
  "developpeur-nodejs-madagascar",
]);
const baseUrl = readArgument("--base-url") ?? "http://localhost:3020";
const apiSecret = process.env.API_SECRET_KEY;

if (!apiSecret) {
  throw new Error("API_SECRET_KEY is required");
}

const [fr, en] = await Promise.all([
  readJson("src/i18n/dictionaries/fr.json"),
  readJson("src/i18n/dictionaries/en.json"),
]);
const results = [];
const count = Math.min(fr.services.items.length, en.services.items.length);

for (let index = 0; index < count; index += 1) {
  const frService = fr.services.items[index];
  if (!targetSlugs.has(frService.slug)) continue;

  const enService = en.services.items[index];
  const key = `service-${String(index + 1).padStart(2, "0")}`;
  const body = {
    key,
    slug_fr: frService.slug,
    slug_en: enService.slug,
    icon: frService.icon || enService.icon || "code_blocks",
    color: frService.color || enService.color || "indigo",
    title_fr: frService.title,
    title_en: enService.title,
    description_fr: frService.description,
    description_en: enService.description,
    card_title_fr: frService.cardTitle || frService.title,
    card_title_en: enService.cardTitle || enService.title,
    card_description_fr: frService.cardDescription || frService.description,
    card_description_en: enService.cardDescription || enService.description,
    seo_title_fr: frService.seoTitle || frService.title,
    seo_title_en: enService.seoTitle || enService.title,
    seo_description_fr: frService.seoDescription || frService.description,
    seo_description_en: enService.seoDescription || enService.description,
    landing_fr: frService.landing ?? null,
    landing_en: enService.landing ?? null,
    is_landing: Boolean(frService.isLanding || enService.isLanding),
    sort_order: index + 1,
    published: true,
  };

  const response = await fetch(`${baseUrl}/api/public/services`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiSecret}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `${frService.slug}: ${response.status} ${await response.text()}`,
    );
  }

  results.push({
    slug: frService.slug,
    ...(await response.json()),
  });
}

console.log(JSON.stringify({ baseUrl, results }, null, 2));

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
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
