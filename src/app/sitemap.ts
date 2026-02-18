import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/data/blog";
import { getAllProjectSlugs } from "@/lib/data/projects";

const SITE_URL = "https://manda.dev";

const serviceSlugsFr = [
  "conception-workflows",
  "developpement-applications",
  "integration-ia",
  "passage-echelle",
];
const serviceSlugsEn = [
  "workflow-design",
  "app-development",
  "ai-integration",
  "systems-scaling",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = [
    { fr: "", en: "en" },
    { fr: "about", en: "en/about" },
    { fr: "contact", en: "en/contact" },
    { fr: "projects", en: "en/projects" },
    { fr: "services", en: "en/services" },
    { fr: "blog", en: "en/blog" },
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE_URL}/${page.fr}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: page.fr === "" ? 1.0 : 0.8,
    alternates: {
      languages: {
        fr: `${SITE_URL}/${page.fr}`,
        en: `${SITE_URL}/${page.en}`,
      },
    },
  }));

  // Service pages
  serviceSlugsFr.forEach((slug, i) => {
    entries.push({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${SITE_URL}/services/${slug}`,
          en: `${SITE_URL}/en/services/${serviceSlugsEn[i]}`,
        },
      },
    });
  });

  // Project pages (dynamic from Supabase)
  const projectSlugs = await getAllProjectSlugs();
  for (const slug of projectSlugs) {
    entries.push({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${SITE_URL}/projects/${slug}`,
          en: `${SITE_URL}/en/projects/${slug}`,
        },
      },
    });
  }

  // Blog posts (dynamic from Supabase)
  const blogSlugs = await getAllBlogSlugs();
  for (const slug of blogSlugs) {
    entries.push({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: {
          fr: `${SITE_URL}/blog/${slug}`,
          en: `${SITE_URL}/en/blog/${slug}`,
        },
      },
    });
  }

  return entries;
}
