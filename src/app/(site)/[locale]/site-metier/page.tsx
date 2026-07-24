import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { getProjects } from "@/lib/data/projects";
import GlassCard from "@/components/ui/GlassCard";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const prefix = locale === "fr" ? "" : "/en";
  const title = locale === "fr" ? "Sites métier premium" : "Premium Business Websites";
  const description =
    locale === "fr"
      ? "Catalogue de sites métier premium conçus pour vendre une activité locale ou sectorielle avec preuve, SEO/GEO, formulaire et workflow de conversion."
      : "Catalog of premium business websites built to sell a local or sector-specific activity with proof, SEO/GEO, forms and conversion workflow.";

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

  const copy =
    locale === "fr"
      ? {
          kicker: "Catalogue métier",
          title: "Sites métier premium",
          intro:
            "Des sites vitrine vendables, pensés par secteur : brief business, maquettes IA, preuves de confiance, SEO/GEO, formulaire qualifié et workflow de suivi.",
          cta: "Voir l'étude",
          live: "Site en ligne",
        }
      : {
          kicker: "Business catalog",
          title: "Premium business websites",
          intro:
            "Sellable showcase websites shaped by industry: business brief, AI design directions, trust proof, SEO/GEO, qualified forms and follow-up workflow.",
          cta: "View case study",
          live: "Live site",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </main>
  );
}
