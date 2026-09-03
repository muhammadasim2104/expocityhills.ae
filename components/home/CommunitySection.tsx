import { communityIcons } from "@/components/icons/Icons";
import { communityColumns } from "@/lib/data";

export default function CommunitySection() {
  return (
    <section className="border-y border-forest/10 bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-caps text-gold">Community</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl lg:text-5xl">
          Expo City Hills Community
        </h2>
        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8 xl:gap-12">
          {communityColumns.map((column, index) => {
            const Icon = communityIcons[index];
            return (
              <div key={column.title} className={`lg:px-6 ${index > 0 ? "lg:border-l lg:border-forest/10" : ""}`}>
                <Icon className="h-12 w-12 text-gold" />
                <h3 className="mt-4 font-serif text-2xl font-light text-forest">{column.title}</h3>
                <p className="mt-2 text-sm text-foreground/55">{column.subtitle}</p>
                <ul className="mt-6 space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/75">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-forest" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
