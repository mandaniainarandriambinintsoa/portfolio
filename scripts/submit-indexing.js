#!/usr/bin/env node
/**
 * Google Indexing API — Submit URLs for indexing
 *
 * Usage:
 *   node scripts/submit-indexing.js                    # Submit all pending URLs
 *   node scripts/submit-indexing.js <url>              # Submit a specific URL
 *   node scripts/submit-indexing.js --status <url>     # Check indexing status
 *
 * Setup:
 *   1. Create a Google Cloud project + enable "Web Search Indexing API"
 *   2. Create a service account + download JSON key
 *   3. Save key as: service-account-key.json (root of project)
 *   4. Add service account email as Owner in Google Search Console
 */

const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const SITE_URL = "https://portfolio-manda-developpeur-nocode-madagascar.vercel.app";

// Use existing GSC service account key, fallback to local file
const KEY_FILE = process.env.GSC_CREDENTIALS_PATH
  || path.join(process.env.USERPROFILE || process.env.HOME, ".config", "send-email-423613-b458d8b96916.json");

// URLs to submit for indexing
const URLS_TO_INDEX = [
  `${SITE_URL}/services/developpeur-no-code-madagascar`,
  `${SITE_URL}/services/automatisation-n8n-madagascar`,
  `${SITE_URL}/services/developpeur-low-code-madagascar`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/services`,
];

async function getAuthClient() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error("❌ Fichier service-account-key.json introuvable !");
    console.error("");
    console.error("Etapes pour le creer :");
    console.error("1. Va sur https://console.cloud.google.com");
    console.error("2. Cree un projet (ou utilise un existant)");
    console.error("3. Active l'API : APIs & Services > Library > 'Web Search Indexing API' > Enable");
    console.error("4. Cree un service account : IAM & Admin > Service Accounts > Create");
    console.error("5. Telecharge la cle JSON et place-la dans la racine du projet sous le nom 'service-account-key.json'");
    console.error("6. Ajoute l'email du service account comme Proprietaire dans Google Search Console");
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  return auth.getClient();
}

async function submitUrl(authClient, url, type = "URL_UPDATED") {
  const indexing = google.indexing({ version: "v3", auth: authClient });

  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type, // URL_UPDATED or URL_DELETED
      },
    });

    const data = response.data;
    console.log(`✅ ${url}`);
    console.log(`   Type: ${type}`);
    console.log(`   Notified: ${data.urlNotificationMetadata?.latestUpdate?.notifyTime || "OK"}`);
    console.log("");
    return { success: true, url, data };
  } catch (error) {
    console.error(`❌ ${url}`);
    console.error(`   Error: ${error.message}`);
    if (error.response?.data?.error) {
      console.error(`   Detail: ${JSON.stringify(error.response.data.error)}`);
    }
    console.log("");
    return { success: false, url, error: error.message };
  }
}

async function checkStatus(authClient, url) {
  const indexing = google.indexing({ version: "v3", auth: authClient });

  try {
    const response = await indexing.urlNotifications.getMetadata({
      url: url,
    });

    const data = response.data;
    console.log(`📊 Status for: ${url}`);
    if (data.latestUpdate) {
      console.log(`   Last update type: ${data.latestUpdate.type}`);
      console.log(`   Last update time: ${data.latestUpdate.notifyTime}`);
    }
    if (data.latestRemove) {
      console.log(`   Last remove time: ${data.latestRemove.notifyTime}`);
    }
    console.log("");
    return data;
  } catch (error) {
    console.error(`❌ Cannot get status for: ${url}`);
    console.error(`   Error: ${error.message}`);
    console.log("");
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);

  console.log("🔍 Google Indexing API — Portfolio Manda");
  console.log("=========================================\n");

  const authClient = await getAuthClient();

  // Mode: check status
  if (args[0] === "--status") {
    const url = args[1] || URLS_TO_INDEX[0];
    await checkStatus(authClient, url);
    return;
  }

  // Mode: single URL
  if (args[0] && !args[0].startsWith("--")) {
    await submitUrl(authClient, args[0]);
    return;
  }

  // Mode: submit all pending URLs
  console.log(`Soumission de ${URLS_TO_INDEX.length} URLs...\n`);

  const results = [];
  for (const url of URLS_TO_INDEX) {
    const result = await submitUrl(authClient, url);
    results.push(result);
    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 500));
  }

  const success = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log("=========================================");
  console.log(`✅ Succes: ${success} | ❌ Echec: ${failed}`);
  console.log(`\nQuota: 200 soumissions/jour`);
  console.log(`Verifier dans 24-48h si les pages sont indexees.`);
}

main().catch(console.error);
