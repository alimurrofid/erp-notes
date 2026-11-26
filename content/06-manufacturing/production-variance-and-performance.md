---
title: "Production Variance and Operational Performance"
tags:
  - manufacturing
  - production-variance
  - variance-analysis
  - performance-metrics
  - standard-costing
  - accounting
---

# Production Variance and Operational Performance

## Definition

**Production Variance and Operational Performance** adalah disiplin pengendalian manajerial dan akuntansi biaya dalam sistem ERP yang mengukur, menganalisis, dan melaporkan penyimpangan (*variances*) antara kinerja aktual di lantai pabrik dengan standar teknis yang telah ditetapkan sebelumnya—baik dalam dimensi moneter finansial (*Financial Variances*) maupun dimensi efisiensi operasional fisik (*Operational KPIs*).

Di dalam sistem ERP, varians bukan sekadar angka selisih di laporan akuntansi, melainkan **sinyal diagnosis dini (*early warning diagnostic*)** yang menunjukkan secara spesifik di departemen mana inefisiensi atau pemborosan terjadi: apakah bagian Pengadaan membeli material dengan harga terlalu mahal (*Price Variance*), operator pabrik bekerja terlalu lambat (*Efficiency Variance*), atau mesin membuang terlalu banyak material afkir (*Scrap Variance*).

---

## Perbedaan Fundamental: Variance Akuntansi vs. KPI Operasional

Sangat penting untuk tidak menyamakan varians akuntansi dengan indikator kinerja operasional:

> [!important]
> **Accounting Variance $\neq$ Operational KPI**:
> * **Production Variance (Varians Akuntansi Finansial)**: Deviasi moneter matematis yang dihitung saat penutupan pesanan produksi (*Order Close*) untuk keperluan pembukuan neraca dan laba rugi. Varians ini membukukan selisih saldo di akun Barang Dalam Proses (WIP) ke akun beban di buku besar (*General Ledger*).
> * **Operational KPI (Indikator Kinerja Lapangan)**: Metrik fisik non-moneter yang dipantau secara langsung oleh manajer pabrik (seperti *Yield %, Scrap Rate %, Downtime Hours, OEE %*) untuk mengevaluasi kedisiplinan dan produktivitas harian di lantai kerja.

---

## Taksonomi Varians Produksi (Manufacturing Variance Taxonomy)

Dalam sistem berbasis biaya standar (*Standard Costing System*), total varians produksi dipecah (*decomposed*) ke dalam pilar-pilar penyebab spesifik:

```mermaid
flowchart TD
    TotalVar["Total Manufacturing Variance (Selisih Biaya Total)"]
    
    TotalVar --> MatVar["(1) Varians Bahan Baku (Material Variances)"]
    TotalVar --> LabVar["(2) Varians Tenaga Kerja (Labor Variances)"]
    TotalVar --> OvhVar["(3) Varians Overhead Pabrik (Overhead Variances)"]
    TotalVar --> YieldVar["(4) Varians Hasil & Afkir (Yield & Scrap Variances)"]
    
    MatVar --> MPV["Material Price Variance (MPV)<br/>Selisih Harga Beli Bahan"]
    MatVar --> MUV["Material Usage Variance (MUV)<br/>Selisih Kuantitas Pemakaian"]
    
    LabVar --> LRV["Labor Rate Variance (LRV)<br/>Selisih Tarif Upah Per Jam"]
    LabVar --> LEV["Labor Efficiency Variance (LEV)<br/>Selisih Jam Kerja Nyata"]
    
    OvhVar --> OSEV["Overhead Spending Variance<br/>Selisih Pengeluaran Listrik/Beban"]
    OvhVar --> OVEV["Overhead Volume Variance<br/>Selisih Utilisasi Kapasitas Mesin"]
```

---

## Formula Matematis dan Analisis Komparasi Numerik

Untuk memahami bagaimana ERP menghitung setiap varians secara terisolasi, perhatikan skenario manufaktur Laptop Pro berikut:

