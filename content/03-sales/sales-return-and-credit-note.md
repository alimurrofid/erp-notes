---
title: Sales Return and Credit Note
---

# Sales Return and Credit Note

## Definition

Dalam sistem ERP, penanganan ketidaksesuaian transaksi purnajual dikelola melalui dua pilar yang saling melengkapi:

1. **Sales Return (Retur Penjualan)**: Proses logistik fisik untuk menerima kembali barang yang telah dikirimkan kepada pelanggan karena cacat produksi, kerusakan saat pengiriman, salah spesifikasi, atau pembatalan sepihak yang diizinkan.
2. **Credit Note / Credit Memo (Nota Kredit)**: Dokumen penyesuaian finansial resmi yang diterbitkan oleh penjual untuk mengurangi nilai piutang pelanggan atau memberikan hak pengembalian dana (*refund*) akibat pengembalian barang atau koreksi harga komersial.

Prinsip fundamental arsitektur ERP menetapkan:
> **Retur Fisik Barang (*Physical Goods Return*) $\neq$ Nota Kredit Finansial (*Financial Credit Note*).**
> Tidak semua retur fisik otomatis menghasilkan nota kredit (bisa diganti barang baru), dan tidak semua nota kredit melibatkan pengembalian barang fisik (misal: pemberian kompensasi diskon atas keterlambatan kirim).

---

## Business Purpose

Implementasi alur retur penjualan dan nota kredit bertujuan untuk:
1. **Tata Kelola Otorisasi Retur (*RMA Governance*)**: Mencegah penerimaan barang liar di gudang tanpa izin resmi melalui mekanisme *Return Merchandise Authorization (RMA)*.
2. **Karantina dan Inspeksi Kualitas (*Quality Inspection*)**: Memastikan barang retur diperiksa secara teknis sebelum diputuskan apakah layak dimasukkan kembali ke stok aktif (*restock*) atau harus dimusnahkan (*scrap*).
3. **Kepatuhan Faktur Pajak Pengurang**: Menerbitkan nota retur pajak resmi untuk membatalkan sebagian utang PPN Keluaran yang telah dilaporkan ke otoritas perpajakan.
4. **Penyesuaian Akurat Nilai Laba & HPP**: Mengoreksi nilai pendapatan bersih dan beban pokok penjualan (COGS) secara proporsional di buku besar umum.

---

## The RMA & Sales Return Lifecycle

```mermaid
flowchart TD
    Req["1. Customer Return Request<br/>(Keluhan barang rusak / salah kirim)"]
    --> RMA["2. RMA Approval<br/>(Penerbitan nomor otorisasi retur barang)"]
    --> Rec["3. Warehouse Return Receipt<br/>(Barang fisik tiba di dermaga penerimaan)"]
    --> Insp{"4. Quality Inspection<br/>(Kondisi Barang?)"}
    
    Insp -->|Kondisi Baik / Utuh| Restock["5a. Restock to Active Inventory<br/>(Masuk kembali ke stok jual gudang)"]
    Insp -->|Rusak Parah / Cacat Pabrik| Scrap["5b. Scrap / Quarantine<br/>(Pemusnahan atau klaim ke vendor asal)"]
    Insp -->|Ditolak (Bukan Kesalahan Penjual)| Reject["5c. Return Rejected<br/>(Barang dikirim balik ke pelanggan)"]

    Restock --> Settle{"6. Financial Settlement Decision"}
    Scrap --> Settle

    Settle -->|Terbitkan Nota Kredit| CN["7a. Credit Note<br/>(Memotong saldo piutang pelanggan)"]
    Settle -->|Kirim Barang Pengganti| Repl["7b. Replacement Delivery<br/>(Surat Jalan Pengganti tanpa biaya)"]
```

---

## Retur Fisik vs Penyesuaian Finansial (Matrix of Scenarios)

| Skenario Bisnis | Ada Pengembalian Fisik Barang? | Terbit Dokumen Credit Note? | Dampak Persediaan | Dampak Akuntansi Pendapatan & AR |
|---|:---:|:---:|---|---|
| **Retur Standar (Pengembalian Uang / Potong Tagihan)** | **Ya** | **Ya** | Stok bertambah (Restock) atau dicatat Scrap. | Pendapatan berkurang, PPN berkurang, Piutang berkurang. |
| **Penggantian Barang Rusak (*Replacement Only*)** | **Ya** | **Tidak** | Stok lama masuk karantina, stok baru keluar gudang. | Nilai piutang dan pendapatan tidak berubah. |
| **Koreksi Kesalahan Harga Faktur (*Price Dispute*)** | **Tidak** | **Ya** | **Nihil** (tidak ada barang bergerak). | Piutang berkurang sebesar selisih harga. |
| **Kompensasi Kerusakan Ringan (*Damage Allowance*)** | **Tidak** | **Ya** | **Nihil** (pelanggan tetap menyimpan barang). | Piutang berkurang sebagai potongan komersial. |

