/**
 * Workflow N8N : Tracking Visiteurs Portfolio
 * Reçoit les visites en temps réel via webhook, récupère la géolocalisation IP,
 * stocke dans Airtable, déduplique par IP, synchronise avec Webflow CMS
 * et envoie une notification email.
 *
 * Sanitisé : credentials, tokens, webhookId, emails et IDs retirés.
 * Les sticky notes sont conservés — ils montrent la documentation du workflow.
 */
export const workflowTrackingVisiteurs = {
  name: "Tracking visiteurs portfolio",
  nodes: [
    {
      parameters: {
        httpMethod: "POST",
        path: "webhook-portfolio-tracking",
        options: {},
      },
      type: "n8n-nodes-base.webhook",
      typeVersion: 2,
      position: [112, 208],
      id: "webhook",
      name: "Webhook",
    },
    {
      parameters: {
        url: "=http://ipinfo.io/{{ $json.headers[`cf-connecting-ip`] }}",
        sendQuery: true,
        queryParameters: [{ name: "token", value: "***" }],
        options: {},
      },
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [448, 208],
      id: "http-ip-info",
      name: "HTTP Request (recuperer les info de ip )",
    },
    {
      parameters: { options: {} },
      type: "n8n-nodes-base.dateTime",
      typeVersion: 2,
      position: [720, 208],
      id: "date-time",
      name: "Date & Time",
    },
    {
      parameters: {
        operation: "create",
        base: { __rl: true, value: "***", mode: "list", cachedResultName: "Vue portfolio" },
        table: { __rl: true, value: "***", mode: "list", cachedResultName: "vue" },
        columns: {
          mappingMode: "defineBelow",
          value: {
            date: "={{ $json.currentDate.toDateTime() }}",
            Ip: "={{ $(`HTTP Request (recuperer les info de ip )`).item.json.ip }}",
            Region: "={{ $(`HTTP Request (recuperer les info de ip )`).item.json.city }}",
            Pays: "={{ $(`HTTP Request (recuperer les info de ip )`).item.json.region }}",
          },
          matchingColumns: [],
          schema: [
            { id: "Ip", displayName: "Ip", type: "string" },
            { id: "Region", displayName: "Region", type: "string" },
            { id: "Pays", displayName: "Pays", type: "string" },
            { id: "date", displayName: "date", type: "dateTime" },
          ],
        },
        options: {},
      },
      type: "n8n-nodes-base.airtable",
      typeVersion: 2.1,
      position: [1024, 256],
      id: "airtable",
      name: "Airtable",
    },
    {
      parameters: {
        jsCode:
          'const seen = new Set();\nreturn items.filter(item => {\n  const ip = item.json.fields.Ip;\n  if (seen.has(ip)) return false;\n  seen.add(ip);\n  return true;\n});',
      },
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [1296, 256],
      id: "code-dedup",
      name: "Code (filtrer , si ip deja vue)",
    },
    {
      parameters: {
        operation: "create",
        siteId: "***",
        collectionId: "***",
        fieldsUi: {
          fieldValues: [
            { fieldId: "region", fieldValue: "={{ $json.fields.Region }}" },
            { fieldId: "pays", fieldValue: "={{ $json.fields.Pays }}" },
            { fieldId: "visite-a", fieldValue: "={{ $json.fields.date }}" },
            { fieldId: "name", fieldValue: "={{ $json.fields.Region }}" },
            { fieldId: "slug", fieldValue: "=slug-{{ $json.id }}" },
          ],
        },
      },
      type: "n8n-nodes-base.webflow",
      typeVersion: 2,
      position: [1600, 256],
      id: "webflow-create",
      name: "Create an item",
    },
    {
      parameters: { amount: 1 },
      type: "n8n-nodes-base.wait",
      typeVersion: 1.1,
      position: [2176, 256],
      id: "wait",
      name: "Wait",
    },
    {
      parameters: {
        sendTo: "***@***.com",
        subject:
          "=Vue Portfolio — {{ $(`Webhook`).item.json.body.acquisition_source || 'Direct / inconnu' }}",
        message:
          "=Il y a quelqu`un qui visite ton portfolio en ce moment à {{ $(`Airtable`).item.json.fields.Pays }} région {{ $(`Airtable`).item.json.fields.Region }}\n\nPage d'entrée : {{ $(`Webhook`).item.json.body.entry_url || $(`Webhook`).item.json.body.path || 'Inconnue' }}\nSource : {{ $(`Webhook`).item.json.body.acquisition_source || 'Direct / inconnu' }}\nReferrer : {{ $(`Webhook`).item.json.body.referrer || 'Aucun' }}",
        options: {},
      },
      type: "n8n-nodes-base.gmail",
      typeVersion: 2.1,
      position: [2752, 256],
      id: "gmail-notify",
      name: "Gmail",
    },
    {
      parameters: {
        content:
          "## Point d'entrée :\nReçoit la visite du portfolio en temps réel avec Google Analytics.",
        height: 400,
        width: 256,
      },
      type: "n8n-nodes-base.stickyNote",
      position: [48, 112],
      typeVersion: 1,
      id: "sticky-1",
      name: "Sticky Note",
    },
    {
      parameters: {
        content:
          "## Info sur IP :\nEnvoie l'IP du visiteur à ipinfo.io pour obtenir pays, région, ville, etc.",
        height: 400,
        width: 256,
      },
      type: "n8n-nodes-base.stickyNote",
      position: [368, 112],
      typeVersion: 1,
      id: "sticky-2",
      name: "Sticky Note1",
    },
    {
      parameters: {
        content:
          "## Date :\nGénère la date et l'heure exactes de la visite pour l'enregistrement.",
        height: 400,
        width: 256,
      },
      type: "n8n-nodes-base.stickyNote",
      position: [656, 112],
      typeVersion: 1,
      id: "sticky-3",
      name: "Sticky Note2",
    },
    {
      parameters: {
        content:
          "## Airtable :\nCrée une ligne dans la base Airtable « Vue portfolio » avec les informations récupérées (IP, région, pays, date).",
        height: 400,
        width: 256,
      },
      type: "n8n-nodes-base.stickyNote",
      position: [944, 112],
      typeVersion: 1,
      id: "sticky-4",
      name: "Sticky Note3",
    },
    {
      parameters: {
        content:
          "## Filtrer les IP :\nVérifie si l'IP a déjà été enregistrée pour éviter les doublons, garde seulement la première visite.",
        height: 400,
        width: 256,
      },
      type: "n8n-nodes-base.stickyNote",
      position: [1232, 112],
      typeVersion: 1,
      id: "sticky-5",
      name: "Sticky Note4",
    },
    {
      parameters: {
        content:
          "## Webflow CMS :\nCrée un nouvel item dans la collection Webflow « visites » avec les infos du visiteur.",
        height: 400,
        width: 256,
      },
      type: "n8n-nodes-base.stickyNote",
      position: [1520, 112],
      typeVersion: 1,
      id: "sticky-6",
      name: "Sticky Note5",
    },
    {
      parameters: {
        content:
          "## Pause :\nPause de 1 minute avant de publier pour éviter les problèmes de synchro avec Webflow.",
        height: 400,
        width: 256,
      },
      type: "n8n-nodes-base.stickyNote",
      position: [2096, 112],
      typeVersion: 1,
      id: "sticky-7",
      name: "Sticky Note7",
    },
  ],
  connections: {
    Webhook: {
      main: [
        [
          {
            node: "HTTP Request (recuperer les info de ip )",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "HTTP Request (recuperer les info de ip )": {
      main: [[{ node: "Date & Time", type: "main", index: 0 }]],
    },
    "Date & Time": {
      main: [[{ node: "Airtable", type: "main", index: 0 }]],
    },
    Airtable: {
      main: [
        [
          {
            node: "Code (filtrer , si ip deja vue)",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Code (filtrer , si ip deja vue)": {
      main: [[{ node: "Create an item", type: "main", index: 0 }]],
    },
    "Create an item": {
      main: [[{ node: "Wait", type: "main", index: 0 }]],
    },
    Wait: {
      main: [[{ node: "Gmail", type: "main", index: 0 }]],
    },
  },
  active: false,
  settings: { executionOrder: "v1" },
};
