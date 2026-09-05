import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import FactsTable from "@/components/FactsTable";
import FaqBlock from "@/components/FaqBlock";
import RegisterSection from "@/components/home/RegisterSection";
import { buildings, expoDistricts, getInTouch, project } from "@/lib/data";
import { masterPlanFaqs } from "@/lib/faqs";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createMetadata,
  createPlaceJsonLd,
  JsonLd,
} from "@/lib/metadata";
import { hubSeo } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: hubSeo.masterPlan.title,
  description: hubSeo.masterPlan.description,
  path: "/master-plan",
});

export default function MasterPlanPage() {
  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Master Plan", path: "/master-plan" },
          ]),
          createFaqJsonLd(masterPlanFaqs),
          createPlaceJsonLd(),
        ]}
      />
      <Hero
        title={hubSeo.masterPlan.h1}
        subtitle={hubSeo.masterPlan.subtitle}
        image="/assets/expo-hills-district.webp"
        compact
        showPills={false}
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="site-container">
          <h2 className="font-serif text-2xl font-light text-forest sm:text-3xl">
            Expo Hills — Tranquil Living with Open Spaces and Skyline Views
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/75">
            <p>
              Expo Hills is one of five official districts within Expo City Dubai&apos;s master plan,
              positioned at the site&apos;s northern edge with direct access from Expo Road. It is
              designed as the quieter, lower-density counterpart to Expo Downtown&apos;s cultural and
              commercial intensity — a wadi-style landscape of open space, greenery, and privacy.
            </p>
            <p>
              Designed for 35,000 residents and 40,000 professionals across 3.5 square kilometres,
              Expo City Dubai is built around the 15-minute city principle. The Expo 2020 Metro
              Station on the Red Line connects directly to Dubai Marina, Downtown Dubai, and Dubai
              International Airport.
            </p>
            <p>
              The five official districts are: {expoDistricts.join(", ")}.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl text-forest">Expo City Hills 1 layout</h3>
              <p className="mt-4 text-sm text-foreground/70">
                Expo City Hills 1 comprises two planned sub-buildings — 1A and 1B — with an
                estimated {project.totalUnits} homes at {project.location}. A confirmed per-building
                unit split has not been published.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {buildings.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/${b.slug}`}
                    className="border border-forest/10 bg-cream p-6 hover:border-gold/40"
                  >
                    <h4 className="font-serif text-lg text-forest">{b.name}</h4>
                    <p className="mt-2 text-xs text-foreground/60">{b.status}</p>
                  </Link>
                ))}
              </div>
            </div>
            <figure className="overflow-hidden border border-forest/10">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/assets/expo-hills-district.webp"
                  alt="Expo Hills district master plan context — Expo City Dubai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </figure>
          </div>

          <h2 className="mt-16 font-serif text-2xl font-light text-forest sm:text-3xl">
            Expo City Hills 1 Fact Sheet (Confirmed to Date)
          </h2>
          <div className="mt-8">
            <FactsTable />
          </div>

          <div className="mt-12 aspect-video max-w-3xl overflow-hidden border border-forest/10">
            <iframe
              title="Expo City Hills 1 location map — Expo Road and E311 intersection, Expo City Dubai"
              src={`https://maps.google.com/maps?q=${project.geo.latitude},${project.geo.longitude}&z=14&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-6 text-sm text-foreground/70">{getInTouch.long}</p>
        </div>
      </section>

      <FaqBlock faqs={masterPlanFaqs} />
      <RegisterSection />
    </>
  );
}
