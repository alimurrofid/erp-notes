---
title: "Subcontracting and External Processing"
tags:
  - manufacturing
  - subcontracting
  - toll-manufacturing
  - external-processing
  - purchasing
  - inventory
---

# Subcontracting and External Processing

## Definition

**Subcontracting and External Processing** (dikenal juga sebagai *Toll Manufacturing* atau Maklon) adalah arsitektur rantai pasok dalam ERP di mana organisasi menyerahkan sebagian atau seluruh tahapan manufaktur kepada vendor eksternal (*Subcontractor*). Dalam model ini, organisasi pembeli biasanya menyediakan dan mengirimkan bahan baku atau komponen setengah jadi kepada pemasok, dan pemasok menyediakan jasa pengolahan (*processing service*) untuk kemudian mengembalikan barang jadi atau sub-perakitan yang telah diproses.

Subcontracting merupakan titik temu unik antara **tiga pilar ERP utama**:
* **Modul Purchasing (P2P)**: Mengelola pesanan jasa pemrosesan eksternal melalui [[04-purchasing/purchase-order|Subcontract Purchase Order]] dan pembayaran biaya jasa (*Service Fee*).
* **Modul Inventory (Phase 6)**: Melacak saldo persediaan milik perusahaan yang berada secara fisik di lokasi gudang vendor (*Vendor-Held Stock / Subcontractor Location*).
* **Modul Manufacturing (Phase 7)**: Mengelola struktur resep bahan baku yang dikonsumsi oleh vendor untuk menghasilkan barang jadi.

---

## Alur Bisnis Subcontracting Terpadu (End-to-End Flow)

Proses maklon manufaktur diatur melalui tahapan siklus terstruktur:

```mermaid
flowchart TD
    MO["(1) Kebutuhan Produksi Subcontracting<br/>(Diterbitkan Subcontract PO / MO)"]
    --> Send["(2) Pengiriman Komponen ke Vendor (Material Transfer Out)<br/>Bahan baku dikirim dari gudang kita ke Gudang Subcontractor.<br/>Status Kepemilikan: Tetap Milik Kita (Asset on Consignment)."]
    
    Send --> Process["(3) Pemrosesan di Pabrik Vendor<br/>Vendor melakukan pencetakan / pelapisan / perakitan."]
    
    Process --> GR["(4) Penerimaan Barang Jadi dari Vendor (Goods Receipt)<br/>Barang hasil proses diterima di gudang utama kita."]
    
    GR --> Backflush["(5) Pemotongan Stok Bahan di Gudang Vendor<br/>ERP otomatis memotong saldo bahan baku di lokasi vendor."]
    
    GR --> CostAdd["(6) Penggabungan Biaya Produk Jadi<br/>Nilai Produk = Nilai Bahan Baku Terpakai + Biaya Jasa Vendor."]
    
    CostAdd --> Bill["(7) Verifikasi Faktur Jasa Vendor (Vendor Bill P2P)<br/>Pelunasan utang jasa maklon via 3-Way Match."]
```

---

## Aspek Kepemilikan dan Lokasi Persediaan (Ownership vs. Custody)

Prinsip tata kelola persediaan paling penting dalam proses maklon adalah pemisahan antara penguasaan fisik dan kepemilikan hukum:

> [!important]
> **Legal Ownership of Subcontracted Materials**:
> Ketika bahan baku dikirimkan ke pabrik maklon, barang fisik berada di bawah penguasaan fisik vendor (*Physical Custody*), namun **secara hukum dan akuntansi barang tersebut tetap merupakan Aset Persediaan milik perusahaan kita (*Legal Ownership*)**.
> 
> Pengiriman bahan baku ke vendor **DILARANG dicatat sebagai penjualan atau pembebanan biaya**. Pengiriman ini dicatat murni sebagai perpindahan lokasi internal (*Stock Transfer to Subcontractor Location*). Nilai aset bahan baku tetap berada di neraca keuangan kita.

---

## Dua Model Pengadaan Maklon dalam ERP

Sistem ERP enterprise mengklasifikasikan maklon ke dalam dua model arsitektur:

| Model Maklon | Cara Kerja Operasional | Kapan Digunakan? | Integrasi Modul ERP |
| :--- | :--- | :--- | :--- |
| **Full Subcontracting (Assembly Outsourcing)** | Perusahaan memesan seluruh perakitan produk jadi dari vendor. Perusahaan mengirimkan daftar lengkap komponen (BOM) ke vendor, dan menerima produk jadi Level 0. | Perusahaan bertindak sebagai perancang (*Fabless Designer*) yang tidak memiliki lini perakitan sendiri. | Purchase Order bertipe *Subcontracting* yang memiliki tabel lampiran komponen BOM. |
| **External Operation / Processing (Maklon Operasi Kerja)** | Produk dirakit di pabrik sendiri, namun ada satu tahapan operasi kerja spesifik yang harus dikirim ke luar pabrik (misal: Operasi 10: Pemotongan Sasis di pabrik sendiri $\to$ Operasi 20: *Anodizing & Pengecatan* di vendor maklon $\to$ Operasi 30: Perakitan Akhir di pabrik sendiri). | Proses khusus yang membutuhkan mesin berbiaya investasi sangat tinggi (seperti *Heat Treatment*, pelapisan krom, sterilisasi radiasi gamma). | Dokumen [[06-manufacturing/routing-and-work-center|Routing]] memiliki tahapan operasi yang ditandai sebagai *External Work Center*. Operasi ini otomatis memicu pembuatan Purchase Order jasa saat MO dirilis. |

