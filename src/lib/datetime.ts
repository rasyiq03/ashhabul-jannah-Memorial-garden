import { site } from "@/config/site";

/** Indonesia bagian barat tidak memakai daylight saving, jadi offset WIB selalu +07:00. */
const WIB_OFFSET = "+07:00";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isDateString(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00${WIB_OFFSET}`);
  return !Number.isNaN(parsed.getTime()) && dateInWib(parsed) === value;
}

export function isTimeString(value: string): boolean {
  return TIME_PATTERN.test(value);
}

/** Menggabungkan input `date` (YYYY-MM-DD) dan `time` (HH:mm) sebagai waktu WIB. */
export function parseWibDateTime(date: string, time: string): Date | null {
  if (!isDateString(date) || !isTimeString(time)) return null;
  const parsed = new Date(`${date}T${time}:00${WIB_OFFSET}`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function wibParts(moment: Date): Record<"year" | "month" | "day" | "hour" | "minute", string> {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(moment);
  const pick = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "00";
  return { year: pick("year"), month: pick("month"), day: pick("day"), hour: pick("hour"), minute: pick("minute") };
}

export function dateInWib(moment: Date): string {
  const { year, month, day } = wibParts(moment);
  return `${year}-${month}-${day}`;
}

export function timeInWib(moment: Date): string {
  const { hour, minute } = wibParts(moment);
  return `${hour}:${minute}`;
}

/** Cap tanggal untuk nomor tiket, misalnya 20261008. */
export function ticketDateStamp(moment: Date): string {
  return dateInWib(moment).replaceAll("-", "");
}

export function addDays(date: string, days: number): string {
  const base = new Date(`${date}T12:00:00${WIB_OFFSET}`);
  base.setUTCDate(base.getUTCDate() + days);
  return dateInWib(base);
}
