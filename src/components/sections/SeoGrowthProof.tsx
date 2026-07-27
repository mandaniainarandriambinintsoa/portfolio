import Link from "next/link";
import type { Locale } from "@/i18n/config";
import {
  getSeoGrowthProof,
  type SearchPerformancePeriod,
} from "@/lib/data/gsc-growth";

type MetricComparisonProps = {
  label: string;
  before: number;
  after: number;
  formatter: (value: number) => string;
  accentClass: string;
  trackClass: string;
};

function percentageChange(before: number, after: number) {
  if (!before) return 0;
  return ((after - before) / before) * 100;
}

function MetricComparison({
  label,
  before,
  after,
  formatter,
  accentClass,
  trackClass,
}: MetricComparisonProps) {
  const maxValue = Math.max(before, after, 1);
  const beforeWidth = Math.max((before / maxValue) * 100, 3);
  const afterWidth = Math.max((after / maxValue) * 100, 3);
  const change = percentageChange(before, after);

  return (
    <div className="border-t border-white/10 py-5 first:border-t-0">
      <div className="mb-4 flex items-end justify-between gap-4">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className={`text-sm font-bold tabular-nums ${accentClass}`}>
          {change >= 0 ? "+" : ""}
          {Math.round(change).toLocaleString("fr-FR")} %
        </p>
      </div>
      <div className="space-y-3">
        <div className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3">
          <span className="text-xs text-slate-500">Mai 2026</span>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-slate-500"
              style={{ width: `${beforeWidth}%` }}
            />
          </div>
          <span className="min-w-12 text-right text-xs font-semibold tabular-nums text-slate-400">
            {formatter(before)}
          </span>
        </div>
        <div className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3">
          <span className="text-xs font-medium text-slate-300">Actuel</span>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full ${trackClass}`}
              style={{ width: `${afterWidth}%` }}
            />
          </div>
          <span className="min-w-12 text-right text-xs font-bold tabular-nums text-white">
            {formatter(after)}
          </span>
        </div>
      </div>
    </div>
  );
}

function formatPeriod(
  period: Pick<SearchPerformancePeriod, "startDate" | "endDate">,
  locale: Locale,
) {
  const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return `${formatter.format(new Date(`${period.startDate}T00:00:00Z`))} - ${formatter.format(
    new Date(`${period.endDate}T00:00:00Z`),
  )}`;
}

export default async function SeoGrowthProof({ locale }: { locale: Locale }) {
  const proof = await getSeoGrowthProof();
  const numberFormatter = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB");
  const impressionsGrowth = Math.round(
    percentageChange(proof.baseline.impressions, proof.current.impressions),
  );
  const clicksGrowth = Math.round(
    percentageChange(proof.baseline.clicks, proof.current.clicks),
  );
  const isFrench = locale === "fr";
  const projectHref = isFrench
    ? "/projects/geo-seo-boost"
    : "/en/projects/geo-seo-boost";

  return (
    <section
      aria-labelledby="seo-growth-proof-title"
      className="mb-20 w-full min-w-0 overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#07110f]"
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              {isFrench ? "Preuve sur ce site" : "Proof from this website"}
            </span>
            <span className="text-xs text-slate-500">
              Google Search Console
            </span>
          </div>

          <h2
            id="seo-growth-proof-title"
            className="max-w-xl text-2xl font-bold text-white sm:text-3xl"
          >
            {isFrench
              ? "La méthode appliquée à manda-ia.com, chiffres à l’appui"
              : "The method applied to manda-ia.com, backed by real numbers"}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {isFrench
              ? "Comparaison entre le premier cycle SEO mesuré en mai 2026 et les 28 derniers jours finalisés par Google."
              : "A comparison between the first measured SEO cycle in May 2026 and Google's latest finalized 28-day period."}
          </p>

          <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
            <div className="bg-[#07110f] p-4 sm:p-5">
              <dt className="text-xs text-slate-500">
                {isFrench ? "Impressions" : "Impressions"}
              </dt>
              <dd className="mt-2 text-2xl font-bold tabular-nums text-emerald-300 sm:text-3xl">
                +{impressionsGrowth.toLocaleString(isFrench ? "fr-FR" : "en-GB")} %
              </dd>
            </div>
            <div className="bg-[#07110f] p-4 sm:p-5">
              <dt className="text-xs text-slate-500">
                {isFrench ? "Clics organiques" : "Organic clicks"}
              </dt>
              <dd className="mt-2 text-2xl font-bold tabular-nums text-sky-300 sm:text-3xl">
                +{clicksGrowth.toLocaleString(isFrench ? "fr-FR" : "en-GB")} %
              </dd>
            </div>
          </dl>

          <Link
            href={projectHref}
            className="mt-8 inline-flex max-w-full flex-wrap items-center gap-2 break-words text-sm font-semibold text-white underline decoration-emerald-400/60 underline-offset-4 transition-colors hover:text-emerald-200"
            data-ph-event="project_viewed"
            data-ph-props={JSON.stringify({
              area: "seo_growth_proof",
              project_slug: "geo-seo-boost",
              locale,
            })}
          >
            {isFrench ? "Voir la méthode GEO SEO Boost" : "See the GEO SEO Boost method"}
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        <figure className="min-w-0 p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">
                {isFrench ? "Évolution organique" : "Organic growth"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {formatPeriod(proof.current, locale)}
              </p>
            </div>
            <span
              className="material-symbols-outlined rounded-lg border border-white/10 bg-white/[0.04] p-2 text-xl text-emerald-300"
              aria-hidden="true"
            >
              monitoring
            </span>
          </div>

          <MetricComparison
            label={isFrench ? "Impressions dans Google" : "Google impressions"}
            before={proof.baseline.impressions}
            after={proof.current.impressions}
            formatter={(value) => numberFormatter.format(value)}
            accentClass="text-emerald-300"
            trackClass="bg-emerald-400"
          />
          <MetricComparison
            label={isFrench ? "Clics depuis Google" : "Clicks from Google"}
            before={proof.baseline.clicks}
            after={proof.current.clicks}
            formatter={(value) => numberFormatter.format(value)}
            accentClass="text-sky-300"
            trackClass="bg-sky-400"
          />

          <figcaption className="mt-5 border-t border-white/10 pt-5 text-xs leading-relaxed text-slate-500">
            {isFrench
              ? `Données GSC finalisées, actualisées quotidiennement. Google publie ces données avec un léger délai. Source affichée : ${
                  proof.source === "gsc" ? "API Google Search Console" : "dernier relevé vérifié"
                }.`
              : `Finalized GSC data, refreshed daily. Google publishes this data with a short delay. Displayed source: ${
                  proof.source === "gsc" ? "Google Search Console API" : "latest verified snapshot"
                }.`}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
