---
title: Naventra Design — sales
---

# Naventra Design — sales

## Definition

Keputusan desain Naventra untuk domain Sales (O2C): dokumen, state machine, kredit, harga, pemenuhan, faktur, pendapatan, retur, dan komisi. Setiap keputusan punya ID `NAV-D` dan menunjuk artikel sumber.

## NAV-D-131 — Sales Fundamentals: Pemisahan Dokumen, Pendapatan, dan Kas

Sumber: [[04-sales/sales-fundamentals|Sales Fundamentals]]

- Naventra memisahkan empat peristiwa: order (komitmen), delivery (mutasi stok), invoice (klaim), dan payment (kas). Tidak ada satu status yang boleh mewakili keempatnya.
- Posting pendapatan dipicu oleh pemenuhan kewajiban pelaksanaan, bukan oleh penerbitan invoice.
- Setiap dokumen menyimpan `source_document_type` dan `source_document_id` agar rantai O2C dapat ditelusuri.
- Laporan penjualan wajib membedakan *booked*, *shipped*, *invoiced*, dan *collected*.

## NAV-D-132 — Quotation Lifecycle dan Otorisasi Diskon

Sumber: [[04-sales/sales-quotation|Sales Quotation]]

- FSM: `DRAFT → UNDER_APPROVAL → SENT → WON/LOST/EXPIRED`; konversi ke Sales Order hanya dari `WON`.
- Diskon dan termin melewati ambang wajib masuk `UNDER_APPROVAL`; ambang disimpan sebagai data bertanggal, bukan di kode.
- Penawaran menyimpan `valid_until`; konversi setelah tanggal itu ditolak dan harus membuat revisi.
- `LOST` wajib menyimpan `lost_reason_code` untuk analitik.
- Nilai harga dan pajak disalin sebagai snapshot saat `SENT`.

## NAV-D-133 — Sales Order: Header/Lines, Snapshot, dan State Machine

Sumber: [[04-sales/sales-order|Sales Order]]

- Header: nomor, pelanggan, tanggal dokumen, termin, mata uang, gudang, status. Lines: item, kuantitas, harga, diskon, pajak, tanggal kirim.
- FSM: `DRAFT → CONFIRMED → IN_FULFILLMENT → PARTIALLY_DELIVERED → DELIVERED → INVOICED → CLOSED`, dengan `ON_HOLD` dan `CANCELLED` sebagai cabang.
- Pembatalan hanya sebelum barang keluar; setelah `DELIVERED` gunakan retur.
- `CONFIRMED` membentuk reservasi stok, bukan jurnal.
- Perubahan setelah `CONFIRMED` memerlukan versi baru dan alasan terstruktur.

## NAV-D-134 — Customer Master dan Snapshot

Sumber: [[04-sales/customer-and-sales-master-data|Customer and Sales Master Data]]

- Customer master memisahkan identitas legal, alamat kirim, alamat tagih, kontak, termin, mata uang, dan profil pajak.
- Satu pelanggan memiliki satu `customer_id`; duplikasi dicegah dengan validasi NPWP/NIK dan nama ternormalisasi.
- Perubahan limit kredit dan termin dicatat dengan `effective_from`.
- Dokumen transaksi menyimpan snapshot nama, alamat, NPWP, dan termin agar dokumen historis tidak berubah ketika master diperbarui.

## NAV-D-135 — Credit Exposure dan Credit Hold

Sumber: [[04-sales/customer-credit-management|Customer Credit Management]]

- Paparan kredit dihitung dari faktur terbuka + pesanan terkonfirmasi yang belum ditagih − pembayaran belum dialokasikan.
- Pemeriksaan kredit dijalankan atomik sebelum `CONFIRMED` dan sebelum `DELIVERY` dicetak; hasilnya disimpan sebagai `credit_check_result`.
- Pelanggaran menghasilkan `CREDIT_HOLD`, bukan pembatalan otomatis; pelepasan memerlukan otorisasi dan alasan.
- Pencadangan ECL (IFRS 9) adalah jurnal akuntansi terpisah dan tidak boleh dipakai sebagai pengganti kontrol kredit operasional.

## NAV-D-136 — Pricing Pipeline dan Precedence

Sumber: [[04-sales/pricing-and-discount|Pricing and Discount]]

- Urutan penentuan harga: harga kontrak → price list pelanggan → price list umum → harga dasar; aturan pertama yang cocok menang.
- Setiap aturan memiliki `valid_from`, `valid_to`, mata uang, dan cakupan (pelanggan, grup, item, kuantitas).
- Diskon bertingkat dihitung berurutan dan disimpan per baris (`discount_type`, `discount_value`, `discount_sequence`).
- Perubahan harga tidak mengubah dokumen historis; snapshot harga disimpan pada baris order.
- Konflik aturan dilaporkan sebagai exception, bukan diselesaikan diam-diam.

