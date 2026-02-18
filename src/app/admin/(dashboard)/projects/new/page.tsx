import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";

export default function AdminProjectNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← Projets
        </Link>
        <h1 className="text-2xl font-extrabold text-white">Nouveau projet</h1>
      </div>
      <ProjectForm />
    </div>
  );
}
