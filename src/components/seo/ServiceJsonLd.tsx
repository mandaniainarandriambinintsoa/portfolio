import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO, LANDING_LAST_UPDATED } from "@/lib/constants";
import type { Locale } from "@/i18n/config";

export default function ServiceJsonLd({
  name,
  description,
  locale,
  dateModified,
}: {
  name: string;
  description: string;
  locale: Locale;
  dateModified?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
          "@type": "Person",
          name: PERSONAL_INFO.name,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        inLanguage: locale,
        dateModified: dateModified ?? LANDING_LAST_UPDATED,
      }}
    />
  );
}
