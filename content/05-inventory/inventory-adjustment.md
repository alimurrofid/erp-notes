---
title: "Inventory Adjustment and Write-Off"
tags:
  - inventory
  - stock-adjustment
  - write-off
  - governance
  - internal-control
  - accounting
---

# Inventory Adjustment and Write-Off

## Definition

**Inventory Adjustment and Write-Off** adalah transaksi koreksi luar biasa (*extraordinary corrective transaction*) dalam sistem ERP yang digunakan untuk menyelaraskan ketidaksesuaian (*discrepancy*) antara saldo persediaan yang tercatat di sistem dengan kondisi fisik nyata di lantai gudang, atau untuk menghapus nilai buku barang yang telah rusak, usang, atau hilang.

Berbeda dengan transaksi pergerakan persediaan normal ([[05-inventory/inventory-receiving|Receiving]], [[05-inventory/inventory-picking-and-delivery|Picking]], [[05-inventory/internal-stock-transfer|Transfer]]) yang selalu memiliki dokumen bisnis pembenaran (*supporting business document*) seperti Purchase Order atau Sales Order, penyesuaian persediaan mencerminkan **peristiwa non-transaksional atau kegagalan operasional** (seperti pencurian, penyusutan alami, kerusakan penanganan, atau kesalahan input data historis).

---

## Prinsip Tata Kelola: Penyesuaian Bukan Jalan Pintas Operasional

Salah satu pilar pengendalian internal terpenting dalam tata kelola pergudangan ERP adalah:

> [!caution]
> **Strict Internal Control Warning**: Fitur *Inventory Adjustment* **bukanlah tombol bebas untuk "merapikan" angka sistem tanpa investigasi!**
> 
> Menggunakan penyesuaian persediaan untuk menutupi kesalahan proses (misal: menyesuaikan stok berkurang karena staf lupa memposting dokumen surat jalan) adalah pelanggaran berat tata kelola. Di mata auditor internal dan eksternal, frekuensi dan nilai penyesuaian persediaan yang tinggi merupakan indikator utama adanya kelemahan pengawasan, manipulasi pembukuan, atau potensi penggelapan barang (*theft and fraud*).

---

## Tipologi Penyesuaian Persediaan (Adjustment Typology)

Sistem ERP mengklasifikasikan penyesuaian persediaan ke dalam dua arah mutasi dengan alasan bisnis terstruktur (*Mandatory Reason Codes*):

```mermaid
flowchart TD
    Adj["Inventory Adjustment Event"]
    
    subgraph Pos["(1) Penyesuaian Positif (Stock Gain / Increase)"]
        G1["Found Stock (Barang ditemukan terselip di rak lain)"]
        G2["Supplier Excess / Bonus (Kelebihan kirim tanpa tagihan)"]
        G3["Data Entry Correction (Koreksi kesalahan input sebelumnya)"]
    end
    
    subgraph Neg["(2) Penyesuaian Negatif (Stock Loss / Decrease / Write-Off)"]
        L1["Shrinkage & Theft (Penyusutan, pencurian, atau pengutilan)"]
        L2["Physical Damage (Pecah, penyok, tumpah saat penanganan)"]
        L3["Obsolescence & Expiry (Kedaluwarsa, busuk, atau teknologi usang)"]
        L4["Scrap & Disposal (Pemusnahan fisik barang cacat)"]
    end
    
    Adj --> Pos
    Adj --> Neg
```

### Karakteristik Masing-Masing Alasan Penyesuaian:

| Kode Alasan (*Reason Code*) | Dampak Kuantitas | Penyebab Umum | Perlakuan Akuntansi |
| :--- | :--- | :--- | :--- |
| **DAMAGED_IN_WH** | Negatif (-) | Kelalaian penanganan forklift, tertimpa palet lain, atau banjir di area gudang. | Dihapus dari neraca; dibebankan ke akun *Beban Kerusakan Persediaan*. |
| **SHRINKAGE_THEFT** | Negatif (-) | Selisih fisik yang tidak dapat dijelaskan saat penghitungan fisik berkala (*stock opname*). | Dibebankan ke akun *Beban Kehilangan / Selisih Persediaan*. |
| **EXPIRED_SCRAP** | Negatif (-) | Barang melewati batas masa kedaluwarsa dan tidak layak jual secara regulasi. | Pemusnahan fisik resmi (*disposal*); dibebankan ke akun *Beban Barang Usang/Kedaluwarsa*. |
| **FOUND_STOCK** | Positif (+) | Barang terselip di koordinat bin yang salah atau dokumen pembatalan retur belum tercatat. | Diakui penambahan aset persediaan; dikreditkan ke akun *Pendapatan / Selisih Lebih Persediaan*. |
| **REVALUATION_NRV** | Kuantitas Tetap (0), Nilai Berubah | Nilai pasar barang turun di bawah biaya perolehannya sesuai prinsip IAS 2 (*Lower of Cost and NRV*). | Penurunan nilai persediaan (*Inventory Write-Down*); mendebit akun *Beban Penurunan Nilai Persediaan*. |

---

## Alur Tata Kelola dan Otorisasi (Approval Workflow)

