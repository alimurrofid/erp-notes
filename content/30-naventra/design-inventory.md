---
title: Naventra Design — inventory
---

# Naventra Design — inventory

## Definition

Keputusan desain Naventra yang diekstrak dari artikel `06-inventory`. Teks keputusan dipindahkan apa adanya; artikel sumber menyisakan satu baris rujukan.

## NAV-D-012 — Internal Stock Transfer

Sumber: [[06-inventory/internal-stock-transfer|Internal Stock Transfer]]

Untuk perancangan modul Transfer Internal pada sistem ERP enterprise seperti **Naventra**:

1. **Struktur Data Transfer Order Berpasangan**:
   * Tabel header: `internal_transfer_orders` (`transfer_number`, `source_warehouse_id`, `destination_warehouse_id`, `transit_warehouse_id`, `status: DRAFT, SHIPPED, PARTIALLY_RECEIVED, COMPLETED, CANCELLED`).
   * Tabel baris: `internal_transfer_order_lines` (`item_id`, `requested_qty`, `shipped_qty`, `received_qty`, `lost_qty`).
2. **Otomasi Mutasi Dua Langkah pada Database Engine**:
   * Saat aksi *Shipment* dieksekusi: Sistem memotong kuantitas dari `source_warehouse_id` dan mendebit `transit_warehouse_id`.
   * Saat aksi *Receipt* dieksekusi: Sistem memotong kuantitas dari `transit_warehouse_id` dan mendebit `destination_warehouse_id`.
3. **Pemberlakuan Validasi Status In-Transit**:
   Kuantitas pada gudang bertipe `is_in_transit = TRUE` wajib diblokir secara mutlak dari pemilihan pada form pesanan penjualan (*Sales Order selection*) atau proses produksi (*Work Order consumption*), sehingga barang yang masih di atas truk tidak dapat dijanjikan secara keliru.

## NAV-D-013 — Inventory Adjustment and Write-Off

Sumber: [[06-inventory/inventory-adjustment|Inventory Adjustment and Write-Off]]

Untuk perancangan modul Penyesuaian Persediaan pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Dokumen Penyesuaian Terkontrol**:
   ```sql
   CREATE TABLE inventory_adjustments (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       adjustment_number VARCHAR(50) NOT NULL UNIQUE,
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       posting_date DATE NOT NULL,
       reason_code VARCHAR(50) NOT NULL, -- 'DAMAGED_IN_WH', 'SHRINKAGE', 'EXPIRED_SCRAP', 'FOUND'
       supporting_document_ref VARCHAR(100),
       status VARCHAR(30) NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED'
       approved_by UUID REFERENCES users(id),
       approved_at TIMESTAMP WITH TIME ZONE,
       total_loss_value NUMERIC(18, 4) NOT NULL DEFAULT 0,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE inventory_adjustment_lines (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       adjustment_id UUID NOT NULL REFERENCES inventory_adjustments(id),
       item_id UUID NOT NULL REFERENCES items(id),
       storage_location_id UUID REFERENCES storage_locations(id),
       batch_number VARCHAR(100),
       serial_number VARCHAR(100),
       quantity_delta NUMERIC(15, 4) NOT NULL, -- Positif untuk gain, Negatif untuk loss
       unit_cost NUMERIC(18, 4) NOT NULL,
       total_amount NUMERIC(18, 4) NOT NULL,
       expense_account_id UUID REFERENCES chart_of_accounts(id)
   );
   ```
2. **Validasi Ambang Batas Otorisasi Otomatis (DOA Validation Hook)**:
   Backend wajib memeriksa `total_loss_value`. Jika nilai penyesuaian melampaui limit wewenang pengguna yang sedang login, sistem menolak posting langsung dan secara otomatis mengubah status transaksi menjadi `PENDING_APPROVAL` dengan meneruskan tiket persetujuan ke atasan terkait.
3. **Audit Trail Mutasi Stok Tidak Terhapus**: Setiap baris penyesuaian yang disetujui wajib menciptakan baris mutasi resmi pada `stock_ledger_entries` dan baris jurnal di `gl_entries` dengan referensi nomor dokumen penyesuaian.

## NAV-D-014 — Inventory Costing and Valuation Methods

Sumber: [[06-inventory/inventory-costing|Inventory Costing and Valuation Methods]]

Untuk perancangan modul Costing Engine pada sistem ERP enterprise seperti **Naventra**:

