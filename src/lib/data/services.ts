import { getStaticDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { ServiceItem } from "@/lib/types";
import remoteN8nConsultant from "./services/remote-n8n-consultant.json";

function withFallbackKeys(items: ServiceItem[]): ServiceItem[] {
  return items.map((item) => ({
    ...item,
    key: item.key ?? item.slug,
  }));
}

async function getDictionaryServices(locale: Locale): Promise<ServiceItem[]> {
  const dict = await getStaticDictionary(locale);
  return withFallbackKeys([
    ...(dict.services.items as ServiceItem[]),
    remoteN8nConsultant[locale] as ServiceItem,
  ]);
}

export async function getServices(locale: Locale): Promise<ServiceItem[]> {
  return getDictionaryServices(locale);
}

export async function getServiceBySlug(
  slug: string,
  locale: Locale,
): Promise<ServiceItem | null> {
  const services = await getDictionaryServices(locale);
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getServiceByKey(
  key: string,
  locale: Locale,
): Promise<ServiceItem | null> {
  const services = await getDictionaryServices(locale);
  return services.find((item) => item.key === key) ?? null;
}

export async function getServiceStaticParams(): Promise<
  { locale: string; slug: string }[]
> {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of ["fr", "en"] as const) {
    const services = await getDictionaryServices(locale);
    for (const service of services) params.push({ locale, slug: service.slug });
  }

  return params;
}

export async function getServiceSitemapPairs(): Promise<
  {
    frSlug: string;
    enSlug: string;
    updatedAt: string | null;
    createdAt: string | null;
  }[]
> {
  const [frServices, enServices] = await Promise.all([
    getDictionaryServices("fr"),
    getDictionaryServices("en"),
  ]);
  return frServices.map((fr) => {
    const en = enServices.find((service) => service.key === fr.key);
    if (!en) throw new Error(`Missing service translation: ${fr.key}`);
    return {
      frSlug: fr.slug,
      enSlug: en.slug,
      updatedAt: fr.updatedAt ?? en.updatedAt ?? null,
      createdAt: fr.createdAt ?? en.createdAt ?? null,
    };
  });
}
