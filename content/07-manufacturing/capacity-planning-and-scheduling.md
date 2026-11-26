---
title: "Capacity Planning and Production Scheduling"
tags:
  - manufacturing
  - capacity-planning
  - scheduling
  - finite-capacity
  - infinite-capacity
  - bottleneck
  - crp
---

# Capacity Planning and Production Scheduling

## Definition

**Capacity Planning and Production Scheduling** adalah domain analitis dan operasional dalam ERP yang mengukur, membandingkan, dan mengalokasikan beban kerja manufaktur terhadap ketersediaan sumber daya fisik pabrik—memastikan bahwa pesanan produksi dijadwalkan secara realistis dengan mempertimbangkan batas daya tampung mesin (*machine capacity*), ketersediaan jam kerja operator (*labor capacity*), jam giliran kerja (*shifts*), serta hari aktif kalender pabrik.

Jika [[07-manufacturing/mrp-material-requirement-planning|MRP]] berfokus pada **pembatasan material (*Material Constraints*)** untuk menjawab pertanyaan *"Apakah bahan baku tersedia?"*, maka Capacity Planning berfokus pada **pembatasan daya muat sumber daya (*Capacity Constraints*)** untuk menjawab pertanyaan **"Apakah mesin dan tenaga kerja memiliki waktu luang untuk mengerjakannya?"**.

---

## Tiga Dimensi Kendala Manufaktur (Manufacturing Constraints)

Sistem perencanaan manufaktur yang tangguh menyeimbangkan tiga pilar pembatas yang saling mengunci:

```mermaid
flowchart TD
        MC["(1) Material Constraints (Kendala Bahan Baku)<br/>Apakah komponen sudah tiba di gudang?<br/>Dikelola oleh algoritma MRP."]
        CC["(2) Capacity Constraints (Kendala Kapasitas Mesin & Tenaga Kerja)<br/>Apakah stasiun kerja mengalami kelebihan beban (overloaded)?<br/>Dikelola oleh algoritma CRP / Finite Scheduling."]
        SC["(3) Scheduling Constraints (Kendala Urutan & Waktu Pengiriman)<br/>Kapan tanggal janji serah terima ke pelanggan (Due Date)?<br/>Apakah operasi 20 harus menunggu operasi 10 selesai?"]
    MC <--> CC
    CC <--> SC
    SC <--> MC
```

---

## Spektrum Perencanaan Kapasitas: Dari Jangka Panjang ke Detail

Dalam arsitektur ERP enterprise, perencanaan kapasitas dianalisis pada tiga tingkatan:

| Tingkatan Kapasitas | Pasangan Perencanaan | Horizon Waktu | Sumber Daya yang Dianalisis |
| :--- | :--- | :--- | :--- |
| **Resource Requirements Planning (RRP)** | Sales & Operations Planning (S&OP) | Jangka Panjang (1–3 Tahun) | Fasilitas agregat: luas lantai pabrik, kebutuhan penambahan lini pabrik baru, investasi modal mesin. |
| **Rough-Cut Capacity Planning (RCCP)** | Master Production Schedule (MPS) | Jangka Menengah (1–6 Bulan) | Stasiun kerja kritis dan titik leher botol (*Bottleneck Work Centers*) untuk memastikan MPS dapat dieksekusi. |
| **Capacity Requirements Planning (CRP)** | Material Requirements Planning (MRP) | Jangka Pendek (1–8 Minggu) | Seluruh stasiun kerja individual, jam mesin, dan jam tenaga kerja per rute operasi (*Detailed Operation Level*). |

---

## Model Penjadwalan: Finite vs. Infinite Capacity Scheduling

Salah satu perbedaan arsitektur paling fundamental dalam sistem ERP adalah bagaimana mesin penjadwal memperlakukan batas kapasitas mesin:

