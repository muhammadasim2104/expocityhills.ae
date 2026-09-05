"use client";

import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterSection() {
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
            buyers. Register below and we will walk you through current availability.
          </p>

          <div className="mt-10">
            <RegistrationForm surface="page" />
          </div>
        </div>
      </div>
    </section>
  );
}
