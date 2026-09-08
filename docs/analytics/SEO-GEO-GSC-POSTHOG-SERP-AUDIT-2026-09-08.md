# Elite Positioning & Architecture Analysis: manda-ia.com

Date de l'audit : 8 septembre 2026

Marché principal : Madagascar, recherche francophone

Objectif prioritaire : entrer durablement dans le top 3 sur « agent ia madagascar »

Sources : Google Search Console, PostHog, SerpApi Google Search et Google Trends, crawl technique de 168 URL, inspection visuelle des pages clés.

## Executive Summary

### The brutal truth

Manda dispose d'une base technique nettement meilleure que son classement actuel : toutes les URL du sitemap contrôlées répondent en 200, les canonicals, H1 et données structurées sont présents, et GSC montre une progression réelle. Le problème principal n'est donc ni un piratage ni une incapacité de Google à lire le site. C'est un problème de concentration du signal.

La requête « agent ia madagascar » était partagée entre une page commerciale, la page d'accueil et plusieurs articles. La page commerciale parlait d'abord de « développeur d'agents IA », alors que les concurrents placés en tête répondent immédiatement à l'expression « agent IA à Madagascar ». Elle présentait également moins vite des réalisations vérifiables. Le site possède ces preuves, mais les distribuait ailleurs.

La croissance organique est encourageante : sur les deux dernières périodes comparables de 28 jours, les clics GSC progressent de 30,3 % et les impressions de 45,7 %. En revanche, le CTR baisse de 2,89 % à 2,58 %. Le site gagne donc en exposition plus vite qu'il ne transforme cette exposition en visites.

Une place dans le top 3 ne peut pas être garantie par une modification de texte. Les changements on-page rendent la page éligible et plus cohérente. Pour dépasser durablement TDI Digital et WData, Manda doit aussi augmenter les signaux externes : mentions locales, liens éditoriaux, avis, cas clients nommés et cohérence d'entité.

### Scorecard

| Dimension | Score | Diagnostic |
|---|---:|---|
| Visual Design & UX | 76/100 | Identité forte et pages lisibles, mais preuve commerciale trop basse et animations pouvant masquer le contenu dans certains contextes. |
| Copywriting & Positioning | 71/100 | Expertise crédible, mais proposition trop large sur l'accueil et intention « agent IA Madagascar » insuffisamment concentrée avant correction. |
| Content Architecture | 75/100 | Bon volume et excellent maillage potentiel, mais chevauchement service/article et trop de landings concurrentes dans la navigation. |
| Technical SEO | 84/100 | Crawl sain, schema, sitemap, robots, llms.txt et canonicals présents. Les longueurs de métadonnées restent à rationaliser. |
| GEO / AEO Readiness | 77/100 | FAQ, Speakable, Service et preuves techniques favorables. Les sources externes et affirmations corroborées sont encore insuffisantes. |
| **Overall Positioning** | **77/100** | **Base solide, mais autorité locale et focalisation sémantique encore trop faibles pour sécuriser le top 3.** |

## Data Foundation

### Google Search Console

Période courante : 9 août au 5 septembre 2026.

Période précédente : 12 juillet au 8 août 2026.

| Mesure | Courant | Précédent | Évolution |
|---|---:|---:|---:|
| Clics | 215 | 165 | +30,3 % |
| Impressions | 8 327 | 5 714 | +45,7 % |
| CTR | 2,58 % | 2,89 % | -0,31 point |
| Position moyenne | 9,64 | 12,07 | amélioration de 2,43 positions |

Sur 90 jours, « agent ia madagascar » produit 34 impressions, 1 clic, un CTR de 2,94 % et une position moyenne de 4,91. La page `/services/developpeur-agent-ia-madagascar` capte l'essentiel du signal avec 34 impressions et une position moyenne de 5,74. D'autres URL apparaissent marginalement, signe d'une légère cannibalisation.

La situation plus récente de la page cible est moins confortable : 2 clics, 40 impressions, 5 % de CTR et une position moyenne de 16,5 toutes requêtes confondues sur 28 jours. Cela confirme la volatilité et l'absence de top 3 stable.

