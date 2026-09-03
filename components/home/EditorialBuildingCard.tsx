import Image from "next/image";
import Link from "next/link";
import type { BuildingSlug } from "@/lib/data";
import { buildings, getInTouch } from "@/lib/data";

type Building = (typeof buildings)[number];

export default function EditorialBuildingCard({ building }: { building: Building }) {
  return (
    <Link href={`/${building.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
        <Image
          src={building.image}
          alt={building.imageAlt}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="mt-5 border-t border-forest/10 pt-5">
        <p className="label-caps text-foreground/45">{building.status}</p>
        <h3 className="mt-2 font-serif text-xl font-light text-forest group-hover:text-gold transition-colors">
          {building.name}
        </h3>
        <p className="mt-2 text-sm text-foreground/60">{getInTouch.short}</p>
        <span className="link-arrow mt-4 text-forest">View {building.name} →</span>
      </div>
    </Link>
  );
}
