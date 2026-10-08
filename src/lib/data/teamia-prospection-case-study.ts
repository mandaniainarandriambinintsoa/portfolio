import type { Locale } from "@/i18n/config";
import type { ProjectSeoDetails } from "./project-seo-details";

export const teamiaProspectionCaseStudy: Record<Locale, ProjectSeoDetails> = {
  fr: {
    metaTitle: "Logiciel de prospection B2B sur mesure : TeamIA",
    metaDescription: "Cas client TeamIA : logiciel de prospection B2B sur mesure, qualification IA, campagnes n8n et Lemlist, déduplication et validation humaine des messages.",
    kicker: "Cas client · Application métier & automatisation",
    title: "De la recherche de prospects à une décision commerciale documentée",
    summary: "TeamIA Prospection est un logiciel de prospection B2B sur mesure qui relie la configuration des campagnes, les données préparées par n8n et Lemlist, et la revue humaine. L’équipe consulte dans une même fiche l’entreprise, le décideur, l’analyse IA et le message proposé. Elle peut modifier le texte, demander une correction, valider ou refuser le prospect. La validation enregistre une décision : elle ne déclenche pas l’envoi d’un email.",
    facts: [
      { label: "Livrable", value: "Cockpit de prospection et API métier" },
      { label: "Stack", value: "Next.js · React · PostgreSQL/Supabase · n8n · Lemlist" },
      { label: "Parcours de revue", value: "5 statuts, de l’enrichissement au refus ou à la validation" },
      { label: "Périmètre initial", value: "Campagnes segmentées pour Paris et le Luxembourg" },
    ],
    gallery: [
      {
        src: "/images/projects/teamia-prospection-validation.webp",
        alt: "Fiche TeamIA Prospection avec message modifiable et actions Refuser, À corriger et Valider, sur des données fictives",
        caption: "Interface réelle, données entièrement fictives. Le message reste modifiable avant la décision humaine ; les compteurs de cette démonstration ne sont pas des résultats commerciaux.",
        width: 992,
        height: 625,
      },
    ],
    sections: [
      {
        title: "Le besoin : piloter plusieurs campagnes sans perdre le contexte",
        paragraphs: [
          "Le besoin de TeamIA ne se limitait pas à récupérer une liste de contacts. Chaque campagne devait porter une offre, des critères de ciblage, des fonctions de décideurs, des exclusions et des instructions de message. Une fois les données enrichies, il fallait encore comprendre pourquoi contacter cette entreprise et décider si le message était exploitable.",
          "J’ai conçu une application métier qui rassemble ces étapes. Le travail livré comprend l’interface de revue, la configuration des campagnes et segments, les API de réception des prospects, la persistance des décisions et le raccordement au moteur n8n. Le cockpit donne à l’équipe une file de travail consultable, au lieu de lui demander de suivre les exécutions techniques une par une.",
        ],
      },
      {
        title: "Un logiciel de prospection B2B adapté aux règles de l’équipe",
        paragraphs: [
          "Une campagne peut être en brouillon, active ou en pause. Elle contient l’offre à présenter, les problèmes métiers ciblés, les intitulés de poste recherchés ou exclus et les consignes de personnalisation. Les segments précisent notamment le pays, la localisation, les secteurs, la taille des entreprises et leur quota. Ces paramètres alimentent le workflow plutôt que de rester dispersés dans ses nœuds.",
          "La version examinée impose un plafond de dix prospects par jour sur le total des campagnes actives. C’est une limite de fonctionnement du périmètre initial, pas une mesure de performance. Les segments et la pagination permettent de poursuivre la recherche de façon organisée ; la montée en charge doit ensuite être dimensionnée selon les quotas fournisseurs et la capacité de revue de l’équipe.",
        ],
      },
      {
        title: "Qualification des leads par IA : rendre le raisonnement consultable",
        paragraphs: [
          "La fiche prospect sépare quatre vues : décideur, entreprise, analyse IA et message. Elle regroupe le score d’entreprise, les informations de contact, le statut de l’email, les technologies renseignées, une synthèse de recherche et le potentiel d’automatisation identifié. Les filtres par campagne, marché et statut aident à retrouver les dossiers à traiter.",
          "Le signal commercial dispose de champs pour sa source et sa date. L’utilisateur peut donc consulter l’élément qui motive l’approche et vérifier sa pertinence avant d’écrire. Le score sert à ordonner la revue ; il n’est pas présenté comme une probabilité de conversion. Une synthèse IA ou un email marqué comme vérifié demande toujours une utilisation adaptée au contexte de prospection.",
        ],
      },
      {
        title: "Comment Next.js, n8n, Lemlist et Supabase travaillent ensemble",
        paragraphs: [
          "Next.js et React portent le cockpit et les routes API. PostgreSQL sur Supabase conserve les campagnes, les segments, les entreprises déjà traitées et les prospects. n8n lit les segments actifs, orchestre la recherche et prépare les données. Lemlist fournit les fonctions de recherche et d’enrichissement utilisées par cette chaîne.",
          "Une API d’ingestion reçoit les résultats normalisés. Les entrées sont validées côté serveur avant leur enregistrement, et une clé de déduplication permet de rattacher les retours au même prospect. Les accès navigateur et les échanges avec l’automatisation utilisent des mécanismes d’authentification distincts. Les secrets d’intégration et la connexion PostgreSQL restent côté serveur.",
        ],
      },
      {
        title: "Éviter les doublons avant de consommer de nouveaux enrichissements",
        paragraphs: [
          "La déduplication commence au niveau de l’entreprise. Le système construit une clé à partir du domaine normalisé, ou d’un identifiant disponible, puis réserve les entreprises retenues en base. Une contrainte d’unicité et une insertion qui ignore les conflits écartent les comptes déjà traités avant la recherche de nouveaux décideurs.",
          "Cette réservation et la progression de pagination sont enregistrées dans une transaction. L’ingestion possède aussi sa propre clé pour les prospects. Ces deux niveaux répondent à des problèmes différents : éviter de retraiter une entreprise et rattacher correctement les données d’un contact. Ils rendent les reprises plus contrôlables, sans promettre que toute défaillance d’un fournisseur est automatiquement résolue.",
        ],
      },
      {
        title: "La validation humaine fait partie du produit",
        paragraphs: [
          "Les dossiers passent par des statuts explicites : enrichissement en attente, à relire, validé, correction demandée ou refusé. Le sujet et le corps du message sont éditables ; un commentaire accompagne la revue. Les boutons de décision enregistrent le statut, le texte et la remarque dans la fiche.",
          "Dans le périmètre présenté, valider ne signifie pas envoyer. Le cockpit ne contient pas d’action d’expédition des emails de prospection. Un éventuel raccordement à un outil d’envoi constitue une étape supplémentaire, à définir avec ses exclusions, ses limites de fréquence et ses conditions de validation.",
        ],
      },
      {
        title: "Ce qui a été livré et ce qu’il reste à mesurer",
        paragraphs: [
          "Le résultat concret est une interface qui relie le paramétrage des campagnes à la revue des prospects, avec des états persistants et un accès aux informations utiles à la décision. Les captures présentent cette interface avec des entreprises, contacts et messages fictifs. Aucun fichier de prospects ni accès au cockpit privé n’est publié dans cette étude de cas.",
          "Je ne dispose pas ici de mesures vérifiées sur le temps gagné, les rendez-vous obtenus ou le chiffre d’affaires attribuable au projet. Pour évaluer son impact, les indicateurs à suivre sont le taux de doublons écartés, le coût d’enrichissement par dossier exploitable, le temps de revue et la proportion de messages corrigés ou validés. Les résultats commerciaux nécessitent un suivi distinct après prise de contact.",
        ],
      },
      {
        title: "Construire votre propre outil de prospection commerciale",
        paragraphs: [
          "Cette approche convient aux agences B2B et équipes commerciales qui ont des critères de ciblage précis, plusieurs offres et un besoin de contrôle sur les messages préparés par l’IA. Le cadrage commence par les sources de données autorisées, les règles de qualification, les outils existants et la personne responsable de la revue.",
          "Une première version peut couvrir une campagne, un parcours d’enrichissement et une file de validation. Les volumes, droits d’accès, intégrations CRM et éventuels envois sont ensuite définis selon les contraintes réelles. Pour discuter d’un logiciel de prospection sur mesure, le plus utile est de partir d’une campagne concrète et de son processus actuel.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Le workflow n8n et Lemlist", href: "/projects/automatisation-prospection-n8n-lemlist", description: "Voir le moteur de sourcing et d’enrichissement complémentaire au cockpit." },
      { label: "La plateforme TeamIA", href: "/projects/teamia", description: "Découvrir le site métier et l’écosystème du client." },
      { label: "Développement d’applications sur mesure", href: "/services/developpement-sites-saas", description: "Relier vos règles métier à une interface et à des intégrations adaptées." },
      { label: "Cadrer votre outil de prospection", href: "/contact", description: "Définissons vos sources, votre ciblage et votre parcours de validation." },
    ],
    faq: [
      { question: "Qu’est-ce qu’un logiciel de prospection B2B sur mesure ?", answer: "C’est une application construite autour des règles de ciblage, des sources et du processus commercial d’une équipe. Pour TeamIA, elle relie les campagnes, l’enrichissement n8n/Lemlist et la validation humaine dans un même cockpit." },
      { question: "Quelle différence avec un CRM ou Lemlist seul ?", answer: "Le cockpit organise des règles et une revue propres à TeamIA. Lemlist intervient dans la recherche et l’enrichissement. Cette application ne remplace pas un CRM complet : elle traite la préparation et la validation des prospects en amont du suivi commercial." },
      { question: "Comment l’IA aide-t-elle à qualifier les leads ?", answer: "La chaîne prépare une synthèse, un signal commercial, un potentiel d’automatisation et un brouillon de message. Le cockpit expose ces éléments avec leur contexte pour permettre une relecture. Leur présence ne garantit ni leur exactitude ni une conversion." },
      { question: "Les messages sont-ils envoyés automatiquement ?", answer: "Non. Les actions de validation sauvegardent une décision et les modifications du message. L’envoi automatique ne fait pas partie du cockpit présenté." },
      { question: "Peut-on consulter une démonstration publique ?", answer: "Cette page montre l’interface réelle avec des données fictives. Le cockpit et les données de prospection du client restent privés. Une démonstration encadrée peut être discutée lors du cadrage d’un projet similaire." },
    ],
  },
  en: {
    metaTitle: "Custom B2B prospecting software: TeamIA case study",
    metaDescription: "TeamIA case study: custom B2B prospecting software with AI qualification, n8n and Lemlist integrations, deduplication and human review of outreach drafts.",
    kicker: "Client case study · Business application & automation",
    title: "From prospect research to a documented sales decision",
    summary: "TeamIA Prospection is a custom B2B prospecting application connecting campaign settings, data prepared by n8n and Lemlist, and human review. The team can inspect the company, decision maker, AI research and proposed message in one workspace. Reviewers can edit the draft, request changes, approve or reject the prospect. Approval records a decision; it does not send an email.",
    facts: [
      { label: "Deliverable", value: "Prospecting dashboard and business API" },
      { label: "Stack", value: "Next.js · React · PostgreSQL/Supabase · n8n · Lemlist" },
      { label: "Review process", value: "5 statuses, from enrichment to approval or rejection" },
      { label: "Initial scope", value: "Segmented campaigns for Paris and Luxembourg" },
    ],
    gallery: [
      { src: "/images/projects/teamia-prospection-validation.webp", alt: "TeamIA prospect review with an editable message and Reject, Request changes and Approve actions, using fictional data", caption: "Actual interface, entirely fictional data. Reviewers edit the message before making a decision. Demo counters are not commercial results.", width: 992, height: 625 },
    ],
    sections: [
      { title: "The requirement: manage multiple campaigns without losing context", paragraphs: [
        "TeamIA needed more than a contact list. Each campaign had its own offer, targeting rules, decision-maker roles, exclusions and messaging instructions. Once enrichment completed, a reviewer still needed to understand why the company was relevant and whether the proposed message was usable.",
        "I built the review interface, campaign and segment configuration, prospect ingestion APIs and persistence of review decisions, connected to the n8n engine. The resulting workspace gives the team an actionable queue without requiring it to inspect individual automation executions.",
      ] },
      { title: "Campaign settings built around the team's prospecting rules", paragraphs: [
        "Campaigns can be draft, active or paused. Their settings include the offer, target pain points, included and excluded job titles, and message instructions. Segments specify country, location, industries, company size and quotas. These settings feed the workflow instead of remaining scattered across automation nodes.",
        "The inspected implementation caps active campaigns at ten prospects per day in total. This is an operating limit for the initial scope, not a throughput benchmark. Segment pagination supports continued research; future scaling must account for provider quotas and the team's review capacity.",
      ] },
      { title: "AI lead qualification that a reviewer can inspect", paragraphs: [
        "Each prospect has four views: contact, company, AI analysis and message. They bring together the company score, contact information, email status, recorded technologies, research summary and suggested automation opportunity. Filters narrow the queue by campaign, market and review status.",
        "Research signals have source URL and date fields, giving reviewers context for checking the proposed approach. The score prioritizes review; it is not a predicted conversion rate. AI summaries and verification labels still require judgment before the information is used for outreach.",
      ] },
      { title: "Connecting Next.js, n8n, Lemlist and Supabase", paragraphs: [
        "Next.js and React provide the dashboard and API routes. PostgreSQL on Supabase stores campaigns, segments, processed companies and prospects. n8n reads active segments and orchestrates research and preparation; Lemlist supplies the company search and enrichment capabilities used by that pipeline.",
        "An ingestion API accepts normalized results, validates inputs on the server and links returning data through a prospect deduplication key. Browser access and automation requests use separate authentication mechanisms. Integration secrets and the PostgreSQL connection remain server-side.",
      ] },
      { title: "Deduplicating companies before further enrichment", paragraphs: [
        "The system derives a company key from its normalized domain or an available identifier. It reserves selected companies in the database, where a uniqueness constraint and conflict-safe insert exclude previously processed accounts before new decision-maker research.",
        "Company reservation and pagination progress are committed together in a transaction. Prospect ingestion has its own deduplication key. These boundaries address separate needs: avoiding repeated company research and attaching enrichment to the right contact. They make recovery more controlled without implying every provider failure is automatically resolved.",
      ] },
      { title: "Human approval is a product feature", paragraphs: [
        "Prospects have explicit states: awaiting enrichment, to review, approved, changes requested or rejected. Reviewers can edit the subject and message body and leave a comment. A review action persists the status, draft and comment to the prospect record.",
        "Approval does not mean delivery. The presented dashboard contains no prospect-email sending action. Connecting an outbound tool would be a separate scope, with suppression rules, frequency limits and explicit approval conditions.",
      ] },
      { title: "Delivered functionality and measurement boundaries", paragraphs: [
        "The deliverable connects campaign configuration to prospect review, with persistent decisions and accessible supporting information. Screenshots show the real interface populated exclusively with fictional companies, contacts and messages. Neither a client prospect list nor access to the private dashboard is published here.",
        "No verified time savings, meeting counts or attributed revenue are claimed. Useful operational measures would include excluded duplicates, enrichment cost per usable record, review time and the proportion of corrected or approved drafts. Commercial outcomes require separate tracking after outreach.",
      ] },
      { title: "Planning a custom prospecting application", paragraphs: [
        "This approach suits B2B agencies and sales teams with specific targeting criteria, multiple offers and a need to review AI-prepared messages. Discovery starts with permitted data sources, qualification rules, existing tools and ownership of the review process.",
        "An initial version can cover one campaign, one enrichment path and a review queue. Volumes, access rights, CRM integrations and any sending functionality should then be scoped against real constraints. A concrete campaign and its current process provide a useful starting point for a custom prospecting project.",
      ] },
    ],
    relatedLinks: [
      { label: "The n8n and Lemlist workflow", href: "/en/projects/automatisation-prospection-n8n-lemlist", description: "Explore the sourcing and enrichment engine behind the dashboard." },
      { label: "The TeamIA platform", href: "/en/projects/teamia", description: "See the client's business website and wider ecosystem." },
      { label: "Custom application development", href: "/en/services/developpement-sites-saas", description: "Connect your business rules to an interface and relevant integrations." },
      { label: "Scope your prospecting tool", href: "/en/contact", description: "Define data sources, targeting criteria and your review process." },
    ],
    faq: [
      { question: "What is custom B2B prospecting software?", answer: "It is an application built around a team's targeting rules, data sources and sales process. For TeamIA, it connects campaign settings, n8n/Lemlist enrichment and human review in one dashboard." },
      { question: "How is it different from a CRM or Lemlist alone?", answer: "The dashboard implements TeamIA-specific configuration and review rules. Lemlist supports search and enrichment. The application does not replace a complete CRM: its scope is preparing and approving prospects before downstream sales follow-up." },
      { question: "How does AI help qualify leads?", answer: "The pipeline prepares research, a business signal, an automation opportunity and a message draft. The dashboard makes this information available for review. Its presence is not a guarantee of accuracy or conversion." },
      { question: "Are messages sent automatically?", answer: "No. Review actions save a decision and message edits. Automatic sending is outside the scope of the presented dashboard." },
      { question: "Is a public demo available?", answer: "This page shows the real interface with fictional data. The client dashboard and prospect data remain private. A guided demonstration can be discussed when scoping a similar project." },
    ],
  },
};
