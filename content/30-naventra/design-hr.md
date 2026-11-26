---
title: Naventra Design — hr
---

# Naventra Design — hr

## Definition

Keputusan desain Naventra yang diekstrak dari artikel `11-hr`. Teks keputusan dipindahkan apa adanya; artikel sumber menyisakan satu baris rujukan.

## NAV-D-095 — Attendance and Work Schedule

Sumber: [[11-hr/attendance-and-work-schedule|Attendance and Work Schedule]]

Dalam perancangan modul kehadiran dan jadwal kerja Naventra ERP:

1. **Mesin Pemroses Log Biometrik Terpadu**: Naventra menyediakan *API Gateway Ingestion* yang mampu menampung puluhan ribu stempel presensi per menit dari mesin sidik jari dan RFID lintas cabang, memproses status kehadiran secara *near real-time*.
2. **Sistem Pengenalan Shift Otomatis (*Auto-Shift Detection*)**: Untuk staf operasional yang bekerja tanpa jadwal shift kaku, mesin Naventra secara cerdas mencocokkan jam *clock-in* pertama pegawai ke jadwal shift terdekat tanpa memerlukan penugasan manual dari HR.
3. **Penyelarasan Presensi dengan Lembar Waktu Proyek**: Sistem melakukan validasi silang antara total jam kehadiran harian pada modul HR dengan total jam lembar kerja (*Timesheet*) yang diinput pegawai pada modul [[10-project/timesheet-and-effort-tracking|Project Management]]. Pengguna diperingatkan jika jam kerja proyek melebihi jam kehadiran fisik di kantor.

## NAV-D-096 — Employee Master Data

Sumber: [[11-hr/employee-master-data|Employee Master Data]]

Dalam perancangan modul master data pegawai Naventra ERP:

1. **Arsitektur Tiga Lapis (Party - Employment - User)**: Mengadopsi arsitektur data model di mana entitas `Person` memegang biodata personal permanen, entitas `Employment` memegang kontrak legal dan penempatan departemen per entitas usaha, dan entitas `User` mengelola kredensial sistem.
2. **Validasi Format Statutori Otomatis**: Formulir input pegawai dilengkapi modul validasi otomatis untuk panjang digit dan *checksum* NIK (16 digit), NPWP (16 digit format baru), serta format nomor rekening bank utama di Indonesia.
3. **Kustodian Aset Terintegrasi Real-Time**: Kolom penugasan aset pada formulir pegawai tertaut langsung dengan modul [[09-assets/asset-master-data|Fixed Assets]], sehingga mutasi posisi pegawai otomatis mengirimkan notifikasi ke petugas logistik umum (*General Affairs*) untuk pemutakhiran lokasi barang aktiva.

## NAV-D-097 — Employee Timesheet and Labor Cost

Sumber: [[11-hr/employee-timesheet-and-labor-cost|Employee Timesheet and Labor Cost]]

Dalam perancangan modul lembar waktu dan biaya tenaga kerja Naventra ERP:

1. **Rekonsiliasi Otomatis Jam Presensi vs Jam Proyek**: Antarmuka lembar waktu Naventra menampilkan bilah indikator kehadiran fisik secara berdampingan. Sistem memperingatkan pengguna jika lembar kerja yang diinput melebihi jam presensi kantor pada hari bersangkutan.
2. **Dynamic Blended Rate Engine**: Naventra menyediakan mesin kalkulasi tarif per jam yang secara dinamis memperhitungkan komponen gaji pokok dan tunjangan aktual bulan berjalan, memastikan nilai penyerapan biaya tenaga kerja mencerminkan biaya finansial riil.
3. **One-Click Approval by WBS Manager**: Manajer proyek dapat menyetujui seluruh lembar kerja tim dalam satu tampilan matriks terpadu dengan validasi sisa anggaran jam kerja (*Effort Baseline*) secara *real-time*.

## NAV-D-098 — Employment Lifecycle

Sumber: [[11-hr/employment-lifecycle|Employment Lifecycle]]

Dalam perancangan modul siklus hidup pegawai Naventra ERP:

1. **State Machine Terotomatisasi Penuh**: Mesin transisi status Naventra mengunci perubahan status manual di basis data. Perubahan dari *Active* ke *Terminated* wajib melalui alur *Offboarding Wizard* yang memvalidasi persetujuan atasan dan kliring logistik.
2. **Instant Deprovisioning Webhook**: Penandatanganan dokumen pemutusan hubungan kerja memicu *webhook* otomatis yang secara instan mencabut token sesi login web/mobile pegawai dan membekukan kartu akses RFID gedung kantor.
3. **Automated Final Settlement Engine**: Sistem secara otomatis menghitung kalkulasi hak pesangon dan kompensasi cuti berdasarkan masa kerja historis yang tercatat sejak tanggal *Hire Date*, menghasilkan usulan voucher pembayaran (*Payment Proposal*) yang siap dieksekusi oleh bagian *Treasury*.

