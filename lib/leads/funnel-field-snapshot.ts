/** Form field snapshot for funnel typing / abandon events (dashboard analytics). */

export const BLANK_FIELD_LABEL = "blank";

const PII_FIELD_NAMES = new Set(["full_name", "name", "email", "phone"]);

const FIELD_VALUE_MAX: Record<string, number> = {
  email: 200,
  full_name: 120,
  phone: 80,
};

const IGNORED_FIELD_NAMES = new Set(["website", "tu_hp_confirm"]);

export const FORM_TRACKED_FIELDS: Record<string, readonly string[]> = {
  project_inquiry: ["full_name", "email", "phone"],
};

const FIELD_NAME_ALIASES: Record<string, string> = {
  name: "full_name",
  phoneNational: "phone",
  countryCode: "country_code",
};

function canonicalFieldName(name: string): string {
  return FIELD_NAME_ALIASES[name] ?? name;
}

function maxFieldLength(fieldName: string): number {
  return FIELD_VALUE_MAX[fieldName] ?? 120;
}

function snapshotFieldValue(fieldName: string, raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return BLANK_FIELD_LABEL;
  return trimmed.slice(0, maxFieldLength(fieldName));
}

function combinePhoneParts(raw: Record<string, unknown>): string {
  const phone = String(raw.phone ?? "").trim();
  const code = String(raw.country_code ?? raw.countryCode ?? "").trim();
  if (!phone) return "";
  if (phone.startsWith("+") || !code) return phone;
  const dial = code.startsWith("+") ? code : `+${code.replace(/[^\d]/g, "")}`;
  const national = phone.replace(/\D/g, "").replace(/^0+/, "");
  return national ? `${dial}${national}` : phone;
}

export function isTrackableFieldName(name: string): boolean {
  const trimmed = name.trim();
  if (!trimmed || IGNORED_FIELD_NAMES.has(trimmed)) return false;
  return true;
}

function aliasFieldValues(
  values: Record<string, string | undefined>,
): Record<string, string | undefined> {
  const next = { ...values };
  if (!(next.full_name ?? "").trim() && (next.name ?? "").trim()) {
    next.full_name = next.name;
  }
  const phone = combinePhoneParts({
    phone: next.phone ?? next.phoneNational ?? "",
    country_code: next.country_code ?? next.countryCode ?? "",
  });
  if (phone) next.phone = phone;
  return next;
}

export function snapshotFormFieldValues(
  values: Record<string, string | undefined>,
  opts?: { formName?: string },
): Record<string, string> {
  const formName = opts?.formName?.trim();
  const tracked = formName ? FORM_TRACKED_FIELDS[formName] : undefined;
  const aliased = aliasFieldValues(values);

  if (tracked && formName) {
    const out: Record<string, string> = {};
    for (const fieldName of tracked) {
      out[fieldName] = snapshotFieldValue(fieldName, aliased[fieldName] ?? "");
    }
    return out;
  }

  const out: Record<string, string> = {};
  for (const [name, raw] of Object.entries(aliased)) {
    if (!isTrackableFieldName(name)) continue;
    const trimmed = (raw ?? "").trim();
    if (!trimmed) continue;
    out[name] = snapshotFieldValue(name, raw ?? "");
  }
  return out;
}

function readControlValue(
  el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
): string {
  if (el instanceof HTMLSelectElement) return el.value;
  if (el instanceof HTMLTextAreaElement) return el.value;
  if (el instanceof HTMLInputElement) {
    if (el.type === "checkbox" || el.type === "radio") {
      return el.checked ? el.value || "yes" : "";
    }
    return el.value;
  }
  return "";
}

export function snapshotFormFieldHints(
  form: HTMLFormElement,
  opts?: { formName?: string },
): Record<string, string> {
  const formName = opts?.formName?.trim();
  const tracked = formName ? FORM_TRACKED_FIELDS[formName] : undefined;

  const rawByField: Record<string, string> = {};
  const elements = form.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >("input, textarea, select");

  for (const el of elements) {
    const name = el.name?.trim();
    if (!name || !isTrackableFieldName(name)) continue;
    rawByField[canonicalFieldName(name)] = readControlValue(el);
    if (name === "name" && !(rawByField.full_name ?? "").trim()) {
      rawByField.full_name = rawByField.name ?? readControlValue(el);
    }
  }

  if (tracked?.includes("phone")) {
    const combined = combinePhoneParts(rawByField);
    if (combined) rawByField.phone = combined;
  }

  if (tracked && formName) {
    const out: Record<string, string> = {};
    for (const fieldName of tracked) {
      out[fieldName] = snapshotFieldValue(fieldName, rawByField[fieldName] ?? "");
    }
    return out;
  }

  const out: Record<string, string> = {};
  for (const [name, raw] of Object.entries(rawByField)) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    out[name] = snapshotFieldValue(name, raw);
  }
  return out;
}

export function fieldHintsFromMetadata(
  metadata: Record<string, unknown> | null | undefined,
  opts?: { formName?: string | null },
): Record<string, string> {
  if (!metadata || typeof metadata !== "object") return {};
  const hints = (metadata.field_hints ?? {}) as Record<string, unknown>;
  const merged: Record<string, string | undefined> = {};

  const assign = (source: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(source)) {
      if (typeof value !== "string" && typeof value !== "number") continue;
      merged[canonicalFieldName(key)] = String(value);
    }
  };

  assign(hints);
  assign({
    name: metadata.name,
    full_name: metadata.full_name,
    email: metadata.email,
    phone: metadata.phone,
    country_code: metadata.country_code,
  });

  const phone = combinePhoneParts({ ...hints, ...metadata, ...merged });
  if (phone) merged.phone = phone;

  const out = snapshotFormFieldValues(merged, {
    formName: opts?.formName?.trim() || undefined,
  });
  const filled = Object.values(out).some(
    (value) => value && value !== BLANK_FIELD_LABEL,
  );
  return filled ? out : {};
}

export function hasSufficientContactInfo(hints: Record<string, string>): boolean {
  const name = hints.full_name ?? "";
  const email = hints.email ?? "";
  const phone = hints.phone ?? "";
  if (name === BLANK_FIELD_LABEL || name.trim().length < 2) return false;
  if (
    email === BLANK_FIELD_LABEL ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return false;
  }
  if (phone === BLANK_FIELD_LABEL || phone.replace(/\D/g, "").length < 8) return false;
  return true;
}

export function hintsToLeadFields(hints: Record<string, string>): {
  fullName: string;
  email: string;
  phone: string;
} {
  const read = (field: string) => {
    const value = hints[field];
    if (!value || value === BLANK_FIELD_LABEL) return "";
    return value.trim();
  };
  return {
    fullName: read("full_name"),
    email: read("email"),
    phone: read("phone"),
  };
}
