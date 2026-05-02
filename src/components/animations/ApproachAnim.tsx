"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useLazyGSAP } from "@/hooks/useLazyGSAP";

export default function ApproachAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useLazyGSAP(() => {
    if (!container.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const heading = container.current!.querySelector("h2");
      if (heading) {
        gsap.fromTo(
          heading.parentElement,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const headline = container.current!.querySelector("h3");
      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headline,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const paragraphs = container.current!.querySelectorAll("p");
      paragraphs.forEach((p, i) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2 + i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, container);

  return <div ref={container}>{children}</div>;
}
