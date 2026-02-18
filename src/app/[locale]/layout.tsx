import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SetHtmlLang from "@/components/layout/SetHtmlLang";
import PersonJsonLd from "@/components/seo/PersonJsonLd";
import WebSiteJsonLd from "@/components/seo/WebSiteJsonLd";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: {
      default: dict.meta.home.title,
      template: `%s | Manda`,
    },
    description: dict.meta.home.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: locale === "fr" ? SITE_URL : `${SITE_URL}/en`,
      languages: {
        fr: SITE_URL,
        en: `${SITE_URL}/en`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: locale === "fr" ? SITE_URL : `${SITE_URL}/en`,
      siteName: "Manda",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <a href="#main-content" className="skip-to-content">
        {locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <PersonJsonLd />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <div className="mesh-gradient-bg" aria-hidden="true" />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} copyright={dict.footer.copyright} />
    </>
  );
}
