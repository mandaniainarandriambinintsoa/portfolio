# Audit SEO, GEO et comportement - 28 aout 2026

## Verdict

Le site ne stagne pas. Il atteint un nouveau palier autour de 300 impressions quotidiennes, tandis que Google teste davantage de pages et de requetes hors du premier groupe de resultats. Le prochain gain vient moins d'un volume massif de nouvelles pages que du CTR, de l'autorite et de la clarification des intentions entre URLs proches.

## Google Search Console

Comparaison des donnees finalisees :

| Periode | Clics | Impressions | CTR | Position moyenne |
| --- | ---: | ---: | ---: | ---: |
| 29 juillet - 25 aout | 175 | 7 316 | 2,39 % | 11,76 |
| 1er - 28 juillet | 145 | 5 165 | 2,81 % | 10,74 |

Les impressions progressent de 41,6 % et les clics de 20,7 %. Le CTR recule parce que le site apparait sur davantage de requetes entre les positions 8 et 30. La position moyenne recule d'environ une place pour la meme raison.

La serie quotidienne confirme un palier, pas un recul : la premiere semaine de la periode comptait en moyenne 242 impressions et 6,1 clics par jour, contre 274 impressions et 9,3 clics sur les sept derniers jours finalises. Le 25 aout atteint 321 impressions et 9 clics. Les donnees des trois derniers jours ne sont volontairement pas utilisees, car elles ne sont pas encore finalisees par Google.

## Pages a proteger

- `/solutions/api-mobile-money-madagascar` : 58 clics, 986 impressions, position 5,46.
- `/projects/poker-mada` : 20 clics, 301 impressions, position 2,65.
- `/projects/paidmada-mobile-money` : 15 clics, 270 impressions, position 6,73.
- `/services/developpeur-react-nextjs-madagascar` : 6 clics, 115 impressions, position 7,94.

Ces pages repondent deja a leur intention. Les changements doivent rester limites aux preuves, au maillage interne et a l'actualisation.

## Pages a faire progresser

- `/services/developpeur-javascript-madagascar` : 314 impressions, position 16,52. La page est deja riche ; le levier est son alignement sur les questions de recrutement, son maillage et des mentions externes.
- `/solutions/agent-ia-facebook` : 419 impressions, position 14,96. La page projet voisine apparait aussi sur la requete principale ; son intention a ete repositionnee comme etude de cas n8n/CRM.
- `/blog/automatiser-business-n8n-guide-complet` : 251 impressions, position 32,18. Le guide repond desormais explicitement a `n8n c'est quoi`, `n8n est-il gratuit`, `comment fonctionne n8n` et `prix n8n`.
- `/solutions/agent-ia-prospection` : 234 impressions, position 29,32. La SERP est dominee par de grands editeurs ; les preuves, comparaisons et liens externes auront plus d'impact qu'une nouvelle page similaire.

## PostHog

Sur la couverture disponible depuis le 16 juillet : 960 visiteurs distincts, 137 clics CTA, 13 clics WhatsApp, 8 demarrages de formulaire et 5 soumissions reussies.

Google est le premier referent mesurable avec 224 visiteurs. Les pages d'entree organiques les plus frequentes sont Mobile Money, l'accueil, le contact, les services, Poker Mada et PaidMada.

Le hub `/site-metier` presente 64 vues et une lecture profonde mais aucun CTA mesure. Un appel a l'action contextuel a donc ete ajoute entre les secteurs et les realisations.

## Etude SERP

Huit recherches ont ete controlees avec SerpAPI en France et a Madagascar :

- `agent ia facebook` : la realisation Manda apparait dans le top 10, mais la solution commerciale reste en retrait. Les deux intentions ont ete separees.
- `agent ia prospection` : HubSpot, France Num, Salesforce et IBM dominent. Il faut gagner des mentions et publier des preuves, pas dupliquer la page.
- `automatisation n8n` et `n8n c'est quoi` : les resultats privilegient les guides pratiques, le prix, le fonctionnement et la comparaison Cloud/self-hosted.
- `developpeur freelance madagascar` et `developpeur web madagascar` : les resultats melangent agences, plateformes et recrutement. La differenciation repose sur le portfolio verifiable, le TJM et le contact direct.
- `consultant google search console` et `audit performance site web` : intention surtout informationnelle et outillage. Les etudes de cas mesurables sont plus credibles qu'une nouvelle landing generique.

## Actions implementees

1. Repositionnement de la realisation Facebook sur l'intention `qualification de leads Facebook avec n8n`.
2. Renforcement du lien vers la solution commerciale Agent IA Facebook.
3. Ajout des questions exactes de la SERP au guide n8n.
4. Ajout des questions `ou trouver` et `freelance ou agence` a la page developpeur full stack.
5. Ajout d'un CTA mesure sur le hub sites metier.
6. Remplacement de la promesse `100/100 PageSpeed` par un lien vers l'audit de performance documente.

## Prochaine mesure

Attendre 21 a 28 jours avant de juger les changements de requete ou de title. Suivre chaque semaine : impressions, CTR et position des quatre pages a faire progresser, puis les clics `cta_location = business_vertical_hub` dans PostHog.
