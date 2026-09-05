"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  snapshotFormFieldHints,
  snapshotFormFieldValues,
} from "@/lib/leads/funnel-field-snapshot";
import {
  isIgnoredFormControl,
  recordFormAbandon,
  recordFormOpen,
  recordFormStart,
  recordFormTyping,
} from "@/lib/leads/funnel-client";

type FormFunnelSurface = "modal" | "page";

type UseFormFunnelOpts = {
  formRef: RefObject<HTMLFormElement | null>;
  form_name: string;
  project_slug?: string | null;
  project_name?: string | null;
  surface?: FormFunnelSurface;
  active?: boolean;
  enableTypingLogger?: boolean;
  getFieldValues?: () => Record<string, string | undefined>;
  subscribeFieldChanges?: (notify: () => void) => () => void;
};

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (isIgnoredFormControl(target)) return false;
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  ) {
    return true;
  }
  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']"),
  );
}

const pendingAbandon = new Map<string, ReturnType<typeof setTimeout>>();
const TYPING_LOG_DEBOUNCE_MS = 1200;

function afterFormStateCommit(run: () => void) {
  queueMicrotask(run);
}

export function useFormFunnel({
  formRef,
  form_name,
  project_slug,
  project_name,
  surface = "page",
  active = true,
  enableTypingLogger = true,
  getFieldValues,
  subscribeFieldChanges,
}: UseFormFunnelOpts) {
  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const openedRef = useRef(false);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const getFieldValuesRef = useRef(getFieldValues);
  const subscribeFieldChangesRef = useRef(subscribeFieldChanges);

  getFieldValuesRef.current = getFieldValues;
  subscribeFieldChangesRef.current = subscribeFieldChanges;

  const markSubmitted = () => {
    submittedRef.current = true;
  };

  const notifyRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!active) return;
    const form = formRef.current;
    if (!form) return;

    const abandonKey = `${form_name}:${project_slug ?? ""}`;
    const pending = pendingAbandon.get(abandonKey);
    if (pending) {
      clearTimeout(pending);
      pendingAbandon.delete(abandonKey);
    }

    startedRef.current = false;
    submittedRef.current = false;
    openedRef.current = false;

    const captureHints = () => {
      const readValues = getFieldValuesRef.current;
      if (readValues) {
        return snapshotFormFieldValues(readValues(), {
          formName: form_name,
        });
      }
      return snapshotFormFieldHints(form, { formName: form_name });
    };

    const flushTypingLog = () => {
      if (!enableTypingLogger || submittedRef.current) return;
      const hints = captureHints();
      if (Object.keys(hints).length === 0) return;
      recordFormTyping({
        form_name,
        project_slug,
        project_name,
        field_hints: hints,
      });
    };

    const clearTypingTimer = () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };

    const scheduleTypingLog = () => {
      if (!enableTypingLogger) return;
      clearTypingTimer();
      typingTimerRef.current = setTimeout(() => {
        typingTimerRef.current = null;
        flushTypingLog();
      }, TYPING_LOG_DEBOUNCE_MS);
    };

    const scheduleAbandon = (delayMs = surface === "modal" ? 400 : 0) => {
      if (submittedRef.current) return;
      if (!openedRef.current && !startedRef.current) return;
      if (pendingAbandon.has(abandonKey)) return;
      const started = startedRef.current;
      const hints = enableTypingLogger ? captureHints() : {};
      const timer = setTimeout(() => {
        pendingAbandon.delete(abandonKey);
        recordFormAbandon({
          form_name,
          project_slug,
          project_name,
          started_filling: started,
          field_hints:
            Object.keys(hints).length > 0 ? hints : undefined,
        });
      }, delayMs);
      pendingAbandon.set(abandonKey, timer);
    };

    const flushOnLeave = () => {
      clearTypingTimer();
      flushTypingLog();
      scheduleAbandon();
    };

    const open = () => {
      if (openedRef.current) return;
      openedRef.current = true;
      recordFormOpen({
        form_name,
        project_slug,
        project_name,
      });
    };

    const markStarted = () => {
      if (startedRef.current || submittedRef.current) return;
      startedRef.current = true;
      recordFormStart({
        form_name,
        project_slug,
        project_name,
      });
    };

    const onFirst = (event: Event) => {
      if (startedRef.current || submittedRef.current) return;
      if (event.type === "keydown" && !isTypingTarget(event.target)) return;
      if (isIgnoredFormControl(event.target)) return;
      markStarted();
    };

    const onFieldActivity = () => {
      afterFormStateCommit(() => {
        markStarted();
        scheduleTypingLog();
      });
    };

    notifyRef.current = onFieldActivity;

    const onInput = (event: Event) => {
      onFirst(event);
      onFieldActivity();
    };

    const onFocusOut = () => {
      afterFormStateCommit(flushTypingLog);
    };

    form.addEventListener("input", onInput, true);
    form.addEventListener("change", onInput, true);
    form.addEventListener("keydown", onFirst, true);
    form.addEventListener("focusout", onFocusOut, true);

    const unsubscribeWatch = subscribeFieldChangesRef.current?.(() => {
      afterFormStateCommit(() => {
        markStarted();
        scheduleTypingLog();
      });
    });

    const onBeforeUnload = () => flushOnLeave();
    const onPageHide = () => flushOnLeave();
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flushOnLeave();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibilityChange);

    let io: IntersectionObserver | null = null;
    if (surface === "modal") {
      open();
    } else if (typeof IntersectionObserver === "function") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) open();
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(form);
    } else {
      open();
    }

    return () => {
      form.removeEventListener("input", onInput, true);
      form.removeEventListener("change", onInput, true);
      form.removeEventListener("keydown", onFirst, true);
      form.removeEventListener("focusout", onFocusOut, true);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      unsubscribeWatch?.();
      notifyRef.current = null;
      flushOnLeave();
      io?.disconnect();
    };
  }, [
    formRef,
    form_name,
    project_slug,
    project_name,
    surface,
    active,
    enableTypingLogger,
  ]);

  const flushAbandonNow = () => {
    if (submittedRef.current) return;
    if (!openedRef.current && !startedRef.current) return;

    const abandonKey = `${form_name}:${project_slug ?? ""}`;
    const pending = pendingAbandon.get(abandonKey);
    if (pending) {
      clearTimeout(pending);
      pendingAbandon.delete(abandonKey);
    }

    const readValues = getFieldValuesRef.current;
    let hints: Record<string, string> = {};
    if (readValues) {
      hints = snapshotFormFieldValues(readValues(), { formName: form_name });
    } else {
      const form = formRef.current;
      if (form) {
        hints = snapshotFormFieldHints(form, { formName: form_name });
      }
    }

    recordFormAbandon({
      form_name,
      project_slug,
      project_name,
      started_filling: startedRef.current,
      field_hints: Object.keys(hints).length > 0 ? hints : undefined,
    });
  };

  return {
    markSubmitted,
    notifyFieldChange: () => notifyRef.current?.(),
    flushAbandonNow,
  };
}
