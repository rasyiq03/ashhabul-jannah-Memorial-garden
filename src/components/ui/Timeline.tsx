import type { CSSProperties } from "react";
import type { IconComponent } from "@/components/icons/types";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { cn } from "@/lib/cn";

export interface TimelineStep {
  title: string;
  body: string;
  meta?: string;
  icon?: IconComponent;
}

interface TimelineProps {
  steps: TimelineStep[];
  orientation: "horizontal" | "vertical";
  label: string;
  className?: string;
}

const revealOrder = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

/**
 * Urutan langkah bernomor. Horizontal dipakai untuk alur singkat (ambulans),
 * vertikal untuk tahapan yang perlu penjelasan lebih panjang (pemulasaraan).
 */
export function Timeline({ steps, orientation, label, className }: TimelineProps) {
  if (orientation === "horizontal") {
    return (
      <RevealGroup className={className}>
        <ol aria-label={label} className="grid gap-8 md:grid-cols-4 md:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} data-reveal style={revealOrder(index)} className="relative md:pt-10">
              <div aria-hidden="true" className="absolute left-0 right-0 top-4 hidden h-px bg-line md:block" />
              <div className="flex items-baseline gap-4 md:block">
                <span
                  aria-hidden="true"
                  className="relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-gold bg-cream font-serif text-lg text-gold-ink md:absolute md:top-0"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-ink md:mt-4">
                    <span className="sr-only">Langkah {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </RevealGroup>
    );
  }

  return (
    <RevealGroup className={className}>
      <ol aria-label={label} className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;
          return (
            <li
              key={step.title}
              data-reveal
              style={revealOrder(index)}
              className={cn("relative grid grid-cols-[3rem_1fr] gap-x-5 sm:grid-cols-[3.5rem_1fr] sm:gap-x-8", !isLast && "pb-12")}
            >
              {!isLast ? (
                <div aria-hidden="true" className="absolute bottom-0 left-6 top-14 w-px bg-sage sm:left-7 sm:top-16" />
              ) : null}
              <div className="flex size-12 items-center justify-center rounded-sm border border-forest/25 bg-paper text-forest sm:size-14">
                {Icon ? <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 sm:size-7" /> : index + 1}
              </div>
              <div className="pt-1">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-serif text-2xl text-forest sm:text-3xl">
                    <span className="sr-only">Tahap {index + 1}: </span>
                    {step.title}
                  </h3>
                  {step.meta ? <p className="text-sm font-medium text-gold-ink">{step.meta}</p> : null}
                </div>
                <p className="mt-3 max-w-prose leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </RevealGroup>
  );
}
