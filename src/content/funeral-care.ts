import { site, type CarePackageId } from "@/config/site";
import { BathingIcon, BurialIcon, PrayerIcon, ShroudIcon } from "@/components/icons/ritual-icons";
import type { IconComponent } from "@/components/icons/types";
import type { BodyLocation, DeceasedGender, Relationship } from "@/lib/schemas/funeral-care";

export const istirja = {
  arabic: "إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
  latin: "Innalillahi wa inna ilaihi raji'un",
  meaning: "Sesungguhnya kami milik Allah, dan kepada-Nya kami kembali. (QS. Al-Baqarah: 156)",
};

export const funeralCareIntro = {
  title: "Pemulasaraan jenazah",
  lead: "Kami turut berduka. Di bawah ini kami jelaskan apa saja yang akan dilakukan petugas terhadap jenazah keluarga Anda, langkah demi langkah, supaya tidak ada yang terasa asing.",
};

export interface CareStage {
  title: string;
  duration: string;
  body: string;
  icon: IconComponent;
}

export const careStages: CareStage[] = [
  {
    title: "Memandikan",
    duration: "30–45 menit",
    body: "Jenazah dibaringkan di tempat tertutup dan auratnya tetap berselimut kain selama dimandikan. Petugas membersihkan kotoran lebih dulu, mewudukan, lalu menyiramkan air bersih dan air daun bidara, diakhiri air kapur barus. Keluarga mahram boleh ikut membantu bila berkenan.",
    icon: BathingIcon,
  },
  {
    title: "Mengkafani",
    duration: "20–30 menit",
    body: "Jenazah laki-laki dibalut tiga lapis kain putih. Jenazah perempuan dikafani dengan lima bagian: kain sarung, baju kurung, kerudung, dan dua lapis kain pembungkus. Kapas berwewangian diletakkan pada anggota sujud.",
    icon: ShroudIcon,
  },
  {
    title: "Menyalatkan",
    duration: "10–15 menit",
    body: "Salat jenazah dengan empat takbir bisa dilaksanakan di rumah duka, masjid terdekat, atau musala kami. Bila belum ada imam, petugas kami siap memimpin.",
    icon: PrayerIcon,
  },
  {
    title: "Memakamkan",
    duration: "30–60 menit",
    body: "Jenazah diturunkan ke liang lahat dan dibaringkan miring ke kanan menghadap kiblat. Simpul kafan dilepas, liang ditutup papan lalu tanah. Doa di atas makam dipimpin petugas atau ustaz yang ditunjuk keluarga.",
    icon: BurialIcon,
  },
];

export interface CareCommitment {
  title: string;
  body: string;
}

export const careCommitments: CareCommitment[] = [
  {
    title: "Petugas sejenis kelamin",
    body: "Jenazah laki-laki diurus petugas laki-laki, jenazah perempuan oleh petugas perempuan. Untuk anak kecil, keluarga boleh memilih.",
  },
  {
    title: "Terlatih fikih jenazah",
    body: "Petugas dibekali tata cara pemulasaraan sesuai syariat, termasuk penanganan jenazah pasien penyakit menular sesuai pedoman dinas kesehatan.",
  },
  {
    title: "Menjaga kehormatan",
    body: "Tidak ada foto atau video selama proses. Kondisi tubuh jenazah tidak akan kami ceritakan kepada siapa pun.",
  },
  {
    title: "Di tempat yang Anda pilih",
    body: "Rumah duka, kamar jenazah rumah sakit, atau ruang pemulasaraan di kompleks kami yang dilengkapi air hangat dan meja mandi jenazah.",
  },
];

export const funeralSubheadings = {
  commitments: "Yang kami jaga selama prosesnya",
  packagesTitle: "Paket pemulasaraan",
  packagesLead:
    "Ketiga paket dikerjakan oleh tim dan tata cara yang sama. Bedanya hanya pada perlengkapan dan layanan yang disertakan.",
  freeLabel: "Tanpa biaya",
  choosePrefix: "Pilih",
  documentsTitle: "Dokumen yang dibutuhkan",
  documentsNote:
    "Bila ada dokumen yang belum lengkap, pemulasaraan tetap bisa dimulai. Petugas akan mengingatkan apa yang perlu menyusul.",
};

export interface CarePackageContent {
  id: CarePackageId;
  audience: string;
  footnote?: string;
}

export const carePackages: CarePackageContent[] = [
  {
    id: "dasar",
    audience: "Untuk keluarga yang sudah menyiapkan ambulans, keranda, dan tempat pemakaman sendiri.",
  },
  {
    id: "lengkap",
    audience: "Satu tim mengurus dari pemandian sampai jenazah dimakamkan. Keluarga cukup mendampingi.",
    footnote: "Ambulans di luar Bandung Raya dihitung terpisah.",
  },
  {
    id: "wakaf",
    audience:
      "Bagi pewakaf kavling di sini dan keluarga yang membawa surat keterangan tidak mampu dari desa atau kelurahan.",
    footnote: "Dibiayai dari dana wakaf dan infak peziarah.",
  },
];

