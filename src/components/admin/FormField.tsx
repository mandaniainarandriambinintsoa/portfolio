"use client";

type FormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "url" | "number" | "textarea" | "select";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
};

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
  options,
}: FormFieldProps) {
  const baseClasses =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm";

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseClasses} resize-y`}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={baseClasses}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0a0a1a]">
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
}
