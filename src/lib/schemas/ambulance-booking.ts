import { z } from "zod";
import { coffinTypes, site, vehicleIds, zoneIds } from "@/config/site";
import { addDays, dateInWib, parseWibDateTime } from "@/lib/datetime";
import {
  FIELD_LIMITS,
  dateField,
  honeypotField,
  integerField,
  optionalPositiveNumber,
  optionalText,
  requiredText,
  timeField,
  whatsappField,
} from "@/lib/schemas/fields";

/** Toleransi untuk penjemputan "secepatnya": jam yang diisi beberapa menit lalu tetap diterima. */
const PICKUP_GRACE_MS = 30 * 60 * 1000;
const MAX_DAYS_AHEAD = 60;

export const distanceModes = ["zona", "km"] as const;

export const ambulanceBookingSchema = z
  .object({
    requesterName: requiredText({
      label: "Nama pemesan",
      required: "Tulis nama Anda sebagai pemesan.",
      max: FIELD_LIMITS.name,
    }),
    whatsapp: whatsappField,
    deceasedName: requiredText({
      label: "Nama almarhum/ah",
      required: "Tulis nama almarhum/ah agar petugas dapat mencocokkan data di lokasi.",
      max: FIELD_LIMITS.name,
    }),
    vehicleId: z.enum(vehicleIds, { error: "Pilih jenis armada." }),
    pickupAddress: requiredText({
      label: "Alamat penjemputan",
      required: "Tulis alamat lengkap tempat jenazah dijemput.",
      min: 10,
      tooShort: "Alamat terlalu singkat. Sertakan nama jalan, nomor rumah atau nama rumah sakit, dan kecamatan.",
      max: FIELD_LIMITS.address,
    }),
    destination: requiredText({
      label: "Tujuan",
      required: "Tulis tujuan pengantaran, misalnya nama pemakaman atau alamat rumah duka.",
      min: 3,
      max: FIELD_LIMITS.place,
    }),
    pickupDate: dateField("Pilih tanggal penjemputan.")
      .refine((date) => date >= dateInWib(new Date()), "Tanggal jemput sudah lewat. Pilih hari ini atau tanggal berikutnya.")
      .refine(
        (date) => date <= addDays(dateInWib(new Date()), MAX_DAYS_AHEAD),
        `Pemesanan lewat formulir paling jauh ${MAX_DAYS_AHEAD} hari ke depan.`,
      ),
    pickupTime: timeField("Pilih jam penjemputan."),
    escortCount: integerField({
      required: "Isi jumlah pengantar. Tulis 0 bila tidak ada yang ikut.",
      min: 0,
      max: 50,
      range: "Jumlah pengantar antara 0 sampai 50 orang.",
    }),
    distanceMode: z.enum(distanceModes, { error: "Pilih cara menghitung jarak." }),
    zoneId: z.enum(zoneIds, { error: "Pilih zona jarak." }),
    distanceKm: optionalPositiveNumber("Jarak harus lebih dari 0 km."),
    needsCoffin: z.boolean(),
    coffinType: z.enum(coffinTypes, { error: "Pilih keranda atau peti." }),
    extraCrew: z.boolean(),
    notes: optionalText("Catatan", FIELD_LIMITS.notes),
    companySite: honeypotField,
  })
  .superRefine((booking, ctx) => {
    const vehicle = site.ambulance.vehicles[booking.vehicleId];

    if (booking.distanceMode === "zona" && !vehicle.allowsZones) {
      ctx.addIssue({
        code: "custom",
        path: ["distanceMode"],
        message: `${vehicle.label} dihitung per kilometer. Pilih "Isi jarak (km)" lalu masukkan perkiraan jaraknya.`,
      });
    }

    if (booking.distanceMode === "km") {
      if (booking.distanceKm === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["distanceKm"],
          message: "Isi perkiraan jarak dalam kilometer. Anda bisa melihatnya di Google Maps.",
        });
      } else if (booking.distanceKm > site.ambulance.maxDistanceKm) {
        ctx.addIssue({
          code: "custom",
          path: ["distanceKm"],
          message: `Untuk jarak lebih dari ${site.ambulance.maxDistanceKm} km, mohon telepon petugas agar rutenya direncanakan bersama.`,
        });
      }
    }

    const pickup = parseWibDateTime(booking.pickupDate, booking.pickupTime);
    if (pickup && booking.pickupDate === dateInWib(new Date()) && pickup.getTime() < Date.now() - PICKUP_GRACE_MS) {
      ctx.addIssue({
        code: "custom",
        path: ["pickupTime"],
        message: 'Jam jemput sudah lewat. Untuk penjemputan segera, tekan "Jemput secepatnya".',
      });
    }
  });

export type AmbulanceBookingInput = z.input<typeof ambulanceBookingSchema>;
export type AmbulanceBooking = z.output<typeof ambulanceBookingSchema>;
