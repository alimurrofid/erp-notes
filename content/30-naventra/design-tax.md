---
title: Naventra Design — tax
---

# Naventra Design — tax

## Definition

Keputusan desain Naventra yang diekstrak dari artikel `12-tax`. Teks keputusan dipindahkan apa adanya; artikel sumber menyisakan satu baris rujukan.

## NAV-D-113 — Corporate Income Tax Calculation

Sumber: [[12-tax/corporate-income-tax-calculation|Corporate Income Tax Calculation]]

Pada pengembangan ERP Naventra, modul perhitungan PPh Badan dirancang dengan fitur otomatisasi terdepan:

1. **Automated Article 31E Evaluation Engine:**
   Naventra secara otomatis mengeksekusi formula Pasal 31E saat proses penutupan tahun pajak dijalankan:
   - Menghitung total `gross_turnover` dari seluruh transaksi penjualan dan pendapatan di luar usaha.
   - Mengklasifikasikan entitas ke dalam Kategori Penuh (omzet <= 4,8M), Proporsional (4,8M < omzet <= 50M), atau Non-Fasilitas (omzet > 50M).
   - Menghitung nilai PPh terutang secara otomatis tanpa memerlukan intervensi manual.
2. **Dual Rounding Support:**
   Sistem secara otomatis menerapkan pemotongan ribuan rupiah ke bawah (*floor to thousands*) pada Dasar Pengenaan Pajak PKP sebelum mengalikan dengan tarif, menghasilkan angka yang identik dengan kertas kerja DJP.
3. **Tax Provision Workflow & Audit Trace:**
   Kalkulasi beban pajak menghasilkan dokumen draf `tax_provision_assessment` yang mencantumkan seluruh variabel perhitungan (Omzet, PKP, Fasilitas, Tarif) yang harus disetujui secara digital oleh pejabat berwenang sebelum memicu jurnal buku besar.

## NAV-D-114 — Corporate Income Tax Fundamentals

Sumber: [[12-tax/corporate-income-tax-fundamentals|Corporate Income Tax Fundamentals]]

Pada rancangan sistem ERP Naventra, pengelolaan PPh Badan diimplementasikan melalui pendekatan modern:

1. **Transaction-Level Tax Tagging:**
   Setiap pembuatan akun beban pada Chart of Accounts dilengkapi atribut default `fiscal_treatment` (`FULLY_DEDUCTIBLE`, `NON_DEDUCTIBLE_PERMANENT`, `NON_DEDUCTIBLE_TEMPORARY`). Saat jurnal dibukukan, tag ini otomatis melekat pada baris transaksi.
2. **Dedicated Fiscal Adjustment Worksheet:**
   Naventra menyediakan modul kertas kerja rekonsiliasi fiskal virtual yang memungkinkan penyesuaian koreksi fiskal akhir tahun tanpa harus memposting jurnal balik ke buku besar komersial.
3. **Integrated Tax Asset Depreciation Schedule:**
   Naventra secara otomatis mengelola dua jadwal depresiasi untuk setiap aktiva tetap: jadwal depresiasi komersial dan jadwal depresiasi fiskal sesuai kelompok tarif pajak Indonesia, menghasilkan perhitungan beda temporer secara instan.

## NAV-D-115 — Corporate Tax Installment and Prepayment

Sumber: [[12-tax/corporate-tax-installment-and-prepayment|Corporate Tax Installment and Prepayment]]

Pada rancangan sistem ERP Naventra, pengelolaan angsuran dan kredit pajak badan dikembangkan dengan mekanisme berikut:

1. **Automated Payment Voucher Generation:**
   Setiap tanggal 5 setiap bulan, Naventra secara otomatis membuat draf *Payment Voucher* untuk angsuran PPh Pasal 25 yang menampilkan nominal angsuran aktif, siap disetujui oleh manajer keuangan sebelum batas waktu tanggal 15.
