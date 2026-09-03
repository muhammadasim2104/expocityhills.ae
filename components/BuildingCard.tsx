import Link from "next/link";
import type { BuildingSlug } from "@/lib/data";

type Building = {
  slug: BuildingSlug;
  name: string;
  shortName: string;
  status: string;
  description: string;
};

const gradients: Record<string, string> = {
  "expo-city-hills-1a": "tile-gradient-pool",
  "expo-city-hills-1b": "tile-gradient-green",
};

export default function BuildingCard({ building }: { building: Building }) {
  return (
    <Link href={`/${building.slug}`} className="group block">
      <div
        className={`relative aspect-[4/5] overflow-hidden ${gradients[building.slug] ?? "hero-canvas-bg"}`}
      >
        <div className="absolute inset-0 flex items-end p-6">
          <span className="font-serif text-8xl font-bold text-white/10">
            {building.shortName}
          </span>
        </div>
        <div className="absolute inset-0 border border-white/10 transition-colors group-hover:border-accent/40" />
      </div>
      <div className="mt-5 border-t border-forest/10 pt-5">
        <p className="label-caps text-sage">{building.status}</p>
        <h3 className="mt-2 font-serif text-xl font-light text-forest group-hover:text-accent transition-colors">
          {building.name}
        </h3>
        <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
          {building.description}
        </p>
        <span className="link-arrow mt-4 text-accent">
          View {building.name} →
        </span>
      </div>
    </Link>
  );
}
