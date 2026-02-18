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
        email: `mailto:${PERSONAL_INFO.email}`,
        telephone: PERSONAL_INFO.phone,
        jobTitle: PERSONAL_INFO.jobTitle.en,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Antananarivo",
          addressCountry: "MG",
        },
        sameAs: [
          SOCIAL_LINKS.linkedin,
          SOCIAL_LINKS.github,
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
        ],
      }}
    />
  );
}
