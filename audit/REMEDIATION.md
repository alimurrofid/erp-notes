# Remediation Register

Status remediasi temuan `ERP_NOTES_AUDIT.md`. Diperbarui 24 November 2026: Fase 1 disetujui, kampanye referensi dimulai dari `11-tax`.

Legenda: **Fixed** = materi sudah diperbaiki. **Open** = belum. **Invalid** = temuan audit tidak benar. **Deferred** = butuh keputusan/verifikasi di luar batch ini.

## Fixed

| ID | Perbaikan | File utama |
|---|---|---|
| ACC-01 | Pendapatan diakui saat kontrol berpindah, bukan saat faktur/penagihan | `sales-fundamentals`, `sales-reporting-and-analytics`, `order-to-cash-integration`, `order-to-cash` |
| ACC-02 | Label PPN diselaraskan: 12% statutori, DPP 11/12, beban efektif 11% | `sales-tax`, `purchase-tax`, `prepayment` + 35 file label |
| ACC-03 | Posting date mengikuti periode transaksi, bukan tanggal dokumen diterima | `journal-entry` |
| ACC-05 | Milestone BAST mengakui pendapatan; contract liability hanya untuk tagihan di muka | `project-billing-and-revenue` |
| ACC-07 | Biaya tenaga kerja 91,6 jt; AC 182,6 jt; margin 117,4 jt (39,13%); varians 17,4 jt | 10 file `09-project` |
| ACC-08 / BIZ-13 | Retur melepas persediaan 750k; freight 50k dibebankan | `procure-to-pay-integration` |
| ACC-09 | Uang muka penjualan memisahkan DPP dan PPN | `sales-order` |
| ACC-10 | Scrap 375k; varians tenaga kerja 187,5k; overhead 75k | `production-costing-and-wip` |
| ACC-13 | Saldo akhir rekonsiliasi 85.475.000; nominal auto-match 63% | `07-finance/bank-reconciliation` |
| ACC-14 | GR/IR sebagai utang usaha, bukan provisi IAS 37 | `accounts-payable` |
| ACC-15 | Selisih lebih persediaan sebagai koreksi, bukan pendapatan | `inventory-process` |
| ACC-23 / TAX-08 | Gross-up diberi peringatan; tidak lagi dinyatakan otomatis deductible | `withholding-tax-management` |
| BIZ-12 | Incoterms tidak memindahkan kepemilikan | `purchasing-pricing-and-terms` |
| FIN-02 | Tanda dan label varians COGS diperbaiki | `financial-planning` |
| FIN-12 | Hash contoh diganti penanda ilustrasi | `hr-controls-and-governance` |
| FIN-15 | COSO dan Three Lines Model dipisahkan | `financial-controls` |
| INV-14 | "mikrofonik" → microservice | `shop-floor-execution` |
| TAX-01 / TAX-02 | NSFP manual dan QR diganti alur Coretax | `sales-tax`, `purchase-tax`, AR/AP integration |
| TAX-10 | 51 label "PPN 11%" menjadi "PPN efektif 11%" | 35 file |
| UX-05 / TECH-01 | `locale: id-ID`, `baseUrl` domain benar | `quartz.config.ts` |
| UX-07 | `#INV-…` dan `#LPT-…` dihapus dari prosa | `journal-entry`, `inventory-reservation` |
| UX-02 | Label Mermaid di kutip / tanda baca dihapus | 10 file diagram |

### Fixed pada fase sebelumnya

UX-01, UX-03, UX-06, MNT-01, MNT-03, TECH-07, QW-02, QW-03, QW-04.

## Invalid

| ID | Alasan |
|---|---|
| ACC-04 | Angka `25.000.000` adalah nominal beban, bukan tarif 25%. Dikoreksi lewat addendum. |

## Decided — keputusan Fase 1 (24 November 2026)

Kedelapan item di bawah **sudah diputuskan** pemilik proyek; nilai kanoniknya ada di `.agents/references/scenario-register.md` (D-1…D-8). Status ini **bukan** Fixed: materi belum diubah. Baris dipindahkan ke tabel Fixed hanya setelah batch Fase 2 mengubah artikelnya dan `check:content` + build hijau pada commit yang sama.

