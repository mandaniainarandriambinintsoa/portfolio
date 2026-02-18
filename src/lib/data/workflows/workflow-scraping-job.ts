/**
 * Workflow N8N : Scraping FlowRemote
 * Scrape automatiquement les offres d'emploi de FlowRemote.io,
 * extrait les données (titre, entreprise, date, lien) et envoie une alerte email.
 *
 * Sanitisé : credentials et emails retirés.
 */
export const workflowScrapingJob = {
  name: "Scraping FlowRemote - Job Alerts",
  nodes: [
    {
      id: "schedule-trigger",
      name: "Schedule Trigger",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [848, 368],
      parameters: {
        rule: { interval: [{ triggerAtHour: 10 }] },
      },
    },
    {
      id: "http-request",
      name: "HTTP Request",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [1040, 368],
      parameters: {
        url: "https://www.flowremote.io/",
        options: {},
      },
    },
    {
      id: "sticky-scraping",
      name: "Sticky Note",
      type: "n8n-nodes-base.stickyNote",
      typeVersion: 1,
      position: [976, 256],
      parameters: {
        content:
          "## Scrapping du site FlowRemote\nCollecter et découper proprement les annonces du site FlowRemote pour avoir les bonnes datas",
        height: 304,
        width: 752,
      },
    },
    {
      id: "html-extract",
      name: "HTML",
      type: "n8n-nodes-base.html",
      typeVersion: 1.2,
      position: [1264, 368],
      parameters: {
        operation: "extractHtmlContent",
        extractionValues: {
          values: [
            {
              key: "work",
              cssSelector: ".job-component",
              returnValue: "html",
              returnArray: true,
            },
          ],
        },
        options: {},
      },
    },
    {
      id: "split-out",
      name: "Split Out",
      type: "n8n-nodes-base.splitOut",
      typeVersion: 1,
      position: [1440, 368],
      parameters: { fieldToSplitOut: "work", options: {} },
    },
    {
      id: "html-details",
      name: "HTML1",
      type: "n8n-nodes-base.html",
      typeVersion: 1.2,
      position: [1600, 368],
      parameters: {
        operation: "extractHtmlContent",
        dataPropertyName: "work",
        extractionValues: {
          values: [
            {
              key: "title",
              cssSelector: '[fs-cmsfilter-field="title"]',
            },
            {
              key: "company",
              cssSelector: '[fs-cmsfilter-field="company"]',
            },
            {
              key: "created-at",
              cssSelector: '[data="created-at"]',
            },
            {
              key: "logo",
              cssSelector: ".job__company-logo",
              skipSelectors: "div",
            },
            {
              key: "link",
              cssSelector: ".z-2",
              returnValue: "html",
            },
          ],
        },
        options: {},
      },
    },
    {
      id: "edit-fields-1",
      name: "Edit Fields1",
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [1824, 368],
      parameters: {
        assignments: {
          assignments: [
            {
              name: "title",
              value: "={{ $json.title }}",
              type: "string",
            },
            {
              name: "company",
              value: "={{ $json.company }}",
              type: "string",
            },
            {
              name: "created-at",
              value: "={{ $json[`created-at`] }}",
              type: "string",
            },
            {
              name: "logo",
              value: "={{ $json.logo }}",
              type: "string",
            },
            {
              name: "link",
              value:
                '={{ $json.link.split("href").last().split(`"`)[1] }}',
              type: "string",
            },
          ],
        },
        options: {},
      },
    },
    {
      id: "filter",
      name: "Filter",
      type: "n8n-nodes-base.filter",
      typeVersion: 2.2,
      position: [2000, 368],
      parameters: {
        conditions: {
          combinator: "and",
          options: {
            caseSensitive: true,
            leftValue: "",
            typeValidation: "strict",
            version: 2,
          },
          conditions: [
            {
              leftValue: "={{ $json.title }}",
              operator: { type: "string", operation: "notEmpty" },
            },
            {
              leftValue: "={{ $json[`created-at`] }}",
              operator: { type: "string", operation: "notEmpty" },
            },
            {
              leftValue: "={{ $json.link }}",
              rightValue: "http",
              operator: { type: "string", operation: "contains" },
            },
          ],
        },
        options: {},
      },
    },
    {
      id: "date-time",
      name: "Date & Time",
      type: "n8n-nodes-base.dateTime",
      typeVersion: 2,
      position: [2192, 368],
      parameters: {
        operation: "addToDate",
        magnitude: "={{ $json[`created-at`] }}",
        options: {},
      },
    },
    {
      id: "edit-fields-2",
      name: "Edit Fields",
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [2368, 368],
      parameters: {
        assignments: {
          assignments: [
            {
              name: "logo",
              value:
                '={{ $(`Filter`).item.json.logo.split("\\n").last().split("[").last().split("]").first() }}',
              type: "string",
            },
            {
              name: "title",
              value: "={{ $(`Filter`).item.json.title }}",
              type: "string",
            },
            {
              name: "company",
              value: "={{ $(`Filter`).item.json.company }}",
              type: "string",
            },
            {
              name: "created-at",
              value: "={{ $json.newDate }}",
              type: "string",
            },
            {
              name: "link",
              value: "={{ $(`Filter`).item.json.link }}",
              type: "string",
            },
          ],
        },
        options: {},
      },
    },
    {
      id: "filter-recent",
      name: "Filter1",
      type: "n8n-nodes-base.filter",
      typeVersion: 2.2,
      position: [2592, 368],
      parameters: {
        conditions: {
          combinator: "and",
          options: {
            caseSensitive: true,
            leftValue: "",
            typeValidation: "strict",
            version: 2,
          },
          conditions: [
            {
              leftValue: "={{ $json[`created-at`] }}",
              rightValue: "={{ DateTime.now().minus(1, `days`) }}",
              operator: {
                type: "dateTime",
                operation: "afterOrEquals",
              },
            },
          ],
        },
        options: {},
      },
    },
    {
      id: "gmail-alert",
      name: "Gmail",
      type: "n8n-nodes-base.gmail",
      typeVersion: 2.1,
      position: [2800, 368],
      parameters: {
        sendTo: "***@***.com",
        subject: "New Job Alert - FlowRemote",
        message: "",
        options: {},
      },
    },
  ],
  connections: {
    "Schedule Trigger": {
      main: [[{ node: "HTTP Request", type: "main", index: 0 }]],
    },
    "HTTP Request": {
      main: [[{ node: "HTML", type: "main", index: 0 }]],
    },
    HTML: {
      main: [[{ node: "Split Out", type: "main", index: 0 }]],
    },
    "Split Out": {
      main: [[{ node: "HTML1", type: "main", index: 0 }]],
    },
    HTML1: {
      main: [[{ node: "Edit Fields1", type: "main", index: 0 }]],
    },
    "Edit Fields1": {
      main: [[{ node: "Filter", type: "main", index: 0 }]],
    },
    Filter: {
      main: [[{ node: "Date & Time", type: "main", index: 0 }]],
    },
    "Date & Time": {
      main: [[{ node: "Edit Fields", type: "main", index: 0 }]],
    },
    "Edit Fields": {
      main: [[{ node: "Filter1", type: "main", index: 0 }]],
    },
    Filter1: {
      main: [[{ node: "Gmail", type: "main", index: 0 }]],
    },
  },
  active: false,
  settings: { executionOrder: "v1" },
};
