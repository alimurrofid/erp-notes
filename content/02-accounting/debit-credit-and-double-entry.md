---
title: Debit, Credit, and Double-Entry Accounting
---

# Debit, Credit, and Double-Entry Accounting

## Definition

**Double-Entry Bookkeeping (Sistem Pembukuan Berpasangan)** adalah prinsip fundamental akuntansi yang menetapkan bahwa setiap transaksi keuangan memengaruhi minimal dua akun yang berbeda dengan posisi yang seimbang, di mana jumlah nilai di sisi **Debit** harus selalu sama persis dengan jumlah nilai di sisi **Kredit** ($\sum \text{Debit} = \sum \text{Credit}$).

Istilah *Debit* (berasal dari bahasa Latin *debere* / disingkat **Dr**) secara harfiah berarti posisi di sisi kiri, sedangkan *Credit* (berasal dari bahasa Latin *credere* / disingkat **Cr**) berarti posisi di sisi kanan. Debit dan kredit **bukanlah sinonim dari 'bertambah' atau 'berkurang'**, melainkan instrumen matematika untuk menjaga keseimbangan persamaan akuntansi.

---

## The Mathematical Foundation

Double-entry berakar langsung dari perluasan Persamaan Dasar Akuntansi (lihat [[02-accounting/accounting-fundamentals|Accounting Fundamentals]]):

$$\text{Assets} = \text{Liabilities} + \text{Equity} + (\text{Revenue} - \text{Expenses})$$

Dengan memindahkan $\text{Expenses}$ ke sisi kiri menggunakan aljabar dasar:

$$\mathbf{Assets + Expenses = Liabilities + Equity + Revenue}$$

Dari persamaan di atas, aturan saldo normal terbentuk secara matematis:
* Sisi Kiri persamaan (**Assets** dan **Expenses**) bertambah di sisi **Debit**.
* Sisi Kanan persamaan (**Liabilities**, **Equity**, dan **Revenue**) bertambah di sisi **Credit**.

---

## Normal Balance Table (Tabel Saldo Normal Akun)

| Kelompok Akun | Posisi di Persamaan | Jika Bertambah ($+$) | Jika Berkurang ($-$) | Saldo Normal |
|---|:---:|:---:|:---:|:---:|
| **Assets (Aset)** | Sisi Kiri | **Debit** | Kredit | **Debit** |
| **Expenses (Beban)** | Sisi Kiri | **Debit** | Kredit | **Debit** |
| **Liabilities (Liabilitas/Utang)** | Sisi Kanan | Debit | **Kredit** | **Kredit** |
| **Equity (Ekuitas/Modal)** | Sisi Kanan | Debit | **Kredit** | **Kredit** |
| **Revenue (Pendapatan)** | Sisi Kanan | Debit | **Kredit** | **Kredit** |

### Akun Kontra (Contra Accounts)
Akun kontra adalah akun yang melekat pada akun induk namun memiliki saldo normal yang berlawanan untuk mengurangi nilai buku akun induknya:
* **Akumulasi Penyusutan (*Accumulated Depreciation*)**: Akun kontra-aset. Bersaldo normal **Kredit** untuk mengurangi nilai aset tetap.
* **Cadangan Penurunan Nilai Piutang (*Allowance for Expected Credit Losses*)**: Akun kontra-aset. Bersaldo normal **Kredit** untuk mengurangi piutang bruto.
* **Diskon & Retur Penjualan (*Sales Returns & Allowances*)**: Akun kontra-pendapatan. Bersaldo normal **Debit** untuk mengurangi pendapatan kotor.

---

## 6 Contoh Transaksi Esensial & Analisis Persamaan

Berikut adalah analisis 6 transaksi dasar yang menunjukkan bagaimana double-entry mempertahankan keseimbangan persamaan akuntansi:

### 1. Setoran Modal Awal Pemilik (Owner Investment)
* **Peristiwa**: Pemilik menyetor modal tunai sebesar Rp100.000.000 ke rekening bank perusahaan.
* **Analisis**: Aset (Bank) bertambah di sisi kiri; Ekuitas (Modal Saham) bertambah di sisi kanan.

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Bank Operasional | Asset ($+$) | 100.000.000 | - |
| Modal Disetor (*Share Capital*) | Equity ($+$) | - | 100.000.000 |

$$\Delta \text{Assets} (+100.000.000) = \Delta \text{Equity} (+100.000.000)$$

---

### 2. Pembelian Persediaan Secara Kredit (Credit Purchase)
* **Peristiwa**: Perusahaan membeli bahan baku senilai Rp20.000.000 secara kredit dengan tempo pembayaran 30 hari.
* **Analisis**: Aset (Persediaan) bertambah di sisi kiri; Liabilitas (Utang Usaha) bertambah di sisi kanan.

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Persediaan Bahan Baku | Asset ($+$) | 20.000.000 | - |
| Utang Usaha (*Accounts Payable*) | Liability ($+$) | - | 20.000.000 |

$$\Delta \text{Assets} (+20.000.000) = \Delta \text{Liabilities} (+20.000.000)$$

---