---

## Dampak Akuntansi & Jurnal (Accounting Impact)

Melanjutkan skenario transaksi acuan (penjualan 10 unit *Laptop Pro* @ Rp1.000.000, PPN 11%, COGS Rp700.000/unit):
* **Kasus**: Pelanggan mengembalikan **1 unit laptop** karena cacat layar, dan disetujui untuk diterbitkan Nota Kredit pemotong piutang.

### 1. Jurnal Finansial: Penerbitan Nota Kredit (*Credit Note Posting*)
Nota kredit membatalkan piutang dan pengakuan pendapatan komersial sebesar 1 unit:

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Retur & Potongan Penjualan (*Sales Returns*) | **Contra Revenue (P&L)** | 1.000.000 | - |
| Utang PPN Keluaran (*VAT Output Reversal*) | Liability (Neraca) | 110.000 | - |
| Piutang Usaha (*Accounts Receivable*) | Asset (AR Subledger) | - | 1.110.000 |

* **Catatan Penyajian Laporan Keuangan**:
  * Standar akuntansi merekomendasikan mendebit akun kontra-pendapatan `Retur Penjualan`, bukan langsung mendebit akun `Pendapatan Penjualan`, agar manajemen dapat menganalisis persentase retur terhadap penjualan kotor (*Return Rate*).
  * Saldo piutang PT Maju Bersama di subledger berkurang sebesar Rp1.110.000.

---

### 2. Jurnal Fisik Pergudangan: Penerimaan Barang Retur (*Stock Restock*)
Ketika 1 unit laptop tersebut diterima kembali di gudang dan dinilai masih layak diperbaiki/dijual kembali:

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Persediaan Barang Dagang (*Inventory Asset*) | Asset (Neraca) | 700.000 | - |
| Beban Pokok Penjualan (*COGS Reversal*) | Expense (P&L) | - | 700.000 |

* **Dampak**: Beban pokok penjualan (COGS) berkurang Rp700.000, dan nilai aset persediaan di neraca pulih kembali sebesar Rp700.000.

#### Variasi: Jika Barang Hancur dan Harus Dimusnahkan (*Scrap*):
Jika laptop rusak total dan tidak memiliki nilai residu:
* **Debit**: Beban Kerugian Barang Rusak / Pemusnahan (*Scrap Expense*) = Rp700.000
* **Kredit**: Beban Pokok Penjualan (*COGS Reversal*) = Rp700.000
*(Nilai persediaan tidak bertambah karena barang fisik langsung dibuang/dihapus).*

---

## Biaya Restok (*Restocking Fees*)

Pada beberapa industri B2B, penjual membebankan biaya penanganan (*Restocking Fee*) jika retur disebabkan oleh kesalahan pemesanan pihak pembeli (misal penalti 10% dari harga barang):
* Nilai Barang Diretur: Rp1.000.000
* Biaya Restok (10%): Rp100.000
* Nilai Bersih Nota Kredit yang Diberikan ke Pembeli: Rp900.000 + PPN disesuaikan.
* Biaya restok diakui penjual sebagai `Pendapatan Administrasi / Biaya Restok (Other Income)`.

---

## Related Concepts

* [[01-business-processes/order-to-cash|Order to Cash (O2C)]] — Siklus penanganan retur dan nota kredit.
* [[02-accounting/accounts-receivable|Accounts Receivable]] — Alokasi nota kredit untuk memotong faktur terbuka.
* [[02-accounting/tax-accounting|Tax Accounting]] — Nota retur faktur pajak masukan/keluaran.
* [[03-sales/delivery-and-shipping|Delivery and Shipping]] — Alur sebaliknya dari pengiriman barang fisik.

---

## References

1. **IFRS Foundation**: *IFRS 15 Revenue from Contracts with Customers - Sales with a Right of Return (Paragraphs B20-B27)*. URL: https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/
2. **Direktorat Jenderal Pajak (DJP) RI**: *Peraturan Tata Cara Penerbitan Nota Retur dan Pembatalan Faktur Pajak*.
3. **Microsoft Learn**: *Manage sales returns and credit notes in Dynamics 365 Supply Chain Management*. URL: https://learn.microsoft.com/en-us/dynamics365/supply-chain/sales-marketing/sales-returns
4. **Frappe / ERPNext Documentation**: *Sales Return, Credit Note, and Standalone Return Entries*. URL: https://docs.frappe.io/erpnext/user/manual/en/stock/sales-return
