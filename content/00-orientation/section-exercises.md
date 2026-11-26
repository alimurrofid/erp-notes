---
title: Section Exercises
---

# Section Exercises

## Definition

Sepuluh soal per section untuk mengecek pemahaman setelah menyelesaikan satu bagian. Berbeda dari [[00-orientation/exercises|Exercises]] yang mencampur semua topik, halaman ini mengikuti urutan folder sehingga dapat dipakai sebagai *checkpoint* per modul.

Kunci ada di [[00-orientation/section-exercise-answer-key|Section Exercise Answer Key]]. Kerjakan tanpa membuka artikel; jawab dengan kalimat sendiri dan sebutkan alasan, bukan hanya angka.

## 00 — Fundamentals

1. Bedakan master data, transaction data, dan reference data; beri satu contoh masing-masing.
2. Mengapa satu item master tidak boleh diubah kodenya setelah dipakai transaksi?
3. Apa perbedaan *document*, *transaction*, dan *event*?
4. Mengapa struktur organisasi harus ditetapkan sebelum nomor dokumen?
5. Apa risiko memiliki dua chart of accounts untuk entitas yang sama?
6. Jelaskan hubungan *subledger* dan *general ledger*.
7. Mengapa tanggal dokumen dan tanggal posting bisa berbeda, dan mana yang menentukan periode?
8. Apa yang dimaksud *single source of truth* dalam ERP?
9. Mengapa integrasi lintas modul membutuhkan kunci data yang sama?
10. Sebutkan tiga tanda bahwa sebuah laporan ERP tidak dapat dipercaya.

## 01 — Business Processes

1. Sebutkan lima tahap O2C dan dokumen utama tiap tahap.
2. Sebutkan lima tahap P2P dan dokumen utama tiap tahap.
3. Di titik mana O2C menghasilkan jurnal pertama, dan mengapa bukan saat quotation?
4. Di titik mana P2P mengakui utang usaha, dan mengapa bukan saat PO?
5. Apa perbedaan *trigger*, *validation*, dan *next process* pada kontrak proses?
6. Mengapa pembatalan setelah posting bukan sekadar mengubah status?
7. Apa yang harus terjadi pada reservasi stok ketika SO dibatalkan?
8. Jelaskan satu exception path pada R2R.
9. Mengapa `Closed` berbeda dari `Cancelled`?
10. Mengapa proses yang tidak punya jalur pengecualian cenderung menghasilkan data kotor?

## 02 — Accounting

1. Tulis jurnal penjualan kredit 10 unit @ Rp1.000.000 dengan PPN efektif 11%.
2. Tulis jurnal penerimaan barang 10 unit @ Rp700.000 tanpa tagihan.
3. Apa yang terjadi pada saldo GR/IR setelah vendor bill diposting?
4. Mengapa PPN Masukan yang tidak dapat dikreditkan masuk ke biaya atau harga perolehan?
5. Bedakan beban dan aset; beri satu contoh yang mudah tertukar.
6. Apa fungsi jurnal penyesuaian pada akhir periode?
7. Jelaskan perbedaan *temporary* dan *permanent difference*.
8. Mengapa PPN 12% dengan DPP 11/12 menghasilkan beban efektif 11%?
9. Kapan koreksi kesalahan periode lalu disajikan ulang, dan kapan dicatat di periode berjalan?
10. Mengapa LIFO tidak diizinkan IAS 2, dan mengapa alasannya bukan soal aliran fisik?

## 03 — Sales

1. Mengapa pendapatan diakui saat kontrol berpindah, bukan saat faktur diterbitkan?
2. Apa risiko menerbitkan invoice sebelum pengiriman?
3. Kapan Sales Order boleh dibatalkan, dan kapan harus memakai retur?
4. Mengapa reservasi stok tidak mengubah jurnal?
5. Apa perbedaan *backorder* dan *partial delivery*?
6. Bagaimana diskon pelunasan dini memengaruhi PPN, dan mengapa?
7. Mengapa komisi penjualan kadang harus dikapitalisasi?
8. Apa yang dimaksud *clawback* komisi?
9. Mengapa harga jual di bawah biaya tidak otomatis berarti kerugian pada saat penjualan?
10. Sebutkan tiga kontrol yang mencegah penjualan ke pelanggan bermasalah.

