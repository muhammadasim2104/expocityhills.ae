import Link from "next/link";
import Hero from "@/components/Hero";
import FactsTable from "@/components/FactsTable";
import FaqBlock from "@/components/FaqBlock";
import RegisterSection from "@/components/home/RegisterSection";
import {
  getInTouch,
  plannedUnitTypes,
  project,
  SUBPAGE_LABELS,
  unitTypesCaveat,
  type SubpageSlug,
} from "@/lib/data";
import {
  brochureFaqs,
  floorPlansFaqs,
  getSubpageFaqs,
  paymentPlanFaqs,
  priceListFaqs,
} from "@/lib/faqs";
import {
  EXPO_CITY_PRICE_CONTEXT,
  PAYMENT_PLAN_CONTEXT,
  paymentPlanContextNote,
  paymentPlanDisclaimer,
  paymentPlanIntro,
  priceContextDisclaimer,
  priceContextIntro,
} from "@/lib/payment";
import { createBreadcrumbJsonLd, createFaqJsonLd, JsonLd } from "@/lib/metadata";
import { hubSeo } from "@/lib/seo";

const SUBPAGE_SEO: Record<SubpageSlug, { h1: string; intro: string }> = {
  brochure: { h1: hubSeo.brochure.h1, intro: hubSeo.brochure.subtitle },
  "floor-plans": { h1: hubSeo.floorPlans.h1, intro: hubSeo.floorPlans.subtitle },
  "payment-plan": { h1: hubSeo.paymentPlan.h1, intro: hubSeo.paymentPlan.subtitle },
  "price-list": { h1: hubSeo.priceList.h1, intro: hubSeo.priceList.subtitle },
};

const SUBPAGE_FAQS: Record<SubpageSlug, typeof brochureFaqs> = {
  brochure: brochureFaqs,
  "floor-plans": floorPlansFaqs,
  "payment-plan": paymentPlanFaqs,
  "price-list": priceListFaqs,
};

type Props = {
  subpage: SubpageSlug;
  buildingSlug?: string;
  buildingName?: string;
  basePath?: string;
};

function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-forest/10 bg-cream py-3">
      <ol className="site-container flex flex-wrap gap-2 text-xs text-foreground/60">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span className="text-forest">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-forest">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function SubpageTemplate({
  subpage,
  buildingSlug,
  buildingName,
  basePath = "",
}: Props) {
  const seo = SUBPAGE_SEO[subpage];
  const faqs = buildingName ? getSubpageFaqs(subpage, buildingName) : SUBPAGE_FAQS[subpage];
  const h1 = buildingName ? `${buildingName} ${SUBPAGE_LABELS[subpage]}` : seo.h1;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...(buildingSlug && buildingName
      ? [
          { name: project.name, path: "/" },
          { name: buildingName, path: `/${buildingSlug}` },
          { name: SUBPAGE_LABELS[subpage], path: `${basePath}/${subpage}` },
        ]
      : [{ name: SUBPAGE_LABELS[subpage], path: `${basePath}/${subpage}` }]),
  ];

  return (
    <>
      <JsonLd data={[createBreadcrumbJsonLd(breadcrumbs), createFaqJsonLd(faqs)]} />
      <Hero title={h1} subtitle={seo.intro} compact showPills={false} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-background py-16 lg:py-24">
        <div className="site-container">
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/75">{seo.intro}</p>
          {buildingName && (
            <p className="mt-4 max-w-3xl text-sm text-foreground/60">
              Facts below apply to the overall Expo City Hills 1 project — no building-specific
              breakdown has been published for {buildingName} separately.
            </p>
          )}

          {subpage === "brochure" && (
            <>
              <h2 className="mt-16 font-serif text-2xl font-light text-forest sm:text-3xl">
                Expo City Hills 1 Fact Sheet (Confirmed to Date)
              </h2>
              <div className="mt-8">
                <FactsTable />
              </div>
            </>
          )}

          {subpage === "floor-plans" && (
            <>
              <h2 className="mt-16 font-serif text-2xl font-light text-forest sm:text-3xl">
                Planned Unit Types
              </h2>
              <div className="mt-8 table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th scope="col">Unit type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plannedUnitTypes.map((unit) => (
                      <tr key={unit.type}>
                        <th scope="row">{unit.label}</th>
                        <td>{unit.status}</td>
                        <td>{unit.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm text-foreground/70">{unitTypesCaveat}</p>
              <h3 className="mt-12 font-serif text-xl text-forest">Comparable Expo City releases</h3>
              <p className="mt-4 text-sm text-foreground/70">
                Sky Residences, Terra Heights, and Sidr Residences at Expo City Dubai have released
                floor plans at or ahead of official sales launch. Expo City Hills 1 floor plans will
                follow the same pattern — register to receive them for your preferred building.
              </p>
            </>
          )}

          {subpage === "price-list" && (
            <>
              <h2 className="mt-16 font-serif text-2xl font-light text-forest sm:text-3xl">
                Expo City Dubai Price Context — What to Expect
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75">
                {priceContextIntro}
              </p>
              <div className="mt-8 table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th scope="col">Project</th>
                      <th scope="col">Unit type</th>
                      <th scope="col">Starting price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXPO_CITY_PRICE_CONTEXT.map((row) => (
                      <tr key={`${row.project}-${row.unitType}`}>
                        <th scope="row">{row.project}</th>
                        <td>{row.unitType}</td>
                        <td>{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm italic text-foreground/60">{priceContextDisclaimer}</p>
              <h3 className="mt-12 font-serif text-xl text-forest">Expo City Hills 1 pricing</h3>
              <p className="mt-4 text-sm text-foreground/70">{getInTouch.short}</p>
            </>
          )}

          {subpage === "payment-plan" && (
            <>
              <p className="mt-8 max-w-3xl text-sm leading-relaxed text-foreground/75">
                {paymentPlanIntro}
              </p>
              <p className="mt-8 text-sm font-medium text-forest">{paymentPlanContextNote}</p>
              <div className="mt-6 table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th scope="col">Project</th>
                      <th scope="col">Payment plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAYMENT_PLAN_CONTEXT.map((row) => (
                      <tr key={row.project}>
                        <th scope="row">{row.project}</th>
                        <td>{row.plan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm italic text-foreground/60">{paymentPlanDisclaimer}</p>
            </>
          )}

          {!buildingSlug && (
            <div className="mt-16">
              <h3 className="font-serif text-xl text-forest">Building pages</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/75">
                <li>
                  <Link href="/expo-city-hills-1a/brochure" className="text-forest underline">
                    Expo City Hills 1A resources
                  </Link>
                </li>
                <li>
                  <Link href="/expo-city-hills-1b/brochure" className="text-forest underline">
                    Expo City Hills 1B resources
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      <FaqBlock faqs={faqs} />
      <RegisterSection />
    </>
  );
}
