import { amenityIcons } from "@/components/icons/Icons";
import { communityAmenities } from "@/lib/data";

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl font-light text-foreground sm:text-4xl lg:text-5xl">
          Expo City Hills Amenities
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/70">
          Confirmed amenities at Expo City Hills 1 — leisure, wellness, retail,
          and eco-friendly design throughout the community.
        </p>
        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-14 lg:grid-cols-4">
          {communityAmenities.map((amenity, index) => {
            const Icon = amenityIcons[index];
            return (
              <li key={amenity} className="flex aspect-square flex-col items-center justify-center rounded-xl bg-[#ebe8e2] px-3 py-4 sm:px-4">
                <Icon />
                <p className="mt-3 text-center text-[9px] font-medium uppercase leading-snug tracking-[0.1em] text-foreground sm:text-[10px]">
                  {amenity}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
