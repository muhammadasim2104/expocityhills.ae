import {
  ingestConfigured,
  leadInbox,
  readEnv,
  shouldForwardLeadsToIngest,
  SITE_HOST,
  SITE_URL,
  supabaseConfigured,
  supabaseSecret,
  supabaseUrl,
} from "@/lib/leads/config";
import {
  buildLeadFields,
  leadNotifyHtml,
  leadNotifyText,
  sendLeadNotifyEmail,
} from "@/lib/leads/email";
import {
  hasSufficientContactInfo,
  hintsToLeadFields,
} from "@/lib/leads/funnel-field-snapshot";
import { resolveProject } from "@/lib/leads/projects";
import {
  dashboardClient,
  type AnalyticsClientContext,
} from "@/lib/leads/request-context";
import { formatTrafficChannel } from "@/lib/leads/traffic";

const partialEmailSent = new Map<string, number>();
const PARTIAL_EMAIL_DEDUPE_MS = 5 * 60_000;

export type PersistLeadInput = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  sourcePage: string;
  trafficChannel?: string | null;
  projectName?: string | null;
  projectSlug?: string | null;
  client: AnalyticsClientContext;
};

async function supabaseInsert(table: string, row: Record<string, unknown>) {
  const url = supabaseUrl();
  const key = supabaseSecret();
  if (!url || !key) {
    throw new Error("Supabase is not configured");
  }

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text.slice(0, 400) || `Supabase ${table} insert failed`);
  }
}

async function forwardIngest(path: string, body: Record<string, unknown>) {
  const base = readEnv("UPSIDES_INGEST_URL").replace(/\/$/, "");
  const key = readEnv("UPSIDES_INGEST_KEY");
  if (!base || !key) return null;

  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-upsides-ingest-key": key,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ingest ${path} failed: ${text.slice(0, 300)}`);
  }

  return response.json().catch(() => ({ ok: true }));
}

function isProdLike() {
  return (
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "production"
  );
}

