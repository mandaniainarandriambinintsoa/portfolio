"use client";

import { useState } from "react";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";

type MarkdownEditorProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function MarkdownEditor({
  label,
  name,
  value,
  onChange,
  placeholder,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={name} className="text-sm font-medium text-slate-300">
          {label}
        </label>
        <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setTab("edit")}
            className={`px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
              tab === "edit"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Éditer
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
              tab === "preview"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Aperçu
          </button>
        </div>
      </div>

      {tab === "edit" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={16}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm font-mono resize-y"
        />
      ) : (
        <div className="min-h-[400px] bg-white/5 border border-white/10 rounded-xl p-6 overflow-auto">
          {value ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className="text-slate-500 text-sm italic">Aucun contenu à afficher</p>
          )}
        </div>
      )}
    </div>
  );
}
