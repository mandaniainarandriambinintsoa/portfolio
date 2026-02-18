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

  const title = locale === "fr" ? "Services" : "Services";
  const description = locale === "fr"
    ? "Découvrez mes services : automatisation N8N, développement No-Code, intégration IA, architecture scalable."
    : "Discover my services: N8N automation, No-Code development, AI integration, scalable architecture.";

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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const prefix = locale === "fr" ? "" : "/en";

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-16 gradient-text">
          {dict.services.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dict.services.items.map((service: { icon: string; title: string; description: string; slug: string; color: string }) => {
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
      </div>
    </main>
  );
}
