---
title: Odoo 20 Accounting Implementation
software_version: "20.0"
---

# Odoo 20 Accounting Implementation

## Definition

Catatan implementasi modul Accounting Odoo versi **20.0** untuk kebutuhan yang dibahas di repository ini: chart of accounts, pajak, posisi fiskal, rekonsiliasi bank, dan penutupan periode.

Artikel ini bukan tutorial umum Odoo. Konsepnya tetap mengacu ke [[02-accounting/accounting-fundamentals|Accounting Fundamentals]] dan [[11-tax/vat-fundamentals|VAT Fundamentals]].

## ERP Implementation

### Chart of Accounts

Odoo memakai template COA per negara yang dapat di-install saat perusahaan dibuat. Setelah terpasang, akun dapat diubah, tetapi struktur yang sudah dipakai transaksi tidak boleh dihapus.

Praktik yang aman:

1. Pilih template sesuai yurisdiksi, lalu sesuaikan kode akun ke COA kanonik [[02-accounting/chart-of-accounts|Chart of Accounts]].
2. Jangan membuat akun baru untuk kebutuhan sesaat; cek apakah akun yang ada sudah mencukupi.
3. Nonaktifkan akun yang tidak dipakai, jangan hapus, agar jurnal lama tetap dapat dibaca.

### Pajak dan Posisi Fiskal

Odoo memisahkan **tax** (perhitungan) dari **fiscal position** (pemetaan pajak per pelanggan/yurisdiksi).

- Tax menyimpan tarif, basis, akun pajak, dan label pelaporan.
- Fiscal position memetakan pajak lama ke pajak baru untuk pelanggan atau wilayah tertentu.
- Perubahan tarif sebaiknya dibuat sebagai pajak baru dengan tanggal berlaku, bukan menimpa tarif lama, agar transaksi historis tetap konsisten.

Rujukan resmi: *Taxes* dan *Fiscal positions* (lihat References).

### Rekonsiliasi Bank

Odoo menyediakan widget rekonsiliasi yang mencocokkan mutasi bank dengan jurnal yang sudah ada, lalu membuat jurnal untuk selisih yang belum tercatat.

- Impor mutasi bank terlebih dahulu, baru cocokkan.
- Bedakan transaksi yang memang belum dijurnal (biaya bank, bunga) dari yang hanya beda waktu.
- Kunci periode setelah rekonsiliasi selesai agar tidak ada posting susulan.

### Penutupan Periode

Odoo memakai **lock date** untuk mencegah posting ke periode yang sudah ditutup. Alurnya: rekonsiliasi → jurnal penyesuaian → laporan → lock date.

Lock date bukan pengganti kontrol: ia hanya menolak posting. Pemeriksaan saldo akun sementara tetap harus dilakukan manual.

### Titik Integrasi

| Modul | Dokumen | Posting |
|---|---|---|
| Sales | Sales Order → Invoice | Piutang, pendapatan, PPN keluaran |
| Purchase | Purchase Order → Bill | Utang, persediaan/beban, PPN masukan |
| Inventory | Receipt/Delivery | Persediaan dan HPP (tergantung konfigurasi valuation) |
| Manufacturing | Manufacturing Order | WIP, konsumsi bahan, output |
| Payroll | Payslip | Beban gaji, utang pajak/BPJS |

## ERP Implementation Comparison

| Aspek | Odoo 20.0 | ERPNext | Dynamics 365 Finance |
|---|---|---|---|
| COA | Template per negara, dapat disesuaikan | Chart of Accounts tree dengan template | Account structures dan advanced rules |
| Pajak | Tax + fiscal position | Sales/Purchase Taxes Template + Tax Rule | Sales tax code, group, posting group |
| Rekonsiliasi bank | Widget rekonsiliasi | Bank Reconciliation Tool | Advanced bank reconciliation |
| Penutupan | Lock date | Period Closing Voucher + freeze | Period close workspace + lock |
| Multi-perusahaan | Satu database, banyak company | Multi-company | Legal entity terpisah |

Perbandingan ini menjelaskan perbedaan mekanisme, bukan menilai mana yang lebih baik.

## Batasan

- Artikel ini tidak membahas payroll localization Indonesia secara rinci.
- Perilaku spesifik versi 20.0 diverifikasi pada halaman dokumentasi resmi; klaim yang tidak dapat diverifikasi ditandai.

## References

1. **Odoo 20.0 Documentation** — *Accounting and Invoicing*. https://www.odoo.com/documentation/20.0/applications/finance/accounting.html — diakses 26 November 2026.
2. **Odoo 20.0 Documentation** — *Taxes*. https://www.odoo.com/documentation/20.0/applications/finance/accounting/taxes.html — diakses 26 November 2026.
3. **Odoo 20.0 Documentation** — *Fiscal positions*. https://www.odoo.com/documentation/20.0/applications/finance/accounting/taxes/fiscal_positions.html — diakses 26 November 2026.
4. **Odoo 20.0 Documentation** — *Bank reconciliation*. https://www.odoo.com/documentation/20.0/applications/finance/accounting/bank/reconciliation.html — diakses 26 November 2026.
5. **Odoo 20.0 Documentation** — *Reporting*. https://www.odoo.com/documentation/20.0/applications/finance/accounting/reporting.html — diakses 26 November 2026.
