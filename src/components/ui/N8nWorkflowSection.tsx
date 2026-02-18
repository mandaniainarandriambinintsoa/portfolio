"use client";

import dynamic from "next/dynamic";

const N8nWorkflowViewer = dynamic(
  () => import("@/components/ui/N8nWorkflowViewer"),
  { ssr: false }
);

export default function N8nWorkflowSection({
  workflow,
}: {
  workflow: object;
}) {
  return (
    <div className="mb-12">
      <N8nWorkflowViewer workflow={workflow} height={500} />
    </div>
  );
}
