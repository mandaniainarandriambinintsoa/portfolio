import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/admin/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidateContent } from "@/lib/admin/revalidate";

export async function POST(request: NextRequest) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: "slug is required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      // Update
      const { error } = await supabase
        .from("projects")
        .update(body)
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      revalidateContent("project", slug);
      return NextResponse.json({ action: "updated", slug });
    } else {
      // Create
      const { error } = await supabase.from("projects").insert(body);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      revalidateContent("project", slug);
      return NextResponse.json({ action: "created", slug }, { status: 201 });
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
