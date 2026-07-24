"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import type { gsap as GsapType } from "gsap";
import type { VisitorRow } from "@/app/api/visitors/route";

function FlagIcon({ code }: { code: string }) {
  if (!code || code.length !== 2) {
    return <span className="text-base leading-none">🌍</span>;
  }
  return (
    <Image
      src={`https://flagcdn.com/20x15/${code.toLowerCase()}.png`}
      width={20}
      height={15}
      alt={code}
      className="inline-block"
    />
  );
}

function formatTimeAgo(createdAt: string, locale: string): string {
  const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);

  if (locale === "fr") {
    if (diff < 60) return "à l'instant";
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)}h`;
    return `il y a ${Math.floor(diff / 86400)}j`;
  }
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

type VisitorTrackingProps = {
  dict: {
    badge: string;
    title: string;
    showcase_text: string;
    col_city: string;
    col_country: string;
    col_when: string;
    empty: string;
    active_now: string;
  };
  locale: string;
};

export default function VisitorTracking({
  dict,
  locale,
}: VisitorTrackingProps) {
  const [visitors, setVisitors] = useState<VisitorRow[]>([]);
  const [prevKeys, setPrevKeys] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<typeof GsapType | null>(null);

  // Lazy-load GSAP (keeps it out of initial bundle)
  useEffect(() => {
    import("gsap").then((mod) => {
      gsapRef.current = mod.default;
    });
  }, []);

  const animateNewRows = useCallback((newKeys: string[]) => {
    const gsap = gsapRef.current;
    if (!gsap || !tableRef.current || newKeys.length === 0) return;
    for (const key of newKeys) {
      const row = tableRef.current.querySelector(`[data-visitor-key="${CSS.escape(key)}"]`);
      if (!row) continue;
      gsap.fromTo(
        row,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        row,
        { backgroundColor: "rgba(99, 102, 241, 0.15)" },
        { backgroundColor: "rgba(99, 102, 241, 0)", duration: 1.5, delay: 0.3 }
      );
    }
  }, []);

  const fetchVisitors = useCallback(async () => {
    try {
      const res = await fetch("/api/visitors");
      if (!res.ok) return;
      const data = await res.json();
      const newVisitors: VisitorRow[] = data.visitors || [];

      setVisitors((prev) => {
        const oldKeys = new Set(prev.map((v) => `${v.city}-${v.country}-${v.created_at}`));
        setPrevKeys(oldKeys);
        return newVisitors;
      });

      requestAnimationFrame(() => {
        const currentKeys = newVisitors.map((v) => `${v.city}-${v.country}-${v.created_at}`);
        const added = currentKeys.filter((k) => !prevKeys.has(k));
        if (added.length > 0 && added.length < currentKeys.length) {
          animateNewRows(added);
        }
      });
    } catch {
      // silent fail
    }
  }, [animateNewRows, prevKeys]);

  // Initial fetch + poll every 30s
  useEffect(() => {
    fetchVisitors();
    const interval = setInterval(fetchVisitors, 30_000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="visitor-tracking" className="relative py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-sm font-mono tracking-[0.3em] text-white/60 uppercase">
            {dict.title}
          </h2>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {dict.badge}
          </span>
        </div>

        {/* Showcase text */}
        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
          {dict.showcase_text}
        </p>

        {/* Table */}
        <div
          ref={tableRef}
          className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 px-6 py-3 border-b border-white/[0.06] text-xs font-mono tracking-wider text-white/50 uppercase">
            <span>{dict.col_city}</span>
            <span>{dict.col_country}</span>
            <span className="text-right">{dict.col_when}</span>
          </div>

          {/* Rows */}
          {visitors.length === 0 ? (
            <div className="px-6 py-8 text-center text-white/50 text-sm">
              {dict.empty}
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {visitors.map((v) => {
                const key = `${v.city}-${v.country}-${v.created_at}`;
                return (
                  <div
                    key={key}
                    data-visitor-key={key}
                    className="visitor-row grid grid-cols-3 px-6 py-3 text-sm"
                  >
                    <span className="text-white/70 truncate">{v.city}</span>
                    <span className="text-white/70 flex items-center gap-2">
                      <FlagIcon code={v.country_code} />
                      <span className="truncate">{v.country}</span>
                    </span>
                    <span className="text-white/50 text-right">
                      {formatTimeAgo(v.created_at, locale)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
