import type { Metadata } from "next";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import { getServices } from "@/lib/data/services";
import type { ServiceItem } from "@/lib/types";
import { LegacyIconScoutIcon } from "@/components/icons/IconScoutIcon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;

  const title = locale === "fr"
    ? "Mes services freelance : Développement, IA & Automatisation"
    : "My freelance services: Development, AI & Automation";
  const description = locale === "fr"
    ? "Mes prestations freelance : développement de sites et SaaS, intégration IA, automatisation n8n, scaling cloud. Index complet pour explorer chaque service en détail."
    : "My freelance services: site and SaaS development, AI integration, n8n automation, cloud scaling. Full index to explore each service in detail.";

  const prefix = locale === "fr" ? "" : "/en";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/services`,
      languages: {
        fr: `${SITE_URL}/services`,
        en: `${SITE_URL}/en/services`,
        "x-default": `${SITE_URL}/services`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${prefix}/services`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [{ url: `${SITE_URL}/images/manda-photo2.webp`, width: 288, height: 336, alt: "Manda - Services" }],
    },
  };
}

const colorMap: Record<string, { icon: string; border: string }> = {
  indigo: { icon: "text-indigo-400", border: "border-service-indigo" },
  emerald: { icon: "text-emerald-400", border: "border-service-emerald" },
  blue: { icon: "text-blue-400", border: "border-service-blue" },
  purple: { icon: "text-purple-400", border: "border-service-purple" },
  sky: { icon: "text-sky-400", border: "border-sky-500/30" },
  amber: { icon: "text-amber-400", border: "border-amber-500/30" },
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const services = await getServices(locale);
  const prefix = locale === "fr" ? "" : "/en";

  const coreServices = services.filter((s: ServiceItem) => !s.isLanding);
  const landingPages = services.filter((s: ServiceItem) => s.isLanding);

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
              <Link
                key={service.slug}
                href={`${prefix}/services/${service.slug}`}
                data-ph-event="service_viewed"
                data-ph-props={JSON.stringify({
                  area: "services_index_core",
                  slug: service.slug,
                  title: service.title,
                  href: `${prefix}/services/${service.slug}`,
                  locale,
                })}
              >
                <GlassCard borderColor={colors.border} className="h-full hover:bg-white/5 transition-colors">
                  <LegacyIconScoutIcon
                    name={service.icon}
                    size={34}
                    className={`mb-4 ${colors.icon}`}
                  />
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
                  <Link
                    key={service.slug}
                    href={`${prefix}/services/${service.slug}`}
                    data-ph-event="service_viewed"
                    data-ph-props={JSON.stringify({
                      area: "services_index_landing",
                      slug: service.slug,
                      title: service.cardTitle || service.title,
                      href: `${prefix}/services/${service.slug}`,
                      locale,
                    })}
                  >
                    <GlassCard borderColor={colors.border} className="h-full hover:bg-white/5 transition-colors">
                      <LegacyIconScoutIcon
                        name={service.icon}
                        size={30}
                        className={`mb-3 ${colors.icon}`}
                      />
                      <h3 className="text-lg font-bold mb-2">{service.cardTitle || service.title}</h3>
                      <p className="text-sm text-slate-400">{service.cardDescription || service.description}</p>
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
