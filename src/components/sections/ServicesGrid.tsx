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
    { label: "Développeur No-Code Madagascar", href: "/services/developpeur-no-code-madagascar" },
    { label: "Expert N8N & Automatisation", href: "/services/automatisation-n8n-madagascar" },
    { label: "Développeur Low-Code Madagascar", href: "/services/developpeur-low-code-madagascar" },
    { label: "Développeur React & Next.js", href: "/services/developpeur-react-nextjs-madagascar" },
    { label: "Next.js + Supabase", href: "/services/developpeur-nextjs-supabase-madagascar" },
    { label: "Développeur Python IA Madagascar", href: "/services/developpeur-python-ia-madagascar" },
  ],
  en: [
    { label: "No-Code Developer Madagascar", href: "/en/services/no-code-developer-madagascar" },
    { label: "N8N Automation Expert", href: "/en/services/n8n-automation-expert-madagascar" },
    { label: "Low-Code Developer Madagascar", href: "/en/services/low-code-developer-madagascar" },
    { label: "React & Next.js Developer", href: "/en/services/hire-react-nextjs-developer-madagascar" },
    { label: "Next.js + Supabase", href: "/en/services/nextjs-supabase-developer-madagascar" },
    { label: "Python AI Developer Madagascar", href: "/en/services/python-ai-developer-madagascar" },
  ],
};

const sectionLabel: Record<Locale, string> = {
  fr: "Pages dédiées par expertise",
  en: "Dedicated pages by expertise",
};

export default async function ServicesGrid({ locale }: { locale: Locale }) {
  const services = await getServices(locale);
  const prefix = locale === "fr" ? "" : "/en";
  const links = services
    .filter((service) => service.isLanding)
    .slice(0, 6)
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
