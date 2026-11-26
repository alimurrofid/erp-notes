---
title: Naventra Design — accounting
---

# Naventra Design — accounting

## Definition

Keputusan desain Naventra untuk domain Accounting: struktur buku besar, jurnal, subledger, pengakuan, penutupan, dan pelaporan. Setiap keputusan punya ID `NAV-D` dan menunjuk artikel sumber.

## NAV-D-148 — Persamaan Akuntansi dan Periodisitas

Sumber: [[03-accounting/accounting-fundamentals|Accounting Fundamentals]]

- Setiap transaksi harus menjaga `assets = liabilities + equity`; posting yang melanggar ditolak.
- Entitas, periode fiskal, dan mata uang fungsional menjadi dimensi wajib setiap jurnal.
- Basis akrual dipakai untuk pendapatan dan beban; kas hanya berubah pada peristiwa kas.
- Tidak ada jurnal tanpa `posting_date` dan `document_date`; keduanya disimpan terpisah.

## NAV-D-149 — Double Entry dan Zero-Sum Validation

Sumber: [[03-accounting/debit-credit-and-double-entry|Debit, Credit, and Double Entry]]

- Setiap jurnal minimal memiliki dua baris; total debit = total kredit dalam mata uang fungsional.
- Akun diklasifikasikan ALERE (Asset, Liability, Equity, Revenue, Expense); normal balance menentukan arah saldo.
- Validasi zero-sum dilakukan di database/service layer, bukan hanya UI.
- Jurnal satu baris (mis. reklasifikasi sepihak) ditolak.

## NAV-D-150 — Chart of Accounts Berhierarki

Sumber: [[03-accounting/chart-of-accounts|Chart of Accounts]]

- COA memakai struktur pohon dengan `parent_id`; hanya akun daun (`is_leaf = true`) yang dapat diposting.
- Segmen dimensi (company, branch, cost center, profit center, project) disimpan terpisah dari kode akun.
- Akun kontrol subledger ditandai `is_control = true` dan diblokir dari posting manual.
- Satu entitas memiliki satu COA aktif; perubahan struktur dicatat bertanggal.

## NAV-D-151 — Journal Entry Immutability dan Reversal

Sumber: [[03-accounting/journal-entry|Journal Entry]]

- Header jurnal: nomor, tanggal, entitas, sumber, status, mata uang, kurs. Baris: akun, debit, kredit, dimensi, referensi.
- Jurnal `POSTED` tidak dapat diedit atau dihapus; koreksi memakai jurnal balik atau jurnal koreksi baru.
- Jurnal balik menyimpan `reversed_journal_id` dan alasan.
- Posting manual memerlukan otorisasi berbeda dari posting otomatis.
- Jejak audit mencatat nilai sebelum/sesudah untuk perubahan status.

## NAV-D-152 — General Ledger dan Subledger

Sumber: [[03-accounting/general-ledger-and-subledger|General Ledger and Subledger]]

- Subledger AR, AP, inventory, asset, dan project memposting ringkasan ke akun kontrol GL.
- Saldo akun kontrol harus sama dengan total subledger pada setiap akhir periode.
- Rekonsiliasi menghasilkan daftar selisih, bukan jurnal penyeimbang otomatis.
- Posting langsung ke akun kontrol diblokir kecuali oleh proses rekonsiliasi terotorisasi.

## NAV-D-153 — AR: Open Item dan ECL

Sumber: [[03-accounting/accounts-receivable|Accounts Receivable]]

- Piutang dikelola sebagai open item per invoice; pembayaran mengalokasikan ke invoice tertentu.
- Aging dihitung dari tanggal dokumen dan termin, bukan tanggal posting.
- Selisih pembayaran (potongan, kurs, biaya bank) memakai akun terpisah, bukan mengubah nilai invoice.
- ECL dihitung dari matriks umur piutang dan diposting sebagai cadangan, bukan penghapusan langsung.
- Penghapusan piutang memerlukan bukti dan otorisasi.

## NAV-D-154 — AP: GR/IR dan Payment Run

Sumber: [[03-accounting/accounts-payable|Accounts Payable]]

