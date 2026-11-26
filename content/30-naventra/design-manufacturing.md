---
title: Naventra Design — manufacturing
---

# Naventra Design — manufacturing

## Definition

Keputusan desain Naventra yang diekstrak dari artikel `07-manufacturing`. Teks keputusan dipindahkan apa adanya; artikel sumber menyisakan satu baris rujukan.

## NAV-D-029 — Capacity Planning and Production Scheduling

Sumber: [[07-manufacturing/capacity-planning-and-scheduling|Capacity Planning and Production Scheduling]]

Untuk perancangan modul Perencanaan Kapasitas pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Pembebanan Kapasitas Stasiun Kerja**:
   ```sql
   CREATE TABLE work_center_capacity_loads (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       work_center_id UUID NOT NULL REFERENCES work_centers(id),
       calendar_date DATE NOT NULL,
       total_available_hours NUMERIC(6, 2) NOT NULL,
       allocated_setup_hours NUMERIC(6, 2) NOT NULL DEFAULT 0,
       allocated_run_hours NUMERIC(6, 2) NOT NULL DEFAULT 0,
       allocated_downtime_hours NUMERIC(6, 2) NOT NULL DEFAULT 0,
       utilization_percentage NUMERIC(5, 2) GENERATED ALWAYS AS (
           ((allocated_setup_hours + allocated_run_hours) / NULLIF(total_available_hours, 0)) * 100.0
       ) STORED,
       UNIQUE (work_center_id, calendar_date)
   );
   ```
2. **Algoritma Finite Forward Scheduling pada Level Backend**:
   Saat pesanan dijadwalkan, sistem memeriksa tabel `work_center_capacity_loads`. Jika `utilization_percentage >= 100%`, algoritma secara otomatis melompat ke tanggal hari kerja berikutnya (`calendar_date + 1`) hingga menemukan slot waktu luang yang mencukupi.
3. **Pemberitahuan Peringatan Overload (Overload Warning Alerts)**:
   Sediakan antarmuka grafik batang kapasitas (*Capacity Load Profile*) yang secara visual mewarnai tanggal stasiun kerja menjadi merah jika utilisasi melampaui 90%, membantu manajer pabrik mengambil keputusan pembukaan shift lembur secara proaktif.

## NAV-D-030 — Manufacturing Fundamentals in ERP

Sumber: [[07-manufacturing/manufacturing-fundamentals|Manufacturing Fundamentals in ERP]]

Untuk perancangan modul Manufaktur pada sistem ERP enterprise seperti **Naventra**:

1. **State Machine Pesanan Produksi yang Ketat**: Terapkan mesin status berbasis FSM pada entitas pesanan produksi:
   `DRAFT` $\to$ `PLANNED` $\to$ `CONFIRMED` $\to$ `RELEASED` $\to$ `IN_PROGRESS` $\to$ `COMPLETED` $\to$ `CLOSED` (atau `CANCELLED`). Mutasi persediaan fisik hanya diizinkan pada status `RELEASED` dan `IN_PROGRESS`.
2. **Snapshotting BOM dan Routing pada Saat Order Release**:
   Saat status pesanan beralih ke `RELEASED`, sistem wajib menyalin (*snapshot*) seluruh baris komponen BOM dan urutan operasi Routing ke dalam tabel kerja transaksi (`mo_materials` dan `mo_operations`). Hal ini mencegah terganggunya proses produksi yang sedang berjalan jika tim R&D merevisi master data BOM pada saat bersamaan.
3. **Pemisahan Jalur Transaksi (Decoupled Services)**:
   Pisahkan modul perencanaan (*MRP Service*) yang bersifat komputasi berat (*batch calculation*) dari modul eksekusi lantai pabrik (*Shop Floor Execution Service*) yang menuntut latensi rendah (*low latency*) saat operator memindai barcode pekerjaan.

## NAV-D-031 — Manufacturing and Production Integration Architecture

Sumber: [[07-manufacturing/manufacturing-integration|Manufacturing and Production Integration Architecture]]

Untuk perancangan modul Integrasi Manufaktur pada sistem ERP enterprise seperti **Naventra**:

