---
title: Section Exercise Answer Key
---

# Section Exercise Answer Key

## Definition

Kunci [[00-orientation/section-exercises|Section Exercises]]. Jawaban di bawah adalah inti yang harus muncul; kalimat pembuka boleh berbeda. Buka setelah mengerjakan, bukan sebelumnya.

## Cara Menilai

| Level | Kriteria |
|---|---|
| **Penuh** | Jawaban benar, alasan/standar disebut, dan angka disertai rumus |
| **Sebagian** | Benar sebagian, atau angka benar tanpa alasan |
| **Kurang** | Hanya mengulang istilah, atau angka tanpa dasar |

Untuk soal hitungan, nilai penuh diberikan jika rumus dan asumsi ditulis, meskipun hasil akhir dibulatkan.

## 00 — Fundamentals

1. Master data relatif stabil dan dipakai berulang (item, vendor, COA); transaction data lahir dari satu peristiwa (PO, invoice); reference data dipakai bersama lintas transaksi (mata uang, kode pajak, UOM).
2. Kode dipakai sebagai kunci asing dan bukti historis; mengubahnya memutus tautan dan jejak audit. Buat kode baru, blokir yang lama.
3. Dokumen adalah bukti formal; transaksi adalah perubahan nilai/status; peristiwa adalah kejadian ekonomi yang dapat memicu keduanya.
4. Struktur menentukan company code, plant, cost center, otorisasi, dan format nomor; mengubahnya setelah ada transaksi memaksa migrasi.
5. Rekonsiliasi manual, laporan tidak konsisten, pemeliharaan ganda, dan risiko posting ke akun yang salah.
6. Subledger merinci per objek (pelanggan, item) dan menjadi sumber jurnal; GL menyimpan ringkasan akun. Subledger harus selalu dapat direkonsiliasi ke GL.
7. Tanggal dokumen mengikat hak/tagihan dan jatuh tempo; tanggal posting menentukan periode buku besar dan masa pajak.
8. Satu sumber data otoritatif yang dipakai semua modul; modul lain merujuk, tidak menyalin.
9. Tanpa kunci yang sama (item, vendor, company), modul tidak dapat mencocokkan dokumen atau memposting ke akun yang sama.
10. Banyak jurnal manual, subledger tidak sama dengan GL, akun suspense bersaldo, dan angka antar-laporan tidak tie.

## 01 — Business Processes

1. Quotation → Sales Order → Delivery → Invoice → Payment.
2. Purchase Requisition → RFQ → Purchase Order → Goods Receipt → Vendor Bill/Payment.
3. Saat pengiriman/penyerahan kontrol, bukan saat quotation, karena belum ada kewajiban pelaksanaan yang terpenuhi.
4. Saat vendor bill diposting dan 3-way match lolos; PO hanya komitmen, bukan utang.
5. Trigger memulai proses; validation menentukan boleh/tidak; next process adalah proses hilir yang menerima output.
6. Karena efek fisik, pajak, dan jurnal sudah terjadi; perlu dokumen balik/koreksi, bukan edit status.
7. Reservasi dilepas sehingga kuantitas kembali available; tidak ada jurnal.
8. Contoh: rekonsiliasi bank menemukan setoran transit → jurnal penyesuaian atau item suspense, bukan mengubah saldo bank.
9. Closed = kewajiban dan hak selesai; Cancelled = dokumen tidak pernah berlaku.
10. Pengguna akan "memperbaiki" dengan mengedit dokumen posted atau membuat jurnal gelap; jejak audit hilang dan selisih menumpuk.

## 02 — Accounting

