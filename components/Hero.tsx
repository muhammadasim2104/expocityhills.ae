import Image from "next/image";
import HeroActions from "@/components/HeroActions";
import { heroImage, heroImageAlt, heroPills, project } from "@/lib/data";

type HeroProps = {
  title?: string;
  subtitle?: string;
  image?: string;
  compact?: boolean;
  exploreText?: string;
  exploreHref?: string;
  showPills?: boolean;
};

export default function Hero({
  title = project.h1,
  subtitle = project.subheading,
  image = heroImage,
  compact = false,
  exploreText = "Explore Expo City Hills",
  exploreHref = "/#about",
  showPills = !compact,
}: HeroProps) {
  return (
    <section className={`relative overflow-hidden ${compact ? "min-h-[60vh]" : "min-h-screen"}`}>
      <Image
        src={image}
        alt={heroImageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/75 via-forest-dark/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/55 via-transparent to-forest-dark/20" />

      <div
        className={`site-container relative flex flex-col ${
          compact ? "min-h-[60vh] justify-end pb-16 pt-28" : "min-h-screen justify-end pb-20 pt-32 lg:pb-28"
        }`}
      >
        <div className="w-full max-w-3xl">
          <p className="label-caps text-gold-light">{subtitle}</p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {!compact && <HeroActions exploreText={exploreText} exploreHref={exploreHref} />}
        </div>

        {showPills && (
          <div className="mt-10 grid grid-cols-2 gap-px border border-white/15 bg-white/10 sm:grid-cols-4 lg:mt-14">
            {heroPills.map((pill) => (
              <div key={pill.label} className="bg-forest-dark/40 px-4 py-5 text-center backdrop-blur-sm">
                <p className="font-serif text-xl font-light text-white sm:text-2xl">{pill.value}</p>
                <p className="mt-1 label-caps text-white/55">{pill.label}</p>
              </div>
            ))}
          </div>
        )}

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