## NAV-D-137 — Enam Kuantitas Pemenuhan dan ATP

Sumber: [[04-sales/order-fulfillment|Order Fulfillment]]

- Setiap baris memelihara `ordered_qty`, `reserved_qty`, `picked_qty`, `shipped_qty`, `invoiced_qty`, dan `returned_qty`.
- Kuantitas tersedia dihitung dari on-hand usable − komitmen; on-order hanya masuk proyeksi ATP, bukan stok tersedia.
- Reservasi mengunci kuantitas, bukan nilai atau kepemilikan.
- Shortage memicu backorder atau short-close sesuai kebijakan pelanggan, bukan pemotongan diam-diam.

## NAV-D-138 — Partial Fulfillment dan Backorder

Sumber: [[04-sales/backorder-and-partial-fulfillment|Backorder and Partial Fulfillment]]

- Pengiriman parsial menutup kuantitas yang dikirim dan menyisakan `open_qty` pada baris yang sama.
- Backorder mewarisi harga, diskon, dan pajak dari order asli; perubahan harga hanya berlaku untuk sisa jika disepakati.
- Pembatalan sisa backorder mencatat `cancelled_qty` dan alasan; order asli tidak dihapus.
- Status order baru `CLOSED` jika seluruh kuantitas shipped atau sisa dibatalkan secara eksplisit.

## NAV-D-139 — Delivery, Goods Issue, dan POD

Sumber: [[04-sales/delivery-and-shipping|Delivery and Shipping]]

- Delivery Order memuat item, lot/serial, lokasi asal, ekspedisi, dan alamat kirim.
- Goods issue memposting Dr COGS / Cr Persediaan pada saat barang keluar; POD hanya bukti penerimaan, bukan pemicu jurnal kedua.
- Barang dalam perjalanan dicatat pada lokasi transit, bukan langsung mengurangi kepemilikan pelanggan.
- Selisih kuantitas kirim vs order menjadi exception dengan alasan (short, damage, substitution).

## NAV-D-140 — Invoice, AR, dan Open-Item Clearing

Sumber: [[04-sales/accounts-receivable-integration|Accounts Receivable Integration]]

- Invoice penjualan membawa nomor, tanggal dokumen, tanggal posting, termin, DPP, PPN, dan referensi delivery.
- Jatuh tempo dihitung dari **tanggal dokumen** + termin, bukan tanggal posting.
- Posting invoice: Dr AR / Cr Revenue, Cr PPN Keluaran.
- Pembayaran dialokasikan ke invoice tertentu (open-item); kelebihan menjadi kredit pelanggan, bukan pendapatan.
- Invoice tanpa delivery ditolak kecuali faktur non-operasional dengan otorisasi.

## NAV-D-141 — Tax Determination pada Sales

Sumber: [[04-sales/sales-tax|Sales Tax]]

- Pajak ditentukan oleh mesin aturan berbasis pelanggan, item, tempat penyerahan, dan tanggal terutang.
- Tarif disimpan sebagai data bertanggal; dokumen menyimpan snapshot tarif dan DPP.
- Harga inklusif dan eksklusif didukung; pembulatan pajak dilakukan per dokumen sesuai kebijakan yang dikonfigurasi.
- Faktur pajak elektronik memiliki status dan nomor tersendiri; invoice komersial tidak boleh dianggap sebagai faktur pajak.
- Perbedaan DPP/pajak antara invoice dan faktur pajak menjadi exception yang harus diselesaikan sebelum pelaporan.

## NAV-D-142 — Revenue Recognition Schedule

Sumber: [[04-sales/revenue-recognition|Revenue Recognition]]

- Setiap baris kontrak memetakan satu performance obligation dan metode pengakuan: point-in-time atau over-time.
- Untuk over-time, Naventra menyimpan `revenue_schedule` (periode, persentase/kuantitas, nilai) dan memposting jurnal penyesuaian per periode.
- Contract asset dan contract liability dihitung dari selisih pendapatan kumulatif vs tagihan kumulatif.
- Invoice tidak otomatis mengakui pendapatan; pendapatan mengikuti schedule atau bukti pemenuhan.
- Perubahan estimasi progres diterapkan prospektif dan diungkapkan.

## NAV-D-143 — Return, RMA, dan Credit Note

Sumber: [[04-sales/sales-return-and-credit-note|Sales Return and Credit Note]]

