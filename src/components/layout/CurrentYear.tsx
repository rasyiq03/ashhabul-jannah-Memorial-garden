"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const readYear = () => new Date().getFullYear();

/** Halaman dibangun statis; tahun dibaca ulang di browser agar tidak tertinggal di tahun build. */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(subscribe, readYear, () => buildYear);
  return <>{year}</>;
}
