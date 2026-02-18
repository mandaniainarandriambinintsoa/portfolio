import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO } from "@/lib/constants";
import type { Locale } from "@/i18n/config";

export default function ServiceJsonLd({
  name,
  description,
  locale,
}: {
  name: string;
  description: string;
  locale: Locale;
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
      }}
    />
  );
}
