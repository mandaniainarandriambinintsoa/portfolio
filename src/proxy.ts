import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n/config";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isInternalDefaultLocaleRewrite =
    request.headers.get("x-manda-internal-default-locale") === "1";

  // Skip internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return;
  }

  // Admin routes — check auth session
  if (pathname.startsWith("/admin")) {
    return;
  }

  // Default locale must never be exposed with a prefix. FR is served at the root,
  // so /fr and /fr/* are duplicates → 308 redirect to the prefix-less version.
  if (
    !isInternalDefaultLocaleRewrite &&
    (pathname === `/${i18n.defaultLocale}` ||
      pathname.startsWith(`/${i18n.defaultLocale}/`))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${i18n.defaultLocale}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Public routes — EN has explicit /en/ prefix, FR is the default (no prefix).
  // No Accept-Language redirect: Google Search Central explicitly recommends NOT redirecting
  // based on Accept-Language (breaks crawling from Googlebot US which sends en-US and would
  // be redirected to /en/<fr-slug> that doesn't exist → 404). Users switch language via navbar.
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Default locale (FR): internal rewrite to /fr/... without changing the visible URL
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-manda-internal-default-locale", "1");

  const url = request.nextUrl.clone();
  url.pathname = `/${i18n.defaultLocale}${pathname}`;

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|api).*)",
  ],
};
