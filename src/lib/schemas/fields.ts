import { z } from "zod";
import { isDateString, isTimeString } from "@/lib/datetime";
import { isValidIndonesianMobile } from "@/lib/phone";

/** Batas panjang dipakai di form (maxLength) dan di server (validasi ulang). */
export const FIELD_LIMITS = {
  name: 80,
  email: 120,
  place: 200,
  address: 300,
  notes: 600,
} as const;

interface TextRules {
  required: string;
  max: number;
  min?: number;
  tooShort?: string;
  label: string;
}

export function requiredText({ required, max, min = 2, tooShort, label }: TextRules) {
  return z
    .string({ error: required })
    .trim()
    .min(1, required)
    .min(min, tooShort ?? `${label} terlalu pendek, minimal ${min} karakter.`)
    .max(max, `${label} terlalu panjang, maksimal ${max} karakter.`);
}

export function optionalText(label: string, max: number) {
  return z.string().trim().max(max, `${label} terlalu panjang, maksimal ${max} karakter.`);
}

export const whatsappField = z
  .string({ error: "Isi nomor WhatsApp yang bisa kami hubungi." })
  .trim()
  .min(1, "Isi nomor WhatsApp yang bisa kami hubungi.")
  .max(20, "Nomor terlalu panjang. Tulis tanpa spasi berlebih, misalnya 0812-3456-7890.")
  .refine(isValidIndonesianMobile, "Nomor belum sesuai. Gunakan nomor seluler Indonesia, misalnya 0812-3456-7890.");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emailField = z
  .string({ error: "Isi alamat email Anda." })
  .trim()
  .min(1, "Isi alamat email Anda.")
  .max(FIELD_LIMITS.email, `Alamat email maksimal ${FIELD_LIMITS.email} karakter.`)
  .refine((value) => EMAIL_PATTERN.test(value), "Format email belum benar, contohnya nama@email.com.");

export function dateField(required: string) {
  return z
    .string({ error: required })
    .trim()
    .min(1, required)
    .refine(isDateString, "Tanggal tidak dikenali. Pilih tanggal dari kalender.");
}

export function timeField(required: string) {
  return z
    .string({ error: required })
    .trim()
    .min(1, required)
    .refine(isTimeString, "Jam tidak dikenali. Gunakan format 24 jam, misalnya 14:30.");
}

export const optionalTimeField = z
  .string()
  .trim()
  .refine((value) => value === "" || isTimeString(value), "Jam tidak dikenali. Gunakan format 24 jam, misalnya 14:30.");

function emptyToUndefined(value: unknown): unknown {
  if (value === "" || value === null || value === undefined) return undefined;
  if (typeof value === "number" && Number.isNaN(value)) return undefined;
  if (typeof value === "string") {
    const parsed = Number(value.trim().replace(",", "."));
    return Number.isNaN(parsed) ? value : parsed;
  }
  return value;
}

interface IntegerRules {
  required: string;
  min: number;
  max: number;
  range: string;
}

/** Input angka dari form selalu berupa string; field ini menerima string maupun number. */
export function integerField({ required, min, max, range }: IntegerRules) {
  return z.preprocess(
    emptyToUndefined,
    z
      .number({ error: (issue) => (issue.input === undefined ? required : "Isi dengan angka, misalnya 3.") })
      .int("Gunakan bilangan bulat tanpa koma.")
      .min(min, range)
      .max(max, range),
  );
}

export function optionalPositiveNumber(range: string) {
  return z.preprocess(
    emptyToUndefined,
    z
      .number({ error: "Isi dengan angka, misalnya 12." })
      .positive(range)
      .optional(),
  );
}

/** Kolom jebakan untuk bot. Manusia tidak melihat kolom ini, jadi seharusnya selalu kosong. */
export const honeypotField = z.string().max(500).optional();
