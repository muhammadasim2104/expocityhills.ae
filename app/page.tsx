import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FaqBlock from "@/components/FaqBlock";
import AboutDeveloper from "@/components/home/AboutDeveloper";
import BuildingCards from "@/components/home/BuildingCards";
import CommunitySection from "@/components/home/CommunitySection";
import ExteriorInteriorSlider from "@/components/home/ExteriorInteriorSlider";
import LocationSection from "@/components/home/LocationSection";
import OverviewSection from "@/components/home/OverviewSection";
import PaymentSection from "@/components/home/PaymentSection";
import RegisterSection from "@/components/home/RegisterSection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import EditorialSplitSection from "@/components/home/EditorialSplitSection";
import UnitTypesSection from "@/components/home/UnitTypesSection";
import { homepageEditorialSections } from "@/lib/editorial-sections";
import { exteriorImages, interiorImages } from "@/lib/gallery-slider";
import { homeFaqs } from "@/lib/faqs";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createImageObjectJsonLd,
  createMetadata,
  createOrganizationJsonLd,
  createPlaceJsonLd,
  createRealEstateListingJsonLd,
  createWebsiteJsonLd,
  JsonLd,
} from "@/lib/metadata";
import { defaultCrumbs } from "@/lib/data";
import { hubSeo } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: hubSeo.home.title,
  description: hubSeo.home.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={createOrganizationJsonLd()} />
      <JsonLd data={createWebsiteJsonLd()} />
      <JsonLd data={createPlaceJsonLd()} />
      <JsonLd data={createRealEstateListingJsonLd()} />
      <JsonLd data={createBreadcrumbJsonLd(defaultCrumbs)} />
      <JsonLd data={createFaqJsonLd(homeFaqs)} />
      {[...exteriorImages.slice(0, 2), ...interiorImages.slice(0, 1)].map((image) => (
        <JsonLd key={image.src} data={createImageObjectJsonLd({ src: image.src, alt: image.alt })} />
      ))}

      <Hero />
      <OverviewSection />
      <EditorialSplitSection {...homepageEditorialSections[0]} />
      <EditorialSplitSection {...homepageEditorialSections[1]} />
      <BuildingCards />
      <UnitTypesSection />
      <PaymentSection />
      <EditorialSplitSection {...homepageEditorialSections[2]} />
      <AmenitiesSection />
      <LocationSection />
      <CommunitySection />
      <ExteriorInteriorSlider />
      <AboutDeveloper />
      <FaqBlock title="Expo City Hills 1 — Frequently Asked Questions" faqs={homeFaqs} />
      <RegisterSection />
    </>
  );
}