1. **Pemisahan Tabel Cost Layer (Khusus Metode FIFO)**:
   ```sql
   CREATE TABLE inventory_cost_layers (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       item_id UUID NOT NULL REFERENCES items(id),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       goods_receipt_line_id UUID REFERENCES goods_receipt_lines(id),
       original_quantity NUMERIC(15, 4) NOT NULL,
       remaining_quantity NUMERIC(15, 4) NOT NULL,
       unit_cost NUMERIC(18, 4) NOT NULL,
       layer_date TIMESTAMP WITH TIME ZONE NOT NULL,
       is_exhausted BOOLEAN NOT NULL DEFAULT FALSE
   );
   ```
2. **Cost Engine Service yang Terisolasi**: Rancang perhitungan COGS sebagai modul layanan independen (*Costing Service*). Saat terjadi mutasi keluar:
   * Jika metode FIFO: Ambil baris `inventory_cost_layers` tertua yang `is_exhausted = FALSE`, potong `remaining_quantity`, dan hitung jumlah biaya kumulatif.
   * Jika metode Moving Average: Ambil `current_moving_avg_cost` dari tabel `inventory_balances` dan kalikan dengan kuantitas keluar.
3. **Pemberlakuan Kunci Concurrency Saat Re-Averaging**:
   Saat memposting penerimaan barang baru dengan harga berbeda pada metode Moving Average, lakukan *Row-Level Locking* pada tabel saldo barang untuk memastikan tidak ada pengeluaran barang yang terjadi bersamaan saat biaya rata-rata sedang dihitung ulang.

## NAV-D-015 — Inventory Fundamentals in ERP

Sumber: [[06-inventory/inventory-fundamentals|Inventory Fundamentals in ERP]]

Untuk perancangan modul Persediaan pada sistem ERP enterprise seperti **Naventra**:

