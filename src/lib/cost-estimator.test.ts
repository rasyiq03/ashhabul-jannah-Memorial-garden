import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { estimateAmbulanceCost, EstimateInputError, type AmbulanceTariffs } from "@/lib/cost-estimator";

const tariffs: AmbulanceTariffs = {
  vehicles: {
    "ambulans-jenazah": { label: "Ambulans Jenazah", baseFare: 400_000, includedKm: 10, perKm: 10_000, escortCapacity: 2, allowsZones: true },
    "mobil-jenazah": { label: "Mobil Jenazah", baseFare: 800_000, includedKm: 10, perKm: 12_000, escortCapacity: 3, allowsZones: true },
    "antar-kota": { label: "Antar-Kota", baseFare: 1_500_000, includedKm: 40, perKm: 8_000, escortCapacity: 2, allowsZones: false },
  },
  zones: {
    dekat: { label: "Dekat", description: "", estimateKm: 10 },
    sedang: { label: "Sedang", description: "", estimateKm: 25 },
    jauh: { label: "Jauh", description: "", estimateKm: 60 },
  },
  coffins: {
    keranda: { label: "Keranda", price: 250_000 },
    peti: { label: "Peti", price: 1_750_000 },
  },
  extraCrew: { label: "Tenaga angkat", price: 200_000 },
  maxDistanceKm: 3_000,
};

describe("estimateAmbulanceCost", () => {
  it("hanya memakai tarif dasar bila jarak masih dalam kilometer gratis", () => {
    const estimate = estimateAmbulanceCost(
      { vehicleId: "ambulans-jenazah", distance: { mode: "km", km: 8 }, coffin: null, extraCrew: false },
      tariffs,
    );
    expect(estimate.total).toBe(400_000);
    expect(estimate.extraKm).toBe(0);
    expect(estimate.lines).toHaveLength(1);
  });

  it("menghitung kelebihan jarak per kilometer", () => {
    const estimate = estimateAmbulanceCost(
      { vehicleId: "ambulans-jenazah", distance: { mode: "km", km: 25 }, coffin: null, extraCrew: false },
      tariffs,
    );
    expect(estimate.extraKm).toBe(15);
    expect(estimate.total).toBe(400_000 + 15 * 10_000);
  });

  it("membulatkan pecahan kilometer ke atas", () => {
    const estimate = estimateAmbulanceCost(
      { vehicleId: "mobil-jenazah", distance: { mode: "km", km: 12.2 }, coffin: null, extraCrew: false },
      tariffs,
    );
    expect(estimate.distanceKm).toBe(13);
    expect(estimate.total).toBe(800_000 + 3 * 12_000);
  });

  it("memakai jarak perwakilan zona", () => {
    const estimate = estimateAmbulanceCost(
      { vehicleId: "mobil-jenazah", distance: { mode: "zona", zoneId: "sedang" }, coffin: null, extraCrew: false },
      tariffs,
    );
    expect(estimate.distanceKm).toBe(25);
    expect(estimate.total).toBe(800_000 + 15 * 12_000);
  });

  it("menambahkan peti/keranda dan tenaga angkat sebagai baris terpisah", () => {
    const estimate = estimateAmbulanceCost(
      { vehicleId: "ambulans-jenazah", distance: { mode: "zona", zoneId: "dekat" }, coffin: "peti", extraCrew: true },
      tariffs,
    );
    expect(estimate.lines.map((line) => line.label)).toEqual([
      "Tarif dasar Ambulans Jenazah (termasuk 10 km pertama)",
      "Peti",
      "Tenaga angkat",
    ]);
    expect(estimate.total).toBe(400_000 + 1_750_000 + 200_000);
  });

  it("menolak zona untuk armada antar-kota", () => {
    expect(() =>
      estimateAmbulanceCost(
        { vehicleId: "antar-kota", distance: { mode: "zona", zoneId: "jauh" }, coffin: null, extraCrew: false },
        tariffs,
      ),
    ).toThrow(EstimateInputError);
  });

  it.each([0, -5, Number.NaN, 3_001])("menolak jarak tidak wajar: %s km", (km) => {
    expect(() =>
      estimateAmbulanceCost({ vehicleId: "antar-kota", distance: { mode: "km", km }, coffin: null, extraCrew: false }, tariffs),
    ).toThrow(EstimateInputError);
  });

  it("memakai tarif dari site.ts secara default", () => {
    const vehicle = site.ambulance.vehicles["ambulans-jenazah"];
    const estimate = estimateAmbulanceCost({
      vehicleId: "ambulans-jenazah",
      distance: { mode: "km", km: vehicle.includedKm + 1 },
      coffin: null,
      extraCrew: false,
    });
    expect(estimate.total).toBe(vehicle.baseFare + vehicle.perKm);
  });
});
