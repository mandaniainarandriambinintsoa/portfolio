import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { getPayload } from "payload";

await loadEnvLocal(".env.local");

const supabaseOnly = process.argv.includes("--supabase-only");
const payloadOnly = process.argv.includes("--payload-only");
const httpOnly = process.argv.includes("--http-only");
let payload = null;

if (!supabaseOnly && !httpOnly) {
  const { default: payloadConfig } = await import("../../payload.config.ts");
  payload = await getPayload({ config: payloadConfig });
}

const slug = "automatiser-business-n8n-guide-complet";
const [frDictionary, enDictionary] = await Promise.all([
  readJson("src/i18n/dictionaries/fr.json"),
  readJson("src/i18n/dictionaries/en.json"),
]);
const targetedServiceSlugs = new Set([
  "developpeur-react-nextjs-madagascar",
  "developpeur-javascript-madagascar",
  "developpeur-nodejs-madagascar",
]);

const article = {
  title: {
    fr: "Automatiser son entreprise avec n8n : Cloud, Docker, IA et workflows",
    en: "Automate your business with n8n: Cloud, Docker, AI and workflows",
  },
  excerpt: {
    fr: "Guide pratique pour choisir n8n Cloud ou Docker, concevoir des workflows fiables, intégrer l'IA et automatiser CRM, emails, reporting et relances.",
    en: "A practical guide to choosing n8n Cloud or Docker, building reliable workflows, adding AI and automating CRM, email, reporting and follow-ups.",
  },
  seoTitle: {
    fr: "Automatisation n8n : Cloud, Docker, IA et workflows",
    en: "n8n Automation: Cloud, Docker, AI and Workflows",
  },
  seoDescription: {
    fr: "Guide n8n pour choisir Cloud ou Docker, créer des workflows fiables, intégrer l'IA et automatiser CRM, emails, reporting et relances.",
    en: "A practical n8n guide to choosing Cloud or Docker, building reliable workflows, adding AI and automating CRM, email, reporting and follow-ups.",
  },
  content: {
    fr: `
L'automatisation n8n devient utile quand une information doit passer d'un outil à un autre sans copier-coller : un formulaire vers le CRM, un paiement vers la facturation, une réponse client vers l'équipe commerciale ou des données de campagne vers un rapport.

Le choix de l'hébergement compte, mais il arrive après une question plus simple : **quel processus voulez-vous rendre plus rapide, plus fiable ou plus visible ?** Ce guide vous aide à choisir entre n8n Cloud et Docker, à structurer un workflow de production et à intégrer l'IA sans créer une boîte noire.

## Qu'est-ce que n8n et à quoi sert-il ?

n8n est un outil d'orchestration de workflows. Il reçoit un événement, transforme les données, applique des règles et déclenche des actions dans vos autres outils.

Un workflow peut commencer avec un formulaire, un webhook, un email entrant, un paiement, un événement CRM ou une tâche planifiée. Il peut ensuite vérifier les champs, rechercher un contact, appeler une API, préparer un document, envoyer une notification et enregistrer le résultat.

n8n ne remplace pas votre CRM, votre logiciel de facturation ou votre base client. Ces outils restent les sources de vérité. n8n automatise les passages entre eux.

Pour un besoin déjà cadré, consultez directement la page [automatisation n8n pour PME](/solutions/automatisation-n8n-pme). Pour la conception, l'hébergement et la maintenance, la page [expert n8n à Madagascar](/services/automatisation-n8n-madagascar) détaille mon accompagnement.

## n8n Cloud ou Docker : comment choisir ?

Les deux versions exécutent les mêmes logiques métier. La différence principale concerne la responsabilité de l'infrastructure.

| Critère | n8n Cloud | n8n avec Docker |
| --- | --- | --- |
| Mise en route | Compte prêt à l'emploi | Serveur, domaine, HTTPS et stockage à configurer |
| Maintenance | Gérée par n8n | Gérée par votre équipe ou votre prestataire |
| Mises à jour | Automatiques | Planifiées et testées par vos soins |
| Contrôle des données | Hébergement géré | Hébergement et région choisis par vous |
| Coût | Abonnement selon l'offre | Serveur, sauvegardes et temps de maintenance |
| Personnalisation | Suffisante pour la majorité des workflows | Plus de contrôle sur le réseau et l'environnement |

### Choisissez n8n Cloud si vous voulez démarrer vite

n8n Cloud convient à une PME qui veut automatiser quelques processus sans administrer de serveur. L'équipe se concentre sur les credentials, les règles métier et les tests. Les mises à jour, la disponibilité de la plateforme et une partie de la maintenance restent gérées.

C'est souvent le meilleur choix pour valider un premier workflow : formulaire vers CRM, rapport hebdomadaire, notification de paiement ou synchronisation simple.

### Choisissez Docker si le contrôle de l'infrastructure compte

Une instance Docker convient quand l'entreprise doit choisir la région d'hébergement, accéder à des services privés, contrôler la politique de sauvegarde ou déployer des composants supplémentaires.

Docker ne rend pas n8n gratuit à exploiter. Il faut prévoir le serveur, les sauvegardes, la supervision, les mises à jour et le temps d'intervention. Le bon calcul compare donc le coût total de possession, pas seulement le prix du VPS.

### Une règle simple pour décider

Commencez avec n8n Cloud lorsque la rapidité et la simplicité comptent davantage que l'infrastructure. Choisissez Docker lorsque vous avez une exigence explicite de réseau, de données, de personnalisation ou de volume, avec une personne responsable de la maintenance.

## Comment construire un workflow n8n fiable

Un workflow de production ne se résume pas à relier des blocs sur un canvas. Il doit rester compréhensible quand un service externe échoue, quand les données sont incomplètes ou quand la personne qui l'a créé n'est pas disponible.

### 1. Définir le déclencheur et la source de vérité

Chaque workflow doit avoir un point de départ identifiable et une source de vérité. Par exemple, le formulaire déclenche le traitement, mais le CRM décide si le contact existe déjà. Le paiement déclenche une notification, mais la base métier conserve le statut final de la commande.

### 2. Normaliser les données tôt

Les noms, emails, numéros, dates et identifiants arrivent rarement dans un format stable. Une étape de normalisation réduit les branches inutiles et évite les doublons. Elle facilite aussi les reprises après erreur.

### 3. Rendre les actions idempotentes

Un webhook peut arriver deux fois. Une API peut répondre après un délai et provoquer une nouvelle tentative. Le workflow doit reconnaître l'événement déjà traité afin de ne pas créer deux contacts, deux factures ou deux emails.

### 4. Prévoir les erreurs et les reprises

Chaque appel externe peut échouer. Les workflows critiques doivent distinguer les erreurs temporaires, les données invalides et les situations qui demandent un humain. Une alerte utile indique le workflow, l'étape, l'identifiant métier et la manière de reprendre.

### 5. Journaliser ce qui compte

Les logs n'ont pas besoin de stocker toutes les données. Ils doivent répondre à quatre questions : quel événement est entré, quelle décision a été prise, quelle action a été tentée et quel résultat a été obtenu.

## Cinq workflows n8n utiles pour une PME

### Formulaire, qualification et CRM

Le workflow valide la demande, cherche un doublon, ajoute la source, crée ou met à jour le contact puis prévient la bonne personne. Une étape IA peut résumer un message long, mais les règles d'attribution restent explicites.

### Emails et relances

Une demande de devis peut déclencher un accusé de réception, une tâche commerciale et une relance si personne n'a répondu. La séquence doit s'arrêter lorsqu'une réponse, une conversion ou un désabonnement est détecté.

La page [automatisation marketing n8n](/solutions/automatisation-marketing-n8n) décrit ce parcours en détail, avec CRM, segmentation et reporting.

### Facturation et paiements

Après un paiement confirmé, n8n peut mettre à jour la commande, préparer une facture, archiver le document et notifier le client. La validation du paiement doit rester côté serveur et être idempotente, surtout pour une intégration [Mobile Money à Madagascar](/solutions/api-mobile-money-madagascar).

### Reporting automatique

Un rapport quotidien ou hebdomadaire peut réunir ventes, leads, tickets et incidents. Le workflow collecte les chiffres depuis les sources de vérité, calcule les indicateurs puis envoie un résumé avec les liens permettant de vérifier les données.

### Support et alertes

Les demandes entrantes peuvent être classées par sujet et urgence, puis routées vers la bonne personne. Une IA peut proposer un résumé ou un brouillon. Les réclamations, remboursements et engagements restent en validation humaine.

Retrouvez d'autres exemples dans [5 workflows n8n pour PME à Madagascar](/blog/5-workflows-n8n-indispensables-pme-madagascar).

## n8n et IA : où l'agent apporte une vraie valeur

Une étape IA est pertinente lorsque l'entrée contient du texte, des intentions ou des documents difficiles à traiter avec une règle fixe. Elle peut résumer une conversation, classer une demande, extraire des champs, préparer un brouillon ou proposer un score expliqué.

Elle est moins utile pour calculer un montant, vérifier un statut, dédupliquer un identifiant ou appliquer une règle réglementaire. Ces décisions doivent rester déterministes.

Un agent IA dans n8n doit recevoir un contexte limité, utiliser des outils précis et produire une sortie structurée. Les actions sensibles passent ensuite par une validation humaine. C'est l'architecture utilisée pour un [agent IA Facebook](/solutions/agent-ia-facebook), un [agent de prospection](/solutions/agent-ia-prospection) ou des [workflows Claude Code et n8n](/solutions/workflows-n8n-claude-code).

## Combien coûte une automatisation n8n ?

Le coût dépend moins du nombre de blocs que du nombre de systèmes, de la qualité des données et des cas d'erreur.

Un workflow simple avec un déclencheur et une action peut être livré en quelques jours. Un parcours reliant CRM, email, facturation, IA et reporting demande davantage de cadrage, de tests et de supervision.

Le budget total comprend :

- la conception et le développement du workflow ;
- l'abonnement n8n Cloud ou l'infrastructure Docker ;
- les services connectés et leurs limites API ;
- la supervision, les sauvegardes et les mises à jour ;
- la maintenance lorsque les APIs ou les règles métier changent.

Le meilleur premier projet est un processus fréquent, mesurable et assez stable. Il permet de comparer le temps économisé, les erreurs évitées et le délai de traitement avant d'étendre l'automatisation.

## Méthode de déploiement en six étapes

1. Cartographier le parcours actuel avec les outils, responsables et exceptions.
2. Choisir une mesure : délai, erreurs, volume traité ou temps manuel.
3. Construire un premier chemin avec des données de test.
4. Ajouter les contrôles, logs, alertes et chemins de reprise.
5. Exécuter en parallèle du processus manuel sur un petit volume.
6. Documenter les accès, les variables, la maintenance et la procédure d'arrêt.

Cette méthode évite d'automatiser un processus mal compris. Elle permet aussi de prouver le retour avant d'ajouter d'autres workflows.

## Exemples de workflows déjà réalisés

[FlowRemote](/projects/scraping-flowremote) collecte et filtre des offres provenant de plusieurs sources avant d'envoyer un résumé utile.

[Leads Automation](/projects/leads-automation-showcase) montre un pipeline de collecte, qualification et synchronisation CRM.

[Tracking Visiteurs](/projects/tracking-visiteurs) relie des événements web, Supabase et des notifications pour rendre les parcours visibles.

Ces projets ont des déclencheurs différents, mais la même discipline : données normalisées, décisions lisibles, traces et reprise possible.

## FAQ

### n8n Cloud ou Docker : quelle version choisir pour commencer ?

n8n Cloud est le choix le plus simple pour tester rapidement un premier workflow. Docker devient pertinent lorsqu'une contrainte de données, de réseau, de personnalisation ou de volume justifie la maintenance d'une infrastructure.

### n8n peut-il remplacer Zapier ou Make ?

Oui pour de nombreux workflows, surtout lorsque vous avez besoin de logique conditionnelle, de code, d'APIs personnalisées ou de self-hosting. Le bon choix dépend toutefois des intégrations, du volume et de la capacité de maintenance de votre équipe.

### Faut-il savoir coder pour utiliser n8n ?

Les workflows simples peuvent être construits sans code. Les intégrations métier, la gestion d'erreur, l'authentification et les APIs personnalisées demandent souvent des compétences techniques.

### Peut-on connecter n8n à un CRM et à un outil email ?

Oui. n8n peut connecter un CRM, un formulaire, une plateforme email, une base de données ou une API. Il faut définir quel outil conserve la donnée de référence et comment gérer les doublons.

### n8n est-il adapté aux données sensibles ?

n8n peut être auto-hébergé, mais l'hébergement ne suffit pas. Il faut aussi limiter les credentials, chiffrer les échanges, contrôler les accès, éviter les données inutiles dans les logs et documenter les services tiers appelés.

### Comment démarrer sans automatiser trop de choses ?

Choisissez un seul processus fréquent avec une entrée, une sortie et une mesure claire. Envoyez-moi les étapes actuelles et les outils utilisés : je pourrai identifier ce qui mérite d'être automatisé et ce qui doit rester humain.
`.trim(),
    en: `
n8n automation becomes useful when information must move between tools without copy and paste: a form into the CRM, a payment into invoicing, a customer reply to the sales team or campaign data into a report.

Hosting matters, but it comes after a simpler question: **which process do you want to make faster, more reliable or more visible?** This guide explains how to choose between n8n Cloud and Docker, structure a production workflow and add AI without creating a black box.

## What is n8n used for?

n8n is a workflow orchestration tool. It receives an event, transforms data, applies rules and triggers actions in other systems.

A workflow can start with a form, webhook, incoming email, payment, CRM event or schedule. It can then validate fields, find a contact, call an API, prepare a document, send a notification and record the result.

n8n does not replace your CRM, invoicing software or customer database. Those systems remain the sources of truth. n8n automates the handoffs between them.

For an operational use case, see [n8n automation for SMBs](/en/solutions/n8n-automation-for-smbs). For design, hosting and maintenance, see my [n8n automation expert service](/en/services/n8n-automation-expert-madagascar).

## n8n Cloud or Docker: how to choose

Both options run the same business logic. The main difference is who owns infrastructure responsibility.

| Criterion | n8n Cloud | n8n with Docker |
| --- | --- | --- |
| Setup | Ready-to-use account | Server, domain, HTTPS and storage required |
| Maintenance | Managed by n8n | Managed by your team or provider |
| Updates | Automatic | Planned and tested by you |
| Data control | Managed hosting | You choose hosting and region |
| Cost | Subscription plan | Server, backups and maintenance time |
| Customization | Enough for most workflows | More network and environment control |

### Choose n8n Cloud to move quickly

n8n Cloud fits an SMB that wants to automate processes without administering a server. The team focuses on credentials, business rules and testing while the platform handles updates and infrastructure.

It is often the best place to validate a first workflow such as form-to-CRM, weekly reporting, payment notifications or a simple synchronization.

### Choose Docker when infrastructure control matters

A Docker deployment fits companies that must choose the hosting region, connect to private services, control backup policies or deploy extra components.

Docker does not make n8n free to operate. You still need a server, backups, monitoring, upgrades and intervention time. Compare total cost of ownership, not only the VPS price.

## How to build a reliable n8n workflow

A production workflow is more than connected nodes on a canvas. It must remain understandable when an external service fails, input data is incomplete or the original developer is unavailable.

### Define the trigger and source of truth

Every workflow needs an identifiable starting point and source of truth. A form can trigger processing, while the CRM decides whether the contact already exists. A payment can trigger a notification, while the business database owns the final order status.

### Normalize data early

Names, emails, phone numbers, dates and identifiers rarely arrive in a stable format. Early normalization reduces unnecessary branches, prevents duplicates and makes error recovery easier.

### Make actions idempotent

A webhook may arrive twice. An API may time out and trigger a retry. The workflow must recognize an event it has already processed so it does not create duplicate contacts, invoices or emails.

### Plan error recovery

Every external call can fail. Critical workflows should distinguish temporary failures, invalid data and cases requiring a person. A useful alert includes the workflow, step, business identifier and recovery action.

### Log what matters

Logs should answer four questions: which event came in, which decision was made, which action was attempted and what result came back.

## Five useful n8n workflows for an SMB

### Forms, qualification and CRM

Validate the request, find duplicates, attach the source, create or update the contact and notify the right owner. AI can summarize a long message, while routing rules stay explicit.

### Email and follow-ups

A quote request can trigger an acknowledgment, sales task and follow-up if nobody replies. The sequence stops when a reply, conversion or unsubscribe is detected.

The [n8n marketing automation](/en/solutions/n8n-marketing-automation) page covers CRM, segmentation, nurturing and reporting in detail.

### Invoicing and payments

After a confirmed payment, n8n can update the order, prepare an invoice, archive the document and notify the customer. Payment validation remains server-side and idempotent, especially for a [Mobile Money integration in Madagascar](/en/solutions/mobile-money-api-madagascar).

### Automated reporting

A daily or weekly report can combine sales, leads, tickets and incidents. The workflow reads the sources of truth, calculates metrics and sends a summary with links to verify the data.

### Support and alerts

Incoming requests can be classified by topic and urgency, then routed to the right person. AI can propose a summary or draft. Complaints, refunds and commitments stay under human approval.

## n8n and AI: where an agent adds value

AI helps when the input contains text, intent or documents that fixed rules cannot process well. It can summarize a conversation, classify a request, extract fields, prepare a draft or propose an explained score.

It is less useful for calculating an amount, checking a status, deduplicating an identifier or applying a regulatory rule. Those decisions should remain deterministic.

An AI agent in n8n should receive limited context, use specific tools and produce structured output. Sensitive actions then pass through human approval. See the [Facebook AI agent](/en/solutions/facebook-ai-agent), [AI prospecting agent](/en/solutions/ai-prospecting-agent) and [Claude Code with n8n workflows](/en/solutions/n8n-claude-code-workflows).

## What does n8n automation cost?

Cost depends less on the number of nodes than on the number of systems, data quality and error cases.

A simple workflow with one trigger and one action can be delivered in a few days. A journey connecting CRM, email, invoicing, AI and reporting requires more scoping, testing and monitoring.

The full budget includes workflow design, n8n Cloud or Docker infrastructure, connected services, monitoring, backups, updates and maintenance when APIs or business rules change.

Start with a frequent, measurable and stable process. Compare time saved, errors avoided and processing delay before adding more automation.

## A six-step deployment method

1. Map the current process, tools, owners and exceptions.
2. Choose one measure: delay, errors, volume or manual time.
3. Build the first path with test data.
4. Add controls, logs, alerts and recovery paths.
5. Run it beside the manual process on a small volume.
6. Document access, variables, maintenance and shutdown.

## FAQ

### Should I start with n8n Cloud or Docker?

n8n Cloud is the simplest choice for testing a first workflow. Docker becomes relevant when data, network, customization or volume requirements justify infrastructure maintenance.

### Can n8n replace Zapier or Make?

It can replace many workflows, especially when you need conditional logic, custom code, APIs or self-hosting. The right choice still depends on integrations, volume and your team's maintenance capacity.

### Do I need to code to use n8n?

Simple workflows can be built without code. Business integrations, error handling, authentication and custom APIs often require technical skills.

### Can n8n connect a CRM and email platform?

Yes. n8n can connect CRMs, forms, email platforms, databases and APIs. Define which tool owns the reference data and how duplicates are handled.

### Is n8n suitable for sensitive data?

It can be self-hosted, but hosting is only one part. Credentials, encryption, access control, log content and third-party services must also be reviewed.

### How should I start?

Choose one frequent process with a clear input, output and measure. Send me the current steps and tools, and I can identify what is worth automating and what should remain human.
`.trim(),
  },
};

