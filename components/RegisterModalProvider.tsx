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
  "mt-2 w-full rounded-lg border border-white/10 bg-[#122318] px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30";

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
            className="absolute inset-0 bg-forest-dark/80 backdrop-blur-sm"
            onClick={closeRegister}
            aria-label="Close registration form"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-title"
            className="relative z-10 w-full max-w-lg border border-white/10 bg-forest-dark p-6 shadow-2xl sm:rounded-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeRegister}
              className="absolute right-4 top-4 text-white/50 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
            {submitted ? (
              <div className="py-8 text-center">
                <p className="font-serif text-2xl text-white">Thank You</p>
                <p className="mt-3 text-sm text-white/60">
                  Your interest in Expo City Hills 1
                  {options.building ? ` (${options.building})` : ""} has been
                  received. We will contact you with pre-launch updates.
                </p>
                <button
                  type="button"
                  onClick={closeRegister}
                  className="btn-editorial btn-editorial-primary mt-8"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="label-caps text-accent">Register Your Interest</p>
                <h2 id="register-title" className="mt-3 font-serif text-2xl text-white">
                  {options.building
                    ? `Register for ${options.building}`
                    : "Expo City Hills 1"}
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  Share your details for pricing, floor plans, and launch updates.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="label-caps text-sage">
                      Full Name
                    </label>
                    <input id="modal-name" name="fullName" required autoComplete="name" className={INPUT} />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="label-caps text-sage">
                      Email
                    </label>
                    <input id="modal-email" name="email" type="email" required autoComplete="email" className={INPUT} />
                  </div>
                  <div>
                    <label htmlFor="modal-phone" className="label-caps text-sage">
                      Phone
                    </label>
                    <input id="modal-phone" name="phone" type="tel" required autoComplete="tel" className={INPUT} />
                  </div>
                  <button type="submit" className="btn-editorial btn-editorial-primary w-full">
                    {options.submitLabel ?? "Register Your Interest"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </RegisterContext.Provider>
  );
}
