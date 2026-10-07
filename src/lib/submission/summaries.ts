import { site } from "@/config/site";
import { contactTopicLabels } from "@/content/contact";
import { bodyLocationLabels, genderLabels, relationshipLabels } from "@/content/funeral-care";
import {
  estimateAmbulanceCost,
  EstimateInputError,
  type AmbulanceEstimate,
  type AmbulanceEstimateInput,
} from "@/lib/cost-estimator";
import { formatDateTimeWib, formatLongDate, formatRupiah } from "@/lib/format";
import { formatMobileForDisplay } from "@/lib/phone";
import type { AmbulanceBooking } from "@/lib/schemas/ambulance-booking";
import type { ContactRequest } from "@/lib/schemas/contact";
import type { FuneralCareRequest } from "@/lib/schemas/funeral-care";
import { composeWhatsAppMessage, type SummaryLine } from "@/lib/whatsapp";

type EstimateFields = Pick<
  AmbulanceBooking,
  "vehicleId" | "distanceMode" | "zoneId" | "distanceKm" | "needsCoffin" | "coffinType" | "extraCrew"
>;

export function toEstimateInput(fields: EstimateFields): AmbulanceEstimateInput {
  return {
    vehicleId: fields.vehicleId,
    distance:
      fields.distanceMode === "km" ? { mode: "km", km: fields.distanceKm ?? 0 } : { mode: "zona", zoneId: fields.zoneId },
    coffin: fields.needsCoffin ? fields.coffinType : null,
    extraCrew: fields.extraCrew,
  };
}

/** Mengembalikan null bila data jarak belum lengkap, alih-alih melempar galat ke UI. */
export function tryEstimate(fields: EstimateFields): AmbulanceEstimate | null {
  try {
    return estimateAmbulanceCost(toEstimateInput(fields));
  } catch (error) {
    if (error instanceof EstimateInputError) return null;
    throw error;
  }
}

function describeDistance(booking: AmbulanceBooking, estimate: AmbulanceEstimate | null): string {
  if (booking.distanceMode === "km") return `${estimate?.distanceKm ?? booking.distanceKm ?? "-"} km`;
  const zone = site.ambulance.zones[booking.zoneId];
  return `Zona ${zone.label.toLowerCase()} (dihitung ${zone.estimateKm} km)`;
}

export function summarizeAmbulanceBooking(booking: AmbulanceBooking): SummaryLine[] {
  const estimate = tryEstimate(booking);
  const extras = [
    booking.needsCoffin ? site.ambulance.coffins[booking.coffinType].label : null,
    booking.extraCrew ? site.ambulance.extraCrew.label : null,
  ].filter((extra): extra is string => extra !== null);

  return [
    { label: "Nama pemesan", value: booking.requesterName },
    { label: "WhatsApp pemesan", value: formatMobileForDisplay(booking.whatsapp) },
    { label: "Nama almarhum/ah", value: booking.deceasedName },
    { label: "Armada", value: site.ambulance.vehicles[booking.vehicleId].label },
    { label: "Lokasi penjemputan", value: booking.pickupAddress },
    { label: "Tujuan", value: booking.destination },
    { label: "Waktu jemput", value: formatDateTimeWib(booking.pickupDate, booking.pickupTime) },
    { label: "Jumlah pengantar", value: `${booking.escortCount} orang` },
    { label: "Jarak", value: describeDistance(booking, estimate) },
    { label: "Tambahan", value: extras.length > 0 ? extras.join(", ") : "Tidak ada" },
    {
      label: "Estimasi biaya",
      value: estimate ? `${formatRupiah(estimate.total)} (estimasi, belum termasuk ${site.ambulance.excludedCosts})` : "Dihitung petugas",
    },
    { label: "Catatan", value: booking.notes },
  ];
}

export function composeAmbulanceMessage(ticket: string | null, summary: SummaryLine[]): string {
  return composeWhatsAppMessage({
    opening: `Assalamu'alaikum. Saya ingin mengonfirmasi pesanan ambulans jenazah di ${site.shortName}.`,
    ticket: ticket ?? undefined,
    lines: summary,
    closing: "Mohon segera dihubungi untuk konfirmasi. Terima kasih.",
  });
}

function describeAge(age: number): string {
  return age === 0 ? "Di bawah 1 tahun" : `Sekitar ${age} tahun`;
}

export function summarizeFuneralCare(request: FuneralCareRequest): SummaryLine[] {
  const carePackage = site.funeralCare.packages[request.packageId];
  const packagePrice = carePackage.price === 0 ? "tanpa biaya" : formatRupiah(carePackage.price);
  const deathMoment = request.deathTime
    ? formatDateTimeWib(request.deathDate, request.deathTime)
    : `${formatLongDate(request.deathDate)} (jam tidak diketahui)`;
  const ambulance =
    request.needsAmbulance && request.ambulanceVehicleId !== ""
      ? `Ya, ${site.ambulance.vehicles[request.ambulanceVehicleId].label} ke ${request.burialDestination}`
      : "Tidak perlu";

  return [
    { label: "Nama pemohon", value: request.applicantName },
    { label: "Hubungan", value: relationshipLabels[request.relationship] },
    { label: "WhatsApp pemohon", value: formatMobileForDisplay(request.whatsapp) },
    { label: "Nama almarhum/ah", value: request.deceasedName },
    { label: "Jenis kelamin", value: genderLabels[request.deceasedGender] },
    { label: "Usia", value: describeAge(request.deceasedAge) },
    { label: "Waktu wafat", value: deathMoment },
    { label: "Lokasi jenazah", value: `${bodyLocationLabels[request.bodyLocationType]}: ${request.bodyAddress}` },
    { label: "Paket", value: `${carePackage.label} (${packagePrice})` },
    { label: "Ambulans", value: ambulance },
    { label: "Catatan khusus", value: request.notes },
  ];
}

export function composeFuneralCareMessage(ticket: string | null, summary: SummaryLine[]): string {
  return composeWhatsAppMessage({
    opening: "Assalamu'alaikum. Innalillahi wa inna ilaihi raji'un. Saya ingin mengonfirmasi permohonan pemulasaraan jenazah.",
    ticket: ticket ?? undefined,
    lines: summary,
    closing: "Mohon koordinator petugas menghubungi saya. Jazakumullah khairan.",
  });
}

export function summarizeContact(request: ContactRequest): SummaryLine[] {
  return [
    { label: "Nama", value: request.name },
    { label: "Email", value: request.email },
    { label: "WhatsApp", value: formatMobileForDisplay(request.whatsapp) },
    { label: "Ingin tahu tentang", value: contactTopicLabels[request.topic] },
    { label: "Pertanyaan", value: request.message },
  ];
}

export function composeContactMessage(ticket: string | null, summary: SummaryLine[]): string {
  return composeWhatsAppMessage({
    opening: `Assalamu'alaikum. Saya ingin bertanya kepada ${site.shortName}.`,
    ticket: ticket ?? undefined,
    lines: summary,
    closing: "Terima kasih.",
  });
}
