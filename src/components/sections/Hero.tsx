import type { Locale } from "@/i18n/config";
import Button from "@/components/ui/Button";

type HeroDict = {
  line1: string;
  line2: string;
  line3: string;
  subtitle_prefix: string;
  subtitle_highlight: string;
  subtitle_rest: string;
  subtitle_highlight2: string;
  subtitle_rest2: string;
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
    <section className="max-w-7xl w-full mx-auto text-center pt-28 md:pt-40 pb-8 md:pb-24 px-4 sm:px-6 relative overflow-hidden">
      <h1 className="mx-auto max-w-[17rem] sm:max-w-2xl md:max-w-none text-[15px] sm:text-[22px] md:text-4xl lg:text-[39px] xl:text-5xl font-extrabold tracking-tight leading-[1.16] mb-4 md:mb-12 whitespace-normal break-words [overflow-wrap:anywhere]">
        <span className="block max-w-full bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">{dict.line1}</span>
        {dict.line2 && (
          <span className="block max-w-full mt-3 md:mt-6 bg-gradient-to-r from-indigo-200 via-indigo-300 to-violet-400 bg-clip-text text-transparent">{dict.line2}</span>
        )}
        {dict.line3 && <span className="block max-w-full gradient-text">{dict.line3}</span>}
      </h1>
      <p className="text-[13px] sm:text-lg md:text-xl text-slate-300 max-w-[18rem] sm:max-w-3xl md:max-w-6xl mx-auto mb-6 md:mb-12 font-light leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
        {dict.subtitle_prefix}{" "}
        <span className="text-white font-medium">
          {dict.subtitle_highlight}
        </span>
        {dict.subtitle_rest}
        <span className="text-white font-medium">
          {dict.subtitle_highlight2}
        </span>
        {dict.subtitle_rest2}
      </p>
      <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <Button
          href={contactHref}
          variant="primary"
          icon="trending_up"
          className="w-full max-w-[16rem] sm:w-auto sm:max-w-none"
          analytics={{
            event: "cta_clicked",
            properties: { area: "hero", cta_type: "contact", locale, label: dict.cta_primary },
          }}
        >
          {dict.cta_primary}
        </Button>
        <Button
          href={projectsHref}
          variant="glass"
          className="w-full max-w-[16rem] sm:w-auto sm:max-w-none"
          analytics={{
            event: "cta_clicked",
            properties: { area: "hero", cta_type: "projects", locale, label: dict.cta_secondary },
          }}
        >
          {dict.cta_secondary}
        </Button>
      </div>
    </section>
  );
}
