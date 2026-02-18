import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, slug } = body as { type?: string; slug?: string };

    if (type === "blog" && slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/en/blog/${slug}`);
      revalidatePath("/blog");
      revalidatePath("/en/blog");
    } else if (type === "project" && slug) {
      revalidatePath(`/projects/${slug}`);
      revalidatePath(`/en/projects/${slug}`);
      revalidatePath("/projects");
      revalidatePath("/en/projects");
      revalidatePath("/");
      revalidatePath("/en");
    } else if (type === "blog") {
      revalidatePath("/blog");
      revalidatePath("/en/blog");
    } else if (type === "project") {
      revalidatePath("/projects");
      revalidatePath("/en/projects");
      revalidatePath("/");
      revalidatePath("/en");
    } else {
      // Revalidate everything
      revalidatePath("/", "layout");
    }

    // Always revalidate sitemap
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ revalidated: true, type, slug });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