2. **Automatic Baseline Switching (April Transition):**
   Naventra secara otomatis menerapkan besaran angsuran baru pada modul pembayaran rutin segera setelah draf SPT Tahunan berstatus `FINAL_APPROVED`, menggantikan baseline masa Desember tahun lalu secara mulus.
3. **Tax Credit Matching Lock:**
   Sistem mengunci (*lock*) catatan Uang Muka PPh yang telah dipasangkan dengan laporan SPT Tahunan, mencegah pembatalan transaksi masa lampau yang dapat merusak saldo kredit pajak yang telah dilaporkan.

## NAV-D-116 — Input VAT and Output VAT

Sumber: [[12-tax/input-vat-and-output-vat|Input VAT and Output VAT]]

Pada pengembangan sistem ERP Naventra, pengelolaan PPN Masukan dan Keluaran dirancang dengan mekanisme kendali berikut:

1. **Explicit Deductibility Flag:**
   Setiap baris penerimaan tagihan vendor (`purchase_invoice_lines`) memiliki kolom boolean `is_creditable`. Jika dinonaktifkan oleh petugas pajak, sistem secara otomatis menawarkan opsi:
   - Kapitalisasi ke akun aset terkait (`capitalize_to_cost = TRUE`).
   - Alokasi ke akun beban non-deductible fiskal (`account_id = GL_619100`).
2. **Independent VAT Period Field:**
   Naventra memisahkan `posting_date` (tanggal pengakuan jurnal AP) dari `vat_filing_period` (format `YYYY-MM`). Staf perpajakan dapat mengubah `vat_filing_period` sepanjang masih dalam rentang 3 bulan kalender sejak tanggal faktur tanpa membatalkan jurnal akuntansi.
3. **Pemberitahuan Kadaluwarsa Faktur Masukan (Expiry Alert):**
   Sistem secara otomatis menampilkan peringatan pada dasbor pajak jika terdapat Faktur Masukan belum dikreditkan yang usianya telah mendekati batas akhir 3 bulan, mencegah hilangnya hak kredit pajak perusahaan.

## NAV-D-117 — Tax Closing and Period-End

Sumber: [[12-tax/tax-closing-and-period-end|Tax Closing and Period-End]]

Pada pengembangan ERP Naventra, fitur penutupan pajak akhir periode dirancang dengan arsitektur ketat:

1. **Automated Period Gatekeeper:**
   Naventra menerapkan validasi otomatis pada tingkat API/basis data: transaksi apa pun dengan `tax_point_date` di dalam rentang periode `status = 'LOCKED'` akan secara otomatis ditolak (*HTTP 403 Forbidden: Tax Period Locked*).
2. **Interactive Tax Close Checklist:**
   Manajer Pajak disediakan dasbor interaktif 9 langkah penutupan bulanan. Tombol `Lock Period` tidak dapat ditekan sebelum seluruh indikator rekonsiliasi dan verifikasi dokumen menunjukkan tanda centang hijau.
3. **Integrated Amendment Versioning:**
   Jika pembukaan kunci darurat disetujui, Naventra menandai seluruh entri penyesuaian dengan label `amendment_version_id`, mengisolasi transaksi koreksi tersebut sehingga langsung terpetakan ke SPT Pembetulan tanpa merusak integritas arsip SPT Normal awal.

## NAV-D-118 — Tax Controls, Audit, and Compliance

Sumber: [[12-tax/tax-controls-audit-and-compliance|Tax Controls, Audit, and Compliance]]

Pada pengembangan ERP Naventra, kerangka kepatuhan dan audit perpajakan dibangun dengan fondasi ketat:

1. **Mandatory Ledger Lock on Tax Accounts:**
   Seluruh akun GL yang memiliki tipe `TAX_CLEARING`, `TAX_PAYABLE`, atau `PREPAID_TAX` secara baku dikunci dari formulir *Manual Journal Entry*. Mutasi akun hanya dapat terjadi melalui mesin posting otomatis dari modul dokumen transaksi.
