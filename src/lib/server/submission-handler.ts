import { NextResponse, type NextRequest } from "next/server";
import type { z } from "zod";
import { site } from "@/config/site";
import { isRateLimited } from "@/lib/server/rate-limit";
import { sanitizePayload } from "@/lib/server/sanitize";
import { appendSubmission } from "@/lib/server/submissions-store";
import { nextTicket, type TicketPrefix } from "@/lib/server/ticket";
import type { SubmissionFailure, SubmissionKind, SubmissionResponse } from "@/lib/submission/types";
import { businessWhatsAppUrl, type SummaryLine } from "@/lib/whatsapp";

const MAX_BODY_BYTES = 16 * 1024;

interface SubmissionRouteConfig<TOutput extends { companySite?: string }> {
  kind: SubmissionKind;
  ticketPrefix: TicketPrefix;
  schema: z.ZodType<TOutput>;
  summarize: (data: TOutput) => SummaryLine[];
  composeMessage: (ticket: string | null, summary: SummaryLine[]) => string;
}

function failure(status: number, body: Omit<SubmissionFailure, "ok">): NextResponse<SubmissionResponse> {
  return NextResponse.json({ ok: false, ...body }, { status });
}

function toFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    fieldErrors[field] ??= issue.message;
  }
  return fieldErrors;
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "anonim";
}

/**
 * Alur yang sama untuk semua formulir: periksa format, batasi frekuensi, sanitasi,
 * validasi ulang dengan skema zod yang juga dipakai di browser, simpan, lalu kembalikan
 * nomor tiket beserta tautan WhatsApp berisi ringkasan data.
 */
export function createSubmissionHandler<TOutput extends { companySite?: string }>(
  config: SubmissionRouteConfig<TOutput>,
) {
  return async function handleSubmission(request: NextRequest): Promise<NextResponse<SubmissionResponse>> {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return failure(415, { message: "Format kiriman tidak dikenali. Muat ulang halaman, lalu kirim formulir sekali lagi." });
    }

    if (isRateLimited(`${config.kind}:${clientKey(request)}`)) {
      return failure(429, {
        message: `Terlalu banyak kiriman dari perangkat ini dalam 10 menit terakhir. Bila mendesak, telepon petugas jaga di ${site.contact.ambulancePhoneDisplay}.`,
      });
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return failure(413, { message: "Isian formulir terlalu panjang. Persingkat bagian catatan, lalu kirim lagi." });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return failure(400, { message: "Data formulir tidak terbaca oleh server. Muat ulang halaman, lalu coba kirim lagi." });
    }

    const parsed = config.schema.safeParse(sanitizePayload(payload) ?? {});
    if (!parsed.success) {
      return failure(422, {
        message: "Beberapa isian belum sesuai. Periksa kolom yang diberi tanda, lalu kirim lagi.",
        fieldErrors: toFieldErrors(parsed.error),
      });
    }

    const { companySite, ...data } = parsed.data;
    const summary = config.summarize(parsed.data);
    const now = new Date();

    // Kolom jebakan terisi berarti bot. Balas seperti biasa tanpa menyimpan apa pun.
    if (companySite) {
      const ticket = nextTicket(config.ticketPrefix, [], now);
      return NextResponse.json(
        {
          ok: true,
          ticket,
          createdAt: now.toISOString(),
          summary,
          whatsappUrl: businessWhatsAppUrl(config.composeMessage(ticket, summary)),
        },
        { status: 201 },
      );
    }

    try {
      const record = await appendSubmission((existing) => ({
        ticket: nextTicket(
          config.ticketPrefix,
          existing.map((submission) => submission.ticket),
          now,
        ),
        kind: config.kind,
        createdAt: now.toISOString(),
        data,
      }));

      return NextResponse.json(
        {
          ok: true,
          ticket: record.ticket,
          createdAt: record.createdAt,
          summary,
          whatsappUrl: businessWhatsAppUrl(config.composeMessage(record.ticket, summary)),
        },
        { status: 201 },
      );
    } catch (error) {
      console.error(`[${config.kind}] Gagal menyimpan kiriman`, error);
      return failure(503, {
        message: `Data Anda belum tersimpan karena gangguan di server kami. Kirim data yang sama lewat WhatsApp dengan tombol di bawah, atau telepon ${site.contact.ambulancePhoneDisplay}.`,
        whatsappUrl: businessWhatsAppUrl(config.composeMessage(null, summary)),
      });
    }
  };
}
