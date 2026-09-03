import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import { project } from "@/lib/data";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  compact?: boolean;
  showCanvas?: boolean;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export default function Hero({
  eyebrow = `${project.developer} · ${project.district}, ${project.masterPlan}`,
  title,
  subtitle,
  compact = false,
  showCanvas = true,
  primaryCta = { label: "Register Your Interest", href: "/#register" },
  secondaryCta = { label: "Explore Expo City Hills", href: "/#about" },
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-forest-dark text-white ${
        compact ? "min-h-[50vh]" : "min-h-screen"
      }`}
    >
      {showCanvas && (
        <div className="absolute inset-0 lg:left-[45%]">
          <HeroCanvas />
        </div>
      )}
      {!showCanvas && (
        <div className="absolute inset-0 hero-canvas-bg" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/90 via-forest-dark/70 to-forest-dark/30 lg:via-forest-dark/50" />

      <div
        className={`relative mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:max-w-[55%] lg:px-8 ${
          compact
            ? "min-h-[50vh] justify-end pb-16 pt-28"
            : "min-h-screen justify-center pb-20 pt-32 lg:pb-28"
        }`}
      >
        <div className="max-w-xl">
          <p className="label-caps text-accent-light/80">{eyebrow}</p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
              {subtitle}
            </p>
          )}
          {!compact && (
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={primaryCta.href} className="btn-editorial btn-editorial-primary">
                {primaryCta.label}
              </Link>
              <Link href={secondaryCta.href} className="btn-editorial btn-editorial-bordered">
                {secondaryCta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
