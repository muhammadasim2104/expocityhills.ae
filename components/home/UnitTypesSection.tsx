import { getInTouch, plannedUnitTypes, unitTypesCaveat } from "@/lib/data";

export default function UnitTypesSection() {
  return (
    <section className="border-t border-forest/10 bg-cream py-20 lg:py-28">
      <div className="site-container">
        <p className="label-caps text-gold">Unit mix</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
          Planned Unit Types
        </h2>
        <div className="mt-10 table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Unit type</th>
                <th scope="col">Status</th>
                <th scope="col">Size</th>
                <th scope="col">Starting price</th>
              </tr>
            </thead>
            <tbody>
              {plannedUnitTypes.map((unit) => (
                <tr key={unit.type}>
                  <th scope="row">{unit.label}</th>
                  <td>{unit.status}</td>
                  <td>{unit.size}</td>
                  <td>{getInTouch.short}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <blockquote className="mt-8 border-l-2 border-gold/60 pl-5 text-sm leading-relaxed text-foreground/70">
          {unitTypesCaveat}
        </blockquote>
      </div>
    </section>
  );
}
