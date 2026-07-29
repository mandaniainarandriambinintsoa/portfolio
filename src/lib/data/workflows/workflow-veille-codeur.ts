/**
 * Sanitized portfolio version of the Codeur.com opportunity-monitoring workflow.
 * Credentials, private endpoints, email addresses and scoring internals are omitted.
 */
export const workflowVeilleCodeur = {
  name: "Manda Pipeline - Veille Codeur",
  nodes: [
    {
      id: "guardrails",
      name: "Guardrails",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [96, -80],
      parameters: {
        content:
          "## Human-in-the-loop pipeline\nScores and prioritizes opportunities. No application is sent automatically.",
        height: 240,
        width: 520,
      },
    },
    {
      id: "schedule",
      name: "Every 10 minutes",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [112, 384],
      parameters: {
        rule: { interval: [{ field: "minutes", minutesInterval: 10 }] },
      },
    },
    {
      id: "get-searches",
      name: "Get Active Searches",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [352, 384],
      parameters: {
        method: "GET",
        url: "https://portfolio-demo.invalid/api/searches",
        options: {},
      },
    },
    {
      id: "expand-searches",
      name: "Expand Searches",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [592, 384],
      parameters: {
        jsCode: "// Keep up to 10 active searches and prepare their RSS feeds.",
      },
    },
    {
      id: "split-searches",
      name: "Process Searches",
      type: "n8n-nodes-base.splitInBatches",
      typeVersion: 3,
      position: [832, 384],
      parameters: { batchSize: 1, options: {} },
    },
    {
      id: "read-rss",
      name: "Read RSS Feed",
      type: "n8n-nodes-base.rssFeedRead",
      typeVersion: 1.2,
      position: [1072, 512],
      parameters: { url: "={{ $json.rssUrl }}" },
    },
    {
      id: "normalize",
      name: "Normalize Opportunities",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [1312, 512],
      parameters: {
        jsCode:
          "// Normalize title, URL, publication date, categories and budget. Limit to 50 items.",
      },
    },
    {
      id: "ingest",
      name: "Ingest New Opportunities",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [1552, 512],
      parameters: {
        method: "POST",
        url: "https://portfolio-demo.invalid/api/opportunities/ingest",
        options: {},
      },
    },
    {
      id: "has-new",
      name: "Has New Opportunities?",
      type: "n8n-nodes-base.if",
      typeVersion: 2.2,
      position: [1792, 512],
      parameters: {
        conditions: {
          options: { typeValidation: "strict" },
          conditions: [
            {
              leftValue: "={{ $json.newCount }}",
              rightValue: 0,
              operator: { type: "number", operation: "gt" },
            },
          ],
        },
      },
    },
    {
      id: "score",
      name: "Score New Opportunities",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [2032, 432],
      parameters: {
        method: "POST",
        url: "https://portfolio-demo.invalid/api/opportunities/score",
        options: {},
      },
    },
    {
      id: "filter-candidates",
      name: "Keep Score >= 75",
      type: "n8n-nodes-base.filter",
      typeVersion: 2.2,
      position: [2272, 432],
      parameters: {
        conditions: {
          conditions: [
            {
              leftValue: "={{ $json.fitScore }}",
              rightValue: 75,
              operator: { type: "number", operation: "gte" },
            },
          ],
        },
      },
    },
    {
      id: "has-candidates",
      name: "Has Notification Candidates?",
      type: "n8n-nodes-base.if",
      typeVersion: 2.2,
      position: [2512, 432],
      parameters: {},
    },
    {
      id: "notify",
      name: "Send Priority Alert",
      type: "n8n-nodes-base.gmail",
      typeVersion: 2.1,
      position: [2752, 352],
      parameters: {
        sendTo: "***@***.com",
        subject: "New qualified opportunity",
        options: {},
      },
    },
    {
      id: "wait",
      name: "Wait Before Next Search",
      type: "n8n-nodes-base.wait",
      typeVersion: 1.1,
      position: [2992, 512],
      parameters: { amount: 2, unit: "seconds" },
    },
    {
      id: "done",
      name: "Searches Completed",
      type: "n8n-nodes-base.noOp",
      typeVersion: 1,
      position: [1072, 304],
      parameters: {},
    },
    {
      id: "cleanup",
      name: "Cleanup Ignored After 24h",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [1312, 304],
      parameters: {
        method: "DELETE",
        url: "https://portfolio-demo.invalid/api/opportunities/cleanup",
        options: {},
      },
    },
    {
      id: "finished",
      name: "Pipeline Finished",
      type: "n8n-nodes-base.noOp",
      typeVersion: 1,
      position: [1552, 304],
      parameters: {},
    },
  ],
  connections: {
    "Every 10 minutes": {
      main: [[{ node: "Get Active Searches", type: "main", index: 0 }]],
    },
    "Get Active Searches": {
      main: [[{ node: "Expand Searches", type: "main", index: 0 }]],
    },
    "Expand Searches": {
      main: [[{ node: "Process Searches", type: "main", index: 0 }]],
    },
    "Process Searches": {
      main: [
        [{ node: "Searches Completed", type: "main", index: 0 }],
        [{ node: "Read RSS Feed", type: "main", index: 0 }],
      ],
    },
    "Read RSS Feed": {
      main: [[{ node: "Normalize Opportunities", type: "main", index: 0 }]],
    },
    "Normalize Opportunities": {
      main: [[{ node: "Ingest New Opportunities", type: "main", index: 0 }]],
    },
    "Ingest New Opportunities": {
      main: [[{ node: "Has New Opportunities?", type: "main", index: 0 }]],
    },
    "Has New Opportunities?": {
      main: [
        [{ node: "Score New Opportunities", type: "main", index: 0 }],
        [{ node: "Wait Before Next Search", type: "main", index: 0 }],
      ],
    },
    "Score New Opportunities": {
      main: [[{ node: "Keep Score >= 75", type: "main", index: 0 }]],
    },
    "Keep Score >= 75": {
      main: [[{ node: "Has Notification Candidates?", type: "main", index: 0 }]],
    },
    "Has Notification Candidates?": {
      main: [
        [{ node: "Send Priority Alert", type: "main", index: 0 }],
        [{ node: "Wait Before Next Search", type: "main", index: 0 }],
      ],
    },
    "Send Priority Alert": {
      main: [[{ node: "Wait Before Next Search", type: "main", index: 0 }]],
    },
    "Wait Before Next Search": {
      main: [[{ node: "Process Searches", type: "main", index: 0 }]],
    },
    "Searches Completed": {
      main: [[{ node: "Cleanup Ignored After 24h", type: "main", index: 0 }]],
    },
    "Cleanup Ignored After 24h": {
      main: [[{ node: "Pipeline Finished", type: "main", index: 0 }]],
    },
  },
  active: true,
  settings: { executionOrder: "v1" },
};
