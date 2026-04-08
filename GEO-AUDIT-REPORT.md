# GEO Audit Report: manda-ia.com

**Date :** 8 avril 2026
**URL :** https://manda-ia.com
**Type :** Portfolio / Freelance Developer (Professional Services)
**Pages analysees :** 62 (31 FR + 31 EN)
**Audit precedent :** 27 mars 2026 (score 57/100)

---

## Resume Executif

**Score GEO Global : 52/100 (Fair)**

Le site a une base technique excellente (88/100) mais reste plombe par un manque critique d'autorite de marque (15/100). Aucune presence sur Reddit, YouTube, Wikipedia ou Wikidata. Les requetes GSC sont exclusivement brand ("manda ai", "manda ia") — aucune requete informationnelle ne genere d'impressions. 9 pages cles ne sont toujours pas indexees par Google. L'action la plus impactante : creer une entree Wikidata et developper une presence sur les plateformes que les IA utilisent pour la reconnaissance d'entites.

### Scores par Categorie

| Categorie | Score | Poids | Score Pondere | Evolution vs 27 mars |
|---|---|---|---|---|
| AI Citability | 52/100 | 25% | 13.0 | -3 (methodo plus stricte) |
| Brand Authority | 15/100 | 20% | 3.0 | -13 (audit plus rigoureux) |
| Content E-E-A-T | 59/100 | 20% | 11.8 | +1 |
| Technical GEO | 88/100 | 15% | 13.2 | -3 (criteres GEO specifiques) |
| Schema & Structured Data | 63/100 | 10% | 6.3 | +11 (dateModified fixe) |
| Platform Optimization | 46/100 | 10% | 4.6 | -2 |
| **Score GEO Global** | | | **51.9 → 52/100** | |

---

## Messages Google Search Console — Erreurs a Regler

### Etat de l'indexation (8 avril 2026)

**Indexees (7 pages) :**
- `/` (homepage) — 2 clics, 13 impressions, position 5.0
- `/services` — 0 clics, 4 impressions, position 6.8
- `/blog` — 0 clics, 1 impression, position 4.0
- `/en` — 0 clics, 9 impressions, position 5.8
- `/en/projects` — 1 clic, 27 impressions, position 5.0
- `/blog/automatiser-business-n8n-guide-complet` — indexe

**NON indexees — 9 pages a traiter :**

| Page | Statut Google | Gravite | Action |
|---|---|---|---|
| `/about` | URL unknown to Google | HAUTE | Demander l'indexation via GSC |
| `/projects` | URL unknown to Google | HAUTE | Demander l'indexation via GSC |
| `/services/automatisation-n8n-madagascar` | URL unknown to Google | HAUTE | Demander l'indexation via GSC |
| `/quiz` | URL unknown to Google | MOYENNE | Demander l'indexation via GSC |
| `/contact` | Discovered - not indexed | HAUTE | Google l'a trouvee mais pas crawlee — attendre ou soumettre via Indexing API |
| `/services/developpeur-no-code-madagascar` | Discovered - not indexed | CRITIQUE | Landing SEO principale — soumettre en priorite |
| `/services/developpeur-low-code-madagascar` | Discovered - not indexed | HAUTE | Soumettre via Indexing API |
| `/mentions-legales` | Discovered - not indexed | BASSE | Attendre crawl naturel |
| `/blog/claude-code-developper-avec-ia` | Discovered - not indexed | MOYENNE | Soumettre via Indexing API |

**Statut "PAGE_FETCH_STATE_UNSPECIFIED"** sur les 9 pages = Google n'a PAS ENCORE tente de fetcher ces pages. Ce n'est pas un blocage technique (robots.txt OK, pas de noindex), c'est un probleme de budget de crawl.

