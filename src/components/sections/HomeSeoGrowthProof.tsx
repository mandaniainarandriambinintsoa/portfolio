import Link from "next/link";
import type { Locale } from "@/i18n/config";
import {
  getSeoGrowthProof,
  type SearchPerformanceDay,
} from "@/lib/data/gsc-growth";
import SectionHeading from "@/components/ui/SectionHeading";

const CHART_WIDTH = 960;
const CHART_HEIGHT = 280;
const CHART_PADDING = { top: 24, right: 22, bottom: 38, left: 22 };

function chartMaximum(rows: SearchPerformanceDay[], key: "clicks" | "impressions") {
  return Math.max(...rows.map((row) => row[key]), 1);
}

function chartPath(
  rows: SearchPerformanceDay[],
  key: "clicks" | "impressions",
  maximum: number,
) {
  if (rows.length < 2) return "";

  const width = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
  const height = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;

  return rows
    .map((row, index) => {
      const x = CHART_PADDING.left + (index / (rows.length - 1)) * width;
      const y = CHART_PADDING.top + height - (row[key] / maximum) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function OrganicGrowthChart({
  rows,
  locale,
}: {
  rows: SearchPerformanceDay[];
  locale: Locale;
}) {
  if (rows.length < 2) {
    return (
      <div className="flex h-56 items-center justify-center border-y border-white/10 text-sm text-slate-500">
        {locale === "fr"
          ? "La courbe sera disponible lors de la prochaine synchronisation GSC."
          : "The chart will be available after the next GSC synchronization."}
      </div>
    );
  }

  const clickMaximum = chartMaximum(rows, "clicks");
  const impressionMaximum = chartMaximum(rows, "impressions");
  const clickPath = chartPath(rows, "clicks", clickMaximum);
  const impressionPath = chartPath(rows, "impressions", impressionMaximum);
  const plotHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
  const labelIndexes = [
    0,
    Math.floor((rows.length - 1) / 3),
    Math.floor(((rows.length - 1) * 2) / 3),
    rows.length - 1,
  ];
  const dateFormatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });

  return (
    <div className="min-w-0 border-y border-white/10 py-5">
      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 bg-blue-400" aria-hidden="true" />
          {locale === "fr" ? "Clics" : "Clicks"}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 bg-violet-400" aria-hidden="true" />
          {locale === "fr" ? "Impressions" : "Impressions"}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="block h-auto w-full"
        role="img"
        aria-labelledby="home-seo-chart-title home-seo-chart-description"
      >
        <title id="home-seo-chart-title">
          {locale === "fr"
            ? "Évolution des clics et impressions Google sur trois mois"
            : "Google clicks and impressions over three months"}
        </title>
        <desc id="home-seo-chart-description">
          {locale === "fr"
            ? "La ligne bleue représente les clics et la ligne violette les impressions."
            : "The blue line represents clicks and the violet line represents impressions."}
        </desc>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = CHART_PADDING.top + plotHeight * ratio;
          return (
            <line
              key={ratio}
              x1={CHART_PADDING.left}
              x2={CHART_WIDTH - CHART_PADDING.right}
              y1={y}
              y2={y}
              stroke="rgba(148, 163, 184, 0.14)"
              strokeWidth="1"
            />
          );
        })}

        <path
          d={impressionPath}
          fill="none"
          stroke="#a78bfa"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={clickPath}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {labelIndexes.map((index) => {
          const x =
            CHART_PADDING.left +
            (index / (rows.length - 1)) *
              (CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right);
          return (
            <text
              key={rows[index].date}
              x={x}
              y={CHART_HEIGHT - 9}
              fill="#64748b"
              fontSize="12"
              textAnchor={index === 0 ? "start" : index === rows.length - 1 ? "end" : "middle"}
            >
              {dateFormatter.format(new Date(`${rows[index].date}T00:00:00Z`))}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default async function HomeSeoGrowthProof({ locale }: { locale: Locale }) {
  const proof = await getSeoGrowthProof();
  const isFrench = locale === "fr";
  const integerFormatter = new Intl.NumberFormat(isFrench ? "fr-FR" : "en-US");
  const compactFormatter = new Intl.NumberFormat(isFrench ? "fr-FR" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const decimalFormatter = new Intl.NumberFormat(isFrench ? "fr-FR" : "en-US", {
    maximumFractionDigits: 1,
  });
  const dateFormatter = new Intl.DateTimeFormat(isFrench ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const projectHref = isFrench
    ? "/projects/geo-seo-boost"
    : "/en/projects/geo-seo-boost";
  const metrics = [
    {
      label: isFrench ? "Clics organiques" : "Organic clicks",
      value: integerFormatter.format(proof.current.clicks),
    },
    {
      label: isFrench ? "Impressions" : "Impressions",
      value: compactFormatter.format(proof.current.impressions),
    },
    {
      label: isFrench ? "CTR moyen" : "Average CTR",
      value: `${decimalFormatter.format(proof.current.ctr * 100)} %`,
    },
    {
      label: isFrench ? "Position moyenne" : "Average position",
      value: decimalFormatter.format(proof.current.position),
    },
  ];

  return (
    <section
      id="seo-growth-proof"
      className="mx-auto mb-16 w-full max-w-6xl scroll-mt-24 px-6 py-12 md:mb-32 md:py-16"
    >
      <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <SectionHeading
            title={isFrench ? "Une croissance organique mesurée" : "Measured organic growth"}
            eyebrow={isFrench ? "Résultats SEO vérifiés" : "Verified SEO results"}
          />
          <p className="-mt-5 text-sm leading-relaxed text-slate-400 sm:text-base">
            {isFrench
              ? "Les performances réelles de manda-ia.com, issues de Google Search Console et actualisées quotidiennement."
              : "Real performance from manda-ia.com, sourced from Google Search Console and refreshed daily."}
          </p>
        </div>
        <p className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-400">
          <span className="h-2 w-2 bg-emerald-400" aria-hidden="true" />
          {isFrench ? "Données jusqu’au" : "Data through"}{" "}
          {dateFormatter.format(new Date(`${proof.current.endDate}T00:00:00Z`))}
        </p>
      </div>

      <div className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`min-w-0 px-3 py-5 sm:px-5 ${
              index % 2 === 0 ? "border-r border-white/10" : ""
            } ${index < 2 ? "border-b border-white/10 md:border-b-0" : ""} ${
              index === 1 ? "md:border-r md:border-white/10" : ""
            } ${index === 2 ? "md:border-r md:border-white/10" : ""}`}
          >
            <p className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
              {metric.value}
            </p>
            <p className="mt-1 text-xs leading-snug text-slate-500 sm:text-sm">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <OrganicGrowthChart rows={proof.daily} locale={locale} />

      <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <p className="max-w-3xl border-l-2 border-violet-400 pl-4 text-sm leading-relaxed text-slate-400">
          {isFrench
            ? "Preuve GEO : Manda a été recommandé en premier lors d’une recherche ChatGPT documentée le 28 juillet 2026. Les réponses des moteurs IA peuvent varier selon le contexte."
            : "GEO proof: Manda was recommended first in a documented ChatGPT search on July 28, 2026. AI engine answers can vary by context."}
        </p>
        <Link
          href={projectHref}
          className="shrink-0 text-sm font-semibold text-indigo-300 underline decoration-indigo-300/40 underline-offset-4 transition-colors hover:text-indigo-200"
          data-ph-event="project_viewed"
          data-ph-props={JSON.stringify({
            area: "home_seo_growth_proof",
            project_slug: "geo-seo-boost",
            locale,
          })}
        >
          {isFrench ? "Voir les preuves et la méthode" : "See the proof and method"}
        </Link>
      </div>
    </section>
  );
}
