import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  countryFromRequestHeaders,
  VISITOR_PHONE_COUNTRY_COOKIE,
} from "@/lib/visitor-country";

export async function GET() {
  const h = await headers();
  const country = countryFromRequestHeaders(h);
  const response = NextResponse.json({ country });
  response.cookies.set(VISITOR_PHONE_COUNTRY_COOKIE, country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