2. **Built-in SP2DK Assistant:**
   Naventra menyertakan fitur *SP2DK Reconciliation Assistant*: pengguna cukup menginput nomor SP2DK dan memilih masa pajak yang dipersoalkan, lalu sistem secara otomatis menghasilkan berkas PDF tanggapan resmi yang memuat lembar ekualisasi, daftar faktur, dan bukti bayar bank.
3. **Cryptographic Log Immutability:**
   Setiap transaksi pengunggahan, pembatalan, dan penggantian faktur pajak dicatat dengan tanda tangan kriptografi (hash SHA-256) pada tabel `tax_compliance_audit_ledger` guna memproteksi integritas data riwayat audit dari manipulasi tidak terotorisasi.

## NAV-D-119 — Tax Determination and Tax Rules

Sumber: [[12-tax/tax-determination-and-tax-rules|Tax Determination and Tax Rules]]

Pada arsitektur ERP Naventra, modul penentuan pajak dirancang dengan spesifikasi teknis berikut:

1. **Deterministic Rule Engine (Pipeline Pattern):**
   Naventra mengimplementasikan *tax determination pipeline* berurutan:
   - *Phase 1:* Verifikasi Alamat Pengiriman (*Jurisdiction / FTZ check*).
   - *Phase 2:* Verifikasi Kategori Subjek Pajak (*WAPU / Tax-Exempt Entity check*).
   - *Phase 3:* Verifikasi Kategori Objek Pajak (*Non-BKP / Special Scheme check*).
   - *Phase 4:* Penentuan Jadwal Tarif Aktif & Faktor DPP (*Effective Date & DPP factor lookup*).
2. **Immutable Trace Logging:**
   Setiap hasil penentuan kode pajak pada dokumen final disimpan beserta `rule_id` yang terpicu ke dalam tabel `tax_determination_audit_log`, memudahkan audit perpajakan internal dalam meneliti dasar hukum penetapan pajak transaksi masa lampau.
3. **Strict Validation Engine:**
   Sistem menolak posting transaksi jika terdeteksi inkonsistensi data, misalnya transaksi penjualan ke entitas WAPU yang secara manual diisi kode pajak reguler non-WAPU.

## NAV-D-120 — Tax Integration

Sumber: [[12-tax/tax-integration|Tax Integration]]

Pada perancangan arsitektur terintegrasi ERP Naventra, modul perpajakan dirancang dengan pertimbangan arsitektur berikut:

1. **Centralized Tax Event Bus (Publish-Subscribe Pattern):**
   Naventra menggunakan pola *Event-Driven Architecture*. Setiap kali modul operasional memicu peristiwa bisnis yang memiliki implikasi pajak (misalnya `INVOICE_POSTED`, `PAYMENT_RECEIVED`, `GOODS_SCRAPPED`), peristiwa tersebut dipublikasikan ke antrean *Tax Event Bus* untuk diproses secara asinkron tanpa membebani performa modul utama.
2. **Universal Tax Ledger & Subledger Binding:**
   Seluruh catatan transaksi pajak disimpan dalam tabel terpadu `tax_subledger_entries` yang menghubungkan modul transaksi asal (`source_module`), nomor dokumen komersial (`source_document_id`), nomor dokumen pajak resmi (`official_tax_document_no`), serta nomor jurnal buku besar (`gl_voucher_id`).
3. **Cross-Module Pre-Closing Guard:**
   Modul penutupan akuntansi Naventra tidak mengizinkan penutupan periode finansial jika terdapat modul operasional yang belum menyelesaikan status pajaknya (misalnya masih terdapat faktur penjualan yang belum dialokasikan nomor serinya atau tagihan jasa yang belum dibuatkan bukti potongnya).

## NAV-D-121 — Tax Management Fundamentals

Sumber: [[12-tax/tax-management-fundamentals|Tax Management Fundamentals]]

Dalam pengembangan ERP Naventra, modul perpajakan dirancang dengan prinsip-prinsip arsitektur berikut:

