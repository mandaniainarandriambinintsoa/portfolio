import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
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

  // Admin routes — check auth session
  if (pathname.startsWith("/admin")) {
    const { user, supabaseResponse } = await updateSession(request);

    // Allow access to login page without auth
    if (pathname === "/admin/login") {
      if (user) {
        // Already logged in, redirect to dashboard
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
      return supabaseResponse;
    }

    // All other /admin routes require auth
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
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
  request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|api).*)",
  ],
};
