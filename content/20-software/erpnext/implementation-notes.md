---
title: ERPNext Implementation Notes
software_version: "16"
---

# ERPNext Implementation Notes

## Definition

Catatan implementasi ERPNext versi **16** (rilis stabil per November 2026) untuk area yang dibahas repository ini: accounting, pajak, penjualan, pembelian, persediaan, dan manufaktur.

Bukan tutorial umum. Konsep tetap mengacu ke artikel kanonik; artikel ini hanya menjelaskan mekanisme ERPNext.

## ERP Implementation

### Accounting dan COA

ERPNext memakai struktur **Chart of Accounts** berbentuk pohon (tree) dengan akun grup dan akun transaksi. Template COA tersedia per negara.

- Akun grup tidak dapat dipakai posting; hanya akun daun.
- Cost center dan dimensi akuntansi dipasang sebagai dimensi terpisah dari akun.
- Perubahan struktur sebaiknya dilakukan sebelum transaksi berjalan; akun yang sudah dipakai tidak dihapus.

### Pajak

Tiga komponen utama:

1. **Sales/Purchase Taxes and Charges Template** — baris pajak, akun, tarif, dan tipe perhitungan.
2. **Tax Rule** — memilih template berdasarkan konteks (pelanggan, item, wilayah, tanggal, prioritas).
3. **Item Tax Template** — menimpa tarif untuk item tertentu.

Untuk perubahan tarif, buat template baru dengan masa berlaku dan atur Tax Rule, jangan menimpa template lama yang sudah dipakai transaksi historis.

### Penjualan dan Pembelian

- Sales Order → Delivery Note → Sales Invoice → Payment Entry.
- Purchase Order → Purchase Receipt → Purchase Invoice → Payment Entry.
- Dokumen yang sudah submit bersifat immutable; koreksi dilakukan lewat amend atau credit/debit note.

### Persediaan dan Valuasi

ERPNext mendukung FIFO dan moving average. Perubahan metode valuasi mengubah nilai persediaan dan HPP, jadi harus disetujui sebelum transaksi berjalan dan tidak boleh diubah di tengah periode tanpa perhitungan ulang.

Stock Entry dipakai untuk konsumsi material, transfer, dan produksi. Repost Item Valuation tersedia untuk memperbaiki nilai, tetapi berisiko jika dipakai tanpa analisis.

### Manufaktur

BOM → Work Order → Job Card → Stock Entry for Manufacture. Konsumsi bahan dan output tercatat lewat Stock Entry; biaya produksi bergantung pada valuasi item dan biaya operasi.

### HR dan Payroll

Frappe HR menangani karyawan, absensi, cuti, dan payroll. Perhitungan pajak dan BPJS bergantung pada komponen gaji dan aturan lokal; jangan menganggap komponen bawaan sesuai regulasi Indonesia tanpa penyesuaian.

## ERP Implementation Comparison

| Aspek | ERPNext 16 | Odoo 20.0 | Dynamics 365 Finance |
|---|---|---|---|
| COA | Tree, template per negara | Template per negara | Account structures |
| Pajak | Template + Tax Rule + Item Tax | Tax + fiscal position | Sales tax code/group |
| Dokumen | Submit/amend, immutable | Posted/unposted | Posted, reversal |
| Valuasi | FIFO, moving average | FIFO, AVCO, standard | FIFO, LIFO, weighted, standard |
| Manufaktur | BOM, Work Order, Job Card | BOM, MO, Work Center | Production order, route |

## Batasan

- Versi yang diverifikasi: 16.x (November 2026). Perilaku versi 15 dan sebelumnya tidak diklaim sama.
- Artikel ini tidak membahas instalasi, hosting, atau customization Frappe Framework.

## References

1. **ERPNext Documentation** — *Accounts*. https://docs.frappe.io/erpnext/accounts — diakses 26 November 2026.
2. **ERPNext Documentation** — *Setting Up Taxes*. https://docs.frappe.io/erpnext/setting-up-taxes — diakses 26 November 2026.
3. **ERPNext Documentation** — *Sales Taxes and Charges Template*. https://docs.frappe.io/erpnext/sales-taxes-and-charges-template — diakses 26 November 2026.
4. **ERPNext Documentation** — *Tax Rule*. https://docs.frappe.io/erpnext/tax-rule — diakses 26 November 2026.
5. **ERPNext Documentation** — *Manufacturing*. https://docs.frappe.io/erpnext/manufacturing — diakses 26 November 2026.
6. **ERPNext Documentation** — *Item Valuation Setup and Transactions*. https://docs.frappe.io/erpnext/item-valuation-transactions — diakses 26 November 2026.
7. **Frappe** — *Announcing Framework, ERPNext, and Frappe HR v16.60*. https://frappe.io/blog/product-updates/announcing-framework-erpnext-and-frappe-hr-v1660 — diakses 26 November 2026.
