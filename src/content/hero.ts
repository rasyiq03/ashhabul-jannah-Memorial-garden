import { site } from "@/config/site";

export const heroContent = {
  title: "Peristirahatan terakhir di taman yang teduh, dijaga sebagai amanah wakaf.",
  lead: `${site.shortName} adalah pemakaman Muslim di ${site.address.regency} yang lahannya diwakafkan untuk umat. Bila waktunya tiba, petugas kami menjemput jenazah, memandikan dan mengkafani, menyalatkan, lalu memakamkannya. Setelah itu, makamnya tetap kami rawat.`,
  waqfCta: {
    label: "Konsultasi wakaf",
    message: `Assalamu'alaikum. Saya ingin berkonsultasi tentang wakaf kavling makam di ${site.shortName}.`,
  },
  ambulanceCtaLabel: "Panggil ambulans 24 jam",
  licenseLabel: "Berizin resmi",
  illustrationAlt:
    "Ilustrasi taman makam saat fajar di dalam bingkai lengkung: deretan nisan sederhana di atas rumput, pepohonan peneduh, dan jalan setapak menuju perbukitan.",
};

export const emergencyStripContent = {
  prompt: "Ada keluarga yang baru saja wafat?",
  detail: "Petugas jaga siap menjemput kapan pun, termasuk tengah malam dan hari raya.",
  callLabel: "Telepon petugas jaga",
  whatsappLabel: "WhatsApp",
  whatsappMessage: `Assalamu'alaikum, saya butuh bantuan ambulans jenazah dari ${site.shortName}. Lokasi penjemputan: `,
};
