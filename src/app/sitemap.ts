import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllBlogSitemapEntries } from "@/lib/data/blog";
import { getAllProjectSitemapEntries } from "@/lib/data/projects";
import { getServiceSitemapPairs } from "@/lib/data/services";
import { getSolutions, SOLUTION_LAST_UPDATED } from "@/lib/data/solutions";
import {
  BUSINESS_VERTICALS_UPDATED_AT,
  getBusinessVerticalSitemapPairs,
} from "@/lib/data/business-verticals";

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
  const [blogEntries, projectEntries, servicePairs] = await Promise.all([
    getAllBlogSitemapEntries(),
    getAllProjectSitemapEntries(),
    getServiceSitemapPairs(),
  ]);

  const items: MetadataRoute.Sitemap = [];

  // Static top-level routes (FR + EN)
  const staticRoutes: { fr: string; en: string }[] = [
    { fr: "/", en: "/en" },
    { fr: "/about", en: "/en/about" },
    { fr: "/contact", en: "/en/contact" },
    { fr: "/services", en: "/en/services" },
    { fr: "/projects", en: "/en/projects" },
    { fr: "/site-metier", en: "/en/site-metier" },
    { fr: "/blog", en: "/en/blog" },
    { fr: "/quiz", en: "/en/quiz" },
    { fr: "/privacy", en: "/en/privacy" },
    { fr: "/mentions-legales", en: "/en/mentions-legales" },
  ];

  for (const route of staticRoutes) {
    items.push(entry(route.fr, route.en, now, "fr"));
    items.push(entry(route.fr, route.en, now, "en"));
  }

  // Solutions SEO/GEO — map by array index to keep FR/EN pairs in sync
  const businessVerticalLastModified = asDate(BUSINESS_VERTICALS_UPDATED_AT, now);
  for (const vertical of getBusinessVerticalSitemapPairs()) {
    const pathFr = `/site-metier/${vertical.frSlug}`;
    const pathEn = `/en/site-metier/${vertical.enSlug}`;
    items.push(entry(pathFr, pathEn, businessVerticalLastModified, "fr"));
    items.push(entry(pathFr, pathEn, businessVerticalLastModified, "en"));
  }

  const solutionLastModified = asDate(SOLUTION_LAST_UPDATED, now);
  items.push(entry("/solutions", "/en/solutions", solutionLastModified, "fr"));
  items.push(entry("/solutions", "/en/solutions", solutionLastModified, "en"));

  const frSolutions = getSolutions("fr");
  const enSolutions = getSolutions("en");
  const solutionCount = Math.min(frSolutions.length, enSolutions.length);
  for (let i = 0; i < solutionCount; i++) {
    const pathFr = `/solutions/${frSolutions[i].slug}`;
    const pathEn = `/en/solutions/${enSolutions[i].slug}`;
    items.push(entry(pathFr, pathEn, solutionLastModified, "fr"));
    items.push(entry(pathFr, pathEn, solutionLastModified, "en"));
  }

  // Services (generic + landing) from Payload first, dictionary fallback.
  for (const service of servicePairs) {
    const lastmod = asDate(service.updatedAt ?? service.createdAt, now);
    const pathFr = `/services/${service.frSlug}`;
    const pathEn = `/en/services/${service.enSlug}`;
    items.push(entry(pathFr, pathEn, lastmod, "fr"));
    items.push(entry(pathFr, pathEn, lastmod, "en"));
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
