"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useLazyGSAP } from "@/hooks/useLazyGSAP";

export default function CommandCenterAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useLazyGSAP(() => {
    if (!container.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Main container fade in
      gsap.fromTo(
        container.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Pipeline nodes reveal sequentially (mirrors the data flowing through)
      const nodes = container.current!.querySelectorAll(".flow-node");
      if (nodes.length) {
        gsap.fromTo(
          nodes,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, container);

  return <div ref={container}>{children}</div>;
}
