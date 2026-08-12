import type { Locale } from "@/i18n/config";

export type CoreServiceContent = {
  eyebrow: string;
  intro: string;
  outcomes: { title: string; description: string }[];
  sections: { title: string; content: string[] }[];
  relatedHref: string;
  relatedLabel: string;
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  ctaDescription: string;
};

const content: Record<Locale, Record<string, CoreServiceContent>> = {
  fr: {
    "developpement-sites-saas": {
      eyebrow: "Produit web de bout en bout",
      intro: "Je conçois des sites métier, MVP et SaaS qui réunissent interface, logique métier, données, mesure et mise en production. L'objectif n'est pas seulement de livrer des écrans, mais un produit exploitable, rapide et maintenable.",
      outcomes: [
        { title: "MVP exploitable", description: "Une première version concentrée sur le parcours qui crée réellement de la valeur." },
        { title: "Socle technique", description: "Next.js, API, authentification et données structurées sans dépendance inutile." },
        { title: "Acquisition mesurable", description: "SEO/GEO, analytics et événements de conversion prévus dès la conception." },
      ],
      sections: [
        { title: "Ce que couvre le développement d'un site ou SaaS", content: ["Le périmètre peut aller d'un site métier orienté acquisition à une application avec authentification, tableau de bord, paiements, rôles et automatisations. Je cadre d'abord les utilisateurs, les actions critiques et les données nécessaires.", "Le produit est ensuite découpé en une version initiale testable. Cette approche évite de financer trop tôt des fonctions secondaires et permet d'apprendre à partir des usages réels."] },
        { title: "Une architecture adaptée au besoin", content: ["Next.js convient aux interfaces rapides, au rendu SEO et aux applications web. Supabase ou PostgreSQL porte les données lorsque le produit en a besoin. Les intégrations externes passent par des API contrôlées et n8n orchestre les tâches asynchrones ou répétitives.", "Je prévois les erreurs, permissions, journaux utiles et limites de coût avant la mise en ligne. Le choix technique reste proportionné au trafic et au risque métier."] },
        { title: "Livraison, mesure et évolution", content: ["La livraison comprend le déploiement, les variables d'environnement, la documentation utile et un parcours de validation. Les événements importants sont mesurés pour savoir où les utilisateurs avancent ou abandonnent.", "Après la mise en ligne, les priorités viennent des données : requêtes Google, parcours PostHog, retours clients et incidents réels. Le produit évolue sur des preuves plutôt que sur des suppositions."] },
      ],
      relatedHref: "/services/developpeur-react-nextjs-madagascar",
      relatedLabel: "Voir l'offre React & Next.js détaillée",
      faq: [
        { question: "Quel type de produit pouvez-vous développer ?", answer: "Sites métier, MVP SaaS, applications internes, dashboards et produits web connectés à des API ou automatisations." },
        { question: "Travaillez-vous uniquement avec Next.js ?", answer: "Next.js est mon socle principal, mais l'architecture dépend du besoin, des données, des intégrations et des contraintes d'exploitation." },
        { question: "Le SEO est-il inclus ?", answer: "Le socle technique SEO, le balisage, la performance et la mesure sont prévus dès le développement. Une stratégie éditoriale complète peut être cadrée séparément." },
      ],
      ctaTitle: "Transformer un besoin métier en produit utilisable",
      ctaDescription: "Décrivez le parcours principal, les utilisateurs et les outils déjà en place. Je vous répondrai avec un périmètre initial réaliste.",
    },
    "integration-ia": {
      eyebrow: "IA appliquée aux opérations",
      intro: "J'intègre des modèles IA dans un processus concret : classifier, extraire, rechercher, rédiger ou assister une décision. Chaque système garde des limites explicites, des données traçables et une validation humaine lorsque l'action est sensible.",
      outcomes: [
        { title: "Cas d'usage ciblé", description: "Une tâche répétée et mesurable, pas une démonstration IA sans propriétaire." },
        { title: "Contexte fiable", description: "Données, documents et règles métier fournis au modèle de façon contrôlée." },
        { title: "Garde-fous", description: "Validation humaine, seuils de confiance, logs et reprise manuelle." },
      ],
      sections: [
        { title: "Où l'intégration IA crée de la valeur", content: ["Les meilleurs cas d'usage ont un volume régulier et un résultat vérifiable : qualification de demandes, extraction de documents, brouillons de réponse, recherche dans une base de connaissances ou synthèse d'activité.", "Je commence par comparer le coût actuel, le niveau d'erreur acceptable et la façon dont un humain valide aujourd'hui le résultat."] },
        { title: "Du prompt au système de production", content: ["Un prompt seul ne constitue pas un produit. Il faut préparer le contexte, gérer les données manquantes, contrôler les sorties, prévoir les erreurs fournisseur et enregistrer les décisions utiles.", "Selon le cas, l'intégration combine OpenAI ou Anthropic, une base de données, des API métier, n8n et une interface Next.js pour le contrôle humain."] },
        { title: "Sécurité, coûts et qualité", content: ["Les données transmises sont limitées au strict nécessaire. Les actions financières, juridiques ou directement visibles par un client peuvent rester soumises à approbation.", "Le suivi porte sur le coût par traitement, le taux d'acceptation, les erreurs et le temps réellement économisé. Si une règle déterministe suffit, je ne force pas l'utilisation d'un LLM."] },
      ],
      relatedHref: "/services/developpeur-agent-ia-madagascar",
      relatedLabel: "Voir l'offre Agents IA détaillée",
      faq: [
        { question: "Quelle différence entre un chatbot et une intégration IA ?", answer: "Une intégration IA agit dans un processus défini avec des données, règles, outils et contrôles ; un chatbot est seulement une interface de conversation." },
        { question: "L'IA peut-elle agir automatiquement ?", answer: "Oui pour les actions à faible risque. Les actions sensibles peuvent exiger une validation humaine et laisser une trace exploitable." },
        { question: "Comment maîtriser le coût des modèles ?", answer: "En filtrant les entrées, en réservant l'IA aux décisions utiles, en limitant le contexte et en mesurant le coût par traitement." },
      ],
      ctaTitle: "Identifier le bon premier cas d'usage IA",
      ctaDescription: "Partagez une tâche répétitive, ses données d'entrée et la décision attendue. Je vous dirai si l'IA est pertinente ou si une règle simple suffit.",
    },
    "automatisation-n8n": {
      eyebrow: "Orchestration et intégrations",
      intro: "Je construis des workflows n8n qui relient vos formulaires, CRM, emails, bases de données et API. Le système automatise les étapes répétitives tout en gardant déduplication, reprises, alertes et validation humaine.",
      outcomes: [
        { title: "Moins de ressaisie", description: "Les données circulent entre outils sans copier-coller ni fichiers intermédiaires." },
        { title: "Traitements fiables", description: "Déduplication, retries, journalisation et alertes en cas d'échec." },
        { title: "Contrôle humain", description: "Approbation avant les messages, paiements ou changements irréversibles." },
      ],
      sections: [
        { title: "Automatisations n8n que je mets en production", content: ["Les cas fréquents sont la qualification de leads, la synchronisation CRM, les notifications, la veille d'opportunités, la génération de rapports, le traitement de documents et les relances contrôlées.", "Je peux connecter des nodes natifs, des webhooks et des API HTTP personnalisées lorsque l'intégration n'existe pas encore dans n8n."] },
        { title: "Fiabilité au-delà du scénario idéal", content: ["Un workflow de production doit reconnaître un doublon, reprendre après un timeout, limiter le débit d'une API et signaler une erreur exploitable. Les identifiants et secrets restent dans les credentials, jamais dans le JSON partagé.", "Les étapes sont nommées, documentées et regroupées pour qu'une autre personne puisse comprendre le chemin des données."] },
        { title: "Self-hosted ou cloud", content: ["Le choix dépend des données, du volume, des nodes communautaires et de l'équipe qui exploitera le système. Le self-hosting apporte davantage de contrôle mais implique mises à jour, sauvegardes et supervision.", "Je livre une architecture proportionnée et documente les dépendances, variables et scénarios de reprise nécessaires."] },
      ],
      relatedHref: "/services/automatisation-n8n-madagascar",
      relatedLabel: "Voir l'expertise n8n détaillée",
      faq: [
        { question: "Pouvez-vous reprendre un workflow n8n existant ?", answer: "Oui. Je peux auditer les erreurs, la déduplication, les credentials, les coûts d'API et la maintenabilité avant de le fiabiliser." },
        { question: "n8n remplace-t-il un développeur ?", answer: "Non. n8n accélère l'orchestration, mais les API, règles métier, données et interfaces nécessitent souvent du développement." },
        { question: "Peut-on héberger n8n sur notre serveur ?", answer: "Oui, si l'équipe accepte la responsabilité des mises à jour, sauvegardes, secrets et alertes. Sinon n8n Cloud réduit l'exploitation." },
      ],
      ctaTitle: "Fiabiliser un processus répétitif avec n8n",
      ctaDescription: "Décrivez le déclencheur, les outils concernés et le résultat attendu. Je vous proposerai un workflow initial et ses garde-fous.",
    },
    "scaling-saas-workflows": {
      eyebrow: "Performance et fiabilité",
      intro: "J'aide à stabiliser un SaaS ou un ensemble de workflows lorsque le trafic, les données ou les intégrations augmentent. L'objectif est de réduire les erreurs et les coûts avant d'ajouter de l'infrastructure.",
      outcomes: [
        { title: "Goulot mesuré", description: "CPU, base de données, API, bundle ou workflow identifié avec des données." },
        { title: "Coût maîtrisé", description: "Cache, statique, requêtes et fréquence ajustés avant de changer de forfait." },
        { title: "Exploitation claire", description: "Logs, alertes, sauvegardes et responsabilités documentées." },
      ],
      sections: [
        { title: "Quand faut-il travailler le passage à l'échelle ?", content: ["Les signaux utiles sont des temps de réponse instables, des quotas cloud consommés trop vite, des files d'attente qui grossissent, des doublons ou des incidents difficiles à diagnostiquer.", "Je pars des métriques réelles et du chemin critique. Un problème de rendu dynamique ou de requêtes répétées ne nécessite pas forcément un nouveau serveur."] },
        { title: "Optimiser avant de migrer", content: ["La première étape consiste souvent à rendre les pages statiques, réduire les appels réseau, mettre en cache les lectures stables, indexer les requêtes et différer les traitements non critiques.", "Une migration vers un VPS ou une architecture distribuée devient pertinente lorsque les contraintes sont établies et que l'équipe peut exploiter le système dans le temps."] },
        { title: "Workflows, files et observabilité", content: ["Les traitements asynchrones demandent idempotence, limites de concurrence, reprises et suivi des échecs. Les alertes doivent expliquer quelle action est requise au lieu de générer du bruit.", "Je documente le déploiement, les secrets, les sauvegardes et la procédure de retour arrière pour éviter qu'une optimisation crée une nouvelle dépendance fragile."] },
      ],
      relatedHref: "/services/audit-performance-site-web",
      relatedLabel: "Voir l'audit performance et coûts cloud",
      faq: [
        { question: "Faut-il migrer vers un VPS pour réduire les coûts ?", answer: "Pas systématiquement. Il faut d'abord mesurer les fonctions, requêtes et traitements responsables du quota, puis comparer le coût d'exploitation du VPS." },
        { question: "Pouvez-vous optimiser un site déjà en ligne ?", answer: "Oui. L'audit couvre le rendu, le cache, les appels API, les données, les bundles, les quotas et les parcours critiques." },
        { question: "Comment évitez-vous les régressions ?", answer: "Avec un état de référence, des changements ciblés, un build reproductible, des tests d'URL et une vérification des métriques après déploiement." },
      ],
      ctaTitle: "Trouver ce qui consomme réellement vos ressources",
      ctaDescription: "Partagez le symptôme, les quotas touchés et votre architecture actuelle. Je commencerai par isoler le coût avant de proposer une migration.",
    },
  },
  en: {
    "sites-saas-development": {
      eyebrow: "End-to-end web products",
      intro: "I build business websites, MVPs and SaaS products that combine interface, business logic, data, measurement and production delivery. The goal is an operable and maintainable product, not a collection of screens.",
      outcomes: [
        { title: "Usable MVP", description: "A first release focused on the workflow that creates actual value." },
        { title: "Technical foundation", description: "Next.js, APIs, authentication and structured data without unnecessary infrastructure." },
        { title: "Measured acquisition", description: "SEO/GEO, analytics and conversion events included from the start." },
      ],
      sections: [
        { title: "What web and SaaS development includes", content: ["The scope can range from an acquisition-focused business website to an authenticated application with dashboards, payments, roles and automation. I first map users, critical actions and required data.", "The product is then reduced to a testable first release. This avoids funding secondary features before the primary workflow has been validated."] },
        { title: "Architecture matched to the problem", content: ["Next.js supports fast interfaces, search rendering and web applications. Supabase or PostgreSQL stores data when required, controlled APIs connect external services, and n8n handles asynchronous or repetitive work.", "Errors, permissions, useful logs and cost limits are considered before launch. Infrastructure stays proportional to traffic and operational risk."] },
        { title: "Delivery, measurement and iteration", content: ["Delivery includes deployment, environment configuration, useful documentation and a validation path. Important actions are instrumented to reveal where users progress or abandon.", "After launch, priorities come from evidence: Google queries, PostHog journeys, customer feedback and real incidents."] },
      ],
      relatedHref: "/en/services/hire-react-nextjs-developer-madagascar",
      relatedLabel: "View the detailed React & Next.js service",
      faq: [
        { question: "What products can you build?", answer: "Business websites, SaaS MVPs, internal applications, dashboards and web products connected to APIs or automations." },
        { question: "Do you only work with Next.js?", answer: "Next.js is my main application framework, but architecture depends on data, integrations and operating constraints." },
        { question: "Is SEO included?", answer: "Technical SEO, structured markup, performance and measurement are included in the build. A complete editorial strategy can be scoped separately." },
      ],
      ctaTitle: "Turn a business need into a usable product",
      ctaDescription: "Describe the primary workflow, users and current tools. I will answer with a realistic first scope.",
    },
    "n8n-automation": {
      eyebrow: "Workflow orchestration",
      intro: "I build n8n workflows that connect forms, CRMs, email, databases and APIs. Repetitive steps run automatically while deduplication, retries, alerts and human approval keep the process controlled.",
      outcomes: [
        { title: "Less data entry", description: "Information moves between tools without copy-paste or intermediate files." },
        { title: "Reliable processing", description: "Deduplication, retries, logs and actionable failure alerts." },
        { title: "Human control", description: "Approval before messages, payments or irreversible changes." },
      ],
      sections: [
        { title: "n8n workflows I put into production", content: ["Common systems include lead qualification, CRM synchronization, alerts, opportunity monitoring, reporting, document processing and controlled follow-up.", "I combine native nodes, webhooks and custom HTTP APIs when an integration is not available in n8n."] },
        { title: "Reliability beyond the happy path", content: ["A production workflow must recognize duplicates, recover after a timeout, respect API limits and expose actionable errors. Credentials remain in credential stores and never in shared JSON.", "Steps are named, documented and grouped so another operator can understand how data moves."] },
        { title: "Self-hosted or n8n Cloud", content: ["The decision depends on data, volume, community nodes and who will operate the system. Self-hosting provides control but adds updates, backups and monitoring.", "I deliver a proportional architecture with documented dependencies, variables and recovery paths."] },
      ],
      relatedHref: "/en/services/remote-n8n-automation-consultant",
      relatedLabel: "View international n8n consulting",
      faq: [
        { question: "Can you repair an existing n8n workflow?", answer: "Yes. I can audit errors, deduplication, credentials, API cost and maintainability before making it reliable." },
        { question: "Does n8n replace software development?", answer: "No. n8n accelerates orchestration, while APIs, business rules, data and interfaces often still require development." },
        { question: "Can n8n run on our own server?", answer: "Yes, when the team accepts responsibility for updates, backups, secrets and alerts. n8n Cloud reduces that operational work." },
      ],
      ctaTitle: "Make a repetitive process reliable with n8n",
      ctaDescription: "Describe the trigger, connected tools and expected outcome. I will suggest a first workflow and its safeguards.",
    },
    "saas-workflow-scaling": {
      eyebrow: "Performance and reliability",
      intro: "I stabilize SaaS products and workflows when traffic, data or integrations grow. The objective is to reduce failures and cloud cost before adding infrastructure.",
      outcomes: [
        { title: "Measured bottleneck", description: "CPU, database, API, bundle or workflow identified with evidence." },
        { title: "Controlled cost", description: "Caching, static rendering, queries and frequency adjusted before upgrading." },
        { title: "Clear operations", description: "Logs, alerts, backups and ownership documented." },
      ],
      sections: [
        { title: "When scaling work becomes necessary", content: ["Useful signals include unstable response times, cloud quotas consumed too quickly, growing queues, duplicates or incidents that are difficult to diagnose.", "I begin with metrics and the critical path. Dynamic rendering or repeated queries do not automatically require a new server."] },
        { title: "Optimize before migrating", content: ["The first step is often static rendering, fewer network calls, caching stable reads, indexing queries and delaying non-critical processing.", "A VPS or distributed architecture becomes relevant when constraints are proven and the team can operate it over time."] },
        { title: "Queues, workflows and observability", content: ["Asynchronous processing needs idempotency, concurrency limits, retries and failure tracking. Alerts should explain the required action instead of creating noise.", "I document deployment, secrets, backups and rollback so an optimization does not introduce a fragile dependency."] },
      ],
      relatedHref: "/en/services/website-performance-optimization-service",
      relatedLabel: "View the performance and cloud cost audit",
      faq: [
        { question: "Should we move to a VPS to reduce cost?", answer: "Not automatically. First identify which functions, queries and jobs consume the quota, then compare that with VPS operating cost." },
        { question: "Can you optimize an existing live site?", answer: "Yes. The audit covers rendering, caching, APIs, data, bundles, quotas and critical user journeys." },
        { question: "How do you prevent regressions?", answer: "With a measured baseline, focused changes, reproducible builds, URL tests and post-deployment metric checks." },
      ],
      ctaTitle: "Find what is actually consuming your resources",
      ctaDescription: "Share the symptom, affected quotas and current architecture. I will isolate the cost before recommending migration.",
    },
  },
};

export function getCoreServiceContent(locale: Locale, slug: string) {
  return content[locale][slug] ?? null;
}
