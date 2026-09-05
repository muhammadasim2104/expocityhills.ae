import { getCountries, type CountryCode } from "libphonenumber-js";

export const DEFAULT_PHONE_COUNTRY: CountryCode = "AE";
export const VISITOR_PHONE_COUNTRY_COOKIE = "ech_phone_country";

const SUPPORTED = new Set<string>(getCountries());
const INVALID_GEO = new Set(["XX", "T1", "EU", "A1", "A2", "O1"]);

export function normalizePhoneCountryCode(
  raw: string | null | undefined,
): CountryCode {
  if (!raw) return DEFAULT_PHONE_COUNTRY;
  const code = raw.trim().toUpperCase();
  if (!code || INVALID_GEO.has(code)) return DEFAULT_PHONE_COUNTRY;
  if (SUPPORTED.has(code)) return code as CountryCode;
  return DEFAULT_PHONE_COUNTRY;
}

export function countryFromRequestHeaders(
  headers: Headers | { get(name: string): string | null },
): CountryCode {
  const raw =
    headers.get("cf-ipcountry") ??
    headers.get("CF-IPCountry") ??
    headers.get("x-vercel-ip-country") ??
    headers.get("x-country-code");
  return normalizePhoneCountryCode(raw);
}
