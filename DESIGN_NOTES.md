# Catatan Desain: Taman Wakaf Sakinah

## Arah visual
**"Taman di balik lengkung mihrab."** Pengunjung situs ini kebanyakan sedang berduka atau sedang memikirkan kematian. Halaman harus terasa seperti berjalan pagi di taman makam yang terawat: lapang, hijau, sunyi, tanpa kesan jualan. Satu hal yang boleh berani adalah **bentuk lengkung runcing (arch) mihrab**, dipakai sebagai bingkai ilustrasi hero, logo, kutipan hadis, dan galeri. Selebihnya tenang: sudut tegas 4px, garis tipis 1px, tanpa bayangan tebal, tanpa gradien dekoratif.

## Palet final (token di `src/app/globals.css`)
| Token | Hex | Peran |
|---|---|---|
| `forest` | #14532d | Warna dominan: judul, tombol utama, pita gelap |
| `forest-deep` | #0c351c | Footer, hover tombol utama |
| `cream` | #faf7f0 | Netral hangat: latar utama |
| `sand` / `paper` | #f2ecdf / #fffdf8 | Latar seksi selang-seling / permukaan form |
| `sage-soft` / `sage` / `sage-200` | #e4ebe0 / #8aa585 / #c5d3c0 | Turunan hijau untuk latar seksi dan ilustrasi |
| `ink` / `ink-soft` | #1b2a20 / #4b5b50 | Teks utama (14:1) / teks sekunder (6,7:1) |
| `gold` | #b38b3c | Aksen hemat, **hanya dekorasi** (garis lengkung, bintang) |
| `gold-ink` / `gold-soft` | #7a5c1e / #e8d6a8 | Versi emas yang aman untuk teks di latar terang / gelap |
| `danger` | #a3341f | Fungsional saja: pesan galat form |

Alasan: hijau tua dekat dengan warna masjid dan taman, krem menghindari putih klinis rumah sakit, emas dipakai sedikit sebagai tanda hormat (seperti iluminasi mushaf), bukan kemewahan.

## Font final
- **Newsreader** (serif humanis, satu berat 400): judul dan kutipan. Terasa seperti buku yang dibaca pelan, cocok untuk doa dan hadis. Hanya satu file statis dimuat (±22 KB) agar ponsel dengan sinyal lemah tidak menunggu font.
- **Figtree** (sans humanis): teks, form, tombol. Bentuknya bulat dan ramah, tetap jelas di ukuran 14px untuk label form.
- Teks Arab (istirja') memakai font sistem dengan `lang="ar"` agar tidak menambah keluarga font ketiga.

## Skala tipografi (klasik Bringhurst)
12 / 14 / 16 / 18 / 21 / 24 / 30 / 36 / 48 / 60 / 72 px. Body 16px (line-height 1.65), paragraf pembuka 18–21px, H2 36–48px, H1 48–72px (line-height 1.05–1.1, weight 400). Lebar paragraf dibatasi `max-w-prose` (65ch). Tidak ada label huruf kapital di atas judul.

## Skala spacing
Kelipatan 4/8 dari Tailwind: 4, 8, 12, 16, 24, 32, 48, 64, 80, 112. Seksi: 80px (mobile) / 112px (desktop). Jarak antarblok dalam seksi: 48–64px. Antar-elemen form: 20–24px.

## Bahasa bentuk & gerak
Sudut 4px untuk kartu, input, tombol. Lengkung runcing hanya untuk bingkai bermakna. Ikon garis 1,5px tanpa lingkaran latar. Gerak hanya: hover/fokus tombol, buka-tutup accordion & menu, transisi lightbox, dan muncul bertahap pada dua timeline (petunjuk urutan). Semua dimatikan saat `prefers-reduced-motion`.

## Peta tata letak (variasi antarseksi)
Hero split teks + lengkung → pita kontak → Layanan (judul lengket kiri + daftar baris) → Keunggulan (strip 4 kolom bergaris) → Ambulans (pita darurat, kartu armada, timeline horizontal, form + panel estimasi) → Pemulasaraan (kutipan istirja' tengah, timeline vertikal, tabel paket, daftar bernomor, form) → Manfaat wakaf (seksi gelap, hadis dalam lengkung, grid ubin 3×3) → Testimoni (satu kutipan besar, geser) → Galeri (mozaik asimetris) → FAQ (dua kolom) → Lokasi (peta + info) → Hubungi (split) → Footer.

## Hasil audit mandiri (8 Oktober 2026)
1. Lebar 375, 768, 1280 px: tidak ada overflow horizontal (scrollWidth = clientWidth, dicek otomatis di Chrome headless) dan tangkapan layar tiap seksi diperiksa manual.
2. Copy: 0 frasa terlarang ("solusi terbaik", "tidak hanya… tetapi juga", "mari bersama-sama", dll.), 0 em dash, 0 emoji, tidak ada angka statistik karangan.
3. Pola layout: 12 seksi, tidak ada dua seksi berurutan dengan pola sama; pola "judul lengket kiri + daftar kanan" hanya di Layanan dan FAQ yang berjauhan.
4. Kontras WCAG AA: pasangan teks terendah ink-soft di atas sage-soft 5,9:1; emas #b38b3c hanya untuk garis dan ornamen, teks emas memakai gold-ink/gold-soft.
5. Keyboard: urutan Tab mengikuti urutan visual (skip link, logo, menu, CTA, isi), outline fokus 2 px hijau di latar terang dan emas lembut di latar gelap; lightbox dan accordion bisa dipakai tanpa mouse.
6. Diperbaiki selama audit: tombol WhatsApp header bocor ke mobile (bentrok kelas hidden/inline-flex), penanda menu aktif macet, tombol WhatsApp mengambang tak terlihat di seksi hijau, CTA wakaf terlipat, judul hero 6 baris di 375 px.
7. Kinerja: font yang dipreload turun dari ±300 KB ke ±43 KB, form dimuat saat mendekati layar dengan skeleton; Lighthouse lokal mobile 91–93 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100.
8. Console browser: tanpa error dan warning pada alur normal, di dev maupun build produksi.
9. Ketiga form lulus uji ujung-ke-ujung: galat per kolom, tiket AMB/PML/TNY, ringkasan, tautan WhatsApp terformat, data tersimpan tanpa kolom jebakan.
10. Sisa catatan: peta Google tidak termuat di Chrome headless (tampilan cadangan muncul), LCP mobile ±3 detik karena judul digambar ulang saat font Newsreader selesai dimuat.
