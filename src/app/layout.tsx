import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const materialSymbolsIcons = [
  "all_inclusive","api","arrow_forward","bolt","business","calendar_today",
  "chat","check_circle","code","code_off","deployed_code","description",
  "emoji_objects","home","hub","link","location_on","lock","mail",
  "north_east","payments","person","precision_manufacturing",
  "progress_activity","psychology","quiz","rocket_launch","savings",
  "schedule","search","smart_toy","speed","storage","support_agent",
  "target","terminal","timer","translate","trending_up","verified",
].join(",");

const materialSymbolsUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,400,0&icon_names=${materialSymbolsIcons}&display=swap`;

export const metadata = {
  verification: {
    google: "UbNg_cK0lvlfEnXfKtQaZfHEm_sCVWL6qDD8m5_eTLo",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href={materialSymbolsUrl} as="style" />
        {/* Non-render-blocking: loads as print then swaps to all */}
        <link
          rel="stylesheet"
          href={materialSymbolsUrl}
          media="print"
          // @ts-expect-error - string onLoad for SSR HTML
          onLoad="this.media='all'"
        />
      </head>
      <body className={`${inter.variable} font-[family-name:var(--font-inter)] antialiased`}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2Q177TH3CR"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-2Q177TH3CR');`}
        </Script>
      </body>
    </html>
  );
}
