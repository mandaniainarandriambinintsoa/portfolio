import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultHomeLayout } from "@/lib/data/pages";
import { getProjects } from "@/lib/data/projects";
import HomeLayoutRenderer from "@/components/sections/HomeLayoutRenderer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const [dict, projects] = await Promise.all([
    getDictionary(locale),
    getProjects(locale),
  ]);

  return (
    <main id="main-content" className="relative min-h-screen">
      <HomeLayoutRenderer dict={dict} layout={defaultHomeLayout} locale={locale} projects={projects} />
    </main>
  );
}
