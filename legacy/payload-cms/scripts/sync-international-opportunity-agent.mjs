import { readFile } from "node:fs/promises";
import { getPayload } from "payload";

await loadEnvLocal(".env.local");

const { default: payloadConfig } = await import("../../payload.config.ts");
const payload = await getPayload({ config: payloadConfig });

async function loadEnvLocal(path) {
  const source = await readFile(path, "utf8");
  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;

    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

async function readDictionary(locale) {
  return JSON.parse(
    await readFile(`src/i18n/dictionaries/${locale}.json`, "utf8"),
  );
}

const slug = "international-opportunity-agent-n8n";
const shouldPublish = process.env.PUBLISH_OPPORTUNITY_AGENT !== "false";
const [frDictionary, enDictionary] = await Promise.all([
  readDictionary("fr"),
  readDictionary("en"),
]);
const frProject = frDictionary.projects.items.find((project) => project.slug === slug);
const enProject = enDictionary.projects.items.find((project) => project.slug === slug);

if (!frProject || !enProject) {
  throw new Error(`Missing localized project data for ${slug}.`);
}

const data = {
  slug,
  title: { fr: frProject.title, en: enProject.title },
  subtitle: { fr: frProject.subtitle, en: enProject.subtitle },
  description: { fr: frProject.description, en: enProject.description },
  category: "workflow",
  tags: frProject.tags.map((label) => ({ label })),
  image: frProject.image,
  imageAlt: {
    fr: "Canvas du workflow n8n de veille et qualification des opportunités internationales",
    en: "n8n workflow canvas for international opportunity monitoring and qualification",
  },
  link: null,
  workflowFile: null,
  role: {
    fr: "Architecture du pipeline, développement du backend, orchestration n8n, intégration OpenRouter et contrôle des envois Gmail.",
    en: "Pipeline architecture, backend development, n8n orchestration, OpenRouter integration and controlled Gmail delivery.",
  },
  results: [
    {
      item: {
        fr: "4 flux RSS publics traités séquentiellement",
        en: "4 public RSS feeds processed sequentially",
      },
    },
    {
      item: {
        fr: "128 annonces lues pendant une exécution complète observée",
        en: "128 listings read during one observed full execution",
      },
    },
    {
      item: {
        fr: "Aucun doublon réinjecté lors du passage suivant",
        en: "No duplicate listing re-ingested on the following pass",
      },
    },
    {
      item: {
        fr: "Aucun envoi sans approbation humaine et email public",
        en: "No outreach without human approval and a public email",
      },
    },
  ],
  featured: true,
  sortOrder: 6,
  published: shouldPublish,
  _status: shouldPublish ? "published" : "draft",
};

const existing = await payload.find({
  collection: "projects",
  limit: 1,
  where: { slug: { equals: slug } },
});

const action = existing.docs[0]
  ? await payload.update({
      collection: "projects",
      id: existing.docs[0].id,
      data,
      locale: "all",
    })
  : await payload.create({ collection: "projects", data, locale: "all" });

console.log(
  JSON.stringify({
    id: action.id,
    slug,
    status: existing.docs[0] ? "updated" : "created",
    publication: shouldPublish ? "published" : "draft",
  }),
);
await payload.destroy();
