import type { Metadata } from "next";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import { getServices } from "@/lib/data/services";
import type { ServiceItem } from "@/lib/types";
import { LegacyIconScoutIcon } from "@/components/icons/IconScoutIcon";
import {
  compactMetadataDescription,
  compactMetadataTitle,
} from "@/lib/seo-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (
    i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale
  ) as Locale;

  const title =
    locale === "fr"
      ? "Mes services freelance : Développement, IA & Automatisation"
      : "My freelance services: Development, AI & Automation";
  const description =
    locale === "fr"
      ? "Mes prestations freelance : développement de sites et SaaS, intégration IA, automatisation n8n, scaling cloud. Index complet pour explorer chaque service en détail."
      : "My freelance services: site and SaaS development, AI integration, n8n automation, cloud scaling. Full index to explore each service in detail.";

  const prefix = locale === "fr" ? "" : "/en";

  return {
    title: compactMetadataTitle(title),
    description: compactMetadataDescription(description),
    alternates: {
      canonical: `${SITE_URL}${prefix}/services`,
      languages: {
        fr: `${SITE_URL}/services`,
        en: `${SITE_URL}/en/services`,
        "x-default": `${SITE_URL}/services`,
      },
    },
    openGraph: {
      title: compactMetadataTitle(title),
      description: compactMetadataDescription(description),
      url: `${SITE_URL}${prefix}/services`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: `${SITE_URL}/images/manda-photo2.webp`,
          width: 288,
          height: 336,
          alt: "Manda - Services",
        },
      ],
    },
  };
}

const colorMap: Record<string, { icon: string; border: string }> = {
  indigo: { icon: "text-indigo-400", border: "border-service-indigo" },
  emerald: { icon: "text-emerald-400", border: "border-service-emerald" },
  blue: { icon: "text-blue-400", border: "border-service-blue" },
  purple: { icon: "text-purple-400", border: "border-service-purple" },
  sky: { icon: "text-sky-400", border: "border-sky-500/30" },
  amber: { icon: "text-amber-400", border: "border-amber-500/30" },
};

type ServiceGroup = {
  id: string;
  title: string;
  description: string;
  primaryKey: string;
  keys: string[];
};

const groupedServiceKeys = {
  applications: [
    "developpement-sites-saas",
    "scaling-saas-workflows",
    "developpeur-react-nextjs-madagascar",
    "developpeur-nextjs-supabase-madagascar",
    "developpeur-javascript-madagascar",
    "developpeur-nodejs-madagascar",
  ],
  automation: [
    "automatisation-n8n",
    "automatisation-n8n-madagascar",
    "remote-n8n-consultant",
    "integration-ia",
    "developpeur-rag",
    "developpeur-python-ia-madagascar",
    "developpeur-claude-code-n8n",
    "developpeur-codex-n8n",
    "developpeur-agent-ia-madagascar",
    "developpeur-agent-vocal-ia",
  ],
  recovery: [
    "forward-deployed-engineer",
    "audit-performance-site-web",
    "consultant-seo-geo",
    "freelance-vs-agence-offshore-madagascar",
  ],
} as const;

