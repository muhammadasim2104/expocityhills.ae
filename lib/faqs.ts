import { getInTouch, project, type SubpageSlug } from "./data";

export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  {
    question: "What is Expo City Hills 1?",
    answer:
      "A pre-launch residential development by Dubai South Properties comprising two low-rise buildings (1A and 1B) with approximately 864 homes, located in the Expo Hills district of Expo City Dubai at the intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311).",
  },
  {
    question: "How many units will Expo City Hills 1 have?",
    answer:
      "Approximately 864 homes across the two buildings (1A and 1B), based on publicly available pre-construction estimates. A confirmed per-building split has not been published.",
  },
  {
    question: "What unit types are planned?",
    answer:
      "1, 2, and 3-bedroom residences are planned — these are pre-launch marketing categories confirmed by the developer. Detailed sizes and per-building availability release to registered buyers.",
  },
  {
    question: "What is the price of Expo City Hills 1?",
    answer:
      "Pricing has not been publicly released. Register your interest and pricing will be confirmed directly.",
  },
  {
    question: "When does Expo City Hills 1 launch?",
    answer:
      "The project is in pre-launch. The first DLD trace was recorded in February 2026. Register to receive the official launch notification.",
  },
  {
    question: "Where exactly is Expo City Hills 1?",
    answer:
      "At the intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311), within the Expo Hills district of Expo City Dubai — 0.7 km from Al Forsan Park and 1.0 km from Expo City's core.",
  },
  {
    question: "What is the Expo Hills district?",
    answer:
      "One of five official Expo City Dubai districts — positioned as a tranquil, lower-density residential area with open spaces and skyline views, on the northern edge of Expo City with direct Expo Road access.",
  },
  {
    question: "Is Expo City Hills 1 freehold?",
    answer:
      "Expo City Dubai is a designated freehold investment zone — foreign nationals may purchase. Confirm eligibility for this specific project at registration.",
  },
  {
    question: "What is the payment plan?",
    answer:
      "The payment plan for Expo City Hills 1 has not been publicly released. It will be confirmed directly with registered buyers.",
  },
];

export const brochureFaqs: Faq[] = [
  {
    question: "When will the Expo City Hills 1 brochure be released?",
    answer:
      "Dubai South Properties has not yet published an official brochure. The project is in pre-launch — marketing materials are expected ahead of the official sales launch. Register and we will send the brochure directly when it is released.",
  },
  {
    question: "Is there an official brochure available now?",
    answer:
      "No official brochure has been released for Expo City Hills 1. The fact sheet on this page summarises all confirmed project information available to date.",
  },
  {
    question: "What will the brochure include?",
    answer:
      "When released, the official brochure is expected to cover building specifications, floor plans, amenity details, payment plan, and pricing for Expo City Hills 1A and 1B. Register to receive it at launch.",
  },
];

export const floorPlansFaqs: Faq[] = [
  {
    question: "When will floor plans be released?",
    answer:
      "Detailed floor plan drawings for Expo City Hills 1 have not been publicly released. Register and we will share floor plans for your preferred building and unit type as they become available.",
  },
  {
    question: "What unit sizes are expected?",
    answer:
      "Specific unit sizes have not been published. Expo City Hills 1 is planned to offer 1, 2, and 3-bedroom residences — these are pre-launch marketing categories, not a DLD-confirmed breakdown.",
  },
  {
    question: "Will there be 3-bedroom apartments?",
    answer:
      "Yes — 3-bedroom residences are planned as part of the Expo City Hills 1 unit mix alongside 1 and 2-bedroom layouts. Per-building availability will be confirmed at registration.",
  },
];

