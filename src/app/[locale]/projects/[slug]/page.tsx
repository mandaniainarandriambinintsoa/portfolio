import type { Metadata } from "next";
import Image from "next/image";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data/projects";
import { getCaseStudy } from "@/lib/data/case-studies";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import SoftwareAppJsonLd from "@/components/seo/SoftwareAppJsonLd";
import Button from "@/components/ui/Button";
import { workflows } from "@/lib/data/workflows";
import N8nWorkflowSection from "@/components/ui/N8nWorkflowSection";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of i18n.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
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
  const project = await getProjectBySlug(slug, locale);

  if (!project) return {};

  const prefix = locale === "fr" ? "" : "/en";
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/projects/${slug}`,
      languages: {
        fr: `${SITE_URL}/projects/${slug}`,
        en: `${SITE_URL}/en/projects/${slug}`,
        "x-default": `${SITE_URL}/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      images: [
        {
          url: `${SITE_URL}${project.image}`,
          width: 1200,
          height: 675,
          alt: `${project.title} - ${project.subtitle}`,
        },
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const project = await getProjectBySlug(slug, locale);

  if (!project) notFound();

  const prefix = locale === "fr" ? "" : "/en";
  const isWorkflow = project.category === "workflow";
  const workflow = project.workflowFile ? workflows[project.workflowFile] : null;
  const caseStudy = getCaseStudy(slug, locale);
  const caseStudyLabels = locale === "fr"
    ? {
        sectionTitle: "Du brief au code",
        sectionKicker: "Workflow design IA-first",
        briefTitle: "Le brief",
        variantsTitle: "Les variantes design (GPT-Image 2)",
        decisionTitle: "La direction retenue",
        finalTitle: "L'intégration finale",
      }
    : {
        sectionTitle: "From brief to code",
        sectionKicker: "AI-first design workflow",
        briefTitle: "The brief",
        variantsTitle: "Design variants (GPT-Image 2)",
        decisionTitle: "Selected direction",
        finalTitle: "Final build",
      };

  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: dict.projects.title, href: `${prefix}/projects` },
    { name: project.title, href: `${prefix}/projects/${slug}` },
  ];

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareAppJsonLd
        name={project.title}
        description={project.description}
        image={project.image}
        url={`${prefix}/projects/${slug}`}
        keywords={project.tags}
        category={isWorkflow ? "workflow" : "webapp"}
      />
      <div className="max-w-4xl mx-auto">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-6">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
              isWorkflow
                ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-300"
                : "bg-indigo-600/20 border border-indigo-500/30 text-indigo-300"
            }`}
          >
            {isWorkflow
              ? dict.projects.category_workflow
              : dict.projects.category_webapp}
          </span>
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                isWorkflow
                  ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-300"
                  : "bg-indigo-600/20 border border-indigo-500/30 text-indigo-300"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-2 gradient-text">
          {project.title}
        </h1>
        <p className={`text-xl font-medium mb-8 ${
          isWorkflow ? "text-emerald-400" : "text-indigo-400"
        }`}>
          {project.subtitle}
        </p>

        {/* Hero visual: Image for webapp, N8N viewer for workflow */}
        {isWorkflow && workflow ? (
          <N8nWorkflowSection workflow={workflow} />
        ) : (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10">
            <Image
              src={project.image}
              alt={`${project.title} - ${project.subtitle}`}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Case study (optionnel) */}
        {caseStudy && (
          <section
            aria-labelledby="case-study-title"
            className="mb-12"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">
              {caseStudyLabels.sectionKicker}
            </p>
            <h2
              id="case-study-title"
              className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-10 gradient-text"
            >
              {caseStudyLabels.sectionTitle}
            </h2>

            {/* Brief */}
            <div className="glass-card rounded-2xl p-8 md:p-10 mb-10">
              <h3 className="text-xl font-bold tracking-tight mb-4 text-white">
                {caseStudyLabels.briefTitle}
              </h3>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                {caseStudy.brief}
              </p>
            </div>

            {/* Variants */}
            <div className="mb-10">
              <h3 className="text-xl font-bold tracking-tight mb-3 text-white">
                {caseStudyLabels.variantsTitle}
              </h3>
              <p className="text-base text-slate-400 leading-relaxed mb-6">
                {caseStudy.variantsIntro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.variants.map((variant) => (
                  <figure
                    key={variant.label}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-video border-b border-white/10">
                      <Image
                        src={variant.image}
                        alt={variant.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 440px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="p-6">
                      <p className="text-sm font-bold tracking-wider uppercase text-indigo-300 mb-2">
                        {variant.label}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {variant.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Decision */}
            <div className="glass-card rounded-2xl p-8 md:p-10 mb-10 border-l-4 border-indigo-500/60">
              <h3 className="text-xl font-bold tracking-tight mb-4 text-white">
                {caseStudyLabels.decisionTitle}
              </h3>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                {caseStudy.decision}
              </p>
            </div>

            {/* Final */}
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-4 text-white">
                {caseStudyLabels.finalTitle}
              </h3>
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 mb-4">
                <Image
                  src={caseStudy.finalImage}
                  alt={`${project.title} - ${caseStudyLabels.finalTitle}`}
                  width={1440}
                  height={2400}
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {caseStudy.finalCaption}
              </p>
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="flex gap-4 flex-wrap">
          {project.link && (
            <Button href={project.link} variant="primary" icon="north_east">
              {locale === "fr" ? "Voir le projet" : "View Project"}
            </Button>
          )}
          <Button href={`${prefix}/projects`} variant="glass">
            {locale === "fr" ? "Tous les projets" : "All Projects"}
          </Button>
        </div>
      </div>
    </main>
  );
}
