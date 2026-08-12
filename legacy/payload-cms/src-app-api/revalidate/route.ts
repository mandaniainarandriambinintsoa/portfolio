import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { revalidateContent } from "@/lib/admin/revalidate";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, slug } = body as { type?: string; slug?: string };

    if (
      type === "blog" ||
      type === "page" ||
      type === "project" ||
      type === "service"
    ) {
      revalidateContent(type, slug);
    } else {
      revalidatePath("/", "layout");
      revalidatePath("/sitemap.xml");
    }

    return NextResponse.json({ revalidated: true, type, slug });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