## NAV-D-099 — HR Controls and Governance

Sumber: [[11-hr/hr-controls-and-governance|HR Controls and Governance]]

Dalam perancangan modul kontrol dan tata kelola HR Naventra ERP:

1. **Role Conflict Block Engine**: Mesin otorisasi Naventra secara otomatis memblokir penugasan peran ganda beracun (misalnya pengguna yang memiliki peran *Payroll Operator* dilarang menerima penugasan peran *Treasury Cash Disburser*).
2. **Cryptographic Field-Level Security**: Kolom data sensitif (gaji pokok, nomor rekening bank, dan nomor KTP) dienkripsi menggunakan kunci enkripsi independen (*Envelope Encryption*). Data ditampilkan dalam format bertopeng (*Masked* - misalnya `123-XX-XXXX543-2`) kecuali dibuka secara eksplisit oleh pengguna berotoritas audit.
3. **Automated Ghost Employee Screening**: Setiap sebelum menjalankan *Payroll Run*, Naventra menjalankan skrip pemindaian otomatis untuk mendeteksi nomor rekening duplikat, pegawai aktif tanpa atasan, atau pegawai yang tidak memiliki rekaman kehadiran selama periode berjalan.

## NAV-D-100 — HR Integration

Sumber: [[11-hr/hr-integration|HR Integration]]

Dalam perancangan arsitektur inti modul Human Resources Naventra ERP:

1. **Unified Workforce Anchor**: Setiap transaksi operasional (dokumen PO, mutasi inventaris gudang, lembar waktu proyek, tiket produksi) memiliki atribut `employee_id` yang terikat pada data master pegawai aktif, menjamin akuntabilitas jejak audit di seluruh modul sistem.
2. **Automated Cross-Module Labor Settlement**: Modul penggajian Naventra sebaiknya menggunakan payroll batch sebagai boundary posting ke GL dan memfasilitasi rekonsiliasi akun kliring penyerapan tenaga kerja (*Labor Absorption Clearing*), memastikan biaya tenaga kerja teralokasi secara tertib tanpa saldo tak terjelaskan.
3. **Integrated Offboarding Lockdown Wizard**: Transisi status pegawai menjadi *Terminated* dapat mengotomatisasi penonaktifan kredensial login, pembatasan akses fisik, dan penyusunan draf penyelesaian hak akhir (*Final Settlement Proposal*) yang terhubung dengan modul perbendaharaan (*Treasury*).

## NAV-D-101 — HR Management Fundamentals

Sumber: [[11-hr/hr-management-fundamentals|HR Management Fundamentals]]

Dalam perancangan modul Human Resources pada Naventra ERP:

1. **Pemisahan Ketat Entitas Orang, Pegawai, dan Pengguna**: Naventra memisahkan entitas `Person` (data biodata individu), `Employee` (hubungan kerja legal dengan perusahaan), dan `User` (kredensial login sistem). Satu individu dapat memiliki riwayat sebagai kontraktor lalu beralih menjadi pegawai tanpa duplikasi data profil.
2. **Mesin Effective Dating Terpadu**: Setiap entitas jabatan, gaji, dan alokasi pusat biaya wajib memiliki atribut `effective_from` dan `effective_to`. Perubahan gaji masa depan tidak memerlukan intervensi manual pada tanggal pergantian bulan.
3. **Universal Audit Trail & Granular Privacy Control**: Data sensitif seperti riwayat gaji, nomor rekening bank, dan nomor identitas kependudukan dilindungi dengan enkripsi tingkat kolom dan hanya dapat diakses oleh peran HR Payroll bersertifikasi dengan pencatatan log akses (*Access Log*).

## NAV-D-102 — Leave Management

Sumber: [[11-hr/leave-management|Leave Management]]

Dalam perancangan modul manajemen cuti Naventra ERP:

