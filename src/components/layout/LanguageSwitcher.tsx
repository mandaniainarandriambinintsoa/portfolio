"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// FR path → EN path for routes where slugs differ (services, projects, solutions).
// Paths are stored without leading "/", matched against the cleaned pathname.
const SLUG_MAP_FR_TO_EN: Record<string, string> = {
  "services/developpement-sites-saas": "services/sites-saas-development",
  "services/integration-ia": "services/ai-integration",
  "services/automatisation-n8n": "services/n8n-automation",
  "services/scaling-saas-workflows": "services/saas-workflow-scaling",
  "services/automatisation-n8n-madagascar": "services/n8n-automation-expert-madagascar",
  "services/consultant-automatisation-n8n-international": "services/remote-n8n-automation-consultant",
  "services/developpeur-react-nextjs-madagascar": "services/hire-react-nextjs-developer-madagascar",
  "services/developpeur-nextjs-supabase-madagascar": "services/nextjs-supabase-developer-madagascar",
  "services/developpeur-python-ia-madagascar": "services/python-ai-developer-madagascar",
  "projects/tracking-visiteurs": "projects/visitor-tracking",
  "solutions/automatisation-n8n-pme": "solutions/n8n-automation-for-smbs",
  "solutions/agent-ia-support-client": "solutions/ai-customer-support-agent",
  "solutions/api-mobile-money-madagascar": "solutions/mobile-money-api-madagascar",
  "solutions/agent-ia-facebook": "solutions/facebook-ai-agent",
  "solutions/agent-ia-prospection": "solutions/ai-prospecting-agent",
  "solutions/workflows-n8n-claude-code": "solutions/n8n-claude-code-workflows",
  "solutions/developpeur-agent-vocal-ia": "solutions/ai-voice-agent-developer",
  "solutions/automatisation-marketing-n8n": "solutions/n8n-marketing-automation",
  "site-metier/agence-voyage": "site-metier/travel-agency",
  "site-metier/garage-automobile": "site-metier/auto-repair-shop",
  "site-metier/entreprise-btp": "site-metier/construction-company",
  "site-metier/salon-beaute": "site-metier/beauty-salon",
  "site-metier/hotel": "site-metier/hotel",
  "site-metier/restaurant": "site-metier/restaurant",
  "site-metier/location-voiture": "site-metier/car-rental",
};

const SLUG_MAP_EN_TO_FR: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_MAP_FR_TO_EN).map(([fr, en]) => [en, fr]),
);

function getTargetPath(pathname: string, currentLocale: string): string {
  // Strip internal /fr/ or /en/ prefix (SSR path uses internal rewrite) to get the
  // canonical public path. Ensures SSR and client hydration produce the same href.
  const stripped = pathname.replace(/^\/(?:fr|en)(?=\/|$)/, "") || "/";
  const key = stripped.replace(/^\//, "");

  if (currentLocale === "fr") {
    const mapped = SLUG_MAP_FR_TO_EN[key];
    if (mapped) return `/en/${mapped}`;
    return stripped === "/" ? "/en" : `/en${stripped}`;
  }
  const mapped = SLUG_MAP_EN_TO_FR[key];
  if (mapped) return `/${mapped}`;
  return stripped;
}

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const targetLocale = locale === "fr" ? "en" : "fr";

  return (
    <Link
      href={getTargetPath(pathname, locale)}
      hrefLang={targetLocale}
      className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-white border border-white/10 rounded-full transition-colors"
      aria-label={`Switch to ${targetLocale === "fr" ? "French" : "English"}`}
      data-ph-event="language_switched"
      data-ph-props={JSON.stringify({ from_locale: locale, to_locale: targetLocale })}
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}