1. **Pola Desain Arsitektur Event-Driven (Domain Events Pipeline)**:
   * Saat pesanan produksi selesai, sistem mempublikasikan domain event internal: `ManufacturingOrderCompletedEvent` (`mo_id`, `product_id`, `produced_qty`, `scrap_qty`, `total_cost_incurred`).
   * Layanan-layanan konsumen (*Subscribers*) merespons secara terisolasi:
     * *Inventory Service*: Menambah saldo barang jadi di gudang target.
     * *Accounting Service*: Menutup akun WIP dan mencatat jurnal persediaan barang jadi serta varians.
     * *Sales Service*: Memperbarui status pemenuhan pada Sales Order yang ditautkan (*Pegged SO*).
2. **Kepatuhan Transaksional dan Idempotensi Mutlak**:
   Setiap transaksi konfirmasi produksi wajib menggunakan kunci idempotensi (`idempotency_key = hash(mo_id, operation_id, confirmation_timestamp)`). Hal ini menjamin bahwa gangguan koneksi jaringan pada terminal operator lantai pabrik tidak akan pernah menggandakan pencatatan output fisik maupun penjurnalan biaya di buku besar.
3. **Penyediaan Visualisasi Pohon Genealogi Produk (Product Traceability Tree)**:
   Rancang antarmuka penelusuran grafis yang memungkinkan auditor mengklik nomor seri laptop jadi untuk langsung melihat nomor lot baterai, nomor surat jalan penerimaan pemasok (P2P), stasiun kerja yang merakitnya, dan nomor faktur penjualan ke pelanggan (O2C).

## NAV-D-032 — Manufacturing Order Lifecycle and State Machine

Sumber: [[07-manufacturing/manufacturing-order|Manufacturing Order Lifecycle and State Machine]]

