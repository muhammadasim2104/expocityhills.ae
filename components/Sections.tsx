import {
  amenities,
  lifestyleTiles,
  locationDistancesPrimary,
  locationDistancesSecondary,
  communityColumns,
  aboutDeveloper,
  project,
  getInTouch,
  plannedUnitTypes,
  buildings,
  expoDistricts,
} from "@/lib/data";
import Link from "next/link";

export function FactsTable() {
  const rows = [
    ["Developer", project.developer],
    ["Project Entity", project.entity],
    ["Location", project.location],
    ["District", `${project.district}, ${project.masterPlan}`],
    ["Total Units", `${project.totalUnits} (${project.totalUnitsNote})`],
    ["Project Value", `${project.projectValue} (${project.projectValueNote})`],
    ["Status", project.status],
    ["Milestone", project.milestone],
    ["Architecture", project.architecture],
    ["Payment Plan", getInTouch.short],
    ["Handover", getInTouch.short],
    ["Starting Price", getInTouch.short],
  ];

  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-b border-forest/10">
            <th className="py-4 pr-6 text-left label-caps text-sage align-top w-2/5">
              {label}
            </th>
            <td className="py-4 text-foreground/80">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PlannedUnitTypesSection() {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-light text-forest sm:text-3xl">
          Expo City Hills 1 Planned Unit Types
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/70">
          Expo City Hills 1 is planned to offer 1, 2, and 3-bedroom residences.
          These are pre-launch marketing categories — not a DLD-confirmed
          unit-type breakdown. Detailed specifications, sizes, and per-building
          availability have not yet been published.
        </p>
        <div className="mt-10 grid gap-px bg-forest/10 sm:grid-cols-3 border border-forest/10">
          {plannedUnitTypes.map((unit) => (
            <div key={unit.type} className="bg-background p-8">
              <p className="font-serif text-2xl text-forest">{unit.label}</p>
              <p className="mt-2 text-sm text-foreground/60">{unit.note}</p>
              <Link
                href="/price-list"
                className="link-arrow mt-6 text-accent"
              >
                Expo City Hills price list →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AmenitiesSection() {
  return (
    <section id="amenities" className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-caps text-accent">Amenities</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
          Designed for Wellness &amp; Community
        </h2>
        <div className="mt-12 grid gap-px bg-forest/10 sm:grid-cols-2 lg:grid-cols-4 border border-forest/10">
          {amenities.map((a) => (
            <div key={a.title} className="bg-background p-6">
              <h3 className="font-serif text-lg text-forest">{a.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tileClasses = [
  "tile-gradient-pool",
  "tile-gradient-green",
  "tile-gradient-tracks",
  "tile-gradient-eco",
];

export function LifestyleGrid() {
  return (
    <section className="border-t border-forest/10 bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-caps text-accent">Lifestyle</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest">
          Eco-Luxury Living in Expo Hills
        </h2>
        <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {lifestyleTiles.map((tile, i) => (
            <div
              key={tile.slug}
              className={`aspect-[4/5] flex items-end p-6 ${tileClasses[i]}`}
            >
              <p className="font-serif text-xl text-white">{tile.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryStrip() {
  const slides = [
    { label: "Expo City Hills 1 architectural grid render, Expo City Dubai", gradient: "hero-canvas-bg" },
    { label: "Expo City Hills low-rise building silhouette, Expo Hills district", gradient: "tile-gradient-pool" },
    { label: "Expo City Hills 1 dome reference geometry, Expo City Dubai", gradient: "tile-gradient-eco" },
    { label: "Expo City Hills green areas concept, Expo Hills district", gradient: "tile-gradient-green" },
  ];

  return (
    <section className="border-t border-forest/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-caps text-sage mb-6">Gallery</p>
        <div className="gallery-scroll flex gap-4 overflow-x-auto pb-4">
          {slides.map((slide) => (
            <div
              key={slide.label}
              className={`h-64 w-80 shrink-0 flex items-end p-6 ${slide.gradient}`}
              role="img"
              aria-label={slide.label}
            >
              <p className="text-xs text-white/60">{slide.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section id="location" className="bg-forest-dark py-16 lg:py-20 text-accent-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-caps text-accent">Location</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-white sm:text-4xl">
          Expo City Hills Location in Expo Hills District
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm leading-relaxed text-white/60">
              Expo City Hills 1 occupies a prime position within Expo City
              Dubai — at the intersection of Expo Road (E77) and Sheikh
              Mohammed Bin Zayed Road (E311), within the Expo Hills district.
            </p>
            <div className="mt-6 border border-white/10 bg-white/5 p-5 text-sm">
              <strong className="text-white">Expo City Hills 1</strong>
              <br />
              Intersection of Expo Road (E77)
              <br />
              &amp; Sheikh Mohammed Bin Zayed Road (E311)
              <br />
              Expo City Dubai, United Arab Emirates
            </div>
            <div className="mt-8 aspect-video w-full border border-white/10 bg-forest-light">
              <iframe
                title="Expo City Hills 1 location map, Expo City Dubai"
                src={`https://maps.google.com/maps?q=${project.geo.latitude},${project.geo.longitude}&z=14&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div>
            <h3 className="label-caps text-sage">Confirmed Distances</h3>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {locationDistancesPrimary.map((item) => (
                <li
                  key={item.destination}
                  className="flex justify-between py-4 text-sm"
                >
                  <span>{item.destination}</span>
                  <span className="font-serif text-lg text-accent">
                    {item.distance}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 label-caps text-sage">Additional Reference</h3>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {locationDistancesSecondary.map((item) => (
                <li
                  key={item.destination}
                  className="flex justify-between py-4 text-sm"
                >
                  <span>{item.destination}</span>
                  <span className="font-serif text-lg text-accent/80">
                    {item.distance}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-white/40">
              Additional reference distances are less precise than the primary
              confirmed figures above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section className="border-t border-forest/10 bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-light text-forest">
          Expo City Hills Community
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {communityColumns.map((col) => (
            <div key={col.title}>
              <h3 className="label-caps text-accent">{col.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutDeveloperSection() {
  return (
    <section id="about" className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-caps text-accent">About the Developer</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
          Dubai South Properties &amp; Expo City Dubai
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {aboutDeveloper.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-foreground/70">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-8 text-sm text-foreground/60">
          Expo City Dubai comprises five official districts:{" "}
          {expoDistricts.join(", ")}.
        </p>
      </div>
    </section>
  );
}

export function QuoteSection() {
  return (
    <section className="border-y border-forest/10 bg-forest py-20 text-center text-accent-light">
      <blockquote className="mx-auto max-w-3xl px-4">
        <p className="font-serif text-2xl font-light italic leading-relaxed sm:text-3xl">
          &ldquo;Tranquil living with open spaces and skyline views — Expo Hills
          brings eco-luxury residences to the heart of Expo City Dubai.&rdquo;
        </p>
      </blockquote>
    </section>
  );
}

export function BuildingsSection() {
  return (
    <section id="buildings" className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-caps text-accent">Buildings</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
          Expo City Hills 1A and 1B
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-foreground/70">
          Two planned sub-buildings within Expo City Hills 1. Per-building unit
          counts and distinguishing specifications have not been published
          separately —{" "}
          <Link href="/master-plan" className="text-accent underline-offset-2 hover:underline">
            view the Expo City Hills master plan
          </Link>
          .
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {buildings.map((b) => (
            <Link
              key={b.slug}
              href={`/${b.slug}`}
              className="group border border-forest/10 p-8 transition-colors hover:border-accent/40"
            >
              <p className="label-caps text-sage">{b.status}</p>
              <h3 className="mt-3 font-serif text-2xl text-forest group-hover:text-accent">
                {b.name}
              </h3>
              <p className="mt-3 text-sm text-foreground/60">{b.description}</p>
              <span className="link-arrow mt-6 text-accent">
                Compare Expo City Hills {b.shortName} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PriceListTable({ scope = "Expo City Hills 1" }: { scope?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-forest/10 bg-cream">
            <th className="px-4 py-3 text-left label-caps text-sage">Unit Type</th>
            <th className="px-4 py-3 text-left label-caps text-sage">Status</th>
            <th className="px-4 py-3 text-left label-caps text-sage">Price</th>
          </tr>
        </thead>
        <tbody>
          {plannedUnitTypes.map((unit) => (
            <tr key={unit.type} className="border-b border-forest/10">
              <td className="px-4 py-4">{unit.label} (planned)</td>
              <td className="px-4 py-4 text-foreground/60">Pre-Launch</td>
              <td className="px-4 py-4 text-foreground/70">
                Get in touch for current pricing and availability.
              </td>
            </tr>
          ))}
        </tbody>
        <caption className="mt-4 caption-bottom text-left text-xs text-foreground/50">
          {scope} — planned unit types only. No DLD-confirmed per-type breakdown
          or pricing published.
        </caption>
      </table>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-forest/10 bg-cream py-3">
      <ol className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 text-xs text-foreground/60 sm:px-6 lg:px-8">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span className="text-forest">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-accent">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
