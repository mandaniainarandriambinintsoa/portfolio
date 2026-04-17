import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import QuizClient from "@/components/quiz/QuizClient";

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

  const path = locale === "fr" ? "/quiz" : "/en/quiz";
  return {
    title: dict.meta.quiz.title,
    description: dict.meta.quiz.description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        fr: `${SITE_URL}/quiz`,
        en: `${SITE_URL}/en/quiz`,
        "x-default": `${SITE_URL}/quiz`,
      },
    },
    openGraph: {
      title: dict.meta.quiz.title,
      description: dict.meta.quiz.description,
      url: `${SITE_URL}${path}`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: "Quiz", href: locale === "fr" ? "/quiz" : "/en/quiz" },
  ];

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <QuizClient dict={dict.quiz} locale={locale} />
    </main>
  );
}
