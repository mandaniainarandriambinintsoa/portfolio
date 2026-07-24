import { readFile } from "node:fs/promises";
import { getPayload } from "payload";

await loadEnvLocal(".env.local");

const { default: payloadConfig } = await import("../../payload.config.ts");
const payload = await getPayload({ config: payloadConfig });

const [fr, en] = await Promise.all([
  readJson("src/i18n/dictionaries/fr.json"),
  readJson("src/i18n/dictionaries/en.json"),
]);

function serviceKey(index) {
  return `service-${String(index + 1).padStart(2, "0")}`;
}

function tagsToPayload(tags = []) {
  return tags.map((label) => ({ label }));
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

async function upsertByField(collection, where, data) {
  const existing = await payload.find({
    collection,
    limit: 1,
    where,
  });

  if (existing.docs[0]) {
    await payload.update({
      collection,
      data,
      id: existing.docs[0].id,
      locale: "all",
    });
    return "updated";
  }

  await payload.create({
    collection,
    data,
    locale: "all",
  });
  return "created";
}

async function seedSiteContent() {
  await payload.updateGlobal({
    slug: "site-content",
    data: {
      content: { fr, en },
    },
    locale: "all",
  });
}

async function seedServices() {
  const count = Math.min(fr.services.items.length, en.services.items.length);
  const results = { created: 0, updated: 0 };

  for (let index = 0; index < count; index += 1) {
    const frService = fr.services.items[index];
    const enService = en.services.items[index];
    const key = serviceKey(index);

    const action = await upsertByField(
      "services",
      { key: { equals: key } },
      {
        key,
        slug: { fr: frService.slug, en: enService.slug },
        icon: frService.icon || enService.icon || "code_blocks",
        color: frService.color || enService.color || "indigo",
        title: { fr: frService.title, en: enService.title },
        description: { fr: frService.description, en: enService.description },
        cardTitle: {
          fr: frService.cardTitle || frService.title,
          en: enService.cardTitle || enService.title,
        },
        cardDescription: {
          fr: frService.cardDescription || frService.description,
          en: enService.cardDescription || enService.description,
        },
        seoTitle: {
          fr: frService.seoTitle || frService.title,
          en: enService.seoTitle || enService.title,
        },
        seoDescription: {
          fr: frService.seoDescription || frService.description,
          en: enService.seoDescription || enService.description,
        },
        landing: {
          fr: frService.landing ?? null,
          en: enService.landing ?? null,
        },
        isLanding: Boolean(frService.isLanding || enService.isLanding),
        sortOrder: index + 1,
        published: true,
        _status: "published",
      },
    );

    results[action] += 1;
  }

  return results;
}

async function seedProjects() {
  const enBySlug = new Map(en.projects.items.map((project) => [project.slug, project]));
  const results = { created: 0, updated: 0 };

  for (let index = 0; index < fr.projects.items.length; index += 1) {
    const frProject = fr.projects.items[index];
    const enProject = enBySlug.get(frProject.slug) || en.projects.items[index] || frProject;

    const action = await upsertByField(
      "projects",
      { slug: { equals: frProject.slug } },
      {
        slug: frProject.slug,
        title: { fr: frProject.title, en: enProject.title },
        subtitle: { fr: frProject.subtitle, en: enProject.subtitle },
        description: { fr: frProject.description, en: enProject.description },
        category: frProject.category,
        tags: tagsToPayload(frProject.tags),
        image: frProject.image,
        link: frProject.link ?? null,
        workflowFile: frProject.workflowFile ?? null,
        featured: Boolean(frProject.featured),
        sortOrder: index + 1,
        published: true,
        _status: "published",
      },
    );

    results[action] += 1;
  }

  return results;
}

await seedSiteContent();
const services = await seedServices();
const projects = await seedProjects();

console.log(JSON.stringify({ siteContent: "updated", services, projects }, null, 2));
await payload.destroy();
