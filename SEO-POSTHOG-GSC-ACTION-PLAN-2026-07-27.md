# Plan SEO croise GSC + PostHog - manda-ia.com

Date de collecte : 2026-07-27

## Fenetres analysees

- GSC actuel : 28 jours finalises, du 2026-06-27 au 2026-07-24
- GSC precedent : du 2026-05-30 au 2026-06-26
- GSC pages et requetes : 90 jours finalises
- PostHog : du 2026-07-16 au 2026-07-27

## Resume

| Metrique GSC | Periode precedente | Periode actuelle | Evolution |
|---|---:|---:|---:|
| Clics | 225 | 146 | -35,1 % |
| Impressions | 7 225 | 4 976 | -31,1 % |
| CTR | 3,11 % | 2,93 % | -0,18 pt |
| Position moyenne | 9,57 | 10,08 | -0,51 |

La baisse vient surtout de la homepage, de `/en`, de PaidMada EN et des pages
React/Node.js. Mobile Money reste le cluster business le plus solide. La requete
`agent ia facebook` est le plus gros gisement non transforme.

## Lecture PostHog

PostHog est encore recent : 735 evenements et 75 visiteurs sur 12 jours.

| Signal | Valeur |
|---|---:|
| Clics CTA | 23 |
| Ouvertures de projets | 15 |
| Formulaires demarres | 1 |
| Formulaires reussis | 1 |
| Visiteurs uniques depuis Google | 23 |

La page `/solutions/api-mobile-money-madagascar` compte 11 pages vues, 6 scrolls
profonds et 3 clics CTA. L'echantillon est petit, mais la combinaison GSC +
PostHog confirme que cette page attire une audience utile et engagee.

## Pages prioritaires

| Priorite | Page | Signal GSC 90 j | Decision |
|---|---|---|---|
| P0 | `/projects/facebook-agen-ia` | 757 impressions, 2 clics, position 16,2 | Creer une page solution dediee et garder le projet comme etude de cas |
| P0 | `/en/projects/paidmada-mobile-money` | 967 impressions, CTR 3,41 %, position 6,1 | Recentrer title/meta sur `Madagascar Mobile Money API` |
| P0 | `/en/solutions/mobile-money-api-madagascar` | 237 impressions, CTR 1,69 %, position 4,8 | Recentrer le snippet sur le mot-cle principal |
| P1 | `/services/developpeur-nodejs-madagascar` | 148 impressions, CTR 1,35 %, position 6,4 | Mesurer encore 14 jours puis tester un nouveau title si le CTR reste faible |
| P1 | `/services/developpeur-react-nextjs-madagascar` | 267 impressions, CTR 4,87 %, position 7,5 | Ne pas refaire la page a froid; surveiller la chute recente |
| P1 | `/blog/claude-code-developper-avec-ia` | 65 impressions, 0 clic, position 10,2 | Consolider ou fusionner avec la solution Claude Code + n8n |

## Nouvelle page validee

La creation de `/solutions/agent-ia-facebook` est justifiee par 703 impressions
sur les 28 derniers jours pour `agent ia facebook`, avec seulement 1 clic.

La page solution cible l'intention commerciale et explique :

- qualification Messenger et commentaires ;
- brouillons de reponse avec validation humaine ;
- synchronisation CRM et n8n ;
- dashboard, reprise sur erreur et traçabilite ;
- difference entre chatbot et agent IA.

Le projet `/projects/facebook-agen-ia` reste une preuve et pointe vers la nouvelle
solution. Cette separation evite de transformer une etude de cas en landing page
commerciale confuse.

## Recherche de tendances

Outil recommande : SerpApi Google Trends.

- 250 recherches gratuites par mois ;
- donnees `RELATED_QUERIES` et `RELATED_TOPICS` ;
- integration JSON simple ;
- 2 credits par mot-cle dans le collecteur ajoute au projet.

`pytrends` n'est pas retenu comme socle : il est non officiel et son depot est
archive. L'API Google Trends officielle est interessante a terme, mais son acces
reste limite a l'alpha.

Commande apres ajout de `SERPAPI_KEY` :

```bash
pnpm analytics:trends -- --geo MG
pnpm analytics:trends -- --geo FR
```

Les tendances servent a decouvrir de nouveaux angles. GSC reste la preuve
principale avant de creer une page, car elle montre les requetes qui exposent deja
manda-ia.com.

## Cadence recommandee

1. Deployer les changements.
2. Demander l'indexation de la nouvelle page dans GSC.
3. Attendre 14 jours avant de juger les nouveaux snippets.
4. Relancer `pnpm analytics:cross`.
5. Creer une nouvelle page seulement si une requete business depasse environ
   50 impressions, garde une intention distincte et ne dispose pas deja d'une
   page cible correcte.
