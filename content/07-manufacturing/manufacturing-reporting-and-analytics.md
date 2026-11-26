---
title: "Manufacturing Reporting and Operational Analytics"
tags:
  - manufacturing
  - reporting
  - analytics
  - kpi
  - oee
  - yield
  - dashboard
---

# Manufacturing Reporting and Operational Analytics

## Definition

**Manufacturing Reporting and Operational Analytics** adalah kumpulan laporan kinerja, dasbor intelijen bisnis (*Business Intelligence Dashboards*), dan metrik operasional terstruktur dalam ERP yang menyediakan visibilitas menyeluruh terhadap efisiensi lini produksi—mulai dari kepatuhan rencana terhadap realitas (*Plan vs. Actual*), tingkat hasil bersih (*Yield*), rasio afkir (*Scrap Rate*), pemanfaatan kapasitas mesin (*Capacity Utilization*), waktu henti (*Downtime*), saldo modal kerja di lantai kerja (*WIP*), hingga analisis varians biaya perakitan.

Data manufaktur dalam arsitektur ERP bertindak sebagai **Sumber Kebenaran Tunggal (*Single Source of Truth / SSOT*)** yang menyatukan laporan fisik dari mandor lapangan dengan laporan akuntansi biaya dari controller keuangan.

---

## Taksonomi Metrik Manufaktur (Manufacturing KPI Taxonomy)

Sistem ERP membagi analitik manufaktur ke dalam empat domain utama yang saling melengkapi:

```mermaid
flowchart TD
    subgraph Analytics["Kerangka Kerja Analitik Manufaktur Terpadu"]
        direction TB
        subgraph Ops["(1) Operational & Efficiency Metrics (Efisiensi Fisik Pabrik)"]
            M1["Overall Equipment Effectiveness (OEE)"]
            M2["Machine Downtime by Cause Category"]
            M3["Production Cycle Time & Throughput Rate"]
        end
        
        subgraph Plan["(2) Planning & Schedule Metrics (Kepatuhan Perencanaan)"]
            M4["Schedule Adherence (Plan vs. Actual)"]
            M5["Manufacturing Lead Time Adherence"]
            M6["Order On-Time In-Full Completion (OTIF)"]
        end
        
        subgraph Qual["(3) Quality & Yield Metrics (Integritas Mutu Teknis)"]
            M7["First Pass Yield (FPY)"]
            M8["Scrap Rate % by Product / Work Center"]
            M9["Rework Frequency & Defect Distribution (Pareto)"]
        end
        
        subgraph Fin["(4) Financial & Cost Metrics (Finansial & Biaya Pokok)"]
            M10["Cost per Unit (Standard vs. Actual)"]
            M11["Work in Process (WIP) Balance Valuation"]
            M12["Manufacturing Variances (MPV, MUV, LEV, Ovh)"]
        end
    end
```

---

## Definisi dan Formula Metrik Kunci Manufaktur

Sebelum angka dihitung dalam dasbor analitik, setiap metrik harus didefinisikan secara konseptual:

### 1. Planning & Schedule Adherence (Kepatuhan Jadwal)
* **Definisi**: Mengukur seberapa disiplin lini produksi memenuhi target kuantitas dan tanggal jatuh tempo yang ditetapkan oleh [[07-manufacturing/production-planning|Master Production Schedule (MPS)]].
* **Formula**:
  $$\mathbf{\text{Schedule Adherence (\%)} = \frac{\text{Actual Units Produced within Schedule}}{\text{Planned Units in Schedule}} \times 100\%}$$

---

### 2. Overall Equipment Effectiveness (OEE)
* **Definisi**: Metrik standar global untuk mengukur efektivitas menyeluruh suatu mesin atau stasiun kerja dengan memperhitungkan tiga faktor kerugian utama: waktu berhenti (*Availability*), penurunan kecepatan (*Performance*), dan barang cacat (*Quality*).
* **Formula**:
  $$\mathbf{\text{OEE (\%)} = \text{Availability} \times \text{Performance} \times \text{Quality}}$$
  * Di mana:
    $$\text{Availability} = \frac{\text{Operating Time}}{\text{Planned Production Time}} = \frac{\text{Planned Time} - \text{Downtime}}{\text{Planned Time}}$$
    $$\text{Performance} = \frac{\text{Total Units Produced} \times \text{Ideal Cycle Time}}{\text{Operating Time}}$$
    $$\text{Quality} = \frac{\text{Good Units Produced}}{\text{Total Units Produced}}$$

#### Contoh Kasus Perhitungan OEE:
* Mesin SMT dijadwalkan bekerja 8 jam (480 menit).
* Mengalami downtime perbaikan 48 menit $\implies \text{Operating Time} = 432 \text{ menit} \implies \text{Availability} = \frac{432}{480} = \mathbf{90\%}$.
* Selama 432 menit, mesin memproduksi 400 unit board (kecepatan ideal = 1 menit/unit) $\implies \text{Performance} = \frac{400 \times 1}{432} = \mathbf{92,59\%}$.
* Dari 400 unit, 388 unit lolos uji QC, 12 unit afkir $\implies \text{Quality} = \frac{388}{400} = \mathbf{97\%}$.
$$\mathbf{\text{OEE Mesin SMT}} = 0,90 \times 0,9259 \times 0,97 = \mathbf{80,83\%}$$

