import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: {
      canonical: `${SITE_URL}${locale === "fr" ? "/contact" : "/en/contact"}`,
      languages: {
        fr: `${SITE_URL}/contact`,
        en: `${SITE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const contact = dict.contact;

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 gradient-text">
          {contact.title}
        </h1>
        <p className="text-xl text-slate-400 mb-16">
          {contact.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <GlassCard>
            <span className="material-symbols-outlined text-indigo-400 text-2xl mb-3 block">mail</span>
            <p className="text-sm text-slate-400 mb-1">{contact.email_label}</p>
            <a href={`mailto:${contact.info_email}`} className="text-white hover:text-indigo-400 transition-colors text-sm break-all">
              {contact.info_email}
            </a>
          </GlassCard>
          <GlassCard>
            <span className="material-symbols-outlined text-emerald-400 text-2xl mb-3 block">link</span>
            <p className="text-sm text-slate-400 mb-1">LinkedIn</p>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors text-sm">
              {locale === "fr" ? "Mon profil LinkedIn" : "My LinkedIn Profile"}
            </a>
          </GlassCard>
          <GlassCard>
            <span className="material-symbols-outlined text-blue-400 text-2xl mb-3 block">location_on</span>
            <p className="text-sm text-slate-400 mb-1">{locale === "fr" ? "Localisation" : "Location"}</p>
            <p className="text-white text-sm">{contact.info_location}</p>
          </GlassCard>
        </div>

        <GlassCard className="!p-8 md:!p-12">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                {contact.name_label}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                {contact.email_label}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                {contact.message_label}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
            >
              {contact.submit}
            </button>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
