import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import {
  getAlternateSolution,
  getSolutionBySlug,
  getSolutions,
  SOLUTION_LAST_UPDATED,
  type Solution,
  type SolutionLink,
  type SolutionPoint,
} from "@/lib/data/solutions";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FAQJsonLd from "@/components/seo/FAQJsonLd";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { LegacyIconScoutIcon } from "@/components/icons/IconScoutIcon";

export const dynamicParams = false;

const accentStyles: Record<
  Solution["accent"],
  { text: string; bg: string; border: string; strongBorder: string; softText: string }
> = {
  indigo: {
    text: "text-indigo-300",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/25",
    strongBorder: "border-indigo-400/50",
    softText: "text-indigo-200",
  },
  emerald: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    strongBorder: "border-emerald-400/50",
    softText: "text-emerald-200",
  },
  blue: {
    text: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    strongBorder: "border-blue-400/50",
    softText: "text-blue-200",
  },
  purple: {
    text: "text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/25",
    strongBorder: "border-purple-400/50",
    softText: "text-purple-200",
  },
};

const solutionPageCopy: Record<
  Locale,
  {
    breadcrumbHome: string;
    breadcrumbSolutions: string;
    updatedPrefix: string;
    allSolutions: string;
    shortAnswer: string;
    shortAnswerSr: string;
    fitEyebrow: string;
    fitTitle: string;
    outcomesEyebrow: string;
    outcomesTitle: string;
    problemEyebrow: string;
    deliverablesEyebrow: string;
    architectureEyebrow: string;
    safeguardsEyebrow: string;
    proofsEyebrow: string;
    proofsTitle: string;
    sourcesEyebrow: string;
    sourcesTitle: string;
    faqEyebrow: string;
    faqTitle: string;
  }
> = {
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbSolutions: "Solutions",
    updatedPrefix: "Mis à jour le",
    allSolutions: "Toutes les solutions",
    shortAnswer: "Réponse courte",
    shortAnswerSr: "Réponse courte sur",
    fitEyebrow: "Pour qui",
    fitTitle: "Cette solution est pertinente si...",
    outcomesEyebrow: "Résultat attendu",
    outcomesTitle: "Ce que l'entreprise gagne",
    problemEyebrow: "Problème concret",
    deliverablesEyebrow: "Livrables",
    architectureEyebrow: "Architecture type",
    safeguardsEyebrow: "Production",
    proofsEyebrow: "Preuves et maillage interne",
    proofsTitle: "Projets et services liés",
    sourcesEyebrow: "Sources",
    sourcesTitle: "Références techniques utiles",
    faqEyebrow: "FAQ",
    faqTitle: "Questions fréquentes",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbSolutions: "Solutions",
    updatedPrefix: "Last updated:",
    allSolutions: "All solutions",
    shortAnswer: "Short answer",
    shortAnswerSr: "Short answer about",
    fitEyebrow: "Best fit",
    fitTitle: "This solution is relevant if...",
    outcomesEyebrow: "Expected outcome",
    outcomesTitle: "What the business gains",
    problemEyebrow: "Concrete problem",
    deliverablesEyebrow: "Deliverables",
    architectureEyebrow: "Typical architecture",
    safeguardsEyebrow: "Production",
    proofsEyebrow: "Proof and internal links",
    proofsTitle: "Related projects and services",
    sourcesEyebrow: "Sources",
    sourcesTitle: "Useful technical references",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
  },
};

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener external" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SectionTitle({
  id,
  eyebrow,
  title,
}: {
  id: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-2xl md:text-4xl font-extrabold tracking-tighter text-white">
        {title}
      </h2>
    </div>
  );
}

function PointGrid({
  items,
  accent,
}: {
  items: SolutionPoint[];
  accent: Solution["accent"];
}) {
  const style = accentStyles[accent];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <GlassCard key={item.title} borderColor={style.border} className="h-full">
          <h3 className={`font-bold mb-3 ${style.softText}`}>{item.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
        </GlassCard>
      ))}
    </div>
  );
}

