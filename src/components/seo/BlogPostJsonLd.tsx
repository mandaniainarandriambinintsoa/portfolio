import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

type BlogPostJsonLdProps = {
  title: string;
  description: string;
  slug: string;
  locale: string;
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
          name: author,
          url: `${SITE_URL}${prefix}/about`,
          jobTitle: PERSONAL_INFO.jobTitle[locale as "fr" | "en"],
          image: `${SITE_URL}/images/manda-photo2.webp`,
          sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
        },
        publisher: {
          "@type": "ProfessionalService",
          name: "Manda — Automatisation & Développement No-Code",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/favicon.svg`,
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
          cssSelector: ["article h1", "article > p:first-of-type", ".blog-summary"],
        },
      }}
    />
  );
}
