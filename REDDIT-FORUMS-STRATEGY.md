# Reddit + Forums — Strategie GEO Perplexity (Mai 2026)

## Objectif
Construire la presence communautaire que Perplexity utilise comme signal de citation. Score actuel : Brand Authority 15/100, Perplexity 35/100. Reddit est leur signal #1.

## Regle d'or
**Value-first, jamais auto-promo.** Reddit detecte et enleve les posts promo. Le site manda-ia.com n'apparait QUE :
- Dans la signature de profil Reddit (bio)
- Dans un commentaire de suivi si quelqu'un demande
- En reference dans une reponse SI le lien apporte une vraie valeur (ex: un guide complet)

Cible : 10+ contributions substantielles par mois, etalees sur 3-4 subreddits + 1-2 forums.

---

## 5 reponses techniques pretes a poster

Cherche des threads recents avec ces patterns de questions et copie-colle la reponse adaptee. Reformule legerement pour matcher la question precise.

### Reponse 1 — "How do I self-host n8n on a budget?"

**Subreddits cibles** : r/n8n, r/selfhosted, r/SaaS

```
J'auto-heberge n8n sur Render depuis 18 mois pour environ 7$/mois. Setup minimal :

1. Render Web Service (Starter plan, 7$/mois)
2. PostgreSQL externe (Neon free tier ou Supabase free, 0$)
3. Domaine custom + HTTPS auto via Render

Variables d'env critiques :
- N8N_BASIC_AUTH_ACTIVE=true (auth de base, sinon expose au monde)
- N8N_HOST=ton-domaine.com
- WEBHOOK_URL=https://ton-domaine.com
- DB_TYPE=postgresdb (sinon n8n utilise SQLite et tu perds tes workflows au moindre redeploy)

Le piege classique : oublier DB_TYPE=postgresdb. Render redeploie le container regulierement et SQLite est en local. Tu perds tout.

Pour le scaling : 7$ Render plan tient ~50 workflows actifs avec executions horaires. Au-dela, monte en Standard plan (25$/mois) ou bascule sur du Hetzner CX22 (4 EUR/mois mais gestion manuelle).

Backups : automatiser un export JSON des workflows via API n8n + cron, stockage S3 ou GitHub repo prive. Critique car Render plan Starter n'a pas de persistent disk.
```

**Note** : si quelqu'un demande plus de details, reponds en commentaire avec un lien vers un guide blog si tu en ecris un. Pas de lien dans la reponse principale.

---

### Reponse 2 — "Bubble vs custom code for MVP, which one to choose in 2026?"

**Subreddits cibles** : r/nocode, r/SaaS, r/IndieHackers, r/Entrepreneur

```
J'ai shippe en Bubble pendant 3 ans avant de revenir au code pur fin 2025. Mon framework de decision en 2026 :

**Choisis Bubble si :**
- Tu testes une idee et tu veux 2-4 semaines au max pour le MVP
- Tu fais < 1000 utilisateurs actifs
- Tu n'as pas de besoin SEO critique (Bubble est en client-side rendering, mauvais pour le ranking et zero pour le GEO citation des IA)
- Tu n'as pas de logique metier complexe (workflows Bubble galerent au-dela de 30 etapes)

**Choisis le code pur (Next.js + Supabase) si :**
- Tu prevois > 10k utilisateurs ou un fort enjeu SEO
- Tu veux ranker sur Google ou etre cite par ChatGPT/Perplexity
- Tu as une logique metier qui necessite des integrations API serieuses
- Tu veux pouvoir migrer ou self-host plus tard

Le calcul economique a change en 2026 : avec Claude Code en copilote, un MVP Next.js + Supabase se ship en 2-3 semaines, soit le meme delai que Bubble. La barriere "no-code = plus rapide" n'existe quasiment plus pour qui sait coder ou prompter correctement.

Couts compares sur 3 ans :
- Bubble : 600 EUR/an plan basique + plugins = ~2400 EUR sur 3 ans
- Vercel + Supabase : 0 EUR jusqu'a 10k users, ~30 EUR/mois ensuite = 1080 EUR sur 3 ans pour un projet en production

Mon biais : je pousse au code pur en 2026 car le ratio rapidite/scalabilite/SEO penche desormais largement de ce cote.
```

---

