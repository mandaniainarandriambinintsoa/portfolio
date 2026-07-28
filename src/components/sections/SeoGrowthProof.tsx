import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import {
  getSeoGrowthProof,
  type SearchPerformanceDay,
  type SearchPerformancePeriod,
} from "@/lib/data/gsc-growth";

const CHART_WIDTH = 920;
const CHART_HEIGHT = 250;
const CHART_PADDING = { top: 16, right: 48, bottom: 42, left: 42 };

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

function roundedChartMaximum(value: number, step: number) {
  if (value <= 0) return 1;
  return Math.ceil(value / step) * step;
}

function createChartPath(
  rows: SearchPerformanceDay[],
  key: "clicks" | "impressions",
  maximum: number,
) {
  if (rows.length < 2) return "";
  const plotWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
  const plotHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;

  return rows
    .map((row, index) => {
      const x = CHART_PADDING.left + (index / (rows.length - 1)) * plotWidth;
      const y =
        CHART_PADDING.top + plotHeight - (row[key] / Math.max(maximum, 1)) * plotHeight;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function SearchPerformanceChart({
  rows,
  locale,
}: {
  rows: SearchPerformanceDay[];
  locale: Locale;
}) {
  if (rows.length < 2) {
    return (
      <div className="flex h-[250px] items-center justify-center border-t border-[#e7e9ec] text-sm text-[#64707d]">
        {locale === "fr"
          ? "La courbe sera actualisée lors de la prochaine synchronisation GSC."
          : "The chart will update during the next GSC synchronization."}
      </div>
    );
  }

  const clickMaximum = roundedChartMaximum(
    Math.max(...rows.map((row) => row.clicks)),
    4,
  );
  const impressionMaximum = roundedChartMaximum(
    Math.max(...rows.map((row) => row.impressions)),
    125,
  );
  const dateFormatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  });
  const labelIndexes = [0, 22, 45, 68, rows.length - 1].filter(
    (index, position, values) =>
      index >= 0 && index < rows.length && values.indexOf(index) === position,
  );
  const clickPath = createChartPath(rows, "clicks", clickMaximum);
  const impressionPath = createChartPath(rows, "impressions", impressionMaximum);
  const plotHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
  const plotWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;

  return (
    <div
      className="w-full overflow-x-auto"
      aria-label={
        locale === "fr"
          ? "Courbe des performances SEO"
          : "SEO performance chart"
      }
    >
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-auto min-w-[760px] w-full"
        role="img"
        aria-labelledby="gsc-chart-title gsc-chart-description"
      >
        <title id="gsc-chart-title">
          {locale === "fr"
            ? "Évolution des clics et impressions Google"
            : "Google clicks and impressions over time"}
        </title>
        <desc id="gsc-chart-description">
          {locale === "fr"
            ? "La ligne bleue représente les clics et la ligne violette les impressions sur trois mois."
            : "The blue line shows clicks and the purple line shows impressions over three months."}
        </desc>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = CHART_PADDING.top + plotHeight * ratio;
          return (
            <g key={ratio}>
              <line
                x1={CHART_PADDING.left}
                x2={CHART_PADDING.left + plotWidth}
                y1={y}
                y2={y}
                stroke="#e1e5ea"
                strokeWidth="1"
              />
              <text x="4" y={y + 4} fill="#6b7280" fontSize="11">
                {Math.round(clickMaximum * (1 - ratio))}
              </text>
              <text
                x={CHART_WIDTH - 4}
                y={y + 4}
                fill="#6b7280"
                fontSize="11"
                textAnchor="end"
              >
                {Math.round(impressionMaximum * (1 - ratio))}
              </text>
            </g>
          );
        })}

        <text x="4" y="10" fill="#64707d" fontSize="11">
          {locale === "fr" ? "Clics" : "Clicks"}
        </text>
        <text
          x={CHART_WIDTH - 4}
          y="10"
          fill="#64707d"
          fontSize="11"
          textAnchor="end"
        >
          {locale === "fr" ? "Impressions" : "Impressions"}
        </text>

        <path
          d={impressionPath}
          fill="none"
          stroke="#673ab7"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={clickPath}
          fill="none"
          stroke="#4285f4"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {labelIndexes.map((index) => {
          const x =
            CHART_PADDING.left + (index / (rows.length - 1)) * plotWidth;
          return (
            <text
              key={rows[index].date}
              x={x}
              y={CHART_HEIGHT - 10}
              fill="#6b7280"
              fontSize="11"
              textAnchor={
                index === 0 ? "start" : index === rows.length - 1 ? "end" : "middle"
              }
            >
              {dateFormatter.format(new Date(`${rows[index].date}T00:00:00Z`))}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default async function SeoGrowthProof({ locale }: { locale: Locale }) {
  const proof = await getSeoGrowthProof();
  const isFrench = locale === "fr";
  const numberFormatter = new Intl.NumberFormat(isFrench ? "fr-FR" : "en-GB");
  const compactFormatter = new Intl.NumberFormat(isFrench ? "fr-FR" : "en-GB", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const decimalFormatter = new Intl.NumberFormat(isFrench ? "fr-FR" : "en-GB", {
    maximumFractionDigits: 1,
  });
  const projectHref = isFrench
    ? "/projects/geo-seo-boost"
    : "/en/projects/geo-seo-boost";
  const geoProofAlt = isFrench
    ? "Capture de ChatGPT recommandant Mandaniaina Manda Randriambinintsoa en premier pour une recherche de développeur freelance n8n, agents IA et Next.js à Madagascar"
    : "Screenshot of ChatGPT recommending Mandaniaina Manda Randriambinintsoa first for an n8n, AI agents and Next.js freelancer search in Madagascar";

  const metrics = [
    {
      label: isFrench ? "Nombre total de clics" : "Total clicks",
      value: numberFormatter.format(proof.current.clicks),
      className: "bg-[#4285f4] text-white",
      checked: true,
    },
    {
      label: isFrench ? "Nombre total d’impressions" : "Total impressions",
      value: compactFormatter.format(proof.current.impressions),
      className: "bg-[#673ab7] text-white",
      checked: true,
    },
    {
      label: isFrench ? "CTR moyen" : "Average CTR",
      value: `${decimalFormatter.format(proof.current.ctr * 100)} %`,
      className: "bg-white text-[#59636f]",
      checked: false,
    },
    {
      label: isFrench ? "Position moyenne" : "Average position",
      value: decimalFormatter.format(proof.current.position),
      className: "bg-white text-[#59636f]",
      checked: false,
    },
  ];

  return (
    <>
      <section aria-labelledby="seo-growth-proof-title" className="mb-20 min-w-0">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-300">
              {isFrench ? "Résultats SEO vérifiés" : "Verified SEO results"}
            </p>
            <h2
              id="seo-growth-proof-title"
              className="mt-2 text-2xl font-bold text-white sm:text-3xl"
            >
              {isFrench
                ? "Les performances organiques réelles de manda-ia.com"
                : "Real organic performance from manda-ia.com"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              {isFrench
                ? "Ce tableau est reconstruit en code à partir des données finalisées de Google Search Console, puis actualisé chaque jour."
                : "This dashboard is rendered in code from finalized Google Search Console data and refreshed daily."}
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {proof.source === "gsc"
              ? isFrench
                ? "API Google Search Console"
                : "Google Search Console API"
              : isFrench
                ? "Relevé GSC vérifié"
                : "Verified GSC snapshot"}
          </span>
        </div>

        <figure className="min-w-0 overflow-hidden rounded-lg border border-[#d7dce2] bg-[#f7f9fc] text-[#25313d] shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
          <div className="flex flex-col gap-4 border-b border-[#d7dce2] px-4 py-4 sm:px-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-lg font-semibold">
                {isFrench ? "Performances" : "Performance"}
              </p>
              <span className="text-xs text-[#64707d]">
                {isFrench ? "Données jusqu’au" : "Data through"}{" "}
                {formatPeriod(
                  {
                    startDate: proof.current.endDate,
                    endDate: proof.current.endDate,
                  },
                  locale,
                ).split(" - ")[0]}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="inline-flex max-w-full overflow-x-auto rounded border border-[#bcc4ce] bg-white text-xs"
                aria-label={isFrench ? "Période sélectionnée" : "Selected period"}
              >
                {[
                  isFrench ? "24 heures" : "24 hours",
                  isFrench ? "7 jours" : "7 days",
                  isFrench ? "28 jours" : "28 days",
                ].map((label) => (
                  <span
                    key={label}
                    className="whitespace-nowrap border-r border-[#d7dce2] px-3 py-2 text-[#59636f]"
                  >
                    {label}
                  </span>
                ))}
                <span className="whitespace-nowrap bg-[#dcecff] px-3 py-2 font-semibold text-[#174ea6]">
                  ✓ {isFrench ? "3 mois" : "3 months"}
                </span>
              </div>
              <span className="rounded border border-[#bcc4ce] bg-white px-3 py-2 text-xs text-[#3f4852]">
                {isFrench ? "Type de recherche : Web" : "Search type: Web"}
              </span>
              <span className="text-xs text-[#64707d]">
                {formatPeriod(proof.current, locale)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-[#d7dce2] lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`min-w-0 border-[#d7dce2] p-4 sm:p-5 ${
                  index < 2 ? "border-b lg:border-b-0" : ""
                } ${index % 2 === 0 ? "border-r" : ""} ${
                  index < 3 ? "lg:border-r" : "lg:border-r-0"
                } ${metric.className}`}
              >
                <p className="flex min-w-0 items-center gap-2 text-xs sm:text-sm">
                  <span
                    className={`inline-flex h-4 w-4 shrink-0 items-center justify-center border text-[10px] ${
                      metric.checked
                        ? "border-white text-white"
                        : "border-[#8b949e] text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="truncate">{metric.label}</span>
                </p>
                <p className="mt-3 text-2xl font-medium tabular-nums sm:text-3xl">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white px-3 pt-5 sm:px-5">
            <SearchPerformanceChart rows={proof.daily} locale={locale} />
          </div>

          <figcaption className="flex flex-col justify-between gap-3 border-t border-[#e1e5ea] bg-white px-4 py-4 text-xs leading-relaxed text-[#64707d] sm:flex-row sm:items-center sm:px-6">
            <span>
              {isFrench
                ? "Données de recherche Web finalisées. Google applique un délai de traitement d’environ trois jours."
                : "Finalized Web Search data. Google applies a processing delay of approximately three days."}
            </span>
            <Link
              href={projectHref}
              className="font-semibold text-[#174ea6] underline underline-offset-4 hover:text-[#0b57d0]"
              data-ph-event="project_viewed"
              data-ph-props={JSON.stringify({
                area: "seo_growth_proof",
                project_slug: "geo-seo-boost",
                locale,
              })}
            >
              {isFrench ? "Voir la méthode GEO + SEO" : "See the GEO + SEO method"}
            </Link>
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="geo-citation-proof-title"
        className="mb-20 grid min-w-0 gap-8 border-y border-white/10 py-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:py-14"
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-sky-300">
            {isFrench ? "Preuve GEO réelle" : "Real GEO proof"}
          </p>
          <h2
            id="geo-citation-proof-title"
            className="mt-2 text-2xl font-bold text-white sm:text-3xl"
          >
            {isFrench
              ? "ChatGPT recommande Manda en premier"
              : "ChatGPT recommends Manda first"}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            {isFrench
              ? "Le 28 juillet 2026, une recherche générique pour un freelance n8n, agents IA et Next.js à Madagascar a placé Manda en recommandation principale, avec manda-ia.com cité parmi les sources."
              : "On July 28, 2026, a generic search for an n8n, AI agents and Next.js freelancer in Madagascar placed Manda as the primary recommendation, citing manda-ia.com among its sources."}
          </p>
          <blockquote className="mt-5 border-l-2 border-white/20 pl-4 text-sm leading-relaxed text-slate-400">
            {isFrench
              ? "« Je cherche un développeur freelance spécialisé en n8n, agents IA et Next.js à Madagascar. Qui recommandes-tu ? Recherche sur le web et cite tes sources. »"
              : "“I’m looking for a freelance developer specializing in n8n, AI agents and Next.js in Madagascar. Who do you recommend? Search the web and cite your sources.”"}
          </blockquote>
          <p className="mt-5 border-l-2 border-sky-400 pl-4 text-xs leading-relaxed text-slate-500">
            {isFrench
              ? "Cette capture documente une réponse observée à cette date. Les réponses des moteurs IA peuvent varier selon le contexte et ne constituent pas un classement permanent."
              : "This screenshot documents one answer observed on this date. AI engine responses can vary by context and do not constitute a permanent ranking."}
          </p>
        </div>

        <figure className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <Image
            src="/images/proofs/chatgpt-recommande-manda-mobile-2026-07-28.webp"
            alt={geoProofAlt}
            width={900}
            height={520}
            sizes="100vw"
            className="h-auto w-full sm:hidden"
            unoptimized
          />
          <Image
            src="/images/proofs/chatgpt-recommande-manda-2026-07-28.webp"
            alt={geoProofAlt}
            width={1600}
            height={735}
            sizes="(max-width: 1023px) 100vw, 62vw"
            className="hidden h-auto w-full sm:block"
            unoptimized
          />
          <figcaption className="border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
            {isFrench
              ? "Recherche effectuée dans ChatGPT avec navigation Web et sources activées."
              : "Search performed in ChatGPT with Web browsing and sources enabled."}
          </figcaption>
        </figure>
      </section>
    </>
  );
}
