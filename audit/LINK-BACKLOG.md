# Link Backlog

Status sitasi per **26 November 2026**. Tujuan: setiap entri referensi punya identitas yang dapat diverifikasi (URL, DOI, ISBN, atau nomor standar/regulasi) dan URL-nya pernah dicek.

## Status Akhir 26 November 2026

| Metrik | Nilai |
|---|---:|
| Entri referensi | 896 |
| Ber-URL | 791 (88%) |
| Hanya ISBN/nomor standar | 105 |
| Tanpa identitas | **0** |
| Tanpa tanggal akses | **0** |
| URL mati | **0** |
| URL blocked (bot protection) | 12 (ISO, OECD, ILO, APQC) |
| `check:refs:strict` | lolos |
| `check:urls:strict` | lolos |

128 entri yang tidak dapat diverifikasi (laporan konsultan tanpa publikasi resmi, seri SHRM/CIMA/CFA/AFP yang judulnya tidak cocok, halaman SAP Help generik) dihapus atau diganti sumber nyata. Alasannya dicatat di `audit/isbn-registry.md` dan `audit/REMEDIATION.md`.

## Baseline

| Section | Entri | Punya URL | URL mati | Tanpa URL |
|---|---:|---:|---:|---:|
| `01-fundamentals` | 31 | 25 | 3 | 6 |
| `02-business-processes` | 23 | 22 | 1 | 1 |
| `03-accounting` | 68 | 57 | 14 | 11 |
| `04-sales` | 68 | 51 | 22 | 17 |
| `05-purchasing` | 74 | 46 | 8 | 28 |
| `06-inventory` | 85 | 0 | 0 | 85 |
| `07-manufacturing` | 91 | 0 | 0 | 91 |
| `08-finance` | 81 | 0 | 0 | 81 |
| `09-assets` | 80 | 0 | 0 | 80 |
| `10-project` | 90 | 0 | 0 | 90 |
| `11-hr` | 113 | 0 | 0 | 113 |
| `12-tax` | 127 | 0 | 0 | 127 |
| **Total** | **931** | **201** | **44** | **730** |

Sumber unik diperkirakan 841; banyak judul berulang dengan format berbeda.

## Status Batch

| Batch | Tanggal | Hasil |
|---|---|---|
| 1 — `12-tax` inti PPN (8 file) | 2026-11-24 | 67 entri ber-URL ditambahkan; 44 URL mati tidak berubah (tidak ada URL mati baru); 3 blocked (2 warisan + 1 OECD) |
| 2 — `12-tax` PPh (7 file) | 2026-11-24 | 39 entri ber-URL ditambahkan; total entri ber-URL 358 (39%); URL mati tetap 44 |
| 3 — `12-tax` penutup + index (5 file) | 2026-11-24 | `12-tax` tuntas: 17 entri ber-URL; TAX-04/05 ditutup; total entri ber-URL 375 (41%) |
| 4 — URL mati `00`–`01` (3 file) | 2026-11-24 | 3 URL mati diganti halaman resmi yang terverifikasi; Gartner (403) diganti DOI; URL mati 44 → 41 |
| 5 — URL mati `03-accounting` (8 file) | 2026-11-24 | 9 URL diganti; URL mati 41 → 32 |
| 6 — sisa `02` + `03` (8 file) | 2026-11-24 | 10 URL diganti; `pajak.go.id` homepage diganti UU HPP + PMK 131; URL mati 32 → 22 |
| 7 — `04-sales` (8 file) | 2026-11-24 | 10 URL diganti; URL mati 22 → 10 |
| 8 — `05-purchasing` (8 file) | 2026-11-24 | 9 URL diganti; CIPS homepage dihapus; URL mati 10 → 2 |
| 9–10 — penutup (3 file) | 2026-11-24 | **URL mati = 0**; 2 blocked (OECD, halaman publikasi spesifik); `check:urls:strict` lolos |
| 11–19 — Odoo 17 → 20.0 (64 file disentuh) | 2026-11-24 | **0 file menyebut Odoo 17/`documentation/17.0`**; seluruh URL Odoo 20.0 diuji 200 |
| 20 — backfill `07-manufacturing` (17 artikel) | 2026-11-24 | 54 URL ditambahkan; entri ber-URL 373 → 427 (46%); tak terlacak 464 → 413 |
| 21 — backfill `08-finance`, `09-assets`, `10-project` (45 artikel) | 2026-11-24 | Entri ber-URL 427 → 554 (60%); tak terlacak 413 → 268; 20 file masih tanpa URL |
| 22 — backfill `11-hr` (19 artikel) | 2026-11-24 | Entri ber-URL 554 → 618 (66%); tak terlacak 268 → 191; file tanpa URL 20 → 2 |
| 23 — penutupan ISBN + standar + pembersihan | 2026-11-26 | 32 ISBN diverifikasi; 149 entri diganti, 44 dihapus; 84 marker vendor dihapus; tak terlacak 193 → 0; marker 85 → 0; URL mati 0; tanggal akses 0 hilang |

Catatan sweep Odoo: penggantian versi bersifat mekanis dan URL diverifikasi merespons 200. **Verifikasi isi** — apakah klaim perilaku di artikel masih didukung halaman 20.0 — belum dilakukan dan tetap menjadi item SW-02/SW-03 serta Fase 4.

