export const i18n = {
  defaultLocale: "fr",
  locales: ["fr", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

// SITE_URL centralisé dans src/lib/constants.ts
