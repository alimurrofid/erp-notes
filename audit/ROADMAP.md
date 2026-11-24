# Roadmap Eksekusi Otonom — ERP Notes

**Dibuat:** 24 November 2026, mulai dari commit `fa1788a`.
**Status:** dokumen rencana kerja aktif. Ini **bukan** sumber kebenaran untuk isi materi — sumber kebenaran konten tetap AGENTS.md, `.agents/rules/*`, dan standar/regulasi yang disitasi. Fase 0 selesai; eksekusi berlanjut dari fase berikutnya.

---

## 1. Cara Memakai Dokumen Ini (untuk sesi AI baru)

Sesi AI yang mengambil alih proyek ini wajib membaca, berurutan:

1. `AGENTS.md` — aturan operasional dan routing skill.
2. Dokumen ini (`audit/ROADMAP.md`) — rencana dan keputusan yang sudah terkunci.
3. `audit/REMEDIATION.md` — register status per temuan (Fixed/Open/Invalid).
4. `audit/LINK-BACKLOG.md` — register kampanye referensi (untuk Fase 3).
5. Register terkait batch yang dikerjakan hari itu.

Jangan memuat `audit/ERP_NOTES_AUDIT.md` seluruhnya kecuali diminta; itu laporan historis per 23 November 2026 dan temuan-temuannya sudah tercermin di `REMEDIATION.md`.

## 2. Register — Sumber Status

| Register | Fungsi | Kapan diupdate |
|---|---|---|
| `audit/REMEDIATION.md` | Status seluruh temuan audit (Fixed/Open/Invalid) | Setiap kali satu item selesai |
| `audit/LINK-BACKLOG.md` | Baseline & urutan batch kampanye referensi | Setelah tiap batch Fase 3 |
| `.agents/references/scenario-register.md` | Angka kanonik PT Maju Bersama + konflik belum selesai | Saat Fase 1 diputuskan, lalu tiap turunannya |
| Dokumen ini | Fase, keputusan terkunci, protokol batch | Saat fase selesai / keputusan baru |

Aturan: satu item hanya boleh ditandai Fixed setelah `npm run check:content` dan build hijau pada commit yang sama.

## 3. Keputusan Terkunci Pengguna (24 November 2026)

Keputusan berikut sudah disetujui pemilik proyek dan **tidak perlu ditanyakan ulang**:

| # | Keputusan |
|---|---|
| K-1 | Seluruh referensi Odoo naik ke versi 20.0 (versi terkini per 24 Nov 2026); perbedaan perilaku antar versi dicek ulang terhadap artikel. |
| K-2 | URL mati: cari padanan URL resmi; jika benar-benar tidak ada, hapus referensi dan tandai materi butuh sumber. |
| K-3 | Referensi tanpa URL (±730 entri): dilengkapi satu per satu, mulai dari folder yang paling kritis. |
| K-4 | Referensi homepage-only (CIPS/DJP/SAP): diganti dokumen spesifik. CIPS diganti sumber lain yang dapat diverifikasi (mis. ISO/APICS) karena memblokir akses otomatis. |
| K-5 | 17 file 05-inventory dicommit apa adanya (URL ada, versi Odoo masih 17, tanggal akses warisan kampanye 23 Nov); dibenarkan dalam Fase 3. |
| K-6 | Pemilik proyek adalah **pembelajar**, bukan pakar: delegasikan keputusan desak ke rekomendasi agent; keputusan akuntansi wajib bersitasi paragraf standar; klaim pajak kontensius diberi label peringatan, bukan "diselesaikan" dengan opini. |
| K-7 | Lapisan pembelajaran (learning path, latihan, glosarium) adalah prioritas inti, bukan pelengkap. |
| K-8 | Review pakar eksternal (konsultan pajak/akuntan) direncanakan sekali sebelum materi dipakai untuk keputusan profesional. |

Batasan delegasi (K-6): agent tidak pernah mengarang judul/penulis/URL; temuan yang tidak bisa diverifikasi ditandai `[belum terverifikasi]`; perubahan tarif/pajak/pengakuan pendapatan selalu ditandai untuk review manusia.

## 4. Fase 0 — Kunci Baseline ✅ SELESAI

Semua validasi hijau (`check:content` 0 error; `check:urls` exit 0; `npx quartz build` sukses; working tree bersih).

| Commit | Isi |
|---|---|
| `76e9ee4` | Aturan referensi: identitas terverifikasi wajib |
| `5d5c2f9` | `check-urls.mjs` + wiring CI (validate & deploy) |
| `a91e0fc` | Register backlog kampanye referensi |
| `7b73435` | 04-purchasing naik ke Odoo 20 |
| `fa1788a` | 05-inventory: URL referensi ditambahkan (versi menyusul naik di Fase 3) |

