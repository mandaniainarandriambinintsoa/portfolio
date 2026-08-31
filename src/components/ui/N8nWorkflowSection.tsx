"use client";

import dynamic from "next/dynamic";

const N8nWorkflowViewer = dynamic(
  () => import("@/components/ui/N8nWorkflowViewer"),
  { ssr: false }
);

export default function N8nWorkflowSection({
  workflow,
  className = "mb-12",
}: {
  workflow: object;
  className?: string;
}) {
  return (
    <div className={className}>
      <N8nWorkflowViewer workflow={workflow} height={500} />
    </div>
  );
}
