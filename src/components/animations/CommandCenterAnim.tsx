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

      // Code lines typing effect
      const codeLines = container.current!.querySelectorAll(".code-gradient p");
      if (codeLines.length) {
        gsap.fromTo(
          codeLines,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power1.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Pipeline cards sequential slide
      const cards = container.current!.querySelectorAll(".glass-card.rounded-xl");
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 70%",
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
