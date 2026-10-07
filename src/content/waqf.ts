import {
  Ambulance,
  BookOpen,
  Droplet,
  GraduationCap,
  HandHeart,
  Landmark,
  Mosque,
  Soup,
  TreeDeciduous,
} from "lucide-react";
import { site } from "@/config/site";
import type { IconComponent } from "@/components/icons/types";

export const waqfIntro = {
  title: "Yang Anda dapatkan dari paket wakaf kavling",
  lead: "Dana wakaf kavling tidak berhenti di satu makam. Sebagian dipakai untuk menyediakan makam dhuafa dan membiayai program sosial yayasan, sehingga manfaatnya terus berjalan setelah pewakaf berpulang.",
};

export const waqfHadith = {
  text: "Apabila manusia meninggal dunia, terputuslah amalnya kecuali dari tiga perkara: sedekah jariyah, ilmu yang dimanfaatkan, atau anak saleh yang mendoakannya.",
  source: "HR. Muslim",
};

export interface WaqfBenefit {
  title: string;
  body: string;
}

export const waqfBenefits: WaqfBenefit[] = [
  {
    title: "Satu kavling untuk pewakaf",
    body: `Kavling berukuran ${site.facts.plotSize} di blok yang Anda pilih, dicatat atas nama orang yang Anda tunjuk. Boleh untuk diri sendiri atau anggota keluarga.`,
  },
  {
    title: "Kontribusi untuk makam dhuafa",
    body: "Sebagian dana dari setiap paket menyediakan liang lahat dan perlengkapan pemakaman bagi warga yang tidak mampu.",
  },
  {
    title: "Pengurusan jenazah tanpa biaya",
    body: "Saat waktunya tiba, pemandian, pengafanan, salat jenazah, ambulans dalam Bandung Raya, dan pemakaman ditanggung penuh. Keluarga cukup menelepon kami.",
  },
  {
    title: "Ikut membiayai program kebaikan lain",
    body: "Hasil pengelolaan wakaf disalurkan ke program yayasan, dari beasiswa santri sampai sumur air bersih.",
  },
];

export const waqfOffer = {
  priceNote: `per kavling, bisa dicicil ${site.waqf.installmentMonths} kali tanpa tambahan biaya`,
  ctaLabel: "Tanyakan ketersediaan kavling",
  ctaMessage: `Assalamu'alaikum. Saya ingin menanyakan ketersediaan kavling wakaf di ${site.shortName} dan cara pembayarannya.`,
};

export interface WaqfProgram {
  title: string;
  body: string;
  icon: IconComponent;
}

export const waqfProgramsIntro = {
  title: "Sembilan program wakaf yang bisa Anda pilih",
  lead: "Selain kavling, wakaf bisa disalurkan ke salah satu program berikut. Nominalnya bebas.",
};

export const waqfPrograms: WaqfProgram[] = [
  { title: "Wakaf kavling makam", body: "Kavling untuk diri sendiri atau keluarga.", icon: Landmark },
  { title: "Makam dhuafa", body: "Liang lahat dan kafan untuk warga tidak mampu.", icon: HandHeart },
  { title: "Ambulans jenazah", body: "Membantu biaya armada yang melayani keluarga dhuafa tanpa tarif.", icon: Ambulance },
  { title: "Sumur dan air bersih", body: "Sumur bor untuk desa yang kesulitan air saat kemarau.", icon: Droplet },
  { title: "Mushaf Al-Qur'an", body: "Mushaf untuk musala, pesantren, dan taman pendidikan Al-Qur'an.", icon: BookOpen },
  { title: "Beasiswa santri yatim", body: "Biaya sekolah dan mondok bagi anak yatim di sekitar Bandung Barat.", icon: GraduationCap },
  { title: "Pohon peneduh", body: "Satu pohon ditanam dan dirawat di area makam.", icon: TreeDeciduous },
  { title: "Musala dan masjid", body: "Perbaikan atap, tempat wudu, dan karpet masjid kampung.", icon: Mosque },
  {
    title: "Makanan untuk keluarga duka",
    body: "Hidangan sederhana untuk keluarga yang baru kehilangan, mengikuti sunah mengirim makanan kepada keluarga yang berduka.",
    icon: Soup,
  },
];