---

## Dampak Akuntansi dan Akumulasi Biaya Maklon

Nilai perolehan persediaan barang yang diterima dari vendor maklon merupakan kombinasi dari nilai bahan baku ditambah biaya jasa:

### Skenario Transaksi Kanonikal:
* **Komponen yang Dikirim ke Vendor**:
  * 100 unit sasis aluminium mentah dengan biaya perolehan @ Rp400.000 = **Rp40.000.000**.
* **Biaya Jasa Maklon (*Subcontracting Service Fee*)**:
  * Vendor menagihkan jasa pengecatan dan pelapisan *powder coating* sebesar Rp100.000 per unit (Total = **Rp10.000.000** + PPN efektif 11% Rp1.100.000).

---

### Alur Penjurnalan Akuntansi (Perpetual Inventory):

#### 1. Saat Pengiriman Bahan Baku ke Pabrik Vendor (Material Transfer):
Mutasi fisik memindahkan stok dari gudang reguler ke gudang virtual maklon:
* *Stock Ledger*: Mutasi keluar dari `Gudang Utama Raw Materials`, mutasi masuk ke `Gudang Subcontractor A`.
* *Buku Besar (GL)*: Perpindahan antar-rekening pembantu aset persediaan (tidak ada dampak laba rugi):
  * *(Dr)* Persediaan Bahan Baku di Pihak Ketiga (Subcontractor Stock): **Rp40.000.000**
  * *(Cr)* Persediaan Bahan Baku di Gudang Sendiri: **Rp40.000.000**

#### 2. Saat Penerimaan Barang Jadi yang Telah Dicat (Goods Receipt):
ERP menerima 100 unit sasis jadi dan mengeksekusi konsumsi bahan baku di lokasi vendor secara otomatis (*backflush*):
* *Kalkulasi Biaya Barang Jadi*: $\text{Rp}40.000.000 \text{ (Bahan)} + \text{Rp}10.000.000 \text{ (Jasa)} = \mathbf{\text{Rp}50.000.000}$ (@ Rp500.000/unit).
* *Jurnal Finansial Penerimaan Persediaan*:
  * *(Dr)* Persediaan Barang Jadi (Sasis Coated): **Rp50.000.000**
  * *(Cr)* Persediaan Bahan Baku di Pihak Ketiga: **Rp40.000.000**
  * *(Cr)* Utang Jasa Belum Ditagih (*Subcontracting GR/IR Accrual*): **Rp10.000.000**

#### 3. Saat Penerimaan Faktur Tagihan Vendor Maklon (Vendor Bill):
Bagian Accounts Payable memverifikasi tagihan jasa maklon:
* *(Dr)* Utang Jasa Belum Ditagih (*Subcontracting GR/IR Accrual*): **Rp10.000.000**
* *(Dr)* Pajak Masukan (PPN Masukan efektif 11%): **Rp1.100.000**
* *(Cr)* Utang Usaha (Vendor Maklon): **Rp11.100.000**
* *(Cr/Dr)* Pemotongan PPh Pasal 23 Jasa Maklon (sesuai regulasi pajak jika berlaku): *(Dr Utang Usaha, Cr Utang PPh 23)*.

---

## ERP Implementation Comparison

| Aspek | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 SCM |
| :--- | :--- | :--- | :--- |
| **Model Dokumen** | Tipe BOM khusus: *Subcontracting*. Purchase Order untuk barang jadi otomatis memicu dokumen transfer komponen (*Delivery Order to Subcontractor*). | Dokumen formal `Purchase Order` dengan checklist *Is Subcontracted*. Mengharuskan pemilihan *Supplied Items* dan dokumen *Subcontracting Receipt*. | Mendukung dua alur formal: **Subcontract Purchase Order** (untuk full subcontracting) dan **External Operation Routing** yang terhubung ke service PO. |
| **Pelacakan Saldo di Vendor** | Dikelola melalui tipe lokasi khusus: *Subcontracting Location* (bertindak sebagai lokasi internal milik perusahaan di alamat mitra). | Menggunakan gudang khusus tipe perantara: *Subcontractor Warehouse* yang dipilih pada Purchase Order. | Menggunakan dimensi inventaris: *Warehouse* terdedikasi vendor dengan kontrol persediaan konsinyasi milik sendiri. |
| **Konsumsi Bahan di Vendor** | Terjadi otomatis (*Backflush*) saat dokumen penerimaan barang jadi (*Stock Receipt*) dari vendor divalidasi. | Terjadi otomatis pada dokumen *Subcontracting Receipt* berdasarkan kuantitas bahan yang tertera pada tabel *Supplied Items*. | Mendukung fleksibilitas: pemotongan otomatis (*automatic flushing*) atau pelaporan manual kuantitas bahan riil yang terpakai oleh vendor. |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-manufacturing|Design manufacturing]] (NAV-D-045).

---

## References

1. **ASCM / APICS** — *APICS Dictionary* (subcontracting, toll manufacturing, outside processing, consignment) (cetak).
2. **IFRS Foundation** — *IAS 2 Inventories* (biaya konversi dan biaya outside processing). https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 24 November 2026.
3. **Microsoft Learn** — *Production process overview* (Dynamics 365 Supply Chain Management). https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/production-process-overview — diakses 24 November 2026.
4. **ERPNext Documentation** — *Subcontracting*. https://docs.frappe.io/erpnext/subcontracting — diakses 24 November 2026.
5. **Odoo 20.0 Documentation** — *Manufacturing* (subcontracting). https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing.html — diakses 24 November 2026.