Catatan Batch 1:

- Sumber primer diverifikasi dengan membuka halaman dan mencocokkan judul: `peraturan.go.id` (UU/PP) dan `jdih.kemenkeu.go.id` (PMK). Tanggal akses 24 November 2026.
- **Temuan regulasi:** PMK 11/2025 telah diubah oleh **PMK 53/2025** (diundangkan 28 Juli 2025). Referensi PMK 53/2025 sudah ditambahkan ke 8 artikel, tetapi narasi tarif di badan artikel belum diubah — **menunggu review manusia**.
- `PER-03/PJ/2022`, `PER-29/PJ/2015`, `SE-10/PJ/2020`, PMK 243/2014, PMK 173/2021, PMK 59/2022, dan KMK kurs ditandai `cetak`/belum terverifikasi karena tautan resminya tidak dapat dipastikan otomatis (situs DJP menolak akses otomatis).
- **Temuan lokasi:** TAX-04/05 tidak berada di `12-tax/index.md`, melainkan di `03-accounting/index.md:53` dan `05-purchasing/index.md:50` (sesuai `ERP_NOTES_AUDIT.md`). Perbaikan index dipindahkan ke batch berikutnya; D-8 di `scenario-register.md` dikoreksi 24 November 2026.
- **CIPS tidak dapat dipakai:** seluruh tautan `cips.org` mengembalikan 403 untuk akses otomatis dan tidak ada dokumen spesifik. Empat entri CIPS diganti penanda gap `[belum terverifikasi]` + sumber alternatif (ASCM, MS Learn, ISO 9001).
- **Sisa pekerjaan kampanye:** 464 entri belum terlacak (tanpa URL/ID/marker) di `05`–`10`, dan 89 file masih menyebut Odoo 17.
- Sisa `12-tax` yang belum disentuh: **0 artikel**. Folder `12-tax` selesai untuk kampanye referensi pada 24 November 2026; 3 artikel terakhir ditutup di batch 3.
- Berikutnya: batch 4 dimulai dari URL mati `00`–`01`, lalu `02`–`05`.

## Aturan per Entri

Entri dianggap selesai jika memenuhi salah satu:

1. URL resmi + `Diakses <tanggal>` dan URL merespons 2xx.
2. DOI atau ISBN untuk publikasi cetak.
3. Nomor standar/regulasi + label `cetak` (mis. `IAS 2`, `PSAK 72`, `PMK 131/PMK.03/2024`).

Entri **tidak** selesai jika hanya berisi penerbit + judul.

## Urutan Batch

Diubah 24 November 2026 sesuai keputusan Fase 1 (URUTAN): `12-tax` didahulukan karena folder itu sumber kanonik tarif.

| Batch | Isi | Jumlah | Alasan |
|---|---|---:|---|
| 1 | `12-tax` — referensi tanpa URL, mulai 8 file inti PPN | 127 | Folder kanonik pajak; salah tarif menular ke semua modul |
| 2 | URL mati di `05-purchasing` | 8 | Section yang sedang dikerjakan; memperbaiki klaim link yang sudah ada |
| 3 | URL mati di `03-accounting`, `04-sales`, `00`, `01` | 36 | Menghapus link yang gagal sebelum menambah yang baru |
| 4 | Tanpa URL sisa `12-tax` + `00`–`03` | sisa | Melengkapi section yang sudah punya sebagian URL |
| 5 | Tanpa URL `05-purchasing` | 28 | Melengkapi satu section sampai 100% |
| 6 | `06-inventory`, `07-manufacturing` | 176 | Vendor docs + APICS/ASCM |
| 7 | `08-finance`, `09-assets` | 161 | Standar + buku |
| 8 | `10-project`, `11-hr` | 203 | PMI, HR books, regulasi |

## Metode

- Vendor docs: cari halaman resmi versi yang dinyatakan artikel; jangan memakai versi lain.
- Standar: halaman resmi IFRS Foundation atau PSAK/IAI.
- Regulasi: JDIH/DJP dengan nomor dan tanggal berlaku.
- Buku/report: halaman penerbit + ISBN/DOI; jika tidak ada, tandai `cetak`.
- Jangan memakai URL hasil pencarian atau homepage jika dokumen spesifik tersedia.
- Setiap URL dibuka sekali; `npm run check:urls` memvalidasi ulang.

## Perintah

```bash
npm run check:refs          # entri tanpa identitas
npm run check:urls          # status URL (cache 24 jam)
npm run check:urls:strict   # gagal jika ada URL mati
```

`check:urls` belum menjadi blocking di CI sampai URL mati = 0.

## Definisi Selesai

- [x] Tidak ada entri tanpa URL/DOI/ISBN/nomor standar.
- [x] Tidak ada URL mati (`dead` = 0).
- [x] Setiap URL punya tanggal akses.
- [x] `check:urls:strict` lolos.

Catatan: 12 URL "blocked" adalah situs yang menolak akses bot (ISO, OECD, ILO, APQC), bukan tautan mati. Isinya dapat dibuka di browser; `check:urls` membedakan `blocked` dari `dead`.
