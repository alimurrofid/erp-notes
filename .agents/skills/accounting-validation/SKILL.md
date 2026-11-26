---
name: accounting-validation
description: Memvalidasi jurnal, valuasi persediaan, WIP, pengakuan pendapatan, dan perlakuan pajak dalam artikel ERP Notes, termasuk keseimbangan debit-kredit, sitasi standar, dan tanggal berlaku tarif. Gunakan saat konten memuat journal entry, COGS, valuasi, PPN, PPh, tarif, ambang batas, atau klaim standar akuntansi.
---

# Accounting Validation

Validasi akuntansi yang dapat diperiksa, bukan opini.

## Input

| Input | Wajib | Contoh |
|---|---|---|
| Teks atau file | Ya | tabel jurnal, contoh transaksi |
| Yurisdiksi | Ya | Indonesia |
| Periode | Ya | Januari 2026 |
| Standar acuan | Tidak | IFRS 15, PSAK 72, IAS 2 |

Jika yurisdiksi atau periode tidak disebut, tanyakan. Jangan mengasumsikan.

## Preconditions

`../../rules/accounting.md` dan `../../rules/domain.md`.

## Langkah

1. **Hitung ulang.** Jumlahkan debit dan kredit per tabel. Jangan percaya angka yang tertulis.
2. **Periksa tanda dan posisi.** Aset/liabilitas/ekuitas/pendapatan/beban harus konsisten dengan arah debit-kredit.
3. **Periksa pengakuan.** Pendapatan diakui saat kontrol berpindah; cek bahwa invoicing tidak dilabeli sebagai revenue.
4. **Periksa periode.** Pastikan posting period sesuai peristiwa, bukan tanggal dokumen diterima.
5. **Periksa sitasi.** Setiap klaim standar menyebut standar dan paragraf.
6. **Periksa tarif.** Setiap tarif/ambang punya tanggal berlaku dan sumber; jika tidak, tandai.
7. **Periksa konsistensi lintas artikel.** `grep` angka kunci di `content/`; bandingkan.
8. **Tulis hasil** memakai format di bawah.

## Format Output

```markdown
### Jurnal <ID>
Status: OK | Perlu perbaikan

| Akun | Debit | Kredit | Catatan |
|---|---:|---:|---|

- Total debit/kredit: <angka>
- Temuan: <uraian atau "tidak ada">
- Sumber: <standar + paragraf> / <regulasi + tanggal berlaku>
```

## Pemeriksaan Wajib

- [ ] Debit = kredit untuk setiap tabel.
- [ ] Angka di narasi = angka di tabel = angka di kesimpulan.
- [ ] Tidak ada jurnal yang dikarang tanpa asumsi yang dinyatakan.
- [ ] Pengakuan pendapatan tidak memakai titik invoicing atau collection.
- [ ] Accounting treatment dan tax treatment dipisahkan.
- [ ] Tarif memakai periode berlaku dan sumber primer.
- [ ] Angka konsisten dengan artikel lain di section yang sama.

## Pola Kesalahan yang Sudah Terjadi

| Pola | Periksa |
|---|---|
| Pendapatan diakui saat faktur/penagihan | Cari "saat penagihan", "saat difakturkan", label revenue pada langkah invoice |
| Tarif pajak lama masih dipakai | Bandingkan dengan `content/12-tax/`; cek tahun contoh |
| Beban periode salah | Bandingkan document date, posting date, dan period |
| Nilai persediaan tidak relief penuh | Cocokkan unit cost dengan nilai perolehan termasuk landed cost |
| Total tabel tidak sama dengan narasi | Jumlahkan ulang; jangan percaya total yang ditulis |
| Dua angka berbeda untuk objek yang sama | `grep` nomor dokumen/aset di seluruh `content/` |

## Eskalasi ke Manusia

Tandai dan jangan finalkan jika menyentuh:

- tarif pajak atau dasar pengenaan;
- kebijakan pengakuan pendapatan;
- perubahan angka pada laporan keuangan contoh;
- klaim yang hanya didukung blog atau forum.

## Jika Gagal

| Kondisi | Tindakan |
|---|---|
| Standar tidak dapat diakses | Sebutkan standar yang relevan, tandai paragraf belum terverifikasi |
| Angka tidak dapat direkonsiliasi | Laporkan selisih dan komponennya; jangan menyesuaikan angka agar cocok |
| Konflik lintas artikel | Laporkan; jangan mengubah salah satu tanpa persetujuan |
