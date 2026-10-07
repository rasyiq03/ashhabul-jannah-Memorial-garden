import { site } from "@/config/site";

export interface SummaryLine {
  label: string;
  value: string;
}

/** Nomor wa.me harus berisi digit saja dengan kode negara, tanpa tanda plus. */
export function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function buildWhatsAppUrl(phone: string, message?: string): string {
  const number = toWhatsAppNumber(phone);
  if (number.length < 9) {
    throw new Error(`Nomor WhatsApp tidak valid: "${phone}"`);
  }
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Tautan ke nomor WhatsApp layanan dari site.ts. */
export function businessWhatsAppUrl(message?: string): string {
  return buildWhatsAppUrl(site.contact.whatsapp, message);
}

interface WhatsAppMessageParts {
  opening: string;
  ticket?: string;
  lines: SummaryLine[];
  closing?: string;
}

/**
 * Menyusun pesan berformat WhatsApp: label tebal dengan *...*, satu baris per data.
 * Tanda bintang di dalam nilai dihapus agar format tebal tidak rusak.
 */
export function composeWhatsAppMessage({ opening, ticket, lines, closing }: WhatsAppMessageParts): string {
  const clean = (text: string) => text.replace(/\*/g, "").trim();
  const body = lines.filter((line) => line.value.trim() !== "").map((line) => `*${clean(line.label)}:* ${clean(line.value)}`);
  return [opening, ticket ? `*Nomor tiket:* ${ticket}` : null, "", ...body, closing ? "" : null, closing ?? null]
    .filter((part): part is string => part !== null)
    .join("\n");
}
