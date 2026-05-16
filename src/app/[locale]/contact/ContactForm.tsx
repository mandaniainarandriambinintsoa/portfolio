"use client";

import { useState } from "react";

type Labels = {
  name_label: string;
  email_label: string;
  message_label: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

export default function ContactForm({
  locale,
  labels,
}: {
  locale: string;
  labels: Labels;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      locale,
    };

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(json.error ?? "");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isSending = status === "sending";

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          {labels.name_label}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          disabled={isSending}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          {labels.email_label}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={254}
          disabled={isSending}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          {labels.message_label}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          disabled={isSending}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none disabled:opacity-50"
        />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={isSending}
          className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
        >
          {isSending ? labels.sending : labels.submit}
        </button>

        {status === "success" && (
          <p role="status" className="text-emerald-400 text-sm font-medium">
            {labels.success}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-red-400 text-sm font-medium">
            {labels.error}
            {errorMsg ? ` (${errorMsg})` : ""}
          </p>
        )}
      </div>
    </form>
  );
}
