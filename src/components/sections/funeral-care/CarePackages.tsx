import { Check, Minus } from "lucide-react";
import { site } from "@/config/site";
import { carePackageFeatures, carePackages, funeralSubheadings } from "@/content/funeral-care";
import { formAnchors } from "@/content/navigation";
import { PrefillButton } from "@/components/forms/PrefillButton";
import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";
import { PREFILL_EVENTS } from "@/lib/prefill-events";

export function CarePackages() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3 lg:gap-0">
      {carePackages.map((carePackage, index) => {
        const config = site.funeralCare.packages[carePackage.id];
        const isFree = config.price === 0;
        return (
          <li
            key={carePackage.id}
            className={cn(
              "flex flex-col rounded-sm border border-line bg-paper",
              "lg:rounded-none lg:border-l-0 lg:first:rounded-l-sm lg:first:border-l lg:last:rounded-r-sm",
              index === 1 && "lg:relative lg:z-10 lg:-my-3 lg:rounded-sm lg:border-forest lg:border-l lg:shadow-[0_0_0_1px_var(--color-forest)]",
            )}
          >
            <div className="p-6 sm:p-7">
              <h4 className="font-serif text-2xl text-forest">{config.label}</h4>
              <p className="mt-4 font-serif text-4xl tabular-nums text-ink">{isFree ? funeralSubheadings.freeLabel : formatRupiah(config.price)}</p>
              <p className="mt-3 min-h-[4.5rem] leading-relaxed text-ink-soft">{carePackage.audience}</p>
            </div>
            <ul className="flex-1 space-y-3 border-t border-line p-6 text-[0.9375rem] sm:p-7">
              {carePackageFeatures.map((feature) => {
                const included = feature.includedIn.includes(carePackage.id);
                return (
                  <li key={feature.label} className={cn("flex items-start gap-3", included ? "text-ink" : "text-ink-soft")}>
                    {included ? (
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-forest" strokeWidth={2.25} />
                    ) : (
                      <Minus aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-line-strong" strokeWidth={2} />
                    )}
                    <span>
                      <span className="sr-only">{included ? "Termasuk: " : "Tidak termasuk: "}</span>
                      <span className={cn(!included && "line-through decoration-line-strong/60")}>{feature.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-4 p-6 pt-0 sm:p-7 sm:pt-0">
              {carePackage.footnote ? <p className="text-sm text-ink-soft">{carePackage.footnote}</p> : null}
              <PrefillButton
                event={PREFILL_EVENTS.carePackage}
                value={carePackage.id}
                formAnchorId={formAnchors.funeralCare}
                variant={index === 1 ? "primary" : "secondary"}
                className="w-full"
              >
                {funeralSubheadings.choosePrefix} {config.label}
              </PrefillButton>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
