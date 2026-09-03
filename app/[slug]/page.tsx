import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Hero from "@/components/Hero";
import FaqSection from "@/components/FaqSection";
import RegisterSection from "@/components/RegisterSection";
import { Breadcrumbs, FactsTable } from "@/components/Sections";
import {
  buildings,
  getBuildingBySlug,
  getInTouch,
  project,
  SUBPAGE_SLUGS,
  SUBPAGE_LABELS,
  isValidBuilding,
} from "@/lib/data";
import { getBuildingFaqs } from "@/lib/faqs";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createMetadata,
  createRealEstateListingJsonLd,
  JsonLd,
} from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return buildings.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const building = getBuildingBySlug(slug);
  if (!building) return {};
  return createMetadata({
    title: `${building.name} | Pre-Launch — Expo City Dubai`,
    description: `${building.name} — part of Expo City Hills 1 with ~864 homes across two buildings. Get in touch for pricing and availability.`,
    path: `/${building.slug}`,
  });
}

export default async function BuildingPage({ params }: Props) {
  const { slug } = await params;
  if (!isValidBuilding(slug)) notFound();
  const building = getBuildingBySlug(slug)!;
  const faqs = getBuildingFaqs(building.name);

  return (
    <>
      <JsonLd
        data={[
          createRealEstateListingJsonLd(building.name),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: building.name, path: `/${building.slug}` },
          ]),
          createFaqJsonLd(faqs),
        ]}
      />
      <Hero
        title={`${building.name} — Expo City Dubai`}
        subtitle={building.description}
        compact
        showCanvas={false}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: building.name, path: `/${building.slug}` },
        ]}
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-light text-forest sm:text-3xl">
            What We Know About {building.name}
          </h2>
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed text-foreground/70">
              <p>
                {building.name} is part of the Expo City Hills 1 development by{" "}
                {project.developer}, currently in pre-launch / planned status.
                The overall project is estimated at {project.totalUnits} homes
                across both buildings (1A and 1B) — a confirmed per-building
                unit count for {building.name} alone has not been published.
              </p>
              <p>
                Planned unit types include 1, 2, and 3-bedroom residences
                (pre-launch marketing categories, not a DLD-confirmed breakdown).
                {getInTouch.long}
              </p>
            </div>
            <FactsTable />
          </div>

          <h2 className="mt-16 font-serif text-2xl font-light text-forest">
            {building.name} Resources
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUBPAGE_SLUGS.map((sub) => (
              <Link
                key={sub}
                href={`/${building.slug}/${sub}`}
                className="border border-forest/10 p-5 hover:border-accent/40"
              >
                <p className="label-caps text-sage">{SUBPAGE_LABELS[sub]}</p>
                <p className="mt-2 text-sm text-forest">
                  Expo City Hills {building.shortName} {SUBPAGE_LABELS[sub].toLowerCase()}
                </p>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-foreground/60">
            Compare{" "}
            <Link href="/expo-city-hills-1a" className="text-accent hover:underline">
              Expo City Hills 1A
            </Link>{" "}
            and{" "}
            <Link href="/expo-city-hills-1b" className="text-accent hover:underline">
              Expo City Hills 1B
            </Link>{" "}
            — per-building distinguishing details have not been published
            separately.
          </p>
        </div>
      </section>

      <FaqSection faqs={faqs} title={`${building.name} Frequently Asked Questions`} />
      <RegisterSection
        id="register"
        title={`Register for ${building.name} Updates`}
        description={getInTouch.long}
      />
    </>
  );
}