1. **Tax Engine Standalone Service:**
   Hindari menempelkan (*hardcode*) rumus perhitungan pajak di dalam kode modul Sales Order atau Purchase Order. Bangun layanan `TaxCalculationEngine` yang independen yang menerima model transaksi dan menghasilkan respons pajak terstruktur.
2. **Mandatory Effective Dating & Flexible DPP Formula:**
   Setiap `tax_code` di Naventra wajib memiliki tabel relasional `tax_rates` dengan kolom `valid_from`, `valid_to`, dan `dpp_factor` (misal 11/12 untuk penyerahan non-mewah sesuai PMK 131/2024 jo PMK 11/2025). Hal ini membantu memastikan transaksi tanggal lampau yang di-repost tidak akan mengalami distorsi tarif saat terjadi perubahan regulasi.
3. **Pemisahan Akun Komersial vs Fiskal:**
   Naventra secara ketat memisahkan kode akun penampung pajak dari pendapatan/beban murni, sehingga mempermudah penyusunan laporan keuangan komersial dan rekonsiliasi fiskal tahunan tanpa perlu penyesuaian manual di luar sistem.
4. **Audit Immutability:**
   Setiap transaksi pajak yang telah disetujui di portal otoritas perpajakan dikunci (*immutable*). Pembatalan atau revisi transaksi hanya dapat dilakukan melalui mekanisme pembuatan dokumen penyesuaian/pembatalan resmi dan jurnal pembalik.

## NAV-D-122 — Tax Master Data and Tax Code

Sumber: [[12-tax/tax-master-data-and-tax-code|Tax Master Data and Tax Code]]

Pada implementasi ERP Naventra, arsitektur master data perpajakan dibangun dengan fondasi relasional yang kokoh:

1. **Relasi Granular `tax_codes` dan `tax_rates`:**
   Tabel `tax_codes` bertindak sebagai *header* deklaratif, sementara tabel `tax_rates` menampung riwayat tarif berbasis tanggal:
   ```sql
   CREATE TABLE tax_rates (
       id UUID PRIMARY KEY,
       tax_code_id UUID REFERENCES tax_codes(id),
       rate_percentage DECIMAL(5,2) NOT NULL,
       valid_from DATE NOT NULL,
       valid_to DATE,
       is_active BOOLEAN DEFAULT TRUE
   );
   ```
2. **Kategori Deterministik:**
   Naventra mewajibkan setiap kode pajak memiliki relasi langsung ke `tax_type` (`VAT`, `WHT_21`, `WHT_23`, `WHT_4_2`, `CIT`) dan `reporting_box` (nomor formulir SPT) guna mengotomatisasi penyusunan laporan SPT tanpa proses pemetaan manual di akhir periode.
3. **Pemberian Hak Akses Terbatas:**
   Hanya staf dengan wewenang *Tax Administrator* atau *Financial Controller* yang memiliki izin untuk membuat atau mengubah data master pajak. Perubahan langsung dicatat ke tabel `tax_master_audit_trail`.

## NAV-D-123 — Tax Payment and Tax Return

Sumber: [[12-tax/tax-payment-and-tax-return|Tax Payment and Tax Return]]

Pada rancangan sistem ERP Naventra, modul pembayaran dan pelaporan perpajakan dikembangkan dengan standar otomasi tinggi:

1. **Integrated Tax Payment Voucher:**
   Naventra membuat dokumen `tax_payment_voucher` yang menggabungkan informasi KAP, KJS, ID Billing, masa pajak, tahun pajak, dan nomor rekening sumber secara otomatis dari hasil rekonsiliasi pajak.
2. **Automated NTPN Verification Hook:**
   Setelah kasir menginput nomor NTPN dari bukti bayar perbankan, sistem memicu *webhook* validasi ke gateway DJP untuk memastikan dana telah benar-benar masuk ke kas negara sebelum mengizinkan tombol `Submit SPT` diaktifkan.
