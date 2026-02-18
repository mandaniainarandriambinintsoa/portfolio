"use client";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type SlugInputProps = {
  value: string;
  onChange: (value: string) => void;
  titleValue: string;
};

export default function SlugInput({ value, onChange, titleValue }: SlugInputProps) {
  return (
    <div>
      <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-2">
        Slug <span className="text-red-400">*</span>
      </label>
      <div className="flex gap-2">
        <input
          id="slug"
          name="slug"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm font-mono"
          placeholder="mon-article"
        />
        <button
          type="button"
          onClick={() => onChange(generateSlug(titleValue))}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
        >
          Auto
        </button>
      </div>
    </div>
  );
}
