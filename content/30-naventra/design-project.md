---
title: Naventra Design — project
---

# Naventra Design — project

## Definition

Keputusan desain Naventra yang diekstrak dari artikel `10-project`. Teks keputusan dipindahkan apa adanya; artikel sumber menyisakan satu baris rujukan.

## NAV-D-078 — Project Billing and Revenue

Sumber: [[10-project/project-billing-and-revenue|Project Billing and Revenue]]

Dalam perancangan modul penagihan proyek Naventra ERP:

1. **Digital BAST Sign-Off Workflow**: Tombol *Create Invoice* pada proyek terkunci secara sistemik hingga BAST digital yang ditandatangani oleh wakil pelanggan diunggah dan disetujui oleh *Account Executive*.
2. **Dual-Ledger Support for IFRS 15**: Naventra menyediakan mesin kalkulasi otomatis yang membandingkan realisasi biaya (*Cost-to-Cost Progress*) dengan nilai penagihan milestone, menghasilkan jurnal penyesuaian otomatis untuk *Contract Asset* atau *Contract Liability* pada setiap penutupan buku bulanan.
3. **Peringatan Jatuh Tempo Pembayaran**: Menyediakan *aging analysis* piutang proyek yang secara otomatis membekukan rilis pengerjaan milestone berikutnya jika pembayaran termin sebelumnya telah jatuh tempo melebihi ambang batas toleransi kredit (*Credit Limit / Payment Terms Grace Period*).

## NAV-D-079 — Project Budget and Cost Control

Sumber: [[10-project/project-budget-and-cost-control|Project Budget and Cost Control]]

Dalam perancangan modul proyek Naventra ERP:

1. **Kombinasi Hard Stop dan Toleransi Fleksibel**: Menerapkan konfigurasi AVC yang dapat dipilih per jenis biaya (misalnya *Labor Expense* berstatus *Warn* dengan batas 10%, sedangkan *Procurement Subcontractor* berstatus *Hard Stop* 100%).
2. **Otomatisasi Commitment Ledger**: Setiap PO yang diterbitkan ke vendor otomatis mengunci pagu sisa anggaran WBS tanpa harus menunggu proses *Approval Hierarchy* tingkat korporat selesai.
3. **EVM Dashboard Real-Time**: Naventra menyediakan visualisasi kurva-S (*S-Curve*) otomatis yang mempertemukan kurva PV, EV, dan AC secara langsung dari sinkronisasi harian *timesheet* dan transaksi *procurement*.

## NAV-D-080 — Project Change, Risk, and Issue Management

Sumber: [[10-project/project-change-risk-and-issue-management|Project Change, Risk, and Issue Management]]

Dalam perancangan modul tata kelola proyek Naventra ERP:

1. **Terintegrasi ke Matriks RACI**: Setiap isu yang tercatat secara otomatis menugaskan penanggung jawab (*Action Item Owner*) dan mengirimkan eskalasi bertahap jika isu tidak terselesaikan dalam SLA yang ditetapkan.
2. **Impact Simulation Engine**: Antarmuka *Change Request* Naventra menyediakan simulator interaktif: memasukkan perubahan durasi aktivitas atau penambahan jam kerja langsung menampilkan prediksi dampak pada tanggal *Go-Live* dan margin laba kotor proyek.
3. **Audit Trail Amandemen Baseline**: Setiap revisi jadwal atau pagu anggaran wajib mencantumkan nomor persetujuan CCB digital dan menyimpan salinan *snapshot* baseline sebelumnya untuk keperluan audit kepatuhan internal.

## NAV-D-081 — Project Completion and Closing

Sumber: [[10-project/project-completion-and-closing|Project Completion and Closing]]

Dalam perancangan modul penutupan proyek Naventra ERP:

1. **Automated Closing Pre-Flight Check**: Naventra menyediakan *Closing Wizard* interaktif yang memindai sistem dalam 1 klik untuk mendeteksi apakah masih ada lembar timesheet belum disetujui, reservasi stok aktif, atau komitmen PO terbuka sebelum mengizinkan penutupan.
2. **One-Click WIP Settlement Execution**: Tombol *Execute Final Settlement* secara otomatis menyusun dan memvalidasi jurnal pemindahan WIP ke COGS dengan perhitungan varians biaya otomatis.
3. **Automated Warranty Ticket Routing**: Begitu status beralih ke *Closed*, Naventra secara otomatis membuat entitas *Maintenance Contract* baru dengan masa aktif 90 hari, memetakan tim helpdesk yang berhak menerima tiket garansi dari pelanggan *PT Maju Bersama*.

