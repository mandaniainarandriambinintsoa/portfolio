"use client";

import { Suspense, useEffect } from "react";
import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getPortfolioTrackingContext,
  trackPortfolioEvent,
} from "@/lib/posthog-client";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
type ClickProperties = Record<string, string | number | boolean | null | undefined>;

function toClickProperties(value: unknown): ClickProperties {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) =>
      entry == null || ["string", "number", "boolean"].includes(typeof entry)
    ),
  ) as ClickProperties;
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!posthogKey || posthog.__loaded) return;

    posthog.init(posthogKey, {
      api_host: posthogHost,
      capture_pageview: false,
      person_profiles: "identified_only",
      loaded: (instance) => {
        if (process.env.NODE_ENV === "development") {
          instance.debug(false);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (!posthogKey || !pathname) return;

    const queryString = searchParams.toString();
    const url = `${window.location.origin}${pathname}${queryString ? `?${queryString}` : ""}`;
    const pageProperties = {
      $current_url: url,
      path: pathname,
      locale: pathname.startsWith("/en") ? "en" : "fr",
    };

    posthog.capture("$pageview", {
      ...getPortfolioTrackingContext("$pageview", pageProperties),
      ...pageProperties,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!posthogKey || !pathname) return;

    const sentMilestones = new Set<number>();
    const milestones = [25, 50, 75, 90];

    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = Math.round((window.scrollY / scrollable) * 100);
      const milestone = milestones.find((value) => percent >= value && !sentMilestones.has(value));
      if (!milestone) return;

      sentMilestones.add(milestone);
      trackPortfolioEvent("scroll_depth_reached", {
        path: pathname,
        depth_percent: milestone,
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!posthogKey) return;

    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-ph-event]")
        : null;
      if (!target) return;

      let properties: ClickProperties = {};
      const rawProperties = target.dataset.phProps;

      if (rawProperties) {
        try {
          properties = toClickProperties(JSON.parse(rawProperties));
        } catch {
          properties = {};
        }
      }

      trackPortfolioEvent(target.dataset.phEvent || "portfolio_click", {
        ...properties,
        label: properties.label ?? target.textContent?.trim().slice(0, 120) ?? null,
        href: properties.href ?? target.getAttribute("href"),
        path: window.location.pathname,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export default function PostHogProvider() {
  if (!posthogKey) return null;

  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
