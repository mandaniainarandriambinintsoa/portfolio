import type { Metadata } from "next";
import Image from "next/image";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/data/blog";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BlogPostJsonLd from "@/components/seo/BlogPostJsonLd";
import BlogPostAnim from "@/components/animations/BlogPostAnim";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import Button from "@/components/ui/Button";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of i18n.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) return {};

  const prefix = locale === "fr" ? "" : "/en";
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/blog/${slug}`,
      languages: {
        fr: `${SITE_URL}/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      authors: [post.author],
      ...(post.coverImage
        ? {
            images: [
              {
                url: post.coverImage.startsWith("http")
                  ? post.coverImage
                  : `${SITE_URL}${post.coverImage}`,
                width: 1200,
                height: 675,
                alt: post.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) notFound();

  const prefix = locale === "fr" ? "" : "/en";

  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: "Blog", href: `${prefix}/blog` },
    { name: post.title, href: `${prefix}/blog/${slug}` },
  ];

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(
        locale === "fr" ? "fr-FR" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : null;

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <BlogPostJsonLd
        title={post.title}
        description={post.seoDescription ?? post.excerpt}
        slug={slug}
        locale={locale}
        publishedAt={post.publishedAt}
        author={post.author}
        coverImage={post.coverImage}
      />

      <BlogPostAnim>
        <article className="max-w-3xl mx-auto">
          {/* Cover image */}
          {post.coverImage && (
            <div className="blog-cover relative aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Title */}
          <h1 className="blog-title text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
            <span className="gradient-text">{post.title}</span>
          </h1>

          {/* Meta bar */}
          <div className="blog-meta flex items-center gap-4 flex-wrap mb-10 text-sm text-slate-400">
            {formattedDate && (
              <time dateTime={post.publishedAt ?? undefined} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                {formattedDate}
              </time>
            )}
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">schedule</span>
              {post.readingTime} min {locale === "fr" ? "de lecture" : "read"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">person</span>
              {post.author}
            </span>
          </div>

          {/* Tags */}
          <div className="blog-meta flex gap-2 flex-wrap mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-600/20 border border-indigo-500/30 text-indigo-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Article content */}
          <div className="blog-content">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <Button href={`${prefix}/blog`} variant="glass">
              {locale === "fr" ? "Retour au blog" : "Back to blog"}
            </Button>
          </div>
        </article>
      </BlogPostAnim>
    </main>
  );
}
