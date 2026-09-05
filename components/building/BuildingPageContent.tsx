import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import FactsTable from "@/components/FactsTable";
import FaqBlock from "@/components/FaqBlock";
import RegisterSection from "@/components/home/RegisterSection";
import RegisterButton from "@/components/RegisterButton";
import { Breadcrumbs } from "@/components/Sections";
import {
  buildings,
  getBuildingResourceLinks,
  getInTouch,
  project,
  SUBPAGE_LABELS,
  SUBPAGE_SLUGS,
  type BuildingSlug,
} from "@/lib/data";
import { getBuildingFaqs } from "@/lib/faqs";

type Building = (typeof buildings)[number];

function SubpageLinks({ slug }: { slug: BuildingSlug }) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {getBuildingResourceLinks(slug).map((link) => (
        <Link key={link.href} href={link.href} className="btn-editorial btn-editorial-outline btn-editorial-sm">
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function BuildingPageContent({
  building,
  breadcrumbs,
}: {
  building: Building;
  breadcrumbs: { name: string; path: string }[];
}) {
  const faqs = getBuildingFaqs(building.name);

  return (
    <>
      <Hero
        title={`${building.name} — Expo City Dubai`}
        subtitle={building.description}
        image={building.image}
        compact
        showPills={false}
        exploreText="Compare Expo City Hills buildings"
        exploreHref="/#buildings"
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-background py-16 lg:py-24">
        <div className="site-container">
          <p className="label-caps text-gold">Overview</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
            What We Know About {building.name}
          </h2>
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed text-foreground/75">
              <p>
                {building.name} is part of the Expo City Hills 1 development by {project.developer},
                currently in pre-launch / planned status. The overall project is estimated at{" "}
                {project.totalUnits} homes across both buildings (1A and 1B) — a confirmed
                per-building unit count for {building.name} alone has not been published.
              </p>
              <p>
                Planned unit types include 1, 2, and 3-bedroom residences (pre-launch marketing
                categories, not a DLD-confirmed breakdown). {getInTouch.long}
              </p>
              <p className="font-medium text-forest">{getInTouch.short}</p>
              <SubpageLinks slug={building.slug} />
            </div>
            <FactsTable />
          </div>
          <div className="relative mt-12 aspect-[16/9] overflow-hidden">
            <Image
              src={building.overviewImage}
              alt={building.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-cream py-16 lg:py-24">
        <div className="site-container">
          <h2 className="font-serif text-3xl font-light text-forest">{building.name} Resources</h2>
          <p className="mt-4 max-w-2xl text-sm text-foreground/70">
            Shared project-level facts for Expo City Hills 1 — no building-specific breakdown has
            been published separately for {building.name}.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUBPAGE_SLUGS.map((sub) => (
              <Link
                key={sub}
                href={`/${building.slug}/${sub}`}
                className="border border-forest/10 bg-background p-6 transition-colors hover:border-gold/40"
              >
                <p className="label-caps text-gold">{SUBPAGE_LABELS[sub]}</p>
                <p className="mt-2 font-serif text-lg text-forest">
                  {building.shortName} {SUBPAGE_LABELS[sub]}
                </p>
              </Link>
            ))}
          </div>
          <RegisterButton building={building.name} className="btn-editorial btn-editorial-primary mt-8">
            Register Your Interest
          </RegisterButton>
        </div>
      </section>

      <FaqBlock title={`${building.name} — Frequently Asked Questions`} faqs={faqs} />
      <RegisterSection />
    </>
  );
}