Les principaux marchés sur 90 jours sont Madagascar avec 303 clics, 4 983 impressions et une position moyenne de 4,98, puis la France avec 81 clics, 4 310 impressions et une position de 18,88. Le positionnement local est donc crédible ; l'enjeu est d'associer cette autorité au bon sujet.

### PostHog

Période disponible : 16 juillet au 8 septembre 2026.

Volume : 10 660 événements et 1 528 visiteurs.

| Signal | Total |
|---|---:|
| Clics CTA | 246 clics, 139 visiteurs |
| Clics WhatsApp | 18 clics, 15 visiteurs |
| Formulaires commencés | 11 |
| Formulaires réussis | 7 |
| Pages vues venant de Google | 862, pour 307 visiteurs |
| Pages vues directes | 1 018, pour 391 visiteurs |
| Référencement ChatGPT | 34 pages vues, 5 visiteurs |
| Référencement Perplexity | 8 pages vues, 3 visiteurs |
| Référencement Claude | 10 pages vues, 2 visiteurs |
| Référencement Gemini | 1 page vue, 1 visiteur |

La landing agent IA ne reçoit encore que 14 pages vues, 9 visiteurs et 13 sessions. Elle déclenche 2 CTA et 2 clics WhatsApp, mais aucun démarrage ni succès de formulaire. Le faible volume interdit toute conclusion statistique sur le taux de conversion ; il montre surtout que le premier problème est l'acquisition qualifiée.

Le connecteur PostHog disponible dans l'environnement pointe vers le projet 245256, tandis que le site Manda est configuré sur le projet 225420. Pour éviter de mélanger deux propriétés, les chiffres ci-dessus proviennent du script local authentifié du site. Il faut reconnecter le bon projet dans l'intégration avant le prochain audit.

### SerpApi

Paramètres reproductibles : Google, `google.mg`, pays MG, langue française, localisation Antananarivo, résultats non personnalisés. Le contrôle ponctuel et la moyenne GSC ne mesurent pas la même chose : SerpApi décrit le classement à l'instant du test ; GSC agrège les impressions réelles sur plusieurs dates, appareils et contextes.

| Requête | Position Manda observée | Résultats dominants / lecture |
|---|---:|---|
| agent ia madagascar | hors top 10 | TDI Digital, WData, offre LinkedIn. Les deux premiers utilisent l'expression exacte et une promesse locale immédiate. |
| agence ia madagascar | 6 | BPO MAD, WData, Here2be. Manda apparaît via un article, pas via une offre commerciale dédiée. |
| intelligence artificielle madagascar | hors top 10 | Intention large, dominée par médias, emploi et formation. Faible priorité transactionnelle. |
| consultant ia madagascar | hors top 10 | Résultats emploi et cabinets. Opportunité secondaire à traiter dans la landing principale. |
| développeur ia madagascar | 9 | Manda ressort via la page JavaScript, donc mauvaise allocation d'URL. |
| automatisation ia madagascar | hors top 10 | Here2be et TDI dominent. La page n8n doit porter ce cluster. |
| chatbot ia madagascar | hors top 10 | Intention ambiguë, résultats informationnels. À cibler par un cas d'usage, pas par une nouvelle page générique. |
| agent ia entreprise madagascar | 4 | L'article prix/cas d'usage ressort, derrière TDI, WData et Ezway. |

Google Trends via SerpApi n'a renvoyé aucune requête ou rubrique associée exploitable pour les cinq expressions locales testées. Le volume malgache est trop faible pour utiliser Trends comme arbitre. Les impressions GSC, les SERP réelles et la proximité avec l'intention commerciale sont ici plus fiables.

## Page-by-Page Audit

### Homepage

**Ce qui fonctionne**

L'identité visuelle est distinctive, la typographie crée une impression premium et la personnalité de Manda est claire. La page contient de nombreux signaux de confiance, des projets, une section méthode et des liens vers les expertises. Le H1 est unique et le balisage structuré est riche.

**Ce qui freine le positionnement**

