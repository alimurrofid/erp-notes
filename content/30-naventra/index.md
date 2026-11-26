---
title: Naventra
---

Keputusan desain (design decisions), requirement mapping, dan implementasi custom ERP Naventra berdasarkan konsep ERP umum.

Status: **baseline desain**. Belum ada implementasi atau pengujian; jangan membaca dokumen di sini sebagai klaim produk yang sudah berjalan.

## Fondasi

- [[30-naventra/requirements|Requirements]] — kebutuhan fungsional `NAV-R` dan traceability.
- [[30-naventra/decision-register|Decision Register]] — daftar induk 171 keputusan, status, dan keputusan terbuka.
- [[30-naventra/functional-design|Functional Design]] — modul, objek, state machine, aturan posting.
- [[30-naventra/technical-design|Technical Design]] — model data, mesin posting, idempotency, audit.
- [[30-naventra/integration-and-api|Integration and API]] — event, outbox, API, error contract.
- [[30-naventra/security-and-roles|Security and Roles]] — peran, pemisahan tugas, kontrol akses.
- [[30-naventra/non-functional-requirements|Non-Functional Requirements]] — target performa, reliabilitas, observability.
- [[30-naventra/test-strategy|Test Strategy]] — unit, integrasi, negatif, rekonsiliasi, UAT.
- [[30-naventra/implementation-notes|Implementation Notes]] — urutan konfigurasi, migrasi, cutover.

## Keputusan per Domain

- [[30-naventra/design-concepts|Design Concepts]] — NAV-D-001…011 (konsep dan purchasing).
- [[30-naventra/design-inventory|Design Inventory]] — NAV-D-012…028.
- [[30-naventra/design-manufacturing|Design Manufacturing]] — NAV-D-029…045.
- [[30-naventra/design-finance|Design Finance]] — NAV-D-046…061.
- [[30-naventra/design-assets|Design Assets]] — NAV-D-062…077.
- [[30-naventra/design-project|Design Project]] — NAV-D-078…094.
- [[30-naventra/design-hr|Design HR]] — NAV-D-095…112.
- [[30-naventra/design-tax|Design Tax]] — NAV-D-113…130.
- [[30-naventra/design-sales|Design Sales]] — NAV-D-131…147.
- [[30-naventra/design-accounting|Design Accounting]] — NAV-D-148…164.
- [[30-naventra/design-processes|Design Processes]] — NAV-D-165…171.

## Batas

- Tidak ada kode, skema fisik, atau hasil uji di repositori ini.
- Angka non-fungsional adalah target desain, bukan hasil pengukuran.
- Keputusan terbuka dicatat di [[30-naventra/decision-register|Decision Register]]; jangan mengisinya dengan asumsi.
