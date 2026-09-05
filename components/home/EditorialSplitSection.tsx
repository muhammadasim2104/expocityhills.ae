import Image from "next/image";
import Link from "next/link";

export type EditorialSplitSectionProps = {
  number: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  priority?: boolean;
};

export default function EditorialSplitSection({
  number,
  title,
  subtitle,
  paragraphs,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  priority = false,
}: EditorialSplitSectionProps) {
  const textOrder =
    imagePosition === "right" ? "order-2 lg:order-1" : "order-2 lg:order-2";
  const imageOrder =
    imagePosition === "right" ? "order-1 lg:order-2" : "order-1 lg:order-1";

  return (
    <section className="my-8 grid lg:grid-cols-2 md:my-12 lg:my-16">
      <div
        className={`${textOrder} flex min-h-[28rem] flex-col justify-between px-6 py-14 sm:px-10 sm:py-16 lg:min-h-[36rem] lg:px-14 lg:py-20 xl:px-20`}
        style={{
          backgroundColor: "color-mix(in srgb, var(--sage) 24%, var(--cream))",
          backgroundImage:
            "repeating-linear-gradient(-52deg, transparent, transparent 10px, rgba(255,255,255,0.045) 10px, rgba(255,255,255,0.045) 11px)",
        }}
      >
        <p className="font-serif text-xl italic text-forest/55">{number}</p>
        <div className="mt-8 flex flex-1 flex-col justify-center lg:mt-0">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-light uppercase leading-[1.08] tracking-[0.05em] text-forest-dark">
            {title}
          </h2>
          <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-forest">
            {subtitle}
          </p>
          <div className="mt-8 space-y-5 text-sm leading-[1.75] text-foreground/75 sm:text-[0.9375rem]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-forest/15 pt-8 lg:mt-12">
          <Link href={ctaHref} className="link-arrow text-forest-dark">
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div className={`${imageOrder} relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[36rem]`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
