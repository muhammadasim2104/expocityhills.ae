import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import FaqSection from "@/components/FaqSection";
import RegisterSection from "@/components/RegisterSection";
import { Breadcrumbs } from "@/components/Sections";
import { buildings, expoDistricts, getInTouch, project } from "@/lib/data";
import { getMasterPlanFaqs } from "@/lib/faqs";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createMetadata,
  JsonLd,
} from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Expo City Hills 1 Master Plan | Expo Hills District",
  description:
    "Expo City Hills 1 master plan — two buildings (1A & 1B), ~864 homes in Expo Hills, one of five Expo City Dubai districts. Get in touch for updates.",
  path: "/master-plan",
});

const faqs = getMasterPlanFaqs();

export default function MasterPlanPage() {
  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Master Plan", path: "/master-plan" },
          ]),
          createFaqJsonLd(faqs),
        ]}
      />
      <Hero
        title="Expo City Hills 1 Master Plan"
        subtitle={`Two planned buildings within the ${project.district} district of ${project.masterPlan}.`}
        compact
        showCanvas={false}
        primaryCta={{
          label: "Register Your Interest",
          href: "#register",
        }}
        secondaryCta={{
          label: "View Expo City Hills brochure",
          href: "/brochure",
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Master Plan", path: "/master-plan" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-light text-forest sm:text-3xl">
            Expo City Hills 1 Two-Building Layout
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/70">
            Expo City Hills 1 comprises two planned sub-buildings — Expo City
            Hills 1A and Expo City Hills 1B — with an estimated {project.totalUnits}{" "}
            homes total at {project.location}. A confirmed per-building unit
            split has not been published.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {buildings.map((b) => (
              <Link
                key={b.slug}
                href={`/${b.slug}`}
                className="border border-forest/10 p-8 hover:border-accent/40"
              >
                <h3 className="font-serif text-xl text-forest">{b.name}</h3>
                <p className="mt-2 text-sm text-foreground/60">
                  {b.description}
                </p>
              </Link>
            ))}
          </div>

          <h2 className="mt-16 font-serif text-2xl font-light text-forest sm:text-3xl">
            Expo Hills Within Expo City Dubai
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/70">
            Expo Hills is one of five official districts within Expo City
            Dubai&apos;s master plan, positioned as tranquil living with open
            spaces and skyline views. The five districts are:{" "}
            {expoDistricts.join(", ")}.
          </p>
          <p className="mt-4 text-sm text-foreground/70">{getInTouch.long}</p>
        </div>
      </section>

      <FaqSection faqs={faqs} />
      <RegisterSection id="register" />
    </>
  );
}
