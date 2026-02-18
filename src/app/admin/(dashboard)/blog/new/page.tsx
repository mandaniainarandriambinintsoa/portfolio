import BlogForm from "@/components/admin/BlogForm";
import Link from "next/link";

export default function AdminBlogNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← Blog
        </Link>
        <h1 className="text-2xl font-extrabold text-white">Nouvel article</h1>
      </div>
      <BlogForm />
    </div>
  );
}
