import JsonLd from "./JsonLd";
import { SITE_URL, PERSONAL_INFO } from "@/lib/constants";

type CreativeWorkJsonLdProps = {
  name: string;
  description: string;
  image: string;
  url: string;
  datePublished?: string;
  keywords?: string[];
};

export default function CreativeWorkJsonLd({
  name,
  description,
  image,
  url,
  datePublished,
  keywords,
}: CreativeWorkJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name,
        description,
        image: `${SITE_URL}${image}`,
        url: `${SITE_URL}${url}`,
        creator: {
          "@type": "Person",
          name: PERSONAL_INFO.name,
          url: SITE_URL,
        },
        ...(datePublished && { datePublished }),
        ...(keywords?.length && { keywords: keywords.join(", ") }),
      }}
    />
  );
}
