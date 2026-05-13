"use client";

import { useEffect } from "react";

export default function VisitorPing() {
  useEffect(() => {
    const ping = () => {
      fetch("/api/visitors", { cache: "no-store" }).catch(() => {});
    };
    if ("requestIdleCallback" in window) {
      const id = (window as Window & typeof globalThis).requestIdleCallback(ping, { timeout: 2000 });
      return () => (window as Window & typeof globalThis).cancelIdleCallback(id);
    }
    const t = window.setTimeout(ping, 1500);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
