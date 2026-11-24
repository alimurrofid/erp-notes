# Link Backlog

Status sitasi per 24 November 2026. Tujuan: setiap entri referensi punya identitas yang dapat diverifikasi (URL, DOI, ISBN, atau nomor standar/regulasi) dan URL-nya pernah dicek.

## Baseline

| Section | Entri | Punya URL | URL mati | Tanpa URL |
|---|---:|---:|---:|---:|
| `00-fundamentals` | 31 | 25 | 3 | 6 |
| `01-business-processes` | 23 | 22 | 1 | 1 |
| `02-accounting` | 68 | 57 | 14 | 11 |
| `03-sales` | 68 | 51 | 22 | 17 |
| `04-purchasing` | 74 | 46 | 8 | 28 |
| `05-inventory` | 85 | 0 | 0 | 85 |
| `06-manufacturing` | 91 | 0 | 0 | 91 |
| `07-finance` | 81 | 0 | 0 | 81 |
| `08-assets` | 80 | 0 | 0 | 80 |
| `09-project` | 90 | 0 | 0 | 90 |
| `10-hr` | 113 | 0 | 0 | 113 |
| `11-tax` | 127 | 0 | 0 | 127 |
| **Total** | **931** | **201** | **44** | **730** |

Sumber unik diperkirakan 841; banyak judul berulang dengan format berbeda.

## Status Batch

| Batch | Tanggal | Hasil |
|---|---|---|
| 1 — `11-tax` inti PPN (8 file) | 2026-11-24 | 67 entri ber-URL ditambahkan; 44 URL mati tidak berubah (tidak ada URL mati baru); 3 blocked (2 warisan + 1 OECD) |
| 2 — `11-tax` PPh (7 file) | 2026-11-24 | 39 entri ber-URL ditambahkan; total entri ber-URL 358 (39%); URL mati tetap 44 |
| 3 — `11-tax` penutup + index (5 file) | 2026-11-24 | `11-tax` tuntas: 17 entri ber-URL; TAX-04/05 ditutup; total entri ber-URL 375 (41%) |
| 4 — URL mati `00`–`01` (3 file) | 2026-11-24 | 3 URL mati diganti halaman resmi yang terverifikasi; Gartner (403) diganti DOI; URL mati 44 → 41 |

Catatan Batch 1:

- Sumber primer diverifikasi dengan membuka halaman dan mencocokkan judul: `peraturan.go.id` (UU/PP) dan `jdih.kemenkeu.go.id` (PMK). Tanggal akses 24 November 2026.
- **Temuan regulasi:** PMK 11/2025 telah diubah oleh **PMK 53/2025** (diundangkan 28 Juli 2025). Referensi PMK 53/2025 sudah ditambahkan ke 8 artikel, tetapi narasi tarif di badan artikel belum diubah — **menunggu review manusia**.
- `PER-03/PJ/2022`, `PER-29/PJ/2015`, `SE-10/PJ/2020`, PMK 243/2014, PMK 173/2021, PMK 59/2022, dan KMK kurs ditandai `cetak`/belum terverifikasi karena tautan resminya tidak dapat dipastikan otomatis (situs DJP menolak akses otomatis).
- **Temuan lokasi:** TAX-04/05 tidak berada di `11-tax/index.md`, melainkan di `02-accounting/index.md:53` dan `04-purchasing/index.md:50` (sesuai `ERP_NOTES_AUDIT.md`). Perbaikan index dipindahkan ke batch berikutnya; D-8 di `scenario-register.md` dikoreksi 24 November 2026.
- Sisa `11-tax` yang belum disentuh: **0 artikel**. Folder `11-tax` selesai untuk kampanye referensi pada 24 November 2026; 3 artikel terakhir ditutup di batch 3.
- Berikutnya: batch 4 dimulai dari URL mati `00`–`01`, lalu `02`–`05`.

## Aturan per Entri

Entri dianggap selesai jika memenuhi salah satu:

1. URL resmi + `Diakses <tanggal>` dan URL merespons 2xx.
2. DOI atau ISBN untuk publikasi cetak.
3. Nomor standar/regulasi + label `cetak` (mis. `IAS 2`, `PSAK 72`, `PMK 131/PMK.03/2024`).

Entri **tidak** selesai jika hanya berisi penerbit + judul.

## Urutan Batch

Diubah 24 November 2026 sesuai keputusan Fase 1 (URUTAN): `11-tax` didahulukan karena folder itu sumber kanonik tarif.

| Batch | Isi | Jumlah | Alasan |
|---|---|---:|---|
| 1 | `11-tax` — referensi tanpa URL, mulai 8 file inti PPN | 127 | Folder kanonik pajak; salah tarif menular ke semua modul |
| 2 | URL mati di `04-purchasing` | 8 | Section yang sedang dikerjakan; memperbaiki klaim link yang sudah ada |
| 3 | URL mati di `02-accounting`, `03-sales`, `00`, `01` | 36 | Menghapus link yang gagal sebelum menambah yang baru |
| 4 | Tanpa URL sisa `11-tax` + `00`–`03` | sisa | Melengkapi section yang sudah punya sebagian URL |
| 5 | Tanpa URL `04-purchasing` | 28 | Melengkapi satu section sampai 100% |
| 6 | `05-inventory`, `06-manufacturing` | 176 | Vendor docs + APICS/ASCM |
| 7 | `07-finance`, `08-assets` | 161 | Standar + buku |
| 8 | `09-project`, `10-hr` | 203 | PMI, HR books, regulasi |

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

- [ ] Tidak ada entri tanpa URL/DOI/ISBN/nomor standar.
- [ ] Tidak ada URL mati (`dead` = 0).
- [ ] Setiap URL punya tanggal akses.
- [ ] `check:urls:strict` lolos.
