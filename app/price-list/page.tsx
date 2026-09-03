import type { Metadata } from "next";
import SubpageTemplate from "@/components/SubpageTemplate";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Expo City Hills 1 Price List | Get In Touch — Expo City Dubai",
  description:
    "Expo City Hills 1 planned 1, 2 & 3-bedroom unit types — pricing confirmed with registered buyers. Get in touch for current availability.",
  path: "/price-list",
});

export default function PriceListPage() {
  return <SubpageTemplate subpage="price-list" />;
}
