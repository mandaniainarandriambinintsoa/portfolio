"use client";

import { useEffect } from "react";

type SignalEvent = "session_started" | "high_intent";

type SignalPayload = {
  event: SignalEvent;
  locale: string;
  path: string;
  referrer?: string;
  action?: string;
  area?: string;
  label?: string;
};

const SESSION_KEY = "manda:visitor-session-notified:v1";
const SIGNAL_PREFIX = "manda:lead-signal:v1:";

function readSessionValue(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionValue(key: string): void {
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Privacy modes can disable sessionStorage. The server cookie still deduplicates sessions.
  }
}

function removeSessionValue(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Nothing to clean up when storage is unavailable.
  }
}

async function sendSignal(payload: SignalPayload, storageKey: string): Promise<void> {
  writeSessionValue(storageKey);

  try {
    const response = await fetch("/api/lead-signal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-manda-signal": "portfolio",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (!response.ok) removeSessionValue(storageKey);
  } catch {
    removeSessionValue(storageKey);
  }
}

function parseClickProperties(target: HTMLElement): Record<string, unknown> {
  const rawProperties = target.dataset.phProps;
  if (!rawProperties) return {};

  try {
    const parsed = JSON.parse(rawProperties);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export default function VisitorSignals({ locale }: { locale: string }) {
  useEffect(() => {
    let sessionSignalSent = Boolean(readSessionValue(SESSION_KEY));
    let dwellTimer: number | undefined;

    function sendSessionSignal() {
      if (sessionSignalSent || document.visibilityState !== "visible") return;
      sessionSignalSent = true;
      void sendSignal(
        {
          event: "session_started",
          locale,
          path: `${window.location.pathname}${window.location.search}`,
          referrer: document.referrer,
        },
        SESSION_KEY
      );
    }

    function onFirstEngagement() {
      sendSessionSignal();
      removeEngagementListeners();
    }

    function removeEngagementListeners() {
      window.removeEventListener("scroll", onFirstEngagement);
      document.removeEventListener("keydown", onFirstEngagement);
    }

    if (!sessionSignalSent) {
      window.addEventListener("scroll", onFirstEngagement, { passive: true, once: true });
      document.addEventListener("keydown", onFirstEngagement, { once: true });
      dwellTimer = window.setTimeout(sendSessionSignal, 8_000);
    }

    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-ph-event]")
        : null;
      if (!target) return;

      const eventName = target.dataset.phEvent;
      const properties = parseClickProperties(target);
      const isWhatsApp = eventName === "whatsapp_clicked";
      const isContactCta =
        eventName === "cta_clicked" && properties.cta_type === "contact";

      if (!isWhatsApp && !isContactCta) return;

      const action = isWhatsApp ? "whatsapp_clicked" : "contact_cta_clicked";
      const path = window.location.pathname;
      const storageKey = `${SIGNAL_PREFIX}${action}:${path}`;
      if (readSessionValue(storageKey)) return;

      void sendSignal(
        {
          event: "high_intent",
          locale,
          path,
          referrer: document.referrer,
          action,
          area: typeof properties.area === "string" ? properties.area : undefined,
          label:
            typeof properties.label === "string"
              ? properties.label
              : target.textContent?.trim().slice(0, 120),
        },
        storageKey
      );
    }

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      removeEngagementListeners();
      if (dwellTimer !== undefined) window.clearTimeout(dwellTimer);
    };
  }, [locale]);

  return null;
}
