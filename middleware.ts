import { NextResponse, type NextRequest } from "next/server";
import {
  countryFromRequestHeaders,
  VISITOR_PHONE_COUNTRY_COOKIE,
} from "@/lib/visitor-country";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const country = countryFromRequestHeaders(request.headers);
  response.cookies.set(VISITOR_PHONE_COUNTRY_COOKIE, country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
