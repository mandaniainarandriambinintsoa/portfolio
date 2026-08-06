import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Locale } from "./config";
import { getPayloadSiteDictionary } from "@/lib/data/payload-content";

export type Dictionary = typeof import("./dictionaries/fr.json");

const dictionaries = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getStaticDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

const getCachedDictionary = unstable_cache(async (locale: Locale): Promise<Dictionary> => {
  const payloadDictionary = await getPayloadSiteDictionary(locale);
  if (payloadDictionary) return payloadDictionary as Dictionary;

  return getStaticDictionary(locale);
}, ["payload-site-dictionary"], {
  revalidate: 300,
  tags: ["payload-site-content"],
});

export const getDictionary = cache(getCachedDictionary);