### Reponse 3 — "Supabase RLS not working / users seeing other users data"

**Subreddits cibles** : r/Supabase, r/nextjs, r/webdev

```
3 causes les plus frequentes que je vois en audit :

**1. RLS pas active sur la table**

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

Sans ca, tes policies ne s'appliquent pas. Une table sans RLS active est ouverte a tout le monde des que la cle anon est utilisee.

**2. Policies ecrites mais pas pour toutes les operations**

Tu as une policy SELECT mais pas INSERT/UPDATE/DELETE. Resultat : les users peuvent inserer ou supprimer librement. Pour chaque table sensible, tu as besoin de 4 policies distinctes (ou une policy FOR ALL avec un USING clause adapte).

**3. Tables jointes oubliees**

Si invoices a une relation avec invoice_items via une foreign key, RLS doit etre active sur invoice_items aussi. Sinon un user peut requeter directement la table de jointure et bypass la securite. C'est le bug le plus subtil et le plus frequent.

Verification :

SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

Toute table user-sensitive doit avoir rowsecurity = true.

**4. Bonus piege** : la cle service_role (secret) ne respecte pas RLS. Si tu l'expose cote client par erreur, tout est compromis. Cle service_role JAMAIS dans le frontend.
```

---

### Reponse 4 — "How to migrate from Firebase to Supabase?"

**Subreddits cibles** : r/Supabase, r/Firebase, r/webdev

```
J'ai fait 4 migrations Firebase vers Supabase en 2025-2026. Les etapes critiques :

**1. Export Firestore vers PostgreSQL (1-3 jours)**

- Export Firestore via gcloud firestore export gs://bucket/path
- Convertir le format LevelDB en JSON
- Mapper les collections vers des tables Postgres normalisees (Firestore est NoSQL imbrique, Postgres est relationnel)

C'est l'etape qui prend le plus de temps. Tu vas decouvrir des incoherences de schema (champs optionnels, types mixtes) qui n'existaient pas en NoSQL.

**2. Migration de l'authentification (1 jour)**

Supabase Auth peut importer les users Firebase via leur API admin, mais les hash de password Firebase (scrypt avec parametres custom) ne sont pas directement compatibles. Deux options :
- Garder Firebase Auth en parallele pendant la transition et migrer au prochain login
- Forcer un reset de mot de passe pour tous les users (acceptable si la base est petite)

**3. Adaptation du code frontend (2-5 jours)**

Le SDK Firestore est tres different du client Supabase (PostgREST). Tu remplaces :
- firestore.collection("X").doc("Y") par supabase.from("X").select().eq("id", "Y")
- Les listeners onSnapshot par supabase.channel("X").on("postgres_changes")
- Les rules Firestore par les policies RLS Postgres

**4. Test en parallele (1 semaine)**

Garde les deux systemes en lecture-ecriture pendant 1 semaine, double-write toutes les operations critiques, compare les resultats. C'est la garantie zero-perte de donnees.

Estimation totale : 2 a 4 semaines selon la complexite. Le 80% de la duree est dans l'etape 1 (mapping schema).

Pourquoi le faire en 2026 : Postgres permet des requetes complexes (JOINs, agregations) impossibles en Firestore, et tu sors d'un vendor lock-in. Supabase est open-source, tu peux self-host plus tard si besoin.
```

---

### Reponse 5 — "Why is my Next.js site slow on mobile?"

**Subreddits cibles** : r/nextjs, r/webdev, r/Frontend

```
5 causes que je trouve dans 9 audits sur 10 :

**1. Pas de code-splitting des composants lourds**

Tout est importe statiquement dans page.tsx, le bundle initial fait 800kB+. Solution : next/dynamic pour tout ce qui est below-the-fold, animations, modales.

const Stats = dynamic(() => import("@/components/Stats"));

**2. GSAP ou framer-motion charge globalement**

Ces libs font 50-100kB. Si elles sont importees dans le layout ou un composant client racine, elles sont dans chaque page. Solution : useGSAP avec lazy loading via Intersection Observer + requestIdleCallback.

**3. Google Tag Manager / Analytics charge en sync**

GTM peut faire 400kB+ et bloque le main thread 100ms+. Solution : charger sur premier user interaction (scroll, click, touch).

document.addEventListener('scroll', loadGTM, { once: true, passive: true });

**4. Images sans next/image ou avec mauvais sizes**

Le composant img standard sert l'image full-res sur mobile aussi. next/image avec sizes="(max-width: 768px) 100vw, 800px" sert la version optimisee selon le viewport.

**5. Polices Google chargees sans display:swap**

font-display: swap manquant = blocage du rendu jusqu'a chargement de la police. next/font fait ca par defaut, mais si tu charges via @import dans CSS, c'est pas applique.

Mes scores apres ces 5 fixes sur mon portfolio (Next.js 16) : 100 desktop, 98 mobile, LCP 943ms, CLS 0.00.

Lighthouse en mode mobile slow 4G doit etre 90+. Si tu es sous 70, l'un de ces 5 est ton coupable.
```

