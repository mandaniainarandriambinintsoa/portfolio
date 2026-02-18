"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

export default function BlogPostAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add(
      { normal: "(prefers-reduced-motion: no-preference)" },
      () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".blog-cover",
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.8 }
        )
          .fromTo(
            ".blog-title",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            ".blog-meta",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
            "-=0.3"
          )
          .fromTo(
            ".blog-content",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.2"
          );
      }
    );
  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}