### Data Standar vs Data Aktual (Batch 100 Unit Laptop Pro):
* **Bahan Baku (Sasis Laptop)**:
  * Standar: 100 set @ Rp500.000 = Rp50.000.000.
  * Aktual Pembelian: Dibeli 102 set seharga Rp520.000/set (Harga naik Rp20.000/set).
  * Aktual Pemakaian: Terpakai 102 set (Terjadi pemborosan 2 set sasis).
* **Tenaga Kerja Langsung (Lini Perakitan)**:
  * Standar: 100 jam @ Rp15.000/jam = Rp1.500.000 (1 jam per laptop).
  * Aktual Upah: Rata-rata upah operator Rp16.000/jam (karena ada porsi jam lembur).
  * Aktual Jam: Membutuhkan 110 jam kerja (pekerjaan memakan waktu 10 jam lebih lama).

---

### 1. Perhitungan Varians Bahan Baku (Material Variances)

#### A. Material Price Variance (MPV - Tanggung Jawab Bagian Purchasing):
Mengukur dampak finansial akibat perbedaan harga beli aktual terhadap harga standar:

$$\mathbf{\text{MPV} = (\text{Actual Price} - \text{Standard Price}) \times \text{Actual Quantity Purchased}}$$
$$\text{MPV} = (\text{Rp}520.000 - \text{Rp}500.000) \times 102 \text{ set} = +\text{Rp}20.000 \times 102 = \mathbf{+\text{Rp}2.040.000 \text{ (Unfavorable / Merugikan)}}$$

#### B. Material Usage Variance (MUV - Tanggung Jawab Bagian Pabrik):
Mengukur dampak finansial akibat pemborosan fisik material yang melebihi standar BOM:

$$\mathbf{\text{MUV} = (\text{Actual Quantity Used} - \text{Standard Quantity Allowed}) \times \text{Standard Price}}$$
$$\text{MUV} = (102 \text{ set} - 100 \text{ set}) \times \text{Rp}500.000 = +2 \text{ set} \times \text{Rp}500.000 = \mathbf{+\text{Rp}1.000.000 \text{ (Unfavorable / Merugikan)}}$$

---

### 2. Perhitungan Varians Tenaga Kerja (Labor Variances)

#### A. Labor Rate Variance (LRV - Tanggung Jawab HR / Kebijakan Lembur):
Mengukur selisih tarif upah aktual yang dibayarkan per jam:

$$\mathbf{\text{LRV} = (\text{Actual Rate} - \text{Standard Rate}) \times \text{Actual Hours Worked}}$$
$$\text{LRV} = (\text{Rp}16.000 - \text{Rp}15.000) \times 110 \text{ jam} = +\text{Rp}1.000 \times 110 = \mathbf{+\text{Rp}110.000 \text{ (Unfavorable / Merugikan)}}$$

#### B. Labor Efficiency Variance (LEV - Tanggung Jawab Supervisor Pabrik):
Mengukur dampak finansial dari operator yang bekerja lebih lambat dari waktu standar routing:

$$\mathbf{\text{LEV} = (\text{Actual Hours Worked} - \text{Standard Hours Allowed}) \times \text{Standard Rate}}$$
$$\text{LEV} = (110 \text{ jam} - 100 \text{ jam}) \times \text{Rp}15.000 = +10 \text{ jam} \times \text{Rp}15.000 = \mathbf{+\text{Rp}150.000 \text{ (Unfavorable / Merugikan)}}$$

---

### Ringkasan Rekonsiliasi Varians:

| Komponen Varians | Nilai (Rp) | Kategori Sifat | Penanggung Jawab Teridentifikasi |
| :--- | ---:| :---: | :--- |
| **Material Price Variance (MPV)** | 2.040.000 | Unfavorable (Rugi) | Departemen Pengadaan / Kenaikan Harga Vendor |
| **Material Usage Variance (MUV)** | 1.000.000 | Unfavorable (Rugi) | Operator Lantai Pabrik / Kerusakan Penanganan |
| **Labor Rate Variance (LRV)** | 110.000 | Unfavorable (Rugi) | HRD / Otorisasi Kebijakan Jam Lembur |
| **Labor Efficiency Variance (LEV)** | 150.000 | Unfavorable (Rugi) | Supervisor Produksi / Produktivitas Kerja Rendah |
| **Total Varians Bahan dan Tenaga Kerja** | **3.300.000** | **Unfavorable** | **Dibebankan ke Laporan Laba Rugi Periode Berjalan** |

