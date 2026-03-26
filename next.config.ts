import type { NextConfig } from "next";

// Content Security Policy — whitelist only what the site actually loads
const cspDirectives = [
  // Scripts: self + GTM + N8n demo components
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.jsdelivr.net https://www.unpkg.com",
  // Styles: self + inline (Next.js requires unsafe-inline for styles)
  "style-src 'self' 'unsafe-inline'",
  // Images: self + Supabase storage + Google + flagcdn + data URIs (Next.js blur placeholders)
  "img-src 'self' data: blob: https://lbabmflmjcouniefxwmv.supabase.co https://lh3.googleusercontent.com https://flagcdn.com",
  // Fonts: self only (Material Symbols + Inter are self-hosted)
  "font-src 'self'",
  // API calls: self + Supabase + Google Analytics
  "connect-src 'self' https://lbabmflmjcouniefxwmv.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  // Frames: none (prevent clickjacking)
  "frame-src 'none'",
  // Objects: none (no Flash/plugins)
  "object-src 'none'",
  // Base URI: self only (prevent base tag hijacking)
  "base-uri 'self'",
  // Form submissions: self only
  "form-action 'self'",
  // Frame ancestors: none (prevent embedding — clickjacking protection)
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

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
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