- RMA memiliki FSM: `REQUESTED → APPROVED → RECEIVED → INSPECTED → CREDITED/REJECTED`.
- Retur fisik dan penyesuaian finansial adalah dua langkah terpisah: stok masuk karantina lebih dulu, credit note kemudian.
- Barang rusak dihapus ke beban scrap; bukan dikreditkan ke COGS dua kali.
- Credit note mengurangi pendapatan dan PPN sesuai DPP retur; restocking fee diakui sebagai pendapatan lain.
- Retur yang melebihi kuantitas terjual ditolak.

## NAV-D-144 — Amendment, Versioning, dan Audit Trail

Sumber: [[04-sales/sales-cancellation-and-amendment|Sales Cancellation and Amendment]]

- Perubahan diklasifikasikan: koreksi data, amendment komersial, pembatalan, atau retur.
- Dokumen `POSTED` tidak diedit; amendment membuat `revision_number` baru dan membekukan versi lama.
- Setiap perubahan menyimpan nilai sebelum/sesudah, pengguna, waktu, dan alasan.
- Pembatalan setelah pengiriman ditolak; jalurnya retur/credit note.
- Dokumen versi lama tetap dapat dibaca untuk audit.

## NAV-D-145 — Commission Accrual dan Clawback

Sumber: [[04-sales/sales-commission|Sales Commission]]

- Komisi dihitung dari basis yang dikonfigurasi (revenue, margin, atau kas tertagih) dan disimpan per periode.
- Komisi incremental yang dapat dipulihkan dikapitalisasi sebagai contract acquisition cost dan diamortisasi sesuai masa manfaat; practical expedient ≤1 tahun diizinkan.
- Pembayaran komisi membentuk utang komisi; bukan pengurang pendapatan.
- Retur atau piutang macet memicu clawback pada periode berikutnya dengan referensi dokumen asal.
- Perubahan skema komisi berlaku prospektif dan bertanggal.

## NAV-D-146 — Read Model Analitik Sales

Sumber: [[04-sales/sales-reporting-and-analytics|Sales Reporting and Analytics]]

- Dashboard membaca materialized view/read model, bukan tabel transaksi.
- Metrik inti: booked, shipped, invoiced, collected, DSO, margin, backorder rate, return rate.
- Setiap metrik menyimpan definisi, grain, dan filter agar tidak berbeda antar-laporan.
- Drill-down selalu membawa nomor dokumen sumber.
- Ekspor menyertakan tanggal cut-off dan mata uang.

## NAV-D-147 — Pipeline O2C Lintas Modul

Sumber: [[04-sales/order-to-cash-integration|Order to Cash Integration]]

- Satu event O2C membawa `sales_order_id`, `delivery_id`, `invoice_id`, dan `payment_id` sebagai rantai referensi.
- Event dipublikasikan melalui outbox setelah transaksi database commit; konsumen harus idempoten.
- Model pemenuhan (make-to-stock, make-to-order, dropship, project, subscription) memilih jalur dokumen yang berbeda, tetapi titik postingnya sama.
- Rekonsiliasi O2C mencakup pesanan belum dikirim, delivery belum ditagih, dan invoice belum dibayar.
- Kegagalan di satu tahap tidak boleh menghasilkan jurnal parsial.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-131 | `04-sales/sales-fundamentals.md` | Adopted |
| NAV-D-132 | `04-sales/sales-quotation.md` | Adopted |
| NAV-D-133 | `04-sales/sales-order.md` | Adopted |
| NAV-D-134 | `04-sales/customer-and-sales-master-data.md` | Adopted |
| NAV-D-135 | `04-sales/customer-credit-management.md` | Adopted |
| NAV-D-136 | `04-sales/pricing-and-discount.md` | Adopted |
| NAV-D-137 | `04-sales/order-fulfillment.md` | Adopted |
| NAV-D-138 | `04-sales/backorder-and-partial-fulfillment.md` | Adopted |
| NAV-D-139 | `04-sales/delivery-and-shipping.md` | Adopted |
| NAV-D-140 | `04-sales/accounts-receivable-integration.md` | Adopted |
| NAV-D-141 | `04-sales/sales-tax.md` | Adopted |
| NAV-D-142 | `04-sales/revenue-recognition.md` | Adopted |
| NAV-D-143 | `04-sales/sales-return-and-credit-note.md` | Adopted |
| NAV-D-144 | `04-sales/sales-cancellation-and-amendment.md` | Adopted |
| NAV-D-145 | `04-sales/sales-commission.md` | Adopted |
| NAV-D-146 | `04-sales/sales-reporting-and-analytics.md` | Adopted |
| NAV-D-147 | `04-sales/order-to-cash-integration.md` | Adopted |

## References

1. **IFRS Foundation** — *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/ — diakses 26 November 2026.
2. **IFRS Foundation** — *IFRS 9 Financial Instruments* (ECL). https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/ — diakses 26 November 2026.
3. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
