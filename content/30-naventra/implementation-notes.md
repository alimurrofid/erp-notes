---
title: Naventra Implementation Notes
---

# Naventra Implementation Notes

## Definition

Urutan implementasi Naventra dari konfigurasi sampai cutover, beserta prasyarat dan kriteria selesai. Mengacu ke [[30-naventra/technical-design|Technical Design]].

## Urutan Konfigurasi

| Tahap | Aktivitas | Kriteria selesai |
|---|---|---|
| 1 | Entitas, mata uang, kalender fiskal | Satu ledger per entitas, periode terbentuk |
| 2 | COA dan struktur dimensi | Tidak ada akun duplikat; akun daun teridentifikasi |
| 3 | Pajak dan tanggal berlaku | Tarif diuji pada dua periode berbeda |
| 4 | Master data (item, vendor, pelanggan) | Data uji lengkap untuk satu siklus |
| 5 | Aturan posting dan penomoran | Jurnal uji seimbang; nomor sesuai pola |
| 6 | Pengguna, peran, pemisahan tugas | Tidak ada satu pengguna yang membuat dan menyetujui |
| 7 | Saldo awal | Neraca uji coba seimbang sebelum go-live |
| 8 | Sales: kredit, harga, pajak, revenue schedule | Satu SO dari quotation sampai kas berjalan tanpa jurnal manual |
| 9 | Accounting: subledger, jurnal, rekonsiliasi, laporan | Subledger = GL; laporan dapat drill-down ke jurnal |
| 10 | Kontrol: peran, SoD, period lock, audit | Tidak ada pengguna yang membuat dan menyetujui dokumen yang sama |

## Migrasi Saldo Awal

1. Bekukan transaksi sistem lama pada tanggal cutover.
2. Impor saldo akun, piutang, utang, persediaan, dan aset.
3. Rekonsiliasi: total subledger = akun kontrol.
4. Simpan bukti rekonsiliasi; jangan menutup selisih tanpa penjelasan.

Saldo awal tidak boleh dibuat dengan membuka kembali periode lama.

## Pengujian

Rincian level, dataset, kasus wajib, dan kriteria keluar ada di [[30-naventra/test-strategy|Test Strategy]]. Ringkasnya:

- **Uji satuan**: aturan posting per peristiwa (GR, bill, delivery, BAST, konsumsi, output).
- **Uji siklus**: satu PO dari PR sampai pembayaran; satu SO dari quotation sampai kas.
- **Uji negatif**: posting ke periode terkunci, akun non-daun, dokumen ganda, kredit terlampaui.
- **UAT**: pengguna menjalankan skenario harian tanpa bantuan tim implementasi.

## Cutover

| Langkah | Risiko | Mitigasi |
|---|---|---|
| Impor saldo awal | Selisih subledger | Rekonsiliasi sebelum go-live |
| Pelatihan pengguna | Salah input | UAT + checklist |
| Paralel run | Beban ganda | Batasi 1 periode, bandingkan saldo |
| Penutupan sistem lama | Data hilang | Arsip dan uji restore |

## Setelah Go-Live

- Pantau tiga hal: jurnal gagal, selisih rekonsiliasi, dan dokumen tertahan.
- Kunci periode sesuai jadwal; jangan menunda karena menunggu perbaikan data.
- Catat setiap perubahan konfigurasi sebagai perubahan bertanggal (NAV-R-11).
- Pantau outbox lag, dead-letter, dan selisih rekonsiliasi (lihat [[30-naventra/non-functional-requirements|NFR]]).

## Kriteria Selesai

Implementasi dianggap selesai bila satu siklus penuh (PO → produksi → penjualan → penutupan) berjalan tanpa jurnal manual di luar prosedur, dan rekonsiliasi subledger ke GL bersih.

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
2. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
3. **ERPNext Documentation** — *Accounts*. https://docs.frappe.io/erpnext/accounts — diakses 26 November 2026.
