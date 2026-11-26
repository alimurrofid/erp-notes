# Remediation Register

Status remediasi temuan `ERP_NOTES_AUDIT.md`, diperbarui **26 November 2026**.

Legenda: **Fixed** = materi sudah diperbaiki dan diverifikasi. **Partial** = sebagian besar dikerjakan, sisa disebutkan. **Invalid** = temuan audit tidak benar. **Blocked** = membutuhkan manusia/pihak luar.

## Ringkasan Status

| Metrik | Sebelum | Sekarang |
|---|---:|---:|
| `check:content` | 0 error | 0 error, 0 warning |
| URL mati | 0 | **0** (12 blocked: ISO/OECD/ILO/APQC) |
| `check:refs:strict` | gagal (193 tanpa identitas, 85 gap bertanda) | **lolos** (0 tanpa identitas, 0 marker) |
| Entri referensi | 1001 | 896 (128 entri tak terverifikasi dihapus/diganti) |
| Artikel | 203 | 208 |
| `npx quartz build` | sukses | sukses |

## Fixed — Akuntansi dan Proses (ACC, INV, FIN, BIZ)

| ID | Perbaikan | File utama |
|---|---|---|
| ACC-16 | Taksonomi kuantitas: Reserved 30 + Allocated 20 = komitmen 50; tidak ada pengurangan ganda | `05-inventory/stock-quantity-and-availability.md` |
| ACC-17 | Saldo proyeksi Minggu 4 = 60 (bukan 10) | `06-manufacturing/mrp-material-requirement-planning.md` |
| ACC-18 | Aturan pemicu MPS dijelaskan: lot dipicu defisit, safety stock adalah target; opsi kebijakan dinyatakan | `06-manufacturing/production-planning.md` |
| ACC-19 | Diskon pelunasan mengurangi DPP dan PPN; kas AP 7.614.600, AR 10.878.000; asumsi dinyatakan | `02-accounting/accounts-payable.md`, `accounts-receivable.md` |
| ACC-20 | IFRS 15.91: kapitalisasi komisi incremental + amortisasi + practical expedient | `03-sales/sales-commission.md` |
| ACC-21 | NRV write-down dan reversal (IAS 2.28–33) dengan contoh dan batas pemulihan | `05-inventory/inventory-costing.md` |
| ACC-22 | Alokasi overhead tetap pada kapasitas normal dan beban idle capacity (IAS 2.12–13) | `05-inventory/inventory-costing.md` |
| ACC-24 | Restatement retrospektif: saldo awal + komparatif, bukan laba berjalan (IAS 8.42) | `02-accounting/period-end-closing.md` |
| ACC-25 | Rasional larangan LIFO = IAS 2.25 (pengukuran), bukan aliran fisik | `02-accounting/inventory-accounting.md`, `05-inventory/inventory-costing.md` |
| INV-01 | Akun bahan baku vs barang dagang vs barang jadi distandarkan | `05-inventory/inventory-integration.md` |
| INV-02 | WIP menerima konversi (tenaga kerja + overhead), bukan hanya bahan | `05-inventory/inventory-integration.md` |
| INV-03 | `Order Qty = Max − Inventory Position` (on-hand + on-order − reserved) | `05-inventory/replenishment-and-stock-planning.md` |
| INV-04 | Diagram kepemilikan tersambung (vendor → consignment in → owned → consignment out → customer; transit → cabang) | `05-inventory/inventory-fundamentals.md` |
| INV-06 | Odoo: `Inventory Frequency` di level lokasi; `Annual Inventory Day and Month` di level settings | `05-inventory/physical-inventory-count.md` |
| INV-07 | Odoo standar = infinite capacity; overload terlihat di Planning; finite penuh butuh modul/kustom | `06-manufacturing/capacity-planning-and-scheduling.md` |
| INV-09 | Kuantitas aktual 102 set konsisten; MPV 2.040.000; MUV 1.000.000 | `06-manufacturing/production-variance-and-performance.md` |
| INV-10 | Total varians mengganti nama menjadi "bahan dan tenaga kerja"; overhead dipisah dengan penjelasan | `06-manufacturing/production-variance-and-performance.md` |
| INV-11 | Odoo tidak menghitung EUP otomatis; EUP manual/kustom | `06-manufacturing/production-costing-and-wip.md` |
| INV-12 | D365 tidak punya `Scrap Journal`; scrap via inventory adjustment/production scrap | `05-inventory/inventory-adjustment.md`, `06-manufacturing/production-output-and-by-product.md` |
| INV-13 | Kapasitas = jam × mesin × efisiensi; utilisasi = output, bukan input | `06-manufacturing/routing-and-work-center.md` |
| INV-15 | Dampak akuntansi batch kedaluwarsa/karantina: NRV dan write-off per batch | `05-inventory/lot-and-serial-number-tracking.md` |
| FIN-03 | Rasio maintenance dihitung dari NBV kanonik Rp37,5 jt (45 bulan) = 49,3% | `08-assets/asset-maintenance-integration.md` |
| FIN-04 | Akumulasi penyusutan Juli 2027 = Rp29.333.333 (16 bulan), NBV Rp90.666.667 | `08-assets/asset-transfer-and-location.md` |
| FIN-13 | Aset temuan = koreksi periode lalu ke saldo awal ekuitas, bukan pendapatan lain-lain | `08-assets/physical-asset-verification.md` |
| FIN-14 | Ambang 15–20% dilabeli heuristik kebijakan; IAS 16 tidak menetapkan persentase | `08-assets/asset-componentization.md` |
| BIZ-02 | SO: tambah `Confirmed/InFulfillment/PartiallyDelivered → Cancelled`, batas pembatalan | `03-sales/sales-order.md` |
| BIZ-03 | PO: tambah `Cancelled`, `ClosedShort`, status `UnderApproval`/`Acknowledged` di enum | `04-purchasing/purchase-order.md` |
| BIZ-04 | MO: tambah `OnHold`, `Scrapped`, dan aturan scrap WIP | `06-manufacturing/manufacturing-order.md` |
| BIZ-05 | Proyek: tambah `Lost`, `Cancelled`, `Terminated` beserta perbedaan | `09-project/project-management-fundamentals.md` |
| BIZ-08 | Ambang persetujuan diskon diselaraskan 5% / 15% | `03-sales/sales-quotation.md` |
| BIZ-09 | Penerimaan barang: quality gate dinyatakan sebagai konfigurasi, bukan default universal | `04-purchasing/goods-receipt-and-service-receipt.md` |
| BIZ-10 | Scrap retur: Dr Scrap Expense / Cr Inventory (bukan kredit COGS) | `03-sales/sales-return-and-credit-note.md` |
| BIZ-11 | Vendor Bill dihapus dari alur outbound | `05-inventory/inventory-picking-and-delivery.md` |
| BIZ-14 | Yield = good output / total input; konsisten dengan scrap rate | `06-manufacturing/production-output-and-by-product.md` |
| BIZ-16 | Jatuh tempo AR dihitung dari document date + terms | `03-sales/accounts-receivable-integration.md` |
| BIZ-17 | Bukan objek PPN vs dibebaskan vs 0% dibedakan; dampak kredit pajak | `03-sales/sales-tax.md` |
| BIZ-01 | **Partial**: Process Contract (Trigger/Validation/Exception/Next) ditambahkan ke 5 proses end-to-end + PROC-01/02. Artikel konsep lain tidak dipaksa memakai pola proses. | `01-business-processes/*` |
| PROC-01 | `Document Lifecycle` kanonik: status, titik posted, aturan transisi | `01-business-processes/document-lifecycle.md` |
| PROC-02 | `Exception Path` kanonik: cancel, short-close, return, reversal, correction, write-off | `01-business-processes/exception-path.md` |

