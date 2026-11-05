import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

export default function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: "Manda — Applications métier et automatisation n8n",
        legalName: PERSONAL_INFO.legalName,
        alternateName: "Manda Dev",
        url: SITE_URL,
        telephone: PERSONAL_INFO.phone,
        email: PERSONAL_INFO.email,
        description:
          "Développeur d’applications métier et consultant n8n basé à Antananarivo, Madagascar. SaaS, outils internes, API et workflows documentés pour PME et agences francophones.",
        image: `${SITE_URL}/images/manda-photo2.webp`,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: PERSONAL_INFO.legalAddress.street,
          addressLocality: PERSONAL_INFO.legalAddress.city,
          addressRegion: PERSONAL_INFO.legalAddress.region,
          postalCode: PERSONAL_INFO.legalAddress.postalCode,
          addressCountry: PERSONAL_INFO.legalAddress.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -18.8792,
          longitude: 47.5079,
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Madagascar",
          },
          {
            "@type": "Country",
            name: "France",
          },
          {
            "@type": "Country",
            name: "United States",
          },
        ],
        founder: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: PERSONAL_INFO.name,
          url: SITE_URL,
        },
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon.svg`,
          width: 512,
          height: 512,
        },
        foundingDate: "2023-01-01",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PERSONAL_INFO.phone,
          email: PERSONAL_INFO.email,
          contactType: "customer service",
          availableLanguage: ["French", "English"],
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
          "N8N Automation",
          "Business application development",
          "API integration",
          "Node.js",
          "PostgreSQL",
          "Next.js",
          "Supabase",
          "AI Integration",
          "Claude Code",
          "Workflow Automation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Applications métier et SaaS",
                description:
                  "Applications Next.js, API et bases de données pour entreprises",
                url: "https://manda-ia.com/services/developpeur-javascript-madagascar",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Conseil et automatisation n8n",
                description:
                  "Workflows métier, intégrations API, contrôles et documentation avec n8n",
                url: "https://manda-ia.com/services/automatisation-n8n-madagascar",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Renfort technique pour agence IA",
                description:
                  "Développement en marque blanche de lots Next.js, API, n8n, RAG et agents IA",
                url: "https://manda-ia.com/services/renfort-technique-agence-ia",
              },
            },
          ],
        },
      }}
    />
  );
}
