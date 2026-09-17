import Link from "next/link";
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import type { Locale } from "@/i18n/config";

export type PartnershipProduct =
  | "poker-mada"
  | "api-mobile-money"
  | "paidmada-mobile-money";

type ProductPartnershipCopy = {
  eyebrow: string;
  status: string;
  title: string;
  intro: string;
  opportunity: string;
  partnerLabel: string;
  needs: string[];
  cta: string;
  modes: string;
};

const TECHNICAL_OWNERSHIP: Record<Locale, { label: string; items: string[] }> = {
  fr: {
    label: "Socle technique déjà pris en charge",
    items: ["Produit", "Développement", "Architecture", "API", "Automatisation", "Infrastructure"],
  },
  en: {
    label: "Technical foundation already covered",
    items: ["Product", "Engineering", "Architecture", "APIs", "Automation", "Infrastructure"],
  },
};

const COPY: Record<Locale, Record<PartnershipProduct, ProductPartnershipCopy>> = {
  fr: {
    "poker-mada": {
      eyebrow: "Opportunité · PokerMada",
      status: "Produit fonctionnel",
      title: "Le produit fonctionne. Construisons maintenant son lancement.",
      intro:
        "PokerMada n’est pas un concept à développer : la plateforme technique est déjà construite et opérationnelle. Je continue à porter le produit, le développement et l’infrastructure.",
      opportunity:
        "La prochaine étape consiste à réunir les compétences marché capables de transformer ce socle en activité commerciale solide.",
      partnerLabel: "Partenaires recherchés",
      needs: [
        "Cadre légal et réglementaire",
        "Business development",
        "Marketing et acquisition",
        "Partenariats de lancement",
      ],
      cta: "Discuter de PokerMada",
      modes: "Partenariat stratégique · Distribution · Acquisition",
    },
    "api-mobile-money": {
      eyebrow: "Opportunité · API Mobile Money",
      status: "Architecture définie",
      title: "L’infrastructure est cadrée. Connectons-la aux bons acteurs du paiement.",
      intro:
        "L’architecture, les API, les webhooks et les mécanismes d’intégration sont déjà définis. La force technique du projet est prise en charge ; l’enjeu se situe désormais dans l’accès au marché.",
      opportunity:
        "Je suis ouvert à une intégration, une distribution ou un partenariat stratégique avec des acteurs capables d’accélérer son déploiement à Madagascar.",
      partnerLabel: "Expertises complémentaires",
      needs: [
        "Relations opérateurs et finance",
        "Réglementation et conformité",
        "Distribution commerciale",
        "Connaissance des paiements",
      ],
      cta: "Discuter de l’API",
      modes: "Partenariat · Intégration · Licence ou acquisition",
    },
    "paidmada-mobile-money": {
      eyebrow: "Opportunité · PaidMada",
      status: "Construction avancée",
      title: "Le socle d’orchestration prend forme. Accélérons sa mise sur le marché.",
      intro:
        "PaidMada réunit API, checkout, webhooks et services de paiement pour les entreprises et développeurs. Le produit et son infrastructure sont dans une phase de construction avancée.",
      opportunity:
        "Je recherche des partenaires capables de compléter cette exécution technique par la conformité, les accords de paiement et une vraie capacité de distribution.",
      partnerLabel: "Partenaires recherchés",
      needs: [
        "Conformité et juridique",
        "Acteurs du paiement",
        "Go-to-market",
        "Développement du marché",
      ],
      cta: "Discuter de PaidMada",
      modes: "Partenariat stratégique · Distribution · Acquisition",
    },
  },
  en: {
    "poker-mada": {
      eyebrow: "Opportunity · PokerMada",
      status: "Working product",
      title: "The product works. Now let’s build its path to market.",
      intro:
        "PokerMada is not a concept waiting to be built: the technical platform is already developed and operational. I continue to own the product, engineering and infrastructure.",
      opportunity:
        "The next stage is about bringing together the market expertise required to turn that foundation into a strong commercial business.",
      partnerLabel: "Partners sought",
      needs: [
        "Legal and regulatory",
        "Business development",
        "Marketing and acquisition",
        "Launch partnerships",
      ],
      cta: "Discuss PokerMada",
      modes: "Strategic partnership · Distribution · Acquisition",
    },
    "api-mobile-money": {
      eyebrow: "Opportunity · Mobile Money API",
      status: "Architecture defined",
      title: "The infrastructure is defined. Let’s connect it to the right payment players.",
      intro:
        "The architecture, APIs, webhooks and integration mechanisms are already defined. The technical foundation is covered; the next challenge is market access.",
      opportunity:
        "I’m open to integration, distribution or a strategic partnership with organizations that can accelerate deployment across Madagascar.",
      partnerLabel: "Complementary expertise",
      needs: [
        "Operator and finance relationships",
        "Regulation and compliance",
        "Commercial distribution",
        "Payments market knowledge",
      ],
      cta: "Discuss the API",
      modes: "Partnership · Integration · Licensing or acquisition",
    },
    "paidmada-mobile-money": {
      eyebrow: "Opportunity · PaidMada",
      status: "Advanced build",
      title: "The orchestration layer is taking shape. Let’s accelerate its path to market.",
      intro:
        "PaidMada brings together APIs, checkout, webhooks and payment services for businesses and developers. The product and its infrastructure are at an advanced build stage.",
      opportunity:
        "I’m looking for partners who can complement the technical execution with compliance, payment agreements and real distribution capacity.",
      partnerLabel: "Partners sought",
      needs: [
        "Compliance and legal",
        "Payment providers",
        "Go-to-market",
        "Market development",
      ],
      cta: "Discuss PaidMada",
      modes: "Strategic partnership · Distribution · Acquisition",
    },
  },
};

export default function PartnershipOpportunities({
  locale,
  product,
  contactHref,
}: {
  locale: Locale;
  product: PartnershipProduct;
  contactHref: string;
}) {
  const copy = COPY[locale][product];
  const ownership = TECHNICAL_OWNERSHIP[locale];
  const titleId = `${product}-partnership-title`;

  return (
    <section
      aria-labelledby={titleId}
      className="relative mb-12 overflow-hidden rounded-[1.75rem] border border-indigo-400/15 bg-[#090b13]/85 p-6 shadow-2xl shadow-black/20 sm:p-8 md:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-indigo-500/[0.11] blur-3xl"
      />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-300">
              {copy.eyebrow}
            </p>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
              {copy.status}
            </span>
          </div>

          <h2
            id={titleId}
            className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl"
          >
            {copy.title}
          </h2>

          <div className="mt-5 max-w-2xl space-y-3 text-sm leading-7 text-slate-300 sm:text-base">
            <p>{copy.intro}</p>
            <p>{copy.opportunity}</p>
          </div>

          <div className="mt-7">
            <Link
              href={contactHref}
              data-ph-event="partnership_cta_clicked"
              data-ph-props={JSON.stringify({ area: "product_partnership", product, locale })}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b13] sm:w-auto"
            >
              {copy.cta}
              <IconScoutIcon
                name="arrowRight"
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
              {copy.modes}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {ownership.label}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={ownership.label}>
            {ownership.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-indigo-400/15 bg-indigo-400/[0.05] px-3 py-1.5 text-xs font-medium text-indigo-100"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="my-6 h-px bg-white/[0.07]" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.partnerLabel}
          </p>
          <ul className="mt-4 space-y-3">
            {copy.needs.map((need) => (
              <li key={need} className="flex items-start gap-3 text-sm leading-5 text-slate-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                {need}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
