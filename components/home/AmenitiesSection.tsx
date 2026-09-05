import type { ComponentType } from "react";
import { amenitiesGrouped } from "@/lib/data";
import { amenityIcons } from "@/components/icons/Icons";

export default function AmenitiesSection() {
  let iconIndex = 0;

  return (
    <section id="amenities" className="scroll-mt-24 border-t border-forest/10 bg-cream py-20 lg:py-28">
      <div className="site-container">
        <p className="label-caps text-gold">Amenities</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
          Expo City Hills Amenities
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {amenitiesGrouped.map((group) => (
            <div key={group.title}>
              <h3 className="font-serif text-2xl font-light text-forest">{group.title}</h3>
              <ul className="mt-6 space-y-4">
                {group.items.map((item) => {
                  const Icon: ComponentType<{ className?: string }> =
                    amenityIcons[iconIndex++ % amenityIcons.length];
                  return (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground/75">
                      <Icon className="h-8 w-8 shrink-0 text-forest/70" />
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