Le H1 additionne sites, MVP SaaS et IA. Il décrit une grande amplitude d'exécution, mais ne choisit pas un problème propriétaire. Les six expertises mises en avant sur l'accueil dépendaient de l'ordre du fichier de données et excluaient la landing agent IA. Le visiteur et Google recevaient donc plus de signaux sur n8n, React et Supabase que sur la priorité commerciale actuelle.

**Correction appliquée**

La grille d'expertises sélectionne désormais explicitement la landing « Agent IA à Madagascar » en première position, puis les services qui la soutiennent. Le paragraphe d'approche contient aussi un lien contextuel descriptif vers cette page.

### `/services/developpeur-agent-ia-madagascar`

**Ce qui fonctionne**

La page est approfondie, lisible et structurée. Elle couvre les usages, l'architecture, la fiabilité, les garde-fous, le processus, une comparaison et une FAQ. Les schemas Service, ProfessionalService, Place, Breadcrumb et FAQ fournissent une bonne base AEO.

**Ce qui freinait le classement**

Le title et le H1 commençaient par « Développeur d'agents IA », alors que la requête et les leaders commencent par « Agent IA ». Les preuves existaient dans le portfolio mais n'étaient pas présentées au centre de la page. Une affirmation chiffrée sur un déficit de développeurs n'était pas sourcée. Le prix, visible dans les questions SERP, n'était pas traité assez directement.

**Corrections appliquées**

- Title SEO : `Agent IA Madagascar : développement sur mesure | Manda`.
- H1 : `Agent IA à Madagascar : développement sur mesure`.
- Introduction recentrée sur quatre résultats métier et la validation humaine.
- Ajout de trois réalisations internes documentées : TeamIA, agent d'opportunités internationales et Agent IA Facebook.
- Ajout d'une section et d'une FAQ prix qui renvoient vers le guide dédié.
- Suppression de l'affirmation non sourcée sur « 2 500 développeurs ».
- Ajout d'une date de mise à jour au 8 septembre 2026.

### Article `/blog/agent-ia-madagascar-prix-cas-usage`

**Ce qui fonctionne**

L'article couvre prix, cas d'usage, contraintes locales, étapes et FAQ. Il est déjà quatrième sur « agent ia entreprise madagascar » dans le contrôle SerpApi et constitue un bon support informationnel vers la landing commerciale.

**Ce qui freinait le cluster**

Son ancien titre commençait lui aussi par « Agent IA Madagascar », ce qui rapprochait excessivement son intention de celle de la landing. Plusieurs textes français sont écrits sans accents, ce qui dégrade la perception éditoriale même si ce n'est pas un problème UTF-8.

**Correction appliquée et dette restante**

Le titre et les métadonnées ciblent désormais d'abord l'intention prix : `Prix d'un agent IA à Madagascar : guide 2026`. La réaccentuation complète du corps doit être faite dans une passe éditoriale séparée avec relecture humaine, sans remplacer les formulations réelles que l'article cherche à expliquer.

### About

La photo, le parcours et le statut d'indépendant produisent un signal E-E-A-T utile. Le positionnement « Forward Deployed Engineer, Full Stack, Architecte IA » reste cependant plus large que la proposition agent IA locale. Le title de 79 caractères et la description de 186 caractères sont trop longs ; ce chantier est secondaire par rapport à la page commerciale, mais doit rejoindre la rationalisation globale des métadonnées.

### Navigation et footer

Le footer assure une excellente découvrabilité, mais sa densité dilue chaque lien. L'ancre agent IA est devenue « Agent IA Madagascar », tandis que la page d'accueil lui apporte un lien prioritaire. À terme, il faudra limiter le footer aux clusters commerciaux réellement stratégiques et déplacer le reste vers les hubs Services et Solutions.

## Deep Content & Blog Analysis

Le site possède beaucoup plus de contenu que ses concurrents directs, mais davantage de pages ne signifie pas automatiquement davantage d'autorité. Les clusters les plus rentables sont déjà visibles dans GSC : Mobile Money, développement React/Next.js, automatisation n8n et agents IA spécialisés.

Le risque principal est la création de pages proches pour chaque variante lexicale. Une seule URL doit posséder chaque intention :

