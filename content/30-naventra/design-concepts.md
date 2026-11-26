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

## Traceability

| ID | Sumber | Requirement terkait | Status |
|---|---|---|---|
| NAV-D-001 | `00-fundamentals/erp-fundamentals.md` | NAV-R-02, NAV-R-03 | Adopted |
| NAV-D-002 | `00-fundamentals/erp-architecture.md` | NAV-R-10, NAV-R-12 | Adopted |
| NAV-D-003 | `00-fundamentals/erp-modules.md` | NAV-R-03 | Adopted |
| NAV-D-004 | `00-fundamentals/master-data-vs-transaction-data.md` | NAV-R-10, NAV-R-12 | Adopted |

## References

1. **Klaus, H., Rosemann, M., & Gable, G. G.** (2000). *What is ERP?* Information Systems Frontiers, 2(2), 141–162. https://doi.org/10.1023/A:1026543906354 — diakses 26 November 2026.
2. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
3. **Frappe Framework Documentation** — *Controllers*. https://docs.frappe.io/framework/user/en/basics/doctypes/controllers — diakses 26 November 2026.
4. **Odoo 20.0 Documentation** — *Accounting and invoicing: getting started*. https://www.odoo.com/documentation/20.0/applications/finance/accounting/get_started.html — diakses 26 November 2026.
