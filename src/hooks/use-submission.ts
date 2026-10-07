import { useCallback, useState } from "react";
import type { SubmissionResponse, SubmissionSuccess } from "@/lib/submission/types";

export type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; result: SubmissionSuccess }
  | { status: "error"; message: string; whatsappUrl?: string };

const NETWORK_ERROR =
  "Koneksi terputus saat mengirim. Periksa sinyal internet, lalu tekan tombol kirim sekali lagi. Isian Anda tidak hilang.";

async function readResponse(response: Response): Promise<SubmissionResponse | null> {
  try {
    return (await response.json()) as SubmissionResponse;
  } catch {
    return null;
  }
}

/**
 * Mengirim data form ke API route dan mengembalikan galat per kolom dari server
 * (bila ada) agar bisa ditampilkan di kolom yang bersangkutan.
 */
export function useSubmission(endpoint: string) {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  const submit = useCallback(
    async (payload: object): Promise<Record<string, string> | undefined> => {
      setState({ status: "submitting" });
      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        setState({ status: "error", message: NETWORK_ERROR });
        return undefined;
      }

      const body = await readResponse(response);
      if (body?.ok) {
        setState({ status: "success", result: body });
        return undefined;
      }

      setState({
        status: "error",
        message:
          body?.message ??
          `Server belum bisa memproses kiriman (kode ${response.status}). Coba lagi beberapa saat lagi, atau hubungi kami lewat WhatsApp.`,
        whatsappUrl: body?.whatsappUrl,
      });
      return body?.fieldErrors;
    },
    [endpoint],
  );

  const reset = useCallback(() => setState({ status: "idle" }), []);

  return { state, submit, reset };
}
