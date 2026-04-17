import { createServerClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { ProjectItem } from "@/lib/types";

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
  return {
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
  };
}

async function fetchFromSupabase(locale: Locale): Promise<ProjectItem[] | null> {
  try {
    const supabase = await createServerClient();
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
  const dict = await getDictionary(locale);
  return dict.projects.items as ProjectItem[];
}

export async function getProjects(locale: Locale): Promise<ProjectItem[]> {
  const supabaseData = await fetchFromSupabase(locale);
  if (supabaseData) return supabaseData;
  return fetchFromDict(locale);
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale
): Promise<ProjectItem | null> {
  try {
    const supabase = await createServerClient();
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

  const dict = await getDictionary(locale);
  const items = dict.projects.items as ProjectItem[];
  return items.find((p) => p.slug === slug) ?? null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug")
      .eq("published", true);

    if (!error && data && data.length > 0) {
      return data.map((row) => row.slug);
    }
  } catch {
    // fallback
  }

  const dict = await getDictionary("fr");
  return (dict.projects.items as ProjectItem[]).map((p) => p.slug);
}

export async function getAllProjectSitemapEntries(): Promise<
  { slug: string; updatedAt: string | null; createdAt: string | null }[]
> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug, updated_at, created_at")
      .eq("published", true);

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        slug: row.slug,
        updatedAt: row.updated_at,
        createdAt: row.created_at,
      }));
    }
  } catch {
    // fallback
  }
  const dict = await getDictionary("fr");
  return (dict.projects.items as ProjectItem[]).map((p) => ({
    slug: p.slug,
    updatedAt: null,
    createdAt: null,
  }));
}
