# Content Format Rules

Aturan format yang dapat diperiksa secara deterministik.

## Frontmatter

Setiap file di `content/` wajib memiliki frontmatter:

```markdown
---
title: Nama Halaman
---
```

Field opsional: `tags`, `status`, `reviewed`, `software_version`, `sources`.

| Field | Nilai | Catatan |
|---|---|---|
| `title` | teks | Wajib. Deskriptif, bukan slug. Boleh lebih pendek dari H1. |
| `tags` | daftar | Topik, bukan nama dokumen. |
| `status` | `draft` / `reviewed` / `verified` | Status review. |
| `reviewed` | `YYYY-MM-DD` | Tanggal review terakhir. |
| `software_version` | teks | Wajib jika klaim bersifat version-dependent. |
| `sources` | angka | Jumlah referensi yang punya URL/regulasi. |

Jangan menambah field di luar daftar ini tanpa memperbarui aturan dan script.

## Bahasa Heading

Keputusan: **heading bagian dalam bahasa Inggris, isi dalam Bahasa Indonesia.**

Alasan: 164 artikel sudah memakai `## Definition` / `## References`, sedangkan 18 memakai versi Indonesia. Memilih mayoritas menghindari migrasi 182 file.

- Heading: `Definition`, `Purpose`, `Business Process`, `Business Rules`, `Accounting Impact`, `Example`, `ERP Implementation`, `ERP Implementation Comparison`, `Naventra Consideration`, `References`.
- Judul (H1) dan isi: Bahasa Indonesia, kecuali istilah teknis.
- Jangan mencampur `## Referensi` dan `## References` dalam satu artikel.

## Struktur Artikel

Gunakan `.agents/document-template.md`. Pilih tipe:

| Tipe | Section wajib |
|---|---|
| Concept | Definition, Purpose, ERP Implementation, References |
| Process | Definition, Business Process, Business Rules, Accounting Impact, Example, Related Concepts, References |
| Software | Definition, ERP Implementation Comparison, software_version, References |
| Naventra | Requirement, Design Decision, Trade-off, Traceability |

Hapus section yang tidak relevan daripada mengisinya dengan konten generik.

## Link

- Gunakan wiki link dengan label eksplisit: `[[folder/file|Label]]`.
- Target harus ada. Jalankan `npm run check:links`.
- Jangan menulis `#` di dalam prosa (Quartz membuat tag palsu). Tulis `No. INV-2026-0042`.
- Jangan memakai wiki link di dalam blok kode atau label Mermaid; keduanya tidak dirender.

## Mermaid

- Satu diagram per konsep; jangan menduplikasi diagram yang sama di beberapa artikel.
- Label yang mengandung `(`, `)`, `:`, `/`, `&`, atau `<br/>` harus dikutip: `A["Teks (catatan)"]`.
- Label edge juga harus dikutip: `A -->|"Lolos (100%)"| B`.
- Maksimal ~15 node per diagram; pecah jika lebih.
- Verifikasi render sebelum menyatakan selesai.

## Penamaan File

- Lowercase kebab-case: `inventory-costing.md`.
- Prefix angka mengikuti folder: `06-inventory/`.
- Satu konsep, satu file. Jangan membuat `-v2`, `-final`, atau `-new`.

## Nomor Dokumen

- Satu skema per section, dipakai konsisten dari awal sampai akhir rantai.
- Format: `<JENIS>-<TAHUN>-<URUT>` mis. `PO-2026-0042`.
- Jangan memakai dua nomor berbeda untuk dokumen yang sama dalam satu artikel.

## Angka dan Tanggal

- Rupiah tanpa spasi: `Rp1.000.000`.
- Ribuan memakai titik, desimal memakai koma: `1.500.000`, `11,5%`.
- Tanggal ditulis lengkap: `1 Januari 2025`, bukan `01/01/25`.
- Persentase menempel pada angka: `11%`, bukan `11 %`.

## Referensi

Setiap entri referensi wajib memuat salah satu identitas yang dapat diverifikasi:

1. **URL** ke dokumen resmi, disertai tanggal akses.
2. **DOI** atau **ISBN** untuk buku/publikasi cetak.
3. **Nomor standar/regulasi** (mis. `IAS 2`, `PSAK 72`, `PMK 131/PMK.03/2024`, `UU 28/2007`) bila dokumen hanya tersedia cetak.

Format minimum:

```text
Penerbit. Judul. Nomor/paragraf. URL. Diakses <tanggal>.
```

Aturan:

- Judul saja tanpa URL/DOI/ISBN/nomor standar **tidak cukup**.
- URL harus pernah dibuka dan statusnya 2xx; jangan menulis URL yang belum dicek.
- Jika dokumen hanya tersedia cetak, tulis nomor standar/ISBN dan label `cetak`.
- Jika tidak ada sumber yang dapat diverifikasi, tandai `[belum terverifikasi]`; jangan mengarang URL.
- Validasi dengan `npm run check:refs` dan `npm run check:urls`.
