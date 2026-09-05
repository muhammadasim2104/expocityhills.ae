const INTERNAL_CHANNELS = new Set([
  "contact_form",
  "guide_download",
  "event_registration",
  "modal",
  "inline",
  "page",
]);

export function formatTrafficChannel(channel?: string | null): string {
  const trimmed = (channel ?? "").trim();
  if (!trimmed || trimmed === "—") return "unknown";
  if (INTERNAL_CHANNELS.has(trimmed.toLowerCase())) return "unknown";
  return trimmed;
}

export function resolveTrafficChannel(input: {
  utm_source?: string | null;
  utm_medium?: string | null;
  referrer?: string | null;
}): string {
  const source = (input.utm_source ?? "").trim().toLowerCase();
  const medium = (input.utm_medium ?? "").trim().toLowerCase();

  if (source) {
    if (["cpc", "ppc", "paid", "paidsearch", "display"].includes(medium)) {
      return `paid / ${source}`;
    }
    if (["email", "newsletter"].includes(medium)) {
      return `email / ${source}`;
    }
    if (["social", "social-media"].includes(medium)) {
      return `social / ${source}`;
    }
    return source;
  }

  const referrer = (input.referrer ?? "").trim();
  if (!referrer) return "direct";

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    if (/google\./i.test(host)) return "organic / google";
    if (/bing\./i.test(host)) return "organic / bing";
    if (
      /facebook|instagram|linkedin|twitter|x\.com|t\.co|tiktok|youtube|reddit/i.test(
        host,
      )
    ) {
      return `social / ${host}`;
    }
    return `referral / ${host}`;
  } catch {
    return "referral";
  }
}
