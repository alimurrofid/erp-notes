---
title: Capstone Answer Key
---

# Capstone Answer Key

## Definition

Kunci jawaban [[00-orientation/capstone|Capstone Case]]. Baca setelah mengerjakan, bukan sebelumnya. Angka mengikuti skenario kanonik dan tarif PPN efektif 11%.

## Cara Menilai

| Level | Kriteria |
|---|---|
| **Penuh** | Angka benar, jurnal seimbang, akun tepat, alasan/standar disebut, asumsi dinyatakan |
| **Sebagian** | Angka benar tetapi akun/alasan salah, atau jurnal benar tetapi asumsi tidak dinyatakan |
| **Kurang** | Hanya angka akhir tanpa jurnal/rumus, atau jurnal tidak seimbang |

Membulatkan rupiah tidak mengurangi nilai selama metode dan asumsi ditulis.

## Asumsi

- Seluruh 10 unit Laptop Pro terjual; tidak ada sisa persediaan.
- Landed cost Rp500.000 dialokasikan penuh ke 10 unit.
- Penyusutan aset memakai bulan penuh; aset dipakai sejak April 2026.
- Tidak ada perubahan tarif PPN, PPh, atau plafon BPJS selama 2026.

## 1. P2P

| Langkah | Dokumen | Status | Jurnal |
|---|---|---|---|
| Permintaan | PR | Approved | Tidak ada jurnal |
| Pesanan | PO 10 × 700.000 | Confirmed | Tidak ada jurnal (komitmen) |
| Penerimaan | GR 10 unit | Received | Dr Inventory 7.000.000 / Cr GR/IR 7.000.000 |
| Tagihan | Vendor bill + PPN 770.000 | Posted | Dr GR/IR 7.000.000; Dr PPN Masukan 770.000 / Cr AP 7.770.000 |
| Pembayaran | Payment | Paid | Dr AP 7.770.000 / Cr Bank 7.770.000 |

**Alasan:** PO hanya komitmen; aset dan utang timbul saat barang diterima, lalu GR/IR ditutup saat tagihan dicocokkan. Saldo GR/IR harus nol setelah tagihan diposting.

## 2. Biaya Perolehan dan Landed Cost

| Pos | Nilai |
|---|---:|
| Harga beli 10 unit | 7.000.000 |
| Landed cost | 500.000 |
| **Nilai persediaan** | **7.500.000** |
| **Per unit** | **750.000** |

Jurnal kapitalisasi landed cost: Dr Inventory 500.000 / Cr AP (atau Bank) 500.000.

**Alasan:** IAS 2.11 mewajibkan biaya untuk membawa persediaan ke lokasi dan kondisi siap pakai (termasuk angkut) menjadi bagian biaya perolehan, bukan beban periode.

## 3. Penjualan

| Peristiwa | Jurnal |
|---|---|
| BAST 31 Des | Dr AR 11.100.000 / Cr Revenue 10.000.000; Cr PPN Keluaran 1.100.000 |
| Pengakuan HPP | Dr COGS 7.500.000 / Cr Inventory 7.500.000 |
| Penerimaan kas | Dr Bank 11.100.000 / Cr AR 11.100.000 |

**Alasan:** pendapatan diakui saat kontrol berpindah (BAST), bukan saat kas diterima. HPP memakai biaya perolehan termasuk landed cost (10 × 750.000).

## 4. Manufaktur

| Komponen | Perhitungan | Nilai |
|---|---|---:|
| Ending WIP — bahan | 5 × 50.000 | 250.000 |
| Ending WIP — konversi | 5 × 50% × (15.000 + 10.000) | 62.500 |
| **Ending WIP** | 250.000 + 62.500 | **312.500** |
| **Barang jadi ditransfer** | 90 × 75.000 | **6.750.000** |
| **Varians ke P&L** | 7.900.000 − 6.750.000 − 312.500 | **837.500** |

Jurnal utama:

1. Material issue: Dr WIP 5.200.000 / Cr Persediaan Bahan Baku 5.200.000.
2. Konversi: Dr WIP 2.700.000 / Cr Upah Dialokasikan 1.650.000, Cr Overhead Dialokasikan 1.050.000.
3. Barang jadi: Dr Persediaan Barang Jadi 6.750.000 / Cr WIP 6.750.000.
4. Penutupan varians: Dr Beban Varians Produksi 837.500 / Cr WIP 837.500.

**Alasan:** WIP akhir hanya menyerap bahan 100% dan konversi 50%; scrap 5 unit dan pemborosan bahan/tenaga kerja/overhead menjadi varians yang dibebankan periode berjalan, bukan ditahan di persediaan.

## 5. Aset

