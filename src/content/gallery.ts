export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const galleryIntro = {
  title: "Suasana di dalam taman",
  lead: "Gambaran area dan fasilitas yang akan Anda temui saat berziarah atau mengantar jenazah. Ketuk gambar untuk memperbesar.",
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/jalur-blok.svg",
    width: 800,
    height: 600,
    alt: "Jalan setapak batu di antara deretan nisan putih yang seragam, diapit pohon peneduh.",
    caption: "Jalur setapak di antara blok makam",
  },
  {
    src: "/gallery/gerbang.svg",
    width: 800,
    height: 600,
    alt: "Gerbang masuk berbentuk lengkung dengan pagar rendah dan dua pohon di kanan kirinya.",
    caption: "Gerbang utama dari arah jalan desa",
  },
  {
    src: "/gallery/musala.svg",
    width: 800,
    height: 600,
    alt: "Musala kecil berkubah hijau dengan jendela lengkung, tempat salat jenazah.",
    caption: "Musala untuk salat jenazah dan peziarah",
  },
  {
    src: "/gallery/ruang-pemulasaraan.svg",
    width: 800,
    height: 600,
    alt: "Ruang pemulasaraan yang terang dengan jendela lengkung, rak kain kafan terlipat, dan keran air.",
    caption: "Ruang pemulasaraan dengan air hangat",
  },
  {
    src: "/gallery/armada.svg",
    width: 800,
    height: 600,
    alt: "Ambulans jenazah berwarna putih dengan garis hijau, terparkir di depan gerbang.",
    caption: "Ambulans jenazah siaga di pos jaga",
  },
  {
    src: "/gallery/taman-sore.svg",
    width: 800,
    height: 600,
    alt: "Pohon besar yang rindang dengan bangku kayu di bawahnya saat matahari sore.",
    caption: "Bangku teduh untuk keluarga peziarah",
  },
];
