"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface AccordionEntry {
  title: string;
  body: string;
}

export function Accordion({ entries }: { entries: AccordionEntry[] }) {
  const baseId = useId();
  const [openIndexes, setOpenIndexes] = useState<ReadonlySet<number>>(() => new Set());

  function toggle(index: number) {
    setOpenIndexes((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="border-t border-line">
      {entries.map((entry, index) => {
        const isOpen = openIndexes.has(index);
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={entry.title} className="border-b border-line">
            <h3 className="font-sans">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left text-lg font-semibold leading-snug text-ink transition-colors hover:text-forest"
              >
                <span>{entry.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={cn(
                    "mt-0.5 size-5 shrink-0 text-forest transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-6 pr-8 text-ink-soft">{entry.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
