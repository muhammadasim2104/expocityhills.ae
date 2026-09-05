"use client";

import { resolveTrafficChannel } from "./traffic";

export function getTrafficChannelForSubmit(): string {
  if (typeof window === "undefined") return "unknown";

  const params = new URLSearchParams(window.location.search);
  return resolveTrafficChannel({
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    referrer: document.referrer || null,
  });
}

export function getSourcePageForSubmit(): string {
  if (typeof window === "undefined") return "https://expocityhills.ae/";
  return window.location.href;
}
