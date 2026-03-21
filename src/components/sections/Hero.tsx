import type { Locale } from "@/i18n/config";
import Button from "@/components/ui/Button";

type HeroDict = {
  line1: string;
  line2: string;
  line3: string;
  subtitle_prefix: string;
  subtitle_highlight: string;
  subtitle_rest: string;
  cta_primary: string;
  cta_secondary: string;
};

export default function Hero({
  dict,
  locale,
}: {
  dict: HeroDict;
  locale: Locale;
}) {
  const projectsHref = locale === "fr" ? "/#projects" : "/en/#projects";
  const contactHref = locale === "fr" ? "/contact" : "/en/contact";

  return (
    <section className="max-w-7xl w-full mx-auto text-center pt-16 md:pt-40 pb-8 md:pb-24 px-6 relative">
      <h1 className="text-3xl sm:text-5xl md:text-[65px] lg:text-[90px] xl:text-[113px] font-extrabold tracking-tighter leading-[0.85] mb-4 md:mb-12">
        <span className="block gradient-text">{dict.line1}</span>
        <span className="block gradient-text">{dict.line2}</span>
        <span className="block gradient-text">{dict.line3}</span>
      </h1>
      <p className="text-sm sm:text-lg md:text-xl text-slate-400 max-w-6xl mx-auto mb-6 md:mb-12 font-light">
        {dict.subtitle_prefix}{" "}
        <span className="text-white font-medium">
          {dict.subtitle_highlight}
        </span>
        {dict.subtitle_rest}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <Button href={contactHref} variant="primary" icon="trending_up">
          {dict.cta_primary}
        </Button>
        <Button href={projectsHref} variant="glass">
          {dict.cta_secondary}
        </Button>
      </div>
    </section>
  );
}
