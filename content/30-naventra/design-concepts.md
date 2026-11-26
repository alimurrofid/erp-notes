---
title: Naventra Design Concepts
---

# Naventra Design Concepts

## Definition

Kumpulan keputusan desain Naventra yang diekstrak dari blok "Naventra Consideration" di artikel konsep. Setiap keputusan punya ID `NAV-D-xxx` dan menunjuk artikel sumbernya.

Artikel konsep kini hanya menyimpan satu baris rujukan ke halaman ini.

## NAV-D-001 — Posting Engine Terpusat

Sumber: [[00-fundamentals/erp-fundamentals|ERP Fundamentals]]

- Modul tidak boleh berupa aplikasi terisolasi dengan sinkronisasi batch.
- Transaksi operasional (goods receipt, stock issue) memicu jurnal melalui posting engine terpusat.
- Integritas referensial antara dokumen operasional dan dokumen keuangan wajib dipertahankan.

## NAV-D-002 — Pemisahan State Dokumen

Sumber: [[00-fundamentals/erp-architecture|ERP Architecture]]

- `Draft`: dapat diedit; tidak memengaruhi stok maupun akuntansi.
- `Confirmed/Approved`: komitmen operasional terbentuk; belum ada jurnal.
- `Posted/Completed`: immutable; mutasi stok dan GL terbentuk.
- `Cancelled/Reversed`: memakai dokumen pembalik, bukan hard delete.
- Logika bisnis dipisahkan dari aturan jurnal melalui posting engine yang dapat dikonfigurasi.

## NAV-D-003 — Modular Monolith

Sumber: [[00-fundamentals/erp-modules|ERP Modules]]

- Tidak memakai database-per-service; transaksi atomik dan pelaporan keuangan membutuhkan satu skema.
- Kode diisolasi per domain, database dibagi bersama.
- Hook/event subscriber terpusat (mis. `on_delivery_confirmed`, `on_invoice_posted`) agar modul tidak saling mengunci.

## NAV-D-004 — Header/Lines dan Snapshot

Sumber: [[00-fundamentals/master-data-vs-transaction-data|Master Data vs Transaction Data]]

- Tabel transaksi memisahkan header (nomor, tanggal, pihak) dan lines (item, kuantitas, harga, akun).
- Baris berstatus `Posted` tidak boleh diubah.
- Nilai master (harga, alamat) disalin sebagai snapshot saat transaksi dibuat agar dokumen historis tidak berubah.

## NAV-D-005 — Posting Atomik dan Toleransi 3-Way Match

Sumber: [[00-fundamentals/cross-module-integration|Cross-Module Integration]]

- Penerimaan/penyerahan barang memicu posting service dalam transaksi database yang sama (ACID).
- Akun kliring GR/IR direkonsiliasi otomatis; selisih harga pembelian (PPV) terdeteksi.
- Toleransi 3-way match dapat dikonfigurasi (mis. 1% atau Rp10.000); deviasi besar masuk approval matrix.

## NAV-D-006 — Referensi Dokumen dan Timeline

Sumber: [[00-fundamentals/documents-transactions-events|Documents, Transactions, Events]]

- Setiap tabel dokumen memiliki `source_document_type` dan `source_document_id`.
- Invoice tanpa dasar SO atau penerimaan/pengiriman ditolak, kecuali faktur non-operasional dengan otorisasi.
- UI menyediakan Document Timeline / Flow Tree untuk menelusuri dokumen hulu-hilir.

## NAV-D-007 — Hierarki Entitas dan Dimensi Analitik

Sumber: [[00-fundamentals/organizational-structure|Organizational Structure]]

- Hierarki company/branch memakai nested set atau adjacency list untuk konsolidasi bertingkat.
- Setiap baris transaksi wajib merujuk `company_id` dan `branch_id`.
- Dimensi analitik dipisah dari COA sehingga laporan dapat difilter per cabang/divisi/proyek tanpa mengubah bagan akun.

## NAV-D-008 — Pipeline P2P Atomik

Sumber: [[04-purchasing/procure-to-pay-integration|Procure to Pay Integration]]

