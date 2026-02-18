import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/constants";

type BreadcrumbItem = {
  name: string;
  href: string;
};

export default function BreadcrumbJsonLd({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.href}`,
        })),
      }}
    />
  );
}