| Intention | URL propriétaire | Rôle |
|---|---|---|
| agent IA Madagascar, développeur IA, consultant IA | `/services/developpeur-agent-ia-madagascar` | Landing commerciale principale |
| prix agent IA, coût, méthode, cas d'usage | `/blog/agent-ia-madagascar-prix-cas-usage` | Guide informationnel et soutien |
| automatisation IA, n8n Madagascar | `/services/automatisation-n8n-madagascar` | Offre automatisation |
| agent IA Facebook, Messenger | `/solutions/agent-ia-facebook` | Solution verticale |
| agent support client | `/solutions/agent-ia-support-client` | Solution verticale |
| agent de prospection | `/solutions/agent-ia-prospection` | Solution verticale |

La plus grande opportunité GSC immédiate n'est pas la requête exacte prioritaire mais « agent ia facebook » : 381 impressions, aucune visite et position moyenne 14,97. La page solution correspondante doit faire l'objet de la prochaine optimisation de snippet et de contenu. Les autres occasions mesurées sont `mobile money madagascar`, `mvola api`, `développeur freelance madagascar`, `développeur full stack madagascar`, `agence offshore madagascar`, `claude n8n`, `messenger ai agent`, `orange money api` et `tjm développeur madagascar`.

## Technical SEO

Le crawl a contrôlé les 168 URL du sitemap : zéro erreur HTTP, zéro title manquant, zéro meta description manquante, zéro canonical manquant, zéro problème de H1 et zéro page sans schema. Aucun duplicate title ou duplicate description exact n'a été trouvé.

Les points à corriger dans une passe globale sont 52 titles longs, 55 descriptions longues et 9 descriptions trop courtes. Cette dette n'empêche pas l'indexation, mais réduit le contrôle des snippets. Il faut la traiter par gabarit et par niveau de trafic plutôt qu'en réécrivant 116 URL sans priorité.

`robots.txt`, `sitemap.xml` et `llms.txt` répondent correctement. Les contenus essentiels sont présents dans le HTML et les données structurées. Le principal risque UX identifié dans la capture statique concerne les longues zones animées : certains contenus du blog peuvent sembler vides lorsque les animations de scroll ne se déclenchent pas. Une règle `prefers-reduced-motion` et un état visible par défaut doivent être testés.

## GEO / AEO Analysis

### Forces

- FAQ et réponses courtes directement extractibles.
- Schemas Service, FAQ, BlogPosting, Speakable, Person et ProfessionalService.
- Pages projets qui permettent de relier une affirmation à une réalisation.
- `llms.txt` disponible et crawl autorisé.
- Présence déjà mesurée de referrals ChatGPT, Perplexity, Claude et Gemini.

### Faiblesses

- Peu de corroboration externe et de citations indépendantes sur l'expertise de Manda.
- Cas clients parfois présentés comme architecture ou démonstrateur sans résultat chiffré vérifiable.
- Affirmations commerciales historiques non sourcées ; l'une d'elles a été retirée lors de cet audit.
- Entité locale moins visible que TDI Digital dans les résultats exacts et dans l'aperçu IA observé.

### Priorités GEO

Chaque cas d'usage important doit fournir une définition courte, les données d'entrée, les actions autorisées, les limites, le rôle humain, le résultat mesuré et une date. Les chiffres ne doivent être publiés que s'ils peuvent être reliés à une méthode ou à un client autorisant la publication. Une page « À propos / entité » cohérente avec les profils LinkedIn, GitHub, Malt et Google Business Profile renforcera la désambiguïsation.

## Keyword Strategy

### Priorité 1 : gagner la requête cible

| Mot-clé | Intention | URL | Décision |
|---|---|---|---|
| agent ia madagascar | commerciale | landing agent IA | Cible principale exacte |
| agent ia entreprise madagascar | commerciale / comparaison | landing + guide prix | Renforcer les cas d'usage entreprise |
| développeur ia madagascar | commerciale | landing agent IA | Consolider ici, pas sur la page JavaScript |
| consultant ia madagascar | commerciale | landing agent IA | Traiter comme variante secondaire |
| agence ia madagascar | commerciale | landing agent IA | Ajouter ensuite une comparaison indépendant/agence fondée sur le mode de livraison |

