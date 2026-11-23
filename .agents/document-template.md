# Document Template

Gunakan template ini sebagai starting point. Jangan memaksakan semua section jika tidak relevan.

Heading bagian dalam bahasa Inggris; isi dalam Bahasa Indonesia. Lihat `rules/content-format.md`.

````markdown
---
title: [Title]
---

# [Title]

## Definition

Jelaskan konsep secara singkat: apa, untuk apa, dan batasannya.

## Purpose

Mengapa proses/konsep ini dibutuhkan dalam bisnis.

## Business Process

Jelaskan alur bisnis, termasuk satu exception path.

```text
Step 1
  ↓
Step 2
  ↓
Step 3
```

## Business Rules

Aturan atau kondisi yang menentukan bagaimana proses berjalan:
validasi, otorisasi, toleransi, dan batas.

## Accounting Impact

Jelaskan dampak accounting jika relevan.

| Account | Debit | Credit |
|---|---:|---:|
| Account A | 100 | - |
| Account B | - | 100 |

> Catatan: angka harus diverifikasi, konsisten dengan artikel terkait, dan asumsinya dinyatakan.

## Example

Contoh realistis dengan angka yang konsisten dari awal sampai akhir.
Sebutkan asumsi: mata uang, kuantitas, tarif, periode.

## ERP Implementation

Jelaskan konsep pada level ERP umum: modul, master data, dan titik posting.

## ERP Implementation Comparison

Bandingkan implementasi vendor secara deskriptif. Sertakan versi.

| Aspek | Odoo | ERPNext | Dynamics 365 |
|---|---|---|---|
| Dokumen | ... | ... | ... |
| Titik posting | ... | ... | ... |

Jika hanya satu vendor yang relevan, ganti tabel dengan subsection vendor
(`### Odoo`, `### ERPNext`, `### Dynamics 365`) dan tetap sebutkan versinya.

## Naventra Consideration

Hanya jika relevan. Untuk desain yang detail, pindahkan ke `content/30-naventra/`
dan sisakan satu baris rujukan di sini.

## Related Concepts

- [[folder/article|Label]] — mengapa terkait.

## References

- Penerbit. *Judul*. Nomor/paragraf. URL. Diakses tanggal.
- Regulasi/standar: nomor, tahun, dan tanggal berlaku.
````

## Frontmatter

Wajib: `title`. Opsional: `tags`, `status`, `reviewed`, `software_version`, `sources`.
Schema lengkap ada di `rules/content-format.md`.

## When to Omit Sections

Omit sections that do not add information.

Contoh:

- Konsep accounting sederhana tidak harus memiliki section perbandingan vendor.
- Software-specific note tidak perlu memaksakan business-process explanation jika sudah dirujuk ke konsep utama.
- Naventra section hanya digunakan untuk keputusan atau mapping yang memang berkaitan dengan Naventra.
- `Related Concepts` wajib jika artikel menautkan ke artikel lain; jika tidak ada, hapus.

## Cross-Reference Rule

Jika topik sudah dibahas di dokumen lain:

1. Jangan copy seluruh penjelasan.
2. Link ke dokumen canonical.
3. Tambahkan hanya konteks yang spesifik terhadap topik saat ini.

Tujuannya adalah menjaga satu **canonical explanation** untuk satu konsep.