- Vendor bill mencocokkan PO, goods receipt, dan invoice; selisih di luar toleransi masuk exception.
- GR/IR adalah akun kliring; saldonya harus nol setelah semua penerimaan ditagih.
- Payment run memilih invoice jatuh tempo, menghitung diskon, dan menghasilkan satu file pembayaran per entitas.
- Pembayaran ganda dicegah dengan idempotency key per invoice/payment.
- Debit note/retur mengurangi utang dan PPN Masukan, bukan beban.

## NAV-D-155 — Revenue dan Expense Recognition

Sumber: [[03-accounting/revenue-and-expense|Revenue and Expense]]

- Pendapatan diakui saat performance obligation terpenuhi; invoice bukan dasar pengakuan.
- Beban diakui pada periode manfaatnya (matching), termasuk HPP proyek dan komisi.
- Contract asset/liability dihitung per kontrak, bukan per invoice.
- Perubahan kebijakan pengakuan dicatat sebagai perubahan bertanggal dan diungkapkan.

## NAV-D-156 — Inventory Accounting dan NRV

Sumber: [[03-accounting/inventory-accounting|Inventory Accounting]]

- Persediaan dinilai perpetual; setiap mutasi menghasilkan jurnal dan lapisan biaya.
- GR/IR menampung penerimaan yang belum ditagih; bukan utang final.
- Pada setiap tanggal pelaporan, nilai persediaan dibandingkan dengan NRV; write-down dan reversal dibatasi.
- LIFO tidak disediakan karena IAS 2.25; FIFO, weighted average, dan standard cost (dengan varians) didukung.
- Overhead tetap dialokasikan pada kapasitas normal; idle capacity dibebankan periode berjalan.

## NAV-D-157 — Fixed Asset Subledger

Sumber: [[03-accounting/fixed-asset-accounting|Fixed Asset Accounting]]

- Aset memiliki master, klasifikasi, lokasi, custodian, dan jadwal penyusutan.
- Perolehan, transfer, revaluasi, impairment, dan disposal menghasilkan jurnal ke akun kontrol aset.
- Satu aset hanya memakai satu model pengukuran (cost atau revaluation) pada satu waktu.
- Componentization memakai sub-aset dengan umur terpisah; tidak menimpa aset induk.
- Pelepasan menghentikan penyusutan dan menghapus biaya/akumulasi.

## NAV-D-158 — Tax Accounting

Sumber: [[03-accounting/tax-accounting|Tax Accounting]]

- PPN Masukan/Keluaran, PPh dipotong, dan PPh badan memakai akun serta kode pajak terpisah.
- Faktur pajak elektronik memiliki status dan nomor sendiri; invoice komersial tidak menggantikannya.
- Tarif dan tanggal berlaku disimpan sebagai data; dokumen menyimpan snapshot.
- Selisih PPN antara GL dan data faktur menjadi exception sebelum pelaporan.
- PPh 21/22/23/26 dikelola sebagai prepayment/withholding, bukan beban final.

## NAV-D-159 — Bank Reconciliation

Sumber: [[03-accounting/bank-reconciliation|Bank Reconciliation]]

- Statement bank diimpor (CAMT.053/MT940) dan dinormalisasi ke format internal.
- Pencocokan memakai aturan: nomor referensi, nominal, tanggal, dan nama lawan.
- Item yang belum cocok masuk akun kliring, bukan langsung disesuaikan ke saldo bank.
- Selisih waktu, biaya bank, dan bunga menjadi jurnal penyesuaian terpisah.
- Rekonsiliasi selesai jika saldo bank = saldo GL + item transit − item outstanding.

## NAV-D-160 — Accrual dan Adjusting Entries

Sumber: [[03-accounting/accrual-and-adjusting-entries|Accrual and Adjusting Entries]]

- Akrual dan prepaid memiliki jadwal dan otomatis dibalik pada periode berikutnya.
- Jurnal penyesuaian menyimpan referensi ke dokumen sumber dan alasan.
- Estimasi (mis. bonus, utilitas) disimpan sebagai `accrual_estimate` dan ditinjau ulang.
- Penyesuaian tidak boleh mengubah dokumen operasional; hanya membentuk jurnal baru.

## NAV-D-161 — Depreciation dan Amortization

Sumber: [[03-accounting/depreciation-and-amortization|Depreciation and Amortization]]