## Fixed — Verifikasi Eksternal (Fase 4)

| ID | Keputusan/verifikasi | Sumber |
|---|---|---|
| FIN-05 | Sejak masa pajak Januari 2025, PPh 21 disetor paling lambat **tanggal 15** (bukan 10); BPJS Ketenagakerjaan juga **tanggal 15**. PPN akhir bulan berikutnya. | PMK 81/2024 Pasal 94; PP 44/2015 Pasal 21 |
| FIN-06 | Konsep *exempt* FLSA dihapus; pengecualian hanya untuk golongan jabatan tertentu yang diatur perjanjian kerja/peraturan perusahaan | PP 35/2021 Pasal 30 jo. 23–24 |
| FIN-07 | Skema 5 hari: lembur setelah 8 jam/hari; hari libur 8 jam pertama 2×, jam ke-9 3×, jam ke-10–12 4× | PP 35/2021 Pasal 21, 31 |
| FIN-08 | Dasar hukum cuti tahunan, melahirkan, cuti pendamping, sakit, keguguran ditambahkan | UU 13/2003 Pasal 79, 82, 93; UU 4/2024 Pasal 4–6 |
| TAX-06 | Plafon upah JP **Rp11.086.300** sejak 1 Maret 2026 (sebelumnya Rp10.547.400); batas kesehatan Rp12 jt terpisah | PP 45/2015 Pasal 29; SE BPJS B/1226/022026; Perpres 82/2018 |
| TAX-07 | Reimbursement dengan bukti ≠ penghasilan; tunjangan tetap = penghasilan; natura diatur PMK 66/2023 | PMK 168/2023; PMK 66/2023 |
| TAX-09 | Batas unggah/approval e-Faktur = **tanggal 20** bulan berikutnya (bukan 15); tanggal 18 adalah target operasional internal | PER-11/PJ/2025 Pasal 44 |
| SW-02 | D365 revenue recognition: halaman Microsoft Learn terverifikasi 200 | `03-sales/revenue-recognition.md` |
| SW-03 | Odoo capacity dikoreksi (infinite by default); D365 Scrap Journal dihapus | `06-manufacturing/capacity-planning-and-scheduling.md`, `05-inventory/inventory-adjustment.md` |

