import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FAQJsonLd from "@/components/seo/FAQJsonLd";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";

/* eslint-disable @typescript-eslint/no-explicit-any */

function renderInlineMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

    const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity;
    const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;

    if (linkIdx === Infinity && boldIdx === Infinity) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (linkIdx <= boldIdx && linkMatch) {
      if (linkIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, linkIdx)}</span>);
      parts.push(
        <Link key={key++} href={linkMatch[2]} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
          {linkMatch[1]}
        </Link>
      );
      remaining = remaining.slice(linkIdx + linkMatch[0].length);
    } else if (boldMatch) {
      if (boldIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, boldIdx)}</span>);
      parts.push(<strong key={key++} className="text-white font-semibold">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldIdx + boldMatch[0].length);
    }
  }

  return parts;
}

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
  const service = dict.services.items.find((s: any) => s.slug === slug);

  if (!service) return {};

  const prefix = locale === "fr" ? "" : "/en";
  const otherLocale = locale === "fr" ? "en" : "fr";
  const otherDict = await getDictionary(otherLocale as Locale);
  // Match FR/EN services by array index — both dicts keep items in the same order.
  // Matching by color+isLanding is unreliable (emerald has two landing pages).
  const currentIndex = (dict.services.items as any[]).findIndex((s: any) => s.slug === slug);
  const otherService =
    currentIndex >= 0 ? (otherDict.services.items as any[])[currentIndex] : undefined;

  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/services/${slug}`,
      languages: {
        fr: locale === "fr"
          ? `${SITE_URL}/services/${slug}`
          : `${SITE_URL}/services/${otherService?.slug || slug}`,
        en: locale === "en"
          ? `${SITE_URL}/en/services/${slug}`
          : `${SITE_URL}/en/services/${otherService?.slug || slug}`,
        "x-default": locale === "fr"
          ? `${SITE_URL}/services/${slug}`
          : `${SITE_URL}/services/${otherService?.slug || slug}`,
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
  const service: any = dict.services.items.find((s: any) => s.slug === slug);

  if (!service) notFound();

  const prefix = locale === "fr" ? "" : "/en";
  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: "Services", href: `${prefix}/services` },
    { name: service.title, href: `${prefix}/services/${slug}` },
  ];

  const contactHref = locale === "fr" ? "/contact" : "/en/contact";
  const isLanding = !!service.isLanding && !!service.landing;

  const colorMap: Record<string, string> = {
    indigo: "text-indigo-400",
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };

  const bgColorMap: Record<string, string> = {
    indigo: "bg-indigo-500/10 border-indigo-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20",
    blue: "bg-blue-500/10 border-blue-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
  };

  if (!isLanding) {
    return (
      <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
        <ServiceJsonLd name={service.title} description={service.description} locale={locale} />
        <BreadcrumbJsonLd items={breadcrumbs} />
        <div className="max-w-4xl mx-auto">
          <span className={`material-symbols-outlined text-5xl mb-6 block ${colorMap[service.color] || "text-indigo-400"}`}>
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

  const landing = service.landing;

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <ServiceJsonLd name={service.title} description={service.description} locale={locale} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      {landing.faq && <FAQJsonLd items={landing.faq} />}

      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="mb-20">
          <span className={`material-symbols-outlined text-5xl mb-6 block ${colorMap[service.color] || "text-indigo-400"}`}>
            {service.icon}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
            {landing.heroText}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={contactHref} variant="primary" icon="trending_up">
              {dict.hero.cta_primary}
            </Button>
          </div>

          {/* Hero image */}
          {landing.heroImage && (
            <div className="mt-12 relative aspect-video rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={landing.heroImage.src}
                alt={landing.heroImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Features grid */}
        {landing.features && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
            {landing.features.map((f: any) => (
              <div key={f.title} className={`rounded-xl border p-5 ${bgColorMap[service.color] || bgColorMap.indigo}`}>
                <span className={`material-symbols-outlined text-2xl mb-2 block ${colorMap[service.color] || "text-indigo-400"}`}>
                  {f.icon}
                </span>
                <h3 className="font-bold text-white text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-slate-400">{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content sections */}
        {landing.sections?.map((section: any, idx: number) => (
          <div key={idx} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">
              {section.title}
            </h2>
            <GlassCard className="prose-content">
              {section.content.split("\n\n").map((paragraph: string, pIdx: number) => (
                <p key={pIdx} className="text-slate-300 leading-relaxed mb-4 last:mb-0">
                  {renderInlineMarkdown(paragraph)}
                </p>
              ))}
            </GlassCard>
          </div>
        ))}

        {/* FAQ */}
        {landing.faq && (
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-white">
              {locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
            </h2>
            <div className="space-y-4">
              {landing.faq.map((item: any, idx: number) => (
                <GlassCard key={idx}>
                  <h3 className="font-bold text-white mb-3">{item.question}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.answer}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Project showcase images */}
        {landing.showcase && (
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-white">
              {locale === "fr" ? "Projets réalisés en no-code" : "No-code projects delivered"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {landing.showcase.map((item: any, idx: number) => (
                <div key={idx} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <div className="relative aspect-video">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 448px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {locale === "fr" ? "Prêt à démarrer votre projet ?" : "Ready to start your project?"}
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {locale === "fr"
              ? "Discutons de vos besoins lors d'un appel découverte gratuit de 30 minutes."
              : "Let's discuss your needs in a free 30-minute discovery call."}
          </p>
          <Button href={contactHref} variant="primary" icon="trending_up">
            {dict.hero.cta_primary}
          </Button>
        </div>
      </div>
    </main>
  );
}
