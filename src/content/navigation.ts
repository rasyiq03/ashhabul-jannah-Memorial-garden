import { site } from "@/config/site";

export const headerContent = {
  whatsappLabel: "Hubungi WhatsApp",
  whatsappMessage: `Assalamu'alaikum, saya ingin bertanya tentang layanan ${site.shortName}.`,
  emergencyLabel: "Darurat ambulans",
  menuOpen: "Buka menu",
  menuClose: "Tutup menu",
};

export const footerContent = {
  managedBy: `Dikelola oleh ${site.nazhir} sebagai nazhir wakaf.`,
  menuHeading: "Menu",
  contactHeading: "Kontak",
  emergencyLabel: "Petugas jaga 24 jam",
  whatsappLabel: "WhatsApp",
  emailLabel: "Email",
  addressLabel: "Alamat",
  rights: "Hak cipta dilindungi.",
  waqfNote: "Lahan ini wakaf. Tidak diperjualbelikan dan tidak diwariskan.",
};

export interface NavItem {
  label: string;
  sectionId: string;
}

/** Urutan mengikuti urutan seksi di halaman agar penanda menu aktif bergerak searah gulir. */
export const primaryNav: NavItem[] = [
  { label: "Layanan", sectionId: "layanan" },
  { label: "Ambulans", sectionId: "ambulans" },
  { label: "Pemulasaraan", sectionId: "pemulasaraan" },
  { label: "Manfaat", sectionId: "manfaat-wakaf" },
  { label: "Testimoni", sectionId: "testimoni" },
  { label: "Galeri", sectionId: "galeri" },
  { label: "Lokasi", sectionId: "lokasi" },
];

/** Jangkar form, dipakai tombol "pesan/pilih" untuk menggulir ke form yang tepat. */
export const formAnchors = {
  ambulance: "pesan-ambulans",
  funeralCare: "form-pemulasaraan",
} as const;

export const footerNav: NavItem[] = [
  ...primaryNav,
  { label: "Pertanyaan umum", sectionId: "faq" },
  { label: "Hubungi kami", sectionId: "hubungi" },
];
