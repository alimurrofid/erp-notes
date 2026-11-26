---
title: Exception Path
---

# Exception Path

## Definition

**Exception Path** adalah jalur penanganan yang sah ketika satu transaksi tidak dapat mengikuti alur normal: dokumen batal, barang ditolak, kuantitas kurang, harga berbeda, pembayaran gagal, atau jurnal harus dikoreksi. Tanpa jalur ini, pengguna biasanya "memperbaiki" data dengan mengedit dokumen lama — praktik yang merusak jejak audit dan membuat laporan tidak dapat direkonsiliasi.

Prinsipnya: **setiap pengecualian harus menghasilkan dokumen baru atau status baru yang eksplisit, bukan perubahan diam-diam pada dokumen yang sudah diposting.**

## Business Process

```text
Peristiwa pengecualian terdeteksi
  → klasifikasi jenis pengecualian
  → tentukan apakah efek sudah diposting
  → pilih jalur: cancel / short-close / return / reversal / correction
  → posting dokumen pengecualian
  → tautkan ke dokumen asal (reference)
  → catat alasan pada jejak audit
```

### Klasifikasi dan jalur

| Jenis pengecualian | Kapan dipakai | Jalur yang benar | Jangan dilakukan |
|---|---|---|---|
| **Cancellation** | Dokumen belum diposting dan belum ada efek fisik/finansial | Ubah status ke `Cancelled`; lepaskan reservasi | Menghapus nomor dokumen |
| **Short-close** | Sebagian sudah dipenuhi, sisanya tidak akan dipenuhi | Tutup sisa kuantitas dengan alasan; dokumen asal tetap terbuka untuk bagian yang sudah terjadi | Membiarkan dokumen terbuka selamanya |
| **Return / rejection** | Barang sudah diterima/dikirim tetapi harus dikembalikan | Dokumen retur + debit/credit note; persediaan dan PPN disesuaikan | Membalik langsung jurnal penerimaan lama |
| **Reversal** | Jurnal sudah diposting dan seluruh efeknya harus dibatalkan | Jurnal balik pada periode yang diizinkan, dengan referensi ke jurnal asal | Menghapus baris jurnal |
| **Correction** | Sebagian nilai/akun salah, bukan seluruh transaksi | Jurnal koreksi tambahan (atau reklasifikasi), atau restatement jika material dan periode lalu | Mengedit angka pada dokumen posted |
| **Write-off** | Nilai tidak dapat dipulihkan (piutang macet, persediaan rusak) | Jurnal beban/kerugian dengan persetujuan dan dasar penilaian | Menyembunyikan di akun lain |

## Business Rules

1. **Efek fisik menentukan jalur.** Jika barang sudah bergerak, pembatalan dokumen tidak cukup; harus ada dokumen balik yang mengembalikan kuantitas.
2. **Efek pajak harus ikut.** Retur dan pembatalan faktur mengubah DPP dan PPN; faktur pajak harus disesuaikan, bukan hanya jurnal komersial.
3. **Periode terkunci tidak dibuka untuk koreksi rutin.** Koreksi periode lalu yang material disajikan ulang sesuai IAS 8; yang tidak material dicatat di periode ditemukan dan diungkapkan.
4. **Ambang materialitas harus tertulis.** Tanpa ambang, setiap selisih kecil akan memicu restatement atau, sebaliknya, setiap kesalahan besar dianggap "tidak material".
5. **Otorisasi berbeda dari transaksi normal.** Pembatalan setelah posting, write-off, dan reversal memerlukan persetujuan tingkat lebih tinggi daripada pembuatan dokumen.
6. **Satu dokumen asal, satu dokumen koreksi.** Jangan membuat dua dokumen koreksi untuk kesalahan yang sama; tautkan keduanya agar nilai kembali seimbang.
7. **Alasan wajib.** Kode alasan yang terstruktur (bukan teks bebas) agar pola pengecualian dapat dianalisis.

## Accounting Impact

| Pengecualian | Dampak akuntansi | Catatan |
|---|---|---|
| Cancel dokumen komitmen | Tidak ada jurnal; reservasi dilepas | Pastikan tidak ada penerimaan/pengiriman terkait |
| Short-close PO | Tidak ada jurnal tambahan; GR/IR yang sudah terbentuk tetap berdasarkan barang diterima | Sisa kuantitas tidak boleh menjadi utang |
| Retur pembelian | Dr Utang/GR-IR, Cr Persediaan, Cr PPN Masukan | Nilai persediaan memakai biaya perolehan termasuk landed cost |
| Retur penjualan | Dr Persediaan, Cr COGS; credit note Dr Pendapatan/PPN, Cr Piutang | Jika barang rusak, lanjutkan Dr Beban Scrap / Cr Persediaan |
| Reversal jurnal | Kebalikan persis jurnal asal | Jangan mengubah jurnal asal |
| Koreksi periode lalu material | Dr/Cr saldo awal laba ditahan dan komparatif | IAS 8.42; bukan laba berjalan |
| Write-off piutang | Dr Beban Kerugian Piutang / Cr Piutang (setelah cadangan) | Memerlukan bukti dan otorisasi |

> [!warning] Pengecualian bukan izin mengubah sejarah
> Membalik jurnal di periode berjalan untuk kesalahan periode lalu yang material menghasilkan laba periode berjalan yang salah. Klasifikasikan dulu: kesalahan, perubahan estimasi, atau perubahan kebijakan — ketiganya punya perlakuan berbeda di IAS 8.

## Example

**Kasus**: PO `PO-2026-09-0081` (10 unit @ Rp700.000) sudah diterima penuh dan difakturkan. Pada inspeksi lanjutan, 2 unit terbukti tidak sesuai spesifikasi dan dikembalikan.

Jalur yang benar:

1. Terbitkan **Return to Vendor** untuk 2 unit; stok berkurang 2 unit.
2. Terbitkan **Debit Note** Rp1.540.000 (DPP Rp1.400.000 + PPN Rp140.000) yang mengurangi utang usaha.
3. Jurnal retur: Dr Utang Usaha Rp1.540.000 / Cr Persediaan Rp1.400.000 / Cr PPN Masukan Rp140.000.
4. PO tetap `Closed`; tidak dibuka kembali, karena seluruh kuantitas sudah diterima dan retur adalah dokumen terpisah.

Jika barang retur sudah tidak dapat dijual, tambahkan Dr Beban Kerugian Persediaan Rp1.400.000 / Cr Persediaan Rp1.400.000, bukan mengkredit COGS.

## Related Concepts

- [[02-business-processes/document-lifecycle|Document Lifecycle]] — status normal dan titik posted.
- [[04-sales/sales-return-and-credit-note|Sales Return and Credit Note]] — jalur retur penjualan.
- [[05-purchasing/purchase-return-and-debit-note|Purchase Return and Debit Note]] — jalur retur pembelian.
- [[05-purchasing/purchase-cancellation-and-amendment|Purchase Cancellation and Amendment]] — pembatalan dan amendemen PO.
- [[03-accounting/period-end-closing|Period-End Closing]] — koreksi setelah periode dikunci.

## References

- IFRS Foundation. *IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors* (paragraf 41–49). https://www.ifrs.org/issued-standards/list-of-standards/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors/. Diakses 26 November 2026.
- IFRS Foundation. *IAS 2 Inventories* (paragraf 28–33: NRV dan pemulihan). https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/. Diakses 26 November 2026.
- COSO. *Internal Control — Integrated Framework* (2013), komponen *control activities*. https://www.coso.org/guidance-on-ic. Diakses 26 November 2026.
