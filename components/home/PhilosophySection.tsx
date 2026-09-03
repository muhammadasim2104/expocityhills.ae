import Image from "next/image";
import Link from "next/link";
import { philosophy, stats } from "@/lib/data";

export default function PhilosophySection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden bg-forest-dark">
            <Image
              src="/assets/gallery-2.svg"
              alt="Expo City Hills 1 two-building master plan concept, Expo Hills district"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="label-caps text-gold">{philosophy.label}</p>
            <h2 className="mt-4 whitespace-pre-line font-serif text-3xl font-light leading-tight text-forest sm:text-4xl lg:text-5xl">
              {philosophy.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/75">
              {philosophy.body}
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-forest/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl text-forest lg:text-3xl">{stat.value}</p>
                  <p className="mt-1 label-caps text-foreground/50">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link href="/#about" className="link-arrow mt-10 text-forest">
              What We Know About Expo City Hills 1
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
