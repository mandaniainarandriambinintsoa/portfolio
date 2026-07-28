import type { Locale } from "@/i18n/config";

export const SOLUTION_LAST_UPDATED = "2026-07-27";

export type SolutionAccent = "indigo" | "emerald" | "blue" | "purple";

export type SolutionLink = {
  label: string;
  href: string;
  description: string;
};

export type SolutionPoint = {
  title: string;
  description: string;
};

export type SolutionFaq = {
  question: string;
  answer: string;
};

export type Solution = {
  slug: string;
  icon: string;
  accent: SolutionAccent;
  title: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  shortAnswer: string;
  heroLead: string;
  fit: string[];
  outcomes: SolutionPoint[];
  problem: {
    title: string;
    paragraphs: string[];
  };
  deliverables: {
    title: string;
    items: SolutionPoint[];
  };
  architecture: {
    title: string;
    intro: string;
    steps: SolutionPoint[];
  };
  safeguards: {
    title: string;
    items: SolutionPoint[];
  };
  proofs: SolutionLink[];
  sources: SolutionLink[];
  relatedServices: SolutionLink[];
  faq: SolutionFaq[];
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
  };
};

export const frSolutions: Solution[] = [
  {
    slug: "automatisation-n8n-pme",
    icon: "hub",
    accent: "emerald",
    title: "Automatisation n8n pour PME : CRM, emails, reporting et relances",
    eyebrow: "Solution n8n pour PME",
    seoTitle: "Automatisation n8n PME | Workflows CRM, emails et reporting",
    seoDescription:
      "Automatisation n8n pour PME : CRM, emails, reporting, factures et relances. Workflows fiables, documentés, avec supervision et reprise sur erreur.",
    primaryKeyword: "automatisation n8n PME",
    secondaryKeywords: [
      "automatisation workflow PME",
      "expert n8n freelance",
      "workflow n8n CRM",
      "automatisation tâches administratives",
    ],
    shortAnswer:
      "Une automatisation n8n pour PME connecte vos outils métier afin de supprimer les tâches répétitives : création de leads, emails, reporting, factures, relances et alertes. Je construis des workflows documentés, testés et supervisés, avec une logique de reprise quand une API ou un service externe échoue.",
    heroLead:
      "Le but n'est pas de faire un joli scénario dans n8n. Le but est de créer un système qui tourne tous les jours sans vous obliger à vérifier chaque étape à la main.",
    fit: [
      "Vous copiez encore des données entre formulaires, tableurs, CRM et emails.",
      "Votre équipe perd du temps sur les relances, les exports et les notifications internes.",
      "Vous voulez garder le contrôle sur vos données avec n8n Cloud ou une instance self-hosted.",
      "Vous avez besoin d'un workflow compréhensible par votre équipe, pas d'une boîte noire.",
    ],
    outcomes: [
      {
        title: "Moins de tâches manuelles",
        description:
          "Les actions répétitives passent dans n8n : tri, enrichissement, calcul, notification, génération de documents et synchronisation CRM.",
      },
      {
        title: "Meilleure visibilité",
        description:
          "Les données importantes arrivent au bon endroit : dashboard, email récapitulatif, Slack, Notion, Airtable, Supabase ou Google Sheets.",
      },
      {
        title: "Workflow maintenable",
        description:
          "Chaque scénario est nommé, documenté, découpé en étapes lisibles et livré avec les accès, les variables et le guide de reprise.",
      },
    ],
    problem: {
      title: "Le vrai problème : vos outils ne se parlent pas assez bien",
      paragraphs: [
        "La plupart des PME n'ont pas un problème de logiciel. Elles ont un problème de circulation de l'information. Un lead arrive dans un formulaire, une personne le recopie dans un CRM, une autre prépare un email, puis quelqu'un doit vérifier le paiement, mettre à jour un tableur et prévenir l'équipe.",
        "Au début, ce bricolage tient. Puis le volume augmente, les erreurs se glissent dans les copier-coller, les relances partent en retard et personne ne sait vraiment quelle donnée est la source fiable. C'est là que n8n devient utile : il sert de couche d'orchestration entre vos outils existants.",
        "Je commence par cartographier le processus réel, puis je transforme seulement les étapes répétables en workflows. Les décisions sensibles restent humaines, surtout pour les montants, les exceptions client et les validations commerciales.",
      ],
    },
    deliverables: {
      title: "Ce que je peux livrer",
      items: [
        {
          title: "Workflow CRM et leads",
          description:
            "Capture des demandes, nettoyage des champs, scoring simple, attribution commerciale et notification avec le contexte complet.",
        },
        {
          title: "Emails et relances",
          description:
            "Séquences de suivi, rappels internes, emails transactionnels, relances de paiement et messages personnalisés à partir de vos données.",
        },
        {
          title: "Reporting automatique",
          description:
            "Synthèse quotidienne ou hebdomadaire avec chiffres clés, anomalies, tâches ouvertes et liens vers les données sources.",
        },
        {
          title: "Facturation et back-office",
          description:
            "Préparation de factures, génération de documents, dépôt dans un dossier partagé et synchronisation avec votre outil comptable.",
        },
      ],
    },
    architecture: {
      title: "Architecture type",
      intro:
        "Je privilégie une architecture simple : un déclencheur clair, des étapes nommées, des données normalisées, puis une sortie contrôlée. Le workflow reste lisible même plusieurs mois après la livraison.",
      steps: [
        {
          title: "1. Déclenchement",
          description:
            "Webhook, formulaire, email entrant, cron planifié, nouveau paiement ou événement CRM.",
        },
        {
          title: "2. Normalisation",
          description:
            "Nettoyage des champs, validation minimale, déduplication et construction d'un objet métier stable.",
        },
        {
          title: "3. Décision",
          description:
            "Conditions, routage, score, appel API ou étape IA quand le traitement du texte apporte une vraie valeur.",
        },
        {
          title: "4. Action et trace",
          description:
            "Création CRM, email, document, notification, ligne de reporting et log d'exécution pour vérifier ce qui s'est passé.",
        },
      ],
    },
    safeguards: {
      title: "Garde-fous de production",
      items: [
        {
          title: "Gestion des erreurs",
          description:
            "Les workflows critiques prévoient des alertes, des chemins de reprise et des messages lisibles quand une API ne répond pas.",
        },
        {
          title: "Propriété client",
          description:
            "L'instance n8n, les credentials et les comptes connectés restent au nom du client. Je documente les accès à la livraison.",
        },
        {
          title: "Pas d'automatisation aveugle",
          description:
            "Les décisions à risque peuvent rester en validation humaine : envoi final, remise commerciale, suppression de données ou action irréversible.",
        },
      ],
    },
    proofs: [
      {
        label: "Scraping FlowRemote",
        href: "/projects/scraping-flowremote",
        description:
          "Workflow n8n qui extrait, filtre et envoie des opportunités remote sans intervention manuelle.",
      },
      {
        label: "Tracking Visiteurs",
        href: "/projects/tracking-visiteurs",
        description:
          "Pipeline Supabase + n8n pour observer les visiteurs du portfolio et déclencher des notifications utiles.",
      },
      {
        label: "Factumation",
        href: "/projects/factumation",
        description:
          "Produit de facturation construit avec Claude Code, pensé pour être relié à des automatisations back-office.",
      },
    ],
    sources: [
      {
        label: "n8n Docker self-hosting",
        href: "https://docs.n8n.io/hosting/installation/docker/",
        description:
          "Référence officielle pour déployer n8n proprement quand le client veut garder la main sur l'infrastructure.",
      },
      {
        label: "n8n Error handling",
        href: "https://docs.n8n.io/flow-logic/error-handling/",
        description:
          "Documentation officielle sur les workflows d'erreur et les stratégies de reprise.",
      },
    ],
    relatedServices: [
      {
        label: "Expert automatisation n8n à Madagascar",
        href: "/services/automatisation-n8n-madagascar",
        description:
          "La page service générale pour les workflows n8n, scraping, API et agents IA.",
      },
      {
        label: "Développeur Node.js à Madagascar",
        href: "/services/developpeur-nodejs-madagascar",
        description:
          "Pour les workflows qui doivent appeler une API custom, un backend ou une base Supabase.",
      },
    ],
    faq: [
      {
        question: "Combien de temps faut-il pour automatiser un processus PME avec n8n ?",
        answer:
          "Un workflow simple prend souvent 3 à 5 jours ouvrés. Un système avec plusieurs outils, des conditions, un dashboard et une gestion d'erreur demande plutôt 1 à 3 semaines selon les accès disponibles et la qualité des données.",
      },
      {
        question: "Est-ce que n8n remplace mon CRM ou mon logiciel métier ?",
        answer:
          "Non. n8n sert surtout à connecter vos outils et à automatiser les passages d'information. Le CRM, la facturation ou la base client restent vos sources métier.",
      },
      {
        question: "Peut-on héberger n8n sur notre propre serveur ?",
        answer:
          "Oui. n8n peut tourner sur un VPS avec Docker. Je peux aussi travailler avec n8n Cloud si vous préférez limiter la maintenance serveur.",
      },
    ],
    cta: {
      title: "Vous avez un processus répétitif à automatiser ?",
      description:
        "Envoyez-moi le parcours actuel : outils utilisés, étapes manuelles, volumes et erreurs fréquentes. Je vous dirai ce qui mérite vraiment d'être automatisé.",
      buttonLabel: "Auditer mon workflow",
    },
  },
  {
    slug: "agent-ia-support-client",
    icon: "support_agent",
    accent: "indigo",
    title: "Agent IA support client : FAQ, tri des demandes et escalade humaine",
    eyebrow: "Solution agent IA",
    seoTitle: "Agent IA support client | FAQ, tickets et escalade humaine",
    seoDescription:
      "Agent IA support client pour PME : réponses FAQ, tri automatique des demandes, qualification des tickets, escalade humaine et intégration n8n/CRM.",
    primaryKeyword: "agent IA support client",
    secondaryKeywords: [
      "agent IA service client",
      "automatisation support client IA",
      "chatbot IA support",
      "tri tickets IA",
    ],
    shortAnswer:
      "Un agent IA support client répond aux questions simples, classe les demandes, prépare les réponses et transmet les cas sensibles à un humain. Je le construis avec une base de connaissance claire, des règles d'escalade, des logs et une intégration avec vos outils support ou CRM.",
    heroLead:
      "Le bon agent IA ne remplace pas l'équipe support. Il enlève le bruit, prépare le contexte et laisse les humains traiter les décisions importantes.",
    fit: [
      "Votre boîte mail support reçoit les mêmes questions chaque semaine.",
      "Les demandes arrivent par email, WhatsApp, formulaire ou chat et se mélangent.",
      "Vous voulez répondre plus vite sans laisser une IA improviser sur des sujets sensibles.",
      "Vous avez besoin d'un agent connecté à vos outils, pas juste d'une bulle de chat isolée.",
    ],
    outcomes: [
      {
        title: "Réponses plus rapides",
        description:
          "L'agent traite les questions fréquentes et prépare les réponses pour les demandes qui demandent validation.",
      },
      {
        title: "Tickets mieux qualifiés",
        description:
          "Chaque demande peut recevoir une catégorie, une priorité, un résumé, des pièces jointes et un destinataire.",
      },
      {
        title: "Escalade contrôlée",
        description:
          "Les cas sensibles, les réclamations, les remboursements et les décisions commerciales restent côté humain.",
      },
    ],
    problem: {
      title: "Le risque n'est pas l'IA. Le risque, c'est l'IA sans cadre",
      paragraphs: [
        "Beaucoup de projets support échouent parce qu'ils commencent par le modèle IA au lieu de commencer par le parcours client. Un agent utile doit savoir ce qu'il peut répondre, ce qu'il doit demander, ce qu'il doit refuser et quand il doit transférer.",
        "Je construis d'abord la base de connaissance : offres, tarifs, délais, politique de remboursement, zones de service, questions fréquentes et cas interdits. Ensuite seulement, je branche l'agent à vos canaux et à vos outils.",
        "L'objectif est une expérience lisible : le client reçoit une réponse claire, l'équipe support garde la trace, et l'entreprise peut corriger les réponses si une information change.",
      ],
    },
    deliverables: {
      title: "Ce que l'agent peut prendre en charge",
      items: [
        {
          title: "FAQ dynamique",
          description:
            "Réponses aux questions répétitives avec sources internes, ton de marque et limites explicites.",
        },
        {
          title: "Tri et résumé de tickets",
          description:
            "Catégorisation, résumé en quelques lignes, estimation de priorité et extraction des informations utiles.",
        },
        {
          title: "Pré-réponse avec validation",
          description:
            "L'IA propose une réponse, mais l'humain garde le bouton final quand le sujet touche au paiement ou à la relation client.",
        },
        {
          title: "Intégration workflow",
          description:
            "Connexion avec email, CRM, Notion, Airtable, Supabase, Slack, n8n ou un outil ticketing existant.",
        },
      ],
    },
    architecture: {
      title: "Architecture type",
      intro:
        "Je sépare le cerveau, la mémoire et les actions. Cela évite l'agent magique impossible à maintenir.",
      steps: [
        {
          title: "1. Base de connaissance",
          description:
            "Pages produit, documents internes, FAQ, règles commerciales, messages types et informations à ne jamais inventer.",
        },
        {
          title: "2. Classification",
          description:
            "L'agent détecte le sujet, l'urgence, la langue, les données manquantes et le niveau de risque.",
        },
        {
          title: "3. Réponse ou escalade",
          description:
            "Réponse automatique sur les cas simples, brouillon à valider ou transfert direct vers un humain.",
        },
        {
          title: "4. Journalisation",
          description:
            "Chaque échange utile est stocké avec catégorie, score de confiance et action déclenchée.",
        },
      ],
    },
    safeguards: {
      title: "Garde-fous indispensables",
      items: [
        {
          title: "Règles de non-réponse",
          description:
            "L'agent doit savoir dire qu'il ne sait pas, demander une précision ou transférer.",
        },
        {
          title: "Validation humaine",
          description:
            "Les remboursements, litiges, gestes commerciaux et données sensibles peuvent exiger une validation.",
        },
        {
          title: "Logs et amélioration",
          description:
            "Les conversations servent à améliorer la FAQ, corriger les réponses et détecter les sujets mal couverts.",
        },
      ],
    },
    proofs: [
      {
        label: "Développeur d'agents IA à Madagascar",
        href: "/services/developpeur-agent-ia-madagascar",
        description:
          "Mon service dédié aux agents IA intégrés à un produit, un CRM ou un workflow métier.",
      },
      {
        label: "Expert automatisation n8n",
        href: "/services/automatisation-n8n-madagascar",
        description:
          "Pour connecter l'agent aux emails, formulaires, tickets, bases de données et notifications.",
      },
      {
        label: "Agent vocal IA",
        href: "/services/developpeur-agent-vocal-ia",
        description:
          "Même logique appliquée à la voix : qualification, réponses cadrées et transfert humain.",
      },
    ],
    sources: [
      {
        label: "n8n AI agents",
        href: "https://n8n.io/ai-agents/",
        description:
          "Présentation officielle de l'approche agent IA dans des workflows avec outils, mémoire et objectifs.",
      },
      {
        label: "Google helpful content",
        href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        description:
          "Référence utilisée pour rédiger des réponses utiles, spécifiques et vérifiables.",
      },
    ],
    relatedServices: [
      {
        label: "Développeur d'agents IA",
        href: "/services/developpeur-agent-ia-madagascar",
        description:
          "Conception d'agents IA connectés à vos outils métier et à vos bases de connaissance.",
      },
      {
        label: "Intégration IA & Prompt Engineering",
        href: "/services/integration-ia",
        description:
          "Intégration Claude, GPT et prompts structurés dans une application ou un workflow.",
      },
    ],
    faq: [
      {
        question: "Un agent IA support peut-il répondre automatiquement aux clients ?",
        answer:
          "Oui, mais seulement sur les sujets cadrés. Je recommande souvent une réponse automatique pour la FAQ simple et une validation humaine pour les sujets commerciaux, juridiques, financiers ou sensibles.",
      },
      {
        question: "Faut-il déjà avoir une base de connaissance ?",
        answer:
          "C'est préférable, mais pas obligatoire. On peut partir de vos emails, documents, pages web et réponses répétitives pour construire une première base propre.",
      },
      {
        question: "L'agent peut-il fonctionner avec WhatsApp ou email ?",
        answer:
          "Oui, selon les accès disponibles. Le plus important est de définir le canal prioritaire, les règles de réponse et le système où les échanges seront historisés.",
      },
    ],
    cta: {
      title: "Votre support reçoit trop de demandes répétitives ?",
      description:
        "On peut commencer par 20 questions fréquentes, un canal support et une règle claire : ce que l'agent traite, ce qu'il prépare, ce qu'il transfère.",
      buttonLabel: "Concevoir mon agent support",
    },
  },
  {
    slug: "api-mobile-money-madagascar",
    icon: "payments",
    accent: "blue",
    title: "API Mobile Money Madagascar : Orange Money, MVola, Airtel et dashboard",
    eyebrow: "Solution paiement local",
    seoTitle: "API Orange Money Madagascar | MVola & Airtel Money",
    seoDescription:
      "Intégrez Orange Money, MVola et Airtel Money dans une application à Madagascar : API Mobile Money, callbacks sécurisés, rapprochement, dashboard et mode test.",
    primaryKeyword: "API mobile money Madagascar",
    secondaryKeywords: [
      "API Orange Money Madagascar",
      "API MVola Madagascar",
      "API Airtel Money Madagascar",
      "paiement mobile money application",
      "webhook paiement mobile money",
      "intégration paiement Madagascar",
    ],
    shortAnswer:
      "Une API Mobile Money Madagascar connecte une application à Orange Money, MVola ou Airtel Money pour créer, suivre et rapprocher des paiements. L'intégration utile ne se limite pas à l'appel fournisseur : elle doit créer une intention de paiement, recevoir un webhook sécurisé, vérifier le statut côté serveur, relier la transaction à une commande et afficher un historique clair dans un dashboard. Je construis ce flux avec backend Node.js ou Next.js, mode test/mock, idempotence et traces exploitables par l'équipe.",
    heroLead:
      "Le paiement local est rarement juste un bouton. Il faut gérer le statut, le callback, l'échec, la preuve côté client et le rapprochement côté back-office.",
    fit: [
      "Vous lancez un SaaS, marketplace, portail de réservation ou back-office à Madagascar.",
      "Vous voulez accepter Mobile Money sans perdre les statuts de transaction.",
      "Vous avez besoin d'un dashboard pour vérifier les paiements, remboursements ou commandes.",
      "Vous voulez relier paiement, facture, email, WhatsApp ou validation manuelle.",
    ],
    outcomes: [
      {
        title: "Paiements mieux tracés",
        description:
          "Chaque tentative a un identifiant, un statut, une référence métier et une trace dans le dashboard.",
      },
      {
        title: "Moins de litiges",
        description:
          "Le client voit une confirmation claire et l'équipe peut retrouver la transaction sans fouiller plusieurs outils.",
      },
      {
        title: "Back-office utilisable",
        description:
          "Les paiements sont reliés aux commandes, réservations, abonnements ou factures.",
      },
    ],
    problem: {
      title: "Le point fragile : le paiement doit parler au métier",
      paragraphs: [
        "Une intégration Orange Money, MVola ou Airtel Money doit associer chaque transaction à une commande, un client, un montant et un statut serveur. Si le callback arrive en retard, arrive deux fois ou contient un statut inconnu, le backend doit rester idempotent et garder une trace lisible pour l'équipe.",
        "À Madagascar, les opérateurs Mobile Money n'ont pas toujours les mêmes parcours, paramètres API, accès sandbox ou libellés de statut. Un backend fiable isole chaque fournisseur dans un adaptateur, puis expose un modèle commun à l'application : paiement créé, en attente, validé, échoué, expiré ou à vérifier.",
        "Je construis l'intégration comme une brique produit : backend Node.js ou Next.js, table de transactions, vérification de signature ou secret webhook, dashboard de suivi, notifications et documentation pour l'équipe qui opère les paiements au quotidien.",
      ],
    },
    deliverables: {
      title: "Ce que je peux intégrer",
      items: [
        {
          title: "Backend de paiement",
          description:
            "Création d'intentions de paiement, stockage des références fournisseur, appels API Orange Money/MVola/Airtel et gestion des statuts serveur.",
        },
        {
          title: "Callbacks et webhooks",
          description:
            "Endpoint sécurisé pour recevoir les confirmations, vérifier les données, rejouer sans double validation et mettre à jour la commande.",
        },
        {
          title: "Mode test et mock fournisseur",
          description:
            "Simulation de paiements réussis, échoués, expirés ou ambigus pour tester l'application avant accès complet aux APIs opérateur.",
        },
        {
          title: "Dashboard admin",
          description:
            "Vue des paiements par statut, recherche par client, commande, numéro ou référence fournisseur, et export si nécessaire.",
        },
        {
          title: "Notifications",
          description:
            "Confirmation client, alerte équipe, email transactionnel ou workflow n8n quand une action humaine est nécessaire.",
        },
      ],
    },
    architecture: {
      title: "Architecture type",
      intro:
        "La bonne architecture sépare l'expérience client, le backend de paiement, les adaptateurs fournisseur et le back-office. Cela évite qu'une transaction soit validée seulement parce que le front l'affiche.",
      steps: [
        {
          title: "1. Intention de paiement",
          description:
            "L'application crée une transaction interne avec montant, devise, client, commande et fournisseur visé.",
        },
        {
          title: "2. Routage fournisseur",
          description:
            "Le backend choisit Orange Money, MVola ou Airtel Money, appelle l'API avec les paramètres attendus et stocke la réponse brute utile.",
        },
        {
          title: "3. Callback sécurisé",
          description:
            "Le fournisseur notifie le backend. Le statut est vérifié, puis la commande est mise à jour côté serveur.",
        },
        {
          title: "4. Rapprochement",
          description:
            "Le dashboard permet de retrouver les paiements réussis, échoués, expirés ou à vérifier manuellement, puis de les relier à la commande ou facture.",
        },
      ],
    },
    safeguards: {
      title: "Garde-fous importants",
      items: [
        {
          title: "Idempotence",
          description:
            "Un callback reçu deux fois ne doit pas créer deux validations ou deux livraisons.",
        },
        {
          title: "Signature et secret webhook",
          description:
            "Le callback Mobile Money doit être vérifié côté serveur pour éviter les confirmations inventées ou modifiées par le client.",
        },
        {
          title: "Validation serveur",
          description:
            "Le frontend ne décide jamais seul qu'un paiement est réussi. La base est mise à jour côté serveur.",
        },
        {
          title: "Traçabilité",
          description:
            "Chaque statut garde une trace : date, fournisseur, référence, payload utile et action déclenchée.",
        },
      ],
    },
    proofs: [
      {
        label: "PaidMada Mobile Money",
        href: "/projects/paidmada-mobile-money",
        description:
          "Projet orienté paiement Mobile Money Madagascar : MVola, Orange Money et Airtel Money.",
      },
      {
        label: "Développeur Node.js à Madagascar",
        href: "/services/developpeur-nodejs-madagascar",
        description:
          "Backend API, webhooks, sécurité, temps réel et intégrations fournisseur.",
      },
      {
        label: "Développeur Next.js + Supabase",
        href: "/services/developpeur-nextjs-supabase-madagascar",
        description:
          "Pour l'application complète : auth, dashboard, base de données et admin.",
      },
    ],
    sources: [
      {
        label: "Orange Money Web Payment",
        href: "https://developer.orange.com/apis/om-webpay",
        description:
          "API officielle Orange Money Web Payment, avec Madagascar dans les pays supportés.",
      },
      {
        label: "MVola Developer Portal",
        href: "https://developer.mvola.mg/devportal/",
        description:
          "Portail développeur MVola pour consulter la documentation et les accès API.",
      },
      {
        label: "Airtel Africa Developer Portal",
        href: "https://developers.airtel.africa/developer",
        description:
          "Portail développeur Airtel pour les APIs et intégrations Mobile Money selon pays.",
      },
    ],
    relatedServices: [
      {
        label: "Développeur Node.js à Madagascar",
        href: "/services/developpeur-nodejs-madagascar",
        description:
          "API REST, webhooks, authentification, intégration fournisseur et logique backend.",
      },
      {
        label: "Développeur React & Next.js",
        href: "/services/developpeur-react-nextjs-madagascar",
        description:
          "Interface client, dashboard admin, pages de paiement et confirmation.",
      },
    ],
    faq: [
      {
        question: "Comment intégrer l'API Orange Money à Madagascar ?",
        answer:
          "Pour intégrer l'API Orange Money à Madagascar, il faut d'abord obtenir les accès fournisseur, créer une intention de paiement côté backend, stocker la référence interne, recevoir le callback Orange Money, vérifier le statut serveur et mettre à jour la commande. Le frontend ne doit afficher une confirmation définitive qu'après validation backend.",
      },
      {
        question: "Peut-on intégrer Orange Money, MVola et Airtel Money dans une même application ?",
        answer:
          "Oui. La bonne approche consiste à traiter Orange Money, MVola et Airtel Money comme trois adaptateurs fournisseur, puis à exposer un modèle commun à l'application : montant, devise, client, commande, statut, référence fournisseur et historique des callbacks.",
      },
      {
        question: "Comment sécuriser un callback Mobile Money ?",
        answer:
          "Un callback Mobile Money doit être reçu sur un endpoint serveur, vérifié avec les mécanismes fournis par l'opérateur, journalisé, puis traité de façon idempotente. Même si le même callback arrive deux fois, la commande ne doit être validée qu'une seule fois.",
      },
      {
        question: "Faut-il un dashboard admin pour les paiements Mobile Money ?",
        answer:
          "Oui, surtout pour une application métier. Le dashboard permet de chercher un paiement par client, numéro, commande ou référence fournisseur, de repérer les statuts ambigus et de rapprocher les paiements avec les factures ou réservations.",
      },
    ],
    cta: {
      title: "Vous voulez brancher Mobile Money dans votre produit ?",
      description:
        "On peut cadrer le parcours paiement, les fournisseurs visés, les statuts, le dashboard et la logique de rapprochement avant d'écrire le backend.",
      buttonLabel: "Cadrer mon intégration paiement",
    },
  },
  {
    slug: "agent-ia-facebook",
    icon: "forum",
    accent: "blue",
    title: "Agent IA Facebook pour Messenger : leads, support et CRM",
    eyebrow: "Solution Agent IA Facebook",
    seoTitle: "Agent IA Facebook | Messenger, leads, CRM et n8n",
    seoDescription:
      "Agent IA Facebook pour qualifier les messages Messenger, préparer les réponses, créer les leads dans le CRM et orchestrer le suivi avec n8n.",
    primaryKeyword: "agent IA Facebook",
    secondaryKeywords: [
      "agent IA Messenger",
      "automatisation Facebook Messenger",
      "qualification leads Facebook",
      "chatbot IA Facebook",
      "Facebook CRM n8n",
      "support client Facebook IA",
    ],
    shortAnswer:
      "Un agent IA Facebook traite les messages Messenger, commentaires ou formulaires Meta pour identifier l'intention, résumer le besoin et préparer la prochaine action. Il peut créer ou mettre à jour un lead dans le CRM, proposer un brouillon de réponse et transférer les cas sensibles à un humain. Je relie Facebook, l'IA, n8n et vos outils métier avec des règles claires, un historique vérifiable et une validation humaine là où elle compte.",
    heroLead:
      "Transformez les conversations Facebook en demandes qualifiées, sans laisser une IA répondre seule aux clients importants ou aux situations sensibles.",
    fit: [
      "Votre page Facebook reçoit des messages que l'équipe traite trop tard.",
      "Vous perdez le contexte entre Messenger, les formulaires Meta et votre CRM.",
      "Vous voulez distinguer automatiquement vente, support, spam et demande urgente.",
      "Vous souhaitez préparer des réponses rapides tout en gardant une validation humaine.",
    ],
    outcomes: [
      {
        title: "Réponses mieux priorisées",
        description:
          "Chaque conversation reçoit une intention, un niveau d'urgence et une prochaine action visible par l'équipe.",
      },
      {
        title: "Leads exploitables",
        description:
          "Nom, besoin, produit, budget, urgence et source sont structurés avant la création ou la mise à jour du CRM.",
      },
      {
        title: "Contexte conservé",
        description:
          "Le message d'origine, le résumé IA, la décision et la personne qui valide restent traçables.",
      },
    ],
    problem: {
      title: "Un agent IA Facebook utile commence par trier, pas par parler",
      paragraphs: [
        "Une boîte Messenger mélange souvent plusieurs intentions : question sur un prix, demande de rendez-vous, problème de commande, commentaire public, spam ou conversation sans objectif commercial. Répondre automatiquement à tout avec le même ton crée du risque et dégrade la confiance.",
        "La première mission de l'agent est donc de qualifier. Il détecte la langue et l'intention, extrait les informations utiles, résume la conversation et applique vos règles : réponse simple, brouillon à valider, création d'un lead, ticket support ou transfert immédiat à un humain.",
        "Cette architecture permet de gagner du temps sans cacher les limites de l'IA. Les réponses sensibles, les réclamations, les montants et les promesses commerciales restent contrôlés par l'équipe.",
      ],
    },
    deliverables: {
      title: "Ce que je peux construire",
      items: [
        {
          title: "Qualification Messenger",
          description:
            "Classification vente, support, urgence ou spam, avec résumé court et champs métier structurés.",
        },
        {
          title: "Brouillons de réponse",
          description:
            "Réponses préparées depuis vos offres, FAQ et règles de marque, puis validées avant envoi selon le scénario.",
        },
        {
          title: "Connexion CRM",
          description:
            "Création ou mise à jour du contact, source Facebook, statut, score, propriétaire et prochaine action.",
        },
        {
          title: "Dashboard de suivi",
          description:
            "Vue des conversations ouvertes, demandes chaudes, cas bloqués, temps de traitement et actions à reprendre.",
        },
      ],
    },
    architecture: {
      title: "Architecture type d'un agent IA Messenger",
      intro:
        "L'intégration sépare le canal Meta, la décision IA et l'action métier. Une panne du modèle ou du CRM ne doit jamais faire perdre le message d'origine.",
      steps: [
        {
          title: "1. Événement Meta",
          description:
            "Un webhook reçoit le message, commentaire ou lead avec son identifiant et son contexte autorisé.",
        },
        {
          title: "2. Qualification IA",
          description:
            "Le texte est classé, résumé et converti en données stables : intention, urgence, besoin et confiance.",
        },
        {
          title: "3. Règles métier",
          description:
            "n8n route la demande vers un brouillon, un CRM, un ticket, une alerte ou un humain.",
        },
        {
          title: "4. Action et trace",
          description:
            "Chaque décision, réponse et changement de statut est enregistré pour être contrôlé et amélioré.",
        },
      ],
    },
    safeguards: {
      title: "Garde-fous pour protéger la relation client",
      items: [
        {
          title: "Validation humaine",
          description:
            "Les réclamations, prix négociés, remboursements et engagements commerciaux passent par une personne.",
        },
        {
          title: "Données minimales",
          description:
            "Le workflow ne conserve que les champs utiles et respecte les accès Meta accordés à l'application.",
        },
        {
          title: "Reprise sur erreur",
          description:
            "Le message est journalisé avant les appels externes et peut être rejoué si l'IA, n8n ou le CRM échoue.",
        },
      ],
    },
    proofs: [
      {
        label: "Projet Facebook Agent IA",
        href: "/projects/facebook-agen-ia",
        description:
          "Étude de cas avec qualification des conversations, scoring, dashboard et actions commerciales contrôlées.",
      },
      {
        label: "Solution Agent IA prospection",
        href: "/solutions/agent-ia-prospection",
        description:
          "Pipeline plus large pour enrichir, scorer et suivre les leads dans le CRM.",
      },
    ],
    sources: [
      {
        label: "Meta Messenger Platform",
        href: "https://developers.facebook.com/docs/messenger-platform/",
        description:
          "Documentation officielle des intégrations Messenger, accès, messages et événements.",
      },
      {
        label: "Meta Graph API Webhooks",
        href: "https://developers.facebook.com/docs/graph-api/webhooks/",
        description:
          "Documentation officielle pour recevoir et vérifier les événements Meta côté serveur.",
      },
    ],
    relatedServices: [
      {
        label: "Développeur d'agents IA",
        href: "/services/developpeur-agent-ia-madagascar",
        description:
          "Conception d'agents reliés aux outils, données et règles de l'entreprise.",
      },
      {
        label: "Expert automatisation n8n",
        href: "/services/automatisation-n8n-madagascar",
        description:
          "Orchestration des webhooks, CRM, alertes, validations et reprises sur erreur.",
      },
    ],
    faq: [
      {
        question: "Que peut faire un agent IA Facebook ?",
        answer:
          "Il peut qualifier un message ou un commentaire, détecter l'intention, résumer le besoin, préparer une réponse, créer un lead dans le CRM et transférer les cas sensibles à un humain.",
      },
      {
        question: "Quelle différence entre un chatbot et un agent IA Facebook ?",
        answer:
          "Un chatbot suit surtout un arbre de réponses. Un agent IA peut interpréter un texte libre, utiliser du contexte et déclencher une action métier, mais il doit rester encadré par des règles et des validations.",
      },
      {
        question: "Peut-on connecter Facebook Messenger à n8n et un CRM ?",
        answer:
          "Oui, selon les accès Meta disponibles. Le webhook alimente n8n, qui peut enrichir la demande puis créer ou mettre à jour un contact dans HubSpot, Airtable, Supabase, Google Sheets ou une API interne.",
      },
      {
        question: "L'agent doit-il répondre automatiquement à tous les messages ?",
        answer:
          "Non. Le meilleur démarrage consiste à automatiser la qualification et les brouillons, puis à autoriser seulement quelques réponses simples après mesure de leur qualité.",
      },
      {
        question: "Combien coûte un agent IA Facebook connecté à n8n ?",
        answer:
          "Le coût dépend des accès Meta, du nombre d'intentions, du CRM et du niveau d'automatisation. Un premier périmètre mesurable comprend généralement une source Messenger, quelques intentions, la création CRM, des brouillons et une validation humaine.",
      },
    ],
    cta: {
      title: "Vous voulez mieux traiter vos messages Facebook ?",
      description:
        "Nous pouvons commencer par un périmètre mesurable : une source Messenger, quatre intentions, un CRM et une validation humaine avant les réponses sensibles.",
      buttonLabel: "Cadrer mon agent Facebook",
    },
  },
  {
    slug: "agent-ia-prospection",
    icon: "travel_explore",
    accent: "purple",
    title: "Agent IA prospection : qualification de leads, CRM et relances n8n",
    eyebrow: "Solution prospection IA",
    seoTitle: "Agent IA prospection | Leads, Facebook, CRM et n8n",
    seoDescription:
      "Agent IA prospection pour qualifier les leads, traiter Facebook/formulaires, scorer l'ICP, préparer des brouillons, synchroniser le CRM et relancer avec n8n.",
    primaryKeyword: "agent IA prospection",
    secondaryKeywords: [
      "automatisation prospection IA",
      "agent IA Facebook",
      "qualification leads n8n",
      "agent IA qualification leads",
      "workflow prospection commerciale",
      "agent IA CRM",
    ],
    shortAnswer:
      "Un agent IA de prospection qualifie les leads avant contact humain : il collecte la source, nettoie les données, résume l'entreprise, applique un score ICP et prépare un angle de message. Le cas utile n'est pas d'envoyer du spam automatiquement, mais de traiter proprement les formulaires, messages Facebook, exports CRM ou listes autorisées. Je le connecte à n8n, au CRM et aux règles commerciales pour produire des leads priorisés, des brouillons vérifiables et des relances contrôlées.",
    heroLead:
      "L'objectif n'est pas d'envoyer plus de messages au hasard. L'objectif est de mieux choisir qui contacter, pourquoi, avec quel angle et avec quelle trace dans le CRM.",
    fit: [
      "Vous avez des leads mais peu de contexte pour les prioriser.",
      "Votre équipe commerciale passe trop de temps à nettoyer les données.",
      "Vous voulez préparer des messages personnalisés sans perdre le contrôle de l'envoi.",
      "Vous avez besoin d'un workflow qui respecte votre ICP, vos règles et vos limites d'envoi.",
    ],
    outcomes: [
      {
        title: "Leads mieux qualifiés",
        description:
          "Chaque prospect peut recevoir un segment, un score, une raison de contact et un résumé court.",
      },
      {
        title: "CRM plus propre",
        description:
          "Les données sont normalisées avant d'entrer dans le CRM, avec déduplication et champs utiles.",
      },
      {
        title: "Prospection plus humaine",
        description:
          "L'IA prépare les angles et les brouillons, l'humain valide les messages et le timing.",
      },
    ],
    problem: {
      title: "La prospection IA doit rester une aide, pas une machine à spam",
      paragraphs: [
        "Un agent IA de prospection doit automatiser la recherche, le tri, le contexte et la préparation, pas remplacer le jugement commercial. La meilleure sortie est un lead qualifié avec une raison de contact claire, un résumé court, un score et une prochaine action.",
        "Un agent IA Facebook peut traiter les messages Messenger, commentaires ou formulaires Meta Lead Ads si l'accès API et les consentements sont cadrés. L'agent peut classer la demande, détecter l'intention, préparer une réponse ou créer une fiche CRM, mais les cas sensibles doivent rester en validation humaine.",
        "Je commence par définir l'ICP : type d'entreprise, signaux d'achat, pays, secteur, taille, outils utilisés, budget probable et raisons de rejet. Ensuite, le workflow peut chercher, enrichir, scorer et synchroniser les leads.",
        "Les parties sensibles restent cadrées : conformité des sources, fréquence d'envoi, exclusion des doublons, opt-out, validation humaine et historique CRM.",
      ],
    },
    deliverables: {
      title: "Ce que le workflow peut produire",
      items: [
        {
          title: "Collecte et enrichissement",
          description:
            "Import CSV, formulaire, API, scraping autorisé ou source métier, puis enrichissement et nettoyage.",
        },
        {
          title: "Qualification Facebook et formulaires",
          description:
            "Tri des messages, commentaires ou leads Meta, détection d'intention, résumé utile et création d'une action commerciale.",
        },
        {
          title: "Scoring IA",
          description:
            "Score basé sur votre ICP, justification courte, signaux positifs et raisons de ne pas contacter.",
        },
        {
          title: "Brouillons personnalisés",
          description:
            "Email, message LinkedIn ou note commerciale préparée à partir de données vérifiables.",
        },
        {
          title: "Synchronisation CRM",
          description:
            "Création ou mise à jour des contacts, tags, statut, prochaine action et résumé pour l'équipe.",
        },
      ],
    },
    architecture: {
      title: "Architecture type",
      intro:
        "Le workflow doit être auditable. Chaque score et chaque message doivent venir de données que l'équipe peut vérifier.",
      steps: [
        {
          title: "1. Source leads",
          description:
            "Liste existante, formulaire, base publique, export CRM ou source validée par votre équipe.",
        },
        {
          title: "2. Nettoyage",
          description:
            "Déduplication, validation des emails, normalisation des noms, secteurs et URLs.",
        },
        {
          title: "3. Analyse IA",
          description:
            "Résumé de l'entreprise, score ICP, angle de contact et drapeaux de prudence.",
        },
        {
          title: "4. Action contrôlée",
          description:
            "Ajout CRM, brouillon de message, notification commerciale ou séquence de relance avec validation.",
        },
      ],
    },
    safeguards: {
      title: "Garde-fous commerciaux et qualité",
      items: [
        {
          title: "Pas de promesse inventée",
          description:
            "Les messages doivent s'appuyer sur des signaux réels, pas sur des compliments génériques produits par IA.",
        },
        {
          title: "Respect des exclusions",
          description:
            "Listes no-contact, opt-out, clients existants, concurrents ou secteurs exclus sont filtrés.",
        },
        {
          title: "Validation humaine",
          description:
            "Pour les campagnes sensibles, l'IA prépare et l'humain décide l'envoi final.",
        },
      ],
    },
    proofs: [
      {
        label: "Facebook Agent IA",
        href: "/projects/facebook-agen-ia",
        description:
          "Dashboard d'agent IA connecté à Facebook pour qualifier des conversations et structurer les actions commerciales.",
      },
      {
        label: "Showcase workflow leads",
        href: "/projects/leads-automation-showcase",
        description:
          "Démonstration de pipeline n8n pour génération, qualification et synchronisation de leads.",
      },
      {
        label: "Scraping FlowRemote",
        href: "/projects/scraping-flowremote",
        description:
          "Extraction automatisée multi-sources, filtrage et notification quotidienne.",
      },
      {
        label: "Expert automatisation n8n",
        href: "/services/automatisation-n8n-madagascar",
        description:
          "Socle technique pour orchestrer sources, IA, CRM, emails et reporting.",
      },
    ],
    sources: [
      {
        label: "Google AI optimization",
        href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
        description:
          "Référence pour produire du contenu clair, utile et compréhensible par les moteurs enrichis par IA.",
      },
      {
        label: "n8n AI agents",
        href: "https://n8n.io/ai-agents/",
        description:
          "Base officielle pour penser les agents IA comme des workflows outillés, pas comme des réponses isolées.",
      },
    ],
    relatedServices: [
      {
        label: "Expert automatisation n8n",
        href: "/services/automatisation-n8n-madagascar",
        description:
          "Automatisation des workflows commerciaux, intégrations API et orchestration de données.",
      },
      {
        label: "Développeur d'agents IA",
        href: "/services/developpeur-agent-ia-madagascar",
        description:
          "Agents IA capables de classer, résumer, décider et préparer des actions métier.",
      },
    ],
    faq: [
      {
        question: "Quel est le rôle d'un agent IA de prospection ?",
        answer:
          "Un agent IA de prospection sert à qualifier et préparer le travail commercial : collecte de leads, nettoyage, enrichissement, scoring ICP, résumé, angle de contact et synchronisation CRM. L'envoi automatique n'est qu'une option, à réserver aux campagnes très cadrées.",
      },
      {
        question: "Un agent IA Facebook peut-il qualifier les demandes ?",
        answer:
          "Oui, si les accès Meta, les règles de confidentialité et les scénarios sont définis. L'agent peut lire une demande Facebook, détecter l'intention, classer le lead, préparer une réponse et créer une fiche CRM avec une prochaine action.",
      },
      {
        question: "Un agent IA peut-il envoyer les messages de prospection automatiquement ?",
        answer:
          "Techniquement oui, mais je recommande de commencer avec une validation humaine. La qualité, la délivrabilité et l'image de marque valent plus qu'un volume non contrôlé.",
      },
      {
        question: "Peut-on brancher ce workflow à HubSpot, Airtable ou Google Sheets ?",
        answer:
          "Oui. n8n peut synchroniser les données avec un CRM, une base Airtable, Google Sheets, Notion ou une API custom.",
      },
      {
        question: "Comment éviter les doublons dans le CRM ?",
        answer:
          "Le workflow peut vérifier email, domaine, nom d'entreprise et identifiants internes avant de créer ou mettre à jour un contact.",
      },
    ],
    cta: {
      title: "Vous voulez qualifier vos leads sans spammer ?",
      description:
        "On peut définir votre ICP, les sources acceptées, les champs CRM et le niveau de validation humaine avant de construire l'agent.",
      buttonLabel: "Cadrer mon agent prospection",
    },
  },
  {
    slug: "workflows-n8n-claude-code",
    icon: "terminal",
    accent: "indigo",
    title: "Workflows n8n + Claude Code : automatiser le développement assisté par IA",
    eyebrow: "Solution Claude Code + n8n",
    seoTitle: "Claude Code n8n | Workflows IA, MCP et Git",
    seoDescription:
      "Workflows Claude Code n8n pour automatiser tickets, audits, reporting et contenu avec contexte repo, MCP, logs, validation humaine et passage par Git.",
    primaryKeyword: "Claude Code n8n",
    secondaryKeywords: [
      "workflow n8n Claude Code",
      "automatisation Claude Code n8n",
      "développeur Claude Code freelance",
      "MCP n8n Claude",
    ],
    shortAnswer:
      "Un workflow Claude Code n8n relie un déclencheur métier ou technique à une tâche IA contrôlée : préparation de ticket, audit, résumé de logs, reporting, contenu SEO/GEO ou aide au développement. n8n rassemble le contexte, Claude Code ou Codex prépare une proposition, puis Git, logs et validation humaine gardent la main sur les actions à risque. Cette architecture convient surtout quand l'IA doit travailler avec un repo, des tickets, des données Supabase ou des documents internes.",
    heroLead:
      "Claude Code est puissant quand il travaille avec le contexte du repo. n8n devient utile quand il déclenche, prépare, archive et notifie autour de ce travail.",
    fit: [
      "Vous utilisez déjà Claude Code, Codex ou des LLMs dans votre production.",
      "Vous voulez automatiser des tâches répétitives autour du code, des tickets ou du contenu.",
      "Vous avez besoin de logs et de validation avant qu'une action IA touche la production.",
      "Vous voulez brancher vos outils : GitHub, Notion, Slack, Supabase, email, CRM ou API interne.",
    ],
    outcomes: [
      {
        title: "Moins de tâches développeur répétitives",
        description:
          "Préparation de tickets, résumés de logs, rapports, checklists de review et brouillons techniques.",
      },
      {
        title: "Meilleure traçabilité",
        description:
          "Chaque action IA a une entrée, une sortie, un contexte, une date et un responsable humain.",
      },
      {
        title: "IA mieux cadrée",
        description:
          "Les prompts, les fichiers de contexte et les règles d'exécution sont versionnés ou documentés.",
      },
    ],
    problem: {
      title: "Le développement assisté par IA a besoin d'un système autour",
      paragraphs: [
        "Claude Code peut accélérer le développement, mais un workflow Claude Code n8n doit préciser le déclencheur, le contexte, la sortie attendue et la personne qui valide. Sans ce cadrage, l'IA produit des réponses utiles ponctuellement mais difficiles à industrialiser.",
        "n8n peut jouer le rôle d'orchestrateur : récupérer un ticket, lire des données, préparer un prompt, appeler un modèle, stocker le résultat, notifier l'équipe et créer une tâche de validation. Avec MCP, le workflow peut aussi exposer des outils précis à l'agent au lieu de lui donner un accès flou.",
        "Je construis ces workflows comme des extensions de votre manière de travailler, pas comme un gadget. Le code reste dans Git, les secrets restent dans les environnements prévus, et les actions à risque restent humaines.",
      ],
    },
    deliverables: {
      title: "Cas d'usage concrets",
      items: [
        {
          title: "Préparation de tickets",
          description:
            "Transformer une demande client en brief technique : contexte, fichiers probables, risques et critères d'acceptation.",
        },
        {
          title: "Reporting technique",
          description:
            "Résumer logs, erreurs, analytics ou retours utilisateurs, puis envoyer un rapport exploitable.",
        },
        {
          title: "Workflow contenu + SEO",
          description:
            "Préparer briefs, FAQ, maillage interne et éléments JSON-LD avant validation éditoriale.",
        },
        {
          title: "Orchestration MCP",
          description:
            "Définir quels outils, données ou endpoints l'agent peut utiliser, avec limites, logs et validation avant action sensible.",
        },
        {
          title: "Aide à la maintenance",
          description:
            "Créer des checklists de review, détecter les régressions probables et documenter les changements.",
        },
      ],
    },
    architecture: {
      title: "Architecture type",
      intro:
        "Le principe : n8n orchestre les événements et Claude Code intervient seulement quand le contexte est suffisant.",
      steps: [
        {
          title: "1. Déclencheur",
          description:
            "Nouveau ticket, commentaire GitHub, formulaire client, erreur serveur, contenu à préparer ou tâche planifiée.",
        },
        {
          title: "2. Contexte",
          description:
            "n8n rassemble les informations utiles : URL, logs, description, fichiers, données Supabase ou documents internes.",
        },
        {
          title: "3. Travail IA",
          description:
            "Claude Code ou un LLM produit une proposition : brief, résumé, patch à relire, checklist ou réponse.",
        },
        {
          title: "4. Validation",
          description:
            "L'équipe reçoit la sortie avec les sources et décide de publier, modifier, rejeter ou créer une tâche.",
        },
      ],
    },
    safeguards: {
      title: "Garde-fous pour ne pas casser la production",
      items: [
        {
          title: "Validation avant mutation",
          description:
            "Les workflows peuvent préparer du code ou des textes, mais la publication ou le merge reste contrôlé.",
        },
        {
          title: "Secrets hors prompts",
          description:
            "Les clés API, tokens et variables sensibles ne doivent pas être envoyés dans les prompts.",
        },
        {
          title: "Traçabilité Git",
          description:
            "Les changements utiles passent par Git, review, build et test, pas par des modifications invisibles.",
        },
      ],
    },
    proofs: [
      {
        label: "Développeur Claude Code + n8n",
        href: "/services/developpeur-claude-code-n8n",
        description:
          "Service dédié à l'association Claude Code, workflows n8n et production web.",
      },
      {
        label: "Article Claude Code",
        href: "/blog/claude-code-developper-avec-ia",
        description:
          "Retour d'expérience sur le développement assisté par IA et les limites à cadrer.",
      },
      {
        label: "Factumation",
        href: "/projects/factumation",
        description:
          "Produit livré rapidement avec Claude Code, base concrète pour parler méthode et garde-fous.",
      },
    ],
    sources: [
      {
        label: "Google generative AI content",
        href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content",
        description:
          "Repère important : le contenu généré ou assisté par IA doit rester utile, original et contrôlé.",
      },
      {
        label: "Google structured data",
        href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
        description:
          "Base pour rendre les pages plus explicites avec FAQ, breadcrumb et données structurées visibles.",
      },
    ],
    relatedServices: [
      {
        label: "Développeur Claude Code + n8n",
        href: "/services/developpeur-claude-code-n8n",
        description:
          "Automatisations et produits construits avec Claude Code, n8n, Next.js et Supabase.",
      },
      {
        label: "Consultant SEO + GEO",
        href: "/services/consultant-seo-geo",
        description:
          "Structurer les pages pour Google, les AI Overviews et les moteurs de réponse.",
      },
    ],
    faq: [
      {
        question: "Claude Code peut-il être déclenché automatiquement par n8n ?",
        answer:
          "Oui, selon l'environnement et les outils disponibles, n8n peut préparer le contexte, créer une tâche, notifier un humain ou appeler une API IA. Pour les actions de code, je recommande que Claude Code produise une proposition contrôlée, puis qu'un humain valide le patch via Git, build et tests.",
      },
      {
        question: "À quoi sert MCP dans un workflow n8n Claude ?",
        answer:
          "MCP sert à exposer des outils structurés à l'agent IA : lecture de données, actions limitées, recherche ou commandes métiers. Dans un workflow n8n Claude, MCP évite les prompts flous en donnant à l'agent des capacités précises, journalisées et plus faciles à limiter.",
      },
      {
        question: "Quels workflows sont utiles avec Claude Code ?",
        answer:
          "Préparation de tickets, audit de contenu, résumé de logs, génération de checklists, documentation de changements et assistance à la maintenance sont de bons premiers cas.",
      },
      {
        question: "Peut-on utiliser Codex au lieu de Claude Code ?",
        answer:
          "Oui. Le même principe reste valable : n8n orchestre, l'IA produit une proposition, et l'humain valide les actions qui touchent au code ou à la production.",
      },
    ],
    cta: {
      title: "Vous voulez industrialiser votre usage de Claude Code ?",
      description:
        "On peut commencer par un workflow simple : un déclencheur, un contexte, une sortie IA, une validation humaine et une trace.",
      buttonLabel: "Designer mon workflow IA",
    },
  },
  {
    slug: "developpeur-agent-vocal-ia",
    icon: "call",
    accent: "emerald",
    title: "Développeur agent vocal IA : appels entrants, qualification et rendez-vous",
    eyebrow: "Solution agent vocal IA",
    seoTitle: "Développeur agent vocal IA | Appels, qualification et rendez-vous",
    seoDescription:
      "Développeur agent vocal IA pour automatiser appels entrants, qualification client, prise de rendez-vous, relances et transfert humain avec ElevenLabs, Twilio et n8n.",
    primaryKeyword: "développeur agent vocal IA",
    secondaryKeywords: [
      "agent vocal IA",
      "assistant vocal IA entreprise",
      "agent vocal ElevenLabs",
      "agent IA téléphone",
    ],
    shortAnswer:
      "Un agent vocal IA répond au téléphone, qualifie la demande, pose les bonnes questions, peut réserver un créneau et transmet les cas sensibles à un humain. Je construis l'agent avec un script cadré, une base de connaissance, des logs, des webhooks et une intégration n8n/CRM.",
    heroLead:
      "Le vrai sujet n'est pas de faire parler une IA au téléphone. Le vrai sujet est de ne plus rater les appels utiles, tout en gardant un transfert humain quand la demande devient sensible.",
    fit: [
      "Vous manquez des appels parce que l'équipe est occupée, en intervention ou hors horaires.",
      "Vos prospects posent souvent les mêmes questions avant de demander un devis ou un rendez-vous.",
      "Vous voulez qualifier les demandes avant de rappeler : besoin, budget, urgence, zone, coordonnées.",
      "Vous avez besoin d'un agent vocal relié à votre CRM, agenda, WhatsApp, email ou workflow n8n.",
    ],
    outcomes: [
      {
        title: "Moins d'appels perdus",
        description:
          "L'agent peut accueillir les appels entrants, collecter les informations clés et prévenir l'équipe avec un résumé exploitable.",
      },
      {
        title: "Demandes mieux qualifiées",
        description:
          "Chaque appel peut produire un motif, un niveau d'urgence, une fiche contact et une prochaine action.",
      },
      {
        title: "Rendez-vous plus propres",
        description:
          "L'agent peut préparer ou réserver un créneau selon vos règles, puis confirmer par email, SMS ou notification interne.",
      },
    ],
    problem: {
      title: "Un appel client est souvent le moment où l'intention est la plus forte",
      paragraphs: [
        "Quand une personne appelle, elle veut souvent une réponse rapide : prix, disponibilité, réservation, devis, support ou urgence. Si personne ne décroche, la demande peut partir chez un concurrent ou rester bloquée dans une messagerie vocale.",
        "Un agent vocal IA peut traiter les demandes répétitives et collecter le contexte avant qu'un humain reprenne. Il ne doit pas improviser : son rôle est d'accueillir, clarifier, qualifier, résumer et transférer quand la décision demande une personne.",
        "Je construis l'agent comme un workflow métier : script d'appel, règles de transfert, base de connaissance, outils connectés, journalisation, tests sur scénarios réels et amélioration après les premiers appels.",
      ],
    },
    deliverables: {
      title: "Ce que je peux livrer",
      items: [
        {
          title: "Script vocal cadré",
          description:
            "Message d'accueil, questions de qualification, réponses autorisées, phrases de refus et règles de transfert humain.",
        },
        {
          title: "Agent ElevenLabs ou téléphonie Twilio",
          description:
            "Configuration de l'expérience vocale, des webhooks, des événements d'appel et des outils que l'agent peut utiliser.",
        },
        {
          title: "Workflow n8n après appel",
          description:
            "Résumé de l'appel, création CRM, notification WhatsApp/email, ajout dans un agenda ou demande de rappel.",
        },
        {
          title: "Dashboard et logs",
          description:
            "Historique des appels, statut, motif, résultat, score de qualification et prochaine action pour l'équipe.",
        },
      ],
    },
    architecture: {
      title: "Architecture type",
      intro:
        "Je sépare la voix, la logique métier et les actions. L'agent parle, mais les décisions importantes restent dans des règles et des workflows contrôlés.",
      steps: [
        {
          title: "1. Appel entrant",
          description:
            "Un numéro reçoit l'appel et déclenche l'agent vocal avec le bon message d'accueil.",
        },
        {
          title: "2. Qualification",
          description:
            "L'agent collecte nom, contact, besoin, urgence, zone, budget ou créneau souhaité.",
        },
        {
          title: "3. Action métier",
          description:
            "n8n ou le backend crée une fiche, prévient l'équipe, prépare un rendez-vous ou transmet à un humain.",
        },
        {
          title: "4. Trace et amélioration",
          description:
            "Chaque appel laisse un résumé, un statut et des signaux pour corriger le script si nécessaire.",
        },
      ],
    },
    safeguards: {
      title: "Garde-fous indispensables",
      items: [
        {
          title: "Transfert humain clair",
          description:
            "L'agent doit savoir transférer ou promettre un rappel quand la demande dépasse son périmètre.",
        },
        {
          title: "Pas de promesse risquée",
          description:
            "Prix définitif, diagnostic sensible, engagement contractuel ou décision commerciale peuvent rester côté humain.",
        },
        {
          title: "Consentement et transparence",
          description:
            "Le parcours doit rester clair pour l'appelant, avec une gestion propre des données collectées pendant l'appel.",
        },
      ],
    },
    proofs: [
      {
        label: "Développeur d'agents vocaux IA",
        href: "/services/developpeur-agent-vocal-ia",
        description:
          "Service dédié aux agents vocaux IA avec ElevenLabs, Twilio, qualification et workflow métier.",
      },
      {
        label: "Développeur d'agents IA",
        href: "/services/developpeur-agent-ia-madagascar",
        description:
          "Même logique agentique appliquée au support, à la qualification et aux actions métier.",
      },
      {
        label: "Expert automatisation n8n",
        href: "/services/automatisation-n8n-madagascar",
        description:
          "Pour connecter l'appel au CRM, à l'agenda, aux notifications et au reporting.",
      },
    ],
    sources: [
      {
        label: "ElevenLabs agents",
        href: "https://elevenlabs.io/docs/eleven-agents/overview",
        description:
          "Documentation officielle pour construire, lancer et superviser des agents conversationnels.",
      },
      {
        label: "ElevenLabs post-call webhooks",
        href: "https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks",
        description:
          "Référence pour récupérer les informations utiles après analyse d'un appel.",
      },
      {
        label: "Twilio Voice webhooks",
        href: "https://www.twilio.com/docs/usage/webhooks/voice-webhooks",
        description:
          "Documentation officielle sur les callbacks d'appels entrants et sortants Twilio Voice.",
      },
    ],
    relatedServices: [
      {
        label: "Développeur d'agents vocaux IA",
        href: "/services/developpeur-agent-vocal-ia",
        description:
          "La page service principale pour cadrer un agent vocal IA complet.",
      },
      {
        label: "Développeur Node.js à Madagascar",
        href: "/services/developpeur-nodejs-madagascar",
        description:
          "Pour les webhooks, APIs, dashboards et intégrations serveur autour des appels.",
      },
    ],
    faq: [
      {
        question: "Un agent vocal IA peut-il prendre des rendez-vous ?",
        answer:
          "Oui, si les règles sont claires : horaires disponibles, durée, zone, type de demande et validation éventuelle. L'agent peut aussi préparer le rendez-vous sans le confirmer automatiquement.",
      },
      {
        question: "Peut-on transférer l'appel à un humain ?",
        answer:
          "Oui. Le transfert humain fait partie des garde-fous importants, surtout pour les urgences, les demandes sensibles ou les clients à forte valeur.",
      },
      {
        question: "Faut-il Twilio, ElevenLabs ou les deux ?",
        answer:
          "Cela dépend du parcours. ElevenLabs peut gérer l'agent conversationnel, Twilio peut gérer la téléphonie et les webhooks. Je choisis l'architecture selon le pays, le numéro, les coûts et les intégrations nécessaires.",
      },
    ],
    cta: {
      title: "Vous voulez répondre aux appels sans recruter un standardiste ?",
      description:
        "On peut commencer par un agent simple : accueil, qualification, résumé, notification équipe et transfert humain sur les cas sensibles.",
      buttonLabel: "Cadrer mon agent vocal",
    },
  },
  {
    slug: "automatisation-marketing-n8n",
    icon: "campaign",
    accent: "purple",
    title: "Automatisation marketing n8n : leads, CRM, emails et reporting",
    eyebrow: "Solution marketing automation",
    seoTitle: "Automatisation marketing n8n | CRM, emails et reporting",
    seoDescription:
      "Automatisation marketing avec n8n : formulaires, CRM, segmentation, emails, relances et reporting. Des workflows mesurables avec validation humaine.",
    primaryKeyword: "automatisation marketing n8n",
    secondaryKeywords: [
      "marketing automation PME",
      "workflow marketing n8n",
      "automatisation CRM email",
      "nurturing leads n8n",
      "reporting marketing automatique",
    ],
    shortAnswer:
      "Une automatisation marketing n8n relie vos formulaires, votre CRM, vos outils email et vos données de campagne. Un lead est nettoyé, dédupliqué, segmenté puis envoyé vers la bonne séquence. Les réponses, désabonnements et conversions remontent dans le CRM, tandis qu'un rapport montre les campagnes qui produisent réellement des demandes. L'équipe garde la validation des messages, des audiences et des décisions commerciales.",
    heroLead:
      "Un lead ne devrait pas attendre dans un formulaire, disparaître dans un tableur ou recevoir une relance sans contexte. n8n relie chaque étape et laisse une trace exploitable par votre équipe.",
    fit: [
      "Vos formulaires, campagnes, emails et données CRM vivent dans des outils séparés.",
      "Les leads sont traités tard ou relancés sans tenir compte de leur source et de leur intention.",
      "Votre équipe prépare encore ses rapports marketing à la main dans des tableurs.",
      "Vous voulez automatiser le suivi sans envoyer de messages non sollicités ni perdre le contrôle éditorial.",
    ],
    outcomes: [
      {
        title: "Leads traités plus vite",
        description:
          "Chaque demande est validée, dédupliquée, enrichie et affectée au bon segment dès son arrivée.",
      },
      {
        title: "Messages mieux contextualisés",
        description:
          "La source, la page visitée, l'offre demandée et le statut CRM déterminent la séquence et le contenu proposés.",
      },
      {
        title: "Reporting utile",
        description:
          "Les campagnes, réponses, rendez-vous et conversions sont réunis dans un rapport lisible, sans export manuel hebdomadaire.",
      },
    ],
    problem: {
      title: "Le problème n'est pas le manque d'outils, mais les passages entre eux",
      paragraphs: [
        "Un parcours marketing courant commence avec une publicité, une page de contenu ou un formulaire. La demande arrive ensuite dans une boîte mail, un tableur ou un CRM. Si personne ne reprend les données rapidement, le contexte se perd : source inconnue, doublons, mauvaise segmentation et relance tardive.",
        "n8n sert de couche d'orchestration. Il reçoit l'événement, normalise les champs, vérifie le consentement et les exclusions, met à jour le CRM, déclenche une action autorisée puis journalise le résultat. Il ne remplace ni votre CRM ni votre outil email ; il évite les copier-coller entre eux.",
        "Je sépare clairement le marketing automation de la prospection froide. Cette page concerne les leads entrants, les contacts autorisés et les parcours que votre entreprise peut expliquer. Pour la recherche, le scoring et la préparation commerciale, la page [Agent IA prospection](/solutions/agent-ia-prospection) décrit un workflow différent avec ses propres garde-fous.",
      ],
    },
    deliverables: {
      title: "Workflows marketing que je peux construire",
      items: [
        {
          title: "Formulaire vers CRM",
          description:
            "Capture, validation, déduplication, attribution de la source, création ou mise à jour du contact et notification de l'équipe.",
        },
        {
          title: "Segmentation et nurturing",
          description:
            "Affectation selon l'offre, le pays, le profil ou l'action réalisée, puis préparation de la séquence email adaptée.",
        },
        {
          title: "Relances contrôlées",
          description:
            "Rappels après demande, devis ou rendez-vous, avec arrêt automatique en cas de réponse, conversion ou désabonnement.",
        },
        {
          title: "Reporting de campagne",
          description:
            "Synthèse des sources, leads, réponses, rendez-vous et conversions dans Supabase, Sheets, Looker Studio ou un dashboard interne.",
        },
        {
          title: "Alertes commerciales",
          description:
            "Notification immédiate lorsqu'un lead prioritaire répond, visite une page clé ou demande explicitement un échange.",
        },
      ],
    },
    architecture: {
      title: "Architecture d'un workflow marketing mesurable",
      intro:
        "Chaque étape doit avoir une entrée connue, une règle simple et une sortie vérifiable. Le CRM reste la source de vérité et n8n transporte les événements entre les outils.",
      steps: [
        {
          title: "1. Capture",
          description:
            "Formulaire, événement produit, inscription, campagne ou demande entrante avec source et consentement.",
        },
        {
          title: "2. Qualité des données",
          description:
            "Validation, normalisation, déduplication, contrôle des exclusions et rapprochement avec le contact existant.",
        },
        {
          title: "3. Orchestration",
          description:
            "Mise à jour CRM, segmentation, brouillon ou envoi autorisé, tâche commerciale et temporisation entre les étapes.",
        },
        {
          title: "4. Mesure",
          description:
            "Réponse, clic, rendez-vous, conversion, erreur ou désabonnement reviennent dans le CRM et le reporting.",
        },
      ],
    },
    safeguards: {
      title: "Garde-fous marketing et données",
      items: [
        {
          title: "Consentement et exclusions",
          description:
            "Les listes de désabonnement, clients existants, contacts exclus et règles de pression marketing sont vérifiées avant action.",
        },
        {
          title: "Reprise sur erreur",
          description:
            "Un échec d'API produit une alerte et une file de reprise. Le même événement ne doit pas créer deux contacts ou deux envois.",
        },
        {
          title: "Validation éditoriale",
          description:
            "Les séquences, audiences et promesses sont validées par l'équipe. L'IA peut préparer un brouillon, pas inventer une offre.",
        },
      ],
    },
    proofs: [
      {
        label: "Leads Automation",
        href: "/projects/leads-automation-showcase",
        description:
          "Pipeline de collecte, qualification et synchronisation de leads avec n8n et un CRM.",
      },
      {
        label: "Tracking Visiteurs",
        href: "/projects/tracking-visiteurs",
        description:
          "Collecte d'événements, stockage Supabase et alertes pour suivre les parcours utiles.",
      },
      {
        label: "Facebook Agent IA",
        href: "/projects/facebook-agen-ia",
        description:
          "Étude de cas sur la transformation de conversations Facebook en actions commerciales vérifiables.",
      },
    ],
    sources: [
      {
        label: "Catalogue des intégrations n8n",
        href: "https://n8n.io/integrations/",
        description:
          "Référence officielle pour vérifier les connecteurs CRM, email, analytics et bases de données disponibles.",
      },
      {
        label: "Gestion des erreurs n8n",
        href: "https://docs.n8n.io/flow-logic/error-handling/",
        description:
          "Documentation officielle pour prévoir alertes, reprises et journalisation des workflows.",
      },
    ],
    relatedServices: [
      {
        label: "Automatisation n8n pour PME",
        href: "/solutions/automatisation-n8n-pme",
        description:
          "Pour automatiser aussi la facturation, les opérations, les notifications et le back-office.",
      },
      {
        label: "Expert automatisation n8n",
        href: "/services/automatisation-n8n-madagascar",
        description:
          "Service principal pour cadrer, développer, héberger et maintenir vos workflows.",
      },
      {
        label: "Agent IA prospection",
        href: "/solutions/agent-ia-prospection",
        description:
          "Pour enrichir, scorer et préparer le travail commercial avant validation humaine.",
      },
    ],
    faq: [
      {
        question: "Que peut automatiser n8n en marketing ?",
        answer:
          "n8n peut relier formulaires, CRM, email, publicité, analytics et reporting : création de contacts, segmentation, relances, alertes, synchronisation des statuts et rapports de campagne.",
      },
      {
        question: "n8n remplace-t-il HubSpot, Brevo ou Mailchimp ?",
        answer:
          "Non. Ces outils restent les systèmes utilisés par l'équipe. n8n automatise les échanges de données et les décisions simples entre eux.",
      },
      {
        question: "Peut-on mesurer les conversions dans le même workflow ?",
        answer:
          "Oui. Les réponses, rendez-vous, achats ou autres conversions peuvent revenir dans le CRM et alimenter un dashboard. Il faut définir une source de vérité et des identifiants stables dès le départ.",
      },
      {
        question: "L'IA peut-elle écrire et envoyer les emails automatiquement ?",
        answer:
          "Elle peut préparer des brouillons à partir de données vérifiables. Pour les campagnes importantes, je recommande une validation humaine du message et de l'audience avant l'envoi.",
      },
    ],
    cta: {
      title: "Votre parcours marketing se casse entre deux outils ?",
      description:
        "Envoyez-moi le formulaire, le CRM, l'outil email et le rapport que vous utilisez aujourd'hui. Je vous indiquerai les étapes à automatiser et celles qui doivent rester humaines.",
      buttonLabel: "Cartographier mon parcours marketing",
    },
  },
];

