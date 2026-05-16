import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import ContactForm from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  const prefix = locale === "fr" ? "" : "/en";

  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: {
      canonical: `${SITE_URL}${prefix}/contact`,
      languages: {
        fr: `${SITE_URL}/contact`,
        en: `${SITE_URL}/en/contact`,
        "x-default": `${SITE_URL}/contact`,
      },
    },
    openGraph: {
      title: dict.meta.contact.title,
      description: dict.meta.contact.description,
      url: `${SITE_URL}${prefix}/contact`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [{ url: `${SITE_URL}/images/manda-photo2.webp`, width: 288, height: 336, alt: "Manda - Contact" }],
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
          <ContactForm
            locale={locale}
            labels={{
              name_label: contact.name_label,
              email_label: contact.email_label,
              message_label: contact.message_label,
              submit: contact.submit,
              sending: contact.sending,
              success: contact.success,
              error: contact.error,
            }}
          />
        </GlassCard>
      </div>
    </main>
  );
}
