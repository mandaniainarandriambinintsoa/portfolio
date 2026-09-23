/**
 * Public, sanitised representation of the TeamIA multi-campaign prospecting
 * workflow retrieved from n8n. Private endpoints, credentials, prospect data,
 * webhook paths and internal identifiers are intentionally omitted.
 */
export const workflowTeamiaProspecting = {
  name: "Prospection B2B multi-campagnes — version publique",
  active: true,
  settings: { executionOrder: "v1" },
  nodes: [
    { id: "note-source", name: "1. Campagnes et sourcing", type: "n8n-nodes-base.stickyNote", typeVersion: 1, position: [250, -90], parameters: { content: "## 1. Campagnes et sourcing\nSegments actifs, recherche d'entreprises et classement. Données de campagne et accès API retirés.", width: 760, height: 150 } },
    { id: "note-guard", name: "2. Contrôles", type: "n8n-nodes-base.stickyNote", typeVersion: 1, position: [1200, -90], parameters: { content: "## 2. Anti-doublon et quota\nLes entreprises déjà vues sont exclues avant la sélection des décideurs. Maximum 10 prospects par exécution.", width: 800, height: 150 } },
    { id: "note-review", name: "3. Recherche et validation", type: "n8n-nodes-base.stickyNote", typeVersion: 1, position: [2250, -90], parameters: { content: "## 3. Personnalisation contrôlée\nRecherche de signaux publics et préparation du message. Aucun email prospect n'est envoyé automatiquement.", width: 760, height: 150 } },
    { id: "schedule", name: "Planification quotidienne", type: "n8n-nodes-base.scheduleTrigger", typeVersion: 1.4, position: [0, 220], parameters: { rule: { interval: [{ field: "days", daysInterval: 1 }] } } },
    { id: "campaigns", name: "Charger les campagnes actives", type: "n8n-nodes-base.httpRequest", typeVersion: 4.5, position: [250, 220], parameters: { method: "GET", url: "https://portfolio-demo.invalid/campaigns" } },
    { id: "segments", name: "Préparer les segments", type: "n8n-nodes-base.code", typeVersion: 2, position: [500, 220], parameters: { jsCode: "// Sélectionne les segments autorisés et applique les quotas." } },
    { id: "companies", name: "Rechercher les entreprises", type: "n8n-nodes-base.httpRequest", typeVersion: 4.5, position: [750, 220], parameters: { method: "POST", url: "https://portfolio-demo.invalid/company-search" } },
    { id: "rank", name: "Classer les entreprises", type: "n8n-nodes-base.code", typeVersion: 2, position: [1000, 220], parameters: { jsCode: "// Classe les entreprises selon les critères de campagne." } },
    { id: "dedupe", name: "Réserver les entreprises inédites", type: "n8n-nodes-base.httpRequest", typeVersion: 4.5, position: [1250, 220], parameters: { method: "POST", url: "https://portfolio-demo.invalid/dedupe" } },
    { id: "select", name: "Sélectionner les nouveaux comptes", type: "n8n-nodes-base.code", typeVersion: 2, position: [1500, 220], parameters: { jsCode: "// Conserve les comptes nouveaux, par segment et selon le quota." } },
    { id: "people", name: "Trouver les décideurs", type: "n8n-nodes-base.httpRequest", typeVersion: 4.5, position: [1750, 220], parameters: { method: "POST", url: "https://portfolio-demo.invalid/people-search" } },
    { id: "qualify", name: "Qualifier les décideurs", type: "n8n-nodes-base.code", typeVersion: 2, position: [2000, 220], parameters: { jsCode: "// Filtre les fonctions, classe les profils et impose le garde-fou global." } },
    { id: "research", name: "Rechercher un signal et rédiger", type: "@n8n/n8n-nodes-langchain.openAi", typeVersion: 2.3, position: [2250, 220], parameters: { resource: "text", operation: "response" } },
    { id: "normalize", name: "Normaliser les résultats", type: "n8n-nodes-base.code", typeVersion: 2, position: [2500, 220], parameters: { jsCode: "// Prépare une file de revue avec une clé de déduplication." } },
    { id: "review", name: "Envoyer vers la validation humaine", type: "n8n-nodes-base.httpRequest", typeVersion: 4.5, position: [2750, 220], parameters: { method: "POST", url: "https://portfolio-demo.invalid/review-queue" } },
  ],
  connections: {
    "Planification quotidienne": { main: [[{ node: "Charger les campagnes actives", type: "main", index: 0 }]] },
    "Charger les campagnes actives": { main: [[{ node: "Préparer les segments", type: "main", index: 0 }]] },
    "Préparer les segments": { main: [[{ node: "Rechercher les entreprises", type: "main", index: 0 }]] },
    "Rechercher les entreprises": { main: [[{ node: "Classer les entreprises", type: "main", index: 0 }]] },
    "Classer les entreprises": { main: [[{ node: "Réserver les entreprises inédites", type: "main", index: 0 }]] },
    "Réserver les entreprises inédites": { main: [[{ node: "Sélectionner les nouveaux comptes", type: "main", index: 0 }]] },
    "Sélectionner les nouveaux comptes": { main: [[{ node: "Trouver les décideurs", type: "main", index: 0 }]] },
    "Trouver les décideurs": { main: [[{ node: "Qualifier les décideurs", type: "main", index: 0 }]] },
    "Qualifier les décideurs": { main: [[{ node: "Rechercher un signal et rédiger", type: "main", index: 0 }]] },
    "Rechercher un signal et rédiger": { main: [[{ node: "Normaliser les résultats", type: "main", index: 0 }]] },
    "Normaliser les résultats": { main: [[{ node: "Envoyer vers la validation humaine", type: "main", index: 0 }]] },
  },
};
