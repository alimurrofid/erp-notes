# Canonical Dataset — PT Maju Bersama

**Dibuat:** 24 November 2026, dari keputusan Fase 1 (D-1…D-8).
**Fungsi:** satu tabel angka yang dipakai semua artikel. Artikel tidak boleh memperkenalkan angka ketiga; jika berbeda, laporkan konflik ke `scenario-register.md`.

Bukan artikel publik. Tidak menggantikan standar; ini hanya data skenario contoh.

## 1. Entitas dan Mata Uang

| Fakta | Nilai |
|---|---|
| Entitas | PT Maju Bersama (PKP) |
| Mata uang fungsional | IDR |
| Pemasok contoh | PT Sumber Teknologi (PKP) |
| Pelanggan contoh | Klien Korporasi (PKP) |

## 2. Harga dan Kuantitas Kanonik

| Item | Nilai | Catatan |
|---|---|---|
| Laptop Pro — harga beli | Rp700.000/unit (DPP) | 10 unit = Rp7.000.000 |
| Laptop Pro — landed cost | Rp750.000/unit | freight Rp500.000 untuk 10 unit |
| Laptop Pro — harga jual | Rp1.000.000/unit (DPP) | 10 unit = Rp10.000.000 |
| PPN | 12% statutori, DPP 11/12, beban efektif 11% | sumber: `content/11-tax/` |
| PPh 23 jasa | 2% (NPWP); 4% (tanpa NPWP) | sumber: UU PPh, PMK 141/2015 |

## 3. UOM (D-6)

| Konversi | Nilai |
|---|---|
| 1 Pack | **6 Unit** |
| Conversion factor Pack→Unit | 6 |

## 4. Nomor Dokumen (D-5)

Pola: `<JENIS>-<TAHUN>-<BULAN>-<URUT>`.

| Dokumen | Nomor kanonik |
|---|---|
| Purchase Requisition | `PR-2026-09-0041` |
| Purchase Order | `PO-2026-09-0081` |
| Goods Receipt | `GR-2026-09-0010`, `GR-2026-09-0014` |

| Sales Quotation | `SQ-2026-09-0042` |

Nomor lain diturunkan dari pola ini dengan mempertahankan nomor urut yang sudah ada dan menambahkan segmen bulan. **Pengecualian:** `MO-2026-0042` tetap 3 segmen karena merupakan ID cost sheet (D-7), bukan nomor dokumen transaksi. **Belum ditetapkan:** nomor Sales Order, Delivery Order, dan Invoice penjualan — jangan membuat nilai baru sebelum register diperbarui.

## 5. Posisi PPN Bulanan

| Pos | Nilai |
|---|---:|
| PPN Keluaran | Rp1.100.000 |
| PPN Masukan dikreditkan | (Rp770.000) |
| PPN kurang bayar | **Rp330.000** |

## 6. Rekonsiliasi Fiskal dan PPh Badan (D-3)

| Pos | Nilai |
|---|---:|
| EBT kanonik | **Rp100.000.000** |
| Koreksi fiskal positif | Rp10.000.000 |
| Koreksi fiskal negatif | (Rp5.000.000) |
| PKP | **Rp105.000.000** |
| PPh badan 22% | Rp23.100.000 |
| Kredit pajak | Rp7.000.000 |
| PPh 29 kurang bayar | **Rp16.100.000** |
| Angsuran PPh 25 bulanan | Rp1.758.333 |

Skenario EBT Rp15.350.000 hanya boleh muncul sebagai **tahun pembanding**, bukan skenario kedua.

## 7. Aset Tetap (D-1)

| Aset | Model | Parameter |
|---|---|---|
| `AST-MAC-2026-0001` | Cost model | perolehan Rp120 jt (1 Apr 2026); residu Rp10 jt; umur 60 bulan; penyusutan Rp1.833.333/bulan. 31 Des 2028 (33 bulan): akumulasi Rp60,5 jt; nilai buku Rp59,5 jt; sisa 27 bulan |
| `AST-MAC-2026-0002` | Revaluation model | dipakai **hanya** di artikel revaluasi |
| `AST-MAC-2026-0003` | Componentized asset | komponen `.01`–`.04`; total perolehan Rp120 jt; umur komponen 10/3/5 tahun; dipakai **hanya** di artikel componentization |

Satu aset tidak boleh memakai dua model sekaligus.

## 8. Proyek (D-2, D-7)

| Fakta | Keputusan |
|---|---|
| Proyek fixed-price | material masuk WIP, diakru ke COGS sesuai progres |
| Proyek time-material / cost-reimbursable | material langsung ke beban |
| Cost sheet `MO-2026-0042` | pemilik tunggal: `content/06-manufacturing/production-costing-and-wip.md` |

## 9. COA (D-4)

Chart of accounts kanonik hanya di `content/02-accounting/chart-of-accounts.md`. Artikel lain merujuk, tidak menyalin tabel.

## 10. Aturan Pemakaian

1. Sebelum menulis angka, cek tabel ini.
2. Jika angka di artikel berbeda, perbaiki artikel — jangan menambah nilai baru.
3. Jika tabel ini sendiri perlu berubah, ubah `scenario-register.md` lebih dulu.