### Sitemap GSC
- 62 URLs, **0 erreurs, 1 warning**
- Dernier telechargement Google : **8 avril 2026** (aujourd'hui)
- **Warning probable** : toutes les dates `lastmod` sont identiques (2026-03-26/27) — Google peut ignorer ces signaux

### Performance GSC (28 derniers jours)
| Metrique | Valeur |
|---|---|
| Clics | 3 |
| Impressions | 48 |
| CTR moyen | 6.25% |
| Position moyenne | 5.2 |

**Requetes :**
- "manda ai" : 15 impressions, 1 clic, position 5.5
- "manda ia" : 1 impression, 1 clic, position 1.0

**Probleme** : uniquement des requetes brand. Zero requete informationnelle ("developpeur no code madagascar", "automatisation n8n", etc.) malgre le contenu optimise. Cause probable : pages cles non encore indexees.

### Actions GSC Immediates

1. **Soumettre manuellement les 9 URLs** via "Demander l'indexation" dans GSC URL Inspection
2. **Mettre a jour les `lastmod`** du sitemap avec des dates reelles par page (pas bulk)
3. **Reverifier le 15 avril** — les pages "Discovered" devraient etre crawlees sous 1-2 semaines
4. **Creer des liens internes forts** vers les pages non indexees (maillage interne)

---

## Issues Critiques (A Regler Immediatement)

### 1. Brand Authority quasi inexistante (15/100)
- **0** presence Reddit, YouTube, Wikipedia, Wikidata, Stack Overflow, Dev.to, Medium
- GitHub : 1 follower, **URL portfolio encore sur l'ancien domaine .vercel.app**
- Seules presences : LinkedIn + Malt (non verifiables par scraping)
- **Impact** : les IA ne peuvent pas confirmer l'identite de l'entite "Mandaniaina Randriambinintsoa" via des sources tierces

**Actions :**
- Creer une entree **Wikidata** (30 min, gratuit) — plus gros impact single action
- Mettre a jour **GitHub profile URL** vers manda-ia.com (2 min)
- Poster **3 contributions utiles sur Reddit** (r/nocode, r/n8n, r/webdev)
- Creer un **compte Dev.to** et cross-poster les articles blog

### 2. 9 pages cles non indexees par Google
- Voir section GSC ci-dessus
- La landing SEO principale (`/services/developpeur-no-code-madagascar`) n'est PAS indexee
- Aucune requete informationnelle ne genere d'impressions

### 3. "0+ ans d'experience" affiche sur la homepage
- Le compteur d'experience affiche "0+" — detruit la confiance
- Devrait afficher "4+" d'apres la timeline About
- **Action** : verifier la source de donnees ou hardcoder la valeur

---

## Issues Haute Priorite (Regler sous 1 semaine)

### 4. GitHub profile URL incorrecte
- Pointe encore vers `portfolio-manda-developpeur-nocode-madagascar.vercel.app`
- Devrait pointer vers `https://manda-ia.com`
- **Impact** : casse la resolution d'entite pour ChatGPT, Gemini, Copilot

### 5. Zero citations externes dans les articles blog
- Aucun lien sortant vers des sources (docs n8n, Anthropic, Gartner, Fortune BI)
- Les stats sont citees par nom mais pas liees
- **Action** : ajouter des hyperliens vers les sources dans chaque article

### 6. Email professionnel manquant
- `mandaniaina.randriambinintsoa@gmail.com` sur un site avec domaine custom
- **Action** : configurer `contact@manda-ia.com` via Porkbun email forwarding

### 7. Speakable schema absent
- Aucune page n'a de `SpeakableSpecification`
- Critique pour la consommation par les assistants IA
- **Action** : ajouter `speakable` a `BlogPostJsonLd.tsx`

### 8. sameAs trop limite (3 plateformes)
- Seulement LinkedIn, GitHub, Malt dans le schema
- **Action** : creer YouTube, Twitter/X et ajouter les URLs

### 9. Logo ProfessionalService en SVG
- Google recommande PNG/JPG min 112x112px
- **Action** : creer `logo.png` et mettre a jour `LocalBusinessJsonLd.tsx`

### 10. Temoignage unique non verifiable
- "Julien Renard, ScalApp" sans lien LinkedIn ni logo
- **Action** : ajouter lien LinkedIn + embed avis Malt/Google Business

---

## Issues Moyenne Priorite (Regler sous 1 mois)

### 11. Page About trop courte (~650 mots)
- Devrait etre 1500+ mots pour un bon score E-E-A-T
- Ajouter : details ESTI, publications, certifications, case studies detailles
- Ajouter `ProfilePageJsonLd` avec `alumniOf` pour ESTI

### 12. Articles blog trop courts
- "Claude Code: developper avec IA" : ~650 mots (trop fin pour un guide)
- "n8n guide complet" : ~1200 mots (insuffisant pour "guide complet")
- **Action** : enrichir a 1500-2500 mots chacun

### 13. Pas de contenu comparatif structure
- Tableaux de comparaison en divs CSS, pas en `<table>` HTML
- Google AI Overviews extrait directement les `<table>` elements
- **Action** : convertir les comparaisons en vrais tableaux HTML

### 14. H2 homepage non query-matching
- "LE PROCESSUS", "EN CHIFFRES" — labels stylistiques
- Mieux : "Comment fonctionne mon processus ?", "Mes resultats en chiffres"

### 15. SearchAction WebSite sans route /search
- Le schema declare un SearchAction mais `/search` n'existe probablement pas
- **Action** : creer la route ou supprimer le SearchAction

### 16. foundingDate format incorrect
- `"2023"` devrait etre `"2023-01-01"` (ISO 8601)

### 17. llms.txt a ameliorer
- Ajouter section FAQ inline
- Ajouter section English
- Ajouter section Technical (types schema, langues, nombre de pages)

### 18. Schemas manquants
- `/projects` : pas de ItemList schema
- `/blog` : pas de CollectionPage schema
- `/about` : pas de ProfilePage schema
- Service pages : schema Service trop minimal (pas de serviceType, offers)

### 19. Cadence de publication absente
- 7 articles tous publies en fevrier 2026, rien depuis
- **Action** : publier 2-4 articles/mois minimum

### 20. IndexNow non persistant
- Pas de fichier cle IndexNow dans `public/`
- **Action** : configurer IndexNow pour notification automatique a Bing

---

## Issues Basse Priorite (Optimiser quand possible)

- Meta description (188 chars) legerement au-dessus des 160 recommandes
- `email` dans ProfessionalService avec prefixe `mailto:` (devrait etre plain)
- Preconnect manquant pour Supabase et Google Analytics
- `fetchpriority="high"` manquant sur l'image hero
- HSTS sans `includeSubDomains`
- `wordCount` non passe au BlogPostJsonLd
- Politique editoriale absente

---

## Deep Dives par Categorie

### AI Citability (52/100)

**Top passages citables :**
| Passage | Score | Pourquoi |
|---|---|---|
| Definition no-code + stats marche ($66B, Gartner 70%) | 74 | Self-contained + stats nommees |
| Tableau comparatif No-Code/Low-Code/Traditionnel | 71 | Structure + chiffres precis |
| ROI n8n (5h/sem = 1000EUR/mois) | 68 | Calcul concret |
| Positionnement n8n vs Zapier/Make | 62 | Differentiation competitive |
| FAQ delais livraison | 60 | Reponse directe |

**Probleme majeur** : contenu uniquement en francais. Les modeles IA sont domines par l'anglais — multiplicateur de 0.78 applique. Les pages `/en/` doivent etre enrichies avec la meme densite de donnees.

**Passages non citables :**
- Descriptions de services trop vagues ("Applications web completes et SaaS sur mesure")
- Hero subtitle trop long (5+ phrases narratives)
- Process steps generiques

### Brand Authority (15/100)

| Plateforme | Statut | Points |
|---|---|---|
| Wikipedia | Absent | 0/20 |
| Wikidata | Absent | 0/15 |
| YouTube | Absent | 0/15 |
| Reddit | 0 mentions | 0/10 |
| LinkedIn | Present | 7/10 |
| GitHub | 13 repos, 0 followers, URL incorrecte | 3/25 |
| Malt | Present (non verifiable) | 5/25 |
| Stack Overflow | Absent | 0/5 |
| Dev.to/Medium | Absent | 0/5 |

### Content E-E-A-T (59/100)

| Dimension | Score | Points forts | Lacunes |
|---|---|---|---|
| Experience | 14/25 | Case study Factumation, 20+ projets, GA4 live demo | Pas de metriques avant/apres, pas de screenshots process |
| Expertise | 13/25 | Master 1 ESTI, depth technique n8n/Claude Code | Pas de certifications, pas de publications externes |
| Authoritativeness | 11/25 | Schema Person/ProfessionalService, profils externes | Zero backlinks, zero mentions media, zero reconnaissance |
| Trustworthiness | 18/25 | HTTPS, contact complet, pages legales, schema | Gmail au lieu d'email pro, 1 seul temoignage non verifiable |

**Detection IA** : contenu AI-assiste mais dirige et edite par l'auteur. Voix personnelle presente dans About et Claude Code. Sections informationnelles plus generiques.

### Technical GEO (88/100)

| Composant | Score | Status |
|---|---|---|
| SSR/SSG | 95 | Next.js App Router, tout le contenu dans le HTML initial |
| Meta Tags | 95 | Titre, description, canonical, OG, Twitter, hreflang — complets |
| Crawlability | 85 | robots.txt permissif, sitemap 62 URLs, 0 erreurs |
| Securite | 95 | HTTPS, HSTS 2 ans, CSP complet, X-Frame-Options DENY |
| Core Web Vitals | 75 | LCP risk medium (pas de fetchpriority), CLS medium |
| Mobile | 90 | Viewport OK, responsive Tailwind, images srcset |
| URL Structure | 90 | Clean slugs, hierarchie logique, i18n par path |
| Response | 85 | 200 OK, Vercel CDN, pages legales fixees (plus de 404) |

**Pages legales fixees** : `/privacy` et `/mentions-legales` retournent maintenant 200 (etaient 404 au dernier audit).
**Canonical resolue** : tous les tags pointent vers manda-ia.com, .vercel.app desactive.

### Schema & Structured Data (63/100)

**8 types de schema detectes :** Person, WebSite, ProfessionalService, FAQPage, BreadcrumbList, BlogPosting, Service, SoftwareApplication

| Composant | Points | Notes |
|---|---|---|
| Organization/LocalBusiness | 10/20 | Present mais sameAs limite a 3 plateformes |
| Article + dateModified | 15/15 | FIXE depuis dernier audit |
| Person (author) | 12/15 | Complet, manque alumniOf |
| sameAs completeness | 5/15 | 3 plateformes seulement |
| speakable | 0/10 | ABSENT |
| BreadcrumbList | 5/5 | Present et valide |
| WebSite + SearchAction | 3/5 | /search probablement inexistant |
| Pas de schemas deprecies | 5/5 | Clean |
| Format JSON-LD | 5/5 | Exclusivement JSON-LD |
| Validation | 3/5 | Issues mineures (mailto, SVG logo, foundingDate) |

### Platform Optimization (46/100)

| Plateforme IA | Score | Principal bloqueur |
|---|---|---|
| Google AI Overviews | 55 | H2 non query-matching, pas de `<table>` HTML |
| Google Gemini | 42 | Zero YouTube, GBP minimal |
| Bing Copilot | 40 | Pas d'IndexNow, pas de Bing Webmaster Tools |
| ChatGPT Web Search | 38 | Pas de Wikidata, pas d'entity recognition |
| Perplexity AI | 35 | Zero validation communautaire (Reddit, forums) |

---

## Quick Wins (Cette Semaine)

1. **Mettre a jour l'URL GitHub** vers manda-ia.com (2 min, impact sur 3 plateformes IA)
2. **Creer une entree Wikidata** pour "Mandaniaina Randriambinintsoa" (30 min, plus gros impact)
3. **Soumettre les 9 URLs non indexees** via GSC "Demander l'indexation" (10 min)
4. **Fixer "0+ ans d'experience"** sur la homepage (5 min)
5. **Ajouter `speakable`** au BlogPostJsonLd (15 min de code)
6. **Fixer `foundingDate`** : "2023" → "2023-01-01" (2 min)
7. **Fixer `email`** : retirer le prefixe `mailto:` dans ProfessionalService (2 min)
8. **Configurer email pro** contact@manda-ia.com via Porkbun (15 min)

---

## Plan d'Action 30 Jours

### Semaine 1 : Fondations Entite + GSC
- [ ] Creer entree Wikidata
- [ ] Mettre a jour URL GitHub
- [ ] Soumettre 9 URLs via GSC
- [ ] Fixer compteur "0+ ans"
- [ ] Ajouter speakable au BlogPostJsonLd
- [ ] Fixer foundingDate, email, logo PNG
- [ ] Configurer contact@manda-ia.com

### Semaine 2 : Brand Authority
- [ ] Creer compte YouTube + 2 videos tutoriel (screen recordings n8n)
- [ ] Creer compte Dev.to + cross-poster 3 articles
- [ ] Poster 3 contributions utiles sur Reddit (r/nocode, r/n8n, r/webdev)
- [ ] Creer compte Twitter/X + ajouter a sameAs
- [ ] Verifier site dans Bing Webmaster Tools + IndexNow

### Semaine 3 : Content E-E-A-T
- [ ] Enrichir page About a 1500+ mots (alumniOf ESTI, certifs, methodo)
- [ ] Ajouter liens sources externes dans tous les articles blog
- [ ] Enrichir article Claude Code a 1500+ mots
- [ ] Ajouter temoignages verifiables (lien LinkedIn + avis Malt)
- [ ] Ajouter ProfilePageJsonLd sur /about

### Semaine 4 : Schema + Contenu
- [ ] Ajouter ItemList schema sur /projects et CollectionPage sur /blog
- [ ] Convertir tableaux comparatifs en `<table>` HTML
- [ ] Enrichir ServiceJsonLd (serviceType, offers)
- [ ] Publier 2 nouveaux articles blog avec data originale
- [ ] Réécrire H2 homepage en format query-matching
- [ ] Mettre a jour llms.txt (FAQ, English, Technical)
- [ ] Reverifier indexation GSC (objectif : 9 pages → 0 non indexees)

---

## Comparaison avec Audit Precedent (27 mars 2026)

| Metrique | 27 mars | 8 avril | Delta | Notes |
|---|---|---|---|---|
| Score GEO | 57 | 52 | -5 | Methodologie plus stricte, brand -13 |
| AI Visibility | 60 | 51 | -9 | Penalite langue francaise appliquee |
| Platform | 48 | 46 | -2 | Stable |
| Technical | 91 | 88 | -3 | Criteres GEO specifiques |
| E-E-A-T | 58 | 59 | +1 | Stable |
| Schema | 52 | 63 | +11 | dateModified fixe |
| Brand Authority | 28 | 15 | -13 | Audit plus rigoureux |

**Note** : la baisse du score est principalement methodologique (criteres plus stricts, penalite langue). Le site a objectivement progresse (pages legales OK, canonical resolue, favicon, dateModified fixe).

---

## Appendice : Pages Analysees

| URL | Titre | Indexee | Issues GEO |
|---|---|---|---|
| / | Developpeur No-Code & Fullstack IA a Madagascar | Oui | H2 stylistiques, hero long, "0+" |
| /services | Services | Oui | Descriptions vagues |
| /blog | Blog | Oui | Pas de CollectionPage schema |
| /about | A propos | Non | Trop court, pas de ProfilePage schema |
| /contact | Contact | Non | Discovered, not indexed |
| /projects | Projets | Non | Pas de ItemList schema |
| /services/developpeur-no-code-madagascar | Dev No-Code Madagascar | Non | CRITIQUE — landing SEO non indexee |
| /services/automatisation-n8n-madagascar | Expert N8N Madagascar | Non | URL unknown to Google |
| /services/developpeur-low-code-madagascar | Dev Low-Code Madagascar | Non | Discovered, not indexed |
| /quiz | Quiz | Non | URL unknown |
| /mentions-legales | Mentions Legales | Non | Discovered, not indexed |
| /privacy | Privacy | Oui | OK |
| /blog/automatiser-business-n8n-guide-complet | Guide N8N | Oui | Pas de citations externes |
| /blog/claude-code-developper-avec-ia | Claude Code | Non | Trop court (650 mots) |
| /en | English Homepage | Oui | 9 impressions, 0 clics |
| /en/projects | English Projects | Oui | 27 impressions, 1 clic |

---

*Genere par Claude Code — Audit GEO complet le 8 avril 2026*
