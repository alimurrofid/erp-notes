---
title: "Inventory Return, Quarantine, and Reversal"
tags:
  - inventory
  - returns
  - reverse-logistics
  - quarantine
  - rma
  - rtv
---

# Inventory Return, Quarantine, and Reversal

## Definition

**Inventory Return, Quarantine, and Reversal** adalah tata kelola sistemik dalam ERP yang mengatur logistik balik (*reverse logistics*) dan pembatalan mutasi stok—mulai dari pengembalian barang cacat ke pemasok (*Return to Vendor / RTV*), penerimaan pengembalian barang dari pelanggan (*Sales Return / RMA*), isolasi fisik dan sistemik di area karantina mutu (*Quality Quarantine*), hingga penentuan disposisi akhir apakah barang dapat dijual kembali (*restock*), diperbaiki (*rework*), atau harus dimusnahkan (*scrap*).

Logistik balik merupakan salah satu proses paling rentan dalam sistem ERP karena berisiko mencemari data persediaan yang sehat jika barang cacat atau barang bekas pakai salah dimasukkan kembali ke rak persediaan barang baru yang siap jual (*Available ATP*).

---

## Tipologi Logistik Balik (Reverse Logistics Typology)

Sistem ERP membedakan dua arah utama logistik balik:

```mermaid
flowchart TD
    subgraph ReverseLogistics["Dua Domain Logistik Balik dalam ERP"]
        direction TB
        subgraph InboundReturn["(1) Customer Return (Sales Return Inbound)"]
            Cust["Pelanggan"] -->|"Pengembalian Barang (RMA)"| Dock["Dermaga Penerimaan Retur"]
            Dock --> QC["Karantina Mutu (QC Hold)"]
            QC --> Disp1["Restock (Kembali ke Rak Jual)"]
            QC --> Disp2["Rework (Perbaikan Teknis)"]
            QC --> Disp3["Scrap (Pemusnahan Total)"]
        end

        subgraph OutboundReturn["(2) Supplier Return (Purchase Return Outbound)"]
            WH["Gudang Kita"] -->|"Retur ke Vendor (RTV)"| Supp["Pemasok Eksternal"]
            WH --> RepSupp["Penggantian Barang Baru (Replacement)"]
            WH --> DNSell["Pemotongan Utang (Debit Note)"]
        end
    end
```

---

## Logistik Balik Pelanggan: Alur Penerimaan dan Disposisi Karantina

Saat pelanggan mengembalikan barang, barang fisik **dilarang langsung dimasukkan ke rak stok bebas**. Barang wajib melalui alur inspeksi bertahap:

```mermaid
flowchart LR
    RMA["(1) Otorisasi Retur (RMA)<br/>Disetujui Tim Sales"]
    --> Gate["(2) Tiba di Gudang Retur<br/>Status: QUARANTINE (Non-ATP)"]
    --> Inspect["(3) Inspeksi Teknis / Quality Check"]
    
    Inspect --> D1{"Hasil Evaluasi Mutu"}
    D1 -- "Kondisi Sempurna (Segel Utuh)" --> Restock["4a. Restock ke Rak Jual<br/>Status: Available ATP<br/>Pulihkan Nilai Persediaan"]
    D1 -- "Cacat Pabrikasi / Garansi" --> RTV["4b. Teruskan Retur ke Vendor (RTV)"]
    D1 -- "Kerusakan Minor" --> Rework["4c. Pindahkan ke Bengkel Rework"]
    D1 -- "Rusak Total / Tidak Layak" --> Scrap["4d. Alokasikan ke Scrap / Limbah<br/>Bebankan Biaya Kerusakan"]
```

### Matriks Opsi Disposisi Akhir (Disposition Matrix):

| Opsi Disposisi | Tindakan Fisik di Gudang | Perlakuan Mutasi Stock Ledger | Dampak Akuntansi Finansial |
| :--- | :--- | :--- | :--- |
| **Return to Stock (Restock)** | Barang dibersihkan, dikemas ulang, dan diletakkan kembali di rak penyimpanan barang jadi. | Mutasi Masuk ke Gudang Reguler (`quantity_delta = +N`). | *(Dr)* Persediaan Barang Dagang<br/>*(Cr)* Pemulihan Beban Pokok Penjualan (COGS Recovery). |
| **Quarantine / Investigation** | Barang diisolasi di ruangan terkunci khusus menunggu uji laboratorium atau keputusan manajemen. | Kuantitas masuk ke lokasi bertipe *Quarantine* (`is_available_for_atp = FALSE`). | Nilai persediaan diakui sebagai persediaan tertahan di neraca. |
| **Scrap / Write-Off** | Barang dihancurkan secara fisik di hadapan saksi auditor untuk mencegah penyalahgunaan. | Barang dikeluarkan dari sistem persediaan secara permanen. | *(Dr)* Beban Kerusakan / Retur Rusak<br/>*(Cr)* Persediaan Barang Dagang. |
| **Return to Vendor (RTV)** | Barang dikemas dan dikirimkan kembali ke pemasok asal yang memasok komponen tersebut. | Mutasi Keluar dari Gudang (`quantity_delta = -N`). | Mengurangi utang usaha melalui [[04-purchasing/purchase-return-and-debit-note|Penerbitan Debit Note]]. |

