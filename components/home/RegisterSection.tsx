"use client";

import { useState, type FormEvent } from "react";

const INPUT =
  "mt-2 w-full rounded-lg border border-forest/15 bg-cream px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

export default function RegisterSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="register" className="scroll-mt-24 border-t border-forest/10 bg-cream py-20 lg:py-28">
      <div className="site-container">
        <div className="mx-auto max-w-xl">
          <p className="label-caps text-gold">Pre-launch registration</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
            Expo City Hills 1 Pre-Launch
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-foreground/70">
            Pricing and floor plans for Expo City Hills 1 are confirmed directly with registered
            buyers. Register below and we will walk you through current availability for your
            preferred building (1A or 1B) and unit type.
          </p>

          {submitted ? (
            <p className="mt-10 rounded-xl border border-forest/15 bg-background px-6 py-8 text-center text-sm leading-relaxed text-foreground/75">
              Your Expo City Hills 1 expert will be in touch with all the details.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="text-sm text-foreground/85">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input id="firstName" name="firstName" required autoComplete="given-name" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm text-foreground/85">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input id="lastName" name="lastName" required autoComplete="family-name" className={INPUT} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-foreground/85">
                  Email <span className="text-red-500">*</span>
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={INPUT} />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm text-foreground/85">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={INPUT} />
              </div>
              <div>
                <label htmlFor="unitType" className="text-sm text-foreground/85">
                  Preferred unit type
                </label>
                <select id="unitType" name="unitType" className={INPUT} defaultValue="">
                  <option value="" disabled>
                    Select unit type
                  </option>
                  <option value="1-bedroom">1-Bedroom</option>
                  <option value="2-bedroom">2-Bedroom</option>
                  <option value="3-bedroom">3-Bedroom</option>
                  <option value="not-decided">Not decided</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-foreground/85">
                  Message (optional)
                </label>
                <textarea id="message" name="message" rows={4} className={INPUT} />
              </div>
              <button type="submit" className="btn-editorial btn-editorial-primary w-full">
                Register for Expo City Hills 1
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