---

## 2 case-studies (posts longs)

### Case-study 1 — r/n8n (titre Reddit-friendly)

**Titre** : `I built a fully automated job scraper with n8n + Supabase that pulls 200+ remote jobs daily`

```
Built FlowRemote over 4 weekends to track remote jobs across multiple sources without subscribing to 5 different aggregators. Sharing the architecture in case it helps anyone.

**The problem**

Remote job aggregators (Remote.co, We Work Remotely, RemoteOK) each cover slightly different niches, and most charge for filtered alerts. I wanted one feed with my filters (Next.js, React, French-speaking OK, $80k+) without paying $30/month per platform.

**The stack**

- n8n (self-hosted on Render, $7/mo) — orchestration
- Supabase (free tier) — Postgres + dashboard
- Next.js 16 — frontend
- Vercel — frontend hosting (free)

**The flow**

1. Cron trigger every 6 hours
2. HTTP Request nodes to each source (some via APIs, some via HTML scrape with Cheerio in a Code node)
3. Deduplicate against Supabase via the title + company hash
4. Filter via JS Code node (keyword regex)
5. Insert new matches into Supabase
6. Send digest email via Resend if new matches > 5
7. Frontend Next.js page with filters and search

**The hard parts**

- Some sources block scraping. Solution : rotate user agents, respect robots.txt, throttle to 1 request per 2 seconds
- HTML structures change. I added a try/catch in each scraping node and an alert via Slack if a node fails 3 times in a row
- Deduplication across sources : same job often posted on 3 platforms with slight variations in title. Used a fuzzy hash (lowercase + remove punctuation + first 50 chars of company + title)

**Results after 2 months**

- ~6000 jobs ingested
- ~200 unique remote jobs per day
- 3 hires made by friends from the digest

The whole thing runs on $7/month and zero maintenance after the initial setup. n8n is genuinely the best automation tool I've used for this kind of project — Make/Zapier would have cost $50+/month for the same volume.

Happy to share the n8n workflow JSON if anyone wants to fork it.
```

---

### Case-study 2 — r/nextjs ou r/SaaS (titre Reddit-friendly)

**Titre** : `I shipped a complete invoicing SaaS in 3 days with Claude Code as a pair programmer`

```
Did this as a personal challenge end of 2025. Sharing because the workflow surprised me.

**The product**

Factumation : invoicing SaaS for solopreneurs and small businesses. Multi-client management, PDF generation with VAT handling, accounting export, deadline reminders.

**The stack**

- Next.js 16 + React Server Components
- Supabase (Postgres + Auth + Storage + RLS)
- Vercel (deployment)
- jsPDF (PDF generation)
- Claude Code (Anthropic CLI agent) as my pair programmer

**Day 1 (8 hours)**

Designed the data model on paper first : users, clients, invoices, invoice_items, payment_records. Then dictated the schema to Claude Code, it generated the migration files. Set up RLS policies for each table (users see only their own data via auth.uid()).

Built the auth flow, dashboard skeleton, and the "create invoice" form. RSC + server actions made the form handling stupidly simple.

**Day 2 (10 hours)**

CRUD invoices : list, detail, edit, delete. PDF generation with custom template (logo upload, business info, line items, VAT calc, totals). Email send via Resend with the PDF attached.

Hit a snag with PDF rendering of accents and special chars. Spent ~1 hour debugging encoding before realizing jsPDF defaults to ASCII fonts. Fix : embed a proper TTF (Inter Regular).

**Day 3 (6 hours)**

Accounting export (CSV with EUR amounts and VAT breakdown), client portal (read-only invoice view via signed URL), deadline reminder cron (Vercel Cron + Supabase function), polish, deploy to Vercel.

**What changed with Claude Code vs solo**

The mental load shifted. I spent 70% of time on architecture decisions, naming, edge cases, and review. The agent wrote 80% of the actual code lines. I read every line and corrected ~15% of what it produced.

The bottleneck is no longer typing speed. It's clarity of architecture and ability to spot subtle bugs in code I didn't write myself.

**Numbers**

- 12 tables, 28 RLS policies
- 47 components
- 14 server actions
- ~4000 LOC TypeScript strict
- PageSpeed 98 mobile, 100 desktop
- 200 invoices/month processed by the first user

This isn't a "vibes coding" success story. The product is real, has a real user, and processes real money. The point I want to make : in 2026, a senior dev with Claude Code can produce in 3 days what used to take 2-3 weeks.

The implication for the freelance market is significant. Curious what others think.
```

