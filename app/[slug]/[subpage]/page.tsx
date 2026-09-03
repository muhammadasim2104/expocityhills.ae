import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubpageTemplate from "@/components/SubpageTemplate";
import {
  buildings,
  getBuildingBySlug,
  isValidBuilding,
  isValidSubpage,
  SUBPAGE_LABELS,
  type SubpageSlug,
} from "@/lib/data";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string; subpage: string }> };

const META_TITLES: Record<SubpageSlug, (name: string, short: string) => string> = {
  brochure: (name) => `${name} Brochure | Fact Sheet — Expo City Dubai`,
  "floor-plans": (name) => `${name} Floor Plans | 1, 2 & 3 Bedroom Layouts`,
  "payment-plan": (name) => `${name} Payment Plan | Get In Touch`,
  "price-list": (name) => `${name} Price List | Get In Touch — Expo City Dubai`,
};

const META_DESCRIPTIONS: Record<SubpageSlug, (name: string) => string> = {
  brochure: (name) =>
    `${name} fact sheet — shared Expo City Hills 1 project facts. Get in touch for the full fact sheet.`,
  "floor-plans": (name) =>
    `${name} planned 1, 2 & 3-bedroom floor plans — drawings not yet released. Register for layout updates.`,
  "payment-plan": (name) =>
    `${name} payment plan not yet published. Get in touch for payment plan updates.`,
  "price-list": (name) =>
    `${name} planned unit types — pricing confirmed with registered buyers. Get in touch for availability.`,
};

export async function generateStaticParams() {
  return buildings.flatMap((b) =>
    (["brochure", "floor-plans", "payment-plan", "price-list"] as const).map(
      (subpage) => ({ slug: b.slug, subpage }),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subpage } = await params;
  const building = getBuildingBySlug(slug);
  if (!building || !isValidSubpage(subpage)) return {};
  return createMetadata({
    title: META_TITLES[subpage](building.name, building.shortName),
    description: META_DESCRIPTIONS[subpage](building.name),
    path: `/${building.slug}/${subpage}`,
  });
}

export default async function BuildingSubpage({ params }: Props) {
  const { slug, subpage } = await params;
  if (!isValidBuilding(slug) || !isValidSubpage(subpage)) notFound();
  const building = getBuildingBySlug(slug)!;

  return (
    <SubpageTemplate
      subpage={subpage}
      buildingSlug={building.slug}
      buildingName={building.name}
      basePath={`/${building.slug}`}
    />
  );
}