## 04 — Purchasing

1. Mengapa purchase requisition berbeda dari purchase order?
2. Apa tiga dokumen dalam *3-way match* dan apa yang dicocokkan?
3. Kapan selisih 3-way match boleh ditoleransi?
4. Apa itu *short-close* PO, dan bagaimana jurnalnya?
5. Mengapa Incoterms tidak memindahkan kepemilikan?
6. Apa perbedaan risiko, biaya, dan kepemilikan dalam Incoterms?
7. Mengapa retur pembelian mengurangi PPN Masukan?
8. Apa risiko memakai satu pemasok untuk seluruh komponen kritis?
9. Mengapa kontrak payung tidak langsung menjadi utang?
10. Sebutkan tiga kontrol yang mencegah pembayaran ganda.

## 05 — Inventory

1. Bedakan *on-hand*, *reserved*, *allocated*, dan *available*.
2. Mengapa *allocated* tidak boleh mengurangi kuantitas dua kali?
3. Hitung ROP jika pemakaian 5 unit/hari, lead time 6 hari, dan safety stock 10 unit.
4. Mengapa `Max − on-hand` salah sebagai kuantitas pesanan?
5. Bedakan FIFO dan moving average saat harga beli naik.
6. Mengapa landed cost menaikkan nilai persediaan, bukan langsung menjadi beban?
7. Apa yang harus terjadi pada persediaan dan PPN saat retur pembelian?
8. Kapan persediaan diturunkan ke NRV, dan berapa batas pemulihannya?
9. Bagaimana overhead tetap dialokasikan saat kapasitas menganggur?
10. Mengapa barang kedaluwarsa di karantina belum tentu sudah menurunkan laba?

## 06 — Manufacturing

1. Urutkan BOM → routing → MRP → MO dan jelaskan keluaran tiap langkah.
2. Apa perbedaan *backflush* dan *manual issue*?
3. Mengapa saldo WIP harus dapat dijelaskan sebelum laporan periodik?
4. Jelaskan dua komponen varians produksi.
5. Mengapa yield memakai input sebagai pembagi, bukan *planned output*?
6. Apa yang harus dilakukan pada MO yang sudah mengonsumsi bahan tetapi dibatalkan?
7. Mengapa Odoo standar bukan penjadwal *finite capacity* penuh?
8. Bagaimana unit ekuivalen dihitung jika sistem tidak menyediakannya?
9. Apa perbedaan *co-product* dan *by-product* dari sisi alokasi biaya?
10. Mengapa scrap harus mengurangi nilai persediaan, bukan hanya kuantitas?

## 07 — Finance

1. Apa perbedaan *cash management* dan *liquidity management*?
2. Mengapa rekonsiliasi bank bukan sekadar mencocokkan saldo?
3. Apa yang dimaksud *bank clearing account*, dan kapan saldonya harus nol?
4. Bagaimana *13-week cash flow forecast* berbeda dari anggaran tahunan?
5. Mengapa selisih kurs realisasi dan belum direalisasi diperlakukan berbeda?
6. Apa fungsi *period lock* dalam tata kelola tutup buku?
7. Mengapa laporan laba rugi tidak cukup untuk menilai likuiditas?
8. Apa risiko akun *suspense* yang dibiarkan bersaldo?
9. Jelaskan hubungan *working capital* dan siklus kas.
10. Mengapa rasio keuangan harus dibaca bersama kebijakan akuntansi?

## 08 — Assets

1. Kapan penyusutan dimulai, dan kapan berhenti?
2. Apa perbedaan *cost model* dan *revaluation model*?
3. Mengapa satu aset tidak boleh memakai dua model sekaligus?
4. Apa perbedaan *impairment* dan *revaluation*?
5. Kapan biaya pemeliharaan dikapitalisasi?
6. Apa tujuan *componentization*, dan kapan tidak diperlukan?
7. Mengapa ambang 15–20% bukan aturan IAS 16?
8. Bagaimana aset yang ditemukan pada opname harus diakui?
9. Apa dampak mutasi aset antar-cost center terhadap penyusutan?
10. Mengapa nilai residu dan umur manfaat harus ditinjau ulang?

## 09 — Project

