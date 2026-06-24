import type { Metadata } from "next";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import {
  getSolutions,
  SOLUTION_LAST_UPDATED,
  type Solution,
} from "@/lib/data/solutions";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";

const accentStyles: Record<
  Solution["accent"],
  { text: string; bg: string; border: string; ring: string }
> = {
  indigo: {
    text: "text-indigo-300",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/25",
    ring: "shadow-indigo-500/10",
  },
  emerald: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    ring: "shadow-emerald-500/10",
  },
  blue: {
    text: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    ring: "shadow-blue-500/10",
  },
  purple: {
    text: "text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/25",
    ring: "shadow-purple-500/10",
  },
};

const solutionIndexCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    ogAlt: string;
    breadcrumbHome: string;
    breadcrumbSolutions: string;
    serviceDescription: string;
    eyebrow: string;
    h1: string;
    lead: string;
    updatedPrefix: string;
    updatedDate: string;
    primaryCta: string;
    secondaryCta: string;
    principlesLabel: string;
    principles: { title: string; description: string }[];
    waveEyebrow: string;
    waveTitle: string;
    waveDescription: string;
    readLabel: string;
  }
> = {
  fr: {
    title: "Solutions IA, n8n et API pour PME | Manda",
    description:
      "Solutions concrètes pour PME : automatisation n8n, agents IA support/prospection, API Mobile Money Madagascar et workflows Claude Code.",
    ogAlt: "Solutions IA, n8n et API pour PME",
    breadcrumbHome: "Accueil",
    breadcrumbSolutions: "Solutions",
    serviceDescription:
      "Pages solutions pour automatisation n8n, agents IA, API Mobile Money et workflows Claude Code.",
    eyebrow: "SEO programmatique utile, pas contenu dupliqué",
    h1: "Solutions IA, n8n et API pour PME",
    lead:
      "Des pages concrètes pour comprendre ce que je peux construire : automatisations métier, agents IA, paiements Mobile Money et workflows de développement assisté par IA.",
    updatedPrefix: "Mis à jour le",
    updatedDate: "24 juin 2026",
    primaryCta: "Parler de mon besoin",
    secondaryCta: "Voir les services",
    principlesLabel: "Principes éditoriaux",
    principles: [
      {
        title: "Lisible pour les humains",
        description:
          "Chaque page répond vite, explique le problème métier et donne des exemples concrets.",
      },
      {
        title: "Compréhensible par les IA",
        description:
          "Structure claire, FAQ visible, liens internes, sources officielles et JSON-LD cohérent.",
      },
      {
        title: "Orienté client réel",
        description:
          "On cible les requêtes qui peuvent devenir des projets, pas du trafic décoratif.",
      },
    ],
    waveEyebrow: "Première vague",
    waveTitle: "5 pages à forte intention business",
    waveDescription:
      "Les sujets viennent des signaux GSC et des offres où le portfolio a déjà des preuves : n8n, agents IA, Node.js/API, Mobile Money et Claude Code.",
    readLabel: "Lire la solution",
  },
  en: {
    title: "AI, n8n and API Solutions for SMBs | Manda",
    description:
      "Concrete solutions for SMBs: n8n automation, AI support/prospecting agents, Mobile Money API Madagascar and Claude Code workflows.",
    ogAlt: "AI, n8n and API solutions for SMBs",
    breadcrumbHome: "Home",
    breadcrumbSolutions: "Solutions",
    serviceDescription:
      "Solution pages for n8n automation, AI agents, Mobile Money APIs and Claude Code workflows.",
    eyebrow: "Useful programmatic SEO, not duplicated content",
    h1: "AI, n8n and API solutions for SMBs",
    lead:
      "Concrete pages to understand what I can build: business automation, AI agents, Mobile Money payments and AI-assisted development workflows.",
    updatedPrefix: "Last updated:",
    updatedDate: "June 24, 2026",
    primaryCta: "Discuss my need",
    secondaryCta: "View services",
    principlesLabel: "Editorial principles",
    principles: [
      {
        title: "Readable for humans",
        description:
          "Each page answers quickly, explains the business problem and gives concrete examples.",
      },
      {
        title: "Understandable by AI",
        description:
          "Clear structure, visible FAQ, internal links, official sources and coherent JSON-LD.",
      },
      {
        title: "Focused on real clients",
        description:
          "The pages target queries that can become real projects, not decorative traffic.",
      },
    ],
    waveEyebrow: "First wave",
    waveTitle: "5 pages with strong business intent",
    waveDescription:
      "The topics come from GSC signals and offers where the portfolio already has proof: n8n, AI agents, Node.js/API, Mobile Money and Claude Code.",
    readLabel: "Read the solution",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;

  const copy = solutionIndexCopy[locale];
  const prefix = locale === "fr" ? "" : "/en";

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/solutions`,
      languages: {
        fr: `${SITE_URL}/solutions`,
        en: `${SITE_URL}/en/solutions`,
        "x-default": `${SITE_URL}/solutions`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${SITE_URL}${prefix}/solutions`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: `${SITE_URL}/images/og-default.png`,
          width: 1200,
          height: 630,
          alt: copy.ogAlt,
        },
      ],
    },
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const copy = solutionIndexCopy[locale];
  const prefix = locale === "fr" ? "" : "/en";
  const solutions = getSolutions(locale);
  const breadcrumbs = [
    { name: copy.breadcrumbHome, href: locale === "fr" ? "/" : "/en" },
    { name: copy.breadcrumbSolutions, href: `${prefix}/solutions` },
  ];

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <ServiceJsonLd
        name={copy.h1}
        description={copy.serviceDescription}
        locale={locale}
        dateModified={SOLUTION_LAST_UPDATED}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-6xl mx-auto">
        <section className="mb-16">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-emerald-300 mb-5">
            {copy.eyebrow}
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-7 gradient-text">
            {copy.h1}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
            {copy.lead}
          </p>
          <p className="mt-6 text-sm text-slate-500">
            {copy.updatedPrefix}{" "}
            <time dateTime={SOLUTION_LAST_UPDATED} className="text-slate-400">
              {copy.updatedDate}
            </time>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`${prefix}/contact`} variant="primary" icon="trending_up">
              {copy.primaryCta}
            </Button>
            <Button href={`${prefix}/services`} variant="glass">
              {copy.secondaryCta}
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20" aria-label={copy.principlesLabel}>
          {copy.principles.map((item) => (
            <GlassCard key={item.title} className="h-full">
              <h2 className="text-lg font-bold text-white mb-3">{item.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </GlassCard>
          ))}
        </section>

        <section aria-labelledby="solutions-list-title">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-300 mb-3">
                {copy.waveEyebrow}
              </p>
              <h2 id="solutions-list-title" className="text-3xl md:text-5xl font-extrabold tracking-tighter">
                {copy.waveTitle}
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              {copy.waveDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((solution) => {
              const accent = accentStyles[solution.accent];
              return (
                <Link
                  key={solution.slug}
                  href={`${prefix}/solutions/${solution.slug}`}
                  className="group block"
                >
                  <GlassCard
                    className={`h-full transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-2xl ${accent.ring}`}
                    borderColor={accent.border}
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <span
                        className={`material-symbols-outlined shrink-0 rounded-2xl border ${accent.border} ${accent.bg} ${accent.text} p-3 text-3xl`}
                        aria-hidden="true"
                      >
                        {solution.icon}
                      </span>
                      <div>
                        <p className={`text-xs font-bold tracking-[0.18em] uppercase ${accent.text} mb-2`}>
                          {solution.primaryKeyword}
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white/90">
                          {solution.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      {solution.seoDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.secondaryKeywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <span className={`inline-flex items-center gap-2 text-sm font-bold ${accent.text}`}>
                      {copy.readLabel}
                      <span className="material-symbols-outlined text-lg" aria-hidden="true">
                        arrow_forward
                      </span>
                    </span>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