3. **Immutable Compliance Binding:**
   Ketika status SPT berubah menjadi `FILED`, seluruh berkas digital (kertas kerja rekonsiliasi, PDF laporan, NTPN, dan BPE) digabungkan menjadi berkas arsip ber-hash kriptografi unik yang tidak dapat dimodifikasi oleh pengguna mana pun.

## NAV-D-124 — Tax Reporting and Tax Analytics

Sumber: [[12-tax/tax-reporting-and-tax-analytics|Tax Reporting and Tax Analytics]]

Pada arsitektur ERP Naventra, fitur pelaporan dan analitika perpajakan dirancang dengan pendekatan desain teknis berikut:

1. **Built-in Equalization Dashboard:**
   Naventra menyajikan modul *Tax Equalization Workbench* yang secara *real-time* menghitung selisih antara akun Laba Rugi komersial dan Dasar Pengenaan Pajak per jenis pajak (PPN, PPh 21, PPh 23, PPh 4(2)) tanpa memerlukan proses ekstraksi manual.
2. **Tax Risk Early Warning System (SP2DK Radar):**
   Sistem secara otomatis mendeteksi anomali transaksi yang sering menjadi pemicu surat himbauan pajak, seperti lonjakan rasio biaya promosi terhadap omzet atau transaksi dengan lawan transaksi yang teridentifikasi bermasalah.
3. **Multi-Format Statutory Generator:**
   Naventra menyediakan konverter data terintegrasi yang mampu menghasilkan berkas CSV impor e-Faktur lama, format XML e-Bupot Unifikasi, hingga konektor API langsung ke sistem Coretax DJP.

## NAV-D-125 — Taxable Base and Tax Calculation

Sumber: [[12-tax/taxable-base-and-tax-calculation|Taxable Base and Tax Calculation]]

Pada pengembangan ERP Naventra, modul kalkulasi pajak dibangun dengan spesifikasi teknis berikut:

1. **Explicit Line-Level Calculation:**
   Naventra menerapkan pendekatan *Line-by-Line Tax Calculation* untuk mendukung konsistensi dengan validasi sistem perpajakan resmi:
   $$\text{Tax Line} = \text{Round}(\text{DPP Line} \times \text{Rate}, 0)$$
   $$\text{Total Document Tax} = \sum \text{Tax Line}$$
2. **Tabel Kurs Terpisah (Dual Currency Exchange Tables):**
   Naventra memisahkan penyimpanan kurs operasional (`exchange_rates`) dan kurs fiskal resmi (`tax_exchange_rates`):
   ```sql
   CREATE TABLE tax_exchange_rates (
       id UUID PRIMARY KEY,
       currency_code VARCHAR(3) NOT NULL,
       kmk_decree_number VARCHAR(100) NOT NULL,
       exchange_rate DECIMAL(18,4) NOT NULL,
       valid_from DATE NOT NULL,
       valid_to DATE NOT NULL
   );
   ```
3. **Audit Immutability of Calculated Base:**
   Setelah faktur diterbitkan, nilai `base_amount`, `tax_amount`, dan `tax_exchange_rate_applied` disimpan secara permanen pada baris invoice untuk mencegah perhitungan ulang yang tidak disengaja jika tabel kurs diperbarui di masa mendatang.

## NAV-D-126 — Taxable Income and Fiscal Reconciliation

Sumber: [[12-tax/taxable-income-and-fiscal-reconciliation|Taxable Income and Fiscal Reconciliation]]

Pada arsitektur ERP Naventra, modul rekonsiliasi fiskal dirancang dengan pendekatan tata kelola data berikut:

1. **COA-Level Fiscal Classification:**
   Setiap akun dalam Chart of Accounts Naventra memiliki atribut wajib:
   - `is_tax_deductible` (Boolean).
   - `fiscal_correction_type` (`NONE`, `POSITIVE_PERMANENT`, `POSITIVE_TEMPORARY`, `NEGATIVE_FINAL`, `NEGATIVE_TEMPORARY`).
   - `spt_1771_line_mapping` (Nomor baris Formulir 1771-I).
