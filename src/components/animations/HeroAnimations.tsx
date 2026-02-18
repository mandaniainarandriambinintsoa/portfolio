"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

export default function HeroAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // H1 lines stagger
      tl.fromTo(
        container.current!.querySelectorAll("h1 span"),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15 }
      );

      // Subtitle fade
      tl.fromTo(
        container.current!.querySelector("p"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );

      // CTAs slide in
      tl.fromTo(
        container.current!.querySelectorAll("a, button"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.3"
      );
    });
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
