"use client";

import { useEffect } from "react";
import { trackPortfolioEvent } from "@/lib/posthog-client";

export default function BusinessVerticalTracker({
  vertical,
  locale,
}: {
  vertical: string;
  locale: "fr" | "en";
}) {
  useEffect(() => {
    trackPortfolioEvent("business_vertical_viewed", {
      business_vertical: vertical,
      locale,
    });
  }, [locale, vertical]);

  return null;
}
