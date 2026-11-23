# Indonesian Tax Rules

Aturan untuk konten pajak Indonesia. Aturan akuntansi umum ada di `accounting.md`.

## Otoritas

- **DJP** (https://www.pajak.go.id/) dan **Kementerian Keuangan** adalah sumber primer.
- `content/11-tax/` adalah sumber kanonik untuk PPN, PPh, Coretax, dan kepatuhan.
- Artikel sales, purchasing, inventory, payroll, project, dan assets **tidak mengulang tarif**; tautkan ke `11-tax`.

## Format Klaim Pajak

Setiap klaim tarif, ambang batas, atau tenggat wajib memuat empat elemen:

| Elemen | Contoh bentuk |
|---|---|
| Dasar hukum | `PMK 131/PMK.03/2024 Pasal ...` |
| Periode berlaku | `sejak 1 Januari 2025` |
| Sumber | URL DJP / Kemenkeu |
| Tanggal diperiksa | `2026-11-23` |

Jika salah satu tidak tersedia:

```markdown
> [!warning]
> Informasi ini belum diverifikasi terhadap sumber resmi.
```

dan **hapus angka pasti**.

## Larangan

- Menyatakan tarif tanpa periode berlaku.
- Memakai aturan yang sudah dicabut tanpa menandainya sebagai historis.
- Menyalin tarif dari artikel sales/purchasing ke artikel pajak atau sebaliknya.
- Menjelaskan alur faktur pajak lama sebagai proses yang berlaku sekarang.
- Menganggap aturan tahun lalu masih berlaku.
- Mencampur accounting treatment dan tax treatment dalam satu tabel tanpa kolom pemisah.

## Area yang Wajib Diverifikasi Ulang

Tabel ini sengaja tidak memuat angka. Angka hanya boleh ditulis setelah sumber primer ditemukan.

| Topik | Mengapa berisiko |
|---|---|
| PPN: tarif dan dasar pengenaan | Artikel sales/purchasing masih memakai 11%, sedangkan `11-tax` memakai basis lain |
| Penerbitan faktur pajak | Peralihan ke Coretax mengubah proses dan penomoran |
| PPh 21 (TER) | Bergantung pada PP/PMK yang berlaku dan tanggal mulai |
| PPh 23 dan PPh 4(2) | Tarif, syarat NPWP, dan objek pemotongan |
| BPJS (Kesehatan, JHT, JP, JKK, JKM) | Batas upah berubah setiap tahun |
| PPh Badan dan fasilitas Pasal 31E | Tarif dan syarat proporsional |
| Tenggat SPT dan pembayaran | Bedakan tenggat legal dan cut-off operasional |

## Review Gate

Perubahan pada tarif, dasar pengenaan, atau tenggat **wajib** ditandai untuk review manusia.
Agent tidak boleh menyatakan perubahan tarif sebagai final.

## Register

Register pajak adalah bagian `References` di `content/11-tax/`.
Jangan membuat register kedua di `.agents/`; duplikasi akan menyimpang.
