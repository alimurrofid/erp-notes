---
title: "Production Output, Co-Products, and By-Products"
tags:
  - manufacturing
  - production-output
  - co-products
  - by-products
  - scrap
  - yield
  - costing
---

# Production Output, Co-Products, and By-Products

## Definition

**Production Output, Co-Products, and By-Products** adalah kerangka kerja dalam sistem ERP yang mengelola dan mencatat seluruh hasil fisik yang keluar dari proses manufaktur—mulai dari barang jadi utama (*Primary Finished Goods*), produk bersama bernilai setara (*Co-Products*), produk sampingan bernilai rendah (*By-Products*), hingga limbah pembuangan dan barang afkir (*Scrap & Waste*).

Dalam dunia nyata, proses manufaktur jarang sekali menghasilkan 100% barang jadi sempurna tanpa sisa. Proses pemotongan pelat baja menghasilkan sisa potongan besi (*metal scrap*), pemurnian minyak mentah menghasilkan bensin, solar, dan aspal secara simultan, serta perakitan elektronik menghasilkan unit afkir yang gagal uji kendali mutu (*defective rejects*). Sistem ERP wajib memodelkan seluruh spektrum output ini secara akurat untuk memastikan pencatatan persediaan fisik yang presisi dan alokasi biaya pokok produksi yang adil.

---

## Spektrum Hasil Keluaran Manufaktur (Manufacturing Output Spectrum)

Hubungan antara bahan baku masukan (*input*) dengan variasi keluaran (*outputs*) dimodelkan sebagai berikut:

```mermaid
flowchart TD
    Input["Bahan Baku Masukan (Raw Materials & Conversion Cost)<br/>Total Nilai: Rp10.000.000"]
    --> Process["Proses Konversi Manufaktur (Shop Floor Process)"]
    
    Process --> MainOut["(1) Primary Finished Good (Produk Utama)<br/>Tujuan komersial utama pembuatan pesanan (Contoh: Laptop Pro)"]
    Process --> CoProd["(2) Co-Products (Produk Bersama)<br/>Produk sampingan bernilai tinggi yang dihasilkan simultan"]
    Process --> ByProd["(3) By-Products (Produk Sampingan)<br/>Keluaran residu bernilai komersial minor (Contoh: Potongan Logam)"]
    Process --> Scrap["(4) Scrap / Waste (Afkir & Limbah)<br/>Material cacat tanpa nilai ekonomis wajar (Contoh: Serbuk Gergaji)"]
```

---

## Karakteristik dan Perlakuan Akuntansi Setiap Tipe Keluaran

Sistem ERP membedakan perlakuan persediaan dan akuntansi biaya berdasarkan kategori output:

| Tipe Keluaran | Karakteristik Komersial | Perlakuan Mutasi Persediaan Gudang | Metode Alokasi Biaya Produksi (Costing Treatment) |
| :--- | :--- | :--- | :--- |
| **Primary Output** | Produk utama yang ditargetkan dalam pesanan penjualan (*Sales Order*). | Menambah saldo persediaan barang jadi di gudang (*Finished Goods Warehouse*). | Menyerap porsi biaya terbesar dari total akumulasi biaya di akun WIP. |
| **Co-Product** | Produk yang keluar bersamaan dan memiliki nilai komersial substansial yang sebanding dengan produk utama. | Diberi kode SKU mandiri; menambah stok barang jadi sebagai entitas persediaan resmi. | **Joint Cost Allocation**: Biaya dibagi proporsional menggunakan metode nilai jual relatif (*Relative Sales Value*) atau bobot fisik (*Physical Measure*). |
| **By-Product** | Residu atau hasil turunan tak terhindarkan yang bernilai komersial rendah (dapat dijual sebagai barang bekas/limbah). | Dilacak kuantitas fisiknya di gudang penampungan barang sisa (*Scrap Yard*). | **Net Realizable Value (NRV) Credit**: Estimasi nilai pasar bersih by-product **dikreditkan sebagai pengurang biaya produk utama** di akun WIP. |
| **Scrap / Reject** | Komponen cacat, pecah, atau potongan kecil yang tidak dapat digunakan kembali dan tidak memiliki nilai jual material. | Dikeluarkan dari pesanan produksi; dipindahkan ke lokasi afkir (*Scrap Location*). | Nilai biaya bahan yang hangus **tetap terserap di dalam biaya produk utama yang berhasil lolos** (menaikkan biaya per unit produk jadi). |

---

## Metrik Efisiensi Produksi: Yield vs. Scrap Rate

Dalam mengevaluasi keandalan proses manufaktur, ERP menghitung indikator hasil secara matematis:

### 1. Production Yield (Rasio Keberhasilan Produksi)
Persentase **input** yang berhasil diubah menjadi produk jadi yang memenuhi standar kualitas:

$$\mathbf{\text{Yield (\%)} = \frac{\text{Good Output}}{\text{Total Input}} \times 100\%}$$

* *Contoh*: 100 unit bahan dimasukkan ke lini perakitan. Di akhir lini, 96 unit dinyatakan lolos uji QC dan 4 unit cacat permanen (*scrap*).
$$\text{Yield} = \frac{96}{100} \times 100\% = \mathbf{96\%}$$

> [!note] Mengapa pembaginya input, bukan *planned output*
> *Yield* dan *scrap rate* harus memakai basis yang sama agar saling melengkapi: `yield + scrap rate = 100%`. Jika pembaginya *planned output* sementara pembilang scrap memakai input, kedua angka tidak dapat dijumlahkan. *Planned output* hanya sama dengan input bila BOM 1:1; untuk BOM dengan rasio berbeda, konversi dulu ke kuantitas input.

