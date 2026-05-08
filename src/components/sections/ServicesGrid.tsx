import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import type { Locale } from "@/i18n/config";

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  slug: string;
  color: string;
};

type LandingLink = {
  label: string;
  href: string;
};

const colorMap: Record<string, { icon: string; border: string }> = {
  indigo: { icon: "text-indigo-400", border: "border-service-indigo" },
  emerald: { icon: "text-emerald-400", border: "border-service-emerald" },
  blue: { icon: "text-blue-400", border: "border-service-blue" },
  purple: { icon: "text-purple-400", border: "border-service-purple" },
};

const landingLinks: Record<Locale, LandingLink[]> = {
  fr: [
    { label: "Expert N8N & Automatisation", href: "/services/automatisation-n8n-madagascar" },
    { label: "Développeur React & Next.js", href: "/services/developpeur-react-nextjs-madagascar" },
    { label: "Next.js + Supabase", href: "/services/developpeur-nextjs-supabase-madagascar" },
  ],
  en: [
    { label: "N8N Automation Expert", href: "/en/services/n8n-automation-expert-madagascar" },
    { label: "React & Next.js Developer", href: "/en/services/hire-react-nextjs-developer-madagascar" },
    { label: "Next.js + Supabase", href: "/en/services/nextjs-supabase-developer-madagascar" },
  ],
};

export default function ServicesGrid({
  items,
  locale,
}: {
  items: ServiceItem[];
  locale: Locale;
}) {
  return (
    <section id="services" aria-label="Services" className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <h2 className="sr-only">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((service) => {
          const colors = colorMap[service.color] || colorMap.indigo;
          return (
            <GlassCard
              key={service.slug}
              borderColor={colors.border}
            >
              <span
                className={`material-symbols-outlined ${colors.icon} mb-4 text-3xl block`}
              >
                {service.icon}
              </span>
              <h3 className="font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-slate-400">{service.description}</p>
            </GlassCard>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {landingLinks[locale].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-400/30 hover:decoration-indigo-300/50"
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </section>
  );
}