2. **Nominative Document Management Portal:**
   Naventra menyediakan antarmuka khusus di mana departemen pemasaran wajib melampirkan daftar tamu/penerima promosi pada saat mengajukan klaim penggantian biaya (*expense claim*). Jika tidak dilampirkan, sistem otomatis mengalokasikan beban ke sub-akun *Non-Deductible*.
3. **Zero-Impact Financial Statements:**
   Seluruh kalkulasi rekonsiliasi fiskal dijalankan di memori komputasi analitis (*analytical layer*), sehingga Laporan Laba Rugi Komersial yang disajikan kepada pemegang saham tidak terdistorsi oleh aturan teknis perpajakan.

## NAV-D-127 — VAT Fundamentals

Sumber: [[12-tax/vat-fundamentals|VAT Fundamentals]]

Pada pengembangan ERP Naventra, modul PPN fundamental dirancang dengan prinsip keandalan berikut:

1. **Otomatisasi Tax Point Trigger:**
   Naventra secara otomatis mendeteksi apakah penerimaan uang muka (*Customer Advance Receipt*) terjadi sebelum pengiriman fisik (*Goods Delivery*). Jika uang muka diterima, sistem mewajibkan penerbitan Faktur Pajak Uang Muka pada tanggal penerimaan kas tersebut.
2. **Pemisahan Tegas Akun Settlement:**
   Naventra tidak mengizinkan pembayaran kas dialokasikan langsung ke akun `PPN Keluaran`. Seluruh transaksi pelunasan PPN ke kas negara wajib melalui akun kliring `Utang PPN Settlement` yang terbentuk dari proses penutupan masa pajak resmi.
3. **Validasi Status PKP Internal dan Eksternal:**
   Jika entitas internal perusahaan belum berstatus PKP, Naventra menonaktifkan pemungutan PPN Keluaran pada modul Sales secara otomatis guna mencegah penagihan pajak ilegal.

## NAV-D-128 — VAT Return and Reconciliation

Sumber: [[12-tax/vat-return-and-reconciliation|VAT Return and Reconciliation]]

Pada pengembangan ERP Naventra, fitur rekonsiliasi dan pelaporan SPT Masa dirancang dengan kendali otomatisasi tinggi:

1. **Integrated 3-Way Reconciliation Screen:**
   Naventra menyediakan dasbor visual yang menampilkan perbandingan sisi berdampingan (*side-by-side comparison*) antara Subledger AR/AP, Akun Buku Besar Pajak, dan Register e-Faktur. Selisih numerik ditampilkan dengan penanda warna merah dan dapat ditelusuri langsung ke dokumen sumber.
2. **Two-Stage Period Locking Mechanism:**
   Naventra menerapkan penguncian dua tahap:
   - *Soft Lock:* Mengunci entri data bagi staf operasional saat proses rekonsiliasi dimulai oleh tim perpajakan.
   - *Hard Lock:* Mengunci seluruh dokumen secara permanen setelah nomor Bukti Penerimaan Elektronik (BPE) dan Nomor Transaksi Penerimaan Negara (NTPN) diinput ke dalam sistem.
3. **Automated SPT Pembetulan Tracking:**
   Ketika koreksi transaksi masa lampau disetujui, Naventra secara otomatis membuat draf *Tax Return Amendment* (SPT Pembetulan) dengan menghitung nilai inkremental kurang bayar beserta potensi sanksi bunga administrasi.

## NAV-D-129 — VAT Transaction and Tax Invoice

Sumber: [[12-tax/vat-transaction-and-tax-invoice|VAT Transaction and Tax Invoice]]

Pada pengembangan modul Faktur Pajak di ERP Naventra, arsitektur dirancang dengan fokus pada kepatuhan modern:

1. **Direct Coretax API Adapter:**
   Naventra memprioritaskan integrasi langsung (*direct adapter*) ke sistem Coretax DJP untuk mengirimkan data faktur secara *real-time* dan menerima nomor faktur resmi yang dihasilkan sistem.
2. **Pre-Flight Validation Engine:**
   Sebelum berkas dikirimkan ke gateway pajak, Naventra menjalankan validasi internal:
   - Memastikan NPWP/NIK/NITKU valid dan terdaftar.
   - Memastikan tanggal dokumen selaras dengan aturan pisah batas (*tax point*).
   - Memvalidasi Dasar Pengenaan Pajak (apakah menggunakan DPP Standar atau DPP Nilai Lain 11/12).
3. **State Machine Faktur Terpadu:**
   Status faktur dikelola melalui siklus hidup: `Draft` -> `Queued for Submission` -> `Approved` -> `Amendment In Progress` -> `Cancelled`. Faktur berstatus `Approved` dikunci (*read-only*) permanen di buku besar komersial.

## NAV-D-130 — Withholding Tax Management

Sumber: [[12-tax/withholding-tax-management|Withholding Tax Management]]

Pada perancangan modul Withholding Tax di ERP Naventra, fitur-fitur berikut diimplementasikan:

1. **Dual-Trigger Withholding Engine:**
   Naventra mendukung konfigurasi saat pemotongan pajak:
   - *Option A (Default Indonesia):* Terpotong saat pengakuan faktur tagihan (*Invoice Posting*).
   - *Option B:* Terpotong saat eksekusi pembayaran kas (*Payment Settlement*).
2. **Automated Gross-Up Calculator:**
   Pada baris tagihan jasa vendor, disediakan sakelar (*toggle*) `Is Gross-Up`. Saat diaktifkan, sistem secara otomatis menghitung ulang nilai DPP dan PPh tanpa memerlukan perhitungan manual di luar sistem.
3. **Bukti Potong Reconciliation Matrix:**
   Naventra menyediakan tabel verifikasi bukti potong pelanggan (`customer_tax_withholding_slips`). Staf pajak dapat mencentang status verifikasi dokumen fisik sebelum kredit pajak diikutsertakan dalam rekonsiliasi SPT Tahunan PPh Badan.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-113 | `12-tax/corporate-income-tax-calculation.md` | Adopted |
| NAV-D-114 | `12-tax/corporate-income-tax-fundamentals.md` | Adopted |
| NAV-D-115 | `12-tax/corporate-tax-installment-and-prepayment.md` | Adopted |
| NAV-D-116 | `12-tax/input-vat-and-output-vat.md` | Adopted |
| NAV-D-117 | `12-tax/tax-closing-and-period-end.md` | Adopted |
| NAV-D-118 | `12-tax/tax-controls-audit-and-compliance.md` | Adopted |
| NAV-D-119 | `12-tax/tax-determination-and-tax-rules.md` | Adopted |
| NAV-D-120 | `12-tax/tax-integration.md` | Adopted |
| NAV-D-121 | `12-tax/tax-management-fundamentals.md` | Adopted |
| NAV-D-122 | `12-tax/tax-master-data-and-tax-code.md` | Adopted |
| NAV-D-123 | `12-tax/tax-payment-and-tax-return.md` | Adopted |
| NAV-D-124 | `12-tax/tax-reporting-and-tax-analytics.md` | Adopted |
| NAV-D-125 | `12-tax/taxable-base-and-tax-calculation.md` | Adopted |
| NAV-D-126 | `12-tax/taxable-income-and-fiscal-reconciliation.md` | Adopted |
| NAV-D-127 | `12-tax/vat-fundamentals.md` | Adopted |
| NAV-D-128 | `12-tax/vat-return-and-reconciliation.md` | Adopted |
| NAV-D-129 | `12-tax/vat-transaction-and-tax-invoice.md` | Adopted |
| NAV-D-130 | `12-tax/withholding-tax-management.md` | Adopted |

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
