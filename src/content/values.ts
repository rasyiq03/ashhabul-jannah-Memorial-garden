import { Accessibility, Compass, Sprout, TreeDeciduous } from "lucide-react";
import type { IconComponent } from "@/components/icons/types";

export interface ValueItem {
  title: string;
  body: string;
  icon: IconComponent;
}

export const valuesIntro = {
  title: "Pilihan tepat pemakaman Muslim berbasis wakaf",
  lead: "Empat hal yang paling sering ditanyakan keluarga saat pertama kali berkunjung, dan bagaimana kami menjalankannya di lapangan.",
};

export const values: ValueItem[] = [
  {
    title: "Asri",
    body: "Setiap blok dibatasi pohon peneduh seperti tanjung dan ketapang kencana, jadi peziarah tidak kepanasan di siang hari. Jalur setapaknya dari batu alam dan tetap bisa dilewati saat musim hujan.",
    icon: TreeDeciduous,
  },
  {
    title: "Nyaman",
    body: "Musala, tempat wudu, toilet, dan parkir bus ada di dekat gerbang. Pelayat lansia bisa kami antar dengan kursi roda sampai ke tepi makam.",
    icon: Accessibility,
  },
  {
    title: "Sesuai syariah",
    body: "Jenazah dimakamkan menghadap kiblat. Makam dibiarkan berupa tanah berumput dengan nisan sederhana yang seragam, tanpa kijing atau bangunan di atasnya.",
    icon: Compass,
  },
  {
    title: "Ramah lingkungan",
    body: "Lahan tidak ditutup semen sehingga air hujan tetap meresap. Rumput dan daun hasil perawatan diolah menjadi kompos untuk taman ini sendiri.",
    icon: Sprout,
  },
];