- Satu posting goods receipt memutasi stok, jurnal akrual, dan `received_qty` PO dalam satu transaksi.
- Document flow tracker menampilkan PR → PO → GR → Bill → Debit Note → Payment dengan drill-down.
- Audit append-only; koreksi memakai dokumen formal (RTV, debit note, amendment).
- Alokasi pembayaran memakai idempotency key untuk mencegah double payment.

## NAV-D-009 — Agreement dan Release Order

Sumber: [[04-purchasing/procurement-contract-and-agreement|Procurement Contract and Agreement]]

- Header `procurement_agreements` dan baris `procurement_agreement_lines` menyimpan komitmen kuantitas dan harga.
- Baris PO menyimpan `agreement_line_id`; approval memutasi `released_qty` secara atomik.
- Over-fulfillment ditolak bila `max_enforced` aktif.
- Dashboard burn-down menunjukkan serapan kontrak.

## NAV-D-010 — State Machine dan Versioning PO

Sumber: [[04-purchasing/purchase-cancellation-and-amendment|Purchase Cancellation and Amendment]]

- FSM: DRAFT → SUBMITTED → APPROVED → SENT → PARTIAL → FULFILLED → CLOSED → CANCELLED.
- Pembatalan hanya bila `received_qty = 0` dan `billed_qty = 0`.
- Revisi setelah APPROVED menaikkan `revision_number` dan membekukan versi lama.
- Short close menghitung `cancelled_qty` dan menutup `open_qty`.
- Alasan pembatalan/revisi wajib berupa kode terstruktur.

## NAV-D-011 — Read Model untuk Analitik P2P

Sumber: [[04-purchasing/purchasing-reporting-and-analytics|Purchasing Reporting and Analytics]]

- Dashboard membaca materialized view yang diperbarui asinkron, bukan tabel transaksi.
- Metrik dihitung saat event: `delivery_variance_days`, `is_touchless`.
- Widget actionable alerts dan spend breakdown tersedia bawaan.
- Ekspor menyertakan nomor dokumen relasional lengkap.

## Traceability

| ID | Sumber | Requirement terkait | Status |
|---|---|---|---|
| NAV-D-001 | `00-fundamentals/erp-fundamentals.md` | NAV-R-02, NAV-R-03 | Adopted |
| NAV-D-002 | `00-fundamentals/erp-architecture.md` | NAV-R-10, NAV-R-12 | Adopted |
| NAV-D-003 | `00-fundamentals/erp-modules.md` | NAV-R-03 | Adopted |
| NAV-D-004 | `00-fundamentals/master-data-vs-transaction-data.md` | NAV-R-10, NAV-R-12 | Adopted |
| NAV-D-005 | `00-fundamentals/cross-module-integration.md` | NAV-R-03, NAV-R-07 | Adopted |
| NAV-D-006 | `00-fundamentals/documents-transactions-events.md` | NAV-R-10 | Adopted |
| NAV-D-007 | `00-fundamentals/organizational-structure.md` | NAV-R-12 | Adopted |
| NAV-D-008 | `04-purchasing/procure-to-pay-integration.md` | NAV-R-03, NAV-R-07, NAV-R-12 | Adopted |
| NAV-D-009 | `04-purchasing/procurement-contract-and-agreement.md` | NAV-R-07, NAV-R-10 | Adopted |
| NAV-D-010 | `04-purchasing/purchase-cancellation-and-amendment.md` | NAV-R-10, NAV-R-12 | Adopted |
| NAV-D-011 | `04-purchasing/purchasing-reporting-and-analytics.md` | NAV-R-12 | Adopted |

## References

1. **Klaus, H., Rosemann, M., & Gable, G. G.** (2000). *What is ERP?* Information Systems Frontiers, 2(2), 141–162. https://doi.org/10.1023/A:1026543906354 — diakses 26 November 2026.
2. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
3. **Frappe Framework Documentation** — *Controllers*. https://docs.frappe.io/framework/user/en/basics/doctypes/controllers — diakses 26 November 2026.
4. **Odoo 20.0 Documentation** — *Accounting and invoicing: getting started*. https://www.odoo.com/documentation/20.0/applications/finance/accounting/get_started.html — diakses 26 November 2026.
