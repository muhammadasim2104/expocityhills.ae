import Image from "next/image";
import { lifestyleTiles } from "@/lib/data";

export default function CommunitySection() {
  return (
    <section id="community" className="border-t border-forest/10 bg-cream py-20 lg:py-28">
      <div className="site-container">
        <p className="label-caps text-gold">Community</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
          Expo City Hills Community
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lifestyleTiles.map((tile) => (
            <figure key={tile.slug} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/75 to-transparent px-4 pb-4 pt-12 text-sm text-white">
                {tile.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
