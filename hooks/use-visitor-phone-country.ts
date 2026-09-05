"use client";

import { useEffect, useState } from "react";
import type { CountryCode } from "libphonenumber-js";
import {
  DEFAULT_PHONE_COUNTRY,
  normalizePhoneCountryCode,
  VISITOR_PHONE_COUNTRY_COOKIE,
} from "@/lib/visitor-country";

function readCountryCookie(): CountryCode | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${VISITOR_PHONE_COUNTRY_COOKIE}=`));
  if (!match) return null;
  const value = decodeURIComponent(match.split("=").slice(1).join("="));
  return normalizePhoneCountryCode(value);
}

export function useVisitorPhoneCountry(initial?: CountryCode): CountryCode {
  const [country, setCountry] = useState<CountryCode>(
    () => initial ?? readCountryCookie() ?? DEFAULT_PHONE_COUNTRY,
  );

  useEffect(() => {
    if (initial) {
      setCountry(initial);
      return;
    }
    const fromCookie = readCountryCookie();
    if (fromCookie) {
      setCountry(fromCookie);
      return;
    }

    let cancelled = false;
    fetch("/api/geo")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { country?: string } | null) => {
        if (cancelled || !data?.country) return;
        setCountry(normalizePhoneCountryCode(data.country));
      })
      .catch(() => {
        /* keep AE */
      });

    return () => {
      cancelled = true;
    };
  }, [initial]);

  return country;
}
