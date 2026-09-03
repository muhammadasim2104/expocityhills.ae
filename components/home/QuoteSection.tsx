export default function QuoteSection() {
  return (
    <section className="border-y border-forest/10 bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <blockquote className="font-serif text-2xl font-light leading-relaxed text-forest sm:text-3xl lg:text-4xl">
          &ldquo;Tranquil living with open spaces and skyline views — Expo Hills
          brings eco-luxury residences to the heart of Expo City Dubai.&rdquo;
        </blockquote>
        <p className="mt-6 label-caps text-foreground/50">Expo Hills District · Expo City Dubai</p>
      </div>
    </section>
  );
}
