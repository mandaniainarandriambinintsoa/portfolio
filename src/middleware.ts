import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n/config";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().substring(0, 2));
    for (const lang of preferred) {
      if (i18n.locales.includes(lang as typeof i18n.locales[number])) {
        return lang;
      }
    }
  }
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return;
  }

  // Check if locale is already in the pathname
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to default locale (FR) without adding /fr/ prefix
  // Only redirect /en/ paths explicitly
  const locale = getLocale(request);

  if (locale !== i18n.defaultLocale) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // For default locale (FR), rewrite internally to /fr/... without changing URL
  request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
