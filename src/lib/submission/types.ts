import type { SummaryLine } from "@/lib/whatsapp";

export type SubmissionKind = "ambulance" | "funeral-care" | "contact";

export interface SubmissionSuccess {
  ok: true;
  ticket: string;
  createdAt: string;
  summary: SummaryLine[];
  whatsappUrl: string;
}

export interface SubmissionFailure {
  ok: false;
  message: string;
  fieldErrors?: Record<string, string>;
  /** Diisi bila data valid tetapi gagal disimpan, agar keluarga tetap bisa mengirim lewat WhatsApp. */
  whatsappUrl?: string;
}

export type SubmissionResponse = SubmissionSuccess | SubmissionFailure;
