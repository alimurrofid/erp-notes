---
title: Naventra Test Strategy
---

# Naventra Test Strategy

## Definition

Strategi pengujian Naventra dari unit sampai UAT, dengan penekanan pada jurnal, idempotency, periode, dan rekonsiliasi. Dokumen ini merancang pengujian; belum ada hasil eksekusi.

## Piramida Pengujian

| Level | Fokus | Contoh | Bukti |
|---|---|---|---|
| Unit | Aturan posting per peristiwa | GR, bill, delivery, BAST, konsumsi | Test otomatis + jurnal seimbang |
| Integrasi | Lintas modul dan event | PO → GR → bill → payment; SO → DO → invoice → cash | Test end-to-end + event log |
| Kontrak | API/event schema | Payload, versi, idempotency | Contract test |
| Negatif | Penolakan yang benar | Periode terkunci, akun non-daun, dokumen ganda | Error code + audit log |
| Rekonsiliasi | Subledger vs GL | AR/AP/inventory/asset | Laporan selisih nol |
| UAT | Skenario pengguna | Satu siklus penuh tanpa bantuan | Sign-off pengguna |

## Dataset Uji

- Gunakan skenario kanonik PT Maju Bersama: 10 unit Laptop Pro, landed cost Rp500.000, PPN efektif 11%, aset Rp120 juta/60 bulan.
- Sediakan data negatif: pelanggan melewati limit kredit, PO melebihi toleransi, stok negatif, periode tertutup, invoice duplikat.
- Setiap test case menyebut `NAV-R` yang diuji dan `NAV-D` yang menjadi dasar.

## Kasus Wajib

1. **Jurnal seimbang**: setiap posting menghasilkan debit = kredit; tidak ada jurnal satu baris.
2. **Idempotency**: posting/event yang sama dua kali tidak menghasilkan jurnal kedua.
3. **Periode terkunci**: posting ke periode tertutup ditolak dengan kode `PERIOD_LOCKED`.
4. **Akun kontrol**: posting manual ke akun kontrol ditolak.
5. **GR/IR**: saldo nol setelah semua penerimaan ditagih.
6. **Retur**: stok, PPN, dan COGS kembali konsisten; scrap tidak mengkredit COGS dua kali.
7. **Payroll**: PPh 21 dan BPJS dipotong, disetor, dan direkonsiliasi.
8. **Aset**: penyusutan berhenti saat disposal; tidak ada duplikasi jadwal.
9. **Proyek**: pendapatan dan HPP diakui pada periode yang sama.
10. **Rekonsiliasi**: subledger = GL untuk AR, AP, inventory, asset, project.

## UAT dan Kriteria Keluar

- UAT dijalankan pengguna dengan data mirip produksi, tanpa bantuan tim implementasi.
- Kriteria keluar: 0 defect kritis, 0 selisih rekonsiliasi yang tidak dijelaskan, dan satu siklus penuh (PO → produksi → penjualan → penutupan) berhasil.
- Defect yang tersisa harus punya workaround dan disetujui pemilik proses.
- Hasil UAT ditandatangani; tanpa sign-off, go-live ditunda.

## Yang Tidak Dicakup Baseline

- Uji penetrasi eksternal dan sertifikasi keamanan.
- Uji beban skala produksi penuh (target ada di [[30-naventra/non-functional-requirements|NFR]]).
- Uji kepatuhan pajak per yurisdiksi di luar skenario Indonesia.

## References

1. **ISO/IEC/IEEE** — *ISO/IEC/IEEE 29119-1:2022 — Software and systems engineering — Software testing — Part 1: General concepts*. https://www.iso.org/standard/81291.html — diakses 26 November 2026.
2. **COSO** — *Internal Control — Integrated Framework* (2013). https://www.coso.org/guidance-on-ic — diakses 26 November 2026.
3. **IFRS Foundation** — *IAS 2 Inventories*. https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/ — diakses 26 November 2026.
