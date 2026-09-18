---
title: Inventory
---

# Inventory & Warehouse Management in ERP

Bagian ini membahas arsitektur, proses bisnis, aturan validasi, tata letak pergudangan, metode biaya, dan integrasi finansial dari domain **Inventory (Persediaan)** dan **Warehouse Management (Manajemen Pergudangan)** dalam sistem ERP enterprise secara universal dan *vendor-agnostic*.

Modul Persediaan dan Pergudangan berfungsi sebagai **jembatan utama (central nexus)** yang menghubungkan aktivitas komersial penjualan di [[03-sales/sales-fundamentals|Phase 4 (Sales / O2C)]], komitmen pengadaan barang di [[04-purchasing/purchasing-fundamentals|Phase 5 (Purchasing / P2P)]], perencanaan perakitan di lantai produksi pabrik, serta pengakuan nilai aset dan penentuan Beban Pokok Penjualan (COGS) di [[02-accounting/inventory-accounting|Phase 3 (Accounting)]].

Materi disusun mengikuti alur rantai pasok terpadu:
$$\text{Demand} \to \text{Availability (ATP)} \to \text{Reservation} \to \text{Receiving / Putaway} \to \text{Picking / Delivery} \to \text{Movement (Transfer)} \to \text{Costing / Valuation} \to \text{Adjustment / Opname} \to \text{Accounting}$$

---

## Daftar Materi Pembelajaran Inventory & Warehouse

### 1. Fondasi, Master Data & Topologi Gudang

1. [[05-inventory/inventory-fundamentals|Inventory Fundamentals in ERP]]  
   Konsep dasar persediaan dalam ERP, tiga dimensi persediaan (fisik, sistemik, finansial), perbedaan Item vs SKU vs Stock Balance vs Movement vs Valuation, pemisahan kepemilikan dan lokasi (*ownership vs custody*), serta prinsip mutlak bahwa saldo persediaan adalah nilai turunan dari mutasi yang sah (*derived balance*).

2. [[05-inventory/product-and-inventory-master-data|Product and Inventory Master Data]]  
   Struktur data induk produk (*stockable, consumable, service, kit/bundle*), atribut fisik dan logistik (barcode, dimensi $L \times W \times H$, berat, volume kubikasi CBM, kelas penyimpanan khusus), kebijakan pelacakan (*no tracking, lot, serial*), dan pemisahan tegas antara Product Master vs Inventory Transaction.

3. [[05-inventory/warehouse-and-location|Warehouse and Location Topology]]  
   Pemodelan arsitektural ruang fisik gudang (*Company $\to$ Site $\to$ Warehouse $\to$ Zone $\to$ Aisle $\to$ Rack $\to$ Bin*), konvensi pengalamatan koordinat bin, klasifikasi lokasi fungsional (*storage, receiving dock, inspection, picking area, staging, scrap*), lokasi virtual sistem (*virtual locations*), dan arsitektur *multi-warehouse*.

---

### 2. Kuantitas, Satuan Ukuran & Ketersediaan Stok

4. [[05-inventory/stock-quantity-and-availability|Stock Quantity and Availability]]  
   Taksonomi status kuantitas persediaan (*On-Hand, Reserved, Allocated, Available, Quarantine, Blocked, On-Order, In-Transit*), variasi formula ketersediaan stok (*conservative vs operational vs prospective*), konsep *Available-to-Promise (ATP)* dinamis, serta perlindungan cadangan pengaman (*Safety Stock*).

5. [[05-inventory/inventory-uom-and-conversion|Inventory UOM and Unit Conversion]]  
   Hierarki satuan ukuran persediaan (*Base UOM, Purchasing UOM, Sales UOM, Packaging UOM*), faktor konversi satuan, aturan bahwa Base UOM adalah kebenaran tunggal, penanganan pembulatan dan presisi desimal, pembatasan kelas UOM fisik yang tidak kompatibel, serta konsep *Catch Weight (Dual-UOM Inventory)*.

---

### 3. Operasi Logistik Pergudangan (Inbound & Outbound)

6. [[05-inventory/inventory-receiving|Inventory Receiving and Inbound Logistics]]  
   Alur penerimaan fisik barang dari pemasok eksternal, pembongkaran muatan (*unloading*), area karantina mutu (*QC hold*), penempatan ke rak penyimpanan definitif (*putaway*), optimasi tata letak (*slotting*), pemisahan status kuantitas (*Ordered, Received, Accepted, Put Away, Invoiced*), dan penanganan *over/under-receipt*.

7. [[05-inventory/inventory-picking-and-delivery|Inventory Picking, Packing, and Delivery]]  
   Alur logistik keluar pemenuhan pesanan (*outbound fulfillment*), strategi pengambilan barang di lantai gudang (*Discrete, Batch, Zone, Wave Picking*), logika rute pengambilan barang (*FIFO vs FEFO*), pengemasan dan pelabelan kurir (*packing*), dermaga muat (*staging*), pengeluaran barang (*goods issue*), dan bukti serah terima (*Proof of Delivery / POD*).

