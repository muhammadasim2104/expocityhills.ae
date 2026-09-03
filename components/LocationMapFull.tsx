import Image from "next/image";
import { locationMap, project } from "@/lib/data";

export default function LocationMapFull() {
  return (
    <div>
      <p className="label-caps text-gold">Map</p>
      <div className="relative mt-4 aspect-[16/9] overflow-hidden bg-cream-dark ring-1 ring-forest/10">
        <iframe
          title="Expo City Hills 1 location — Expo Road and E311 intersection"
          src={`https://maps.google.com/maps?q=${project.geo.latitude},${project.geo.longitude}&z=14&output=embed`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="mt-4 text-xs text-foreground/50">
        Embedded map centred on the Expo Road (E77) and Sheikh Mohammed Bin
        Zayed Road (E311) intersection, Expo City Dubai.
      </p>
    </div>
  );
}