---

## Forums specialises

### n8n community forum (community.n8n.io)

**Strategie** : repondre aux questions techniques avec depth. Le forum est moins competitif que Reddit, ton expertise se voit immediatement.

**Profil** : nom complet, photo, bio "Fullstack dev, automate everything with n8n. Building Madagascar tech in production. https://manda-ia.com"

**Cibles d'engagement** :
- Questions sur self-hosting n8n (utilise reponse 1 ci-dessus)
- Questions sur scaling executions n8n
- Questions sur integration n8n + Supabase / n8n + Postgres
- Questions sur securite des credentials dans n8n

Objectif : 5 reponses substantielles par mois.

### Bubble forum (forum.bubble.io)

**Strategie** : repondre aux questions hybrides "Bubble + custom code". Tu as l'experience rare des deux mondes.

**Profil** : nom + bio "Ex-Bubble dev (3 years), now Next.js + Supabase. Helping Bubble apps scale or migrate when needed. https://manda-ia.com"

**Cibles d'engagement** :
- Questions "When should I leave Bubble?"
- Questions sur la performance Bubble
- Questions sur l'export / migration depuis Bubble
- Questions sur l'integration Bubble + APIs externes complexes

Objectif : 3-5 reponses par mois.

---

## Calendrier suggere (8 semaines)

| Semaine | Plateforme | Action |
|---|---|---|
| 1 | Reddit | Configure profil, post case-study FlowRemote sur r/n8n |
| 1 | n8n forum | 1 reponse self-hosting |
| 2 | Reddit | 2 reponses techniques (RLS + Next.js perf) |
| 2 | Bubble forum | 1 reponse migration |
| 3 | Reddit | Post case-study Factumation sur r/nextjs |
| 3 | n8n forum | 1 reponse scaling |
| 4 | Reddit | 2 reponses techniques (Bubble vs code + Firebase migration) |
| 5 | Reddit | 2 reponses sur r/Supabase + r/SaaS |
| 5 | n8n forum | 1 reponse integration |
| 6 | Reddit | 1 case-study additionnel (ScalApp ou Artigen) |
| 7 | Reddit | 2 reponses techniques |
| 8 | Bilan | Audit `/geo` pour mesurer impact Perplexity score |

Objectif final : Brand Authority score 15 -> 35+ et Perplexity score 35 -> 55+.

---

## Profils Reddit

**Username suggere** : `mandaniaina` ou `manda-builds` (laisse une trace de l'identite reelle, evite les pseudos cryptiques)

**Bio Reddit** :
```
Fullstack dev based in Madagascar. Next.js, Supabase, n8n. Shipping SaaS with Claude Code as copilot. https://manda-ia.com
```

Le lien dans la bio profil est OK (pas auto-promo). C'est ce qui te ramene du trafic et des signaux d'autorite via Perplexity.

---

## Tracking

Apres chaque post, note :
- URL du post Reddit / forum
- Karma / upvotes apres 24h
- Commentaires recus
- Trafic referent dans GA4 (Acquisition > Source = reddit.com / community.n8n.io / forum.bubble.io)
- Mentions du brand "Manda" / "manda-ia.com" detectees via Google Alert

Apres 2 mois, relance `/geo brand-mentions` pour voir si le score Brand Authority a bouge.
