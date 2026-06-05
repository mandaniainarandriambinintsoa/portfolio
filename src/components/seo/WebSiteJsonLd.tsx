import JsonLd from "./JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export default function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: ["fr", "en"],
      }}
    />
  );
}
