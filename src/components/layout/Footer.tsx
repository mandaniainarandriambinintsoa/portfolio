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

  // Diversified anchor text: avoid exact-match keyword stuffing that Penguin targets.
  // The URL slug + page H1 already carry the target keyword; anchors stay short & natural.
  const expertiseLinks: { label: string; href: string }[] =
    locale === "fr"
      ? [
          { label: "React / Next.js", href: "/services/developpeur-react-nextjs-madagascar" },
          { label: "Next.js + Supabase", href: "/services/developpeur-nextjs-supabase-madagascar" },
          { label: "Python & IA", href: "/services/developpeur-python-ia-madagascar" },
          { label: "Automatisation N8N", href: "/services/automatisation-n8n-madagascar" },
          { label: "Développement No-Code", href: "/services/developpeur-no-code-madagascar" },
          { label: "Low-Code", href: "/services/developpeur-low-code-madagascar" },
        ]
      : [
          { label: "React / Next.js", href: "/en/services/hire-react-nextjs-developer-madagascar" },
          { label: "Next.js + Supabase", href: "/en/services/nextjs-supabase-developer-madagascar" },
          { label: "Python & AI", href: "/en/services/python-ai-developer-madagascar" },
          { label: "N8N Automation", href: "/en/services/n8n-automation-expert-madagascar" },
          { label: "No-Code Development", href: "/en/services/no-code-developer-madagascar" },
          { label: "Low-Code", href: "/en/services/low-code-developer-madagascar" },
        ];

  const expertiseHeading = locale === "fr" ? "Expertise" : "Expertise";
  const siteHeading = locale === "fr" ? "Navigation" : "Navigation";
  const legalHeading = locale === "fr" ? "Informations légales" : "Legal";
  const socialHeading = locale === "fr" ? "Réseaux" : "Social";

  return (
    <footer className="w-full border-t border-white/5 py-12 px-6 md:px-10" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Navigation — primary site links */}
        <nav aria-label={siteHeading}>
          <h2 className="sr-only">{siteHeading}</h2>
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 list-none p-0">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={link.ariaLabel}
                  className="text-sm py-2 text-slate-400 hover:text-white transition-colors hover:underline underline-offset-4 decoration-white/30"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Expertise — internal linking to landing pages, diversified anchor text */}
        <nav aria-label={expertiseHeading}>
          <h2 className="sr-only">{expertiseHeading}</h2>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6 list-none p-0">
            {expertiseLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs py-2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label={legalHeading}>
          <h2 className="sr-only">{legalHeading}</h2>
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6 list-none p-0">
            <li>
              <Link
                href={`${prefix}/privacy`}
                className="text-xs py-2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/mentions-legales`}
                className="text-xs py-2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {locale === "fr" ? "Mentions légales" : "Legal Notice"}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Copyright + social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 opacity-60">
          <p className="text-sm font-medium">{copyright}</p>
          <nav aria-label={socialHeading}>
            <h2 className="sr-only">{socialHeading}</h2>
            <ul className="flex gap-8 list-none p-0 m-0">
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-sm py-3 px-1 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-sm py-3 px-1 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.malt}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-sm py-3 px-1 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40"
                >
                  Malt
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
