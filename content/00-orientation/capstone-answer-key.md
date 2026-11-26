---
title: Capstone Answer Key
---

# Capstone Answer Key

## Definition

Kunci jawaban [[00-orientation/capstone|Capstone Case]]. Baca setelah mengerjakan, bukan sebelumnya. Angka mengikuti skenario kanonik dan tarif PPN efektif 11%.

## Asumsi

- Seluruh 10 unit terjual; tidak ada sisa persediaan.
- Landed cost Rp500.000 dialokasikan penuh ke 10 unit.

## 1. P2P

| Langkah | Dokumen | Status | Jurnal |
|---|---|---|---|
| Permintaan | PR | Approved | Tidak ada jurnal |
| Pesanan | PO 10 × 700.000 | Confirmed | Tidak ada jurnal (komitmen) |
| Penerimaan | GR 10 unit | Received | Dr Inventory 7.000.000 / Cr GR/IR 7.000.000 |
| Tagihan | Vendor bill + PPN 770.000 | Posted | Dr GR/IR 7.000.000; Dr PPN Masukan 770.000 / Cr AP 7.770.000 |
| Pembayaran | Payment | Paid | Dr AP 7.770.000 / Cr Bank 7.770.000 |

Saldo GR/IR harus nol setelah tagihan diposting.

## 2. Biaya Perolehan dan Landed Cost

| Pos | Nilai |
|---|---:|
| Harga beli 10 unit | 7.000.000 |
| Landed cost | 500.000 |
| **Nilai persediaan** | **7.500.000** |
| **Per unit** | **750.000** |

Jurnal kapitalisasi landed cost: Dr Inventory 500.000 / Cr AP (atau Bank) 500.000.

## 3. Penjualan

| Peristiwa | Jurnal |
|---|---|
| BAST 31 Des | Dr AR 11.100.000 / Cr Revenue 10.000.000; Cr PPN Keluaran 1.100.000 |
| Pengakuan HPP | Dr COGS 7.500.000 / Cr Inventory 7.500.000 |
| Penerimaan kas | Dr Bank 11.100.000 / Cr AR 11.100.000 |

## 4. Penutupan

- GR/IR harus nol: semua penerimaan sudah ditagih.
- Persediaan nol karena seluruh unit terjual.
- Akun sementara (revenue, expense, COGS) ditutup ke laba ditahan.

## 5. Laba Rugi Ringkas

| Pos | Nilai |
|---|---:|
| Pendapatan | 10.000.000 |
| COGS | (7.500.000) |
| **Laba kotor** | **2.500.000** |

Dua selisih yang lazim saat rekonsiliasi:

1. **GR/IR**: penerimaan sudah diposting tetapi tagihan belum diterima → saldo sementara, bukan utang final.
2. **PPN**: faktur pajak masukan belum diunggah/dikreditkan pada periode yang sama → selisih antara subledger pajak dan GL.

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
2. **IFRS Foundation** — *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/ — diakses 26 November 2026.
3. **UU No. 7 Tahun 2021** — Harmonisasi Peraturan Perpajakan. https://peraturan.go.id/id/uu-no-7-tahun-2021 — diakses 26 November 2026.
