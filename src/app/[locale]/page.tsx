import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Hero from "@/components/sections/Hero";
import CommandCenter from "@/components/sections/CommandCenter";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import FAQ from "@/components/sections/FAQ";
import CTAFinal from "@/components/sections/CTAFinal";
import { getProjects } from "@/lib/data/projects";
import HeroAnimations from "@/components/animations/HeroAnimations";
import CommandCenterAnim from "@/components/animations/CommandCenterAnim";
import ServicesGridAnim from "@/components/animations/ServicesGridAnim";
import ProcessAnim from "@/components/animations/ProcessAnim";
import StatsAnim from "@/components/animations/StatsAnim";
import TechStackAnim from "@/components/animations/TechStackAnim";
import FAQAnim from "@/components/animations/FAQAnim";
import CTAFinalAnim from "@/components/animations/CTAFinalAnim";
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
