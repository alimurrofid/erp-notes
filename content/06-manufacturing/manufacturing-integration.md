---
title: "Manufacturing and Production Integration Architecture"
tags:
  - manufacturing
  - integration
  - erp-architecture
  - supply-chain
  - p2p
  - o2c
  - accounting
---

# Manufacturing and Production Integration Architecture

## Definition

**Manufacturing and Production Integration Architecture** adalah sintesis arsitektural komprehensif dalam ERP yang menghubungkan seluruh siklus manufaktur dengan ekosistem domain bisnis lainnya—menjadikan modul produksi sebagai **mesin pengonversi nilai (*value conversion engine*)** yang menerjemahkan permintaan komersial dari pelanggan menjadi kebutuhan pengadaan material, menggerakkan eksekusi logistik di lantai gudang, serta mencatat akumulasi biaya dan laba kotor di buku besar keuangan (*General Ledger*).

Manufaktur adalah jantung operasional perusahaan industri. Tanpa integrasi yang mulus, pabrik akan beroperasi secara buta (*siloed operation*): memproduksi barang yang tidak dibutuhkan pasar, kehabisan komponen di tengah perakitan, atau menghasilkan biaya produksi yang tidak dapat direkonsiliasi dengan laporan keuangan.

---

## Arsitektur Aliran Terpadu Hulu-ke-Hilir (End-to-End Architecture)

Diagram berikut memetakan bagaimana data dan transaksi mengalir melintasi seluruh domain ERP:

```mermaid
flowchart TD
    SO["Sales Order (Pesanan Pelanggan)"]
    FC["Prakiraan Pasar (Demand Forecast)"]

    MPS["Master Production Schedule (MPS)"]
    MRP["Material Requirements Planning (MRP Engine)"]

    PR["Purchase Requisition (PR)"]
    PO["Purchase Order (PO Vendor)"]
    GR["Goods Receipt (Gudang Bahan Baku)"]
    StockVal["Valuasi Persediaan & Landed Cost"]

    MO["Manufacturing Order (MO Released)"]
    Issue["Material Issue (Bahan Masuk WIP)"]
    SFC["Shop Floor Operations (Work Center & Labor)"]
    FG_Out["Finished Goods Output (Barang Jadi Selesai)"]

    FG_Stock["Gudang Barang Jadi (Available ATP)"]
    DO["Delivery Order (Pengiriman ke Pelanggan)"]

    WIP_Acc["Akun Barang Dalam Proses (WIP)"]
    Var_Acc["Akun Varians Produksi (MUV, LEV, PPV)"]
    COGS_Acc["Beban Pokok Penjualan (COGS)"]
    Rev_Acc["Pengakuan Pendapatan (IFRS 15)"]

    SO --> MPS
    FC --> MPS
    MPS --> MRP
    
    MRP -->|"Rekomendasi Beli (Buy)"| PR
    PR --> PO
    PO --> GR
    GR --> StockVal
    StockVal -->|"Pasokan Komponen Siap"| Issue
    
    MRP -->|"Rekomendasi Buat (Make)"| MO
    MO --> Issue
    MO --> SFC
    Issue --> SFC
    SFC --> FG_Out
    
    FG_Out --> FG_Stock
    FG_Stock --> DO
    
    Issue -->|"Debit WIP / Kredit Bahan"| WIP_Acc
    SFC -->|"Beban Tenaga Kerja & Overhead"| WIP_Acc
    FG_Out -->|"Debit Barang Jadi / Kredit WIP"| WIP_Acc
    MO -->|"Penutupan Selisih Biaya"| Var_Acc
    DO -->|"Pengakuan HPP Penjualan"| COGS_Acc
    DO --> Rev_Acc

    classDef demand fill:#e3f2fd,stroke:#1976d2,stroke-width:1px,color:#0f172a;
    classDef planning fill:#fff8e1,stroke:#fbc02d,stroke-width:1px,color:#0f172a;
    classDef supply fill:#fff3e0,stroke:#f57c00,stroke-width:1px,color:#0f172a;
    classDef prod fill:#e8f5e9,stroke:#388e3c,stroke-width:1.5px,color:#0f172a;
    classDef fulfill fill:#e0f2f1,stroke:#00897b,stroke-width:1px,color:#0f172a;
    classDef fin fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px,color:#0f172a;

    class SO,FC demand;
    class MPS,MRP planning;
    class PR,PO,GR,StockVal supply;
    class MO,Issue,SFC,FG_Out prod;
    class FG_Stock,DO fulfill;
    class WIP_Acc,Var_Acc,COGS_Acc,Rev_Acc fin;
```