```mermaid
flowchart LR
    subgraph Infinite["(1) Infinite Capacity Scheduling (Kapasitas Tak Terbatas)"]
        direction TB
        I1["Jadwalkan pesanan berdasarkan tanggal kebutuhan (Due Date) semata."]
        --> I2["Abaikan batas jam kerja harian mesin."]
        --> I3["Tampilkan grafik beban: Identifikasi periode Overload (Merah)."]
        --> I4["Planner manusia menyesuaikan jadwal secara manual."]
    end

    subgraph Finite["(2) Finite Capacity Scheduling (Kapasitas Terbatas)"]
        direction TB
        F1["Jadwalkan pesanan dengan batas maksimum jam kerja mesin (misal: 16 jam/hari)."]
        --> F2["Jika mesin penuh, pesanan otomatis digeser ke slot waktu berikutnya."]
        --> F3["Tidak akan pernah terjadi Overload pada sistem."]
        --> F4["Hasil: Jadwal realistis, namun tanggal selesai produk dapat mundur."]
    end
```

### Kapan Menggunakan Masing-Masing Metode?
* **Infinite Scheduling**: Sangat berguna pada tahap perencanaan awal (*Early Planning*). Metode ini memperlihatkan lonjakan kebutuhan kapasitas secara visual, memberi tahu manajemen kapan pabrik harus membuka lembur (*overtime*), menyewa pekerja kontrak, atau mengalihkan pekerjaan ke pihak luar (*subcontracting*).
* **Finite Scheduling**: Wajib digunakan pada tingkat eksekusi lantai pabrik harian (*Shop Floor Dispatching*). Mesin tidak dapat memproses dua pekerjaan sekaligus; finite scheduling memastikan antrean kerja di depan mesin sesuai dengan hukum fisika nyata.

---

## Strategi Penjadwalan Arah Waktu: Forward vs. Backward Scheduling

Sistem ERP menyediakan dua arah perhitungan penanggalan:

```mermaid
flowchart TD
    subgraph Forward["(1) Forward Scheduling (Penjadwalan Maju / Earliest Possible)"]
        F_Start["Mulai pada tanggal paling awal yang memungkinkan (Hari Ini)"]
        --> F_Op1["Operasi 10: Setup & Run"]
        --> F_Op2["Operasi 20: Assembly"]
        --> F_Op3["Operasi 30: QC & Pack"]
        --> F_End["Dihasilkan: Tanggal Penyelesaian Paling Awal (Earliest Completion Date)"]
    end

    subgraph Backward["(2) Backward Scheduling (Penjadwalan Mundur / Just-in-Time)"]
        B_Due["Mulai dari Tanggal Janji Kirim Pelanggan (Due Date: Hari ke-30)"]
        --> B_Op3["Mundur durasi Operasi 30"]
        --> B_Op2["Mundur durasi Operasi 20"]
        --> B_Op1["Mundur durasi Operasi 10"]
        --> B_Start["Dihasilkan: Batas Akhir Produksi Wajib Dimulai (Latest Start Date)"]
    end
```

### Karakteristik Masing-Masing Pendekatan:
* **Backward Scheduling (Default ERP / JIT Principle)**:
  * Menghitung mundur dari tanggal janji kirim pelanggan (*Promised Delivery Date*).
  * *Tujuan*: Meminimalkan waktu penumpukan barang jadi di gudang. Barang selesai tepat saat truk kurir tiba untuk menjemput (*Just-in-Time*).
  * *Kelemahan*: Sangat rentan terhadap keterlambatan jika terjadi kerusakan mesin mendadak, karena tidak menyisakan ruang jeda (*buffer time*).
* **Forward Scheduling**:
  * Menghitung maju dari tanggal saat ini atau tanggal bahan baku tersedia.
  * *Tujuan*: Mengetahui seberapa cepat pesanan darurat dapat diselesaikan (*Rush Order / Lead Time Quoting*).
  * *Kelemahan*: Barang jadi dapat selesai terlalu awal dan menumpuk di gudang, membebani modal kerja.

---

## Teori Kendala dan Manajemen Titik Macet (Theory of Constraints & Bottlenecks)

Berdasarkan prinsip **Theory of Constraints (TOC)**:

