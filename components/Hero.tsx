import Image from "next/image";
import Link from "next/link";
import HeroActions from "@/components/HeroActions";
import { heroImage, project } from "@/lib/data";

type HeroProps = {
  title: string;
  subtitle?: string;
  image?: string;
  compact?: boolean;
  exploreText?: string;
  exploreHref?: string;
};

export default function Hero({
  title,
  subtitle,
  image = heroImage,
  compact = false,
  exploreText = "Explore Expo City Hills",
  exploreHref = "/#about",
}: HeroProps) {
  return (
    <section className={`relative overflow-hidden ${compact ? "min-h-[60vh]" : "min-h-screen"}`}>
      <Image
        src={image}
        alt={`${project.name} — ${project.district}, ${project.masterPlan}`}
        fill
        priority
        unoptimized
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/85 via-forest-dark/50 to-forest-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-forest-dark/30" />

      <div
        className={`relative mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8 ${
          compact ? "min-h-[60vh] justify-end pb-16 pt-28" : "min-h-screen justify-end pb-20 pt-32 lg:pb-28"
        }`}
      >
        <div className="max-w-2xl">
          <p className="label-caps text-accent-light">
            {project.developer} · {project.district}, {project.masterPlan}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
              {subtitle}
            </p>
          )}
          {!compact && (
            <HeroActions exploreText={exploreText} exploreHref={exploreHref} />
          )}
        </div>
        {!compact && (
          <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8">
            <p className="label-caps text-white/50">Scroll to explore</p>
            <div className="mt-2 h-10 w-px bg-white/40" />
          </div>
        )}
      </div>
    </section>
  );
}
