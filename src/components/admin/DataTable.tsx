"use client";

import { useState } from "react";
import Link from "next/link";

type Column<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  sortable?: boolean;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  getKey: (item: T) => string;
  editHref: (item: T) => string;
  pageSize?: number;
};

export default function DataTable<T>({
  data,
  columns,
  getKey,
  editHref,
  pageSize = 10,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  let sorted = [...data];
  if (sortKey) {
    const col = columns.find((c) => c.key === sortKey);
    if (col) {
      sorted.sort((a, b) => {
        const va = String(col.render(a) ?? "");
        const vb = String(col.render(b) ?? "");
        return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }
  }

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider ${
                    col.sortable ? "cursor-pointer hover:text-white select-none" : ""
                  }`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1">{sortAsc ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
              <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.map((item) => (
              <tr
                key={getKey(item)}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-300">
                    {col.render(item)}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <Link
                    href={editHref(item)}
                    className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                  >
                    Éditer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4">
          <span className="text-xs text-slate-500">
            {sorted.length} élément{sorted.length > 1 ? "s" : ""}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white disabled:opacity-40 transition-all cursor-pointer"
            >
              ←
            </button>
            <span className="px-3 py-1 text-xs text-slate-400">
              {page + 1}/{totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white disabled:opacity-40 transition-all cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
