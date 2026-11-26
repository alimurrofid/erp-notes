---
title: Naventra Design — assets
---

# Naventra Design — assets

## Definition

Keputusan desain Naventra yang diekstrak dari artikel `09-assets`. Teks keputusan dipindahkan apa adanya; artikel sumber menyisakan satu baris rujukan.

## NAV-D-062 — Asset Acquisition & Capitalization

Sumber: [[09-assets/asset-acquisition-and-capitalization|Asset Acquisition & Capitalization]]

Rancangan arsitektur perolehan dan kapitalisasi aset tetap pada Naventra ERP:

1. **Asset Clearing Reconciliation Engine**: Naventra mengunci seluruh perolehan aset melalui akun perantara `Fixed Asset Clearing` (`159100`). Modul menyediakan dasbor rekonsiliasi yang memvalidasi bahwa total invoice vendor pendukung sama persis dengan total nominal yang dikapitalisasi sebelum status aset dialihkan ke `CAPITALIZED`.
2. **Staged CWIP Settlement Pipeline**: Untuk proyek konstruksi atau perakitan mandiri, Naventra memelihara tabel `cwip_cost_allocations`. Biaya material gudang, jasa subkontraktor, dan upah internal dapat dialokasikan ke satu atau banyak nomor aset definitif (*Split Settlement*) dengan persentase atau nominal tetap.
3. **Automated Non-Capitalizable Cost Filter**: Formulir pengadaan barang modal Naventra menyertakan kotak centang (*Expense Allocation Rule*) yang secara otomatis memisahkan baris pelatihan (*training*) atau biaya pembukaan (*opening expenses*) ke akun beban operasional saat transaksi faktur vendor diproses.

## NAV-D-063 — Asset Classification & Hierarchy

Sumber: [[09-assets/asset-classification|Asset Classification & Hierarchy]]

Rancangan arsitektur modul Asset Classification pada Naventra ERP:

1. **Hierarchical Class Inheritance**: Naventra menyusun kelas aset dalam hierarki pohon (*tree structure*), misal: `TANGIBLE` $\rightarrow$ `MACHINERY` $\rightarrow$ `PROD_SMT_LINE`. Sub-kelas secara otomatis mewarisi pemetaan akun GL dan aturan validasi dari kelas induknya, namun dapat mengesampingkan (*override*) parameter masa manfaat default.
2. **Built-in Tri-Dimensional Mapping Matrix**: Setiap kelas aset di Naventra memiliki tabel relasi bawaan yang menghubungkan kode kelas komersial, kode golongan fiskal perpajakan, dan kategori peralatan pemeliharaan pabrik, mencegah redundansi pengisian data oleh staf operasional.
3. **Automated Fiscal Difference Calculation**: Naventra secara otomatis membandingkan akumulasi penyusutan komersial vs penyusutan fiskal dan menyediakan laporan *Tax Reconciliation Bridge* siap pakai untuk lampiran SPT Pajak Penghasilan Badan.

## NAV-D-064 — Asset Componentization

Sumber: [[09-assets/asset-componentization|Asset Componentization]]

Rancangan arsitektur Asset Componentization pada Naventra ERP:

1. **Asset Tree-Node Data Model**: Naventra menyusun aset dalam struktur pohon berindeks (`parent_asset_id`, `node_level`, `is_composite`). Pengguna dapat melihat total nilai buku bersih aset induk yang dihitung secara dinamis (*aggregated rollup*) dari penjumlahan seluruh node sub-komponen di bawahnya.
2. **Automated Component Replacement Wizard**: Naventra menyediakan antarmuka khusus *Replace Component*. Operator cukup memilih sub-aset yang diganti, menginput dokumen pembelian suku cadang pengganti, dan sistem secara atomik mengeksekusi penghapusan buku komponen lama serta pendaftaran komponen baru dalam satu kesatuan transaksi data.
3. **Synchronized Inspection Overhaul Allocation**: Untuk pemeliharaan berkala besar (*Major Overhauls*), Naventra mengizinkan pembentukan sub-aset bertipe `INSPECTION_COMPONENT` yang secara otomatis disusutkan hingga tanggal target inspeksi besar berikutnya tiba.

## NAV-D-065 — Asset Controls & Governance

Sumber: [[09-assets/asset-controls-and-governance|Asset Controls & Governance]]

Rancangan arsitektur modul Asset Controls & Governance pada Naventra ERP:

