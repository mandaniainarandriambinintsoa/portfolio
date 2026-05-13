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

  const title = locale === "fr" ? "Politique de confidentialité" : "Privacy Policy";
  const description =
    locale === "fr"
      ? "Politique de confidentialité du site manda-ia.com — collecte et traitement des données personnelles."
      : "Privacy policy for manda-ia.com — personal data collection and processing.";
  const path = locale === "fr" ? "/privacy" : "/en/privacy";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        fr: `${SITE_URL}/privacy`,
        en: `${SITE_URL}/en/privacy`,
        "x-default": `${SITE_URL}/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const prefix = locale === "fr" ? "" : "/en";

  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", href: locale === "fr" ? "/" : "/en" },
    { name: locale === "fr" ? "Politique de confidentialité" : "Privacy Policy", href: `${prefix}/privacy` },
  ];

  return (
    <main id="main-content" className="relative min-h-screen pt-32 pb-24 px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <article className="max-w-3xl mx-auto prose prose-invert prose-slate">
        {locale === "fr" ? <PrivacyFR /> : <PrivacyEN />}
      </article>
    </main>
  );
}

function PrivacyFR() {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter mb-8">
        <span className="gradient-text">Politique de confidentialité</span>
      </h1>
      <p className="text-slate-400 text-sm mb-8">Dernière mise à jour : 13 mai 2026</p>

      <h2>1. Responsable du traitement</h2>
      <p>
        {PERSONAL_INFO.name}, développeur freelance basé à {PERSONAL_INFO.location}.
        <br />Email : {PERSONAL_INFO.email}
        <br />Téléphone : {PERSONAL_INFO.phone}
      </p>

      <h2>2. Données collectées</h2>
      <h3>2.1 Données de navigation (Google Analytics 4)</h3>
      <p>
        Ce site utilise Google Analytics 4 (Measurement ID : G-2Q177TH3CR) pour analyser le trafic.
        GA4 collecte des données anonymisées : pages visitées, durée des sessions, type d'appareil,
        pays et ville d'origine (géolocalisation approximative basée sur l'adresse IP).
        L'adresse IP est anonymisée par Google avant stockage.
      </p>

      <h3>2.2 Showcase d'automatisation (visiteurs en temps réel)</h3>
      <p>
        La page d'accueil affiche un tableau de visiteurs en temps réel à des fins de démonstration technique.
        Les données affichées (ville, pays) proviennent de Google Analytics en temps réel et sont stockées
        dans notre base de données Supabase. L'adresse IP est conservée temporairement (1 heure maximum)
        pour permettre la déduplication des visites, puis supprimée automatiquement. Aucune adresse IP n'est
        affichée ni partagée avec des tiers, et aucun nom ou email n'est associé à ces données.
      </p>

      <h3>2.3 Formulaire de contact</h3>
      <p>
        Si vous nous contactez via le formulaire, nous collectons votre nom, email et message.
        Ces données sont utilisées uniquement pour répondre à votre demande.
      </p>

      <h3>2.4 Quiz</h3>
      <p>
        Le quiz de recommandation de service collecte vos réponses et votre email (si fourni).
        Ces données servent uniquement à vous envoyer des recommandations personnalisées.
      </p>

      <h2>3. Base légale du traitement</h2>
      <p>
        Le traitement des données repose sur votre consentement (article 6.1.a du RGPD) pour Google Analytics,
        et sur l'intérêt légitime (article 6.1.f) pour le fonctionnement du site et le traitement des demandes
        de contact.
      </p>

      <h2>4. Durée de conservation</h2>
      <ul>
        <li>Données Google Analytics : 14 mois (paramétrage GA4 par défaut)</li>
        <li>Données de contact : 12 mois après le dernier échange</li>
        <li>Données du quiz : 12 mois</li>
        <li>Logs visiteurs (showcase) : 30 jours</li>
      </ul>

      <h2>5. Partage des données</h2>
      <p>
        Vos données ne sont pas vendues ni partagées à des tiers, sauf :
      </p>
      <ul>
        <li>Google LLC (Google Analytics) — hébergé aux États-Unis, conforme au EU-US Data Privacy Framework</li>
        <li>Supabase Inc. (hébergement base de données) — serveurs EU (eu-central-1, Francfort)</li>
        <li>Vercel Inc. (hébergement du site) — réseau CDN mondial</li>
      </ul>

      <h2>6. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez des droits suivants :
      </p>
      <ul>
        <li>Droit d'accès à vos données personnelles</li>
        <li>Droit de rectification</li>
        <li>Droit à l'effacement ("droit à l'oubli")</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité des données</li>
        <li>Droit d'opposition</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à : {PERSONAL_INFO.email}
      </p>

      <h2>7. Cookies</h2>
      <p>
        Ce site utilise des cookies techniques nécessaires au fonctionnement et des cookies analytiques
        (Google Analytics). Google Tag Manager est chargé uniquement après interaction utilisateur
        (scroll, clic ou toucher) pour minimiser l'impact sur la performance.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        Le site est protégé par HTTPS avec HSTS (2 ans), Content Security Policy, et les headers de
        sécurité recommandés (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
      </p>
    </>
  );
}

function PrivacyEN() {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter mb-8">
        <span className="gradient-text">Privacy Policy</span>
      </h1>
      <p className="text-slate-400 text-sm mb-8">Last updated: May 13, 2026</p>

      <h2>1. Data Controller</h2>
      <p>
        {PERSONAL_INFO.name}, freelance developer based in {PERSONAL_INFO.location}.
        <br />Email: {PERSONAL_INFO.email}
        <br />Phone: {PERSONAL_INFO.phone}
      </p>

      <h2>2. Data Collected</h2>
      <h3>2.1 Navigation Data (Google Analytics 4)</h3>
      <p>
        This site uses Google Analytics 4 (Measurement ID: G-2Q177TH3CR) to analyze traffic.
        GA4 collects anonymized data: pages visited, session duration, device type,
        country and city of origin (approximate geolocation based on IP address).
        IP addresses are anonymized by Google before storage.
      </p>

      <h3>2.2 Automation Showcase (Real-time Visitors)</h3>
      <p>
        The homepage displays a real-time visitor table for technical demonstration purposes.
        The displayed data (city, country) comes from Google Analytics real-time data and is stored
        in our Supabase database. IP addresses are temporarily retained (1 hour maximum) for visit
        deduplication, then automatically deleted. No IP address is displayed or shared with third
        parties, and no name or email is associated with this data.
      </p>

      <h3>2.3 Contact Form</h3>
      <p>
        If you contact us via the form, we collect your name, email, and message.
        This data is used solely to respond to your inquiry.
      </p>

      <h3>2.4 Quiz</h3>
      <p>
        The service recommendation quiz collects your answers and email (if provided).
        This data is used only to send you personalized recommendations.
      </p>

      <h2>3. Legal Basis</h2>
      <p>
        Data processing is based on your consent (Article 6.1.a GDPR) for Google Analytics,
        and legitimate interest (Article 6.1.f) for site functionality and contact request handling.
      </p>

      <h2>4. Data Retention</h2>
      <ul>
        <li>Google Analytics data: 14 months (GA4 default setting)</li>
        <li>Contact data: 12 months after last exchange</li>
        <li>Quiz data: 12 months</li>
        <li>Visitor logs (showcase): 30 days</li>
      </ul>

      <h2>5. Data Sharing</h2>
      <p>
        Your data is not sold or shared with third parties, except:
      </p>
      <ul>
        <li>Google LLC (Google Analytics) — hosted in the US, compliant with EU-US Data Privacy Framework</li>
        <li>Supabase Inc. (database hosting) — EU servers (eu-central-1, Frankfurt)</li>
        <li>Vercel Inc. (website hosting) — global CDN network</li>
      </ul>

      <h2>6. Your Rights</h2>
      <p>Under GDPR, you have the following rights:</p>
      <ul>
        <li>Right of access to your personal data</li>
        <li>Right to rectification</li>
        <li>Right to erasure ("right to be forgotten")</li>
        <li>Right to restriction of processing</li>
        <li>Right to data portability</li>
        <li>Right to object</li>
      </ul>
      <p>To exercise these rights, contact us at: {PERSONAL_INFO.email}</p>

      <h2>7. Cookies</h2>
      <p>
        This site uses essential technical cookies and analytical cookies (Google Analytics).
        Google Tag Manager is loaded only after user interaction (scroll, click, or touch)
        to minimize performance impact.
      </p>

      <h2>8. Security</h2>
      <p>
        The site is protected by HTTPS with HSTS (2 years), Content Security Policy, and recommended
        security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
      </p>
    </>
  );
}
