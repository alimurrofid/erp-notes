---
title: Naventra Design — processes
---

# Naventra Design — processes

## Definition

Keputusan desain Naventra untuk proses end-to-end dan kontrak dokumen: O2C, P2P, R2R, inventory, manufacturing, document lifecycle, dan exception path. Keputusan di sini mengikat modul, bukan menggantikan desain modul.

## NAV-D-165 — Kontrak Proses O2C

Sumber: [[02-business-processes/order-to-cash|Order to Cash]]

- Trigger: PO pelanggan atau quotation `WON`.
- Validasi wajib: kredit, ATP, harga/pajak, dan kelengkapan alamat.
- Exception: `ON_HOLD`, backorder, pembatalan sebelum kirim, retur setelah kirim.
- Next process: penerimaan kas dan aplikasi pembayaran.
- Setiap tahap menghasilkan event dengan `sales_order_id` sebagai kunci rangkaian.

## NAV-D-166 — Kontrak Proses P2P

Sumber: [[02-business-processes/procure-to-pay|Procure to Pay]]

- Trigger: requisition, reorder point, atau kontrak payung.
- Validasi: anggaran, kelayakan pemasok, harga/termin, dan 3-way match.
- Exception: short-close, retur/debit note, selisih harga, invoice duplikat.
- Next process: payment run dan kliring GR/IR.
- PO, GR, dan bill berbagi `purchase_order_id` dan `vendor_id` yang sama.

## NAV-D-167 — Kontrak Proses R2R

Sumber: [[02-business-processes/record-to-report|Record to Report]]

- Trigger: kalender tutup buku atau pelaporan interim.
- Validasi: rekonsiliasi subledger–GL, bank, akrual, PPN/PPh, dan akun suspense.
- Exception: dokumen belum posting, selisih bank, kesalahan periode lalu.
- Next process: laporan keuangan, konsolidasi, audit.
- R2R tidak boleh “menutup” selisih dengan jurnal penyeimbang tanpa penjelasan.

## NAV-D-168 — Kontrak Proses Inventory

Sumber: [[02-business-processes/inventory-process|Inventory Process]]

- Trigger: receipt, transfer, issue, adjustment, atau scrap.
- Validasi: lokasi, UOM, lot/serial, kebijakan stok negatif, otorisasi.
- Exception: selisih opname, barang rusak/kedaluwarsa, kehilangan transit.
- Next process: valuasi/COGS dan replenishment.
- Setiap mutasi menghasilkan `stock_ledger_entry` dan, jika bernilai, jurnal.

## NAV-D-169 — Kontrak Proses Manufacturing

Sumber: [[02-business-processes/manufacturing-process|Manufacturing Process]]

- Trigger: planned order MPS/MRP atau MO manual.
- Validasi: BOM/routing, ketersediaan bahan, kapasitas, otorisasi rilis.
- Exception: bahan kurang, rework/scrap, pembatalan setelah bahan keluar.
- Next process: penerimaan barang jadi, settlement varians, COGS.
- MO yang sudah mengonsumsi bahan tidak boleh `CANCELLED` tanpa jurnal scrap WIP.

## NAV-D-170 — Document Lifecycle Kanonik

Sumber: [[02-business-processes/document-lifecycle|Document Lifecycle]]

- Status kanonik: `DRAFT → SUBMITTED → APPROVED → POSTED → PARTIALLY_FULFILLED → FULFILLED → CLOSED`, plus `CANCELLED/REVERSED`.
- Efek akuntansi melekat pada peristiwa posted, bukan pada label status.
- Dokumen posted bersifat immutable; koreksi memakai dokumen baru.
- Nomor dokumen tidak dipakai ulang; dokumen batal tetap menyimpan nomor.
- Setiap transisi menulis audit log: dari status apa, ke status apa, oleh siapa, dan alasannya.

## NAV-D-171 — Exception Path Kanonik

Sumber: [[02-business-processes/exception-path|Exception Path]]

- Setiap pengecualian diklasifikasikan: cancel, short-close, return, reversal, correction, atau write-off.
- Jalur ditentukan oleh apakah efek fisik/finansial sudah terjadi.
- Retur dan pembatalan menyesuaikan PPN, bukan hanya jurnal komersial.
- Koreksi periode lalu yang material memakai restatement; yang tidak material di periode berjalan.
- Satu dokumen asal hanya boleh memiliki satu dokumen koreksi untuk kesalahan yang sama.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-165 | `02-business-processes/order-to-cash.md` | Adopted |
| NAV-D-166 | `02-business-processes/procure-to-pay.md` | Adopted |
| NAV-D-167 | `02-business-processes/record-to-report.md` | Adopted |
| NAV-D-168 | `02-business-processes/inventory-process.md` | Adopted |
| NAV-D-169 | `02-business-processes/manufacturing-process.md` | Adopted |
| NAV-D-170 | `02-business-processes/document-lifecycle.md` | Adopted |
| NAV-D-171 | `02-business-processes/exception-path.md` | Adopted |

## References

1. **COSO** — *Internal Control — Integrated Framework* (2013). https://www.coso.org/guidance-on-ic — diakses 26 November 2026.
2. **IFRS Foundation** — *IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors*. https://www.ifrs.org/issued-standards/list-of-standards/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors/ — diakses 26 November 2026.
3. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
