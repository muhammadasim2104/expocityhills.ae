import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeaturedShowcase from "@/components/home/FeaturedShowcase";
import PhilosophySection from "@/components/home/PhilosophySection";
import LifestyleSection from "@/components/home/LifestyleSection";
import GalleryStrip from "@/components/home/GalleryStrip";
import DestinationsSection from "@/components/home/DestinationsSection";
import CommunitySection from "@/components/home/CommunitySection";
import AboutDeveloperSection from "@/components/AboutDeveloperSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import QuoteSection from "@/components/home/QuoteSection";
import ContactSplit from "@/components/home/ContactSplit";
import FaqSection from "@/components/FaqSection";
import EditorialBuildingCard from "@/components/home/EditorialBuildingCard";
import { FactsTable, PlannedUnitTypesSection } from "@/components/Sections";
import { buildings, project, siteConfig } from "@/lib/data";
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
        subtitle={project.tagline}
      />
      <FeaturedShowcase />
      <PhilosophySection />
      <LifestyleSection />
      <GalleryStrip />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="label-caps text-gold">What We Know</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
            What We Know About Expo City Hills 1 Today
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
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

      <section className="border-t border-forest/10 bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="label-caps text-gold">Buildings</p>
            <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
              Expo City Hills 1A and 1B
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              Two planned sub-buildings — per-building unit counts have not been
              published separately. Compare Expo City Hills 1A and 1B below.
            </p>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-14">
            {buildings.map((b) => (
              <EditorialBuildingCard key={b.slug} building={b} />
            ))}
          </div>
        </div>
      </section>

      <AmenitiesSection />
      <DestinationsSection />
      <CommunitySection />
      <AboutDeveloperSection />
      <QuoteSection />
      <FaqSection faqs={homeFaqs} title="Expo City Hills 1 Frequently Asked Questions" />
      <ContactSplit />
    </>
  );
}
