import {
  formatCountryLabel,
  formatDeviceLabel,
  hashIp,
  type AnalyticsClientContext,
} from "@/lib/leads/request-context";
import { formatTrafficChannel } from "@/lib/leads/traffic";
import { resendFrom, SITE_URL } from "@/lib/leads/config";

const LOGO_URL = `${SITE_URL}/brand/logo-hills-white.png`;

type LeadField = { label: string; value: string; href?: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeHeader(value: string, maxLen = 200): string {
  return value.replace(/[\0\r\n]+/g, " ").trim().slice(0, maxLen);
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    timeZone: "Asia/Dubai",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
}

function leadFieldRows(fields: LeadField[]): string {
  return fields
    .filter((field) => field.value.trim().length > 0)
    .map((field, index) => {
      const bg = index % 2 === 0 ? "#f9f6f0" : "#ffffff";
      const valueHtml = field.href
        ? `<a href="${escapeHtml(field.href)}" style="color:#0b2118;text-decoration:underline;word-break:break-all">${escapeHtml(field.value)}</a>`
        : `<span style="color:#1a2b24;word-break:break-word">${escapeHtml(field.value)}</span>`;
      return `
        <tr>
          <td style="padding:12px 16px;background:${bg};border-bottom:1px solid #ddd4c4;width:38%;vertical-align:top;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#5c6b62;letter-spacing:0.02em">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:12px 16px;background:${bg};border-bottom:1px solid #ddd4c4;vertical-align:top;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#1a2b24">
            ${valueHtml}
          </td>
        </tr>`;
    })
    .join("");
}

export function leadNotifyHtml(opts: {
  headline: string;
  subhead?: string;
  fields: LeadField[];
  footerNote?: string;
}): string {
  const subhead = opts.subhead
    ? `<p style="margin:8px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.5;color:#efe6d4">${escapeHtml(opts.subhead)}</p>`
    : "";
  const footer =
    opts.footerNote ??
    "A sales advisor should follow up with this lead promptly.";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.headline)}</title>
</head>
<body style="margin:0;padding:0;background:#f0ebe0">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0ebe0;padding:24px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #ddd4c4">
          <tr>
            <td style="background:#0b2118;padding:28px 28px 24px;border-bottom:3px solid #c5a059">
              <a href="${escapeHtml(SITE_URL)}" style="display:inline-block;text-decoration:none">
                <img
                  src="${escapeHtml(LOGO_URL)}"
                  alt="Expo City Hills"
                  width="200"
                  height="53"
                  style="display:block;width:200px;height:auto;border:0;outline:none"
                />
              </a>
              <h1 style="margin:18px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:24px;line-height:1.25;color:#f9f6f0">
                ${escapeHtml(opts.headline)}
              </h1>
              ${subhead}
            </td>
          </tr>
          <tr>
            <td style="padding:0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${leadFieldRows(opts.fields)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;background:#f9f6f0;border-top:1px solid #ddd4c4">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.5;color:#5c6b62">
                ${escapeHtml(footer)}
              </p>
              <p style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:12px;color:#8b6f35">
                <a href="${escapeHtml(SITE_URL)}" style="color:#8b6f35;text-decoration:none">${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildLeadFields(opts: {
  fullName: string;
  email: string;
  phone: string;
  projectName: string;
  message: string;
  sourcePage: string;
  trafficChannel?: string | null;
  client: AnalyticsClientContext;
  submittedAt: string;
}): LeadField[] {
  return [
    { label: "Name", value: opts.fullName },
    { label: "Email", value: opts.email, href: `mailto:${opts.email}` },
    { label: "Phone", value: opts.phone, href: `tel:${opts.phone}` },
    { label: "Project", value: opts.projectName },
    { label: "Message", value: opts.message },
    {
      label: "Page URL",
      value: opts.sourcePage,
      href: opts.sourcePage.startsWith("http") ? opts.sourcePage : undefined,
    },
    {
      label: "Traffic channel",
      value: formatTrafficChannel(opts.trafficChannel),
    },
    { label: "IP", value: formatClientIp(opts.client) },
    { label: "Country", value: formatCountryLabel(opts.client.country) },
    { label: "Device", value: formatDeviceLabel(opts.client) },
    { label: "Timestamp", value: formatTimestamp(opts.submittedAt) },
  ];
}

function formatClientIp(client: AnalyticsClientContext): string {
  return hashIp(client.ip);
}

export function leadNotifyText(fields: LeadField[]): string {
  return fields
    .filter((field) => field.value.trim().length > 0)
    .map((field) => `${field.label}: ${field.value}`)
    .join("\n");
}

export async function sendLeadNotifyEmail(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ mocked: boolean }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = resendFrom();

  if (!apiKey) {
    console.info(
      "[ech:email:mock] RESEND_API_KEY unset — lead notify not delivered",
      { subject: sanitizeHeader(payload.subject) },
    );
    return { mocked: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sanitizeHeader(from, 320),
      to: [sanitizeHeader(payload.to, 320)],
      subject: sanitizeHeader(payload.subject),
      html: payload.html,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(errBody.slice(0, 400) || "Resend send failed");
  }

  return { mocked: false };
}
