import { createStaticClient } from "@/lib/supabase/static";
import { unstable_cache } from "next/cache";
import type { Locale } from "@/i18n/config";
import { isPayloadSitemapEnabled } from "@/lib/content-mode";
import {
  getPayloadPostBySlug,
  getPayloadPosts,
  getPayloadPostSitemapEntries,
} from "./payload-content";

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
  updatedAt: string | null;
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
    updated_at: string | null;
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
    updatedAt: row.updated_at,
  };
}

async function getBlogPostsUncached(locale: Locale): Promise<BlogPost[]> {
  const payloadPosts = await getPayloadPosts(locale);
  if (payloadPosts) return payloadPosts;

  const supabase = createStaticClient();
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

const getCachedBlogPosts = unstable_cache(
  getBlogPostsUncached,
  ["public-blog-posts"],
  { revalidate: 3600, tags: ["payload-posts"] }
);

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  return getCachedBlogPosts(locale);
}

async function getBlogPostBySlugUncached(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  const payloadPost = await getPayloadPostBySlug(slug, locale);
  if (payloadPost) return payloadPost;

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return mapRow(data, locale);
}

const getCachedBlogPostBySlug = unstable_cache(
  getBlogPostBySlugUncached,
  ["public-blog-post-by-slug"],
  { revalidate: 3600, tags: ["payload-posts"] }
);

export async function getBlogPostBySlug(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  return getCachedBlogPostBySlug(slug, locale);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const payloadEntries = isPayloadSitemapEnabled()
    ? await getPayloadPostSitemapEntries()
    : null;
  if (payloadEntries?.length) return payloadEntries.map((entry) => entry.slug);

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  if (error) return [];
  return (data ?? []).map((row) => row.slug);
}

export async function getAllBlogSitemapEntries(): Promise<
  { slug: string; updatedAt: string | null; publishedAt: string | null }[]
> {
  const payloadEntries = isPayloadSitemapEnabled()
    ? await getPayloadPostSitemapEntries()
    : null;
  if (payloadEntries?.length) return payloadEntries;

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at, published_at")
    .eq("published", true);

  if (error) return [];
  return (data ?? []).map((row) => ({
    slug: row.slug,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  }));
}
