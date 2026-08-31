import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, LANDING_LAST_UPDATED } from "@/lib/constants";
import { notFound } from "next/navigation";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FAQJsonLd from "@/components/seo/FAQJsonLd";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { getServiceByKey, getServiceBySlug, getServiceStaticParams } from "@/lib/data/services";
import { getRelatedSolutionsForService, type Solution } from "@/lib/data/solutions";
import SeoGrowthProof from "@/components/sections/SeoGrowthProof";
import PerformanceOptimizationProof from "@/components/sections/PerformanceOptimizationProof";
import { LegacyIconScoutIcon } from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import { getCoreServiceContent } from "@/lib/data/core-service-content";
import { getBusinessVerticals } from "@/lib/data/business-verticals";

export async function generateStaticParams() {
  return getServiceStaticParams();
}

function formatLastUpdated(iso: string, locale: "fr" | "en") {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function titleWithoutSiteSuffix(title: string) {
  return title.replace(/\s+(?:[|—-]\s*)?Manda\s*$/i, "");
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function renderLink(href: string, label: string, key: number) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        key={key}
        href={href}
        target="_blank"
        rel="noopener external"
        className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
      >
        {label}
      </a>
    );
  }
  return (
    <Link key={key} href={href} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
      {label}
    </Link>
  );
}

function renderInlineMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Match bold-link first so **[text](url)** renders as a clickable strong link
    const boldLinkMatch = remaining.match(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

    const boldLinkIdx = boldLinkMatch ? remaining.indexOf(boldLinkMatch[0]) : Infinity;
    const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity;
    const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;

    const minIdx = Math.min(boldLinkIdx, linkIdx, boldIdx);

    if (minIdx === Infinity) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (minIdx === boldLinkIdx && boldLinkMatch) {
      if (boldLinkIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, boldLinkIdx)}</span>);
      const linkEl = renderLink(boldLinkMatch[2], boldLinkMatch[1], key++);
      parts.push(
        <strong key={key++} className="text-white font-semibold">
          {linkEl}
        </strong>
      );
      remaining = remaining.slice(boldLinkIdx + boldLinkMatch[0].length);
    } else if (minIdx === linkIdx && linkMatch) {
      if (linkIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, linkIdx)}</span>);
      parts.push(renderLink(linkMatch[2], linkMatch[1], key++));
      remaining = remaining.slice(linkIdx + linkMatch[0].length);
    } else if (boldMatch) {
      if (boldIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, boldIdx)}</span>);
      parts.push(<strong key={key++} className="text-white font-semibold">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldIdx + boldMatch[0].length);
    }
  }

  return parts;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const service = await getServiceBySlug(slug, locale);

  if (!service) return {};

  const prefix = locale === "fr" ? "" : "/en";
  const otherLocale = locale === "fr" ? "en" : "fr";
  const otherService = service.key
    ? await getServiceByKey(service.key, otherLocale as Locale)
    : undefined;

  return {
    title: titleWithoutSiteSuffix(service.seoTitle || service.title),
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
  const service = (await getServiceBySlug(slug, locale)) as any;

  if (!service) notFound();

  const prefix = locale === "fr" ? "" : "/en";
  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: "Services", href: `${prefix}/services` },
    { name: service.title, href: `${prefix}/services/${slug}` },
  ];

  const contactHref = locale === "fr" ? "/contact" : "/en/contact";
  const isLanding = !!service.isLanding && !!service.landing;
  const coreContent = getCoreServiceContent(locale, slug);
  const lastUpdated = service.updatedAt || LANDING_LAST_UPDATED;

  const colorMap: Record<string, string> = {
    indigo: "text-indigo-400",
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    sky: "text-sky-400",
    amber: "text-amber-400",
  };

  const bgColorMap: Record<string, string> = {
    indigo: "bg-indigo-500/10 border-indigo-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20",
    blue: "bg-blue-500/10 border-blue-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
    sky: "bg-sky-500/10 border-sky-500/20",
    amber: "bg-amber-500/10 border-amber-500/20",
  };

  const solutionAccentMap: Record<Solution["accent"], { icon: string; border: string; bg: string }> = {
    indigo: { icon: "text-indigo-300", border: "border-indigo-500/25", bg: "bg-indigo-500/10" },
    emerald: { icon: "text-emerald-300", border: "border-emerald-500/25", bg: "bg-emerald-500/10" },
    blue: { icon: "text-blue-300", border: "border-blue-500/25", bg: "bg-blue-500/10" },
    purple: { icon: "text-purple-300", border: "border-purple-500/25", bg: "bg-purple-500/10" },
  };

  if (!isLanding) {
    return (
      <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
        <ServiceJsonLd
          name={service.title}
          description={service.description}
          locale={locale}
          url={`${SITE_URL}${prefix}/services/${slug}`}
        />
        <BreadcrumbJsonLd items={breadcrumbs} />
        {coreContent?.faq && <FAQJsonLd items={coreContent.faq} />}
        <div className="max-w-5xl mx-auto">
          <LegacyIconScoutIcon
            name={service.icon}
            size={46}
            className={`mb-6 ${colorMap[service.color] || "text-indigo-400"}`}
          />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 gradient-text">
            {service.title}
          </h1>
          {coreContent && (
            <p className={`mb-4 text-xs font-bold uppercase ${colorMap[service.color] || "text-indigo-400"}`}>
              {coreContent.eyebrow}
            </p>
          )}
          <p className="text-xl text-slate-300 mb-12 max-w-3xl leading-relaxed">
            {coreContent?.intro || service.description}
          </p>

          {coreContent ? (
            <>
              <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
                {coreContent.outcomes.map((outcome) => (
                  <div key={outcome.title} className={`rounded-xl border p-6 ${bgColorMap[service.color] || bgColorMap.indigo}`}>
                    <h2 className="mb-2 text-base font-bold text-white">{outcome.title}</h2>
                    <p className="text-sm leading-relaxed text-slate-400">{outcome.description}</p>
                  </div>
                ))}
              </div>

              {coreContent.sections.map((section) => (
                <section key={section.title} className="mb-16">
                  <SectionHeading title={section.title} className="mb-6" />
                  <div className="border-l border-indigo-400/25 pl-5 sm:pl-7">
                    {section.content.map((paragraph) => (
                      <p key={paragraph} className="mb-4 max-w-3xl text-slate-300 leading-relaxed last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="mb-20">
                <Link
                  href={coreContent.relatedHref}
                  className="inline-flex items-center text-sm font-semibold text-indigo-300 underline underline-offset-4 hover:text-indigo-200"
                  data-ph-event="service_viewed"
                  data-ph-props={JSON.stringify({ area: "core_service_related", service_slug: slug, href: coreContent.relatedHref, locale })}
                >
                  {coreContent.relatedLabel}
                </Link>
              </div>

              <section className="mb-20">
                <SectionHeading title={locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"} className="mb-8" />
                <div className="space-y-4">
                  {coreContent.faq.map((item) => (
                    <GlassCard key={item.question}>
                      <h3 className="mb-3 font-bold text-white">{item.question}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.answer}</p>
                    </GlassCard>
                  ))}
                </div>
              </section>

              <div className="glass-card rounded-2xl p-8 text-center md:p-12">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">{coreContent.ctaTitle}</h2>
                <p className="mx-auto mb-8 max-w-xl text-slate-400">{coreContent.ctaDescription}</p>
                <Button
                  href={contactHref}
                  variant="primary"
                  analytics={{ event: "cta_clicked", properties: { area: "core_service_final_cta", cta_type: "contact", service_slug: slug, service_title: service.title, locale } }}
                >
                  {dict.hero.cta_primary}
                </Button>
              </div>
            </>
          ) : (
            <Button
              href={contactHref}
              variant="primary"
              analytics={{ event: "cta_clicked", properties: { area: "service_detail_simple", cta_type: "contact", service_slug: slug, service_title: service.title, locale } }}
            >
              {dict.hero.cta_primary}
            </Button>
          )}
        </div>
      </main>
    );
  }

  const landing = service.landing;
  const relatedSolutions = getRelatedSolutionsForService(locale, service.slug);
  const isSeoGeoLanding =
    service.slug === "consultant-seo-geo" || service.slug === "seo-geo-consultant";
  const isPerformanceOptimizationLanding =
    service.slug === "audit-performance-site-web" ||
    service.slug === "website-performance-optimization-service";
  const performanceVerticals = isPerformanceOptimizationLanding
    ? getBusinessVerticals(locale).slice(0, 6)
    : [];
  const heroCtaLabel = service.slug === "forward-deployed-engineer"
    ? locale === "fr"
      ? "DÃ©crire mon problÃ¨me mÃ©tier"
      : "Describe the business problem"
    : landing.cta?.buttonLabel || dict.hero.cta_primary;

  return (
    <main id="main-content" className="relative min-h-screen w-full min-w-0 px-6 pt-32 pb-24">
      <ServiceJsonLd
        name={service.title}
        description={service.description}
        locale={locale}
        url={`${SITE_URL}${prefix}/services/${slug}`}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      {landing.faq && <FAQJsonLd items={landing.faq} />}

      <div className="mx-auto w-full min-w-0 max-w-5xl">
        {/* Hero */}
        <div className="mb-20">
          <LegacyIconScoutIcon
            name={service.icon}
            size={46}
            className={`mb-6 ${colorMap[service.color] || "text-indigo-400"}`}
          />
          <h1 className="mb-8 break-words text-4xl font-extrabold tracking-tighter md:text-6xl">
            {service.title}
          </h1>
          <p className="max-w-3xl break-words text-xl leading-relaxed text-slate-300 md:text-2xl">
            {landing.heroText}
          </p>
          <p className="mt-6 text-xs uppercase tracking-wider text-slate-500">
            {locale === "fr" ? "Mis à jour le " : "Last updated: "}
            <time dateTime={lastUpdated} className="text-slate-400">
              {formatLastUpdated(lastUpdated, locale)}
            </time>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href={contactHref}
              variant="primary"
              analytics={{
                event: "cta_clicked",
                properties: {
                  area: "service_landing_hero",
                  cta_type: "contact",
                  service_slug: slug,
                  service_title: service.title,
                  locale,
                },
              }}
            >
              {heroCtaLabel}
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
          <div className="mb-20 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3" role="list">
            {landing.features.map((f: any) => (
              <div key={f.title} role="listitem" className={`min-w-0 rounded-xl border p-5 ${bgColorMap[service.color] || bgColorMap.indigo}`}>
                <LegacyIconScoutIcon
                  name={f.icon}
                  size={24}
                  className={`mb-2 ${colorMap[service.color] || "text-indigo-400"}`}
                />
                <p className="mb-1 break-words text-sm font-bold text-white">{f.title}</p>
                <p className="break-words text-xs text-slate-400">{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {isSeoGeoLanding && <SeoGrowthProof locale={locale} />}
        {isPerformanceOptimizationLanding && <PerformanceOptimizationProof locale={locale} />}

        {isPerformanceOptimizationLanding && (
          <section className="mb-20">
            <SectionHeading
              eyebrow={locale === "fr" ? "Applications concrètes" : "Practical applications"}
              title={locale === "fr" ? "La performance appliquée aux sites métier" : "Performance applied to business websites"}
              description={
                locale === "fr"
                  ? "Le même travail de rendu, CSS, médias et mesure est intégré dès la conception de chaque site métier. L'audit reste aussi disponible pour un produit déjà en ligne."
                  : "The same rendering, CSS, media and measurement work is built into every business website from the start. The audit is also available for an existing production product."
              }
            />
            <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href={`${prefix}/projects/optimisation-performance-manda-ia`}
                className="min-h-44 bg-[#090a10] p-6 transition-colors hover:bg-amber-500/8"
                data-ph-event="project_opened"
                data-ph-props={JSON.stringify({ area: "performance_related_work", project_slug: "optimisation-performance-manda-ia", locale })}
              >
                <p className="text-xs font-bold uppercase text-amber-300">
                  {locale === "fr" ? "Étude de cas" : "Case study"}
                </p>
                <h3 className="mt-4 font-bold text-white">manda-ia.com</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {locale === "fr"
                    ? "Mesures Lighthouse, coût cloud, cache et décisions d'architecture."
                    : "Lighthouse metrics, cloud cost, caching and architecture decisions."}
                </p>
              </Link>
              {performanceVerticals.map((vertical) => (
                <Link
                  key={vertical.key}
                  href={`${prefix}/site-metier/${vertical.slug}`}
                  className="min-h-44 bg-[#090a10] p-6 transition-colors hover:bg-white/5"
                >
                  <p className="text-xs font-bold uppercase text-slate-500">
                    {locale === "fr" ? "Site métier" : "Business website"}
                  </p>
                  <h3 className="mt-4 font-bold text-white">{vertical.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{vertical.primaryAction}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Content sections */}
        {landing.sections?.map((section: any, idx: number) => (
          <div key={idx} className="mb-16">
            <SectionHeading title={section.title} className="mb-6 md:mb-7" />
            <div className="prose-content border-l border-indigo-400/25 pl-5 sm:pl-7">
              {section.content.split("\n\n").map((paragraph: string, pIdx: number) => (
                <p key={pIdx} className="text-slate-300 leading-relaxed mb-4 last:mb-0">
                  {renderInlineMarkdown(paragraph)}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Comparison table (Next.js vs No-Code) */}
        {landing.comparisonTable && (
          <div className="mb-20">
            <SectionHeading
              title={landing.comparisonTable.title}
              description={landing.comparisonTable.intro}
              className="mb-8"
            />

            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    {landing.comparisonTable.headers.map((header: string, hIdx: number) => (
                      <th
                        key={hIdx}
                        className={`px-5 py-4 text-left font-semibold ${
                          hIdx === 0 ? "text-slate-300 w-1/4" : hIdx === 2 ? "text-emerald-300" : "text-slate-400"
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {landing.comparisonTable.rows.map((row: any, rIdx: number) => (
                    <tr key={rIdx} className="border-b border-white/5 last:border-b-0">
                      <td className="px-5 py-4 font-medium text-white align-top">{row.criterion}</td>
                      <td className="px-5 py-4 text-slate-400 align-top leading-relaxed">{row.noCode}</td>
                      <td
                        className={`px-5 py-4 align-top leading-relaxed ${
                          row.winner === "nextjs" ? "text-emerald-200" : "text-slate-300"
                        }`}
                      >
                        {row.nextjs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked cards */}
            <div className="md:hidden space-y-4">
              {landing.comparisonTable.rows.map((row: any, rIdx: number) => (
                <GlassCard key={rIdx}>
                  <h3 className="font-bold text-white mb-3 text-sm">{row.criterion}</h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 block mb-1">{landing.comparisonTable.headers[1]}</span>
                      <span className="text-slate-400 leading-relaxed">{row.noCode}</span>
                    </div>
                    <div>
                      <span className="text-emerald-400/70 block mb-1">{landing.comparisonTable.headers[2]}</span>
                      <span className={row.winner === "nextjs" ? "text-emerald-200 leading-relaxed" : "text-slate-300 leading-relaxed"}>
                        {row.nextjs}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {landing.comparisonTable.conclusion && (
              <p className="text-slate-300 leading-relaxed mt-8 max-w-3xl italic">
                {landing.comparisonTable.conclusion}
              </p>
            )}
          </div>
        )}

        {/* Related solution pages */}
        {relatedSolutions.length > 0 && (
          <div className="mb-20">
            <SectionHeading
              title={locale === "fr" ? "Solutions liées" : "Related solutions"}
              description={
                locale === "fr"
                  ? "Pages plus concrètes pour cadrer un besoin métier précis avant de passer au devis ou au prototype."
                  : "More concrete pages to scope a precise business need before moving to an estimate or prototype."
              }
              className="mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedSolutions.map((solution) => {
                const accent = solutionAccentMap[solution.accent];
                return (
                  <Link
                    key={solution.slug}
                    href={`${prefix}/solutions/${solution.slug}`}
                    className="group block h-full"
                    data-ph-event="solution_viewed"
                    data-ph-props={JSON.stringify({
                      area: "service_related_solutions",
                      service_slug: slug,
                      solution_slug: solution.slug,
                      title: solution.title,
                      href: `${prefix}/solutions/${solution.slug}`,
                      locale,
                    })}
                  >
                    <GlassCard
                      borderColor={accent.border}
                      className="h-full hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <LegacyIconScoutIcon
                          name={solution.icon}
                          size={24}
                          className={`rounded-lg border p-2 ${accent.border} ${accent.bg} ${accent.icon}`}
                        />
                        <div>
                          <p className={`text-xs font-bold tracking-[0.16em] uppercase ${accent.icon} mb-2`}>
                            {solution.primaryKeyword}
                          </p>
                          <h3 className="font-bold text-white mb-2 group-hover:underline underline-offset-4">
                            {solution.title}
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {solution.seoDescription}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ */}
        {landing.faq && (
          <div className="mb-20">
            <SectionHeading
              title={locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
              className="mb-8"
            />
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
            <SectionHeading
              title={locale === "fr" ? "Projets réalisés" : "Projects delivered"}
              className="mb-8"
            />
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
            {landing.cta?.title ||
              (locale === "fr" ? "Prêt à démarrer votre projet ?" : "Ready to start your project?")}
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {landing.cta?.description ||
              (locale === "fr"
                ? "Discutons de vos besoins lors d'un appel découverte gratuit de 30 minutes."
                : "Let's discuss your needs in a free 30-minute discovery call.")}
          </p>
          <Button
            href={contactHref}
            variant="primary"
            analytics={{
              event: "cta_clicked",
              properties: {
                area: "service_landing_final_cta",
                cta_type: "contact",
                service_slug: slug,
                service_title: service.title,
                locale,
              },
            }}
          >
            {landing.cta?.buttonLabel || dict.hero.cta_primary}
          </Button>
        </div>
      </div>
    </main>
  );
}
