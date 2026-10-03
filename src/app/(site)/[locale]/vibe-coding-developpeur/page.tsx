import type { Metadata } from "next";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FAQJsonLd from "@/components/seo/FAQJsonLd";

const path = "/vibe-coding-developpeur";

const content = {
  fr: {
    title: "Vibe Coding à la portée d'un développeur | Architecture clean, IA agentic",
    description: "Vibe Coding à la portée d'un développeur : architecture clean, agents IA et code maîtrisé pour créer des applications, SaaS et automatisations maintenables.",
    eyebrow: "Architecture clean · IA agentic · développement assisté",
    hero: "Le Vibe Coding à la portée d'un développeur.",
    lead: "J'utilise les agents IA pour accélérer le développement, avec une architecture clean, des choix techniques explicites et un code que je peux comprendre, tester et faire évoluer.",
    primary: "Parler de votre projet",
    secondary: "Voir les réalisations",
    definitionTitle: "Le Vibe Coding, c'est quoi ?",
    definition: "Le Vibe Coding désigne une façon de développer où l'on décrit un besoin en langage naturel à un agent IA, qui propose, écrit et modifie du code. Cette approche accélère l'exploration et la réalisation d'un produit. Elle ne supprime toutefois pas les décisions d'architecture, la compréhension du code ni les vérifications nécessaires avant une mise en ligne. Je m'en sers comme outil de production : je cadre le besoin, dirige les agents, relis le résultat et vérifie le comportement de l'application.",
    guideLabel: "Comprendre le Vibe Coding : définition, outils et limites",
    compareTitle: "Vibe Coding et architecture clean : comment je les associe",
    compareIntro: "Les agents accélèrent l'exécution. Mon rôle de développeur est de donner une structure claire au produit et de vérifier chaque étape.",
    compareHeaders: ["Ce que les agents accélèrent", "Ce que je structure et vérifie"],
    comparisons: [
      ["Exploration de solutions et génération de code", "Besoin, architecture et responsabilités des modules"],
      ["Création d'interfaces et de parcours", "Logique métier, accessibilité et expérience réelle"],
      ["Intégration de services et d'API", "Authentification, permissions et validation des données"],
      ["Itérations rapides sur les fonctionnalités", "Code versionné, testé et maintenable"],
      ["Automatisation des tâches répétitives", "SEO, déploiement, surveillance et évolution du produit"],
    ],
    buildTitle: "Ce que je construis avec cette approche",
    buildIntro: "Je choisis les outils selon le besoin et les contraintes du projet, puis j'assure leur intégration de bout en bout.",
    builds: [
      { title: "MVP et applications SaaS", text: "Interfaces React et Next.js, API, données, comptes utilisateurs et flux métier.", href: "/services/developpement-sites-saas", label: "Développement SaaS" },
      { title: "Agents IA et automatisations", text: "Workflows n8n, intégrations API, validation humaine et suivi des erreurs.", href: "/services/automatisation-n8n", label: "Automatisation n8n" },
      { title: "Applications métier", text: "Outils internes et expériences web pensés pour les usages réels, la performance et le référencement.", href: "/site-metier", label: "Sites métier" },
    ],
    processTitle: "Mon workflow de Vibe Coding avec des agents IA",
    steps: ["Comprendre le besoin et les utilisateurs", "Définir l'architecture et les critères de réussite", "Donner aux agents le contexte et les contraintes", "Construire par petites étapes et relire le code", "Tester les parcours, la sécurité et la performance", "Déployer, surveiller et améliorer"],
    tools: "Outils selon le projet : Codex, Claude Code, Next.js, React, Supabase, n8n, GitHub et Vercel.",
    proofTitle: "Des projets concrets, au-delà du prototype",
    proofIntro: "Ces réalisations montrent les types de produits et de systèmes que je conçois. Chaque étude détaille son contexte et ses choix techniques.",
    projects: [
      { title: "Factumation", text: "Logiciel de facturation développé avec Claude Code et connecté à des automatisations n8n.", slug: "factumation" },
      { title: "TeamIA", text: "Plateforme Next.js d'agents IA : architecture de contenu, CMS, intégrations et parcours de contact.", slug: "teamia" },
      { title: "Prospection n8n + Lemlist", text: "Workflow multi-campagnes de recherche, qualification et préparation de messages avec validation humaine.", slug: "automatisation-prospection-n8n-lemlist" },
    ],
    projectLink: "Voir l'étude de cas",
    locationTitle: "Vibe Coding depuis Madagascar, pour Madagascar et l'international",
    location: "Basé à Antananarivo, je travaille directement avec des entreprises à Madagascar et des équipes en France ou ailleurs. Pour un produit local, je cadre les parcours, les données et les intégrations utiles au marché malgache ; pour une équipe à distance, je documente les choix et livre un code que ses développeurs peuvent reprendre. Le backend de paiement mobile de PaidMada illustre mon travail sur un besoin local concret.",
    fitTitle: "Est-ce adapté à votre projet ?",
    fit: "L'approche convient aux MVP, SaaS, outils internes, tableaux de bord, applications métier et automatisations. Un besoin clair et des critères de réussite partagés permettent de profiter de la vitesse des agents sans perdre la maîtrise du produit.",
    faqTitle: "Questions fréquentes",
    faq: [
      { question: "Qu'est-ce que le Vibe Coding ?", answer: "C'est une méthode de développement où l'on dialogue en langage naturel avec des outils IA capables de produire et modifier du code. Le résultat reste à comprendre, tester et maintenir." },
      { question: "Peut-on créer une application professionnelle avec le Vibe Coding ?", answer: "Oui, si l'architecture, les données, la sécurité, les tests et le déploiement sont traités comme dans tout projet logiciel professionnel." },
      { question: "Quelle différence avec le développement traditionnel ?", answer: "Les agents accélèrent la rédaction et l'itération du code. Le cadrage, les choix techniques et la validation du produit restent des responsabilités de développement." },
      { question: "Pourquoi faire appel à un développeur ?", answer: "Un développeur peut évaluer le code produit, définir les permissions, diagnostiquer les erreurs et préparer une application qui pourra évoluer après son lancement." },
      { question: "Quels outils utilisez-vous ?", answer: "Selon le projet, j'utilise notamment Codex, Claude Code, Next.js, React, Supabase, n8n, GitHub et Vercel." },
      { question: "Travaillez-vous hors de Madagascar ?", answer: "Oui. Je suis basé à Madagascar et je travaille à distance avec des clients francophones et internationaux." },
    ],
    finalTitle: "Vous avez une idée de produit ?",
    finalText: "Décrivons le besoin, les contraintes et la première version utile à construire.",
  },
  en: {
    title: "Vibe Coding in a Developer's Hands | Clean Architecture, Agentic AI",
    description: "Vibe coding in a developer's hands: clean architecture, AI agents and code ownership for maintainable applications, SaaS products and automations.",
    eyebrow: "Clean architecture · Agentic AI · AI-assisted development",
    hero: "Vibe coding in a developer's hands.",
    lead: "I use AI coding agents to accelerate development while keeping a clean architecture, explicit technical decisions and code I can understand, test and evolve.",
    primary: "Discuss your project",
    secondary: "Explore the work",
    definitionTitle: "What is vibe coding?",
    definition: "Vibe coding is a way of building software by describing a goal in natural language to an AI agent that proposes, writes and changes code. It can speed up exploration and implementation. Architecture, code comprehension and production checks still matter. I use agents as development tools: I define the requirements, guide their work, review the output and verify how the application behaves.",
    guideLabel: "Read the guide to vibe coding, tools and production risks",
    compareTitle: "How I combine vibe coding and clean architecture",
    compareIntro: "Agents speed up implementation. My role as a developer is to give the product a clear structure and verify each step.",
    compareHeaders: ["What agents accelerate", "What I structure and verify"],
    comparisons: [
      ["Exploring solutions and generating code", "Requirements, architecture and module responsibilities"],
      ["Creating interfaces and journeys", "Business logic, accessibility and real user experience"],
      ["Integrating services and APIs", "Authentication, permissions and data validation"],
      ["Iterating quickly on features", "Versioned, tested and maintainable code"],
      ["Automating repetitive tasks", "SEO, deployment, monitoring and product evolution"],
    ],
    buildTitle: "What I build with this approach",
    buildIntro: "For remote teams, I can take a defined feature or first release from technical discovery through architecture, implementation, tests and handoff. The scope and acceptance criteria are agreed before development.",
    builds: [
      { title: "MVPs and SaaS applications", text: "React and Next.js interfaces, APIs, data, user accounts and business workflows.", href: "/services/sites-saas-development", label: "SaaS development" },
      { title: "AI agents and automations", text: "n8n workflows, API integrations, human review and error handling.", href: "/services/n8n-automation", label: "n8n automation" },
      { title: "Business applications", text: "Internal tools and web experiences designed for real users, performance and search.", href: "/site-metier", label: "Business sites" },
    ],
    processTitle: "My vibe coding workflow with AI agents",
    steps: ["Understand the users and the problem", "Define the architecture and success criteria", "Give agents the right context and constraints", "Build in small steps and review the code", "Test journeys, security and performance", "Deploy, monitor and improve"],
    tools: "Tools vary by project: Codex, Claude Code, Next.js, React, Supabase, n8n, GitHub and Vercel.",
    proofTitle: "Real projects beyond the prototype",
    proofIntro: "Factumation shows AI-assisted delivery of a real invoicing product; TeamIA and the n8n prospecting workflow show how I structure integrations, agents and human review. The case studies describe the work rather than promising that every feature was AI-generated.",
    projects: [
      { title: "Factumation", text: "Invoicing software built with Claude Code and connected to n8n automations.", slug: "factumation" },
      { title: "TeamIA", text: "Next.js AI agent platform with content architecture, CMS, integrations and enquiry flows.", slug: "teamia" },
      { title: "n8n + Lemlist prospecting", text: "Multi-campaign workflow for research, qualification and message preparation with human review.", slug: "automatisation-prospection-n8n-lemlist" },
    ],
    projectLink: "View case study",
    locationTitle: "Based in Madagascar, working remotely",
    location: "I work remotely from Antananarivo, Madagascar, with international product teams and founders. We can collaborate asynchronously around a written scope, a shared repository and reviewable milestones, with direct communication from discovery through production and handoff.",
    fitTitle: "Is this right for your project?",
    fit: "A good fit is an MVP, SaaS feature, internal tool or automation with an identifiable owner and a testable outcome. I clarify data access, permissions, integrations and deployment constraints up front; AI agents accelerate implementation, while code review and acceptance checks remain my responsibility.",
    faqTitle: "Frequently asked questions",
    faq: [
      { question: "What is vibe coding?", answer: "It is a development method that uses natural language to direct AI tools that write and modify code. The output still needs to be understood, tested and maintained." },
      { question: "Can vibe coding produce a professional application?", answer: "Yes, when architecture, data, security, tests and deployment receive the same attention as in any professional software project." },
      { question: "How is it different from traditional development?", answer: "Agents speed up writing and iterating on code. Requirements, technical decisions and product validation remain development responsibilities." },
      { question: "Why work with a developer?", answer: "A developer can assess generated code, define permissions, diagnose failures and prepare an application that can evolve after launch." },
      { question: "Which tools do you use?", answer: "Depending on the project, I use Codex, Claude Code, Next.js, React, Supabase, n8n, GitHub and Vercel." },
      { question: "Do you work with clients outside Madagascar?", answer: "Yes. I am based in Madagascar and work remotely with French-speaking and international clients." },
    ],
    finalTitle: "Have a product idea?",
    finalText: "Send me the problem, existing stack and target users. I can propose a scoped first release, delivery milestones and the technical handoff your team will need.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "fr";
  const copy = content[locale];
  const url = `${SITE_URL}${locale === "en" ? "/en" : ""}${path}`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: { fr: `${SITE_URL}${path}`, en: `${SITE_URL}/en${path}`, "x-default": `${SITE_URL}${path}` },
    },
    openGraph: { title: copy.title, description: copy.description, url, type: "website", locale: locale === "fr" ? "fr_FR" : "en_US" },
  };
}

