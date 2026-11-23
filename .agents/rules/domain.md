# Domain Rules

Aturan tentang **apa** yang boleh ditulis dan **di mana** batas antar lapisan knowledge.

## Model Lapisan

```text
ERP Concept → Business Process → Business Rules → Accounting Impact
            → Software Implementation → Project Implementation
```

Setiap artikel harus jelas berada di lapisan mana. Jangan mencampur lapisan tanpa penanda.

## Tes Concept vs Implementation

Sebelum menulis klaim, jawab tiga pertanyaan:

1. Apakah klaim ini benar untuk ERP secara umum, atau hanya untuk satu produk?
2. Jika hanya untuk satu produk: versi berapa, dan apakah perilakunya bergantung konfigurasi?
3. Jika hanya untuk Naventra: apakah ini kebutuhan proyek, bukan konsep ERP?

| Jawaban | Tempat menulis |
|---|---|
| Berlaku umum | Artikel konsep di `content/00-*` s/d `content/11-*` |
| Perilaku produk tertentu | Bagian perbandingan/implementasi, dengan versi |
| Keputusan proyek Naventra | `content/30-naventra/` |

## Aturan Software-Specific

- Perilaku software **wajib** bersumber dari dokumentasi resmi produk tersebut.
- Sebutkan versi. Jika versi tidak diketahui, tulis `version-dependent` atau tandai belum terverifikasi.
- Bedakan `documented behavior`, `configuration-dependent`, `implementation-specific`, dan `interpretation`.
- Jangan menggeneralisasi perilaku Odoo/ERPNext/Dynamics/SAP menjadi konsep ERP universal.

## Batas Naventra

Naventra adalah **project implementation**, bukan sumber kebenaran konsep ERP.

- Penjelasan konsep tidak boleh diubah agar cocok dengan Naventra.
- Desain, skema database, requirement, dan keputusan implementasi hanya di `content/30-naventra/`.
- Di artikel konsep, cukup satu baris rujukan ke halaman Naventra yang relevan.
- Jika Naventra sengaja berbeda dari praktik umum, gunakan heading `## Naventra Design Decision` dan jelaskan alasan serta trade-off.

## Pola Dokumentasi Proses

Untuk artikel proses, jawab tujuh hal berikut:

1. Initiator
2. Business document
3. Business event
4. Data yang berubah
5. Accounting impact
6. Inventory impact (jika ada)
7. Next process

Sertakan juga minimal satu **exception path** (pembatalan, retur, penolakan, kekurangan stok). Proses tanpa jalur exception dianggap belum lengkap.

## Skenario Kanonik

Repository memakai satu skenario perusahaan agar angka dapat ditelusuri lintas modul.

- Jangan membuat perusahaan, chart of accounts, atau skema nomor dokumen baru jika sudah ada di bagian tersebut.
- Jika angka pada dua artikel berbeda, **laporkan konflik**; jangan menambah versi ketiga.
- Nomor dokumen (PR, PO, GR, SO, INV) harus konsisten dari awal sampai akhir rantai.

## Satu Penjelasan Kanonik

- Satu konsep = satu artikel kanonik.
- Artikel lain yang membahas topik sama harus menautkan ke artikel kanonik dan hanya menambahkan konteks yang spesifik.
- Jangan menyalin seluruh penjelasan.

## Bahasa Perbandingan

Perbandingan harus deskriptif. Jangan memakai kata: best, worst, superior, inferior, winner, loser, ranking, score.

## Larangan Mengarang

Jangan mengarang:

- fitur ERP atau perilaku software;
- aturan akuntansi atau standar;
- aturan dan tarif pajak;
- proses bisnis;
- perilaku API atau database;
- konfigurasi software;
- persyaratan regulasi;
- batasan produk.

Jika tidak yakin: cari sumber primer, atau tandai belum terverifikasi dan hilangkan angka pasti.

## Memperbarui Dokumen

Saat memperbarui artikel yang sudah ada:

1. Pertahankan informasi yang masih benar.
2. Verifikasi klaim yang sudah usang; jangan menganggapnya benar hanya karena sudah ada.
3. Perbarui referensi dan tanggal berlaku.
4. Perbaiki link yang rusak.
5. Hindari rewrite besar jika perubahan kecil sudah cukup.
6. Pertahankan struktur dan terminologi yang sudah konsisten.
7. Jangan menghapus informasi valid hanya karena tidak dibutuhkan oleh perubahan saat ini.
8. Laporkan jika ada klaim lama yang tidak dapat diverifikasi.