1. **Calendar Collision Engine**: Sistem secara otomatis memeriksa jadwal komitmen kerja kritis pegawai (jadwal *Milestone Sign-Off* proyek atau perintah produksi pabrik) dan memberikan peringatan dini kepada manajer jika cuti pegawai berbenturan dengan deliverable penting.
2. **Automated Carry-Forward & Lapsing Processor**: Naventra menjalankan layanan latar belakang otomatis pada tanggal 31 Desember untuk menghitung kuota transfer cuti tahun baru, serta pada tanggal 30 Juni untuk menghanguskan sisa cuti kedaluwarsa tanpa intervensi manual tim HR.
3. **Penyelarasan Hak Cuti Masa Percobaan**: Sistem secara otomatis mengunci pengajuan cuti tahunan selama pegawai berstatus *Probation*, dan secara otomatis melepaskan kuota prorata begitu status pegawai beralih menjadi *Confirmed (Active)*.

## NAV-D-103 — Organization and Position Structure

Sumber: [[11-hr/organization-and-position-structure|Organization and Position Structure]]

Dalam perancangan modul struktur organisasi Naventra ERP:

1. **Penerapan Penuh Model Position-to-Position**: Naventra mewajibkan seluruh alur persetujuan dokumen bisnis merujuk pada kode `position_id` daripada `employee_id`, memastikan alur bisnis tidak pernah terhenti saat terjadi kekosongan jabatan atau pergantian pejabat sementara.
2. **Headcount Quota Engine**: Setiap pembukaan lowongan kerja baru pada modul rekrutmen wajib memverifikasi ketersediaan kuota formasi posisi kosong (*Vacant Position Slot*) yang telah disetujui dalam anggaran tahunan perusahaan.
3. **Visual Interactive Organization Chart**: Antarmuka pengguna menyajikan bagan organisasi interaktif yang dapat di-*drill-down*, menampilkan indikator warna untuk posisi yang terisi (*Filled*), lowong (*Vacant*), atau sedang dalam proses rekrutmen aktif.

## NAV-D-104 — Overtime and Time Management

Sumber: [[11-hr/overtime-and-time-management|Overtime and Time Management]]

Dalam perancangan modul manajemen lembur Naventra ERP:

1. **Dual Validation Engine (Biometrik vs Surat Tugas)**: Sistem secara otomatis membandingkan stempel presensi biometrik dengan jam surat perintah lembur. Jika pegawai lembur 3 jam tetapi surat tugas hanya mengizinkan 2 jam, sistem membatasi pembayaran maksimal 2 jam.
2. **Real-time Project Budget Check**: Pengajuan lembur dengan pembebanan kode WBS proyek secara otomatis memverifikasi ketersediaan saldo anggaran tenaga kerja (*WBS Labor Budget*) sebelum persetujuan dapat disahkan.
3. **Peringatan Kelelahan Tenaga Kerja (*Fatigue Monitoring Alert*)**: Naventra menampilkan indikator peringatan visual kepada manajer jika seorang staf teknis telah bekerja lembur lebih dari 12 jam dalam minggu berjalan untuk menjaga *Work-Life Balance* dan kualitas kode perangkat lunak.

## NAV-D-105 — Payroll Accounting and Finance Integration

Sumber: [[11-hr/payroll-accounting-and-finance-integration|Payroll Accounting and Finance Integration]]

Dalam perancangan modul integrasi akuntansi penggajian Naventra ERP:

1. **Automated Journal Consolidation Engine**: Naventra sebaiknya menggunakan payroll batch sebagai boundary posting ke GL secara teragregasi per pusat biaya pada akhir bulan, sementara rincian transaksi per komponen tetap berada pada payroll subledger guna menjaga performa pelaporan buku besar.
2. **Treasury Pre-Flight Balance Validation**: Modul perbendaharaan Naventra dapat memindai saldo rekening bank penggajian sebelum jadwal transfer massal, memberikan notifikasi otomatis jika saldo kas di bawah kebutuhan pencairan gaji bersih.
3. **Audit Trail for Payment Files**: Setiap berkas transaksi perbankan yang diekspor (*Bank Transfer File*) diamankan dengan jejak audit dan tanda tangan digital (*Digital Hash*) guna mencegah modifikasi di luar sistem ERP.

## NAV-D-106 — Payroll Benefits and Reimbursements

Sumber: [[11-hr/payroll-benefits-and-reimbursements|Payroll Benefits and Reimbursements]]

Dalam perancangan modul tunjangan dan klaim biaya Naventra ERP:

1. **Receipt OCR & Digital Fraud Prevention**: Naventra mengintegrasikan modul pemindaian gambar pintar yang mendeteksi nomor transaksi struk dan stempel tanggal, secara otomatis menolak berkas struk yang terindikasi telah diunggah oleh pegawai lain.
2. **Dual-Channel Disbursement Routing**: Sistem memungkinkan pemisahan fleksibel: klaim bernilai kecil (< Rp500.000) disalurkan langsung via transfer harian kas kecil (*Petty Cash / Fast AP*), sedangkan klaim fasilitas berkala dapat digabungkan ke slip gaji bulanan sebagai komponen *Non-Taxable Reimbursement*.
3. **Penyelarasan Biaya Proyek Instan**: Klaim perjalanan dinas yang mencantumkan kode WBS proyek secara otomatis memicu pembaruan biaya riil pengeluaran (*Expenses Cost Category*) pada modul [[10-project/project-cost-management|Project Cost Management]], memantau margin laba kotor proyek secara *real-time*.

## NAV-D-107 — Payroll Earnings and Deductions

Sumber: [[11-hr/payroll-earnings-and-deductions|Payroll Earnings and Deductions]]

Dalam perancangan modul komponen gaji Naventra ERP:

1. **Visual Formula Builder**: Naventra menyediakan antarmuka perancang formula visual yang ramah pengguna, memungkinkan staf HR menyusun aturan gaji ketergantungan kompleks tanpa perlu menulis kode pemrograman teknis.
2. **Dynamic Tax Bracket Synchronization**: Komponen pemotongan pajak dirancang modular yang dapat disinkronkan secara otomatis dengan pembaruan tabel tarif pajak resmi (seperti Tarif Efektif Rata-rata / TER PPh 21) tanpa memerlukan perubahan skema basis data.
3. **Automated Negative Net Pay Shield**: Sistem dilengkapi proteksi otomatis yang memvalidasi hasil kalkulasi slip gaji. Jika potongan sukarela menyebabkan gaji bersih berada di bawah ambang batas minimum, sistem secara otomatis menangguhkan potongan pinjaman terendah dan memunculkan peringatan audit.

## NAV-D-108 — Payroll Fundamentals

Sumber: [[11-hr/payroll-fundamentals|Payroll Fundamentals]]

Dalam perancangan modul penggajian Naventra ERP:

1. **High-Performance Payroll Calculation Engine**: Naventra mengadopsi mesin kalkulasi paralel terisolasi (*worker-thread processing*) yang mampu menghitung ribuan slip gaji lengkap dengan formula pajak dan lembur dalam hitungan detik.
2. **Maker-Checker Security Workflow**: Proses penggajian mewajibkan otorisasi digital ganda: draf disusun oleh HR Payroll (*Maker*), ditinjau oleh HR Manager (*Checker*), dan disahkan oleh Finance Director (*Approver*) sebelum berkas transfer bank dapat diekspor.
3. **Automated Salary Variance Analyzer**: Sistem secara otomatis membandingkan total gaji kotor bulan berjalan terhadap bulan sebelumnya, menyoroti anomali deviasi lebih dari 10% untuk mencegah kebocoran kas akibat salah input.

## NAV-D-109 — Payroll Tax and Statutory Compliance

Sumber: [[11-hr/payroll-tax-and-statutory-compliance|Payroll Tax and Statutory Compliance]]

Dalam perancangan modul kepatuhan pajak penggajian Naventra ERP:

1. **Tabel Tarif Efektif Terkonfigurasi (TER Engine)**: Naventra menyediakan pustaka tabel tarif pajak yang dapat diperbarui melalui antarmuka administratif (*Tax Configuration UI*) tanpa perlu melakukan kompilasi ulang kode sumber saat pemerintah memperbarui batasan lapisan tarif.
2. **December Tax Equalization Wizard**: Sistem menyediakan panduan wizard otomatis pada penutupan penggajian bulan Desember untuk menghitung ulang seluruh pajak tahunan pegawai, mendeteksi selisih lebih/kurang bayar, dan menerbitkan berkas formulir bukti potong digital secara massal.
3. **Validasi NPWP Format Baru (16 Digit / NIK)**: Formulir master data pajak Naventra telah diselaraskan dengan integrasi NIK menjadi NPWP 16 digit sesuai kebijakan standardisasi identitas perpajakan nasional.

## NAV-D-110 — Performance and Employee Management

Sumber: [[11-hr/performance-and-employee-management|Performance and Employee Management]]

Dalam perancangan modul manajemen kinerja Naventra ERP:

