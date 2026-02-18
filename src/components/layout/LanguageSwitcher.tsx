"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/i18n/config";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  function getTargetPath() {
    if (locale === "fr") {
      // Currently FR → switch to EN
      // If path is "/" or "/fr", go to "/en"
      // If path is "/something", go to "/en/something"
      const cleanPath = pathname === "/" ? "" : pathname;
      return `/en${cleanPath}`;
    } else {
      // Currently EN → switch to FR
      // Remove /en prefix
      const cleanPath = pathname.replace(/^\/en/, "") || "/";
      return cleanPath;
    }
  }

  const targetLocale = locale === "fr" ? "en" : "fr";

  return (
    <Link
      href={getTargetPath()}
      className="px-3 py-1.5 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-white border border-white/10 rounded-full transition-colors"
      aria-label={`Switch to ${targetLocale === "fr" ? "French" : "English"}`}
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}
