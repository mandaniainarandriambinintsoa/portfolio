import type { Locale } from "@/i18n/config";
import type { IconScoutName } from "@/components/icons/IconScoutIcon";

export type BusinessVerticalTone =
  | "amber"
  | "blue"
  | "cyan"
  | "emerald"
  | "orange"
  | "rose"
  | "sky"
  | "violet";

type ContentBlock = {
  title: string;
  description: string;
  icon: IconScoutName;
};

type LinkBlock = {
  label: string;
  href: string;
  description: string;
};

type FaqBlock = {
  question: string;
  answer: string;
};

export type BusinessVertical = {
  key: string;
  slug: string;
  alternateSlug: string;
  name: string;
  icon: IconScoutName;
  tone: BusinessVerticalTone;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  audience: string;
  primaryAction: string;
  heroHighlights: string[];
  painsTitle: string;
  painsIntro: string;
  pains: ContentBlock[];
  outcomesTitle: string;
  outcomesIntro: string;
  outcomes: ContentBlock[];
  automationTitle: string;
  automationIntro: string;
  automations: ContentBlock[];
  processTitle: string;
  process: { title: string; description: string }[];
  searchTitle: string;
  searchParagraphs: string[];
  searchTopics: string[];
  proof?: {
    projectSlug: string;
    title: string;
    description: string;
  };
  links: LinkBlock[];
  faq: FaqBlock[];
  ctaTitle: string;
  ctaDescription: string;
};

type BusinessVerticalEntry = {
  key: string;
  icon: IconScoutName;
  tone: BusinessVerticalTone;
  fr: Omit<BusinessVertical, "key" | "icon" | "tone" | "alternateSlug">;
  en: Omit<BusinessVertical, "key" | "icon" | "tone" | "alternateSlug">;
};

export const BUSINESS_VERTICALS_UPDATED_AT = "2026-08-20T00:00:00.000Z";

