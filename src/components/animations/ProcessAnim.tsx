"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

export default function ProcessAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Section heading
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

      // Process steps
      const steps = container.current!.querySelectorAll(".relative > .relative");
      steps.forEach((step, i) => {
        // Number scale
        const num = step.previousElementSibling;
        if (num) {
          gsap.fromTo(
            num,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Content slide
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
