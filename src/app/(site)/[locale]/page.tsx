import { draftMode } from "next/headers";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultHomeLayout, getPageBySlug } from "@/lib/data/pages";
import { getProjects } from "@/lib/data/projects";
import HomeLayoutRenderer from "@/components/sections/HomeLayoutRenderer";
import RefreshRouteOnSave from "@/components/preview/RefreshRouteOnSave";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const { isEnabled: isDraftMode } = await draftMode();
  const [dict, projects, page] = await Promise.all([
    getDictionary(locale),
    getProjects(locale),
    getPageBySlug("home", locale, { draft: isDraftMode }),
  ]);
  const layout = page?.layout?.length ? page.layout : defaultHomeLayout;

  return (
    <main id="main-content" className="relative min-h-screen">
      {isDraftMode && <RefreshRouteOnSave />}
      <HomeLayoutRenderer dict={dict} layout={layout} locale={locale} projects={projects} />
    </main>
  );
}
