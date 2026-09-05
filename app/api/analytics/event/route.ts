import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { fieldHintsFromMetadata } from "@/lib/leads/funnel-field-snapshot";
import { persistFunnelEvent } from "@/lib/leads/pipeline";
import { parseRequestContext } from "@/lib/leads/request-context";
import { checkRateLimit } from "@/lib/leads/rate-limit";

const CLIENT_EVENT_NAMES = new Set([
  "form_open",
  "form_start",
  "form_typing",
  "form_abandon",
  "form_error",
  "form_submit_success",
]);

export async function POST(request: Request) {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip")?.trim() ??
    "local";

  const limited = checkRateLimit(`ech-analytics:${ip}`, 60, 60_000);
  if (!limited.ok) {
    return new NextResponse(null, { status: 204 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const eventName = String(body.event_name ?? "").trim();
  if (!CLIENT_EVENT_NAMES.has(eventName)) {
    return NextResponse.json({ ok: false, message: "Unknown event" }, { status: 400 });
  }

  const formName = typeof body.form_name === "string" ? body.form_name : null;
  const metadata =
    body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)
      ? (body.metadata as Record<string, unknown>)
      : {};

  const fieldHints = fieldHintsFromMetadata(metadata, { formName });

  try {
    await persistFunnelEvent({
      eventName,
      formName,
      errorType: typeof body.error_type === "string" ? body.error_type : null,
      projectSlug: typeof body.project_slug === "string" ? body.project_slug : null,
      projectName: typeof body.project_name === "string" ? body.project_name : null,
      pagePath: typeof body.page_path === "string" ? body.page_path : null,
      metadata,
      fieldHints,
      client: parseRequestContext(h),
    });
  } catch (err) {
    console.error("[ech:analytics:event]", err);
  }

  return new NextResponse(null, { status: 204 });
}
