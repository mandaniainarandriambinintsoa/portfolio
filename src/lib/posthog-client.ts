"use client";

import posthog from "posthog-js";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

export function trackPortfolioEvent(event: string, properties: AnalyticsProperties = {}) {
  if (!event || !posthog.__loaded) return;

  posthog.capture(event, {
    ...properties,
    app_surface: "portfolio",
  });
}