1. **Native Asset SoD Matrix Engine**: Naventra memelihara tabel matriks benturan peran `asset_sod_rules`. Setiap kali administrator menetapkan hak akses baru kepada staf, sistem mengevaluasi potensi konflik secara *real-time* dan menolak kombinasi beracun (misal: merangkap sebagai *Asset Custodian* sekaligus *Asset Write-Off Approver*).
2. **Cryptographic Append-Only Custody Log**: Riwayat penyerahan aset, pemindahan ruangan, dan pergantian penanggung jawab dicatat ke dalam tabel log partisi yang diamankan dengan *SHA-256 Hash Chaining*, dirancang untuk mengurangi risiko manipulasi atau penghapusan jejak histori tanpa terdeteksi.
3. **Dual-Key Break-Glass Disposal Protocol**: Untuk transaksi penghapusan buku (*write-off*) atas aset bernilai material, Naventra mewajibkan otentikasi ganda (*Two-Factor Dual Signoff*) dari Manajer Pabrik dan Direktur Keuangan secara bersamaan sebelum jurnal penghapusan diposting ke General Ledger.

## NAV-D-066 — Asset Disposal & Retirement

Sumber: [[09-assets/asset-disposal-and-retirement|Asset Disposal & Retirement]]

Rancangan arsitektur modul Asset Disposal & Retirement pada Naventra ERP:

1. **Guided Disposal Wizard**: Naventra memandu pengguna melalui wizard pelepasan multi-langkah: (1) Verifikasi tanggal efektif pelepasan $\rightarrow$ (2) Pemilihan saluran pelepasan (*Sale*, *Scrap*, *Donation*, *Loss*) $\rightarrow$ (3) Input pembeli dan harga jual $\rightarrow$ (4) Pratinjau simulasi jurnal dan laba/rugi pelepasan secara seketika.
2. **Automated Tax Compliance Integration**: Saat tipe pelepasan *Sale to Customer* dipilih, Naventra secara otomatis memicu pembuatan dokumen *Tax Invoice* (Faktur Pajak PPN 16D) dan mengalokasikan nilai PPN ke akun kewajiban pajak yang tepat.
3. **Atomic Derecognition Engine**: Seluruh rangkaian transaksi—penyusutan periode terakhir, penghapusan nilai aset di neraca, pengakuan kas/piutang, dan penguncian status master aset menjadi `DISPOSED`—dieksekusi dalam satu transaksi basis data atomik (*single ACID transaction*).

## NAV-D-067 — Asset Impairment Management

Sumber: [[09-assets/asset-impairment|Asset Impairment Management]]

Rancangan arsitektur modul Asset Impairment pada Naventra ERP:

1. **Impairment Test Workbench**: Naventra menyediakan antarmuka kerja analitik yang memandu Controller: memilih aset/CGU, menginput nilai FVLCOD dan estimasi arus kas DCF untuk menghitung VIU secara otomatis, serta menampilkan rekomendasi nilai penurunan nilai.
2. **Ceiling-Enforced Reversal Engine**: Saat pembalikan penurunan nilai diinisiasi, sistem Naventra menghitung secara dinamis batas atas nilai buku historis tanpa penurunan nilai (*Theoretical Unimpaired Carrying Amount*). Sistem secara otomatis menolak nilai pembalikan yang melampaui batas tersebut.
3. **Automated Subledger-to-Schedule Hook**: Pengesahan dokumen penurunan nilai secara seketika memperbarui field `current_carrying_amount` pada tabel master aset dan secara otomatis meregenerasi sisa baris jadwal penyusutan di masa depan.

## NAV-D-068 — Asset Maintenance Integration

Sumber: [[09-assets/asset-maintenance-integration|Asset Maintenance Integration]]

Rancangan arsitektur integrasi pemeliharaan dan aset tetap pada Naventra ERP:

1. **Bi-Directional Maintenance Ledger**: Setiap nomor aset pada Naventra memiliki tab riwayat pemeliharaan terpadu yang merangkum seluruh tiket perintah kerja (*Work Orders*), daftar suku cadang yang pernah diganti, teknisi penanggung jawab, dan total akumulasi biaya perawatan (*lifetime maintenance cost*).
2. **Automated Replacement Sweet-Spot Detector**: Naventra menyertakan algoritma analitik yang membandingkan kurva depresiasi aset dengan kurva eskalasi biaya pemeliharaan. Jika laju kenaikan biaya perawatan melampaui ambang toleransi, sistem memicu notifikasi rekomendasi penggantian aset kepada Head of Operations.
3. **Production Schedule Synchronization**: Penjadwalan perawatan pada modul pemeliharaan secara otomatis mengirimkan sinyal pemblokiran kapasitas ke modul *Shop Floor Scheduling* untuk mencegah penugasan *Manufacturing Order* pada mesin yang sedang dalam masa servis.

