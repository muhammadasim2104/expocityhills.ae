import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuildingPageContent from "@/components/building/BuildingPageContent";
import {
  buildings,
  getBuildingBySlug,
  isValidBuilding,
} from "@/lib/data";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createMetadata,
  createRealEstateListingJsonLd,
  JsonLd,
} from "@/lib/metadata";
import { getBuildingFaqs } from "@/lib/faqs";

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
    image: `${building.image}`,
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
      <BuildingPageContent
        building={building}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Expo City Hills 1", path: "/" },
          { name: building.name, path: `/${building.slug}` },
        ]}
      />
    </>
  );
}
