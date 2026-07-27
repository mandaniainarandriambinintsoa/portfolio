import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/constants";

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
      label: "Solutions",
      href: `${prefix}/solutions`,
      ariaLabel: locale === "fr"
        ? "Explorer les solutions IA, n8n et API"
        : "Explore AI, n8n and API solutions",
    },
    {
      label: locale === "fr" ? "Projets" : "Projects",
      href: `${prefix}/projects`,
      ariaLabel: locale === "fr" ? "Voir tous les projets" : "View all projects",
    },
    {
      label: locale === "fr" ? "Sites métier" : "Business Sites",
      href: `${prefix}/site-metier`,
      ariaLabel: locale === "fr" ? "Voir le catalogue de sites métier" : "View business website catalog",
    },
    { label: locale === "fr" ? "À propos" : "About", href: `${prefix}/about` },
    { label: "Contact", href: `${prefix}/contact` },
  ];

  // Diversified anchor text: avoid exact-match keyword stuffing that Penguin targets.
  // The URL slug + page H1 already carry the target keyword; anchors stay short & natural.
  const expertiseLinks: { label: string; href: string }[] =
    locale === "fr"
      ? [
          { label: "JavaScript Fullstack", href: "/services/developpeur-javascript-madagascar" },
          { label: "React / Next.js", href: "/services/developpeur-react-nextjs-madagascar" },
          { label: "Node.js / API", href: "/services/developpeur-nodejs-madagascar" },
          { label: "Next.js + Supabase", href: "/services/developpeur-nextjs-supabase-madagascar" },
          { label: "Agents IA", href: "/services/developpeur-agent-ia-madagascar" },
          { label: "Python & IA", href: "/services/developpeur-python-ia-madagascar" },
          { label: "Claude Code + n8n", href: "/services/developpeur-claude-code-n8n" },
          { label: "Codex + n8n", href: "/services/developpeur-codex-n8n" },
          { label: "Automatisation N8N", href: "/services/automatisation-n8n-madagascar" },
          { label: "Freelance ou agence ?", href: "/services/freelance-vs-agence-offshore-madagascar" },
          { label: "Agent vocal IA", href: "/services/developpeur-agent-vocal-ia" },
          { label: "SEO + GEO", href: "/services/consultant-seo-geo" },
          { label: "Forward Deployed Engineer", href: "/services/forward-deployed-engineer" },
          { label: "Automatisation PME", href: "/solutions/automatisation-n8n-pme" },
          { label: "Agent IA support", href: "/solutions/agent-ia-support-client" },
          { label: "API Mobile Money", href: "/solutions/api-mobile-money-madagascar" },
          { label: "Agent IA Facebook", href: "/solutions/agent-ia-facebook" },
          { label: "Marketing automation", href: "/solutions/automatisation-marketing-n8n" },
          { label: "Agent IA prospection", href: "/solutions/agent-ia-prospection" },
          { label: "Workflows Claude Code", href: "/solutions/workflows-n8n-claude-code" },
          { label: "Agent vocal IA appels", href: "/solutions/developpeur-agent-vocal-ia" },
        ]
      : [
          { label: "JavaScript Fullstack", href: "/en/services/javascript-developer-madagascar" },
          { label: "React / Next.js", href: "/en/services/hire-react-nextjs-developer-madagascar" },
          { label: "Node.js / APIs", href: "/en/services/hire-nodejs-developer-madagascar" },
          { label: "Next.js + Supabase", href: "/en/services/nextjs-supabase-developer-madagascar" },
          { label: "AI Agents", href: "/en/services/ai-agent-developer-madagascar" },
          { label: "Python & AI", href: "/en/services/python-ai-developer-madagascar" },
          { label: "Claude Code + n8n", href: "/en/services/claude-code-n8n-developer" },
          { label: "Codex + n8n", href: "/en/services/codex-n8n-developer" },
          { label: "N8N Automation", href: "/en/services/n8n-automation-expert-madagascar" },
          { label: "Freelance or agency?", href: "/en/services/freelance-vs-offshore-agency-madagascar" },
          { label: "AI Voice Agents", href: "/en/services/ai-voice-agent-developer" },
          { label: "SEO + GEO", href: "/en/services/seo-geo-consultant" },
          { label: "Forward Deployed Engineer", href: "/en/services/forward-deployed-engineer" },
          { label: "SMB automation", href: "/en/solutions/n8n-automation-for-smbs" },
          { label: "AI support agent", href: "/en/solutions/ai-customer-support-agent" },
          { label: "Mobile Money API", href: "/en/solutions/mobile-money-api-madagascar" },
          { label: "Facebook AI agent", href: "/en/solutions/facebook-ai-agent" },
          { label: "Marketing automation", href: "/en/solutions/n8n-marketing-automation" },
          { label: "AI prospecting", href: "/en/solutions/ai-prospecting-agent" },
          { label: "Claude Code workflows", href: "/en/solutions/n8n-claude-code-workflows" },
          { label: "AI voice calls", href: "/en/solutions/ai-voice-agent-developer" },
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
                  className="text-xs py-2 text-slate-400 hover:text-white transition-colors"
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
                className="text-xs py-2 text-slate-400 hover:text-white transition-colors"
              >
                {locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/mentions-legales`}
                className="text-xs py-2 text-slate-400 hover:text-white transition-colors"
              >
                {locale === "fr" ? "Mentions légales" : "Legal Notice"}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Legal entity — required for Meta Business Verification */}
        <div className="text-center text-xs text-slate-400 leading-relaxed">
          <p>
            {locale === "fr" ? "Édité par " : "Published by "}
            <strong className="text-slate-200">{PERSONAL_INFO.legalName}</strong>
            {locale === "fr" ? " — entrepreneur individuel" : " — sole proprietor"}
          </p>
          <p>{PERSONAL_INFO.legalAddress.full}</p>
        </div>

        {/* Copyright + social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 opacity-60">
          <p className="text-sm font-medium">{copyright}</p>
          <nav aria-label={socialHeading}>
            <h2 className="sr-only">{socialHeading}</h2>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-8 list-none p-0 m-0">
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
              <li>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-sm py-3 px-1 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-sm py-3 px-1 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