export const enSolutions: Solution[] = [
  {
    slug: "n8n-automation-for-smbs",
    icon: "hub",
    accent: "emerald",
    title: "n8n automation for SMBs: CRM, email, reporting and follow-ups",
    eyebrow: "n8n solution for SMBs",
    seoTitle: "n8n Automation for SMBs | CRM, Email and Reporting Workflows",
    seoDescription:
      "n8n automation for SMBs: CRM, email, reporting, invoices and follow-ups. Reliable documented workflows with monitoring and error recovery.",
    primaryKeyword: "n8n automation for SMBs",
    secondaryKeywords: [
      "workflow automation for SMBs",
      "freelance n8n expert",
      "n8n CRM workflow",
      "business process automation",
    ],
    shortAnswer:
      "n8n automation for SMBs connects your business tools to remove repetitive work: lead creation, emails, reporting, invoices, follow-ups and alerts. I build documented, tested and monitored workflows, with recovery logic when an API or external service fails.",
    heroLead:
      "The goal is not to build a pretty n8n canvas. The goal is to create a system that runs every day without forcing your team to check every step by hand.",
    fit: [
      "You still copy data between forms, spreadsheets, CRM tools and emails.",
      "Your team loses time on follow-ups, exports and internal notifications.",
      "You want control over your data with n8n Cloud or a self-hosted instance.",
      "You need a workflow your team can understand, not a black box.",
    ],
    outcomes: [
      {
        title: "Less manual work",
        description:
          "Repetitive actions move into n8n: sorting, enrichment, calculations, notifications, document generation and CRM sync.",
      },
      {
        title: "Better visibility",
        description:
          "Important data lands in the right place: dashboard, recap email, Slack, Notion, Airtable, Supabase or Google Sheets.",
      },
      {
        title: "Maintainable workflow",
        description:
          "Each scenario is named, documented, split into readable steps and delivered with access notes, variables and recovery instructions.",
      },
    ],
    problem: {
      title: "The real problem: your tools do not talk to each other well enough",
      paragraphs: [
        "Most SMBs do not have a software problem. They have an information flow problem. A lead arrives from a form, someone copies it into a CRM, another person prepares an email, then someone else has to verify payment, update a spreadsheet and notify the team.",
        "At first, this manual system holds. Then volume grows, copy-paste errors appear, follow-ups go out late and nobody knows which data source is reliable. This is where n8n becomes useful: it orchestrates your existing tools.",
        "I start by mapping the real process, then I automate only the repeatable steps. Sensitive decisions stay human, especially for amounts, customer exceptions and commercial validation.",
      ],
    },
    deliverables: {
      title: "What I can deliver",
      items: [
        {
          title: "CRM and lead workflow",
          description:
            "Request capture, field cleanup, simple scoring, sales assignment and notification with full context.",
        },
        {
          title: "Emails and follow-ups",
          description:
            "Follow-up sequences, internal reminders, transactional emails, payment reminders and personalized messages from your data.",
        },
        {
          title: "Automatic reporting",
          description:
            "Daily or weekly summaries with key metrics, anomalies, open tasks and links to source data.",
        },
        {
          title: "Billing and back office",
          description:
            "Invoice preparation, document generation, shared-folder delivery and sync with your accounting tool.",
        },
      ],
    },
    architecture: {
      title: "Typical architecture",
      intro:
        "I favor a simple architecture: a clear trigger, named steps, normalized data and a controlled output. The workflow stays readable months after delivery.",
      steps: [
        {
          title: "1. Trigger",
          description:
            "Webhook, form, inbound email, scheduled cron, new payment or CRM event.",
        },
        {
          title: "2. Normalization",
          description:
            "Field cleanup, minimal validation, deduplication and a stable business object.",
        },
        {
          title: "3. Decision",
          description:
            "Conditions, routing, score, API call or AI step when text processing creates real value.",
        },
        {
          title: "4. Action and trace",
          description:
            "CRM creation, email, document, notification, reporting row and execution log to verify what happened.",
        },
      ],
    },
    safeguards: {
      title: "Production safeguards",
      items: [
        {
          title: "Error handling",
          description:
            "Critical workflows include alerts, recovery paths and readable messages when an API does not respond.",
        },
        {
          title: "Client ownership",
          description:
            "The n8n instance, credentials and connected accounts stay under the client's name. I document access at delivery.",
        },
        {
          title: "No blind automation",
          description:
            "Risky decisions can stay human: final send, discount approval, data deletion or irreversible action.",
        },
      ],
    },
    proofs: [
      {
        label: "Scraping FlowRemote",
        href: "/en/projects/scraping-flowremote",
        description:
          "n8n workflow that extracts, filters and sends remote job opportunities without manual work.",
      },
      {
        label: "Visitor Tracking",
        href: "/en/projects/visitor-tracking",
        description:
          "Supabase + n8n pipeline to observe portfolio visitors and trigger useful notifications.",
      },
      {
        label: "Factumation",
        href: "/en/projects/factumation",
        description:
          "Invoicing product built with Claude Code, designed to connect with back-office automation.",
      },
    ],
    sources: [
      {
        label: "n8n Docker self-hosting",
        href: "https://docs.n8n.io/hosting/installation/docker/",
        description:
          "Official reference for deploying n8n cleanly when the client wants infrastructure control.",
      },
      {
        label: "n8n Error handling",
        href: "https://docs.n8n.io/flow-logic/error-handling/",
        description:
          "Official documentation on error workflows and recovery strategies.",
      },
    ],
    relatedServices: [
      {
        label: "n8n Automation Expert in Madagascar",
        href: "/en/services/n8n-automation-expert-madagascar",
        description:
          "The main service page for n8n workflows, scraping, APIs and AI agents.",
      },
      {
        label: "Hire a Node.js Developer in Madagascar",
        href: "/en/services/hire-nodejs-developer-madagascar",
        description:
          "For workflows that need a custom API, backend service or Supabase database.",
      },
    ],
    faq: [
      {
        question: "How long does it take to automate an SMB process with n8n?",
        answer:
          "A simple workflow often takes 3 to 5 business days. A system with several tools, conditions, a dashboard and error handling usually takes 1 to 3 weeks depending on access and data quality.",
      },
      {
        question: "Does n8n replace my CRM or business software?",
        answer:
          "No. n8n mainly connects your tools and automates information flow. The CRM, invoicing tool or customer database remain your business sources of truth.",
      },
      {
        question: "Can n8n run on our own server?",
        answer:
          "Yes. n8n can run on a VPS with Docker. I can also work with n8n Cloud if you prefer to avoid server maintenance.",
      },
    ],
    cta: {
      title: "Have a repetitive process to automate?",
      description:
        "Send me the current workflow: tools used, manual steps, volumes and frequent errors. I will tell you what is truly worth automating.",
      buttonLabel: "Audit my workflow",
    },
  },
  {
    slug: "ai-customer-support-agent",
    icon: "support_agent",
    accent: "indigo",
    title: "AI customer support agent: FAQ, ticket triage and human handoff",
    eyebrow: "AI agent solution",
    seoTitle: "AI Customer Support Agent | FAQ, Tickets and Human Handoff",
    seoDescription:
      "AI customer support agent for SMBs: FAQ answers, request triage, ticket qualification, human handoff and n8n/CRM integration.",
    primaryKeyword: "AI customer support agent",
    secondaryKeywords: [
      "AI support agent",
      "customer service AI automation",
      "AI support chatbot",
      "AI ticket triage",
    ],
    shortAnswer:
      "An AI customer support agent answers simple questions, classifies requests, prepares replies and escalates sensitive cases to a human. I build it with a clear knowledge base, handoff rules, logs and integration with your support tools or CRM.",
    heroLead:
      "A good AI support agent does not replace the team. It removes noise, prepares context and lets humans handle important decisions.",
    fit: [
      "Your support inbox receives the same questions every week.",
      "Requests arrive through email, WhatsApp, forms or chat and get mixed together.",
      "You want faster replies without letting AI improvise on sensitive topics.",
      "You need an agent connected to your tools, not just an isolated chat bubble.",
    ],
    outcomes: [
      {
        title: "Faster replies",
        description:
          "The agent handles frequent questions and prepares replies for requests that need validation.",
      },
      {
        title: "Better qualified tickets",
        description:
          "Each request can receive a category, priority, summary, attachments and owner.",
      },
      {
        title: "Controlled handoff",
        description:
          "Sensitive cases, complaints, refunds and commercial decisions remain on the human side.",
      },
    ],
    problem: {
      title: "The risk is not AI. The risk is AI without a frame.",
      paragraphs: [
        "Many support automation projects fail because they start with the model instead of the customer journey. A useful agent must know what it can answer, what it must ask, what it must refuse and when it must transfer.",
        "I first build the knowledge base: offers, pricing, timelines, refund policy, service zones, frequent questions and forbidden cases. Only then do I connect the agent to your channels and tools.",
        "The goal is a readable experience: the customer gets a clear answer, the support team keeps the trace, and the business can correct answers when information changes.",
      ],
    },
    deliverables: {
      title: "What the agent can handle",
      items: [
        {
          title: "Dynamic FAQ",
          description:
            "Answers to repetitive questions with internal sources, brand tone and explicit limits.",
        },
        {
          title: "Ticket triage and summary",
          description:
            "Categorization, short summary, priority estimate and extraction of useful information.",
        },
        {
          title: "Draft reply with validation",
          description:
            "AI proposes a reply, while the human keeps the final button when the topic touches payment or customer relationship.",
        },
        {
          title: "Workflow integration",
          description:
            "Connection with email, CRM, Notion, Airtable, Supabase, Slack, n8n or an existing ticketing tool.",
        },
      ],
    },
    architecture: {
      title: "Typical architecture",
      intro:
        "I separate the brain, memory and actions. That avoids the magic agent nobody can maintain.",
      steps: [
        {
          title: "1. Knowledge base",
          description:
            "Product pages, internal docs, FAQ, commercial rules, message templates and information the agent must never invent.",
        },
        {
          title: "2. Classification",
          description:
            "The agent detects topic, urgency, language, missing data and risk level.",
        },
        {
          title: "3. Reply or handoff",
          description:
            "Automatic answer for simple cases, draft for validation or direct transfer to a human.",
        },
        {
          title: "4. Logging",
          description:
            "Each useful exchange is stored with category, confidence score and triggered action.",
        },
      ],
    },
    safeguards: {
      title: "Required safeguards",
      items: [
        {
          title: "No-answer rules",
          description:
            "The agent must know when to say it does not know, ask for detail or transfer.",
        },
        {
          title: "Human validation",
          description:
            "Refunds, disputes, commercial gestures and sensitive data can require validation.",
        },
        {
          title: "Logs and improvement",
          description:
            "Conversations help improve the FAQ, correct answers and detect poorly covered topics.",
        },
      ],
    },
    proofs: [
      {
        label: "AI Agent Developer in Madagascar",
        href: "/en/services/ai-agent-developer-madagascar",
        description:
          "My dedicated service for AI agents integrated into a product, CRM or business workflow.",
      },
      {
        label: "n8n Automation Expert",
        href: "/en/services/n8n-automation-expert-madagascar",
        description:
          "To connect the agent to emails, forms, tickets, databases and notifications.",
      },
      {
        label: "AI Voice Agent",
        href: "/en/services/ai-voice-agent-developer",
        description:
          "The same logic applied to voice: qualification, framed answers and human transfer.",
      },
    ],
    sources: [
      {
        label: "n8n AI agents",
        href: "https://n8n.io/ai-agents/",
        description:
          "Official overview of AI agents in workflows with tools, memory and goals.",
      },
      {
        label: "Google helpful content",
        href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        description:
          "Reference used to write useful, specific and verifiable answers.",
      },
    ],
    relatedServices: [
      {
        label: "AI Agent Developer",
        href: "/en/services/ai-agent-developer-madagascar",
        description:
          "AI agents connected to your business tools and knowledge bases.",
      },
      {
        label: "AI Integration & Prompt Engineering",
        href: "/en/services/ai-integration",
        description:
          "Claude, GPT and structured prompts inside an application or workflow.",
      },
    ],
    faq: [
      {
        question: "Can an AI support agent reply to customers automatically?",
        answer:
          "Yes, but only on framed topics. I often recommend automatic replies for simple FAQ cases and human validation for commercial, legal, financial or sensitive topics.",
      },
      {
        question: "Do we already need a knowledge base?",
        answer:
          "It helps, but it is not mandatory. We can start from your emails, documents, web pages and repetitive replies to build a first clean base.",
      },
      {
        question: "Can the agent work with WhatsApp or email?",
        answer:
          "Yes, depending on available access. The key is to define the priority channel, reply rules and the system where exchanges will be stored.",
      },
    ],
    cta: {
      title: "Does your support team receive too many repetitive requests?",
      description:
        "We can start with 20 frequent questions, one support channel and a clear rule: what the agent handles, what it prepares and what it transfers.",
      buttonLabel: "Design my support agent",
    },
  },
  {
    slug: "mobile-money-api-madagascar",
    icon: "payments",
    accent: "blue",
    title: "Mobile Money API Madagascar: Orange Money, MVola, Airtel and dashboard",
    eyebrow: "Local payment solution",
    seoTitle: "Mobile Money API Madagascar | MVola, Orange & Airtel",
    seoDescription:
      "Build a Madagascar Mobile Money API for MVola, Orange Money and Airtel Money with secure callbacks, reconciliation, test mode and an operations dashboard.",
    primaryKeyword: "Mobile Money API Madagascar",
    secondaryKeywords: [
      "Orange Money API Madagascar",
      "MVola API Madagascar",
      "Airtel Money API Madagascar",
      "mobile money payment app",
      "mobile money payment webhook",
      "Madagascar payment integration",
    ],
    shortAnswer:
      "A Madagascar Mobile Money API connects an application to Orange Money, MVola or Airtel Money to create, track and reconcile payments. A useful integration is more than a provider call: it creates a payment intent, receives a secure webhook, verifies the status server-side, links the transaction to an order and exposes a clear history in an admin dashboard. I build this flow with Node.js or Next.js, test/mock mode, idempotency and traces the team can actually use.",
    heroLead:
      "Local payment is rarely just a button. You need to handle status, callback, failure, customer proof and back-office reconciliation.",
    fit: [
      "You are launching a SaaS, marketplace, booking portal or back office in Madagascar.",
      "You want to accept Mobile Money without losing transaction statuses.",
      "You need a dashboard to check payments, refunds or orders.",
      "You want to connect payment, invoice, email, WhatsApp or manual validation.",
    ],
    outcomes: [
      {
        title: "Better payment traceability",
        description:
          "Each attempt has an ID, status, business reference and trace in the dashboard.",
      },
      {
        title: "Fewer disputes",
        description:
          "The customer sees a clear confirmation and the team can find the transaction without searching several tools.",
      },
      {
        title: "Usable back office",
        description:
          "Payments are linked to orders, bookings, subscriptions or invoices.",
      },
    ],
    problem: {
      title: "The fragile point: payment must speak to the business",
      paragraphs: [
        "An Orange Money, MVola or Airtel Money integration must associate every transaction with an order, customer, amount and server-side status. If the callback arrives late, arrives twice or contains an unknown status, the backend must remain idempotent and keep a readable trace for the team.",
        "In Madagascar, Mobile Money providers do not always share the same flows, API parameters, sandbox access or status labels. A reliable backend isolates each provider in an adapter, then exposes a common model to the app: created, pending, paid, failed, expired or manually reviewed.",
        "I build the integration as a product component: Node.js or Next.js backend, transaction table, webhook signature or secret verification, monitoring dashboard, notifications and documentation for the team operating payments daily.",
      ],
    },
    deliverables: {
      title: "What I can integrate",
      items: [
        {
          title: "Payment backend",
          description:
            "Payment intent creation, provider reference storage, Orange Money/MVola/Airtel API calls and server-side status handling.",
        },
        {
          title: "Callbacks and webhooks",
          description:
            "Secure endpoint to receive confirmations, verify data, replay safely and update the order without double validation.",
        },
        {
          title: "Test and provider mock mode",
          description:
            "Simulation of successful, failed, expired or ambiguous payments before full provider API access is available.",
        },
        {
          title: "Admin dashboard",
          description:
            "Payment view by status, search by customer, order, phone number or provider reference, and export if needed.",
        },
        {
          title: "Notifications",
          description:
            "Customer confirmation, team alert, transactional email or n8n workflow when human action is needed.",
        },
      ],
    },
    architecture: {
      title: "Typical architecture",
      intro:
        "The right architecture separates customer experience, payment backend, provider adapters and back office. That avoids validating a transaction only because the frontend displays it.",
      steps: [
        {
          title: "1. Payment intent",
          description:
            "The app creates an internal transaction with amount, currency, customer, order and target provider.",
        },
        {
          title: "2. Provider routing",
          description:
            "The backend selects Orange Money, MVola or Airtel Money, calls the API with expected parameters and stores the useful raw response.",
        },
        {
          title: "3. Secure callback",
          description:
            "The provider notifies the backend. The status is verified, then the order is updated server-side.",
        },
        {
          title: "4. Reconciliation",
          description:
            "The dashboard helps find successful, failed, expired or manually reviewed payments, then links them to the order or invoice.",
        },
      ],
    },
    safeguards: {
      title: "Important safeguards",
      items: [
        {
          title: "Idempotency",
          description:
            "A callback received twice must not create two validations or two deliveries.",
        },
        {
          title: "Webhook signature and secret",
          description:
            "The Mobile Money callback must be verified server-side to avoid confirmations invented or modified by the client.",
        },
        {
          title: "Server validation",
          description:
            "The frontend never decides alone that a payment succeeded. The database is updated server-side.",
        },
        {
          title: "Traceability",
          description:
            "Each status keeps a trace: date, provider, reference, useful payload and triggered action.",
        },
      ],
    },
    proofs: [
      {
        label: "PaidMada Mobile Money",
        href: "/en/projects/paidmada-mobile-money",
        description:
          "Project focused on Mobile Money payment in Madagascar: MVola, Orange Money and Airtel Money.",
      },
      {
        label: "Hire a Node.js Developer in Madagascar",
        href: "/en/services/hire-nodejs-developer-madagascar",
        description:
          "Backend APIs, webhooks, security, real-time flows and provider integrations.",
      },
      {
        label: "Next.js & Supabase Developer",
        href: "/en/services/nextjs-supabase-developer-madagascar",
        description:
          "For the full app: auth, dashboard, database and admin interface.",
      },
    ],
    sources: [
      {
        label: "Orange Money Web Payment",
        href: "https://developer.orange.com/apis/om-webpay",
        description:
          "Official Orange Money Web Payment API, with Madagascar listed among supported countries.",
      },
      {
        label: "MVola Developer Portal",
        href: "https://developer.mvola.mg/devportal/",
        description:
          "MVola developer portal for API documentation and access.",
      },
      {
        label: "Airtel Africa Developer Portal",
        href: "https://developers.airtel.africa/developer",
        description:
          "Airtel developer portal for APIs and Mobile Money integrations by country.",
      },
    ],
    relatedServices: [
      {
        label: "Hire a Node.js Developer in Madagascar",
        href: "/en/services/hire-nodejs-developer-madagascar",
        description:
          "REST APIs, webhooks, authentication, provider integration and backend logic.",
      },
      {
        label: "React & Next.js Developer",
        href: "/en/services/hire-react-nextjs-developer-madagascar",
        description:
          "Customer interface, admin dashboard, payment pages and confirmation screens.",
      },
    ],
    faq: [
      {
        question: "How do you integrate the Orange Money API in Madagascar?",
        answer:
          "To integrate the Orange Money API in Madagascar, first get provider access, create a payment intent server-side, store the internal reference, receive the Orange Money callback, verify the server status and update the order. The frontend should only display final confirmation after backend validation.",
      },
      {
        question: "Can Orange Money, MVola and Airtel Money be integrated into one app?",
        answer:
          "Yes. The right approach is to treat Orange Money, MVola and Airtel Money as three provider adapters, then expose a shared model to the application: amount, currency, customer, order, status, provider reference and callback history.",
      },
      {
        question: "How should a Mobile Money callback be secured?",
        answer:
          "A Mobile Money callback should be received on a server endpoint, verified with the mechanism provided by the operator, logged and processed idempotently. Even if the same callback arrives twice, the order should be validated only once.",
      },
      {
        question: "Do Mobile Money payments need an admin dashboard?",
        answer:
          "Yes, especially for a business application. The dashboard lets the team search payments by customer, phone number, order or provider reference, identify ambiguous statuses and reconcile payments with invoices or bookings.",
      },
    ],
    cta: {
      title: "Want to connect Mobile Money to your product?",
      description:
        "We can frame the payment journey, target providers, statuses, dashboard and reconciliation logic before writing the backend.",
      buttonLabel: "Scope my payment integration",
    },
  },
  {
    slug: "facebook-ai-agent",
    icon: "forum",
    accent: "blue",
    title: "Facebook AI agent for Messenger leads, support and CRM",
    eyebrow: "Facebook AI agent solution",
    seoTitle: "Facebook AI Agent | Messenger, leads, CRM and n8n",
    seoDescription:
      "Facebook AI agent to qualify Messenger conversations, prepare replies, create CRM leads and orchestrate controlled follow-up workflows with n8n.",
    primaryKeyword: "Facebook AI agent",
    secondaryKeywords: [
      "Messenger AI agent",
      "Facebook Messenger automation",
      "Facebook lead qualification",
      "Facebook AI chatbot",
      "Facebook CRM n8n",
      "Facebook AI customer support",
    ],
    shortAnswer:
      "A Facebook AI agent processes Messenger messages, comments or Meta forms to identify intent, summarize the need and prepare the next action. It can create or update a CRM lead, suggest a reply and hand sensitive cases to a human. I connect Facebook, AI, n8n and business tools with explicit rules, a verifiable history and human approval where it matters.",
    heroLead:
      "Turn Facebook conversations into qualified requests without letting an AI reply alone to important customers or sensitive situations.",
    fit: [
      "Your Facebook page receives messages the team handles too late.",
      "You lose context between Messenger, Meta forms and your CRM.",
      "You want to separate sales, support, spam and urgent requests automatically.",
      "You need faster reply drafts while keeping human approval.",
    ],
    outcomes: [
      {
        title: "Better prioritized replies",
        description:
          "Each conversation receives an intent, urgency level and next action visible to the team.",
      },
      {
        title: "Usable leads",
        description:
          "Name, need, product, budget, urgency and source are structured before the CRM is updated.",
      },
      {
        title: "Preserved context",
        description:
          "The original message, AI summary, decision and approving person remain traceable.",
      },
    ],
    problem: {
      title: "A useful Facebook AI agent starts by triaging, not talking",
      paragraphs: [
        "A Messenger inbox often mixes several intents: pricing questions, bookings, order issues, public comments, spam and conversations without a sales goal. Automatically answering all of them in the same tone creates risk and damages trust.",
        "The agent's first job is qualification. It detects language and intent, extracts useful information, summarizes the conversation and applies your rules: simple reply, draft for approval, lead creation, support ticket or immediate human handoff.",
        "This architecture saves time without hiding AI limitations. Complaints, payments, refunds and commercial promises remain controlled by the team.",
      ],
    },
    deliverables: {
      title: "What I can build",
      items: [
        {
          title: "Messenger qualification",
          description:
            "Sales, support, urgency or spam classification with a short summary and structured business fields.",
        },
        {
          title: "Reply drafts",
          description:
            "Answers prepared from your offers, FAQs and brand rules, then approved before sending when required.",
        },
        {
          title: "CRM connection",
          description:
            "Contact creation or update with Facebook source, status, score, owner and next action.",
        },
        {
          title: "Operations dashboard",
          description:
            "View of open conversations, hot requests, blocked cases, handling time and actions to resume.",
        },
      ],
    },
    architecture: {
      title: "Typical Messenger AI agent architecture",
      intro:
        "The integration separates the Meta channel, AI decision and business action. A model or CRM outage must never lose the original message.",
      steps: [
        {
          title: "1. Meta event",
          description:
            "A webhook receives the authorized message, comment or lead with its identifier and context.",
        },
        {
          title: "2. AI qualification",
          description:
            "Text is classified, summarized and converted into stable data: intent, urgency, need and confidence.",
        },
        {
          title: "3. Business rules",
          description:
            "n8n routes the request to a draft, CRM record, support ticket, alert or human owner.",
        },
        {
          title: "4. Action and trace",
          description:
            "Each decision, reply and status change is recorded so the workflow can be reviewed and improved.",
        },
      ],
    },
    safeguards: {
      title: "Safeguards that protect customer relationships",
      items: [
        {
          title: "Human approval",
          description:
            "Complaints, negotiated prices, refunds and commercial commitments go through a person.",
        },
        {
          title: "Minimum data",
          description:
            "The workflow retains only useful fields and respects the Meta permissions granted to the app.",
        },
        {
          title: "Failure recovery",
          description:
            "The message is logged before external calls and can be replayed if AI, n8n or the CRM fails.",
        },
      ],
    },
    proofs: [
      {
        label: "Facebook AI Agent project",
        href: "/en/projects/facebook-agen-ia",
        description:
          "Case study covering conversation qualification, scoring, dashboard and controlled sales actions.",
      },
      {
        label: "AI prospecting agent solution",
        href: "/en/solutions/ai-prospecting-agent",
        description:
          "A broader pipeline for enriching, scoring and following leads in the CRM.",
      },
    ],
    sources: [
      {
        label: "Meta Messenger Platform",
        href: "https://developers.facebook.com/docs/messenger-platform/",
        description:
          "Official documentation for Messenger integrations, access, messages and events.",
      },
      {
        label: "Meta Graph API Webhooks",
        href: "https://developers.facebook.com/docs/graph-api/webhooks/",
        description:
          "Official documentation for receiving and verifying Meta events server-side.",
      },
    ],
    relatedServices: [
      {
        label: "AI Agent Developer",
        href: "/en/services/ai-agent-developer-madagascar",
        description:
          "Design of agents connected to business tools, data and operating rules.",
      },
      {
        label: "n8n Automation Expert",
        href: "/en/services/n8n-automation-expert-madagascar",
        description:
          "Orchestration of webhooks, CRM records, alerts, approvals and failure recovery.",
      },
    ],
    faq: [
      {
        question: "What can a Facebook AI agent do?",
        answer:
          "It can qualify a message or comment, detect intent, summarize the need, prepare a reply, create a CRM lead and hand sensitive cases to a human.",
      },
      {
        question: "What is the difference between a chatbot and a Facebook AI agent?",
        answer:
          "A chatbot mainly follows a reply tree. An AI agent can interpret free text, use context and trigger a business action, but it still needs explicit rules and approvals.",
      },
      {
        question: "Can Facebook Messenger connect to n8n and a CRM?",
        answer:
          "Yes, depending on available Meta access. A webhook feeds n8n, which can enrich the request and create or update a contact in HubSpot, Airtable, Supabase, Google Sheets or an internal API.",
      },
      {
        question: "Should the agent answer every message automatically?",
        answer:
          "No. A safer starting point is to automate qualification and drafts, then allow only a few simple replies after their quality has been measured.",
      },
      {
        question: "How much does a Facebook AI agent connected to n8n cost?",
        answer:
          "Cost depends on Meta access, the number of intents, the CRM and the automation level. A measurable first scope usually includes one Messenger source, a few intents, CRM creation, reply drafts and human approval.",
      },
    ],
    cta: {
      title: "Want to handle Facebook messages more effectively?",
      description:
        "We can start with a measurable scope: one Messenger source, four intents, one CRM and human approval before sensitive replies.",
      buttonLabel: "Scope my Facebook agent",
    },
  },
  {
    slug: "ai-prospecting-agent",
    icon: "travel_explore",
    accent: "purple",
    title: "AI prospecting agent: lead qualification, CRM and n8n follow-ups",
    eyebrow: "AI prospecting solution",
    seoTitle: "AI Prospecting Agent | Leads, Facebook, CRM and n8n",
    seoDescription:
      "AI prospecting agent to qualify leads, process Facebook/forms, score ICP fit, prepare drafts, sync CRM records and run controlled n8n follow-ups.",
    primaryKeyword: "AI prospecting agent",
    secondaryKeywords: [
      "AI prospecting automation",
      "Facebook AI agent",
      "lead qualification n8n",
      "AI lead qualification agent",
      "sales prospecting workflow",
      "AI CRM agent",
    ],
    shortAnswer:
      "An AI prospecting agent qualifies leads before human outreach: it collects the source, cleans data, summarizes the company, applies an ICP score and prepares a message angle. The useful case is not automated spam; it is clean handling of forms, Facebook messages, CRM exports or approved lead lists. I connect the agent to n8n, the CRM and sales rules to produce prioritized leads, verifiable drafts and controlled follow-ups.",
    heroLead:
      "The objective is not to send more random messages. The objective is to choose who to contact, why, with which angle and with which trace in the CRM.",
    fit: [
      "You have leads but not enough context to prioritize them.",
      "Your sales team spends too much time cleaning data.",
      "You want personalized drafts without losing control of sending.",
      "You need a workflow that respects your ICP, rules and sending limits.",
    ],
    outcomes: [
      {
        title: "Better qualified leads",
        description:
          "Each prospect can receive a segment, score, reason to contact and short summary.",
      },
      {
        title: "Cleaner CRM",
        description:
          "Data is normalized before entering the CRM, with deduplication and useful fields.",
      },
      {
        title: "More human prospecting",
        description:
          "AI prepares angles and drafts, while humans validate messages and timing.",
      },
    ],
    problem: {
      title: "AI prospecting should remain an assistant, not a spam machine",
      paragraphs: [
        "An AI prospecting agent should automate research, sorting, context and preparation, not replace commercial judgment. The best output is a qualified lead with a clear reason to contact, short summary, score and next action.",
        "A Facebook AI agent can process Messenger messages, comments or Meta Lead Ads forms when API access and consent are framed. The agent can classify the request, detect intent, prepare a reply or create a CRM record, while sensitive cases stay under human validation.",
        "I start by defining the ICP: company type, buying signals, country, industry, size, tools used, likely budget and rejection reasons. Then the workflow can search, enrich, score and sync leads.",
        "Sensitive parts stay framed: source compliance, sending frequency, duplicate exclusion, opt-out, human validation and CRM history.",
      ],
    },
    deliverables: {
      title: "What the workflow can produce",
      items: [
        {
          title: "Collection and enrichment",
          description:
            "CSV import, form, API, authorized scraping or business source, then enrichment and cleaning.",
        },
        {
          title: "Facebook and form qualification",
          description:
            "Message, comment or Meta lead triage, intent detection, useful summary and creation of a sales action.",
        },
        {
          title: "AI scoring",
          description:
            "Score based on your ICP, short justification, positive signals and reasons not to contact.",
        },
        {
          title: "Personalized drafts",
          description:
            "Email, LinkedIn message or sales note prepared from verifiable data.",
        },
        {
          title: "CRM sync",
          description:
            "Contact creation or update, tags, status, next action and summary for the team.",
        },
      ],
    },
    architecture: {
      title: "Typical architecture",
      intro:
        "The workflow must be auditable. Every score and every message should come from data the team can verify.",
      steps: [
        {
          title: "1. Lead source",
          description:
            "Existing list, form, public database, CRM export or source approved by your team.",
        },
        {
          title: "2. Cleaning",
          description:
            "Deduplication, email validation, normalization of names, industries and URLs.",
        },
        {
          title: "3. AI analysis",
          description:
            "Company summary, ICP score, contact angle and caution flags.",
        },
        {
          title: "4. Controlled action",
          description:
            "CRM update, message draft, sales notification or follow-up sequence with validation.",
        },
      ],
    },
    safeguards: {
      title: "Sales and quality safeguards",
      items: [
        {
          title: "No invented claims",
          description:
            "Messages must rely on real signals, not generic AI compliments.",
        },
        {
          title: "Respect exclusions",
          description:
            "No-contact lists, opt-outs, existing customers, competitors or excluded industries are filtered.",
        },
        {
          title: "Human validation",
          description:
            "For sensitive campaigns, AI prepares and a human decides the final send.",
        },
      ],
    },
    proofs: [
      {
        label: "Facebook AI Agent",
        href: "/en/projects/facebook-agen-ia",
        description:
          "AI agent dashboard connected to Facebook to qualify conversations and structure sales actions.",
      },
      {
        label: "Lead workflow showcase",
        href: "/en/projects/leads-automation-showcase",
        description:
          "n8n pipeline demo for lead generation, qualification and CRM synchronization.",
      },
      {
        label: "Scraping FlowRemote",
        href: "/en/projects/scraping-flowremote",
        description:
          "Automated multi-source extraction, filtering and daily notification.",
      },
      {
        label: "n8n Automation Expert",
        href: "/en/services/n8n-automation-expert-madagascar",
        description:
          "Technical foundation to orchestrate sources, AI, CRM, emails and reporting.",
      },
    ],
    sources: [
      {
        label: "Google AI optimization",
        href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
        description:
          "Reference for producing clear, useful content that AI-enhanced search systems can understand.",
      },
      {
        label: "n8n AI agents",
        href: "https://n8n.io/ai-agents/",
        description:
          "Official basis for thinking about AI agents as tool-enabled workflows, not isolated answers.",
      },
    ],
    relatedServices: [
      {
        label: "n8n Automation Expert",
        href: "/en/services/n8n-automation-expert-madagascar",
        description:
          "Business workflow automation, API integrations and data orchestration.",
      },
      {
        label: "AI Agent Developer",
        href: "/en/services/ai-agent-developer-madagascar",
        description:
          "AI agents that classify, summarize, decide and prepare business actions.",
      },
    ],
    faq: [
      {
        question: "What is the role of an AI prospecting agent?",
        answer:
          "An AI prospecting agent qualifies and prepares sales work: lead collection, cleaning, enrichment, ICP scoring, summary, contact angle and CRM synchronization. Automatic sending is only one option and should be kept for tightly framed campaigns.",
      },
      {
        question: "Can a Facebook AI agent qualify inquiries?",
        answer:
          "Yes, if Meta access, privacy rules and scenarios are defined. The agent can read a Facebook inquiry, detect intent, classify the lead, prepare a reply and create a CRM record with a next action.",
      },
      {
        question: "Can an AI agent send prospecting messages automatically?",
        answer:
          "Technically yes, but I recommend starting with human validation. Quality, deliverability and brand reputation matter more than uncontrolled volume.",
      },
      {
        question: "Can this workflow connect to HubSpot, Airtable or Google Sheets?",
        answer:
          "Yes. n8n can sync data with a CRM, Airtable, Google Sheets, Notion or a custom API.",
      },
      {
        question: "How do we avoid duplicates in the CRM?",
        answer:
          "The workflow can check email, domain, company name and internal IDs before creating or updating a contact.",
      },
    ],
    cta: {
      title: "Want to qualify leads without spamming?",
      description:
        "We can define your ICP, accepted sources, CRM fields and human validation level before building the agent.",
      buttonLabel: "Scope my prospecting agent",
    },
  },
  {
    slug: "n8n-claude-code-workflows",
    icon: "terminal",
    accent: "indigo",
    title: "n8n + Claude Code workflows: automate AI-assisted development",
    eyebrow: "Claude Code + n8n solution",
    seoTitle: "Claude Code n8n | AI Workflows, MCP and Git",
    seoDescription:
      "Claude Code n8n workflows for tickets, audits, reporting and content with repo context, MCP, logs, human validation and Git-based review.",
    primaryKeyword: "Claude Code n8n",
    secondaryKeywords: [
      "n8n Claude Code workflow",
      "Claude Code n8n automation",
      "freelance Claude Code developer",
      "MCP n8n Claude",
    ],
    shortAnswer:
      "A Claude Code n8n workflow connects a business or technical trigger to a controlled AI task: ticket preparation, audit, log summary, reporting, SEO/GEO content or developer support. n8n gathers context, Claude Code or Codex prepares a proposal, then Git, logs and human validation keep control over risky actions. This architecture is most useful when AI must work with a repository, tickets, Supabase data or internal documents.",
    heroLead:
      "Claude Code is powerful when it works with repository context. n8n becomes useful when it triggers, prepares, archives and notifies around that work.",
    fit: [
      "You already use Claude Code, Codex or LLMs in production.",
      "You want to automate repetitive tasks around code, tickets or content.",
      "You need logs and validation before an AI action touches production.",
      "You want to connect GitHub, Notion, Slack, Supabase, email, CRM or internal APIs.",
    ],
    outcomes: [
      {
        title: "Less repetitive developer work",
        description:
          "Ticket preparation, log summaries, reports, review checklists and technical drafts.",
      },
      {
        title: "Better traceability",
        description:
          "Each AI action has an input, output, context, date and human owner.",
      },
      {
        title: "Better-framed AI",
        description:
          "Prompts, context files and execution rules are versioned or documented.",
      },
    ],
    problem: {
      title: "AI-assisted development needs a system around the tool",
      paragraphs: [
        "Claude Code can accelerate development, but a Claude Code n8n workflow must define the trigger, context, expected output and human validator. Without that frame, AI produces useful one-off answers that are hard to industrialize.",
        "n8n can act as the orchestrator: retrieve a ticket, read data, prepare a prompt, call a model, store the result, notify the team and create a validation task. With MCP, the workflow can also expose precise tools to the agent instead of giving vague access.",
        "I build these workflows as extensions of how your team works, not as a gimmick. Code stays in Git, secrets stay in the right environments, and risky actions stay human-controlled.",
      ],
    },
    deliverables: {
      title: "Concrete use cases",
      items: [
        {
          title: "Ticket preparation",
          description:
            "Turn a client request into a technical brief: context, likely files, risks and acceptance criteria.",
        },
        {
          title: "Technical reporting",
          description:
            "Summarize logs, errors, analytics or user feedback, then send an actionable report.",
        },
        {
          title: "Content + SEO workflow",
          description:
            "Prepare briefs, FAQ, internal links and JSON-LD elements before editorial validation.",
        },
        {
          title: "MCP orchestration",
          description:
            "Define which tools, data or endpoints the agent can use, with limits, logs and validation before sensitive actions.",
        },
        {
          title: "Maintenance support",
          description:
            "Create review checklists, detect likely regressions and document changes.",
        },
      ],
    },
    architecture: {
      title: "Typical architecture",
      intro:
        "The principle: n8n orchestrates events and Claude Code intervenes only when the context is sufficient.",
      steps: [
        {
          title: "1. Trigger",
          description:
            "New ticket, GitHub comment, client form, server error, content request or scheduled task.",
        },
        {
          title: "2. Context",
          description:
            "n8n gathers useful information: URL, logs, description, files, Supabase data or internal docs.",
        },
        {
          title: "3. AI work",
          description:
            "Claude Code or an LLM produces a proposal: brief, summary, patch to review, checklist or answer.",
        },
        {
          title: "4. Validation",
          description:
            "The team receives the output with sources and decides to publish, edit, reject or create a task.",
        },
      ],
    },
    safeguards: {
      title: "Safeguards to avoid breaking production",
      items: [
        {
          title: "Validation before mutation",
          description:
            "Workflows can prepare code or text, but publishing or merging remains controlled.",
        },
        {
          title: "Secrets out of prompts",
          description:
            "API keys, tokens and sensitive variables must not be sent into prompts.",
        },
        {
          title: "Git traceability",
          description:
            "Useful changes go through Git, review, build and tests, not invisible edits.",
        },
      ],
    },
    proofs: [
      {
        label: "Claude Code + n8n Developer",
        href: "/en/services/claude-code-n8n-developer",
        description:
          "Dedicated service for combining Claude Code, n8n workflows and web production.",
      },
      {
        label: "Claude Code article",
        href: "/en/blog/claude-code-developper-avec-ia",
        description:
          "Experience report on AI-assisted development and the limits that need framing.",
      },
      {
        label: "Factumation",
        href: "/en/projects/factumation",
        description:
          "Product delivered quickly with Claude Code, a concrete base to discuss method and safeguards.",
      },
    ],
    sources: [
      {
        label: "Google generative AI content",
        href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content",
        description:
          "Important reference: AI-generated or AI-assisted content must remain useful, original and controlled.",
      },
      {
        label: "Google structured data",
        href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
        description:
          "Basis for making pages explicit with visible FAQ, breadcrumb and structured data.",
      },
    ],
    relatedServices: [
      {
        label: "Claude Code + n8n Developer",
        href: "/en/services/claude-code-n8n-developer",
        description:
          "Automation and products built with Claude Code, n8n, Next.js and Supabase.",
      },
      {
        label: "SEO + GEO Consultant",
        href: "/en/services/seo-geo-consultant",
        description:
          "Structure pages for Google, AI Overviews and answer engines.",
      },
    ],
    faq: [
      {
        question: "Can Claude Code be triggered automatically by n8n?",
        answer:
          "Yes, depending on the environment and available tools, n8n can prepare context, create a task, notify a human or call an AI API. For code actions, I recommend Claude Code produces a controlled proposal, then a human validates the patch through Git, build and tests.",
      },
      {
        question: "What is MCP used for in an n8n Claude workflow?",
        answer:
          "MCP exposes structured tools to the AI agent: data reads, limited actions, search or business commands. In an n8n Claude workflow, MCP avoids vague prompts by giving the agent precise, logged and easier-to-limit capabilities.",
      },
      {
        question: "Which workflows are useful with Claude Code?",
        answer:
          "Ticket preparation, content audit, log summary, checklist generation, change documentation and maintenance assistance are good first cases.",
      },
      {
        question: "Can Codex be used instead of Claude Code?",
        answer:
          "Yes. The same principle applies: n8n orchestrates, AI produces a proposal, and humans validate actions that touch code or production.",
      },
    ],
    cta: {
      title: "Want to industrialize your Claude Code usage?",
      description:
        "We can start with a simple workflow: one trigger, one context package, one AI output, one human validation step and one trace.",
      buttonLabel: "Design my AI workflow",
    },
  },
  {
    slug: "ai-voice-agent-developer",
    icon: "call",
    accent: "emerald",
    title: "AI voice agent developer: inbound calls, qualification and bookings",
    eyebrow: "AI voice agent solution",
    seoTitle: "AI Voice Agent Developer | Calls, Qualification and Bookings",
    seoDescription:
      "AI voice agent developer for inbound calls, customer qualification, appointment booking, follow-ups and human handoff with ElevenLabs, Twilio and n8n.",
    primaryKeyword: "AI voice agent developer",
    secondaryKeywords: [
      "AI voice agent",
      "AI phone agent",
      "ElevenLabs voice agent",
      "voice AI for business",
    ],
    shortAnswer:
      "An AI voice agent answers phone calls, qualifies the request, asks the right questions, can prepare a booking and escalates sensitive cases to a human. I build it with a framed script, knowledge base, logs, webhooks and n8n/CRM integration.",
    heroLead:
      "The real goal is not to make AI speak on the phone. The real goal is to stop missing useful calls while keeping human handoff when the request becomes sensitive.",
    fit: [
      "You miss calls because the team is busy, on-site or outside opening hours.",
      "Prospects often ask the same questions before requesting a quote or booking.",
      "You want to qualify requests before calling back: need, budget, urgency, location and contact details.",
      "You need a voice agent connected to your CRM, calendar, WhatsApp, email or n8n workflow.",
    ],
    outcomes: [
      {
        title: "Fewer missed calls",
        description:
          "The agent can welcome inbound calls, collect key information and notify the team with an actionable summary.",
      },
      {
        title: "Better qualified requests",
        description:
          "Each call can produce a reason, urgency level, contact record and next action.",
      },
      {
        title: "Cleaner bookings",
        description:
          "The agent can prepare or book a slot according to your rules, then confirm by email, SMS or internal notification.",
      },
    ],
    problem: {
      title: "A customer call is often the moment with the strongest intent",
      paragraphs: [
        "When someone calls, they usually want a fast answer: price, availability, booking, quote, support or urgent help. If nobody answers, the request can go to a competitor or get stuck in voicemail.",
        "An AI voice agent can handle repetitive requests and collect context before a human takes over. It should not improvise: its job is to welcome, clarify, qualify, summarize and transfer when the decision needs a person.",
        "I build the agent as a business workflow: call script, handoff rules, knowledge base, connected tools, logging, tests on real scenarios and improvement after the first calls.",
      ],
    },
    deliverables: {
      title: "What I can deliver",
      items: [
        {
          title: "Framed voice script",
          description:
            "Greeting, qualification questions, allowed answers, refusal phrases and human handoff rules.",
        },
        {
          title: "ElevenLabs agent or Twilio telephony",
          description:
            "Voice experience, webhooks, call events and the tools the agent can use.",
        },
        {
          title: "Post-call n8n workflow",
          description:
            "Call summary, CRM creation, WhatsApp/email notification, calendar action or callback request.",
        },
        {
          title: "Dashboard and logs",
          description:
            "Call history, status, reason, result, qualification score and next action for the team.",
        },
      ],
    },
    architecture: {
      title: "Typical architecture",
      intro:
        "I separate voice, business logic and actions. The agent speaks, but important decisions stay in controlled rules and workflows.",
      steps: [
        {
          title: "1. Inbound call",
          description:
            "A phone number receives the call and triggers the voice agent with the right greeting.",
        },
        {
          title: "2. Qualification",
          description:
            "The agent collects name, contact, need, urgency, area, budget or preferred slot.",
        },
        {
          title: "3. Business action",
          description:
            "n8n or the backend creates a record, notifies the team, prepares a booking or transfers to a human.",
        },
        {
          title: "4. Trace and improvement",
          description:
            "Each call leaves a summary, status and signals to adjust the script when needed.",
        },
      ],
    },
    safeguards: {
      title: "Required safeguards",
      items: [
        {
          title: "Clear human handoff",
          description:
            "The agent must know when to transfer or promise a callback when the request goes beyond its scope.",
        },
        {
          title: "No risky promises",
          description:
            "Final price, sensitive diagnosis, contractual commitment or commercial decision can remain human-controlled.",
        },
        {
          title: "Consent and transparency",
          description:
            "The call journey must stay clear for the caller, with clean handling of data collected during the call.",
        },
      ],
    },
    proofs: [
      {
        label: "AI Voice Agent Developer",
        href: "/en/services/ai-voice-agent-developer",
        description:
          "Dedicated service for AI voice agents with ElevenLabs, Twilio, qualification and business workflows.",
      },
      {
        label: "AI Agent Developer",
        href: "/en/services/ai-agent-developer-madagascar",
        description:
          "The same agentic logic applied to support, qualification and business actions.",
      },
      {
        label: "n8n Automation Expert",
        href: "/en/services/n8n-automation-expert-madagascar",
        description:
          "To connect calls to CRM, calendars, notifications and reporting.",
      },
    ],
    sources: [
      {
        label: "ElevenLabs agents",
        href: "https://elevenlabs.io/docs/eleven-agents/overview",
        description:
          "Official documentation for building, launching and monitoring conversational agents.",
      },
      {
        label: "ElevenLabs post-call webhooks",
        href: "https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks",
        description:
          "Reference for receiving useful call information after analysis is complete.",
      },
      {
        label: "Twilio Voice webhooks",
        href: "https://www.twilio.com/docs/usage/webhooks/voice-webhooks",
        description:
          "Official documentation for inbound and outbound Twilio Voice callbacks.",
      },
    ],
    relatedServices: [
      {
        label: "AI Voice Agent Developer",
        href: "/en/services/ai-voice-agent-developer",
        description:
          "The main service page for scoping a complete AI voice agent.",
      },
      {
        label: "Hire a Node.js Developer in Madagascar",
        href: "/en/services/hire-nodejs-developer-madagascar",
        description:
          "For webhooks, APIs, dashboards and server integrations around calls.",
      },
    ],
    faq: [
      {
        question: "Can an AI voice agent book appointments?",
        answer:
          "Yes, if the rules are clear: available hours, duration, area, request type and possible validation. The agent can also prepare the booking without confirming it automatically.",
      },
      {
        question: "Can the call be transferred to a human?",
        answer:
          "Yes. Human handoff is one of the important safeguards, especially for urgent cases, sensitive requests or high-value customers.",
      },
      {
        question: "Do we need Twilio, ElevenLabs or both?",
        answer:
          "It depends on the journey. ElevenLabs can handle the conversational agent, Twilio can handle telephony and webhooks. I choose the architecture based on country, phone number, costs and required integrations.",
      },
    ],
    cta: {
      title: "Want to answer calls without hiring a receptionist?",
      description:
        "We can start with a simple agent: greeting, qualification, summary, team notification and human handoff for sensitive cases.",
      buttonLabel: "Scope my voice agent",
    },
  },
  {
    slug: "n8n-marketing-automation",
    icon: "campaign",
    accent: "purple",
    title: "n8n marketing automation: leads, CRM, email and reporting",
    eyebrow: "Marketing automation solution",
    seoTitle: "n8n Marketing Automation | CRM, Email and Reporting",
    seoDescription:
      "n8n marketing automation for forms, CRM, segmentation, email, follow-ups and reporting. Measurable workflows with human approval where it matters.",
    primaryKeyword: "n8n marketing automation",
    secondaryKeywords: [
      "marketing automation for SMBs",
      "n8n marketing workflow",
      "CRM email automation",
      "n8n lead nurturing",
      "automated marketing reporting",
    ],
    shortAnswer:
      "An n8n marketing automation workflow connects your forms, CRM, email tools and campaign data. A lead is cleaned, deduplicated, segmented and sent to the right sequence. Replies, unsubscribes and conversions return to the CRM, while a report shows which campaigns produce real requests. Your team keeps control over messages, audiences and commercial decisions.",
    heroLead:
      "A lead should not wait in a form, disappear into a spreadsheet or receive a follow-up with no context. n8n connects each step and leaves a trace your team can use.",
    fit: [
      "Your forms, campaigns, emails and CRM data live in separate tools.",
      "Leads are handled late or followed up without their source and intent.",
      "Your team still assembles marketing reports manually in spreadsheets.",
      "You want to automate follow-up without sending unsolicited messages or losing editorial control.",
    ],
    outcomes: [
      {
        title: "Faster lead handling",
        description:
          "Each request is validated, deduplicated, enriched and assigned to the right segment as soon as it arrives.",
      },
      {
        title: "Better context in messages",
        description:
          "Source, landing page, requested offer and CRM status determine the proposed sequence and content.",
      },
      {
        title: "Useful reporting",
        description:
          "Campaigns, replies, meetings and conversions come together in a readable report without a weekly manual export.",
      },
    ],
    problem: {
      title: "The problem is not a lack of tools, but the handoffs between them",
      paragraphs: [
        "A common marketing journey starts with an ad, content page or form. The request then lands in an inbox, spreadsheet or CRM. If nobody picks it up quickly, context disappears: unknown source, duplicates, poor segmentation and late follow-up.",
        "n8n acts as the orchestration layer. It receives the event, normalizes fields, checks consent and exclusions, updates the CRM, triggers an allowed action and logs the result. It does not replace your CRM or email platform; it removes copy and paste between them.",
        "I keep marketing automation separate from cold prospecting. This page covers inbound leads, authorized contacts and journeys your company can explain. For research, scoring and sales preparation, the [AI prospecting agent](/en/solutions/ai-prospecting-agent) page describes a different workflow with its own safeguards.",
      ],
    },
    deliverables: {
      title: "Marketing workflows I can build",
      items: [
        {
          title: "Form to CRM",
          description:
            "Capture, validation, deduplication, source attribution, contact create/update and team notification.",
        },
        {
          title: "Segmentation and nurturing",
          description:
            "Routing by offer, country, profile or action, followed by preparation of the appropriate email sequence.",
        },
        {
          title: "Controlled follow-ups",
          description:
            "Reminders after a request, quote or meeting, stopped automatically after a reply, conversion or unsubscribe.",
        },
        {
          title: "Campaign reporting",
          description:
            "Summary of sources, leads, replies, meetings and conversions in Supabase, Sheets, Looker Studio or an internal dashboard.",
        },
        {
          title: "Sales alerts",
          description:
            "Immediate notification when a priority lead replies, visits a key page or explicitly requests a conversation.",
        },
      ],
    },
    architecture: {
      title: "Architecture of a measurable marketing workflow",
      intro:
        "Every step needs a known input, a simple rule and a verifiable output. The CRM stays the source of truth while n8n carries events between tools.",
      steps: [
        {
          title: "1. Capture",
          description:
            "Form, product event, signup, campaign or inbound request with source and consent.",
        },
        {
          title: "2. Data quality",
          description:
            "Validation, normalization, deduplication, exclusion checks and matching with an existing contact.",
        },
        {
          title: "3. Orchestration",
          description:
            "CRM update, segmentation, draft or authorized send, sales task and controlled delays between steps.",
        },
        {
          title: "4. Measurement",
          description:
            "Reply, click, meeting, conversion, error or unsubscribe returns to the CRM and reporting layer.",
        },
      ],
    },
    safeguards: {
      title: "Marketing and data safeguards",
      items: [
        {
          title: "Consent and exclusions",
          description:
            "Unsubscribe lists, existing customers, excluded contacts and frequency rules are checked before any action.",
        },
        {
          title: "Error recovery",
          description:
            "An API failure creates an alert and retry path. The same event must not create two contacts or two sends.",
        },
        {
          title: "Editorial approval",
          description:
            "Sequences, audiences and promises are approved by the team. AI can prepare a draft, not invent an offer.",
        },
      ],
    },
    proofs: [
      {
        label: "Leads Automation",
        href: "/en/projects/leads-automation-showcase",
        description:
          "Lead collection, qualification and CRM synchronization pipeline with n8n.",
      },
      {
        label: "Visitor Tracking",
        href: "/en/projects/visitor-tracking",
        description:
          "Event collection, Supabase storage and alerts for useful customer journeys.",
      },
      {
        label: "Facebook AI Agent",
        href: "/en/projects/facebook-agen-ia",
        description:
          "Case study on turning Facebook conversations into verifiable sales actions.",
      },
    ],
    sources: [
      {
        label: "n8n integrations catalog",
        href: "https://n8n.io/integrations/",
        description:
          "Official reference for available CRM, email, analytics and database connectors.",
      },
      {
        label: "n8n error handling",
        href: "https://docs.n8n.io/flow-logic/error-handling/",
        description:
          "Official guidance for alerts, retry paths and workflow logging.",
      },
    ],
    relatedServices: [
      {
        label: "n8n automation for SMBs",
        href: "/en/solutions/n8n-automation-for-smbs",
        description:
          "For invoicing, operations, notifications and back-office automation beyond marketing.",
      },
      {
        label: "n8n automation expert",
        href: "/en/services/n8n-automation-expert-madagascar",
        description:
          "Main service for scoping, building, hosting and maintaining your workflows.",
      },
      {
        label: "AI prospecting agent",
        href: "/en/solutions/ai-prospecting-agent",
        description:
          "For enrichment, scoring and sales preparation before human approval.",
      },
    ],
    faq: [
      {
        question: "What can n8n automate in marketing?",
        answer:
          "n8n can connect forms, CRM, email, advertising, analytics and reporting: contact creation, segmentation, follow-ups, alerts, status synchronization and campaign reports.",
      },
      {
        question: "Does n8n replace HubSpot, Brevo or Mailchimp?",
        answer:
          "No. Those tools remain the systems your team uses. n8n automates data movement and simple decisions between them.",
      },
      {
        question: "Can conversions be measured in the same workflow?",
        answer:
          "Yes. Replies, meetings, purchases or other conversions can return to the CRM and feed a dashboard. A source of truth and stable identifiers should be defined first.",
      },
      {
        question: "Can AI write and send emails automatically?",
        answer:
          "It can prepare drafts from verifiable data. For important campaigns, I recommend human approval of the message and audience before sending.",
      },
    ],
    cta: {
      title: "Does your marketing journey break between two tools?",
      description:
        "Send me the form, CRM, email platform and report you use today. I will identify the steps worth automating and the ones that should stay human.",
      buttonLabel: "Map my marketing journey",
    },
  },
];

