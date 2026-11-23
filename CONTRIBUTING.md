# Contributing

Panduan untuk kontributor manusia. Aturan untuk AI agent ada di `AGENTS.md`.

## Sebelum Menulis

1. Cari topik di `content/`. Jika sudah ada artikel kanonik, perbarui artikel itu.
2. Tentukan tipe: concept, process, software, atau Naventra.
3. Baca `.agents/rules/domain.md` dan `.agents/rules/content-format.md`.

## Menambah Artikel

1. Buat file di folder domain yang sesuai, lowercase kebab-case.
2. Tambahkan frontmatter:

```markdown
---
title: Nama Halaman
---
```

3. Ikuti `.agents/document-template.md`. Hapus section yang tidak relevan.
4. Tautkan dari index section agar halaman dapat dicapai.
5. Tambahkan referensi dengan URL atau nomor standar/regulasi.

## Standar Isi

- Heading bagian bahasa Inggris; isi Bahasa Indonesia.
- Konsep umum dipisahkan dari perilaku software.
- Perilaku software wajib menyebut versi dan sumber resmi.
- Tarif, ambang batas, dan tenggat wajib menyebut tanggal berlaku dan sumber primer.
- Jangan mengarang sumber, nomor regulasi, atau perilaku produk.
- Jika belum terverifikasi, gunakan:

```markdown
> [!warning]
> Informasi ini belum diverifikasi terhadap sumber resmi.
```

## Verifikasi

```bash
npm run check:content
npx quartz build
```

`check:content` menjalankan: link, frontmatter, Mermaid, struktur, dan laporan referensi.

## Review

- Perubahan tarif, pajak, atau kebijakan pengakuan pendapatan wajib ditinjau manusia.
- Satu commit untuk satu topik.
- Jangan mencampur perbaikan konten dengan perubahan konfigurasi AI.

## Struktur Repository

```text
content/            artikel
.agents/rules/      aturan per domain
.agents/skills/     prosedur
.agents/workflows/  alur kerja multi-langkah
.agents/scripts/    pemeriksaan deterministik
.agents/references/ register skenario
```

## Jangan

- Mengganti nama file yang sudah ditautkan tanpa memperbaiki semua tautan.
- Menambah key frontmatter baru tanpa memperbarui aturan dan script.
- Memakai `draft: true` — Quartz menghapus halaman tersebut dari build.