## NAV-D-069 — Asset Master Data

Sumber: [[09-assets/asset-master-data|Asset Master Data]]

Rancangan arsitektur data master aset tetap pada Naventra ERP:

1. **Entity-Component-Value Architecture**: Naventra membagi data aset menjadi tiga tabel relasional normal:
   - `asset_core`: Menyimpan identitas legal, nama, kelas aset, dan status siklus hidup.
   - `asset_physical`: Menyimpan lokasi fisik, geolokasi, penanggung jawab (*custodian*), nomor seri sasis, dan tanggal garansi.
   - `asset_valuation_book`: Menyimpan parameter buku komersial dan fiskal, harga perolehan, estimasi residu, dan masa manfaat secara multi-baris.
2. **Strict Change Control with Approval Workflow**: Modifikasi pada atribut finansial (seperti perubahan masa manfaat atau nilai sisa) memerlukan tiket persetujuan (*Change Request*) yang disahkan oleh Financial Controller sebelum diterapkan pada jadwal penyusutan aktif.
3. **Immutable Audit Trail on Custody Movement**: Setiap kali field *Custodian* atau *Location* diperbarui, Naventra secara otomatis menyisipkan rekaman ke tabel `asset_custody_history` lengkap dengan stempel waktu dan ID dokumen mutasi pendukung.

## NAV-D-070 — Asset Reporting & Analytics

Sumber: [[09-assets/asset-reporting-and-analytics|Asset Reporting & Analytics]]

Rancangan arsitektur modul Asset Reporting & Analytics pada Naventra ERP:

1. **Real-Time Materialized Roll-Forward Cube**: Naventra memelihara tabel agregasi terindeks `asset_rollforward_summary` yang diperbarui secara otomatis saat transaksi perolehan, penyusutan bulanan, revaluasi, atau pelepasan terjadi. Hal ini memungkinkan Laporan Mutasi Aset (Asset History Sheet) dibuka seketika tanpa perlu memindai jutaan baris jurnal historis.
2. **Automated Subledger-to-GL Health Checker**: Sistem menjalankan daemon validasi harian yang membandingkan saldo subledger aset dengan saldo akun neraca GL. Jika terdeteksi selisih sekecil apa pun, sistem memicu peringatan kritis (*Integrity Breached Alert*) ke dashboard CFO.
3. **Interactive Executive Asset Cockpit**: Naventra menyediakan dasbor visual interaktif yang menyajikan metrik TCO, rasio utilisasi mesin, persentase penyerapan anggaran CAPEX, dan grafik penuaan aset (*Asset Aging Pyramid*) dengan kemampuan *drill-down* langsung hingga ke foto fisik aset di lantai pabrik.

## NAV-D-071 — Asset Revaluation

Sumber: [[09-assets/asset-revaluation|Asset Revaluation]]

Rancangan arsitektur modul Asset Revaluation pada Naventra ERP:

1. **Revaluation Batch Transaction**: Naventra mengeksekusi revaluasi melalui dokumen `asset_revaluation_batch` yang mewajibkan penentuan kode kelas aset dan unggahan berkas audit penilai independen. Seluruh aset aktif dalam kelas tersebut dievaluasi serentak.
2. **Dual-Method Calculation Engine**: Pengguna dapat memilih metode pencatatan (*Elimination Method* vs *Proportional Restatement*). Sistem secara otomatis menghitung faktor pengali proporsional dan menghasilkan baris jurnal balancing ke akun `Revaluation Surplus (OCI)`.
3. **Automated Equity Amortization Hook**: Naventra menyediakan fitur otomatisasi bulanan (*Surplus Amortization Hook*) yang bersamaan dengan eksekusi *Depreciation Run* mendebit akun *Revaluation Surplus* dan mengkredit akun *Retained Earnings* sebesar selisih penyusutan revaluasi vs historis.

## NAV-D-072 — Asset Transfer & Location Tracking

Sumber: [[09-assets/asset-transfer-and-location|Asset Transfer & Location Tracking]]

Rancangan arsitektur Asset Transfer pada Naventra ERP:

