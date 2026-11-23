# Audit

Folder ini menyimpan laporan audit historis. Isinya **bukan** aturan dan **bukan** sumber kebenaran.

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
