import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { getProjects } from "@/lib/data/projects";
import ProjectsListing from "@/components/sections/ProjectsListing";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;

  const title = locale === "fr" ? "Projets & Réalisations" : "Projects & Portfolio";
  const description = locale === "fr"
    ? "Découvrez les projets réalisés par Manda : applications, automatisations, sites web et intégrations IA."
    : "Discover Manda's projects: applications, automations, websites and AI integrations.";

  const prefix = locale === "fr" ? "" : "/en";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/projects`,
      languages: {
        fr: `${SITE_URL}/projects`,
        en: `${SITE_URL}/en/projects`,
        "x-default": `${SITE_URL}/projects`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${prefix}/projects`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [{ url: `${SITE_URL}/images/manda-photo2.webp`, width: 288, height: 336, alt: "Manda - Projects" }],
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const prefix = locale === "fr" ? "" : "/en";
  const projects = await getProjects(locale);

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-16 gradient-text">
          {dict.projects.title}
        </h1>
        <ProjectsListing
          items={projects}
          prefix={prefix}
          categoryLabels={{
            all: dict.projects.category_all,
            webapp: dict.projects.category_webapp,
            workflow: dict.projects.category_workflow,
            siteMetier: dict.projects.category_site_metier,
          }}
        />
      </div>
    </main>
  );
}