function getServiceGroups(locale: Locale): ServiceGroup[] {
  const copy =
    locale === "fr"
      ? [
          {
            id: "applications",
            title: "Construire une application métier",
            description:
              "SaaS, outil interne ou API : un produit maintenable, livré avec son architecture et son transfert.",
            primaryKey: "developpement-sites-saas",
            keys: [...groupedServiceKeys.applications],
          },
          {
            id: "automatisation-ia",
            title: "Automatiser un processus avec l’IA",
            description:
              "Workflows n8n, agents IA et RAG avec des règles explicites, des reprises sur erreur et une validation humaine.",
            primaryKey: "automatisation-n8n",
            keys: [...groupedServiceKeys.automation],
          },
          {
            id: "audit-reprise",
            title: "Auditer ou reprendre un produit existant",
            description:
              "Performance, coûts cloud, SEO/GEO ou reprise technique : partir des mesures avant de modifier le système.",
            primaryKey: "forward-deployed-engineer",
            keys: [...groupedServiceKeys.recovery],
          },
        ]
      : [
          {
            id: "applications",
            title: "Build a business application",
            description:
              "SaaS, internal tool or API: a maintainable product delivered with its architecture and handoff.",
            primaryKey: "developpement-sites-saas",
            keys: [...groupedServiceKeys.applications],
          },
          {
            id: "ai-automation",
            title: "Automate a process with AI",
            description:
              "n8n workflows, AI agents and RAG with explicit rules, failure paths and human approval.",
            primaryKey: "automatisation-n8n",
            keys: [...groupedServiceKeys.automation],
          },
          {
            id: "audit-recovery",
            title: "Audit or recover an existing product",
            description:
              "Performance, cloud cost, SEO/GEO or technical recovery: start with evidence before changing the system.",
            primaryKey: "forward-deployed-engineer",
            keys: [...groupedServiceKeys.recovery],
          },
        ];

  return copy;
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (
    i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale
  ) as Locale;
  const dict = await getDictionary(locale);
  const services = await getServices(locale);
  const prefix = locale === "fr" ? "" : "/en";

  const serviceByKey = new Map(
    services.map((service: ServiceItem) => [service.key, service]),
  );
  const groups = getServiceGroups(locale).map((group) => ({
    ...group,
    services: group.keys.flatMap((key) => {
      const service = serviceByKey.get(key);
      return service ? [service] : [];
    }),
    primary: serviceByKey.get(group.primaryKey),
  }));

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 gradient-text">
          {dict.services.title}
        </h1>
        <p className="mb-16 max-w-3xl text-xl text-slate-400">
          {locale === "fr"
            ? "Choisissez d’abord le résultat attendu. Les expertises techniques viennent ensuite, selon votre produit, vos données et vos contraintes."
            : "Start with the outcome you need. The technical expertise comes next, based on your product, data and constraints."}
        </p>

        <nav
          aria-label={locale === "fr" ? "Parcours de services" : "Service paths"}
          className="mb-24 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {groups.map((group, index) => {
            const colors =
              colorMap[group.primary?.color ?? "indigo"] || colorMap.indigo;
            return (
              <a key={group.id} href={`#${group.id}`} className="group block">
                <GlassCard
                  borderColor={colors.border}
                  className="relative h-full overflow-hidden transition-colors group-hover:bg-white/5"
                >
                  <span
                    className={`mb-7 block text-xs font-semibold uppercase tracking-[0.18em] ${colors.icon}`}
                  >
                    0{index + 1}
                  </span>
                  <h2 className="mb-3 text-2xl font-bold text-white">
                    {group.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {group.description}
                  </p>
                  <span className={`mt-7 inline-flex text-sm font-semibold ${colors.icon}`}>
                    {locale === "fr"
                      ? "Explorer ce parcours →"
                      : "Explore this path →"}
                  </span>
                </GlassCard>
              </a>
            );
          })}
        </nav>

        <div className="space-y-24">
          {groups.map((group, groupIndex) => (
            <section key={group.id} id={group.id} className="scroll-mt-28">
              <div className="mb-10 max-w-3xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  {locale === "fr" ? "Parcours" : "Path"} 0{groupIndex + 1}
                </p>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tighter md:text-4xl">
                  {group.title}
                </h2>
                <p className="text-lg leading-relaxed text-slate-400">
                  {group.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service: ServiceItem) => {
                  const colors = colorMap[service.color] || colorMap.indigo;
                  return (
                    <Link
                      key={service.slug}
                      href={`${prefix}/services/${service.slug}`}
                      data-ph-event="service_viewed"
                      data-ph-props={JSON.stringify({
                        area: `services_index_${group.id}`,
                        slug: service.slug,
                        title: service.cardTitle || service.title,
                        href: `${prefix}/services/${service.slug}`,
                        locale,
                      })}
                    >
                      <GlassCard
                        borderColor={colors.border}
                        className="h-full transition-colors hover:bg-white/5"
                      >
                        <LegacyIconScoutIcon
                          name={service.icon}
                          size={30}
                          className={`mb-3 ${colors.icon}`}
                        />
                        <h3 className="mb-2 text-lg font-bold">
                          {service.cardTitle || service.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-400">
                          {service.cardDescription || service.description}
                        </p>
                      </GlassCard>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
