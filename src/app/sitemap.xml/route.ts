import { NextResponse } from "next/server";
import { getAllBlogSlugs } from "@/lib/data/blog";
import { getAllProjectSlugs } from "@/lib/data/projects";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 3600;

const serviceSlugsFr = [
  "conception-workflows",
  "developpement-applications",
  "integration-ia",
  "passage-echelle",
  "developpeur-no-code-madagascar",
  "automatisation-n8n-madagascar",
  "developpeur-low-code-madagascar",
];

const serviceSlugsEn = [
  "workflow-design",
  "app-development",
  "ai-integration",
  "systems-scaling",
  "no-code-developer-madagascar",
  "n8n-automation-expert-madagascar",
  "low-code-developer-madagascar",
];

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: number,
  alt?: { fr: string; en: string }
) {
  let xml = `<url><loc>${loc}</loc>`;
  if (alt) {
    xml += `<xhtml:link rel="alternate" hreflang="fr" href="${alt.fr}"/>`;
    xml += `<xhtml:link rel="alternate" hreflang="en" href="${alt.en}"/>`;
  }
  xml += `<lastmod>${lastmod}</lastmod>`;
  xml += `<changefreq>${changefreq}</changefreq>`;
  xml += `<priority>${priority}</priority></url>`;
  return xml;
}

export async function GET() {
  const now = new Date().toISOString();

  const urls: string[] = [];

  // Static pages
  const staticPages = [
    { fr: "", en: "en", priority: 1.0, freq: "weekly" },
    { fr: "about", en: "en/about", priority: 0.8, freq: "weekly" },
    { fr: "contact", en: "en/contact", priority: 0.8, freq: "weekly" },
    { fr: "projects", en: "en/projects", priority: 0.8, freq: "weekly" },
    { fr: "services", en: "en/services", priority: 0.8, freq: "weekly" },
    { fr: "blog", en: "en/blog", priority: 0.8, freq: "weekly" },
  ];

  for (const page of staticPages) {
    urls.push(
      urlEntry(`${SITE_URL}/${page.fr}`, now, page.freq, page.priority, {
        fr: `${SITE_URL}/${page.fr}`,
        en: `${SITE_URL}/${page.en}`,
      })
    );
  }

  // Service pages
  serviceSlugsFr.forEach((slug, i) => {
    urls.push(
      urlEntry(`${SITE_URL}/services/${slug}`, now, "monthly", 0.7, {
        fr: `${SITE_URL}/services/${slug}`,
        en: `${SITE_URL}/en/services/${serviceSlugsEn[i]}`,
      })
    );
  });

  // Project pages
  const projectSlugs = await getAllProjectSlugs();
  for (const slug of projectSlugs) {
    urls.push(
      urlEntry(`${SITE_URL}/projects/${slug}`, now, "monthly", 0.7, {
        fr: `${SITE_URL}/projects/${slug}`,
        en: `${SITE_URL}/en/projects/${slug}`,
      })
    );
  }

  // Blog posts
  const blogSlugs = await getAllBlogSlugs();
  for (const slug of blogSlugs) {
    urls.push(
      urlEntry(`${SITE_URL}/blog/${slug}`, now, "weekly", 0.6, {
        fr: `${SITE_URL}/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
      })
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