export const priceListFaqs: Faq[] = [
  {
    question: "How much does Expo City Hills 1 cost?",
    answer:
      "Expo City Hills 1 pricing has not been publicly released. Get in touch for current pricing and availability as it is released to registered buyers.",
  },
  {
    question: "How do prices compare to other Expo City projects?",
    answer:
      "Expo City Dubai apartment pricing in 2026 broadly ranges from AED 1.2M to AED 4.3M depending on project and unit type. See the market context table on this page for reference points — not Expo City Hills 1 pricing.",
  },
  {
    question: "When will pricing be released?",
    answer:
      "Pricing will be confirmed directly with registered buyers as the project moves toward official launch. Register below to receive pricing the moment it is released.",
  },
];

export const paymentPlanFaqs: Faq[] = [
  {
    question: "What is the payment plan for Expo City Hills 1?",
    answer:
      "The payment plan for Expo City Hills 1 has not been publicly released. Register and we will confirm the current structure the moment it is released to registered buyers.",
  },
  {
    question: "What payment plans do comparable Expo City projects offer?",
    answer:
      "Recent Expo City Dubai launches have used structures such as 10/35/5/50 (Sky Residences), ~20/80 during construction (Sidr Residences), and standard Emaar phased plans (Terra Heights). Expo City Hills 1's own plan will differ.",
  },
  {
    question: "Is there a post-handover payment option?",
    answer:
      "Post-handover payment options for Expo City Hills 1 have not been published. Register and we will confirm the full payment structure when it is released.",
  },
];

export const masterPlanFaqs: Faq[] = [
  {
    question: "What is the Expo City Hills 1 master plan layout?",
    answer:
      "Expo City Hills 1 comprises two planned sub-buildings (1A and 1B) with an estimated 864 homes total, set within the Expo Hills district at the intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311).",
  },
  {
    question: "How does Expo Hills fit into Expo City Dubai?",
    answer:
      "Expo Hills is one of five official districts in Expo City Dubai's master plan — positioned as tranquil, lower-density residential living with open spaces and skyline views, on the northern edge of the site with direct Expo Road access.",
  },
  {
    question: "What amenities are confirmed for Expo City Hills 1?",
    answer:
      "Confirmed amenities include a leisure pool, jogging tracks, fitness centre, children's play areas, retail shops, green areas, 24/7 advanced security, and eco architecture.",
  },
];

export function getBuildingFaqs(buildingName: string): Faq[] {
  return [
    {
      question: `What is the status of ${buildingName}?`,
      answer: `${buildingName} is currently in pre-launch / planned status as part of the Expo City Hills 1 development. Detailed per-building specifications have not been published separately from the overall project.`,
    },
    {
      question: `How many units will ${buildingName} have?`,
      answer: `A confirmed per-building unit count for ${buildingName} has not been published. The overall Expo City Hills 1 development is estimated at approximately 864 homes across both buildings (1A and 1B).`,
    },
    {
      question: `What unit types are planned at ${buildingName}?`,
      answer: `${buildingName} is planned to offer 1, 2, and 3-bedroom residences as part of the Expo City Hills 1 development. These are pre-launch marketing categories — detailed sizes and per-building availability have not been published.`,
    },
    {
      question: `What is the price of ${buildingName}?`,
      answer: `Pricing for ${buildingName} has not been publicly released. ${getInTouch.short}`,
    },
    {
      question: `Where is ${buildingName} located?`,
      answer: `${buildingName} is part of Expo City Hills 1 at the intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311), within the Expo Hills district of Expo City Dubai.`,
    },
  ];
}

export function getSubpageFaqs(
  subpage: SubpageSlug,
  buildingName?: string,
): Faq[] {
  const base =
    subpage === "brochure"
      ? brochureFaqs
      : subpage === "floor-plans"
        ? floorPlansFaqs
        : subpage === "price-list"
          ? priceListFaqs
          : paymentPlanFaqs;

  if (!buildingName) return base;

  return base.map((faq) => ({
    question: faq.question.replace("Expo City Hills 1", buildingName),
    answer: faq.answer.replace(/Expo City Hills 1/g, buildingName),
  }));
}
