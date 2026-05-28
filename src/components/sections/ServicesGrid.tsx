import Link from "next/link";
import type { Locale } from "@/i18n/config";

type LandingLink = {
  label: string;
  href: string;
};

const landingLinks: Record<Locale, LandingLink[]> = {
  fr: [
    { label: "Développeur No-Code Madagascar", href: "/services/developpeur-no-code-madagascar" },
    { label: "Expert N8N & Automatisation", href: "/services/automatisation-n8n-madagascar" },
    { label: "Développeur Low-Code Madagascar", href: "/services/developpeur-low-code-madagascar" },
    { label: "Développeur React & Next.js", href: "/services/developpeur-react-nextjs-madagascar" },
    { label: "Next.js + Supabase", href: "/services/developpeur-nextjs-supabase-madagascar" },
    { label: "Développeur Python IA Madagascar", href: "/services/developpeur-python-ia-madagascar" },
  ],
  en: [
    { label: "No-Code Developer Madagascar", href: "/en/services/no-code-developer-madagascar" },
    { label: "N8N Automation Expert", href: "/en/services/n8n-automation-expert-madagascar" },
    { label: "Low-Code Developer Madagascar", href: "/en/services/low-code-developer-madagascar" },
    { label: "React & Next.js Developer", href: "/en/services/hire-react-nextjs-developer-madagascar" },
    { label: "Next.js + Supabase", href: "/en/services/nextjs-supabase-developer-madagascar" },
    { label: "Python AI Developer Madagascar", href: "/en/services/python-ai-developer-madagascar" },
  ],
};

const sectionLabel: Record<Locale, string> = {
  fr: "Pages dédiées par expertise",
  en: "Dedicated pages by expertise",
};

export default function ServicesGrid({ locale }: { locale: Locale }) {
  return (
    <section id="services" aria-label={sectionLabel[locale]} className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">
        {sectionLabel[locale]}
      </p>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        {landingLinks[locale].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-400/30 hover:decoration-indigo-300/50"
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </section>
  );
}
