const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const MAX_RAW_STRING = 2_000;
const MAX_KEYS = 40;

/**
 * Membersihkan teks bebas sebelum divalidasi: buang karakter kontrol dan tanda < >,
 * rapikan spasi, dan potong teks yang jelas terlalu panjang. Baris baru dipertahankan
 * agar catatan keluarga tetap terbaca.
 */
export function sanitizeText(value: string): string {
  return value
    .slice(0, MAX_RAW_STRING)
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARACTERS, "")
    .replace(/[<>]/g, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Hanya objek datar yang diterima; nilai bertingkat dibuang karena tidak ada form yang mengirimnya. */
export function sanitizePayload(payload: unknown): Record<string, unknown> | null {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) return null;
  const entries = Object.entries(payload).slice(0, MAX_KEYS);
  const clean: Record<string, unknown> = {};
  for (const [key, value] of entries) {
    if (typeof value === "string") clean[key] = sanitizeText(value);
    else if (typeof value === "number" || typeof value === "boolean") clean[key] = value;
  }
  return clean;
}
