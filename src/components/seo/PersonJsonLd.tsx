import JsonLd from "./JsonLd";
import { SITE_URL, SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/constants";
import type { Locale } from "@/i18n/config";

const localizedContent: Record<
  Locale,
  { description: string; businessName: string }
> = {
  fr: {
    description:
      "Développeur d’applications métier et consultant n8n basé à Antananarivo, Madagascar. SaaS, outils internes, API et automatisations fiables.",
    businessName: "Manda — Applications métier et automatisation n8n",
  },
  en: {
    description:
      "Business application developer and n8n consultant based in Antananarivo, Madagascar. SaaS products, internal tools, APIs and reliable automation.",
    businessName: "Manda — Business applications and n8n automation",
  },
};

export default function PersonJsonLd({ locale }: { locale: Locale }) {
  const content = localizedContent[locale];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSONAL_INFO.name,
        alternateName: PERSONAL_INFO.shortName,
        url: SITE_URL,
        image: `${SITE_URL}/images/manda-photo2.webp`,
        description: content.description,
        email: `mailto:${PERSONAL_INFO.email}`,
        telephone: PERSONAL_INFO.phone,
        jobTitle: PERSONAL_INFO.jobTitle[locale],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Antananarivo",
          addressRegion: "Analamanga",
          addressCountry: "MG",
        },
        worksFor: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#business`,
          name: content.businessName,
          url: SITE_URL,
        },
        sameAs: [
          SOCIAL_LINKS.linkedin,
          SOCIAL_LINKS.github,
          SOCIAL_LINKS.malt,
          SOCIAL_LINKS.wikidata,
          SOCIAL_LINKS.youtube,
          SOCIAL_LINKS.tiktok,
        ],
        knowsAbout: [
          "N8N",
          "Business application development",
          "AI Integration",
          "Workflow Automation",
          "RAG",
          "PostgreSQL",
          "Next.js",
          "Claude Code",
          "Supabase",
          "Python",
        ],
      }}
    />
  );
}
