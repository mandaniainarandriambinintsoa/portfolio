import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";

export default async function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← Projets
        </Link>
        <h1 className="text-2xl font-extrabold text-white">
          Éditer : {project.title_fr}
        </h1>
      </div>
      <ProjectForm initial={project} />
    </div>
  );
}
