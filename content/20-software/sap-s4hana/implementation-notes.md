---
title: SAP S/4HANA Implementation Notes
software_version: "S/4HANA 2025"
---

# SAP S/4HANA Implementation Notes

## Definition

Catatan implementasi **SAP S/4HANA 2025** untuk area yang dibahas repository ini: buku besar, penilaian persediaan, dan dampak konversi dari SAP ERP. Dokumen ini bukan tutorial konfigurasi dan bukan pengganti dokumentasi SAP.

Konsep akuntansi tetap mengacu ke artikel kanonik (`03-accounting`, `06-inventory`, `12-tax`); artikel ini hanya menjelaskan mekanisme yang khas SAP.

## ERP Implementation

### Universal Journal dan tabel ACDOCA

SAP S/4HANA menyatukan jurnal Financial Accounting (FI) dan Controlling (CO) dalam **Universal Journal**. Semua baris jurnal disimpan sekali pada tabel `ACDOCA`, sehingga FI dan CO tidak lagi memerlukan rekonsiliasi antar-komponen. Total dihitung saat dibutuhkan, bukan disimpan sebagai tabel total terpisah.

Konsekuensi praktis:

- Satu baris jurnal membawa dimensi finansial dan manajemen sekaligus (mis. cost center, profit center, segmen, functional area).
- Laporan FI dan CO membaca sumber baris yang sama; selisih FI–CO bukan lagi masalah rekonsiliasi rutin, tetapi indikator kesalahan posting atau konfigurasi.
- Secondary cost element diperlakukan sebagai akun buku besar, bukan objek CO terpisah.
- Tabel lama seperti `BSEG` dan `BKPF` masih ada untuk dokumen sumber dan header; sebagian tabel lama digantikan `ACDOCA`, sebagian tidak.

### Material Ledger

Sejak S/4HANA, **Material Ledger wajib** untuk penilaian persediaan; *Actual Costing* tetap opsional. Material Ledger terintegrasi ke Universal Journal dan mendukung beberapa mata uang serta beberapa valuasi paralel.

- Harga standar (*S price*) memberi stabilitas untuk pengendalian; harga rata-rata bergerak (*V price*) memberi nilai aktual.
- *Actual Costing* menghitung harga unit periodik dan dapat merevaluasi persediaan, WIP, serta COGS pada periode yang ditutup.
- Konversi dari SAP ERP selalu memigrasikan Material Ledger, bahkan jika sistem sumber belum memakainya; langkah migrasi mencakup data master dan riwayat order.

### Titik Posting yang Sering Salah Dipetakan

| Peristiwa | Dokumen SAP | Dampak inti |
|---|---|---|
| Goods receipt PO | Material document + FI document | Dr Persediaan / Cr GR/IR clearing |
| Invoice receipt | Logistics invoice verification | Dr GR/IR / Cr Utang Usaha; selisih harga ke price difference |
| Konsumsi produksi | Material document (issue) | Dr WIP / Cr Persediaan bahan |
| Penerimaan barang jadi | Material document (receipt) | Dr Persediaan barang jadi / Cr WIP |
| Selisih kurs saat pembayaran | Payment posting | Realized exchange difference ke P&L |

Pemetaan akun ditentukan oleh *account determination* (mis. `OBYC`), bukan oleh tipe dokumen semata. Perubahan mapping harus diuji pada lingkungan non-produksi karena memengaruhi seluruh transaksi berikutnya.

### Perbedaan yang Perlu Diwaspadai Saat Konversi

1. **Tabel total lama hilang.** Query kustom yang membaca tabel total FI/CO lama harus ditulis ulang ke `ACDOCA` atau view kompatibilitas.
2. **Material Ledger tidak bisa dilewati.** Data yang sebelumnya dikelola di luar ML harus dimigrasikan dan dimulai (*production startup*) sebelum go-live.
3. **Arsitektur valuasi berubah.** Sejak 1610, Material Ledger dan Actual Costing menjadi dua aplikasi terpisah; Actual Costing dapat diaktifkan belakangan, tetapi tidak dapat dipakai sebagai pengganti ML.
4. **Jumlah ledger dan mata uang terkunci saat migrasi.** Ledger baru atau mata uang baru tidak dapat ditambahkan selama konversi; rencanakan sebelum eksekusi.

## ERP Implementation Comparison

| Aspek | SAP S/4HANA 2025 | Odoo 20.0 | Dynamics 365 Finance |
|---|---|---|---|
| Buku besar | Universal Journal (`ACDOCA`), FI–CO menyatu | `account.move.line`, COA per perusahaan | General journal + dimension |
| Penilaian persediaan | Material Ledger wajib; Actual Costing opsional | FIFO/AVCO/standard per kategori produk | FIFO, LIFO, weighted, standard; inventory close |
| Multi-valuasi | Beberapa ledger, mata uang, dan prinsip akuntansi paralel | Multi-company; valuasi per kategori | Multi-currency; costing per legal entity |
| Jejak audit | Dokumen sumber + `ACDOCA` | Chatter/audit log pada dokumen | Audit trail pada transaksi |

## Caveats

- Artikel ini hanya memakai halaman SAP Help yang dapat diverifikasi; klaim perilaku di luar halaman tersebut tidak dimasukkan.
- Versi 2025 dipakai karena dokumentasi Help yang tersedia saat penulisan. Perilaku rilis lain dapat berbeda.
- Nama transaksi dan tabel (`OBYC`, `ACDOCA`, `CKMLCP`) adalah referensi teknis SAP, bukan rekomendasi konfigurasi.

## References

- SAP. *Universal Journal* (SAP Help Portal, S/4HANA On-Premise). https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/523b8a55559ad007e10000000a44538d.html. Diakses 26 November 2026.
- SAP. *Universal Journal: FAQ* (SAP Help Portal). https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/3cb1182b4a184bdd93f8d62e3f1f0741/8b8e5695c4dc4749a706f9fa2f6bda92.html. Diakses 26 November 2026.
- SAP. *Installation: Actual Costing/Material Ledger* (SAP Help Portal). https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/97f1d353ca9f4408e10000000a174cb4.html. Diakses 26 November 2026.
- SAP. *Material valuation in S/4HANA* (SAP Support Content). https://help.sap.com/docs/SUPPORT_CONTENT/ficontrolling/3361878146.html. Diakses 26 November 2026.
- SAP. *Simplification List for SAP S/4HANA 2025* (PDF). https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf. Diakses 26 November 2026.
