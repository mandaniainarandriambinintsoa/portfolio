import type { PayloadRequest } from "payload";

type PreviewCollection = "projects" | "services";

type PreviewArgs = {
  collection: PreviewCollection;
  data?: {
    slug?: string | null;
  } | null;
  req?: PayloadRequest;
};

function getRequestOrigin(req?: PayloadRequest): string {
  const headers = req?.headers;
  const proto = headers?.get("x-forwarded-proto") ?? "http";
  const host = headers?.get("x-forwarded-host") ?? headers?.get("host");

  if (host) return `${proto}://${host}`;

  return process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3010";
}

function collectionPath(collection: PreviewCollection, slug: string, locale: string): string {
  const prefix = locale === "en" ? "/en" : "";
  return `${prefix}/${collection}/${slug}`;
}

export function generatePreviewURL({ collection, data, req }: PreviewArgs): string {
  const slug = data?.slug;
  const locale = req?.locale === "en" ? "en" : "fr";
  const origin = getRequestOrigin(req);

  if (!slug) return `${origin}/api/preview?path=${encodeURIComponent(locale === "en" ? "/en" : "/")}`;

  const path = collectionPath(collection, slug, locale);
  return `${origin}/api/preview?path=${encodeURIComponent(path)}`;
}
