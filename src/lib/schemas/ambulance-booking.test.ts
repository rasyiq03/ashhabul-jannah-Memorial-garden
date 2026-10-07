import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ambulanceBookingSchema, type AmbulanceBookingInput } from "@/lib/schemas/ambulance-booking";

// 8 Oktober 2026, 10.00 WIB
const NOW = new Date("2026-10-08T03:00:00Z");

const validBooking: AmbulanceBookingInput = {
  requesterName: "Rahmawati",
  whatsapp: "0812-3456-7890",
  deceasedName: "H. Abdul Rahman",
  vehicleId: "ambulans-jenazah",
  pickupAddress: "RS Hasan Sadikin, Jl. Pasteur No. 38, Sukajadi",
  destination: "Taman Wakaf Sakinah",
  pickupDate: "2026-10-08",
  pickupTime: "11:00",
  escortCount: "2",
  distanceMode: "zona",
  zoneId: "sedang",
  distanceKm: "",
  needsCoffin: false,
  coffinType: "keranda",
  extraCrew: false,
  notes: "",
  companySite: "",
};

function errorsFor(input: AmbulanceBookingInput): Record<string, string> {
  const result = ambulanceBookingSchema.safeParse(input);
  if (result.success) return {};
  return Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message]));
}

describe("ambulanceBookingSchema", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("menerima pesanan yang lengkap dan mengubah jumlah pengantar menjadi angka", () => {
    const result = ambulanceBookingSchema.safeParse(validBooking);
    expect(result.success).toBe(true);
    expect(result.data?.escortCount).toBe(2);
  });

  it("tetap valid saat hasil parse dikirim ulang ke server", () => {
    const first = ambulanceBookingSchema.parse(validBooking);
    expect(ambulanceBookingSchema.safeParse(first).success).toBe(true);
  });

  it("menolak tanggal jemput di masa lalu", () => {
    expect(errorsFor({ ...validBooking, pickupDate: "2026-10-07" })).toHaveProperty("pickupDate");
  });

  it("menolak jam jemput yang sudah lewat lebih dari 30 menit pada hari ini", () => {
    expect(errorsFor({ ...validBooking, pickupTime: "09:00" })).toHaveProperty("pickupTime");
    expect(errorsFor({ ...validBooking, pickupTime: "09:45" })).not.toHaveProperty("pickupTime");
  });

  it("menolak nomor yang bukan nomor seluler Indonesia", () => {
    expect(errorsFor({ ...validBooking, whatsapp: "022-1234567" })).toHaveProperty("whatsapp");
  });

  it("mewajibkan jarak km dan menolak zona untuk armada antar-kota", () => {
    expect(errorsFor({ ...validBooking, vehicleId: "antar-kota" })).toHaveProperty("distanceMode");
    expect(errorsFor({ ...validBooking, vehicleId: "antar-kota", distanceMode: "km" })).toHaveProperty("distanceKm");
    expect(errorsFor({ ...validBooking, vehicleId: "antar-kota", distanceMode: "km", distanceKm: "180" })).toEqual({});
  });

  it("mewajibkan jumlah pengantar", () => {
    expect(errorsFor({ ...validBooking, escortCount: "" })).toHaveProperty("escortCount");
  });
});
