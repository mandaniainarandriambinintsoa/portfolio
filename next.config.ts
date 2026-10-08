import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

// Content Security Policy — whitelist only what the site actually loads
const cspDirectives = [
  // Scripts: self + GTM + N8n demo components
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://cdn.jsdelivr.net https://www.unpkg.com https://eu-assets.i.posthog.com https://us-assets.i.posthog.com https://challenges.cloudflare.com`,
  // Styles: self + inline (Next.js requires unsafe-inline for styles)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Images: self + Supabase storage + Google + flagcdn + data URIs (Next.js blur placeholders)
  "img-src 'self' data: blob: https://lbabmflmjcouniefxwmv.supabase.co https://lh3.googleusercontent.com https://flagcdn.com https://*.public.blob.vercel-storage.com",
  // Fonts: Inter plus any remaining self-hosted assets
  "font-src 'self' https://fonts.gstatic.com",
  // API calls: self + Supabase + Google Analytics + PostHog
  "connect-src 'self' https://lbabmflmjcouniefxwmv.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://eu.i.posthog.com https://us.i.posthog.com https://eu-assets.i.posthog.com https://us-assets.i.posthog.com https://*.public.blob.vercel-storage.com https://challenges.cloudflare.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  // Objects: none (no Flash/plugins)
  "object-src 'none'",
  // Base URI: self only (prevent base tag hijacking)
  "base-uri 'self'",
  // Form submissions: self only
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const commonSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  ...commonSecurityHeaders,
];

const frenchPublicRoutes = [
  "about",
  "blog",
  "contact",
  "labs",
  "mentions-legales",
  "privacy",
  "projects",
  "quiz",
  "services",
  "site-metier",
  "vibe-coding-developpeur",
  "solutions",
] as const;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lbabmflmjcouniefxwmv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      // Remove built-in polyfills (Array.at, Array.flat, Object.fromEntries, Object.hasOwn)
      // All target browsers (Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+) support these natively
      "../build/polyfills/polyfill-module": "./src/lib/empty-polyfill.js",
      "next/dist/build/polyfills/polyfill-module":
        "./src/lib/empty-polyfill.js",
    },
  },
  async redirects() {
    return [
      {
        source: "/en/services/developpeur-rag",
        destination: "/en/services/rag-developer",
        permanent: true,
      },
      {
        source: "/services/rag-developer",
        destination: "/services/developpeur-rag",
        permanent: true,
      },
      {
        source: "/en/services/developpeur-claude-code-n8n",
        destination: "/en/services/claude-code-n8n-developer",
        permanent: true,
      },
      {
        source: "/services/claude-code-n8n-developer",
        destination: "/services/developpeur-claude-code-n8n",
        permanent: true,
      },
      {
        source: "/en/services/developpeur-codex-n8n",
        destination: "/en/services/codex-n8n-developer",
        permanent: true,
      },
      {
        source: "/services/codex-n8n-developer",
        destination: "/services/developpeur-codex-n8n",
        permanent: true,
      },
      {
        source: "/en/services/developpeur-javascript-madagascar",
        destination: "/en/services/javascript-developer-madagascar",
        permanent: true,
      },
      {
        source: "/services/javascript-developer-madagascar",
        destination: "/services/developpeur-javascript-madagascar",
        permanent: true,
      },
      {
        source: "/en/services/developpeur-nodejs-madagascar",
        destination: "/en/services/hire-nodejs-developer-madagascar",
        permanent: true,
      },
      {
        source: "/services/hire-nodejs-developer-madagascar",
        destination: "/services/developpeur-nodejs-madagascar",
        permanent: true,
      },
      {
        source: "/en/services/developpeur-agent-ia-madagascar",
        destination: "/en/services/ai-agent-developer-madagascar",
        permanent: true,
      },
      {
        source: "/services/ai-agent-developer-madagascar",
        destination: "/services/developpeur-agent-ia-madagascar",
        permanent: true,
      },
      {
        source: "/en/services/freelance-vs-agence-offshore-madagascar",
        destination: "/en/services/freelance-vs-offshore-agency-madagascar",
        permanent: true,
      },
      {
        source: "/services/freelance-vs-offshore-agency-madagascar",
        destination: "/services/freelance-vs-agence-offshore-madagascar",
        permanent: true,
      },
      {
        source: "/en/services/developpeur-agent-vocal-ia",
        destination: "/en/services/ai-voice-agent-developer",
        permanent: true,
      },
      {
        source: "/services/ai-voice-agent-developer",
        destination: "/services/developpeur-agent-vocal-ia",
        permanent: true,
      },
      {
        source: "/en/services/audit-performance-site-web",
        destination: "/en/services/website-performance-optimization-service",
        permanent: true,
      },
      {
        source: "/services/website-performance-optimization-service",
        destination: "/services/audit-performance-site-web",
        permanent: true,
      },
      {
        source: "/en/services/consultant-seo-geo",
        destination: "/en/services/seo-geo-consultant",
        permanent: true,
      },
      {
        source: "/services/seo-geo-consultant",
        destination: "/services/consultant-seo-geo",
        permanent: true,
      },
      {
        source: "/en/services/developpement-sites-saas",
        destination: "/en/services/sites-saas-development",
        permanent: true,
      },
      {
        source: "/projects/veille-codeur-automatisation-n8n",
        destination: "/projects/international-opportunity-agent-n8n",
        permanent: true,
      },
      {
        source: "/en/projects/veille-codeur-automatisation-n8n",
        destination: "/en/projects/international-opportunity-agent-n8n",
        permanent: true,
      },
      {
        source: "/services/developpement-applications",
        destination: "/services/developpement-sites-saas",
        permanent: true,
      },
      {
        source: "/en/services/application-development",
        destination: "/en/services/sites-saas-development",
        permanent: true,
      },
      {
        source: "/en/projects/tracking-visiteurs",
        destination: "/en/projects/visitor-tracking",
        permanent: true,
      },
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "portfolio-manda-developpeur-nocode-madagascar.vercel.app",
          },
        ],
        destination: "https://manda-ia.com/:path*",
        permanent: true,
      },
      // Retired no-code/low-code landings — 301 to React/Next.js landing (closest topical match)
      {
        source: "/services/developpeur-no-code-madagascar",
        destination: "/services/developpeur-react-nextjs-madagascar",
        permanent: true,
      },
      {
        source: "/services/developpeur-low-code-madagascar",
        destination: "/services/developpeur-react-nextjs-madagascar",
        permanent: true,
      },
      {
        source: "/en/services/no-code-developer-madagascar",
        destination: "/en/services/hire-react-nextjs-developer-madagascar",
        permanent: true,
      },
      {
        source: "/en/services/low-code-developer-madagascar",
        destination: "/en/services/hire-react-nextjs-developer-madagascar",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/fr" },
        ...frenchPublicRoutes.flatMap((route) => [
          { source: `/${route}`, destination: `/fr/${route}` },
          { source: `/${route}/:path*`, destination: `/fr/${route}/:path*` },
        ]),
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withBotId(nextConfig);
