import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/admin/api-auth";
import { revalidateContent } from "@/lib/admin/revalidate";
import { getPayloadClient } from "@/lib/payload";

type BlogBody = {
  slug?: string;
  title_fr?: string;
  title_en?: string;
  excerpt_fr?: string;
  excerpt_en?: string;
  content_fr?: string;
  content_en?: string;
  seo_title_fr?: string | null;
  seo_title_en?: string | null;
  seo_description_fr?: string | null;
  seo_description_en?: string | null;
  cover_image?: string | null;
  tags?: string[];
  author?: string;
  reading_time?: number;
  published_at?: string | null;
  published?: boolean;
};

function toPayloadPost(body: BlogBody) {
  const published = body.published ?? true;

  return {
    slug: body.slug,
    title: { fr: body.title_fr, en: body.title_en },
    excerpt: { fr: body.excerpt_fr, en: body.excerpt_en },
    content: { fr: body.content_fr, en: body.content_en },
    seoTitle: { fr: body.seo_title_fr, en: body.seo_title_en },
    seoDescription: { fr: body.seo_description_fr, en: body.seo_description_en },
    coverImage: body.cover_image ?? null,
    tags: (body.tags ?? []).map((label) => ({ label })),
    author: body.author ?? "Mandaniaina Randriambinintsoa",
    readingTime: body.reading_time ?? 5,
    publishedAt: body.published_at ?? new Date().toISOString(),
    published,
    _status: published ? "published" : "draft",
  };
}

export async function POST(request: NextRequest) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as BlogBody;
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: "slug is required" },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();
    const data = toPayloadPost(body);

    const existing = await payload.find({
      collection: "posts",
      limit: 1,
      where: { slug: { equals: slug } },
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "posts",
        data,
        id: existing.docs[0].id,
        locale: "all",
      } as never);

      revalidateContent("blog", slug);
      return NextResponse.json({ action: "updated", slug });
    }

    await payload.create({
      collection: "posts",
      data,
      locale: "all",
    } as never);

    revalidateContent("blog", slug);
    return NextResponse.json({ action: "created", slug }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
