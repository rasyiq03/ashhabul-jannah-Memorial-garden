/**
 * Nomor seluler Indonesia: diawali 08, 628, atau +628, lalu 8–12 digit berikutnya.
 * Spasi, titik, tanda hubung, dan kurung diabaikan.
 */
const MOBILE_PATTERN = /^(?:\+?62|0)(8[1-9]\d{6,10})$/;

function stripSeparators(input: string): string {
  return input.trim().replace(/[\s.\-()]/g, "");
}

export function isValidIndonesianMobile(input: string): boolean {
  return MOBILE_PATTERN.test(stripSeparators(input));
}

/** Mengubah "0812-3456-7890" atau "+62 812 3456 7890" menjadi "6281234567890". */
export function normalizeIndonesianMobile(input: string): string | null {
  const match = MOBILE_PATTERN.exec(stripSeparators(input));
  return match ? `62${match[1]}` : null;
}

/** "6281234567890" menjadi "0812-3456-7890" untuk ditampilkan ke keluarga. */
export function formatMobileForDisplay(input: string): string {
  const normalized = normalizeIndonesianMobile(input);
  if (!normalized) return input.trim();
  const local = `0${normalized.slice(2)}`;
  return [local.slice(0, 4), local.slice(4, 8), local.slice(8)].filter(Boolean).join("-");
}
