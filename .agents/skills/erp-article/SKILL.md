---
name: erp-article
description: Menulis atau memperbarui satu artikel di ERP Notes sesuai tipe artikelnya (concept, process, software, Naventra), dengan frontmatter, struktur section, tautan internal, dan referensi yang benar. Gunakan saat pengguna meminta membuat artikel baru, menambah atau memperbarui bagian, menulis ulang penjelasan, atau merapikan artikel ERP.
---

# ERP Article

Prosedur menulis satu artikel. Batas: satu artikel per pemanggilan.

## Input

Wajib diketahui sebelum menulis:

| Input | Contoh | Jika tidak ada |
|---|---|---|
| Topik | "inventory adjustment" | Tanya pengguna |
| Section target | `05-inventory/` | Tentukan dari topik, sebutkan alasannya |
| Tipe artikel | concept / process / software / Naventra | Tentukan dengan tabel di bawah |
| Perubahan yang diminta | "tambah exception path" | Asumsikan artikel baru yang lengkap |

## Preconditions

Baca berurutan, berhenti jika sudah cukup:

1. `../../rules/domain.md`
2. `../../rules/accounting.md` — hanya jika ada jurnal, biaya, pendapatan, atau pajak
3. `../../rules/content-format.md`
4. `../../document-template.md`

Jangan membaca seluruh repository. Maksimal 8 file konten per tugas.

## Langkah

1. **Cari duplikasi.** `grep` istilah utama di `content/`. Jika topik sudah punya artikel kanonik, perbarui artikel itu; jangan buat file baru.
2. **Tentukan tipe.**

   | Tipe | Ciri | Section wajib |
   |---|---|---|
   | Concept | Berlaku lintas software | Definition, Purpose, ERP Implementation, References |
   | Process | Ada alur dan dokumen bisnis | + Business Process, Business Rules, Accounting Impact, Example, Related Concepts |
   | Software | Perilaku satu produk | ERP Implementation Comparison, `software_version`, References |
   | Naventra | Keputusan proyek | Requirement, Design Decision, Trade-off, Traceability |

3. **Kumpulkan angka.** Pakai angka yang sudah ada di artikel terkait. Jangan membuat skenario baru.
4. **Tulis isi** dalam Bahasa Indonesia; heading bagian dalam bahasa Inggris.
5. **Tulis referensi.** Setiap klaim yang dapat berubah butuh sumber primer dan tanggal berlaku.
6. **Tautkan.** Gunakan `[[folder/file|Label]]`; target harus ada.
7. **Verifikasi.**

```bash
npm run check:content
npx quartz build
```

## Kriteria Selesai

- [ ] Frontmatter `title` ada dan deskriptif (bukan slug).
- [ ] Section sesuai tipe; tidak ada section kosong.
- [ ] Setiap klaim standar/tarif punya sumber dan tanggal berlaku.
- [ ] Angka konsisten dengan artikel terkait; tidak ada skenario paralel.
- [ ] Semua link valid; tidak ada link di dalam Mermaid.
- [ ] `npm run check:content` → 0 error.
- [ ] `npx quartz build` berhasil.
- [ ] Laporan menyebut file yang diubah dan perintah yang dijalankan.

## Jika Gagal

| Kondisi | Tindakan |
|---|---|
| Sumber tidak ditemukan | Tandai `> [!warning]`, hapus angka pasti, lanjutkan |
| Angka bertentangan dengan artikel lain | Laporkan konflik; jangan pilih salah satu diam-diam |
| Topik sudah ada | Perbarui artikel kanonik, jangan buat duplikat |
| Build gagal | Perbaiki penyebab; jangan melaporkan selesai |

## Jangan

- Membuat section kosong untuk memenuhi template.
- Menambahkan skema database Naventra ke artikel konsep.
- Menyalin seluruh penjelasan dari artikel lain.
