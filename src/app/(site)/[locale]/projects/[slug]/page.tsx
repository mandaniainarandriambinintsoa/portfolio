import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/data/projects";
import { getProjectSeoDetails } from "@/lib/data/project-seo-details";
import { getCaseStudy } from "@/lib/data/case-studies";
import { getCategoryLabel, getProjectTone } from "@/lib/project-display";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FAQJsonLd from "@/components/seo/FAQJsonLd";
import SoftwareAppJsonLd from "@/components/seo/SoftwareAppJsonLd";
import Button from "@/components/ui/Button";
import { workflows } from "@/lib/data/workflows";
import N8nWorkflowSection from "@/components/ui/N8nWorkflowSection";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return i18n.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

function projectMetadataTitle(title: string, subtitle: string) {
  const normalizedTitle = title.trim();
  const normalizedSubtitle = subtitle.trim();
  if (
    !normalizedSubtitle ||
    normalizedTitle.localeCompare(normalizedSubtitle, undefined, { sensitivity: "accent" }) === 0
  ) {
    return normalizedTitle;
  }
  return `${normalizedTitle} - ${normalizedSubtitle}`;
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

  const projectSeo = getProjectSeoDetails(slug, locale);
  const metaTitle = projectSeo?.metaTitle ?? projectMetadataTitle(project.title, project.subtitle);
  const metaDescription = projectSeo?.metaDescription ?? project.description;
  const prefix = locale === "fr" ? "" : "/en";
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `${SITE_URL}${prefix}/projects/${slug}`,
      languages: {
        fr: `${SITE_URL}/projects/${slug}`,
        en: `${SITE_URL}/en/projects/${slug}`,
        "x-default": `${SITE_URL}/projects/${slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: `${SITE_URL}${project.image}`,
          width: 1200,
          height: 675,
          alt: metaTitle,
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
  const categoryLabel = getCategoryLabel(project.category, {
    webapp: dict.projects.category_webapp,
    workflow: dict.projects.category_workflow,
    siteMetier: dict.projects.category_site_metier,
  });
  const categoryTone = getProjectTone(project.category);
  const workflow = project.workflowFile ? workflows[project.workflowFile] : null;
  const usesProductScreenshot = slug === "veille-codeur-automatisation-n8n";
  const usesWideWorkflowScreenshot = slug === "international-opportunity-agent-n8n";
  const caseStudy = getCaseStudy(slug, locale);
  const projectSeo = getProjectSeoDetails(slug, locale);
  const seoTone = categoryTone === "emerald"
    ? {
        text: "text-emerald-300",
        softText: "text-emerald-200",
        border: "border-emerald-500/25",
        strongBorder: "border-emerald-400/50",
        bg: "bg-emerald-500/10",
      }
    : categoryTone === "amber"
      ? {
          text: "text-amber-300",
          softText: "text-amber-200",
          border: "border-amber-500/25",
          strongBorder: "border-amber-400/50",
          bg: "bg-amber-500/10",
        }
      : {
          text: "text-indigo-300",
          softText: "text-indigo-200",
          border: "border-indigo-500/25",
          strongBorder: "border-indigo-400/50",
          bg: "bg-indigo-500/10",
        };
  const caseStudyLabels = locale === "fr"
    ? {
        sectionTitle: "Du brief au code",
        sectionKicker: "Workflow design IA-first",
        briefTitle: "Le brief",
        variantsTitle: "Les variantes design IA",
        decisionTitle: "La direction retenue",
        finalTitle: "L'intégration finale",
      }
    : {
        sectionTitle: "From brief to code",
        sectionKicker: "AI-first design workflow",
        briefTitle: "The brief",
        variantsTitle: "AI design variants",
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
        category={project.category}
      />
      {projectSeo && <FAQJsonLd items={projectSeo.faq} />}
      <div className="max-w-4xl mx-auto">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-6">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
              categoryTone === "emerald"
                ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-300"
                : categoryTone === "amber"
                  ? "bg-amber-600/20 border border-amber-500/30 text-amber-300"
                : "bg-indigo-600/20 border border-indigo-500/30 text-indigo-300"
            }`}
          >
            {categoryLabel}
          </span>
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                categoryTone === "emerald"
                  ? "bg-emerald-600/20 border border-emerald-500/30 text-emerald-300"
                  : categoryTone === "amber"
                    ? "bg-amber-600/20 border border-amber-500/30 text-amber-300"
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
          categoryTone === "emerald"
            ? "text-emerald-400"
            : categoryTone === "amber"
              ? "text-amber-400"
              : "text-indigo-400"
        }`}>
          {project.subtitle}
        </p>

        {/* Hero visual: Image for webapp, N8N viewer for workflow */}
        {isWorkflow && workflow && !usesProductScreenshot ? (
          <N8nWorkflowSection workflow={workflow} />
        ) : (
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/10 mb-12 ${
              usesWideWorkflowScreenshot ? "aspect-[2/1] bg-white" : "aspect-video"
            }`}
          >
            <Image
              src={project.image}
              alt={`${project.title} - ${project.subtitle}`}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className={usesWideWorkflowScreenshot ? "object-contain" : "object-cover"}
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

        {projectSeo && (
          <section aria-labelledby="project-seo-title" className="mb-12">
            <p className={`text-xs font-bold tracking-[0.2em] uppercase ${seoTone.text} mb-3`}>
              {projectSeo.kicker}
            </p>
            <h2
              id="project-seo-title"
              className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-8 gradient-text"
            >
              {projectSeo.title}
            </h2>

            <div className={`glass-card rounded-2xl p-8 md:p-10 mb-6 border-l-4 ${seoTone.strongBorder} ${seoTone.bg}`}>
              <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                {projectSeo.summary}
              </p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {projectSeo.facts.map((fact) => (
                <div
                  key={`${fact.label}-${fact.value}`}
                  className={`glass-card rounded-2xl p-5 border ${seoTone.border}`}
                >
                  <dt className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-2">
                    {fact.label}
                  </dt>
                  <dd className={`text-base font-semibold ${seoTone.softText}`}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="space-y-8 mb-10">
              {projectSeo.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xl font-bold tracking-tight mb-4 text-white">
                    {section.title}
                  </h3>
                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {projectSeo.relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="group block h-full">
                  <div className={`glass-card rounded-2xl p-6 h-full border ${seoTone.border} transition-colors group-hover:bg-white/[0.04]`}>
                    <h3 className="font-bold text-white mb-2 group-hover:underline underline-offset-4">
                      {item.label}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="space-y-4">
              {projectSeo.faq.map((item) => (
                <div key={item.question} className="glass-card rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-3">{item.question}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

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
            <Button
              href={project.link}
              variant="glass"
              analytics={{
                event: "demo_opened",
                properties: {
                  area: "project_detail_actions",
                  slug,
                  title: project.title,
                  category: project.category,
                  href: project.link,
                  locale,
                },
              }}
            >
              {slug === "factumation"
                ? locale === "fr"
                  ? "Créer une facture gratuitement"
                  : "Create a free invoice"
                : locale === "fr"
                  ? "Voir le projet"
                  : "View Project"}
            </Button>
          )}
          <Button
            href={`${prefix}/contact`}
            variant="primary"
            analytics={{
              event: "cta_clicked",
              properties: {
                area: "project_detail_actions",
                cta_type: "contact",
                slug,
                title: project.title,
                locale,
              },
            }}
          >
            {locale === "fr"
              ? "Discuter d'un projet similaire"
              : "Discuss a similar project"}
          </Button>
          <Button
            href={`${prefix}/projects`}
            variant="glass"
            analytics={{
              event: "cta_clicked",
              properties: {
                area: "project_detail_actions",
                cta_type: "all_projects",
                slug,
                title: project.title,
                locale,
              },
            }}
          >
            {locale === "fr" ? "Tous les projets" : "All Projects"}
          </Button>
        </div>
      </div>
    </main>
  );
}
