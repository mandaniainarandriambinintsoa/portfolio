import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { getProjects } from "@/lib/data/projects";
import { getBusinessVerticals, type BusinessVerticalTone } from "@/lib/data/business-verticals";
import GlassCard from "@/components/ui/GlassCard";
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";

const verticalTone: Record<BusinessVerticalTone, { text: string; border: string; bg: string }> = {
  amber: { text: "text-amber-300", border: "border-amber-400/25", bg: "bg-amber-400/8" },
  blue: { text: "text-blue-300", border: "border-blue-400/25", bg: "bg-blue-400/8" },
  cyan: { text: "text-cyan-300", border: "border-cyan-400/25", bg: "bg-cyan-400/8" },
  emerald: { text: "text-emerald-300", border: "border-emerald-400/25", bg: "bg-emerald-400/8" },
  orange: { text: "text-orange-300", border: "border-orange-400/25", bg: "bg-orange-400/8" },
  rose: { text: "text-rose-300", border: "border-rose-400/25", bg: "bg-rose-400/8" },
  sky: { text: "text-sky-300", border: "border-sky-400/25", bg: "bg-sky-400/8" },
  violet: { text: "text-violet-300", border: "border-violet-400/25", bg: "bg-violet-400/8" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const prefix = locale === "fr" ? "" : "/en";
  const title = locale === "fr" ? "Création de sites internet métier" : "Business website development";
  const description =
    locale === "fr"
      ? "Sites internet métier conçus pour générer des demandes : voyage, garage, BTP, beauté, hôtel, restaurant et location de voiture, avec SEO et automatisation."
      : "Business websites designed to generate enquiries for travel, automotive, construction, beauty, hotels, restaurants and car rental, with SEO and automation.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/site-metier`,
      languages: {
        fr: `${SITE_URL}/site-metier`,
        en: `${SITE_URL}/en/site-metier`,
        "x-default": `${SITE_URL}/site-metier`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${prefix}/site-metier`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: `${SITE_URL}/images/projects/bati-diaspora/cover-hero.webp`,
          width: 1600,
          height: 900,
          alt: "Catalogue sites métier Manda",
        },
      ],
    },
  };
}

export default async function SiteMetierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const prefix = locale === "fr" ? "" : "/en";
  const projects = (await getProjects(locale)).filter(
    (project) => project.category === "site-metier",
  );
  const verticals = getBusinessVerticals(locale);

  const copy =
    locale === "fr"
      ? {
          kicker: "Acquisition par secteur",
          title: "Des sites métier conçus pour générer des demandes",
          intro:
            "Chaque secteur possède ses propres objections, informations et actions de conversion. Je construis le site, son référencement et, si utile, les automatisations qui relient la demande aux opérations.",
          verticalTitle: "Choisissez votre activité",
          verticalIntro: "Chaque page détaille le parcours client, les fonctions utiles, les automatisations possibles et les preuves qui soutiennent la proposition.",
          proofTitle: "Réalisations et systèmes déjà construits",
          proofIntro: "Ces études de cas montrent la méthode, les choix UI/UX et les intégrations derrière les pages commerciales.",
          cta: "Voir l'étude",
          live: "Site en ligne",
          contactTitle: "Votre activité n'est pas dans la liste ?",
          contactText: "Je peux cartographier le parcours de recherche, les demandes clients et les automatisations utiles avant de proposer la structure du site.",
          contactCta: "Parler de votre activité",
        }
      : {
          kicker: "Sector acquisition",
          title: "Business websites designed to generate enquiries",
          intro:
            "Each sector has different objections, information and conversion actions. I build the website, its search structure and, when useful, the automation connecting enquiries to operations.",
          verticalTitle: "Choose your business",
          verticalIntro: "Each page explains the customer journey, useful features, optional automation and evidence supporting the offer.",
          proofTitle: "Delivered websites and systems",
          proofIntro: "These case studies document the method, UI/UX decisions and integrations behind the commercial pages.",
          cta: "View case study",
          live: "Live site",
          contactTitle: "Is your business not listed?",
          contactText: "I can map the search journey, customer enquiries and useful automations before proposing the website structure.",
          contactCta: "Discuss your business",
        };

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-bold tracking-[0.22em] uppercase text-amber-300 mb-4">
          {copy.kicker}
        </p>
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.82fr)_minmax(280px,0.34fr)] md:items-end mb-14">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter gradient-text">
            {copy.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-slate-300">
            {copy.intro}
          </p>
        </div>

        <section className="mb-24">
          <SectionHeading title={copy.verticalTitle} description={copy.verticalIntro} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((vertical) => {
              const tone = verticalTone[vertical.tone];
              return (
                <Link
                  key={vertical.key}
                  href={`${prefix}/site-metier/${vertical.slug}`}
                  className={`group min-h-64 rounded-lg border ${tone.border} ${tone.bg} p-6 transition-transform hover:-translate-y-1`}
                  data-ph-event="business_vertical_opened"
                  data-ph-props={JSON.stringify({ business_vertical: vertical.key, locale, area: "business_vertical_hub" })}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${tone.border} bg-black/20 ${tone.text}`}>
                    <IconScoutIcon name={vertical.icon} size={23} />
                  </div>
                  <h2 className="mt-7 text-xl font-bold text-white">{vertical.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{vertical.primaryAction}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {vertical.heroHighlights.slice(0, 2).map((item) => (
                      <span key={item} className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-400">
                        {item}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-24 border-y border-white/10 py-10 md:flex md:items-center md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white">{copy.contactTitle}</h2>
            <p className="mt-3 leading-relaxed text-slate-400">{copy.contactText}</p>
          </div>
          <Link
            href={`${prefix}/contact`}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 font-bold text-slate-950 transition-colors hover:bg-slate-200 md:mt-0"
            data-ph-event="cta_clicked"
            data-ph-props={JSON.stringify({ cta_type: "contact", cta_location: "business_vertical_hub", locale })}
          >
            {copy.contactCta}
          </Link>
        </section>

        <section>
          <SectionHeading title={copy.proofTitle} description={copy.proofIntro} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <GlassCard
              key={project.slug}
              noPadding
              className="group overflow-hidden hover:bg-white/5 transition-colors"
            >
              <Link href={`${prefix}/projects/${project.slug}`} className="block">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.subtitle}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-600 text-xs font-bold uppercase tracking-wider text-white">
                    {dict.projects.category_site_metier}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                  <p className="text-sm text-amber-400 mb-3">{project.subtitle}</p>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/5 text-xs font-bold uppercase tracking-wider text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold">
                    <span className="text-white">{copy.cta}</span>
                    {project.link ? (
                      <span className="text-amber-300">
                        {copy.live}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            </GlassCard>
          ))}
          </div>
        </section>
      </div>
    </main>
  );
}