1. **Immutable Stock Ledger Table**: Desain tabel `stock_ledger_entries` sebagai tabel *append-only*:
   ```sql
   CREATE TABLE stock_ledger_entries (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       posting_date TIMESTAMP WITH TIME ZONE NOT NULL,
       voucher_type VARCHAR(50) NOT NULL, -- 'GOODS_RECEIPT', 'DELIVERY_ORDER', 'ADJUSTMENT'
       voucher_no VARCHAR(100) NOT NULL,
       item_id UUID NOT NULL REFERENCES items(id),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       location_id UUID REFERENCES storage_locations(id),
       batch_lot_number VARCHAR(100),
       serial_number VARCHAR(100),
       quantity_delta NUMERIC(15, 4) NOT NULL, -- Positif untuk Masuk, Negatif untuk Keluar
       unit_cost NUMERIC(18, 4) NOT NULL,
       total_value_delta NUMERIC(18, 4) NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Snapshot Caching untuk Performa Tinggi**: Untuk mencegah pemindaian jutaan baris `stock_ledger_entries` saat mengecek ketersediaan stok (*stock availability check*), sediakan tabel agregasi snapshot `inventory_balances` (`item_id`, `warehouse_id`, `on_hand_qty`, `reserved_qty`, `updated_at`). Setiap mutasi memperbarui tabel snapshot ini secara atomik di dalam satu *database transaction* (`BEGIN ... COMMIT`).
3. **Pemberian ID Transaksi Unik & Idempotensi**: Setiap pergerakan persediaan wajib memiliki *idempotency key* berbasis nomor dokumen sumber untuk mencegah eksekusi ganda mutasi stok saat terjadi *retry* jaringan atau klik ganda oleh operator gudang.
4. **Pencegahan Saldo Negatif**: Sediakan konfigurasi sistem `allow_negative_stock = FALSE` pada level perusahaan dan gudang untuk mencegah distorsi valuasi HPP dan anomali akuntansi persediaan.

## NAV-D-016 — Inventory and Warehouse Management Integration

Sumber: [[06-inventory/inventory-integration|Inventory and Warehouse Management Integration]]

Untuk perancangan arsitektur integrasi Persediaan pada sistem ERP enterprise seperti **Naventra**:

1. **Transactional Event Pipeline (Arsitektur Event-Driven Terisolasi)**:
   * Saat mutasi stok terjadi (misal: penyerahan Delivery Order), sistem mempublikasikan domain event internal: `InventoryIssuedEvent` (`item_id`, `warehouse_id`, `quantity`, `cost_method`, `cost_amount`, `source_doc_ref`).
   * Layanan akuntansi (*Accounting Subscriber*) menerima event ini dan membuat baris jurnal `gl_entries` secara asinkron atau dalam transaksi terdistribusi yang aman (*Saga Pattern / Outbox Pattern*).
2. **Kepatuhan Audit Trail Kekal (Append-Only Journaling)**:
   Pastikan tidak ada perintah `UPDATE` atau `DELETE` pada tabel mutasi persediaan (`stock_ledger_entries`) atau tabel jurnal keuangan (`gl_entries`). Koreksi wajib dilakukan dengan memposting baris mutasi cermin berpasangan (*Compensating Transaction*).
3. **Pemberlakuan Kunci Idempotensi Lintas Modul**:
   Setiap transaksi integrasi antar-modul (misal: pembuatan mutasi dari SO) wajib menyertakan kunci `idempotency_key = hash(source_doc_type, source_doc_id, line_number)`. Hal ini menjamin bahwa kegagalan jaringan atau proses *retry* tidak akan pernah menduplikasi mutasi stok fisik maupun pencatatan jurnal akuntansi ganda.

## NAV-D-017 — Inventory Picking, Packing, and Delivery

Sumber: [[06-inventory/inventory-picking-and-delivery|Inventory Picking, Packing, and Delivery]]

Untuk perancangan modul Picking dan Outbound Logistics pada sistem ERP enterprise seperti **Naventra**:

1. **Pemisahan Dokumen Perencanaan vs Eksekusi Fisik**:
   * Tabel `delivery_orders`: Dokumen pengiriman komersial/legal ke pelanggan (merujuk `sales_order_id`, alamat tujuan, kurir, nomor resi).
   * Tabel `picking_lists` dan `picking_tasks`: Dokumen kerja lantai gudang yang memuat daftar koordinat rak (`source_location_id`), kuantitas yang harus diambil, dan urutan rute jalan operator (*optimal walk path*).
2. **Pemberlakuan Locking Kuantitas Saat Picking Berjalan**:
   Saat `picking_task` diterbitkan, sistem memindahkan status kuantitas dari `reserved_qty` menjadi `allocated_qty` pada tabel `inventory_balances`. Hal ini mencegah staf gudang lain mengambil barang fisik yang sama untuk pesanan darurat yang berbeda.
3. **Konfirmasi Pemindaian Barcode Dua Titik (Two-Point Verification)**:
   Aplikasi mobile operator wajib mengharuskan dua pemindaian berurutan:
   1. Pindai barcode rak/bin untuk memvalidasi operator berada di koordinat yang benar.
   2. Pindai barcode produk/lot untuk memvalidasi barang yang diambil tidak keliru.
4. **POD Image Attachment & Geo-Tagging**: Sediakan kapabilitas penyimpanan bukti foto tanda terima fisik (*Proof of Delivery*) dan koordinat GPS penerimaan saat barang diserahkan oleh armada internal perusahaan.

## NAV-D-018 — Inventory Receiving and Inbound Logistics

Sumber: [[06-inventory/inventory-receiving|Inventory Receiving and Inbound Logistics]]

Untuk perancangan modul Penerimaan Inbound pada sistem ERP enterprise seperti **Naventra**:

1. **Pemisahan Header dan Baris Detail Penempatan (Receipt vs Putaway)**:
   * Tabel `goods_receipts` mencatat dokumen penyerahan legal dari vendor (nomor surat jalan, tanggal tiba, vendor ID, nomor PO).
   * Tabel `goods_receipt_lines` mencatat kuantitas kotor diterima (`received_qty`), kuantitas lolos (`accepted_qty`), dan kuantitas ditolak (`rejected_qty`).
   * Tabel `putaway_tasks` mencatat instruksi pemindahan fisik dari area staging ke koordinat bin definitif (`from_location_id`, `to_location_id`, `task_status`).
2. **Validasi Toleransi Penerimaan Berbasis Persentase**:
   ```sql
   -- Validasi sebelum menyimpan baris Goods Receipt
   IF (new_received_qty + line.accumulated_received_qty) > (line.ordered_qty * (1 + line.over_receipt_tolerance_pct / 100.0)) THEN
       RAISE EXCEPTION 'Kuantitas penerimaan (%) melampaui batas toleransi over-receipt yang diizinkan (%)', 
           new_received_qty, line.ordered_qty * (1 + line.over_receipt_tolerance_pct / 100.0);
   END IF;
   ```
3. **Mobile Barcode Scanning Workflow**: Rancang antarmuka penerimaan agar ramah perangkat genggam (*handheld barcode terminal*): operator memindai nomor PO $\to$ memindai barcode produk $\to$ memindai barcode bin rak penyimpanan. Hal ini meminimalkan kesalahan input data (*human error*) di lantai gudang yang bising.

## NAV-D-019 — Inventory Reservation and Allocation

Sumber: [[06-inventory/inventory-reservation-and-allocation|Inventory Reservation and Allocation]]

Untuk perancangan modul Reservasi dan Alokasi pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Tabel Reservasi Khusus (Reservation Ledger)**:
   ```sql
   CREATE TABLE inventory_reservations (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       demand_document_type VARCHAR(50) NOT NULL, -- 'SALES_ORDER', 'WORK_ORDER', 'TRANSFER_ORDER'
       demand_document_id UUID NOT NULL,
       demand_line_id UUID NOT NULL,
       item_id UUID NOT NULL REFERENCES items(id),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       
       -- Spesifikasi Alokasi (NULL jika Soft Reservation)
       storage_location_id UUID REFERENCES storage_locations(id),
       batch_number VARCHAR(100),
       serial_number VARCHAR(100),
       
       reserved_quantity NUMERIC(15, 4) NOT NULL,
       allocated_quantity NUMERIC(15, 4) NOT NULL DEFAULT 0,
       is_hard_allocated BOOLEAN NOT NULL DEFAULT FALSE,
       
       expires_at TIMESTAMP WITH TIME ZONE,
       status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'FULFILLED', 'RELEASED', 'EXPIRED'
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Atomic Check-and-Reserve Function**:
   Terapkan fungsi *stored procedure* dengan transaksi berkunci untuk menjamin kuantitas tersedia mencukupi sebelum reservasi disetujui:
   ```sql
   -- Menggunakan transactional lock pada tabel balance
   PERFORM on_hand_qty, reserved_qty 
   FROM inventory_balances 
   WHERE item_id = p_item_id AND warehouse_id = p_warehouse_id 
   FOR UPDATE;
   
   IF (v_on_hand - v_reserved) < p_requested_qty THEN
       RAISE EXCEPTION 'Kuantitas persediaan bebas tidak mencukupi untuk melakukan reservasi.';
   END IF;
   ```
3. **Daemon Worker untuk Auto-Expire**:
   Jalankan background worker berkala (misal: setiap 15 menit) untuk memindai baris reservasi berstatus `ACTIVE` dengan `expires_at < NOW()`, lalu ubah statusnya menjadi `EXPIRED` dan pulihkan saldo `available_qty` pada tabel ringkasan persediaan.

## NAV-D-020 — Inventory Return, Quarantine, and Reversal

Sumber: [[06-inventory/inventory-return-and-reversal|Inventory Return, Quarantine, and Reversal]]

Untuk perancangan modul Retur Persediaan pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database RMA dan RTV Berbasis Status Disposisi**:
   ```sql
   CREATE TABLE inventory_returns (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       return_number VARCHAR(50) NOT NULL UNIQUE,
       return_type VARCHAR(20) NOT NULL, -- 'CUSTOMER_RETURN_RMA', 'VENDOR_RETURN_RTV'
       reference_document_type VARCHAR(50) NOT NULL, -- 'DELIVERY_ORDER', 'GOODS_RECEIPT'
       reference_document_id UUID NOT NULL,
       partner_id UUID NOT NULL, -- Customer ID atau Vendor ID
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       status VARCHAR(30) NOT NULL DEFAULT 'RECEIVED_AT_DOCK',
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE inventory_return_lines (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       return_id UUID NOT NULL REFERENCES inventory_returns(id),
       item_id UUID NOT NULL REFERENCES items(id),
       batch_number VARCHAR(100),
       serial_number VARCHAR(100),
       returned_qty NUMERIC(15, 4) NOT NULL,
       disposition_code VARCHAR(50) NOT NULL, -- 'RESTOCK', 'REWORK', 'SCRAP', 'RETURN_TO_VENDOR'
       target_storage_location_id UUID REFERENCES storage_locations(id),
       unit_cost NUMERIC(18, 4) NOT NULL,
       notes TEXT
   );
   ```
2. **Karantina Default untuk Retur Pelanggan**:
   Backend wajib secara otomatis menetapkan `target_storage_location_id` ke zona *QC Quarantine* pada saat RMA dibuat. Sistem harus memblokir pengalihan langsung ke rak barang jadi (*Finished Goods*) sebelum staf QC mengunggah lembar hasil inspeksi teknis (*Inspection Form*).
3. **Validasi Kuantitas Maksimal Retur**:
   Sistem harus memvalidasi bahwa total kuantitas yang diretur tidak boleh melebihi sisa kuantitas bersih yang pernah dikirim pada dokumen pengiriman asalnya:
   $$\sum \text{Kuantitas Retur} \le \text{Kuantitas Terkirim Dokumen Asal} - \sum \text{Retur Sebelumnya}$$

## NAV-D-021 — Inventory UOM and Unit Conversion

Sumber: [[06-inventory/inventory-uom-and-conversion|Inventory UOM and Unit Conversion]]

Untuk perancangan modul UOM pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Konversi UOM Dinamis**:
   ```sql
   CREATE TABLE uom_categories (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       category_name VARCHAR(50) NOT NULL UNIQUE -- 'UNIT', 'WEIGHT', 'VOLUME', 'LENGTH'
   );

   CREATE TABLE uoms (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       uom_category_id UUID NOT NULL REFERENCES uom_categories(id),
       uom_code VARCHAR(20) NOT NULL UNIQUE, -- 'PCS', 'BOX', 'KG'
       uom_name VARCHAR(100) NOT NULL,
       is_reference_uom BOOLEAN DEFAULT FALSE,
       conversion_ratio NUMERIC(15, 6) NOT NULL DEFAULT 1.0, -- Rasio terhadap reference UOM kategori
       decimal_places INT NOT NULL DEFAULT 0
   );

   CREATE TABLE item_uom_conversions (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       item_id UUID NOT NULL REFERENCES items(id),
       from_uom_id UUID NOT NULL REFERENCES uoms(id),
       to_uom_id UUID NOT NULL REFERENCES uoms(id),
       conversion_factor NUMERIC(15, 6) NOT NULL, -- Contoh: 1 Box = 12 Pcs
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       UNIQUE (item_id, from_uom_id, to_uom_id)
   );
   ```
2. **Aturan Mutlak: Base UOM Adalah Kebenaran Tunggal**: Seluruh kolom `quantity` pada tabel transaksional inti (`stock_ledger_entries`, `inventory_balances`, `gl_entries`) **wajib selalu disimpan dalam satuan Base UOM**. Kuantitas dalam dokumen komersial (PO, SO) hanya bertindak sebagai representasi presentasi antarmuka yang dikonversi sebelum data masuk ke lapisan penyimpanan persediaan.
3. **Pemberlakuan Batas Desimal Validasi (Input Validation)**: Jika sebuah UOM memiliki `decimal_places = 0` (seperti unit fisik `Pcs`), backend wajib menolak transaksi yang memasukkan kuantitas pecahan desimal (misal: `2.5 Pcs`) dengan pesan error validasi yang jelas.

## NAV-D-022 — Landed Cost and Capitalization

Sumber: [[06-inventory/landed-cost|Landed Cost and Capitalization]]

Untuk perancangan modul Landed Cost pada sistem ERP enterprise seperti **Naventra**:

1. **Struktur Data Landed Cost Voucher**:
   * Tabel header: `landed_cost_vouchers` (`voucher_no`, `posting_date`, `vendor_bill_id`, `allocation_basis`, `total_landed_cost_amount`).
   * Tabel baris penerimaan target: `landed_cost_target_receipts` (`voucher_id`, `goods_receipt_id`).
   * Tabel baris alokasi item: `landed_cost_allocation_lines` (`voucher_id`, `item_id`, `receipt_line_id`, `allocated_amount`, `cost_per_unit_increase`).
2. **Algoritma Deteksi Kuantitas Tersisa (Remaining Qty Check)**:
   ```sql
   -- Menentukan porsi persediaan vs COGS
   v_remaining_qty := get_remaining_on_hand_qty(target_line.item_id, target_line.goods_receipt_id);
   
   IF v_remaining_qty >= target_line.received_qty THEN
       -- Seluruh barang masih ada di gudang -> 100% debit persediaan
       v_inventory_debit := target_line.allocated_amount;
       v_cogs_debit := 0;
   ELSE
       -- Sebagian atau seluruh barang telah terjual -> bagi proporsional
       v_inventory_debit := (v_remaining_qty / target_line.received_qty) * target_line.allocated_amount;
       v_cogs_debit := target_line.allocated_amount - v_inventory_debit;
   END IF;
   ```
3. **Pembaruan Stock Ledger & Moving Average**:
   Setiap posting landed cost wajib menciptakan mutasi penyesuaian nilai (*Value Adjustment Entry*) pada tabel `stock_ledger_entries` dengan `quantity_delta = 0` dan `total_value_delta = v_inventory_debit`, serta memperbarui kolom `unit_cost` pada tabel persediaan.

## NAV-D-023 — Lot and Serial Number Tracking

Sumber: [[06-inventory/lot-and-serial-number-tracking|Lot and Serial Number Tracking]]

Untuk perancangan modul Lot dan Serial Number pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Relasional Terpisah**:
   ```sql
   CREATE TABLE item_lots (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       item_id UUID NOT NULL REFERENCES items(id),
       lot_number VARCHAR(100) NOT NULL,
       manufacturing_date DATE,
       expiration_date DATE,
       removal_date DATE, -- Tanggal mulai ditarik dari rak
       status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'QUARANTINE', 'EXPIRED'
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       UNIQUE (item_id, lot_number)
   );

   CREATE TABLE item_serials (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       item_id UUID NOT NULL REFERENCES items(id),
       serial_number VARCHAR(100) NOT NULL UNIQUE,
       lot_id UUID REFERENCES item_lots(id), -- Opsional: Serial number dari lot tertentu
       current_warehouse_id UUID REFERENCES warehouses(id),
       current_location_id UUID REFERENCES storage_locations(id),
       status VARCHAR(30) NOT NULL DEFAULT 'IN_STOCK', -- 'IN_STOCK', 'DELIVERED', 'SCRAPPED', 'RETURNED'
       warranty_start_date DATE,
       warranty_end_date DATE,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
2. **Enforcement Mutlak pada Layer Mutasi Stok**:
   Jika sebuah SKU memiliki atribut `tracking_policy = 'SERIAL'`, maka seluruh API mutasi persediaan (`/api/v1/goods-receipts/post`, `/api/v1/deliveries/post`) wajib memvalidasi bahwa jumlah elemen array `serial_numbers` yang dikirimkan **harus tepat sama dengan kuantitas transaksi**, dan setiap nomor seri belum pernah aktif sebelumnya di gudang (mencegah duplikasi).
3. **Pohon Genealogi Berbasis Relasi Atomik**: Sediakan tabel relasi `production_genealogy` (`parent_serial_id`, `child_serial_id`, `child_lot_id`, `work_order_id`) untuk merekam jejak perakitan komponen ke dalam produk jadi secara permanen.

## NAV-D-024 — Physical Inventory Count and Stock Opname

Sumber: [[06-inventory/physical-inventory-count|Physical Inventory Count and Stock Opname]]

Untuk perancangan modul Penghitungan Fisik pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Dokumen Stock Opname**:
   ```sql
   CREATE TABLE stock_opname_sessions (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       session_number VARCHAR(50) NOT NULL UNIQUE,
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       count_type VARCHAR(30) NOT NULL, -- 'FULL_COUNT', 'CYCLE_COUNT_ABC', 'SPOT_CHECK'
       is_blind_count BOOLEAN NOT NULL DEFAULT TRUE,
       freeze_stock BOOLEAN NOT NULL DEFAULT FALSE,
       snapshot_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
       status VARCHAR(30) NOT NULL DEFAULT 'IN_PROGRESS', -- 'DRAFT', 'IN_PROGRESS', 'RECOUNT_REQUIRED', 'APPROVED', 'POSTED'
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE stock_opname_lines (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       session_id UUID NOT NULL REFERENCES stock_opname_sessions(id),
       item_id UUID NOT NULL REFERENCES items(id),
       storage_location_id UUID REFERENCES storage_locations(id),
       batch_number VARCHAR(100),
       serial_number VARCHAR(100),
       system_snapshot_qty NUMERIC(15, 4) NOT NULL, -- Dibekukan saat sesi dimulai
       counted_qty NUMERIC(15, 4), -- Input dari tim pencacah lapangan
       recounted_qty NUMERIC(15, 4), -- Input pencacahan ulang jika ada varians
       variance_qty NUMERIC(15, 4) GENERATED ALWAYS AS (COALESCE(recounted_qty, counted_qty) - system_snapshot_qty) STORED,
       investigation_notes TEXT
   );
   ```
2. **Prinsip Snapshot Beku (System Snapshot Lock)**:
   Saat sesi dimulai, sistem wajib membekukan saldo buku sistem (`system_snapshot_qty`) pada detik tersebut. Jika selama proses penghitungan fisik berlangsung masih ada mutasi pengiriman darurat, varians dihitung secara independen terhadap saldo beku tersebut dengan memperhitungkan log mutasi transaksi yang terjadi pasca-snapshot.
3. **Pemicu Recount Otomatis Berbasis Toleransi**:
   Backend secara otomatis menandai baris yang memiliki nilai deviasi moneter $|\text{variance\_qty} \times \text{unit\_cost}| > \text{Threshold}$ (misal: selisih $> \text{Rp}500.000$) untuk mewajibkan verifikasi hitung ulang (*Recount Required*) oleh staf pengawas independen sebelum tombol persetujuan dapat diakses.

## NAV-D-025 — Product and Inventory Master Data

Sumber: [[06-inventory/product-and-inventory-master-data|Product and Inventory Master Data]]

Untuk perancangan modul Master Data Produk pada sistem ERP enterprise seperti **Naventra**:

1. **Normalisasi Multi-Entitas yang Efisien**: Pisahkan katalog produk menjadi struktur bersih:
   * `products`: Definisi global (nama, deskripsi, kategori, brand).
   * `product_skus`: Varian operasional spesifik (SKU code, barcode, berat, volume, tracking policy).
   * `product_sku_uom_conversions`: Multi-satuan konversi UOM.
   * `product_accounting_configs`: Pemetaan akun GL per legal entity/company.
2. **Audit Trail Perubahan Master Data**: Terapkan histori perubahan (*audit versioning*) untuk atribut kritis seperti `costing_method`, `tracking_policy`, dan `tax_category_id`. Perubahan pada atribut ini tidak boleh diizinkan secara langsung jika SKU tersebut telah memiliki saldo persediaan (*on-hand stock > 0*) tanpa melalui prosedur penyesuaian formal.
3. **Validasi Keunikan Global Barcode & SKU**: Terapkan *unique constraint* pada kolom `sku_code` dan `barcode` pada tingkat perusahaan untuk mencegah duplikasi pemindaian di lantai gudang.

## NAV-D-026 — Replenishment and Stock Planning

Sumber: [[06-inventory/replenishment-and-stock-planning|Replenishment and Stock Planning]]

Untuk perancangan modul Replenishment pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Aturan Pengisian Ulang Multi-Gudang**:
   ```sql
   CREATE TABLE item_replenishment_rules (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       item_id UUID NOT NULL REFERENCES items(id),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       strategy VARCHAR(30) NOT NULL DEFAULT 'MIN_MAX', -- 'MIN_MAX', 'ROP_EOQ', 'MANUAL'
       safety_stock_qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
       reorder_point_qty NUMERIC(15, 4) NOT NULL,
       min_order_qty NUMERIC(15, 4) NOT NULL DEFAULT 1,
       max_order_qty NUMERIC(15, 4),
       order_multiple_qty NUMERIC(15, 4) DEFAULT 1, -- Kelipatan kemasan pabrik (pack size)
       replenishment_source VARCHAR(30) NOT NULL, -- 'PURCHASE', 'INTERNAL_TRANSFER', 'MANUFACTURE'
       source_warehouse_id UUID REFERENCES warehouses(id), -- Jika internal transfer
       is_active BOOLEAN NOT NULL DEFAULT TRUE,
       UNIQUE (item_id, warehouse_id)
   );
   ```
2. **Automated Planning Worker (MRP/Replenishment Runner)**:
   Rancang background worker berkala (misal: berjalan setiap malam pukul 01:00) yang mengevaluasi persamaan ketersediaan:
   $$\text{Net Available} = \text{On-Hand} + \text{On-Order (PO/TR)} - \text{Reserved (SO/WO)}$$
   Jika $\text{Net Available} \le \text{reorder\_point\_qty}$, sistem membangkitkan record draft baru pada tabel `purchase_requisitions` atau `internal_transfer_orders`.
3. **Pencegahan Pemesanan Ganda (*Duplicate Suggestion Prevention*)**:
   Sebelum membangkitkan rekomendasi baru, sistem wajib memeriksa apakah sudah ada dokumen draft PR atau PO terbuka (*unfulfilled inbound*) yang dibuat oleh siklus sebelumnya untuk item dan gudang yang sama.

## NAV-D-027 — Stock Quantity and Availability

Sumber: [[06-inventory/stock-quantity-and-availability|Stock Quantity and Availability]]

Untuk perancangan modul Ketersediaan Stok pada sistem ERP enterprise seperti **Naventra**:

1. **Struktur Tabel Kuantitas Multi-Dimensi (Bin / Balance Cache)**:
   ```sql
   CREATE TABLE inventory_balances (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       item_id UUID NOT NULL REFERENCES items(id),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       storage_location_id UUID REFERENCES storage_locations(id),
       batch_number VARCHAR(100),
       serial_number VARCHAR(100),
       
       -- Kuantitas Fisik dan Komitmen
       on_hand_qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
       reserved_qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
       allocated_qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
       quarantine_qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
       blocked_qty NUMERIC(15, 4) NOT NULL DEFAULT 0,
       
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       UNIQUE (item_id, warehouse_id, storage_location_id, batch_number, serial_number)
   );
   ```
2. **Generated Column / Virtual View untuk Available Stock**:
   ```sql
   -- Menggunakan computed column atau database view untuk menjamin konsistensi formula
   CREATE OR REPLACE VIEW view_item_availability AS
   SELECT 
       item_id,
       warehouse_id,
       SUM(on_hand_qty) AS total_on_hand,
       SUM(reserved_qty) AS total_reserved,
       SUM(allocated_qty) AS total_allocated,
       SUM(quarantine_qty + blocked_qty) AS total_restricted,
       -- Formula Konservatif
       SUM(on_hand_qty - reserved_qty - allocated_qty - quarantine_qty - blocked_qty) AS available_qty
   FROM inventory_balances
   GROUP BY item_id, warehouse_id;
   ```
3. **Pemberlakuan Locking Concurrency saat Check-and-Reserve**:
   Saat pesanan penjualan melakukan reservasi stok, gunakan mekanisme *Pessimistic Locking* (`SELECT ... FOR UPDATE`) atau transaksi berbasis isolasi tinggi untuk mencegah *race condition* di mana dua pesanan berbeda secara bersamaan mengambil sisa stok yang sama (*double allocation*).

## NAV-D-028 — Warehouse and Location Topology

Sumber: [[06-inventory/warehouse-and-location|Warehouse and Location Topology]]

Untuk perancangan topologi gudang pada sistem ERP enterprise seperti **Naventra**:

1. **Skema Database Topologi Hierarkis**:
   ```sql
   CREATE TABLE warehouses (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       company_id UUID NOT NULL REFERENCES companies(id),
       warehouse_code VARCHAR(20) NOT NULL UNIQUE,
       warehouse_name VARCHAR(100) NOT NULL,
       is_in_transit BOOLEAN DEFAULT FALSE,
       address TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE storage_locations (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       warehouse_id UUID NOT NULL REFERENCES warehouses(id),
       parent_location_id UUID REFERENCES storage_locations(id), -- Self-referencing untuk hierarki zona/rak
       location_code VARCHAR(50) NOT NULL, -- Contoh: ZN-DRY-A-01-1
       location_type VARCHAR(30) NOT NULL, -- 'STORAGE', 'RECEIVING', 'SHIPPING', 'QC', 'SCRAP'
       is_scrap BOOLEAN DEFAULT FALSE,
       is_available_for_atp BOOLEAN DEFAULT TRUE,
       max_weight_capacity NUMERIC(12, 2),
       max_volume_cbm NUMERIC(12, 4),
       UNIQUE (warehouse_id, location_code)
   );
   ```
2. **Flagging Ketersediaan ATP pada Level Lokasi**: Kolom `is_available_for_atp` memungkinkan sistem menyaring secara instan lokasi mana saja yang kuantitasnya boleh diperhitungkan dalam perhitungan [[06-inventory/stock-quantity-and-availability|Available-to-Promise (ATP)]]. Area *Receiving Bay*, *QC Hold*, dan *Damaged Area* wajib diset `is_available_for_atp = FALSE`.
3. **Pemberian Label Barcode Standar**: Sistem wajib mampu menghasilkan label barcode berformat Code 128 atau QR Code untuk setiap `location_code` agar operator gudang dapat memindai lokasi secara presisi saat melakukan putaway dan picking menggunakan perangkat mobile.

## Traceability

| ID | Sumber | Status |
|---|---|---|
| NAV-D-012 | `06-inventory/internal-stock-transfer.md` | Adopted |
| NAV-D-013 | `06-inventory/inventory-adjustment.md` | Adopted |
| NAV-D-014 | `06-inventory/inventory-costing.md` | Adopted |
| NAV-D-015 | `06-inventory/inventory-fundamentals.md` | Adopted |
| NAV-D-016 | `06-inventory/inventory-integration.md` | Adopted |
| NAV-D-017 | `06-inventory/inventory-picking-and-delivery.md` | Adopted |
| NAV-D-018 | `06-inventory/inventory-receiving.md` | Adopted |
| NAV-D-019 | `06-inventory/inventory-reservation-and-allocation.md` | Adopted |
| NAV-D-020 | `06-inventory/inventory-return-and-reversal.md` | Adopted |
| NAV-D-021 | `06-inventory/inventory-uom-and-conversion.md` | Adopted |
| NAV-D-022 | `06-inventory/landed-cost.md` | Adopted |
| NAV-D-023 | `06-inventory/lot-and-serial-number-tracking.md` | Adopted |
| NAV-D-024 | `06-inventory/physical-inventory-count.md` | Adopted |
| NAV-D-025 | `06-inventory/product-and-inventory-master-data.md` | Adopted |
| NAV-D-026 | `06-inventory/replenishment-and-stock-planning.md` | Adopted |
| NAV-D-027 | `06-inventory/stock-quantity-and-availability.md` | Adopted |
| NAV-D-028 | `06-inventory/warehouse-and-location.md` | Adopted |

## References

1. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
