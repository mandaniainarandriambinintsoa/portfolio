import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const applyChanges = process.argv.includes("--apply");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;

    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function postHogApiHost() {
  return required("NEXT_PUBLIC_POSTHOG_HOST")
    .replace("://eu.i.", "://eu.")
    .replace("://us.i.", "://us.")
    .replace(/\/$/, "");
}

function mergeTags(current = [], desired = []) {
  return [...new Set([...current, ...desired])].sort();
}

async function postHogRequest(endpoint, options = {}) {
  const response = await fetch(`${postHogApiHost()}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${required("POSTHOG_PERSONAL_API_KEY")}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `PostHog API failed (${response.status}) ${endpoint}: ${await response.text()}`
    );
  }

  if (response.status === 204) return null;
  return response.json();
}

async function listAll(endpoint) {
  const rows = [];
  let next = `${postHogApiHost()}${endpoint}`;

  while (next) {
    const response = await fetch(next, {
      headers: {
        Authorization: `Bearer ${required("POSTHOG_PERSONAL_API_KEY")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`PostHog API failed (${response.status}): ${await response.text()}`);
    }

    const payload = await response.json();
    rows.push(...(payload.results ?? []));
    next = payload.next;
  }

  return rows;
}

const eventDefinitions = {
  "$pageview": {
    description:
      "Visite d'une page du portfolio. Point d'entree du parcours d'acquisition; utiliser path, traffic_channel et entry_path pour les analyses.",
    tags: ["portfolio", "acquisition", "awareness"],
  },
  scroll_depth_reached: {
    description:
      "Le visiteur a atteint 25, 50, 75 ou 90 % d'une page. A partir de 75 %, cela indique un engagement fort avec le contenu.",
    tags: ["portfolio", "engagement", "consideration"],
  },
  nav_clicked: {
    description: "Clic sur un lien de navigation principal du portfolio.",
    tags: ["portfolio", "navigation", "awareness"],
  },
  service_viewed: {
    description:
      "Ouverture d'une offre de service. Signal de consideration commerciale a analyser par service, path et canal d'acquisition.",
    tags: ["portfolio", "offer", "consideration"],
  },
  solution_viewed: {
    description:
      "Ouverture d'une solution metier detaillee. Signal de consideration a rapprocher des CTA et conversions suivantes.",
    tags: ["portfolio", "offer", "consideration"],
  },
  project_opened: {
    description:
      "Ouverture d'une realisation depuis une liste ou la home. Indique que le visiteur cherche une preuve de competence.",
    tags: ["portfolio", "proof", "consideration"],
  },
  project_viewed: {
    description:
      "Consultation d'une preuve ou etude de cas integree a une page de service.",
    tags: ["portfolio", "proof", "consideration"],
  },
  project_filter_changed: {
    description: "Changement du filtre de projets; indique le type de realisation recherche.",
    tags: ["portfolio", "navigation", "consideration"],
  },
  demo_opened: {
    description: "Ouverture d'une demonstration depuis la section tarifaire.",
    tags: ["portfolio", "proof", "consideration"],
  },
  cta_clicked: {
    description:
      "Clic sur un appel a l'action. cta_type=contact ou submit correspond a une intention commerciale forte.",
    tags: ["portfolio", "cta", "intent"],
  },
  whatsapp_clicked: {
    description:
      "Clic vers WhatsApp. Signal commercial tres fort, meme si la conversation finale a lieu hors du site.",
    tags: ["portfolio", "lead", "intent"],
  },
  contact_form_started: {
    description: "Premier focus dans le formulaire de contact. Debut du parcours de conversion.",
    tags: ["portfolio", "lead", "intent"],
  },
  contact_form_submitted: {
    description:
      "Tentative d'envoi du formulaire avant confirmation serveur. Ne pas compter comme conversion finale.",
    tags: ["portfolio", "lead", "intent"],
  },
  contact_form_success: {
    description:
      "Formulaire accepte et transmis au workflow n8n. Evenement de conversion principal du portfolio.",
    tags: ["portfolio", "lead", "conversion"],
  },
  contact_form_failed: {
    description:
      "Echec d'envoi du formulaire. Utiliser reason pour diagnostiquer les conversions perdues.",
    tags: ["portfolio", "lead", "friction"],
  },
  language_switched: {
    description: "Changement manuel entre les versions francaise et anglaise.",
    tags: ["portfolio", "navigation", "locale"],
  },
};