export interface CarePackageFeature {
  label: string;
  includedIn: CarePackageId[];
}

export const carePackageFeatures: CarePackageFeature[] = [
  { label: "Dua petugas pemandi sejenis kelamin", includedIn: ["dasar", "lengkap", "wakaf"] },
  { label: "Perlengkapan mandi: sabun, daun bidara, kapur barus", includedIn: ["dasar", "lengkap", "wakaf"] },
  { label: "Kain kafan katun mori, kapas, dan wewangian", includedIn: ["dasar", "lengkap", "wakaf"] },
  { label: "Keranda dan kain penutup", includedIn: ["lengkap", "wakaf"] },
  { label: "Imam salat jenazah", includedIn: ["lengkap", "wakaf"] },
  { label: "Ambulans jenazah dalam Bandung Raya", includedIn: ["lengkap", "wakaf"] },
  { label: "Penggalian dan penutupan liang lahat", includedIn: ["lengkap", "wakaf"] },
];

export const familyGuideIntro = {
  title: "Saat ada keluarga yang wafat",
  lead: "Tidak ada yang benar-benar siap menghadapi saat ini. Langkah berikut bisa Anda ikuti pelan-pelan, satu per satu.",
};

export const familyGuideSteps: { title: string; body: string }[] = [
  {
    title: "Ucapkan istirja' dan tenangkan diri",
    body: "Innalillahi wa inna ilaihi raji'un. Tidak perlu tergesa-gesa di menit-menit pertama. Duduklah sejenak dan ajak keluarga yang ada di dekat Anda.",
  },
  {
    title: "Pejamkan mata dan rapikan posisi jenazah",
    body: "Pejamkan matanya dengan lembut, rapatkan mulutnya, luruskan tangan dan kaki, lalu tutup seluruh tubuh dengan kain. Lepaskan perhiasan bila mudah dilepas.",
  },
  {
    title: "Minta surat keterangan kematian",
    body: "Di rumah sakit, surat ini diterbitkan dokter jaga. Bila wafat di rumah, hubungi puskesmas atau dokter terdekat.",
  },
  {
    title: "Kabari keluarga inti dan pengurus RT atau masjid",
    body: "Tunjuk satu orang untuk menyebarkan kabar, supaya yang lain bisa tetap mendampingi.",
  },
  {
    title: "Hubungi kami untuk pemulasaraan dan ambulans",
    body: `Sebutkan lokasi jenazah, jenis kelaminnya, dan rencana tempat pemakaman. Telepon ${site.contact.ambulancePhoneDisplay} atau isi formulir di bawah.`,
  },
  {
    title: "Sepakati tempat dan waktu pemakaman",
    body: "Menyegerakan pemakaman adalah sunah. Bila ada keluarga yang masih dalam perjalanan, sampaikan kepada petugas agar jadwal disesuaikan sewajarnya.",
  },
  {
    title: "Catat urusan almarhum/ah",
    body: "Utang, wasiat, dan amanah almarhum/ah dicatat untuk diselesaikan ahli waris. Urusan ini tidak harus selesai hari ini.",
  },
];

export const requiredDocuments: string[] = [
  "Surat keterangan kematian dari rumah sakit, puskesmas, atau dokter",
  "Fotokopi KTP dan Kartu Keluarga almarhum/ah",
  "KTP keluarga yang menjadi penanggung jawab",
  "Surat pengantar RT/RW bila dimakamkan di luar domisili",
  "Surat keterangan tidak mampu dari desa atau kelurahan, untuk Paket Wakaf & Dhuafa",
  "Nomor ikrar wakaf, bagi pewakaf kavling",
];

export const relationshipLabels: Record<Relationship, string> = {
  pasangan: "Suami atau istri",
  anak: "Anak",
  "orang-tua": "Orang tua",
  saudara: "Saudara kandung",
  kerabat: "Kerabat lain",
  tetangga: "Tetangga atau pengurus masjid",
  "rumah-sakit": "Petugas rumah sakit",
  lainnya: "Lainnya",
};

export const genderLabels: Record<DeceasedGender, string> = {
  "laki-laki": "Laki-laki",
  perempuan: "Perempuan",
};

export const bodyLocationLabels: Record<BodyLocation, string> = {
  rumah: "Rumah",
  "rumah-sakit": "Rumah sakit",
  lainnya: "Tempat lain",
};

export const funeralFormCopy = {
  title: "Formulir permohonan pemulasaraan",
  lead: "Data ini membantu kami mengutus petugas yang tepat dan membawa perlengkapan yang sesuai. Kolom yang tidak Anda ketahui pasti boleh diisi perkiraan.",
  submitLabel: "Kirim permohonan pemulasaraan",
  submittingLabel: "Mengirim permohonan…",
};

export const funeralReceiptCopy = {
  title: "Permohonan pemulasaraan tercatat",
  body: "Semoga Allah memberi ketabahan kepada keluarga yang ditinggalkan. Kirim data ini ke WhatsApp kami supaya koordinator petugas segera menghubungi Anda.",
  whatsappLabel: "Kirim data ke WhatsApp",
  resetLabel: "Isi permohonan lain",
};
