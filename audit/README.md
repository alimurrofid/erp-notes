# Audit

Folder ini menyimpan laporan audit historis. Isinya **bukan** aturan dan **bukan** sumber kebenaran.

## Laporan Terbaru

- `REVIEW-2026-11-26.md` — re-audit penuh, skor 8,6/10, menunggu sign-off pemilik.
- `REMEDIATION.md` — status seluruh temuan (Fixed/Partial/Blocked).
- `ROADMAP.md` — status fase dan Definition of Done.
- `isbn-registry.md` — ISBN yang terverifikasi dan yang sengaja tidak dipakai.
- `LINK-BACKLOG.md` — status akhir kampanye referensi.

## Aturan untuk Agent

- Jangan memuat file di folder ini kecuali pengguna memintanya.
- Jangan menganggap temuan audit lama masih valid; verifikasi ulang terhadap isi repository.
- Jika audit lama bertentangan dengan aturan di `.agents/rules/`, aturan yang berlaku.
- Temuan yang sudah diperbaiki harus dicatat, bukan diulang.

## Menambah Laporan

Sertakan di bagian atas file:

- tanggal audit;
- commit yang diaudit;
- metode dan batas cakupan;
- daftar hal yang tidak diverifikasi.

Laporan tanpa batas cakupan tidak boleh dijadikan dasar perubahan.
