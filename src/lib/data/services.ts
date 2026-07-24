import { getStaticDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { ServiceItem } from "@/lib/types";
import {
  getPayloadServiceBySlug,
  getPayloadServices,
  getPayloadServiceSitemapEntries,
} from "./payload-content";

function withFallbackKeys(items: ServiceItem[]): ServiceItem[] {
  return items.map((item, index) => ({
    ...item,
    key: item.key ?? `service-${String(index + 1).padStart(2, "0")}`,
  }));
}

async function getDictionaryServices(locale: Locale): Promise<ServiceItem[]> {
  const dict = await getStaticDictionary(locale);
  return withFallbackKeys(dict.services.items as ServiceItem[]);
}

type PreviewReadOptions = {
  draft?: boolean;
};

export async function getServices(locale: Locale, options?: PreviewReadOptions): Promise<ServiceItem[]> {
  const payloadServices = await getPayloadServices(locale, options);
  if (payloadServices?.length) return withFallbackKeys(payloadServices);
  return getDictionaryServices(locale);
}

export async function getServiceBySlug(
  slug: string,
  locale: Locale,
  options?: PreviewReadOptions
): Promise<ServiceItem | null> {
  const payloadService = await getPayloadServiceBySlug(slug, locale, options);
  if (payloadService) return payloadService;

  const services = await getDictionaryServices(locale);
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getServiceByKey(
  key: string,
  locale: Locale
): Promise<ServiceItem | null> {
  const services = await getServices(locale);
  return services.find((service) => service.key === key) ?? null;
}

export async function getServiceStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of ["fr", "en"] as const) {
    const services = await getServices(locale);
    for (const service of services) {
      params.push({ locale, slug: service.slug });
    }
  }

  return params;
}

export async function getServiceSitemapPairs(): Promise<
  { frSlug: string; enSlug: string; updatedAt: string | null; createdAt: string | null }[]
> {
  const usePayload = process.env.PAYLOAD_SKIP_SITEMAP_CMS !== "true";
  const [frPayload, enPayload] = usePayload
    ? await Promise.all([
        getPayloadServiceSitemapEntries("fr"),
        getPayloadServiceSitemapEntries("en"),
      ])
    : [null, null];

  if (frPayload?.length && enPayload?.length) {
    const enByKey = new Map(enPayload.map((entry) => [entry.key, entry]));
    return frPayload
      .map((frEntry) => {
        const enEntry = enByKey.get(frEntry.key);
        if (!enEntry) return null;
        return {
          frSlug: frEntry.slug,
          enSlug: enEntry.slug,
          updatedAt: frEntry.updatedAt ?? enEntry.updatedAt,
          createdAt: frEntry.createdAt ?? enEntry.createdAt,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  }

  const [frServices, enServices] = await Promise.all([
    getDictionaryServices("fr"),
    getDictionaryServices("en"),
  ]);
  const count = Math.min(frServices.length, enServices.length);

  return Array.from({ length: count }, (_, index) => ({
    frSlug: frServices[index].slug,
    enSlug: enServices[index].slug,
    updatedAt: null,
    createdAt: null,
  }));
}
