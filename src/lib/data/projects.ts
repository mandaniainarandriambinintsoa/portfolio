import type { Locale } from "@/i18n/config";
import { getStaticDictionary } from "@/i18n/dictionaries";
import type { ProjectItem } from "@/lib/types";

const siteMetierSlugs = new Set(["madavoyage", "garagiste", "bati-diaspora"]);

function normalizeCategory(project: ProjectItem): ProjectItem {
  return siteMetierSlugs.has(project.slug)
    ? { ...project, category: "site-metier" }
    : project;
}

async function getDictionaryProjects(locale: Locale): Promise<ProjectItem[]> {
  const dict = await getStaticDictionary(locale);
  return (dict.projects.items as ProjectItem[]).map(normalizeCategory);
}

export async function getProjects(locale: Locale): Promise<ProjectItem[]> {
  return getDictionaryProjects(locale);
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale
): Promise<ProjectItem | null> {
  const projects = await getDictionaryProjects(locale);
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getDictionaryProjects("fr");
  return projects.map((project) => project.slug);
}

export async function getAllProjectSitemapEntries(): Promise<
  { slug: string; updatedAt: string | null; createdAt: string | null }[]
> {
  const projects = await getDictionaryProjects("fr");
  return projects.map((project) => ({
    slug: project.slug,
    updatedAt: null,
    createdAt: null,
  }));
}
