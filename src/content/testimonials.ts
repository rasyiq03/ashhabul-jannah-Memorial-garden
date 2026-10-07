export interface Testimonial {
  quote: string;
  name: string;
  context: string;
}

export const testimonialsIntro = {
  title: "Cerita keluarga",
  sampleNotice:
    "Contoh testimoni dengan nama samaran. Ganti dengan cerita keluarga yang sudah memberi izin sebelum situs dipublikasikan.",
};

/** Testimoni fiktif bernama samaran. Lihat ASSUMPTIONS.md. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Ayah wafat menjelang subuh dan saya tidak tahu harus menghubungi siapa dulu. Petugas di telepon menuntun saya pelan-pelan: minta surat dari puskesmas, kabari Pak RT, lalu tunggu. Sebelum pukul enam mereka sudah datang, dan Ayah dimandikan di kamarnya sendiri.",
    name: "Bu Rahmawati",
    context: "Cimahi, ambulans dan pemulasaraan",
  },
  {
    quote:
      "Ibu meninggal di rumah sakit di Bandung, sementara keluarga besar menunggu di Padang. Ambulans antar-kota berangkat malam itu juga dengan dua sopir. Setiap kali berhenti, mereka mengabari posisi lewat WhatsApp, jadi kami di kampung bisa menyiapkan pemakaman.",
    name: "Pak Hendra",
    context: "Bandung, ambulans antar-kota",
  },
  {
    quote:
      "Kami mengambil kavling wakaf tiga tahun lalu, niatnya untuk kami berdua. Bulan lalu suami saya berpulang. Saya cukup menelepon sekali, sisanya diurus. Saya bahkan diantar dengan kursi roda sampai ke tepi makam.",
    name: "Bu Siti",
    context: "Lembang, pewakaf kavling",
  },
];
