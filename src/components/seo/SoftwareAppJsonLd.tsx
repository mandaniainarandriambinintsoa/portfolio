import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO } from "@/lib/constants";

type SoftwareAppJsonLdProps = {
  name: string;
  description: string;
  image: string;
  url: string;
  keywords?: string[];
  category?: "webapp" | "workflow";
};

export default function SoftwareAppJsonLd({
  name,
  description,
  image,
  url,
  keywords,
  category = "webapp",
}: SoftwareAppJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": category === "webapp" ? "WebApplication" : "SoftwareApplication",
        name,
        description,
        image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
        url: `${SITE_URL}${url}`,
        applicationCategory: category === "webapp" ? "BusinessApplication" : "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          availability: "https://schema.org/OnlineOnly",
        },
        author: {
          "@type": "Person",
          name: PERSONAL_INFO.name,
          url: SITE_URL,
        },
        ...(keywords?.length && { keywords: keywords.join(", ") }),
      }}
    />
  );
}