const solutionsByLocale: Record<Locale, Solution[]> = {
  fr: frSolutions,
  en: enSolutions,
};

const serviceToSolutionSlugs: Record<string, string[]> = {
  "automatisation-n8n": [
    "automatisation-n8n-pme",
    "automatisation-marketing-n8n",
    "agent-ia-prospection",
  ],
  "automatisation-n8n-madagascar": [
    "automatisation-n8n-pme",
    "automatisation-marketing-n8n",
    "agent-ia-prospection",
    "workflows-n8n-claude-code",
  ],
  "consultant-automatisation-n8n-international": [
    "automatisation-n8n-pme",
    "automatisation-marketing-n8n",
    "agent-ia-prospection",
    "workflows-n8n-claude-code",
  ],
  "developpeur-agent-ia-madagascar": [
    "agent-ia-support-client",
    "agent-ia-facebook",
    "agent-ia-prospection",
  ],
  "developpeur-agent-vocal-ia": [
    "developpeur-agent-vocal-ia",
    "agent-ia-support-client",
  ],
  "developpeur-nodejs-madagascar": ["api-mobile-money-madagascar"],
  "developpeur-react-nextjs-madagascar": ["api-mobile-money-madagascar"],
  "developpeur-nextjs-supabase-madagascar": [
    "api-mobile-money-madagascar",
    "automatisation-n8n-pme",
  ],
  "developpeur-claude-code-n8n": ["workflows-n8n-claude-code"],
  "developpeur-codex-n8n": ["workflows-n8n-claude-code"],
  "consultant-seo-geo": ["workflows-n8n-claude-code"],
  "n8n-automation": [
    "n8n-automation-for-smbs",
    "n8n-marketing-automation",
    "ai-prospecting-agent",
  ],
  "n8n-automation-expert-madagascar": [
    "n8n-automation-for-smbs",
    "n8n-marketing-automation",
    "ai-prospecting-agent",
    "n8n-claude-code-workflows",
  ],
  "remote-n8n-automation-consultant": [
    "n8n-automation-for-smbs",
    "n8n-marketing-automation",
    "ai-prospecting-agent",
    "n8n-claude-code-workflows",
  ],
  "ai-agent-developer-madagascar": [
    "ai-customer-support-agent",
    "facebook-ai-agent",
    "ai-prospecting-agent",
  ],
  "ai-voice-agent-developer": [
    "ai-voice-agent-developer",
    "ai-customer-support-agent",
  ],
  "hire-nodejs-developer-madagascar": ["mobile-money-api-madagascar"],
  "hire-react-nextjs-developer-madagascar": ["mobile-money-api-madagascar"],
  "nextjs-supabase-developer-madagascar": [
    "mobile-money-api-madagascar",
    "n8n-automation-for-smbs",
  ],
  "claude-code-n8n-developer": ["n8n-claude-code-workflows"],
  "codex-n8n-developer": ["n8n-claude-code-workflows"],
  "seo-geo-consultant": ["n8n-claude-code-workflows"],
};

export function getSolutions(locale: Locale): Solution[] {
  return solutionsByLocale[locale];
}

export function getSolutionBySlug(locale: Locale, slug: string): Solution | undefined {
  return getSolutions(locale).find((solution) => solution.slug === slug);
}

export function getAlternateSolution(locale: Locale, slug: string): Solution | undefined {
  const index = getSolutions(locale).findIndex((solution) => solution.slug === slug);
  if (index < 0) return undefined;
  const alternateLocale: Locale = locale === "fr" ? "en" : "fr";
  return getSolutions(alternateLocale)[index];
}

export function getRelatedSolutionsForService(locale: Locale, serviceSlug: string): Solution[] {
  const slugs = serviceToSolutionSlugs[serviceSlug] ?? [];
  const solutionsBySlug = new Map(getSolutions(locale).map((solution) => [solution.slug, solution]));
  return slugs.flatMap((slug) => {
    const solution = solutionsBySlug.get(slug);
    return solution ? [solution] : [];
  });
}