| ID | Keputusan | Diterapkan di |
|---|---|---|
| ACC-06 / FIN-10 | Aset 2028: cost model 33 bulan untuk `AST-MAC-2026-0001`; revaluasi memakai `AST-MAC-2026-0002` | `08-assets`, `02-accounting` |
| ACC-11 / FIN-09 | Fixed-price: WIP→COGS per progres; T&M: langsung beban | `09-project`, `02-accounting` |
| ACC-26 | EBT 100 jt kanonik; EBT 15,35 jt = tahun pembanding | `07-finance`, `02-accounting` |
| FIN-11 | Satu COA di `02-accounting/chart-of-accounts.md` | `02-accounting`, `08-assets` |
| BIZ-06 / BIZ-07 | Pola nomor 4 segmen; `PR-2026-09-0041`, `PO-2026-09-0081` | `04-purchasing`, `00-fundamentals` |
| INV-05 / INV-08 | 1 Pack = 6 Unit; cost sheet tunggal di `production-costing-and-wip.md` | `05-inventory`, `06-manufacturing` |
| TAX-04 / TAX-05 | Hapus janji cakupan PPh 21/22/4(2) dari index `02-accounting` dan `04-purchasing` | `02-accounting/index.md`, `04-purchasing/index.md` |
| URUTAN | Kampanye referensi dimulai dari `11-tax` | `audit/LINK-BACKLOG.md` |

## Open — butuh verifikasi eksternal

| ID | Masalah |
|---|---|
| FIN-05 | Tanggal PPh 21 vs BPJS |
| FIN-06 / FIN-07 | Overtime: konsep FLSA dan skema 7–8 jam |
| FIN-08 | Dasar hukum cuti/maternity/sick pay |
| TAX-06 | Plafon BPJS harus bertanggal |
| TAX-07 | Perlakuan pajak reimbursement |
| TAX-09 | Tenggat unggah e-Faktur: legal vs operasional |
| SW-02 / SW-03 | Klaim produk (D365 revenue recognition, Odoo finite capacity/EUP, D365 Scrap Journal) |
| TECH-04 | 44 URL referensi mati |

## Open — konten belum ada

| ID | Kebutuhan |
|---|---|
| STR-01 / SW-01 | Artikel implementasi per produk |
| STR-02 / NAV-01 / NAV-02 / NAV-03 | Requirements, functional, technical, implementation Naventra + traceability |
| LRN-01 … LRN-04 | Learning path, glossary, exercises, capstone |
| PROC-01 / PROC-02 | Document lifecycle dan exception path |
| ACC-16 … ACC-22, ACC-24, ACC-25 | NRV, normal capacity, availability taxonomy, MRP grid, discount VAT, komisi, restatement, LIFO rationale |
| INV-01 … INV-04, INV-06, INV-07, INV-09 … INV-13, INV-15 | Akun bahan baku, WIP conversion, ROP, diagram, UOM, klaim Odoo/D365, kapasitas, yield, traceability |
| FIN-03, FIN-04, FIN-13, FIN-14 | Rasio maintenance, akumulasi penyusutan, prior-period error, threshold komponen |
| BIZ-01 … BIZ-05, BIZ-08 … BIZ-11, BIZ-14 … BIZ-17 | State machine, approval threshold, exception path, status dokumen |
| MNT-02, MNT-04, MNT-05 | Metadata, sumber bertanggal, riwayat commit |
| TECH-02, TECH-03, TECH-06, TECH-08 | robots.txt, canonical, audit dependencies, suffix judul |

## Cara Menutup Register

1. Item "butuh keputusan" sudah ditutup di Fase 1 (lihat tabel Decided); turunkan nilainya ke artikel di Fase 2.
2. Item "verifikasi eksternal" harus disertai sumber dan tanggal; jangan diisi dari ingatan.
3. Item "konten belum ada" dikerjakan per section, bukan sekaligus.
4. Setelah satu item selesai, pindahkan barisnya ke tabel Fixed dan catat tanggal.
