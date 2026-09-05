export const hubSeo = {
  home: {
    title:
      "Expo City Hills 1 by Dubai South | Eco-Luxury Residences — Expo Hills, Expo City Dubai",
    description:
      "Expo City Hills 1 — two low-rise eco-luxury buildings (1A & 1B) in the Expo Hills district of Expo City Dubai, by Dubai South Properties. 1, 2 & 3-bed planned residences. Pre-launch. Register now.",
    h1: "Expo City Hills 1 — Eco-Luxury Residences in Expo Hills, Expo City Dubai",
  },
  brochure: {
    title: "Expo City Hills 1 Brochure | Download Official Materials — Expo City Dubai",
    description:
      "Expo City Hills 1 brochure and fact sheet — confirmed developer, location, ~864 homes, and pre-launch status. Register for official materials when released.",
    h1: "Expo City Hills 1 Brochure — Download the Official Materials",
    subtitle:
      "Dubai South Properties has not yet released an official brochure for Expo City Hills 1. Register below and we will send the brochure directly when it is released.",
  },
  floorPlans: {
    title: "Expo City Hills 1 Floor Plans | Releasing at Launch — Expo City Dubai",
    description:
      "Expo City Hills 1 floor plans — planned 1, 2, and 3-bedroom layouts releasing at launch. Register for floor plans for 1A and 1B.",
    h1: "Expo City Hills 1 Floor Plans — Releasing at Launch",
    subtitle:
      "Detailed floor plan drawings for Expo City Hills 1 have not been publicly released. Register for your preferred building and unit type.",
  },
  priceList: {
    title: "Expo City Hills 1 Price List | Pricing at Registration — Expo City Dubai",
    description:
      "Expo City Hills 1 price list — pricing confirmed directly with registered buyers. Expo City Dubai market context for 1, 2, and 3-bedroom apartments.",
    h1: "Expo City Hills 1 Price List — Pricing Confirmed at Registration",
    subtitle:
      "Expo City Hills 1 pricing has not been publicly released. Register and we will confirm current pricing as it is released to registered buyers.",
  },
  paymentPlan: {
    title: "Expo City Hills 1 Payment Plan | Structure at Registration — Expo City Dubai",
    description:
      "Expo City Hills 1 payment plan — structure confirmed directly with registered buyers. Market context from comparable Expo City Dubai launches.",
    h1: "Expo City Hills 1 Payment Plan — Structure Confirmed at Registration",
    subtitle:
      "Expo City Hills 1's payment plan has not been publicly released. Register below and we will confirm the current structure the moment it is released.",
  },
  masterPlan: {
    title: "Expo City Hills 1 Master Plan | Expo Hills District — Expo City Dubai",
    description:
      "Expo City Hills 1 master plan — Expo Hills district context, five-district Expo City Dubai layout, and confirmed project facts.",
    h1: "Expo City Hills 1 Master Plan — Expo Hills District, Expo City Dubai",
    subtitle:
      "Expo Hills is one of five official Expo City Dubai districts — tranquil, lower-density living with open spaces and skyline views.",
  },
};

export function buildingSeo(slug: string, name: string) {
  return {
    title: `${name} | Expo City Hills 1 — Expo City Dubai`,
    description: `${name} — pre-launch low-rise eco-luxury residences in Expo Hills, Expo City Dubai. Part of Expo City Hills 1 (~864 homes est.). Register for pricing and availability.`,
    h1: name,
  };
}

export function buildingSubpageSeo(
  buildingName: string,
  subpage: "brochure" | "floor-plans" | "payment-plan" | "price-list",
) {
  const labels = {
    brochure: "Brochure",
    "floor-plans": "Floor Plans",
    "payment-plan": "Payment Plan",
    "price-list": "Price List",
  };
  return {
    title: `${buildingName} ${labels[subpage]} | Expo City Hills 1 — Expo City Dubai`,
    description: `${buildingName} ${labels[subpage].toLowerCase()} — pre-launch facts, pricing, and availability for Expo City Hills 1 in Expo Hills district.`,
    h1: `${buildingName} ${labels[subpage]}`,
  };
}
