import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import BlogForm from "@/components/admin/BlogForm";
import Link from "next/link";

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← Blog
        </Link>
        <h1 className="text-2xl font-extrabold text-white">
          Éditer : {post.title_fr}
        </h1>
      </div>
      <BlogForm initial={post} />
    </div>
  );
}
