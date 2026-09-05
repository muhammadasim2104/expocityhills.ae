import Link from "next/link";
import { getInTouch, plannedUnitTypes } from "@/lib/data";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-forest/10 bg-cream py-3">
      <ol className="site-container flex flex-wrap gap-2 text-xs text-foreground/60">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span className="text-forest">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-forest">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PriceListTable({ scope = "Expo City Hills 1" }: { scope?: string }) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <caption>
          {scope} — planned unit types only. No DLD-confirmed per-type breakdown or pricing
          published.
        </caption>
        <thead>
          <tr>
            <th scope="col">Unit type</th>
            <th scope="col">Status</th>
            <th scope="col">Starting price</th>
          </tr>
        </thead>
        <tbody>
          {plannedUnitTypes.map((unit) => (
            <tr key={unit.type}>
              <th scope="row">{unit.label}</th>
              <td>{unit.status}</td>
              <td>{getInTouch.short}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
