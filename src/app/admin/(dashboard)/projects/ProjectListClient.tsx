"use client";

import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Database } from "@/lib/supabase/types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

const columns = [
  {
    key: "title",
    label: "Titre",
    sortable: true,
    render: (p: ProjectRow) => (
      <span className="font-medium text-white">{p.title_fr}</span>
    ),
  },
  {
    key: "slug",
    label: "Slug",
    render: (p: ProjectRow) => (
      <span className="font-mono text-xs text-slate-500">{p.slug}</span>
    ),
  },
  {
    key: "category",
    label: "Catégorie",
    sortable: true,
    render: (p: ProjectRow) => (
      <span className="px-2 py-0.5 bg-white/5 text-slate-300 rounded text-xs capitalize">
        {p.category}
      </span>
    ),
  },
  {
    key: "featured",
    label: "Featured",
    render: (p: ProjectRow) => (p.featured ? "⭐" : "—"),
  },
  {
    key: "status",
    label: "Status",
    render: (p: ProjectRow) => <StatusBadge published={p.published} />,
  },
  {
    key: "order",
    label: "Ordre",
    sortable: true,
    render: (p: ProjectRow) => String(p.sort_order),
  },
];

export default function ProjectListClient({
  projects,
}: {
  projects: ProjectRow[];
}) {
  return (
    <DataTable
      data={projects}
      columns={columns}
      getKey={(p) => p.id}
      editHref={(p) => `/admin/projects/${p.id}`}
    />
  );
}
