import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of i18n.locales) {
    const dict = await getDictionary(locale);
    for (const service of dict.services.items) {
      params.push({ locale, slug: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const service = dict.services.items.find((s: { slug: string }) => s.slug === slug);

  if (!service) return {};

  const prefix = locale === "fr" ? "" : "/en";
  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/services/${slug}`,
      languages: {
        fr: `${SITE_URL}/services/${dict.services.items.find((s: { color: string }) => s.color === service.color)?.slug || slug}`,
        en: `${SITE_URL}/en/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const service = dict.services.items.find((s: { slug: string }) => s.slug === slug);

  if (!service) notFound();

  const prefix = locale === "fr" ? "" : "/en";
  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: "Services", href: `${prefix}/services` },
    { name: service.title, href: `${prefix}/services/${slug}` },
  ];

  const contactHref = locale === "fr" ? "/contact" : "/en/contact";

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <ServiceJsonLd name={service.title} description={service.description} locale={locale} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="max-w-4xl mx-auto">
        <span className={`material-symbols-outlined text-5xl mb-6 block ${
          service.color === "indigo" ? "text-indigo-400" :
          service.color === "emerald" ? "text-emerald-400" :
          service.color === "blue" ? "text-blue-400" : "text-purple-400"
        }`}>
          {service.icon}
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 gradient-text">
          {service.title}
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl">
          {service.description}
        </p>
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <p className="text-slate-300 leading-relaxed">
            {service.description}
          </p>
        </div>
        <Button href={contactHref} variant="primary" icon="trending_up">
          {dict.hero.cta_primary}
        </Button>
      </div>
    </main>
  );
}
