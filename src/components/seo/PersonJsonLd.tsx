import JsonLd from "./JsonLd";
import { SITE_URL, SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/constants";

export default function PersonJsonLd() {
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
        description:
          "Développeur Full Stack et Architecte IA basé à Antananarivo, Madagascar. Applications métier, SaaS, API, automatisation n8n et intégration IA.",
        email: `mailto:${PERSONAL_INFO.email}`,
        telephone: PERSONAL_INFO.phone,
        jobTitle: PERSONAL_INFO.jobTitle.en,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Antananarivo",
          addressRegion: "Analamanga",
          addressCountry: "MG",
        },
        worksFor: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#business`,
          name: "Manda — Applications métier, IA et automatisation",
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
