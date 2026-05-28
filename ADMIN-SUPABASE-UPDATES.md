# Modifs à appliquer dans `/admin` (Supabase)

> Les modifs dans `fr.json` / `en.json` ne servent qu'en **fallback** si Supabase n'a pas la donnée. Pour que les changements soient visibles en production, il faut aussi mettre à jour Supabase via le dashboard admin.

---

## 1. Project · ScalApp (`/admin/projects` → ScalApp)

### FR
- `subtitle_fr` → `Dashboard de gestion d'investissements · ScalApp France`

### EN
- `subtitle_en` → `Investment Management Dashboard · ScalApp France`

**Pourquoi** : "scalapp" arrive en pos 5.2 (top page 1) avec **0 clic / 10 impr/90j**. Le snippet actuel "Automated Venture Management" est trop générique. Ajouter "Investment Management Dashboard" + "ScalApp France" précise l'intent et confirme à l'utilisateur que c'est bien la page projet de l'agence française qu'il cherche.

---

## 2. Project · Alchiimy (`/admin/projects` → Alchiimy)

### FR
- `subtitle_fr` → `App de rencontre IA · Matching émotionnel & profils vérifiés`

### EN
- `subtitle_en` → `AI Dating App · Emotional Matching & Verified Profiles`

**Pourquoi** : la seule requête trackée est "advanced matching algorithm dating app" en pos 3.0. Le subtitle EN actuel "AI Dating App" est tronqué. Ajouter "Emotional Matching & Verified Profiles" colle pile à l'intent SEO.

---

## 3. Blog post · `claude-code-developper-avec-ia` (`/admin/blog`)

**Déjà documenté en détail dans** `BLOG-CLAUDE-CODE-N8N-UPDATE.md`. Rappel :
- Re-titrer `Claude Code + n8n : développer avec l'IA et automatiser (guide 2026)`
- Ajouter intro avec Claude Code + n8n + Prompt Engineer + Codex dans les 200 premiers mots
- Ajouter section `## FAQ` markdown en fin d'article (le composant `FaqJsonLdFromMarkdown` génère le schema auto)
- Idem côté EN

---

## Procédure

1. Aller sur `https://manda-ia.com/admin/projects`
2. Éditer ScalApp puis Alchiimy : ne changer **que** les champs `subtitle_fr` / `subtitle_en` ci-dessus
3. Sauvegarder, vérifier la page projet en prod (24h max)
4. Aller sur `https://manda-ia.com/admin/blog`, ouvrir l'article Claude Code, appliquer `BLOG-CLAUDE-CODE-N8N-UPDATE.md`
5. Après tout : `node scripts/submit-indexnow.js` pour notifier Bing/Yandex

---

*Préparé via `/geo keyword` — basé sur les requêtes GSC réelles 90j de `sc-domain:manda-ia.com`*
