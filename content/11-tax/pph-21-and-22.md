---
title: PPh 21 and PPh 22
---

# PPh 21 and PPh 22

## Definition

**PPh Pasal 21** adalah pajak penghasilan yang dipotong atas penghasilan sehubungan dengan pekerjaan, jasa, atau kegiatan yang diterima orang pribadi. **PPh Pasal 22** adalah pajak penghasilan yang dipungut atas pembelian barang tertentu, impor, atau penjualan oleh badan tertentu.

Keduanya adalah **pajak di muka** (*prepayment*): jumlah yang dipotong/dipungut menjadi kredit pajak dalam perhitungan PPh badan tahunan, bukan beban final (kecuali objek tertentu yang bersifat final).

Artikel ini adalah jembatan antara modul Payroll dan Procurement. Perhitungan rinci PPh 21 ada di [[10-hr/payroll-tax-and-statutory-compliance|Payroll Tax and Statutory Compliance]]; PPh 22/23/26 dan e-Bupot ada di [[11-tax/withholding-tax-management|Withholding Tax Management]]. Jangan menduplikasi tarif di sini.

## Business Process

```text
PPh 21 (payroll)
  Gaji bruto → hitung TER bulanan → potong → setor → lapor SPT Masa
  → akhir tahun: hitung ulang setahun → 1721-A1 → kredit di SPT Tahunan

PPh 22 (pengadaan/impor)
  PO/impor → tentukan objek & pemungut → pungut saat pembayaran/impor
  → bukti pungut → kredit pajak di SPT Tahunan
```

### Titik pemungutan yang sering salah

| Transaksi | Pemungut | Kapan | Bukti |
|---|---|---|---|
| Gaji/upah karyawan | Pemberi kerja | Saat pembayaran gaji | Bukti potong 1721-A1 (tahunan) |
| Impor barang | Bank devisa/bea cukai | Saat impor | Bukti pungut PPh 22 impor |
| Pembelian oleh bendahara pemerintah | Bendahara | Saat pembayaran | Bukti pungut |
| Pembelian oleh badan tertentu | Pembeli yang ditunjuk | Saat pembayaran | Bukti pungut |
| Jasa pihak dalam negeri | Pembeli jasa | Saat pembayaran | Bukti potong unifikasi (PPh 23) |

## Business Rules

1. **PPh 21 melekat pada orang pribadi, bukan pada jabatan.** Karyawan tetap, tidak tetap, dan penerima imbalan bukan pegawai dapat menjadi objek; status PTKP dan kesinambungan penghasilan menentukan metode.
2. **TER bulanan bukan pajak final.** PPh 21 bulanan dihitung dengan tarif efektif rata-rata, lalu dihitung ulang setahun; selisihnya menjadi kurang/lebih potong pada Desember.
3. **PPh 22 adalah kredit pajak.** Simpan bukti pungut; tanpa bukti, kredit tidak dapat diakui.
4. **Jangan mencampur PPh 22 dengan PPN.** PPN adalah pajak atas konsumsi; PPh 22 adalah pajak penghasilan di muka. Keduanya punya DPP dan akun berbeda.
5. **Tanggal setor PPh Masa adalah tanggal 15 bulan berikutnya; lapor tanggal 20** (PMK 81/2024). PPN tetap akhir bulan berikutnya.
6. **Objek dan tarif PPh 22 bergantung jenis barang/transaksi.** Jangan menghafal satu tarif untuk semua pembelian; cek ketentuan yang berlaku.
7. **Pemungut yang salah membuat kredit pajak tidak sah.** Tentukan status pemungut (bendahara, badan tertentu, importir) sebelum transaksi.

## Accounting Impact

**PPh 21 (pemberi kerja memotong):**

| Akun | Debit | Kredit |
|---|---:|---:|
| Beban Gaji | 12.000.000 | - |
| Utang PPh 21 | - | 300.000 |
| Utang Gaji / Bank | - | 11.700.000 |

Saat setor: Dr Utang PPh 21 / Cr Kas.

