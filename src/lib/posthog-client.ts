"use client";

import posthog from "posthog-js";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

const ATTRIBUTION_STORAGE_KEY = "manda:posthog-attribution:v1";

function parseHostname(value: string): string {
  if (!value) return "";

  try {
    return new URL(value).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function classifyTrafficChannel(
  source: string,
  medium: string,
  referringDomain: string
): string {
  const normalizedSource = source.toLowerCase();
  const normalizedMedium = medium.toLowerCase();
  const domain = referringDomain.toLowerCase();

  if (/cpc|ppc|paid|display/.test(normalizedMedium)) return "paid";
  if (/email|newsletter/.test(normalizedMedium)) return "email";
  if (/social/.test(normalizedMedium)) return "social";

  const candidate = `${normalizedSource} ${domain}`;
  if (/chatgpt|openai|perplexity|claude|gemini|copilot|you\.com|phind/.test(candidate)) {
    return "ai_referral";
  }
  if (/google|bing|duckduckgo|yahoo|ecosia|brave/.test(candidate)) {
    return "organic_search";
  }
  if (/linkedin|facebook|instagram|twitter|t\.co|youtube|reddit/.test(candidate)) {
    return "social";
  }
  if (source || referringDomain) return "referral";
  return "direct";
}

export function getPortfolioAttribution(): AnalyticsProperties {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as AnalyticsProperties;
  } catch {
    // Fall back to deriving attribution for this event.
  }

  const searchParams = new URLSearchParams(window.location.search);
  const source = searchParams.get("utm_source")?.slice(0, 120) ?? "";
  const medium = searchParams.get("utm_medium")?.slice(0, 120) ?? "";
  const referringDomain = parseHostname(document.referrer);
  const sameSiteReferral =
    referringDomain === window.location.hostname.replace(/^www\./, "").toLowerCase();
  const externalReferringDomain = sameSiteReferral ? "" : referringDomain;
  const trafficChannel = classifyTrafficChannel(source, medium, externalReferringDomain);
  const attribution: AnalyticsProperties = {
    traffic_channel: trafficChannel,
    traffic_source: source || externalReferringDomain || "direct",
    traffic_medium: medium || (externalReferringDomain ? "referral" : "none"),
    referring_domain: externalReferringDomain || "direct",
    entry_path: window.location.pathname,
    is_ai_referral: trafficChannel === "ai_referral",
  };

  const optionalParameters = {
    utm_campaign: searchParams.get("utm_campaign"),
    utm_term: searchParams.get("utm_term"),
    utm_content: searchParams.get("utm_content"),
  };

  for (const [key, value] of Object.entries(optionalParameters)) {
    if (value) attribution[key] = value.slice(0, 160);
  }

  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Privacy modes can disable sessionStorage.
  }

  return attribution;
}

function getFunnelContext(event: string, properties: AnalyticsProperties): AnalyticsProperties {
  if (event === "contact_form_success") {
    return { funnel_stage: "conversion", intent_score: 100 };
  }
  if (event === "contact_form_submitted") {
    return { funnel_stage: "intent", intent_score: 90 };
  }
  if (event === "whatsapp_clicked") {
    return { funnel_stage: "intent", intent_score: 85 };
  }
  if (event === "contact_form_started") {
    return { funnel_stage: "intent", intent_score: 75 };
  }
  if (event === "contact_form_failed") {
    return { funnel_stage: "intent", intent_score: 65 };
  }
  if (event === "cta_clicked") {
    const isContact = properties.cta_type === "contact" || properties.cta_type === "submit";
    return {
      funnel_stage: isContact ? "intent" : "consideration",
      intent_score: isContact ? 70 : 35,
    };
  }
  if (
    [
      "service_viewed",
      "solution_viewed",
      "business_vertical_viewed",
      "project_opened",
      "project_viewed",
      "demo_opened",
    ].includes(event)
  ) {
    return { funnel_stage: "consideration", intent_score: 30 };
  }
  if (event === "scroll_depth_reached") {
    const depth = typeof properties.depth_percent === "number" ? properties.depth_percent : 0;
    return {
      funnel_stage: depth >= 75 ? "consideration" : "awareness",
      intent_score: depth >= 75 ? 25 : 10,
    };
  }

  return { funnel_stage: "awareness", intent_score: 5 };
}

export function getPortfolioTrackingContext(
  event: string,
  properties: AnalyticsProperties = {}
): AnalyticsProperties {
  return {
    app_surface: "portfolio",
    ...getPortfolioAttribution(),
    ...getFunnelContext(event, properties),
  };
}

export function trackPortfolioEvent(event: string, properties: AnalyticsProperties = {}) {
  if (!event || !posthog.__loaded) return;

  posthog.capture(event, {
    ...getPortfolioTrackingContext(event, properties),
    ...properties,
  });
}
