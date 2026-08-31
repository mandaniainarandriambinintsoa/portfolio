import type { Locale } from "@/i18n/config";
import { LegacyIconScoutIcon } from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";

const QUERY_SIGNALS = [
  { value: "12,206", labelFr: "lectures du contenu global", labelEn: "global content reads" },
  { value: "18,261", labelFr: "requetes projet par slug", labelEn: "project queries by slug" },
  { value: "23,658", labelFr: "lectures du tableau visiteurs", labelEn: "visitor feed reads" },
];

const RESULTS = [
  { value: "696 B", labelFr: "par reponse visiteurs", labelEn: "per visitor response" },
  { value: "10 -> 1", labelFr: "appels HTTP vers requete SQL", labelEn: "HTTP calls to SQL query" },
  { value: "30 s", labelFr: "fraicheur maximale du tableau", labelEn: "maximum dashboard freshness" },
];

const LAB_METRICS = {
  desktop: [
    { label: "FCP", value: "0.4 s" },
    { label: "LCP", value: "0.5 s" },
    { label: "TBT", value: "30 ms" },
    { label: "CLS", value: "0" },
  ],
  mobile: [
    { label: "FCP", value: "1.3 s" },
    { label: "LCP", value: "2.4 s" },
    { label: "TBT", value: "680 ms" },
    { label: "CLS", value: "0" },
  ],
};

const FRONTEND_AUDIT = [
  {
    icon: "code",
    titleFr: "CSS et Tailwind produits",
    titleEn: "Generated CSS and Tailwind",
    textFr: "CSS réellement livré, classes inutilisées, styles critiques, spécificité et coût de maintenance.",
    textEn: "CSS actually shipped, unused classes, critical styles, specificity and maintenance cost.",
  },
  {
    icon: "speed",
    titleFr: "Chemin de rendu critique",
    titleEn: "Critical rendering path",
    textFr: "Polices, feuilles de style, images LCP, scripts tiers et ressources qui retardent le premier rendu.",
    textEn: "Fonts, stylesheets, LCP images, third-party scripts and resources delaying first render.",
  },
  {
    icon: "javascript",
    titleFr: "JavaScript et hydratation",
    titleEn: "JavaScript and hydration",
    textFr: "Composants client, travail du thread principal, dépendances et code chargé avant d'être utile.",
    textEn: "Client components, main-thread work, dependencies and code loaded before it becomes useful.",
  },
];