1. Dr Piutang 11.100.000; Cr Pendapatan 10.000.000; Cr PPN Keluaran 1.100.000. **Alasan:** PPN efektif 11% × DPP 10.000.000 = 1.100.000; piutang = DPP + PPN.
2. Dr Persediaan 7.000.000; Cr GR/IR 7.000.000. **Alasan:** barang sudah diterima tetapi tagihan belum ada, sehingga lawan jurnalnya akun kliring GR/IR, bukan utang usaha.
3. GR/IR didebit Rp7.000.000, PPN Masukan didebit Rp770.000, Utang Usaha dikredit Rp7.770.000; saldo GR/IR menjadi nol. **Alasan:** 3-way match mengubah kliring menjadi utang final setelah PO, GR, dan faktur cocok.
4. Tidak ada hak mengkreditkan, sehingga nilainya menjadi bagian biaya atau harga perolehan sesuai perlakuan pajak.
5. Biaya perbaikan rutin (beban) vs penggantian komponen yang memperpanjang umur/meningkatkan kapasitas (aset).
6. Menempatkan pendapatan/beban pada periode yang benar dan menyesuaikan saldo neraca (akrual, prepaid, depresiasi).
7. Temporary difference menimbulkan pajak tangguhan dan berbalik; permanent difference tidak berbalik.
8. 12% × 11/12 = 11% dari harga jual, sehingga beban efektif 11% untuk BKP/JKP non-mewah. **Alasan:** DPP Nilai Lain 11/12 memperkecil dasar pengenaan, bukan menurunkan tarif statutori.
9. Material dan periode lalu → restatement retrospektif (IAS 8.42); tidak material → periode ditemukan dengan pengungkapan.
10. IAS 2.25 hanya mengizinkan FIFO dan weighted average; larangan bersifat pengukuran, bukan karena LIFO dianggap melanggar aliran fisik.

## 03 — Sales

1. Pendapatan diakui saat kewajiban pelaksanaan terpenuhi, yaitu kontrol atas barang/jasa berpindah (IFRS 15.31–33).
2. Pendapatan terlalu awal, timbul kewajiban kontrak, risiko pajak, dan risiko kredit jika barang belum dikirim.
3. Batal sebelum barang keluar; setelah barang keluar gunakan retur dan credit note.
4. Reservasi hanya komitmen kuantitas; tidak ada perpindahan kontrol atau risiko.
5. Backorder adalah sisa pesanan yang belum dikirim dan dijadwalkan kemudian; partial delivery adalah pengiriman sebagian yang bisa atau tidak menimbulkan backorder.
6. Jika diskon mengurangi DPP, PPN Keluaran ikut dikoreksi dan kas diterima lebih kecil; jika tidak, PPN tetap. Asumsi harus dinyatakan dan faktur disesuaikan.
7. IFRS 15.91 mewajibkan kapitalisasi biaya incremental yang dapat dipulihkan; praktik langsung beban hanya untuk masa manfaat ≤1 tahun.
8. Pemotongan komisi pada periode berikutnya karena retur atau piutang tak tertagih.
9. Kerugian diakui saat NRV turun di bawah biaya; jika NRV masih di atas biaya, penjualan di bawah harga normal belum tentu merugikan.
10. Batas kredit, hold/dunning, persetujuan termin, dan review aging.

## 04 — Purchasing

1. PR adalah permintaan internal tanpa komitmen ke pemasok; PO adalah komitmen legal untuk membeli.
2. PO, goods receipt, vendor invoice; yang dicocokkan adalah kuantitas, harga, dan termin/pajak.
3. Jika masih dalam toleransi kebijakan, nilainya tidak material, dan disetujui pejabat berwenang.
4. Menutup sisa kuantitas yang tidak akan diterima dengan alasan; jurnal hanya untuk barang yang benar-benar diterima, sisa tidak menjadi utang.
5. Incoterms mengatur risiko dan biaya, bukan perpindahan hak milik.
6. Risiko (siapa menanggung kerusakan), biaya (transport/asuransi), kepemilikan (hak legal) adalah tiga hal terpisah.
7. Retur mengurangi DPP dan PPN Masukan; pajak yang sudah dikreditkan harus dikoreksi.
8. Ketergantungan pasokan, harga, dan kualitas; risiko gangguan produksi.
9. Kontrak payung hanya kerangka; utang timbul dari call-off/penerimaan/faktur.
10. 3-way match, kontrol duplikat invoice, persetujuan payment run, dan kontrol master data vendor.

## 05 — Inventory

