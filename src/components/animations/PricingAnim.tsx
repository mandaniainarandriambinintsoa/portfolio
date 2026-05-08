"use client";

import { useStaggerReveal } from "@/hooks/useStaggerReveal";

export default function PricingAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useStaggerReveal<HTMLDivElement>(".glass-card", {
    y: 40,
    stagger: 0.15,
    duration: 0.8,
  });

  return <div ref={ref}>{children}</div>;
}
