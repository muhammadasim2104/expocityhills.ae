import RegisterButton from "@/components/RegisterButton";

export default function ContactSplit() {
  return (
    <section id="register" className="bg-background">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-forest-dark px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <p className="label-caps text-accent-light">Register Your Interest</p>
          <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">
            Expo City Hills 1 Pre-Launch
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            Pricing for Expo City Hills 1 is confirmed directly with registered
            buyers. Get in touch and we&apos;ll walk you through current
            availability for your preferred building and unit type.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <p className="max-w-sm text-center text-sm leading-relaxed text-foreground/70">
            Register for updates on pricing, floor plans, payment plans, and
            the official launch of Expo City Hills 1A and 1B.
          </p>
          <RegisterButton className="btn-editorial btn-editorial-primary mt-8">
            Register Your Interest
          </RegisterButton>
        </div>
      </div>
    </section>
  );
}
