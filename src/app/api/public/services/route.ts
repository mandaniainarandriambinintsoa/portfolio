import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/admin/api-auth";
import { revalidateContent } from "@/lib/admin/revalidate";
import { getPayloadClient } from "@/lib/payload";

type ServiceBody = {
  key?: string;
  slug_fr?: string;
  slug_en?: string;
  icon?: string;
  color?: string;
  title_fr?: string;
  title_en?: string;
  description_fr?: string;
  description_en?: string;
  card_title_fr?: string;
  card_title_en?: string;
  card_description_fr?: string;
  card_description_en?: string;
  seo_title_fr?: string;
  seo_title_en?: string;
  seo_description_fr?: string;
  seo_description_en?: string;
  landing_fr?: unknown;
  landing_en?: unknown;
  is_landing?: boolean;
  sort_order?: number;
  published?: boolean;
};

function toPayloadService(body: ServiceBody, locale: "fr" | "en") {
  const published = body.published ?? true;
  const isFrench = locale === "fr";

  return {
    key: body.key,
    slug: isFrench ? body.slug_fr : body.slug_en,
    icon: body.icon ?? "code_blocks",
    color: body.color ?? "indigo",
    title: isFrench ? body.title_fr : body.title_en,
    description: isFrench ? body.description_fr : body.description_en,
    cardTitle: isFrench ? body.card_title_fr : body.card_title_en,
    cardDescription: isFrench
      ? body.card_description_fr
      : body.card_description_en,
    seoTitle: isFrench ? body.seo_title_fr : body.seo_title_en,
    seoDescription: isFrench
      ? body.seo_description_fr
      : body.seo_description_en,
    landing: isFrench ? body.landing_fr : body.landing_en,
    isLanding: body.is_landing ?? true,
    sortOrder: body.sort_order ?? 100,
    published,
    _status: published ? "published" : "draft",
  };
}

export async function POST(request: NextRequest) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as ServiceBody;
    if (!body.key || !body.slug_fr || !body.slug_en) {
      return NextResponse.json(
        { error: "key, slug_fr and slug_en are required" },
        { status: 400 },
      );
    }

    const payload = await getPayloadClient();
    const existing = await payload.find({
      collection: "services",
      limit: 1,
      where: { key: { equals: body.key } },
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "services",
        data: toPayloadService(body, "fr"),
        id: existing.docs[0].id,
        locale: "fr",
      } as never);
      await payload.update({
        collection: "services",
        data: toPayloadService(body, "en"),
        id: existing.docs[0].id,
        locale: "en",
      } as never);

      revalidateContent("service", body.slug_fr);
      revalidateContent("service", body.slug_en);
      return NextResponse.json({ action: "updated", key: body.key });
    }

    const created = await payload.create({
      collection: "services",
      data: toPayloadService(body, "fr"),
      locale: "fr",
    } as never);
    await payload.update({
      collection: "services",
      data: toPayloadService(body, "en"),
      id: created.id,
      locale: "en",
    } as never);

    revalidateContent("service", body.slug_fr);
    revalidateContent("service", body.slug_en);
    return NextResponse.json(
      { action: "created", key: body.key },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
