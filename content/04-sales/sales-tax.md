---
title: Sales Tax
---

# Sales Tax in ERP

## Definition

**Sales Tax (Pajak Penjualan)** dalam sistem ERP adalah modul aturan perpajakan otomatis (*tax calculation engine*) yang bertugas menentukan apakah suatu transaksi penjualan terutang pajak, menghitung besaran nilai pajak berdasarkan hukum yurisdiksi yang berlaku, mencatat kewajiban utang pajak keluaran di buku besar umum, dan menghasilkan data faktur pajak elektronik resmi (*tax invoice compliance*).

Pajak yang dipungut dari pembeli pada saat penjualan secara universal diklasifikasikan sebagai **Pajak Tidak Langsung (*Indirect Tax*)** atau **Pajak Keluaran (*Output Tax / VAT Output*)**.

---

## Business Purpose

Integrasi mesin pajak (*Tax Engine*) dalam transaksi penjualan ERP bertujuan untuk:
1. **Otomatisasi Kepatuhan Hukum (*Statutory Compliance*)**: Memastikan kalkulasi pajak dilakukan secara presisi sesuai peraturan otoritas pajak tanpa bergantung pada perhitungan manual staf kasir atau penjualan.
2. **Mitigasi Sanksi dan Denda Fiskal**: Menghindari kesalahan tarif atau keterlambatan penerbitan faktur pajak yang dapat memicu sanksi bunga atau denda administratif dari dinas perpajakan negara.
3. **Penyelarasan Nilai Komersial dan Pajak**: Menghilangkan selisih (*reconciliation gap*) antara angka penjualan komersial pada modul *Sales* dengan Surat Pemberitahuan (SPT) Masa Pajak pada modul *Accounting*.

---

## Universal Tax Determination Engine

Sistem ERP enterprise menentukan jenis dan besaran tarif pajak secara dinamis melalui evaluasi tiga pilar data (*Tax Determination Matrix*):

```mermaid
flowchart TD
    Cust["(1) Customer Tax Profile<br/>(PKP / Non-PKP, Ekspor / Domestik, Bebas Pajak?)"] 
    --> Engine{"ERP Tax Determination Engine"}
    
    Item["(2) Item Tax Category<br/>(Barang Kena Pajak, Jasa Kena Pajak, Barang Pokok Bebas Pajak)"] 
    --> Engine
    
    Loc["(3) Place of Supply / Destination<br/>(Wilayah Yuridiksi Pengiriman Barang)"] 
    --> Engine

    Engine --> Result["Hasil Penentuan:<br/>Kode Pajak: PPN 12% (DPP 11/12)<br/>Sifat: Terutang / Dipungut Sendiri<br/>Akun GL: 2120 - Utang PPN Keluaran"]
```

### Kategori Tarif Pajak Standar:
1. **Standard Rate (Tarif Standar)**: Berlaku umum untuk sebagian besar barang dan jasa komersial (misal: Indonesia menerapkan tarif 12% dengan DPP Nilai Lain 11/12, sehingga beban efektif 11%).
2. **Zero-Rated (Tarif 0%)**: Diberlakukan untuk transaksi ekspor barang ke luar negeri guna mendorong daya saing produk nasional. Penjual tidak memungut pajak keluaran, namun tetap berhak mengkreditkan pajak masukan produksinya.
3. **Non-Taxable / Bukan Objek PPN**: Komoditas kebutuhan pokok tertentu (misal: beras, daging mentah, jasa medis dasar) yang oleh undang-undang dinyatakan **bukan objek PPN**, bukan sekadar "dibebaskan". Perbedaan ini penting: atas penyerahan yang bukan objek atau dibebaskan, PPN Masukan yang terkait **tidak dapat dikreditkan**, berbeda dari ekspor bertarif 0% yang tetap berhak mengkreditkan pajak masukan. Klasifikasi produk di master data harus memakai kode pajak yang tepat agar kredit pajak tidak salah diambil (lihat [[12-tax/vat-fundamentals|VAT Fundamentals]]).

---

## Tax-Inclusive vs Tax-Exclusive Pricing

ERP wajib mendukung dua metode penetapan harga terkait pajak:

### 1. Tax-Exclusive (Harga Belum Termasuk Pajak)
Biasa digunakan dalam perdagangan antar-bisnis (**B2B**). Harga penawaran katalog murni mencerminkan nilai barang, dan pajak ditambahkan di atasnya.
* *Rumus Dasar*:
  $$\text{Dasar Pengenaan Pajak (DPP)} = \text{Harga Barang}$$
  $$\text{Nilai Pajak (PPN)} = \text{DPP} \times \text{Tarif Pajak}$$
  $$\text{Total Tagihan} = \text{DPP} + \text{Nilai Pajak}$$
* *Contoh*: Harga Rp1.000.000, PPN efektif 11% = Rp110.000 (12% × DPP 11/12) $\implies$ Total = **Rp1.110.000**.

### 2. Tax-Inclusive (Harga Sudah Termasuk Pajak)
Biasa digunakan dalam perdagangan ritel konsumen (**B2C**). Harga yang tertera pada label rak toko adalah harga final yang dibayar pembeli.
* *Rumus Pemisahan (Ekstraksi DPP)*:
  $$\mathbf{DPP = \frac{\text{Total Harga Label}}{1 + \text{Tarif Pajak}}}$$
  $$\mathbf{Nilai\ Pajak = \text{Total Harga Label} - DPP}$$
* *Contoh*: Harga label rak Rp1.000.000 (termasuk PPN efektif 11%):
  $$\text{DPP} = \frac{\text{Rp1.000.000}}{1 + 0.11} = \mathbf{Rp900.901}$$
  $$\text{PPN} = \text{Rp1.000.000} - \text{Rp900.901} = \mathbf{Rp99.099}$$