Debris `scratch/` (62 file hasil scraping) dihapus permanen sebelum Fase 0.

## 5. Fase 1 — Keputusan Kebijakan ✅ SELESAI (24 November 2026)

Disetujui pemilik proyek 24 November 2026. Nilai kanonik ditulis ke `.agents/references/scenario-register.md` (D-1…D-8); status per item ada di `REMEDIATION.md` bagian **Decided**. Item **belum** berstatus Fixed karena artikelnya baru diubah di Fase 2.

| ID | Keputusan | Rekomendasi yang disetujui |
|---|---|---|
| ACC-06/FIN-10 | Basis jadwal aset AST-MAC-2026-0001 di 2028 | Cost model + skedul 33 bulan (akum. 55 jt, nilai buku 65 jt, residu 10 jt) kanonik; artikel revaluasi memakai `AST-MAC-2026-0002` |
| ACC-11/FIN-09 | Material proyek: beban vs WIP | WIP→COGS per progres untuk fixed-price; langsung beban untuk time-material/cost-reimbursable |
| ACC-26 | Dua skenario tahunan (EBT 15,35 jt vs 100 jt) | EBT 100 jt kanonik; 15,35 jt menjadi tahun pembanding |
| FIN-11 | Dua COA untuk mesin yang sama | COA `02-accounting/chart-of-accounts.md` kanonik; `08-assets` menyesuaikan |
| BIZ-06/07 | Baseline stok & nomor dokumen P2P | Pola 4 segmen; `PR-2026-09-0041` dan `PO-2026-09-0081` kanonik |
| INV-05 | Faktor konversi UOM | 1 Pack = 6 Unit; artikel pemakai "4" dikoreksi |
| INV-08 | Cost sheet MO-2026-0042 | `production-costing-and-wip.md` pemilik tunggal |
| TAX-04/05 | Index menjanjikan cakupan PPh yang tidak ada | Janji dihapus dari `02-accounting` dan `04-purchasing`; perluasan materi masuk Fase 5 |
| URUTAN | Urutan batch kampanye referensi | `11-tax` didahulukan, lalu 00→05, lalu 06+ |

## 6. Fase 2 — Satu Kebenaran Akuntansi (AI otonom)

Prasyarat: Fase 1 ✅ disetujui 24 November 2026. Langkah:

1. Tulis `canonical-dataset.md` (entity, COA, harga satuan, stok awal, tabel nomor dokumen, EBT/PKP) — semua angka turunannya dipindahkan dari scenario-register.
2. Turunkan angka ke file-file: item ACC-16…25, INV-01…04/06/07/09…13/15, FIN-03/04/13/14, BIZ-01…05/08…11/14…17 (lihat `REMEDIATION.md` untuk lokasi).
3. Batch per folder, maks 8 file konten per sesi.

## 7. Fase 3 — Referensi & Versi (AI otonom) 🚧 BERJALAN

Urutan (dikunci Fase 1): `11-tax` → `00`–`05` → `06`–`30`. Batch 1 (`11-tax`, 8 file) dieksekusi 24 November 2026. Per batch:

- Ganti seluruh referensi Odoo 17 → 20.0 (baca halaman tujuan; klaim yang tidak lagi didukung halaman baru = temuan, ditandai, bukan diam-diam direvisi). **Versi: selesai 24 November 2026 (0 sisa). Verifikasi klaim perilaku terhadap halaman 20.0: belum.**
- Ganti 44 URL mati dengan padanan resmi (Microsoft Learn & Frappe merestrukturisasi URL — cari lokasi baru; jangan menebak).
- Ganti homepage-only: DJP → naskah peraturan (JDIH/peraturan.go.id + nomor + tanggal); SAP → halaman Help spesifik; CIPS → sumber terverifikasi.
- Lengkapi referensi tanpa URL (folder 06+ dan 11-tax).
- Stempel `Diakses <tanggal>` hanya pada tanggal URL benar-benar dibuka.
- Validasi: `npm run check:urls` harus menurun menuju 0 URL mati; `check:refs:strict` menuju 0 entri tanpa identitas.

## 8. Fase 4 — Verifikasi Eksternal (campuran; checkpoint manusia)

Item yang butuh sumber di luar repo dan **persetujuan pengguna**:

- Gross-up PPh 23 (deduktibilitas) — cari sumber primer; jika kontensius, tetap beri label peringatan (K-6).
- Plafon BPJS bertanggal per tahun; dasar hukum cuti/maternity/sick pay (UU 13/2003, PP 35/2021, dst.); skema lembur 5-hari.
- Klaim produk vendor (SW-02/03): D365 revenue recognition, Odoo finite capacity/EUP, D365 Scrap Journal — verifikasi terhadap dokumentasi resmi versi 20.0/versi D365 terkini.
- `FIN-05` tanggal PPh 21 vs BPJS.

Pengguna menyetujui sumbernya; AI memasang sitasi + tanggal.

## 9. Fase 5 — Pilar yang Belum Ada (AI otonom; review sampel per pilar)

Prioritas mengikuti K-7 (pembelajar):

1. **Lapisan pembelajaran**: learning path (4 jalur sesuai audit I.2), glosarium, latihan per section, capstone + kunci jawaban.
2. **Software**: artikel implementasi per produk (Odoo 20/ERPNext/D365/SAP) dengan versi tersemat.
3. **Naventra**: ekstraksi 130 blok design dari artikel konsep ke `30-naventra/{requirements,functional-design,technical-design,implementation-notes}` + traceability ID; artikel konsep menyisakan satu baris rujukan.
4. **Process**: document lifecycle kanonik + exception path (PROC-01/02).

## 10. Fase 6 — Penutupan (AI otonom; sign-off manusia)

TECH-02/03/06/08 (robots.txt, canonical, deps, judul), MNT-02/04/05 (frontmatter schema, commit per artikel), lalu **re-audit penuh oleh AI** dengan format `erp-review` dan target skor ≥8. Pemilik menandatangani hasil re-audit; review pakar eksternal sesuai K-8.

## 11. Protokol Batch Otonom (loop wajib setiap sesi)

```text
1. BACA    : ROADMAP.md → REMEDIATION.md → register terkait → tentukan batch (≤8 file konten).
2. RENCANA : sebutkan file target + perubahan yang diharapkan.
3. EKSEKUSI : ikuti skill terkait (erp-article, research-citation, accounting-validation, erp-review).
4. BUKTI   : npm run check:content → 0 error; npm run check:urls → tidak lebih buruk dari sebelumnya;
             npx quartz build → sukses. Gagal = perbaiki atau laporkan; jangan commit gagal.
5. COMMIT  : atomik per alasan (conventional-commit; tanpa atribusi AI), path spesifik, tanpa `git add .`.
6. REGISTER: pindahkan item ke Fixed + tanggal; update ROADMAP/LINK-BACKLOG.
7. LAPORAN : file yang diubah, perintah + hasilnya, ketidakpastian tersisa, item bertanda review-manusia.
8. BERHENTI di checkpoint manusia (Fase 1, 4, 5, 6). Jangan lanjut melewatinya.
```

## 12. Definition of Done Proyek

Proyek selesai hanya jika semua ini hijau:

- [ ] `audit/REMEDIATION.md`: nol item Open.
- [ ] `npm run check:urls` → 0 URL mati; `check:refs:strict` → 0 entri tanpa identitas terverifikasi.
- [ ] Seluruh referensi software menyebut versi berlaku (Odoo 20.0 per 24 Nov 2026).
- [ ] `npm run check:content` + `npx quartz build` hijau di CI pada setiap commit.
- [ ] Re-audit penuh skor ≥8 dan ditandatangani pemilik.

## 13. Prompt Awal Sesi Baru

Salin blok berikut ke sesi AI baru untuk melanjutkan pekerjaan:

```text
Lanjutkan proyek erp-notes sesuai roadmap. Baca dulu, berurutan:
audit/ROADMAP.md, audit/REMEDIATION.md, dan register batch yang sedang berjalan
(audit/LINK-BACKLOG.md untuk kampanye referensi).

Aturan kerja:
- Ikuti AGENTS.md dan .agents/rules/*; maksimum 8 file konten per sesi.
- Jalankan protokol batch di ROADMAP.md bagian 11, termasuk validasi
  (npm run check:content, npm run check:urls, npx quartz build) dan commit
  atomik tanpa atribusi AI.
- Keputusan K-1 sampai K-8 sudah terkunci; jangan tanya ulang.
- Jangan mengarang sumber; yang tak terverifikasi ditandai [belum terverifikasi].
- Perubahan tarif, pajak, atau pengakuan pendapatan ditandai untuk review saya.
- Berhenti di checkpoint manusia (fase 1, 4, 5, 6) dan laporkan bukti, bukan
  pernyataan "selesai".

Mulai dari fase berikutnya yang belum selesai menurut ROADMAP.md, lalu
laporkan rencana batch kamu sebelum mengeksekusi.
```
