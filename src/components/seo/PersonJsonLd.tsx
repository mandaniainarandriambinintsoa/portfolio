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
          "Développeur d’applications métier et consultant n8n basé à Antananarivo, Madagascar. SaaS, outils internes, API et automatisations fiables.",
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
          name: "Manda — Applications métier et automatisation n8n",
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
