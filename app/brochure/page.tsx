import type { Metadata } from "next";
import SubpageTemplate from "@/components/SubpageTemplate";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Expo City Hills 1 Brochure | Fact Sheet — Expo City Dubai",
  description:
    "Expo City Hills 1 fact sheet — confirmed developer, location, ~864 homes, and pre-launch status. Get in touch for the full fact sheet.",
  path: "/brochure",
});

export default function BrochurePage() {
  return <SubpageTemplate subpage="brochure" />;
}
