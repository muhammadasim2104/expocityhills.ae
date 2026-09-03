import type { Metadata } from "next";
import SubpageTemplate from "@/components/SubpageTemplate";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Expo City Hills 1 Payment Plan | Get In Touch",
  description:
    "Expo City Hills 1 payment plan not yet published. Get in touch for current pricing and payment plan updates for registered buyers.",
  path: "/payment-plan",
});

export default function PaymentPlanPage() {
  return <SubpageTemplate subpage="payment-plan" />;
}