function LinkGrid({
  items,
  accent,
}: {
  items: SolutionLink[];
  accent: Solution["accent"];
}) {
  const style = accentStyles[accent];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <SmartLink
          key={item.href}
          href={item.href}
          className="group block h-full"
        >
          <GlassCard
            borderColor={style.border}
            className="h-full transition-colors group-hover:bg-white/[0.04]"
          >
            <h3 className="font-bold text-white mb-2 group-hover:underline underline-offset-4">
              {item.label}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
          </GlassCard>
        </SmartLink>
      ))}
    </div>
  );
}

function formatUpdatedDate(locale: Locale) {
  return new Date(SOLUTION_LAST_UPDATED).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  return i18n.locales.flatMap((locale) =>
    getSolutions(locale).map((solution) => ({
      locale,
      slug: solution.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;

  const solution = getSolutionBySlug(locale, slug);
  if (!solution) return {};
  const alternate = getAlternateSolution(locale, slug);
  const prefix = locale === "fr" ? "" : "/en";
  const frPath = locale === "fr"
    ? `/solutions/${solution.slug}`
    : `/solutions/${alternate?.slug ?? solution.slug}`;
  const enPath = locale === "en"
    ? `/en/solutions/${solution.slug}`
    : `/en/solutions/${alternate?.slug ?? solution.slug}`;

  return {
    title: solution.seoTitle,
    description: solution.seoDescription,
    alternates: {
      canonical: `${SITE_URL}${prefix}/solutions/${solution.slug}`,
      languages: {
        fr: `${SITE_URL}${frPath}`,
        en: `${SITE_URL}${enPath}`,
        "x-default": `${SITE_URL}${frPath}`,
      },
    },
    openGraph: {
      title: solution.seoTitle,
      description: solution.seoDescription,
      url: `${SITE_URL}${prefix}/solutions/${solution.slug}`,
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: `${SITE_URL}/images/og-default.png`,
          width: 1200,
          height: 630,
          alt: solution.title,
        },
      ],
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const solution = getSolutionBySlug(locale, slug);
  if (!solution) notFound();

  const style = accentStyles[solution.accent];
  const copy = solutionPageCopy[locale];
  const prefix = locale === "fr" ? "" : "/en";
  const breadcrumbs = [
    { name: copy.breadcrumbHome, href: locale === "fr" ? "/" : "/en" },
    { name: copy.breadcrumbSolutions, href: `${prefix}/solutions` },
    { name: solution.title, href: `${prefix}/solutions/${solution.slug}` },
  ];

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <ServiceJsonLd
        name={solution.title}
        description={solution.seoDescription}
        locale={locale}
        dateModified={SOLUTION_LAST_UPDATED}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd items={solution.faq} />

      <article className="max-w-5xl mx-auto">
        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <LegacyIconScoutIcon
              name={solution.icon}
              size={30}
              className={`rounded-lg border p-3 ${style.border} ${style.bg} ${style.text}`}
            />
            <span className={`rounded-full border ${style.border} ${style.bg} px-4 py-2 text-xs font-bold tracking-[0.18em] uppercase ${style.text}`}>
              {solution.eyebrow}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-7 gradient-text">
            {solution.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
            {solution.heroLead}
          </p>
          <p className="mt-5 text-sm text-slate-500">
            {copy.updatedPrefix}{" "}
            <time dateTime={SOLUTION_LAST_UPDATED} className="text-slate-400">
              {formatUpdatedDate(locale)}
            </time>
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {[solution.primaryKeyword, ...solution.secondaryKeywords].map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400"
              >
                {keyword}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href={`${prefix}/contact`}
              variant="primary"
              analytics={{
                event: "cta_clicked",
                properties: {
                  area: "solution_hero",
                  cta_type: "contact",
                  solution_slug: solution.slug,
                  solution_title: solution.title,
                  locale,
                },
              }}
            >
              {solution.cta.buttonLabel}
            </Button>
            <Button
              href={`${prefix}/solutions`}
              variant="glass"
              analytics={{
                event: "cta_clicked",
                properties: {
                  area: "solution_hero",
                  cta_type: "all_solutions",
                  solution_slug: solution.slug,
                  locale,
                },
              }}
            >
              {copy.allSolutions}
            </Button>
          </div>
        </header>

        <section aria-labelledby="short-answer-title" className="mb-16">
          <GlassCard
            borderColor={style.strongBorder}
            className={`p-7 md:p-10 border-l-4 ${style.bg}`}
          >
            <p className={`text-xs font-bold tracking-[0.2em] uppercase ${style.text} mb-4`}>
              {copy.shortAnswer}
            </p>
            <h2 id="short-answer-title" className="sr-only">
              {copy.shortAnswerSr} {solution.primaryKeyword}
            </h2>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              {solution.shortAnswer}
            </p>
          </GlassCard>
        </section>

        <section className="mb-16" aria-labelledby="fit-title">
          <SectionTitle id="fit-title" eyebrow={copy.fitEyebrow} title={copy.fitTitle} />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
            {solution.fit.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-slate-300 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16" aria-labelledby="outcomes-title">
          <SectionTitle id="outcomes-title" eyebrow={copy.outcomesEyebrow} title={copy.outcomesTitle} />
          <PointGrid items={solution.outcomes} accent={solution.accent} />
        </section>

        <section className="mb-16" aria-labelledby="problem-title">
          <SectionTitle id="problem-title" eyebrow={copy.problemEyebrow} title={solution.problem.title} />
          <div className="space-y-5 text-lg text-slate-300 leading-relaxed">
            {solution.problem.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="deliverables-title">
          <SectionTitle id="deliverables-title" eyebrow={copy.deliverablesEyebrow} title={solution.deliverables.title} />
          <PointGrid items={solution.deliverables.items} accent={solution.accent} />
        </section>

        <section className="mb-16" aria-labelledby="architecture-title">
          <SectionTitle id="architecture-title" eyebrow={copy.architectureEyebrow} title={solution.architecture.title} />
          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl">
            {solution.architecture.intro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {solution.architecture.steps.map((step) => (
              <GlassCard key={step.title} borderColor={style.border} className="h-full">
                <h3 className={`font-bold mb-3 ${style.softText}`}>{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="safeguards-title">
          <SectionTitle id="safeguards-title" eyebrow={copy.safeguardsEyebrow} title={solution.safeguards.title} />
          <PointGrid items={solution.safeguards.items} accent={solution.accent} />
        </section>

        <section className="mb-16" aria-labelledby="proofs-title">
          <SectionTitle id="proofs-title" eyebrow={copy.proofsEyebrow} title={copy.proofsTitle} />
          <div className="space-y-10">
            <LinkGrid items={solution.proofs} accent={solution.accent} />
            <LinkGrid items={solution.relatedServices} accent={solution.accent} />
          </div>
        </section>

        <section className="mb-16" aria-labelledby="sources-title">
          <SectionTitle id="sources-title" eyebrow={copy.sourcesEyebrow} title={copy.sourcesTitle} />
          <LinkGrid items={solution.sources} accent={solution.accent} />
        </section>

        <section className="mb-20" aria-labelledby="faq-title">
          <SectionTitle id="faq-title" eyebrow={copy.faqEyebrow} title={copy.faqTitle} />
          <div className="space-y-4">
            {solution.faq.map((item) => (
              <GlassCard key={item.question}>
                <h3 className="font-bold text-white mb-3">{item.question}</h3>
                <p className="text-slate-400 leading-relaxed">{item.answer}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section aria-labelledby="cta-title">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <h2 id="cta-title" className="text-2xl md:text-4xl font-extrabold tracking-tighter mb-4">
              {solution.cta.title}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              {solution.cta.description}
            </p>
            <Button
              href={`${prefix}/contact`}
              variant="primary"
              analytics={{
                event: "cta_clicked",
                properties: {
                  area: "solution_final_cta",
                  cta_type: "contact",
                  solution_slug: solution.slug,
                  solution_title: solution.title,
                  locale,
                },
              }}
            >
              {solution.cta.buttonLabel}
            </Button>
          </div>
        </section>
      </article>
    </main>
  );
}
