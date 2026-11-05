import type { Metadata } from "next";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
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
      ? "Applications métier, n8n et renfort technique freelance"
      : "Business apps, n8n automation and technical delivery";
  const description =
    locale === "fr"
      ? "Développement d'applications métier, automatisation n8n et renfort technique pour PME et agences. Des livrables testés, documentés et transférables."
      : "Business application development, n8n automation and technical delivery for companies and agencies, with tested, documented and transferable work.";

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
    "developpeur-javascript-madagascar",
    "developpement-sites-saas",
    "scaling-saas-workflows",
    "developpeur-react-nextjs-madagascar",
    "developpeur-nextjs-supabase-madagascar",
    "developpeur-nodejs-madagascar",
  ],
  automation: [
    "automatisation-n8n-madagascar",
    "remote-n8n-consultant",
    "automatisation-n8n",
    "integration-ia",
    "developpeur-rag",
    "developpeur-python-ia-madagascar",
    "developpeur-claude-code-n8n",
    "developpeur-codex-n8n",
    "developpeur-agent-ia-madagascar",
    "developpeur-agent-vocal-ia",
  ],
  partner: [
    "agency-ai-technical-partner",
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
            title: "Développer une application métier",
            description:
              "SaaS, outil interne ou API : un produit maintenable, testé et livré avec un transfert clair.",
            primaryKey: "developpeur-javascript-madagascar",
            keys: [...groupedServiceKeys.applications],
          },
          {
            id: "automatisation-ia",
            title: "Automatiser avec n8n et l’IA",
            description:
              "Workflows n8n reliés à vos outils, avec contrôles, alertes, documentation et reprise humaine.",
            primaryKey: "automatisation-n8n-madagascar",
            keys: [...groupedServiceKeys.automation],
          },
          {
            id: "renfort-technique",
            title: "Renforcer une équipe ou reprendre un produit",
            description:
              "Un lot technique cadré pour une agence ou une PME, sans sous-traitance en cascade ni dépendance cachée.",
            primaryKey: "agency-ai-technical-partner",
            keys: [...groupedServiceKeys.partner],
          },
        ]
      : [
          {
            id: "applications",
            title: "Build a business application",
            description:
              "SaaS, internal tool or API: a maintainable, tested product delivered with a clear handoff.",
            primaryKey: "developpeur-javascript-madagascar",
            keys: [...groupedServiceKeys.applications],
          },
          {
            id: "ai-automation",
            title: "Automate with n8n and AI",
            description:
              "n8n workflows connected to your tools, with controls, alerts, documentation and human recovery.",
            primaryKey: "automatisation-n8n-madagascar",
            keys: [...groupedServiceKeys.automation],
          },
          {
            id: "technical-partner",
            title: "Extend a team or recover a product",
            description:
              "A clearly scoped delivery package for an agency or company, without subcontracting chains or hidden dependency.",
            primaryKey: "agency-ai-technical-partner",
            keys: [...groupedServiceKeys.partner],
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
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
          {locale === "fr" ? "Trois offres piliers" : "Three core offers"}
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 gradient-text">
          {locale === "fr"
            ? "Applications métier et automatisation n8n"
            : "Business applications and n8n automation"}
        </h1>
        <p className="mb-16 max-w-3xl text-xl text-slate-400">
          {locale === "fr"
            ? "Choisissez l’offre qui correspond au résultat attendu. Les expertises plus spécialisées restent disponibles ensuite selon votre produit, vos données et vos contraintes."
            : "Choose the offer that matches the outcome you need. More specialized expertise remains available based on your product, data and constraints."}
        </p>

        <nav
          aria-label={locale === "fr" ? "Parcours de services" : "Service paths"}
          className="mb-24 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {groups.map((group, index) => {
            const colors =
              colorMap[group.primary?.color ?? "indigo"] || colorMap.indigo;
            return (
              <Link
                key={group.id}
                href={group.primary ? `${prefix}/services/${group.primary.slug}` : `#${group.id}`}
                className="group block"
              >
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
                      ? "Voir l’offre principale →"
                      : "View the core offer →"}
                  </span>
                </GlassCard>
              </Link>
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
                  const isPrimary = service.key === group.primaryKey;
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
                      className={isPrimary ? "md:col-span-2 lg:col-span-3" : undefined}
                    >
                      <GlassCard
                        borderColor={colors.border}
                        className={`h-full transition-colors hover:bg-white/5 ${
                          isPrimary ? "bg-white/[0.045] md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6" : ""
                        }`}
                      >
                        <LegacyIconScoutIcon
                          name={service.icon}
                          size={30}
                          className={`${isPrimary ? "mb-3 md:mb-0" : "mb-3"} ${colors.icon}`}
                        />
                        <div>
                          {isPrimary && (
                            <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${colors.icon}`}>
                              {locale === "fr" ? "Offre principale" : "Core offer"}
                            </p>
                          )}
                          <h3 className="mb-2 text-lg font-bold">
                            {service.cardTitle || service.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-400">
                            {service.cardDescription || service.description}
                          </p>
                        </div>
                        {isPrimary && (
                          <span className={`mt-5 whitespace-nowrap text-sm font-semibold md:mt-0 ${colors.icon}`}>
                            {locale === "fr" ? "Découvrir l’offre →" : "Explore the offer →"}
                          </span>
                        )}
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
