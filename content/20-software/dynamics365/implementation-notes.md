---
title: Dynamics 365 Finance Implementation Notes
software_version: "10.0"
---

# Dynamics 365 Finance Implementation Notes

## Definition

Catatan implementasi Microsoft Dynamics 365 Finance (platform versi **10.0**) untuk area accounting, pajak tidak langsung, pengadaan, persediaan, aset tetap, dan proyek.

Bukan panduan konfigurasi lengkap. Fokus pada titik posting dan perbedaan mekanisme dibanding Odoo/ERPNext.

## ERP Implementation

### Ledger dan Subledger

D365 Finance memisahkan **ledger** (buku besar per legal entity) dan **subledger** (AP, AR, inventory, production). Posting profile memetakan transaksi subledger ke akun utama.

- Setiap legal entity punya satu ledger.
- Subledger journal ditransfer ke ledger, dapat dirinci atau diringkas.
- Rekonsiliasi subledger ke ledger adalah kontrol wajib sebelum tutup buku.

### Pajak Tidak Langsung

Pajak dihitung dari **sales tax code → tax group → item tax group → posting group**. Perubahan tarif dikelola lewat kode pajak dengan tanggal berlaku dan nilai.

Untuk Indonesia, localization menambahkan kebutuhan faktur pajak elektronik; jangan menganggap fitur global sudah memenuhi Coretax tanpa pengujian.

### Pengadaan dan Persediaan

- Purchase order → product receipt → vendor invoice → payment.
- Persediaan dinilai dengan FIFO, LIFO, weighted average, atau standard cost; pilihan ini memengaruhi COGS dan laporan.
- Landed cost dialokasikan ke item melalui modul Landed cost.

### Aset Tetap

Fixed assets memakai depreciation book (mis. commercial dan tax). Satu aset dapat memiliki beberapa book dengan umur dan metode berbeda; disposal dan adjustment dicatat per book.

### Proyek

Project Operations menangani kontrak, penagihan milestone, dan pengakuan pendapatan. Hubungkan aturan penagihan dengan kewajiban pelaksanaan di kontrak; jangan mengakui pendapatan hanya karena invoice terbit.

## ERP Implementation Comparison

| Aspek | D365 Finance 10.0 | Odoo 20.0 | ERPNext 16 |
|---|---|---|---|
| Entitas | Legal entity terpisah | Company dalam satu database | Company |
| COA | Account structure + advanced rules | Template COA | Tree COA |
| Pajak | Sales tax code/group/posting group | Tax + fiscal position | Template + Tax Rule |
| Aset | Multi-book depreciation | Asset models | Asset + depreciation |
| Proyek | Project Operations | Project + timesheet | Project + timesheet |

## Batasan

- Versi yang dimaksud adalah platform 10.0; nomor build berubah tiap pembaruan.
- Localization Indonesia (faktur pajak, Coretax) memerlukan pengujian terpisah; artikel ini tidak mengklaim dukungan penuh.

## References

1. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
2. **Microsoft Learn** — *Indirect taxes overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/indirect-taxes-overview — diakses 26 November 2026.
3. **Microsoft Learn** — *Warehouse management overview*. https://learn.microsoft.com/en-us/dynamics365/supply-chain/warehousing/warehouse-management-overview — diakses 26 November 2026.
4. **Microsoft Learn** — *Production process overview*. https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/production-process-overview — diakses 26 November 2026.
5. **Microsoft Learn** — *Fixed assets home page*. https://learn.microsoft.com/en-us/dynamics365/finance/fixed-assets/fixed-assets — diakses 26 November 2026.
6. **Microsoft Learn** — *Project Operations*. https://learn.microsoft.com/en-us/dynamics365/project-operations/ — diakses 26 November 2026.
7. **Microsoft Learn** — *Indonesia overview*. https://learn.microsoft.com/en-us/dynamics365/finance/localizations/indonesia/indonesia — diakses 26 November 2026.