function localized(value) {
  return { fr: value.fr, en: value.en };
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function loadEnvLocal(path) {
  const source = await readFile(path, "utf8");
  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

async function updatePayloadPost() {
  if (!payload) return "skipped";

  const existing = await payload.find({
    collection: "posts",
    draft: true,
    limit: 1,
    locale: "all",
    where: { slug: { equals: slug } },
  });

  const current = existing.docs[0];
  const data = {
    slug,
    title: localized(article.title),
    excerpt: localized(article.excerpt),
    content: localized(article.content),
    seoTitle: localized(article.seoTitle),
    seoDescription: localized(article.seoDescription),
    tags: [
      { label: "n8n" },
      { label: "Automatisation" },
      { label: "Docker" },
      { label: "Intelligence artificielle" },
    ],
    author: current?.author ?? "Mandaniaina Randriambinintsoa",
    readingTime: 12,
    publishedAt: current?.publishedAt ?? "2026-02-10T10:00:00.000Z",
    published: true,
    _status: "published",
  };

  if (current) {
    await payload.update({
      collection: "posts",
      data,
      id: current.id,
      locale: "all",
    });
    return "updated";
  }

  await payload.create({
    collection: "posts",
    data,
    locale: "all",
  });
  return "created";
}

async function updateTargetedServices() {
  if (!payload) return [];

  const results = [];
  const count = Math.min(
    frDictionary.services.items.length,
    enDictionary.services.items.length,
  );

  for (let index = 0; index < count; index += 1) {
    const frService = frDictionary.services.items[index];
    if (!targetedServiceSlugs.has(frService.slug)) continue;

    const enService = enDictionary.services.items[index];
    const key = `service-${String(index + 1).padStart(2, "0")}`;
    const existing = await payload.find({
      collection: "services",
      draft: true,
      limit: 1,
      locale: "all",
      where: { key: { equals: key } },
    });
    const current = existing.docs[0];
    const data = {
      key,
      slug: { fr: frService.slug, en: enService.slug },
      icon: frService.icon || enService.icon || "code_blocks",
      color: frService.color || enService.color || "indigo",
      title: { fr: frService.title, en: enService.title },
      description: { fr: frService.description, en: enService.description },
      cardTitle: {
        fr: frService.cardTitle || frService.title,
        en: enService.cardTitle || enService.title,
      },
      cardDescription: {
        fr: frService.cardDescription || frService.description,
        en: enService.cardDescription || enService.description,
      },
      seoTitle: {
        fr: frService.seoTitle || frService.title,
        en: enService.seoTitle || enService.title,
      },
      seoDescription: {
        fr: frService.seoDescription || frService.description,
        en: enService.seoDescription || enService.description,
      },
      landing: {
        fr: frService.landing ?? null,
        en: enService.landing ?? null,
      },
      isLanding: Boolean(frService.isLanding || enService.isLanding),
      sortOrder: current?.sortOrder ?? index + 1,
      published: true,
      _status: "published",
    };

    if (current) {
      await payload.update({
        collection: "services",
        data,
        id: current.id,
        locale: "all",
      });
      results.push({ key, slug: frService.slug, action: "updated" });
    } else {
      await payload.create({
        collection: "services",
        data,
        locale: "all",
      });
      results.push({ key, slug: frService.slug, action: "created" });
    }
  }

  return results;
}

async function updateSupabaseFallback() {
  if (payloadOnly || httpOnly) return "skipped";

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "skipped";

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });
  const { data: existing, error: readError } = await supabase
    .from("blog_posts")
    .select("published_at, cover_image, author")
    .eq("slug", slug)
    .maybeSingle();
  if (readError) throw readError;

  const row = {
    slug,
    title_fr: article.title.fr,
    title_en: article.title.en,
    excerpt_fr: article.excerpt.fr,
    excerpt_en: article.excerpt.en,
    content_fr: article.content.fr,
    content_en: article.content.en,
    seo_title_fr: article.seoTitle.fr,
    seo_title_en: article.seoTitle.en,
    seo_description_fr: article.seoDescription.fr,
    seo_description_en: article.seoDescription.en,
    cover_image: existing?.cover_image ?? null,
    tags: ["n8n", "Automatisation", "Docker", "Intelligence artificielle"],
    author: existing?.author ?? "Mandaniaina Randriambinintsoa",
    reading_time: 12,
    published_at: existing?.published_at ?? "2026-02-10T10:00:00.000Z",
    published: true,
  };

  const { error } = await supabase
    .from("blog_posts")
    .upsert(row, { onConflict: "slug" });
  if (error) throw error;
  return existing ? "updated" : "created";
}

