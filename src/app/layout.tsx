import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Inlined Material Symbols @font-face (eliminates render-blocking request to fonts.googleapis.com)
// Subset: 40 icons via icon_names param — woff2 served from fonts.gstatic.com
const materialSymbolsFontFace = `@font-face{font-family:'Material Symbols Outlined';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/l/font?kit=kJF4BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZZLsYEpzC_1ver5Y0J1LlfqY9TzVIEO6LAILISxktAtLt378WP7NqkFPshezkPUW2kj9keDVeDOq7G-pegO02YiWtoQ96yTPjvxsQvHL2wBi3YuNj3Oe45YF3gSidBAdBStfF8QM35qYF5NNI&skey=b8dc2088854b122f&v=v316) format('woff2')}`;

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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: materialSymbolsFontFace }} />
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
