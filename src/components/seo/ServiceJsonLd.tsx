import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO, LANDING_LAST_UPDATED } from "@/lib/constants";
import type { Locale } from "@/i18n/config";

export default function ServiceJsonLd({
  name,
  description,
  locale,
  url,
  dateModified,
}: {
  name: string;
  description: string;
  locale: Locale;
  url: string;
  dateModified?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        serviceType: name,
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
