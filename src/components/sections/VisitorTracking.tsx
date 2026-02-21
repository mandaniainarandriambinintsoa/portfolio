"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap-register";
import type { VisitorGA4 } from "@/app/api/visitors/route";

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return "🌍";
  const codePoints = [...code.toUpperCase()].map(
    (c) => 0x1f1e6 - 65 + c.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
}

type VisitorTrackingProps = {
  dict: {
    badge: string;
    title: string;
    showcase_text: string;
    col_city: string;
    col_country: string;
    col_users: string;
    empty: string;
    active_now: string;
  };
  locale: string;
};

export default function VisitorTracking({
  dict,
  locale,
}: VisitorTrackingProps) {
  const [visitors, setVisitors] = useState<VisitorGA4[]>([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [prevKeys, setPrevKeys] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);

  const animateNewRows = useCallback((newKeys: string[]) => {
    if (!tableRef.current || newKeys.length === 0) return;
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
      const newVisitors: VisitorGA4[] = data.visitors || [];
      setActiveUsers(data.activeUsers || 0);

      setVisitors((prev) => {
        const oldKeys = new Set(prev.map((v) => `${v.city}-${v.country}`));
        setPrevKeys(oldKeys);
        return newVisitors;
      });

      // Animate new entries after render
      requestAnimationFrame(() => {
        const currentKeys = newVisitors.map((v) => `${v.city}-${v.country}`);
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
          <h2 className="text-sm font-mono tracking-[0.3em] text-white/40 uppercase">
            {dict.title}
          </h2>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {dict.badge}
          </span>
          {activeUsers > 0 && (
            <span className="text-xs text-white/30 font-mono">
              {activeUsers} {dict.active_now}
            </span>
          )}
        </div>

        {/* Showcase text */}
        <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
          {dict.showcase_text}
        </p>

        {/* Table */}
        <div
          ref={tableRef}
          className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-2 px-6 py-3 border-b border-white/[0.06] text-xs font-mono tracking-wider text-white/30 uppercase">
            <span>{dict.col_city}</span>
            <span>{dict.col_country}</span>
          </div>

          {/* Rows */}
          {visitors.length === 0 ? (
            <div className="px-6 py-8 text-center text-white/30 text-sm">
              {dict.empty}
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {visitors.map((v) => {
                const key = `${v.city}-${v.country}`;
                return (
                  <div
                    key={key}
                    data-visitor-key={key}
                    className="visitor-row grid grid-cols-2 px-6 py-3 text-sm"
                  >
                    <span className="text-white/70 truncate">{v.city}</span>
                    <span className="text-white/50 flex items-center gap-2">
                      <span className="text-base leading-none">
                        {countryCodeToFlag(v.countryCode)}
                      </span>
                      <span className="truncate">{v.country}</span>
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
