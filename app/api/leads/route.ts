import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { persistLead } from "@/lib/leads/pipeline";
import { parseRequestContext } from "@/lib/leads/request-context";
import { checkRateLimit, isAnyHoneypotFilled } from "@/lib/leads/rate-limit";
import { REGISTRATION_SUCCESS_MESSAGE } from "@/lib/leads/config";

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip")?.trim() ??
    "local";

  const limited = checkRateLimit(`ech-lead:${ip}`, 8, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: `Too many attempts. Retry in ${limited.retryAfterSec}s.`,
        retryAfterSec: limited.retryAfterSec,
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  if (isAnyHoneypotFilled(body.website, body.tu_hp_confirm)) {
    return NextResponse.json({ ok: true, message: REGISTRATION_SUCCESS_MESSAGE });
  }

  const fullName = String(body.name ?? body.full_name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim().slice(0, 5000);
  const sourcePage = String(body.source_page ?? body.page_url ?? body.page_path ?? "")
    .trim()
    .slice(0, 500);
  const projectName = String(body.project ?? body.project_name ?? "").trim();
  const projectSlug = String(body.project_slug ?? "").trim();
  const trafficChannel = String(body.traffic_channel ?? body.channel ?? "").trim();

  if (fullName.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!validEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid phone number with country code." },
      { status: 400 },
    );
  }

  try {
    const result = await persistLead({
      fullName,
      email,
      phone,
      message:
        message ||
        (projectName
          ? `Registration interest for ${projectName}.`
          : "Registration interest for Expo City Hills 1."),
      sourcePage: sourcePage || "https://expocityhills.ae/",
      trafficChannel: trafficChannel || null,
      projectName: projectName || null,
      projectSlug: projectSlug || null,
      client: parseRequestContext(h),
    });

    return NextResponse.json({
      ok: true,
      message: REGISTRATION_SUCCESS_MESSAGE,
      via: result.via,
    });
  } catch (err) {
    console.error("[ech:api:leads]", err);
    return NextResponse.json(
      { ok: false, message: "Could not save your registration. Please try again." },
      { status: 500 },
    );
  }
}