export default function PerformanceOptimizationProof({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr";

  return (
    <section id="preuves-performance" aria-label={isFrench ? "Preuve de l'optimisation technique" : "Technical optimization proof"} className="mb-20 min-w-0 scroll-mt-28">
      <SectionHeading
        eyebrow={isFrench ? "Snapshot Lighthouse du 26 août 2026" : "Lighthouse snapshot from August 26, 2026"}
        title={isFrench ? "Une performance mesurée, pas un score isolé" : "Measured performance, not an isolated score"}
        description={
          isFrench
            ? "La version en production est testée dans deux conditions. Le desktop est déjà très solide ; le mobile révèle encore du travail JavaScript à réduire."
            : "The production version is tested under two conditions. Desktop is already very strong; mobile still exposes JavaScript work to reduce."
        }
      />

      <div className="mb-20 grid overflow-hidden rounded-lg border border-white/10 bg-white/10 lg:grid-cols-2">
        {([
          { key: "desktop", score: 99, labelFr: "Ordinateur", labelEn: "Desktop", tone: "text-emerald-300" },
          { key: "mobile", score: 80, labelFr: "Mobile", labelEn: "Mobile", tone: "text-amber-300" },
        ] as const).map((profile) => (
          <article key={profile.key} className="bg-[#0b0d14] p-6 sm:p-8">
            <div className="flex items-end justify-between gap-5 border-b border-white/10 pb-6">
              <div>
                <p className={`text-xs font-bold uppercase ${profile.tone}`}>
                  {isFrench ? profile.labelFr : profile.labelEn}
                </p>
                <p className="mt-2 text-sm text-slate-500">Lighthouse Performance</p>
              </div>
              <p className={`text-5xl font-black ${profile.tone}`}>
                {profile.score}<span className="text-base text-slate-500">/100</span>
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">
              {LAB_METRICS[profile.key].map((metric) => (
                <div key={metric.label}>
                  <dt className="text-xs font-semibold text-slate-500">{metric.label}</dt>
                  <dd className="mt-1 text-lg font-bold text-white">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <p className="-mt-16 mb-20 text-xs leading-relaxed text-slate-500">
        {isFrench
          ? "Mesures de laboratoire Lighthouse sur la page d'accueil en production, avec 58 requêtes et environ 653 KiB transférés. Un run peut varier selon le réseau et la charge ; les Core Web Vitals terrain restent à suivre séparément."
          : "Lighthouse lab measurements on the production homepage, with 58 requests and about 653 KiB transferred. A run can vary with network and load; field Core Web Vitals must still be monitored separately."}
      </p>

      <SectionHeading
        eyebrow={isFrench ? "Cas reel audite et mesure" : "Audited and measured case study"}
        title={
          isFrench
            ? "Une base de 25 Mo pouvait produire 5,5 Go d'egress"
            : "A 25 MB database was generating 5.5 GB of egress"
        }
        description={
          isFrench
            ? "Le volume de donnees n'etait pas le probleme. L'architecture relisait les memes contenus a chaque page et a chaque passage de crawler."
            : "Data volume was not the problem. The architecture fetched the same content again on every page and crawler request."
        }
      />

      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0b0d14]">
        <div className="grid border-b border-white/10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-start gap-4">
              <LegacyIconScoutIcon name="database" size={30} className="mt-1 shrink-0 text-amber-300" />
              <div>
                <p className="text-xs font-semibold uppercase text-amber-300">
                  {isFrench ? "Alerte initiale" : "Initial alert"}
                </p>
                <p className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                  {isFrench ? "5,5 Go" : "5.5 GB"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {isFrench
                    ? "Quota d'egress atteint alors que la base ne pesait qu'environ 25 Mo."
                    : "Egress quota reached while the database itself held only about 25 MB."}
                </p>
              </div>
            </div>
          </div>

          <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {QUERY_SIGNALS.map((signal) => (
              <div key={signal.value} className="p-5 sm:p-6">
                <p className="text-2xl font-bold text-white">{signal.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {isFrench ? signal.labelFr : signal.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          <div className="bg-[#0b0d14] p-6 sm:p-8">
            <p className="mb-5 text-xs font-semibold uppercase text-rose-300">
              {isFrench ? "Avant : cout invisible" : "Before: invisible cost"}
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-slate-300">
              <p>{isFrench ? "Rendu dynamique sur toutes les routes" : "Dynamic rendering on every route"}</p>
              <p>{isFrench ? "CMS et fallbacks relus pour chaque visite" : "CMS and fallbacks fetched on every visit"}</p>
              <p>{isFrench ? "Polling navigateur directement jusqu'a la base" : "Browser polling reaching the database directly"}</p>
            </div>
          </div>

          <div className="bg-[#0b0d14] p-6 sm:p-8">
            <p className="mb-5 text-xs font-semibold uppercase text-emerald-300">
              {isFrench ? "Apres : architecture maitrisee" : "After: controlled architecture"}
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-slate-300">
              <p>{isFrench ? "Pages prerendues avec revalidation ciblee" : "Pre-rendered pages with targeted revalidation"}</p>
              <p>{isFrench ? "Contenu CMS distant active uniquement si necessaire" : "Remote CMS content enabled only when needed"}</p>
              <p>{isFrench ? "Cache CDN partage et chargement GA a la demande" : "Shared CDN cache and on-demand GA loading"}</p>
            </div>
          </div>
        </div>

        <div className="grid border-t border-white/10 sm:grid-cols-3">
          {RESULTS.map((result, index) => (
            <div
              key={result.value}
              className={`p-5 sm:p-6 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}
            >
              <div className="flex items-center gap-2 text-emerald-300">
                <LegacyIconScoutIcon name="verified" size={18} />
                <p className="text-xl font-bold text-white">{result.value}</p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {isFrench ? result.labelFr : result.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        {isFrench
          ? "Mesures issues de l'audit de manda-ia.com. Les gains exacts dependent du trafic, de l'hebergement et de l'architecture du site audite."
          : "Measurements from the manda-ia.com audit. Exact gains depend on traffic, hosting and the audited site's architecture."}
      </p>

      <div className="mt-20">
        <SectionHeading
          eyebrow={isFrench ? "Audit frontend" : "Frontend audit"}
          title={isFrench ? "Ce que j'analyse derrière Tailwind et PageSpeed" : "What I inspect behind Tailwind and PageSpeed"}
          description={
            isFrench
              ? "Un framework CSS n'est pas jugé sur son nom, mais sur ce qu'il produit dans le navigateur et sur la façon dont l'architecture tient lorsque le produit grandit."
              : "A CSS framework is not judged by its name, but by what it ships to the browser and how the architecture holds as the product grows."
          }
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
          {FRONTEND_AUDIT.map((item) => (
            <article key={item.titleEn} className="min-h-56 bg-[#0b0d14] p-6 sm:p-7">
              <LegacyIconScoutIcon name={item.icon} size={25} className="text-amber-300" />
              <h3 className="mt-8 text-lg font-bold text-white">{isFrench ? item.titleFr : item.titleEn}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{isFrench ? item.textFr : item.textEn}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
