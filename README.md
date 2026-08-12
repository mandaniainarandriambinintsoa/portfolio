# Manda — Portfolio

![Hero Preview](public/images/readme/hero-preview.png)

Portfolio personnel de **Mandaniaina Randriambinintsoa** — Architecte IA & Automatisation Builder, basé à Antananarivo, Madagascar.

## Stack technique

| Technologie | Rôle |
|-------------|------|
| **Next.js 16** | Framework React (App Router, SSG/ISR, Turbopack) |
| **Tailwind CSS v4** | Styling utility-first + Typography plugin |
| **GSAP 3** | Animations scroll-triggered, parallax, stagger |
| **Supabase** | Données dynamiques ciblées : formulaires, quiz et visiteurs |
| **Contenu local** | Pages, projets, services et articles versionnés dans Git |
| **PostHog** | Product analytics, parcours utilisateurs, heatmaps et session replays |
| **TypeScript** | Typage strict sur tout le projet |

## Fonctionnalites

- **10 sections homepage** : Hero, Command Center, Services, Process, Testimonials, Stats, Tech Stack, Projects (bento layout), FAQ, CTA Final
- **Blog statique** : Articles Markdown exportés dans `src/content/blog-posts.json`
- **Projets statiques** : Projets et services gérés dans les dictionnaires FR/EN
- **i18n FR/EN** : Francais par defaut (`/`), anglais secondaire (`/en/`)
- **SEO optimise** : JSON-LD (Person, FAQ, BlogPosting, BreadcrumbList), sitemap dynamique, meta tags OpenGraph
- **Product analytics** : PostHog optionnel pour comprendre les parcours, clics, conversions et abandons
- **SSG** : Pages publiques générées au build et servies depuis le CDN
- **Design** : Dark glassmorphism, animations fluides, responsive mobile-first

## Architecture

```
src/
  app/
    [locale]/          # Pages i18n (blog, projects, services, about, contact)
    api/               # Endpoints métier : contact, tracking, quiz, visiteurs
    sitemap.ts         # Sitemap généré depuis le contenu local
  components/
    animations/        # Wrappers GSAP (useGSAP + matchMedia)
    blog/              # BlogListingClient, MarkdownRenderer
    layout/            # Header, Footer, LanguageSwitcher
    sections/          # 10 sections homepage
    seo/               # JSON-LD components
    ui/                # GlassCard, Button, N8nWorkflowViewer
  lib/
    data/              # Lecteurs de contenu local et workflows
    supabase/          # Client serveur/browser, types auto-generes
  content/             # Snapshot local des articles publiés
  i18n/                # Config + dictionnaires FR/EN
legacy/
  payload-cms/         # Ancienne expérimentation CMS, exclue du build
```

## Demarrage rapide

```bash
# Installer les dependances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY et NEXT_PUBLIC_SITE_URL
# Optionnel : NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST
# Optionnel admin local : POSTHOG_PERSONAL_API_KEY, POSTHOG_PROJECT_ID

# Lancer en developpement
npm run dev

# Build production
npm run build
```

## Gestion du contenu

Le portfolio suit une approche content as code. Toute modification de page,
service, projet ou article passe par Git et déclenche un nouveau déploiement.
L'ancienne intégration Payload est conservée uniquement comme référence dans
`legacy/payload-cms` et n'est ni compilée ni exposée en production.

## Deploiement

Le site est deploye sur **Vercel** avec :
- Build automatique sur push `main`
- Variables d'environnement configurees dans le dashboard Vercel
- pages publiques pré-rendues et servies depuis le CDN

## Auteur

**Mandaniaina Randriambinintsoa**
- Architecte IA & Automatisation Builder
- Expert N8N, Claude Code, Next.js, Supabase
- Antananarivo, Madagascar

## License

Ce projet est sous licence MIT.
