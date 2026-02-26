"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useLazyGSAP } from "@/hooks/useLazyGSAP";

export default function FAQAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useLazyGSAP(() => {
    if (!container.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Stagger reveal FAQ items
      const items = container.current!.querySelectorAll(".faq-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, container);

  return <div ref={container}>{children}</div>;
}
