"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

export default function TechStackAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Fade in the section
      gsap.fromTo(
        container.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Override CSS animation with GSAP for more control
      const track = container.current!.querySelector(".marquee-track");
      if (track) {
        // Remove CSS animation
        (track as HTMLElement).style.animation = "none";

        // GSAP infinite scroll
        const totalWidth = (track as HTMLElement).scrollWidth / 2;
        gsap.to(track, {
          x: -totalWidth,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
