import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ProjectItem } from "@/lib/types";
import type { PageLayoutBlock } from "@/lib/data/pages";
import Hero from "@/components/sections/Hero";
import ClientLogos from "@/components/sections/ClientLogos";
import CommandCenter from "@/components/sections/CommandCenter";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import HowToJsonLd from "@/components/seo/HowToJsonLd";
import Approach from "@/components/sections/Approach";
import HomeSeoGrowthProof from "@/components/sections/HomeSeoGrowthProof";
import CollaborationGuides from "@/components/sections/CollaborationGuides";
import TechStack from "@/components/sections/TechStack";
import FAQ from "@/components/sections/FAQ";
import CTAFinal from "@/components/sections/CTAFinal";
import HeroAnimations from "@/components/animations/HeroAnimations";

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const VisitorTracking = dynamic(() => import("@/components/sections/VisitorTracking"));
const CommandCenterAnim = dynamic(() => import("@/components/animations/CommandCenterAnim"));
const PricingAnim = dynamic(() => import("@/components/animations/PricingAnim"));
const ProcessAnim = dynamic(() => import("@/components/animations/ProcessAnim"));
const ApproachAnim = dynamic(() => import("@/components/animations/ApproachAnim"));
const CollaborationGuidesAnim = dynamic(() => import("@/components/animations/CollaborationGuidesAnim"));
const TechStackAnim = dynamic(() => import("@/components/animations/TechStackAnim"));
const FAQAnim = dynamic(() => import("@/components/animations/FAQAnim"));
const VisitorTrackingAnim = dynamic(() => import("@/components/animations/VisitorTrackingAnim"));
const CTAFinalAnim = dynamic(() => import("@/components/animations/CTAFinalAnim"));

type Props = {
  dict: Dictionary;
  layout: PageLayoutBlock[];
  locale: Locale;
  projects: ProjectItem[];
};

export default function HomeLayoutRenderer({ dict, layout, locale, projects }: Props) {
  return (
    <>
      {layout.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`;

        switch (block.blockType) {
          case "homeHero":
            return (
              <HeroAnimations key={key}>
                <Hero dict={dict.hero} locale={locale} />
              </HeroAnimations>
            );

          case "homeClientLogos":
            return <ClientLogos key={key} dict={dict.client_logos} />;

          case "homeCommandCenter":
            return (
              <div key={key} className="below-fold">
                <CommandCenterAnim>
                  <CommandCenter dict={dict.command_center} />
                </CommandCenterAnim>
              </div>
            );

          case "homeServices":
            return (
              <div key={key} className="below-fold">
                <ServicesGrid locale={locale} />
              </div>
            );

          case "homeProcess":
            return (
              <div key={key} className="below-fold">
                <HowToJsonLd
                  name={
                    locale === "fr"
                      ? "Comment je livre un site Next.js ou un SaaS"
                      : "How I deliver a Next.js website or SaaS"
                  }
                  description={
                    locale === "fr"
                      ? "Mon processus de conception, developpement et deploiement pour les projets Next.js, IA et automatisation n8n."
                      : "My process for designing, developing and deploying Next.js, AI and n8n automation projects."
                  }
                  locale={locale}
                  url={locale === "fr" ? "/" : "/en"}
                  steps={dict.process.steps.map((step: { title: string; description: string }) => ({
                    name: step.title,
                    text: step.description,
                  }))}
                />
                <ProcessAnim>
                  <Process title={dict.process.title} steps={dict.process.steps} />
                </ProcessAnim>
              </div>
            );

          case "homeApproach":
            return (
              <div key={key} className="below-fold">
                <ApproachAnim>
                  <Approach dict={dict.approach} />
                </ApproachAnim>
              </div>
            );

          case "homeTestimonials":
            return (
              <div key={key} className="below-fold">
                <Testimonials dict={dict.testimonials} locale={locale} />
              </div>
            );

          case "homeStats":
            return (
              <div key={key} className="below-fold">
                <HomeSeoGrowthProof locale={locale} />
              </div>
            );

          case "homeCollaborationGuides":
            return (
              <div key={key} className="below-fold">
                <CollaborationGuidesAnim>
                  <CollaborationGuides
                    badge={dict.collaboration_guides.badge}
                    title={dict.collaboration_guides.title}
                    subtitle={dict.collaboration_guides.subtitle}
                    readLabel={dict.collaboration_guides.read_label}
                    pdfLabel={dict.collaboration_guides.pdf_label}
                    pagesLabel={dict.collaboration_guides.pages_label}
                    items={dict.collaboration_guides.items}
                  />
                </CollaborationGuidesAnim>
              </div>
            );

          case "homePricing":
            return (
              <div key={key} className="below-fold">
                <PricingAnim>
                  <Pricing dict={dict.pricing} />
                </PricingAnim>
              </div>
            );

          case "homeTechStack":
            return (
              <div key={key} className="below-fold">
                <TechStackAnim>
                  <TechStack label={dict.tech_stack.label} />
                </TechStackAnim>
              </div>
            );

          case "homeProjects":
            return (
              <div key={key} className="below-fold">
                <Projects
                  title={dict.projects.title}
                  viewAll={dict.projects.view_all}
                  items={projects}
                  locale={locale}
                  categoryLabels={{
                    webapp: dict.projects.category_webapp,
                    workflow: dict.projects.category_workflow,
                    siteMetier: dict.projects.category_site_metier,
                  }}
                />
              </div>
            );

          case "homeVisitorTracking":
            return (
              <div key={key} className="below-fold">
                <VisitorTrackingAnim>
                  <VisitorTracking dict={dict.visitor_tracking} locale={locale} />
                </VisitorTrackingAnim>
              </div>
            );

          case "homeFAQ":
            return (
              <div key={key} className="below-fold">
                <FAQAnim>
                  <FAQ title={dict.faq.title} items={dict.faq.items} />
                </FAQAnim>
              </div>
            );

          case "homeCTAFinal":
            return (
              <div key={key} className="below-fold">
                <CTAFinalAnim>
                  <CTAFinal
                    title={dict.cta_final.title}
                    titleHighlight={dict.cta_final.title_highlight}
                    titleEnd={dict.cta_final.title_end}
                    subtitle={dict.cta_final.subtitle}
                    button={dict.cta_final.button}
                    buttonHref={dict.cta_final.button_href}
                    quizButton={dict.cta_final.quiz_button}
                    quizHref={dict.cta_final.quiz_href}
                  />
                </CTAFinalAnim>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
