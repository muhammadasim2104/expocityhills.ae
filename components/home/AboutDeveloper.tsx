import { aboutDeveloper } from "@/lib/data";

export default function AboutDeveloper() {
  return (
    <section className="border-t border-forest/10 bg-background py-20 lg:py-28">
      <div className="site-container max-w-3xl">
        <p className="label-caps text-gold">Developer</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
          {aboutDeveloper.title}
        </h2>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-foreground/75">
          {aboutDeveloper.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