Untuk perancangan modul Manufacturing Order pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Header dan Baris Transaksi MO**:
   ```sql
   CREATE TABLE manufacturing_orders (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       order_number VARCHAR(50) NOT NULL UNIQUE,
       product_id UUID NOT NULL REFERENCES items(id),
       bom_id UUID NOT NULL REFERENCES bill_of_materials(id),
       routing_id UUID NOT NULL REFERENCES routings(id),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       
       planned_quantity NUMERIC(15, 4) NOT NULL,
       produced_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       scrapped_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       
       planned_start_date TIMESTAMP WITH TIME ZONE NOT NULL,
       planned_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
       actual_start_date TIMESTAMP WITH TIME ZONE,
       actual_end_date TIMESTAMP WITH TIME ZONE,
       
       status VARCHAR(30) NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'PLANNED', 'SCHEDULED', 'RELEASED', 'IN_PROGRESS', 'COMPLETED', 'CLOSED', 'CANCELLED'
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Kepatuhan Guard Condition FSM**:
   Backend wajib memblokir transisi status yang melompati tahapan logis. Sebagai contoh, status `DRAFT` dilarang langsung beralih ke `IN_PROGRESS` tanpa melalui gerbang `RELEASED` guna memastikan alokasi bahan baku di gudang telah tereksekusi dengan benar.
3. **Pemberlakuan Kunci Concurrency pada Pengeluaran dan Penerimaan**:
   Gunakan transaksi database berpasangan saat memproses *Material Issue* dan *Output Confirmation* untuk mencegah *race condition* pada pemotongan saldo persediaan di gudang penyimpanan.

## NAV-D-033 — Manufacturing Reporting and Operational Analytics

Sumber: [[07-manufacturing/manufacturing-reporting-and-analytics|Manufacturing Reporting and Operational Analytics]]

Untuk perancangan modul Pelaporan Manufaktur pada sistem ERP enterprise seperti **Naventra**:

1. **Denormalisasi untuk Analitik Kinerja Cepat (Materialized Views)**:
   Perhitungan metrik manufaktur melibatkan penggabungan tabel yang sangat besar (`mo`, `lines`, `operations`, `confirmations`, `scraps`). Bangun tabel agregat atau *materialized view* khusus (misal: `analytics_daily_factory_performance`) yang diperbarui secara terjadwal setiap pergantian shift kerja.
2. **Kalkulasi Metrik OEE Otomatis pada Database Events**:
   Saat operator men-submit `mo_operation_confirmations`, trigger sistem secara otomatis menghitung durasi produktif vs downtime dan menyimpan metrik OEE parsial per mesin di tabel `work_center_oee_logs`.
3. **Penyediaan Widget Dasbor Pabrik Out-of-the-Box**:
   Sediakan widget bawaan pada halaman beranda staf manufaktur:
   * Widget *Andon Board*: Menampilkan status lampu hijau/kuning/merah untuk setiap stasiun kerja secara real-time.
   * Widget *Scrap Pareto Chart*: Diagram batang yang mengurutkan penyebab kecacatan produk terbesar untuk memandu program perbaikan berkelanjutan (*Kaizen / Six Sigma*).

## NAV-D-034 — Material Availability and Production Reservation

Sumber: [[07-manufacturing/material-availability-and-reservation|Material Availability and Production Reservation]]

Untuk perancangan modul Reservasi Material Manufaktur pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Alokasi Komponen MO**:
   ```sql
   CREATE TABLE mo_material_allocations (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       manufacturing_order_id UUID NOT NULL REFERENCES manufacturing_orders(id) ON DELETE CASCADE,
       component_item_id UUID NOT NULL REFERENCES items(id),
       required_quantity NUMERIC(15, 4) NOT NULL,
       reserved_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       issued_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       source_storage_location_id UUID REFERENCES storage_locations(id),
       allocated_batch_number VARCHAR(100),
       status VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'FULLY_RESERVED', 'PARTIALLY_RESERVED', 'SHORTAGE', 'ISSUED'
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Atomic Soft-to-Hard Reservation Transition**:
   Saat status MO berpindah ke `RELEASED`, backend mengeksekusi fungsi transaksi yang mengubah status `mo_material_allocations` dari kuantitas abstrak menjadi penunjukan koordinat rak (`source_storage_location_id`) dan nomor batch (`allocated_batch_number`) secara spesifik.
3. **Shortage Warning Dashboard API**:
   Sediakan endpoint analitik (`GET /api/v1/manufacturing/orders/:id/shortage-analysis`) yang mengembalikan daftar rincian komponen yang mengalami defisit, tanggal ekspektasi kedatangan Purchase Order terkait, dan rekomendasi alternatif suku cadang yang tersedia di gudang lain.

## NAV-D-035 — Material Consumption and Backflushing Mechanics

Sumber: [[07-manufacturing/material-consumption-and-backflush|Material Consumption and Backflushing Mechanics]]

Untuk perancangan modul Konsumsi Material pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Mutasi Konsumsi Bahan**:
   ```sql
   CREATE TABLE mo_material_consumptions (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       manufacturing_order_id UUID NOT NULL REFERENCES manufacturing_orders(id),
       operation_id UUID REFERENCES routing_operations(id),
       component_item_id UUID NOT NULL REFERENCES items(id),
       source_warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       source_storage_location_id UUID REFERENCES storage_locations(id),
       batch_number VARCHAR(100),
       serial_number VARCHAR(100),
       
       consumption_type VARCHAR(20) NOT NULL, -- 'MANUAL_ISSUE', 'BACKFLUSH'
       standard_quantity NUMERIC(15, 4) NOT NULL,
       actual_quantity NUMERIC(15, 4) NOT NULL,
       unit_cost NUMERIC(18, 4) NOT NULL,
       total_cost NUMERIC(18, 4) GENERATED ALWAYS AS (actual_quantity * unit_cost) STORED,
       
       posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Flag Flushing Principle pada Master BOM**:
   Sediakan kolom `flushing_principle` pada tabel `bill_of_material_lines` (`'MANUAL'`, `'AT_START'`, `'AT_FINISH'`). Saat memproses API output barang jadi, backend secara otomatis memicu fungsi *backflush worker* hanya untuk komponen yang berstatus non-manual.
3. **Pemberlakuan Kunci Mutasi Stok Atomik**:
   Setiap konsumsi bahan wajib dieksekusi di dalam blok transaksi database bersamaan dengan pemotongan stok pada tabel `inventory_balances` dan penambahan saldo pada akun buku besar WIP, guna menjamin tidak ada ketimpangan antara kartu stok dan neraca keuangan.

## NAV-D-036 — Material Requirements Planning (MRP)

Sumber: [[07-manufacturing/mrp-material-requirement-planning|Material Requirements Planning (MRP)]]

Untuk perancangan modul MRP pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Hasil Komputasi MRP**:
   ```sql
   CREATE TABLE mrp_runs (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       run_code VARCHAR(50) NOT NULL UNIQUE,
       run_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED', -- 'RUNNING', 'COMPLETED', 'FAILED'
       parameters_json JSONB
   );

   CREATE TABLE mrp_planned_orders (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       mrp_run_id UUID NOT NULL REFERENCES mrp_runs(id) ON DELETE CASCADE,
       item_id UUID NOT NULL REFERENCES items(id),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       order_type VARCHAR(20) NOT NULL, -- 'MANUFACTURE', 'PURCHASE', 'TRANSFER'
       suggested_quantity NUMERIC(15, 4) NOT NULL,
       demand_date DATE NOT NULL, -- Tanggal material dibutuhkan
       release_date DATE NOT NULL, -- Tanggal pesanan harus diterbitkan (offset lead time)
       pegged_demand_doc_type VARCHAR(50),
       pegged_demand_doc_id UUID,
       status VARCHAR(30) NOT NULL DEFAULT 'SUGGESTED' -- 'SUGGESTED', 'CONVERTED', 'IGNORED'
   );
   ```
2. **Kalkulasi Rekursif Berbasis Low-Level Code (LLC)**:
   Algoritma MRP pada backend wajib mengurutkan komputasi berdasarkan `items.low_level_code ASC` (mulai dari level 0, lalu level 1, hingga level terbawah). Hal ini menjamin bahwa seluruh kebutuhan kotor turunan (*dependent gross requirements*) telah terakumulasi secara lengkap sebelum perhitungan kebutuhan bersih komponen anak dieksekusi.
3. **Mekanisme Bulk Conversion ke Dokumen Transaksional**:
   Sediakan API *bulk conversion* (`POST /api/v1/mrp/convert-planned-orders`) yang secara atomik mengubah baris-baris `mrp_planned_orders` berjenis `PURCHASE` menjadi dokumen draf `purchase_requisitions` dan berjenis `MANUFACTURE` menjadi dokumen draf `manufacturing_orders`.

## NAV-D-037 — Product Structure and Bill of Materials (BOM)

Sumber: [[07-manufacturing/product-structure-and-bom|Product Structure and Bill of Materials (BOM)]]

Untuk perancangan modul BOM pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Relasional BOM Multi-Level Terindeks**:
   ```sql
   CREATE TABLE bill_of_materials (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       bom_number VARCHAR(50) NOT NULL UNIQUE,
       parent_item_id UUID NOT NULL REFERENCES items(id),
       bom_version VARCHAR(20) NOT NULL DEFAULT '1.0',
       bom_type VARCHAR(30) NOT NULL DEFAULT 'MANUFACTURING', -- 'MANUFACTURING', 'PHANTOM', 'SUBCONTRACT'
       quantity NUMERIC(15, 4) NOT NULL DEFAULT 1.0, -- Basis kuantitas induk
       uom_id UUID NOT NULL REFERENCES uoms(id),
       is_active BOOLEAN NOT NULL DEFAULT TRUE,
       valid_from DATE NOT NULL,
       valid_to DATE,
       routing_id UUID REFERENCES routings(id),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       UNIQUE (parent_item_id, bom_version)
   );

   CREATE TABLE bill_of_material_lines (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       bom_id UUID NOT NULL REFERENCES bill_of_materials(id) ON DELETE CASCADE,
       component_item_id UUID NOT NULL REFERENCES items(id),
       quantity_per NUMERIC(15, 4) NOT NULL,
       uom_id UUID NOT NULL REFERENCES uoms(id),
       scrap_factor_pct NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
       is_phantom BOOLEAN NOT NULL DEFAULT FALSE,
       operation_sequence_no INT, -- Ditautkan ke nomor operasi routing
       line_position INT NOT NULL
   );
   ```
2. **Pencegahan Struktur Sirkular (*Circular Reference Check*)**:
   Backend wajib menerapkan fungsi validasi rekursif (menggunakan *Common Table Expression / CTE*) untuk mencegah pembuatan BOM yang merujuk dirinya sendiri secara langsung atau tidak langsung (misal: Item A membutuhkan Subassembly B, dan Subassembly B diatur membutuhkan Item A).
3. **BOM Cost Roll-up Engine**:
   Sediakan fungsi otomatis untuk menghitung ulang biaya bahan baku standar produk jadi: sistem menjumlahkan $(\text{unit\_cost} \times \text{quantity\_per} \times (1 + \text{scrap\_factor})) $ dari seluruh komponen anak secara berjenjang ke atas.

## NAV-D-038 — Production Costing and Work in Process (WIP)

Sumber: [[07-manufacturing/production-costing-and-wip|Production Costing and Work in Process (WIP)]]

Untuk perancangan modul Akuntansi Biaya Manufaktur pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Akumulasi Biaya Pesanan Produksi (Cost Ledgers)**:
   ```sql
   CREATE TABLE mo_cost_accumulations (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       manufacturing_order_id UUID NOT NULL REFERENCES manufacturing_orders(id),
       cost_category VARCHAR(30) NOT NULL, -- 'DIRECT_MATERIAL', 'DIRECT_LABOR', 'MACHINE_OVERHEAD', 'SUBCONTRACT'
       standard_cost_amount NUMERIC(18, 4) NOT NULL DEFAULT 0,
       actual_cost_amount NUMERIC(18, 4) NOT NULL DEFAULT 0,
       variance_amount NUMERIC(18, 4) GENERATED ALWAYS AS (actual_cost_amount - standard_cost_amount) STORED,
       gl_wip_account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
       gl_variance_account_id UUID REFERENCES chart_of_accounts(id),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Kalkulasi Otomatis Ending WIP pada Penutupan Periode**:
   Sediakan prosedur akhir bulan yang memindai seluruh MO berstatus `IN_PROGRESS`. Sistem menghitung nilai `ending_wip_value` berdasarkan material yang telah di-issue dikurangi proporsi unit yang telah di-*receipt*, memastikan neraca keuangan mencerminkan nilai aset yang sah sebelum pembukuan ditutup.
3. **Pemberlakuan Kunci Mutasi Pasca Financial Close**:
   Segera setelah status MO berubah menjadi `CLOSED`, backend wajib memblokir seluruh upaya posting baru (baik material issue, timesheet labor, maupun penyesuaian tambahan) untuk menjamin integritas laporan keuangan audit.

## NAV-D-039 — Production Output, Co-Products, and By-Products

Sumber: [[07-manufacturing/production-output-and-by-product|Production Output, Co-Products, and By-Products]]

Untuk perancangan modul Hasil Produksi dan By-Products pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Hasil Produksi Multi-Output**:
   ```sql
   CREATE TABLE mo_production_outputs (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       manufacturing_order_id UUID NOT NULL REFERENCES manufacturing_orders(id),
       output_type VARCHAR(20) NOT NULL, -- 'PRIMARY_FG', 'CO_PRODUCT', 'BY_PRODUCT', 'SCRAP'
       item_id UUID NOT NULL REFERENCES items(id),
       target_warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       target_storage_location_id UUID REFERENCES storage_locations(id),
       lot_number VARCHAR(100),
       serial_number VARCHAR(100),
       
       quantity_completed NUMERIC(15, 4) NOT NULL,
       cost_allocation_pct NUMERIC(5, 2) NOT NULL DEFAULT 100.00, -- Persentase alokasi biaya WIP
       unit_cost NUMERIC(18, 4) NOT NULL,
       total_value NUMERIC(18, 4) GENERATED ALWAYS AS (quantity_completed * unit_cost) STORED,
       
       received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Pemberlakuan Batas Alokasi Biaya Total (100% Cost Rule)**:
   Backend wajib memvalidasi bahwa total persentase alokasi biaya gabungan antara produk utama dan seluruh co-products tepat sama dengan 100%:
   $$\sum \text{cost\_allocation\_pct} = 100,00\%$$
3. **Pemisahan Jalur Penerimaan Fisik**:
   Sediakan otomatisasi penentuan lokasi gudang target: baris bertipe `PRIMARY_FG` dialokasikan ke *Finished Goods Warehouse*, sedangkan baris bertipe `SCRAP` secara otomatis diarahkan ke *Quarantine/Scrap Yard* agar tidak bercampur dengan stok komersial.

## NAV-D-040 — Production Planning and Master Production Scheduling (MPS)

Sumber: [[07-manufacturing/production-planning|Production Planning and Master Production Scheduling (MPS)]]

Untuk perancangan modul Production Planning pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Perencanaan MPS**:
   ```sql
   CREATE TABLE master_production_schedules (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       plan_code VARCHAR(50) NOT NULL UNIQUE,
       planning_horizon_start DATE NOT NULL,
       planning_horizon_end DATE NOT NULL,
       bucket_type VARCHAR(20) NOT NULL DEFAULT 'WEEKLY', -- 'DAILY', 'WEEKLY', 'MONTHLY'
       status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE mps_line_items (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       schedule_id UUID NOT NULL REFERENCES master_production_schedules(id) ON DELETE CASCADE,
       product_id UUID NOT NULL REFERENCES items(id),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       time_bucket_date DATE NOT NULL,
       forecast_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       sales_order_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       projected_available_balance NUMERIC(15, 4) NOT NULL DEFAULT 0,
       mps_planned_receipt_qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
       mps_planned_start_qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
       is_firmed BOOLEAN NOT NULL DEFAULT FALSE
   );
   ```
2. **Kalkulasi Latar Belakang Asinkron (*Background Planning Engine*)**:
   Komputasi MPS dan perataan permintaan melibatkan ribuan baris data. Jalankan perhitungan pada *background worker* terpisah dan simpan hasilnya pada tabel `mps_line_items`, sehingga antarmuka pengguna dapat menampilkan kisi-kisi perencanaan (*planning matrix*) secara instan tanpa membebani thread transaksi utama.
3. **Mekanisme Firming Transaksional**:
   Sediakan tombol *Firm Order* pada kisi MPS yang secara atomik mengunci baris rencana (`is_firmed = TRUE`) dan mengubahnya menjadi draf pesanan resmi pada tabel `manufacturing_orders`.

## NAV-D-041 — Production Quality Control and Rework Management

Sumber: [[07-manufacturing/production-quality-and-rework|Production Quality Control and Rework Management]]

Untuk perancangan modul Manajemen Mutu Manufaktur pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Pemeriksaan Mutu Terintegrasi**:
   ```sql
   CREATE TABLE quality_inspection_orders (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       inspection_number VARCHAR(50) NOT NULL UNIQUE,
       source_doc_type VARCHAR(50) NOT NULL, -- 'MANUFACTURING_ORDER', 'GOODS_RECEIPT'
       source_doc_id UUID NOT NULL,
       operation_id UUID REFERENCES routing_operations(id),
       item_id UUID NOT NULL REFERENCES items(id),
       lot_number VARCHAR(100),
       serial_number VARCHAR(100),
       inspected_quantity NUMERIC(15, 4) NOT NULL,
       passed_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       failed_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       inspection_result VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'PASSED', 'FAILED'
       inspector_user_id UUID REFERENCES users(id),
       inspected_at TIMESTAMP WITH TIME ZONE,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE quality_inspection_parameters (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       inspection_order_id UUID NOT NULL REFERENCES quality_inspection_orders(id) ON DELETE CASCADE,
       parameter_name VARCHAR(100) NOT NULL, -- Contoh: 'Tegangan Baterai (Volt)', 'Suhu CPU (C)'
       specification_min NUMERIC(12, 4),
       specification_max NUMERIC(12, 4),
       actual_reading NUMERIC(12, 4),
       is_passed BOOLEAN NOT NULL
   );
   ```
2. **Quality Gate Hook pada Output Confirmation**:
   Backend wajib menolak pemindahan status kuantitas ke `Available ATP` jika `quality_inspection_orders` yang ditautkan belum berstatus `PASSED`. Kuantitas yang gagal uji secara otomatis diarahkan ke tabel `inventory_balances` dengan status `quarantine_qty`.
3. **Penyediaan Alur Otomasi Dokumen NCR**:
   Saat `failed_quantity > 0`, sistem secara otomatis menerbitkan draft dokumen *Non-Conformance Report (NCR)* dan mengirimkan notifikasi ke tim *Quality Engineer* untuk segera menentukan keputusan disposisi (*Scrap* atau *Rework*).

## NAV-D-042 — Production Variance and Operational Performance

Sumber: [[07-manufacturing/production-variance-and-performance|Production Variance and Operational Performance]]

Untuk perancangan modul Analisis Varians Manufaktur pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Catatan Varians Produksi (Variance Ledgers)**:
   ```sql
   CREATE TABLE mo_production_variances (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       manufacturing_order_id UUID NOT NULL REFERENCES manufacturing_orders(id),
       variance_type VARCHAR(30) NOT NULL, -- 'MATERIAL_USAGE', 'MATERIAL_PRICE', 'LABOR_RATE', 'LABOR_EFFICIENCY', 'SCRAP'
       cost_element_code VARCHAR(50) NOT NULL,
       standard_amount NUMERIC(18, 4) NOT NULL,
       actual_amount NUMERIC(18, 4) NOT NULL,
       variance_amount NUMERIC(18, 4) GENERATED ALWAYS AS (actual_amount - standard_amount) STORED,
       is_favorable BOOLEAN GENERATED ALWAYS AS ((actual_amount - standard_amount) <= 0) STORED,
       gl_variance_account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
       calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Kalkulasi Varians Otomatis Saat Eksekusi Order Close**:
   Saat status pesanan beralih ke `CLOSED`, backend mengeksekusi fungsi kalkulasi varians yang membandingkan baris `mo_material_consumptions` dan `mo_operation_confirmations` terhadap standar BOM dan Routing, lalu secara otomatis memposting baris jurnal ke akun varians GL yang relevan.
3. **Penyediaan Dashboard Eksekutif Pabrik (Factory Floor Scorecard)**:
   Sediakan antarmuka dashboard yang menampilkan perbandingan visual antara target biaya standar vs biaya riil per unit produk jadi, dilengkapi dengan metrik tren OEE stasiun kerja untuk membantu manajemen pabrik mengidentifikasi sumber inefisiensi biaya secara cepat.

## NAV-D-043 — Routing and Work Center Architecture

Sumber: [[07-manufacturing/routing-and-work-center|Routing and Work Center Architecture]]

Untuk perancangan modul Routing dan Work Center pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Relasional Work Center dan Routing**:
   ```sql
   CREATE TABLE work_centers (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       code VARCHAR(20) NOT NULL UNIQUE,
       name VARCHAR(100) NOT NULL,
       work_center_type VARCHAR(30) NOT NULL, -- 'MACHINE', 'LABOR_LINE', 'OUTSOURCED'
       capacity_per_day_hours NUMERIC(6, 2) NOT NULL DEFAULT 8.00,
       efficiency_percentage NUMERIC(5, 2) NOT NULL DEFAULT 100.00,
       cost_per_hour_labor NUMERIC(18, 4) NOT NULL DEFAULT 0,
       cost_per_hour_machine NUMERIC(18, 4) NOT NULL DEFAULT 0,
       cost_per_hour_overhead NUMERIC(18, 4) NOT NULL DEFAULT 0,
       calendar_id UUID NOT NULL REFERENCES production_calendars(id),
       is_active BOOLEAN NOT NULL DEFAULT TRUE
   );

   CREATE TABLE routings (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       routing_code VARCHAR(50) NOT NULL UNIQUE,
       name VARCHAR(100) NOT NULL,
       product_id UUID NOT NULL REFERENCES items(id),
       is_active BOOLEAN NOT NULL DEFAULT TRUE,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE routing_operations (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       routing_id UUID NOT NULL REFERENCES routings(id) ON DELETE CASCADE,
       sequence_number INT NOT NULL, -- 10, 20, 30...
       operation_name VARCHAR(100) NOT NULL,
       work_center_id UUID NOT NULL REFERENCES work_centers(id),
       setup_time_minutes NUMERIC(8, 2) NOT NULL DEFAULT 0,
       run_time_minutes_per_unit NUMERIC(8, 2) NOT NULL DEFAULT 0,
       wait_time_minutes NUMERIC(8, 2) NOT NULL DEFAULT 0,
       move_time_minutes NUMERIC(8, 2) NOT NULL DEFAULT 0,
       work_instructions_text TEXT,
       UNIQUE (routing_id, sequence_number)
   );
   ```
2. **Kalkulasi Total Lead Time Terotomasi**:
   Sediakan fungsi backend yang menghitung proyeksi tanggal selesai (*Projected Completion Date*) berdasarkan ukuran pesanan produksi dan kalender kerja stasiun kerja (mengabaikan hari libur dan jam non-operasional).
3. **Pemberlakuan Kaitan Komponen BOM ke Nomor Operasi**:
   Saat mengeksekusi *Shop Floor Control*, operator hanya disajikan daftar komponen yang memiliki `operation_sequence_no` yang cocok dengan tahapan kerja yang sedang aktif di stasiun kerjanya.

## NAV-D-044 — Shop Floor Control and Work Order Execution

Sumber: [[07-manufacturing/shop-floor-execution|Shop Floor Control and Work Order Execution]]

Untuk perancangan modul Shop Floor Execution pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Konfirmasi Operasi Kerja (Job Confirmations)**:
   ```sql
   CREATE TABLE mo_operation_confirmations (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       manufacturing_order_id UUID NOT NULL REFERENCES manufacturing_orders(id),
       operation_id UUID NOT NULL REFERENCES routing_operations(id),
       work_center_id UUID NOT NULL REFERENCES work_centers(id),
       operator_user_id UUID NOT NULL REFERENCES users(id),
       
       start_time TIMESTAMP WITH TIME ZONE NOT NULL,
       end_time TIMESTAMP WITH TIME ZONE NOT NULL,
       setup_duration_minutes NUMERIC(8, 2) NOT NULL DEFAULT 0,
       run_duration_minutes NUMERIC(8, 2) NOT NULL DEFAULT 0,
       downtime_duration_minutes NUMERIC(8, 2) NOT NULL DEFAULT 0,
       downtime_reason_code VARCHAR(50),
       
       good_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       scrapped_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       rework_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       
       status VARCHAR(30) NOT NULL DEFAULT 'CONFIRMED',
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Desain Antarmuka Touchscreen Tanpa Keyboard (Operator-Centric UI)**:
   Rancang layar antarmuka *Shop Floor Terminal* berbasis tombol besar yang dapat ditekan menggunakan sarung tangan pabrik, dengan pemindaian barcode otomatis untuk nomor lencana dan nomor surat perintah kerja (*Single-Scan Authentication*).
3. **Pemberlakuan Logika Validasi Urutan Operasi (Sequence Enforcer)**:
   Backend wajib memvalidasi bahwa Operasi 20 dilarang mencatat kuantitas masuk melebihi kuantitas *Good Quantity* yang telah dikonfirmasi selesai oleh Operasi 10, guna mencegah anomali di mana stasiun kerja hilir menyelesaikan produk yang belum pernah dirakit oleh stasiun kerja hulu.

## NAV-D-045 — Subcontracting and External Processing

Sumber: [[07-manufacturing/subcontracting-and-external-processing|Subcontracting and External Processing]]

Untuk perancangan modul Subcontracting pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Pesanan Maklon Terintegrasi**:
   ```sql
   CREATE TABLE subcontract_orders (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       order_number VARCHAR(50) NOT NULL UNIQUE,
       vendor_id UUID NOT NULL REFERENCES partners(id),
       finished_item_id UUID NOT NULL REFERENCES items(id),
       ordered_quantity NUMERIC(15, 4) NOT NULL,
       received_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       service_unit_price NUMERIC(18, 4) NOT NULL,
       vendor_warehouse_id UUID NOT NULL REFERENCES warehouses(id), -- Gudang virtual vendor
       status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE subcontract_order_supplied_materials (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       subcontract_order_id UUID NOT NULL REFERENCES subcontract_orders(id) ON DELETE CASCADE,
       component_item_id UUID NOT NULL REFERENCES items(id),
       required_quantity NUMERIC(15, 4) NOT NULL,
       transferred_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       consumed_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0
   );
   ```
2. **Otomasi Pemotongan Bahan Bersamaan dengan Penerimaan Jasa**:
   Saat API penerimaan barang jadi (`POST /api/v1/subcontract-receipts/post`) dipanggil, backend wajib mengeksekusi dua mutasi stok secara atomik dalam satu transaksi:
   1. Menambah kuantitas produk jadi di gudang utama.
   2. Memotong kuantitas bahan baku dari `vendor_warehouse_id`.
3. **Peringatan Defisit Bahan di Lokasi Vendor**:
   Sistem harus memblokir validasi penerimaan barang jadi jika saldo fisik bahan baku yang telah ditransfer ke `vendor_warehouse_id` tidak mencukupi untuk memenuhi kuantitas backflush resep BOM.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-029 | `07-manufacturing/capacity-planning-and-scheduling.md` | Adopted |
| NAV-D-030 | `07-manufacturing/manufacturing-fundamentals.md` | Adopted |
| NAV-D-031 | `07-manufacturing/manufacturing-integration.md` | Adopted |
| NAV-D-032 | `07-manufacturing/manufacturing-order.md` | Adopted |
| NAV-D-033 | `07-manufacturing/manufacturing-reporting-and-analytics.md` | Adopted |
| NAV-D-034 | `07-manufacturing/material-availability-and-reservation.md` | Adopted |
| NAV-D-035 | `07-manufacturing/material-consumption-and-backflush.md` | Adopted |
| NAV-D-036 | `07-manufacturing/mrp-material-requirement-planning.md` | Adopted |
| NAV-D-037 | `07-manufacturing/product-structure-and-bom.md` | Adopted |
| NAV-D-038 | `07-manufacturing/production-costing-and-wip.md` | Adopted |
| NAV-D-039 | `07-manufacturing/production-output-and-by-product.md` | Adopted |
| NAV-D-040 | `07-manufacturing/production-planning.md` | Adopted |
| NAV-D-041 | `07-manufacturing/production-quality-and-rework.md` | Adopted |
| NAV-D-042 | `07-manufacturing/production-variance-and-performance.md` | Adopted |
| NAV-D-043 | `07-manufacturing/routing-and-work-center.md` | Adopted |
| NAV-D-044 | `07-manufacturing/shop-floor-execution.md` | Adopted |
| NAV-D-045 | `07-manufacturing/subcontracting-and-external-processing.md` | Adopted |

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
