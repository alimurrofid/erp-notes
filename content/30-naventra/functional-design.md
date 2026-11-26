---
title: Naventra Functional Design
---

# Naventra Functional Design

## Definition

Rancangan fungsional Naventra: modul, objek inti, mesin status, dan aturan posting. Diturunkan dari [[30-naventra/requirements|Naventra Requirements]]; setiap aturan menyebut requirement yang dipenuhi.

## Module Map

| Modul | Objek inti | Requirement |
|---|---|---|
| Accounting | Ledger, journal, account | NAV-R-01, R-02, R-03, R-12 |
| Tax | Tax code, tax rate, effective date | NAV-R-04 |
| Purchasing | PR, PO, receipt, bill, payment | NAV-R-07, R-10 |
| Sales | Quotation, order, delivery, invoice, payment, return | NAV-R-13, R-14, R-15, R-16, R-17 |
| Inventory | Item, location, stock move, valuation | NAV-R-08 |
| Manufacturing | BOM, routing, MO, consumption, output | NAV-R-09 |
| Assets | Asset, depreciation schedule, disposal | NAV-R-06 |
| Project | Project, WBS, timesheet, milestone | NAV-R-05 |
| Control | Audit log, approval, period lock | NAV-R-11, R-12, R-18 |

## Core Objects

**Journal** — header: tanggal, entitas, sumber, status. Baris: akun, debit, kredit, dimensi. Aturan: total debit = total kredit; akun harus akun daun; periode tidak terkunci.

**Stock Move** — item, lokasi asal/tujuan, kuantitas, nilai, dokumen sumber. Reservasi adalah status pada move, bukan jurnal.

**Production Order** — BOM, kuantitas, routing, status. Konsumsi menghasilkan jurnal WIP; output memindahkan WIP ke barang jadi.

**Project Cost** — biaya terkumpul per WBS; reklasifikasi ke HPP mengikuti BAST, bukan tanggal invoice.

**Sales Order** — header: pelanggan, tanggal dokumen, termin, gudang, status; baris: item, kuantitas, harga, diskon, pajak. Kuantitas pemenuhan (`ordered`, `reserved`, `picked`, `shipped`, `invoiced`, `returned`) dipelihara per baris.

**Credit Profile** — limit, termin, exposure, status hold, dan riwayat pelepasan. Pemeriksaan kredit dijalankan sebelum konfirmasi dan sebelum pengiriman.

**Price Rule** — cakupan (pelanggan/grup/item/kuantitas), tipe harga/diskon, `valid_from`, `valid_to`, dan prioritas. Aturan pertama yang cocok menang; konflik dilaporkan.

**Revenue Schedule** — performance obligation, metode (point-in-time/over-time), periode, dan nilai yang diakui. Contract asset/liability dihitung dari selisih pendapatan kumulatif vs tagihan kumulatif.

## State Machines

**Sales Order:** Draft → Confirmed → InFulfillment → PartiallyDelivered → Delivered → Invoiced → Closed, dengan OnHold dan Cancelled sebagai cabang. Pembatalan hanya sebelum barang keluar; setelah Delivered gunakan retur. Backorder menyimpan `open_qty`; short-close mencatat `cancelled_qty` dan alasan.

**Purchase Order:** Draft → UnderApproval → Approved → Issued → Acknowledged → PartiallyReceived → FullyReceived → Invoiced → Closed, dengan ClosedShort dan Cancelled sebagai cabang. Perubahan setelah Approved memerlukan versi baru.

**Manufacturing Order:** Draft → Planned → Scheduled → Released → InProgress → Completed → Closed, dengan OnHold dan Scrapped sebagai cabang. Scrap dicatat sebagai output terpisah, bukan pengurangan diam-diam; MO yang sudah mengonsumsi bahan tidak boleh sekadar Cancelled.

**Project:** Draft → Approved → Planned → InProgress → Completed → Closed, dengan Lost, Cancelled, Terminated, dan OnHold sebagai cabang. Closing mensyaratkan WIP nol, tagihan selesai, dan komitmen tertutup.

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
| Delivery/goods issue | COGS | Inventory | NAV-R-13 |
| Invoice penjualan | AR + PPN Keluaran | Revenue | NAV-R-13, R-16 |
| Retur penjualan | Inventory + PPN Keluaran | COGS/AR | NAV-R-17 |
| Pengakuan pendapatan over-time | Contract asset/liability | Revenue | NAV-R-16 |
| Komisi dikapitalisasi | Contract acquisition cost | Commissions payable | NAV-R-16 |

## Controls

- **Period lock**: posting ke periode tertutup ditolak; pembukaan kembali memerlukan otorisasi dan tercatat.
- **Idempotency**: satu dokumen sumber hanya boleh menghasilkan satu set jurnal; pengulangan posting ditolak.
- **Audit trail**: setiap perubahan status dan nilai menyimpan user, waktu, dan nilai lama.
- **Credit check**: konfirmasi order dan pengiriman diblokir jika exposure melewati limit dan tidak ada pelepasan terotorisasi.
- **Effective dating**: harga, diskon, pajak, dan ambang persetujuan memakai `valid_from`/`valid_to`; dokumen menyimpan snapshot.
- **Revenue schedule**: pendapatan over-time tidak boleh diposting hanya karena invoice terbit; jadwal harus ada.

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
