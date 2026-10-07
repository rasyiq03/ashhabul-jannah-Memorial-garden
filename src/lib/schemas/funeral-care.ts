import { z } from "zod";
import { carePackageIds, vehicleIds } from "@/config/site";
import { addDays, dateInWib, parseWibDateTime } from "@/lib/datetime";
import {
  FIELD_LIMITS,
  dateField,
  honeypotField,
  integerField,
  optionalText,
  optionalTimeField,
  requiredText,
  whatsappField,
} from "@/lib/schemas/fields";

export const relationshipValues = [
  "pasangan",
  "anak",
  "orang-tua",
  "saudara",
  "kerabat",
  "tetangga",
  "rumah-sakit",
  "lainnya",
] as const;
export const genderValues = ["laki-laki", "perempuan"] as const;
export const bodyLocationValues = ["rumah", "rumah-sakit", "lainnya"] as const;

export type Relationship = (typeof relationshipValues)[number];
export type DeceasedGender = (typeof genderValues)[number];
export type BodyLocation = (typeof bodyLocationValues)[number];

const MAX_DAYS_SINCE_DEATH = 7;
const FUTURE_GRACE_MS = 10 * 60 * 1000;

export const funeralCareSchema = z
  .object({
    applicantName: requiredText({
      label: "Nama pemohon",
      required: "Tulis nama Anda sebagai pemohon.",
      max: FIELD_LIMITS.name,
    }),
    relationship: z.enum(relationshipValues, { error: "Pilih hubungan Anda dengan almarhum/ah." }),
    whatsapp: whatsappField,
    deceasedName: requiredText({
      label: "Nama almarhum/ah",
      required: "Tulis nama almarhum/ah.",
      max: FIELD_LIMITS.name,
    }),
    deceasedGender: z.enum(genderValues, {
      error: "Pilih jenis kelamin almarhum/ah, agar kami mengutus petugas yang sesuai.",
    }),
    deceasedAge: integerField({
      required: "Isi perkiraan usia almarhum/ah. Angka kira-kira sudah cukup.",
      min: 0,
      max: 130,
      range: "Usia antara 0 sampai 130 tahun. Untuk bayi di bawah satu tahun, tulis 0.",
    }),
    deathDate: dateField("Pilih tanggal wafat.")
      .refine((date) => date <= dateInWib(new Date()), "Tanggal wafat tidak boleh lebih dari hari ini.")
      .refine(
        (date) => date >= addDays(dateInWib(new Date()), -MAX_DAYS_SINCE_DEATH),
        `Untuk jenazah yang wafat lebih dari ${MAX_DAYS_SINCE_DEATH} hari lalu, mohon telepon kami agar dapat dibantu secara khusus.`,
      ),
    deathTime: optionalTimeField,
    bodyLocationType: z.enum(bodyLocationValues, { error: "Pilih di mana jenazah berada sekarang." }),
    bodyAddress: requiredText({
      label: "Alamat lokasi jenazah",
      required: "Tulis alamat lokasi jenazah, atau nama rumah sakit beserta ruangannya.",
      min: 10,
      tooShort: "Alamat terlalu singkat. Sertakan nama jalan atau nama rumah sakit dan kecamatannya.",
      max: FIELD_LIMITS.address,
    }),
    packageId: z.enum(carePackageIds, { error: "Pilih paket pemulasaraan." }),
    needsAmbulance: z.boolean(),
    ambulanceVehicleId: z.union([z.enum(vehicleIds), z.literal("")]),
    burialDestination: optionalText("Tujuan pemakaman", FIELD_LIMITS.place),
    notes: optionalText("Catatan khusus", FIELD_LIMITS.notes),
    companySite: honeypotField,
  })
  .superRefine((request, ctx) => {
    if (request.deathTime) {
      const death = parseWibDateTime(request.deathDate, request.deathTime);
      if (death && death.getTime() > Date.now() + FUTURE_GRACE_MS) {
        ctx.addIssue({ code: "custom", path: ["deathTime"], message: "Jam wafat tidak boleh lebih dari waktu sekarang." });
      }
    }

    if (request.needsAmbulance) {
      if (request.ambulanceVehicleId === "") {
        ctx.addIssue({ code: "custom", path: ["ambulanceVehicleId"], message: "Pilih jenis armada yang dibutuhkan." });
      }
      if (request.burialDestination.length < 3) {
        ctx.addIssue({
          code: "custom",
          path: ["burialDestination"],
          message: "Tulis tujuan pemakaman, misalnya Taman Wakaf Sakinah atau nama TPU dan kotanya.",
        });
      }
    }
  });

export type FuneralCareInput = z.input<typeof funeralCareSchema>;
export type FuneralCareRequest = z.output<typeof funeralCareSchema>;
