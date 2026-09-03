import LocationMapFull from "@/components/LocationMapFull";
import { proximityIcons } from "@/components/icons/Icons";
import {
  locationDistancesPrimary,
  locationDistancesSecondary,
  locationNote,
} from "@/lib/data";

export default function DestinationsSection() {
  return (
    <section id="location" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="label-caps text-gold">Location</p>
            <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
              Expo City Hills Location in Expo Hills District
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-foreground/70">{locationNote}</p>
          </div>
          <div>
            <p className="label-caps text-gold">Confirmed Distances</p>
            <ul className="mt-4 divide-y divide-forest/10 border-y border-forest/10">
              {locationDistancesPrimary.map((loc, index) => {
                const Icon = proximityIcons[index];
                return (
                  <li key={loc.destination} className="flex items-center gap-4 py-5">
                    <Icon className="h-10 w-10 shrink-0 text-gold sm:h-12 sm:w-12" />
                    <span className="flex-1 text-sm text-foreground/80">{loc.destination}</span>
                    <span className="label-caps shrink-0 text-gold">{loc.distance}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-forest/10 pt-16">
          <p className="label-caps text-gold">Additional Reference</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/60">
            The following distance is a secondary reference — less precise than
            the confirmed figures above.
          </p>
          <ul className="mt-6 divide-y divide-forest/10 border-y border-forest/10">
            {locationDistancesSecondary.map((loc) => (
              <li key={loc.destination} className="flex justify-between py-4 text-sm">
                <span className="text-foreground/80">{loc.destination}</span>
                <span className="label-caps text-gold">{loc.distance}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <LocationMapFull />
        </div>
      </div>
    </section>
  );
}