1. **Transactional Asset Movement Document**: Naventra tidak mengizinkan pengubahan langsung field lokasi atau penanggung jawab pada layar master data. Seluruh mutasi wajib melalui dokumen transaksi `asset_transfer_order` yang mencatat alasan bisnis, pengirim, penerima, dan tanda tangan digital BAST.
2. **Time-Slice Interval Engine**: Tabel master aset Naventra memelihara tabel relasional berdimensi waktu `asset_assignments` (`cost_center_id`, `custodian_id`, `valid_from`, `valid_to`). Saat mutasi terjadi, sistem otomatis menutup tanggal interval lama (*closes the time slice*) dan membuka interval baru tanpa menghapus jejak histori.
3. **Automated Intercompany Mirroring**: Saat transfer antar-perusahaan disahkan, modul Naventra mengeksekusi *Dual-Ledger Posting Engine* yang secara atomik memposting jurnal pelepasan di entitas pengirim dan jurnal perolehan di entitas penerima secara tersinkronisasi.

## NAV-D-073 — CAPEX vs OPEX in Asset Lifecycle

Sumber: [[09-assets/capex-vs-opex|CAPEX vs OPEX in Asset Lifecycle]]

Rancangan arsitektur pemisahan CAPEX dan OPEX pada Naventra ERP:

1. **Intelligent Requisition Routing Wizard**: Saat staf teknis membuat permintaan pengadaan (*Purchase Requisition*) terkait aset, Naventra menyajikan *Decision Tree Wizard* interaktif yang menanyakan tujuan teknis pengeluaran (apakah servis berkala atau peningkatan kapasitas). Sistem secara otomatis merekomendasikan kode akun dan rute alur persetujuan yang sesuai.
2. **Automated Threshold Validation Hook**: Naventra memeriksa nilai pengeluaran terhadap batas `capitalization_threshold` pada kelas aset terkait secara *real-time*. Pengajuan CAPEX di bawah batas ambang akan ditandai dengan peringatan (*Warning Flag*) dan memerlukan dispensasi tertulis Financial Controller.
3. **Seamless Asset Addition Ledger**: Ketika tagihan peningkatan aset disetujui, Naventra memposting penambahan nilai ke tabel `asset_value_adjustments` yang secara atomik merevisi dasar penyusutan aset induk tanpa perlu membuat ulang data master dari awal.

## NAV-D-074 — Depreciation Schedule & Management

Sumber: [[09-assets/depreciation-management|Depreciation Schedule & Management]]

Rancangan arsitektur mesin Depreciation Management pada Naventra ERP:

1. **Pre-Computed Schedule Table**: Naventra membentuk tabel terindeks `asset_depreciation_schedules` berisi baris rencana penyusutan untuk setiap bulan sejak hari pertama aset dikapitalisasi. Baris memiliki status `SCHEDULED`, `POSTED`, atau `CANCELLED`.
2. **Idempotent Background Worker**: Eksekusi penyusutan bulanan massal dijalankan oleh pekerja latar belakang (*worker job*). Pekerja mengevaluasi jadwal berstatus `SCHEDULED` yang jatuh tempo pada periode tersebut dan memposting jurnal GL secara atomik. Jika proses gagal di tengah jalan, sistem dapat dilanjutkan kembali tanpa menduplikasi baris yang telah berstatus `POSTED`.
3. **Prospective Recalculation Engine**: Ketika pengguna berwenang menyimpan perubahan masa manfaat atau nilai sisa, mesin Naventra menghapus baris jadwal masa depan yang masih berstatus `SCHEDULED`, menghitung ulang dasar tersusutkan baru dari NBV saat ini, dan menghasilkan baris jadwal baru dalam satu transaksi basis data.

## NAV-D-075 — Fixed Assets Fundamentals

Sumber: [[09-assets/fixed-assets-fundamentals|Fixed Assets Fundamentals]]

Rancangan arsitektur modul Fixed Assets pada Naventra ERP:

1. **Clean Domain Separation**: Naventra memisahkan entitas aset menjadi dua lapis yang terkoordinasi: `AssetRegistry` (mengelola atribut fisik, lokasi, serial number, spesifikasi, dan *custodian*) dan `AssetBookLedger` (mengelola nilai buku, riwayat kapitalisasi, metode penyusutan, dan integrasi jurnal GL).
2. **Deterministic Lifecycle States**: Status siklus hidup aset diatur melalui mesin status (*State Machine*) yang ketat: `PLANNED` $\rightarrow$ `ACQUIRED` $\rightarrow$ `CAPITALIZED` $\rightarrow$ `IN_SERVICE` $\rightarrow$ `DISPOSED`. Transisi status hanya dapat dipicu oleh dokumen transaksi bisnis yang valid.
3. **Automated Split for Multi-Book Rules**: Naventra secara native mendukung konfigurasi *Commercial Book* (basis IFRS) dan *Tax Book* (basis UU Pajak Penghasilan Indonesia) sejak master aset pertama kali dibuat, memastikan perhitungan beban penyusutan komersial dan koreksi fiskal dapat diekstraksi tanpa duplikasi input data.

