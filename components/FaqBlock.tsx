type FaqBlockProps = {
  title?: string;
  faqs: { question: string; answer: string }[];
};

export default function FaqBlock({
  title = "Frequently Asked Questions",
  faqs,
}: FaqBlockProps) {
  return (
    <section className="border-t border-forest/10 bg-background py-16 lg:py-24">
      <div className="site-container">
        <h2 className="font-serif text-3xl font-light text-forest sm:text-4xl">{title}</h2>
        <dl className="mt-10 divide-y divide-forest/10 border-y border-forest/10">
          {faqs.map((faq) => (
            <div key={faq.question} className="grid gap-3 py-6 md:grid-cols-12">
              <dt className="font-medium text-forest md:col-span-5">{faq.question}</dt>
              <dd className="text-sm leading-relaxed text-foreground/70 md:col-span-7">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
