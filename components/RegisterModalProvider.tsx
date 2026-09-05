"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import RegistrationForm from "@/components/RegistrationForm";
import { shouldSuppressOverlayDismiss } from "@/lib/phone-country-select-guard";

type RegisterOptions = {
  building?: string;
  submitLabel?: string;
};

type RegisterContextValue = {
  openRegister: (options?: RegisterOptions) => void;
  closeRegister: () => void;
};

const RegisterContext = createContext<RegisterContextValue | null>(null);

export function useRegisterModal() {
  const ctx = useContext(RegisterContext);
  if (!ctx) throw new Error("useRegisterModal must be used within RegisterModalProvider");
  return ctx;
}

export default function RegisterModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<RegisterOptions>({});
  const backdropPressedRef = useRef(false);

  const openRegister = useCallback((opts?: RegisterOptions) => {
    setOptions(opts ?? {});
    setOpen(true);
  }, []);

  const closeRegister = useCallback(() => {
    setOpen(false);
    setOptions({});
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRegister();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeRegister]);

  return (
    <RegisterContext.Provider value={{ openRegister, closeRegister }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-title"
          onMouseDown={(event) => {
            if (shouldSuppressOverlayDismiss()) {
              backdropPressedRef.current = false;
              return;
            }
            backdropPressedRef.current = event.target === event.currentTarget;
          }}
          onPointerDown={() => {
            if (shouldSuppressOverlayDismiss()) {
              backdropPressedRef.current = false;
            }
          }}
          onClick={(event) => {
            if (
              backdropPressedRef.current &&
              event.target === event.currentTarget &&
              !shouldSuppressOverlayDismiss()
            ) {
              closeRegister();
            }
            backdropPressedRef.current = false;
          }}
        >
          <div
            className="relative z-10 w-full max-w-lg overflow-y-auto rounded-2xl bg-background shadow-2xl sm:mx-4"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeRegister}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-foreground/70 hover:text-forest"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <p className="label-caps text-gold">Register Your Interest</p>
              <h2 id="register-title" className="mt-4 font-serif text-2xl font-light text-forest">
                {options.building
                  ? `Register for ${options.building}`
                  : "Expo City Hills 1 Pre-Launch"}
              </h2>
              <div className="mt-8">
                <RegistrationForm
                  projectName={options.building}
                  submitLabel={options.submitLabel ?? "Register for Expo City Hills 1"}
                  surface="modal"
                  active={open}
                  onClose={closeRegister}
                  showClose
                  idPrefix="modal"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </RegisterContext.Provider>
  );
}
