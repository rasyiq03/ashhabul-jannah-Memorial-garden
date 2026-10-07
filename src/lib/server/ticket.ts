import { ticketDateStamp } from "@/lib/datetime";

export type TicketPrefix = "AMB" | "PML" | "TNY";

/**
 * Nomor tiket berformat PREFIX-YYYYMMDD-XXXX. XXXX adalah urutan harian (WIB)
 * per jenis layanan, supaya mudah disebutkan lewat telepon: "tiket nol-nol-nol-tujuh".
 */
export function nextTicket(prefix: TicketPrefix, existingTickets: readonly string[], now: Date): string {
  const head = `${prefix}-${ticketDateStamp(now)}-`;
  const lastSequence = existingTickets
    .filter((ticket) => ticket.startsWith(head))
    .map((ticket) => Number.parseInt(ticket.slice(head.length), 10))
    .filter(Number.isFinite)
    .reduce((highest, sequence) => Math.max(highest, sequence), 0);
  return `${head}${String(lastSequence + 1).padStart(4, "0")}`;
}
