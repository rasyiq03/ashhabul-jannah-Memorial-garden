import { site } from "@/config/site";
import type { ContactTopic } from "@/lib/schemas/contact";

export const contactTopicLabels: Record<ContactTopic, string> = {
  "kavling-wakaf": "Kavling makam wakaf",
  ambulans: "Layanan ambulans",
  pemulasaraan: "Pemulasaraan jenazah",
  "makam-dhuafa": "Makam dhuafa",
  "ziarah-perawatan": "Ziarah dan perawatan makam",
  "program-wakaf": "Program wakaf lainnya",
};

export const contactContent = {
  title: "Ingin bertanya dulu?",
  lead: "Tinggalkan nama dan nomor WhatsApp Anda. Kami membalas pada jam kantor, biasanya di hari yang sama.",
  emergencyNote: `Bila ada keluarga yang baru wafat, jangan menunggu balasan. Telepon petugas jaga di ${site.contact.ambulancePhoneDisplay}.`,
  directLabels: { emergency: "Petugas jaga 24 jam", whatsapp: "WhatsApp", email: "Email" },
  submitLabel: "Kirim pertanyaan",
  submittingLabel: "Mengirim pertanyaan…",
};

export const contactReceiptCopy = {
  title: "Pertanyaan Anda sudah kami terima",
  body: "Terima kasih. Bila ingin dibalas lebih cepat, kirim pertanyaan yang sama ke WhatsApp kami dengan tombol di bawah.",
  whatsappLabel: "Kirim pertanyaan ke WhatsApp",
  resetLabel: "Tulis pertanyaan lain",
};

export const notFoundContent = {
  title: "Halaman ini tidak kami temukan",
  body: "Mungkin tautannya sudah berubah atau ada salah ketik di alamatnya. Halaman utama berisi semua informasi layanan kami.",
  emergency: `Bila Anda sedang mencari bantuan untuk jenazah keluarga, jangan menunggu. Telepon petugas jaga di ${site.contact.ambulancePhoneDisplay}, siang maupun malam.`,
  homeLabel: "Kembali ke halaman utama",
  callLabel: "Telepon petugas jaga",
};
