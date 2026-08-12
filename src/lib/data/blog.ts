import type { Locale } from "@/i18n/config";
import blogPosts from "@/content/blog-posts.json";

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

type BlogPostRow = (typeof blogPosts)[number];

function mapRow(row: BlogPostRow, locale: Locale): BlogPost {
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

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  return blogPosts.map((post) => mapRow(post, locale));
}

export async function getBlogPostBySlug(
  slug: string,
  locale: Locale
): Promise<BlogPost | null> {
  const post = blogPosts.find((entry) => entry.slug === slug);
  return post ? mapRow(post, locale) : null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return blogPosts.map((post) => post.slug);
}

export async function getAllBlogSitemapEntries(): Promise<
  { slug: string; updatedAt: string | null; publishedAt: string | null }[]
> {
  return blogPosts.map((post) => ({
    slug: post.slug,
    updatedAt: post.updated_at,
    publishedAt: post.published_at,
  }));
}
