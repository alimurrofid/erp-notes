---
title: Document Lifecycle
---

# Document Lifecycle

## Definition

**Document Lifecycle** adalah urutan status yang dilalui satu dokumen transaksi ERP dari saat dibuat sampai diarsipkan, beserta aturan kapan dokumen boleh berpindah status dan kapan efek akuntansinya timbul. Dokumen adalah bukti operasional; jurnal adalah akibatnya. Memisahkan keduanya mencegah kesalahan paling umum: menganggap dokumen yang sudah dicetak atau dikirim otomatis sudah diposting.

Artikel ini adalah rujukan kanonik untuk siklus dokumen. Artikel per modul menjelaskan status spesifiknya dan merujuk ke sini untuk aturan umum.

## Business Process

Siklus umum satu dokumen transaksi:

```text
Draft
  → Submitted (menunggu validasi/otorisasi)
  → Approved
  → Released / Posted (efek operasional dan/atau akuntansi timbul)
  → Partially Fulfilled (jika ada pemenuhan bertahap)
  → Fulfilled
  → Closed (tidak ada lagi perubahan yang diizinkan)
  → Archived (retensi; hanya baca)
```

Status `Cancelled`, `Reversed`, dan `Corrected` adalah jalur keluar, bukan status normal. Ketiganya dijelaskan di [[02-business-processes/exception-path|Exception Path]].

### Tiga jenis dokumen dan titik efeknya

| Jenis | Contoh | Efek operasional | Efek akuntansi |
|---|---|---|---|
| **Dokumen komitmen** | Sales quotation, purchase requisition, sales order | Reservasi stok/kapasitas; belum ada mutasi | Tidak ada jurnal (kecuali komitmen anggaran) |
| **Dokumen eksekusi** | Goods receipt, delivery order, material issue, production receipt | Mutasi fisik/kuantitas | Jurnal persediaan/WIP pada saat posting |
| **Dokumen finansial** | Customer invoice, vendor bill, payment, journal entry | Klaim/tagihan | Jurnal piutang/utang/kas/pendapatan/beban |

Satu dokumen dapat menghasilkan lebih dari satu jurnal, tetapi **satu peristiwa akuntansi tidak boleh diposting dua kali** hanya karena dokumennya berpindah status.

## Business Rules

1. **Satu arah, satu alasan.** Setiap transisi harus punya pemicu yang dapat diaudit: validasi sistem, otorisasi pengguna, atau dokumen pendahulu. Transisi mundur hanya diizinkan sebelum posting.
2. **Posted bersifat final.** Setelah jurnal terbentuk, dokumen tidak diedit. Koreksi dilakukan dengan jurnal balik atau dokumen koreksi baru.
3. **Nomor dokumen tidak dipakai ulang.** Dokumen batal tetap mempertahankan nomornya dan ditandai batal.
4. **Status tidak boleh melompati validasi.** `Draft → Posted` hanya sah jika ada aturan *fast-track* yang eksplisit dan tetap melewati validasi kredit, stok, atau anggaran.
5. **Penutupan bukan pembatalan.** `Closed` berarti kewajiban dan hak sudah selesai; `Cancelled` berarti dokumen tidak pernah berlaku. Menutup dokumen yang belum selesai menyembunyikan selisih.
6. **Tanggal dokumen ≠ tanggal posting.** Tanggal dokumen mengikat hak/tagihan dan jatuh tempo; tanggal posting menentukan periode buku besar dan masa pajak.
7. **Jejak audit minimum.** Siapa, kapan, dari status apa ke status apa, dan alasannya. Dokumen yang dapat berubah tanpa jejak tidak boleh dipakai sebagai bukti audit.

### Kapan dokumen boleh dihapus?

Tidak. Dokumen transaksi yang sudah memiliki nomor tidak dihapus dari sistem. Dokumen draft yang belum pernah diposting boleh dihapus hanya jika kebijakan retensi mengizinkannya; setelah diposting, satu-satunya jalan adalah pembatalan atau pembalikan.

## Accounting Impact

Efek akuntansi melekat pada **peristiwa**, bukan pada status:

| Peristiwa | Dokumen | Jurnal inti |
|---|---|---|
| Barang diterima | Goods receipt | Dr Persediaan / Cr GR/IR |
| Barang dikirim | Delivery order / goods issue | Dr COGS / Cr Persediaan |
| Faktur penjualan diposting | Customer invoice | Dr Piutang / Cr Pendapatan, Cr PPN Keluaran |
| Faktur vendor diposting | Vendor bill | Dr Persediaan/Beban, Dr PPN Masukan / Cr Utang |
| Pembayaran | Payment | Dr Utang / Cr Kas, atau Dr Kas / Cr Piutang |
| Periode ditutup | Period lock | Tidak ada jurnal; mencegah posting mundur |

> [!important] Status bukan dasar pengakuan
> "Sudah `Closed`" tidak berarti pendapatan boleh diakui, dan "sudah `Posted`" tidak berarti kas sudah diterima. Pengakuan mengikuti IFRS 15 (kontrol berpindah) dan definisi aset/kewajiban, bukan label status.

## Example

Purchase Order `PO-2026-09-0081` senilai Rp7.700.000 (DPP Rp7.000.000 + PPN Rp770.000):

1. `Draft` — belum ada komitmen anggaran.
2. `Approved` — komitmen anggaran tercatat; belum ada jurnal keuangan.
3. `Issued` ke pemasok — masih belum ada jurnal.
4. `Partially Received` — 6 dari 10 unit tiba; goods receipt memposting Dr Persediaan Rp4.200.000 / Cr GR/IR Rp4.200.000 (6 × Rp700.000).
5. `Fully Received` — sisa 4 unit tiba; total GR/IR Rp7.000.000.
6. `Invoiced` — vendor bill Rp7.770.000 memposting Dr GR/IR Rp7.000.000, Dr PPN Masukan Rp770.000 / Cr Utang Usaha Rp7.770.000.
7. `Closed` — pembayaran lunas; tidak ada jurnal baru selain pelunasan utang.

Jika pada langkah 4 ditemukan 1 unit rusak, dokumen tidak kembali ke `Draft`; barang rusak dicatat sebagai retur/karantina, dan PO tetap berjalan untuk sisa kuantitas.

## Related Concepts

- [[02-business-processes/exception-path|Exception Path]] — pembatalan, pembalikan, short-close, dan koreksi.
- [[03-accounting/journal-entry|Journal Entry]] — bagaimana dokumen menjadi jurnal.
- [[03-accounting/period-end-closing|Period-End Closing]] — penguncian periode dan koreksi setelah tutup buku.
- [[01-fundamentals/documents-transactions-events|Documents, Transactions, Events]] — perbedaan ketiganya.

## References

- IFRS Foundation. *IAS 1 Presentation of Financial Statements* (paragraf 27–28: dasar akrual). https://www.ifrs.org/issued-standards/list-of-standards/ias-1-presentation-of-financial-statements/. Diakses 26 November 2026.
- IFRS Foundation. *IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors* (paragraf 41–49: koreksi kesalahan). https://www.ifrs.org/issued-standards/list-of-standards/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors/. Diakses 26 November 2026.
- COSO. *Internal Control — Integrated Framework* (2013). https://www.coso.org/guidance-on-ic. Diakses 26 November 2026.
