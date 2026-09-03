import type { Faq } from "@/lib/faqs";

export default function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
}: {
  faqs: Faq[];
  title?: string;
}) {
  return (
    <section className="border-t border-forest/10 bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-light text-forest sm:text-3xl">
          {title}
        </h2>
        <dl className="mt-8 divide-y divide-forest/10 border-y border-forest/10">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="text-sm font-medium text-forest">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground/70">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
