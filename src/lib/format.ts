import { site } from "@/config/site";
import { parseWibDateTime } from "@/lib/datetime";

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const longDateFormatter = new Intl.DateTimeFormat("id-ID", {
  timeZone: site.timeZone,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const numberFormatter = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 });

/** "Rp 450.000" dengan spasi biasa agar aman di pesan WhatsApp. */
export function formatRupiah(amount: number): string {
  return rupiahFormatter.format(amount).replace(/ /g, " ");
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** "Kamis, 8 Oktober 2026". */
export function formatLongDate(date: string): string {
  const parsed = parseWibDateTime(date, "12:00");
  return parsed ? longDateFormatter.format(parsed) : date;
}

/** "Kamis, 8 Oktober 2026, pukul 14.30 WIB". */
export function formatDateTimeWib(date: string, time: string): string {
  return `${formatLongDate(date)}, pukul ${time.replace(":", ".")} WIB`;
}
