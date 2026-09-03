import type { Metadata } from "next";
import SubpageTemplate from "@/components/SubpageTemplate";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Expo City Hills 1 Floor Plans | 1, 2 & 3 Bedroom Layouts",
  description:
    "Expo City Hills 1 planned 1, 2 & 3-bedroom floor plans — drawings not yet released. Register for Expo City Hills 1A and 1B layout updates.",
  path: "/floor-plans",
});

export default function FloorPlansPage() {
  return <SubpageTemplate subpage="floor-plans" />;
}