1. On-hand = fisik; reserved = terikat SO; allocated = sudah di pick list; available = bebas untuk permintaan baru.
2. Karena allocated dan reserved dapat merupakan tahap yang sama; mengurangi keduanya menghitung komitmen yang sama dua kali.
3. ROP = (5 × 6) + 10 = 40 unit. **Alasan:** kebutuhan selama lead time 30 unit ditambah safety stock 10 unit; ROP bukan rata-rata pemakaian.
4. Karena mengabaikan on-order dan reserved; sistem bisa memesan ulang barang yang sudah dipesan atau sudah dijanjikan.
5. Saat harga naik, FIFO menghasilkan COGS lebih rendah dan persediaan lebih tinggi; moving average menghaluskan keduanya. **Alasan:** FIFO mengeluarkan lapisan biaya lama yang lebih murah; average mencampur biaya lama dan baru.
6. Landed cost adalah biaya untuk membawa persediaan ke lokasi dan kondisi siap pakai (IAS 2.11), sehingga menjadi bagian biaya perolehan.
7. Utang berkurang, persediaan berkurang sebesar biaya perolehan termasuk landed cost, dan PPN Masukan dikoreksi.
8. Pada setiap tanggal pelaporan jika NRV < biaya; pemulihan dibatasi sebesar penurunan yang pernah diakui dan tidak melebihi biaya semula.
9. Tarif berdasarkan kapasitas normal; bagian yang tidak teralokasi karena idle capacity dibebankan periode berjalan. **Alasan:** IAS 2.13 melarang biaya per unit naik hanya karena produksi rendah.
10. Selama masih layak dijual atau belum diturunkan ke NRV, nilainya masih pada biaya; status karantina hanya mengubah ketersediaan.

## 06 — Manufacturing

1. BOM = struktur bahan; routing = urutan operasi dan work center; MRP = planned order berbasis kebutuhan; MO = eksekusi produksi.
2. Backflush otomatis mengeluarkan bahan berdasarkan output; manual issue mencatat pemakaian aktual.
3. WIP adalah aset sementara; sebelum laporan periodik harus diukur dan didukung. Tidak harus nol jika ada pekerjaan setengah jadi, tetapi tidak boleh ada saldo tak dijelaskan.
4. Pilih dua: material price variance, material usage variance, labor rate variance, labor efficiency variance.
5. Agar yield dan scrap rate memakai basis yang sama dan berjumlah 100%; planned output tidak selalu sama dengan input. **Alasan:** jika pembagi berbeda, kedua metrik tidak dapat dijumlahkan dan tidak dapat dibandingkan antar-batch.
6. Gunakan OnHold atau Scrapped; bahan/WIP yang tidak dapat dipakai dihapus ke beban scrap, bukan dikembalikan diam-diam ke stok.
7. Penjadwalan standar menempatkan work order pada kalender kerja tetapi tidak mengurutkan ulang antrean secara finite; overload hanya terlihat di Planning.
8. Hitung manual: unit selesai + unit ekuivalen di WIP akhir (kuantitas × persentase penyelesaian), lalu alokasikan biaya. **Alasan:** EUP mengubah unit setengah jadi menjadi unit ekuivalen penuh agar biaya dapat dibagi adil.
9. Co-product punya nilai signifikan dan biaya bersama dialokasikan; by-product bernilai rendah dan diakui sebesar NRV sebagai pengurang biaya produk utama.
10. Scrap menghapus nilai aset (Dr beban/Cr persediaan); hanya mengurangi kuantitas berarti nilai persediaan overstated.

## 07 — Finance

1. Cash management mengelola saldo dan transaksi harian; liquidity management merencanakan kebutuhan/pendanaan beberapa periode ke depan.
2. Karena perbedaan waktu, biaya bank, setoran transit, dan item belum tercatat; rekonsiliasi menjelaskan selisih, bukan memaksakan saldo sama.
3. Akun kliring menampung transaksi yang belum cocok; saldonya harus nol setelah semua item direkonsiliasi.
4. Forecast 13 minggu bergulir per minggu dan fokus kas; anggaran tahunan fokus rencana laba/aktivitas.
5. Realisasi sudah terjadi dan masuk P&L; belum direalisasi berasal dari penjabaran pos moneter dan dapat masuk P&L atau OCI sesuai instrumen.
6. Mencegah posting mundur, melindungi angka yang sudah dilaporkan, dan memisahkan koreksi terotorisasi.
7. Laba bukan kas; pendapatan akrual, piutang, dan persediaan dapat menyerap kas.
8. Menyembunyikan error/selisih dan berpotensi fraud; saldo suspense harus ditelusuri dan dikliring.
9. Working capital = aset lancar − liabilitas lancar; siklus kas mengukur hari dari bayar pemasok sampai terima kas pelanggan.
10. Kebijakan depresiasi, pengakuan pendapatan, dan kapitalisasi mengubah rasio; perbandingan tanpa penyesuaian menyesatkan.

