"use client";

import { useStaggerReveal } from "@/hooks/useStaggerReveal";

export default function ProjectsAnim({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useStaggerReveal<HTMLDivElement>(".group", {
    y: 50,
    stagger: 0.2,
    duration: 0.9,
    start: "top 85%",
  });

  return <div ref={ref}>{children}</div>;
}