- Jadwal penyusutan dibuat per aset/komponen dengan metode, umur, residu, dan tanggal mulai.
- Penyusutan berjalan otomatis setiap periode dan dapat diulang tanpa duplikasi.
- Perubahan estimasi diterapkan prospektif; tidak menghitung ulang periode lalu.
- Amortisasi aset tak berwujud memakai mekanisme jadwal yang sama.
- Aset yang dihentikan atau dilepas tidak lagi disusutkan.

## NAV-D-162 — Foreign Currency Accounting

Sumber: [[03-accounting/foreign-currency-accounting|Foreign Currency Accounting]]

- Setiap entitas memiliki mata uang fungsional; transaksi valas menyimpan kurs saat transaksi.
- Pos moneter direvaluasi pada kurs penutupan; selisih belum direalisasi masuk P&L atau OCI sesuai instrumen.
- Selisih realisasi diakui saat settlement.
- Kurs pajak dan kurs akuntansi disimpan terpisah dan dibekukan pada baris transaksi.
- Laporan konsolidasi memakai kurs translasi yang terdokumentasi.

## NAV-D-163 — Period-End Closing

Sumber: [[03-accounting/period-end-closing|Period-End Closing]]

- Checklist tutup buku: cutoff dokumen, rekonsiliasi subledger, revaluasi kurs, akrual, trial balance, dan lock.
- Periode dikunci setelah semua selisih dijelaskan; pembukaan kembali memerlukan otorisasi dan audit log.
- Saldo laba/rugi ditutup ke laba ditahan; akun nominal menjadi nol.
- Kesalahan periode lalu yang material dikoreksi retrospektif (IAS 8); tidak dengan mengedit jurnal lama.
- Laporan periode terkunci bersifat read-only.

## NAV-D-164 — Financial Statements Mapping

Sumber: [[03-accounting/financial-statements|Financial Statements]]

- Setiap akun COA dipetakan ke baris laporan (neraca, laba rugi, arus kas, perubahan ekuitas).
- Mapping disimpan sebagai data bertanggal agar laporan historis dapat direproduksi.
- Laporan menyajikan komparatif dan catatan untuk pos material.
- Arus kas memakai metode tidak langsung dengan rekonsiliasi laba ke kas.
- Angka laporan harus dapat drill-down ke jurnal dan dokumen sumber.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-148 | `03-accounting/accounting-fundamentals.md` | Adopted |
| NAV-D-149 | `03-accounting/debit-credit-and-double-entry.md` | Adopted |
| NAV-D-150 | `03-accounting/chart-of-accounts.md` | Adopted |
| NAV-D-151 | `03-accounting/journal-entry.md` | Adopted |
| NAV-D-152 | `03-accounting/general-ledger-and-subledger.md` | Adopted |
| NAV-D-153 | `03-accounting/accounts-receivable.md` | Adopted |
| NAV-D-154 | `03-accounting/accounts-payable.md` | Adopted |
| NAV-D-155 | `03-accounting/revenue-and-expense.md` | Adopted |
| NAV-D-156 | `03-accounting/inventory-accounting.md` | Adopted |
| NAV-D-157 | `03-accounting/fixed-asset-accounting.md` | Adopted |
| NAV-D-158 | `03-accounting/tax-accounting.md` | Adopted |
| NAV-D-159 | `03-accounting/bank-reconciliation.md` | Adopted |
| NAV-D-160 | `03-accounting/accrual-and-adjusting-entries.md` | Adopted |
| NAV-D-161 | `03-accounting/depreciation-and-amortization.md` | Adopted |
| NAV-D-162 | `03-accounting/foreign-currency-accounting.md` | Adopted |
| NAV-D-163 | `03-accounting/period-end-closing.md` | Adopted |
| NAV-D-164 | `03-accounting/financial-statements.md` | Adopted |

## References

1. **IFRS Foundation** — *IAS 1 Presentation of Financial Statements*. https://www.ifrs.org/issued-standards/list-of-standards/ias-1-presentation-of-financial-statements/ — diakses 26 November 2026.
2. **IFRS Foundation** — *IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors*. https://www.ifrs.org/issued-standards/list-of-standards/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors/ — diakses 26 November 2026.
3. **IFRS Foundation** — *IAS 21 The Effects of Changes in Foreign Exchange Rates*. https://www.ifrs.org/issued-standards/list-of-standards/ias-21-the-effects-of-changes-in-foreign-exchange-rates/ — diakses 26 November 2026.
