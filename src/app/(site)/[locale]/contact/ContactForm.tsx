"use client";

import { useRef, useState } from "react";
import { trackPortfolioEvent } from "@/lib/posthog-client";

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
  const startedRef = useRef(false);

  function trackFormStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackPortfolioEvent("contact_form_started", { locale });
  }

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
    trackPortfolioEvent("contact_form_submitted", {
      locale,
      message_length: payload.message.length,
      has_name: payload.name.length > 0,
      has_email: payload.email.length > 0,
    });

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
        trackPortfolioEvent("contact_form_failed", {
          locale,
          reason: json.error ?? "api_error",
        });
        return;
      }

      form.reset();
      setStatus("success");
      trackPortfolioEvent("contact_form_success", { locale });
    } catch {
      setStatus("error");
      trackPortfolioEvent("contact_form_failed", {
        locale,
        reason: "network_error",
      });
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
          onFocus={trackFormStarted}
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
          onFocus={trackFormStarted}
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
          onFocus={trackFormStarted}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none disabled:opacity-50"
        />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={isSending}
          data-ph-event="cta_clicked"
          data-ph-props={JSON.stringify({ area: "contact_form", cta_type: "submit", label: labels.submit, locale })}
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
