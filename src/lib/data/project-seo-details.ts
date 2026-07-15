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
      metaTitle: "PaidMada Mobile Money - Orange Money, MVola, Airtel",
      metaDescription:
        "PaidMada Mobile Money project: Madagascar payment architecture with Orange Money, MVola, Airtel Money, callbacks, statuses and reconciliation.",
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
      metaTitle: "Facebook Agent IA - Qualification leads et dashboard",
      metaDescription:
        "Projet Facebook Agent IA : qualification de conversations Facebook, scoring de leads, synthèse, dashboard et actions commerciales contrôlées.",
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
          label: "Solution Agent IA prospection",
          href: "/solutions/agent-ia-prospection",
          description:
            "Méthode pour qualifier les leads, scorer l'ICP et synchroniser le CRM avec n8n.",
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
      metaTitle: "Facebook AI Agent - Lead qualification and dashboard",
      metaDescription:
        "Facebook AI Agent project: Facebook conversation qualification, lead scoring, summaries, dashboard and controlled sales actions.",
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
          label: "AI Prospecting Agent solution",
          href: "/en/solutions/ai-prospecting-agent",
          description:
            "Method for lead qualification, ICP scoring and CRM synchronization with n8n.",
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
};

export function getProjectSeoDetails(slug: string, locale: Locale) {
  return projectSeoDetails[slug]?.[locale] ?? null;
}
