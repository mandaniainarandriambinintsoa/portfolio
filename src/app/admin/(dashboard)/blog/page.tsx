import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import BlogListClient from "./BlogListClient";

export default async function AdminBlogPage() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  const posts = data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-white">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
        >
          + Nouvel article
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