### 2. Scrap Rate (Tingkat Kehilangan / Afkir)
Persentase material yang terbuang selama proses pengerjaan:

$$\mathbf{\text{Scrap Rate (\%)} = \frac{\text{Scrapped Quantity}}{\text{Total Input Quantity}} \times 100\%} = \frac{4}{100} \times 100\% = \mathbf{4\%}$$

---

## Mekanisme Alokasi Biaya: Co-Products vs. By-Products

Untuk memahami dampak finansialnya di buku besar akuntansi, perhatikan perbandingan dua skenario manufaktur berikut:

### Skenario A: Perlakuan By-Product (Pengurang Biaya Pokok)
* **Kasus**: Pemotongan pelat casing laptop menghasilkan 100 unit sasis laptop utama dan 50 Kg potongan sisa aluminium (*by-product*).
* Total biaya produksi yang terakumulasi di akun WIP = **Rp10.000.000**.
* Potongan sisa aluminium dapat dijual ke pengepul daur ulang seharga Rp10.000/Kg (Total nilai realisasi = **Rp500.000**).
* **Perlakuan Finansial**:
  * Nilai by-product mengurangi beban biaya produk utama:
    $$\text{Beban Bersih Sasis Utama} = \text{Rp}10.000.000 - \text{Rp}500.000 = \mathbf{\text{Rp}9.500.000}$$
    $$\text{Biaya Pokok per Unit Sasis} = \frac{\text{Rp}9.500.000}{100 \text{ unit}} = \mathbf{\text{Rp}95.000/\text{unit}}$$
* **Jurnal Finansial Penerimaan Hasil (Perpetual)**:
  * *(Dr)* Persediaan Barang Jadi (Sasis Laptop): **Rp9.500.000**
  * *(Dr)* Persediaan Produk Sampingan (Aluminium Scrap): **Rp500.000**
  * *(Cr)* Persediaan Barang Dalam Proses (*WIP*): **Rp10.000.000**

---

### Skenario B: Perlakuan Scrap Normal vs. Abnormal (IAS 2)
Standar akuntansi internasional **IAS 2 (*Inventories*) Paragraf 16** membedakan secara tegas antara penyusutan wajar (*normal scrap*) dan pemborosan di luar batas wajar (*abnormal waste*):

```mermaid
flowchart TD
    ScrapEvent["Terjadi Afkir Material / Scrap di Lantai Pabrik"]
    --> CheckNorm{Apakah Masih Dalam<br/>Batas Toleransi BOM?}
    
    CheckNorm -- "Ya (Normal Scrap, Misal: 2%)" --> Absorb["Dikapitalisasi ke Biaya Barang Jadi:<br/>Biaya scrap diserap oleh unit yang selamat.<br/>Harga pokok per unit barang jadi naik wajar."]
    
    CheckNorm -- "Tidak (Abnormal Waste, Misal: Banjir/Kelalaian)" --> DirectExpense["DILARANG Masuk Persediaan!<br/>Wajib langsung dibebankan ke Laporan Laba Rugi:<br/>(Dr) Beban Kerusakan Abnormal (P&L)<br/>(Cr) Barang Dalam Proses (WIP)"]
```

---

## ERP Implementation Comparison

| Aspek | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 SCM |
| :--- | :--- | :--- | :--- |
| **Konfigurasi By-Products** | Tab khusus *By-products* pada formulir BOM: mendefinisikan produk turunan, kuantitas per unit, dan lokasi penyimpanan target. | Tabel anak *Scrap Item* pada dokumen BOM atau penerbitan dokumen *Stock Entry* bertipe scrap. | Konfigurasi formal pada formulir *Formula / BOM*: tab **Co-products and By-products** dengan metode alokasi biaya. |
| **Metode Alokasi Biaya Bersama** | Nilai biaya dialokasikan berdasarkan persentase biaya (*Cost Share %*) yang dikonfigurasi pada baris by-product. | Nilai scrap dialokasikan sebagai pengurang biaya produksi dasar secara otomatis. | Sangat komprehensif: Mendukung metode alokasi joint-cost tingkat lanjut (*TCA - Total Cost Allocation*, *Relative Sales Value*, *Physical Quantity*). |
| **Pencatatan Scrap di Shop Floor** | Tombol khusus *Scrap* pada antarmuka *Work Order* lantai kerja yang memindahkan barang ke lokasi afkir sistemik. | Tombol *Scrap Item* pada Work Order yang memotong saldo material dari proses manufaktur. | Tidak ada tipe jurnal *Scrap Journal*. Afkir dicatat sebagai **inventory adjustment** (dengan kode alasan) atau sebagai *scrap* pada order produksi; pelaporan afkir juga tersedia pada kartu rute (*Route Card*). |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-manufacturing|Design manufacturing]] (NAV-D-039).

---

## References

1. **IFRS Foundation** — *IAS 2 Inventories* (paragraf 14: alokasi biaya produk bersama dan sampingan). https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 24 November 2026.
- ASCM. *APICS Dictionary*. https://www.ascm.org/ascm-insights/apics-dictionary/ Diakses 26 November 2026.
3. **Microsoft Learn** — *Production process overview* (Dynamics 365 Supply Chain Management). https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/production-process-overview — diakses 24 November 2026.
4. **ERPNext Documentation** — *Manufacturing*. https://docs.frappe.io/erpnext/manufacturing — diakses 24 November 2026.
5. **Odoo 20.0 Documentation** — *Manufacturing*. https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing.html — diakses 24 November 2026.