---

### 3. First Pass Yield (FPY) dan Scrap Rate
* **Definisi First Pass Yield**: Proporsi unit yang berhasil dirakit dengan sempurna pada percobaan pertama tanpa pernah disentuh oleh proses perbaikan (*rework*).
* **Formula**:
  $$\mathbf{\text{FPY (\%)} = \frac{\text{Units Entering Process} - \text{Scrapped Units} - \text{Reworked Units}}{\text{Units Entering Process}} \times 100\%}$$
* **Definisi Scrap Rate**: Persentase material atau unit yang rusak permanen dan harus dibuang ke tempat pemusnahan limbah.
  $$\mathbf{\text{Scrap Rate (\%)} = \frac{\text{Scrapped Quantity}}{\text{Total Input Quantity}} \times 100\%}$$

---

### 4. Work in Process (WIP) Turnover & Aging
* **Definisi**: Mengukur seberapa cepat modal kerja yang tertanam di lantai pabrik berputar menjadi barang jadi yang siap dijual.
* **Formula**:
  $$\mathbf{\text{WIP Days}} = \frac{\text{Rata-rata Saldo Akun WIP di Neraca}}{\text{Beban Pokok Penjualan (COGS)}} \times 365 \text{ hari}$$
  *WIP Days yang terlalu tinggi mengindikasikan banyaknya antrean pekerjaan yang mangkrak di lorong stasiun kerja.*

---

## Tingkatan Dasbor Manufaktur (Dashboard Hierarchy)

Sistem ERP modern menyajikan visualisasi analitik ke dalam dua tingkatan pengguna yang berbeda:

```mermaid
flowchart LR
    subgraph Tactical["Dasbor Taktis / Lapangan (Mandor & Operator Lantai Pabrik)"]
        T1["Target Shift vs Output Riil Jam Ini"]
        T2["Status Mesin Real-Time (Running, Idle, Breakdown)"]
        T3["Peringatan Defisit Bahan Baku di Stasiun Kerja"]
        T4["Daftar Antrean Pekerjaan Terkini (Dispatch List)"]
    end
    
    subgraph Strategic["Dasbor Strategis / Eksekutif (Manajer Pabrik & Direktur Operasi)"]
        S1["Tren OEE Bulanan Seluruh Pabrik"]
        S2["Analisis Varians Biaya Manufaktur (MUV & LEV)"]
        S3["Tingkat Kepatuhan Jadwal Rencana (MPS Adherence)"]
        S4["Total Nilai Saldo Modal Kerja WIP per Lini Produksi"]
    end
```

---

## ERP Implementation Comparison

| Aspek | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 SCM |
| :--- | :--- | :--- | :--- |
| **Pelaporan Bawaan** | Tampilan *Pivot View* dan *Graph View* di modul Manufacturing (filter per produk, stasiun kerja, dan status); modul *OEE Analysis*. | Laporan bawaan komprehensif: *Work Order Summary*, *Production Analytics*, *Downtime Analysis*, dan *BOM Costing Report*. | Sangat komprehensif: Terintegrasi native dengan **Power BI** (*Production Performance and Cost Analysis Content Pack*). |
| **Analisis Bottleneck** | Analisis waktu tunggu pada Gantt View modul Planning dan grafik beban Work Center. | Membandingkan jam kapasitas pada laporan *Workstation Capacity Utilization*. | Fitur tingkat industri: **Gantt Chart Resource Loading** dan visualisasi beban kerja dengan penanda stasiun leher botol (*Bottleneck indicators*). |
| **Pelaporan Varians Biaya** | Selisih biaya ditampilkan pada tab *Cost Analysis* di setiap formulir pesanan produksi yang selesai. | Menampilkan tabel komparasi biaya bahan standar vs aktual pada laporan *Work Order Cost Analysis*. | Dasbor analitik formal: **Variance Analysis Breakdown** dengan kapabilitas drill-down langsung hingga ke baris jurnal GL terkait. |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-manufacturing|Design manufacturing]] (NAV-D-033).

---

## References

- ASCM. *APICS Dictionary*. https://www.ascm.org/ascm-insights/apics-dictionary/ Diakses 26 November 2026.
- Nakajima, S. *Introduction to TPM* (1988). Productivity Press. ISBN 0-915299-23-2.
1. **Microsoft Learn** — *Production process overview* (Dynamics 365 Supply Chain Management). https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/production-process-overview — diakses 24 November 2026.
2. **ERPNext Documentation** — *Manufacturing*. https://docs.frappe.io/erpnext/manufacturing — diakses 24 November 2026.
3. **Odoo 20.0 Documentation** — *Manufacturing*. https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing.html — diakses 24 November 2026.
