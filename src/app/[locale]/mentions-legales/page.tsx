import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL, PERSONAL_INFO } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;

  const title = locale === "fr" ? "Mentions légales" : "Legal Notice";
  const description =
    locale === "fr"
      ? "Mentions légales du site manda-ia.com — informations sur l'éditeur et l'hébergeur."
      : "Legal notice for manda-ia.com — publisher and hosting information.";
  const path = locale === "fr" ? "/mentions-legales" : "/en/mentions-legales";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        fr: `${SITE_URL}/mentions-legales`,
        en: `${SITE_URL}/en/mentions-legales`,
      },
    },
  };
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const prefix = locale === "fr" ? "" : "/en";

  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: locale === "fr" ? "Mentions légales" : "Legal Notice", href: `${prefix}/mentions-legales` },
  ];

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <article className="max-w-3xl mx-auto prose prose-invert prose-slate">
        {locale === "fr" ? <MentionsFR /> : <MentionsEN />}
      </article>
    </main>
  );
}

function MentionsFR() {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter mb-8">
        <span className="gradient-text">Mentions légales</span>
      </h1>
      <p className="text-slate-400 text-sm mb-8">Dernière mise à jour : 27 mars 2026</p>

      <h2>1. Éditeur du site</h2>
      <p>
        <strong>Nom :</strong> {PERSONAL_INFO.name}
        <br /><strong>Statut :</strong> Développeur freelance (auto-entrepreneur)
        <br /><strong>Adresse :</strong> Antananarivo, Analamanga, Madagascar
        <br /><strong>Email :</strong> {PERSONAL_INFO.email}
        <br /><strong>Téléphone :</strong> {PERSONAL_INFO.phone}
        <br /><strong>Site web :</strong> https://manda-ia.com
      </p>

      <h2>2. Hébergement</h2>
      <p>
        <strong>Hébergeur :</strong> Vercel Inc.
        <br /><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
        <br /><strong>Site web :</strong> https://vercel.com
      </p>
      <p>
        <strong>Base de données :</strong> Supabase Inc.
        <br /><strong>Serveurs :</strong> EU (eu-central-1, Francfort, Allemagne)
        <br /><strong>Site web :</strong> https://supabase.com
      </p>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (textes, images, code, design) est la propriété
        de {PERSONAL_INFO.name}, sauf mention contraire. Toute reproduction, distribution ou
        utilisation sans autorisation préalable est interdite.
      </p>
      <p>
        Les marques, logos et noms de produits mentionnés sur ce site (Bubble, Webflow, N8N,
        Next.js, Supabase, etc.) appartiennent à leurs propriétaires respectifs.
      </p>

      <h2>4. Responsabilité</h2>
      <p>
        L'éditeur s'efforce de fournir des informations exactes et à jour sur ce site.
        Cependant, il ne peut garantir l'exactitude, la complétude ou l'actualité des informations
        diffusées. L'éditeur décline toute responsabilité pour les éventuelles erreurs ou omissions.
      </p>
      <p>
        Les liens vers des sites externes sont fournis à titre informatif. L'éditeur n'est pas
        responsable du contenu de ces sites tiers.
      </p>

      <h2>5. Données personnelles</h2>
      <p>
        Pour toute information relative à la collecte et au traitement des données personnelles,
        veuillez consulter notre <a href="/privacy" className="text-indigo-400 hover:text-indigo-300">politique de confidentialité</a>.
      </p>

      <h2>6. Droit applicable</h2>
      <p>
        Le présent site est soumis au droit malgache. Tout litige relatif à l'utilisation du site
        sera soumis à la compétence des tribunaux d'Antananarivo, Madagascar.
      </p>
    </>
  );
}

function MentionsEN() {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter mb-8">
        <span className="gradient-text">Legal Notice</span>
      </h1>
      <p className="text-slate-400 text-sm mb-8">Last updated: March 27, 2026</p>

      <h2>1. Site Publisher</h2>
      <p>
        <strong>Name:</strong> {PERSONAL_INFO.name}
        <br /><strong>Status:</strong> Freelance developer (sole proprietor)
        <br /><strong>Address:</strong> Antananarivo, Analamanga, Madagascar
        <br /><strong>Email:</strong> {PERSONAL_INFO.email}
        <br /><strong>Phone:</strong> {PERSONAL_INFO.phone}
        <br /><strong>Website:</strong> https://manda-ia.com
      </p>

      <h2>2. Hosting</h2>
      <p>
        <strong>Host:</strong> Vercel Inc.
        <br /><strong>Address:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
        <br /><strong>Website:</strong> https://vercel.com
      </p>
      <p>
        <strong>Database:</strong> Supabase Inc.
        <br /><strong>Servers:</strong> EU (eu-central-1, Frankfurt, Germany)
        <br /><strong>Website:</strong> https://supabase.com
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All content on this site (text, images, code, design) is the property
        of {PERSONAL_INFO.name}, unless otherwise stated. Any reproduction, distribution, or
        use without prior authorization is prohibited.
      </p>
      <p>
        Trademarks, logos, and product names mentioned on this site (Bubble, Webflow, N8N,
        Next.js, Supabase, etc.) belong to their respective owners.
      </p>

      <h2>4. Liability</h2>
      <p>
        The publisher strives to provide accurate and up-to-date information on this site.
        However, accuracy, completeness, or timeliness of the information cannot be guaranteed.
        The publisher disclaims any liability for errors or omissions.
      </p>
      <p>
        Links to external sites are provided for informational purposes. The publisher is not
        responsible for the content of third-party sites.
      </p>

      <h2>5. Personal Data</h2>
      <p>
        For information regarding the collection and processing of personal data,
        please see our <a href="/en/privacy" className="text-indigo-400 hover:text-indigo-300">privacy policy</a>.
      </p>

      <h2>6. Applicable Law</h2>
      <p>
        This site is governed by Malagasy law. Any dispute relating to the use of the site
        shall be subject to the jurisdiction of the courts of Antananarivo, Madagascar.
      </p>
    </>
  );
}
