# Expo City Hills — lead routing & env

Same pipeline as [theupsides.ae](https://theupsides.ae) satellite sites (e.g. thewoodsdubai.ae).

## Where leads go

| Destination | Purpose |
|-------------|---------|
| **Email** | `LEAD_FORWARD_EMAIL` (defaults to `muhammadasim124@gmail.com`) — instant notify on each registration |
| **Dashboard** | [theupsides.ae/dashboard/login](https://theupsides.ae/dashboard/login) — all leads + form funnel (typing, abandon, submit) |
| **Supabase** | Optional direct insert if `SUPABASE_URL` + `SUPABASE_SECRET_KEY` are set (same project as theupsides) |

## Vercel env (Production)

Copy from thewoodsdubai.ae / theupsides.ae:

```bash
# Lead notifications
LEAD_FORWARD_EMAIL=muhammadasim124@gmail.com
CONTACT_INBOX=muhammadasim124@gmail.com
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Expo City Hills <onboarding@resend.dev>"

# Forward to theupsides dashboard ingest (recommended)
UPSIDES_INGEST_URL=https://theupsides.ae/api/ingest
UPSIDES_INGEST_KEY=<same key as other satellite sites>

# Optional — same Supabase as theupsides (if not using ingest only)
SUPABASE_URL=
SUPABASE_SECRET_KEY=

NEXT_PUBLIC_SITE_URL=https://expocityhills.ae
```

## Dashboard login

Set on **theupsides.ae** Vercel project (not this site):

- `DASHBOARD_USERNAME` — defaults to `asim`
- `DASHBOARD_PASSWORD` — required in production

Login: https://theupsides.ae/dashboard/login

See `DASHBOARD.md` in the-upsides repo for full details.

## Form behaviour

- Phone field includes **country code** (default UAE +971), submitted as E.164 (`+971501234567`)
- **Submit loader** while posting to `/api/leads`
- Success: *Thank you. Our sales advisor for Expo City Hills will be in touch shortly.*
- **Partial typing** — debounced `form_typing` events to `/api/analytics/event`; incomplete forms trigger email alert when name + email + phone are filled but user abandons

## Local dev

Without env vars, submissions succeed locally (mock) but are not emailed. Set `UPSIDES_INGEST_*` to test full pipeline against theupsides staging/preview if needed.
