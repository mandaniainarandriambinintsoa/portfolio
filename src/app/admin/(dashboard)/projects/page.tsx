import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import ProjectListClient from "./ProjectListClient";

export default async function AdminProjectsPage() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  const projects = data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-white">Projets</h1>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
        >
          + Nouveau projet
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <ProjectListClient projects={projects} />
      </div>
    </div>
  );
}