## 08 — Assets

1. Dimulai saat aset tersedia untuk digunakan; berhenti saat aset dilepas atau diklasifikasikan sebagai dimiliki untuk dijual. **Alasan:** IAS 16.55 mengaitkan penyusutan dengan pola konsumsi manfaat, bukan tanggal pembayaran.
2. Cost model: biaya perolehan dikurangi akumulasi penyusutan/impairment. Revaluation model: nilai wajar saat revaluasi dikurangi penyusutan subsequent.
3. IAS 16 menerapkan kebijakan per kelas aset, bukan pilihan bebas per aset; dua model untuk satu aset membuat laporan tidak konsisten.
4. Impairment menurunkan nilai karena recoverable amount < carrying; revaluasi menyesuaikan ke nilai wajar dan selisihnya ke OCI (surplus) atau P&L.
5. Jika memperpanjang umur, meningkatkan kapasitas, atau mengganti komponen; pemeliharaan rutin dibebankan.
6. Mengalokasikan biaya ke bagian signifikan dengan umur/pola konsumsi berbeda (IAS 16.43); tidak perlu jika tidak material atau umurnya sama.
7. IAS 16 tidak menetapkan ambang persentase; 15–20% hanya heuristik kebijakan internal.
8. Sebagai koreksi kesalahan periode lalu jika material (saldo awal laba ditahan), bukan pendapatan lain-lain.
9. Penyusutan berlanjut; yang berubah adalah pusat biaya/akun beban, bukan jumlah atau umur.
10. Perubahan estimasi diterapkan prospektif dan diungkapkan; tidak retrospektif.

## 09 — Project

1. Project adalah wadah kontrak/anggaran/laba rugi; task adalah aktivitas kerja individual.
2. Planning menentukan apa yang dikerjakan; scheduling menentukan kapan dan siapa.
3. Pendapatan diakui progresif, sehingga HPP harus diakui sejalan agar laba tidak melonjak di akhir proyek. **Alasan:** prinsip matching; menahan biaya di WIP membuat margin interim overstated.
4. Fixed-price: material ke WIP lalu COGS per progres. T&M: material langsung ke beban.
5. Tagihan final, seluruh biaya terposting, WIP nol, retensi diselesaikan, dan BAST/acceptance lengkap.
6. Terminated berhenti setelah pekerjaan berjalan dan perlu penyelesaian WIP/klaim; Cancelled batal sebelum mulai.
7. Budget = pagu; commitment = PO/PR terbuka; actual = biaya terposting. Available = budget − commitment − actual.
8. Timesheet memberi biaya tenaga kerja ke proyek; payroll membayar kas ke karyawan.
9. Pendapatan bisa diakui tanpa biaya yang sepadan, sehingga margin periode salah dan WIP menggantung.
10. Review budget vs actual, change control, dan early warning atas progress/margin.

## 10 — HR dan Payroll

1. Employee master data menyimpan data individu; position management menyusun posisi dan hierarki organisasi.
2. Mencegah manipulasi gaji, mendukung audit, dan memisahkan wewenang pengubah dan penyetuju.
3. UU 13/2003 dan PP 35/2021; 5 hari kerja memakai 8 jam/hari, 6 hari memakai 7 jam/hari, lembur dihitung setelah batas itu. **Alasan:** batas harian berbeda menurut pola hari kerja, sehingga pengali harus memakai skema yang sesuai.
4. FLSA adalah hukum AS; di Indonesia lembur diatur statutori dan pengecualian manajerial tidak seluas konsep exempt.
5. Cuti tahunan adalah hak berbayar; cuti melahirkan diatur statutori; sakit dibayar bertahap dengan bukti medis sesuai aturan.
6. Karena tanggal diatur regulasi yang dapat berubah: PPh 21 kini tanggal 15 (PMK 81/2024, sebelumnya 10), BPJS Ketenagakerjaan juga tanggal 15 (PP 44/2015). Konfigurasi harus memakai tanggal berlaku, bukan hafalan.
7. Gross-up = pemberi kerja menanggung pajak karyawan; deduktibilitasnya kontensius dan perlu pendapat penasihat pajak. **Alasan:** yang menanggung dan yang memotong berbeda, sehingga perlakuan biaya/pajaknya tidak otomatis sama.
8. Reimbursement mengganti biaya aktual dengan bukti; tunjangan tetap adalah penghasilan yang pajaknya berbeda.
9. Agar biaya tenaga kerja, utang pajak/BPJS, dan kas konsisten.
10. Rekonsiliasi headcount, verifikasi rekening bank, dan pemisahan pembuat/persetuju payroll.