async function updatePayloadOverHttp() {
  if (!httpOnly) return "skipped";

  const baseUrl = readArgument("--base-url") ?? "http://localhost:3020";
  const apiSecret = process.env.API_SECRET_KEY;
  if (!apiSecret) throw new Error("API_SECRET_KEY is required");

  const response = await fetch(`${baseUrl}/api/public/blog`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiSecret}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      slug,
      title_fr: article.title.fr,
      title_en: article.title.en,
      excerpt_fr: article.excerpt.fr,
      excerpt_en: article.excerpt.en,
      content_fr: article.content.fr,
      content_en: article.content.en,
      seo_title_fr: article.seoTitle.fr,
      seo_title_en: article.seoTitle.en,
      seo_description_fr: article.seoDescription.fr,
      seo_description_en: article.seoDescription.en,
      tags: ["n8n", "Automatisation", "Docker", "Intelligence artificielle"],
      author: "Mandaniaina Randriambinintsoa",
      reading_time: 12,
      published_at: "2026-02-10T10:00:00.000Z",
      published: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${await response.text()}`);
  }

  return {
    baseUrl,
    ...(await response.json()),
  };
}

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

try {
  const payloadResult =
    supabaseOnly || httpOnly ? "skipped" : await updatePayloadPost();
  const services =
    supabaseOnly || httpOnly ? [] : await updateTargetedServices();
  const supabaseResult =
    payloadOnly || httpOnly ? "skipped" : await updateSupabaseFallback();
  const httpResult = await updatePayloadOverHttp();
  console.log(
    JSON.stringify(
      {
        slug,
        payload: payloadResult,
        supabase: supabaseResult,
        http: httpResult,
        services,
      },
      null,
      2,
    ),
  );
} finally {
  if (payload) await payload.destroy();
}