---

## Matriks Integrasi Lintas Fase (Cross-Phase Integration Matrix)

Tabel berikut merangkum hubungan ketergantungan data dan transaksi antara Phase 7 dengan fase-fase ERP sebelumnya:

| Domain Terkait | Titik Temu Integrasi Data | Dokumen / Transaksi Terlibat | Dampak Operasional & Finansial |
| :--- | :--- | :--- | :--- |
| **Phase 1: Fundamentals** | Hak akses, batas wewenang, dan jejak audit. | *Approval limits*, *Audit logging*, *User Roles*. | Memastikan otorisasi pelepasan pesanan produksi dan penyesuaian varians sesuai batas kewenangan (*Delegation of Authority / DOA*). |
| **Phase 2: Business Processes** | Pendalaman alur bisnis makro menjadi eksekusi detail. | [[01-business-processes/manufacturing-process\|Manufacturing Process]], [[01-business-processes/order-to-cash\|O2C]], [[01-business-processes/procure-to-pay\|P2P]]. | Mengubah konsep alur proses umum menjadi aturan validasi, model data, dan formula matematis yang dapat dieksekusi. |
| **Phase 3: Accounting** | Akuntansi biaya persediaan dan penyerapan beban. | [[02-accounting/inventory-accounting\|Inventory Accounting]], [[02-accounting/chart-of-accounts\|COA]], [[02-accounting/general-ledger-and-subledger\|GL]]. | Akumulasi biaya bahan, tenaga kerja, dan overhead ke akun WIP; penutupan varians produksi ke laporan laba rugi bulanan. |
| **Phase 4: Sales (O2C)** | Sumber permintaan komersial dan pemenuhan pesanan. | [[03-sales/sales-order\|Sales Order]], [[03-sales/order-fulfillment\|Order Fulfillment]], [[03-sales/delivery-and-shipping\|Delivery Order]]. | Pesanan penjualan memicu jadwal produksi (MTO/ATO); penyelesaian barang jadi mengaktifkan kuantitas ATP untuk pengiriman ke pelanggan. |
| **Phase 5: Purchasing (P2P)** | Pengadaan kekurangan komponen bahan baku. | [[04-purchasing/purchase-requisition\|Purchase Requisition]], [[04-purchasing/purchase-order\|Purchase Order]], [[04-purchasing/goods-receipt-and-service-receipt\|Goods Receipt]]. | Hasil komputasi MRP meledakkan BOM dan otomatis menerbitkan PR ke pemasok eksternal untuk komponen yang defisit di gudang. |
| **Phase 6: Inventory & WMS** | Alokasi stok, logistik fisik, dan biaya perolehan. | [[05-inventory/stock-quantity-and-availability\|Stock Availability (ATP)]], [[05-inventory/inventory-receiving\|Putaway]], [[05-inventory/inventory-costing\|Costing]]. | Kuantitas bahan baku direservasi logis (*Soft Lock*) lalu diambil fisik (*Material Issue*); kapitalisasi landed cost freight memperbarui biaya pokok bahan. |

---

## Penelusuran Transaksi Kanonikal Terpadu (End-to-End Trace)

Untuk membuktikan keutuhan integrasi dari awal hingga akhir, berikut adalah penelusuran numerik kanonikal terpadu pembuatan produk jadi **Laptop Pro**:

