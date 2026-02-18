import { i18n, type Locale } from "./config";

export function parseLocale(rawLocale: string): Locale {
  return i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
}
