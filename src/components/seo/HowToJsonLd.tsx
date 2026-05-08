import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/constants";
import type { Locale } from "@/i18n/config";

type HowToStep = {
  name: string;
  text: string;
};

export default function HowToJsonLd({
  name,
  description,
  steps,
  locale,
  url,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  locale: Locale;
  url?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        inLanguage: locale,
        ...(url ? { url: url.startsWith("http") ? url : `${SITE_URL}${url}` } : {}),
        step: steps.map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      }}
    />
  );
}
