import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import FaqSection from "@/components/FaqSection";
import ContactSplit from "@/components/home/ContactSplit";
import RegisterButton from "@/components/RegisterButton";
import { Breadcrumbs, PriceListTable } from "@/components/Sections";
import { getInTouch, project, SUBPAGE_LABELS, type SubpageSlug } from "@/lib/data";
import { getSubpageFaqs } from "@/lib/faqs";
import { createBreadcrumbJsonLd, createFaqJsonLd, JsonLd } from "@/lib/metadata";
import { heroImage } from "@/lib/data";

const SUBPAGE_CONTENT: Record<
  SubpageSlug,
  {
    h1: string;
    intro: string;
    bodyTitle: string;
    body: string;
    cta: string;
    image?: string;
  }
> = {
  brochure: {
    h1: "Expo City Hills 1 — Fact Sheet",
    intro:
      "All confirmed facts about Expo City Hills 1 in one place — developer, location, unit estimate, and pre-launch status.",
    bodyTitle: "Expo City Hills 1 Confirmed Facts",
    body: `Expo City Hills 1 by ${project.developer} comprises two planned buildings (1A and 1B) with an estimated ${project.totalUnits} homes in the ${project.district} district of ${project.masterPlan}. Project value is ${project.projectValue} (${project.projectValueNote}). Status: ${project.status}. ${project.milestone}.`,
    cta: "Get The Expo City Hills 1 Fact Sheet",
    image: "/assets/gallery-2.svg",
  },
  "floor-plans": {
    h1: "Expo City Hills 1 Floor Plans",
    intro:
      "Planned 1, 2, and 3-bedroom layouts — detailed floor plan drawings have not been publicly released.",
    bodyTitle: "Expo City Hills 1A and 1B Floor Plan Status",
    body: "Detailed floor plan drawings for Expo City Hills 1 have not been released. The development is planned to offer 1, 2, and 3-bedroom residences — register to receive floor plans for your preferred building and unit type as they become available.",
    cta: "Register for Expo City Hills 1 Floor Plans",
    image: "/assets/building-1a.svg",
  },
  "payment-plan": {
    h1: "Expo City Hills 1 Payment Plan",
    intro: "Payment plan details for Expo City Hills 1 have not been publicly released.",
    bodyTitle: "Expo City Hills Payment Plan Status",
    body: getInTouch.long,
    cta: "Register for Payment Plan Updates",
  },
  "price-list": {
    h1: "Expo City Hills 1 Price List",
    intro: "Planned unit types — pricing confirmed directly with registered buyers.",
    bodyTitle: "Expo City Hills 1 Planned Unit Pricing",
    body: getInTouch.long,
    cta: "Register for Expo City Hills 1 Pricing",
  },
};

type Props = {
  subpage: SubpageSlug;
  buildingSlug?: string;
  buildingName?: string;
  basePath?: string;
};

export default function SubpageTemplate({
  subpage,
  buildingSlug,
  buildingName,
  basePath = "",
}: Props) {
  const content = SUBPAGE_CONTENT[subpage];
  const scope = buildingName ?? project.name;
  const faqs = getSubpageFaqs(subpage, buildingName);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...(buildingSlug
      ? [
          { name: project.name, path: "/" },
          { name: buildingName!, path: `/${buildingSlug}` },
          { name: SUBPAGE_LABELS[subpage], path: `${basePath}/${subpage}` },
        ]
      : [{ name: SUBPAGE_LABELS[subpage], path: `${basePath}/${subpage}` }]),
  ];

  const h1 = buildingName
    ? `${buildingName} ${SUBPAGE_LABELS[subpage]}`
    : content.h1;

  return (
    <>
      <JsonLd data={[createBreadcrumbJsonLd(breadcrumbs), createFaqJsonLd(faqs)]} />
      <Hero
        title={h1}
        subtitle={content.intro}
        image={content.image ?? heroImage}
        compact
        exploreText={buildingSlug ? `View ${buildingName}` : "Explore Expo City Hills"}
        exploreHref={buildingSlug ? `/${buildingSlug}` : "/"}
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-serif text-2xl font-light text-forest sm:text-3xl">
                {content.bodyTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                {content.body}
              </p>
              {buildingName && (
                <p className="mt-4 text-sm text-foreground/60">
                  Facts below apply to the overall Expo City Hills 1 project —
                  no building-specific breakdown has been published for{" "}
                  {buildingName} separately.
                </p>
              )}
              <RegisterButton
                building={buildingName}
                submitLabel={content.cta}
                className="btn-editorial btn-editorial-primary mt-8"
              >
                {content.cta}
              </RegisterButton>
            </div>

            {subpage === "brochure" && (
              <div className="border border-forest/10 bg-cream p-8">
                <h3 className="font-serif text-xl text-forest">Fact Sheet Contents</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                  <li>Developer: {project.developer}</li>
                  <li>Location: {project.location}</li>
                  <li>Estimated units: {project.totalUnits}</li>
                  <li>Buildings: Expo City Hills 1A &amp; 1B</li>
                  <li>Status: {project.status}</li>
                  <li>Planned unit types: 1, 2, and 3-bedroom</li>
                  <li>Project value: {project.projectValue}</li>
                </ul>
              </div>
            )}

            {subpage === "floor-plans" && (
              <div className="grid gap-4">
                <Link href="/expo-city-hills-1a/floor-plans" className="relative block aspect-[4/3] overflow-hidden">
                  <Image src="/assets/building-1a.svg" alt="Expo City Hills 1A floor plans — not yet released" fill unoptimized className="object-cover" />
                </Link>
                <Link href="/expo-city-hills-1b/floor-plans" className="relative block aspect-[4/3] overflow-hidden">
                  <Image src="/assets/building-1b.svg" alt="Expo City Hills 1B floor plans — not yet released" fill unoptimized className="object-cover" />
                </Link>
              </div>
            )}
          </div>

          {subpage === "price-list" && (
            <div className="mt-16">
              <PriceListTable scope={scope} />
            </div>
          )}

          {subpage === "payment-plan" && (
            <div className="mt-16 border border-forest/10 bg-cream p-8">
              <h3 className="font-serif text-xl text-forest">Payment Plan Status</h3>
              <p className="mt-4 text-sm text-foreground/70">{getInTouch.long}</p>
            </div>
          )}
        </div>
      </section>

      <FaqSection faqs={faqs} />
      <ContactSplit />
    </>
  );
}
