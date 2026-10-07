# Taman Wakaf Sakinah Memorial Park

Situs satu halaman untuk layanan pemakaman Muslim berbasis wakaf: kavling makam wakaf, makam dhuafa, ambulans jenazah 24 jam, dan pemulasaraan jenazah. Dibangun dengan Next.js (App Router), TypeScript, dan Tailwind CSS.

Semua data bisnis di repositori ini adalah **data contoh** (nama, alamat, nomor telepon, nomor izin, harga, testimoni). Ganti sebelum dipublikasikan; daftar lengkapnya ada di [ASSUMPTIONS.md](ASSUMPTIONS.md).

## Prasyarat

- Node.js 22.12 atau lebih baru (diuji dengan Node 26)
- npm 10 atau lebih baru

## Instalasi dan menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
```

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server pengembangan dengan hot reload |
| `npm run build` | ESLint (tanpa toleransi warning) lalu build produksi |
| `npm start` | Menjalankan hasil build produksi |
| `npm test` | Unit test Vitest (kalkulator biaya, tautan WhatsApp, nomor tiket, validasi form) |
| `npm run lint` | ESLint saja |
| `npm run typecheck` | Pemeriksaan TypeScript saja |

## Mengubah data bisnis

Semua data bisnis ada di satu file: [`src/config/site.ts`](src/config/site.ts).

| Bagian | Isi |
|---|---|
| `name`, `shortName`, `nazhir` | Nama brand dan yayasan pengelola |
| `license` | Label, nomor, dan penerbit izin (tampil di badge hero dan footer) |
| `contact` | Nomor WhatsApp (format `62…` tanpa `+`), telepon ambulans 24 jam, email |
| `address`, `geo` | Alamat, patokan, dan koordinat untuk peta Google |
| `hours` | Jam layanan darurat, kantor, dan ziarah |
| `social` | Tautan media sosial di footer |
| `ambulance.vehicles` | Tarif dasar, km yang sudah termasuk, tarif per km, kapasitas pendamping |
| `ambulance.zones` | Zona jarak dekat/sedang/jauh dan jarak yang dipakai untuk estimasi |
| `ambulance.coffins`, `ambulance.extraCrew` | Harga opsi tambahan di kalkulator |
| `funeralCare.packages` | Harga paket pemulasaraan (0 = tanpa biaya) |
| `waqf` | Kontribusi wakaf per kavling dan jumlah cicilan |
| `showSampleContentNotice` | Ubah ke `false` setelah testimoni asli (dengan izin keluarga) dipasang |

Kalkulator biaya, FAQ, kartu armada, dan pesan WhatsApp membaca angka dari file ini, jadi cukup ubah di satu tempat.

Teks setiap seksi (judul, paragraf, FAQ, testimoni, langkah-langkah) ada di [`src/content/`](src/content/). Warna dan skala tipografi ada di `@theme` pada [`src/app/globals.css`](src/app/globals.css); bila palet diubah, samakan juga [`src/config/brand-colors.ts`](src/config/brand-colors.ts) yang dipakai gambar Open Graph.

Untuk alamat situs (metadata, sitemap, robots), salin `.env.example` menjadi `.env.local` dan isi `NEXT_PUBLIC_SITE_URL`.

## Alur formulir

Ada tiga formulir: pemesanan ambulans, permohonan pemulasaraan, dan pertanyaan umum. Masing-masing:

1. Divalidasi di browser dengan skema zod yang sama dengan yang dipakai server (`src/lib/schemas/`).
2. Dikirim ke API route (`/api/ambulance`, `/api/funeral-care`, `/api/contact`). Server memeriksa format kiriman, membatasi frekuensi (8 kiriman per 10 menit per perangkat), membersihkan teks, lalu memvalidasi ulang.
3. Disimpan ke `data/submissions.json` dengan nomor tiket harian: `AMB-YYYYMMDD-XXXX`, `PML-YYYYMMDD-XXXX`, `TNY-YYYYMMDD-XXXX` (tanggal WIB).
4. Server mengembalikan ringkasan dan tautan `wa.me` berisi seluruh data, sehingga keluarga cukup menekan "Konfirmasi via WhatsApp".

`data/submissions.json` berisi data pribadi keluarga dan sudah dikecualikan dari git. Lokasinya bisa diubah dengan variabel `SUBMISSIONS_FILE`. Setiap form juga punya kolom jebakan tersembunyi; kiriman bot yang mengisinya dibalas seperti biasa tetapi tidak disimpan.

## Struktur folder

```
src/
  app/            Halaman, layout, metadata, sitemap, robots, ikon, gambar OG, API route
  components/
    forms/        Field form, skeleton, tanda terima tiket, pemuatan form tertunda
    icons/        Ikon tahapan pemulasaraan buatan sendiri
    layout/       Header, footer, tombol mengambang
    sections/     Satu folder/komponen per seksi halaman
    ui/           Button, Section, SectionHeading, Accordion, Timeline, ArchFrame
  config/         site.ts (data bisnis) dan brand-colors.ts
  content/        Semua teks statis per seksi
  hooks/          Hook pengiriman form dan tanggal WIB
  lib/            Skema zod, kalkulator biaya, pembuat tautan WhatsApp, format, kode server
public/           Ilustrasi SVG hero dan galeri, pola girih, ikon
data/             Tempat submissions.json (dibuat otomatis)
```

## Deploy ke Vercel

1. Push repositori ini ke GitHub, GitLab, atau Bitbucket.
2. Di Vercel, pilih **Add New → Project**, impor repositorinya. Framework terdeteksi otomatis sebagai Next.js; perintah build `npm run build` tidak perlu diubah.
3. Di **Settings → Environment Variables**, tambahkan `NEXT_PUBLIC_SITE_URL` dengan domain akhir (misalnya `https://tamanwakafsakinah.id`).
4. Deploy, lalu sambungkan domain di **Settings → Domains**.

**Penting tentang penyimpanan di Vercel.** Sistem berkas Vercel hanya bisa ditulis di `/tmp` dan isinya hilang setiap kali fungsi dimulai ulang atau dideploy ulang. Di Vercel, situs ini otomatis menulis ke `/tmp/submissions.json`, sehingga **kiriman form tidak tersimpan permanen**. Tautan WhatsApp tetap berfungsi, jadi data tetap sampai ke petugas. Untuk arsip permanen, ganti isi `src/lib/server/submissions-store.ts` dengan penyimpanan seperti Vercel Postgres, Supabase, atau Google Sheets, atau deploy di server sendiri (VPS) dengan `npm run build && npm start` agar `data/submissions.json` tetap ada. Pembatas frekuensi juga hanya berlaku per instance server.
