---
title: Naventra Security and Roles
---

# Naventra Security and Roles

## Definition

Kontrol akses dan pemisahan tugas Naventra: siapa boleh membuat, menyetujui, memposting, dan membuka kembali dokumen. Dokumen ini melengkapi [[30-naventra/technical-design|Technical Design]]; ia tidak memilih produk identity provider.

## Prinsip

1. **Least privilege** — pengguna hanya mendapat izin yang dibutuhkan untuk tugasnya.
2. **Pemisahan tugas (SoD)** — pembuat dokumen tidak boleh menjadi penyetuju atau pem-posting dokumen yang sama.
3. **Otorisasi berlapis** — izin modul, izin aksi, dan batas nilai/entitas diperiksa terpisah.
4. **Audit by default** — perubahan status, nilai, dan konfigurasi tercatat; tidak ada jalur “admin mode” tanpa jejak.
5. **Data scope** — akses dibatasi per entitas, cabang, gudang, atau portofolio sesuai peran.

## Role Matrix

| Peran | Buat | Setujui | Posting | Buka periode | Catatan |
|---|---|---|---|---|---|
| Sales Clerk | Quotation, SO | — | — | — | Tidak dapat mengubah harga di luar price list |
| Sales Manager | SO, diskon | Diskon/termin | — | — | Ambang diskon berlaku |
| Credit Manager | — | Credit hold release | — | — | Melihat exposure, tidak memposting jurnal |
| Warehouse Operator | Receipt, delivery, transfer | — | — | — | Tidak dapat mengubah nilai |
| Warehouse Supervisor | Semua mutasi gudang | Adjustment | — | — | Tidak dapat menyetujui jurnal |
| Accountant | Journal, bill, invoice | — | Jurnal | — | Tidak dapat membuat payment run |
| Controller | — | Jurnal manual, write-off | Jurnal | Usul buka periode | Tidak dapat mengubah master user |
| Treasurer | Payment run | Payment run | Pembayaran | — | Tidak dapat mengubah COA |
| Tax Officer | Tax code, faktur | — | Jurnal pajak | — | Tidak dapat menutup buku |
| Administrator | User, role, konfigurasi | — | — | — | Tidak boleh posting transaksi bisnis |

Matriks ini adalah baseline; implementasi dapat memecah peran lebih rinci, tetapi tidak boleh menghilangkan pemisahan pembuat–penyetuju–posting.

## Aturan SoD Minimum

| Kombinasi terlarang | Alasan |
|---|---|
| Membuat vendor + menyetujui pembayaran | Risiko vendor fiktif |
| Membuat jurnal + membuka periode | Risiko menutupi kesalahan |
| Mengubah harga + menyetujui diskon | Risiko markup/diskon fiktif |
| Menerima barang + memposting tagihan | Risiko penerimaan fiktif |
| Mengubah master aset + menghapus aset | Risiko penghapusan aset |
| Mengelola user + memposting transaksi | Risiko eskalasi hak |

Konflik SoD harus ditolak saat pemberian peran, bukan hanya dilaporkan setelah transaksi.

## Kontrol Periode dan Otorisasi

- `period_locks` menyimpan entitas, periode, status, otorisator, dan alasan.
- Pembukaan kembali periode hanya oleh Controller + persetujuan kedua (dual control), dengan audit log.
- Batas nilai persetujuan (DOA) disimpan sebagai data bertanggal; perubahan DOA memerlukan otorisasi.
- Dokumen di atas ambang tidak dapat diposting sebelum approval tercatat.

## Audit dan Privasi

- Audit log bersifat append-only: `before`, `after`, `user_id`, `at`, `reason`, `source`.
- Data pribadi (karyawan, pelanggan) dibatasi per peran; ekspor memerlukan izin khusus dan tercatat.
- Retensi audit mengikuti kebijakan perusahaan; jangan menghapus log untuk “membersihkan” data uji di produksi.
- Akses baca pun dicatat untuk data sensitif (payroll, rekening bank).

## Open Questions

1. Apakah Naventra memakai RBAC murni atau menambahkan attribute-based access (mis. vendor sensitivity)?
2. Apakah approval memakai eskalasi otomatis berbasis waktu atau hanya berbasis nilai?
3. Bagaimana kebijakan retensi audit dan data pribadi per yurisdiksi?

## References

1. **COSO** — *Internal Control — Integrated Framework* (2013), komponen *control activities*. https://www.coso.org/guidance-on-ic — diakses 26 November 2026.
2. **The Institute of Internal Auditors** — *Global Internal Audit Standards*. https://www.theiia.org/en/standards/ — diakses 26 November 2026.
3. **OWASP** — *Application Security Verification Standard*. https://owasp.org/www-project-application-security-verification-standard/ — diakses 26 November 2026.