1. **Objective System-Driven KPIs**: Naventra mengintegrasikan data kinerja langsung dari modul operasional: metrik ketepatan waktu pengiriman deliverable proyek WBS pada modul [[10-project/project-task-and-milestone|Project Management]] secara otomatis ditarik sebagai nilai capaian KPI teknis pegawai.
2. **Automated Calibration Matrix**: Menyediakan antarmuka visual matriks 9 kotak (*9-Box Talent Matrix: Performance vs Potential*) yang memfasilitasi komite kalibrasi dalam mengelompokkan pegawai berkinerja tinggi (*High Performers*) untuk perencanaan suksesi kepemimpinan.
3. **Seamless Payroll Promotion Sync**: Persetujuan akhir kenaikan jabatan pada modul kinerja secara otomatis memperbarui rekaman *Job Grade* dan *Salary Structure Assignment* bertanggal efektif pada master data pegawai tanpa entri manual ganda.

## NAV-D-111 — Recruitment and Onboarding

Sumber: [[11-hr/recruitment-and-onboarding|Recruitment and Onboarding]]

Dalam perancangan modul rekrutmen dan orientasi Naventra ERP:

1. **Otomatisasi Penutupan Kuota Formasi**: Konversi kandidat menjadi pegawai secara otomatis mengubah status posisi terkait dari *Vacant* menjadi *Filled*, serta membatalkan seluruh proses seleksi pelamar lain pada formasi tersebut yang belum mencapai tahap penawaran.
2. **Digital Onboarding Checklist dengan Persetujuan Bertingkat**: Naventra menyediakan dasbor pelacak orientasi di mana staf IT dan GA wajib mencentang dan menandatangani secara digital bukti serah terima perangkat dan kartu akses sebelum status pegawai dialihkan dari *Pre-Hire* ke *Active (Probation)*.
3. **Pencegahan Redundansi Dokumen**: Berkas kartu identitas, NPWP, dan buku rekening yang diunggah pelamar pada saat penawaran kerja otomatis dialokasikan ke direktori berkas terenkripsi pada master data pegawai tanpa perlu meminta pegawai mengunggah ulang.

## NAV-D-112 — Workforce Planning and HR Analytics

Sumber: [[11-hr/workforce-planning-and-hr-analytics|Workforce Planning and HR Analytics]]

Dalam perancangan modul perencanaan tenaga kerja dan analitik Naventra ERP:

1. **Automated Headcount vs Payroll Variance Engine**: Naventra menyediakan dasbor keuangan SDM terpadu yang memvisualisasikan korelasi antara posisi formasi yang lowong (*Vacancies*) dengan deviasi penyerapan anggaran belanja kas perbendaharaan secara *real-time*.
2. **Project Workforce Capacity Heatmap**: Modul analitik menyajikan peta panas (*heatmap*) alokasi sumber daya manusia lintas proyek, memungkinkan manajer operasional mendeteksi staf teknis yang mengalami kelebihan beban kerja (*over-allocated*) atau kekurangan penugasan (*under-utilized*).
3. **Role-Based Privacy Masking**: Data agregasi jumlah pegawai dan jam kerja dapat diakses oleh manajer departemen, sementara seluruh kolom nilai moneter gaji dienkripsi dan disamarkan secara otomatis bagi pengguna non-eksekutif.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-095 | `11-hr/attendance-and-work-schedule.md` | Adopted |
| NAV-D-096 | `11-hr/employee-master-data.md` | Adopted |
| NAV-D-097 | `11-hr/employee-timesheet-and-labor-cost.md` | Adopted |
| NAV-D-098 | `11-hr/employment-lifecycle.md` | Adopted |
| NAV-D-099 | `11-hr/hr-controls-and-governance.md` | Adopted |
| NAV-D-100 | `11-hr/hr-integration.md` | Adopted |
| NAV-D-101 | `11-hr/hr-management-fundamentals.md` | Adopted |
| NAV-D-102 | `11-hr/leave-management.md` | Adopted |
| NAV-D-103 | `11-hr/organization-and-position-structure.md` | Adopted |
| NAV-D-104 | `11-hr/overtime-and-time-management.md` | Adopted |
| NAV-D-105 | `11-hr/payroll-accounting-and-finance-integration.md` | Adopted |
| NAV-D-106 | `11-hr/payroll-benefits-and-reimbursements.md` | Adopted |
| NAV-D-107 | `11-hr/payroll-earnings-and-deductions.md` | Adopted |
| NAV-D-108 | `11-hr/payroll-fundamentals.md` | Adopted |
| NAV-D-109 | `11-hr/payroll-tax-and-statutory-compliance.md` | Adopted |
| NAV-D-110 | `11-hr/performance-and-employee-management.md` | Adopted |
| NAV-D-111 | `11-hr/recruitment-and-onboarding.md` | Adopted |
| NAV-D-112 | `11-hr/workforce-planning-and-hr-analytics.md` | Adopted |

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
