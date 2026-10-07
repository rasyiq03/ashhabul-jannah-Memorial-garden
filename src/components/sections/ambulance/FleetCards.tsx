import { Check } from "lucide-react";
import { site } from "@/config/site";
import { fleet, fleetLabels } from "@/content/ambulance";
import { PrefillButton } from "@/components/forms/PrefillButton";
import { formAnchors } from "@/content/navigation";
import { PREFILL_EVENTS } from "@/lib/prefill-events";
import { formatRupiah } from "@/lib/format";

export function FleetCards() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {fleet.map((item) => {
        const tariff = site.ambulance.vehicles[item.id];
        return (
          <li key={item.id} className="flex flex-col rounded-sm border border-line bg-paper">
            <div className="border-b border-line p-6">
              <h4 className="font-serif text-2xl text-forest">{tariff.label}</h4>
              <p className="mt-2 leading-relaxed text-ink-soft">{item.summary}</p>
            </div>
            <dl className="flex flex-1 flex-col gap-5 p-6 text-[0.9375rem]">
              <div>
                <dt className="font-semibold text-ink">{fleetLabels.facilities}</dt>
                <dd>
                  <ul className="mt-2 space-y-1.5">
                    {item.facilities.map((facility) => (
                      <li key={facility} className="flex items-start gap-2.5 text-ink-soft">
                        <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-forest" strokeWidth={2} />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">{fleetLabels.capacity}</dt>
                <dd className="mt-1 text-ink-soft">{item.capacity}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">{fleetLabels.coverage}</dt>
                <dd className="mt-1 text-ink-soft">{item.coverage}</dd>
              </div>
              <div className="mt-auto border-t border-line pt-5">
                <dt className="text-sm text-ink-soft">{fleetLabels.priceFrom}</dt>
                <dd className="mt-1">
                  <span className="font-serif text-3xl tabular-nums text-ink">{formatRupiah(tariff.baseFare)}</span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    termasuk {tariff.includedKm} km pertama, lalu {formatRupiah(tariff.perKm)}/km
                  </span>
                </dd>
              </div>
            </dl>
            <div className="px-6 pb-6">
              <PrefillButton
                event={PREFILL_EVENTS.vehicle}
                value={item.id}
                formAnchorId={formAnchors.ambulance}
                className="w-full"
              >
                {fleetLabels.orderPrefix} {tariff.label.replace(/\s*\(.*\)$/, "")}
              </PrefillButton>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
