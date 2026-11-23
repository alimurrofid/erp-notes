# Review Checklist

Urut dari yang paling merusak ke yang paling kosmetik.

## 1. Akurasi

- [ ] Klaim akuntansi sesuai standar; paragraf disebut.
- [ ] Pengakuan pendapatan pada kontrol berpindah, bukan invoice/collection.
- [ ] Tarif dan ambang batas punya tanggal berlaku dan sumber primer.
- [ ] Perilaku software punya versi dan sumber resmi.
- [ ] Tidak ada angka yang bertentangan dengan artikel terkait.

## 2. Struktur

- [ ] Frontmatter `title` ada dan sama dengan H1.
- [ ] Section sesuai tipe artikel; tidak ada section kosong.
- [ ] Satu konsep, satu artikel kanonik.
- [ ] Artikel konsep tidak memuat skema/desain Naventra.

## 3. Proses

- [ ] Trigger, dokumen, validasi, dampak, next process jelas.
- [ ] Minimal satu exception path.
- [ ] Status dan nomor dokumen konsisten.

## 4. Tautan dan Render

- [ ] Semua wiki link punya target.
- [ ] Tidak ada link di dalam Mermaid atau blok kode.
- [ ] Label Mermaid yang mengandung tanda baca dikutip.
- [ ] `npm run check:content` → 0 error.
- [ ] `npx quartz build` berhasil.

## 5. Bahasa

- [ ] Heading bagian bahasa Inggris; isi Bahasa Indonesia.
- [ ] Istilah konsisten dengan `.agents/terminology.md`.
- [ ] Tidak ada kalimat marketing.
- [ ] Angka dan tanggal mengikuti `../../rules/content-format.md`.

## 6. Bukti

- [ ] Setiap temuan punya file:line.
- [ ] Setiap rekomendasi konkret.
- [ ] Bagian yang belum dibaca disebutkan.
