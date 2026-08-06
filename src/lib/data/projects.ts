import { createStaticClient } from "@/lib/supabase/static";
import { unstable_cache } from "next/cache";
import type { Locale } from "@/i18n/config";
import { getStaticDictionary } from "@/i18n/dictionaries";
import type { ProjectItem } from "@/lib/types";
import { isPayloadRemoteContentEnabled, isPayloadSitemapEnabled } from "@/lib/content-mode";
import {
  getPayloadProjectBySlug,
  getPayloadProjects,
  getPayloadProjectSitemapEntries,
} from "./payload-content";

type PreviewReadOptions = {
  draft?: boolean;
};

const siteMetierSlugs = new Set(["madavoyage", "garagiste", "bati-diaspora"]);
const codeOwnedProjectSlugs = new Set(["geo-seo-boost"]);

function normalizeCategory(project: ProjectItem): ProjectItem {
  if (!siteMetierSlugs.has(project.slug)) {
    return project;
  }

  return {
    ...project,
    category: "site-metier",
  };
}

function mapRow(
  row: {
    slug: string;
    title_fr: string;
    title_en: string;
    subtitle_fr: string;
    subtitle_en: string;
    description_fr: string;
    description_en: string;
    tags: string[];
    link: string | null;
    featured: boolean;
    category: string;
    image: string;
    workflow_file: string | null;
  },
  locale: Locale
): ProjectItem {
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

async function fetchFromSupabase(locale: Locale): Promise<ProjectItem[] | null> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return null;
    return data.map((row) => mapRow(row, locale));
  } catch {
    return null;
  }
}

async function fetchFromDict(locale: Locale): Promise<ProjectItem[]> {
  const dict = await getStaticDictionary(locale);
  return (dict.projects.items as ProjectItem[]).map(normalizeCategory);
}

function mergeCodeOwnedProjects(
  remoteProjects: ProjectItem[],
  dictionaryProjects: ProjectItem[]
): ProjectItem[] {
  const remoteSlugs = new Set(remoteProjects.map((project) => project.slug));
  const additions = dictionaryProjects.filter(
    (project) => codeOwnedProjectSlugs.has(project.slug) && !remoteSlugs.has(project.slug)
  );

  return [...additions, ...remoteProjects];
}

async function getProjectsUncached(locale: Locale, options?: PreviewReadOptions): Promise<ProjectItem[]> {
  if (!isPayloadRemoteContentEnabled()) {
    return fetchFromDict(locale);
  }

  const payloadData = await getPayloadProjects(locale, options);
  if (payloadData?.length) {
    const dictData = await fetchFromDict(locale);
    return mergeCodeOwnedProjects(payloadData, dictData);
  }

  const supabaseData = await fetchFromSupabase(locale);
  const dictData = await fetchFromDict(locale);

  if (!supabaseData) return dictData;

  const supabaseSlugs = new Set(supabaseData.map((p) => p.slug));
  const dictOnly = dictData.filter((p) => !supabaseSlugs.has(p.slug));
  const featuredDictOnly = dictOnly.filter((p) => p.featured);
  const restDictOnly = dictOnly.filter((p) => !p.featured);
  return [...featuredDictOnly, ...supabaseData, ...restDictOnly];
}

const getCachedProjects = unstable_cache(
  (locale: Locale) => getProjectsUncached(locale),
  ["public-projects"],
  { revalidate: 3600, tags: ["payload-projects"] }
);

export async function getProjects(locale: Locale, options?: PreviewReadOptions): Promise<ProjectItem[]> {
  return options?.draft ? getProjectsUncached(locale, options) : getCachedProjects(locale);
}

async function getProjectBySlugUncached(
  slug: string,
  locale: Locale,
  options?: PreviewReadOptions
): Promise<ProjectItem | null> {
  if (!isPayloadRemoteContentEnabled()) {
    const projects = await fetchFromDict(locale);
    return projects.find((project) => project.slug === slug) ?? null;
  }

  const payloadProject = await getPayloadProjectBySlug(slug, locale, options);
  if (payloadProject) return payloadProject;

  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!error && data) return mapRow(data, locale);
  } catch {
    // fallback to dict
  }

  const dict = await getStaticDictionary(locale);
  const items = (dict.projects.items as ProjectItem[]).map(normalizeCategory);
  return items.find((p) => p.slug === slug) ?? null;
}

const getCachedProjectBySlug = unstable_cache(
  (slug: string, locale: Locale) => getProjectBySlugUncached(slug, locale),
  ["public-project-by-slug"],
  { revalidate: 3600, tags: ["payload-projects"] }
);

export async function getProjectBySlug(
  slug: string,
  locale: Locale,
  options?: PreviewReadOptions
): Promise<ProjectItem | null> {
  return options?.draft
    ? getProjectBySlugUncached(slug, locale, options)
    : getCachedProjectBySlug(slug, locale);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const dict = await getStaticDictionary("fr");
  const dictSlugs = (dict.projects.items as ProjectItem[]).map((p) => p.slug);

  const payloadEntries = isPayloadSitemapEnabled()
    ? await getPayloadProjectSitemapEntries()
    : null;
  if (payloadEntries?.length) {
    return Array.from(new Set([...payloadEntries.map((entry) => entry.slug), ...dictSlugs]));
  }

  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug")
      .eq("published", true);

    if (!error && data && data.length > 0) {
      const supabaseSlugs = data.map((row) => row.slug);
      return Array.from(new Set([...supabaseSlugs, ...dictSlugs]));
    }
  } catch {
    // fallback
  }

  return dictSlugs;
}

export async function getAllProjectSitemapEntries(): Promise<
  { slug: string; updatedAt: string | null; createdAt: string | null }[]
> {
  const dict = await getStaticDictionary("fr");
  const dictEntries = (dict.projects.items as ProjectItem[]).map((p) => ({
    slug: p.slug,
    updatedAt: null as string | null,
    createdAt: null as string | null,
  }));

  const payloadEntries = isPayloadSitemapEnabled()
    ? await getPayloadProjectSitemapEntries()
    : null;
  if (payloadEntries?.length) {
    const payloadSlugs = new Set(payloadEntries.map((e) => e.slug));
    const dictOnly = dictEntries.filter((e) => !payloadSlugs.has(e.slug));
    return [...payloadEntries, ...dictOnly];
  }

  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug, updated_at, created_at")
      .eq("published", true);

    if (!error && data && data.length > 0) {
      const supabaseEntries = data.map((row) => ({
        slug: row.slug,
        updatedAt: row.updated_at,
        createdAt: row.created_at,
      }));
      const supabaseSlugs = new Set(supabaseEntries.map((e) => e.slug));
      const dictOnly = dictEntries.filter((e) => !supabaseSlugs.has(e.slug));
      return [...supabaseEntries, ...dictOnly];
    }
  } catch {
    // fallback
  }

  return dictEntries;
}
