# Audit SEO, GEO et parcours produit - 12 aout 2026

## Perimetre et methode

Cet audit croise trois sources sans melanger leurs fenetres :

- Google Search Console, periode courante du 13 juillet au 9 aout 2026, comparee au 15 juin-12 juillet.
- Google Search Console sur 90 jours, du 12 mai au 9 aout 2026, pour les pages, pays, appareils et requetes.
- PostHog, du 16 juillet au 12 aout 2026, soit 4 086 evenements et 440 visiteurs.

Les donnees Search Console mesurent la visibilite dans Google. PostHog mesure les visites et actions effectivement observees sur le portfolio. Une impression n'est donc pas une visite et plusieurs evenements peuvent appartenir a une seule personne.

## Synthese

Le site progresse nettement : 168 clics Google contre 100 sur la periode precedente (+68 %) et 5 770 impressions contre 4 098 (+40,8 %). Le CTR passe de 2,44 % a 2,91 %. La position moyenne recule de 9,92 a 12,17, principalement parce que le domaine commence a apparaitre sur davantage de requetes et de pages encore situees hors du premier groupe de resultats.

Google est la premiere source qualifiee observee dans PostHog avec 355 pages vues et 123 visiteurs. Le direct suit avec 381 pages vues et 91 visiteurs. Les moteurs IA sont encore modestes mais reels : ChatGPT represente 16 pages vues et 2 visiteurs attribues sur la fenetre PostHog.

Le principal enjeu n'est plus de publier un grand nombre de pages. Il est de proteger les pages deja performantes, ameliorer le clic sur les requetes ou le site est visible, convertir les lecteurs des pages de service et renforcer l'autorite externe sur les sujets n8n, IA et SEO/GEO.

## Pages prioritaires

### A proteger et renforcer

- `/solutions/api-mobile-money-madagascar` : 71 clics, 1 093 impressions, position 5,7 sur 90 jours. C'est la meilleure page d'acquisition et la premiere page d'entree Google dans PostHog.
- `/services/developpeur-react-nextjs-madagascar` : 15 clics, 325 impressions, position 7,8. La page repond deja a une intention commerciale locale claire.
- `/services/forward-deployed-engineer` : 13 clics, 167 impressions, CTR 7,8 %, position 9,9. La lecture est bonne, mais aucun clic CTA n'etait attribue sur la fenetre analysee.
- `/projects/geo-seo-boost` : 7 clics, 91 impressions, CTR 7,7 %, position 9,2. Cette preuve doit rester reliee au service SEO/GEO.

### A optimiser pour le clic

- `/services/developpeur-nodejs-madagascar` : position 7,1 sur 181 impressions, mais CTR de 1,1 %. La requete `developpeur node js madagascar` atteint environ la position 3 sans clic sur 53 impressions. Le titre et la description doivent annoncer clairement freelance, backend et API.
- `/services/developpeur-nextjs-supabase-madagascar` : 75 impressions, position 6,4, aucun clic. Le snippet doit mettre en avant le livrable SaaS/MVP plutot qu'une simple liste de technologies.
- `/en/projects/paidmada-mobile-money` : forte visibilite US autour de MoneyGram et mobile wallet, mais CTR faible. Une partie des impressions est informationnelle ou mal alignee avec le produit ; il faut clarifier Madagascar Mobile Money dans le snippet.

### A enrichir ou repositionner

- `/projects/facebook-agen-ia` : 1 093 impressions, position 17, CTR 0,18 %. La demande existe autour de `agent ia facebook`, mais la page projet n'est pas encore une reponse assez complete. Elle doit rester une preuve et pousser vers la solution dediee.
- `/services/developpeur-javascript-madagascar` : 180 impressions, position 14,4. Les requetes couvrent fullstack, backend, frontend, freelance et TJM. La page doit organiser ces sous-intentions et distribuer vers React et Node.js.
- `/en/services/codex-n8n-developer` : 156 impressions, position 26,5 sur 90 jours. Une expansion seule ne suffira pas ; il faut aussi des mentions externes et une preuve publique autour de Codex et n8n.
- `/services/consultant-seo-geo` : la page convertit relativement bien une fois visitee, mais sa position moyenne reste faible. Le prochain levier est l'autorite externe et la publication de cas d'etude, pas une nouvelle page quasi identique.

## Marche international

Sur 90 jours, Madagascar genere 194 clics pour 2 536 impressions, avec un CTR de 7,65 % et une position moyenne de 5,21. La France produit 60 clics pour 3 017 impressions, CTR 1,99 %, position 17,31. Les Etats-Unis produisent 9 clics pour 1 800 impressions, CTR 0,5 %, position 12,63.

Le marche US est donc une opportunite de conversion et de message, pas une justification pour creer des dizaines de pages. Les recherches de tendances realisees sur n8n, AI automation et workflow automation font ressortir les angles `consultant`, `price`, `rate`, `company`, `business process automation` et `United States`. Les pages anglaises doivent repondre explicitement au mode d'engagement, au tarif, au chevauchement horaire, aux controles humains et aux preuves de production.

## Pourquoi les services principaux etaient maigres

Le probleme venait du modele de rendu. Les quatre services historiques utilisaient un gabarit court : icone, titre, description et CTA. Les pages locales plus recentes utilisaient un objet `landing` avec sections, fonctionnalites, FAQ, comparaisons et preuves. Cette difference etait technique, pas strategique.

Les services principaux ont maintenant un contenu structure autour des resultats, de la methode, de l'architecture, des limites, des FAQ et d'un lien vers la page specialisee la plus proche. Ils restent des pages piliers generalistes ; les pages locales conservent l'intention geographique et commerciale precise. Cette repartition limite la cannibalisation.

## Corrections appliquees

- Enrichissement bilingue des pages principales developpement web/SaaS, integration IA, automatisation n8n et scaling.
- FAQ structurees et maillage interne vers les offres specialisees.
- URL canonique explicite dans les donnees structurees `Service`.
- Ajout de l'URL et du contexte de langue aux evenements de formulaire PostHog pour attribuer les conversions a `/contact` ou `/en/contact`.
- CTA plus concret sur la page Forward Deployed Engineer : decrire le probleme metier plutot que demarrer un projet abstrait.
- Reconstruction de `llms.txt` avec des routes verifiees, des descriptions factuelles et les preuves externes n8n Creator/GitHub.
- Restauration statique des realisations autrefois chargees depuis Supabase afin de conserver les URLs indexees sans requete CMS a chaque visite.

## Plan suivant

1. Surveiller pendant 28 jours le CTR de Node.js, Next.js/Supabase et PaidMada EN apres reindexation.
2. Mesurer le funnel CTA contact vers formulaire avec les nouvelles proprietes `path` et `locale`.
3. Ajouter une preuve et un lien contextuel depuis le projet Facebook vers la solution Agent IA Facebook.
4. Publier des contenus externes utiles sur n8n Creator, GitHub et la communaute n8n pour gagner des mentions et liens sur les pages internationales.
5. Refaire ce croisement chaque semaine, mais ne modifier un snippet ou une page qu'apres un volume d'impressions suffisant.

## Limites

L'audit GEO technique verifie la lisibilite, les entites, les donnees structurees, les preuves et `llms.txt`. Il ne mesure pas un taux de recommandation multi-LLM complet, car aucune cle de fournisseur LLM compatible avec le scan de part de voix n'etait disponible dans l'environnement. La recommandation ChatGPT deja documentee reste une observation datee, pas un classement permanent.
