import { createServerClient } from "@/lib/supabase/server";
import StatsCard from "@/components/admin/StatsCard";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createServerClient();

  const [blogResult, projectsResult] = await Promise.all([
    supabase.from("blog_posts").select("id, title_fr, slug, published, updated_at"),
    supabase.from("projects").select("id, title_fr, slug, published"),
  ]);

  const blogs = blogResult.data ?? [];
  const projects = projectsResult.data ?? [];

  const publishedBlogs = blogs.filter((b) => b.published).length;
  const draftBlogs = blogs.filter((b) => !b.published).length;
  const publishedProjects = projects.filter((p) => p.published).length;

  const recentBlogs = [...blogs]
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-extrabold text-white">Vue d&apos;ensemble</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Articles blog" value={blogs.length} icon="📝" />
        <StatsCard label="Publiés" value={publishedBlogs} icon="✅" />
        <StatsCard label="Brouillons" value={draftBlogs} icon="📋" />
        <StatsCard label="Projets" value={publishedProjects} icon="🚀" />
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Derniers articles modifiés
          </h2>
          <Link
            href="/admin/blog"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Voir tout →
          </Link>
        </div>

        {recentBlogs.length === 0 ? (
          <p className="text-slate-400 text-sm">Aucun article pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {recentBlogs.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog/${post.id}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      post.published ? "bg-green-400" : "bg-amber-400"
                    }`}
                  />
                  <span className="text-sm text-slate-200 group-hover:text-white transition-colors">
                    {post.title_fr}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(post.updated_at).toLocaleDateString("fr-FR")}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
