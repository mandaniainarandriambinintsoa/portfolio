import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO } from "@/lib/constants";

type BlogPostJsonLdProps = {
  title: string;
  description: string;
  slug: string;
  locale: string;
  publishedAt: string | null;
  author: string;
  coverImage?: string | null;
};

export default function BlogPostJsonLd({
  title,
  description,
  slug,
  locale,
  publishedAt,
  author,
  coverImage,
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
        author: {
          "@type": "Person",
          name: author,
          jobTitle: PERSONAL_INFO.jobTitle[locale as "fr" | "en"],
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: PERSONAL_INFO.name,
          url: SITE_URL,
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
      }}
    />
  );
}
