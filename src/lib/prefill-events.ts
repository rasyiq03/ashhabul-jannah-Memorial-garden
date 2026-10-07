/**
 * Tombol di kartu (armada, paket) bisa mengisi form di seksi yang sama tanpa
 * menjadikan seluruh seksi komponen klien: tombol mengirim event, form mendengarkan.
 * Modul ini sengaja tanpa React agar bisa diimpor komponen server.
 */
export const PREFILL_EVENTS = {
  vehicle: "tws:prefill-vehicle",
  carePackage: "tws:prefill-care-package",
} as const;

export type PrefillEvent = (typeof PREFILL_EVENTS)[keyof typeof PREFILL_EVENTS];
