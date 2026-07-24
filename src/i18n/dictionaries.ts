import { cache } from "react";
import type { Locale } from "./config";
import { getPayloadSiteDictionary } from "@/lib/data/payload-content";

export type Dictionary = typeof import("./dictionaries/fr.json");

const dictionaries = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export const getDictionary = cache(async (locale: Locale): Promise<Dictionary> => {
  const payloadDictionary = await getPayloadSiteDictionary(locale);
  if (payloadDictionary) return payloadDictionary as Dictionary;

  return dictionaries[locale]();
});