---

## Logistik Balik Pemasok: Pengembalian Barang ke Vendor (RTV)

Pengembalian barang ke vendor terjadi ketika barang yang dibeli mengalami cacat pabrikasi tersembunyi (*latent defect*) atau salah kirim spesifikasi:

### Skenario Kanonikal Retur Pembelian:
* Dari 10 unit Komponen Utama Laptop Pro yang dibeli dari PT Sumber Teknologi, terdeteksi **1 unit mengalami cacat fungsi motherboard**.
* Tim gudang menerbitkan dokumen *Return to Vendor (RTV)*.
* Fisik 1 unit dikeluarkan dari gudang penyimpanan.
* **Dampak Finansial**:
  * Mengurangi saldo kuantitas persediaan di gudang sebesar 1 unit.
  * Mengurangi saldo nilai persediaan sebesar Rp700.000 (harga pokok perolehan DPP).
  * Bagian utang usaha menerbitkan [[04-purchasing/purchase-return-and-debit-note|Debit Note]] untuk memotong kewajiban utang ke PT Sumber Teknologi sebesar Rp777.000 (DPP + PPN efektif 11%).

---

## Perbedaan: Dokumen Koreksi vs. Reversal Pembatalan

Dalam sistem ERP, koreksi persediaan dilakukan melalui dua pendekatan arsitektur yang berbeda:

```mermaid
flowchart TD
        Rev["(1) Transaction Reversal (Storno / Reversal Entry)<br/>Digunakan saat terjadi kesalahan input murni beberapa menit setelah posting.<br/>Sistem membuat mutasi cermin dengan tanda berlawanan (-N)<br/>menetralkan transaksi asal secara matematis."]
        Ret["(2) Business Return (RMA / RTV Transaction)<br/>Digunakan untuk peristiwa bisnis nyata di mana barang fisik benar-benar berpindah kembali.<br/>Menciptakan nomor dokumen legal baru lengkap dengan alasan retur dan audit trail."]
```

> [!important]
> **Larangan Menghapus Transaksi Asal**: Baik melalui Reversal maupun Return, sistem ERP **dilarang menghapus baris transaksi lama (*no hard deletion*)**. Dokumen lama tetap tersimpan di database sebagai bukti audit, dan dokumen pembatalan/retur menautkan referensi ke nomor dokumen lama tersebut.

---

## ERP Implementation Comparison

| Aspek | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 SCM |
| :--- | :--- | :--- | :--- |
| **Alur Retur Penjualan** | Tombol *Return* pada dokumen *Delivery Order*: membangkitkan dokumen *Stock Picking* baru berarah masuk (*IN*) dari Customer Location ke Internal Location. | Checklist *Is Return* pada form `Delivery Note` atau `Purchase Receipt`: memungkinkan input kuantitas negatif terhadap dokumen asli. | Modul formal tingkat enterprise: **Return Order (RMA)** yang terintegrasi dengan *Disposition Codes* dan *Arrival Management*. |
| **Alur Retur Pembelian** | Tombol *Return* pada dokumen *Stock Receipt*: membangkitkan picking keluar (*OUT*) dari Gudang ke Vendor Location. | Form `Purchase Receipt` baru dengan memilih opsi *Return Against Purchase Receipt*. | Fitur formal **Purchase Return Order** yang membangkitkan instruksi picking pengembalian ke vendor. |
| **Manajemen Disposisi Mutu** | Memanfaatkan rute multi-langkah dan pemilihan lokasi tujuan (pilihan ke rak stok reguler atau scrap location). | Menggunakan kolom *Rejected Warehouse* pada baris penerimaan atau dokumen pemindahan bahan sisa. | Sangat komprehensif: Menggunakan *Disposition Code* terstruktur (Credit Only, Scrap, Replace, Return to Customer). |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-inventory|Design inventory]] (NAV-D-020).

---

## References

- IFRS Foundation. *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/. Diakses 24 November 2026.
- Microsoft Learn. *Work with quarantine orders*. https://learn.microsoft.com/en-us/dynamics365/supply-chain/inventory/quarantine-orders. Diakses 24 November 2026.
- Odoo 20.0 Documentation. *Returns and refunds*. https://www.odoo.com/documentation/20.0/applications/sales/sales/products_prices/returns.html. Diakses 24 November 2026.
