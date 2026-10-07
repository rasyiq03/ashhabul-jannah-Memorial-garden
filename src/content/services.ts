import { Ambulance, HandHeart, Landmark, MapPinned } from "lucide-react";
import { site } from "@/config/site";
import { BathingIcon } from "@/components/icons/ritual-icons";
import type { IconComponent } from "@/components/icons/types";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

export interface ServiceItem {
  title: string;
  description: string;
  icon: IconComponent;
  link: { label: string; href: string; external?: boolean };
}

const dhuafaWhatsAppMessage = `Assalamu'alaikum. Saya ingin bertanya tentang syarat makam dhuafa di ${site.shortName}.`;

export const servicesIntro = {
  title: "Apa yang bisa kami bantu",
  lead: "Sebagian keluarga menghubungi kami saat duka baru saja terjadi. Sebagian lagi datang jauh hari untuk menyiapkan wakaf kavling bagi orang tua atau dirinya sendiri. Pilih yang sedang Anda butuhkan.",
};

export const services: ServiceItem[] = [
  {
    title: "Ambulans jenazah",
    description:
      "Penjemputan dari rumah, rumah sakit, atau luar kota. Siaga 24 jam, termasuk hari Minggu dan tanggal merah.",
    icon: Ambulance,
    link: { label: "Lihat armada dan tarif", href: "#ambulans" },
  },
  {
    title: "Pemulasaraan jenazah",
    description:
      "Memandikan, mengkafani, dan menyalatkan jenazah oleh petugas yang sejenis kelamin dengan almarhum atau almarhumah, di rumah duka, rumah sakit, atau ruang pemulasaraan kami.",
    icon: BathingIcon,
    link: { label: "Lihat tahapan dan paket", href: "#pemulasaraan" },
  },
  {
    title: "Kavling makam wakaf",
    description: `Satu kavling berukuran ${site.facts.plotSize} untuk Anda atau keluarga. Kontribusinya ikut membiayai makam dhuafa dan bisa dicicil ${site.waqf.installmentMonths} kali.`,
    icon: Landmark,
    link: { label: "Baca isi paket wakaf", href: "#manfaat-wakaf" },
  },
  {
    title: "Makam dhuafa",
    description:
      "Keluarga yang tidak mampu tidak dipungut biaya untuk liang lahat, kain kafan, dan pemakaman. Cukup bawa surat keterangan tidak mampu dari desa atau kelurahan.",
    icon: HandHeart,
    link: { label: "Tanyakan syaratnya lewat WhatsApp", href: businessWhatsAppUrl(dhuafaWhatsAppMessage), external: true },
  },
  {
    title: "Ziarah dan perawatan makam",
    description:
      "Area ziarah dibuka setiap hari. Rumput dipangkas dan nisan dibersihkan rutin. Keluarga yang tinggal jauh boleh meminta foto kondisi makam lewat WhatsApp.",
    icon: MapPinned,
    link: { label: "Lihat jam ziarah dan lokasi", href: "#lokasi" },
  },
];
