"use client";

import { useRef, useEffect, useState } from "react";

export default function HeroAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (animated || !container.current) return;

    // Defer GSAP import out of the critical render path
    const runAnimation = async () => {
      const { gsap } = await import("@/lib/gsap-register");
      if (!container.current) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          container.current!.querySelectorAll("h1 span"),
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 }
        );

        tl.fromTo(
          container.current!.querySelector("p"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );

        tl.fromTo(
          container.current!.querySelectorAll("a, button"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );
      });

      setAnimated(true);
    };

    requestAnimationFrame(runAnimation);
  }, [animated]);

  return <div ref={container}>{children}</div>;
}
