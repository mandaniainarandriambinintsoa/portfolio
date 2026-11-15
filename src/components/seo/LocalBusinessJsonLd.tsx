import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import type { Locale } from "@/i18n/config";

const localizedContent = {
  fr: {
    name: "Manda — Applications métier et automatisation n8n",
    description:
      "Développeur d’applications métier et consultant n8n basé à Antananarivo, Madagascar. SaaS, outils internes, API et workflows documentés pour PME et agences francophones.",
    catalogName: "Services",
    offers: [
      {
        name: "Applications métier et SaaS",
        description:
          "Applications Next.js, API et bases de données pour entreprises",
        url: `${SITE_URL}/services/developpeur-javascript-madagascar`,
      },
      {
        name: "Conseil et automatisation n8n",
        description:
          "Workflows métier, intégrations API, contrôles et documentation avec n8n",
        url: `${SITE_URL}/services/automatisation-n8n-madagascar`,
      },
      {
        name: "Renfort technique pour agence IA",
        description:
          "Développement en marque blanche de lots Next.js, API, n8n, RAG et agents IA",
        url: `${SITE_URL}/services/renfort-technique-agence-ia`,
      },
    ],
  },
  en: {
    name: "Manda — Business applications and n8n automation",
    description:
      "Business application developer and n8n consultant based in Antananarivo, Madagascar. Documented SaaS products, internal tools, APIs and workflows for companies and agencies.",
    catalogName: "Services",
    offers: [
      {
        name: "Business applications and SaaS",
        description:
          "Next.js applications, APIs and databases for companies",
        url: `${SITE_URL}/en/services/javascript-developer-madagascar`,
      },
      {
        name: "n8n consulting and automation",
        description:
          "Business workflows, API integrations, controls and n8n documentation",
        url: `${SITE_URL}/en/services/n8n-automation-expert-madagascar`,
      },
      {
        name: "Technical delivery support for AI agencies",
        description:
          "White-label delivery of Next.js, API, n8n, RAG and AI agent workstreams",
        url: `${SITE_URL}/en/services/white-label-ai-development-partner`,
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    name: string;
    description: string;
    catalogName: string;
    offers: { name: string; description: string; url: string }[];
  }
>;

export default function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const content = localizedContent[locale];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: content.name,
        legalName: PERSONAL_INFO.legalName,
        alternateName: "Manda Dev",
        url: SITE_URL,
        telephone: PERSONAL_INFO.phone,
        email: PERSONAL_INFO.email,
        description: content.description,
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
          url: `${SITE_URL}/icon.svg`,
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
          name: content.catalogName,
          itemListElement: content.offers.map((offer) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              ...offer,
            },
          })),
        },
      }}
    />
  );
}