> [!note] Varians overhead dihitung terpisah
> Tabel di atas hanya mencakup varians bahan dan tenaga kerja. Varians overhead (mis. *overhead spending variance* dan *overhead volume variance*) memerlukan data anggaran overhead tetap dan variabel serta jam standar; angka itu tidak ada dalam skenario ini sehingga tidak boleh disebut sebagai bagian dari total. Jika ingin satu angka "total varians produksi", tambahkan komponen overhead secara eksplisit lebih dulu.

---

## Indikator Kinerja Utama Manufaktur (Operational KPIs)

Di samping angka finansial, ERP memantau efisiensi pabrik melalui metrik fisik standar industri:

1. **Overall Equipment Effectiveness (OEE)**:
   Standar emas produktivitas mesin manufaktur:
   $$\mathbf{\text{OEE (\%)} = \text{Availability (\%)} \times \text{Performance (\%)} \times \text{Quality (\%)}}$$
   * *Availability*: Rasio jam operasi riil terhadap jam rencana kerja (mengukur dampak *Downtime*).
   * *Performance*: Rasio kecepatan produksi riil terhadap kecepatan desain ideal mesin.
   * *Quality*: Rasio unit lolos (*Good Units*) terhadap total unit yang diproduksi (mengukur dampak *Scrap*).
2. **Schedule Adherence (Kepatuhan Jadwal Produksi)**:
   Persentase pesanan produksi yang diselesaikan tepat pada tanggal jadwal yang ditentukan oleh MPS.
3. **First Pass Yield (FPY)**:
   Persentase produk yang berhasil dirakit dengan sempurna pada kali pertama tanpa memerlukan perbaikan (*rework*) sama sekali.

---

## ERP Implementation Comparison

| Aspek | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 SCM |
| :--- | :--- | :--- | :--- |
| **Analisis Varians Biaya** | Laporan varians terintegrasi pada modul akuntansi; selisih biaya tercatat otomatis pada akun *Price Difference* atau *Expense*. | Menampilkan tabel perbandingan *Expected Quantity vs Actual Quantity* pada form Work Order yang selesai. | Sangat komprehensif: Layar formal **Production Variances / Variance Breakdown** (memecah detail MPV, MUV, LRV, LEV, dan Overhead per batch). |
| **Pelacakan OEE Bawaan** | Tersedia widget native **OEE Analysis** pada Work Center (menampilkan metrik Availability, Performance, Quality, dan grafik pie alasan downtime). | Pelacakan efisiensi berbasis perbandingan *Expected Operating Time* vs *Actual Operating Time* pada Job Card. | Modul analitik terdedikasi: **Production Performance Power BI Content** yang menghitung metrik OEE, FPY, dan pemanfaatan mesin. |
| **Penutupan Varians ke GL** | Terjadi otomatis saat pesanan ditutup (*Produce All*) jika produk menggunakan metode Standard Price. | Melalui dokumen *Stock Entry* rekonsiliasi akhir atau penutupan pesanan produksi. | Menggunakan proses penutupan berkala formal: **Production Order Ending and Ledger Settlement** yang membukukan seluruh varians ke akun GL spesifik. |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-manufacturing|Design manufacturing]] (NAV-D-042).

---

## References

- Horngren, C. T., Datar, S. M., & Rajan, M. V. *Horngren's Cost Accounting: A Managerial Emphasis* (16th ed., 2017). Pearson. ISBN 978-0-13-447558-5.
- ASCM. *APICS Dictionary*. https://www.ascm.org/ascm-insights/apics-dictionary/ Diakses 26 November 2026.
- Nakajima, S. *Introduction to TPM* (1988). Productivity Press. ISBN 0-915299-23-2.
4. **Microsoft Learn** — *Production process overview* (Dynamics 365 Supply Chain Management). https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/production-process-overview — diakses 24 November 2026.
5. **ERPNext Documentation** — *Work Order*. https://docs.frappe.io/erpnext/work-order — diakses 24 November 2026.
6. **Odoo 20.0 Documentation** — *Manufacturing*. https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing.html — diakses 24 November 2026.
