"use client";

import { useEffect } from "react";

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function VisitorPing() {
  useEffect(() => {
    const ping = () => {
      fetch("/api/visitors", { cache: "no-store" }).catch(() => {});
    };
    const w = window as IdleWindow;
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(ping, { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(ping, 1500);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