Untuk mencegah penyalahgunaan, setiap penyesuaian persediaan wajib melalui alur persetujuan berbasis ambang batas kewenangan (*Delegation of Authority / DOA*):

```mermaid
flowchart LR
    Detect["(1) Identifikasi Selisih / Kerusakan Fisik"]
    --> Draft["(2) Input Draft Adjustment<br/>Wajib menyertakan Reason Code & Bukti Foto/Berita Acara"]
    --> ValueCheck{Berapa Total Nilai<br/>Moneter Penyesuaian?}
    
    ValueCheck -- "< Rp1.000.000" --> WHMgr["3a. Otorisasi Supervisor / Manajer Gudang"]
    ValueCheck -- "Rp1.000.000 - Rp20.000.000" --> FinMgr["3b. Otorisasi Manajer Keuangan / Controller"]
    ValueCheck -- "> Rp20.000.000" --> Dir["3c. Otorisasi Direktur Keuangan / CFO"]
    
    WHMgr --> Post["(4) Posting Otomatis ke Stock Ledger & General Ledger"]
    FinMgr --> Post
    Dir --> Post
```

### Syarat Administrasi Dokumen Penyesuaian:
1. **Mandatory Reason Code**: Pengguna tidak dapat memposting penyesuaian tanpa memilih kode alasan dari daftar terstandarisasi.
2. **Supporting Attachment**: Wajib melampirkan Berita Acara Kerusakan Barang (BAKB), hasil investigasi selisih fisik, atau bukti foto fisik barang yang rusak.
3. **Pemisahan Tugas (*Segregation of Duties*)**: Operator yang menghitung selisih fisik **dilarang** memiliki hak akses untuk menyetujui (*approve*) dokumen penyesuaian di sistem ERP.

---

## Dampak Akuntansi Finansial (Financial Impact)

Penyesuaian persediaan dalam sistem *Perpetual Inventory* secara langsung mengubah nilai aset di neraca dan menghasilkan pengakuan beban/pendapatan di laporan laba rugi:

### Skenario Transaksi Kanonikal:
Misalkan saat inspeksi gudang ditemukan bahwa **1 unit Komponen Utama Laptop Pro** (dengan biaya perolehan Rp750.000, inklusif landed cost) mengalami kerusakan fatal terlindas forklift dan tidak dapat diperbaiki (*Scrap / Write-Off*):

#### Jurnal Akuntansi Penghapusan Barang Rusak (Inventory Write-Off):
* *(Dr)* Beban Kerusakan Persediaan (*Inventory Scrap/Damage Expense*): **Rp750.000**
* *(Cr)* Persediaan Barang Dagang: **Rp750.000**

#### Skenario Sebaliknya: Ditemukan Kelebihan 1 Unit (Inventory Gain):
Jika ditemukan 1 unit berlebih yang sah secara fisik tanpa adanya kewajiban utang pemasok:
* *(Dr)* Persediaan Barang Dagang: **Rp750.000**
* *(Cr)* Pendapatan / Keuntungan Selisih Persediaan (*Inventory Gain*): **Rp750.000**

---

## ERP Implementation Comparison

| Aspek | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 SCM |
| :--- | :--- | :--- | :--- |
| **Model Dokumen** | Menggunakan mekanisme mutasi ke/dari lokasi virtual khusus: `Virtual Locations / Inventory adjustment` atau `Virtual Locations / Scrap`. | Menggunakan dokumen formal `Stock Entry` dengan tipe *Material Issue* (penyesuaian keluar) atau *Material Receipt* (penyesuaian masuk). | Menggunakan jurnal formal: **Inventory Adjustment Journal**, **Counting Journal**, dan **Movement Journal**. |
| **Enforcement Reason Code** | Tersedia melalui field *Reason* (dapat dikonfigurasi wajib pada modul tingkat lanjut). | Kolom *Difference Account* dan field deskripsi/alasan pada tabel baris Stock Entry. | Sangat ketat: Mewajibkan pemilihan *Reason Code* terstruktur yang terintegrasi dengan pemetaan akun GL otomatis. |
| **Pemisahan Scrap vs Adjustment** | Memiliki tombol dan wizard khusus *Scrap* yang langsung memindahkan barang ke lokasi pemusnahan permanen. | Memiliki fitur *Scrap Item* yang mengeluarkan barang dari gudang operasional ke gudang sisa (*Scrap Warehouse*). | Tidak memiliki tipe jurnal *Scrap Journal* tersendiri. Scrap dicatat melalui **Inventory Adjustment Journal** (atau movement journal) dengan alasan/kode referensi, atau lewat transaksi scrap pada order produksi; integrasi *Quality Order* menangani barang yang ditolak. |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-inventory|Design inventory]] (NAV-D-013).

---

## References

- IFRS Foundation. *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/. Diakses 24 November 2026.
- Microsoft Learn. *Inventory journals*. https://learn.microsoft.com/en-us/dynamics365/supply-chain/inventory/inventory-journals. Diakses 24 November 2026.
- Odoo 20.0 Documentation. *Scrap inventory*. https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/inventory/warehouses_storage/inventory_management/scrap_inventory.html. Diakses 24 November 2026.
