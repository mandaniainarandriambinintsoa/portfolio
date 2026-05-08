#!/usr/bin/env node
/**
 * IndexNow — Submit URLs to Bing, Yandex, and other search engines
 * Google does NOT support IndexNow, but Bing Copilot does.
 *
 * Usage:
 *   node scripts/submit-indexnow.js              # Submit all URLs
 *   node scripts/submit-indexnow.js <url>        # Submit a specific URL
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://manda-ia.com";
const HOST = "manda-ia.com";

// IndexNow key — also needs to be accessible at /{key}.txt on the site
const INDEXNOW_KEY = "manda-indexnow-2026-portfolio";
const KEY_FILE_PATH = path.join(__dirname, "..", "public", `${INDEXNOW_KEY}.txt`);

// Ensure key file exists in public/
if (!fs.existsSync(KEY_FILE_PATH)) {
  fs.writeFileSync(KEY_FILE_PATH, INDEXNOW_KEY);
  console.log(`Created key file: public/${INDEXNOW_KEY}.txt\n`);
}

const URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/en`,
  `${SITE_URL}/services`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/contact`,
  // Landing pages FR
  `${SITE_URL}/services/automatisation-n8n-madagascar`,
  `${SITE_URL}/services/developpeur-react-nextjs-madagascar`,
  `${SITE_URL}/services/developpeur-nextjs-supabase-madagascar`,
  `${SITE_URL}/services/developpeur-python-ia-madagascar`,
  // Landing pages EN
  `${SITE_URL}/en/services/n8n-automation-expert-madagascar`,
  `${SITE_URL}/en/services/hire-react-nextjs-developer-madagascar`,
  `${SITE_URL}/en/services/nextjs-supabase-developer-madagascar`,
  `${SITE_URL}/en/services/python-ai-developer-madagascar`,
  // Blog posts
  `${SITE_URL}/blog/claude-code-developper-avec-ia`,
  `${SITE_URL}/blog/comment-choisir-developpeur-no-code-madagascar`,
  `${SITE_URL}/blog/no-code-vs-low-code-guide-entreprises-malgaches`,
  `${SITE_URL}/blog/automatiser-business-n8n-guide-complet`,
  `${SITE_URL}/blog/pourquoi-supabase-remplace-firebase`,
  `${SITE_URL}/blog/pourquoi-automatiser-business-madagascar-n8n`,
  `${SITE_URL}/blog/5-workflows-n8n-indispensables-pme-madagascar`,
];

function submitToIndexNow(engine, urlList) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urlList,
    });

    const options = {
      hostname: engine,
      port: 443,
      path: "/indexnow",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const status = res.statusCode;
        if (status === 200 || status === 202) {
          console.log(`  ✅ ${engine} — ${status} OK (${urlList.length} URLs)`);
        } else {
          console.log(`  ❌ ${engine} — ${status} ${data.slice(0, 200)}`);
        }
        resolve(status);
      });
    });

    req.on("error", (err) => {
      console.log(`  ❌ ${engine} — Error: ${err.message}`);
      resolve(0);
    });

    req.write(body);
    req.end();
  });
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length > 0 && !args[0].startsWith("--")
    ? [args[0]]
    : URLS;

  console.log("🔔 IndexNow — Soumission multi-moteurs");
  console.log("=======================================");
  console.log(`URLs: ${urlList.length}\n`);

  const engines = [
    "api.indexnow.org",     // Hub (redistribue aux autres)
    "www.bing.com",         // Bing + Copilot
    "yandex.com",           // Yandex
  ];

  for (const engine of engines) {
    await submitToIndexNow(engine, urlList);
  }

  console.log("\n=======================================");
  console.log("Moteurs supportes: Bing, Yandex, Seznam, Naver");
  console.log("Google ne supporte PAS IndexNow.");
  console.log("Les URLs devraient etre crawlees dans les heures qui suivent.");
}

main().catch(console.error);
