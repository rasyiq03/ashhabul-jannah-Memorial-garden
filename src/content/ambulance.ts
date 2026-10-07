import { site, type VehicleId } from "@/config/site";

export const ambulanceIntro = {
  title: "Layanan ambulans jenazah",
  lead: "Telepon kami kapan pun, siang atau tengah malam. Petugas jaga akan menanyakan alamat penjemputan dan tujuan pemakaman, lalu menyampaikan perkiraan biaya dan waktu tiba sebelum armada berangkat.",
};

export const emergencyBanner = {
  title: "Darurat 24 jam",
  body: "Jika telepon sedang sibuk, kirim alamat penjemputan lewat WhatsApp. Petugas jaga akan menelepon balik.",
  callLabel: `Telepon ${site.contact.ambulancePhoneDisplay}`,
  whatsappLabel: "Kirim alamat lewat WhatsApp",
  whatsappMessage: "Assalamu'alaikum, saya butuh ambulans jenazah. Alamat penjemputan: ",
};

export const ambulanceSubheadings = {
  fleet: "Pilihan armada",
  flow: "Dari telepon sampai pemakaman",
  checklistTitle: "Yang perlu disiapkan keluarga",
  checklistLead: "Tidak semua harus lengkap sebelum menelepon. Dokumen yang belum ada bisa menyusul, petugas akan membantu.",
};

export const fleetLabels = {
  facilities: "Fasilitas",
  capacity: "Kapasitas",
  coverage: "Cakupan wilayah",
  priceFrom: "Estimasi harga mulai dari",
  orderPrefix: "Pesan",
};

export interface FleetItem {
  id: VehicleId;
  summary: string;
  facilities: string[];
  capacity: string;
  coverage: string;
}

export const fleet: FleetItem[] = [
  {
    id: "ambulans-jenazah",
    summary: "Untuk menjemput dari rumah sakit ke rumah duka, atau langsung ke masjid dan pemakaman.",
    facilities: [
      "Brankar jenazah dengan sabuk pengaman",
      "Kabin jenazah berpendingin, terpisah dari kursi keluarga",
      "Sopir dan satu petugas pendamping",
    ],
    capacity: "1 jenazah dan 2 pendamping keluarga",
    coverage: "Bandung Raya: Kota dan Kabupaten Bandung, Bandung Barat, Cimahi",
  },
  {
    id: "mobil-jenazah",
    summary:
      "Kabin panjang dengan rel keranda, dipakai untuk iring-iringan dari rumah duka atau masjid menuju pemakaman.",
    facilities: [
      "Rel dan pengunci keranda",
      "Kain penutup keranda hijau berbordir kalimat tauhid",
      "Kursi pendamping menghadap jenazah",
      "Sopir dan dua petugas angkat",
    ],
    capacity: "1 jenazah dalam keranda dan 3 pendamping",
    coverage: "Bandung Raya",
  },
  {
    id: "antar-kota",
    summary: "Memulangkan jenazah ke kampung halaman lewat jalur darat, berangkat pada hari yang sama bila dokumen lengkap.",
    facilities: [
      "Dua sopir yang bergantian",
      "Peti jenazah standar perjalanan jauh tersedia",
      "Kabar posisi lewat WhatsApp di setiap pemberhentian",
    ],
    capacity: "1 jenazah dan 2 pendamping keluarga",
    coverage: "Pulau Jawa, Bali, dan Sumatra lewat Merak–Bakauheni",
  },
];

export interface FlowStep {
  title: string;
  body: string;
}

export const ambulanceFlow: FlowStep[] = [
  {
    title: "Hubungi",
    body: "Telepon atau kirim WhatsApp. Sebutkan nama almarhum/ah, alamat penjemputan, dan tujuan pemakaman.",
  },
  {
    title: "Konfirmasi & estimasi",
    body: "Petugas jaga menghitung jarak dan menyampaikan perkiraan biaya. Armada baru berangkat setelah keluarga setuju.",
  },
  {
    title: "Armada berangkat",
    body: "Sopir dan petugas pendamping menuju lokasi. Nomor sopir kami kirim lewat WhatsApp supaya keluarga bisa menghubunginya langsung.",
  },
  {
    title: "Antar ke pemakaman",
    body: "Jenazah diantar ke rumah duka, ke masjid untuk disalatkan, atau langsung ke pemakaman, sesuai keinginan keluarga.",
  },
];

export interface ChecklistItem {
  item: string;
  note?: string;
}

export const familyChecklist: ChecklistItem[] = [
  {
    item: "Surat keterangan kematian",
    note: "Dari rumah sakit, puskesmas, atau dokter yang memeriksa. Bila wafat di rumah, kami bantu arahkan ke puskesmas terdekat.",
  },
  { item: "Fotokopi KTP dan Kartu Keluarga almarhum/ah" },
  { item: "KTP satu anggota keluarga yang ikut mendampingi" },
  {
    item: "Surat pengantar RT/RW",
    note: "Diperlukan bila jenazah dimakamkan di luar daerah domisili.",
  },
  {
    item: "Surat izin angkut jenazah untuk perjalanan antar-kota",
    note: "Biasanya diterbitkan rumah sakit. Bila belum ada, petugas kami membantu mengurusnya.",
  },
  { item: "Kain jarik atau selimut bersih untuk menutup jenazah selama perjalanan", note: "Opsional." },
];

export const bookingFormCopy = {
  title: "Pesan ambulans lewat formulir",
  lead: "Isi data di bawah bila Anda ingin menjadwalkan penjemputan. Untuk keadaan yang mendesak, telepon lebih cepat daripada mengisi formulir.",
  submitLabel: "Pesan ambulans sekarang",
  submittingLabel: "Mengirim pesanan…",
  nowButtonLabel: "Jemput secepatnya",
  estimateTitle: "Perkiraan biaya",
  estimateEmpty: "Pilih jenis armada dan jarak, perkiraan biaya akan muncul di sini.",
  estimateDisclaimerLead: "Ini estimasi, bukan harga final.",
  estimateDisclaimer: `Belum termasuk ${site.ambulance.excludedCosts}. Harga pasti disampaikan petugas saat konfirmasi.`,
};

export const ambulanceReceiptCopy = {
  title: "Pesanan ambulans tercatat",
  body: "Simpan nomor tiket ini. Langkah berikutnya: kirim data ke WhatsApp kami agar petugas jaga bisa segera menelepon Anda untuk konfirmasi.",
  whatsappLabel: "Konfirmasi via WhatsApp",
  resetLabel: "Buat pesanan baru",
};
