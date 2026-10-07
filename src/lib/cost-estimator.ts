import { site, type CoffinType, type DistanceZone, type VehicleId, type VehicleTariff, type ZoneId } from "@/config/site";

export type DistanceInput = { mode: "zona"; zoneId: ZoneId } | { mode: "km"; km: number };

export interface AmbulanceEstimateInput {
  vehicleId: VehicleId;
  distance: DistanceInput;
  coffin: CoffinType | null;
  extraCrew: boolean;
}

export interface EstimateLine {
  label: string;
  amount: number;
}

export interface AmbulanceEstimate {
  lines: EstimateLine[];
  total: number;
  distanceKm: number;
  extraKm: number;
}

export interface AmbulanceTariffs {
  vehicles: Record<VehicleId, VehicleTariff>;
  zones: Record<ZoneId, DistanceZone>;
  coffins: Record<CoffinType, { label: string; price: number }>;
  extraCrew: { label: string; price: number };
  maxDistanceKm: number;
}

export class EstimateInputError extends Error {}

function resolveDistanceKm(distance: DistanceInput, vehicleId: VehicleId, tariffs: AmbulanceTariffs): number {
  if (distance.mode === "zona") {
    if (!tariffs.vehicles[vehicleId].allowsZones) {
      throw new EstimateInputError(`${tariffs.vehicles[vehicleId].label} dihitung dari jarak kilometer, bukan zona.`);
    }
    return tariffs.zones[distance.zoneId].estimateKm;
  }
  if (!Number.isFinite(distance.km) || distance.km <= 0) {
    throw new EstimateInputError("Jarak harus lebih dari 0 km.");
  }
  if (distance.km > tariffs.maxDistanceKm) {
    throw new EstimateInputError(`Jarak lebih dari ${tariffs.maxDistanceKm} km perlu dihitung langsung oleh petugas.`);
  }
  // Pecahan kilometer dibulatkan ke atas, sama seperti argo armada.
  return Math.ceil(distance.km);
}

export function estimateAmbulanceCost(
  input: AmbulanceEstimateInput,
  tariffs: AmbulanceTariffs = site.ambulance,
): AmbulanceEstimate {
  const vehicle = tariffs.vehicles[input.vehicleId];
  const distanceKm = resolveDistanceKm(input.distance, input.vehicleId, tariffs);
  const extraKm = Math.max(0, distanceKm - vehicle.includedKm);

  const lines: EstimateLine[] = [
    { label: `Tarif dasar ${vehicle.label} (termasuk ${vehicle.includedKm} km pertama)`, amount: vehicle.baseFare },
  ];
  if (extraKm > 0) {
    lines.push({ label: `Kelebihan jarak ${extraKm} km`, amount: extraKm * vehicle.perKm });
  }
  if (input.coffin) {
    const coffin = tariffs.coffins[input.coffin];
    lines.push({ label: coffin.label, amount: coffin.price });
  }
  if (input.extraCrew) {
    lines.push({ label: tariffs.extraCrew.label, amount: tariffs.extraCrew.price });
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return { lines, total, distanceKm, extraKm };
}
