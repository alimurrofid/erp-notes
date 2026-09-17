# Document Template

Gunakan template ini sebagai starting point. Jangan memaksakan semua section jika tidak relevan.

```markdown
# [Title]

## Definition

Jelaskan konsep secara singkat.

## Purpose

Mengapa proses/konsep ini dibutuhkan dalam bisnis.

## Business Process

Jelaskan alur bisnis.

```text
Step 1
  ↓
Step 2
  ↓
Step 3
```

## Business Rules

Jelaskan aturan atau kondisi yang menentukan bagaimana proses berjalan.

## Accounting Impact

Jelaskan dampak accounting jika relevan.

Contoh:

| Account | Debit | Credit |
|---|---:|---:|
| Account A | 100 | - |
| Account B | - | 100 |

> Catatan: contoh harus diverifikasi dan sesuai asumsi.

## Example

Gunakan contoh realistis dengan angka yang konsisten.

## ERP Implementation

Jelaskan konsep pada level ERP umum.

## Odoo Implementation

Hanya jika relevan. Sertakan versi jika behavior version-dependent.

## ERPNext Implementation

Hanya jika relevan. Sertakan versi jika behavior version-dependent.

## Dynamics 365 Implementation

Hanya jika relevan. Sertakan versi jika behavior version-dependent.

## Naventra Consideration

Hanya jika relevan.

## References

- Primary source
- Official documentation
- Secondary source jika diperlukan
```

## When to Omit Sections

Omit sections that do not add information.

Contoh:

- Konsep accounting sederhana tidak harus memiliki Odoo/ERPNext/Dynamics sections.
- Software-specific note tidak perlu memaksakan business-process explanation jika sudah dirujuk ke konsep utama.
- Naventra section hanya digunakan untuk keputusan atau mapping yang memang berkaitan dengan Naventra.

## Cross-Reference Rule

Jika topik sudah dibahas di dokumen lain:

1. Jangan copy seluruh penjelasan.
2. Link ke dokumen canonical.
3. Tambahkan hanya konteks yang spesifik terhadap topik saat ini.

Tujuannya adalah menjaga satu **canonical explanation** untuk satu konsep.
