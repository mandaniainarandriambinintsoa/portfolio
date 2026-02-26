import dynamic from "next/dynamic";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Hero from "@/components/sections/Hero";
import CommandCenter from "@/components/sections/CommandCenter";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Process from "@/components/sections/Process";
// Testimonials uses GSAP directly — dynamic import to keep it out of initial bundle
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
import Stats from "@/components/sections/Stats";
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
const ServicesGridAnim = dynamic(() => import("@/components/animations/ServicesGridAnim"));
const ProcessAnim = dynamic(() => import("@/components/animations/ProcessAnim"));
const StatsAnim = dynamic(() => import("@/components/animations/StatsAnim"));
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

      <CommandCenterAnim>
        <CommandCenter fileName={dict.command_center.file_name} />
      </CommandCenterAnim>

      <ServicesGridAnim>
        <ServicesGrid items={dict.services.items.filter((s: { isLanding?: boolean }) => !s.isLanding)} />
      </ServicesGridAnim>

      <ProcessAnim>
        <Process title={dict.process.title} steps={dict.process.steps} />
      </ProcessAnim>

      <Testimonials dict={dict.testimonials} locale={locale} />

      <StatsAnim>
        <Stats title={dict.stats.title} items={dict.stats.items} />
      </StatsAnim>

      <TechStackAnim>
        <TechStack label={dict.tech_stack.label} />
      </TechStackAnim>

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

      <VisitorTrackingAnim>
        <VisitorTracking
          dict={dict.visitor_tracking}
          locale={locale}
        />
      </VisitorTrackingAnim>

      <FAQAnim>
        <FAQ title={dict.faq.title} items={dict.faq.items} />
      </FAQAnim>

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
    </main>
  );
}
