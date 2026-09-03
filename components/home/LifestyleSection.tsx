import Image from "next/image";
import { lifestyleTiles } from "@/lib/data";

export default function LifestyleSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="label-caps text-gold">Lifestyle</p>
            <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
              Eco-Luxury in Expo Hills
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-4 lg:gap-5">
            {lifestyleTiles.map((item) => (
              <div key={item.slug} className="group relative aspect-[3/4] overflow-hidden">
                <Image src={item.image} alt={item.alt} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/20 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 label-caps text-white">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
