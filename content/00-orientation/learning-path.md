---
title: Learning Path
---

# Learning Path

## Definition

Empat urutan belajar yang menyusun artikel di repository ini dari konsep dasar sampai desain solusi ERP. Setiap jalur punya prasyarat, artikel wajib, dan checkpoint yang harus dikerjakan tanpa membuka catatan.

Jalur ini tidak menambah materi baru. Isinya tautan ke artikel kanonik yang sudah ada. Untuk latihan tertarget, gunakan [[00-orientation/section-exercises|Section Exercises]] (10 soal per section) atau [[00-orientation/exercises|Exercises]] (40 soal lintas section).

## Beginner (8–12 jam)

**Tujuan:** mampu membaca satu transaksi dan menjelaskan jurnalnya.

1. [[00-fundamentals/erp-fundamentals|ERP Fundamentals]]
2. [[00-fundamentals/erp-architecture|ERP Architecture]]
3. [[00-fundamentals/master-data-vs-transaction-data|Master Data vs Transaction Data]]
4. [[00-fundamentals/organizational-structure|Organizational Structure]]
5. [[01-business-processes/order-to-cash|Order to Cash]]
6. [[01-business-processes/procure-to-pay|Procure to Pay]]
7. [[02-accounting/debit-credit-and-double-entry|Debit, Credit, and Double Entry]]
8. [[02-accounting/journal-entry|Journal Entry]]
9. [[02-accounting/chart-of-accounts|Chart of Accounts]]
10. [[02-accounting/general-ledger-and-subledger|General Ledger and Subledger]]

**Checkpoint 1.** Tanpa membuka catatan, tulis jurnal untuk (a) penjualan kredit 10 unit dan (b) penerimaan barang dari pemasok — termasuk akun yang terlibat dan mengapa. Cocokkan dengan soal 1–10 [[00-orientation/section-exercises|Section Exercises 00]] dan soal 1–5 [[00-orientation/exercises|Exercises]].

## Intermediate (25–35 jam)

**Tujuan:** mampu menelusuri satu dokumen dari awal sampai jurnal, rekonsiliasi, dan penanganan pengecualian.

1. **Kontrak proses:** [[01-business-processes/document-lifecycle|Document Lifecycle]] → [[01-business-processes/exception-path|Exception Path]]
2. **O2C:** [[03-sales/sales-quotation|Quotation]] → [[03-sales/sales-order|Sales Order]] → [[03-sales/delivery-and-shipping|Delivery]] → [[03-sales/accounts-receivable-integration|AR Integration]] → [[03-sales/sales-cancellation-and-amendment|Cancellation/Amendment]] → [[03-sales/sales-return-and-credit-note|Return]]
3. **P2P:** [[04-purchasing/purchase-requisition|PR]] → [[04-purchasing/request-for-quotation|RFQ]] → [[04-purchasing/purchase-order|PO]] → [[04-purchasing/goods-receipt-and-service-receipt|Goods Receipt]] → [[04-purchasing/three-way-match|3-Way Match]] → [[04-purchasing/accounts-payable-integration|AP Integration]] → [[04-purchasing/purchase-return-and-debit-note|Return]]
4. **Inventory:** [[05-inventory/product-and-inventory-master-data|Master Data]] → [[05-inventory/inventory-receiving|Receiving]] → [[05-inventory/inventory-reservation-and-allocation|Reservation]] → [[05-inventory/inventory-picking-and-delivery|Picking]] → [[05-inventory/inventory-costing|Costing]] → [[05-inventory/physical-inventory-count|Count]] → [[05-inventory/inventory-adjustment|Adjustment]]
5. **Pendapatan:** [[03-sales/revenue-recognition|Revenue Recognition]]
6. **Pajak dasar:** [[03-sales/sales-tax|Sales Tax]] dan [[04-purchasing/purchase-tax|Purchase Tax]]; rujuk [[11-tax/vat-fundamentals|VAT Fundamentals]] untuk konsep kanonik
7. [[00-orientation/glossary|Glossary]] untuk istilah yang belum dikenal

**Checkpoint 2.** Telusuri satu SO dan satu PO: sebutkan dokumen, status, akun, dan jurnal di setiap langkah. Lalu jelaskan satu exception path untuk masing-masing. Cocokkan dengan [[00-orientation/section-exercises|Section Exercises 01]]–[[00-orientation/section-exercises|05]].

## Advanced (40–55 jam)

**Tujuan:** mampu menutup satu bulan dari subledger sampai laporan keuangan, termasuk payroll dan pajak.

