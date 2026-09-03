import {
  getInTouch,
  project,
  buildings,
  plannedUnitTypes,
  type SubpageSlug,
  type BuildingSlug,
} from "./data";

export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  {
    question: "How many units will Expo City Hills 1 have?",
    answer:
      "Expo City Hills 1 is estimated to have approximately 864 homes across two buildings (1A and 1B), per publicly available pre-construction estimates. A confirmed per-building split has not been published.",
  },
  {
    question: "What unit types are planned at Expo City Hills 1?",
    answer:
      "Expo City Hills 1 is planned to offer 1, 2, and 3-bedroom residences. These are pre-launch marketing categories — not a DLD-confirmed unit-type breakdown. Detailed sizes and per-building availability have not been published yet.",
  },
  {
    question: "What is the price of Expo City Hills 1?",
    answer:
      "Pricing for Expo City Hills 1 has not been publicly released. Get in touch and we'll confirm current pricing as it's released to registered buyers.",
  },
  {
    question: "When does Expo City Hills 1 launch?",
    answer:
      "Expo City Hills 1 is currently in pre-launch. The first DLD trace was recorded in February 2026. Register your interest to be notified of the official launch date.",
  },
  {
    question: "Where exactly is Expo City Hills 1 located?",
    answer:
      "Expo City Hills 1 is located at the intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311), within the Expo Hills district of Expo City Dubai.",
  },
  {
    question: "What is Expo Hills district in Expo City Dubai?",
    answer:
      "Expo Hills is one of five official districts within Expo City Dubai's master plan, alongside Expo Downtown, Expo Business, Expo Valley, and Expo Fields. It is positioned around open spaces and skyline views.",
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
      answer: `Pricing for ${buildingName} has not been publicly released. Get in touch and we'll confirm current pricing as it's released to registered buyers.`,
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
  const scope = buildingName ?? project.name;

  const common: Record<SubpageSlug, Faq[]> = {
    brochure: [
      {
        question: `Is the ${scope} fact sheet available yet?`,
        answer: `Detailed fact sheets for ${scope} will be shared with registered buyers as official materials are released. Get in touch to register for the Expo City Hills 1 fact sheet.`,
      },
      {
        question: `What confirmed facts are in the ${scope} overview?`,
        answer: `Confirmed facts include the developer (Dubai South Properties), location in Expo Hills district, estimated ~864 homes across two buildings, pre-launch status, and planned 1, 2, and 3-bedroom unit types.`,
      },
    ],
    "floor-plans": [
      {
        question: `Have ${scope} floor plans been released?`,
        answer: `Detailed floor plan drawings for ${scope} have not been publicly released. Register your interest to receive floor plans when they become available.`,
      },
      {
        question: `What unit layouts are planned at ${scope}?`,
        answer: `${scope} is planned to offer 1, 2, and 3-bedroom layouts. Specific sizes and per-type dimensions have not been published.`,
      },
    ],
    "payment-plan": [
      {
        question: `What is the payment plan for ${scope}?`,
        answer: `The payment plan for ${scope} has not been publicly released. ${getInTouch.long}`,
      },
      {
        question: `Is there a down payment requirement for ${scope}?`,
        answer: `Down payment details for ${scope} have not been published. Get in touch for current pricing and availability as information is released.`,
      },
    ],
    "price-list": [
      {
        question: `What is the price list for ${scope}?`,
        answer: `A published price list for ${scope} is not yet available. ${getInTouch.short}`,
      },
      {
        question: `What unit types will be priced at ${scope}?`,
        answer: `${scope} is planned to offer 1, 2, and 3-bedroom residences. Pricing for each type will be confirmed directly with registered buyers.`,
      },
    ],
  };

  return common[subpage];
}

export function getMasterPlanFaqs(): Faq[] {
  return [
    {
      question: "What is the Expo City Hills 1 master plan layout?",
      answer:
        "Expo City Hills 1 comprises two planned sub-buildings (1A and 1B) with an estimated 864 homes total, set within the Expo Hills district at the intersection of Expo Road (E77) and Sheikh Mohammed Bin Zayed Road (E311).",
    },
    {
      question: "How does Expo Hills fit into Expo City Dubai?",
      answer:
        "Expo Hills is one of five official districts in Expo City Dubai's master plan, positioned around open spaces and skyline views alongside Expo Downtown, Expo Business, Expo Valley, and Expo Fields.",
    },
  ];
}

export { plannedUnitTypes };
