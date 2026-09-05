"use client";

import {
  getSourcePageForSubmit,
  getTrafficChannelForSubmit,
} from "@/lib/leads/client";

export const FUNNEL_SESSION_STORAGE_KEY = "ech_funnel_session";
const ANALYTICS_EVENT_API = "/api/analytics/event";
const FIELD_HINT_MAX_LEN = 2000;

export type ClientFunnelEventName =
  | "form_open"
  | "form_start"
  | "form_typing"
  | "form_abandon"
  | "form_error"
  | "form_submit_success";

const recentKeys = new Map<string, number>();

function shouldSkipDuplicate(key: string, windowMs = 400): boolean {
  const now = Date.now();
  const prev = recentKeys.get(key) ?? 0;
  if (now - prev < windowMs) return true;
  recentKeys.set(key, now);
  return false;
}

function newSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "00000000-0000-4000-8000-000000000000".replace(/0/g, () =>
    Math.floor(Math.random() * 16).toString(16),
  );
}

export function getFunnelSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = sessionStorage.getItem(FUNNEL_SESSION_STORAGE_KEY);
    if (existing) return existing;
  } catch {
    // Private mode.
  }
  const id = newSessionId();
  try {
    sessionStorage.setItem(FUNNEL_SESSION_STORAGE_KEY, id);
  } catch {
    // Ignore.
  }
  return id;
}

function compactMeta(
  metadata?: Record<string, unknown> | null,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!metadata) return out;
  for (const [key, value] of Object.entries(metadata)) {
    if (value === undefined || value === null || value === "") continue;
    if (key === "field_hints" && value && typeof value === "object") {
      const hints: Record<string, string> = {};
      for (const [field, hint] of Object.entries(
        value as Record<string, unknown>,
      )) {
        if (typeof hint === "string" && hint.trim()) {
          hints[field.slice(0, 40)] = hint.trim().slice(0, FIELD_HINT_MAX_LEN);
        }
      }
      if (Object.keys(hints).length > 0) out.field_hints = hints;
      continue;
    }
    if (typeof value === "string") {
      out[key] = value.slice(0, 120);
      continue;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      out[key] = value;
    }
  }
  return out;
}

function persistFunnelEventToApi(
  input: Record<string, unknown>,
  opts?: { preferBeacon?: boolean },
): void {
  if (typeof window === "undefined") return;
  const body = JSON.stringify(input);
  if (opts?.preferBeacon) {
    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        if (navigator.sendBeacon(ANALYTICS_EVENT_API, blob)) return;
      }
    } catch {
      // Fall through to fetch.
    }
  }
  void fetch(ANALYTICS_EVENT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Soft-fail.
  });
}

export function recordFunnelEvent(opts: {
  event_name: ClientFunnelEventName;
  form_name?: string | null;
  error_type?: string | null;
  project_slug?: string | null;
  project_name?: string | null;
  page_path?: string | null;
  metadata?: Record<string, unknown> | null;
  dedupeKey?: string | null;
}): void {
  if (typeof window === "undefined") return;
  if (opts.dedupeKey && shouldSkipDuplicate(opts.dedupeKey)) return;

  const page_path = (opts.page_path || getSourcePageForSubmit()).slice(0, 500);
  const funnel_session_id = getFunnelSessionId();
  const metadata = compactMeta({
    ...opts.metadata,
    funnel_session_id,
    traffic_channel: getTrafficChannelForSubmit(),
    kind:
      opts.event_name === "form_typing" || opts.event_name === "form_abandon"
        ? "partial_lead"
        : opts.event_name,
    status:
      opts.event_name === "form_typing" || opts.event_name === "form_abandon"
        ? "draft"
        : undefined,
  });

  persistFunnelEventToApi(
    {
      event_name: opts.event_name,
      form_name: opts.form_name,
      error_type: opts.error_type,
      project_slug: opts.project_slug,
      project_name: opts.project_name,
      page_path,
      metadata,
    },
    {
      preferBeacon:
        opts.event_name === "form_typing" ||
        opts.event_name === "form_abandon" ||
        opts.event_name === "form_error",
    },
  );
}

export function isIgnoredFormControl(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;
  if (target.closest("[aria-hidden='true']")) return true;
  const named =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
      ? target.name
      : "";
  if (named === "website" || named === "tu_hp_confirm") return true;
  return false;
}

export function recordFormOpen(opts: {
  form_name: string;
  project_slug?: string | null;
  project_name?: string | null;
}): void {
  recordFunnelEvent({
    event_name: "form_open",
    form_name: opts.form_name,
    project_slug: opts.project_slug,
    project_name: opts.project_name,
    dedupeKey: `form_open:${opts.form_name}:${getFunnelSessionId()}`,
  });
}

export function recordFormStart(opts: {
  form_name: string;
  project_slug?: string | null;
  project_name?: string | null;
}): void {
  recordFunnelEvent({
    event_name: "form_start",
    form_name: opts.form_name,
    project_slug: opts.project_slug,
    project_name: opts.project_name,
    dedupeKey: `form_start:${opts.form_name}:${getFunnelSessionId()}`,
  });
}

export function recordFormTyping(opts: {
  form_name: string;
  project_slug?: string | null;
  project_name?: string | null;
  field_hints: Record<string, string>;
}): void {
  if (Object.keys(opts.field_hints).length === 0) return;
  recordFunnelEvent({
    event_name: "form_typing",
    form_name: opts.form_name,
    project_slug: opts.project_slug,
    project_name: opts.project_name,
    metadata: { field_hints: opts.field_hints },
  });
}

export function recordFormAbandon(opts: {
  form_name: string;
  project_slug?: string | null;
  project_name?: string | null;
  started_filling: boolean;
  field_hints?: Record<string, string>;
}): void {
  const metadata: Record<string, unknown> = {
    started_filling: opts.started_filling,
  };
  if (opts.field_hints && Object.keys(opts.field_hints).length > 0) {
    metadata.field_hints = opts.field_hints;
  }
  recordFunnelEvent({
    event_name: "form_abandon",
    form_name: opts.form_name,
    project_slug: opts.project_slug,
    project_name: opts.project_name,
    metadata,
    dedupeKey: `form_abandon:${opts.form_name}:${getFunnelSessionId()}`,
  });
}

export function recordFormError(opts: {
  form_name: string;
  project_slug?: string | null;
  project_name?: string | null;
  error_type?: string | null;
  field_hints?: Record<string, string>;
}): void {
  const metadata: Record<string, unknown> = {};
  if (opts.field_hints && Object.keys(opts.field_hints).length > 0) {
    metadata.field_hints = opts.field_hints;
  }
  recordFunnelEvent({
    event_name: "form_error",
    form_name: opts.form_name,
    project_slug: opts.project_slug,
    project_name: opts.project_name,
    error_type: opts.error_type ?? "submit",
    metadata,
  });
}
