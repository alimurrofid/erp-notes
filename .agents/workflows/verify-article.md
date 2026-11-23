# Workflow: Verify Article

Review satu artikel atau satu section sebelum dipublikasikan, atau saat diminta audit.

## Entry Conditions

- Pengguna meminta review/audit.
- Sebelum merge perubahan besar.
- Setelah perubahan angka atau klaim regulasi.

## Scope

Satu file atau satu section. Untuk audit seluruh repository, pecah per section dan laporkan per batch.

## Context Loading

1. `.agents/skills/erp-review/SKILL.md`
2. `.agents/skills/erp-review/references/checklist.md`
3. `.agents/rules/accounting.md` — jika ada akuntansi/pajak
4. `.agents/references/scenario-register.md` — jika ada angka contoh

Skill: `erp-review`.

## Sequence

1. Baca file target sepenuhnya.
2. Jalankan pemeriksaan deterministik.

```bash
npm run check:content
npx quartz build
```

3. Periksa klaim yang dapat berubah: tarif, tanggal, versi, nomor regulasi.
4. Bandingkan angka dengan register dan artikel terkait.
5. Periksa kelengkapan proses: trigger, dokumen, validasi, exception, next process.
6. Tulis temuan dengan format `erp-review` (file:line, bukti, dampak, rekomendasi, severity).
7. Pisahkan temuan dari daftar perbaikan.

## Decision Gates

| Kondisi | Aksi |
|---|---|
| Ada temuan P0 | Jangan nyatakan artikel siap; blok publikasi |
| Temuan hanya P3 | Boleh lanjut, catat sebagai backlog |
| Klaim tidak dapat diverifikasi | Tandai `[belum terverifikasi]`, jangan hapus |
| Konflik dengan audit lama | Periksa ulang; audit lama tidak otomatis benar |

## Human Approval

Temuan P0 pada akuntansi/pajak wajib ditinjau manusia sebelum diperbaiki.

## Completion Criteria

- [ ] Setiap temuan punya file:line dan bukti.
- [ ] Setiap temuan punya rekomendasi.
- [ ] Bagian yang belum dibaca disebutkan.
- [ ] Pemeriksaan deterministik dijalankan dan hasilnya dilaporkan.
