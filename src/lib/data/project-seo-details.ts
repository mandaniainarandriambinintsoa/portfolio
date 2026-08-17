import type { Locale } from "@/i18n/config";

type ProjectSeoFact = {
  label: string;
  value: string;
};

type ProjectSeoSection = {
  title: string;
  paragraphs: string[];
};

type ProjectSeoLink = {
  label: string;
  href: string;
  description: string;
};

type ProjectSeoFaq = {
  question: string;
  answer: string;
};

export type ProjectSeoDetails = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  summary: string;
  facts: ProjectSeoFact[];
  sections: ProjectSeoSection[];
  relatedLinks: ProjectSeoLink[];
  faq: ProjectSeoFaq[];
};

const projectSeoDetails: Record<string, Record<Locale, ProjectSeoDetails>> = {
  teamia: {
    fr: {
      metaTitle: "Refonte TeamIA : Next.js, Payload CMS et agents IA",
      metaDescription:
        "Étude de cas de la refonte TeamIA : stratégie, UX, Next.js, Payload CMS, Supabase, n8n, SEO/GEO et plateforme multilingue France-Luxembourg.",
      kicker: "Refonte d'une plateforme IA B2B",
      title: "Transformer un site Webflow en plateforme métier pilotable",
      summary:
        "TeamIA devait passer d'un site vitrine généraliste à une plateforme capable d'expliquer, démontrer et vendre des agents IA métier en France et au Luxembourg. J'ai pris en charge le reverse engineering de l'existant, la clarification du positionnement, la direction UI/UX, l'architecture Next.js et Payload CMS, les connexions Supabase et n8n, ainsi que la migration SEO/GEO. Le résultat est un système éditorial multilingue, mesurable et conçu pour rester disponible même lorsque le CMS distant ne répond pas.",
      facts: [
        { label: "Périmètre", value: "stratégie, design, code, CMS et acquisition" },
        { label: "Stack", value: "Next.js 16, Payload CMS 3 et PostgreSQL" },
        { label: "Automatisation", value: "formulaires et 9 démonstrateurs reliés à n8n" },
        { label: "Marchés", value: "France, Luxembourg et contenus FR/EN/DE" },
      ],
      sections: [
        {
          title: "Commencer par le positionnement, pas par la maquette",
          paragraphs: [
            "L'ancien site présentait de nombreuses capacités IA sans hiérarchie assez nette entre diagnostic, intégration et résultat métier. Le travail a donc commencé par un reverse engineering des pages, des messages, des parcours et des signaux de confiance. L'enjeu n'était pas de repeindre Webflow, mais de décider ce que TeamIA devait devenir dans l'esprit d'un dirigeant de PME.",
            "Le positionnement retenu présente TeamIA comme l'intégrateur transfrontalier qui transforme un processus métier en agent IA opérationnel, mesurable et finançable. Le parcours relie maintenant deux étapes cohérentes : cadrer le cas d'usage, puis déployer l'agent et mesurer sa valeur. France et Luxembourg restent deux portes locales sans imposer de redirection géographique au visiteur.",
          ],
        },
        {
          title: "Une direction UI/UX conçue pour rassurer un décideur B2B",
          paragraphs: [
            "Plusieurs directions pleine page ont été explorées avant de consolider une interface claire, blanche et opérationnelle. Le premier écran pose une promesse, un seul appel à l'action et un schéma lisible : données et processus entrent dans un agent sécurisé, puis produisent des actions dans les outils, du temps gagné et un ROI suivi.",
            "La suite de la page donne la priorité au parcours, aux démonstrateurs et aux preuves. Les références presse, le fondateur, les marchés locaux, la FAQ et le contact ont chacun une fonction précise. L'iconographie, la typographie et les dimensions des composants sont normalisées afin que l'équipe puisse enrichir le site sans casser sa cohérence visuelle.",
          ],
        },
        {
          title: "Next.js et Payload CMS sans rendre le site dépendant du CMS",
          paragraphs: [
            "Le frontend a été reconstruit avec Next.js tandis que Payload CMS administre les pages, articles, marchés, aides, cas d'usage, démonstrateurs, FAQ, équipe, presse et redirections. PostgreSQL sur Supabase porte les données structurées et un stockage objet séparé accueille les médias.",
            "La lecture distante de Payload est volontairement optionnelle pour le site public. Un snapshot statique sert de contenu de secours : si la base ou le CMS est indisponible, les pages marketing continuent de répondre sans ouvrir une connexion PostgreSQL à chaque visite. Cette décision améliore à la fois la disponibilité, la vitesse et la maîtrise des quotas Vercel/Supabase.",
          ],
        },
        {
          title: "Des démonstrateurs branchés à n8n avec une frontière serveur",
          paragraphs: [
            "Les neuf démonstrateurs ne contactent jamais directement les webhooks depuis le navigateur. Une route Next.js vérifie la demande, applique les limites et relaie l'appel vers n8n avec un secret conservé côté serveur. Le même principe protège le formulaire de contact avant son enregistrement et sa transmission au workflow métier.",
            "Cette architecture sépare la démonstration visible des credentials et de l'orchestration. Elle permet d'ajouter journalisation, contrôle de volume, reprise sur erreur et évolution des workflows sans exposer l'instance n8n ni obliger le frontend à connaître les détails techniques.",
          ],
        },
        {
          title: "Une migration SEO/GEO pensée URL par URL",
          paragraphs: [
            "La refonte conserve l'autorité acquise par l'ancien domaine grâce à une matrice de migration : URL source, nouvelle destination, redirection, canonical et équivalent linguistique. Les pages natives remplacent les contenus difficiles à indexer, avec sitemap, hreflang, métadonnées, données structurées et fichiers lisibles par les agents IA.",
            "Les hubs France, Luxembourg et Paris répondent à des intentions locales distinctes. Les articles, pages marché, cas d'usage et démonstrateurs sont reliés par sujet afin d'éviter des pages isolées. GA4, GTM et PostHog restent soumis au consentement, ce qui permet de mesurer les parcours sans charger les outils marketing avant le choix du visiteur.",
          ],
        },
        {
          title: "Une livraison exploitable après la mise en ligne",
          paragraphs: [
            "Le projet comprend les migrations Payload, les contenus statiques de secours, les scripts d'administration, les procédures Supabase, la sécurité des accès et la documentation d'exploitation. Les comptes de production, le dépôt, les données et les services critiques appartiennent à TeamIA afin d'éviter toute dépendance au prestataire.",
            "Cette réalisation rassemble mon approche complète d'un site métier : comprendre l'offre, dessiner le parcours, construire l'outil éditorial, connecter les opérations, préserver le SEO puis documenter la maintenance. La mise en ligne n'est pas la fin du projet ; elle ouvre une boucle mesurable d'amélioration du contenu et de la conversion.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Voir la plateforme TeamIA",
          href: "https://www.teamia.ai/",
          description: "Découvrir le site en production, ses marchés, ses démonstrateurs et ses contenus métier.",
        },
        {
          label: "Développement de sites et SaaS",
          href: "/services/developpement-sites-saas",
          description: "Conception Next.js, architecture de contenu et intégrations pour produits et sites métier.",
        },
        {
          label: "Automatisation n8n à Madagascar",
          href: "/services/automatisation-n8n-madagascar",
          description: "Webhooks sécurisés, workflows documentés, reprise sur erreur et validation humaine.",
        },
        {
          label: "Consultant SEO et GEO",
          href: "/services/consultant-seo-geo",
          description: "Architecture de recherche, contenus utiles, données structurées et visibilité dans les moteurs IA.",
        },
      ],
      faq: [
        {
          question: "Quel était l'objectif principal de la refonte TeamIA ?",
          answer:
            "Faire passer TeamIA d'un catalogue généraliste autour de l'IA à une plateforme B2B qui explique un parcours clair : identifier un cas d'usage, déployer un agent connecté aux outils, sécuriser les actions et mesurer le résultat.",
        },
        {
          question: "Pourquoi avoir combiné Next.js et Payload CMS ?",
          answer:
            "Next.js apporte le rendu, la performance et le contrôle SEO. Payload fournit une administration structurée pour les pages, articles, marchés, démonstrateurs et preuves. Un fallback statique évite que le site public dépende d'une lecture CMS à chaque visite.",
        },
        {
          question: "Comment les démonstrateurs TeamIA sont-ils sécurisés ?",
          answer:
            "Le navigateur appelle une route serveur Next.js. Celle-ci contrôle la requête et transmet ensuite au webhook n8n avec un secret non exposé au client. Des limites et des chemins d'erreur réduisent les appels abusifs ou incomplets.",
        },
        {
          question: "La refonte conserve-t-elle le référencement de l'ancien site ?",
          answer:
            "Oui. Une matrice de migration associe les anciennes URL aux nouvelles pages et pilote redirections, canonicals, hreflang et sitemap. Le contenu a aussi été restructuré en hubs thématiques et locaux plutôt qu'en pages isolées.",
        },
        {
          question: "TeamIA peut-il modifier le site sans développeur ?",
          answer:
            "Oui pour le contenu prévu dans Payload : pages, articles, FAQ, marchés, presse, cas d'usage et démonstrateurs. Les composants et types de sections restent encadrés afin de conserver la direction UI/UX et la qualité technique.",
        },
      ],
    },
    en: {
      metaTitle: "TeamIA Redesign: Next.js, Payload CMS and AI Agents",
      metaDescription:
        "TeamIA redesign case study: strategy, UX, Next.js, Payload CMS, Supabase, n8n, SEO/GEO and a multilingual France-Luxembourg platform.",
      kicker: "B2B AI platform redesign",
      title: "Turning a Webflow website into an operational platform",
      summary:
        "TeamIA needed to move from a broad showcase website to a platform that could explain, demonstrate and sell business AI agents in France and Luxembourg. I handled reverse engineering, positioning, UI/UX direction, the Next.js and Payload CMS architecture, Supabase and n8n integration, and the SEO/GEO migration. The result is a measurable multilingual content system designed to remain available even when the remote CMS is unavailable.",
      facts: [
        { label: "Scope", value: "strategy, design, engineering, CMS and acquisition" },
        { label: "Stack", value: "Next.js 16, Payload CMS 3 and PostgreSQL" },
        { label: "Automation", value: "forms and 9 demos connected to n8n" },
        { label: "Markets", value: "France, Luxembourg and FR/EN/DE content" },
      ],
      sections: [
        {
          title: "Positioning before interface design",
          paragraphs: [
            "The previous website presented many AI capabilities without a strong hierarchy between diagnosis, integration and business outcomes. The work started with reverse engineering of the pages, messages, journeys and trust signals. The goal was not to repaint Webflow, but to define what TeamIA should represent to an SME decision-maker.",
            "The selected position presents TeamIA as a cross-border integrator that turns a business process into an operational, measurable and fundable AI agent. The journey now connects two stages: frame the use case, then deploy the agent and measure value. France and Luxembourg remain local entry points without forcing an IP-based redirect.",
          ],
        },
        {
          title: "UI/UX designed to reassure B2B decision-makers",
          paragraphs: [
            "Several full-page directions were explored before consolidating a clear and operational interface. The first viewport delivers one promise, one primary action and one readable system diagram: data and processes enter a secured agent, then produce tool actions, time savings and measurable ROI.",
            "The rest of the page prioritizes the journey, demos and evidence. Press coverage, founder profile, local markets, FAQ and contact each have a defined role. Icons, typography and component dimensions are normalized so the team can extend the website without losing visual coherence.",
          ],
        },
        {
          title: "Next.js and Payload CMS without runtime dependency",
          paragraphs: [
            "The frontend was rebuilt with Next.js while Payload CMS manages pages, articles, markets, funding programs, use cases, demos, FAQ, team, press and redirects. PostgreSQL on Supabase stores structured content and separate object storage hosts media.",
            "Remote Payload reads are intentionally optional for the public site. A static snapshot acts as a fallback: if the database or CMS is unavailable, marketing pages continue to respond without opening a PostgreSQL connection on every visit. This improves availability, speed and Vercel/Supabase quota control.",
          ],
        },
        {
          title: "n8n demos protected by a server boundary",
          paragraphs: [
            "The nine demos never call webhooks directly from the browser. A Next.js route validates the request, applies limits and relays it to n8n with a server-only secret. The contact form follows the same boundary before persistence and workflow delivery.",
            "This separates the visible experience from credentials and orchestration. Logging, volume controls, retries and workflow changes can evolve without exposing the n8n instance or coupling the frontend to technical implementation details.",
          ],
        },
        {
          title: "An SEO/GEO migration managed URL by URL",
          paragraphs: [
            "The redesign preserves existing domain authority through a migration matrix covering source URL, destination, redirect, canonical and language equivalent. Native pages replace hard-to-index embedded content, with sitemap, hreflang, metadata, structured data and files readable by AI agents.",
            "France, Luxembourg and Paris hubs address distinct local intent. Articles, market pages, use cases and demos are connected by topic to avoid orphan pages. GA4, GTM and PostHog remain consent-aware, enabling journey measurement without loading optional tracking before the visitor's choice.",
          ],
        },
        {
          title: "A platform that can be operated after launch",
          paragraphs: [
            "The delivery includes Payload migrations, static content fallbacks, admin scripts, Supabase procedures, access security and operational documentation. Production accounts, source code, data and essential services belong to TeamIA to prevent provider lock-in.",
            "This case study combines my complete business website approach: understand the offer, design the journey, build the editorial system, connect operations, preserve search equity and document maintenance. Launch is the beginning of a measurable content and conversion improvement loop.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Visit TeamIA",
          href: "https://www.teamia.ai/en",
          description: "Explore the live platform, markets, AI demos and business content.",
        },
        {
          label: "Website and SaaS development",
          href: "/en/services/sites-saas-development",
          description: "Next.js products, content architecture and integrations for business platforms.",
        },
        {
          label: "n8n automation consultant",
          href: "/en/services/n8n-automation-expert-madagascar",
          description: "Secure webhooks, documented workflows, retries and human approval paths.",
        },
        {
          label: "SEO and GEO consulting",
          href: "/en/services/seo-geo-consultant",
          description: "Search architecture, useful content, structured data and AI search visibility.",
        },
      ],
      faq: [
        {
          question: "What was the primary objective of the TeamIA redesign?",
          answer:
            "To move TeamIA from a broad AI catalogue to a B2B platform with a clear journey: identify a use case, deploy an agent connected to business tools, secure its actions and measure the outcome.",
        },
        {
          question: "Why combine Next.js and Payload CMS?",
          answer:
            "Next.js provides rendering, performance and SEO control. Payload offers structured administration for pages, articles, markets, demos and evidence. A static fallback prevents public pages from depending on a CMS query for every visit.",
        },
        {
          question: "How are TeamIA demos secured?",
          answer:
            "The browser calls a Next.js server route. It validates the request and then contacts the n8n webhook with a secret that is never exposed to the client. Limits and error paths reduce abusive or incomplete calls.",
        },
        {
          question: "Does the redesign preserve the previous site's search visibility?",
          answer:
            "Yes. A migration matrix maps legacy URLs to new pages and controls redirects, canonicals, hreflang and sitemap entries. Content is also organized into local and topical hubs rather than isolated pages.",
        },
        {
          question: "Can TeamIA edit the website without a developer?",
          answer:
            "Yes for content modeled in Payload: pages, articles, FAQ, markets, press, use cases and demos. Components and section types remain governed to preserve UI/UX and engineering quality.",
        },
      ],
    },
  },
  "international-opportunity-agent-n8n": {
    fr: {
      metaTitle: "Agent de prospection internationale n8n | Étude de cas",
      metaDescription:
        "Étude de cas d'un agent n8n qui collecte des missions internationales, les qualifie avec OpenRouter et exige une validation humaine avant envoi.",
      kicker: "Prospection internationale assistée",
      title: "Détecter les bonnes missions sans automatiser la confiance",
      summary:
        "Cet agent transforme plusieurs flux d'offres internationales en une file de décisions courte et exploitable. n8n orchestre la collecte, PostgreSQL élimine les doublons, des règles métier filtrent le bruit et OpenRouter analyse uniquement les opportunités qui méritent un examen approfondi. Gmail sert ensuite d'interface de validation : rien ne part tant que je n'ai pas explicitement approuvé la candidature.",
      facts: [
        { label: "Cadence", value: "une exécution toutes les 60 minutes" },
        { label: "Sources", value: "4 flux RSS publics traités séquentiellement" },
        { label: "Exécution observée", value: "128 annonces lues sur un cycle complet" },
        { label: "Garde-fou", value: "validation humaine et email public obligatoire" },
      ],
      sections: [
        {
          title: "Quatre sources internationales, un seul format de travail",
          paragraphs: [
            "Le workflow surveille des flux publics spécialisés dans les missions remote, l'ingénierie, l'IA et le développement fullstack. Les sources sont récupérées depuis la configuration de l'application, puis lues une par une afin qu'une erreur ou un ralentissement sur un flux ne bloque pas tout le cycle.",
            "Chaque annonce est ramenée vers un schéma commun : source, titre, entreprise, localisation, date, URL, description et coordonnées publiques éventuelles. Le backend enregistre une empreinte dans PostgreSQL avant toute analyse coûteuse, ce qui empêche de payer plusieurs fois pour la même opportunité.",
          ],
        },
        {
          title: "Un scoring hybride pour réserver l'IA aux bons signaux",
          paragraphs: [
            "La première qualification est déterministe. Elle mesure la proximité avec mes compétences, le caractère contractuel ou freelance de la mission, sa compatibilité remote et les signaux d'exclusion. Seules les annonces qui atteignent 55/100 passent à l'analyse IA, ce qui réduit le coût et rend le pipeline plus prévisible.",
            "OpenRouter appelle Qwen comme modèle principal et Gemini Flash Lite comme solution de secours. Le modèle renvoie une structure JSON stricte avec le niveau d'adéquation, les raisons, les risques, un angle de candidature et un brouillon. Si les deux modèles échouent, le workflow conserve le score métier et un chemin de traitement déterministe au lieu de perdre l'annonce.",
          ],
        },
        {
          title: "Gmail devient une interface d'approbation légère",
          paragraphs: [
            "À partir de 75/100, l'opportunité rejoint un digest Gmail avec les éléments nécessaires pour décider vite : lien source, résumé, score, raisons et proposition de message. Deux liens signés, valables 48 heures, permettent d'approuver ou de refuser sans ouvrir le dashboard technique.",
            "L'approbation ne suffit pas à contourner les règles de contact. Une candidature automatique n'est possible que si l'annonce contient explicitement une adresse email publique. Le système ne devine jamais d'adresse. Sans contact public, l'offre reste signalée pour une candidature manuelle sur la plateforme d'origine.",
          ],
        },
        {
          title: "Une automatisation conçue pour être opérée",
          paragraphs: [
            "Les sources sont parcourues en séquence avec une pause contrôlée, les appels critiques possèdent des chemins de reprise et chaque décision est persistée. Les candidatures approuvées sont envoyées une par une, puis le résultat Gmail est enregistré pour éviter les doubles envois et rendre le parcours auditable.",
            "Une exécution complète observée a parcouru quatre sources et 128 annonces. Un second passage n'a réinjecté aucun doublon, ce qui valide la partie la moins visible mais la plus importante du système : savoir ne rien faire lorsque les données ont déjà été traitées.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Expert automatisation n8n à Madagascar",
          href: "/services/automatisation-n8n-madagascar",
          description:
            "Workflows n8n fiables, intégrations API, reprises sur erreur et exploitation en production.",
        },
        {
          label: "Intégration IA et agents métier",
          href: "/services/integration-ia",
          description:
            "Ajouter une couche IA mesurable sans lui confier les décisions sensibles.",
        },
        {
          label: "Pipeline de veille Codeur.com",
          href: "/projects/veille-codeur-automatisation-n8n",
          description:
            "Le premier pipeline local de collecte, scoring explicable et validation humaine.",
        },
        {
          label: "Showcase d'automatisations commerciales",
          href: "/projects/leads-automation-showcase",
          description:
            "Sept démonstrations n8n autour de la prospection, du contenu et de la qualification.",
        },
      ],
      faq: [
        {
          question: "L'agent postule-t-il automatiquement à toutes les offres ?",
          answer:
            "Non. Il filtre et prépare les meilleures opportunités, mais un envoi exige une approbation humaine explicite. Les annonces sans adresse email publique restent entièrement manuelles.",
        },
        {
          question: "Pourquoi combiner des règles métier et un modèle IA ?",
          answer:
            "Les règles éliminent rapidement le bruit avec un résultat prévisible. L'IA intervient ensuite sur un volume réduit pour comprendre le contexte, expliquer l'adéquation et préparer un brouillon personnalisé.",
        },
        {
          question: "Comment le système évite-t-il les doubles candidatures ?",
          answer:
            "Chaque annonce reçoit une empreinte persistée dans PostgreSQL. Les décisions, approbations et résultats d'envoi sont enregistrés, ce qui empêche une annonce déjà traitée de repartir comme une nouvelle opportunité.",
        },
        {
          question: "Cette architecture peut-elle servir à une équipe commerciale ?",
          answer:
            "Oui. Les sources, critères, seuils, modèles et canaux d'approbation peuvent être adaptés à des leads commerciaux, appels d'offres, partenaires ou demandes entrantes.",
        },
      ],
    },
    en: {
      metaTitle: "International Opportunity Agent with n8n | Case Study",
      metaDescription:
        "Case study of an n8n agent that collects international contracts, qualifies them with OpenRouter and requires human approval before outreach.",
      kicker: "Human-approved prospecting",
      title: "Finding the right contracts without automating trust",
      summary:
        "This agent turns several international opportunity feeds into a short, actionable decision queue. n8n orchestrates collection, PostgreSQL removes duplicates, business rules filter noise and OpenRouter analyzes only the listings worth deeper review. Gmail then becomes the approval interface: no application leaves the system until I explicitly approve it.",
      facts: [
        { label: "Cadence", value: "one execution every 60 minutes" },
        { label: "Sources", value: "4 public RSS feeds processed sequentially" },
        { label: "Observed run", value: "128 listings read in one complete cycle" },
        { label: "Safeguard", value: "human approval and public email required" },
      ],
      sections: [
        {
          title: "Four international sources, one operating format",
          paragraphs: [
            "The workflow monitors public feeds focused on remote contracts, engineering, AI and full-stack development. Sources come from the application's configuration and are read one at a time, so a slow or failing feed cannot block the entire cycle.",
            "Every listing is normalized into the same structure: source, role, company, location, date, URL, description and any explicitly public contact details. The backend stores a PostgreSQL fingerprint before expensive analysis, preventing the same opportunity from consuming model credits twice.",
          ],
        },
        {
          title: "Hybrid scoring reserves AI for stronger signals",
          paragraphs: [
            "The first qualification layer is deterministic. It measures technical fit, contract or freelance intent, remote compatibility and exclusion signals. Only listings that reach 55/100 move to AI analysis, keeping cost controlled and pipeline behavior predictable.",
            "OpenRouter uses Qwen as the primary model and Gemini Flash Lite as fallback. The model returns strict JSON covering fit, evidence, risks, an application angle and a draft. If both models fail, the system keeps the business score and a deterministic fallback instead of losing the opportunity.",
          ],
        },
        {
          title: "Gmail acts as a lightweight approval interface",
          paragraphs: [
            "At 75/100, an opportunity enters a Gmail digest containing what is needed for a fast decision: source link, summary, score, reasons and proposed message. Two signed links, valid for 48 hours, allow the owner to approve or reject without opening the technical dashboard.",
            "Approval does not bypass contact rules. Automatic outreach is possible only when the public listing explicitly contains an email address. The system never guesses addresses. Without a public contact, the listing remains flagged for a manual application on the original platform.",
          ],
        },
        {
          title: "Automation designed to be operated",
          paragraphs: [
            "Sources run sequentially with a controlled pause, critical calls have recovery paths and every decision is persisted. Approved applications are sent one at a time, then Gmail delivery is recorded to prevent duplicate sends and keep the journey auditable.",
            "One observed full execution processed four sources and 128 listings. A second pass ingested no duplicates, validating the least visible but most important behavior of the system: knowing when there is nothing new to do.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Remote n8n automation consultant",
          href: "/en/services/remote-n8n-automation-consultant",
          description:
            "Reliable n8n workflows, API integrations, error recovery and production support for remote teams.",
        },
        {
          label: "AI automation consulting",
          href: "/en/services/ai-integration",
          description:
            "Apply AI to measurable operations while keeping sensitive decisions under human control.",
        },
        {
          label: "Codeur.com opportunity pipeline",
          href: "/en/projects/veille-codeur-automatisation-n8n",
          description:
            "The earlier local pipeline for collection, explainable scoring and human review.",
        },
        {
          label: "Sales automation showcase",
          href: "/en/projects/leads-automation-showcase",
          description:
            "Seven hands-on n8n demonstrations covering prospecting, content and lead qualification.",
        },
      ],
      faq: [
        {
          question: "Does the agent automatically apply to every listing?",
          answer:
            "No. It filters and prepares the strongest opportunities, but sending requires explicit human approval. Listings without a public contact email remain fully manual.",
        },
        {
          question: "Why combine business rules with an AI model?",
          answer:
            "Rules remove noise quickly with predictable behavior. AI then works on a smaller set to understand context, explain fit and prepare a tailored draft.",
        },
        {
          question: "How does the system prevent duplicate applications?",
          answer:
            "Every listing receives a fingerprint stored in PostgreSQL. Decisions, approvals and delivery results are persisted, preventing an already processed listing from returning as a new opportunity.",
        },
        {
          question: "Can this architecture support a sales team?",
          answer:
            "Yes. Sources, criteria, thresholds, models and approval channels can be adapted to sales leads, tenders, partnerships or inbound requests.",
        },
      ],
    },
  },
  "veille-codeur-automatisation-n8n": {
    fr: {
      metaTitle: "Veille Codeur automatisée avec n8n | Étude de cas",
      metaDescription:
        "Étude de cas d'une veille Codeur.com automatisée avec n8n : collecte RSS, déduplication, scoring explicable, alertes et validation humaine.",
      kicker: "Prospection assistée",
      title: "Transformer la veille Codeur.com en pipeline d'opportunités",
      summary:
        "Manda Pipeline surveille automatiquement plusieurs recherches Codeur.com, structure chaque nouvelle annonce et calcule son adéquation avec mon profil. Le système réduit le temps passé à parcourir des listes sans automatiser la relation commerciale : les opportunités prioritaires sont signalées, puis chaque décision reste validée humainement.",
      facts: [
        { label: "Fréquence", value: "une veille toutes les 10 minutes" },
        { label: "Capacité", value: "10 recherches et 50 annonces par flux" },
        { label: "Qualification", value: "score explicable, alerte dès 75/100" },
        { label: "Garde-fou", value: "validation humaine, aucun envoi automatique" },
      ],
      sections: [
        {
          title: "De la veille manuelle à une file de travail priorisée",
          paragraphs: [
            "Le problème n'était pas de trouver davantage d'annonces, mais d'identifier rapidement celles qui correspondent réellement à mes compétences en n8n, IA et développement web. Le workflow interroge les recherches actives toutes les 10 minutes et traite les flux un par un pour rester stable, même lorsque plusieurs veilles tournent en parallèle.",
            "Chaque annonce est normalisée avec son titre, son URL, sa date, ses catégories et son budget. Les nouvelles opportunités sont ensuite enregistrées dans Manda Pipeline, où elles deviennent recherchables, filtrables et comparables dans une interface dédiée.",
          ],
        },
        {
          title: "Une architecture n8n reliée au produit",
          paragraphs: [
            "n8n orchestre la planification, la lecture RSS, la transformation des données, l'appel aux API de Manda Pipeline et l'envoi des alertes. Les recherches sont traitées séquentiellement avec une courte pause entre chaque passage, ce qui évite les pics de charge et rend les exécutions plus faciles à diagnostiquer.",
            "Le pipeline ne rescore que les nouvelles annonces. Il nettoie aussi les opportunités ignorées après 24 heures et conserve une empreinte pendant 90 jours afin d'éviter qu'une même annonce soit réinjectée comme si elle était nouvelle.",
          ],
        },
        {
          title: "Scoring explicable et contrôle humain",
          paragraphs: [
            "Le score synthétise plusieurs signaux utiles au choix d'une mission : adéquation technique, contexte du besoin, budget et qualité des informations disponibles. À partir de 75/100, une alerte attire l'attention sur l'opportunité, mais le dashboard conserve les raisons du score pour permettre une vraie vérification.",
            "Le garde-fou central est volontaire : aucune candidature ni aucun message n'est envoyé automatiquement. L'automatisation prépare la décision, réduit le bruit et accélère la réaction, tandis que la prise de contact reste personnalisée et validée par une personne.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Expert automatisation n8n à Madagascar",
          href: "/services/automatisation-n8n-madagascar",
          description:
            "Conception de workflows fiables, intégrations API, alertes et garde-fous de production.",
        },
        {
          label: "Automatisation de prospection multicanale",
          href: "/projects/leads-automation-showcase",
          description:
            "Un autre cas concret de collecte, qualification et orchestration de leads.",
        },
      ],
      faq: [
        {
          question: "Le workflow envoie-t-il automatiquement une candidature ?",
          answer:
            "Non. Il collecte, normalise, déduplique, score et signale les opportunités pertinentes. La décision et le message de prise de contact restent entièrement soumis à une validation humaine.",
        },
        {
          question: "Comment les doublons sont-ils évités ?",
          answer:
            "Manda Pipeline n'ingère que les nouvelles annonces et conserve une empreinte anti-réingestion pendant 90 jours. Les opportunités ignorées sont retirées de la file active après 24 heures sans réapparaître comme de nouvelles offres.",
        },
        {
          question: "Le scoring peut-il être adapté à une autre activité ?",
          answer:
            "Oui. Les critères, leur poids, le seuil d'alerte, les sources et le canal de notification peuvent être adaptés à un métier, une équipe commerciale ou une plateforme différente.",
        },
      ],
    },
    en: {
      metaTitle: "Automated Codeur Opportunity Monitor with n8n | Case Study",
      metaDescription:
        "Case study of an automated Codeur.com monitor built with n8n: RSS collection, deduplication, explainable scoring, alerts and human review.",
      kicker: "Assisted prospecting",
      title: "Turning Codeur.com monitoring into an opportunity pipeline",
      summary:
        "Manda Pipeline automatically monitors several Codeur.com searches, structures every new listing and measures how well it fits my profile. The system cuts the time spent scanning lists without automating the commercial relationship: priority opportunities are surfaced, then every decision remains subject to human review.",
      facts: [
        { label: "Frequency", value: "one monitoring run every 10 minutes" },
        { label: "Capacity", value: "10 searches and 50 listings per feed" },
        { label: "Qualification", value: "explainable score, alert from 75/100" },
        { label: "Safeguard", value: "human review, no automatic outreach" },
      ],
      sections: [
        {
          title: "From manual monitoring to a prioritized work queue",
          paragraphs: [
            "The problem was not finding more listings. It was quickly identifying the ones that genuinely match my n8n, AI and web development skills. The workflow checks active searches every 10 minutes and processes feeds one at a time to remain stable when several monitors run together.",
            "Each listing is normalized with its title, URL, publication date, categories and budget. New opportunities are then stored in Manda Pipeline, where they can be searched, filtered and compared in a dedicated interface.",
          ],
        },
        {
          title: "An n8n architecture connected to the product",
          paragraphs: [
            "n8n orchestrates scheduling, RSS reading, data transformation, Manda Pipeline API calls and priority alerts. Searches run sequentially with a short wait between each pass, limiting load spikes and making executions easier to diagnose.",
            "The pipeline scores new listings only. It also removes ignored opportunities from the active queue after 24 hours and keeps a fingerprint for 90 days so the same listing is not reintroduced as new.",
          ],
        },
        {
          title: "Explainable scoring with human control",
          paragraphs: [
            "The score combines signals that matter when selecting a mission: technical fit, business context, budget and information quality. From 75/100, an alert highlights the opportunity, while the dashboard preserves the scoring reasons for proper review.",
            "The central safeguard is deliberate: no application or message is sent automatically. Automation prepares the decision, removes noise and speeds up reaction time, while outreach remains personalized and approved by a person.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "AI automation consultant for small businesses",
          href: "/en/services/ai-integration",
          description:
            "Production-ready AI automation, API integration and human approval for lean US teams.",
        },
        {
          label: "Remote n8n consultant for US teams",
          href: "/en/services/remote-n8n-automation-consultant",
          description:
            "n8n workflow audits, migrations, self-hosting and production support with US time-zone overlap.",
        },
        {
          label: "n8n automation expert in Madagascar",
          href: "/en/services/n8n-automation-expert-madagascar",
          description:
            "Reliable workflows, API integrations, alerts and production safeguards.",
        },
        {
          label: "Multichannel lead automation",
          href: "/en/projects/leads-automation-showcase",
          description:
            "Another hands-on case involving lead collection, qualification and orchestration.",
        },
      ],
      faq: [
        {
          question: "Does the workflow automatically submit applications?",
          answer:
            "No. It collects, normalizes, deduplicates, scores and surfaces relevant opportunities. The decision and outreach message remain fully subject to human review.",
        },
        {
          question: "How are duplicate listings prevented?",
          answer:
            "Manda Pipeline ingests new listings only and keeps an anti-reingestion fingerprint for 90 days. Ignored opportunities leave the active queue after 24 hours without returning as new listings.",
        },
        {
          question: "Can the scoring model be adapted to another business?",
          answer:
            "Yes. Criteria, weights, alert threshold, sources and notification channel can be adapted to a different role, sales team or marketplace.",
        },
      ],
    },
  },
  "paidmada-mobile-money": {
    fr: {
      metaTitle: "PaidMada Mobile Money - Orange Money, MVola, Airtel",
      metaDescription:
        "Projet PaidMada Mobile Money : architecture de paiement pour Madagascar avec Orange Money, MVola, Airtel Money, callbacks, statuts et rapprochement.",
      kicker: "Architecture paiement",
      title: "Ce que démontre PaidMada côté Mobile Money",
      summary:
        "PaidMada Mobile Money démontre comment une application Madagascar peut structurer des paiements Orange Money, MVola et Airtel Money sans dépendre d'une confirmation fragile côté frontend. Le coeur du projet est la logique serveur : créer une tentative de paiement, stocker la référence fournisseur, recevoir le callback, vérifier le statut et rapprocher la transaction avec la commande. Cette approche réduit les paiements perdus, les confirmations ambiguës et les recherches manuelles dans plusieurs outils.",
      facts: [
        { label: "Fournisseurs ciblés", value: "Orange Money, MVola, Airtel Money" },
        { label: "Bloc critique", value: "callbacks, statuts, rapprochement" },
        { label: "Usage métier", value: "commande, facture, réservation ou abonnement" },
        { label: "Risque traité", value: "double callback, statut inconnu, paiement non associé" },
      ],
      sections: [
        {
          title: "Pourquoi PaidMada aide à juger une API Mobile Money Madagascar",
          paragraphs: [
            "Une API Mobile Money Madagascar devient fiable quand le paiement est traité comme un cycle complet, pas comme un simple bouton. PaidMada sert de cas concret pour cadrer les statuts, les références fournisseur, le suivi côté serveur et le dashboard de contrôle.",
            "Le projet montre aussi pourquoi Orange Money, MVola et Airtel Money doivent être isolés dans des adaptateurs fournisseur. Chaque opérateur peut avoir ses propres paramètres, statuts et contraintes d'accès, tandis que l'application a besoin d'un modèle commun pour rester maintenable.",
          ],
        },
        {
          title: "Flux de paiement conseillé",
          paragraphs: [
            "Le flux conseillé commence par une intention de paiement créée côté backend avec montant, devise, client, commande et fournisseur visé. Le frontend peut afficher le parcours client, mais la validation définitive doit venir du serveur après callback ou vérification fournisseur.",
            "Le dashboard doit permettre de chercher un paiement par client, téléphone, commande ou référence fournisseur. C'est ce qui rend l'équipe capable de traiter un litige, une confirmation tardive ou un paiement à vérifier sans fouiller dans les logs techniques.",
          ],
        },
        {
          title: "Garde-fous production",
          paragraphs: [
            "Les garde-fous principaux sont l'idempotence, la vérification du callback, la journalisation des payloads utiles et la séparation entre statut affiché au client et statut validé en base. Sans ces règles, un paiement peut être validé deux fois ou rester non associé à la bonne commande.",
            "Pour un lancement sérieux, je recommande aussi un mode test ou mock fournisseur. Il permet de simuler les cas réussis, échoués, expirés et ambigus avant d'avoir tous les accès opérateur.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Solution API Mobile Money Madagascar",
          href: "/solutions/api-mobile-money-madagascar",
          description:
            "Page de cadrage pour intégrer Orange Money, MVola, Airtel Money, callbacks et dashboard.",
        },
        {
          label: "Développeur Node.js Madagascar",
          href: "/services/developpeur-nodejs-madagascar",
          description:
            "Backend API, webhooks, sécurité serveur et intégrations fournisseur.",
        },
      ],
      faq: [
        {
          question: "PaidMada est-il lié à une API Mobile Money Madagascar ?",
          answer:
            "Oui. PaidMada sert de projet de référence pour parler d'intégration Mobile Money à Madagascar : Orange Money, MVola, Airtel Money, callbacks, statuts serveur et rapprochement avec une commande ou facture.",
        },
        {
          question: "Comment éviter un paiement Mobile Money perdu ?",
          answer:
            "Il faut stocker chaque tentative avec une référence interne, recevoir le callback côté serveur, traiter le statut de manière idempotente et rendre le paiement recherchable dans un dashboard par client, commande ou référence fournisseur.",
        },
        {
          question: "Pourquoi prévoir un mode test pour Orange Money, MVola ou Airtel Money ?",
          answer:
            "Un mode test permet de vérifier les écrans, statuts, notifications et cas d'erreur avant la mise en production. C'est utile quand les accès fournisseur ou sandbox arrivent progressivement.",
        },
      ],
    },
    en: {
      metaTitle: "Madagascar Mobile Money API Case Study | PaidMada",
      metaDescription:
        "PaidMada case study: a Madagascar Mobile Money API architecture for MVola, Orange Money and Airtel Money with callbacks, statuses and reconciliation.",
      kicker: "Payment architecture",
      title: "What PaidMada demonstrates for Mobile Money",
      summary:
        "PaidMada Mobile Money demonstrates how a Madagascar application can structure Orange Money, MVola and Airtel Money payments without relying on fragile frontend confirmation. The core of the project is server-side logic: create a payment attempt, store the provider reference, receive the callback, verify the status and reconcile the transaction with the order. This approach reduces lost payments, ambiguous confirmations and manual searches across multiple tools.",
      facts: [
        { label: "Target providers", value: "Orange Money, MVola, Airtel Money" },
        { label: "Critical block", value: "callbacks, statuses, reconciliation" },
        { label: "Business use", value: "order, invoice, booking or subscription" },
        { label: "Risk handled", value: "double callback, unknown status, unmatched payment" },
      ],
      sections: [
        {
          title: "Why PaidMada helps assess a Madagascar Mobile Money API",
          paragraphs: [
            "A Madagascar Mobile Money API becomes reliable when payment is treated as a full lifecycle, not a simple button. PaidMada is a concrete case for framing statuses, provider references, server-side tracking and the control dashboard.",
            "The project also shows why Orange Money, MVola and Airtel Money should be isolated in provider adapters. Each operator can have its own parameters, statuses and access constraints, while the application needs one shared model to remain maintainable.",
          ],
        },
        {
          title: "Recommended payment flow",
          paragraphs: [
            "The recommended flow starts with a payment intent created in the backend with amount, currency, customer, order and target provider. The frontend can show the customer journey, but final validation should come from the server after callback or provider verification.",
            "The dashboard should let the team search a payment by customer, phone number, order or provider reference. That is what makes disputes, late confirmations and manually reviewed payments manageable without digging through technical logs.",
          ],
        },
        {
          title: "Production safeguards",
          paragraphs: [
            "The main safeguards are idempotency, callback verification, useful payload logging and a clear split between the status shown to the customer and the status validated in the database. Without those rules, a payment can be validated twice or remain unmatched.",
            "For a serious launch, I also recommend a test or provider mock mode. It helps simulate successful, failed, expired and ambiguous cases before all operator accesses are available.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Mobile Money API Madagascar solution",
          href: "/en/solutions/mobile-money-api-madagascar",
          description:
            "Scoping page for Orange Money, MVola, Airtel Money, callbacks and dashboard integration.",
        },
        {
          label: "Node.js Developer Madagascar",
          href: "/en/services/hire-nodejs-developer-madagascar",
          description:
            "Backend APIs, webhooks, server security and provider integrations.",
        },
      ],
      faq: [
        {
          question: "Is PaidMada related to a Madagascar Mobile Money API?",
          answer:
            "Yes. PaidMada is a reference project for Mobile Money integration in Madagascar: Orange Money, MVola, Airtel Money, callbacks, server statuses and reconciliation with an order or invoice.",
        },
        {
          question: "How do you avoid a lost Mobile Money payment?",
          answer:
            "Store each attempt with an internal reference, receive the callback server-side, process the status idempotently and make the payment searchable in a dashboard by customer, order or provider reference.",
        },
        {
          question: "Why plan a test mode for Orange Money, MVola or Airtel Money?",
          answer:
            "A test mode verifies screens, statuses, notifications and error cases before production. It is useful when provider or sandbox access arrives progressively.",
        },
      ],
    },
  },
  "facebook-agen-ia": {
    fr: {
      metaTitle: "Projet Agent IA Facebook : Messenger, leads et CRM",
      metaDescription:
        "Étude de cas Agent IA Facebook : qualification Messenger, scoring de leads, synthèse, dashboard CRM et validation humaine des actions sensibles.",
      kicker: "Agent IA Facebook",
      title: "Ce que montre Facebook Agent IA pour la prospection",
      summary:
        "Facebook Agent IA montre comment transformer des messages, commentaires ou formulaires Facebook en leads exploitables sans automatiser une réponse risquée. L'agent peut détecter l'intention, résumer la demande, classer le lead, préparer une réponse et créer une action commerciale. La valeur vient du cadrage : l'IA aide à qualifier et structurer, tandis que l'humain garde la validation pour les réponses sensibles ou les opportunités importantes.",
      facts: [
        { label: "Canal", value: "Facebook, Messenger, commentaires ou formulaires" },
        { label: "Sortie utile", value: "résumé, intention, score, prochaine action" },
        { label: "Contrôle", value: "validation humaine sur les cas sensibles" },
        { label: "Usage", value: "prospection, support léger, qualification commerciale" },
      ],
      sections: [
        {
          title: "Pourquoi un agent IA Facebook ne doit pas juste répondre",
          paragraphs: [
            "Un agent IA Facebook utile commence par qualifier la demande avant de proposer une réponse. Il identifie si la personne demande un prix, un rendez-vous, une information produit, un support ou une conversation non commerciale.",
            "Cette qualification protège la marque. Les réponses simples peuvent être préparées automatiquement, mais les demandes commerciales, sensibles ou ambiguës doivent arriver dans un dashboard avec contexte et validation humaine.",
          ],
        },
        {
          title: "Données à extraire d'une conversation",
          paragraphs: [
            "Une conversation Facebook exploitable doit produire quelques champs stables : nom, canal, besoin, urgence, produit ou service demandé, niveau d'intérêt, objections et prochaine action. Ces champs sont plus utiles qu'un long résumé sans décision.",
            "Le dashboard devient alors un outil de tri : l'équipe voit les conversations chaudes, les demandes à relancer, les messages à ignorer et les cas qui nécessitent une réponse manuelle.",
          ],
        },
        {
          title: "Connexion CRM et n8n",
          paragraphs: [
            "Un agent IA Facebook peut être connecté à n8n, Airtable, HubSpot, Google Sheets ou une API interne selon les accès disponibles. Le workflow doit toujours garder une trace de la source, du score, de la décision et de la personne qui valide l'action.",
            "Pour éviter le spam, je recommande de limiter l'automatisation au tri, à la synthèse et aux brouillons au départ. L'envoi automatique peut venir plus tard, seulement sur des scénarios courts et mesurés.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Solution Agent IA Facebook",
          href: "/solutions/agent-ia-facebook",
          description:
            "Architecture complète pour qualifier Messenger, préparer les réponses et synchroniser le CRM avec n8n.",
        },
        {
          label: "Développeur agent IA",
          href: "/services/developpeur-agent-ia-madagascar",
          description:
            "Agents IA connectés aux outils métier, bases de connaissance et workflows.",
        },
      ],
      faq: [
        {
          question: "Un agent IA Facebook peut-il qualifier des leads ?",
          answer:
            "Oui. Un agent IA Facebook peut analyser un message, commentaire ou formulaire, détecter l'intention, résumer le besoin, attribuer un score et créer une prochaine action commerciale.",
        },
        {
          question: "Faut-il laisser l'IA répondre automatiquement sur Facebook ?",
          answer:
            "Pas au début. Je recommande de commencer avec des brouillons et une validation humaine, puis d'automatiser seulement les réponses simples et répétitives une fois les scénarios testés.",
        },
        {
          question: "Quels outils peut-on connecter à un agent IA Facebook ?",
          answer:
            "Selon les accès, on peut connecter Facebook à n8n, un CRM, Airtable, Google Sheets, une base Supabase, WhatsApp, email ou une API métier.",
        },
      ],
    },
    en: {
      metaTitle: "Facebook AI Agent Case Study: Messenger, Leads and CRM",
      metaDescription:
        "Facebook AI agent case study: Messenger qualification, lead scoring, summaries, CRM dashboard and human approval for sensitive actions.",
      kicker: "Facebook AI agent",
      title: "What Facebook AI Agent shows for prospecting",
      summary:
        "Facebook AI Agent shows how to turn Facebook messages, comments or forms into usable leads without automating risky replies. The agent can detect intent, summarize the request, classify the lead, prepare a reply and create a sales action. The value comes from framing: AI helps qualify and structure conversations, while humans keep validation for sensitive replies or important opportunities.",
      facts: [
        { label: "Channel", value: "Facebook, Messenger, comments or forms" },
        { label: "Useful output", value: "summary, intent, score, next action" },
        { label: "Control", value: "human validation on sensitive cases" },
        { label: "Use case", value: "prospecting, light support, sales qualification" },
      ],
      sections: [
        {
          title: "Why a Facebook AI agent should not only reply",
          paragraphs: [
            "A useful Facebook AI agent starts by qualifying the request before proposing a reply. It identifies whether the person is asking for price, booking, product information, support or a non-commercial conversation.",
            "This qualification protects the brand. Simple answers can be prepared automatically, but commercial, sensitive or ambiguous requests should land in a dashboard with context and human validation.",
          ],
        },
        {
          title: "Data to extract from a conversation",
          paragraphs: [
            "A usable Facebook conversation should produce a few stable fields: name, channel, need, urgency, requested product or service, interest level, objections and next action. These fields are more useful than a long summary without a decision.",
            "The dashboard then becomes a triage tool: the team sees hot conversations, follow-up requests, messages to ignore and cases that require a manual reply.",
          ],
        },
        {
          title: "CRM and n8n connection",
          paragraphs: [
            "A Facebook AI agent can be connected to n8n, Airtable, HubSpot, Google Sheets or an internal API depending on available access. The workflow should always keep a trace of the source, score, decision and person validating the action.",
            "To avoid spam, I recommend limiting automation to triage, summaries and drafts at first. Automatic sending can come later, only on short and measured scenarios.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Facebook AI Agent solution",
          href: "/en/solutions/facebook-ai-agent",
          description:
            "Complete architecture for Messenger qualification, reply drafts and CRM synchronization with n8n.",
        },
        {
          label: "AI Agent Developer",
          href: "/en/services/ai-agent-developer-madagascar",
          description:
            "AI agents connected to business tools, knowledge bases and workflows.",
        },
      ],
      faq: [
        {
          question: "Can a Facebook AI agent qualify leads?",
          answer:
            "Yes. A Facebook AI agent can analyze a message, comment or form, detect intent, summarize the need, assign a score and create a next sales action.",
        },
        {
          question: "Should AI reply automatically on Facebook?",
          answer:
            "Not at the beginning. I recommend starting with drafts and human validation, then automating only simple and repetitive replies once scenarios have been tested.",
        },
        {
          question: "Which tools can connect to a Facebook AI agent?",
          answer:
            "Depending on access, Facebook can connect to n8n, a CRM, Airtable, Google Sheets, a Supabase database, WhatsApp, email or a business API.",
        },
      ],
    },
  },
  "animation-web": {
    fr: {
      metaTitle: "Animation Web - React, Next.js et micro-interactions",
      metaDescription:
        "Projet Animation Web : animations frontend React/Next.js, micro-interactions, hero animé, performance et intégration production.",
      kicker: "Interface animée",
      title: "Ce que démontre Animation Web côté frontend",
      summary:
        "Animation Web démontre une approche d'animation frontend utile pour un site ou une application React/Next.js : mouvement visible, interface lisible et performance gardée sous contrôle. L'objectif n'est pas d'ajouter des effets partout, mais d'utiliser l'animation pour guider l'attention, expliquer une interaction et rendre une page plus mémorable sans bloquer le chargement ni l'accessibilité.",
      facts: [
        { label: "Domaine", value: "React, Next.js, UI motion" },
        { label: "Usage", value: "hero animé, micro-interactions, transitions" },
        { label: "Point de contrôle", value: "performance, responsive, lisibilité" },
        { label: "Risque traité", value: "animation lourde, mouvement inutile, CLS" },
      ],
      sections: [
        {
          title: "Quand une animation web est utile",
          paragraphs: [
            "Une animation web est utile lorsqu'elle clarifie une action ou hiérarchise l'information. Sur une landing page, elle peut guider le regard vers le message principal, montrer une transition d'état ou rendre une interaction plus compréhensible.",
            "Une animation web devient faible lorsqu'elle remplace le contenu ou ralentit l'affichage. Je privilégie les mouvements courts, les déclencheurs explicites et les composants capables de rester lisibles sur mobile.",
          ],
        },
        {
          title: "Contraintes de production",
          paragraphs: [
            "Une animation React/Next.js doit être testée comme n'importe quelle fonctionnalité frontend : comportement mobile, absence de chevauchement, respect de prefers-reduced-motion, stabilité du layout et impact sur le temps de chargement.",
            "Pour les animations complexes, la logique doit rester isolée du contenu. Cela permet d'ajuster le texte, les images ou les appels à l'action sans casser le mouvement ni créer de régression visuelle.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Développeur React & Next.js",
          href: "/services/developpeur-react-nextjs-madagascar",
          description:
            "Applications et interfaces React/Next.js performantes, typées et prêtes production.",
        },
        {
          label: "Développement applications",
          href: "/services/developpement-applications",
          description:
            "Applications web métier, dashboards et interfaces interactives.",
        },
      ],
      faq: [
        {
          question: "Une animation web peut-elle nuire au SEO ?",
          answer:
            "Oui si elle masque le contenu, ralentit le chargement ou provoque des décalages de layout. Une bonne animation garde le contenu HTML lisible, respecte le responsive et ne bloque pas le rendu principal.",
        },
        {
          question: "Faut-il utiliser GSAP pour une animation React ?",
          answer:
            "GSAP est utile pour des séquences complexes, mais une animation simple peut rester en CSS. Le choix dépend du niveau de contrôle, du cycle de vie React et du besoin de synchroniser plusieurs éléments.",
        },
      ],
    },
    en: {
      metaTitle: "Web Animation - React, Next.js and micro-interactions",
      metaDescription:
        "Web Animation project: React/Next.js frontend animations, micro-interactions, animated hero, performance and production integration.",
      kicker: "Animated interface",
      title: "What Web Animation demonstrates on the frontend",
      summary:
        "Web Animation demonstrates a useful frontend animation approach for a React/Next.js website or application: visible motion, readable interface and controlled performance. The objective is not to add effects everywhere, but to use animation to guide attention, explain an interaction and make a page more memorable without harming loading or accessibility.",
      facts: [
        { label: "Domain", value: "React, Next.js, UI motion" },
        { label: "Use", value: "animated hero, micro-interactions, transitions" },
        { label: "Control point", value: "performance, responsive, readability" },
        { label: "Risk handled", value: "heavy motion, useless effects, CLS" },
      ],
      sections: [
        {
          title: "When web animation is useful",
          paragraphs: [
            "Web animation is useful when it clarifies an action or organizes information. On a landing page, it can guide attention toward the main message, show a state transition or make an interaction easier to understand.",
            "Web animation becomes weak when it replaces content or slows rendering. I prefer short movements, explicit triggers and components that remain readable on mobile.",
          ],
        },
        {
          title: "Production constraints",
          paragraphs: [
            "A React/Next.js animation should be tested like any other frontend feature: mobile behavior, no overlap, prefers-reduced-motion support, layout stability and loading impact.",
            "For complex animations, the motion logic should stay isolated from the content. That makes it possible to adjust text, images or calls to action without breaking the animation or creating a visual regression.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "React & Next.js Developer",
          href: "/en/services/hire-react-nextjs-developer-madagascar",
          description:
            "High-performance React/Next.js applications and interfaces, typed and production-ready.",
        },
        {
          label: "Application Development",
          href: "/en/services/application-development",
          description:
            "Business web applications, dashboards and interactive interfaces.",
        },
      ],
      faq: [
        {
          question: "Can web animation hurt SEO?",
          answer:
            "Yes if it hides content, slows loading or causes layout shifts. A good animation keeps HTML content readable, respects responsive layouts and does not block the main render.",
        },
        {
          question: "Should GSAP be used for React animation?",
          answer:
            "GSAP is useful for complex sequences, but simple animation can stay in CSS. The choice depends on control needs, React lifecycle handling and synchronization across elements.",
        },
      ],
    },
  },
  factumation: {
    fr: {
      metaTitle: "Logiciel de facturation gratuit Madagascar | Factumation",
      metaDescription:
        "Créez gratuitement factures et devis en ligne à Madagascar avec Factumation : PDF professionnel, Ariary, suivi client et aucune carte bancaire.",
      kicker: "Facturation en ligne à Madagascar",
      title: "Un logiciel de facturation gratuit pensé pour Madagascar",
      summary:
        "Factumation permet à un freelance, un indépendant ou une petite entreprise malgache de créer une facture ou un devis professionnel sans installer de logiciel et sans fournir de carte bancaire. L'outil fonctionne dans le navigateur, prend en charge l'Ariary malgache et exporte les documents en PDF. Cette page présente le produit, ses usages et ses limites afin d'aider un professionnel à choisir entre un générateur simple et un logiciel de gestion plus complet.",
      facts: [
        { label: "Prix", value: "100 % gratuit, sans carte bancaire" },
        { label: "Documents", value: "factures et devis exportables en PDF" },
        { label: "Devise locale", value: "Ariary malgache (MGA)" },
        { label: "Accès", value: "création sans inscription obligatoire" },
      ],
      sections: [
        {
          title: "Créer une facture en ligne à Madagascar sans tableur",
          paragraphs: [
            "Une facture préparée dans Word ou Excel demande de recopier les coordonnées, les lignes de prestation, les totaux et la mise en page. Factumation rassemble ces éléments dans un éditeur guidé, puis génère un PDF propre à télécharger ou à envoyer au client.",
            "La création et le téléchargement d'une facture ou d'un devis ne nécessitent pas de compte. Un compte gratuit devient utile uniquement pour sauvegarder l'historique, gérer les clients et retrouver les documents. Cette séparation permet de tester l'outil immédiatement avant de décider de conserver ses données.",
          ],
        },
        {
          title: "Ariary, euro et devises utiles aux freelances malgaches",
          paragraphs: [
            "Un professionnel à Madagascar peut facturer localement en Ariary et travailler aussi avec des clients internationaux. Factumation prend en charge le MGA ainsi que plusieurs devises courantes, dont l'euro et le dollar américain, afin de produire un document cohérent avec le contrat ou le client.",
            "L'outil vise notamment les freelances, consultants, prestataires, associations et petites structures qui ont besoin d'émettre rapidement des factures et devis. Les informations fiscales et mentions utilisées restent sous la responsabilité de l'émetteur : Factumation facilite la création du document, mais ne remplace pas un expert-comptable ni un conseil fiscal malgache.",
          ],
        },
        {
          title: "Factumation ou logiciel ERP de facturation ?",
          paragraphs: [
            "Factumation est pertinent lorsque le besoin principal est de créer rapidement des factures et devis, gérer quelques clients et exporter des PDF. Sa prise en main légère et son accès gratuit évitent de déployer un ERP pour un besoin encore simple.",
            "Une entreprise qui doit gérer stocks, bons de livraison, comptabilité, paie, marges détaillées ou plusieurs équipes aura plutôt besoin d'un logiciel de gestion complet. Le bon choix dépend donc du processus réel : générateur gratuit pour démarrer et facturer proprement, ERP lorsque les opérations exigent un référentiel et des contrôles plus larges.",
          ],
        },
        {
          title: "Un produit Next.js construit et mesuré en conditions réelles",
          paragraphs: [
            "Factumation est aussi une réalisation technique : interface Next.js, génération de documents, gestion des données et architecture conçue pour être reliée à des automatisations métier. Le projet démontre comment un MVP utile peut être livré rapidement sans sacrifier la lisibilité du parcours.",
            "Les données GSC du portfolio ont déjà placé cette page dans les premiers résultats sur plusieurs requêtes liées à l'invoicing. L'objectif de cet enrichissement est maintenant de répondre plus précisément aux recherches locales autour du logiciel de facturation gratuit à Madagascar, tout en donnant un accès direct au produit.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Créer une facture gratuitement avec Factumation",
          href: "https://factumation.vercel.app/fr",
          description:
            "Ouvrir le générateur en ligne pour créer une facture ou un devis et l'exporter en PDF.",
        },
        {
          label: "Développeur Next.js et Supabase freelance",
          href: "/services/developpeur-nextjs-supabase-madagascar",
          description:
            "Conception de SaaS, applications métier et tableaux de bord avec une stack web moderne.",
        },
        {
          label: "Automatisation n8n à Madagascar",
          href: "/services/automatisation-n8n-madagascar",
          description:
            "Relier facturation, email, CRM et relances avec des workflows contrôlés et documentés.",
        },
        {
          label: "Développement d'applications métier",
          href: "/services/developpement-sites-saas",
          description:
            "Transformer un processus manuel en application web claire, maintenable et mesurable.",
        },
      ],
      faq: [
        {
          question: "Quel logiciel de facturation gratuit utiliser à Madagascar ?",
          answer:
            "Factumation convient aux freelances et petites structures qui veulent créer gratuitement des factures et devis en ligne, utiliser l'Ariary et exporter un PDF. Pour la comptabilité complète, la gestion de stock ou la paie, il faut plutôt choisir un ERP adapté à la législation et au fonctionnement de l'entreprise.",
        },
        {
          question: "Peut-on créer une facture sans inscription ?",
          answer:
            "Oui. La création et le téléchargement d'une facture ou d'un devis peuvent se faire sans compte. Un compte gratuit est seulement nécessaire pour sauvegarder l'historique, gérer les clients et utiliser les fonctions liées à l'envoi.",
        },
        {
          question: "Factumation prend-il en charge l'Ariary malgache ?",
          answer:
            "Oui. L'Ariary malgache (MGA) fait partie des devises proposées, avec l'euro, le dollar américain et plusieurs autres devises utiles aux professionnels qui travaillent à l'international.",
        },
        {
          question: "Factumation remplace-t-il un logiciel de comptabilité ?",
          answer:
            "Non. Factumation facilite la création, le suivi et l'export de factures et devis. Il ne remplace pas un logiciel comptable complet, un ERP ni l'accompagnement d'un professionnel pour les obligations fiscales et comptables.",
        },
        {
          question: "Le logiciel est-il vraiment gratuit ?",
          answer:
            "Oui. Factumation permet de créer des factures et devis, de les exporter en PDF et de démarrer sans carte bancaire. Les éventuels services externes connectés à une automatisation peuvent avoir leurs propres coûts.",
        },
      ],
    },
    en: {
      metaTitle: "Free Invoicing Software for Madagascar | Factumation",
      metaDescription:
        "Create free invoices and quotes online in Madagascar with Factumation: professional PDF, Malagasy Ariary, client records and no credit card.",
      kicker: "Online invoicing in Madagascar",
      title: "Free invoicing software built for Madagascar",
      summary:
        "Factumation helps freelancers, independent professionals and small businesses in Madagascar create professional invoices and quotes without installing software or entering a credit card. It runs in the browser, supports the Malagasy Ariary and exports documents as PDF. This page explains where the lightweight tool fits and when a complete accounting or ERP platform is more appropriate.",
      facts: [
        { label: "Price", value: "100% free, no credit card" },
        { label: "Documents", value: "invoices and quotes exported as PDF" },
        { label: "Local currency", value: "Malagasy Ariary (MGA)" },
        { label: "Access", value: "creation without mandatory signup" },
      ],
      sections: [
        {
          title: "Create an invoice online without a spreadsheet",
          paragraphs: [
            "Preparing invoices in Word or Excel means copying customer details, services, totals and formatting every time. Factumation brings these fields into a guided editor and generates a clean PDF ready to download or send.",
            "Creating and downloading an invoice or quote does not require an account. A free account is only needed to save history, manage customers and retrieve documents later, so the product can be tested immediately.",
          ],
        },
        {
          title: "Ariary and international currencies",
          paragraphs: [
            "Professionals in Madagascar may invoice locally in Ariary and also work with international customers. Factumation supports MGA together with common currencies such as EUR and USD, letting the document match the customer agreement.",
            "The tool is suitable for freelancers, consultants, service providers, associations and small businesses. Tax details and mandatory invoice information remain the issuer's responsibility: Factumation creates the document but does not replace an accountant or local tax advice.",
          ],
        },
        {
          title: "Factumation or a complete invoicing ERP?",
          paragraphs: [
            "Factumation fits when the main need is to create invoices and quotes quickly, keep a lightweight customer list and export professional PDFs without paying for a large system.",
            "A company that needs stock, delivery notes, payroll, full accounting, detailed margins or multi-team controls should use a complete management platform. The right choice depends on the operating process, not on the longest feature list.",
          ],
        },
        {
          title: "A real Next.js product, not a static concept",
          paragraphs: [
            "Factumation is also a technical case study covering a Next.js interface, document generation, data management and integration-ready architecture. It shows how a useful MVP can ship quickly while keeping a clear customer journey.",
            "The portfolio page already receives organic impressions and visits. This richer version now answers local invoicing intent directly and gives visitors a clear path to the working product.",
          ],
        },
      ],
      relatedLinks: [
        {
          label: "Create a free invoice with Factumation",
          href: "https://factumation.vercel.app/en",
          description: "Open the online generator to create an invoice or quote and export it as PDF.",
        },
        {
          label: "Freelance Next.js and Supabase developer",
          href: "/en/services/nextjs-supabase-developer-madagascar",
          description: "Custom SaaS products, business applications and dashboards built on a modern web stack.",
        },
        {
          label: "n8n automation consultant",
          href: "/en/services/remote-n8n-automation-consultant",
          description: "Connect invoicing, email, CRM and reminders with controlled, documented workflows.",
        },
        {
          label: "Business application development",
          href: "/en/services/sites-saas-development",
          description: "Turn a manual business process into a clear, maintainable and measurable web application.",
        },
      ],
      faq: [
        {
          question: "Which free invoicing software can I use in Madagascar?",
          answer:
            "Factumation suits freelancers and small businesses that need free online invoices and quotes, Malagasy Ariary support and PDF export. Full accounting, inventory or payroll requires a broader ERP aligned with the company's obligations.",
        },
        {
          question: "Can I create an invoice without signing up?",
          answer:
            "Yes. An invoice or quote can be created and downloaded without an account. A free account is only required to save history, manage customers and use sending-related features.",
        },
        {
          question: "Does Factumation support Malagasy Ariary?",
          answer:
            "Yes. Malagasy Ariary (MGA) is available alongside EUR, USD and several other currencies useful for professionals working internationally.",
        },
        {
          question: "Does Factumation replace accounting software?",
          answer:
            "No. Factumation helps create, track and export invoices and quotes. It does not replace complete accounting software, an ERP or professional advice for tax and accounting obligations.",
        },
        {
          question: "Is Factumation really free?",
          answer:
            "Yes. Factumation lets users create invoices and quotes, export PDFs and start without a credit card. External services connected through automation may have their own charges.",
        },
      ],
    },
  },
};

export function getProjectSeoDetails(slug: string, locale: Locale) {
  return projectSeoDetails[slug]?.[locale] ?? null;
}
