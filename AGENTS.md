# AGENTS.md

Panduan operasional AI agent untuk repository `erp-notes`.

## Tujuan

- Personal knowledge base ERP: konsep, proses bisnis, akuntansi, dan implementasi.
- Knowledge harus tetap benar ketika dibandingkan dengan Odoo, ERPNext, Dynamics 365, SAP, atau Naventra.
- Urutan yang diutamakan: konsep → proses → aturan → dampak akuntansi → software → proyek.
- Ukuran keberhasilan adalah akurasi dan konsistensi, bukan jumlah dokumen.

## Non-Negotiables

1. **Fakta yang berubah butuh tanggal dan sumber.**
   Tarif, ambang batas, tanggal jatuh tempo, versi software, dan nomor regulasi wajib menyebut periode berlaku dan sumber primer.
   Tanpa sumber: tandai `> [!warning]` dan jangan cantumkan angka pasti.

2. **Pajak punya satu sumber.**
   `content/12-tax/` adalah sumber kanonik untuk PPN, PPh, dan Coretax.
   Artikel lain menautkan ke sana dan tidak mengulang tarif.

3. **Akuntansi bersumber dari standar, bukan software.**
   Sitasi IFRS/IAS/PSAK beserta paragraf. Dokumentasi ERP hanya menjelaskan implementasi.

4. **Satu skenario kanonik.**
   Jangan membuat perusahaan, chart of accounts, atau skema nomor dokumen baru.
   Jika angka di dua artikel berbeda, laporkan konflik; jangan menambah versi ketiga.

5. **Konsep bukan implementasi.**
   Perilaku vendor hanya di bagian implementasi, dengan versi dan sumber resmi.
   Naventra hanya di `content/30-naventra/` atau satu baris rujukan dari artikel konsep.

6. **Tidak ada link rusak dan tidak ada scaffolding.**
   Setiap link harus resolve. Setiap file baru harus dapat dicapai dari index section-nya.

7. **Selesai berarti terbukti.**
   Laporkan file yang diubah dan perintah yang dijalankan beserta hasilnya.
   Jangan menyatakan selesai jika check atau build gagal.

## Routing

`.agents/` tidak dimuat otomatis oleh semua tool. Baca hanya file yang disebut di tabel ini.

| Tugas | Muat berurutan | Skill |
|---|---|---|
| Menulis atau memperbarui artikel | `.agents/rules/domain.md` → `.agents/rules/writing-style.md` → `.agents/rules/content-format.md` → `.agents/document-template.md` | `erp-article` |
| Jurnal, valuasi, COGS, WIP, pendapatan | tambah `.agents/rules/accounting.md` | `accounting-validation` |
| Pajak, tarif, tanggal berlaku | `.agents/rules/tax-id.md` + `.agents/rules/accounting.md` (Pajak) + `content/12-tax/` | `accounting-validation` |
| Review, audit, cek konsistensi | rule yang relevan + `.agents/skills/erp-review/references/checklist.md` | `erp-review` |
| Perilaku software tertentu | `.agents/rules/domain.md` (bagian Software) + dokumentasi resmi vendor | `erp-article` |
| Desain Naventra | `.agents/rules/domain.md` (bagian Naventra) + `content/30-naventra/` | `erp-article` |
| Mengubah aturan atau skill | `AGENTS.md` + `.agents/rules/*` + jalankan check | `erp-review` |

Referensi pendukung, hanya jika diperlukan:

- `.agents/terminology.md` — satu-satunya daftar istilah.
- `.agents/sources.md` — registry sumber dan otoritasnya.
- `.agents/references/scenario-register.md` — angka dan nomor dokumen kanonik, plus konflik yang belum selesai.

Untuk tugas multi-langkah, mulai dari workflow terkait di `.agents/workflows/`:
`create-article.md`, `revise-article.md`, `verify-article.md`, `maintain-ai-config.md`.

## Konteks

- Jangan membaca seluruh repository.
- Mulai dari file target dan index section-nya.
- Maksimum 8 file konten per tugas; jika perlu lebih, pecah tugasnya.
- Gunakan `grep` untuk mencari angka, nomor dokumen, atau istilah, bukan membaca semua artikel.
- Baca artikel kanonik yang ditautkan, bukan seluruh folder.

## Tipe Artikel

| Tipe | Section wajib |
|---|---|
| Concept | Definition, Purpose, ERP Implementation, References |
| Process | + Business Process, Business Rules, Accounting Impact, Example, Related Concepts |
| Software | Definition, ERP Implementation Comparison, `software_version`, References |
| Naventra | Requirement, Design Decision, Trade-off, Traceability |

Detail dan aturan omit ada di `.agents/document-template.md`.

## Definition of Done

- [ ] `npm run check:content` → 0 error.
- [ ] `npx quartz build` berhasil.
- [ ] Setiap klaim yang dapat berubah punya sumber dan tanggal berlaku.
- [ ] Perubahan tarif, pajak, atau kebijakan pengakuan pendapatan ditandai untuk review manusia.
- [ ] Frontmatter valid, link valid, tidak ada link di dalam Mermaid.
- [ ] Tidak ada duplikasi konsep; artikel lain menautkan ke artikel kanonik.
- [ ] Laporan menyebut file yang diubah, perintah yang dijalankan, dan ketidakpastian yang tersisa.

## Maintenance

- Aturan domain tinggal di `.agents/rules/`; prosedur tinggal di `.agents/skills/`.
- Jika satu kesalahan terjadi berulang, perbarui rule-nya, jangan menambah instruksi di file ini.
- Tambahkan instruksi ke file ini hanya jika berlaku untuk semua tugas.
