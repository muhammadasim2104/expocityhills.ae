import FactsTable from "@/components/FactsTable";
import { whatWeKnowIntro } from "@/lib/data";

export default function OverviewSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="site-container">
        <p className="label-caps text-gold">Confirmed today</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
          What We Know About Expo City Hills 1 Today
        </h2>
        <p className="mt-6 max-w-4xl text-base leading-relaxed text-foreground/75">
          {whatWeKnowIntro}
        </p>
        <div className="mt-12">
          <FactsTable />
        </div>
      </div>
    </section>
  );
}
