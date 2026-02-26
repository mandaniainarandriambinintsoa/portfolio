"use client";

import { useEffect } from "react";

/**
 * Deferred alternative to useGSAP — only runs when the container enters
 * the viewport (+ 200px margin) AND during browser idle time.
 *
 * Eliminates forced reflows from ScrollTrigger during initial page load,
 * reducing Total Blocking Time (TBT) for better PageSpeed scores.
 */
export function useLazyGSAP(
  callback: () => (() => void) | void,
  container: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    let cleanup: (() => void) | void;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const run = () => {
            cleanup = callback();
          };
          if ("requestIdleCallback" in window) {
            idleId = requestIdleCallback(run, { timeout: 3000 });
          } else {
            timeoutId = setTimeout(run, 1);
          }
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