const entries: BusinessVerticalEntry[] = [
  {
    key: "travel-agency",
    icon: "travel",
    tone: "sky",
    fr: {
      slug: "agence-voyage",
      name: "Agence de voyage",
      eyebrow: "Tourisme et circuits",
      title: "Création de site internet pour agence de voyage",
      metaTitle: "Création site internet agence de voyage",
      metaDescription:
        "Site web pour agence de voyage et tour-opérateur : circuits, demandes sur mesure, SEO touristique, WhatsApp et automatisation du suivi commercial.",
      lead:
        "Un site d'agence de voyage doit donner envie de partir, mais aussi transformer une destination en demande exploitable. Je construis un parcours rapide, rassurant et mesurable pour présenter les circuits, qualifier le projet du voyageur et transmettre chaque demande à la bonne personne.",
      audience:
        "Agences réceptives, tour-opérateurs, guides, organisateurs de circuits et acteurs du tourisme à Madagascar ou dans la francophonie.",
      primaryAction: "Recevoir une demande de voyage qualifiée",
      heroHighlights: ["Circuits faciles à comparer", "Formulaire de voyage sur mesure", "Suivi WhatsApp, email ou CRM"],
      painsTitle: "Pourquoi un catalogue de destinations ne suffit plus",
      painsIntro:
        "Le voyageur compare plusieurs offres, vérifie la confiance et veut savoir rapidement si l'agence peut adapter le séjour à ses dates, son budget et son rythme.",
      pains: [
        { title: "Offre difficile à lire", description: "Des circuits trop longs ou mal structurés empêchent de comprendre la différence entre les expériences.", icon: "eye" },
        { title: "Demandes trop vagues", description: "Un simple bouton Contact oblige l'équipe à redemander les dates, le nombre de voyageurs et le budget.", icon: "quiz" },
        { title: "Dépendance aux plateformes", description: "Sans pages indexables et sans base de contacts, l'agence reste dépendante des intermédiaires et des réseaux sociaux.", icon: "search" },
      ],
      outcomesTitle: "Un parcours pensé pour vendre un voyage complexe",
      outcomesIntro:
        "Le site relie inspiration, comparaison, rassurance et qualification sans transformer la navigation en formulaire administratif.",
      outcomes: [
        { title: "Pages circuits", description: "Programme, durée, niveau, inclusions, saison et galerie dans une structure comparable.", icon: "travel" },
        { title: "Demande sur mesure", description: "Dates, voyageurs, attentes et budget sont collectés avant le premier échange.", icon: "calendar" },
        { title: "Preuves locales", description: "Équipe, connaissance du terrain, partenaires, avis et conditions rassurent avant la prise de contact.", icon: "location" },
        { title: "Contenu multilingue", description: "Les parcours FR/EN peuvent répondre à des marchés différents avec hreflang et contenus adaptés.", icon: "chat" },
        { title: "SEO touristique", description: "Les pages ciblent des intentions précises sans confondre recherche de voyage et recherche de prestataire web.", icon: "growth" },
        { title: "Mesure des demandes", description: "Les clics circuits, formulaires et sources d'acquisition sont suivis pour améliorer la conversion.", icon: "crosshair" },
      ],
      automationTitle: "Automatiser le suivi sans déshumaniser le voyage",
      automationIntro:
        "n8n peut préparer le dossier et accélérer la réponse. La construction du séjour et les engagements restent validés par l'agence.",
      automations: [
        { title: "Qualification", description: "Créer une fiche structurée à partir du formulaire et détecter les informations manquantes.", icon: "automation" },
        { title: "Alerte commerciale", description: "Notifier le bon conseiller selon la destination, la langue ou le type de circuit.", icon: "envelope" },
        { title: "Relance contrôlée", description: "Préparer un rappel si la demande reste sans réponse, puis arrêter dès qu'un échange commence.", icon: "clock" },
        { title: "CRM et reporting", description: "Synchroniser statut, origine et valeur potentielle sans ressaisie manuelle.", icon: "data" },
      ],
      processTitle: "De l'offre touristique au site qui génère des demandes",
      process: [
        { title: "Cadrer les voyageurs", description: "Marchés, objections, circuits rentables et capacité réelle de traitement." },
        { title: "Structurer les offres", description: "Gabarits de circuits, filtres utiles, preuves et demandes sur mesure." },
        { title: "Concevoir et construire", description: "Direction visuelle, Next.js, contenus, formulaires et performance mobile." },
        { title: "Connecter et mesurer", description: "n8n si nécessaire, analytics, événements de conversion et amélioration continue." },
      ],
      searchTitle: "Visibilité touristique et intention commerciale",
      searchParagraphs: [
        "La page commerciale vise les dirigeants qui recherchent une création de site pour agence de voyage. Les pages circuits du futur site viseront, elles, les voyageurs qui cherchent une destination ou une expérience.",
        "Cette séparation évite d'attirer un trafic flatteur mais peu qualifié sur manda-ia.com. Madagascar reste une preuve de connaissance du terrain, sans enfermer l'offre dans un seul marché.",
      ],
      searchTopics: ["création site internet agence de voyage", "site tour-opérateur", "site réservation circuits", "site agence voyage sur mesure"],
      proof: {
        projectSlug: "madavoyage",
        title: "MadaVoyage : une direction conçue pour inspirer puis qualifier",
        description:
          "Cette étude de cas montre le brief, les directions visuelles, le choix du parcours et l'intégration Next.js d'une agence spécialisée dans les voyages à Madagascar.",
      },
      links: [
        { label: "Voir l'étude de cas MadaVoyage", href: "/projects/madavoyage", description: "Du brief métier à l'intégration finale." },
        { label: "Développement de sites et SaaS", href: "/services/developpement-sites-saas", description: "Architecture, interface et mise en production." },
        { label: "Automatisation n8n", href: "/services/automatisation-n8n", description: "Qualification, notifications et suivi." },
        { label: "Consultant SEO + GEO", href: "/services/consultant-seo-geo", description: "Architecture de recherche et visibilité IA." },
      ],
      faq: [
        { question: "Quel budget prévoir pour un site d'agence de voyage ?", answer: "Le budget dépend du nombre de circuits, des langues, du niveau de réservation et des intégrations. Je cadre d'abord une version utile avant de chiffrer les fonctions secondaires." },
        { question: "Faut-il intégrer un paiement en ligne dès le départ ?", answer: "Pas toujours. De nombreux voyages nécessitent une validation de disponibilité et un devis. Une demande qualifiée puis un acompte contrôlé peut être plus fiable." },
        { question: "Le site peut-il gérer plusieurs langues ?", answer: "Oui. Les contenus, URL, métadonnées et liens hreflang peuvent être adaptés à chaque marché au lieu d'utiliser une traduction automatique indistincte." },
        { question: "Peut-on connecter WhatsApp ou un CRM ?", answer: "Oui. Le formulaire peut alimenter Gmail, WhatsApp, Google Sheets, Supabase ou un CRM via une route serveur et n8n." },
        { question: "Le SEO peut-il attirer directement des voyageurs ?", answer: "Oui sur les pages destinations et circuits du site de l'agence. La stratégie distingue ces recherches de la page qui vend la prestation de création web." },
      ],
      ctaTitle: "Votre agence doit transformer plus de visites en projets de voyage ?",
      ctaDescription: "Présentez-moi vos circuits, vos marchés et la façon dont votre équipe traite aujourd'hui une demande.",
    },
    en: {
      slug: "travel-agency",
      name: "Travel agency",
      eyebrow: "Tourism and tours",
      title: "Website development for travel agencies and tour operators",
      metaTitle: "Travel agency website development",
      metaDescription: "Travel agency and tour operator websites with tour pages, custom enquiries, multilingual SEO, CRM and optional n8n automation.",
      lead: "A travel website must inspire action and turn destination interest into an enquiry the team can actually process. I build fast, reassuring journeys that present tours, qualify travellers and route each request to the right person.",
      audience: "Inbound agencies, tour operators, guides and tourism businesses serving Madagascar or international markets.",
      primaryAction: "Receive a qualified travel enquiry",
      heroHighlights: ["Comparable tour pages", "Custom trip enquiry", "Email, WhatsApp or CRM follow-up"],
      painsTitle: "Why a destination catalogue is not enough",
      painsIntro: "Travellers compare options, check trust and need to know whether the agency can match dates, budget and pace.",
      pains: [
        { title: "Unclear packages", description: "Long, inconsistent tour descriptions make it difficult to compare experiences.", icon: "eye" },
        { title: "Unqualified enquiries", description: "A generic contact button leaves the team chasing dates, group size and budget.", icon: "quiz" },
        { title: "Platform dependency", description: "Without indexable pages and owned contacts, the agency remains dependent on intermediaries.", icon: "search" },
      ],
      outcomesTitle: "A journey designed to sell a complex trip",
      outcomesIntro: "The website connects inspiration, comparison, trust and qualification without turning discovery into paperwork.",
      outcomes: [
        { title: "Tour pages", description: "Itinerary, duration, difficulty, inclusions, season and imagery in a comparable format.", icon: "travel" },
        { title: "Tailored enquiry", description: "Dates, travellers, expectations and budget are collected before the first call.", icon: "calendar" },
        { title: "Local evidence", description: "Team, field knowledge, partners, reviews and clear conditions build trust.", icon: "location" },
        { title: "Multilingual content", description: "FR/EN journeys can address different markets with proper hreflang and copy.", icon: "chat" },
        { title: "Tourism SEO", description: "Pages target specific intent without mixing traveller and web-service searches.", icon: "growth" },
        { title: "Enquiry measurement", description: "Tour clicks, forms and acquisition sources show where conversion improves.", icon: "crosshair" },
      ],
      automationTitle: "Automate follow-up without removing human expertise",
      automationIntro: "n8n can prepare the case and speed up response while the agency validates the trip and commitments.",
      automations: [
        { title: "Qualification", description: "Create a structured record and identify missing information.", icon: "automation" },
        { title: "Sales alerts", description: "Notify the right advisor by destination, language or tour type.", icon: "envelope" },
        { title: "Controlled reminders", description: "Prepare follow-up, then stop as soon as a conversation begins.", icon: "clock" },
        { title: "CRM reporting", description: "Sync status, origin and potential value without manual entry.", icon: "data" },
      ],
      processTitle: "From tourism offer to enquiry engine",
      process: [
        { title: "Frame the traveller", description: "Markets, objections, profitable tours and real operational capacity." },
        { title: "Structure the offer", description: "Tour templates, useful filters, evidence and custom enquiries." },
        { title: "Design and build", description: "Visual direction, Next.js, content, forms and mobile performance." },
        { title: "Connect and measure", description: "Optional n8n, analytics, conversion events and iteration." },
      ],
      searchTitle: "Tourism visibility and commercial intent",
      searchParagraphs: [
        "This page targets travel business owners looking for website development. Destination and tour pages on their future website target travellers searching for experiences.",
        "Keeping those audiences separate prevents vanity traffic. Madagascar demonstrates market knowledge without limiting delivery to one country.",
      ],
      searchTopics: ["travel agency website development", "tour operator website", "tour booking website", "travel agency SEO"],
      proof: { projectSlug: "madavoyage", title: "MadaVoyage: designed to inspire and qualify", description: "The case study documents the business brief, visual directions, selected journey and final Next.js implementation." },
      links: [
        { label: "View the MadaVoyage case study", href: "/en/projects/madavoyage", description: "From business brief to final build." },
        { label: "Website and SaaS development", href: "/en/services/sites-saas-development", description: "Architecture, interface and deployment." },
        { label: "n8n automation", href: "/en/services/n8n-automation", description: "Qualification, alerts and follow-up." },
        { label: "SEO + GEO consulting", href: "/en/services/seo-geo-consultant", description: "Search architecture and AI visibility." },
      ],
      faq: [
        { question: "How much does a travel agency website cost?", answer: "Cost depends on tours, languages, booking depth and integrations. I scope the smallest useful release before pricing secondary features." },
        { question: "Do we need online payment from day one?", answer: "Not always. Complex trips often need availability confirmation and a quote. A qualified enquiry followed by a controlled deposit can be more reliable." },
        { question: "Can the website support several languages?", answer: "Yes. Content, URLs, metadata and hreflang can be designed for each market instead of applying one generic automatic translation." },
        { question: "Can it connect to WhatsApp or a CRM?", answer: "Yes. A server route and n8n can connect the form to email, WhatsApp, Sheets, Supabase or a CRM." },
        { question: "Can SEO attract travellers directly?", answer: "Yes through the agency's destination and tour pages. The strategy keeps those searches separate from the page selling website development." },
      ],
      ctaTitle: "Should your agency turn more visits into travel enquiries?",
      ctaDescription: "Send me your tours, target markets and the way your team currently handles an enquiry.",
    },
  },
  {
    key: "auto-repair",
    icon: "wrench",
    tone: "blue",
    fr: {
      slug: "garage-automobile",
      name: "Garage automobile",
      eyebrow: "Automobile et atelier",
      title: "Création de site internet pour garage automobile",
      metaTitle: "Création site internet garage automobile",
      metaDescription: "Site web pour garagiste : SEO local, services atelier, demande de devis, rendez-vous, flottes et automatisation n8n du suivi.",
      lead: "Le futur client cherche rarement une technologie. Il veut savoir si le garage traite son véhicule, s'il peut obtenir un devis clair et quand l'atelier peut le recevoir. Je transforme ces questions en un parcours local qui rassure puis génère une demande exploitable.",
      audience: "Garages indépendants, centres auto, carrossiers, spécialistes pneus, diagnostics, taxis, VTC et petites flottes.",
      primaryAction: "Obtenir un devis ou un rendez-vous atelier",
      heroHighlights: ["Services et véhicules pris en charge", "Demande de devis qualifiée", "Rendez-vous et rappels automatisables"],
      painsTitle: "Les freins qui font appeler un autre garage",
      painsIntro: "Une présence Google incomplète, des tarifs flous et un formulaire générique suffisent à perdre une demande locale urgente.",
      pains: [
        { title: "Services invisibles", description: "Le client ne sait pas si l'atelier traite sa panne, sa marque ou son type de véhicule.", icon: "search" },
        { title: "Confiance insuffisante", description: "Sans méthode, photos, garanties ou avis, laisser son véhicule devient un pari.", icon: "shield" },
        { title: "Agenda dispersé", description: "Téléphone, WhatsApp et messages créent des doublons et des rendez-vous incomplets.", icon: "calendar" },
      ],
      outcomesTitle: "Un système local qui transforme la recherche en rendez-vous",
      outcomesIntro: "Chaque section répond à une objection avant de demander les informations nécessaires à l'atelier.",
      outcomes: [
        { title: "Pages services", description: "Diagnostic, entretien, pneus, carrosserie ou climatisation avec signes de panne et délais indicatifs.", icon: "wrench" },
        { title: "SEO local", description: "Ville, zones desservies, horaires et données structurées cohérentes avec la fiche Google Business Profile.", icon: "location" },
        { title: "Devis qualifié", description: "Véhicule, problème, urgence, photos et préférence de contact arrivent dans un seul dossier.", icon: "quiz" },
        { title: "Prise de rendez-vous", description: "Demande de créneau avec confirmation humaine ou agenda connecté selon l'organisation.", icon: "calendar" },
        { title: "Offre flottes", description: "Un parcours séparé explique entretien récurrent, facturation et interlocuteur pour taxis ou entreprises.", icon: "car" },
        { title: "Mesure", description: "Appels, WhatsApp, devis et rendez-vous sont attribués à leur page et à leur source.", icon: "growth" },
      ],
      automationTitle: "Connecter l'atelier sans promettre un créneau impossible",
      automationIntro: "L'automatisation prépare et distribue la demande. Le garage garde la validation des prix, pièces et disponibilités.",
      automations: [
        { title: "Dossier atelier", description: "Normaliser le véhicule, la panne, les photos et l'urgence dans Sheets, Supabase ou un CRM.", icon: "data" },
        { title: "Agenda", description: "Créer un créneau provisoire ou une tâche de rappel après validation de l'équipe.", icon: "calendar" },
        { title: "Notifications", description: "Alerter le responsable et confirmer au client que la demande est bien prise en charge.", icon: "envelope" },
        { title: "Rappels", description: "Préparer rappels de rendez-vous ou d'entretien sans envoyer après annulation.", icon: "clock" },
      ],
      processTitle: "Construire autour du fonctionnement réel de l'atelier",
      process: [
        { title: "Lister les demandes rentables", description: "Services, véhicules, zones, urgences et clientèle professionnelle." },
        { title: "Dessiner le parcours", description: "Recherche locale, preuve, devis, créneau et confirmation." },
        { title: "Produire le site", description: "Interface mobile, contenus, images optimisées et formulaire sécurisé." },
        { title: "Brancher les opérations", description: "Agenda ou n8n seulement lorsque le processus interne est clair." },
      ],
      searchTitle: "Être trouvé pour un besoin atelier précis",
      searchParagraphs: [
        "La landing Manda cible la création de site pour garagiste. Le futur site du garage cible ensuite les recherches locales liées aux pannes, services et rendez-vous.",
        "Une seule page forte peut couvrir Madagascar et la francophonie au départ. Les variantes par ville ne seront créées que si l'activité et les données justifient un contenu réellement local.",
      ],
      searchTopics: ["création site internet garage automobile", "site internet garagiste", "prise de rendez-vous garage", "SEO local garage automobile"],
      proof: { projectSlug: "garagiste", title: "Garagiste : un tunnel premium pour particuliers et flottes", description: "L'étude de cas montre trois directions complètes puis un site Next.js relié à n8n, Google Calendar et aux notifications de l'atelier." },
      links: [
        { label: "Voir l'étude de cas Garagiste", href: "/projects/garagiste", description: "Design, conversion et workflow atelier." },
        { label: "Développement de sites et SaaS", href: "/services/developpement-sites-saas", description: "Un socle rapide et pilotable." },
        { label: "Automatisation n8n", href: "/services/automatisation-n8n", description: "Agenda, alertes et données structurées." },
        { label: "Consultant SEO + GEO", href: "/services/consultant-seo-geo", description: "Visibilité locale et moteurs IA." },
      ],
      faq: [
        { question: "Un garage a-t-il besoin d'une réservation en ligne complète ?", answer: "Pas forcément. Une demande de créneau avec validation manuelle est souvent plus fiable lorsque la durée dépend du diagnostic et des pièces." },
        { question: "Le site peut-il apparaître sur les recherches locales ?", answer: "Oui si les pages, la fiche Google Business Profile, les coordonnées, les zones et les preuves locales restent cohérentes." },
        { question: "Peut-on recevoir des photos du véhicule ?", answer: "Oui avec un formulaire sécurisé, des limites de taille et un stockage adapté. Les fichiers ne doivent pas être envoyés directement vers un webhook public." },
        { question: "Google Calendar peut-il être connecté ?", answer: "Oui pour créer un événement provisoire ou confirmé. Le modèle dépend de la manière dont l'atelier attribue réellement ses ponts et techniciens." },
        { question: "Le site convient-il aux taxis et aux flottes ?", answer: "Oui. Une section dédiée peut présenter entretien récurrent, priorité, facturation et demande de contrat professionnel." },
        { question: "Quel budget prévoir pour un site de garage automobile ?", answer: "Le budget dépend du nombre de services, du parcours de devis, de la prise de rendez-vous et des connexions à l'agenda ou au CRM. Je chiffre d'abord un socle utile, puis les automatisations réellement nécessaires." },
      ],
      ctaTitle: "Votre garage doit recevoir des demandes plus claires ?",
      ctaDescription: "Envoyez-moi vos services, votre zone et la manière dont vous planifiez aujourd'hui un véhicule.",
    },
    en: {
      slug: "auto-repair-shop",
      name: "Auto repair shop",
      eyebrow: "Automotive workshop",
      title: "Website development for auto repair shops",
      metaTitle: "Auto repair shop website development",
      metaDescription: "Websites for garages and auto repair shops with local SEO, service pages, quote requests, booking and optional n8n automation.",
      lead: "Drivers do not search for a technology stack. They need to know whether the workshop handles their vehicle, can provide a clear quote and has availability. I turn those questions into a local journey that builds trust and generates usable requests.",
      audience: "Independent garages, repair shops, body shops, tyre centres, diagnostic specialists and fleet workshops.",
      primaryAction: "Request a quote or workshop appointment",
      heroHighlights: ["Clear workshop services", "Qualified quote request", "Optional booking and reminders"],
      painsTitle: "The friction that sends drivers elsewhere",
      painsIntro: "An incomplete local presence, unclear services and a generic form can lose an urgent nearby customer.",
      pains: [
        { title: "Invisible services", description: "Drivers cannot tell whether the workshop handles their fault, make or vehicle type.", icon: "search" },
        { title: "Low trust", description: "Without process, imagery, guarantees or reviews, leaving a vehicle feels risky.", icon: "shield" },
        { title: "Scattered scheduling", description: "Phone, WhatsApp and messages create duplicates and incomplete bookings.", icon: "calendar" },
      ],
      outcomesTitle: "A local system that turns search into appointments",
      outcomesIntro: "Each section removes an objection before requesting the information the workshop needs.",
      outcomes: [
        { title: "Service pages", description: "Diagnostics, maintenance, tyres, bodywork or AC with symptoms and expected process.", icon: "wrench" },
        { title: "Local SEO", description: "City, service areas, hours and structured data aligned with the Google Business Profile.", icon: "location" },
        { title: "Qualified quotes", description: "Vehicle, issue, urgency and photos arrive in one case.", icon: "quiz" },
        { title: "Appointment request", description: "Preferred slot with human confirmation or connected calendar.", icon: "calendar" },
        { title: "Fleet offer", description: "A separate journey for recurring maintenance and business accounts.", icon: "car" },
        { title: "Measurement", description: "Calls, messages, quotes and bookings are attributed to their source.", icon: "growth" },
      ],
      automationTitle: "Connect the workshop without promising impossible availability",
      automationIntro: "Automation prepares and routes the request while the garage controls price, parts and time.",
      automations: [
        { title: "Workshop record", description: "Normalize vehicle, issue, photos and urgency in a CRM or database.", icon: "data" },
        { title: "Calendar", description: "Create a provisional slot or follow-up task after team review.", icon: "calendar" },
        { title: "Notifications", description: "Alert the owner and acknowledge the customer's request.", icon: "envelope" },
        { title: "Reminders", description: "Send controlled appointment or maintenance reminders.", icon: "clock" },
      ],
      processTitle: "Build around real workshop operations",
      process: [
        { title: "Map profitable requests", description: "Services, vehicles, locations, urgency and fleet customers." },
        { title: "Design the journey", description: "Local search, evidence, quote, preferred slot and confirmation." },
        { title: "Build the website", description: "Mobile interface, content, optimized imagery and secure forms." },
        { title: "Connect operations", description: "Calendar or n8n only after the internal process is clear." },
      ],
      searchTitle: "Be found for specific workshop needs",
      searchParagraphs: ["This Manda page targets owners looking for auto repair website development. Their future service pages target local repair searches.", "One strong page can serve international buyers initially. Location variants only make sense when operations and search data support genuinely local content."],
      searchTopics: ["auto repair shop website", "garage website development", "auto repair booking website", "local SEO for garages"],
      proof: { projectSlug: "garagiste", title: "Garagiste: a premium journey for drivers and fleets", description: "The case study shows three full design directions and a Next.js site connected to n8n, Calendar and workshop notifications." },
      links: [
        { label: "View the Garagiste case study", href: "/en/projects/garagiste", description: "Design, conversion and workshop workflow." },
        { label: "Website and SaaS development", href: "/en/services/sites-saas-development", description: "Fast, maintainable foundations." },
        { label: "n8n automation", href: "/en/services/n8n-automation", description: "Scheduling, alerts and structured data." },
        { label: "SEO + GEO consulting", href: "/en/services/seo-geo-consultant", description: "Local and AI search visibility." },
      ],
      faq: [
        { question: "Does a garage need full online booking?", answer: "Not always. A preferred-slot request with manual approval is often more reliable when time depends on diagnostics and parts." },
        { question: "Can the website rank locally?", answer: "Yes when pages, Google Business Profile, contact details, service areas and local evidence remain consistent." },
        { question: "Can customers upload vehicle photos?", answer: "Yes through a secured form with file limits and suitable storage, not a public webhook." },
        { question: "Can Google Calendar be connected?", answer: "Yes for provisional or confirmed appointments, depending on how the workshop assigns technicians and bays." },
        { question: "Can the site serve fleet customers?", answer: "Yes. A dedicated route can explain recurring maintenance, account terms and business enquiries." },
        { question: "What budget should an auto repair website allow for?", answer: "The budget depends on the service catalogue, quote journey, appointment flow and calendar or CRM connections. I price the useful foundation first, then the automation that is genuinely needed." },
      ],
      ctaTitle: "Should your workshop receive clearer requests?",
      ctaDescription: "Send me your services, service area and current scheduling process.",
    },
  },
  {
    key: "construction",
    icon: "building",
    tone: "amber",
    fr: {
      slug: "entreprise-btp",
      name: "Entreprise BTP",
      eyebrow: "Construction et rénovation",
      title: "Création de site internet pour entreprise BTP",
      metaTitle: "Création site internet entreprise BTP",
      metaDescription: "Site web pour entreprise BTP : réalisations, zones, demandes de devis, suivi commercial et parcours de confiance pour clients locaux ou diaspora.",
      lead: "Dans le BTP, le site ne vend pas seulement des travaux. Il doit prouver que l'entreprise sait cadrer un budget, tenir un chantier et rendre l'avancement visible. Je construis un parcours qui transforme ces preuves en demandes de devis mieux qualifiées.",
      audience: "Entreprises de construction, rénovation, second œuvre, bureaux d'études et structures travaillant avec des clients à distance.",
      primaryAction: "Recevoir une demande d'évaluation exploitable",
      heroHighlights: ["Réalisations documentées", "Devis cadré par type de chantier", "Parcours local ou diaspora"],
      painsTitle: "La confiance se perd avant même le premier rendez-vous",
      painsIntro: "Un prospect engage un budget important. Il cherche des preuves de méthode, de responsabilité et de communication avant de transmettre ses plans.",
      pains: [
        { title: "Portfolio sans contexte", description: "Des photos seules ne montrent ni le périmètre, ni les contraintes, ni la qualité du pilotage.", icon: "image" },
        { title: "Devis inutilisables", description: "Une demande sans lieu, surface, budget ou calendrier crée des allers-retours coûteux.", icon: "document" },
        { title: "Distance anxiogène", description: "Pour la diaspora, l'absence de jalons et de reporting rend le risque encore plus visible.", icon: "eye" },
      ],
      outcomesTitle: "Un site qui vend le cadre du chantier",
      outcomesIntro: "Le prospect comprend qui intervient, comment le projet avance et ce qui se passe après sa demande.",
      outcomes: [
        { title: "Réalisations détaillées", description: "Type de chantier, objectifs, contraintes, étapes et résultat au lieu d'une galerie anonyme.", icon: "building" },
        { title: "Services et zones", description: "Construction, rénovation, corps d'état et territoires réellement pris en charge.", icon: "location" },
        { title: "Évaluation qualifiée", description: "Lieu, surface, plans, budget, délai et disponibilité pour un échange.", icon: "quiz" },
        { title: "Méthode", description: "Visite, chiffrage, contrat, jalons, validation et réception expliqués simplement.", icon: "automation" },
        { title: "Parcours diaspora", description: "Reporting, interlocuteur, documents et paiements par étapes réduisent l'incertitude à distance.", icon: "shield" },
        { title: "SEO sectoriel", description: "Les expertises et zones sont organisées sans multiplier des pages locales artificielles.", icon: "growth" },
      ],
      automationTitle: "Faire circuler le dossier, pas automatiser la promesse",
      automationIntro: "n8n peut centraliser les pièces et les relances. Le chiffrage, les délais et les engagements restent validés par les responsables.",
      automations: [
        { title: "Préqualification", description: "Classer la demande selon chantier, zone, budget et maturité du dossier.", icon: "automation" },
        { title: "Documents", description: "Ranger plans et photos dans le bon dossier avec limites et droits d'accès.", icon: "cloudUpload" },
        { title: "Relances internes", description: "Alerter lorsqu'une visite, un devis ou une validation attend une action.", icon: "clock" },
        { title: "Reporting", description: "Compiler les informations approuvées pour un compte rendu client régulier.", icon: "document" },
      ],
      processTitle: "Du chantier idéal au parcours de qualification",
      process: [
        { title: "Cadrer l'offre", description: "Chantiers rentables, zones, preuves et capacité de réponse." },
        { title: "Formaliser la confiance", description: "Méthode, jalons, responsabilités et dossiers de réalisations." },
        { title: "Construire le site", description: "Next.js, médias optimisés, formulaire et contenus indexables." },
        { title: "Organiser le suivi", description: "Notifications, stockage et CRM selon les outils déjà utilisés." },
      ],
      searchTitle: "Cibler l'entreprise qui achète le site",
      searchParagraphs: ["La page Manda vise les recherches de création de site pour entreprise BTP. Les recherches comme construire à Madagascar depuis la France appartiennent au futur site du constructeur, pas à la page de prestation web.", "L'angle diaspora reste une preuve différenciante et un module de conversion pertinent pour les entreprises qui servent réellement ces clients."],
      searchTopics: ["création site internet entreprise BTP", "site internet artisan BTP", "site BTP avec devis", "exemple site artisan"],
      proof: { projectSlug: "bati-diaspora", title: "Bati Diaspora : vendre la confiance à distance", description: "Cette étude montre comment devis détaillé, jalons, reporting et formulaire d'évaluation deviennent l'architecture du site." },
      links: [
        { label: "Voir l'étude Bati Diaspora", href: "/projects/bati-diaspora", description: "Trois directions puis une intégration métier." },
        { label: "Développement de sites et SaaS", href: "/services/developpement-sites-saas", description: "Site, portail ou espace client." },
        { label: "Automatisation n8n", href: "/services/automatisation-n8n", description: "Dossiers, alertes et suivi." },
        { label: "Consultant SEO + GEO", href: "/services/consultant-seo-geo", description: "Architecture sectorielle et locale." },
      ],
      faq: [
        { question: "Quelles réalisations faut-il montrer ?", answer: "Les projets les plus proches des missions recherchées, avec contexte, contraintes, étapes et résultat. Une petite sélection documentée vaut mieux qu'une galerie sans explication." },
        { question: "Le site peut-il collecter des plans ?", answer: "Oui avec un stockage sécurisé, des limites de fichiers et des droits adaptés. Les documents sensibles ne doivent pas transiter dans des outils non maîtrisés." },
        { question: "Peut-on intégrer un suivi de chantier ?", answer: "Oui, mais un véritable espace client est un produit distinct du site vitrine. Il peut être ajouté progressivement après validation du besoin." },
        { question: "Faut-il créer une page par ville ?", answer: "Seulement si l'entreprise intervient réellement dans chaque zone et peut apporter un contenu, des preuves et des coordonnées spécifiques." },
        { question: "Comment qualifier une demande de devis ?", answer: "Le formulaire doit collecter le type de projet, le lieu, la surface, l'état du dossier, le budget et l'échéance sans devenir trop long sur mobile." },
        { question: "Quel budget prévoir pour un site d'artisan ou d'entreprise BTP ?", answer: "Le coût varie selon le nombre de métiers, les zones, les études de cas, le formulaire de devis et l'éventuel espace client. Un site de présentation et de qualification peut être lancé avant un portail de suivi plus complet." },
      ],
      ctaTitle: "Votre entreprise doit rassurer avant la visite de chantier ?",
      ctaDescription: "Envoyez-moi vos métiers, vos zones, vos meilleures réalisations et votre processus de devis.",
    },
    en: {
      slug: "construction-company",
      name: "Construction company",
      eyebrow: "Construction and renovation",
      title: "Website development for construction companies",
      metaTitle: "Construction company website development",
      metaDescription: "Construction websites with documented projects, service areas, qualified quote requests and optional workflow automation.",
      lead: "A construction website does more than sell building work. It must prove that the company can frame a budget, manage delivery and make progress visible. I turn that evidence into better-qualified project enquiries.",
      audience: "Construction, renovation, specialist trade and engineering firms, including teams serving remote clients.",
      primaryAction: "Receive a usable project evaluation request",
      heroHighlights: ["Documented projects", "Qualified quote journey", "Local or diaspora trust path"],
      painsTitle: "Trust disappears before the first meeting",
      painsIntro: "Prospects commit a significant budget and look for evidence of method, accountability and communication.",
      pains: [
        { title: "Context-free portfolio", description: "Photos alone do not explain scope, constraints or delivery quality.", icon: "image" },
        { title: "Unusable enquiries", description: "Requests without location, surface, budget or timing create expensive back-and-forth.", icon: "document" },
        { title: "Remote anxiety", description: "For diaspora clients, missing milestones and reporting increase perceived risk.", icon: "eye" },
      ],
      outcomesTitle: "A website that sells the project framework",
      outcomesIntro: "Prospects understand who is responsible, how work progresses and what happens after enquiry.",
      outcomes: [
        { title: "Detailed projects", description: "Project type, objective, constraints, stages and result.", icon: "building" },
        { title: "Services and areas", description: "Construction, renovation, trades and locations genuinely covered.", icon: "location" },
        { title: "Qualified evaluation", description: "Location, surface, plans, budget, timing and call availability.", icon: "quiz" },
        { title: "Delivery method", description: "Visit, estimate, contract, milestones, approvals and handover.", icon: "automation" },
        { title: "Diaspora journey", description: "Reporting, ownership, documents and milestone payments reduce distance risk.", icon: "shield" },
        { title: "Sector SEO", description: "Expertise and areas are organized without artificial location pages.", icon: "growth" },
      ],
      automationTitle: "Move the case, not the commitment",
      automationIntro: "n8n can centralize files and reminders while managers approve estimates, dates and promises.",
      automations: [
        { title: "Prequalification", description: "Classify by project, location, budget and file maturity.", icon: "automation" },
        { title: "Documents", description: "Store plans and photos in the right secured folder.", icon: "cloudUpload" },
        { title: "Internal reminders", description: "Alert the team when a visit, estimate or approval is waiting.", icon: "clock" },
        { title: "Reporting", description: "Compile approved updates into regular customer reports.", icon: "document" },
      ],
      processTitle: "From ideal project to qualification journey",
      process: [
        { title: "Frame the offer", description: "Profitable projects, service areas, evidence and response capacity." },
        { title: "Formalize trust", description: "Method, milestones, responsibility and project records." },
        { title: "Build the website", description: "Next.js, optimized media, forms and indexable content." },
        { title: "Organize follow-up", description: "Notifications, storage and CRM based on current tools." },
      ],
      searchTitle: "Target the company buying the website",
      searchParagraphs: ["This page targets construction firms looking for website development. Consumer searches about building abroad belong on the contractor's future website.", "The diaspora angle remains a strong proof and conversion module for companies that genuinely serve remote clients."],
      searchTopics: ["construction company website", "construction website development", "renovation company website", "diaspora construction platform"],
      proof: { projectSlug: "bati-diaspora", title: "Bati Diaspora: selling trust at a distance", description: "The study turns estimates, milestones, reporting and project evaluation into the website architecture." },
      links: [
        { label: "View Bati Diaspora", href: "/en/projects/bati-diaspora", description: "Three directions and a business-focused build." },
        { label: "Website and SaaS development", href: "/en/services/sites-saas-development", description: "Website, portal or customer area." },
        { label: "n8n automation", href: "/en/services/n8n-automation", description: "Cases, alerts and follow-up." },
        { label: "SEO + GEO consulting", href: "/en/services/seo-geo-consultant", description: "Sector and local architecture." },
      ],
      faq: [
        { question: "Which projects should the website show?", answer: "Show work closest to the contracts you want, including context, constraints, stages and outcome." },
        { question: "Can prospects upload plans?", answer: "Yes with secured storage, file limits and suitable permissions." },
        { question: "Can the site include project tracking?", answer: "Yes, but a true customer portal is a separate product that can be added after validating the workflow." },
        { question: "Should we create one page per city?", answer: "Only when the company genuinely serves each area and can provide specific content, evidence and contact information." },
        { question: "How should quote requests be qualified?", answer: "Collect project type, location, surface, file status, budget and timing without creating an unusable mobile form." },
        { question: "What budget should a construction company website allow for?", answer: "Cost varies with trades, service areas, case studies, quote forms and any client portal. A strong presentation and qualification website can launch before a more complete project-tracking product." },
      ],
      ctaTitle: "Should your company build trust before the site visit?",
      ctaDescription: "Send me your trades, service areas, strongest projects and current estimating process.",
    },
  },
  {
    key: "beauty-salon",
    icon: "beauty",
    tone: "rose",
    fr: {
      slug: "salon-beaute",
      name: "Salon de beauté",
      eyebrow: "Beauté et bien-être",
      title: "Création de site internet pour salon et institut de beauté",
      metaTitle: "Création site institut et salon de beauté",
      metaDescription: "Site pour salon de beauté, institut, coiffeur ou spa : prestations, tarifs, réservation, SEO local, rappels et automatisation.",
      lead: "Un site de salon doit remplir l'agenda sans ajouter du travail à l'équipe. Je relie prestations, prix, disponibilités, preuves visuelles et réservation dans un parcours mobile qui reste simple pour la cliente comme pour le salon.",
      audience: "Instituts de beauté, salons de coiffure, barbiers, spas, ongleries, esthéticiennes et professionnels indépendants.",
      primaryAction: "Réserver la bonne prestation au bon créneau",
      heroHighlights: ["Carte des prestations claire", "Réservation mobile", "Rappels et fidélisation optionnels"],
      painsTitle: "Un agenda plein ne doit pas dépendre des messages privés",
      painsIntro: "Lorsque prix, durée et disponibilité ne sont pas clairs, chaque réservation demande plusieurs échanges et les créneaux oubliés coûtent directement du chiffre d'affaires.",
      pains: [
        { title: "Prestations confuses", description: "La cliente hésite entre plusieurs soins sans comprendre durée, résultat ou préparation.", icon: "beauty" },
        { title: "Réservation manuelle", description: "Instagram, appels et WhatsApp fragmentent l'agenda et interrompent les soins.", icon: "calendar" },
        { title: "Visibilité locale faible", description: "Le salon dépend des plateformes lorsqu'il ne possède ni pages locales ni relation directe.", icon: "location" },
      ],
      outcomesTitle: "Du premier regard au rendez-vous confirmé",
      outcomesIntro: "L'expérience associe image de marque, choix de prestation et gestion réaliste des créneaux.",
      outcomes: [
        { title: "Carte des soins", description: "Résultat attendu, durée, tarif, contre-indications et préparation.", icon: "beauty" },
        { title: "Réservation", description: "Choix de la prestation, du professionnel et du créneau selon les outils existants.", icon: "calendar" },
        { title: "Galerie crédible", description: "Réalisations réelles, équipe, lieu et avis avec consentement des personnes.", icon: "image" },
        { title: "SEO local", description: "Pages lisibles, ville, horaires, accès et cohérence avec Google Business Profile.", icon: "search" },
        { title: "Cartes cadeaux", description: "Une option simple pour vendre une prestation sans transformer le site en marketplace.", icon: "money" },
        { title: "Mesure", description: "Suivre les prestations vues, réservations commencées et demandes abouties.", icon: "growth" },
      ],
      automationTitle: "Réduire les rendez-vous oubliés et la ressaisie",
      automationIntro: "Le site peut rester autonome ou connecter l'agenda, les confirmations et le suivi client à n8n.",
      automations: [
        { title: "Confirmation", description: "Envoyer les informations pratiques après validation du rendez-vous.", icon: "check" },
        { title: "Rappel", description: "Prévenir avant le créneau et arrêter les messages après annulation.", icon: "clock" },
        { title: "Liste d'attente", description: "Proposer un créneau libéré aux clientes ayant donné leur accord.", icon: "user" },
        { title: "Suivi", description: "Créer une fiche client minimale et mesurer la source de la réservation.", icon: "data" },
      ],
      processTitle: "Concevoir autour de l'agenda réel du salon",
      process: [
        { title: "Cartographier les prestations", description: "Durée, prix, ressources, préparation et marge." },
        { title: "Choisir le modèle de réservation", description: "Demande, agenda existant ou réservation intégrée." },
        { title: "Créer la direction", description: "Identité visuelle, contenus, photos et expérience mobile." },
        { title: "Connecter et tester", description: "Rappels, annulations, tracking et scénarios d'erreur." },
      ],
      searchTitle: "Capter une intention beauté locale sans page artificielle",
      searchParagraphs: ["La page cible les professionnels qui cherchent un site pour salon ou institut. Le futur site peut ensuite se positionner sur les prestations réellement proposées dans sa ville.", "Les recherches observées associent fortement création de site, réservation en ligne et SEO local : le parcours doit donc traiter les trois, pas seulement l'esthétique."],
      searchTopics: ["création site internet institut de beauté", "site salon de beauté", "site coiffeur réservation", "SEO local institut"],
      links: [
        { label: "Développement de sites et SaaS", href: "/services/developpement-sites-saas", description: "Site rapide, agenda ou portail." },
        { label: "Voir les sites métier", href: "/site-metier", description: "Comparer les autres parcours sectoriels." },
        { label: "Automatisation n8n", href: "/services/automatisation-n8n", description: "Confirmations, rappels et données." },
        { label: "Consultant SEO + GEO", href: "/services/consultant-seo-geo", description: "Visibilité locale mesurable." },
      ],
      faq: [
        { question: "Peut-on connecter Planity, Booksy ou un agenda existant ?", answer: "Cela dépend des liens, widgets et API proposés par l'outil. Je privilégie l'intégration officielle plutôt qu'une synchronisation fragile." },
        { question: "Faut-il afficher tous les prix ?", answer: "Affichez les prix stables et expliquez clairement les prestations nécessitant un diagnostic ou un devis." },
        { question: "Peut-on demander un acompte ?", answer: "Oui si les conditions d'annulation, la validation et le remboursement sont clairement définis." },
        { question: "Comment réduire les rendez-vous oubliés ?", answer: "Confirmation immédiate, rappel utile, annulation simple et liste d'attente sont plus efficaces qu'une succession de messages génériques." },
        { question: "Une page par prestation est-elle nécessaire ?", answer: "Seulement pour les prestations importantes qui méritent une explication, des preuves et une intention de recherche distincte." },
        { question: "Quel budget prévoir pour le site d'un institut de beauté ?", answer: "Le budget dépend surtout du catalogue de soins, de la réservation, des paiements et de la connexion à l'agenda existant. Je distingue le site essentiel des options qui automatisent réellement l'exploitation." },
      ],
      ctaTitle: "Votre salon doit remplir son agenda sans vivre dans les messages ?",
      ctaDescription: "Envoyez-moi vos prestations, votre agenda actuel et les réservations qui vous font perdre le plus de temps.",
    },
    en: {
      slug: "beauty-salon",
      name: "Beauty salon",
      eyebrow: "Beauty and wellness",
      title: "Website development for beauty salons and institutes",
      metaTitle: "Beauty salon and institute website development",
      metaDescription: "Beauty salon, spa and hairdresser websites with services, booking, local SEO, reminders and optional automation.",
      lead: "A salon website should fill the calendar without adding admin work. I connect services, pricing, availability, visual proof and booking in a mobile journey that stays simple for clients and staff.",
      audience: "Beauty institutes, hair salons, barbers, spas, nail studios, estheticians and independent professionals.",
      primaryAction: "Book the right service at the right time",
      heroHighlights: ["Clear service menu", "Mobile booking", "Optional reminders and retention"],
      painsTitle: "A full calendar should not depend on private messages",
      painsIntro: "When price, duration and availability are unclear, every booking requires several exchanges and missed appointments cost revenue.",
      pains: [
        { title: "Confusing services", description: "Clients cannot compare duration, outcome or preparation.", icon: "beauty" },
        { title: "Manual booking", description: "Instagram, calls and WhatsApp fragment the calendar.", icon: "calendar" },
        { title: "Weak local visibility", description: "The salon depends on platforms without owned local pages and contacts.", icon: "location" },
      ],
      outcomesTitle: "From first impression to confirmed appointment",
      outcomesIntro: "The experience connects brand, service choice and realistic scheduling.",
      outcomes: [
        { title: "Service menu", description: "Outcome, duration, price, precautions and preparation.", icon: "beauty" },
        { title: "Booking", description: "Choose service, professional and slot through the right model.", icon: "calendar" },
        { title: "Credible gallery", description: "Real work, team, location and consented reviews.", icon: "image" },
        { title: "Local SEO", description: "Readable pages, city, hours and Google profile consistency.", icon: "search" },
        { title: "Gift cards", description: "Sell a service without turning the site into a marketplace.", icon: "money" },
        { title: "Measurement", description: "Track viewed services, started bookings and completions.", icon: "growth" },
      ],
      automationTitle: "Reduce missed appointments and duplicate entry",
      automationIntro: "The website can stand alone or connect calendars, confirmations and customer follow-up through n8n.",
      automations: [
        { title: "Confirmation", description: "Send practical information after the appointment is validated.", icon: "check" },
        { title: "Reminder", description: "Notify before the slot and stop after cancellation.", icon: "clock" },
        { title: "Waiting list", description: "Offer a released slot to customers who opted in.", icon: "user" },
        { title: "Tracking", description: "Create a minimal record and measure booking source.", icon: "data" },
      ],
      processTitle: "Design around the salon's real calendar",
      process: [
        { title: "Map services", description: "Duration, price, resources, preparation and margin." },
        { title: "Choose booking model", description: "Request, existing calendar or integrated booking." },
        { title: "Create the direction", description: "Visual identity, copy, imagery and mobile experience." },
        { title: "Connect and test", description: "Reminders, cancellations, tracking and errors." },
      ],
      searchTitle: "Capture local beauty intent without doorway pages",
      searchParagraphs: ["This page targets professionals looking for salon website development. Their future website can target services genuinely offered in its city.", "Current results consistently connect website creation, online booking and local SEO, so the experience must cover all three."],
      searchTopics: ["beauty salon website", "spa website development", "hair salon booking website", "local SEO for salons"],
      links: [
        { label: "Website and SaaS development", href: "/en/services/sites-saas-development", description: "Fast website, calendar or portal." },
        { label: "Explore business websites", href: "/en/site-metier", description: "Compare other sector journeys." },
        { label: "n8n automation", href: "/en/services/n8n-automation", description: "Confirmations, reminders and data." },
        { label: "SEO + GEO consulting", href: "/en/services/seo-geo-consultant", description: "Measurable local visibility." },
      ],
      faq: [
        { question: "Can you connect an existing booking platform?", answer: "It depends on official links, widgets and APIs. I prefer supported integrations over fragile synchronization." },
        { question: "Should every price be public?", answer: "Publish stable prices and clearly explain services that require diagnosis or a quote." },
        { question: "Can the website collect a deposit?", answer: "Yes when cancellation, approval and refund rules are clearly defined." },
        { question: "How can missed appointments be reduced?", answer: "Immediate confirmation, one useful reminder, easy cancellation and a waiting list work better than generic message sequences." },
        { question: "Does every service need its own page?", answer: "Only important services with distinct evidence, explanation and search intent." },
        { question: "What budget should a beauty salon website allow for?", answer: "The budget mainly depends on the service catalogue, booking, payments and the existing calendar connection. I separate the essential website from options that genuinely automate operations." },
      ],
      ctaTitle: "Should your salon fill the calendar without living in messages?",
      ctaDescription: "Send me your services, current calendar and the bookings that consume the most admin time.",
    },
  },
  {
    key: "hotel",
    icon: "bed",
    tone: "cyan",
    fr: {
      slug: "hotel",
      name: "Hôtel et hébergement",
      eyebrow: "Hôtellerie",
      title: "Création de site internet pour hôtel",
      metaTitle: "Création site internet hôtel et réservation",
      metaDescription: "Site d'hôtel rapide et multilingue : chambres, réservation directe, SEO local, WhatsApp et connexion PMS ou n8n selon vos outils.",
      lead: "Le site d'un hôtel doit montrer l'expérience réelle, répondre aux questions pratiques et donner une voie de réservation directe crédible. Je construis un parcours multilingue qui complète les plateformes au lieu de simplement les recopier.",
      audience: "Hôtels indépendants, lodges, maisons d'hôtes, écolodges, résidences et hébergements touristiques.",
      primaryAction: "Vérifier puis demander une disponibilité",
      heroHighlights: ["Chambres comparables", "Réservation directe maîtrisée", "Contenus locaux multilingues"],
      painsTitle: "Pourquoi le visiteur retourne sur une plateforme",
      painsIntro: "Des chambres mal expliquées, un tarif ambigu ou une disponibilité invérifiable réduisent la confiance dans la réservation directe.",
      pains: [
        { title: "Chambres indifférenciées", description: "Photos, capacité, literie et équipements ne permettent pas de choisir rapidement.", icon: "bed" },
        { title: "Réservation incertaine", description: "Le formulaire promet parfois une disponibilité que l'équipe doit encore confirmer.", icon: "calendar" },
        { title: "Site peu visible", description: "Sans contenu local utile, l'hôtel cède presque toute la découverte aux OTA.", icon: "search" },
      ],
      outcomesTitle: "Une réservation directe qui reste honnête",
      outcomesIntro: "Le parcours distingue disponibilité en temps réel, demande de réservation et simple prise de contact.",
      outcomes: [
        { title: "Pages chambres", description: "Capacité, couchage, équipements, règles, photos et différences visibles.", icon: "bed" },
        { title: "Disponibilité", description: "Connexion PMS/channel manager si possible, sinon demande clairement soumise à confirmation.", icon: "calendar" },
        { title: "Expérience locale", description: "Accès, activités, transferts et conseils utiles avant l'arrivée.", icon: "location" },
        { title: "Multilingue", description: "Pages et métadonnées adaptées aux marchés réellement servis.", icon: "chat" },
        { title: "Preuves", description: "Photos réelles, conditions, avis et coordonnées cohérentes.", icon: "shield" },
        { title: "Réservation mesurée", description: "Sources, chambres vues et demandes permettent d'identifier les abandons.", icon: "growth" },
      ],
      automationTitle: "Connecter le site au fonctionnement de la réception",
      automationIntro: "L'intégration dépend du PMS et du channel manager. Sans API fiable, une demande confirmée humainement vaut mieux qu'une fausse disponibilité.",
      automations: [
        { title: "Alerte réception", description: "Transmettre dates, chambre, voyageurs et demandes spéciales.", icon: "envelope" },
        { title: "Pré-arrivée", description: "Envoyer les informations approuvées avant le séjour.", icon: "travel" },
        { title: "Transfert", description: "Créer une demande de navette lorsque le client l'a explicitement choisie.", icon: "car" },
        { title: "Reporting", description: "Mesurer l'origine des demandes directes et leur conversion réelle.", icon: "data" },
      ],
      processTitle: "Construire un canal direct compatible avec vos outils",
      process: [
        { title: "Auditer les réservations", description: "OTA, PMS, channel manager, tarifs et règles." },
        { title: "Structurer l'offre", description: "Chambres, expériences, conditions et informations locales." },
        { title: "Concevoir le site", description: "Direction visuelle, mobile, multilingue et performance." },
        { title: "Connecter avec prudence", description: "API officielle, confirmation humaine et tracking." },
      ],
      searchTitle: "Développer la réservation directe sans viser le mauvais trafic",
      searchParagraphs: ["La page Manda cible les hôteliers qui cherchent un prestataire web. Le futur site de l'hôtel ciblera ensuite les recherches d'hébergement liées à sa destination.", "Le SEO direct complète les plateformes avec des pages propriétaires, des contenus locaux et une marque identifiable."],
      searchTopics: ["création site internet hôtel", "site web hôtel", "réservation directe hôtel", "site web maison d'hôtes"],
      links: [
        { label: "Voir le projet MadaVoyage", href: "/projects/madavoyage", description: "Une approche tourisme orientée demande." },
        { label: "Développement de sites et SaaS", href: "/services/developpement-sites-saas", description: "Site multilingue et intégrations." },
        { label: "Automatisation n8n", href: "/services/automatisation-n8n", description: "Alertes et parcours pré-arrivée." },
        { label: "Consultant SEO + GEO", href: "/services/consultant-seo-geo", description: "Recherche locale et internationale." },
      ],
      faq: [
        { question: "Peut-on afficher les disponibilités en temps réel ?", answer: "Oui si le PMS ou channel manager fournit une API ou un moteur officiel. Sinon, le site doit présenter une demande soumise à confirmation." },
        { question: "Le site peut-il remplacer Booking ou Expedia ?", answer: "Il peut augmenter les réservations directes et fidéliser, mais les plateformes peuvent rester un canal d'acquisition complémentaire." },
        { question: "Combien de langues faut-il prévoir ?", answer: "Uniquement celles que l'équipe peut réellement maintenir et utiliser avec les clients." },
        { question: "Peut-on intégrer un paiement ou acompte ?", answer: "Oui après vérification de la disponibilité, des conditions et du processus de remboursement." },
        { question: "Quels contenus améliorent le SEO d'un hôtel ?", answer: "Chambres détaillées, localisation, accès, expériences, réponses pratiques et contenus locaux réellement utiles." },
        { question: "Quel budget prévoir pour créer le site d'un hôtel ?", answer: "Le budget dépend des langues, du nombre d'hébergements, du moteur de réservation et des connexions au PMS ou au channel manager. Une demande de disponibilité fiable coûte souvent moins qu'un moteur recréé sans source de vérité." },
      ],
      ctaTitle: "Votre hôtel doit reprendre la relation directe avec ses voyageurs ?",
      ctaDescription: "Envoyez-moi vos chambres, vos marchés, votre PMS et votre parcours actuel de réservation.",
    },
    en: {
      slug: "hotel",
      name: "Hotel and accommodation",
      eyebrow: "Hospitality",
      title: "Website development for hotels and accommodation",
      metaTitle: "Hotel website and direct booking development",
      metaDescription: "Fast multilingual hotel websites with room pages, direct booking, local SEO and optional PMS or n8n integrations.",
      lead: "A hotel website must show the real experience, answer practical questions and provide a credible direct booking path. I build multilingual journeys that complement platforms rather than copying them.",
      audience: "Independent hotels, lodges, guest houses, eco-lodges, residences and tourism accommodation.",
      primaryAction: "Check and request availability",
      heroHighlights: ["Comparable rooms", "Controlled direct booking", "Multilingual local content"],
      painsTitle: "Why guests return to a platform",
      painsIntro: "Unclear rooms, ambiguous pricing or unverifiable availability reduce direct-booking trust.",
      pains: [
        { title: "Identical-looking rooms", description: "Capacity, bedding, amenities and imagery do not support a fast choice.", icon: "bed" },
        { title: "Uncertain booking", description: "A form may promise availability that the team still needs to confirm.", icon: "calendar" },
        { title: "Low visibility", description: "Without useful local content, discovery stays with OTAs.", icon: "search" },
      ],
      outcomesTitle: "An honest direct booking journey",
      outcomesIntro: "The experience distinguishes real-time availability, booking request and general contact.",
      outcomes: [
        { title: "Room pages", description: "Capacity, bedding, amenities, rules, imagery and visible differences.", icon: "bed" },
        { title: "Availability", description: "PMS connection where possible, otherwise clearly confirmed requests.", icon: "calendar" },
        { title: "Local experience", description: "Access, activities, transfers and useful arrival information.", icon: "location" },
        { title: "Multilingual", description: "Pages and metadata adapted to markets genuinely served.", icon: "chat" },
        { title: "Evidence", description: "Real imagery, conditions, reviews and consistent contact details.", icon: "shield" },
        { title: "Measurement", description: "Sources, viewed rooms and enquiries reveal abandonment.", icon: "growth" },
      ],
      automationTitle: "Connect the website to reception operations",
      automationIntro: "Integration depends on the PMS and channel manager. Human confirmation is better than false availability.",
      automations: [
        { title: "Reception alert", description: "Send dates, room, guests and special requests.", icon: "envelope" },
        { title: "Pre-arrival", description: "Deliver approved practical information before the stay.", icon: "travel" },
        { title: "Transfers", description: "Create a shuttle request when explicitly selected.", icon: "car" },
        { title: "Reporting", description: "Measure direct enquiry source and actual conversion.", icon: "data" },
      ],
      processTitle: "Build a direct channel compatible with existing tools",
      process: [
        { title: "Audit booking", description: "OTAs, PMS, channel manager, rates and rules." },
        { title: "Structure the offer", description: "Rooms, experiences, conditions and local information." },
        { title: "Design the site", description: "Visual direction, mobile, multilingual and performance." },
        { title: "Connect carefully", description: "Official API, human confirmation and tracking." },
      ],
      searchTitle: "Grow direct booking without targeting the wrong visitor",
      searchParagraphs: ["This Manda page targets hotel owners looking for a website partner. Their future website targets accommodation searches around the destination.", "Direct SEO complements platforms with owned pages, local information and a recognizable brand."],
      searchTopics: ["hotel website development", "direct booking website", "guest house website", "hotel SEO"],
      links: [
        { label: "View MadaVoyage", href: "/en/projects/madavoyage", description: "A tourism journey designed around enquiries." },
        { label: "Website and SaaS development", href: "/en/services/sites-saas-development", description: "Multilingual websites and integrations." },
        { label: "n8n automation", href: "/en/services/n8n-automation", description: "Alerts and pre-arrival journeys." },
        { label: "SEO + GEO consulting", href: "/en/services/seo-geo-consultant", description: "Local and international search." },
      ],
      faq: [
        { question: "Can the website show live availability?", answer: "Yes when the PMS or channel manager provides an official API or booking engine. Otherwise requests should be clearly subject to confirmation." },
        { question: "Can it replace Booking or Expedia?", answer: "It can increase direct bookings and retention, while platforms may remain a complementary acquisition channel." },
        { question: "How many languages should we support?", answer: "Only languages the team can genuinely maintain and use with guests." },
        { question: "Can it collect payment or a deposit?", answer: "Yes after availability, terms and refund workflow are verified." },
        { question: "Which content supports hotel SEO?", answer: "Detailed rooms, location, access, experiences, practical answers and genuinely useful local content." },
        { question: "What budget should a hotel website allow for?", answer: "The budget depends on languages, room inventory, the booking engine and PMS or channel-manager connections. A reliable availability request often costs less than rebuilding a booking engine without a trustworthy data source." },
      ],
      ctaTitle: "Should your hotel own more of the guest relationship?",
      ctaDescription: "Send me your rooms, markets, PMS and current booking journey.",
    },
  },
  {
    key: "restaurant",
    icon: "restaurant",
    tone: "orange",
    fr: {
      slug: "restaurant",
      name: "Restaurant",
      eyebrow: "Restauration",
      title: "Création de site internet pour restaurant",
      metaTitle: "Création site internet restaurant",
      metaDescription: "Site de restaurant avec menu mobile, réservation, SEO local, événements, commande ou automatisation selon votre fonctionnement.",
      lead: "Le site d'un restaurant doit répondre en quelques secondes : que mange-t-on, à quel prix, où, quand et comment réserver ? Je construis une présence locale rapide qui met le menu et l'action avant les effets décoratifs.",
      audience: "Restaurants indépendants, tables d'hôtes, cafés, bars, traiteurs et établissements avec événements ou privatisation.",
      primaryAction: "Consulter le menu puis réserver ou demander",
      heroHighlights: ["Menu lisible sur mobile", "Réservation adaptée au service", "SEO local et événements"],
      painsTitle: "Les frictions qui font choisir une autre table",
      painsIntro: "Un menu PDF illisible, des horaires incohérents ou une réservation sans confirmation suffisent à perdre une visite locale.",
      pains: [
        { title: "Menu inaccessible", description: "Le client zoome dans un PDF ou ne sait pas si les informations sont encore à jour.", icon: "restaurant" },
        { title: "Informations dispersées", description: "Horaires, adresse, téléphone et fermetures diffèrent entre le site et les plateformes.", icon: "location" },
        { title: "Réservation mal cadrée", description: "Le restaurant reçoit des demandes impossibles ou oublie de les confirmer.", icon: "calendar" },
      ],
      outcomesTitle: "Une page locale qui donne envie et facilite la décision",
      outcomesIntro: "L'identité du lieu reste forte, mais chaque information importante reste accessible sur mobile.",
      outcomes: [
        { title: "Menu HTML", description: "Catégories, prix, allergènes et disponibilité éditables sans remplacer un PDF.", icon: "restaurant" },
        { title: "Réservation", description: "Lien vers l'outil existant ou demande confirmée selon la capacité du service.", icon: "calendar" },
        { title: "SEO local", description: "Adresse, horaires, cuisine, accès et données structurées cohérentes.", icon: "location" },
        { title: "Événements", description: "Brunch, menu spécial, privatisation et groupes disposent d'un parcours précis.", icon: "megaphone" },
        { title: "Photos réelles", description: "Cuisine, salle, équipe et plats reflètent l'expérience sans banque d'images générique.", icon: "image" },
        { title: "Conversions", description: "Réservations, appels, itinéraires et demandes de groupe sont mesurés séparément.", icon: "growth" },
      ],
      automationTitle: "Automatiser autour du service, jamais contre lui",
      automationIntro: "L'équipe doit pouvoir fermer un créneau, refuser un groupe ou corriger un menu sans combattre le système.",
      automations: [
        { title: "Confirmation", description: "Envoyer une confirmation seulement lorsque la table est réellement acceptée.", icon: "check" },
        { title: "Demandes de groupe", description: "Router les privatisations et menus de groupe vers le bon responsable.", icon: "user" },
        { title: "Mise à jour", description: "Synchroniser certains contenus depuis une source maîtrisée sans exposer une base au public.", icon: "sync" },
        { title: "Avis après visite", description: "Préparer une demande mesurée et respectueuse, sans relance agressive.", icon: "chat" },
      ],
      processTitle: "Concevoir avec la salle et la cuisine",
      process: [
        { title: "Observer le service", description: "Horaires, capacité, outils, groupes et changements de menu." },
        { title: "Hiérarchiser l'information", description: "Menu, accès, preuve, réservation et événements." },
        { title: "Produire le site", description: "Direction visuelle, vraies images, mobile et performance." },
        { title: "Tester en situation", description: "Fermeture, menu indisponible, groupe et confirmation." },
      ],
      searchTitle: "Une intention commerciale confirmée autour de la création de site restaurant",
      searchParagraphs: ["Les tendances relient directement la recherche site internet restaurant à la création de site, au prix et au menu. La page répond donc au dirigeant, tandis que le futur site vise les clients locaux.", "Le contenu évite les pages par ville sans établissement réel et concentre les signaux locaux sur les informations vérifiables."],
      searchTopics: ["création site internet restaurant", "prix site internet restaurant", "menu restaurant en ligne", "site réservation restaurant"],
      links: [
        { label: "Développement de sites et SaaS", href: "/services/developpement-sites-saas", description: "Site rapide, menu et intégrations." },
        { label: "Voir les sites métier", href: "/site-metier", description: "Explorer les autres secteurs." },
        { label: "Automatisation n8n", href: "/services/automatisation-n8n", description: "Confirmations et routage." },
        { label: "Consultant SEO + GEO", href: "/services/consultant-seo-geo", description: "Visibilité locale et données structurées." },
      ],
      faq: [
        { question: "Pourquoi éviter un menu uniquement en PDF ?", answer: "Un menu HTML est plus lisible sur mobile, plus facile à actualiser et plus compréhensible pour les moteurs de recherche." },
        { question: "Peut-on connecter une plateforme de réservation ?", answer: "Oui via son lien, son widget ou son API officielle. Le site ne doit pas recréer une disponibilité qu'il ne peut pas garantir." },
        { question: "Le restaurant peut-il modifier le menu ?", answer: "Oui avec une source simple adaptée à la personne qui maintient le contenu, sans forcément ajouter un CMS lourd." },
        { question: "Peut-on gérer la commande en ligne ?", answer: "Oui, mais commande, paiement, stock et livraison forment un produit plus complexe à cadrer séparément." },
        { question: "Comment améliorer le référencement local ?", answer: "Coordonnées cohérentes, Google Business Profile, menu lisible, avis, données structurées et contenu réel sur le lieu et sa cuisine." },
        { question: "Quel budget prévoir pour créer un site de restaurant ?", answer: "Le budget dépend du menu, de la réservation, des langues, des événements et d'une éventuelle commande en ligne. Le premier lot doit rendre le menu, les horaires et l'action parfaitement accessibles sur mobile." },
      ],
      ctaTitle: "Votre restaurant doit être aussi clair en ligne qu'à table ?",
      ctaDescription: "Envoyez-moi votre menu, vos horaires, votre outil de réservation et les demandes importantes pour l'équipe.",
    },
    en: {
      slug: "restaurant",
      name: "Restaurant",
      eyebrow: "Food and hospitality",
      title: "Website development for restaurants",
      metaTitle: "Restaurant website development",
      metaDescription: "Restaurant websites with mobile menus, booking, local SEO, events and optional workflow automation.",
      lead: "A restaurant website must answer in seconds: what is served, at what price, where, when and how to book. I build a fast local presence that puts menu and action before decoration.",
      audience: "Independent restaurants, cafés, bars, caterers and venues serving events or private groups.",
      primaryAction: "Read the menu, then book or enquire",
      heroHighlights: ["Readable mobile menu", "Booking matched to service", "Local SEO and events"],
      painsTitle: "The friction that sends guests elsewhere",
      painsIntro: "An unreadable PDF, inconsistent hours or an unconfirmed booking can lose a nearby customer.",
      pains: [
        { title: "Inaccessible menu", description: "Guests zoom into a PDF or cannot tell whether information is current.", icon: "restaurant" },
        { title: "Scattered information", description: "Hours, address and closures differ across the website and platforms.", icon: "location" },
        { title: "Poorly framed booking", description: "The restaurant receives impossible requests or forgets to confirm them.", icon: "calendar" },
      ],
      outcomesTitle: "A local page that supports appetite and decisions",
      outcomesIntro: "The venue keeps its identity while every critical detail stays accessible on mobile.",
      outcomes: [
        { title: "HTML menu", description: "Categories, prices, allergens and availability without replacing PDFs.", icon: "restaurant" },
        { title: "Booking", description: "Existing booking platform or confirmed request according to capacity.", icon: "calendar" },
        { title: "Local SEO", description: "Address, hours, cuisine, access and consistent structured data.", icon: "location" },
        { title: "Events", description: "Brunch, special menus, private hire and groups get clear journeys.", icon: "megaphone" },
        { title: "Real photography", description: "Food, space and team reflect the actual experience.", icon: "image" },
        { title: "Conversions", description: "Bookings, calls, directions and group requests are measured separately.", icon: "growth" },
      ],
      automationTitle: "Automate around service, never against it",
      automationIntro: "The team must be able to close a slot, reject a group or update a menu without fighting the system.",
      automations: [
        { title: "Confirmation", description: "Confirm only when the table has genuinely been accepted.", icon: "check" },
        { title: "Group enquiries", description: "Route private and group requests to the right owner.", icon: "user" },
        { title: "Updates", description: "Sync selected content from a controlled source.", icon: "sync" },
        { title: "Post-visit review", description: "Prepare one respectful, measured review request.", icon: "chat" },
      ],
      processTitle: "Design with front and back of house",
      process: [
        { title: "Observe service", description: "Hours, capacity, tools, groups and menu changes." },
        { title: "Prioritize information", description: "Menu, access, evidence, booking and events." },
        { title: "Build the website", description: "Visual direction, real imagery, mobile and performance." },
        { title: "Test real cases", description: "Closure, unavailable item, group and confirmation." },
      ],
      searchTitle: "Commercial intent around restaurant website development",
      searchParagraphs: ["Search behaviour connects restaurant websites with creation, pricing and menus. This page serves the owner while their future site serves local guests.", "Local signals stay tied to a real venue rather than artificial city pages."],
      searchTopics: ["restaurant website development", "restaurant menu website", "restaurant booking website", "local SEO for restaurants"],
      links: [
        { label: "Website and SaaS development", href: "/en/services/sites-saas-development", description: "Fast website, menu and integrations." },
        { label: "Explore business websites", href: "/en/site-metier", description: "Review other sectors." },
        { label: "n8n automation", href: "/en/services/n8n-automation", description: "Confirmations and routing." },
        { label: "SEO + GEO consulting", href: "/en/services/seo-geo-consultant", description: "Local visibility and structured data." },
      ],
      faq: [
        { question: "Why avoid a PDF-only menu?", answer: "An HTML menu is easier to read on mobile, update and understand for search engines." },
        { question: "Can you connect a booking platform?", answer: "Yes through its official link, widget or API. The website should not invent availability." },
        { question: "Can staff update the menu?", answer: "Yes through a lightweight source matched to the person maintaining it, without forcing a heavy CMS." },
        { question: "Can the site handle online ordering?", answer: "Yes, but ordering, payment, stock and delivery form a more complex product that needs separate scope." },
        { question: "What improves local restaurant SEO?", answer: "Consistent details, Google Business Profile, readable menus, reviews, structured data and genuine venue content." },
        { question: "What budget should a restaurant website allow for?", answer: "The budget depends on the menu, booking, languages, events and any online ordering. The first release should make the menu, hours and primary action perfectly accessible on mobile." },
      ],
      ctaTitle: "Should your restaurant be as clear online as it is at the table?",
      ctaDescription: "Send me your menu, hours, booking tool and the enquiries that matter to the team.",
    },
  },
  {
    key: "car-rental",
    icon: "car",
    tone: "violet",
    fr: {
      slug: "location-voiture",
      name: "Location de voiture",
      eyebrow: "Mobilité et tourisme",
      title: "Création de site internet pour agence de location de voiture",
      metaTitle: "Création site agence de location de voiture",
      metaDescription: "Site pour agence de location de voiture : flotte, disponibilité, devis, options, acompte, SEO local et automatisation du suivi.",
      lead: "Une agence de location ne doit pas seulement afficher des véhicules. Elle doit expliquer les conditions, vérifier les dates et transformer une recherche souvent urgente en dossier réservable sans promettre une voiture déjà prise.",
      audience: "Agences indépendantes, loueurs locaux, transferts aéroport, location avec chauffeur et flottes touristiques.",
      primaryAction: "Demander un véhicule disponible aux bonnes dates",
      heroHighlights: ["Flotte comparable", "Dates et options qualifiées", "Confirmation ou acompte contrôlé"],
      painsTitle: "La disponibilité et les conditions créent l'essentiel de la friction",
      painsIntro: "Les recherches autour des sites de location sont fortement orientées vers le client final. La page commerciale doit donc parler au loueur, puis son futur site traiter précisément ces objections.",
      pains: [
        { title: "Flotte imprécise", description: "Catégorie, places, bagages, transmission et conditions ne sont pas comparables.", icon: "car" },
        { title: "Disponibilité fictive", description: "Un formulaire accepte des dates sans vérifier le calendrier réel.", icon: "calendar" },
        { title: "Conditions tardives", description: "Caution, kilométrage, assurance ou livraison apparaissent après la demande.", icon: "document" },
      ],
      outcomesTitle: "Un parcours de location transparent avant la confirmation",
      outcomesIntro: "Le système collecte les dates, le lieu et les options tout en gardant une distinction claire entre demande et réservation ferme.",
      outcomes: [
        { title: "Catalogue flotte", description: "Catégories, capacité, boîte, carburant, bagages et usages recommandés.", icon: "car" },
        { title: "Recherche par dates", description: "Disponibilité réelle si l'outil le permet, sinon demande soumise à confirmation.", icon: "calendar" },
        { title: "Lieux et livraison", description: "Aéroport, hôtel, agence et zones avec frais clairement expliqués.", icon: "location" },
        { title: "Conditions visibles", description: "Permis, âge, caution, assurance, kilométrage et annulation avant envoi.", icon: "shield" },
        { title: "Options", description: "Chauffeur, siège enfant, transfert ou équipement ajoutés au même dossier.", icon: "plus" },
        { title: "Acquisition mesurée", description: "Véhicules vus, recherches de dates et demandes abouties par canal.", icon: "growth" },
      ],
      automationTitle: "Synchroniser la flotte seulement avec une source fiable",
      automationIntro: "Une base légère peut suffire pour une petite flotte. Le temps réel n'est pertinent que si chaque réservation et indisponibilité met la même source à jour.",
      automations: [
        { title: "Contrôle de doublon", description: "Éviter deux dossiers concurrents pour le même véhicule et les mêmes dates.", icon: "sync" },
        { title: "Dossier location", description: "Centraliser conducteur, dates, lieu, véhicule et options.", icon: "data" },
        { title: "Validation", description: "Demander une approbation avant confirmation ou lien d'acompte.", icon: "check" },
        { title: "Pré-départ", description: "Envoyer uniquement les documents et informations nécessaires au retrait.", icon: "envelope" },
      ],
      processTitle: "Partir de la flotte et des règles réelles",
      process: [
        { title: "Auditer la flotte", description: "Véhicules, statuts, saison, options et source de vérité." },
        { title: "Cadrer les conditions", description: "Permis, caution, assurance, livraison et paiement." },
        { title: "Construire le parcours", description: "Catalogue, dates, demande mobile et preuves." },
        { title: "Tester les conflits", description: "Double demande, prolongation, annulation et véhicule indisponible." },
      ],
      searchTitle: "Séparer la recherche du loueur de celle du voyageur",
      searchParagraphs: ["La requête site location voiture est dominée par les consommateurs qui comparent des loueurs. La landing Manda doit donc employer explicitement création de site pour agence de location de voiture.", "Le futur site du loueur pourra ensuite viser les recherches client autour de l'aéroport, de la destination, du véhicule et des dates."],
      searchTopics: ["création site internet location de voiture", "site web pour loueur automobile", "site réservation véhicule", "logiciel location voiture"],
      links: [
        { label: "Voir le projet MadaVoyage", href: "/projects/madavoyage", description: "Un parcours tourisme orienté conversion." },
        { label: "Développement de sites et SaaS", href: "/services/developpement-sites-saas", description: "Catalogue, dates et back-office léger." },
        { label: "Automatisation n8n", href: "/services/automatisation-n8n", description: "Validation, dossiers et notifications." },
        { label: "Consultant SEO + GEO", href: "/services/consultant-seo-geo", description: "Ciblage transactionnel et local." },
      ],
      faq: [
        { question: "Le site peut-il afficher la disponibilité en temps réel ?", answer: "Oui si toutes les réservations alimentent une source de vérité fiable. Sinon une demande avec confirmation protège mieux l'agence." },
        { question: "Peut-on demander les documents du conducteur ?", answer: "Oui, mais seulement via un stockage sécurisé, avec accès limité et durée de conservation définie." },
        { question: "Quand demander un acompte ?", answer: "Après contrôle du véhicule, des dates, des conditions et de l'identité requise par l'agence." },
        { question: "Faut-il un logiciel complet de gestion ?", answer: "Pas pour toutes les petites flottes. Le site peut commencer par un catalogue et des demandes structurées, puis évoluer lorsque le volume le justifie." },
        { question: "Le site peut-il gérer plusieurs lieux de livraison ?", answer: "Oui avec zones, frais, horaires et règles clairement configurés." },
        { question: "Quel budget prévoir pour un site de location automobile ?", answer: "Le budget dépend de la taille de la flotte, des disponibilités, du paiement, des documents et des lieux de livraison. Un catalogue avec demandes confirmées peut précéder un moteur de réservation complet." },
      ],
      ctaTitle: "Votre flotte doit recevoir des demandes réellement réservables ?",
      ctaDescription: "Envoyez-moi vos véhicules, vos règles, vos lieux et la source où vous gérez aujourd'hui les disponibilités.",
    },
    en: {
      slug: "car-rental",
      name: "Car rental",
      eyebrow: "Mobility and tourism",
      title: "Website development for car rental agencies",
      metaTitle: "Car rental website development",
      metaDescription: "Car rental websites with fleet catalogue, availability, quote requests, options, deposits, local SEO and workflow automation.",
      lead: "A rental agency should not only display vehicles. It must explain terms, verify dates and turn urgent searches into bookable cases without promising a car that is already unavailable.",
      audience: "Independent rental agencies, local operators, airport transfers, chauffeured rental and tourism fleets.",
      primaryAction: "Request an available vehicle for specific dates",
      heroHighlights: ["Comparable fleet", "Qualified dates and options", "Controlled confirmation or deposit"],
      painsTitle: "Availability and terms create most friction",
      painsIntro: "Consumer searches dominate car rental results. This commercial page speaks to the operator, while their future website handles customer objections.",
      pains: [
        { title: "Unclear fleet", description: "Category, seats, luggage, transmission and conditions are difficult to compare.", icon: "car" },
        { title: "False availability", description: "A form accepts dates without checking the real calendar.", icon: "calendar" },
        { title: "Late conditions", description: "Deposit, mileage, insurance or delivery appear after enquiry.", icon: "document" },
      ],
      outcomesTitle: "A transparent rental journey before confirmation",
      outcomesIntro: "The system captures dates, place and options while distinguishing request from confirmed booking.",
      outcomes: [
        { title: "Fleet catalogue", description: "Category, capacity, gearbox, fuel, luggage and recommended use.", icon: "car" },
        { title: "Date search", description: "Live availability where reliable, otherwise confirmed request.", icon: "calendar" },
        { title: "Locations", description: "Airport, hotel, branch and delivery zones with clear fees.", icon: "location" },
        { title: "Visible terms", description: "Licence, age, deposit, insurance, mileage and cancellation.", icon: "shield" },
        { title: "Options", description: "Driver, child seat, transfer or equipment in one case.", icon: "plus" },
        { title: "Measured acquisition", description: "Viewed cars, date searches and completed enquiries by channel.", icon: "growth" },
      ],
      automationTitle: "Synchronize the fleet only with a reliable source",
      automationIntro: "A lightweight database may suit a small fleet. Real time matters only when every reservation updates the same source.",
      automations: [
        { title: "Duplicate control", description: "Prevent competing cases for the same car and dates.", icon: "sync" },
        { title: "Rental case", description: "Centralize driver, dates, place, vehicle and options.", icon: "data" },
        { title: "Approval", description: "Require review before confirmation or deposit link.", icon: "check" },
        { title: "Pre-pickup", description: "Send only required documents and collection information.", icon: "envelope" },
      ],
      processTitle: "Start with the real fleet and rules",
      process: [
        { title: "Audit the fleet", description: "Vehicles, status, season, options and source of truth." },
        { title: "Frame conditions", description: "Licence, deposit, insurance, delivery and payment." },
        { title: "Build the journey", description: "Catalogue, dates, mobile enquiry and evidence." },
        { title: "Test conflicts", description: "Double requests, extensions, cancellation and unavailability." },
      ],
      searchTitle: "Separate operator intent from traveller intent",
      searchParagraphs: ["Generic car rental website searches are dominated by consumers. This page explicitly targets agencies looking for website development.", "Their future website can then target customer searches around airports, destinations, vehicles and dates."],
      searchTopics: ["car rental website development", "vehicle rental booking website", "car rental agency website", "car rental software"],
      links: [
        { label: "View MadaVoyage", href: "/en/projects/madavoyage", description: "A tourism conversion journey." },
        { label: "Website and SaaS development", href: "/en/services/sites-saas-development", description: "Catalogue, dates and lightweight back office." },
        { label: "n8n automation", href: "/en/services/n8n-automation", description: "Approval, cases and notifications." },
        { label: "SEO + GEO consulting", href: "/en/services/seo-geo-consultant", description: "Transactional and local targeting." },
      ],
      faq: [
        { question: "Can the website show live availability?", answer: "Yes if every booking updates a reliable source of truth. Otherwise confirmed requests protect the agency." },
        { question: "Can it collect driver documents?", answer: "Yes through secured storage with limited access and a defined retention period." },
        { question: "When should a deposit be requested?", answer: "After the vehicle, dates, conditions and required identity have been checked." },
        { question: "Do we need full rental management software?", answer: "Not for every small fleet. Start with catalogue and structured enquiries, then expand when volume justifies it." },
        { question: "Can it manage several delivery locations?", answer: "Yes with configured zones, fees, hours and rules." },
        { question: "What budget should a car rental website allow for?", answer: "The budget depends on fleet size, availability, payments, documents and delivery locations. A catalogue with confirmed enquiries can precede a complete booking engine." },
      ],
      ctaTitle: "Should your fleet receive genuinely bookable enquiries?",
      ctaDescription: "Send me your vehicles, rules, locations and current availability source.",
    },
  },
];

function localize(entry: BusinessVerticalEntry, locale: Locale): BusinessVertical {
  const current = entry[locale];
  const alternate = entry[locale === "fr" ? "en" : "fr"];

  return {
    ...current,
    key: entry.key,
    icon: entry.icon,
    tone: entry.tone,
    alternateSlug: alternate.slug,
  };
}

export function getBusinessVerticals(locale: Locale): BusinessVertical[] {
  return entries.map((entry) => localize(entry, locale));
}

export function getBusinessVerticalBySlug(slug: string, locale: Locale): BusinessVertical | null {
  const entry = entries.find((item) => item[locale].slug === slug);
  return entry ? localize(entry, locale) : null;
}

export function getBusinessVerticalStaticParams(): { locale: Locale; slug: string }[] {
  return entries.flatMap((entry) => [
    { locale: "fr" as const, slug: entry.fr.slug },
    { locale: "en" as const, slug: entry.en.slug },
  ]);
}

export function getBusinessVerticalSitemapPairs(): { frSlug: string; enSlug: string }[] {
  return entries.map((entry) => ({ frSlug: entry.fr.slug, enSlug: entry.en.slug }));
}
