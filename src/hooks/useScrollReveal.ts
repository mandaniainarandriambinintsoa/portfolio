"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

export function useScrollReveal<T extends HTMLElement>(
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const { y = 40, duration = 0.8, delay = 0, start = "top 85%" } = options;

  useGSAP(() => {
    if (!ref.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: ref });

  return ref;
}