### Priorité 2 : exploiter les impressions existantes

1. `agent ia facebook` vers la page solution : plus fort réservoir d'impressions non converties.
2. `automatisation ia madagascar` et `claude n8n` vers les pages n8n correspondantes.
3. `mobile money madagascar`, `mvola api` et `orange money api` vers la solution Mobile Money, déjà la première page en clics.
4. `développeur freelance madagascar`, `développeur full stack madagascar` et `tjm développeur madagascar` vers les pages développeur et comparaison freelance/agence.

### Contenus latéraux à forte différenciation

1. Un calculateur public du coût et du ROI d'un agent IA relié à Facebook, WhatsApp, CRM et n8n, avec hypothèses modifiables.
2. Un benchmark public d'un agent support français/malgache avec jeu de test, taux de bonnes réponses, cas d'échec et coût par conversation.
3. Une démonstration interactive d'un pilote supervisé montrant le journal des décisions, les validations humaines et les limites d'action.

Ces trois actifs ont davantage de potentiel de liens et de citations IA qu'un nouvel article générique « qu'est-ce qu'un agent IA ».

## Action Matrix

| Impact | Effort | Action | Statut / délai |
|---|---|---|---|
| Très élevé | Faible | Recentrer title, H1, introduction et FAQ de la landing | Fait |
| Très élevé | Faible | Ajouter preuves projets et liens internes prioritaires | Fait |
| Élevé | Faible | Séparer l'intention commerciale de l'intention prix | Fait |
| Élevé | Faible | Retirer les affirmations non sourcées | Fait |
| Élevé | Moyen | Obtenir 3 à 5 mentions/liens éditoriaux malgaches pertinents | 30 à 90 jours |
| Élevé | Moyen | Publier un cas client agent IA avec méthode et résultats autorisés | 30 jours |
| Élevé | Moyen | Optimiser `/solutions/agent-ia-facebook` à partir des 381 impressions | Prochaine itération |
| Moyen | Faible | Reconnecter le projet PostHog 225420 dans le connecteur | Avant le prochain audit |
| Moyen | Moyen | Corriger les métadonnées longues par gabarit, pages GSC prioritaires d'abord | 30 jours |
| Moyen | Moyen | Réaccentuer et relire le corps français du guide prix | 14 jours |
| Moyen | Moyen | Tester les animations avec reduced motion et sans JavaScript | 14 jours |
| Moyen | Élevé | Construire le calculateur ou benchmark public | 30 à 60 jours |

## Measurement Plan

Le top 3 ne doit pas être évalué avant que Google ait recrawlé la page. Fenêtre minimale : 28 jours après déploiement, avec un point intermédiaire hebdomadaire.

1. Lancer `pnpm analytics:cross` pour la combinaison GSC/PostHog.
2. Lancer `pnpm analytics:serp -- --queries "agent ia madagascar,agent ia entreprise madagascar,agence ia madagascar,développeur ia madagascar,automatisation ia madagascar"` avec les mêmes paramètres Antananarivo.
3. Suivre dans GSC la page propriétaire et la requête exacte : impressions, clics, CTR, position, URL concurrentes.
4. Suivre dans PostHog les pages vues, scrolls profonds, CTA, WhatsApp, formulaires commencés et formulaires réussis de la landing.
5. Conserver une capture mensuelle des trois premiers résultats, de leurs titles, snippets, nouveaux liens et changements de contenu.

Seuils de succès à 28 jours : aucune autre URL Manda significativement positionnée sur la requête exacte, CTR supérieur à la base de 2,94 %, position moyenne GSC inférieure à 4, et présence top 5 reproductible dans SerpApi. Le top 3 devient alors l'objectif du cycle suivant, soutenu par l'autorité externe.

## Conclusion

La page n'était pas bloquée par un défaut technique majeur. Elle envoyait un signal commercial trop diffus et montrait ses preuves trop tard. Les corrections alignent maintenant la requête, la promesse, les réalisations et le maillage. Le prochain levier décisif n'est pas d'ajouter davantage de variantes du mot-clé : c'est de faire confirmer l'expertise par des sources et des résultats extérieurs au site.
