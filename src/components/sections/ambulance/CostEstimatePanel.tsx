import { useId } from "react";
import { bookingFormCopy } from "@/content/ambulance";
import type { AmbulanceEstimate } from "@/lib/cost-estimator";
import { formatRupiah } from "@/lib/format";

export function CostEstimatePanel({ estimate }: { estimate: AmbulanceEstimate | null }) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="rounded-sm border border-line bg-sand p-5 sm:p-6">
      <h3 id={headingId} className="font-serif text-2xl text-forest">
        {bookingFormCopy.estimateTitle}
      </h3>

      {estimate ? (
        <>
          <dl className="mt-4 space-y-2.5 text-sm">
            {estimate.lines.map((line) => (
              <div key={line.label} className="flex justify-between gap-4">
                <dt className="text-ink-soft">{line.label}</dt>
                <dd className="shrink-0 font-medium tabular-nums text-ink">{formatRupiah(line.amount)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 border-t border-line-strong/40 pt-4">
            <span className="font-semibold text-ink">Total perkiraan</span>
            <output aria-live="polite" className="font-serif text-3xl tabular-nums text-ink">
              {formatRupiah(estimate.total)}
            </output>
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{bookingFormCopy.estimateEmpty}</p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        <strong className="font-semibold text-ink">{bookingFormCopy.estimateDisclaimerLead}</strong>{" "}
        {bookingFormCopy.estimateDisclaimer}
      </p>
    </section>
  );
}
