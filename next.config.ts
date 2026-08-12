import type { NextConfig } from "next";

// Content Security Policy — whitelist only what the site actually loads
const cspDirectives = [
  // Scripts: self + GTM + N8n demo components
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.jsdelivr.net https://www.unpkg.com https://eu-assets.i.posthog.com https://us-assets.i.posthog.com",
  // Styles: self + inline (Next.js requires unsafe-inline for styles)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Images: self + Supabase storage + Google + flagcdn + data URIs (Next.js blur placeholders)
  "img-src 'self' data: blob: https://lbabmflmjcouniefxwmv.supabase.co https://lh3.googleusercontent.com https://flagcdn.com https://*.public.blob.vercel-storage.com",
  // Fonts: Inter plus any remaining self-hosted assets
  "font-src 'self' https://fonts.gstatic.com",
  // API calls: self + Supabase + Google Analytics + PostHog
  "connect-src 'self' https://lbabmflmjcouniefxwmv.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://eu.i.posthog.com https://us.i.posthog.com https://eu-assets.i.posthog.com https://us-assets.i.posthog.com https://*.public.blob.vercel-storage.com",
  "frame-src 'self'",
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
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  ...commonSecurityHeaders,
];

const frenchPublicRoutes = [
  "about",
  "blog",
  "contact",
  "mentions-legales",
  "privacy",
  "projects",
  "quiz",
  "services",
  "site-metier",
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
      "next/dist/build/polyfills/polyfill-module": "./src/lib/empty-polyfill.js",
    },
  },
  async redirects() {
    return [
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

export default nextConfig;