1. **Manufacturing:** [[06-manufacturing/product-structure-and-bom|BOM]] → [[06-manufacturing/routing-and-work-center|Routing]] → [[06-manufacturing/mrp-material-requirement-planning|MRP]] → [[06-manufacturing/manufacturing-order|MO]] → [[06-manufacturing/material-consumption-and-backflush|Consumption]] → [[06-manufacturing/production-output-and-by-product|Output]] → [[06-manufacturing/production-variance-and-performance|Variance]]
2. **Costing:** [[06-manufacturing/production-costing-and-wip|WIP dan costing]]
3. **Penutupan dan aset:** [[07-finance/financial-closing|Financial Closing]] → [[07-finance/financial-reporting|Financial Reporting]] → [[08-assets/depreciation-management|Depreciation]] → [[08-assets/asset-impairment|Impairment]]
4. **Proyek dan pendapatan:** [[09-project/project-billing-and-revenue|Project Billing]] → [[09-project/project-completion-and-closing|Project Closing]]
5. **HR dan payroll:** [[10-hr/payroll-fundamentals|Payroll Fundamentals]] → [[10-hr/payroll-earnings-and-deductions|Earnings and Deductions]] → [[10-hr/payroll-tax-and-statutory-compliance|Payroll Tax and Statutory Compliance]] → [[10-hr/leave-management|Leave Management]] → [[10-hr/overtime-and-time-management|Overtime]]
6. **Pajak:** [[11-tax/vat-fundamentals|VAT Fundamentals]] → [[11-tax/input-vat-and-output-vat|Input and Output VAT]] → [[11-tax/withholding-tax-management|Withholding Tax]] → [[11-tax/pph-21-and-22|PPh 21 and 22]] → [[11-tax/tax-closing-and-period-end|Tax Closing]] → [[11-tax/corporate-income-tax-calculation|Corporate Income Tax]]

**Checkpoint 3.** Tutup satu bulan: rekonsiliasi subledger, jurnal penyesuaian, laporan laba rugi, dan jelaskan setiap selisih. Sertakan satu jurnal payroll dan satu jurnal PPN. Cocokkan dengan [[00-orientation/section-exercises|Section Exercises 06]]–[[00-orientation/section-exercises|11]].

## Expert (50+ jam)

**Tujuan:** mampu merancang solusi ERP dan mempertahankannya.

1. **Integrasi:** [[00-fundamentals/cross-module-integration|Cross-Module Integration]] dan [[01-business-processes/record-to-report|Record to Report]]
2. **Multi-entitas dan konsolidasi:** [[08-assets/fixed-assets-integration|Fixed Assets Integration]]
3. **Implementasi:** [[00-fundamentals/documents-transactions-events|Documents, Transactions, Events]]
4. **Software:** [[20-software/odoo/index|Odoo]] · [[20-software/erpnext/index|ERPNext]] · [[20-software/dynamics365/index|Dynamics 365]] · [[20-software/sap-s4hana/index|SAP S/4HANA]]
5. **Desain:** [[30-naventra/index|Naventra]] — statusnya **baseline desain**, bukan implementasi teruji
6. **Ujian akhir:** [[00-orientation/capstone|Capstone Case]] + [[00-orientation/capstone-answer-key|Capstone Answer Key]]

**Checkpoint 4.** Rancang solusi untuk satu kasus perusahaan: modul, master data, titik posting, kontrol, dan rencana cutover. Pertahankan di depan reviewer. Cocokkan dengan [[00-orientation/section-exercises|Section Exercises 12]] dan [[00-orientation/section-exercises|13]].

## Cara Memakai Latihan

| Kebutuhan | Gunakan |
|---|---|
| Cek pemahaman setelah satu section | [[00-orientation/section-exercises|Section Exercises]] (10 soal/section) |
| Cek campuran lintas topik | [[00-orientation/exercises|Exercises]] (40 soal) |
| Ujian akhir terstruktur | [[00-orientation/capstone|Capstone]] |
| Cek jawaban | [[00-orientation/section-exercise-answer-key|Section Answer Key]], [[00-orientation/exercise-answer-key|Exercise Answer Key]], [[00-orientation/capstone-answer-key|Capstone Answer Key]] |

## Aturan Checkpoint

- Kerjakan tanpa membuka artikel; baru buka untuk memeriksa.
- Tulis jawaban, bukan hanya membacanya.
- Jika satu langkah gagal, ulangi dua artikel sebelumnya sebelum lanjut.
- Untuk soal hitungan, tulis rumus dan asumsi, bukan hanya angka akhir.

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
2. **IFRS Foundation** — *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/ — diakses 26 November 2026.
3. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
4. **ERPNext Documentation** — *Accounts*. https://docs.frappe.io/erpnext/accounts — diakses 26 November 2026.
5. **Odoo 20.0 Documentation** — *Accounting and invoicing*. https://www.odoo.com/documentation/20.0/applications/finance/accounting.html — diakses 26 November 2026.
