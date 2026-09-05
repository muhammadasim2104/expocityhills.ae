import Image from "next/image";
import Link from "next/link";
import RegisterButton from "@/components/RegisterButton";
import { buildings, getInTouch, SUBPAGE_SLUGS, SUBPAGE_LABELS } from "@/lib/data";

export default function BuildingCards() {
  return (
    <section id="buildings" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="site-container">
        <p className="label-caps text-gold">Two buildings · one development</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
          Expo City Hills 1A and 1B
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foreground/70">
          Two planned low-rise buildings. Per-building unit counts have not been published
          separately — both 1A and 1B form a single development of approximately 864 homes
          with 1, 2, and 3-bedroom residences.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {buildings.map((building) => (
            <article
              key={building.slug}
              className="flex flex-col border border-forest/10 bg-cream"
            >
              <Link
                href={`/${building.slug}`}
                aria-label={`View ${building.name}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-forest-dark/10"
              >
                <Image
                  src={building.cardImage}
                  alt={building.cardAlt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <span className="inline-flex w-fit rounded-full border border-forest/15 bg-background px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-forest">
                  {building.status}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-light text-forest">
                  {building.name}
                </h3>
                <p className="mt-3 text-sm text-foreground/70">{building.tagline}</p>
                <p className="mt-2 text-sm text-foreground/60">{getInTouch.short}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/${building.slug}`} className="btn-editorial btn-editorial-outline btn-editorial-sm">
                    Explore {building.shortName}
                  </Link>
                  <RegisterButton
                    building={building.name}
                    className="btn-editorial btn-editorial-primary btn-editorial-sm"
                  >
                    Register Your Interest
                  </RegisterButton>
                </div>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-forest/10 pt-6 text-xs text-foreground/60">
                  {SUBPAGE_SLUGS.map((sub) => (
                    <li key={sub}>
                      <Link href={`/${building.slug}/${sub}`} className="underline hover:text-forest">
                        {SUBPAGE_LABELS[sub]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