| Pos | Perhitungan | Nilai |
|---|---|---:|
| Penyusutan per bulan | (120.000.000 − 10.000.000) ÷ 60 | 1.833.333 |
| Penyusutan 2026 (Apr–Des, 9 bulan) | 9 × 1.833.333 | **16.500.000** (dibulatkan) |
| Akumulasi s.d. 31 Des 2028 (33 bulan) | 33 × 1.833.333 | **60.500.000** |
| **Nilai buku 31 Des 2028** | 120.000.000 − 60.500.000 | **59.500.000** |

Indikator impairment: penurunan signifikan arus kas/permintaan atas output mesin, kerusakan fisik, atau biaya pemeliharaan yang melonjak sehingga manfaat ekonomi tidak lagi sepadan dengan nilai tercatat.

**Alasan:** penyusutan dimulai saat aset siap digunakan (April 2026), bukan saat dibeli/dibayar. Uji impairment dilakukan jika ada indikasi, bukan setiap bulan.

## 6. Proyek

| Peristiwa | Jurnal |
|---|---|
| BAST Milestone 1 | Dr AR 66.600.000 / Cr Revenue 60.000.000; Cr PPN Keluaran 6.600.000 |
| HPP periode | Dr COGS 40.000.000 / Cr WIP Proyek 40.000.000 |

Karena pendapatan kumulatif Rp60.000.000 sama dengan tagihan kumulatif Rp60.000.000, **tidak timbul contract asset maupun contract liability**. Contract asset timbul jika pendapatan > tagihan; contract liability timbul jika tagihan > pendapatan (mis. uang muka).

Laba kotor Milestone 1 = 60.000.000 − 40.000.000 = **Rp20.000.000**.

**Alasan:** BAST memenuhi kewajiban pelaksanaan; HPP harus diakui pada periode yang sama agar margin tidak tertunda sampai akhir proyek.

## 7. Payroll

| Komponen | Perhitungan | Nilai |
|---|---|---:|
| JHT karyawan | 2% × 12.000.000 | 240.000 |
| JP karyawan | 1% × 11.086.300 (plafon) | 110.863 |
| Kesehatan karyawan | 1% × 12.000.000 | 120.000 |
| **Total potongan BPJS** | 240.000 + 110.863 + 120.000 | **470.863** |
| **Gaji bersih** | 12.000.000 − 300.000 − 470.863 | **11.229.137** |

Jurnal penggajian:

Dr Beban Gaji 12.000.000
Cr Utang PPh 21 300.000
Cr Utang BPJS (porsi karyawan) 470.863
Cr Utang Gaji / Bank 11.229.137

Jurnal setoran: Dr Utang PPh 21 300.000 / Cr Bank; Dr Utang BPJS 470.863 / Cr Bank.

**Alasan:** JP memakai plafon upah Rp11.086.300 sejak 1 Maret 2026, sehingga potongan 1% tidak dihitung dari Rp12.000.000 penuh. PPh 21 dan BPJS disetor paling lambat tanggal 15 bulan berikutnya (PMK 81/2024; PP 44/2015).

## 8. Penutupan dan Pelaporan

| Pos | Perhitungan | Nilai |
|---|---|---:|
| PPN kurang bayar | 1.100.000 − 770.000 | **330.000** |
| PKP | 100.000.000 + 10.000.000 − 5.000.000 | **105.000.000** |
| PPh badan terutang | 22% × 105.000.000 | **23.100.000** |

Akun yang harus nol sebelum laporan:
- Akun nominal pendapatan dan beban (ditutup ke laba ditahan).
- GR/IR setelah semua penerimaan ditagih.
- Akun varians produksi setelah settlement.
- **WIP tidak harus nol** jika masih ada pekerjaan setengah jadi; yang wajib adalah saldonya dapat dijelaskan dan didukung perhitungan.

Dua selisih yang lazim saat rekonsiliasi:

1. **GR/IR**: penerimaan sudah diposting tetapi tagihan belum diterima → saldo sementara, bukan utang final.
2. **PPN**: faktur pajak masukan belum diunggah/dikreditkan pada periode yang sama → selisih antara subledger pajak dan GL.

**Alasan:** PPN kurang bayar adalah selisih PPN Keluaran dan Masukan yang dikreditkan pada masa itu; PPh badan dihitung dari PKP setelah koreksi fiskal, bukan dari EBT komersial.

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
2. **IFRS Foundation** — *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/ — diakses 26 November 2026.
3. **IFRS Foundation** — *IAS 16 Property, Plant and Equipment*. https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/ — diakses 26 November 2026.
4. **UU No. 7 Tahun 2021** — Harmonisasi Peraturan Perpajakan. https://peraturan.go.id/id/uu-no-7-tahun-2021 — diakses 26 November 2026.
