"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RegisterButton from "@/components/RegisterButton";
import { buildings, getBuildingResourceLinks, getInTouch } from "@/lib/data";

export default function FeaturedShowcase() {
  const [index, setIndex] = useState(0);
  const featured = buildings[index];
  const preview = buildings[(index + 1) % buildings.length];

  return (
    <section id="buildings" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3 lg:pt-8">
            <p className="label-caps text-gold">Buildings</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-forest sm:text-4xl lg:text-[2.75rem]">
              Expo City Hills
              <br />
              1A &amp; 1B
            </h2>
            <Link href="/master-plan" className="btn-editorial btn-editorial-primary mt-8">
              View Master Plan
            </Link>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden lg:block">
              <Image src={preview.image} alt={preview.imageAlt} fill unoptimized className="object-cover" sizes="300px" />
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden lg:col-span-5">
            <Image
              key={featured.slug}
              src={featured.overviewImage}
              alt={featured.imageAlt}
              fill
              unoptimized
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>

          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <p className="label-caps text-foreground/50">{featured.status}</p>
              <h3 className="mt-3 font-serif text-2xl font-light text-forest sm:text-3xl">
                {featured.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                {featured.description}
              </p>
              <dl className="mt-6 space-y-2 border-t border-forest/10 pt-6 text-sm">
                <div className="flex justify-between">
                  <dt className="text-foreground/50">Part of</dt>
                  <dd>Expo City Hills 1 (~864 homes est.)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-foreground/50">Pricing</dt>
                  <dd className="max-w-[14rem] text-right text-forest">{getInTouch.short}</dd>
                </div>
              </dl>
              <div className="mt-8 grid grid-cols-2 gap-2">
                <Link href={`/${featured.slug}`} className="btn-editorial btn-editorial-primary btn-editorial-sm justify-center px-3">
                  Explore {featured.shortName}
                </Link>
                <RegisterButton building={featured.name} className="btn-editorial btn-editorial-primary btn-editorial-sm justify-center px-3">
                  Register Your Interest
                </RegisterButton>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                {getBuildingResourceLinks(featured.slug).map((item) => (
                  <Link key={item.href} href={item.href} className="btn-editorial btn-editorial-outline btn-editorial-xs justify-center px-1">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-forest/10 pt-6">
              <button type="button" onClick={() => setIndex((i) => (i === 0 ? 1 : 0))} className="label-caps text-foreground/50 hover:text-forest">
                ← Previous
              </button>
              <span className="text-xs text-foreground/40">{index + 1} / {buildings.length}</span>
              <button type="button" onClick={() => setIndex((i) => (i === 1 ? 0 : 1))} className="label-caps text-foreground/50 hover:text-forest">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
