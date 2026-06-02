import dynamic from "next/dynamic";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Hero from "@/components/sections/Hero";
import ClientLogos from "@/components/sections/ClientLogos";
import CommandCenter from "@/components/sections/CommandCenter";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import HowToJsonLd from "@/components/seo/HowToJsonLd";
import Approach from "@/components/sections/Approach";
// Testimonials uses GSAP directly — dynamic import to keep it out of initial bundle
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
import Stats from "@/components/sections/Stats";
import CollaborationGuides from "@/components/sections/CollaborationGuides";
import TechStack from "@/components/sections/TechStack";
// Projects uses GSAP directly — dynamic import to keep it out of initial bundle
const Projects = dynamic(() => import("@/components/sections/Projects"));
import FAQ from "@/components/sections/FAQ";
import CTAFinal from "@/components/sections/CTAFinal";
// VisitorTracking is a client component with GSAP — dynamic import keeps GSAP out of initial bundle
const VisitorTracking = dynamic(() => import("@/components/sections/VisitorTracking"));
import { getProjects } from "@/lib/data/projects";

// Above-fold: static import (needed for LCP)
import HeroAnimations from "@/components/animations/HeroAnimations";

// Below-fold: dynamic imports (code-split GSAP ScrollTrigger out of initial bundle)
const CommandCenterAnim = dynamic(() => import("@/components/animations/CommandCenterAnim"));
const PricingAnim = dynamic(() => import("@/components/animations/PricingAnim"));
const ProcessAnim = dynamic(() => import("@/components/animations/ProcessAnim"));
const ApproachAnim = dynamic(() => import("@/components/animations/ApproachAnim"));
const StatsAnim = dynamic(() => import("@/components/animations/StatsAnim"));
const CollaborationGuidesAnim = dynamic(() => import("@/components/animations/CollaborationGuidesAnim"));
const TechStackAnim = dynamic(() => import("@/components/animations/TechStackAnim"));
const FAQAnim = dynamic(() => import("@/components/animations/FAQAnim"));
const VisitorTrackingAnim = dynamic(() => import("@/components/animations/VisitorTrackingAnim"));
const CTAFinalAnim = dynamic(() => import("@/components/animations/CTAFinalAnim"));
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const projects = await getProjects(locale);

  return (
    <main id="main-content" className="relative min-h-screen">
      <HeroAnimations>
        <Hero dict={dict.hero} locale={locale} />
      </HeroAnimations>

      <ClientLogos dict={dict.client_logos} />

      <div className="below-fold">
        <CommandCenterAnim>
          <CommandCenter dict={dict.command_center} />
        </CommandCenterAnim>
      </div>

      <div className="below-fold">
        <ServicesGrid locale={locale} />
      </div>

      <div className="below-fold">
        <HowToJsonLd
          name={
            locale === "fr"
              ? "Comment je livre un site Next.js ou un SaaS"
              : "How I deliver a Next.js website or SaaS"
          }
          description={
            locale === "fr"
              ? "Mon processus de conception, développement et déploiement pour les projets Next.js, IA et automatisation n8n."
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

      <div className="below-fold">
        <ApproachAnim>
          <Approach dict={dict.approach} />
        </ApproachAnim>
      </div>

      <div className="below-fold">
        <Testimonials dict={dict.testimonials} locale={locale} />
      </div>

      <div className="below-fold">
        <StatsAnim>
          <Stats title={dict.stats.title} items={dict.stats.items} />
        </StatsAnim>
      </div>

      <div className="below-fold">
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

      <div className="below-fold">
        <PricingAnim>
          <Pricing dict={dict.pricing} />
        </PricingAnim>
      </div>

      <div className="below-fold">
        <TechStackAnim>
          <TechStack label={dict.tech_stack.label} />
        </TechStackAnim>
      </div>

      <div className="below-fold">
        <Projects
          title={dict.projects.title}
          viewAll={dict.projects.view_all}
          items={projects}
          locale={locale}
          categoryLabels={{
            webapp: dict.projects.category_webapp,
            workflow: dict.projects.category_workflow,
          }}
        />
      </div>

      <div className="below-fold">
        <VisitorTrackingAnim>
          <VisitorTracking
            dict={dict.visitor_tracking}
            locale={locale}
          />
        </VisitorTrackingAnim>
      </div>

      <div className="below-fold">
        <FAQAnim>
          <FAQ title={dict.faq.title} items={dict.faq.items} />
        </FAQAnim>
      </div>

      <div className="below-fold">
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
    </main>
  );
}
