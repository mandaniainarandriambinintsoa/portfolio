import type { NextConfig } from "next";

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
};

export default nextConfig;
