import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import {
  BUSINESS_VERTICALS_UPDATED_AT,
  getBusinessVerticalBySlug,
  getBusinessVerticalStaticParams,
  type BusinessVerticalTone,
} from "@/lib/data/business-verticals";
import { getProjectBySlug } from "@/lib/data/projects";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FAQJsonLd from "@/components/seo/FAQJsonLd";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import BusinessVerticalTracker from "@/components/site-metier/BusinessVerticalTracker";

export function generateStaticParams() {
  return getBusinessVerticalStaticParams();
}

const toneClasses: Record<BusinessVerticalTone, {
  text: string;
  border: string;
  softBorder: string;
  bg: string;
  strongBg: string;
}> = {
  amber: { text: "text-amber-300", border: "border-amber-400/50", softBorder: "border-amber-400/20", bg: "bg-amber-400/8", strongBg: "bg-amber-500" },
  blue: { text: "text-blue-300", border: "border-blue-400/50", softBorder: "border-blue-400/20", bg: "bg-blue-400/8", strongBg: "bg-blue-500" },
  cyan: { text: "text-cyan-300", border: "border-cyan-400/50", softBorder: "border-cyan-400/20", bg: "bg-cyan-400/8", strongBg: "bg-cyan-500" },
  emerald: { text: "text-emerald-300", border: "border-emerald-400/50", softBorder: "border-emerald-400/20", bg: "bg-emerald-400/8", strongBg: "bg-emerald-500" },
  orange: { text: "text-orange-300", border: "border-orange-400/50", softBorder: "border-orange-400/20", bg: "bg-orange-400/8", strongBg: "bg-orange-500" },
  rose: { text: "text-rose-300", border: "border-rose-400/50", softBorder: "border-rose-400/20", bg: "bg-rose-400/8", strongBg: "bg-rose-500" },
  sky: { text: "text-sky-300", border: "border-sky-400/50", softBorder: "border-sky-400/20", bg: "bg-sky-400/8", strongBg: "bg-sky-500" },
  violet: { text: "text-violet-300", border: "border-violet-400/50", softBorder: "border-violet-400/20", bg: "bg-violet-400/8", strongBg: "bg-violet-500" },
};

function resolveLocale(rawLocale: string): Locale {
  return (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const vertical = getBusinessVerticalBySlug(slug, locale);
  if (!vertical) return {};

  const prefix = locale === "fr" ? "" : "/en";
  const proof = vertical.proof
    ? await getProjectBySlug(vertical.proof.projectSlug, locale)
    : null;
  const image = proof?.image ?? "/images/og-default.png";

  return {
    title: vertical.metaTitle,
    description: vertical.metaDescription,
    alternates: {
      canonical: `${SITE_URL}${prefix}/site-metier/${vertical.slug}`,
      languages: {
        fr: `${SITE_URL}/site-metier/${locale === "fr" ? vertical.slug : vertical.alternateSlug}`,
        en: `${SITE_URL}/en/site-metier/${locale === "en" ? vertical.slug : vertical.alternateSlug}`,
        "x-default": `${SITE_URL}/site-metier/${locale === "fr" ? vertical.slug : vertical.alternateSlug}`,
      },
    },
    openGraph: {
      title: vertical.metaTitle,
      description: vertical.metaDescription,
      url: `${SITE_URL}${prefix}/site-metier/${vertical.slug}`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 675, alt: vertical.title }],
    },
  };
}