## NAV-D-076 — Cross-Module Fixed Assets Integration

Sumber: [[09-assets/fixed-assets-integration|Cross-Module Fixed Assets Integration]]

Rancangan arsitektur integrasi lintas modul pada Naventra ERP:

1. **Transactional Event-Bus Architecture**: Setiap kali terjadi transaksi fisik di modul rantai pasok (misal konfirmasi penerimaan barang modal atau pengeluaran suku cadang perawatan), sistem mempublikasikan peristiwa (*Domain Event*: `AssetDeliveredEvent`, `MaintenanceCompletedEvent`). Modul aktiva tetap mendengarkan (*listens*) dan mengeksekusi pembaruan status atau pencatatan biaya secara asinkron tanpa memperlambat antarmuka pengguna di gudang.
2. **Atomic Asset Clearing Guarantee**: Naventra mewajibkan seluruh pengadaan barang modal melewati akun perantara `Fixed Asset Clearing`. Transaksi penerimaan barang dan pencatatan komitmen aset diikat dalam transaksi basis data atomik (*ACID guarantee*), mencegah kemungkinan terbentuknya master aset aktif tanpa adanya dokumen pengadaan resmi yang mendasarinya.
3. **Cross-Module Integrity Daemon**: Naventra menyertakan daemon latar belakang yang secara berkala memvalidasi integritas relasional: memastikan bahwa setiap mesin produksi yang terdaftar pada *Work Center* manufaktur memiliki nomor aset aktif yang valid di subledger aktiva tetap, dan total saldo subledger aktiva cocok 100% dengan akun kontrol neraca GL.

## NAV-D-077 — Physical Asset Verification & Tagging

Sumber: [[09-assets/physical-asset-verification|Physical Asset Verification & Tagging]]

Rancangan arsitektur modul Physical Asset Verification pada Naventra ERP:

1. **Native Mobile Asset Scanner**: Naventra menyediakan Progressive Web App (PWA) yang memungkinkan tim audit memindai barcode/QR tag aset secara luring (*offline-first*) di lorong pabrik tanpa sinyal Wi-Fi. Data hasil pemindaian disimpan di basis data lokal perangkat dan disinkronisasikan ke server saat kembali online.
2. **Interactive Discrepancy Resolution Workbench**: Hasil verifikasi fisik disajikan dalam dasbor interaktif yang membagi temuan ke dalam tab: *Matched*, *Mislocated*, *Damaged*, *Missing*, dan *Unrecorded*. Setiap tab memiliki tombol aksi satu-klik (*One-Click Action*) untuk memproses mutasi lokasi, pendaftaran aset baru, atau penerbitan memo penghapusan buku.
3. **Mandatory Photo & Geolocation Evidence**: Aplikasi mobile Naventra mewajibkan petugas lapangan mengambil foto fisik aset dan merekam koordinat GPS saat memindai aset-aset bernilai di atas ambang batas tertentu, memberikan integritas bukti fisik yang tak terbantahkan bagi auditor eksternal.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-062 | `09-assets/asset-acquisition-and-capitalization.md` | Adopted |
| NAV-D-063 | `09-assets/asset-classification.md` | Adopted |
| NAV-D-064 | `09-assets/asset-componentization.md` | Adopted |
| NAV-D-065 | `09-assets/asset-controls-and-governance.md` | Adopted |
| NAV-D-066 | `09-assets/asset-disposal-and-retirement.md` | Adopted |
| NAV-D-067 | `09-assets/asset-impairment.md` | Adopted |
| NAV-D-068 | `09-assets/asset-maintenance-integration.md` | Adopted |
| NAV-D-069 | `09-assets/asset-master-data.md` | Adopted |
| NAV-D-070 | `09-assets/asset-reporting-and-analytics.md` | Adopted |
| NAV-D-071 | `09-assets/asset-revaluation.md` | Adopted |
| NAV-D-072 | `09-assets/asset-transfer-and-location.md` | Adopted |
| NAV-D-073 | `09-assets/capex-vs-opex.md` | Adopted |
| NAV-D-074 | `09-assets/depreciation-management.md` | Adopted |
| NAV-D-075 | `09-assets/fixed-assets-fundamentals.md` | Adopted |
| NAV-D-076 | `09-assets/fixed-assets-integration.md` | Adopted |
| NAV-D-077 | `09-assets/physical-asset-verification.md` | Adopted |

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
