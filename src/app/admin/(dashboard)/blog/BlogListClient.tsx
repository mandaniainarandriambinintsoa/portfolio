"use client";

import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Database } from "@/lib/supabase/types";

type BlogRow = Database["public"]["Tables"]["blog_posts"]["Row"];

const columns = [
  {
    key: "title",
    label: "Titre",
    sortable: true,
    render: (post: BlogRow) => (
      <span className="font-medium text-white">{post.title_fr}</span>
    ),
  },
  {
    key: "slug",
    label: "Slug",
    render: (post: BlogRow) => (
      <span className="font-mono text-xs text-slate-500">{post.slug}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (post: BlogRow) => <StatusBadge published={post.published} />,
  },
  {
    key: "tags",
    label: "Tags",
    render: (post: BlogRow) => (
      <div className="flex flex-wrap gap-1">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-indigo-600/10 text-indigo-300 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    key: "date",
    label: "Modifié",
    sortable: true,
    render: (post: BlogRow) =>
      new Date(post.updated_at).toLocaleDateString("fr-FR"),
  },
];

export default function BlogListClient({ posts }: { posts: BlogRow[] }) {
  return (
    <DataTable
      data={posts}
      columns={columns}
      getKey={(post) => post.id}
      editHref={(post) => `/admin/blog/${post.id}`}
    />
  );
}