**PPh 22 (pembeli dipungut):**

| Akun | Debit | Kredit |
|---|---:|---:|
| Persediaan / Beban | 10.000.000 | - |
| Pajak Dibayar di Muka — PPh 22 | 250.000 | - |
| Utang Usaha / Kas | - | 10.250.000 |

PPh 22 tidak menambah biaya; ia menjadi kredit pajak. Jika perusahaan adalah **pemungut**, posisinya berbalik: Dr Kas/Piutang, Cr Utang PPh 22.

> [!warning] Angka ilustrasi
> Angka Rp300.000 dan Rp250.000 di atas adalah ilustrasi mekanisme, **bukan tarif**. Tarif PPh 21 mengikuti PP 58/2023 dan PMK 168/2023; tarif PPh 22 bergantung jenis transaksi dan ketentuan yang berlaku. Jangan memakai angka ini untuk perhitungan riil.

## Example

Karyawan dengan gaji bruto Rp12.000.000/bulan. PPh 21 bulanan (ilustrasi) Rp300.000 dipotong; kas dibayarkan Rp11.700.000. Pada Desember, PPh 21 setahun dihitung ulang; jika total potongan bulanan lebih besar, kelebihan menjadi lebih potong dan dikembalikan/dikompensasikan.

Perusahaan mengimpor bahan baku Rp10.000.000 dan dipungut PPh 22 Rp250.000 (ilustrasi). Jurnal: Dr Persediaan Rp10.000.000, Dr Pajak Dibayar di Muka—PPh 22 Rp250.000, Cr Kas/Utang Rp10.250.000. Bukti pungut disimpan untuk kredit di SPT Tahunan.

## ERP Implementation

- **Payroll:** PPh 21 dihitung dari komponen gaji yang menjadi objek; konfigurasi PTKP, TER, dan komponen non-objek harus satu sumber dengan master data karyawan.
- **Procurement/Import:** kode pajak PPh 22 dipasang pada baris PO/impor; jurnal otomatis membentuk *prepaid tax*, bukan beban.
- **Rekonsiliasi:** saldo PPh 21 payable harus sama dengan total bukti potong; saldo PPh 22 prepaid harus sama dengan bukti pungut yang dikreditkan.
- **Pelaporan:** SPT Masa PPh 21/26 dan SPT Masa PPh Unifikasi memakai data yang sama; jangan membuat jurnal manual terpisah.

## Related Concepts

- [[10-hr/payroll-tax-and-statutory-compliance|Payroll Tax and Statutory Compliance]] — perhitungan PPh 21 dan iuran BPJS.
- [[11-tax/withholding-tax-management|Withholding Tax Management]] — PPh 22/23/26, e-Bupot, gross-up.
- [[11-tax/corporate-tax-installment-and-prepayment|Corporate Tax Installment and Prepayment]] — kredit pajak dan PPh 25/29.
- [[04-purchasing/purchase-order|Purchase Order]] — titik konfigurasi kode pajak pembelian.

## References

- **UU No. 7 Tahun 1983 tentang Pajak Penghasilan** sebagaimana diubah terakhir dengan UU No. 7 Tahun 2021 (Pasal 21 dan 22). https://peraturan.go.id/id/uu-no-7-tahun-1983 — diakses 26 November 2026.
- **PP No. 58 Tahun 2023** — Tarif Pemotongan PPh Pasal 21. https://peraturan.go.id/id/pp-no-58-tahun-2023 — diakses 26 November 2026.
- **PMK No. 168 Tahun 2023** — Petunjuk Pelaksanaan Pemotongan PPh Pasal 21. https://jdih.kemenkeu.go.id/dok/pmk-168-tahun-2023 — diakses 26 November 2026.
- **PMK No. 81 Tahun 2024** — Ketentuan Perpajakan dalam Rangka Pelaksanaan Coretax (jatuh tempo setor/lapor). https://jdih.kemenkeu.go.id/dok/pmk-81-tahun-2024 — diakses 26 November 2026.
