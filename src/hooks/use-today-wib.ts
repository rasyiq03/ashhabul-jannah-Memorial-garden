import { useSyncExternalStore } from "react";
import { dateInWib } from "@/lib/datetime";

const subscribe = () => () => {};
const readToday = () => dateInWib(new Date());
const readNothing = () => undefined;

/**
 * Tanggal hari ini (WIB) di browser. Halaman dibangun statis, jadi tanggal saat build
 * tidak boleh dipakai sebagai batas kalender; di server nilainya undefined.
 */
export function useTodayInWib(): string | undefined {
  return useSyncExternalStore(subscribe, readToday, readNothing);
}