const propertyDefinitions = {
  app_surface: {
    description: "Surface produit emettrice de l'evenement; portfolio pour ce site.",
    tags: ["portfolio", "context"],
  },
  path: {
    description: "Chemin de la page sur laquelle l'evenement s'est produit.",
    tags: ["portfolio", "page"],
  },
  locale: {
    description: "Langue de la page: fr ou en.",
    tags: ["portfolio", "context"],
  },
  funnel_stage: {
    description:
      "Etape metier normalisee: awareness, consideration, intent ou conversion.",
    tags: ["portfolio", "funnel", "ai-context"],
  },
  intent_score: {
    description:
      "Score d'intention de 5 a 100. Plus il est eleve, plus l'action est proche d'une prise de contact.",
    tags: ["portfolio", "funnel", "ai-context"],
  },
  traffic_channel: {
    description:
      "Canal d'acquisition persiste pour la session: direct, organic_search, ai_referral, social, paid, email ou referral.",
    tags: ["portfolio", "acquisition", "ai-context"],
  },
  traffic_source: {
    description: "Source UTM ou domaine externe a l'origine de la session.",
    tags: ["portfolio", "acquisition"],
  },
  traffic_medium: {
    description: "Medium UTM ou classification referral/none.",
    tags: ["portfolio", "acquisition"],
  },
  referring_domain: {
    description: "Domaine externe ayant apporte la session, ou direct.",
    tags: ["portfolio", "acquisition"],
  },
  entry_path: {
    description: "Premiere page visitee pendant la session.",
    tags: ["portfolio", "acquisition", "landing-page"],
  },
  is_ai_referral: {
    description:
      "Vrai lorsque la session provient de ChatGPT, Perplexity, Claude, Gemini, Copilot ou un moteur IA similaire.",
    tags: ["portfolio", "acquisition", "geo"],
  },
  area: {
    description: "Section de l'interface depuis laquelle l'action a ete declenchee.",
    tags: ["portfolio", "ui-context"],
  },
  cta_type: {
    description: "Type d'appel a l'action: contact, projects, quiz, etc.",
    tags: ["portfolio", "cta"],
  },
  depth_percent: {
    description: "Profondeur de scroll atteinte: 25, 50, 75 ou 90.",
    tags: ["portfolio", "engagement"],
  },
};

const dashboardDefinition = {
  name: "Portfolio Acquisition - AI-ready",
  description:
    "Source de verite pour PostHog AI: acquisition, engagement, intention commerciale et conversion du portfolio.",
  tags: ["portfolio", "acquisition", "posthog-ai"],
};

const insightDefinitions = [
  {
    name: "Parcours acquisition vers conversion - 30 jours",
    description:
      "Visiteurs uniques ayant progresse de la visite vers l'offre, l'intention commerciale et le formulaire confirme.",
    query: `
SELECT
  uniqExactIf(distinct_id, event = '$pageview') AS visiteurs,
  uniqExactIf(distinct_id, event IN ('service_viewed', 'solution_viewed', 'project_opened', 'project_viewed', 'demo_opened')) AS visiteurs_engages,
  uniqExactIf(distinct_id, event IN ('cta_clicked', 'whatsapp_clicked', 'contact_form_started', 'contact_form_submitted')) AS visiteurs_intention,
  uniqExactIf(distinct_id, event = 'contact_form_success') AS leads_confirmes
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
`,
  },
  {
    name: "Canaux d'acquisition et intention - 30 jours",
    description:
      "Compare les canaux par visiteurs, signaux d'intention et conversions. Les anciennes donnees sans attribution apparaissent en unknown.",
    query: `
SELECT
  coalesce(nullIf(properties.traffic_channel, ''), 'unknown') AS canal,
  uniqExactIf(distinct_id, event = '$pageview') AS visiteurs,
  uniqExactIf(distinct_id, event IN ('cta_clicked', 'whatsapp_clicked', 'contact_form_started', 'contact_form_submitted')) AS visiteurs_intention,
  uniqExactIf(distinct_id, event = 'contact_form_success') AS leads_confirmes
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
GROUP BY canal
ORDER BY visiteurs DESC
`,
  },
  {
    name: "Pages qui creent de l'interet commercial - 30 jours",
    description:
      "Classe les pages selon les visiteurs, lectures profondes, consultations d'offres et actions de contact.",
    query: `
SELECT
  coalesce(nullIf(properties.path, ''), replaceRegexpAll(properties.$current_url, '^https?://[^/]+', '')) AS page,
  uniqExactIf(distinct_id, event = '$pageview') AS visiteurs,
  countIf(event = 'scroll_depth_reached' AND toInt(properties.depth_percent) >= 75) AS lectures_profondes,
  countIf(event IN ('service_viewed', 'solution_viewed', 'project_opened', 'project_viewed')) AS preuves_et_offres,
  countIf(event IN ('cta_clicked', 'whatsapp_clicked', 'contact_form_started')) AS actions_contact
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
GROUP BY page
ORDER BY actions_contact DESC, lectures_profondes DESC
LIMIT 100
`,
  },
];

