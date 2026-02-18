import { createServerClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { Locale } from "@/i18n/config";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  coverImage: string | null;
  tags: string[];
  author: string;
  readingTime: number;
  publishedAt: string | null;
};

function mapRow(
  row: {
    slug: string;
    title_fr: string;
    title_en: string;
    excerpt_fr: string;
    excerpt_en: string;
    content_fr: string;
    content_en: string;
    seo_title_fr: string | null;
    seo_title_en: string | null;
    seo_description_fr: string | null;
    seo_description_en: string | null;
    cover_image: string | null;
    tags: string[];
    author: string;
    reading_time: number;
    published_at: string | null;
  },
  locale: Locale
): BlogPost {
  return {
    slug: row.slug,
    title: locale === "fr" ? row.title_fr : row.title_en,
    excerpt: locale === "fr" ? row.excerpt_fr : row.excerpt_en,
    content: locale === "fr" ? row.content_fr : row.content_en,
    seoTitle: locale === "fr" ? row.seo_title_fr : row.seo_title_en,
    seoDescription: locale === "fr" ? row.seo_description_fr : row.seo_description_en,
    coverImage: row.cover_image,
    tags: row.tags,
    author: row.author,
    readingTime: row.reading_time,
    publishedAt: row.published_at,
  };
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return (data ?? []).map((row) => mapRow(row, locale));
}

export async function getBlogPostBySlug(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return mapRow(data, locale);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  if (error) return [];
  return (data ?? []).map((row) => row.slug);
}
