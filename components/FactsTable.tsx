import { confirmedFactsRows } from "@/lib/data";

export default function FactsTable() {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <caption>Confirmed project facts — sourced from publicly available pre-construction registration data and Expo City Dubai official district pages.</caption>
        <thead>
          <tr>
            <th scope="col">Detail</th>
            <th scope="col">Confirmed figure</th>
          </tr>
        </thead>
        <tbody>
          {confirmedFactsRows.map(([detail, figure]) => (
            <tr key={detail}>
              <th scope="row">{detail}</th>
              <td>{figure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