async function syncDefinitions({
  endpoint,
  definitions,
  label,
  createMissing = false,
}) {
  const projectId = required("POSTHOG_PROJECT_ID");
  const existing = await listAll(`/api/projects/${projectId}/${endpoint}/?limit=500`);
  const byName = new Map(existing.map((item) => [item.name, item]));
  const summary = { found: 0, created: 0, updated: 0, missing: [] };

  for (const [name, definition] of Object.entries(definitions)) {
    const current = byName.get(name);
    if (!current) {
      if (applyChanges && createMissing) {
        await postHogRequest(`/api/projects/${projectId}/${endpoint}/`, {
          method: "POST",
          body: JSON.stringify({
            name,
            description: definition.description,
            tags: definition.tags,
            verified: true,
          }),
        });
        summary.created += 1;
        continue;
      }

      summary.missing.push(name);
      continue;
    }

    summary.found += 1;
    const payload = {
      description: definition.description,
      tags: mergeTags(current.tags, definition.tags),
      verified: true,
    };
    const needsUpdate =
      current.description !== payload.description ||
      current.verified !== true ||
      JSON.stringify([...(current.tags ?? [])].sort()) !== JSON.stringify(payload.tags);

    if (applyChanges && needsUpdate) {
      await postHogRequest(
        `/api/projects/${projectId}/${endpoint}/${current.id}/`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );
      summary.updated += 1;
    }
  }

  console.log(`${label}:`, summary);
}

async function ensureDashboardAndInsights() {
  const projectId = required("POSTHOG_PROJECT_ID");
  const dashboards = await listAll(`/api/projects/${projectId}/dashboards/?limit=100`);
  let dashboard = dashboards.find((item) => item.name === dashboardDefinition.name);

  if (!dashboard && applyChanges) {
    dashboard = await postHogRequest(`/api/projects/${projectId}/dashboards/`, {
      method: "POST",
      body: JSON.stringify({
        ...dashboardDefinition,
        pinned: true,
      }),
    });
  }

  if (!dashboard) {
    console.log("Dashboard: missing (dry run)");
    return;
  }

  const insights = await listAll(`/api/projects/${projectId}/insights/?limit=500`);
  const existingNames = new Set(insights.map((item) => item.name));
  let created = 0;

  for (const definition of insightDefinitions) {
    if (existingNames.has(definition.name)) continue;

    if (applyChanges) {
      await postHogRequest(`/api/projects/${projectId}/insights/`, {
        method: "POST",
        body: JSON.stringify({
          name: definition.name,
          description: definition.description,
          dashboards: [dashboard.id],
          favorited: true,
          tags: ["portfolio", "acquisition", "posthog-ai"],
          query: {
            kind: "HogQLQuery",
            query: definition.query.trim(),
          },
        }),
      });
      created += 1;
    }
  }

  console.log("Dashboard:", {
    id: dashboard.id,
    name: dashboard.name,
    insightsCreated: created,
    insightCount: insightDefinitions.length,
  });
}

async function validateInsightQueries() {
  const projectId = required("POSTHOG_PROJECT_ID");
  const results = [];

  for (const definition of insightDefinitions) {
    const payload = await postHogRequest(`/api/projects/${projectId}/query/`, {
      method: "POST",
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: definition.query.trim(),
        },
      }),
    });

    results.push({
      name: definition.name,
      columns: payload.columns ?? [],
      rows: payload.results?.length ?? 0,
    });
  }

  console.log("Insight validation:", results);
}

loadEnvFile(path.join(rootDir, ".env.local"));
loadEnvFile(path.join(rootDir, ".env"));

console.log(`PostHog AI configuration mode: ${applyChanges ? "apply" : "dry-run"}`);

await syncDefinitions({
  endpoint: "event_definitions",
  definitions: eventDefinitions,
  label: "Event definitions",
  createMissing: true,
});
await syncDefinitions({
  endpoint: "property_definitions",
  definitions: propertyDefinitions,
  label: "Property definitions",
});
await ensureDashboardAndInsights();
await validateInsightQueries();
