"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import PhoneField from "@/components/PhoneField";
import { useVisitorPhoneCountry } from "@/hooks/use-visitor-phone-country";
import {
  getSourcePageForSubmit,
  getTrafficChannelForSubmit,
} from "@/lib/leads/client";
import { REGISTRATION_SUCCESS_MESSAGE } from "@/lib/leads/config";
import { recordFormError } from "@/lib/leads/funnel-client";
import { snapshotFormFieldValues } from "@/lib/leads/funnel-field-snapshot";
import { resolveProject } from "@/lib/leads/projects";
import { useFormFunnel } from "@/hooks/use-form-funnel";

const FORM_NAME = "project_inquiry";

const INPUT =
  "mt-2 w-full rounded-lg border border-forest/15 bg-cream px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

type RegistrationFormProps = {
  projectName?: string;
  submitLabel?: string;
  surface?: "modal" | "page";
  active?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
  showClose?: boolean;
  idPrefix?: string;
};

export default function RegistrationForm({
  projectName,
  submitLabel = "Register for Expo City Hills 1",
  surface = "page",
  active = true,
  onSuccess,
  onClose,
  showClose = false,
  idPrefix = "reg",
}: RegistrationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const project = resolveProject({ projectName });
  const defaultCountry = useVisitorPhoneCountry();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | undefined>("");

  const getFieldValues = () => {
    const form = formRef.current;
    const formData = form ? new FormData(form) : null;
    return {
      full_name: String(formData?.get("name") ?? "").trim(),
      email: String(formData?.get("email") ?? "").trim(),
      phone: (phone ?? "").trim(),
    };
  };

  const captureFieldHints = () =>
    snapshotFormFieldValues(getFieldValues(), { formName: FORM_NAME });

  const { markSubmitted, notifyFieldChange, flushAbandonNow } = useFormFunnel({
    formRef,
    form_name: FORM_NAME,
    project_slug: project.slug,
    project_name: project.name,
    surface,
    active: active && !submitted,
    getFieldValues,
  });

  useEffect(() => {
    setSubmitted(false);
    setSubmitting(false);
    setError(null);
    setPhone("");
  }, [projectName, active]);

  function handleClose() {
    flushAbandonNow();
    onClose?.();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const phoneValue = (phone ?? "").trim();
    const fieldHints = captureFieldHints();

    if (phoneValue.replace(/\D/g, "").length < 8) {
      setError("Please enter a valid phone number with country code.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          phone: phoneValue,
          project: project.name,
          project_slug: project.slug,
          source_page: getSourcePageForSubmit(),
          traffic_channel: getTrafficChannelForSubmit(),
          website: String(formData.get("website") ?? ""),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        recordFormError({
          form_name: FORM_NAME,
          project_slug: project.slug,
          project_name: project.name,
          error_type: response.status >= 500 ? "persist" : "validation",
          field_hints: fieldHints,
        });
        throw new Error(result.message || "Could not save your registration.");
      }

      markSubmitted();
      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save your registration.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="relative text-center">
        {showClose && onClose && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-foreground/70 hover:text-forest"
            aria-label="Close"
          >
            ✕
          </button>
        )}
        <p className="font-serif text-2xl font-light text-forest">Thank you</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/65" role="status">
          {REGISTRATION_SUCCESS_MESSAGE}
        </p>
        {showClose && onClose && (
          <button
            type="button"
            onClick={handleClose}
            className="btn-editorial btn-editorial-primary mt-8 w-full"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input
          type="text"
          id={`${idPrefix}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-name`} className="text-sm text-foreground/85">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          required
          autoComplete="name"
          disabled={submitting}
          className={INPUT}
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-phone`} className="text-sm text-foreground/85">
          Phone <span className="text-red-500">*</span>
        </label>
        <PhoneField
          id={`${idPrefix}-phone`}
          name="phone"
          value={phone}
          defaultCountry={defaultCountry}
          onChange={(next) => {
            setPhone(next);
            notifyFieldChange();
          }}
          disabled={submitting}
          required
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-email`} className="text-sm text-foreground/85">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={submitting}
          className={INPUT}
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-editorial btn-editorial-primary flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting && (
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden="true"
          />
        )}
        {submitting ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}
