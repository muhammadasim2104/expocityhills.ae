"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  gallerySliderCategories,
  getGalleryImages,
  type GalleryCategory,
} from "@/lib/gallery-slider";

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ExteriorInteriorSlider() {
  const [category, setCategory] = useState<GalleryCategory>("exterior");
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const skipThumbScroll = useRef(true);

  const activeSet = getGalleryImages(category);
  const activeSlide = activeSet[activeIndex] ?? activeSet[0];
  const slideCount = activeSet.length;

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const switchCategory = (next: GalleryCategory) => {
    setCategory(next);
    setActiveIndex(0);
    skipThumbScroll.current = true;
  };

  useEffect(() => {
    if (skipThumbScroll.current) {
      skipThumbScroll.current = false;
      return;
    }
    thumbRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, category]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-label="Expo City Hills exterior, interior, and community gallery"
      className="scroll-mt-24 bg-[color-mix(in_srgb,var(--sage)_42%,var(--cream)_58%)] py-16 lg:py-24"
      tabIndex={-1}
    >
      <div className="site-container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="label-caps text-forest/70">Gallery</p>
          <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
            Explore Expo City Hills
          </h2>
        </div>

        <div className="mx-auto mt-10 flex w-fit flex-wrap justify-center gap-1 rounded-full bg-cream p-1 shadow-sm" role="tablist">
          {gallerySliderCategories.map((item) => {
            const isActive = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => switchCategory(item.id)}
                className={`min-w-[7rem] rounded-full px-5 py-2.5 text-xs font-medium tracking-[0.16em] uppercase transition-colors ${
                  isActive ? "bg-forest-dark text-white" : "bg-white text-forest hover:text-forest-dark"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-5xl" tabIndex={0}>
          <div className="group relative overflow-hidden rounded-2xl bg-forest-dark/5 shadow-[0_24px_60px_-32px_rgba(42,48,44,0.45)] sm:rounded-3xl">
            <figure className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
              <Image
                key={`${category}-${activeSlide.src}`}
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                priority={activeIndex === 0 && category === "exterior"}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 64rem"
              />
            </figure>
            {slideCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-forest-dark/55 text-white backdrop-blur-sm transition hover:bg-forest-dark/75 sm:left-5"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-forest-dark/55 text-white backdrop-blur-sm transition hover:bg-forest-dark/75 sm:right-5"
                  aria-label="Next image"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}
          </div>

          {slideCount > 1 && (
            <div className="gallery-scroll mt-4 flex gap-2.5 overflow-x-auto py-1 sm:mt-5">
              {activeSet.map((slide, index) => (
                <button
                  key={slide.src}
                  ref={(node) => {
                    thumbRefs.current[index] = node;
                  }}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show image ${index + 1} of ${slideCount}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-28 ${
                    index === activeIndex
                      ? "ring-2 ring-forest-dark ring-offset-2"
                      : "opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={slide.src} alt="" fill className="object-cover" sizes="7rem" aria-hidden />
                </button>
              ))}
            </div>
          )}

          <p className="mt-4 text-center text-xs text-forest/60 sm:text-sm">
            {activeIndex + 1} / {slideCount}
          </p>
        </div>
      </div>
    </section>
  );
}
