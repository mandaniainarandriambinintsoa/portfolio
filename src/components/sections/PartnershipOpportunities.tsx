import Link from "next/link";
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import type { Locale } from "@/i18n/config";

type PartnershipCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  search: string;
  ownershipLabel: string;
  ownership: string[];
  closing: string;
  cta: string;
  statusLabel: string;
  partnerExpertiseLabel: string;
  products: Array<{
    name: string;
    status: string;
    description: string;
    needs: string[];
  }>;
};

const COPY: Record<Locale, PartnershipCopy> = {
  fr: {
    eyebrow: "Opportunités de partenariat",
    title: "Des produits construits. À la recherche des bons partenaires.",
    intro:
      "Je conçois et construis la technologie, le produit et l’infrastructure qui portent ces projets. PokerMada, API Mobile Money et PaidMada sont techniquement cadrés, avec des implémentations fonctionnelles ou avancées.",
    search:
      "Je recherche maintenant des partenaires business et stratégiques capables d’apporter les expertises complémentaires nécessaires pour les amener sur le marché.",
    ownershipLabel: "Périmètre déjà pris en charge",
    ownership: [
      "Produit",
      "Développement",
      "Architecture",
      "API & intégrations",
      "Automatisation",
      "Infrastructure",
    ],
    closing:
      "Vous voyez une opportunité autour de l’un de ces produits ? Construisons ensemble la prochaine étape.",
    cta: "Discuter d’un partenariat",
    statusLabel: "État technique",
    partnerExpertiseLabel: "Expertises partenaires recherchées",
    products: [
      {
        name: "PokerMada",
        status: "Produit fonctionnel",
        description:
          "La plateforme technique est développée et opérationnelle. Le lancement dépend désormais surtout de partenaires marché.",
        needs: ["Juridique & réglementation", "Business development", "Marketing & acquisition", "Partenariats de lancement"],
      },
      {
        name: "API Mobile Money",
        status: "Architecture définie",
        description:
          "Une infrastructure conçue pour simplifier l’intégration des paiements Mobile Money à Madagascar.",
        needs: ["Relations opérateurs", "Expertise réglementaire", "Distribution commerciale", "Marché des paiements"],
      },
      {
        name: "PaidMada",
        status: "Construction avancée",
        description:
          "Une couche d’orchestration plus large : API, checkout, webhooks et services pour entreprises et développeurs.",
        needs: ["Conformité & juridique", "Acteurs du paiement", "Go-to-market", "Développement du marché"],
      },
    ],
  },
  en: {
    eyebrow: "Partnership opportunities",
    title: "Built products. Looking for the right partners.",
    intro:
      "I build the technology, product and infrastructure behind these projects. PokerMada, API Mobile Money and PaidMada are already technically well-defined, with working or advanced implementations.",
    search:
      "I’m now looking for business and strategic partners who can bring complementary expertise to help bring these products to market.",
    ownershipLabel: "Technical ownership already covered",
    ownership: [
      "Product",
      "Engineering",
      "Architecture",
      "APIs & integrations",
      "Automation",
      "Infrastructure",
    ],
    closing:
      "If you see an opportunity around one of these products, let’s build the next stage together.",
    cta: "Discuss a partnership",
    statusLabel: "Technical status",
    partnerExpertiseLabel: "Partner expertise sought",
    products: [
      {
        name: "PokerMada",
        status: "Working product",
        description:
          "The technical platform is developed and operational. The next step depends primarily on market-facing partners.",
        needs: ["Legal & regulatory", "Business development", "Marketing & acquisition", "Launch partnerships"],
      },
      {
        name: "API Mobile Money",
        status: "Architecture defined",
        description:
          "Infrastructure designed to simplify Mobile Money payment integrations across Madagascar.",
        needs: ["Operator relationships", "Regulatory expertise", "Commercial distribution", "Payments market"],
      },
      {
        name: "PaidMada",
        status: "Advanced build",
        description:
          "A broader payment orchestration layer: APIs, checkout, webhooks and services for businesses and developers.",
        needs: ["Compliance & legal", "Payment partnerships", "Go-to-market", "Market development"],
      },
    ],
  },
};

export default function PartnershipOpportunities({
  locale,
  contactHref,
}: {
  locale: Locale;
  contactHref: string;
}) {
  const copy = COPY[locale];

  return (
    <section
      aria-labelledby="partnership-opportunities-title"
      className="relative mb-16 overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#090a0f]/80 p-5 shadow-2xl shadow-black/20 sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-indigo-500/[0.10] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-emerald-500/[0.07] blur-3xl"
      />

      <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="flex flex-col items-start">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
            <span className="h-px w-8 bg-indigo-400/60" aria-hidden="true" />
            {copy.eyebrow}
          </p>

          <h2
            id="partnership-opportunities-title"
            className="max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl"
          >
            {copy.title}
          </h2>

          <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
            <p>{copy.intro}</p>
            <p>{copy.search}</p>
          </div>

          <div className="mt-7 border-l border-indigo-400/40 pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.ownershipLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2" aria-label={copy.ownershipLabel}>
              {copy.ownership.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <span className="h-1 w-1 rounded-full bg-indigo-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 max-w-lg text-sm font-medium leading-6 text-white">
            {copy.closing}
          </p>

          <Link
            href={contactHref}
            data-ph-event="partnership_cta_clicked"
            data-ph-props={JSON.stringify({ area: "projects_partnership", locale })}
            className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0f]"
          >
            {copy.cta}
            <IconScoutIcon
              name="arrowRight"
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
          {copy.products.map((product, index) => (
            <article
              key={product.name}
              className="relative p-5 sm:p-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-white/[0.07]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-white/30" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                      {product.name}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                    {product.description}
                  </p>
                </div>

                <div className="shrink-0 sm:text-right">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    {copy.statusLabel}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-emerald-300">
                    {product.status}
                  </p>
                </div>
              </div>

              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label={`${product.name}: ${copy.partnerExpertiseLabel}`}
              >
                {product.needs.map((need) => (
                  <li
                    key={need}
                    className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[10px] font-medium tracking-wide text-slate-300"
                  >
                    {need}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
