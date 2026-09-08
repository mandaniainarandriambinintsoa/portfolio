import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

type LabProject = {
  slug: string;
  image: string;
  label: string;
  title: string;
  description: string;
  stack: string[];
};

const copy = {
  fr: {
    metaTitle: "AI Engineering Lab — Claude, OpenAI, agents et évaluations",
    metaDescription:
      "Laboratoire public de Manda : produits construits avec Claude Code, agents multi-modèles, RAG, MCP, automatisation et évaluations de systèmes IA.",
    eyebrow: "AI Engineering Lab / Journal de construction",
    title: "Construire des agents utiles. Montrer les preuves.",
    intro:
      "Ce laboratoire documente comment je transforme des modèles comme Claude et OpenAI en produits observables : architecture, outils, garde-fous, déploiement et limites. Les projets terminés sont séparés des expérimentations en cours.",
    independence:
      "Laboratoire indépendant. Manda n’est ni affilié, ni certifié, ni sponsorisé par Anthropic ou OpenAI.",
    shipped: "Livré et documenté",
    exploring: "Piste de recherche publique",
    claudeTitle: "Claude / Anthropic",
    claudeBody:
      "Claude Code est utilisé comme environnement d’ingénierie sur des produits réels : compréhension du dépôt, implémentation, revue, tests et passage par Git. MCP et n8n étendent ce travail à des outils bornés et à des validations humaines.",
    openaiTitle: "OpenAI / Codex",
    openaiBody:
      "La prochaine piste publique applique la même discipline à OpenAI : outils typés, sorties structurées, traces, jeux d’évaluation et contrôle des actions. Le benchmark sera publié avec ses échecs, son coût et sa latence — pas seulement une démo heureuse.",
    claudeSignals: ["Claude Code", "MCP", "Git + tests", "Validation humaine"],
    openaiSignals: ["Agents & outils", "Sorties structurées", "Evals", "Coût & latence"],
    methodEyebrow: "Standard de publication",
    methodTitle: "Une démo n’est pas une preuve de production.",
    methodIntro:
      "Chaque nouvelle étude du laboratoire doit rendre ces six éléments vérifiables.",
    method: [
      ["01", "Problème", "Une tâche métier bornée et un résultat observable."],
      ["02", "Architecture", "Modèle, données, outils, permissions et conditions d’arrêt."],
      ["03", "Évaluations", "Cas normaux, incomplets, contradictoires et hostiles."],
      ["04", "Garde-fous", "Actions sensibles en brouillon ou soumises à validation."],
      ["05", "Exploitation", "Logs, coût, latence, reprise et changements de modèle."],
      ["06", "Limites", "Échecs connus et décisions qui doivent rester humaines."],
    ],
    evidenceEyebrow: "Preuves disponibles",
    evidenceTitle: "Produits et systèmes déjà construits",
    viewCase: "Voir l’étude de cas",
    roadmapEyebrow: "Prochain protocole",
    roadmapTitle: "Même tâche, mêmes données, deux modèles.",
    roadmapBody:
      "Le prochain benchmark comparera Claude et OpenAI sur un agent de recherche borné. Les mesures prévues : réussite de la tâche, qualité des sources, appels d’outils, coût, latence et besoin de reprise humaine.",
    roadmapSteps: [
      "Constituer un jeu de scénarios versionné",
      "Exécuter les deux variantes avec les mêmes outils",
      "Publier résultats, traces expurgées et cas d’échec",
    ],
    contactTitle: "Vous recrutez ou vous avez un cas d’usage exigeant ?",
    contactBody:
      "Je peux présenter l’architecture, le code et les arbitrages derrière ces systèmes — en français ou en anglais, à distance pour l’Europe et les États-Unis.",
    contactCta: "Discuter du système",
    projects: [
      {
        slug: "factumation",
        image: "/images/projects/factumation-logiciel-facturation.png",
        label: "Produit construit avec Claude Code",
        title: "Factumation",
        description:
          "Application de facturation reliée à des automatisations métier : conception assistée, intégration Next.js, contrôles et livraison continue.",
        stack: ["Claude Code", "Next.js", "n8n", "Webhooks"],
      },
      {
        slug: "portfolio-webflow-mcp",
        image: "/images/projects/portfolio-webflow-manda.webp",
        label: "Expérience MCP documentée",
        title: "Webflow piloté par Claude",
        description:
          "Expérience de pilotage d’un CMS via deux serveurs MCP, avec publication, SEO et limites de l’API explicitement documentées.",
        stack: ["Claude", "MCP", "Webflow API", "SEO"],
      },
      {
        slug: "zeroclaw-agent",
        image: "/images/projects/zeroclaw-agent-ia-autonome.png",
        label: "Architecture multi-fournisseurs",
        title: "ZeroClaw",
        description:
          "Infrastructure d’agent en Rust compatible avec plusieurs fournisseurs, dont OpenAI et Anthropic, pensée pour des outils et canaux multiples.",
        stack: ["Rust", "OpenAI", "Anthropic", "Tool use"],
      },
    ] satisfies LabProject[],
  },
  en: {
    metaTitle: "AI Engineering Lab — Claude, OpenAI, agents and evals",
    metaDescription:
      "Manda's public engineering lab: products built with Claude Code, multi-model agents, RAG, MCP, automation and AI system evaluations.",
    eyebrow: "AI Engineering Lab / Build log",
    title: "Build useful agents. Show the evidence.",
    intro:
      "This lab documents how I turn models such as Claude and OpenAI into observable products: architecture, tools, safeguards, deployment and limitations. Shipped work is kept separate from ongoing experiments.",
    independence:
      "Independent lab. Manda is not affiliated with, certified by, or sponsored by Anthropic or OpenAI.",
    shipped: "Shipped and documented",
    exploring: "Public research track",
    claudeTitle: "Claude / Anthropic",
    claudeBody:
      "Claude Code is used as an engineering environment on real products: repository understanding, implementation, review, tests and Git-based delivery. MCP and n8n extend that work through bounded tools and human approval.",
    openaiTitle: "OpenAI / Codex",
    openaiBody:
      "The next public track applies the same discipline to OpenAI: typed tools, structured outputs, traces, evaluation sets and action control. The benchmark will publish failures, cost and latency — not only a happy-path demo.",
    claudeSignals: ["Claude Code", "MCP", "Git + tests", "Human approval"],
    openaiSignals: ["Agents & tools", "Structured outputs", "Evals", "Cost & latency"],
    methodEyebrow: "Publishing standard",
    methodTitle: "A demo is not production evidence.",
    methodIntro: "Every new lab study must make these six elements verifiable.",
    method: [
      ["01", "Problem", "A bounded business task with an observable outcome."],
      ["02", "Architecture", "Model, data, tools, permissions and stop conditions."],
      ["03", "Evaluations", "Normal, incomplete, conflicting and adversarial cases."],
      ["04", "Safeguards", "Sensitive actions stay in draft or require approval."],
      ["05", "Operations", "Logs, cost, latency, recovery and model changes."],
      ["06", "Limits", "Known failures and decisions that must remain human."],
    ],
    evidenceEyebrow: "Available evidence",
    evidenceTitle: "Products and systems already built",
    viewCase: "View case study",
    roadmapEyebrow: "Next protocol",
    roadmapTitle: "Same task, same data, two models.",
    roadmapBody:
      "The next benchmark will compare Claude and OpenAI on a bounded research agent. Planned measures include task success, source quality, tool calls, cost, latency and human recovery.",
    roadmapSteps: [
      "Create a versioned scenario dataset",
      "Run both variants with the same tools",
      "Publish results, redacted traces and failure cases",
    ],
    contactTitle: "Hiring or working on a demanding use case?",
    contactBody:
      "I can walk through the architecture, code and trade-offs behind these systems — in English or French, remotely for teams in Europe and the United States.",
    contactCta: "Discuss the system",
    projects: [
      {
        slug: "factumation",
        image: "/images/projects/factumation-logiciel-facturation.png",
        label: "Product built with Claude Code",
        title: "Factumation",
        description:
          "An invoicing application connected to business automation: assisted design, Next.js integration, controls and continuous delivery.",
        stack: ["Claude Code", "Next.js", "n8n", "Webhooks"],
      },
      {
        slug: "portfolio-webflow-mcp",
        image: "/images/projects/portfolio-webflow-manda.webp",
        label: "Documented MCP experiment",
        title: "Claude-operated Webflow",
        description:
          "A CMS operated through two MCP servers, covering publishing, SEO and explicitly documented API limitations.",
        stack: ["Claude", "MCP", "Webflow API", "SEO"],
      },
      {
        slug: "zeroclaw-agent",
        image: "/images/projects/zeroclaw-agent-ia-autonome.png",
        label: "Multi-provider architecture",
        title: "ZeroClaw",
        description:
          "A Rust agent infrastructure compatible with several providers, including OpenAI and Anthropic, designed for multiple tools and channels.",
        stack: ["Rust", "OpenAI", "Anthropic", "Tool use"],
      },
    ] satisfies LabProject[],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale)
    ? rawLocale
    : i18n.defaultLocale) as Locale;
  const content = copy[locale];
  const path = locale === "fr" ? "/labs" : "/en/labs";

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        fr: `${SITE_URL}/labs`,
        en: `${SITE_URL}/en/labs`,
        "x-default": `${SITE_URL}/labs`,
      },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${SITE_URL}${path}`,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/projects/factumation-logiciel-facturation.png`,
          width: 1200,
          height: 675,
          alt: "Manda AI Engineering Lab",
        },
      ],
    },
  };
}