export async function persistLead(input: PersistLeadInput) {
  const project = resolveProject({
    projectName: input.projectName,
    projectSlug: input.projectSlug,
  });
  const submittedAt = new Date().toISOString();
  const stamp = dashboardClient(input.client);
  const trafficChannel = formatTrafficChannel(input.trafficChannel);

  const leadMessage = [
    `Project inquiry: ${project.name}`,
    `Slug: ${project.slug}`,
    `Site: ${SITE_URL}`,
    input.sourcePage ? `Page URL: ${input.sourcePage}` : "",
    `Traffic channel: ${trafficChannel}`,
    stamp.country ? `Country: ${stamp.country}` : "",
    stamp.ip_hash ? `IP hash: ${stamp.ip_hash}` : "",
    "",
    input.message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  const ingestBody = {
    site: SITE_HOST,
    project_slug: project.slug,
    project_name: project.name,
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    message: input.message,
    source_page: input.sourcePage || SITE_URL,
    traffic_channel: trafficChannel,
    country: stamp.country,
    ip_hash: stamp.ip_hash,
    client: stamp,
  };

  const fields = buildLeadFields({
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    projectName: project.name,
    message: input.message,
    sourcePage: input.sourcePage,
    trafficChannel,
    client: input.client,
    submittedAt,
  });

  const emailContent = {
    html: leadNotifyHtml({
      headline: "New project inquiry",
      subhead: project.name,
      fields,
    }),
    text: leadNotifyText(fields),
  };

  const via: string[] = [];

  if (supabaseConfigured()) {
    try {
      await supabaseInsert("leads", {
        email: input.email,
        full_name: input.fullName,
        phone: input.phone,
        source: "contact_form",
        message: leadMessage,
        status: "new",
      });
      via.push("supabase");
    } catch (err) {
      console.error("[ech:supabase:leads]", err);
    }
  }

  if (shouldForwardLeadsToIngest()) {
    try {
      const forwarded = await forwardIngest("/leads", ingestBody);
      if (forwarded) via.push("ingest");
    } catch (err) {
      console.error("[ech:ingest:leads]", err);
    }
  }

  try {
    const emailed = await sendLeadNotifyEmail({
      to: leadInbox(),
      subject: `${project.name} - New Lead`,
      html: emailContent.html,
      text: emailContent.text,
    });
    if (!emailed.mocked) via.push("email");
  } catch (err) {
    console.error("[ech:email:leads]", err);
  }

  if (!via.length && ingestConfigured()) {
    try {
      const forwarded = await forwardIngest("/leads", ingestBody);
      if (forwarded) via.push("ingest-fallback");
    } catch (err) {
      console.error("[ech:ingest:leads:fallback]", err);
    }
  }

  if (!via.length) {
    if (!isProdLike()) {
      console.info("[ech:lead:mock] no backend configured — accepting locally", {
        email: input.email,
      });
      return { via: "mock" };
    }
    throw new Error("Could not save or email this enquiry");
  }

  try {
    await forwardIngest("/events", {
      event_name: "form_submit_success",
      form_name: "project_inquiry",
      project_slug: project.slug,
      page_path: input.sourcePage || SITE_URL,
      website: project.name,
      website_url: SITE_URL,
      site: SITE_HOST,
      country: stamp.country,
      ip_hash: stamp.ip_hash,
      client: stamp,
      metadata: {
        kind: "form_submit_success",
        site: SITE_HOST,
        website: project.name,
        website_url: SITE_URL,
      },
    });
  } catch (err) {
    console.error("[ech:ingest:events]", err);
  }

  return { via: via.join("+") };
}

function partialEmailKey(
  sessionId: string | null,
  reason: "abandon" | "error",
  email: string,
): string {
  return `${sessionId ?? "anon"}:${reason}:${email.toLowerCase()}`;
}

function shouldSendPartialEmail(key: string): boolean {
  const now = Date.now();
  const prev = partialEmailSent.get(key) ?? 0;
  if (now - prev < PARTIAL_EMAIL_DEDUPE_MS) return false;
  partialEmailSent.set(key, now);
  return true;
}

async function sendPartialLeadEmail(opts: {
  reason: "abandon" | "error";
  project: { slug: string; name: string };
  fieldHints: Record<string, string>;
  sourcePage: string;
  trafficChannel: string;
  client: AnalyticsClientContext;
  funnelSessionId?: string | null;
}) {
  if (!hasSufficientContactInfo(opts.fieldHints)) return;

  const lead = hintsToLeadFields(opts.fieldHints);
  const dedupeKey = partialEmailKey(
    opts.funnelSessionId ?? null,
    opts.reason,
    lead.email,
  );
  if (!shouldSendPartialEmail(dedupeKey)) return;

  const submittedAt = new Date().toISOString();
  const headline =
    opts.reason === "error"
      ? "Form errored — partial information captured"
      : "Form not submitted — partial lead capture";

  const fields = buildLeadFields({
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    projectName: opts.project.name,
    message: `Partial registration for ${opts.project.name}.`,
    sourcePage: opts.sourcePage,
    trafficChannel: opts.trafficChannel,
    client: opts.client,
    submittedAt,
  });

  try {
    await sendLeadNotifyEmail({
      to: leadInbox(),
      subject: `${opts.project.name} - ${headline}`,
      html: leadNotifyHtml({
        headline,
        subhead: opts.project.name,
        fields,
        footerNote:
          opts.reason === "error"
            ? "The visitor submitted the form but it failed. Follow up with the captured details."
            : "The visitor started the form but did not submit. Follow up with the captured details.",
      }),
      text: leadNotifyText(fields),
    });
  } catch (err) {
    console.error("[ech:email:partial]", err);
  }
}

export type PersistFunnelEventInput = {
  eventName: string;
  formName?: string | null;
  errorType?: string | null;
  projectSlug?: string | null;
  projectName?: string | null;
  pagePath?: string | null;
  metadata?: Record<string, unknown>;
  fieldHints?: Record<string, string>;
  client: AnalyticsClientContext;
};

export async function persistFunnelEvent(input: PersistFunnelEventInput) {
  const project = resolveProject({
    projectName: input.projectName,
    projectSlug: input.projectSlug,
  });
  const stamp = dashboardClient(input.client);
  const trafficChannel = formatTrafficChannel(
    typeof input.metadata?.traffic_channel === "string"
      ? input.metadata.traffic_channel
      : null,
  );
  const sourcePage = (input.pagePath || SITE_URL).slice(0, 500);
  const fieldHints = input.fieldHints ?? {};
  const funnelSessionId =
    typeof input.metadata?.funnel_session_id === "string"
      ? input.metadata.funnel_session_id
      : null;

  const ingestBody = {
    event_name: input.eventName,
    form_name: input.formName ?? "project_inquiry",
    error_type: input.errorType,
    project_slug: project.slug,
    page_path: sourcePage,
    website: project.name,
    website_url: SITE_URL,
    site: SITE_HOST,
    country: stamp.country,
    ip_hash: stamp.ip_hash,
    client: stamp,
    metadata: {
      ...input.metadata,
      kind: input.metadata?.kind ?? "partial_lead",
      status: input.metadata?.status ?? "draft",
      site: SITE_HOST,
      website: project.name,
      website_url: SITE_URL,
      ...(Object.keys(fieldHints).length ? { field_hints: fieldHints } : {}),
    },
  };

  if (ingestConfigured()) {
    try {
      await forwardIngest("/events", ingestBody);
    } catch (err) {
      console.error("[ech:ingest:events]", err);
    }
  }

  if (
    input.eventName === "form_abandon" ||
    input.eventName === "form_error"
  ) {
    await sendPartialLeadEmail({
      reason: input.eventName === "form_error" ? "error" : "abandon",
      project,
      fieldHints,
      sourcePage,
      trafficChannel,
      client: input.client,
      funnelSessionId,
    });
  }

  return { funnelSessionId };
}
