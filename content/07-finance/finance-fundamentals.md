---
title: "Finance Fundamentals in ERP"
tags:
  - finance
  - fundamentals
  - treasury
  - accounting-vs-finance
  - financial-management
  - erp-architecture
---

# Finance Fundamentals in ERP

## Definition

**Finance Management (Manajemen Keuangan)** dalam arsitektur Enterprise Resource Planning (ERP) adalah domain fungsional terpadu yang mengelola likuiditas, peredaran kas dan bank, perencanaan anggaran, proyeksi arus kas, manajemen modal kerja, serta pengendalian finansial organisasi untuk mendukung pengambilan keputusan strategis dan menjaga solvabilitas perusahaan.

Jika [[02-accounting/accounting-fundamentals|Phase 3 — Accounting]] berfokus pada **pencatatan historis transaksi masa lalu (*what happened*)** yang taat pada prinsip akrual dan standar pelaporan keuangan formal (IFRS/PSAK), maka domain Finance berfokus pada **pengelolaan likuiditas saat ini dan masa depan (*what is happening and what will happen*)**: memastikan uang kas riil selalu tersedia untuk memenuhi kewajiban operasional, mengoptimalkan penempatan dana, serta mengendalikan komitmen pengeluaran sebelum dana benar-benar keluar dari rekening bank.

---

## Business Purpose

1. **Menjamin Solvabilitas dan Likuiditas (*Liquidity Assurance*)**: Mencegah kegagalan pembayaran (*default risk*) terhadap tagihan vendor, penggajian karyawan, kewajiban pajak, dan cicilan perbankan.
2. **Optimalisasi Pengelolaan Kas (*Cash Optimization*)**: Menghilangkan dana mengendap yang tidak produktif (*idle cash*) melalui konsolidasi rekening (*cash concentration*) dan perencanaan arus kas yang presisi.
3. **Pengendalian Pengeluaran Berbasis Komitmen (*Preventive Spending Control*)**: Mengontrol pemakaian anggaran secara preventif sejak penerbitan dokumen pengadaan (*budget encumbrance*), bukan sekadar mencatat realisasi biaya setelah faktur tiba.
4. **Penyediaan Wawasan untuk Keputusan Strategis (*Decision Support*)**: Menyajikan dasbor keuangan manajerial (*Management Reporting*) dan analisis skenario masa depan (*Rolling Forecasts*) bagi jajaran direksi (CFO/CEO).

---

## Batasan Domain: Accounting vs. Finance vs. Treasury

Dalam organisasi skala menengah hingga enterprise, peran keuangan sering kali terbagi ke dalam tiga disiplin yang saling melengkapi namun memiliki fokus dan metrik yang berbeda:

```mermaid
flowchart TD
        direction TB
        ACC["(1) Accounting (Akuntansi Keuangan)<br/>Fokus: Historis, Akrual, Kepatuhan Regulasi & Pajak.<br/>Output: Neraca, Laba Rugi, Buku Besar, Audit Trail."]
        FIN["(2) Corporate Finance (Keuangan Perusahaan)<br/>Fokus: Masa Depan, Anggaran, Perencanaan Finansial & Profitabilitas.<br/>Output: Budget vs Actual, Financial Modeling, Capex Plan."]
        TRS["(3) Treasury Operations (Perbendaharaan & Kas)<br/>Fokus: Hari Ini & Jangka Pendek, Likuiditas Kas Riil & Perbankan.<br/>Output: Cash Position, Bank Reconciliation, Payment Run, FX."]
    ACC <--> FIN
    FIN <--> TRS
    TRS <--> ACC
```

### Matriks Perbandingan Tiga Disiplin:

