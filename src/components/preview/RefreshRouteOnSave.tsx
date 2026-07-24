"use client";

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

export default function RefreshRouteOnSave() {
  const router = useRouter();
  const serverURL = typeof window === "undefined" ? "" : window.location.origin;

  return <PayloadRefreshRouteOnSave refresh={router.refresh} serverURL={serverURL} />;
}
