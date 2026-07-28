import type { Metadata } from "next";
import Image from "next/image";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import IconScoutIcon from "@/components/icons/IconScoutIcon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  const path = locale === "fr" ? "/about" : "/en/about";
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        fr: `${SITE_URL}/about`,
        en: `${SITE_URL}/en/about`,
        "x-default": `${SITE_URL}/about`,
      },
    },
    openGraph: {
      title: dict.meta.about.title,
      description: dict.meta.about.description,
      url: `${SITE_URL}${path}`,
      type: "profile",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [{ url: `${SITE_URL}/images/manda-photo2.webp`, width: 288, height: 336, alt: "Mandaniaina Randriambinintsoa" }],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const about = dict.about;

  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: about.title, href: locale === "fr" ? "/about" : "/en/about" },
  ];

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 gradient-text">
          {about.title}
        </h1>
        <p className="text-xl text-indigo-400 font-medium mb-12">
          {about.subtitle}
        </p>

        {/* Bio + Photo */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-6">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Image
                src="/images/manda-photo2.webp"
                alt="Mandaniaina Randriambinintsoa - Architecte IA & Automatisation Builder"
                width={288}
                height={336}
                className="rounded-2xl object-cover border border-white/10"
                priority
              />
            </div>
            <div className="flex-1">
              <p className="text-lg text-slate-300 leading-relaxed">
                {about.bio}
              </p>
            </div>
          </div>
          <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-slate-400 mb-8">
            &ldquo;{about.philosophy}&rdquo;
          </blockquote>

          <h3 className="text-xl font-bold mb-4 text-white">{about.approach_title}</h3>
          <ul className="space-y-3 mb-8">
            {about.approach_items.map((item: string) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <IconScoutIcon
                  name="check"
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-slate-300 leading-relaxed mb-4">
            {about.experience}
          </p>
          <p className="text-indigo-400 font-semibold">{about.cta}</p>
        </div>

        {/* Timeline */}
        <h2 className="text-3xl font-bold mb-8">
          {locale === "fr" ? "Parcours" : "Career Path"}
        </h2>
        <div className="space-y-8">
          {[...about.timeline].reverse().map((item: { period: string; title: string; company: string; description: string }) => (
            <div key={item.period} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                <div className="w-0.5 flex-1 bg-white/10" />
              </div>
              <div className="pb-8">
                <p className="text-sm text-indigo-400 font-bold mb-1">{item.period}</p>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-2">{item.company}</p>
                <p className="text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
