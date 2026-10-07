/**
 * Satu-satunya tempat untuk data bisnis. Ganti nilai di sini untuk menyesuaikan
 * nama, kontak, alamat, jam layanan, tarif ambulans, dan harga paket.
 * Semua nilai di bawah adalah data contoh (lihat ASSUMPTIONS.md).
 */

export type VehicleId = "ambulans-jenazah" | "mobil-jenazah" | "antar-kota";
export type ZoneId = "dekat" | "sedang" | "jauh";
export type CoffinType = "keranda" | "peti";
export type CarePackageId = "dasar" | "lengkap" | "wakaf";

export interface VehicleTariff {
  label: string;
  /** Tarif dasar, sudah termasuk `includedKm` kilometer pertama. */
  baseFare: number;
  includedKm: number;
  perKm: number;
  escortCapacity: number;
  /** Armada antar-kota hanya bisa dihitung dari jarak km, bukan zona. */
  allowsZones: boolean;
}

export interface DistanceZone {
  label: string;
  description: string;
  /** Jarak yang dipakai untuk menghitung estimasi bila keluarga memilih zona. */
  estimateKm: number;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamanwakafsakinah.id").replace(/\/$/, "");

export const site = {
  name: "Taman Wakaf Sakinah Memorial Park",
  shortName: "Taman Wakaf Sakinah",
  nazhir: "Yayasan Wakaf Sakinah Insani",
  url: siteUrl,
  locale: "id_ID",
  timeZone: "Asia/Jakarta",
  description:
    "Pemakaman Muslim berbasis wakaf di Bandung Barat. Kavling makam wakaf, makam dhuafa, ambulans jenazah 24 jam, dan pemulasaraan jenazah sesuai syariat oleh petugas sejenis kelamin.",

  license: {
    label: "Izin pengelolaan tempat pemakaman",
    number: "503/0172/IPTM-DPMPTSP/2024",
    issuer: "DPMPTSP Kabupaten Bandung Barat",
  },

  facts: {
    plotSize: "1,25 × 2,5 meter",
  },

  contact: {
    whatsapp: "6281234567890",
    whatsappDisplay: "0812-3456-7890",
    ambulancePhone: "+622287654321",
    ambulancePhoneDisplay: "(022) 8765 4321",
    email: "layanan@tamanwakafsakinah.id",
  },

  address: {
    street: "Jl. Pasir Kawung No. 27",
    village: "Desa Cigugur Girang",
    district: "Kecamatan Parongpong",
    regency: "Kabupaten Bandung Barat",
    province: "Jawa Barat",
    postalCode: "40559",
    landmark: "Gerbang hijau di sisi kiri jalan, sekitar 300 meter setelah Masjid Al-Ikhlas Pasir Kawung.",
  },

  geo: {
    latitude: -6.8236,
    longitude: 107.5794,
    mapZoom: 16,
  },

  hours: {
    emergency: { label: "Ambulans dan pemulasaraan", value: "24 jam setiap hari, termasuk hari raya" },
    office: { label: "Kantor wakaf", value: "Senin–Sabtu, 08.00–16.00 WIB" },
    pilgrimage: { label: "Ziarah", value: "Setiap hari, 06.00–17.30 WIB" },
  },

  social: [
    { label: "Instagram", href: "https://www.instagram.com/tamanwakafsakinah" },
    { label: "YouTube", href: "https://www.youtube.com/@tamanwakafsakinah" },
    { label: "Facebook", href: "https://www.facebook.com/tamanwakafsakinah" },
  ],

  /** Tampilkan catatan "contoh testimoni" sampai testimoni asli (dengan izin keluarga) dipasang. */
  showSampleContentNotice: true,

  ambulance: {
    vehicles: {
      "ambulans-jenazah": {
        label: "Ambulans Jenazah",
        baseFare: 450_000,
        includedKm: 10,
        perKm: 9_000,
        escortCapacity: 2,
        allowsZones: true,
      },
      "mobil-jenazah": {
        label: "Mobil Jenazah (Hearse)",
        baseFare: 900_000,
        includedKm: 10,
        perKm: 12_000,
        escortCapacity: 3,
        allowsZones: true,
      },
      "antar-kota": {
        label: "Ambulans Antar-Kota",
        baseFare: 1_500_000,
        includedKm: 40,
        perKm: 8_500,
        escortCapacity: 2,
        allowsZones: false,
      },
    } satisfies Record<VehicleId, VehicleTariff>,
    zones: {
      dekat: { label: "Dekat", description: "Sampai 10 km, misalnya masih satu kecamatan", estimateKm: 10 },
      sedang: { label: "Sedang", description: "10–25 km, antarkota di Bandung Raya", estimateKm: 25 },
      jauh: { label: "Jauh", description: "25–60 km, sampai ujung Bandung Raya", estimateKm: 60 },
    } satisfies Record<ZoneId, DistanceZone>,
    coffins: {
      keranda: { label: "Keranda dan kain penutup", price: 250_000 },
      peti: { label: "Peti jenazah", price: 1_750_000 },
    } satisfies Record<CoffinType, { label: string; price: number }>,
    extraCrew: { label: "Dua tenaga angkat tambahan", price: 200_000 },
    maxDistanceKm: 3_000,
    excludedCosts: "tol, parkir, dan penyeberangan",
  },

  funeralCare: {
    packages: {
      dasar: { label: "Paket Dasar", price: 1_750_000 },
      lengkap: { label: "Paket Lengkap", price: 4_250_000 },
      wakaf: { label: "Paket Wakaf & Dhuafa", price: 0 },
    } satisfies Record<CarePackageId, { label: string; price: number }>,
  },

  waqf: {
    plotContribution: 12_500_000,
    installmentMonths: 12,
  },
} as const;

export const vehicleIds = Object.keys(site.ambulance.vehicles) as [VehicleId, ...VehicleId[]];
export const zoneIds = Object.keys(site.ambulance.zones) as [ZoneId, ...ZoneId[]];
export const coffinTypes = Object.keys(site.ambulance.coffins) as [CoffinType, ...CoffinType[]];
export const carePackageIds = Object.keys(site.funeralCare.packages) as [CarePackageId, ...CarePackageId[]];

export function isVehicleId(value: unknown): value is VehicleId {
  return typeof value === "string" && Object.hasOwn(site.ambulance.vehicles, value);
}

export function isCarePackageId(value: unknown): value is CarePackageId {
  return typeof value === "string" && Object.hasOwn(site.funeralCare.packages, value);
}

export const fullAddress = [
  site.address.street,
  site.address.village,
  site.address.district,
  site.address.regency,
  `${site.address.province} ${site.address.postalCode}`,
].join(", ");

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${site.geo.latitude},${site.geo.longitude}`;
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${site.geo.latitude},${site.geo.longitude}&z=${site.geo.mapZoom}&hl=id&output=embed`;
export const ambulanceTelHref = `tel:${site.contact.ambulancePhone}`;
