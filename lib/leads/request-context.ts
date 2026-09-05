import { createHash } from "crypto";

const INVALID_GEO = new Set(["XX", "T1", "EU", "A1", "A2", "O1"]);
const IP_HASH_SALT = "expocityhills.ae";

export type AnalyticsClientContext = {
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  device_name: string | null;
  user_agent: string | null;
};

function headerGet(headers: Headers, name: string): string | null {
  return headers.get(name) ?? headers.get(name.toLowerCase());
}

function firstForwardedIp(raw: string | null): string | null {
  if (!raw) return null;
  const part = raw.split(",")[0]?.trim() ?? "";
  if (!part || part === "unknown" || part === "local") return null;
  const bracket = part.match(/^\[([^\]]+)\](?::\d+)?$/);
  if (bracket?.[1]) return bracket[1].slice(0, 64);
  return part.slice(0, 64);
}

function geoCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  if (!code || INVALID_GEO.has(code) || !/^[A-Z]{2}$/.test(code)) return null;
  return code;
}

function parseUserAgent(ua: string | null) {
  if (!ua) {
    return { browser: null, os: null, device: null, deviceName: null };
  }

  let device = "desktop";
  if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) {
    device = "tablet";
  } else if (
    /Mobi|iPhone|iPod|Android.+Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      ua,
    )
  ) {
    device = "mobile";
  }

  let os: string | null = null;
  if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/CrOS/i.test(ua)) os = "Chrome OS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser: string | null = null;
  if (/Edg\//i.test(ua) || /EdgiOS/i.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
  else if (/SamsungBrowser/i.test(ua)) browser = "Samsung Internet";
  else if (/Firefox|FxiOS/i.test(ua)) browser = "Firefox";
  else if (/Chrome|CriOS|Chromium/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua)) browser = "Safari";

  let deviceName: string | null = null;
  if (/iPhone/i.test(ua)) deviceName = "iPhone";
  else if (/iPad/i.test(ua)) deviceName = "iPad";
  else if (/Macintosh|Mac OS X/i.test(ua)) deviceName = "Mac";

  return { browser, os, device, deviceName };
}

export function parseRequestContext(headers: Headers): AnalyticsClientContext {
  const ip =
    firstForwardedIp(headerGet(headers, "cf-connecting-ip")) ??
    firstForwardedIp(headerGet(headers, "x-real-ip")) ??
    firstForwardedIp(headerGet(headers, "x-vercel-forwarded-for")) ??
    firstForwardedIp(headerGet(headers, "x-forwarded-for"));

  const country = geoCode(
    headerGet(headers, "cf-ipcountry") ??
      headerGet(headers, "x-vercel-ip-country") ??
      headerGet(headers, "x-country-code"),
  );

  const uaRaw = headerGet(headers, "user-agent");
  const user_agent = uaRaw ? uaRaw.slice(0, 300) : null;
  const parsed = parseUserAgent(uaRaw);

  return {
    ip,
    country,
    region: headerGet(headers, "x-vercel-ip-country-region")?.slice(0, 64) ?? null,
    city: headerGet(headers, "x-vercel-ip-city")?.slice(0, 80) ?? null,
    timezone: headerGet(headers, "x-vercel-ip-timezone")?.slice(0, 64) ?? null,
    browser: parsed.browser,
    os: parsed.os,
    device: parsed.device,
    device_name: parsed.deviceName,
    user_agent,
  };
}

export function hashIp(ip: string | null): string {
  return createHash("sha256")
    .update(`${IP_HASH_SALT}|${ip || "unknown"}`)
    .digest("hex")
    .slice(0, 16);
}

export function dashboardClient(
  client: AnalyticsClientContext,
): Record<string, string | null> {
  const ip_hash = hashIp(client.ip);
  return {
    country: client.country,
    ip_hash,
    ip: ip_hash,
    region: client.region,
    city: client.city,
    timezone: client.timezone,
    browser: client.browser,
    os: client.os,
    device: client.device,
    device_name: client.device_name,
    user_agent: client.user_agent,
  };
}

export function formatCountryLabel(code: string | null): string {
  if (!code) return "Not available";
  try {
    const name = new Intl.DisplayNames(["en-GB"], { type: "region" }).of(code);
    return name && name !== code ? `${name} (${code})` : code;
  } catch {
    return code;
  }
}

export function formatDeviceLabel(client: AnalyticsClientContext): string {
  const kind = client.device?.trim() || null;
  const name = client.device_name?.trim() || null;
  if (name && kind) {
    if (name.toLowerCase() === kind.toLowerCase()) return kind;
    return `${name} · ${kind}`;
  }
  return name || kind || "Not available";
}
