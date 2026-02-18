import type { Metadata } from "next";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;

  const title = locale === "fr"
    ? "Services | Développeur No-Code & Automatisation Madagascar — Manda"
    : "Services | No-Code Developer & Automation Madagascar — Manda";
  const description = locale === "fr"
    ? "Découvrez mes services : automatisation N8N, développement No-Code et Low-Code, intégration IA, architecture scalable. Basé à Madagascar, qualité internationale."
    : "Discover my services: N8N automation, No-Code and Low-Code development, AI integration, scalable architecture. Based in Madagascar, international quality.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${locale === "fr" ? "/services" : "/en/services"}`,
      languages: {
        fr: `${SITE_URL}/services`,
        en: `${SITE_URL}/en/services`,
      },
    },
  };
}

const colorMap: Record<string, { icon: string; border: string }> = {
  indigo: { icon: "text-indigo-400", border: "border-service-indigo" },
  emerald: { icon: "text-emerald-400", border: "border-service-emerald" },
  blue: { icon: "text-blue-400", border: "border-service-blue" },
  purple: { icon: "text-purple-400", border: "border-service-purple" },
};

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  slug: string;
  color: string;
  isLanding?: boolean;
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const prefix = locale === "fr" ? "" : "/en";

  const coreServices = dict.services.items.filter((s: ServiceItem) => !s.isLanding);
  const landingPages = dict.services.items.filter((s: ServiceItem) => s.isLanding);

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 gradient-text">
          {dict.services.title}
        </h1>
        <p className="text-xl text-slate-400 mb-16 max-w-2xl">
          {locale === "fr"
            ? "Automatisation, développement et intelligence artificielle — tout ce qu'il faut pour digitaliser votre business."
            : "Automation, development and artificial intelligence — everything you need to digitalize your business."}
        </p>

        {/* Core services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {coreServices.map((service: ServiceItem) => {
            const colors = colorMap[service.color] || colorMap.indigo;
            return (
              <Link key={service.slug} href={`${prefix}/services/${service.slug}`}>
                <GlassCard borderColor={colors.border} className="h-full hover:bg-white/5 transition-colors">
                  <span className={`material-symbols-outlined ${colors.icon} mb-4 text-4xl block`}>
                    {service.icon}
                  </span>
                  <h2 className="text-xl font-bold mb-3">{service.title}</h2>
                  <p className="text-slate-400">{service.description}</p>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        {/* Landing pages - local expertise */}
        {landingPages.length > 0 && (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4">
              {locale === "fr" ? "Expertise locale" : "Local expertise"}
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl">
              {locale === "fr"
                ? "Services spécialisés depuis Madagascar — tarifs compétitifs, qualité internationale."
                : "Specialized services from Madagascar — competitive rates, international quality."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {landingPages.map((service: ServiceItem) => {
                const colors = colorMap[service.color] || colorMap.indigo;
                return (
                  <Link key={service.slug} href={`${prefix}/services/${service.slug}`}>
                    <GlassCard borderColor={colors.border} className="h-full hover:bg-white/5 transition-colors">
                      <span className={`material-symbols-outlined ${colors.icon} mb-3 text-3xl block`}>
                        {service.icon}
                      </span>
                      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                      <p className="text-sm text-slate-400">{service.description}</p>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
