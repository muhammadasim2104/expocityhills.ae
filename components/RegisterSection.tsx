"use client";

import { useState, type FormEvent } from "react";

type RegisterSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  perks?: string[];
  submitLabel?: string;
  dark?: boolean;
};

export default function RegisterSection({
  id = "register",
  title = "Be Among the First to Know",
  description = "Register your interest in Expo City Hills 1 to receive updates on pricing, floor plans, payment plans, and launch events as they are released.",
  perks = [
    "Priority access to unit selection",
    "Pricing updates for registered buyers",
    "Floor plans and brochures when released",
    "Direct contact with the sales team",
  ],
  submitLabel = "Register Your Interest",
  dark = true,
}: RegisterSectionProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id={id}
      className={`py-20 lg:py-28 ${dark ? "bg-forest-dark text-accent-light" : "bg-cream"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={`label-caps ${dark ? "text-accent" : "text-accent"}`}>
              Register Your Interest
            </p>
            <h2
              className={`mt-4 font-serif text-3xl font-light sm:text-4xl ${
                dark ? "text-white" : "text-forest"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-4 text-sm leading-relaxed ${
                dark ? "text-white/60" : "text-foreground/70"
              }`}
            >
              {description}
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className={`flex items-start gap-3 text-sm ${
                    dark ? "text-white/70" : "text-foreground/70"
                  }`}
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-accent" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {submitted ? (
              <div className="border border-accent/30 bg-accent/10 p-10 text-center">
                <p className="font-serif text-2xl text-white">Thank You</p>
                <p className="mt-3 text-sm text-white/60">
                  Your interest in Expo City Hills 1 has been received. We will
                  contact you with pre-launch updates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="label-caps text-sage"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-1.5 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label-caps text-sage">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-1.5 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="label-caps text-sage">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="mt-1.5 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-editorial btn-editorial-primary w-full"
                >
                  {submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
