import Link from "next/link";
import {
  PAYMENT_PLAN_CONTEXT,
  paymentPlanContextNote,
  paymentPlanDisclaimer,
  paymentPlanIntro,
} from "@/lib/payment";

export default function PaymentSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="site-container">
        <p className="label-caps text-gold">Payment structure</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
          Payment Plan — Expo City Hills 1
        </h2>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/75">
          {paymentPlanIntro}
        </p>

        <p className="mt-10 text-sm font-medium text-forest">{paymentPlanContextNote}</p>
        <div className="mt-6 table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Payment plan</th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_PLAN_CONTEXT.map((row) => (
                <tr key={row.project}>
                  <th scope="row">{row.project}</th>
                  <td>{row.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm italic text-foreground/60">{paymentPlanDisclaimer}</p>
        <p className="mt-8 text-sm text-foreground/70">
          Full payment plan details on the{" "}
          <Link href="/payment-plan" className="text-forest underline">
            Expo City Hills 1 payment plan
          </Link>{" "}
          page.
        </p>
      </div>
    </section>
  );
}
