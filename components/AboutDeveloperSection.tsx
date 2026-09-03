import Image from "next/image";
import { aboutDeveloper } from "@/lib/data";

export default function AboutDeveloperSection() {
  return (
    <section id="about" className="border-y border-forest/10 bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-caps text-foreground/50">{aboutDeveloper.label}</p>
            <p className="mt-4 font-serif text-5xl font-light tracking-[0.08em] text-forest sm:text-6xl">
              {aboutDeveloper.brand}
            </p>
            <h2 className="mt-6 font-serif text-2xl font-light leading-tight text-forest sm:text-3xl">
              {aboutDeveloper.title}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/70 sm:text-[0.9375rem]">
              <p>{aboutDeveloper.intro}</p>
              {aboutDeveloper.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark ring-1 ring-forest/10">
            <Image src={aboutDeveloper.image} alt={aboutDeveloper.imageAlt} fill unoptimized className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
