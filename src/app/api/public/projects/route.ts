import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/admin/api-auth";
import { revalidateContent } from "@/lib/admin/revalidate";
import { getPayloadClient } from "@/lib/payload";

type ProjectBody = {
  slug?: string;
  title_fr?: string;
  title_en?: string;
  subtitle_fr?: string;
  subtitle_en?: string;
  description_fr?: string;
  description_en?: string;
  category?: string;
  tags?: string[];
  image?: string;
  link?: string | null;
  workflow_file?: string | null;
  featured?: boolean;
  sort_order?: number;
  published?: boolean;
};

function toPayloadProject(body: ProjectBody) {
  const published = body.published ?? true;

  return {
    slug: body.slug,
    title: { fr: body.title_fr, en: body.title_en },
    subtitle: { fr: body.subtitle_fr, en: body.subtitle_en },
    description: { fr: body.description_fr, en: body.description_en },
    category: body.category ?? "webapp",
    tags: (body.tags ?? []).map((label) => ({ label })),
    image: body.image,
    link: body.link ?? null,
    workflowFile: body.workflow_file ?? null,
    featured: body.featured ?? false,
    sortOrder: body.sort_order ?? 100,
    published,
    _status: published ? "published" : "draft",
  };
}

export async function POST(request: NextRequest) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as ProjectBody;
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: "slug is required" },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();
    const data = toPayloadProject(body);

    const existing = await payload.find({
      collection: "projects",
      limit: 1,
      where: { slug: { equals: slug } },
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "projects",
        data,
        id: existing.docs[0].id,
        locale: "all",
      } as never);

      revalidateContent("project", slug);
      return NextResponse.json({ action: "updated", slug });
    }

    await payload.create({
      collection: "projects",
      data,
      locale: "all",
    } as never);

    revalidateContent("project", slug);
    return NextResponse.json({ action: "created", slug }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