export default async function BusinessVerticalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const vertical = getBusinessVerticalBySlug(slug, locale);
  if (!vertical) notFound();

  const prefix = locale === "fr" ? "" : "/en";
  const contactHref = `${prefix}/contact?vertical=${encodeURIComponent(vertical.key)}`;
  const proof = vertical.proof
    ? await getProjectBySlug(vertical.proof.projectSlug, locale)
    : null;
  const tone = toneClasses[vertical.tone];
  const copy = locale === "fr"
    ? {
        hub: "Sites métier",
        audience: "Conçu pour",
        action: "Action principale",
        talk: "Parler de mon activité",
        explore: "Voir les résultats attendus",
        automationEyebrow: "Automatisation optionnelle",
        processEyebrow: "Méthode",
        searchEyebrow: "SEO sectoriel",
        proofEyebrow: "Preuve de réalisation",
        viewProof: "Voir l'étude de cas complète",
        linksTitle: "Relier le site à une stratégie complète",
        linksIntro: "Ces ressources précisent la construction, l'automatisation et l'acquisition autour du site métier.",
        faqTitle: "Questions avant de lancer le site",
        finalAction: "Recevoir un cadrage",
      }
    : {
        hub: "Business websites",
        audience: "Designed for",
        action: "Primary action",
        talk: "Discuss my business",
        explore: "Explore expected outcomes",
        automationEyebrow: "Optional automation",
        processEyebrow: "Method",
        searchEyebrow: "Sector SEO",
        proofEyebrow: "Delivered work",
        viewProof: "View the complete case study",
        linksTitle: "Connect the website to a complete strategy",
        linksIntro: "These resources explain the build, automation and acquisition surrounding the business website.",
        faqTitle: "Questions before starting",
        finalAction: "Request a project frame",
      };

  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: copy.hub, href: `${prefix}/site-metier` },
    { name: vertical.name, href: `${prefix}/site-metier/${vertical.slug}` },
  ];

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <BusinessVerticalTracker vertical={vertical.key} locale={locale} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name={vertical.title}
        description={vertical.metaDescription}
        locale={locale}
        url={`${SITE_URL}${prefix}/site-metier/${vertical.slug}`}
        dateModified={BUSINESS_VERTICALS_UPDATED_AT}
      />
      <FAQJsonLd items={vertical.faq} />

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            <Link href={`${prefix}/site-metier`} className="transition-colors hover:text-white">
              {copy.hub}
            </Link>
            <span aria-hidden="true">/</span>
            <span className={tone.text}>{vertical.name}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg border ${tone.softBorder} ${tone.bg} ${tone.text}`}>
                <IconScoutIcon name={vertical.icon} size={26} />
              </div>
              <p className={`mb-4 text-xs font-bold uppercase tracking-[0.18em] ${tone.text}`}>
                {vertical.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-6xl">
                {vertical.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                {vertical.lead}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={contactHref}
                  className={`inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 ${tone.strongBg}`}
                  data-ph-event="cta_clicked"
                  data-ph-props={JSON.stringify({ area: "business_vertical_hero", cta_type: "contact", business_vertical: vertical.key, locale })}
                >
                  {copy.talk}
                </Link>
                <a href="#resultats" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/5">
                  {copy.explore}
                </a>
              </div>
            </div>

            <aside className={`border-l-2 ${tone.border} pl-6`}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.audience}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{vertical.audience}</p>
              <div className="my-6 h-px bg-white/10" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.action}</p>
              <p className={`mt-3 text-base font-semibold ${tone.text}`}>{vertical.primaryAction}</p>
              <ul className="mt-6 space-y-3">
                {vertical.heroHighlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-400">
                    <IconScoutIcon name="check" size={18} className={`mt-0.5 shrink-0 ${tone.text}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-black/20 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={vertical.painsTitle} description={vertical.painsIntro} />
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            {vertical.pains.map((pain) => (
              <article key={pain.title} className="min-h-56 bg-[#090a10] p-7">
                <IconScoutIcon name={pain.icon} size={25} className={tone.text} />
                <h2 className="mt-8 text-lg font-bold text-white">{pain.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{pain.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="resultats" className="scroll-mt-28 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={vertical.outcomesTitle} description={vertical.outcomesIntro} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vertical.outcomes.map((outcome) => (
              <article key={outcome.title} className={`min-h-52 rounded-lg border ${tone.softBorder} ${tone.bg} p-6`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${tone.softBorder} bg-black/20 ${tone.text}`}>
                  <IconScoutIcon name={outcome.icon} size={21} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{outcome.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{outcome.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`border-y ${tone.softBorder} ${tone.bg} px-6 py-20 md:py-24`}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow={copy.automationEyebrow} title={vertical.automationTitle} description={vertical.automationIntro} />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {vertical.automations.map((item, index) => (
              <article key={item.title} className="border-t border-white/15 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className={`text-xs font-bold ${tone.text}`}>0{index + 1}</span>
                  <IconScoutIcon name={item.icon} size={20} className="text-slate-500" />
                </div>
                <h3 className="mt-5 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow={copy.processEyebrow} title={vertical.processTitle} />
          <ol className="grid gap-8 md:grid-cols-4">
            {vertical.process.map((step, index) => (
              <li key={step.title} className="relative border-t border-white/15 pt-7">
                <span className={`text-3xl font-black ${tone.text}`}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-white/8 bg-black/20 px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <SectionHeading eyebrow={copy.searchEyebrow} title={vertical.searchTitle} />
            <div className="max-w-3xl space-y-5 text-base leading-relaxed text-slate-300">
              {vertical.searchParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div className="lg:pt-12">
            <div className="flex flex-wrap gap-2">
              {vertical.searchTopics.map((topic) => (
                <span key={topic} className="rounded-lg border border-white/10 bg-white/3 px-3 py-2 text-xs font-medium text-slate-300">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {vertical.proof && proof ? (
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={copy.proofEyebrow} title={vertical.proof.title} description={vertical.proof.description} />
            <Link
              href={`${prefix}/projects/${vertical.proof.projectSlug}`}
              className="group grid overflow-hidden rounded-lg border border-white/10 bg-white/3 md:grid-cols-[1.2fr_0.8fr]"
              data-ph-event="project_opened"
              data-ph-props={JSON.stringify({ area: "business_vertical_proof", project_slug: vertical.proof.projectSlug, business_vertical: vertical.key, locale })}
            >
              <div className="relative aspect-video md:aspect-auto md:min-h-80">
                <Image src={proof.image} alt={`${proof.title} - ${proof.subtitle}`} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="flex flex-col justify-between p-7 md:p-9">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.16em] ${tone.text}`}>{proof.title}</p>
                  <h3 className="mt-4 text-2xl font-bold text-white">{proof.subtitle}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{proof.description}</p>
                </div>
                <span className="mt-8 text-sm font-bold text-white">{copy.viewProof}</span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={copy.linksTitle} description={copy.linksIntro} />
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
            {vertical.links.map((item) => (
              <Link key={item.href} href={item.href} className="min-h-40 bg-[#090a10] p-6 transition-colors hover:bg-white/5">
                <h3 className="font-bold text-white">{item.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title={copy.faqTitle} />
          <div className="divide-y divide-white/10 border-y border-white/10">
            {vertical.faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold text-white">
                  <span>{item.question}</span>
                  <span className={`text-xl transition-transform group-open:rotate-45 ${tone.text}`} aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pt-4 text-sm leading-relaxed text-slate-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pt-8">
        <div className={`mx-auto max-w-6xl rounded-lg border ${tone.softBorder} ${tone.bg} px-7 py-12 md:px-12 md:py-16`}>
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="max-w-3xl text-3xl font-bold text-white md:text-4xl">{vertical.ctaTitle}</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">{vertical.ctaDescription}</p>
            </div>
            <Link
              href={contactHref}
              className={`inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-bold text-white ${tone.strongBg}`}
              data-ph-event="cta_clicked"
              data-ph-props={JSON.stringify({ area: "business_vertical_final", cta_type: "contact", business_vertical: vertical.key, locale })}
            >
              {copy.finalAction}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
