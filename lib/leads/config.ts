export const SITE_HOST = "expocityhills.ae";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://expocityhills.ae";

export const DEFAULT_PROJECT_SLUG = "expo-city-hills";
export const DEFAULT_PROJECT_NAME = "Expo City Hills 1";

/** Same default as theupsides.ae dashboard (CONTACT_INBOX / LEAD_FORWARD_EMAIL). */
export const DEFAULT_LEAD_INBOX = "muhammadasim124@gmail.com";

export const REGISTRATION_SUCCESS_MESSAGE =
  "Thank you. Our sales advisor for Expo City Hills will be in touch shortly.";

const DEFAULT_FROM = '"Expo City Hills" <onboarding@resend.dev>';

function env(name: string, fallback = ""): string {
  const value = process.env[name];
  return value?.trim() ? value.trim() : fallback;
}

export function leadInbox(): string {
  return env("LEAD_FORWARD_EMAIL") || env("CONTACT_INBOX") || DEFAULT_LEAD_INBOX;
}

export function resendFrom(): string {
  const raw = env("RESEND_FROM") || env("RESEND_FROM_EMAIL") || DEFAULT_FROM;
  if (/@theupsides\.ae\b/i.test(raw)) return DEFAULT_FROM;
  if (/@resend\.dev\b/i.test(raw)) return DEFAULT_FROM;
  return raw;
}

export function supabaseUrl(): string {
  return env("SUPABASE_URL") || env("NEXT_PUBLIC_SUPABASE_URL");
}

export function supabaseSecret(): string {
  return env("SUPABASE_SECRET_KEY") || env("SUPABASE_SERVICE_ROLE_KEY");
}

export function supabaseConfigured(): boolean {
  return Boolean(supabaseUrl() && supabaseSecret());
}

export function ingestConfigured(): boolean {
  return Boolean(env("UPSIDES_INGEST_URL") && env("UPSIDES_INGEST_KEY"));
}

export function shouldForwardLeadsToIngest(): boolean {
  return ingestConfigured();
}

export function readEnv(name: string, fallback = ""): string {
  return env(name, fallback);
}