| Dimensi | Accounting (Akuntansi) | Corporate Finance (Keuangan) | Treasury Operations (Perbendaharaan) |
| :--- | :--- | :--- | :--- |
| **Orientasi Waktu** | Masa Lalu (*Past / Historical*) | Masa Depan (*Future / Forward-Looking*) | Saat Ini & Sangat Dekat (*Present & Near-Term*) |
| **Basis Pengukuran** | **Prinsip Akrual (*Accrual Basis*)** | Rencana, Target, dan Estimasi Varian | **Arus Kas Riil (*Cash Basis*)** |
| **Pertanyaan Kunci** | *"Berapa laba bersih dan nilai aset kita bulan lalu?"* | *"Berapa anggaran yang boleh dibelanjakan tahun depan?"* | *"Apakah saldo bank hari ini cukup untuk membayar vendor besok pagi?"* |
| **Dokumen Utama** | Journal Entry, General Ledger, Laporan Keuangan Audit. | Budget Allocation, Rolling Forecast, Laporan Varian. | Cash Position Dashboard, Payment Batch, Rekening Koran Bank. |
| **Sasaran Kepatuhan** | IFRS, GAAP, Regulasi Perpajakan (DJP). | Kebijakan Internal Perusahaan, Target Dewan Komisaris. | Regulasi Perbankan, Kontrak Kredit, Manajemen Risiko Pasar. |

---

## Mental Model Arsitektur Aliran Informasi Keuangan

Aliran data dalam sistem ERP bergerak dari transaksi operasional harian hingga menjadi laporan keputusan finansial:

```mermaid
flowchart TD
    Ops["(1) Transaksi Operasional Enterprise<br/>• Sales Order (Phase 4)<br/>• Purchase Order (Phase 5)<br/>• Mutasi Gudang (Phase 6)<br/>• Produksi Pabrik (Phase 7)"]
    Acc["(2) Lapisan Akuntansi & Pembukuan<br/>• AR Subledger & AP Subledger<br/>• General Ledger (Neraca & Laba Rugi)"]
    Fin["(3) Lapisan Manajemen Keuangan<br/>• Cash & Bank Management (Rekonsiliasi)<br/>• Disbursement Engine (Eksekusi Bayar)<br/>• Cash Flow & Liquidity Forecast"]
    Exec["(4) Keputusan Manajerial & Pengendalian<br/>• Executive Dashboard & Pelaporan Manajemen<br/>• Keputusan Investasi, Pendanaan & Dividen"]

    BudgetCtrl["Pengendalian Anggaran (Budget Control)"]

    Ops --> Acc
    Acc --> Fin
    Fin --> Exec
    
    Fin --> BudgetCtrl
    BudgetCtrl -.->|"Preventive Control: Blokir PO jika over-budget"| Ops

    classDef ops fill:#e3f2fd,stroke:#1976d2,stroke-width:1px,color:#0f172a;
    classDef acc fill:#e8f5e9,stroke:#388e3c,stroke-width:1px,color:#0f172a;
    classDef fin fill:#fff3e0,stroke:#f57c00,stroke-width:1.5px,color:#0f172a;
    classDef exec fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px,color:#0f172a;
    classDef ctrl fill:#ffebee,stroke:#d32f2f,stroke-width:1px,color:#0f172a;

    class Ops ops;
    class Acc acc;
    class Fin fin;
    class Exec exec;
    class BudgetCtrl ctrl;
```

---

## Spektrum Fungsional Domain Finance dalam ERP

Modul Finance di dalam ERP enterprise mengintegrasikan serangkaian kapabilitas terstruktur:

