"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

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

const INPUT =
  "mt-2 w-full rounded-lg border border-forest/15 bg-cream px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

export default function RegisterModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [options, setOptions] = useState<RegisterOptions>({});

  const openRegister = useCallback((opts?: RegisterOptions) => {
    setOptions(opts ?? {});
    setSubmitted(false);
    setOpen(true);
  }, []);

  const closeRegister = useCallback(() => {
    setOpen(false);
    setSubmitted(false);
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <RegisterContext.Provider value={{ openRegister, closeRegister }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-forest-dark/50 backdrop-blur-sm"
            onClick={closeRegister}
            aria-label="Close registration form"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-title"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-2xl sm:mx-4"
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
              {submitted ? (
                <div className="py-4 text-center">
                  <p className="font-serif text-2xl font-light text-forest">Thank you</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/65">
                    Your Expo City Hills 1 expert will be in touch with all the details.
                  </p>
                  <button type="button" onClick={closeRegister} className="btn-editorial btn-editorial-primary mt-8 w-full">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="label-caps text-gold">Register Your Interest</p>
                  <h2 id="register-title" className="mt-4 font-serif text-2xl font-light text-forest">
                    {options.building ? `Register for ${options.building}` : "Expo City Hills 1 Pre-Launch"}
                  </h2>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
                    <div>
                      <label htmlFor="modal-name" className="text-sm">Name *</label>
                      <input id="modal-name" name="name" required autoComplete="name" className={INPUT} />
                    </div>
                    <div>
                      <label htmlFor="modal-phone" className="text-sm">Phone *</label>
                      <input id="modal-phone" name="phone" type="tel" required autoComplete="tel" className={INPUT} />
                    </div>
                    <div>
                      <label htmlFor="modal-email" className="text-sm">Email *</label>
                      <input id="modal-email" name="email" type="email" required autoComplete="email" className={INPUT} />
                    </div>
                    <button type="submit" className="btn-editorial btn-editorial-primary w-full">
                      {options.submitLabel ?? "Register for Expo City Hills 1"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </RegisterContext.Provider>
  );
}
