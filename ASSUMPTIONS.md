# Asumsi dan keputusan

Keputusan yang diambil sendiri karena brief ambigu atau bertentangan. Semua data di bawah perlu ditinjau sebelum situs dipublikasikan.

## Konflik di dalam brief

- **Font.** Bagian tech stack meminta Plus Jakarta Sans dan Playfair Display, tetapi bagian anti-AI-slop melarang keduanya. Saya mengikuti larangan tersebut dan memakai **Newsreader** (judul) dan **Figtree** (teks), sesuai contoh yang disarankan brief. Alasannya di `DESIGN_NOTES.md`.
- **Urutan menu.** Brief menulis "…Testimoni, Lokasi, Galeri", sedangkan urutan seksi di halaman adalah Testimoni, Galeri, FAQ, Lokasi. Menu mengikuti urutan halaman agar penanda menu aktif bergerak searah gulir.

## Versi teknologi

- Next.js 16.4 (memenuhi "14+"), React 19, Tailwind CSS 4 (token di `@theme`), zod 4, react-hook-form 7, Vitest 5.
- TypeScript 6.0, bukan 7.0: typescript-eslint yang dipakai eslint-config-next belum mendukung TypeScript 7.
- ESLint 9, bukan 10: beberapa plugin bawaan eslint-config-next belum stabil di ESLint 10. `npm run build` menjalankan ESLint lebih dulu karena Next 16 tidak lagi melakukannya.
- Pembuatan `AGENTS.md` otomatis oleh `next dev` dimatikan (`agentRules: false`) agar repositori klien tidak berisi berkas yang tidak diminta.
- Git: folder ini berada di dalam repositori induk `D:/Project`. Proyek diinisialisasi sebagai repositori git sendiri di dalam folder ini, tidak di-commit ke repositori induk.

## Data bisnis fiktif (ganti di `src/config/site.ts`)

- Brand "Taman Wakaf Sakinah Memorial Park" dan nazhir "Yayasan Wakaf Sakinah Insani".
- Nomor izin "503/0172/IPTM-DPMPTSP/2024" dari "DPMPTSP Kabupaten Bandung Barat": **fiktif**.
- Alamat "Jl. Pasir Kawung No. 27, Desa Cigugur Girang, Parongpong, Bandung Barat", patokan masjid, dan koordinat −6.8236, 107.5794: fiktif, hanya meminjam nama wilayah yang ada.
- WhatsApp 6281234567890 (dari brief), telepon ambulans (022) 8765 4321, email dan domain `tamanwakafsakinah.id`, akun media sosial: fiktif. Nomor contoh bisa saja milik orang lain, jadi wajib diganti sebelum situs dibuka untuk umum.
- Tidak ada angka statistik (jumlah keluarga terbantu, rating, luas lahan) di halaman. Bila ingin menampilkan fakta seperti luas lahan, tambahkan ke `site.ts` dengan data yang bisa diverifikasi.
- Harga: ambulans mulai Rp450.000 / Rp900.000 / Rp1.500.000, keranda Rp250.000, peti Rp1.750.000, tenaga angkat Rp200.000, paket pemulasaraan Rp1.750.000 / Rp4.250.000 / gratis, wakaf kavling Rp12.500.000 dicicil 12 kali, kavling 1,25 × 2,5 m. Semua angka perkiraan wajar, bukan harga pasar resmi.
- Klaim layanan (petugas sejenis kelamin, foto makam dalam dua hari kerja, pembatalan tanpa biaya sebelum berangkat, kursi roda untuk lansia) ditulis sebagai contoh kebijakan. Pastikan sesuai praktik lapangan.

## Konten

- **Testimoni adalah contoh testimoni**: fiktif, dengan nama samaran (Bu Rahmawati, Pak Hendra, Bu Siti). Situs menampilkan catatan kecil "Contoh testimoni dengan nama samaran…" selama `showSampleContentNotice` bernilai `true`, agar situs yang terlanjur online tidak menyesatkan pengunjung. Matikan setelah diganti cerita asli yang sudah diizinkan keluarga.
- Galeri berisi enam ilustrasi SVG buatan sendiri, bukan foto lokasi. Ganti dengan foto asli di `public/gallery/` dan perbarui `src/content/gallery.ts`.
- Hadis tentang amal jariyah dikutip sebagai terjemahan HR. Muslim; ayat istirja' dari QS. Al-Baqarah: 156. Tata cara pemulasaraan mengikuti praktik umum mazhab Syafi'i di Indonesia (lima helai kafan untuk perempuan, tiga untuk laki-laki). Talqin tidak disebut karena praktiknya berbeda antarorganisasi; ditulis "doa di atas makam".
- Seksi "Pilihan tepat…" diberi `id="keunggulan"`, FAQ `id="faq"`, Hubungi Kami `id="hubungi"`.
- Form kontak mendapat kolom tambahan opsional "Pertanyaan", dan juga menghasilkan tiket (`TNY-…`) serta tautan WhatsApp seperti dua form lainnya.

## Aturan form dan kalkulator

- Semua tanggal dan jam dibaca sebagai WIB (Asia/Jakarta), termasuk tanggal pada nomor tiket.
- Nomor tiket `XXXX` adalah urutan harian per jenis layanan, dihitung dari isi `submissions.json`.
- Jam jemput boleh sampai 30 menit lalu (untuk "jemput secepatnya"), paling jauh 60 hari ke depan.
- Tanggal wafat tidak boleh di masa depan dan paling lama 7 hari lalu; lebih dari itu keluarga diminta menelepon. Jam wafat opsional karena keluarga sering tidak tahu pasti.
- Ambulans antar-kota hanya bisa dihitung dari jarak km, bukan zona. Zona dihitung dengan jarak perwakilan (10/25/60 km). Pecahan km dibulatkan ke atas. Estimasi tidak termasuk tol, parkir, dan penyeberangan.
- "Opsi tambahan" di kalkulator: pilihan keranda atau peti (dari checkbox "Butuh peti/keranda") dan dua tenaga angkat tambahan.
- Hubungan pemohon, jenis kelamin, dan paket tidak dipilihkan otomatis agar keluarga memilih dengan sadar; armada ambulans default "Ambulans Jenazah" agar estimasi langsung tampil.
- Kiriman yang mengisi kolom jebakan dibalas sukses tanpa disimpan. Pembatas frekuensi berjalan di memori proses.

## Kinerja dan tampilan

- Form dimuat saat seksinya mendekati layar (dengan skeleton). Tanpa JavaScript, skeleton menampilkan nomor telepon dan WhatsApp.
- Peta memakai embed Google Maps tanpa API key (`maps.google.com/maps?…&output=embed`), dengan tampilan cadangan bila peta tidak termuat.
- Teks Arab memakai font Arab bawaan sistem agar tidak menambah keluarga font ketiga.
- Skema JSON-LD memakai `["LocalBusiness", "Cemetery"]` karena tipe `FuneralHome` tidak ada di schema.org; jam buka 24 jam setiap hari, ditambah `FAQPage`.
- Skor Lighthouse diukur lokal di Chrome headless terhadap build produksi; hasil di server sungguhan bisa berbeda.
