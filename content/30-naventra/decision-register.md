---
title: Naventra Decision Register
---

# Naventra Decision Register

## Definition

Register induk keputusan desain Naventra. Setiap keputusan punya ID `NAV-D-xxx`, sumber konsep, requirement terkait, dan status. Detail teks keputusan ada di halaman per domain; halaman ini menjaga agar tidak ada ID hilang atau ganda.

## Ringkasan per Domain

| Domain | Halaman | Rentang ID | Jumlah | Status |
|---|---|---|---:|---|
| Konsep dan purchasing | [[30-naventra/design-concepts\|Design Concepts]] | NAV-D-001…011 | 11 | Adopted |
| Inventory | [[30-naventra/design-inventory\|Design Inventory]] | NAV-D-012…028 | 17 | Adopted |
| Manufacturing | [[30-naventra/design-manufacturing\|Design Manufacturing]] | NAV-D-029…045 | 17 | Adopted |
| Finance | [[30-naventra/design-finance\|Design Finance]] | NAV-D-046…061 | 16 | Adopted |
| Assets | [[30-naventra/design-assets\|Design Assets]] | NAV-D-062…077 | 16 | Adopted |
| Project | [[30-naventra/design-project\|Design Project]] | NAV-D-078…094 | 17 | Adopted |
| HR | [[30-naventra/design-hr\|Design HR]] | NAV-D-095…112 | 18 | Adopted |
| Tax | [[30-naventra/design-tax\|Design Tax]] | NAV-D-113…130 | 18 | Adopted |
| Sales | [[30-naventra/design-sales\|Design Sales]] | NAV-D-131…147 | 17 | Adopted |
| Accounting | [[30-naventra/design-accounting\|Design Accounting]] | NAV-D-148…164 | 17 | Adopted |
| Processes | [[30-naventra/design-processes\|Design Processes]] | NAV-D-165…171 | 7 | Adopted |
| **Total** | — | — | **171** | — |

ID berikutnya yang tersedia: **NAV-D-172**.

## Status

| Status | Arti |
|---|---|
| **Proposed** | Diusulkan, belum disetujui; jangan dipakai sebagai dasar implementasi |
| **Adopted** | Disetujui sebagai baseline desain |
| **Superseded** | Digantikan keputusan lain; sebut penggantinya |
| **Rejected** | Ditolak; alasan disimpan |

Semua keputusan saat ini `Adopted` sebagai baseline desain, bukan implementasi teruji.

## Requirement Terkait

Requirement fungsional ada di [[30-naventra/requirements\|Naventra Requirements]] (NAV-R-01…18). Setiap keputusan minimal terkait satu requirement; jika belum, tandai sebagai open question, bukan memaksakan mapping.

## Keputusan Terbuka

| # | Pertanyaan | Dampak | Pemilik keputusan |
|---|---|---|---|
| 1 | Multi-entitas: satu database atau satu database per entitas? | Isolasi data, biaya operasional, konsolidasi | Arsitek + pemilik produk |
| 2 | Standard cost didukung sejak versi pertama? | Kompleksitas costing dan varians | Arsitek + akuntan |
| 3 | Migrasi saldo awal tanpa membuka periode lalu? | Cutover dan audit | Implementasi + auditor |
| 4 | Apakah revenue schedule menangani bundling multi-performance obligation? | Pengakuan pendapatan | Akuntan + arsitek |
| 5 | Ambang kapitalisasi komisi (practical expedient) | Laporan keuangan | Akuntan |
| 6 | Integrasi e-Faktur: API Coretax langsung atau PJAP? | Kepatuhan pajak | Tax officer + arsitek |
| 7 | Retensi audit dan data pribadi per yurisdiksi | Kepatuhan | Legal + keamanan |

Keputusan terbuka tidak boleh diisi dengan asumsi di artikel konsep.

## Cara Menambah Keputusan

1. Gunakan ID berikutnya; jangan memakai ulang ID yang sudah ada.
2. Tulis di halaman domain yang sesuai, dengan `Sumber:` ke artikel konsep.
3. Tambahkan baris di tabel traceability halaman domain.
4. Perbarui ringkasan di halaman ini dan, jika perlu, requirement terkait.
5. Jalankan `npm run check:content` dan `npx quartz build`.

## References

1. **COSO** — *Internal Control — Integrated Framework* (2013). https://www.coso.org/guidance-on-ic — diakses 26 November 2026.
2. **IFRS Foundation** — *IFRS 15 Revenue from Contracts with Customers*. https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/ — diakses 26 November 2026.
3. **Microsoft Learn** — *Ledger, subledger, and subledger journal accounting entries overview*. https://learn.microsoft.com/en-us/dynamics365/finance/general-ledger/ledger-subledger — diakses 26 November 2026.
