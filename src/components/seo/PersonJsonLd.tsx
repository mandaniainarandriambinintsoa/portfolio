import JsonLd from "./JsonLd";
import { SITE_URL, SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/constants";

export default function PersonJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: PERSONAL_INFO.name,
        alternateName: PERSONAL_INFO.shortName,
        url: SITE_URL,
        image: `${SITE_URL}/images/manda-photo2.webp`,
        description:
          "Développeur Full Stack et Architecte IA basé à Antananarivo, Madagascar. Spécialisé en automatisation N8N, développement No-Code/Low-Code et intégration IA.",
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
          name: "Manda — Automatisation & Développement No-Code",
          url: SITE_URL,
        },
        sameAs: [
          SOCIAL_LINKS.linkedin,
          SOCIAL_LINKS.github,
          SOCIAL_LINKS.malt,
        ],
        knowsAbout: [
          "N8N",
          "No-Code Development",
          "AI Integration",
          "Workflow Automation",
          "Bubble",
          "Webflow",
          "Next.js",
          "Claude Code",
          "Supabase",
          "Python",
        ],
      }}
    />
  );
}