## 11 — Tax

1. Tarif berubah menurut regulasi; tanpa tanggal berlaku dan dasar hukum, pembaca tidak tahu periode yang dimaksud.
2. Bukan objek = di luar lingkup PPN; dibebaskan = dalam lingkup tetapi tidak dipungut; 0% = tarif nol dan input VAT dapat dikreditkan. **Alasan:** perbedaan ini menentukan apakah PPN Masukan boleh dikreditkan.
3. Tidak ada PPN Keluaran untuk dikurangkan, sehingga PPN Masukan terkait tidak dapat dikreditkan.
4. Saat pembayaran diterima jika pembayaran mendahului penyerahan, sesuai aturan saat terutang. **Alasan:** tax point memakai peristiwa paling awal antara pembayaran, penyerahan, atau faktur.
5. Faktur pajak adalah bukti legal untuk pengkreditan; faktur komersial saja tidak memberi hak kredit.
6. Saat membayar jasa/sewa kepada pihak dalam negeri; pihak yang membayar memotong dan menyetorkan.
7. PPh 21 adalah pajak penghasilan karyawan; BPJS adalah iuran jaminan sosial; dasar, tarif, dan tenggatnya berbeda.
8. DPP = 11/12 × harga jual; PPN 12% × DPP menghasilkan beban efektif 11%. **Alasan:** 12% × 11/12 = 11%; yang berubah adalah dasar, bukan tarif.
9. Koreksi fiskal menyesuaikan penghasilan kena pajak; jurnal akuntansi tetap mengikuti standar.
10. Perubahan tarif/regulasi memerlukan verifikasi sumber primer dan keputusan manusia sebelum dipublikasikan.

## 12 — Software

1. Perilaku, nama menu, dan titik posting berubah antar versi; tanpa versi, klaim tidak dapat diverifikasi.
2. Draft masih dapat diubah; posted sudah final dan koreksi memakai jurnal balik.
3. Submit membuat dokumen immutable; koreksi lewat amend atau credit/debit note.
4. Perubahan metode mengubah nilai persediaan dan COGS, bisa memerlukan perhitungan ulang dan audit.
5. Satu jurnal FI/CO dalam tabel `ACDOCA`, tanpa rekonsiliasi antar-komponen.
6. Material Ledger wajib untuk penilaian persediaan; Actual Costing hanya untuk harga aktual periodik dan bersifat opsional.
7. Tautan mati/berpindah dan klaim tidak lagi didukung; harus diverifikasi ulang.
8. Perbandingan vendor menjelaskan implementasi; konsep harus bersumber dari standar.
9. Ketika penjadwalan standar infinite capacity dan beban harus diratakan secara finite.
10. Di lingkungan uji dengan data dan skenario yang dapat direproduksi, bukan dari klaim pemasaran.

## 13 — Naventra

1. Agar artikel konsep tetap kanonik dan tidak bercampur dengan keputusan implementasi.
2. Memberi identitas unik untuk melacak keputusan dari requirement ke desain dan pengujian.
3. Requirement = apa yang dibutuhkan; design decision = solusi yang dipilih; trade-off = biaya/manfaat pilihan itu.
4. Belum ada kode, konfigurasi, atau pengujian; baseline hanya arah desain.
5. Setiap requirement tertaut ke keputusan desain dan bukti pengujian/verifikasi.
6. Menunjukkan alasan dan mencegah keputusan lama diulang tanpa konteks.
7. Mencampur implementasi dengan pembelajaran, memperbesar risiko drift, dan menyulitkan pemeliharaan.
8. Ketika constraint berubah, ada bukti baru, atau trade-off tidak lagi berlaku.
9. Karena pengujian harus dijalankan dan menghasilkan bukti, bukan disimpulkan dari dokumen.
10. Arah desain yang sudah diputuskan, belum produk yang siap dipakai.

## References

- IFRS Foundation. *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/. Diakses 26 November 2026.
- IFRS Foundation. *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/. Diakses 26 November 2026.