### 1. Permintaan Masuk (Sales / O2C)
* Pelanggan PT Mitra Niaga memesan **100 unit Laptop Pro**.
* Diterbitkan Sales Order `SO-2026-09-0088`. Saldo stok bebas di gudang barang jadi saat ini = 0 unit (*MTO Environment*).

### 2. Perencanaan dan Kebutuhan Material (Planning & MRP)
* Modul MPS menjadwalkan perakitan 100 unit Laptop Pro untuk selesai pada **Minggu ke-4**.
* Mesin MRP meledakkan BOM: Dibutuhkan **100 unit Komponen Utama Motherboard** dan **100 unit Baterai**.
* Sistem memeriksa persediaan: Komponen Motherboard di gudang = 0 unit.
* MRP secara otomatis menerbitkan usulan pengadaan (*Planned Purchase Order*) kepada pemasok **PT Sumber Teknologi** (lihat konsistensi dengan Phase 5).

### 3. Pengadaan dan Penerimaan Bahan Baku (Purchasing & Inbound WMS)
* Bagian Purchasing menerbitkan `PO-2026-09-0081` untuk 100 unit Komponen Motherboard @ Rp700.000 = **Rp70.000.000 (DPP)**.
* Barang tiba di dermaga dan diposting Goods Receipt `GR-2026-09-0010`.
* Ekspedisi menagihkan ongkos angkut freight sebesar Rp5.000.000 yang dikapitalisasi melalui Landed Cost Voucher:
  $$\text{Nilai Perolehan Bersih Bahan Baku} = \text{Rp}70.000.000 + \text{Rp}5.000.000 = \mathbf{\text{Rp}75.000.000 \text{ (atau Rp750.000/unit)}}$$

### 4. Eksekusi Perakitan Pabrik (Manufacturing Order & WIP)
* Diterbitkan Manufacturing Order `MO-2026-0042` untuk 100 unit Laptop Pro.
* **Pengeluaran Bahan Baku (*Material Issue*)**:
  100 unit motherboard ditarik dari gudang bahan baku ke lini perakitan:
  * *(Dr)* Persediaan Barang Dalam Proses (*WIP — Materials*): **Rp75.000.000**
  * *(Cr)* Persediaan Bahan Baku: **Rp75.000.000**
* **Operasi Kerja dan Penyerapan Biaya Konversi (*Shop Floor Execution*)**:
  Operator mencatat 100 jam kerja dan mesin berjalan 50 jam:
  * Biaya Tenaga Kerja Diserap = 100 jam @ Rp20.000 = **Rp2.000.000**.
  * Biaya Overhead Mesin Diserap = 50 jam @ Rp40.000 = **Rp2.000.000**.
  * Jurnal Penyerapan Konversi:
    * *(Dr)* Persediaan Barang Dalam Proses (*WIP — Conversion*): **Rp4.000.000**
    * *(Cr)* Beban Tenaga Kerja Langsung Dialokasikan: **Rp2.000.000**
    * *(Cr)* Beban Overhead Pabrik Dialokasikan: **Rp2.000.000**
* **Total Akumulasi Biaya di Akun WIP**:
  $$\text{Total Saldo Debet WIP} = \text{Rp}75.000.000 \text{ (Bahan)} + \text{Rp}4.000.000 \text{ (Konversi)} = \mathbf{\text{Rp}79.000.000}$$

### 5. Penyelesaian Produksi dan Pemeriksaan Mutu (Output & QC)
* 100 unit Laptop Pro selesai dirakit secara fisik dan menjalani pengujian fungsi (*Burn-in Test*).
* Hasil Uji QC: **100 unit dinyatakan Lolos Sempurna (100% Pass Yield)**.
* Diposting dokumen *Finished Goods Receipt*:
  * *(Dr)* Persediaan Barang Jadi (*Finished Goods*): **Rp79.000.000** (atau **Rp790.000/unit**)
  * *(Cr)* Persediaan Barang Dalam Proses (*WIP*): **Rp79.000.000**
