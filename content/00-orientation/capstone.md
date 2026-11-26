---
title: Capstone Case
---

# Capstone Case

## Definition

Satu kasus tertutup untuk menguji jalur Expert: pengadaan, biaya perolehan, penjualan, manufaktur, aset, proyek, payroll, perpajakan, dan penutupan. Kerjakan tanpa membuka artikel; kunci jawaban ada di [[00-orientation/capstone-answer-key|Capstone Answer Key]].

## Skenario

PT Maju Bersama (PKP, IDR), skenario kanonik yang sama dengan modul lain. Tahun buku 2026.

**Pengadaan dan penjualan**
- Purchase Order: 10 unit Laptop Pro @ Rp700.000 dari PT Sumber Teknologi (PKP), termin 30 hari.
- Ongkos angkut Rp500.000 untuk 10 unit, dikapitalisasi sebagai landed cost.
- Penjualan: 10 unit @ Rp1.000.000 kepada Klien Korporasi (PKP), BAST 31 Desember.
- PPN efektif 11%.
- Tidak ada sisa persediaan Laptop Pro pada akhir tahun.

**Manufaktur**
- `MO-2026-0042`: target 100 unit, biaya standar Rp7.500.000 (bahan Rp5.000.000; tenaga kerja Rp1.500.000; overhead Rp1.000.000) atau Rp75.000/unit.
- Biaya aktual masuk WIP Rp7.900.000 (bahan Rp5.200.000; tenaga kerja Rp1.650.000; overhead Rp1.050.000).
- Output: 90 unit selesai, 5 unit scrap permanen, 5 unit WIP akhir dengan bahan 100% dan konversi 50%.

**Aset tetap**
- `AST-MAC-2026-0001`: perolehan Rp120.000.000 pada 1 April 2026; residu Rp10.000.000; umur 60 bulan; penyusutan garis lurus.

**Proyek**
- `PRJ-ERP-2026-001`: nilai kontrak Rp300.000.000; Milestone 1 senilai Rp60.000.000 disetujui lewat BAST 31 Desember 2026; biaya aktual periode Milestone 1 Rp40.000.000.

**Payroll**
- Karyawan `Andi Pratama`: gaji bruto Desember Rp12.000.000.
- PPh 21 dipotong Rp300.000 (angka ilustrasi, bukan tarif).
- Potongan BPJS karyawan: JHT 2%, JP 1% dengan plafon upah Rp11.086.300, Kesehatan 1%.
- Tidak ada potongan lain.

**Pajak dan penutupan**
- PPN Keluaran Rp1.100.000; PPN Masukan dikreditkan Rp770.000.
- EBT komersial Rp100.000.000; koreksi fiskal positif Rp10.000.000; negatif Rp5.000.000; tarif PPh badan 22%.

## Tugas

1. **P2P**: sebutkan dokumen dari PR sampai pembayaran dan jurnal pada goods receipt, vendor bill, dan pembayaran.
2. **Biaya perolehan**: hitung nilai persediaan per unit setelah landed cost dan jurnal kapitalisasinya.
3. **Penjualan**: jurnal saat BAST (pendapatan, PPN, HPP) dan saat penerimaan kas.
4. **Manufaktur**: hitung ending WIP, nilai barang jadi yang ditransfer, dan varians yang ditutup ke P&L; tulis empat jurnal utama.
5. **Aset**: hitung penyusutan 2026 dan nilai buku per 31 Desember 2028; sebutkan satu indikator perlunya uji impairment.
6. **Proyek**: tulis jurnal Milestone 1 dan HPP-nya; tentukan apakah timbul contract asset atau contract liability.
7. **Payroll**: hitung potongan BPJS karyawan, PPh 21, dan gaji bersih; tulis jurnal penggajian dan setoran.
8. **Penutupan dan pelaporan**: hitung PPN kurang bayar dan PPh badan; sebutkan akun yang harus nol sebelum laporan dan dua selisih yang mungkin muncul saat rekonsiliasi.

## Batasan

- Gunakan hanya akun yang ada di [[02-accounting/chart-of-accounts|Chart of Accounts]].
- Sebutkan asumsi bila ada angka yang tidak diberikan.
- Jangan mengarang nomor dokumen; gunakan pola 4 segmen (`MO-2026-0042` adalah ID cost sheet, bukan nomor dokumen transaksi).
- Bulatkan rupiah ke satuan penuh; sebutkan pembulatan jika ada.

## Penilaian

| Kriteria | Bobot |
|---|---:|
| Jurnal seimbang dan akun tepat | 25% |
| Alur dokumen dan status benar | 20% |
| Perhitungan biaya (landed cost, WIP, penyusutan) konsisten | 20% |
| Perhitungan payroll dan pajak benar serta bertanggal | 15% |
| Penjelasan contract asset/liability dan selisih rekonsiliasi | 10% |
| Asumsi dan pembulatan dinyatakan | 10% |

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
2. **IFRS Foundation** — *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/ — diakses 26 November 2026.
3. **IFRS Foundation** — *IAS 16 Property, Plant and Equipment*. https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/ — diakses 26 November 2026.
4. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
5. **UU No. 7 Tahun 2021** — Harmonisasi Peraturan Perpajakan. https://peraturan.go.id/id/uu-no-7-tahun-2021 — diakses 26 November 2026.