1. **Cash Management**: Mengidentifikasi posisi saldo kas riil perusahaan setiap hari, memisahkan dana bebas vs dana terikat (*restricted cash*), dan mengelola kas kecil (*petty cash*).
2. **Bank Account Management**: Mengelola siklus hidup rekening bank perusahaan, penandatangan sah (*authorized signatories*), dan pemisahan fungsi rekening (operasional, penampungan, pembayaran gaji).
3. **Operational Bank Reconciliation**: Mengimpor mutasi rekening koran elektronik (*electronic bank statement*), mencocokkan mutasi secara otomatis, dan menangani pos-pos terbuka (*unmatched exceptions*).
4. **Payment and Cash Disbursement**: Mengelompokkan kewajiban jatuh tempo ke dalam proposal pembayaran (*payment proposal*), persetujuan berjenjang (*maker-checker*), dan transmisi file pembayaran ke perbankan.
5. **Budget Management & Control**: Menetapkan alokasi plafon belanja departemen, mengunci dana komitmen (*encumbrance*) saat pesanan pembelian disetujui, dan memblokir pengeluaran yang melampaui anggaran.
6. **Cash Flow Planning & Liquidity**: Memproyeksikan arus masuk (*cash inflows*) dari piutang dan arus keluar (*cash outflows*) dari utang usaha untuk mengantisipasi defisit atau surplus likuiditas.
7. **Working Capital Management**: Mengoptimalkan siklus konversi kas (*Cash Conversion Cycle*) melalui percepatan penagihan piutang (DSO), perpanjangan utang yang wajar (DPO), dan efisiensi persediaan (DIO).
8. **Financial Closing Governance**: Mengatur tata kelola penutupan buku (*period-end closing*) melalui daftar kendali (*closing checklist*), penguncian periode (*period lock*), dan validasi kesiapan pelaporan.

---

## ERP Implementation Comparison

| Aspek Arsitektur | Odoo Enterprise | ERPNext | Microsoft Dynamics 365 Finance |
| :--- | :--- | :--- | :--- |
| **Struktur Modul** | Terintegrasi erat dalam modul *Accounting* (menu *Treasury*, *Budgets*, dan *Reconciliation* berada dalam aplikasi akuntansi yang sama). | Menggabungkan akuntansi dan keuangan di dalam modul *Accounts* (fitur *Budgeting*, *Cash Flow Mapper*, dan *Payment Order*). | Memisahkan formal arsitektur enterprise: **Dynamics 365 Finance** (dengan sub-modul terdedikasi *Cash and Bank Management*, *Budgeting*, *Financial Period Close*). |
| **Kontrol Anggaran (Budget Control)** | Pengendalian anggaran berbasis persentase analitik; default bersifat *Soft Control* (notifikasi/laporan varian). | Mendukung opsi *Stop* (Hard Control) atau *Warn* (Soft Control) saat dokumen Material Request / PO disubmit. | Sangat komprehensif: **Budget Control Framework** tingkat industri yang mengevaluasi saldo draft, commitment, dan actual secara real-time. |
| **Konektivitas Perbankan** | Fitur bawaan *Bank Synchronization* via agregator pihak ketiga (Plaid, Yodlee) atau impor file standar (OFX, QIF, CAMT.053). | Mendukung integrasi Plaid dan impor file CSV/Excel rekening koran via *Bank Statement Import*. | Fitur enterprise canggih: Modul **Bank Connectivity & Electronic Banking** mendukung transmisi ISO 20022 XML, Host-to-Host (H2H), dan SWIFT. |

---

## Naventra Consideration

Keputusan desain: [[30-naventra/design-finance|Design finance]] (NAV-D-051).

---

## References

1. **IFRS Foundation** — *IAS 7 Statement of Cash Flows* (definisi kas dan setara kas). https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/ — diakses 24 November 2026.
2. **COSO** — *Internal Control — Integrated Framework* (2013) (cetak).
3. **AFP** — *Treasury Management Body of Knowledge* (cetak).
4. **Microsoft Learn** — *Cash and bank management* (Dynamics 365 Finance). https://learn.microsoft.com/en-us/dynamics365/finance/cash-bank-management/cash-bank-management — diakses 24 November 2026.
5. **ERPNext Documentation** — *Accounts*. https://docs.frappe.io/erpnext/accounts — diakses 24 November 2026.
6. **Odoo 20.0 Documentation** — *Accounting and invoicing*. https://www.odoo.com/documentation/20.0/applications/finance/accounting.html — diakses 24 November 2026.
