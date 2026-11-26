---
title: Naventra Non-Functional Requirements
---

# Naventra Non-Functional Requirements

## Definition

Target non-fungsional Naventra sebagai **kriteria desain**, bukan hasil pengukuran. Belum ada implementasi atau uji beban; angka di bawah adalah ambang yang harus dibuktikan sebelum go-live.

## Target

| Aspek | Target desain | Cara membuktikan |
|---|---|---|
| Ketersediaan | 99,5% per bulan untuk jam kerja | Monitoring uptime + insiden |
| Posting tunggal | p95 < 500 ms, p99 < 1,5 s | Uji beban dengan dokumen realistis |
| Posting massal | 10.000 baris < 10 menit | Uji payroll/depresiasi |
| Laporan periode | < 5 detik untuk 1 juta baris jurnal | Uji query + index |
| RPO | ≤ 15 menit | Uji restore dari backup |
| RTO | ≤ 4 jam | Simulasi kegagalan |
| Audit log | 100% transisi status tercatat | Uji negatif + sampling |
| Idempotency | 0 duplikasi pada retry | Uji ulang event/posting |
| Keamanan | Tidak ada endpoint tanpa autentikasi | Pemindaian + uji peran |

## Skalabilitas

- Partisi jurnal dan stock ledger per entitas/periode; hindari tabel tunggal tanpa batas.
- Read model analitik dipisahkan dari tabel transaksi.
- Posting massal memakai batch dan checkpoint agar dapat dilanjutkan tanpa mengulang yang sudah berhasil.
- Index minimum: `(entity_id, posting_date)`, `(source_type, source_id)`, `(account_id, period)`.

## Reliabilitas dan Pemulihan

- Backup penuh harian + incremental; uji restore minimal sekali per kuartal.
- Failover database tidak boleh menyebabkan jurnal ganda; idempotency key tetap berlaku setelah failover.
- Job terjadwal harus aman dijalankan ulang (idempoten).
- Dead-letter dan error queue dipantau; tidak boleh menjadi tempat sampah permanen.

## Observability

- Setiap request/event membawa `correlation_id`.
- Metrik: latency posting, error rate, outbox lag, dead-letter count, rekonsiliasi selisih.
- Log tidak boleh memuat data pribadi atau kredensial.
- Alert untuk: posting gagal berulang, periode tidak terkunci sesuai jadwal, selisih rekonsiliasi.

## Kepatuhan dan Aksesibilitas

- Jejak audit tersedia untuk auditor tanpa memberi akses tulis.
- Data pribadi dibatasi per peran dan tercatat saat diekspor.
- UI mengikuti kontras dan navigasi keyboard dasar; bukan target sertifikasi aksesibilitas penuh pada baseline ini.
- Retensi data mengikuti kebijakan perusahaan dan regulasi yang berlaku.

## Batasan

- Angka target belum diuji; jangan mengutipnya sebagai jaminan performa.
- Target dapat berubah setelah profiling data nyata.
- Tidak ada klaim skalabilitas horizontal sampai arsitektur database ditetapkan.

## References

1. **ISO/IEC** — *ISO/IEC 25010:2011 — Systems and software Quality Requirements and Evaluation (SQuaRE) — Quality model*. https://www.iso.org/standard/35733.html — diakses 26 November 2026.
2. **OWASP** — *Application Security Verification Standard*. https://owasp.org/www-project-application-security-verification-standard/ — diakses 26 November 2026.
3. **The Institute of Internal Auditors** — *Global Internal Audit Standards*. https://www.theiia.org/en/standards/ — diakses 26 November 2026.
