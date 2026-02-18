"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

export default function CTAFinalAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Fade in + scale the whole section
      gsap.fromTo(
        container.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Subtle glow pulse loop
      const glow = container.current!.querySelector(".cta-glow");
      if (glow) {
        gsap.to(glow, {
          scale: 1.15,
          opacity: 0.7,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