* *Hasil*: Saldo akun WIP kembali bersaldo nol (nihil). Gudang barang jadi mencatat tambahan 100 unit Laptop Pro siap kirim dengan nilai perolehan sah Rp790.000/unit.

### 6. Pengiriman ke Pelanggan dan Pengakuan Laba (O2C & Finance)
* Dokumen Delivery Order `DO-2026-09-0088` divalidasi: 100 unit Laptop Pro dikirim ke PT Mitra Niaga.
* **Jurnal Beban Pokok Penjualan (COGS)**:
  * *(Dr)* Beban Pokok Penjualan (*COGS*): **Rp79.000.000**
  * *(Cr)* Persediaan Barang Jadi: **Rp79.000.000**
* **Jurnal Faktur Penjualan (Invoice @ Rp1.200.000/unit)**:
  * *(Dr)* Piutang Usaha (*Accounts Receivable*): **Rp133.200.000** (DPP Rp120.000.000 + PPN Rp13.200.000)
  * *(Cr)* Pendapatan Penjualan: **Rp120.000.000**
  * *(Cr)* Utang Pajak Keluaran (PPN Keluaran efektif 11%): **Rp13.200.000**
* **Laba Kotor yang Terealisasi**:
  $$\text{Laba Kotor Operasional} = \text{Rp}120.000.000 - \text{Rp}79.000.000 = \mathbf{\text{Rp}41.000.000 \text{ (Gross Margin = 34,17\%)}}$$

*Korelasi Paripurna*: Aliran material fisik, transaksi operasional pabrik, dan pembukuan finansial terbukti sinkron 100% tanpa ada selisih yang menggantung.

---

## ERP Implementation Comparison

| Aspek Arsitektur | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 SCM |
| :--- | :--- | :--- | :--- |
| **Model Integrasi Inti** | Terintegrasi erat berbasis rute (*Procurement & Manufacturing Routes*): Menghubungkan pesanan penjualan langsung ke MO (MTO) dan memicu RFQ via scheduler. | Dokumen pusat `Production Plan`: Menggabungkan permintaan Sales Order dan menghasilkan Work Order serta Material Request secara serentak. | Arsitektur modular enterprise: Pemisahan tegas antara *Master Planning Service*, *Production Control*, *Warehouse Management*, dan *Cost Accounting*. |
| **Otomasi Aliran Finansial** | Otomasi penuh via rute akrual inventaris pada Product Category saat valuasi diatur ke *Automated*. | Real-time posting via tabel `GL Entry` saat dokumen Stock Entry tipe Manufacture disubmit. | Arsitektur formal *Subledger Journal*: Posting biaya produksi diatur pada parameter *Production order posting profiles* ke buku besar. |
| **Dukungan Shop Floor to WMS** | Integrasi native antara Shop Floor App dengan modul Barcode & Inventory Transfers. | Integrasi antara Job Card dengan Stock Entry perpindahan material lantai kerja. | Fitur tingkat industri: **Advanced Warehouse Integration for Production** (penanganan pemindahan bahan otomatis via kartu Kanban dan rute Wave). |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-manufacturing|Design manufacturing]] (NAV-D-031).

---

## References

1. **ASCM / APICS** — *SCOR Model* (Make process dan integrasi lintas fungsi) (cetak).
2. **IFRS Foundation** — *IAS 2 Inventories* (biaya konversi dan pengakuan COGS). https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 24 November 2026.
3. **Microsoft Learn** — *Production process overview* (Dynamics 365 Supply Chain Management; termasuk keterkaitan dengan General ledger). https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/production-process-overview — diakses 24 November 2026.
4. **ERPNext Documentation** — *Manufacturing*. https://docs.frappe.io/erpnext/manufacturing — diakses 24 November 2026.
5. **Odoo 20.0 Documentation** — *Manufacturing*. https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing.html — diakses 24 November 2026.