export default async function VibeCodingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale) ? rawLocale as Locale : "fr";
  const copy = content[locale];
  const prefix = locale === "en" ? "/en" : "";
  const url = `${SITE_URL}${prefix}${path}`;

  return (
    <main id="main-content" className="relative min-h-screen px-6 pb-24 pt-32">
      <ServiceJsonLd name={copy.title} description={copy.description} locale={locale} url={url} />
      <BreadcrumbJsonLd items={[
        { name: locale === "fr" ? "Accueil" : "Home", href: prefix || "/" },
        { name: locale === "fr" ? "Services" : "Services", href: `${prefix}/services` },
        { name: "Vibe Coding", href: `${prefix}${path}` },
      ]} />
      <FAQJsonLd items={[...copy.faq]} />

      <div className="mx-auto max-w-6xl">
        <header className="mb-24 max-w-5xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300 sm:text-sm">{copy.eyebrow}</p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.08] tracking-tighter text-white sm:text-5xl lg:text-7xl">{copy.hero}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">{copy.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={`${prefix}/contact`} analytics={{ event: "cta_clicked", properties: { area: "vibe_coding_hero", locale } }}>{copy.primary}</Button>
            <Button href="#realisations" variant="glass">{copy.secondary}</Button>
          </div>
        </header>

        <section className="mb-24 max-w-4xl">
          <SectionHeading title={copy.definitionTitle} />
          <p className="border-l border-indigo-400/30 pl-5 text-base leading-8 text-slate-300 sm:pl-7 sm:text-lg">{copy.definition}</p>
          <Link href={`${prefix}/blog/vibe-coding-definition-outils-exemples-production`} className="mt-5 inline-block text-sm font-semibold text-indigo-300 underline underline-offset-4 hover:text-indigo-200">{copy.guideLabel}</Link>
        </section>

        <section className="mb-24">
          <SectionHeading title={copy.compareTitle} description={copy.compareIntro} />
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-2 border-b border-white/10 bg-white/5 text-sm font-semibold text-white sm:text-base">
              {copy.compareHeaders.map((heading) => <h3 key={heading} className="p-4 sm:p-6">{heading}</h3>)}
            </div>
            {copy.comparisons.map(([alone, led]) => (
              <div key={alone} className="grid grid-cols-2 border-b border-white/10 text-sm last:border-0 sm:text-base">
                <p className="border-r border-white/10 p-4 leading-relaxed text-slate-400 sm:p-6">{alone}</p>
                <p className="p-4 leading-relaxed text-slate-200 sm:p-6">{led}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading title={copy.buildTitle} description={copy.buildIntro} />
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            {copy.builds.map((item) => (
              <article key={item.title} className="bg-[#090a10] p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-400">{item.text}</p>
                <Link href={`${prefix}${item.href}`} className="mt-6 inline-block text-sm font-semibold text-indigo-300 underline underline-offset-4 hover:text-indigo-200">{item.label}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading title={copy.processTitle} />
          <ol className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {copy.steps.map((step, index) => (
              <li key={step} className="bg-[#090a10] p-6 sm:p-8">
                <span className="text-sm font-bold tabular-nums text-indigo-300">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-base font-semibold leading-relaxed text-white">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-slate-400">{copy.tools}</p>
        </section>

        <section id="realisations" className="mb-24 scroll-mt-28">
          <SectionHeading title={copy.proofTitle} description={copy.proofIntro} />
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            {copy.projects.map((project) => (
              <Link key={project.slug} href={`${prefix}/projects/${project.slug}`} className="group bg-[#090a10] p-6 transition-colors hover:bg-white/5 sm:p-8">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-4 min-h-24 leading-relaxed text-slate-400">{project.text}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-indigo-300 group-hover:text-indigo-200">{copy.projectLink}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-24 grid gap-10 border-y border-white/10 py-12 md:grid-cols-2">
          <div><SectionHeading title={copy.locationTitle} className="mb-5" /><p className="leading-8 text-slate-300">{copy.location}</p></div>
          <div><SectionHeading title={copy.fitTitle} className="mb-5" /><p className="leading-8 text-slate-300">{copy.fit}</p></div>
        </section>

        <section className="mb-24 max-w-4xl">
          <SectionHeading title={copy.faqTitle} />
          <div className="divide-y divide-white/10 border-y border-white/10">
            {copy.faq.map((item) => (
              <div key={item.question} className="py-6">
                <h3 className="font-semibold text-white">{item.question}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 pt-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.finalTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">{copy.finalText}</p>
          <div className="mt-8"><Button href={`${prefix}/contact`} analytics={{ event: "cta_clicked", properties: { area: "vibe_coding_final", locale } }}>{copy.primary}</Button></div>
        </section>
      </div>
    </main>
  );
}