1. Bedakan *project* dan *task*.
2. Bedakan *planning* dan *scheduling*.
3. Mengapa proyek fixed-price mengakui HPP setiap BAST?
4. Apa perbedaan proyek *time-material* dan *fixed-price* dari sisi WIP?
5. Apa yang harus ditutup sebelum proyek berstatus `Closed`?
6. Mengapa `Terminated` berbeda dari `Cancelled`?
7. Apa fungsi *budget*, *commitment*, dan *actual* dalam kontrol proyek?
8. Mengapa timesheet harus terhubung ke proyek dan payroll?
9. Apa risiko mengakui pendapatan berdasarkan tagihan saja?
10. Sebutkan tiga kontrol pada proyek yang merugi.

## 10 — HR dan Payroll

1. Apa perbedaan *employee master data* dan *position management*?
2. Mengapa perubahan gaji harus memiliki jejak audit?
3. Apa dasar hukum lembur di Indonesia, dan mengapa skema 5 hari berbeda dari 6 hari?
4. Mengapa konsep *exempt* ala FLSA tidak boleh dipakai sebagai dasar lembur di Indonesia?
5. Apa perbedaan cuti tahunan, cuti melahirkan, dan sakit dari sisi kewajiban pemberi kerja?
6. Mengapa tanggal jatuh tempo PPh 21 dan BPJS tidak boleh diasumsikan tetap dari tahun ke tahun?
7. Apa yang dimaksud *gross-up*, dan mengapa perlakuan pajaknya kontensius?
8. Mengapa reimbursement dengan bukti berbeda dari tunjangan tetap?
9. Mengapa payroll harus direkonsiliasi ke GL setiap periode?
10. Sebutkan tiga kontrol yang mencegah ghost employee.

## 11 — Tax

1. Mengapa tarif PPN harus disebut bersama tanggal berlaku dan dasar hukumnya?
2. Apa perbedaan *bukan objek*, *dibebaskan*, dan *tarif 0%*?
3. Mengapa PPN Masukan atas penyerahan yang dibebaskan tidak dapat dikreditkan?
4. Kapan saat terutang PPN timbul jika pembayaran mendahului penyerahan?
5. Apa fungsi faktur pajak, dan mengapa faktur komersial saja tidak cukup?
6. Kapan PPh 23 dipotong, dan siapa yang menyetorkan?
7. Mengapa PPh 21 dan BPJS tidak boleh disamakan?
8. Apa yang dimaksud *DPP Nilai Lain* 11/12?
9. Mengapa koreksi fiskal tidak sama dengan jurnal akuntansi?
10. Mengapa perubahan tarif pajak harus ditandai untuk review manusia?

## 12 — Software

1. Mengapa catatan implementasi harus menyebut versi?
2. Apa perbedaan dokumen *posted* dan *draft* di Odoo?
3. Bagaimana ERPNext menangani dokumen yang sudah *submit*?
4. Mengapa perubahan metode valuasi di tengah periode berbahaya?
5. Apa yang dimaksud *Universal Journal* di SAP S/4HANA?
6. Mengapa Material Ledger wajib di S/4HANA tetapi Actual Costing opsional?
7. Apa risiko mengandalkan halaman dokumentasi vendor yang berpindah?
8. Mengapa tabel perbandingan vendor tidak boleh menjadi sumber konsep?
9. Kapan modul pihak ketiga diperlukan untuk *finite capacity*?
10. Bagaimana menguji klaim vendor tanpa lingkungan produksi?

## 13 — Naventra

1. Mengapa keputusan desain Naventra dipisahkan dari artikel konsep?
2. Apa fungsi ID `NAV-D-xxx`?
3. Bedakan *requirement*, *design decision*, dan *trade-off*.
4. Mengapa baseline desain belum berarti implementasi selesai?
5. Apa yang harus ada dalam *traceability* requirement ke desain?
6. Mengapa keputusan desain harus mencatat alternatif yang ditolak?
7. Apa risiko menaruh skema database di artikel pembelajaran?
8. Kapan keputusan desain perlu diubah?
9. Mengapa pengujian belum bisa diklaim dari dokumen desain?
10. Apa arti status "baseline desain" bagi pembaca?

## References

- IFRS Foundation. *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/. Diakses 26 November 2026.
- IFRS Foundation. *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/. Diakses 26 November 2026.
