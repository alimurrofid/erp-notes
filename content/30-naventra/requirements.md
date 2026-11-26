---
title: Naventra Requirements
---

# Naventra Requirements

## Definition

Daftar kebutuhan fungsional Naventra yang diturunkan dari konsep di repository ini. Setiap kebutuhan punya ID, sumber konsep, dan status. Ini baseline desain, bukan spesifikasi kontrak.

Aturan: kebutuhan tanpa sumber konsep tidak boleh masuk; jika belum ada artikelnya, tandai `[belum ada konsep]`.

## Requirement

| ID | Kebutuhan | Sumber konsep | Prioritas |
|---|---|---|---|
| NAV-R-01 | Satu COA per entitas, tanpa duplikasi akun untuk objek yang sama | [[03-accounting/chart-of-accounts\|COA]] | P0 |
| NAV-R-02 | Jurnal berpasangan wajib seimbang; posting ditolak jika tidak | [[03-accounting/debit-credit-and-double-entry\|Double Entry]] | P0 |
| NAV-R-03 | Subledger per modul (AR, AP, inventory, asset, project) dengan rekonsiliasi ke GL | [[03-accounting/general-ledger-and-subledger\|GL & Subledger]] | P0 |
| NAV-R-04 | Pajak dikelola sebagai data dengan tanggal berlaku, bukan hardcode | [[12-tax/vat-fundamentals\|VAT]] | P0 |
| NAV-R-05 | HPP proyek fixed-price diakui setiap BAST, bukan hanya saat penutupan | [[10-project/project-billing-and-revenue\|Project Billing]] | P0 |
| NAV-R-06 | Penyusutan aset memakai satu basis per aset; revaluasi dan componentization memakai aset terpisah | [[09-assets/depreciation-management\|Depreciation]] | P1 |
| NAV-R-07 | GR/IR adalah akun kliring, bukan provisi; harus nol setelah tagihan | [[03-accounting/accounts-payable\|AP]] | P0 |
| NAV-R-08 | Reservasi stok mengubah ketersediaan, bukan nilai atau kepemilikan | [[06-inventory/inventory-reservation-and-allocation\|Reservation]] | P1 |
| NAV-R-09 | Backflush dan manual issue sama-sama menghasilkan jurnal konsumsi yang dapat diaudit | [[07-manufacturing/material-consumption-and-backflush\|Consumption]] | P1 |
| NAV-R-10 | Nomor dokumen mengikuti pola `JENIS-TAHUN-BULAN-URUT` dan unik per entitas | [[01-fundamentals/documents-transactions-events\|Documents]] | P1 |
| NAV-R-11 | Perubahan tarif atau kebijakan pengakuan pendapatan harus tercatat sebagai perubahan bertanggal | [[03-accounting/revenue-and-expense\|Revenue & Expense]] | P1 |
| NAV-R-12 | Setiap posting menyimpan jejak: user, waktu, dokumen sumber, dan nilai sebelum/sesudah | [[08-finance/financial-controls\|Financial Controls]] | P1 |
| NAV-R-13 | Siklus Sales Order memisahkan order, delivery, invoice, dan payment; pengiriman parsial dan backorder dilacak per baris | [[04-sales/sales-order\|Sales Order]] | P0 |
| NAV-R-14 | Pemeriksaan kredit dilakukan atomik sebelum konfirmasi order dan sebelum pengiriman | [[04-sales/customer-credit-management\|Credit Management]] | P0 |
| NAV-R-15 | Harga dan diskon mengikuti urutan presedensi dengan masa berlaku; dokumen menyimpan snapshot | [[04-sales/pricing-and-discount\|Pricing]] | P1 |
| NAV-R-16 | Pendapatan mengikuti jadwal pengakuan; contract asset/liability dihitung per kontrak | [[04-sales/revenue-recognition\|Revenue Recognition]] | P0 |
| NAV-R-17 | Retur fisik dan credit note adalah dua langkah terpisah; PPN dan COGS disesuaikan | [[04-sales/sales-return-and-credit-note\|Sales Return]] | P1 |
| NAV-R-18 | Setiap proses memiliki trigger, validasi, exception path, dan next process yang eksplisit | [[02-business-processes/document-lifecycle\|Document Lifecycle]], [[02-business-processes/exception-path\|Exception Path]] | P1 |

## Traceability

| Konsep | Requirement | Desain | Status |
|---|---|---|---|
| [[03-accounting/accounting-fundamentals\|Accounting Fundamentals]] | NAV-R-01, NAV-R-02, NAV-R-03 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[12-tax/vat-fundamentals\|VAT Fundamentals]] | NAV-R-04 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[10-project/project-billing-and-revenue\|Project Billing]] | NAV-R-05 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[09-assets/depreciation-management\|Depreciation]] | NAV-R-06 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[05-purchasing/three-way-match\|3-Way Match]] | NAV-R-07 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[06-inventory/inventory-reservation-and-allocation\|Reservation]] | NAV-R-08 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[07-manufacturing/material-consumption-and-backflush\|Backflush]] | NAV-R-09 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[01-fundamentals/documents-transactions-events\|Documents]] | NAV-R-10 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[08-finance/financial-controls\|Controls]] | NAV-R-12 | [[30-naventra/functional-design\|Functional Design]] | Draft |
| [[04-sales/sales-order\|Sales Order]] | NAV-R-13 | [[30-naventra/design-sales\|Design Sales]] | Adopted |
| [[04-sales/customer-credit-management\|Credit Management]] | NAV-R-14 | [[30-naventra/design-sales\|Design Sales]] | Adopted |
| [[04-sales/pricing-and-discount\|Pricing]] | NAV-R-15 | [[30-naventra/design-sales\|Design Sales]] | Adopted |
| [[04-sales/revenue-recognition\|Revenue Recognition]] | NAV-R-16 | [[30-naventra/design-sales\|Design Sales]] | Adopted |
| [[04-sales/sales-return-and-credit-note\|Sales Return]] | NAV-R-17 | [[30-naventra/design-sales\|Design Sales]] | Adopted |
| [[02-business-processes/document-lifecycle\|Document Lifecycle]] | NAV-R-18 | [[30-naventra/design-processes\|Design Processes]] | Adopted |
| [[03-accounting/accounting-fundamentals\|Accounting]] | NAV-R-01…R-03, R-12 | [[30-naventra/design-accounting\|Design Accounting]] | Adopted |

## Non-Goals

- Naventra bukan produk yang dijual; dokumen ini tidak menjanjikan roadmap.
- Tidak ada fitur yang ditambahkan hanya karena vendor lain memilikinya.

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
2. **IFRS Foundation** — *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/ — diakses 26 November 2026.
3. **IFRS Foundation** — *IAS 16 Property, Plant and Equipment*. https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/ — diakses 26 November 2026.
4. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
