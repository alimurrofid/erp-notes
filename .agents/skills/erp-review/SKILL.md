---
name: erp-review
description: Mereview artikel atau section ERP Notes dan menghasilkan temuan berbukti dengan severity, lokasi file:line, serta rekomendasi. Gunakan saat pengguna meminta audit, review, cek konsistensi, verifikasi klaim, menilai kualitas dokumentasi, atau memeriksa perubahan sebelum dipublikasikan.
---

# ERP Review

Review yang menghasilkan temuan, bukan review yang menghasilkan pujian.

## Input

| Input | Contoh |
|---|---|
| Scope | satu file, satu folder, atau daftar file |
| Fokus (opsional) | akuntansi, tautan, struktur, referensi |
| Baseline (opsional) | commit atau versi sebelumnya |

Jika scope tidak jelas, mulai dari file yang disebut pengguna. Jangan mengaudit seluruh repository kecuali diminta.

## Preconditions

Baca `references/checklist.md`. Untuk temuan akuntansi/pajak, baca juga `../../rules/accounting.md`.

## Langkah

1. Baca file target sepenuhnya. Jangan mengomentari isi yang belum dibaca.
2. Jalankan pemeriksaan deterministik:

   ```bash
   npm run check:content
   npx quartz build
   ```

3. Periksa setiap klaim yang dapat berubah: tarif, tanggal, versi software, nomor regulasi.
4. Bandingkan angka dengan artikel terkait. Konflik lintas artikel adalah temuan, bukan catatan.
5. Tulis temuan dengan format di bawah.
6. Urutkan berdasarkan severity, bukan urutan file.

## Format Temuan

```markdown
### <ID> — <judul singkat>
- Lokasi: content/path/file.md:baris
- Kondisi: kutipan atau angka yang salah
- Masalah: mengapa salah
- Dampak: apa yang dipelajari pembaca secara keliru
- Bukti: hasil grep, hitungan, atau sumber
- Rekomendasi: perbaikan konkret
- Severity: P0 | P1 | P2 | P3
```

Severity: **P0** = menyesatkan konsep/akuntansi/regulasi; **P1** = kontradiksi atau gap struktural; **P2** = konsistensi/metadata; **P3** = polish.

## Kriteria Selesai

- [ ] Setiap temuan punya lokasi file:line.
- [ ] Setiap temuan punya bukti yang dapat direproduksi.
- [ ] Tidak ada temuan tanpa rekomendasi.
- [ ] Tidak ada klaim tentang isi yang tidak dibaca.
- [ ] Daftar perbaikan dipisahkan dari temuan.

## Jika Gagal

| Kondisi | Tindakan |
|---|---|
| Tidak bisa memverifikasi klaim | Tandai `[belum terverifikasi]`, jangan hapus |
| File terlalu besar untuk satu pass | Review per section, catat section yang belum dibaca |
| Ditemukan konflik dengan audit lama | Sebutkan keduanya; jangan menganggap audit lama benar |

## Jangan

- Melaporkan "sudah baik" tanpa menyebut apa yang diperiksa.
- Menyarankan rewrite besar untuk masalah kecil.
- Mengubah file saat mode review tidak meminta perubahan.
