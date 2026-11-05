import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getServices } from "@/lib/data/services";
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";

type LandingLink = {
  label: string;
  href: string;
};

const landingLinks: Record<Locale, LandingLink[]> = {
  fr: [
    { label: "Applications métier & SaaS", href: "/services/developpeur-javascript-madagascar" },
    { label: "Consultant n8n freelance", href: "/services/automatisation-n8n-madagascar" },
    { label: "Renfort pour agence IA", href: "/services/renfort-technique-agence-ia" },
  ],
  en: [
    { label: "Business apps & SaaS", href: "/en/services/javascript-developer-madagascar" },
    { label: "Freelance n8n consultant", href: "/en/services/n8n-automation-expert-madagascar" },
    { label: "AI agency delivery partner", href: "/en/services/white-label-ai-development-partner" },
  ],
};

const sectionLabel: Record<Locale, string> = {
  fr: "Trois offres pour passer du besoin à la production",
  en: "Three offers from business need to production",
};

const priorityServiceKeys = [
  "developpeur-javascript-madagascar",
  "automatisation-n8n-madagascar",
  "agency-ai-technical-partner",
];

export default async function ServicesGrid({ locale }: { locale: Locale }) {
  const services = await getServices(locale);
  const prefix = locale === "fr" ? "" : "/en";
  const landingServicesByKey = new Map(
    services.filter((service) => service.isLanding).map((service) => [service.key, service]),
  );
  const links = priorityServiceKeys
    .map((key) => landingServicesByKey.get(key))
    .filter((service) => service !== undefined)
    .map((service) => ({
      href: `${prefix}/services/${service.slug}`,
      label: service.cardTitle || service.title,
    }));

  return (
    <section id="services" aria-label={sectionLabel[locale]} className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <SectionHeading title={sectionLabel[locale]} />
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {(links.length ? links : landingLinks[locale]).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            data-ph-event="service_viewed"
            data-ph-props={JSON.stringify({
              area: "homepage_services_grid",
              label: link.label,
              href: link.href,
              locale,
            })}
            className="inline-flex items-center gap-1.5 text-sm text-indigo-300 transition-colors hover:text-white"
          >
            {link.label}
            <IconScoutIcon name="arrowRight" size={16} />
          </Link>
        ))}
      </div>
    </section>
  );
}
