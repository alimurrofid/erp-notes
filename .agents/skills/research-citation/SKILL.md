---
name: research-citation
description: Mencari, memverifikasi, dan mencatat sumber untuk klaim ERP, akuntansi, pajak, atau perilaku software, lalu menghasilkan daftar referensi yang dapat ditelusuri. Gunakan saat menulis klaim baru, memverifikasi referensi yang sudah ada, memperbaiki tautan mati, atau saat pengguna meminta sumber untuk suatu pernyataan.
---

# Research and Citation

Tujuan: setiap klaim dapat ditelusuri ke sumber primer, atau ditandai belum terverifikasi.

## Input

| Input | Contoh |
|---|---|
| Daftar klaim | "PPN 12% berlaku sejak ...", "Odoo memposting stok saat receipt" |
| Domain | accounting / tax / inventory / manufacturing / software |
| Yurisdiksi dan periode | Indonesia, 2026 |
| Versi software | Odoo 17.0, ERPNext v15 |

Jika domain atau periode tidak jelas, tanyakan sebelum mencari.

## Preconditions

Baca `.agents/sources.md` untuk hierarki otoritas dan `.agents/rules/accounting.md` untuk aturan sitasi.

## Langkah

1. **Klasifikasi klaim.** Regulasi, standar akuntansi, perilaku software, atau proses bisnis.
2. **Pilih sumber sesuai domain.**
   - Regulasi → DJP / Kemenkeu / lembaga resmi.
   - Standar → IFRS Foundation / PSAK-IAI.
   - Software → dokumentasi resmi produk tersebut, versi yang tepat.
   - Proses umum → bandingkan minimal dua sumber resmi.
3. **Ambil sumber primer.** Jangan berhenti di artikel sekunder jika primer tersedia.
4. **Catat bukti.** URL, judul, nomor regulasi/paragraf, tanggal terbit, tanggal diakses, versi.
5. **uji klaim.** Apakah sumber benar-benar menyatakan hal yang diklaim, atau hanya mirip?
6. **Tulis hasil** dalam tabel di bawah. Klaim yang tidak ditemukan sumbernya ditandai, bukan dihilangkan.

## Format Output

```markdown
| Klaim | Sumber | Otoritas | URL/Identitas | Tanggal | Status |
|---|---|---|---|---|---|
| ... | IFRS Foundation | Primer | IAS 2.9 | 2026-11-23 | terverifikasi |
| ... | DJP | Primer | PMK ... | 2026-11-23 | terverifikasi |
| ... | - | - | - | - | belum terverifikasi |
```

## Kriteria Selesai

- [ ] Setiap klaim punya satu baris.
- [ ] Setiap baris punya URL atau identitas standar/regulasi.
- [ ] Tidak ada URL yang dikarang; setiap URL dibuka minimal sekali.
- [ ] Versi software disebut jika klaim bersifat perilaku produk.
- [ ] Klaim yang tidak terverifikasi ditandai di artikel, bukan dibiarkan tanpa penanda.

## Jika Gagal

| Kondisi | Tindakan |
|---|---|
| Sumber di balik paywall | Catat identitas standar + "tidak diverifikasi ulang"; jangan menyalin isi |
| Halaman 404 | Cari arsip resmi atau sumber primer lain; jangan pertahankan URL mati |
| Sumber sekunder satu-satunya | Tandai sebagai sekunder dan turunkan kekuatan klaim |
| Dua sumber bertentangan | Tulis keduanya, sebutkan perbedaannya, jangan pilih diam-diam |

## Jangan

- Mengarang URL, nomor regulasi, atau nomor paragraf.
- Menyitasi blog atau forum untuk klaim regulasi.
- Mengutip dokumentasi versi lama untuk perilaku versi baru.
- Menghapus klaim yang belum terverifikasi tanpa mencatatnya.
