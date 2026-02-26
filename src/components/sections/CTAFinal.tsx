import Button from "@/components/ui/Button";

type CTAFinalProps = {
  title: string;
  titleHighlight: string;
  titleEnd: string;
  subtitle: string;
  button: string;
  buttonHref: string;
  quizButton?: string;
  quizHref?: string;
};

export default function CTAFinal({
  title,
  titleHighlight,
  titleEnd,
  subtitle,
  button,
  buttonHref,
  quizButton,
  quizHref,
}: CTAFinalProps) {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="cta-glow w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {title}
          <span className="gradient-text">{titleHighlight}</span>
          {titleEnd}
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button href={buttonHref} variant="primary" icon="arrow_forward">
            {button}
          </Button>
          {quizButton && quizHref && (
            <Button href={quizHref} variant="glass" icon="quiz">
              {quizButton}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