## Fixed — Konten Baru

| ID | Hasil | File |
|---|---|---|
| STR-01 | Artikel implementasi SAP S/4HANA 2025: Universal Journal/ACDOCA, Material Ledger wajib, Actual Costing opsional, titik posting, caveat | `20-software/sap-s4hana/` |
| LRN-03 | **140 soal** (10 per section, 14 section) + kunci terpisah | `00-orientation/section-exercises*.md` |
| PROC-01/02 | Dua artikel proses kanonik | `01-business-processes/document-lifecycle.md`, `exception-path.md` |

## Fixed — Referensi

| Tindakan | Hasil |
|---|---|
| Buku teks | 32 karya diberi ISBN terverifikasi (checksum + record Open Library), tercatat di `audit/isbn-registry.md` |
| Standar | ISO 55000/55001/9001/20400/21500/21502/21511/4217/20022, COSO, IIA, ISACA/COBIT, ASCM/SCOR, APQC, ICC, ILO diberi URL resmi |
| Regulasi | PMK 81/2024, PMK 168/2023, PMK 66/2023, PER-11/PJ/2025, PP 35/2021, PP 44/2015, PP 45/2015, UU 13/2003, UU 4/2024 ditautkan ke sumber primer |
| Vendor | Microsoft Learn, Frappe, Odoo, SAP Help yang dapat diverifikasi dipakai; halaman SAP spesifik untuk topik yang tidak dapat diverifikasi dihapus |
| Entri tak terverifikasi | 128 entri (laporan konsultan, SHRM, CIMA, CFA, AFP, SAP generik) dihapus atau diganti; alasan dicatat di `isbn-registry.md` |
| Tanggal akses | 0 entri ber-URL tanpa tanggal akses |
| Gate | `check:refs:strict` kini juga gagal jika ada entri ber-URL tanpa tanggal akses |

## Fixed — Teknis dan Metadata

| ID | Hasil |
|---|---|
| TECH-02 | `robots.txt` di root (emitter `quartz/plugins/emitters/robots.ts`) dengan URL sitemap |
| TECH-03 | `<link rel="canonical">` ditambahkan; folder index tidak lagi memakai `/index` |
| TECH-06 | `npm audit`: 18 → 8 (0 critical); `npm run check:deps` (gate critical) ditambahkan ke CI; sisa high: `toml` (hanya untuk frontmatter TOML yang tidak dipakai) dan `sharp` (build-time, input tepercaya) |
| TECH-08 | `pageTitleSuffix` aktif dan terverifikasi di output (`<title>… | ERP Notes</title>`) |
| MNT-02 | `check:frontmatter` memvalidasi `status`, `reviewed` (tanggal valid), `sources` (integer), `software_version` (non-kosong), dan bentuk `tags` |
| MNT-04 | Semua entri ber-URL punya tanggal akses; check melaporkan dan menggagalkan strict jika tidak |
| MNT-05 | **Partial**: tanggal "modified" per halaman diambil dari commit git (Quartz `CreatedModifiedDate` priority `git`); commit atomik per artikel dipertahankan. Belum ada UI riwayat commit per file. |

## Invalid

| ID | Alasan |
|---|---|
| ACC-04 | Angka `25.000.000` adalah nominal beban, bukan tarif 25%. Dikoreksi lewat addendum. |

## Blocked — Butuh Manusia

| ID | Alasan |
|---|---|
| K-8 | Review pakar eksternal (konsultan pajak/akuntan) belum dijadwalkan; tidak dapat dilakukan agent. |
| Sign-off | Pemilik proyek harus menandatangani hasil re-audit sebelum materi dipakai untuk keputusan profesional. |
| Odoo 20 claim review | Versi/URL sudah 20.0, tetapi klaim perilaku per halaman 20.0 belum ditinjau ulang satu per satu. |
| Naventra | Baseline desain (130 keputusan) belum diimplementasikan/diuji; status tetap desain. |
| SAP comparison claims | Kolom SAP di tabel perbandingan bersifat deskriptif; halaman Help spesifik tidak dapat diverifikasi untuk setiap topik, sehingga klaim tidak dinaikkan menjadi "terverifikasi". |

## Cara Menutup Register

1. Satu item hanya boleh Fixed jika `check:content`, `check:refs:strict`, `check:urls:strict`, dan build hijau pada commit yang sama.
2. Perubahan tarif/pajak/pengakuan pendapatan selalu ditandai untuk review manusia.
3. Item Blocked tidak boleh ditutup oleh agent; catat siapa yang harus memutuskan.
