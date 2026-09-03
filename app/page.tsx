import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import BuildingCard from "@/components/BuildingCard";
import FaqSection from "@/components/FaqSection";
import RegisterSection from "@/components/RegisterSection";
import {
  AboutDeveloperSection,
  AmenitiesSection,
  CommunitySection,
  FactsTable,
  GalleryStrip,
  LifestyleGrid,
  LocationSection,
  PlannedUnitTypesSection,
  QuoteSection,
} from "@/components/Sections";
import { buildings, getInTouch, project, siteConfig } from "@/lib/data";
import { homeFaqs } from "@/lib/faqs";
import {
  createMetadata,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createOrganizationJsonLd,
  createPlaceJsonLd,
  createRealEstateListingJsonLd,
  createWebsiteJsonLd,
  JsonLd,
} from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          createWebsiteJsonLd(),
          createPlaceJsonLd(),
          createRealEstateListingJsonLd(),
          createOrganizationJsonLd(),
          createBreadcrumbJsonLd([{ name: "Home", path: "/" }]),
          createFaqJsonLd(homeFaqs),
        ]}
      />
      <Hero
        title="Expo City Hills 1 — Expo Hills District, Expo City Dubai"
        subtitle="Low-rise eco-luxury residences by Dubai South Properties at the intersection of Expo Road and Sheikh Mohammed Bin Zayed Road."
      />
      <StatsBar />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-light text-forest sm:text-4xl">
            What We Know About Expo City Hills 1 Today
          </h2>
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <p className="text-sm leading-relaxed text-foreground/70">
              Expo City Hills 1 is a pre-launch residential development by{" "}
              {project.developer}, comprising two buildings (1A and 1B) with an
              estimated {project.totalUnits} homes at the intersection of Expo
              Road (E77) and Sheikh Mohammed Bin Zayed Road (E311), within the{" "}
              {project.district} district of {project.masterPlan}. Pricing,
              payment plan, and handover details are confirmed directly with
              registered buyers — get in touch below.
            </p>
            <FactsTable />
          </div>
        </div>
      </section>

      <PlannedUnitTypesSection />

      <section id="buildings" className="border-t border-forest/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="label-caps text-accent">Buildings</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
            Expo City Hills 1A and 1B
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-foreground/70">
            Two planned sub-buildings within Expo City Hills 1. Per-building unit
            counts have not been published separately.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {buildings.map((b) => (
              <BuildingCard key={b.slug} building={b} />
            ))}
          </div>
        </div>
      </section>

      <LifestyleGrid />
      <GalleryStrip />
      <AmenitiesSection />
      <LocationSection />
      <CommunitySection />
      <AboutDeveloperSection />
      <QuoteSection />
      <FaqSection faqs={homeFaqs} />
      <RegisterSection
        description={`${getInTouch.long} Register below to receive pre-launch updates.`}
      />
    </>
  );
}
