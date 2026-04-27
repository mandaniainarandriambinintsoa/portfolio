import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

export default function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Manda — Automatisation & Développement No-Code",
        legalName: PERSONAL_INFO.legalName,
        alternateName: "Manda Dev",
        url: SITE_URL,
        telephone: PERSONAL_INFO.phone,
        email: PERSONAL_INFO.email,
        description:
          "Expert en automatisation N8N, développement No-Code (Bubble, Webflow) et Low-Code (Next.js, Supabase) basé à Antananarivo, Madagascar. Applications sur mesure et workflows intelligents pour entreprises françaises et internationales.",
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
        sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SOCIAL_LINKS.malt],
        knowsAbout: [
          "N8N Automation",
          "No-Code Development",
          "Low-Code Development",
          "Bubble.io",
          "Webflow",
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
                name: "Développement No-Code",
                description:
                  "Applications Bubble et sites Webflow pour entreprises",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Automatisation N8N",
                description:
                  "Workflows d'automatisation sur mesure avec N8N",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Développement Low-Code",
                description:
                  "Applications Next.js et Supabase avec IA intégrée",
              },
            },
          ],
        },
      }}
    />
  );
}