## NAV-D-082 — Project Cost Management

Sumber: [[10-project/project-cost-management|Project Cost Management]]

Rancangan arsitektur modul Project Cost Management pada Naventra ERP:

1. **Multi-Source Cost Ingestion Pipeline**: Naventra memproses pengumpulan biaya proyek melalui *Event Ingestion Worker*. Setiap kali modul eksternal menerbitkan transaksi terikat proyek (misal `TimesheetApproved`, `InvoicePosted`, `MaterialIssued`), worker secara asinkron memperbarui saldo pada tabel `project_cost_ledger` tanpa membebani transaksi utama.
2. **Deterministic CBS Tagging Engine**: Sistem mewajibkan setiap item biaya dipetakan ke kode kategori biaya baku (`LABOR`, `SUBCONTRACT`, `MATERIAL`, `TRAVEL`, `OVERHEAD`). Hal ini memungkinkan ekstraksi laporan perbandingan varian biaya dilakukan secara terstandardisasi lintas proyek.
3. **Automated WIP Settlement Processor**: Pada akhir bulan fiskal, Naventra menyediakan modul kalkulasi *WIP Settlement* otomatis yang menghitung akumulasi biaya proyek yang belum ditagihkan dan memposting jurnal reklasifikasi neraca sesuai aturan akuntansi kontrak yang ditetapkan.

## NAV-D-083 — Project Integration

Sumber: [[10-project/project-integration|Project Integration]]

Dalam perancangan arsitektur inti modul manajemen proyek Naventra ERP:

1. **Unified Project Anchor Object**: Setiap entitas operasional dan finansial dalam database Naventra memiliki relasi kunci asing (*Foreign Key*) langsung ke `project_id` dan `wbs_id`, menjamin integritas data lintas modul tanpa memerlukan integrasi batch terpisah.
2. **Real-time Closed-Loop Control**: Mengintegrasikan mesin *Availability Control* (AVC) bertingkat untuk mengontrol konsumsi budget, komitmen (*commitment*), dan biaya aktual (*actual cost*) secara konsisten saat *Purchase Requisition*, *Purchase Order*, atau *Timesheet* diajukan oleh pengguna lapangan sesuai kebijakan organisasi.
3. **Automated End-to-End Orchestration**: Dari penandatanganan kontrak komersial hingga penutupan finansial (*WIP Settlement*), Naventra memandu pengguna melalui antarmuka *Project Lifecycle Wizard* terpandu yang meminimalkan entri manual dan mencegah salah saji akuntansi.

## NAV-D-084 — Project Management Fundamentals

Sumber: [[10-project/project-management-fundamentals|Project Management Fundamentals]]

Rancangan arsitektur modul Project Management pada Naventra ERP:

1. **Project as a First-Class Financial Dimension**: Di dalam arsitektur Naventra, entitas `project_id` diperlakukan sebagai dimensi global (*Global Financial Dimension*). Setiap tabel transaksi—mulai dari baris jurnal akuntansi (`journal_item`), baris pemesanan pembelian (`purchase_order_line`), mutasi stok (`stock_move`), hingga baris faktur (`invoice_line`)—memiliki kolom referensi `project_id` terindeks.
2. **Strict Lifecycle State-Machine**: Naventra menerapkan transisi status proyek terprogram: `DRAFT` $\rightarrow$ `APPROVED` $\rightarrow$ `PLANNED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `COMPLETED` $\rightarrow$ `CLOSED`. Transisi ke status berikutnya memvalidasi prasyarat dokumen (misal: transisi ke `IN_PROGRESS` memerlukan persetujuan pagu anggaran dan penunjukan Manajer Proyek).
3. **Unified Commitment & Cost Aggregation Engine**: Naventra memelihara tabel ringkasan kinerja proyek `project_cost_summaries` yang mengakumulasikan nilai *Budget*, *Committed Cost*, *Actual Cost*, dan *Invoiced Amount* secara asinkron setiap kali terjadi transaksi terikat, memungkinkan dasbor proyek memuat status varian dalam hitungan milidetik.

## NAV-D-085 — Project Master Data & Templates

Sumber: [[10-project/project-master-data|Project Master Data & Templates]]

Rancangan arsitektur Project Master Data pada Naventra ERP:

1. **Decoupled Commercial & Execution Entities**: Naventra memisahkan entitas komersial (`project_contracts`) dari entitas eksekusi operasional (`projects`). Satu kontrak induk klien dapat menaungi beberapa sub-proyek eksekusi dengan anggaran terpisah namun penagihan terkonsolidasi.
2. **Template Instantiation Engine**: Modul Naventra menyediakan generator instansiasi templat berbasis aturan (`project_template_builder`). Saat templat dipilih dan tanggal kick-off diinput, sistem secara otomatis mengkalkulasi seluruh tanggal mulai tugas, dependensi pendahulu (*predecessors*), dan mengonversi persentase termin kontrak menjadi nominal rupiah riil.
3. **Audit Trail on Master Amendments**: Setiap perubahan pada data kritis (seperti nilai kontrak, tanggal target selesai, penunjukan PM baru, atau perubahan margin) wajib menyertakan alasan penyesuaian dan disimpan dalam tabel log terenkripsi `project_master_audit_logs`.

## NAV-D-086 — Project Material and Inventory

Sumber: [[10-project/project-material-and-inventory|Project Material and Inventory]]

Dalam arsitektur modul logistik proyek Naventra ERP:

1. **Otomatisasi Reservasi dari Jadwal WBS**: Jadwal aktivitas instalasi pada diagram Gantt secara otomatis menghasilkan *Material Reservation* dengan tanggal pemenuhan (*Requirement Date*) yang disinkronkan dengan lead time pengadaan gudang.
2. **Mobile Warehouse Scanning untuk BAST Fisik**: Tim lapangan melakukan konfirmasi serah terima fisik perangkat di lokasi klien menggunakan aplikasi mobile barcode scanner, yang secara instan memicu dokumen *Goods Issue to Project* dan memperbarui status aktivitas proyek menjadi *Installed*.
3. **Workflow Rekonsiliasi Material Sisa**: Pada saat milestone instalasi selesai, sistem mewajibkan verifikasi status material sisa sebelum tahapan proyek dapat ditutup (*Technical Completion*). Kelebihan material wajib diproses melalui antarmuka *Return to Warehouse* atau *Scrap Confirmation*.

## NAV-D-087 — Project Planning & Scheduling

Sumber: [[10-project/project-planning-and-scheduling|Project Planning & Scheduling]]

Rancangan arsitektur modul Planning & Scheduling pada Naventra ERP:

1. **Topological Sort Scheduling Engine**: Penjadwalan Naventra dieksekusi oleh mesin algoritma graf terarah (*Directed Acyclic Graph - DAG*) yang menerapkan algoritma *Topological Sort* dan *Critical Path Method*. Sistem menghitung tanggal awal tercepat, tanggal akhir terlambat, dan total float untuk ribuan tugas dalam hitungan detik.
2. **Immutable Baseline Snapshotting**: Naventra menyimpan rekaman snapshot jadwal ke dalam tabel `project_schedule_baselines` setiap kali proyek beralih status ke `IN_PROGRESS`. Dasbor Gantt Chart menyajikan tampilan dua lapis (*Dual-Bar Gantt*): bilah abu-abu untuk jadwal rencana awal (*Baseline*) dan bilah biru/merah untuk jadwal realisasi berjalan (*Current Schedule*).
3. **Conflict Detection Webhook**: Jika pengubahan jadwal pada suatu tugas berdampak pada pergeseran tanggal penagihan milestone atau tanggal ketersediaan material gudang, Naventra memicu *event webhook* yang memperingatkan manajer pengadaan dan akuntan proyek secara *real-time*.

## NAV-D-088 — Project Procurement

Sumber: [[10-project/project-procurement|Project Procurement]]

Dalam perancangan fungsionalitas Project Procurement pada Naventra ERP:

1. **Mandatory WBS Tagging on PR**: Setiap pembuatan *Purchase Requisition* dengan kategori proyek wajib menyertakan kode WBS tingkat terendah (*Work Package*). Sistem memvalidasi ketersediaan saldo anggaran WBS sebelum PR dapat dikirim ke departemen *Procurement*.
2. **BAST Subkontraktor Terintegrasi**: Naventra menyediakan dokumen digital *Service Acceptance Sheet* / BAST yang mewajibkan lampiran bukti kerja (*deliverables*). Persetujuan dokumen ini otomatis melepaskan *hold* pada pembuatan faktur tagihan vendor.
3. **Penyelarasan Tanggal Pengiriman ke Gantt Chart**: Perubahan tanggal estimasi pengiriman barang/jasa dari vendor secara otomatis memicu notifikasi peringatan jika tanggal tersebut berisiko memundurkan *Task* pada jalur kritis (*Critical Path*).

## NAV-D-089 — Project Profitability

Sumber: [[10-project/project-profitability|Project Profitability]]

Dalam perancangan modul analisis profitabilitas Naventra ERP:

1. **Real-time Margin Tracking Dashboard**: Dashboard manajer proyek menampilkan visualisasi *burn rate* biaya dan prediksi margin akhir (*Projected Final Margin*) yang diperbarui setiap hari berdasarkan entri timesheet yang disetujui.
2. **Automated Overhead Surcharge Engine**: Naventra mengintegrasikan modul *Cost Accounting* yang secara otomatis menghitung dan membebankan alokasi *indirect overhead* bulanan ke WBS proyek berdasarkan formula yang dapat disesuaikan tanpa intervensi manual.
3. **Variance Drill-Down to Source Documents**: Klik pada deviasi margin langsung membuka rincian dokumen sumber pendukung (misalnya klik pada deviasi biaya tenaga kerja langsung membuka daftar lembar kerja timesheet konsultan terkait).

## NAV-D-090 — Project Reporting and Analytics

Sumber: [[10-project/project-reporting-and-analytics|Project Reporting and Analytics]]

Dalam perancangan modul pelaporan dan analitik proyek Naventra ERP:

1. **Eksekutif Dashboard Real-Time**: Antarmuka PMO yang memvisualisasikan seluruh portofolio proyek dalam bentuk matriks kuadran interaktif (Margin vs Jadwal) dengan penanda otomatis status kesehatan proyek (*RAG Status*).
2. **Automated Weekly Progress Report Generator**: Sistem secara otomatis menyusun ringkasan kemajuan mingguan berformat PDF resmi (mencakup progres fisik, grafik S-Curve, status penagihan BAST, dan daftar isu kritis) yang siap dikirimkan kepada pemangku kepentingan klien.
3. **Komprehensif Audit Trail & Snapshot**: Naventra menyimpan rekaman jejak (*snapshot*) mingguan untuk seluruh metrik proyek, memungkinkan rekonstruksi historis atas evolusi estimasi biaya dan pergeseran jalur kritis sepanjang siklus hidup proyek.

## NAV-D-091 — Project Resource Management

Sumber: [[10-project/project-resource-management|Project Resource Management]]

Rancangan arsitektur modul Resource Management pada Naventra ERP:

1. **Dual-Rate Matrix Engine**: Naventra mengelola tarif sumber daya melalui tabel multidimensi `resource_rate_matrices` (`role_id`, `resource_id`, `project_type_id`, `cost_rate`, `billing_rate`, `valid_from`, `valid_to`). Saat jam kerja di-posting, sistem menentukan tarif yang berlaku secara deterministik berdasarkan tanggal pelaksanaan kerja.
2. **Interactive Resource Heatmap**: Dasbor Naventra menyajikan *Resource Utilization Heatmap* visual: sel berwarna hijau untuk staf dengan utilisasi optimal (75–85%), kuning untuk utilisasi rendah (< 50%), dan merah untuk staf yang mengalami *over-allocation* (> 100%), memudahkan manajer proyek melakukan penyeimbangan beban kerja (*resource re-balancing*).
3. **Automated HR Leave Synchronization**: Modul alokasi Naventra terhubung secara reaktif dengan modul HR. Setiap kali pengajuan cuti karyawan disetujui, sistem secara otomatis mengevaluasi alokasi kerja yang terdampak dan memberi peringatan kepada Manajer Proyek terkait.

## NAV-D-092 — Project Structure & Work Breakdown Structure (WBS)

Sumber: [[10-project/project-structure-and-work-breakdown|Project Structure & Work Breakdown Structure (WBS)]]

Rancangan arsitektur struktur WBS pada Naventra ERP:

1. **Adjacency-List with Materialized Path**: Tabel `project_wbs_nodes` pada Naventra menggunakan kombinasi model relasional *Adjacency List* (`parent_id`) dan *Materialized Path* (`path = 'PRJ-001/PRJ-001.2/PRJ-001.2.1'`). Struktur ini memungkinkan kueri pohon WBS dan kalkulasi akumulasi biaya seluruh anak cabang dieksekusi dalam satu kueri SQL cepat tanpa perulangan komputasi yang berat.
2. **Decoupled Financial WBS & Operational Task**: Naventra memisahkan node pengumpul biaya (*WBS Element*) dari unit kerja personal (*Operational Task*). Satu node WBS dapat menaungi puluhan tugas teknis harian tanpa mengotori laporan keuangan manajerial dengan baris tugas mikro.
3. **Automated Budget Ceiling Gatekeeper**: Saat pengguna menginput perubahan anggaran pada suatu sub-elemen WBS, sistem Naventra mengeksekusi *validation trigger* yang memastikan jumlah alokasi anak cabang tidak melanggar batas plafon node induk di atasnya.

## NAV-D-093 — Project Task & Milestone Management

Sumber: [[10-project/project-task-and-milestone|Project Task & Milestone Management]]

Rancangan arsitektur Task & Milestone pada Naventra ERP:

1. **Automated Billing Signal Dispatcher**: Saat status suatu record di tabel `project_milestones` diperbarui menjadi `ACHIEVED`, sistem Naventra mempublikasikan domain event `MilestoneAchievedEvent`. Modul penagihan (*Billing Service*) menangkap sinyal ini dan secara otomatis menerbitkan draf faktur piutang di modul Sales tanpa campur tangan staf admin.
2. **Digital BAST Attachment Hook**: Formulir pengesahan milestone pada Naventra mewajibkan pengunggahan berkas bukti (PDF BAST) dan tanda tangan digital penanggung jawab. Sistem mencatat stempel waktu SHA-256 pada berkas untuk mencegah modifikasi dokumen bukti audit di masa depan.
3. **Interactive Progress Barometer**: Dasbor Naventra menyajikan visualisasi *Milestone Timeline* interaktif yang menampilkan status lampu lalu lintas (*Traffic-Light Status*): hijau untuk milestone selesai tepat waktu, kuning untuk mendekati tenggat waktu, dan merah untuk milestone yang tertunda (*delayed*).

## NAV-D-094 — Timesheet & Effort Tracking

Sumber: [[10-project/timesheet-and-effort-tracking|Timesheet & Effort Tracking]]

Rancangan arsitektur modul Timesheet & Effort Tracking pada Naventra ERP:

1. **One-Click Mobile Timer & Weekly Grid**: Naventra menyediakan dua mode penginputan: (1) *Live Stopwatch Timer* pada aplikasi web/mobile yang dapat dinyalakan saat staf mulai bekerja pada suatu task, dan (2) *Weekly Timesheet Matrix* untuk penginputan cepat berbasis matriks hari $\times$ tugas.
2. **Dual-Lock Approval Pipeline**: Sistem menerapkan pipa validasi otomatis: saat tombol *Submit* ditekan, mesin sistem memvalidasi batas maksimum jam kerja dan status keterbukaan periode GL. Manajer Proyek dapat menyetujui seluruh lembar kerja secara massal (*Bulk Approval*) atau menolak baris tertentu dengan menyertakan catatan koreksi.
3. **Atomic Cost & Backlog Generation**: Persetujuan *timesheet* memicu transaksi basis data atomik yang secara simultan memperbarui tabel akumulasi biaya proyek `project_actual_costs` dan tabel penagihan piutang belum tertagih `project_unbilled_revenue`.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-078 | `10-project/project-billing-and-revenue.md` | Adopted |
| NAV-D-079 | `10-project/project-budget-and-cost-control.md` | Adopted |
| NAV-D-080 | `10-project/project-change-risk-and-issue-management.md` | Adopted |
| NAV-D-081 | `10-project/project-completion-and-closing.md` | Adopted |
| NAV-D-082 | `10-project/project-cost-management.md` | Adopted |
| NAV-D-083 | `10-project/project-integration.md` | Adopted |
| NAV-D-084 | `10-project/project-management-fundamentals.md` | Adopted |
| NAV-D-085 | `10-project/project-master-data.md` | Adopted |
| NAV-D-086 | `10-project/project-material-and-inventory.md` | Adopted |
| NAV-D-087 | `10-project/project-planning-and-scheduling.md` | Adopted |
| NAV-D-088 | `10-project/project-procurement.md` | Adopted |
| NAV-D-089 | `10-project/project-profitability.md` | Adopted |
| NAV-D-090 | `10-project/project-reporting-and-analytics.md` | Adopted |
| NAV-D-091 | `10-project/project-resource-management.md` | Adopted |
| NAV-D-092 | `10-project/project-structure-and-work-breakdown.md` | Adopted |
| NAV-D-093 | `10-project/project-task-and-milestone.md` | Adopted |
| NAV-D-094 | `10-project/timesheet-and-effort-tracking.md` | Adopted |

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