8. [[05-inventory/internal-stock-transfer|Internal Stock Transfer]]  
   Perpindahan persediaan internal antar-koordinat tanpa perubahan kepemilikan aset, tiga tingkatan transfer (*Bin-to-Bin, Warehouse-to-Warehouse, Inter-Company*), model eksekusi satu langkah (*one-step*) vs dua langkah (*two-step*), peranan krusial gudang virtual dalam perjalanan (*In-Transit Warehouse*), dan penanganan selisih pengiriman logistik.

---

### 4. Pengendalian Komitmen, Biaya & Pelacakan Mutu

9. [[05-inventory/inventory-reservation-and-allocation|Inventory Reservation and Allocation]]  
   Mekanisme penguncian persediaan untuk pemenuhan permintaan, perbedaan *Soft Reservation* (komitmen logis pada tingkat gudang) vs *Hard Allocation* (penguncian fisik rak, lot, dan nomor seri tertentu), kebijakan alokasi (*FIFO demand, customer priority, promised date*), dan batas waktu kedaluwarsa reservasi (*auto-release TTL*).

10. [[05-inventory/inventory-costing|Inventory Costing and Valuation Methods]]  
    Metode matematis penentuan nilai moneter persediaan dan COGS sesuai IAS 2, perbedaan fundamental aliran fisik logistik vs aliran biaya finansial (*physical flow $\neq$ cost flow*), analisis komparasi numerik komprehensif *FIFO vs Moving Average*, pembentukan *cost layers*, serta perlakuan varians biaya standar (*Standard Costing & PPV*).

11. [[05-inventory/landed-cost|Landed Cost and Capitalization]]  
    Akumulasi biaya perolehan langsung persediaan (ongkos angkut *inbound freight*, bea masuk impor, asuransi perjalanan, penanganan pelabuhan) sesuai IAS 2, penyaringan biaya yang boleh dikapitalisasi vs dilarang dikapitalisasi, dasar alokasi matematis (*by value, quantity, weight, volume*), alur penjurnalan akrual kliring, dan penanganan biaya yang tiba pasca barang terjual (*post-sale landed cost*).

12. [[05-inventory/lot-and-serial-number-tracking|Lot and Serial Number Tracking]]  
    Mekanisme ketertelusuran penuh rantai pasok (*Traceability*), perbedaan fundamental pelacakan kelompok (*Lot/Batch Number*) vs pelacakan unit tunggal (*Serial Number*), pelacakan mundur untuk investigasi akar masalah (*backward traceability*) vs pelacakan maju untuk penarikan produk cacat (*forward targeted recall*), serta penerapan aturan *FEFO*.

---

### 5. Rekonsiliasi, Perencanaan & Integrasi Sistem

13. [[05-inventory/inventory-adjustment|Inventory Adjustment and Write-Off]]  
    Tata kelola transaksi koreksi luar biasa untuk menyelaraskan catatan sistem dengan fisik nyata, prinsip audit bahwa penyesuaian bukan jalan pintas operasional, tipologi penyesuaian positif (*found stock*) vs negatif (*shrinkage, physical damage, expiry scrap*), alur persetujuan berbasis limit kewenangan (*DOA*), dan dampak akuntansi finansialnya.

14. [[05-inventory/physical-inventory-count|Physical Inventory Count and Stock Opname]]  
    Verifikasi audit keberadaan nyata aset (*existence assertion*), perbandingan metodologis *Full Stock Opname* tahunan (*warehouse freeze*) vs *Cycle Counting* berkala berbasis Analisis ABC, prinsip pengendalian internal lembar hitung buta (*Blind Count*), alur investigasi varians fisik sebelum diakui sebagai kerugian akuntansi, dan penyesuaian saldo buku.

15. [[05-inventory/inventory-return-and-reversal|Inventory Return, Quarantine, and Reversal]]  
    Tata kelola logistik balik (*reverse logistics*), penerimaan retur pelanggan (*Sales Return / RMA*) dan isolasi di area karantina mutu (*QC Quarantine*), opsi disposisi akhir (*restock, rework, scrap, return to vendor*), pengembalian barang cacat ke pemasok (*Return to Vendor / RTV*), serta perbedaan pembatalan mutasi cermin (*reversal / storno*) vs transaksi retur formal.

16. [[05-inventory/replenishment-and-stock-planning|Replenishment and Stock Planning]]  
    Aturan bisnis dan mesin otomatisasi pengisian ulang stok, parameter kunci persediaan (*Safety Stock, Lead Time, Reorder Point / ROP, Min-Max Levels*), strategi perencanaan stok (*Min-Max, EOQ, Periodic Review, MRP, Kanban*), serta pemisahan tegas antara rekomendasi perencanaan sistem (*planning suggestion*) vs eksekusi pembelian komersial (*purchase execution*).

17. [[05-inventory/inventory-integration|Inventory and Warehouse Management Integration]]  
    Sintesis arsitektur terpadu siklus persediaan lintas domain enterprise (Sales, Purchasing, Warehouse, Quality, Manufacturing, Accounting, General Ledger), pemisahan tegas antara aliran fisik barang vs aliran finansial dokumen (*physical flow vs financial flow*), matriks integrasi peristiwa bisnis, dan penelusuran transaksi acuan kanonikal secara menyeluruh dari saldo awal hingga rekonsiliasi akhir persediaan.
