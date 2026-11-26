---
title: "Finance Master Data Architecture"
tags:
  - finance
  - master-data
  - bank-master
  - currency
  - financial-dimensions
  - fiscal-calendar
---

# Finance Master Data Architecture

## Definition

**Finance Master Data Architecture** adalah kumpulan data induk terpusat dan berumur panjang (*long-lived reference data*) dalam sistem ERP yang mendefinisikan entitas legal, institusi perbankan, rekening kas, mata uang, kalender fiskal, struktur anggaran, dan dimensi analitik yang digunakan untuk mencatat, mengontrol, dan melaporkan seluruh aktivitas perbendaharaan dan keuangan perusahaan.

Sebagaimana telah ditekankan pada [[00-fundamentals/master-data-vs-transaction-data|Phase 1 — Master Data vs Transaction Data]], master data finansial bertindak sebagai **fondasi referensi statis tunggal (*Single Source of Truth*)**. Kesalahan konfigurasi pada data induk keuangan (seperti kesalahan kode bank, pembagian periode fiskal yang salah, atau pemetaan dimensi biaya yang tidak lengkap) akan merusak validitas seluruh laporan manajerial dan kepatuhan perpajakan.

---

## Pemisahan Tiga Lapisan Data Finansial

Sistem ERP enterprise membedakan secara tegas antara konfigurasi sistem, data induk, dan catatan transaksi harian:

```mermaid
flowchart TD
    subgraph Config["(1) System Configuration (Aturan Perilaku Global)"]
        C1["Aturan Pembulatan Mata Uang (Rounding Rules)"]
        C2["Kebijakan Toleransi Anggaran (Strict vs Soft Control)"]
        C3["Metode Rekonsiliasi Bank Otomatis (Matching Rules)"]
    end

    subgraph Master["(2) Finance Master Data (Entitas & Referensi Berkelanjutan)"]
        M1["Entitas Legal Perusahaan (Legal Entities / Companies)"]
        M2["Institusi Bank & Rekening Perusahaan (Bank Accounts)"]
        M3["Kalender Fiskal & Periode Buku (Fiscal Calendar & Periods)"]
        M4["Dimensi Finansial (Cost Center, Departemen, Proyek)"]
        M5["Mata Uang & Tabel Kurs Valas (Currencies & FX Rates)"]
    end

    subgraph Trans["(3) Financial Transaction Data (Peristiwa Bisnis Atomik)"]
        T1["Proposal & Batch Pembayaran (Payment Batches)"]
        T2["Mutasi Rekening Koran Bank (Bank Statements)"]
        T3["Jurnal Realisasi Anggaran (Budget Consumptions)"]
    end

    Config --> Master
    Master --> Trans
```

---

## Taksonomi Entitas Master Data Keuangan

Modul Finance dalam ERP mengelola beberapa kelompok data induk utama:

### 1. Legal Entity & Company Structure
Mendefinisikan entitas badan hukum perusahaan (PT, CV, Ltd) yang memiliki kewajiban pelaporan pajak dan neraca mandiri (lihat [[00-fundamentals/organizational-structure|Organizational Structure]]). Dalam grup perusahaan (*Holding/Multi-Company*), setiap entitas legal dapat memiliki mata uang fungsional (*Functional Currency*) dan rekening bank yang berbeda.

### 2. Bank & Bank Account Master
* **Bank Master**: Lembaga perbankan tempat perusahaan bermitra (misal: Bank Mandiri, BCA, Citibank), lengkap dengan kode kliring perbankan nasional (*BI-FAST, SKNBI, RTGS*) dan kode internasional (*SWIFT / BIC*).
* **Company Bank Account**: Rekening giro atau tabungan resmi milik perusahaan di bank tersebut, lengkap dengan nomor rekening, mata uang, penandatangan sah (*signatories*), dan akun pembukuan kontrol di buku besar umum ([[02-accounting/chart-of-accounts|Chart of Accounts]]).

### 3. Currency and Exchange Rate Master (Valuta Asing)
* **Base / Functional Currency**: Mata uang utama pembukuan buku besar perusahaan (misal: `IDR` di Indonesia).
* **Transaction Currency**: Mata uang yang tertera pada dokumen transaksi pengadaan atau penjualan (misal: `USD`, `EUR`, `SGD`).
* **Exchange Rate Tables (Tabel Kurs Valas)**:
  * *Kurs Spot / Transaksi Harian*: Digunakan saat posting pembayaran kas/bank.
  * *Kurs Pajak (KMK)*: Kurs resmi mingguan dari Kementerian Keuangan untuk perhitungan Faktur Pajak PPN/PPh.
  * *Kurs Tengah BI / Closing Rate*: Digunakan saat revaluasi saldo valas akhir bulan (lihat [[02-accounting/foreign-currency-accounting|Foreign Currency Accounting]]).

---

### 4. Fiscal Calendar and Financial Periods (Kalender Fiskal)
Kalender akuntansi yang membagi satu tahun buku menjadi periode-periode pelaporan terstruktur:
* Biasanya terdiri dari 12 periode bulanan reguler (Periode 1 s.d. Periode 12).
* Ditambah 1 atau 2 **Periode Penyesuaian Khusus (*Adjustment Periods / Period 13 & 14*)** yang digunakan khusus untuk menampung jurnal penyesuaian audit tahunan (*audit adjustments*) tanpa mengotori laporan operasional bulan Desember normal.

