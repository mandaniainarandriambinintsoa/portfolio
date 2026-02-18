"use client";

import { useState } from "react";

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export default function TagsInput({ value, onChange }: TagsInputProps) {
  const [input, setInput] = useState("");

  function addTag() {
    const tag = input.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
  }

  function removeTag(tagToRemove: string) {
    onChange(value.filter((t) => t !== tagToRemove));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
          placeholder="Ajouter un tag puis Entrée"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}
