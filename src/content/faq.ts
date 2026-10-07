import { site } from "@/config/site";
import { formatRupiah } from "@/lib/format";

export interface FaqItem {
  question: string;
  answer: string;
}

const hearseVehicle = site.ambulance.vehicles["ambulans-jenazah"];

export const faqIntro = {
  title: "Pertanyaan yang sering diajukan",
  lead: "Belum menemukan jawabannya? Tanyakan langsung lewat WhatsApp, kami balas pada jam kantor. Untuk keadaan darurat, langsung telepon.",
  whatsappLabel: "Tanyakan lewat WhatsApp",
  whatsappMessage: `Assalamu'alaikum. Saya punya pertanyaan untuk ${site.shortName}: `,
};

export const faqItems: FaqItem[] = [
  {
    question: "Bagaimana cara memesan ambulans jenazah?",
    answer: `Telepon ${site.contact.ambulancePhoneDisplay} atau isi formulir pemesanan di bagian Ambulans. Setelah formulir terkirim, Anda mendapat nomor tiket dan tombol untuk mengirim data ke WhatsApp kami. Petugas jaga lalu menelepon untuk memastikan alamat dan biaya sebelum armada berangkat.`,
  },
  {
    question: "Berapa biaya ambulans, dan apa saja yang sudah termasuk?",
    answer: `Ambulans Jenazah mulai ${formatRupiah(hearseVehicle.baseFare)} untuk ${hearseVehicle.includedKm} km pertama, sudah termasuk sopir dan satu petugas pendamping. Kelebihan jarak dihitung ${formatRupiah(hearseVehicle.perKm)} per km. Biaya ${site.ambulance.excludedCosts} dibayar sesuai struk. Gunakan kalkulator di bagian Ambulans untuk perkiraan awal.`,
  },
  {
    question: "Apakah layanan buka 24 jam, termasuk hari libur?",
    answer: `Ambulans dan pemulasaraan siaga 24 jam setiap hari, termasuk Idulfitri dan Iduladha. Urusan administrasi wakaf dilayani di kantor pada ${site.hours.office.value}.`,
  },
  {
    question: "Wilayah mana saja yang dilayani?",
    answer: "Ambulans Jenazah dan Mobil Jenazah melayani Bandung Raya: Kota Bandung, Kabupaten Bandung, Bandung Barat, dan Cimahi. Ambulans Antar-Kota melayani tujuan di Pulau Jawa, Bali, dan Sumatra lewat jalur darat. Untuk tujuan lain, hubungi kami dan kami bantu carikan mitra di kota tujuan.",
  },
  {
    question: "Apa syarat untuk layanan pemulasaraan?",
    answer: "Siapkan surat keterangan kematian dan fotokopi KTP almarhum/ah, serta pastikan ada satu anggota keluarga yang mendampingi. Bila almarhum/ah menderita penyakit menular, sampaikan sejak awal agar petugas membawa alat pelindung diri yang sesuai.",
  },
  {
    question: "Apakah petugas yang memandikan sejenis kelamin dengan jenazah?",
    answer: "Ya. Jenazah laki-laki dimandikan petugas laki-laki dan jenazah perempuan oleh petugas perempuan. Suami atau istri dan keluarga mahram boleh ikut membantu bila berkenan.",
  },
  {
    question: "Bagaimana cara berwakaf kavling makam?",
    answer: `Hubungi kami lewat WhatsApp atau datang ke kantor. Petugas akan mengajak Anda melihat blok yang masih tersedia, lalu ikrar wakaf dilakukan di hadapan nazhir dan dua orang saksi. Kontribusinya ${formatRupiah(site.waqf.plotContribution)} per kavling, bisa tunai atau dicicil ${site.waqf.installmentMonths} kali.`,
  },
  {
    question: "Siapa yang berhak atas makam dhuafa?",
    answer: "Warga yang tidak mampu dengan surat keterangan tidak mampu dari desa atau kelurahan. Liang lahat, kain kafan, pemandian, dan pemakaman tidak dipungut biaya.",
  },
  {
    question: "Apakah makam boleh dibangun kijing atau dipasang keramik?",
    answer: "Tidak. Semua makam dibiarkan berupa tanah berumput dengan nisan seragam. Selain mengikuti tuntunan untuk tidak meninggikan kubur, cara ini menjaga tanah tetap menyerap air dan memudahkan perawatan.",
  },
  {
    question: "Saya tinggal jauh. Bisakah saya mengetahui kondisi makam keluarga?",
    answer: "Bisa. Kirim nama almarhum/ah dan blok makamnya lewat WhatsApp. Petugas perawatan akan mengirimkan foto terbaru, biasanya dalam dua hari kerja.",
  },
  {
    question: "Bisakah pesanan ambulans dibatalkan?",
    answer: "Bisa, tanpa biaya, selama armada belum berangkat. Bila armada sudah dalam perjalanan, kami hanya menagih biaya bahan bakar sesuai jarak yang sudah ditempuh.",
  },
];
