import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import { getBlogPosts } from "@/lib/data/blog";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BlogListingClient from "@/components/blog/BlogListingClient";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;

  const title = locale === "fr" ? "Blog" : "Blog";
  const description = locale === "fr"
    ? "Articles techniques sur l'automatisation, le No-Code, l'IA et le développement web."
    : "Technical articles about automation, No-Code, AI and web development.";

  const prefix = locale === "fr" ? "" : "/en";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/blog`,
      languages: {
        fr: `${SITE_URL}/blog`,
        en: `${SITE_URL}/en/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const prefix = locale === "fr" ? "" : "/en";

  const posts = await getBlogPosts(locale);

  // Extract unique tags
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: "Blog", href: `${prefix}/blog` },
  ];

  const labels = {
    all: locale === "fr" ? "Tous" : "All",
    readMore: locale === "fr" ? "Lire" : "Read",
    minRead: locale === "fr" ? "min" : "min",
    noPosts: locale === "fr"
      ? "Aucun article trouvé pour ce filtre."
      : "No posts found for this filter.",
  };

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4">
          <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-lg text-slate-400 mb-12 max-w-2xl">
          {locale === "fr"
            ? "Articles techniques sur l'automatisation, l'IA et le développement web."
            : "Technical articles about automation, AI and web development."}
        </p>
        <BlogListingClient
          posts={posts}
          prefix={prefix}
          allTags={allTags}
          labels={labels}
        />
      </div>
    </main>
  );
}
