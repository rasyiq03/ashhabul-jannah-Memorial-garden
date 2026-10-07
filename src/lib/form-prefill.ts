import { useEffect } from "react";
import type { PrefillEvent } from "@/lib/prefill-events";

/**
 * Form dimuat saat seksinya mendekati layar. Pilihan yang diklik sebelum itu
 * disimpan di sini dan diterapkan begitu form selesai dimuat.
 */
const pendingPrefills = new Map<PrefillEvent, string>();

export function requestPrefill(event: PrefillEvent, value: string, formAnchorId: string) {
  pendingPrefills.set(event, value);
  window.dispatchEvent(new CustomEvent<string>(event, { detail: value }));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(formAnchorId)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

export function usePrefillListener(event: PrefillEvent, onPrefill: (value: string) => void) {
  useEffect(() => {
    const pending = pendingPrefills.get(event);
    if (pending !== undefined) onPrefill(pending);

    const listener = (incoming: Event) => {
      if (incoming instanceof CustomEvent && typeof incoming.detail === "string") onPrefill(incoming.detail);
    };
    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  }, [event, onPrefill]);
}
