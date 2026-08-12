import { cache } from "react";
import type { Locale } from "./config";

export type Dictionary = typeof import("./dictionaries/fr.json");

const dictionaries = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getStaticDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export const getDictionary = cache(getStaticDictionary);
