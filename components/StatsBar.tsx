import { stats } from "@/lib/data";

export default function StatsBar() {
  return (
    <section className="border-y border-white/10 bg-forest-dark text-accent-light">
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-6 py-10 text-center ${
              i < stats.length - 1 ? "sm:border-r sm:border-white/10" : ""
            }`}
          >
            <p className="font-serif text-3xl font-semibold text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 label-caps text-sage">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