> [!important]
> **The Bottleneck Principle**:
> *Kapasitas keseluruhan pabrik ditentukan oleh stasiun kerja yang memiliki kapasitas paling rendah (*Bottleneck Work Center*).*
> 
> Mengoptimalkan stasiun kerja non-bottleneck hanya akan menghasilkan tumpukan barang setengah jadi (WIP) yang menggunung di depan stasiun bottleneck, tanpa menambah jumlah barang jadi yang keluar dari pabrik.

### Strategi Pengendalian Bottleneck dalam ERP:
1. **Drum-Buffer-Rope (DBR)**:
   * **Drum (Genderang)**: Jadwal stasiun kerja bottleneck menjadi penentu kecepatan seluruh pabrik.
   * **Buffer (Penyangga)**: Ditempatkan persediaan penyangga (*Time/Material Buffer*) tepat di depan stasiun bottleneck agar mesin tersebut tidak pernah berhenti beroperasi karena kehabisan bahan.
   * **Rope (Tali)**: Pelepasan bahan baku dari gudang diatur kecepatannya agar tepat sama dengan laju konsumsi stasiun bottleneck.

---

## ERP Implementation Comparison

| Aspek | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 SCM |
| :--- | :--- | :--- | :--- |
| **Model Penjadwalan** | Menjadwalkan work order berdasarkan durasi operasi, kalender kerja, kapasitas, dan efisiensi Work Center; visualisasi beban via **Planning by Workcenter** (Gantt) dengan drag-and-drop. | Penjadwalan kapasitas sederhana pada Workstation; fitur penyesuaian jam kerja dan kalender hari libur. | Sangat komprehensif: Menggunakan mesin **Scheduling Engine** dengan opsi *Job Scheduling* (detail menit) dan *Operation Scheduling* (agregat hari). |
| **Dukungan Finite vs Infinite** | Penjadwalan standar bersifat *infinite capacity*: work order ditempatkan pada slot kalender Work Center, tetapi antrean tidak diurutkan ulang dan kelebihan beban hanya terlihat sebagai overload di tampilan Planning. Penjadwalan finite yang benar-benar meratakan beban memerlukan modul pihak ketiga atau kustomisasi. | Default mengasumsikan kapasitas tidak terbatas kecuali opsi pemeriksaan beban diaktifkan pada modul kustom. | Parameter formal: Pilihan checklist *Finite capacity* dan *Finite material* yang dapat diaktifkan per resource atau group. |
| **Optimasi Penjadwalan Visual** | Fitur *Planning App* terintegrasi dengan penugasan operator dan stasiun kerja berbasis kalender interaktif. | Visualisasi sederhana jadwal produksi melalui tampilan *Gantt View* pada daftar Work Order. | Fitur tingkat industri: **Gantt Chart for Operations / Job Scheduling** dengan kapabilitas simulasi penjadwalan ulang dinamis. |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-manufacturing|Design manufacturing]] (NAV-D-029).

---

## References

- ASCM. *APICS Dictionary*. https://www.ascm.org/ascm-insights/apics-dictionary/ Diakses 26 November 2026.
- Goldratt, E. M., & Cox, J. *The Goal* (3rd ed., 2004). North River Press. ISBN 978-0-88427-178-9.
- Vollmann, T. E., Berry, W. L., Whybark, D. C., & Jacobs, F. R. *Manufacturing Planning and Control for Supply Chain Management* (5th ed., 2005). McGraw-Hill. ISBN 0-07-144033-X.
1. **Microsoft Learn** — *Production process overview* (Dynamics 365 Supply Chain Management). https://learn.microsoft.com/en-us/dynamics365/supply-chain/production-control/production-process-overview — diakses 24 November 2026.
2. **ERPNext Documentation** — *Workstation*. https://docs.frappe.io/erpnext/workstation — diakses 24 November 2026.
3. **Odoo 20.0 Documentation** — *Manufacturing*. https://www.odoo.com/documentation/20.0/applications/inventory_and_mrp/manufacturing.html — diakses 24 November 2026.
