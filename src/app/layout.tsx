import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Self-hosted Material Symbols subset (56 icons, 7.8 kB woff2, weight 400 fixed).
// Regenerated 2026-06-24 to include solution page icons such as call, terminal, and travel_explore.
// Versioned URL prevents stale font cache from showing icon names as text.
const materialSymbolsFontFace = `@font-face{font-family:'Material Symbols Outlined';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/material-symbols-outlined.woff2?v=20260624) format('woff2')}`;

// GTM loaded on first user interaction only (scroll/click/touch)
// Keeps 455 kB + 100ms main thread out of initial load entirely
const gtmOnInteraction = `(function(){var d=!1;function l(){if(!d){d=!0;var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-2Q177TH3CR';s.async=!0;document.head.appendChild(s);s.onload=function(){window.dataLayer=window.dataLayer||[];function g(){dataLayer.push(arguments)}g('js',new Date());g('config','G-2Q177TH3CR')};['scroll','click','touchstart'].forEach(function(e){document.removeEventListener(e,l)})}}['scroll','click','touchstart'].forEach(function(e){document.addEventListener(e,l,{once:!0,passive:!0})})})();`;

// Sync <html lang> to /en/* pages client-side. Google doesn't use lang attribute
// for language detection (uses content + hreflang), so this is purely for screen readers.
// Keeping it client-side lets all routes prerender statically.
const setLangOnEn = `if(location.pathname.startsWith('/en'))document.documentElement.lang='en';`;

export const metadata = {
  verification: {
    google: "UbNg_cK0lvlfEnXfKtQaZfHEm_sCVWL6qDD8m5_eTLo",
    other: {
      "msvalidate.01": "21787C74B7616AA2F8C612EE18AFFFC0",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Low priority preload - prevents CLS from icon swap without competing with critical resources */}
        <link rel="preload" href="/fonts/material-symbols-outlined.woff2?v=20260624" as="font" type="font/woff2" crossOrigin="anonymous" fetchPriority="low" />
        <style dangerouslySetInnerHTML={{ __html: materialSymbolsFontFace }} />
        <script dangerouslySetInnerHTML={{ __html: setLangOnEn }} />
      </head>
      <body className={`${inter.variable} font-[family-name:var(--font-inter)] antialiased`}>
        {children}
        <script dangerouslySetInnerHTML={{ __html: gtmOnInteraction }} />
      </body>
    </html>
  );
}
