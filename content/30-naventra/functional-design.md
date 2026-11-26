---
title: Naventra Functional Design
---

# Naventra Functional Design

## Definition

Rancangan fungsional Naventra: modul, objek inti, mesin status, dan aturan posting. Diturunkan dari [[30-naventra/requirements|Naventra Requirements]]; setiap aturan menyebut requirement yang dipenuhi.

## Module Map

| Modul | Objek inti | Requirement |
|---|---|---|
| Accounting | Ledger, journal, account | NAV-R-01, R-02, R-03 |
| Tax | Tax code, tax rate, effective date | NAV-R-04 |
| Purchasing | PR, PO, receipt, bill, payment | NAV-R-07, R-10 |
| Sales | Quotation, order, delivery, invoice, payment | NAV-R-05, R-10 |
| Inventory | Item, location, stock move, valuation | NAV-R-08 |
| Manufacturing | BOM, routing, MO, consumption, output | NAV-R-09 |
| Assets | Asset, depreciation schedule, disposal | NAV-R-06 |
| Project | Project, WBS, timesheet, milestone | NAV-R-05 |
| Control | Audit log, approval, period lock | NAV-R-11, R-12 |

## Core Objects

**Journal** — header: tanggal, entitas, sumber, status. Baris: akun, debit, kredit, dimensi. Aturan: total debit = total kredit; akun harus akun daun; periode tidak terkunci.

**Stock Move** — item, lokasi asal/tujuan, kuantitas, nilai, dokumen sumber. Reservasi adalah status pada move, bukan jurnal.

**Production Order** — BOM, kuantitas, routing, status. Konsumsi menghasilkan jurnal WIP; output memindahkan WIP ke barang jadi.

**Project Cost** — biaya terkumpul per WBS; reklasifikasi ke HPP mengikuti BAST, bukan tanggal invoice.

## State Machines

**Sales Order:** Draft → Confirmed → Partially Delivered → Delivered → Invoiced → Closed. Pembatalan hanya dari Draft/Confirmed; setelah Delivered gunakan retur.

**Purchase Order:** Draft → Approved → Partially Received → Received → Billed → Closed. Perubahan setelah Approved memerlukan versi baru.

**Manufacturing Order:** Planned → Released → In Progress → Done → Closed. Scrap dicatat sebagai output terpisah, bukan pengurangan diam-diam.

**Project:** Planned → Active → Delivered (BAST) → Closed. Closing mensyaratkan WIP nol dan komitmen tertutup.

## Posting Rules

| Peristiwa | Debit | Kredit | Requirement |
|---|---|---|---|
| Goods receipt | Inventory | GR/IR | NAV-R-07 |
| Vendor bill | GR/IR + PPN Masukan | AP | NAV-R-07 |
| BAST proyek | AR + PPN Keluaran | Revenue | NAV-R-05 |
| Akrual HPP proyek | COGS | WIP | NAV-R-05 |
| Konsumsi produksi | WIP | Inventory | NAV-R-09 |
| Output produksi | Finished Goods | WIP | NAV-R-09 |
| Penyusutan bulanan | Depreciation expense | Accumulated depreciation | NAV-R-06 |

## Controls

- **Period lock**: posting ke periode tertutup ditolak; pembukaan kembali memerlukan otorisasi dan tercatat.
- **Idempotency**: satu dokumen sumber hanya boleh menghasilkan satu set jurnal; pengulangan posting ditolak.
- **Audit trail**: setiap perubahan status dan nilai menyimpan user, waktu, dan nilai lama.

## Open Questions

1. Apakah Naventra mendukung multi-entitas dalam satu database atau satu database per entitas?
2. Apakah valuasi persediaan mendukung standard cost sejak versi pertama?
3. Bagaimana mekanisme migrasi saldo awal tanpa membuka periode lalu?

Pertanyaan ini belum dijawab konsep; jangan diisi dengan asumsi.

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
2. **IFRS Foundation** — *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/ — diakses 26 November 2026.
3. **IFRS Foundation** — *IAS 16 Property, Plant and Equipment*. https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/ — diakses 26 November 2026.
4. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
