import type { Locale } from "@/i18n/config";
import { getStaticDictionary } from "@/i18n/dictionaries";
import type { ProjectItem } from "@/lib/types";
import projectRows from "@/content/projects.json";

const siteMetierSlugs = new Set(["madavoyage", "garagiste", "bati-diaspora"]);

function normalizeCategory(project: ProjectItem): ProjectItem {
  return siteMetierSlugs.has(project.slug)
    ? { ...project, category: "site-metier" }
    : project;
}

function mapRow(row: (typeof projectRows)[number], locale: Locale): ProjectItem {
  return normalizeCategory({
    slug: row.slug,
    title: locale === "fr" ? row.title_fr : row.title_en,
    subtitle: locale === "fr" ? row.subtitle_fr : row.subtitle_en,
    description: locale === "fr" ? row.description_fr : row.description_en,
    tags: row.tags,
    link: row.link,
    featured: row.featured,
    category: row.category as ProjectItem["category"],
    image: row.image,
    workflowFile: row.workflow_file,
  });
}

async function getDictionaryProjects(locale: Locale): Promise<ProjectItem[]> {
  const dict = await getStaticDictionary(locale);
  return (dict.projects.items as ProjectItem[]).map(normalizeCategory);
}

export async function getProjects(locale: Locale): Promise<ProjectItem[]> {
  const snapshot = projectRows.map((row) => mapRow(row, locale));
  const dictionary = await getDictionaryProjects(locale);
  const snapshotSlugs = new Set(snapshot.map((project) => project.slug));

  return [
    ...dictionary.filter((project) => !snapshotSlugs.has(project.slug)),
    ...snapshot,
  ];
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale
): Promise<ProjectItem | null> {
  const projects = await getProjects(locale);
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getProjects("fr");
  return projects.map((project) => project.slug);
}

export async function getAllProjectSitemapEntries(): Promise<
  { slug: string; updatedAt: string | null; createdAt: string | null }[]
> {
  const projects = await getProjects("fr");
  const rowsBySlug = new Map(projectRows.map((row) => [row.slug, row]));

  return projects.map((project) => {
    const row = rowsBySlug.get(project.slug);
    return {
      slug: project.slug,
      updatedAt: row?.updated_at ?? null,
      createdAt: row?.created_at ?? null,
    };
  });
}
