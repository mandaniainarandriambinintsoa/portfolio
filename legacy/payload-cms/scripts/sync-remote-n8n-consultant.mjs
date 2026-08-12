import { readFile } from "node:fs/promises";

await loadEnvLocal(".env.local");

const baseUrl = readArgument("--base-url") ?? "http://localhost:3040";
const apiSecret = process.env.API_SECRET_KEY;

if (!apiSecret) {
  throw new Error("API_SECRET_KEY is required");
}

const content = JSON.parse(
  await readFile(
    "src/lib/data/services/remote-n8n-consultant.json",
    "utf8",
  ),
);
const { fr, en } = content;
const body = {
  key: fr.key,
  slug_fr: fr.slug,
  slug_en: en.slug,
  icon: fr.icon,
  color: fr.color,
  title_fr: fr.title,
  title_en: en.title,
  description_fr: fr.description,
  description_en: en.description,
  card_title_fr: fr.cardTitle,
  card_title_en: en.cardTitle,
  card_description_fr: fr.cardDescription,
  card_description_en: en.cardDescription,
  seo_title_fr: fr.seoTitle,
  seo_title_en: en.seoTitle,
  seo_description_fr: fr.seoDescription,
  seo_description_en: en.seoDescription,
  landing_fr: fr.landing,
  landing_en: en.landing,
  is_landing: true,
  sort_order: 18,
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
  throw new Error(`${response.status} ${await response.text()}`);
}

console.log(
  JSON.stringify(
    {
      baseUrl,
      slug_fr: fr.slug,
      slug_en: en.slug,
      result: await response.json(),
    },
    null,
    2,
  ),
);

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
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