### 3. Penjualan Barang Secara Kredit (Credit Sale)
* **Peristiwa**: Perusahaan menjual barang seharga Rp10.000.000 secara kredit (HPP barang tersebut Rp7.000.000).
* **Analisis**: Terdapat dua pasang entri terintegrasi (lihat [[01-business-processes/order-to-cash|Order to Cash]]):
  1. Mengakui piutang dan pendapatan: Aset bertambah, Pendapatan bertambah.
  2. Mengakui pengurangan stok dan biaya: Beban bertambah, Aset berkurang.

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Piutang Usaha (*Accounts Receivable*) | Asset ($+$) | 10.000.000 | - |
| Pendapatan Penjualan (*Sales Revenue*) | Revenue ($+$) | - | 10.000.000 |
| Beban Pokok Penjualan (*COGS*) | Expense ($+$) | 7.000.000 | - |
| Persediaan Barang Dagang | Asset ($-$) | - | 7.000.000 |

$$\Delta \text{Assets} (+10M - 7M = +3M) = \Delta \text{Revenue} (+10M) - \Delta \text{Expenses} (+7M) \implies +3M = +3M$$

---

### 4. Pengakuan Beban Operasional (Operating Expense)
* **Peristiwa**: Menerima tagihan listrik kantor bulan berjalan sebesar Rp3.000.000 yang akan dibayar bulan depan.
* **Analisis**: Beban bertambah di sisi kiri; Liabilitas (Utang Beban Akrual) bertambah di sisi kanan.

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Beban Listrik & Utilitas | Expense ($+$) | 3.000.000 | - |
| Utang Beban Akrual (*Accrued Liability*) | Liability ($+$) | - | 3.000.000 |

$$\Delta \text{Expenses} (+3.000.000) \implies \Delta \text{Liabilities} (+3.000.000)$$

---

### 5. Penerimaan Pelunasan Piutang Pelanggan (Customer Payment)
* **Peristiwa**: Pelanggan melunasi piutang sebesar Rp10.000.000 via transfer bank.
* **Analisis**: Pertukaran aset internal (*asset composition change*). Satu aset bertambah (Bank), aset lain berkurang (Piutang Usaha). Total aset tidak berubah.

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Bank Operasional | Asset ($+$) | 10.000.000 | - |
| Piutang Usaha (*Accounts Receivable*) | Asset ($-$) | - | 10.000.000 |

$$\Delta \text{Assets} (+10.000.000 - 10.000.000 = 0) = 0$$

---

### 6. Pembayaran Utang kepada Pemasok (Supplier Payment)
* **Peristiwa**: Perusahaan membayar utang usaha kepada pemasok sebesar Rp20.000.000 melalui transfer bank.
* **Analisis**: Liabilitas berkurang di sisi kanan; Aset berkurang di sisi kiri.

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Utang Usaha (*Accounts Payable*) | Liability ($-$) | 20.000.000 | - |
| Bank Operasional | Asset ($-$) | - | 20.000.000 |

$$\Delta \text{Assets} (-20.000.000) = \Delta \text{Liabilities} (-20.000.000)$$

---

## ERP Validation Invariant: Strict Balancing Check

Dalam sistem ERP, prinsip double-entry dipaksakan secara ketat melalui aturan validasi level arsitektur (*invariant check*):

```mermaid
flowchart TD
    Req["Posting Request\n(Transaksi Operasional / Jurnal Manual)"]
    --> Sum{"Hitung Total:\nΣ Debit == Σ Credit ?"}
    Sum -->|Ya| Post["Commit Transaction to Database\nUpdate GL Accounts atomically"]
    Sum -->|Tidak (Selisih ≠ 0)| Rej["Error: Unbalanced Journal Entry!\nDatabase Rollback - Posting Ditolak"]
```

Jika sistem mendeteksi selisih sebesar Rp1 sekalipun ($\sum \text{Dr} \neq \sum \text{Cr}$), transaksi **wajib di-*rollback*** secara atomik untuk mencegah terjadinya kerusakan integritas neraca (*unbalanced trial balance*).

---

## Related Concepts

* [[02-accounting/accounting-fundamentals|Accounting Fundamentals]] — Persamaan akuntansi dan asas akrual.
* [[02-accounting/journal-entry|Journal Entry]] — Struktur baris jurnal akuntansi.
* [[02-accounting/chart-of-accounts|Chart of Accounts]] — Penentuan kategori akun normal debit/kredit.
* [[02-accounting/financial-statements|Financial Statements]] — Kompilasi saldo akun ke neraca dan laba rugi.

---

## References

1. **Sangster, A.** (2018). *Pacioli's Prophetic Accounting*. Journal of Accounting, Auditing & Accountability.
2. **Weygandt, J. J., Kimmel, P. D., & Kieso, D. E.** (2019). *Financial Accounting: Tools for Business Decision Making* (Chapter: The Accounting Information System). John Wiley & Sons.
3. **Microsoft Learn**: *General ledger posting and validation rules in Dynamics 365*. URL: https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/
4. **Frappe / ERPNext Documentation**: *Double Entry Accounting Principles in ERPNext*. URL: https://docs.frappe.io/erpnext/user/manual/en/accounts
