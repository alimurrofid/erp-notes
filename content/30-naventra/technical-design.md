---
title: Naventra Technical Design
---

# Naventra Technical Design

## Definition

Rancangan teknis Naventra: model data, mesin posting, penomoran, penguncian periode, dan audit. Diturunkan dari [[30-naventra/functional-design|Functional Design]] dan memenuhi requirement `NAV-R` terkait.

Dokumen ini tidak memilih teknologi vendor tertentu; istilah tabel dipakai sebagai model logis.

## Data Model

| Tabel | Kolom kunci | Keterangan |
|---|---|---|
| `ledgers` | `id`, `entity_id`, `currency` | Satu ledger per entitas |
| `accounts` | `id`, `code`, `type`, `is_leaf` | Posting hanya ke `is_leaf = true` |
| `journals` | `id`, `date`, `source_type`, `source_id`, `status` | Satu jurnal per peristiwa |
| `journal_lines` | `journal_id`, `account_id`, `debit`, `credit`, `dimension` | Debit dan kredit dalam satu baris |
| `stock_moves` | `id`, `item_id`, `from_loc`, `to_loc`, `qty`, `value` | Reservasi sebagai status |
| `production_orders` | `id`, `bom_id`, `qty`, `status` | Konsumsi dan output terpisah |
| `project_costs` | `id`, `project_id`, `wbs_id`, `amount`, `recognized_at` | Waktu pengakuan HPP |
| `audit_log` | `id`, `table`, `record_id`, `before`, `after`, `user_id`, `at` | Jejak perubahan |
| `sales_orders` | `id`, `customer_id`, `document_date`, `due_date`, `status`, `currency` | Header order; status FSM kanonik |
| `sales_order_lines` | `id`, `order_id`, `item_id`, `ordered_qty`, `shipped_qty`, `invoiced_qty`, `returned_qty`, `price_snapshot` | Kuantitas pemenuhan per baris |
| `credit_profiles` | `customer_id`, `limit`, `terms`, `hold_status` | Limit dan status kredit |
| `price_rules` | `id`, `scope_type`, `scope_id`, `valid_from`, `valid_to`, `priority` | Presedensi harga/diskon |
| `revenue_schedules` | `id`, `contract_id`, `obligation_id`, `period`, `amount`, `method` | Jadwal pengakuan pendapatan |
| `period_locks` | `entity_id`, `period`, `status`, `approved_by` | Kontrol tutup buku |
| `outbox_events` | `id`, `event_type`, `payload`, `published_at` | Publikasi event setelah commit |

Relasi wajib: `journal_lines.journal_id → journals.id`, `journals.source_id` menunjuk dokumen sumber (PO, invoice, MO, BAST), dan `sales_order_lines.order_id → sales_orders.id`.

Tabel transaksi menyimpan snapshot nilai master (harga, alamat, NPWP, tarif pajak) agar dokumen historis tidak berubah ketika master diperbarui.

## Posting Engine

Alur satu posting:

1. Terima peristiwa (`source_type`, `source_id`).
2. Validasi idempotency: apakah jurnal untuk sumber ini sudah ada?
3. Susun baris debit/kredit dari aturan posting fungsional.
4. Validasi: debit = kredit, akun daun, periode terbuka, dimensi wajib terisi.
5. Tulis jurnal + baris dalam satu transaksi.
6. Perbarui saldo dan audit log.

Kegagalan di langkah mana pun membatalkan seluruh transaksi. Tidak ada posting parsial.

## Idempotency (NAV-R-12)

Kunci unik: `(source_type, source_id, purpose)`. Contoh: `('vendor_bill', 991, 'post')`.

- Posting ulang dengan kunci sama ditolak, bukan diduplikasi.
- Pembalikan memakai `purpose = 'reverse'` sehingga tidak bertabrakan dengan posting awal.
- Job yang gagal di tengah harus aman dijalankan ulang.

## Penomoran (NAV-R-10)

Format: `JENIS-TAHUN-BULAN-URUT`, contoh `PO-2026-09-0081`.

- Urutan dihasilkan per entitas dan per jenis dokumen.
- Nomor tidak pernah dipakai ulang, termasuk untuk dokumen yang dibatalkan.
- `MO-2026-0042` adalah pengecualian: itu ID cost sheet, bukan nomor dokumen.

## Periode dan Kurs

- `period_locks` menyimpan entitas, periode, status, dan otorisator.
- Posting ke periode terkunci ditolak di mesin posting, bukan hanya di UI.
- Kurs pajak dan kurs akuntansi disimpan terpisah; nilai kurs yang dipakai dibekukan pada baris transaksi agar tidak berubah saat tabel kurs diperbarui.

## Integrasi

- Event ditulis ke `outbox_events` dalam transaksi yang sama dengan dokumen sumber, lalu dikirim setelah commit.
- Kontrak event, API, idempotency, dan error ada di [[30-naventra/integration-and-api|Integration and API]].
- Peran, SoD, dan audit akses ada di [[30-naventra/security-and-roles|Security and Roles]].

## Audit dan Rekonsiliasi

- Setiap perubahan status dokumen menulis `audit_log`.
- Rekonsiliasi subledger ke GL dijalankan per periode: total per akun kontrol harus sama.
- Selisih harus dijelaskan sebelum periode dikunci.

## Kebutuhan Non-Fungsional

| Aspek | Target |
|---|---|
| Atomisitas | Satu peristiwa = satu transaksi basis data |
| Keterlacakan | Semua posting dapat ditelusuri ke dokumen sumber |
| Kinerja | Posting massal (payroll, depresiasi) dapat diulang tanpa duplikasi |
| Keamanan | Hak posting terpisah dari hak menyetujui |

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
2. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
3. **ERPNext Documentation** — *Accounts*. https://docs.frappe.io/erpnext/accounts — diakses 26 November 2026.
