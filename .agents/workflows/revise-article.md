# Workflow: Revise Article

Memperbarui artikel yang sudah ada tanpa menghapus informasi yang masih valid.

## Entry Conditions

- Pengguna meminta perubahan pada artikel tertentu, atau
- Ditemukan kesalahan/klaim usang saat review.

## Scope

Satu artikel, kecuali perubahan angka kanonik yang mengharuskan pengecekan lintas artikel.

## Context Loading

1. `.agents/rules/domain.md` (bagian Memperbarui Dokumen)
2. `.agents/rules/writing-style.md`
3. `.agents/rules/content-format.md`
4. File target, dibaca seluruhnya.

Skill: `erp-article`. Untuk perubahan angka: `accounting-validation`.

## Sequence

1. **Baca seluruh file.** Jangan mengedit sebagian tanpa membaca konteksnya.
2. **Klasifikasi klaim yang akan diubah.**
   - fakta stabil → cukup perbaiki kalimat;
   - fakta berubah → cek tanggal berlaku + sumber;
   - angka contoh → cek register dan artikel terkait.
3. **Cari dampak.** `grep` angka, nomor dokumen, atau istilah yang diubah di seluruh `content/`.
4. **Edit minimal.** Pertahankan struktur, heading, dan informasi valid.
5. **Perbarui referensi** jika klaim berubah.
6. **Perbaiki link** yang menyentuh bagian yang diubah.
7. **Validasi.**

```bash
npm run check:content
npx quartz build
```

## Decision Gates

| Kondisi | Aksi |
|---|---|
| Perubahan mengubah angka yang dipakai artikel lain | Perbarui semuanya atau laporkan konflik |
| Perubahan menghapus klaim | Pastikan klaim itu salah, bukan hanya tidak relevan |
| Perubahan pada bagian akuntansi/pajak | Jalankan `accounting-validation` |
| Rewrite besar terasa perlu | Hentikan; usulkan rencana, jangan eksekusi diam-diam |

## Human Approval

Sama dengan `create-article.md`. Perubahan tarif, kebijakan pendapatan, atau angka laporan keuangan wajib ditandai.

## Completion Criteria

- [ ] Tidak ada informasi valid yang hilang tanpa alasan.
- [ ] Angka konsisten dengan artikel terkait.
- [ ] Referensi diperbarui.
- [ ] `npm run check:content` → 0 error.
- [ ] `npx quartz build` berhasil.
- [ ] Laporan menyebut alasan perubahan dan konflik yang tersisa.
