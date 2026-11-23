# Workflow: Create Article

Membuat satu artikel baru. Untuk memperbarui artikel yang sudah ada, gunakan `revise-article.md`.

## Entry Conditions

- Pengguna meminta artikel/konsep baru.
- Sudah dicek dengan `grep` bahwa belum ada artikel kanonik untuk topik tersebut.

Jika artikel kanonik sudah ada, hentikan workflow ini dan pindah ke `revise-article.md`.

## Scope

Satu file di `content/`. Jika permintaan mencakup beberapa artikel, pecah menjadi beberapa eksekusi.

## Context Loading

1. `.agents/rules/domain.md`
2. `.agents/rules/writing-style.md`
3. `.agents/rules/content-format.md`
4. `.agents/document-template.md`
5. `.agents/references/scenario-register.md` (jika memakai angka contoh)

Skill: `erp-article`.

## Sequence

1. **Cek duplikasi.** `grep` istilah utama di `content/`. Catat file terdekat.
2. **Tentukan tipe.** concept / process / software / Naventra.
3. **Tentukan lokasi.** Folder sesuai domain; nama file kebab-case.
4. **Kumpulkan angka.** Pakai register; jangan membuat skenario baru.
5. **Tulis isi.** Heading Inggris, prosa Indonesia.
6. **Tulis referensi.** URL/standar + tanggal; jika tidak ada, penanda belum terverifikasi.
7. **Tautkan.** Minimal ke index section dan satu artikel terkait.
8. **Perbarui index section** agar file baru dapat dicapai.
9. **Jalankan validasi.**

```bash
npm run check:content
npx quartz build
```

## Decision Gates

| Kondisi | Aksi |
|---|---|
| Artikel memuat jurnal, valuasi, pendapatan, atau pajak | Jalankan skill `accounting-validation` sebelum final |
| Klaim perilaku software | Wajib versi + dokumentasi resmi |
| Klaim tarif/regulasi | Wajib tanggal berlaku + sumber; jika tidak ada, tandai dan hapus angka |
| Topik tumpang tindih dengan artikel lain | Tautkan, jangan duplikasi |

## Human Approval

Wajib ditandai, bukan difinalkan sendiri:

- tarif atau dasar pengenaan pajak;
- kebijakan pengakuan pendapatan;
- angka yang mengubah laporan keuangan contoh.

## Completion Criteria

- [ ] Frontmatter valid; H1 ada.
- [ ] Section sesuai tipe; tidak ada section kosong.
- [ ] File dapat dicapai dari index section.
- [ ] `npm run check:content` → 0 error.
- [ ] `npx quartz build` berhasil.
- [ ] Laporan menyebut file baru, sumber, dan ketidakpastian.
