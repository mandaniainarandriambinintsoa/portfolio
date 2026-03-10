import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Footer({
  locale,
  copyright,
}: {
  locale: Locale;
  copyright: string;
}) {
  const prefix = locale === "fr" ? "" : "/en";

  const siteLinks: { label: string; href: string; ariaLabel?: string }[] = [
    { label: "Blog", href: `${prefix}/blog` },
    { label: "Services", href: `${prefix}/services` },
    {
      label: locale === "fr" ? "Projets" : "Projects",
      href: `${prefix}/projects`,
      ariaLabel: locale === "fr" ? "Voir tous les projets" : "View all projects",
    },
    { label: locale === "fr" ? "À propos" : "About", href: `${prefix}/about` },
    { label: "Contact", href: `${prefix}/contact` },
  ];

  const expertiseLinks: { label: string; href: string }[] =
    locale === "fr"
      ? [
          { label: "Développeur No-Code Madagascar", href: "/services/developpeur-no-code-madagascar" },
          { label: "Expert N8N Madagascar", href: "/services/automatisation-n8n-madagascar" },
          { label: "Développeur Low-Code Madagascar", href: "/services/developpeur-low-code-madagascar" },
        ]
      : [
          { label: "No-Code Developer Madagascar", href: "/en/services/no-code-developer-madagascar" },
          { label: "N8N Expert Madagascar", href: "/en/services/n8n-automation-expert-madagascar" },
          { label: "Low-Code Developer Madagascar", href: "/en/services/low-code-developer-madagascar" },
        ];

  return (
    <footer className="w-full border-t border-white/5 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Site links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
              className="text-xs text-slate-400 hover:text-white transition-colors hover:underline underline-offset-4 decoration-white/30"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Expertise links — SEO internal linking to landing pages */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {expertiseLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 opacity-60">
          <p className="text-sm font-medium">{copyright}</p>
          <div className="flex gap-8">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
