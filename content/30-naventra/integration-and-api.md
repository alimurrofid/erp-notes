---
title: Naventra Integration and API
---

# Naventra Integration and API

## Definition

Kontrak integrasi Naventra: event internal, outbox, API, idempotency, error handling, dan rekonsiliasi. Tujuan: modul boleh bereaksi terhadap peristiwa tanpa saling mengunci, tetapi jurnal tetap atomik.

## Prinsip

1. **Satu transaksi database untuk satu peristiwa posting.** Event dipublikasikan setelah commit, bukan di tengah transaksi.
2. **Idempotent by design.** Konsumen event dan endpoint API harus aman menerima pesan yang sama lebih dari sekali.
3. **Kontrak eksplisit.** Event dan API memiliki versi, skema, dan pemilik.
4. **Gagal terlihat.** Pesan gagal masuk dead-letter/exception queue; tidak hilang diam-diam.
5. **Rekonsiliasi selalu tersedia.** Integrasi tidak dianggap benar hanya karena tidak ada error di log.

## Event Catalog (Minimum)

| Event | Produsen | Konsumen | Kunci idempotency |
|---|---|---|---|
| `sales_order.confirmed` | Sales | Inventory, Credit | `sales_order_id` |
| `delivery.confirmed` | Inventory/Sales | Accounting | `delivery_id` |
| `invoice.posted` | Sales/AR | Accounting, Tax | `invoice_id` |
| `payment.received` | Treasury/AR | Accounting | `payment_id` |
| `goods_receipt.posted` | Purchasing | Inventory, Accounting | `goods_receipt_id` |
| `vendor_bill.posted` | AP | Accounting, Tax | `vendor_bill_id` |
| `production.completed` | Manufacturing | Inventory, Accounting | `production_order_id` |
| `period.closed` | Accounting | Semua modul | `entity_id + period` |

Setiap event membawa: `event_id`, `event_type`, `version`, `occurred_at`, `source_document_type`, `source_document_id`, `payload`, dan `correlation_id`.

## Outbox dan Pengiriman

- Tabel `outbox_events` ditulis dalam transaksi yang sama dengan dokumen sumber.
- Worker membaca outbox, mengirim ke bus/queue, lalu menandai `published_at`.
- Jika pengiriman gagal, event dicoba ulang dengan backoff; setelah batas, masuk dead-letter.
- Konsumen menyimpan `event_id` yang sudah diproses untuk mencegah duplikasi.
- Event tidak boleh diedit setelah dipublikasikan; koreksi memakai event baru.

## API

| Aspek | Aturan |
|---|---|
| Versi | URL atau header versi (`/v1/...`); perubahan breaking menaikkan versi |
| Autentikasi | Token per integrasi, bukan kredensial pengguna |
| Otorisasi | Scope per entitas dan aksi; token tidak otomatis mendapat semua entitas |
| Idempotency | Header `Idempotency-Key` wajib untuk POST pembuatan dokumen |
| Pagination | Cursor-based; batas ukuran halaman |
| Error | Kode mesin stabil + pesan manusia + `correlation_id` |
| Retry | Aman untuk 429/5xx; tidak untuk 4xx validasi |
| Audit | Setiap panggilan API tercatat (aktor, endpoint, hasil) |

## Error Contract

```json
{
  "error": {
    "code": "PERIOD_LOCKED",
    "message": "Periode 2026-09 sudah ditutup.",
    "correlation_id": "req-...",
    "details": { "entity_id": "...", "period": "2026-09" }
  }
}
```

Kode error tidak boleh berubah makna antar versi. Pesan manusia boleh berubah.

## Rekonsiliasi Integrasi

- Harian: jumlah event terbit vs event diproses vs dead-letter.
- Per periode: saldo subledger vs GL, dokumen sumber vs jurnal.
- Setiap selisih harus punya tiket dan alasan; tidak boleh ditutup dengan jurnal penyeimbang tanpa analisis.
- Dashboard integrasi menampilkan lag, error rate, dan umur dead-letter.

## Open Questions

1. Apakah bus internal memakai message broker atau tabel outbox + polling?
2. Apakah integrasi pihak ketiga memakai webhook atau pull API?
3. Bagaimana SLA retry dan retensi dead-letter?

## References

1. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
2. **OWASP** — *Application Security Verification Standard*. https://owasp.org/www-project-application-security-verification-standard/ — diakses 26 November 2026.
3. **COSO** — *Internal Control — Integrated Framework* (2013). https://www.coso.org/guidance-on-ic — diakses 26 November 2026.
