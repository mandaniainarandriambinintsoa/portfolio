"use client";

import { useState } from "react";
import type { Database } from "@/lib/supabase/types";

type QuizLead = Database["public"]["Tables"]["quiz_leads"]["Row"];

const resultLabels: Record<string, string> = {
  workflow: "Workflows",
  custom_app: "App Sur Mesure",
  ai_integration: "Intégration IA",
  full_scale: "Passage à l'Échelle",
};

const resultColors: Record<string, string> = {
  workflow: "bg-indigo-600/20 text-indigo-300",
  custom_app: "bg-emerald-600/20 text-emerald-300",
  ai_integration: "bg-blue-600/20 text-blue-300",
  full_scale: "bg-purple-600/20 text-purple-300",
};

export default function QuizLeadsClient({ leads }: { leads: QuizLead[] }) {
  const [page, setPage] = useState(0);
  const pageSize = 15;
  const totalPages = Math.ceil(leads.length / pageSize);
  const paged = leads.slice(page * pageSize, (page + 1) * pageSize);

  if (leads.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        Aucun lead pour le moment.
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Profil</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Langue</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 text-white font-medium">{lead.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${resultColors[lead.result_type] || "bg-white/10 text-slate-300"}`}>
                    {resultLabels[lead.result_type] || lead.result_type}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 uppercase text-xs">{lead.locale}</td>
                <td className="px-4 py-3 text-slate-400">
                  {new Date(lead.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4 pb-4">
          <span className="text-xs text-slate-500">
            {leads.length} lead{leads.length > 1 ? "s" : ""}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white disabled:opacity-40 transition-all cursor-pointer"
            >
              &larr;
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
              &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
