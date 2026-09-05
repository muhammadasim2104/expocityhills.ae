import Image from "next/image";
import { locationDistances, locationMap, project } from "@/lib/data";

export default function LocationSection() {
  return (
    <section id="location" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="site-container">
        <p className="label-caps text-gold">Location</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
          Expo City Hills Location — Expo Hills District, Expo City Dubai
        </h2>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/75">
          Expo City Hills 1 sits at the intersection of Expo Road (E77) and Sheikh Mohammed Bin
          Zayed Road (E311) — Expo Hills district&apos;s primary access point, on the northern edge
          of Expo City Dubai.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Destination</th>
                    <th scope="col">Distance / Time</th>
                  </tr>
                </thead>
                <tbody>
                  {locationDistances.map((row) => (
                    <tr key={row.destination}>
                      <th scope="row">{row.destination}</th>
                      <td>{row.distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 aspect-video w-full overflow-hidden border border-forest/10">
              <iframe
                title="Expo City Hills 1 location map — Expo Road and E311 intersection, Expo City Dubai"
                src={`https://maps.google.com/maps?q=${project.geo.latitude},${project.geo.longitude}&z=14&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <figure className="overflow-hidden border border-forest/10">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={locationMap.src}
                alt={locationMap.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-xs text-foreground/50">
              Expo City Hills 1 — {project.geo.latitude}, {project.geo.longitude}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
