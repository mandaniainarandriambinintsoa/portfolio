import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllBlogSitemapEntries } from "@/lib/data/blog";
import { getAllProjectSitemapEntries } from "@/lib/data/projects";

// Revalidate every hour so lastmod reflects Supabase updates without a full redeploy
export const revalidate = 3600;

type ServiceItem = { slug: string; isLanding?: boolean };

function asDate(value: string | null | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function entry(
  pathFr: string,
  pathEn: string,
  lastModified: Date,
  current: "fr" | "en",
): MetadataRoute.Sitemap[number] {
  const urlFr = `${SITE_URL}${pathFr}`;
  const urlEn = `${SITE_URL}${pathEn}`;
  return {
    url: current === "fr" ? urlFr : urlEn,
    lastModified,
    alternates: {
      languages: {
        fr: urlFr,
        en: urlEn,
        "x-default": urlFr,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [fr, en, blogEntries, projectEntries] = await Promise.all([
    getDictionary("fr"),
    getDictionary("en"),
    getAllBlogSitemapEntries(),
    getAllProjectSitemapEntries(),
  ]);

  const items: MetadataRoute.Sitemap = [];

  // Static top-level routes (FR + EN)
  const staticRoutes: { fr: string; en: string }[] = [
    { fr: "/", en: "/en" },
    { fr: "/about", en: "/en/about" },
    { fr: "/contact", en: "/en/contact" },
    { fr: "/services", en: "/en/services" },
    { fr: "/projects", en: "/en/projects" },
    { fr: "/blog", en: "/en/blog" },
    { fr: "/quiz", en: "/en/quiz" },
    { fr: "/privacy", en: "/en/privacy" },
    { fr: "/mentions-legales", en: "/en/mentions-legales" },
  ];

  for (const route of staticRoutes) {
    items.push(entry(route.fr, route.en, now, "fr"));
    items.push(entry(route.fr, route.en, now, "en"));
  }

  // Services (generic + landing) — map by array index to keep FR/EN pairs in sync
  const frServices = fr.services.items as ServiceItem[];
  const enServices = en.services.items as ServiceItem[];
  const serviceCount = Math.min(frServices.length, enServices.length);

  for (let i = 0; i < serviceCount; i++) {
    const frSlug = frServices[i].slug;
    const enSlug = enServices[i].slug;
    const pathFr = `/services/${frSlug}`;
    const pathEn = `/en/services/${enSlug}`;
    items.push(entry(pathFr, pathEn, now, "fr"));
    items.push(entry(pathFr, pathEn, now, "en"));
  }

  // Projects — same slug for both locales (single column in Supabase)
  for (const project of projectEntries) {
    const lastmod = asDate(project.updatedAt ?? project.createdAt, now);
    const pathFr = `/projects/${project.slug}`;
    const pathEn = `/en/projects/${project.slug}`;
    items.push(entry(pathFr, pathEn, lastmod, "fr"));
    items.push(entry(pathFr, pathEn, lastmod, "en"));
  }

  // Blog posts — same slug for both locales (bilingual columns per row)
  for (const post of blogEntries) {
    const lastmod = asDate(post.updatedAt ?? post.publishedAt, now);
    const pathFr = `/blog/${post.slug}`;
    const pathEn = `/en/blog/${post.slug}`;
    items.push(entry(pathFr, pathEn, lastmod, "fr"));
    items.push(entry(pathFr, pathEn, lastmod, "en"));
  }

  return items;
}