export default async function LabsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale)
    ? rawLocale
    : i18n.defaultLocale) as Locale;
  const content = copy[locale];
  const prefix = locale === "fr" ? "" : "/en";

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden px-6 pb-24 pt-32">
      <BreadcrumbJsonLd
        items={[
          { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
          { name: "AI Engineering Lab", href: `${prefix}/labs` },
        ]}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[42rem] max-w-7xl bg-[radial-gradient(circle_at_26%_18%,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(99,102,241,0.2),transparent_36%)]" />

      <section className="relative mx-auto max-w-7xl pb-24 pt-8">
        <div className="mb-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
          {content.eyebrow}
        </div>
        <h1 className="max-w-5xl text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl md:text-8xl">
          {content.title}
        </h1>
        <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[1.35fr_0.65fr]">
          <p className="max-w-3xl text-xl leading-relaxed text-slate-300 md:text-2xl">
            {content.intro}
          </p>
          <p className="self-end text-sm leading-relaxed text-slate-500">
            {content.independence}
          </p>
        </div>
      </section>

      <section aria-label="AI platforms" className="relative mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
        <article id="claude" className="group relative overflow-hidden rounded-[2rem] border border-orange-200/15 bg-[#171310] p-7 sm:p-10">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
          <div className="relative">
            <div className="mb-12 flex items-center justify-between gap-4">
              <span className="font-serif text-3xl font-semibold tracking-tight text-[#f2e8dd]">Claude</span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-emerald-200">
                {content.shipped}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{content.claudeTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-stone-300 sm:text-lg">{content.claudeBody}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Claude engineering topics">
              {content.claudeSignals.map((signal) => (
                <li key={signal} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-stone-300">{signal}</li>
              ))}
            </ul>
          </div>
        </article>

        <article id="openai" className="group relative overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-[#091515] p-7 sm:p-10">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
          <div className="relative">
            <div className="mb-12 flex items-center justify-between gap-4">
              <span className="text-3xl font-semibold tracking-[-0.06em] text-[#dffbf6]">OpenAI</span>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-cyan-100">
                {content.exploring}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{content.openaiTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{content.openaiBody}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="OpenAI engineering topics">
              {content.openaiSignals.map((signal) => (
                <li key={signal} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300">{signal}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="below-fold relative mx-auto max-w-7xl py-28">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">{content.methodEyebrow}</p>
        <div className="mt-5 grid gap-8 md:grid-cols-2 md:items-end">
          <h2 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">{content.methodTitle}</h2>
          <p className="text-lg leading-relaxed text-slate-400">{content.methodIntro}</p>
        </div>
        <ol className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {content.method.map(([number, title, description]) => (
            <li key={number} className="min-h-52 border-b border-r border-white/10 p-6 transition-colors hover:bg-white/[0.025] sm:p-8">
              <span className="font-mono text-xs text-slate-600">{number}</span>
              <h3 className="mt-8 text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="below-fold relative mx-auto max-w-7xl pb-28">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">{content.evidenceEyebrow}</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">{content.evidenceTitle}</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {content.projects.map((project) => (
            <article key={project.slug} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-slate-950">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-300">{project.label}</p>
                <h3 className="mt-3 text-2xl font-extrabold text-white">{project.title}</h3>
                <p className="mt-4 min-h-24 text-sm leading-relaxed text-slate-400">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500" aria-label={`${project.title} stack`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link
                  href={`${prefix}/projects/${project.slug}`}
                  className="mt-7 inline-flex min-h-11 items-center text-sm font-bold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-emerald-200"
                  data-ph-event="lab_case_opened"
                  data-ph-props={JSON.stringify({ project: project.slug, locale })}
                >
                  {content.viewCase} <span aria-hidden="true" className="ml-2">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="below-fold relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-indigo-300/15 bg-indigo-950/20 p-7 sm:p-12 lg:p-16">
        <div aria-hidden="true" className="absolute -bottom-36 -right-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">{content.roadmapEyebrow}</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">{content.roadmapTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{content.roadmapBody}</p>
          </div>
          <ol className="space-y-4">
            {content.roadmapSteps.map((step, index) => (
              <li key={step} className="flex gap-4 border-t border-white/10 pt-4 text-sm text-slate-300">
                <span className="font-mono text-indigo-300">0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="below-fold relative mx-auto max-w-5xl py-28 text-center">
        <h2 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">{content.contactTitle}</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">{content.contactBody}</p>
        <Link
          href={`${prefix}/contact`}
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-extrabold text-slate-950 transition-transform hover:-translate-y-0.5"
          data-ph-event="cta_clicked"
          data-ph-props={JSON.stringify({ area: "ai_lab", cta_type: "contact", locale })}
        >
          {content.contactCta}
        </Link>
      </section>
    </main>
  );
}
