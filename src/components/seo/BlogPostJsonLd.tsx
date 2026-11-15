import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import type { Locale } from "@/i18n/config";

type BlogPostJsonLdProps = {
  title: string;
  description: string;
  slug: string;
  locale: Locale;
  publishedAt: string | null;
  updatedAt?: string | null;
  author: string;
  coverImage?: string | null;
  wordCount?: number | null;
};

export default function BlogPostJsonLd({
  title,
  description,
  slug,
  locale,
  publishedAt,
  updatedAt,
  author,
  coverImage,
  wordCount,
}: BlogPostJsonLdProps) {
  const prefix = locale === "fr" ? "" : "/en";
  const url = `${SITE_URL}${prefix}/blog/${slug}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url,
        datePublished: publishedAt ?? undefined,
        dateModified: updatedAt ?? publishedAt ?? undefined,
        inLanguage: locale === "fr" ? "fr" : "en",
        ...(wordCount ? { wordCount } : {}),
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: author,
          url: `${SITE_URL}${prefix}/about`,
          jobTitle: PERSONAL_INFO.jobTitle[locale],
          image: `${SITE_URL}/images/manda-photo2.webp`,
          sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
        },
        publisher: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#business`,
          name:
            locale === "fr"
              ? "Manda — Applications métier et automatisation n8n"
              : "Manda — Business applications and n8n automation",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/icon.svg`,
          },
        },
        ...(coverImage
          ? {
              image: coverImage.startsWith("http")
                ? coverImage
                : `${SITE_URL}${coverImage}`,
            }
          : {}),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            "article h1",
            "article > p:first-of-type",
            ".blog-summary",
          ],
        },
      }}
    />
  );
}
