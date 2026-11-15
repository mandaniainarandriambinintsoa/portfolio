import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import {
  compactMetadataDescription,
  compactMetadataTitle,
} from "@/lib/seo-metadata";

const experienceCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    introduction: string;
    responsibilities: string;
    skills: string;
    recentProjects: string;
    viewProject: string;
  }
> = {
  fr: {
    eyebrow: "EXPÉRIENCE",
    title: "Un parcours construit par la livraison",
    introduction:
      "Du développement React aux applications métier, puis aux systèmes full-stack et aux automatisations : chaque étape a ajouté une couche de méthode à ma façon de construire.",
    responsibilities: "Responsabilités principales",
    skills: "Compétences mobilisées",
    recentProjects: "Réalisations récentes",
    viewProject: "Voir l’étude de cas",
  },
  en: {
    eyebrow: "EXPERIENCE",
    title: "A career shaped by delivery",
    introduction:
      "From React development to business applications, then full-stack systems and automation: each role added another layer to the way I build products.",
    responsibilities: "Key responsibilities",
    skills: "Skills used",
    recentProjects: "Recent work",
    viewProject: "View case study",
  },
};

function getCompanyInitials(company: string) {
  return company
    .split(/[.\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (
    i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale
  ) as Locale;
  const dict = await getDictionary(locale);

  const path = locale === "fr" ? "/about" : "/en/about";
  const title = compactMetadataTitle(dict.meta.about.title);
  const description = compactMetadataDescription(dict.meta.about.description);
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        fr: `${SITE_URL}/about`,
        en: `${SITE_URL}/en/about`,
        "x-default": `${SITE_URL}/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      type: "profile",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: `${SITE_URL}/images/manda-photo2.webp`,
          width: 288,
          height: 336,
          alt: "Mandaniaina Randriambinintsoa",
        },
      ],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (
    i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale
  ) as Locale;
  const dict = await getDictionary(locale);
  const about = dict.about;
  const labels = experienceCopy[locale];

  const breadcrumbs = [
    {
      name: locale === "fr" ? "Accueil" : "Home",
      href: locale === "fr" ? "/" : "/en",
    },
    { name: about.title, href: locale === "fr" ? "/about" : "/en/about" },
  ];

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 gradient-text">
          {about.title}
        </h1>
        <p className="text-xl text-indigo-400 font-medium mb-12">
          {about.subtitle}
        </p>

        {/* Bio + Photo */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-6">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Image
                src="/images/manda-photo2.webp"
                alt={
                  locale === "fr"
                    ? "Mandaniaina Randriambinintsoa, développeur d’applications métier et consultant n8n"
                    : "Mandaniaina Randriambinintsoa, business application developer and n8n consultant"
                }
                width={288}
                height={336}
                className="rounded-2xl object-cover border border-white/10"
                priority
              />
            </div>
            <div className="flex-1">
              <p className="text-lg text-slate-300 leading-relaxed">
                {about.bio}
              </p>
            </div>
          </div>
          <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-slate-400 mb-8">
            &ldquo;{about.philosophy}&rdquo;
          </blockquote>

          <h3 className="text-xl font-bold mb-4 text-white">
            {about.approach_title}
          </h3>
          <ul className="space-y-3 mb-8">
            {about.approach_items.map((item: string) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <IconScoutIcon
                  name="check"
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-slate-300 leading-relaxed mb-4">
            {about.experience}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              className="text-indigo-300 underline underline-offset-4"
              href={locale === "fr" ? "/contact" : "/en/contact"}
            >
              {about.cta}
            </Link>
            <Link
              className="text-indigo-300 underline underline-offset-4"
              href={
                locale === "fr" ? "/projects/teamia" : "/en/projects/teamia"
              }
            >
              TeamIA
            </Link>
            <Link
              className="text-indigo-300 underline underline-offset-4"
              href={
                locale === "fr" ? "/projects/meckia" : "/en/projects/meckia"
              }
            >
              Meckia
            </Link>
          </div>
        </div>

        <section aria-labelledby="experience-title" className="pt-4">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-indigo-400">
              {labels.eyebrow}
            </p>
            <h2
              id="experience-title"
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              {labels.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
              {labels.introduction}
            </p>
          </div>

          <ol className="relative divide-y divide-white/10 before:absolute before:bottom-10 before:left-4 before:top-8 before:w-px before:bg-gradient-to-b before:from-indigo-400/60 before:via-indigo-500/20 before:to-transparent md:before:left-6">
            {[...about.timeline].reverse().map((item) => (
              <li
                key={`${item.company}-${item.period}`}
                className="relative py-10 pl-12 md:pl-20"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-11 flex h-8 w-8 items-center justify-center rounded-full border border-indigo-400/35 bg-slate-950 text-[10px] font-black tracking-tight text-indigo-300 md:left-2"
                >
                  {getCompanyInitials(item.company)}
                </div>

                <article>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="mb-3 text-sm font-semibold text-indigo-300">
                        {item.period}
                      </p>
                      <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base font-semibold text-slate-200">
                        {item.company}
                        <span className="font-normal text-slate-500">
                          {" "}· {item.employmentType}
                        </span>
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 text-sm text-slate-500 lg:max-w-64 lg:justify-end lg:text-right">
                      <IconScoutIcon name="location" size={17} />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300">
                    {item.description}
                  </p>

                  <div className="mt-7 grid gap-7 border-t border-white/8 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(13rem,0.42fr)]">
                    <div>
                      <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        {labels.responsibilities}
                      </h4>
                      <ul className="space-y-3">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                          >
                            <IconScoutIcon
                              name="check"
                              size={17}
                              className="mt-0.5 shrink-0 text-emerald-400"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        {labels.skills}
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {item.recentProjects.length > 0 ? (
                    <div className="mt-8">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">
                        {labels.recentProjects}
                      </h4>
                      <ul className="divide-y divide-white/10 border-y border-white/10">
                        {item.recentProjects.map((project) => (
                          <li key={project.href}>
                            <Link
                              href={project.href}
                              className="group flex items-start justify-between gap-4 py-4"
                            >
                              <span>
                                <span className="block font-semibold text-white transition-colors group-hover:text-indigo-300">
                                  {project.title}
                                </span>
                                <span className="mt-1 block text-sm leading-relaxed text-slate-400">
                                  {project.description}
                                </span>
                              </span>
                              <span className="mt-0.5 flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-300">
                                <span className="hidden sm:inline">
                                  {labels.viewProject}
                                </span>
                                <IconScoutIcon
                                  name="arrowUpRight"
                                  size={17}
                                />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
