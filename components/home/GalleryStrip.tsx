"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { galleryImages } from "@/lib/data";

function chunkPairs<T>(items: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) pairs.push(items.slice(i, i + 2));
  return pairs;
}

export default function GalleryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pairs = chunkPairs(galleryImages);
  const [activePage, setActivePage] = useState(0);

  const scrollToPage = useCallback(
    (page: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const next = Math.max(0, Math.min(page, pairs.length - 1));
      container.scrollTo({ left: next * container.clientWidth, behavior: "smooth" });
      setActivePage(next);
    },
    [pairs.length],
  );

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || container.clientWidth === 0) return;
    setActivePage(Math.round(container.scrollLeft / container.clientWidth));
  }, []);

  return (
    <section className="border-y border-forest/10 bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="label-caps text-gold">Gallery</p>
            <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
              Architectural Concepts
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/65">
            Conceptual renders for Expo City Hills 1 — official marketing visuals
            will be shared with registered buyers as they are released.
          </p>
        </div>

        <div className="mt-10 lg:hidden">
          <div ref={scrollRef} onScroll={handleScroll} className="gallery-scroll flex snap-x snap-mandatory overflow-x-auto" aria-label="Expo City Hills gallery carousel">
            {pairs.map((pair, pageIndex) => (
              <div key={pageIndex} className="grid w-full shrink-0 snap-start grid-cols-2 gap-3">
                {pair.map((item) => (
                  <div key={item.src} className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
                    <Image src={item.src} alt={item.alt} fill unoptimized className="object-cover" sizes="45vw" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <button type="button" onClick={() => scrollToPage(activePage - 1)} disabled={activePage === 0} className="label-caps text-foreground/50 disabled:opacity-30">← Previous</button>
            <button type="button" onClick={() => scrollToPage(activePage + 1)} disabled={activePage >= pairs.length - 1} className="label-caps text-foreground/50 disabled:opacity-30">Next →</button>
          </div>
        </div>

        <div className="gallery-scroll mt-10 hidden gap-5 overflow-x-auto pb-2 lg:flex">
          {galleryImages.map((item) => (
            <div key={item.src} className="relative h-80 w-72 shrink-0 overflow-hidden">
              <Image src={item.src} alt={item.alt} fill unoptimized className="object-cover" sizes="288px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
