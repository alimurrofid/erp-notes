---
title: Accounting
---

# Accounting in ERP

Bagian ini membahas prinsip, standar, dan mekanisme akuntansi yang tertanam dalam sistem ERP modern. Akuntansi di dalam ERP bertindak sebagai **pusat gravitasi data keuangan (*financial single source of truth*)**, di mana setiap transaksi operasional dari modul pengadaan (*procurement*), penjualan (*sales*), persediaan (*inventory*), manufaktur (*production*), hingga pengelolaan aset dan perbankan bermuara pada pencatatan akuntansi yang terstruktur.

Materi disusun mengikuti alur domain akuntansi universal:
$$\text{Accounting Concept} \to \text{Accounting Rules} \to \text{Journal Entry} \to \text{Ledger / Subledger} \to \text{Period Closing} \to \text{Financial Statements} \to \text{ERP Integration}$$

---

## Daftar Materi Pembelajaran Akuntansi

### 1. Fondasi & Struktur Inti Akuntansi ERP

1. [[02-accounting/accounting-fundamentals|Accounting Fundamentals]]  
   Persamaan dasar akuntansi ($Assets = Liabilities + Equity$), prinsip periodisitas, basis akrual (*accrual basis*), konsep entitas ekonomi, dan peran sentral General Ledger sebagai pusat integrasi enterprise.

2. [[02-accounting/debit-credit-and-double-entry|Debit, Credit, and Double-Entry]]  
   Mekanisme penyeimbangan debit-kredit berdasarkan klasifikasi akun (ALERE), validasi *zero-sum balance* ($\sum \text{Debit} - \sum \text{Credit} = 0$), dan penegakan integritas data pada layer basis data ERP.

3. [[02-accounting/chart-of-accounts|Chart of Accounts (COA)]]  
   Arsitektur hierarki bagan akun, penomoran segmental/berdimensi (*cost center*, *profit center*, *branch*), akun kontrol (*control account*), dan struktur pelaporan keuangan standar.

4. [[02-accounting/journal-entry|Journal Entry]]  
   Struktur dokumen jurnal (header dan item baris), aturan kekekalan (*immutability* / *no physical deletion*), *audit trail*, mekanisme jurnal koreksi/pembalik (*reversing entries*), dan automasi *source document posting*.

5. [[02-accounting/general-ledger-and-subledger|General Ledger and Subledger]]  
   Pemisahan arsitektur antara buku besar umum (*General Ledger*) dan buku pembantu (*Subledger* - AR, AP, Fixed Asset, Inventory), proteksi akun kontrol (*direct posting lock*), dan sinkronisasi rekonsiliasi.

---

### 2. Siklus Operasional & Buku Pembantu (Subledger Operations)

6. [[02-accounting/accounts-receivable|Accounts Receivable (AR)]]  
   Manajemen piutang usaha (IFRS 9), kontrol pagu kredit (*credit limit check*), alokasi pelunasan (*open-item clearing*), *aging schedule* (30/60/90+ hari), dan pencadangan kerugian penurunan nilai piutang (*Expected Credit Loss*).

7. [[02-accounting/accounts-payable|Accounts Payable (AP)]]  
   Siklus utang usaha, validasi pencocokan 3-arah (*3-way matching*: PO vs Penerimaan vs Tagihan), akun kliring sementara (*interim clearing*), manajemen jatuh tempo, dan skedul pembayaran pemasok (*payment run*).

8. [[02-accounting/revenue-and-expense|Revenue and Expense Recognition]]  
   Kerangka IFRS 15 (model 5-langkah pengakuan pendapatan), pembedaan penyerahan titik waktu (*point-in-time*) vs sepanjang waktu (*over-time*), pendapatan diterima di muka (*deferred revenue*), dan *matching principle* beban operasional.

9. [[02-accounting/inventory-accounting|Inventory Accounting]]  
   Standar penilaian persediaan (IAS 2 - FIFO dan Rata-rata Tertimbang), sistem perpetual terotomasi vs periodik, akun kliring barang belum tertagih (*GR/IR clearing*), dan evaluasi nilai realisasi neto (*Lower of Cost and Net Realizable Value*).

10. [[02-accounting/fixed-asset-accounting|Fixed Asset Accounting]]  
    Siklus aset tetap berwujud (IAS 16), kapitalisasi biaya perolehan (*capitalization threshold*), sinkronisasi buku pembantu aset tetap, pelepasan aset (*disposal*), laba/rugi penghentian aset, dan inventarisasi fisik.

11. [[02-accounting/tax-accounting|Tax Accounting]]  
    Akuntansi perpajakan korporasi (studi kasus Indonesia: UU HPP), mekanisme PPN Masukan dan PPN Keluaran, pembuatan faktur pajak elektronik, pemotongan PPh pasal 21, 23, dan 4 ayat (2), serta penutupan saldo pajak terutang.

12. [[02-accounting/bank-reconciliation|Bank Reconciliation]]  
    Pencocokan mutasi kas elektronik (*electronic bank statement* - CAMT.053 / MT940), akun kliring perantara (*cash in transit* / *undeposited funds*), identifikasi perbedaan waktu (*timing differences*), dan jurnal penyesuaian biaya/bunga bank.

---

### 3. Penyesuaian, Valuasi & Penutupan Periode (Period-End & Reporting)

13. [[02-accounting/accrual-and-adjusting-entries|Accrual and Adjusting Entries]]  
    Pencatatan akrual akhir periode (*accrued revenues* dan *accrued expenses*), alokasi penangguhan (*prepaid expenses* dan *unearned revenues*), serta mekanisme *auto-reversing entries* pada awal periode berikutnya.

14. [[02-accounting/depreciation-and-amortization|Depreciation and Amortization]]  
    Perhitungan dan pembebanan otomatis beban penyusutan aset berwujud (IAS 16 - Garis Lurus, Saldo Menurun) dan amortisasi aset tak berwujud (IAS 38), masa manfaat, nilai residu, dan akun kontra akumulasi penyusutan.

15. [[02-accounting/foreign-currency-accounting|Foreign Currency Accounting]]  
    Akuntansi transaksi multikurs (IAS 21), penentuan mata uang fungsional vs penyajian, pembedaan selisih kurs terealisasi (*realized forex gain/loss*) saat settlement vs selisih kurs belum terealisasi (*unrealized forex gain/loss*) saat revaluasi moneter penutupan periode.

16. [[02-accounting/period-end-closing|Period-End Closing]]  
    Tata kelola penutupan buku bertingkat: *cutoff* dokumen operasional, penguncian subledger, revaluasi kurs, posting jurnal penyesuaian, *preliminary trial balance*, transfer laba/rugi periode berjalan ke laba ditahan (*retained earnings*), dan penguncian permanen periode fiskal.

17. [[02-accounting/financial-statements|Financial Statements]]  
    Penyusunan laporan keuangan terintegrasi: Laporan Posisi Keuangan / Neraca (*Balance Sheet* - IAS 1), Laporan Laba Rugi dan Penghasilan Komprehensif Lain (*Income Statement*), Laporan Arus Kas (*Cash Flow Statement* - IAS 7: Metode Langsung & Tidak Langsung), dan Laporan Perubahan Ekuitas.
