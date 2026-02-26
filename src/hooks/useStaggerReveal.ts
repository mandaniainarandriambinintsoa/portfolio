"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useLazyGSAP } from "./useLazyGSAP";

export function useStaggerReveal<T extends HTMLElement>(
  childSelector: string,
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    stagger = 0.15,
    duration = 0.8,
    start = "top 85%",
  } = options;

  useLazyGSAP(() => {
    if (!ref.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const children = ref.current!.querySelectorAll(childSelector);
      if (!children.length) return;

      gsap.fromTo(
        children,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
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
  }, ref);

  return ref;
}