---

## Aturan Pembulatan Pajak (Tax Rounding Rules)

Perbedaan selisih angka Rp1 sering kali timbul antara total faktur dan rekonsiliasi pajak jika metode pembulatan tidak diatur dengan jelas:
1. **Line-Level Rounding (Pembulatan per Baris)**: Sistem menghitung dan membulatkan pajak pada setiap baris produk secara individual, lalu menjumlahkan seluruh hasil pembulatan.
2. **Document-Level Rounding (Pembulatan per Faktur)**: Sistem menjumlahkan seluruh DPP baris terlebih dahulu, menghitung pajak dari total DPP tersebut, baru melakukan pembulatan satu kali di level akhir dokumen.

Regulasi otoritas perpajakan masing-masing negara umumnya mewajibkan penggunaan metode pembulatan spesifik untuk validitas faktur elektronik.

---

## Konteks Yurisdiksi Indonesia (UU HPP No. 7 Tahun 2021)

> [!important] Catatan Regulasi Lokal
> Penjelasan berikut merupakan contoh implementasi perpajakan yang berlaku di **Republik Indonesia** berdasarkan **UU Harmonisasi Peraturan Perpajakan (UU HPP No. 7 Tahun 2021)**:
> 1. **Tarif PPN Standar**: Tarif statutori **12%** dengan DPP Nilai Lain **11/12** untuk BKP/JKP non-mewah, sehingga beban efektif **11%**. Berlaku sejak 1 Januari 2025 (UU HPP jo PMK 131/PMK.03/2024 dan PMK 11/2025; rincian di [[12-tax/vat-fundamentals|VAT Fundamentals]]).
> 2. **Faktur Pajak Elektronik (Coretax)**: Faktur pajak diterbitkan melalui Coretax dan nomor faktur dihasilkan oleh sistem. Alokasi NSFP manual dan unggahan e-Faktur diperlakukan sebagai proses historis.
> 3. **Mekanisme Wajib Pungut (WAPU)**:
>    * Jika bertransaksi dengan instansi pemerintah, BUMN, atau kontraktor migas tertentu (*Badan Pemungut WAPU*), pembeli **tidak membayar PPN ke penjual**, melainkan memotong PPN tersebut dan menyetorkannya langsung ke kas negara atas nama penjual.

---

## Jurnal Akuntansi Pajak Penjualan (Accounting Impact)

### Skenario Transaksi Baseline:
Penjualan 10 unit *Laptop Pro* @ Rp1.000.000 kepada pelanggan swasta (PT Maju Bersama):
* Dasar Pengenaan Pajak (DPP): Rp10.000.000
* PPN Keluaran (efektif 11%): Rp1.100.000
* Total Piutang: Rp11.100.000

#### 1. Jurnal Penjualan Standar (Dipungut Sendiri):
Perusahaan menagih penuh nilai barang dan pajak ke pembeli:

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Piutang Usaha (*Accounts Receivable*) | Asset | 11.100.000 | - |
| Pendapatan Penjualan (*Sales Revenue*) | Revenue | - | 10.000.000 |
| Utang PPN Keluaran (*VAT Output Payable*) | **Liability** | - | **1.100.000** |

*Utang PPN Keluaran dicatat di kelompok Liabilitas karena uang Rp1.100.000 tersebut adalah titipan negara yang wajib disetor ke kas negara pada akhir masa pajak (lihat [[03-accounting/tax-accounting|Tax Accounting]]).*

#### 2. Variasi Jurnal Penjualan ke Instansi Pemerintah (WAPU):
Jika pelanggan adalah Bendahara Pemerintah yang memotong PPN langsung:

| Akun | Kategori | Debit (Rp) | Kredit (Rp) |
|---|---|---:|---:|
| Piutang Usaha Bendahara (Hanya DPP) | Asset | 10.000.000 | - |
| Uang Muka / Tagihan PPN WAPU (Bukti Potong) | Asset / Tax Receiv. | 1.100.000 | - |
| Pendapatan Penjualan | Revenue | - | 10.000.000 |
| Utang PPN Keluaran | Liability | - | 1.100.000 |

---

## Related Concepts

* [[03-accounting/tax-accounting|Tax Accounting]] — Rekonsiliasi bulanan PPN Masukan vs PPN Keluaran (*VAT settlement*).
* [[04-sales/pricing-and-discount|Pricing and Discount]] — Penentuan Dasar Pengenaan Pajak (DPP) setelah diskon.
* [[03-accounting/financial-statements|Financial Statements]] — Penyajian liabilitas pajak lancar di neraca.

---

## References

1. **UU No. 7 Tahun 2021** — Harmonisasi Peraturan Perpajakan (UU HPP). https://peraturan.go.id/id/uu-no-7-tahun-2021 — diakses 24 November 2026.
2. **PMK No. 131 Tahun 2024** — Perlakuan PPN atas Impor dan Penyerahan BKP/JKP sehubungan dengan berlakunya tarif PPN 12%. https://jdih.kemenkeu.go.id/dok/pmk-131-tahun-2024 — diakses 24 November 2026.
3. **OECD** — *International VAT/GST Guidelines*. https://www.oecd.org/en/publications/international-vat-gst-guidelines_9789264271401-en.html — diakses 24 November 2026.
4. **Microsoft Learn** — *Indirect taxes overview* (Dynamics 365 Finance). https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/indirect-taxes-overview — diakses 24 November 2026.
5. **ERPNext Documentation** — *Sales Taxes and Charges Template*. https://docs.frappe.io/erpnext/sales-taxes-and-charges-template — diakses 24 November 2026.