### 5. Financial Dimensions (Dimensi Finansial & Analitik)
Sumbu multidimensi yang disematkan pada setiap baris transaksi keuangan untuk memecah laporan laba rugi dan anggaran tanpa perlu membuat ribuan kode akun baru di Chart of Accounts:
* **Cost Center (Pusat Biaya)**: Unit organisasi yang menyerap biaya (misal: `CC-IT`, `CC-HR`, `CC-GA`).
* **Profit Center (Pusat Laba)**: Unit bisnis atau lini produk yang menghasilkan pendapatan mandiri.
* **Project Code**: Mengaitkan pengeluaran dan pemasukan dengan proyek kontrak pelanggan atau proyek belanja modal (*Capex*).
* **Geographical Region / Branch**: Lokasi kantor cabang fisik (misal: `Cabang Surabaya`, `Cabang Medan`).

### 6. Payment Terms and Payment Methods
* **Payment Terms (Syarat Pembayaran)**: Mendefinisikan perhitungan tanggal jatuh tempo dan diskon pelunasan cepat (misal: `Net 30`, `2/10 Net 30`, `COD`, `Advance 100%`).
* **Payment Methods (Metode Pembayaran)**: Jalur transfer dana fisik (misal: `Bank Transfer / H2H`, `Virtual Account`, `Corporate Credit Card`, `Cek/Giro`, `Petty Cash`).

---

## Hubungan Relasional Antar-Entitas Master Data Finansial

Struktur data induk keuangan saling terikat dalam hubungan relasional yang ketat:

```mermaid
classDiagram
    class Company {
        +UUID company_id
        +String legal_name
        +String tax_id_npwp
        +String functional_currency_code
    }

    class BankMaster {
        +UUID bank_id
        +String bank_name
        +String swift_bic_code
        +String clearing_code
    }

    class CompanyBankAccount {
        +UUID bank_account_id
        +String account_number
        +String account_name
        +String currency_code
        +AccountPurpose purpose
        +UUID gl_account_id
        +AccountStatus status
    }

    class FiscalCalendar {
        +UUID calendar_id
        +String calendar_name
        +Integer fiscal_year
    }

    class FiscalPeriod {
        +UUID period_id
        +Integer period_number
        +Date start_date
        +Date end_date
        +PeriodStatus status
    }

    class FinancialDimension {
        +UUID dimension_id
        +DimensionType dimension_type
        +String dimension_code
        +String dimension_name
    }

    Company "1" *-- "many" CompanyBankAccount : Memiliki Rekening
    BankMaster "1" *-- "many" CompanyBankAccount : Menerbitkan Rekening
    Company "1" *-- "1" FiscalCalendar : Menggunakan Kalender
    FiscalCalendar "1" *-- "many" FiscalPeriod : Terdiri dari Periode
    Company "1" *-- "many" FinancialDimension : Mengalokasikan Dimensi
```

---

## ERP Implementation Comparison

| Aspek | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 Finance |
| :--- | :--- | :--- | :--- |
| **Model Rekening Bank** | Entitas `res.partner.bank` (rekening bank) yang ditautkan ke entitas `account.journal` bertipe *Bank*. | Entitas mandiri `Bank Account` yang ditautkan ke dokumen `Bank` dan akun GL bertipe *Bank*. | Memisahkan formal antara **Bank Facility**, **Bank Groups**, dan **Bank Accounts** di modul Cash and Bank Management. |
| **Dimensi Finansial** | Menggunakan fitur **Analytic Accounts** dan **Analytic Plans** (mendukung multi-dimensi analitik tak terbatas). | Menggunakan konsep **Cost Center** dan **Accounting Dimensions** yang dapat ditambahkan secara fleksibel pada seluruh dokumen transaksi. | Arsitektur kelas industri: **Financial Dimension Framework** dengan struktur hierarki akun gabungan (*Account Structures & Advanced Rules*). |
| **Kalender Fiskal & Periode** | Dikelola melalui rentang tanggal laporan dan fitur penguncian tanggal (*Accounting Closing Dates*). | Dokumen formal `Fiscal Year` yang terdiri dari baris-baris `Fiscal Year Period` bulanan. | Dokumen formal tingkat enterprise: **Fiscal Calendars** dengan status periode terpisah per modul (*Open, On Hold, Permanently Closed*). |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-finance|Design finance]] (NAV-D-053).

---

## References

- ISO. *ISO 4217 — Codes for the representation of currencies*. https://www.iso.org/iso-4217-currency-codes.html Diakses 26 November 2026.
- ISO. *ISO 20022 — Universal financial industry message scheme*. https://www.iso20022.org/ Diakses 26 November 2026.
1. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview* (Dynamics 365 Finance; struktur akun dan dimensi). https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 24 November 2026.
2. **ERPNext Documentation** — *Bank Account*. https://docs.frappe.io/erpnext/bank-account — diakses 24 November 2026.
3. **ERPNext Documentation** — *Cost Center*. https://docs.frappe.io/erpnext/cost-center — diakses 24 November 2026.
4. **Odoo 20.0 Documentation** — *Accounting and invoicing*. https://www.odoo.com/documentation/20.0/applications/finance/accounting.html — diakses 24 November 2026.
