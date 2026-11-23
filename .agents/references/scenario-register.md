# Scenario Register

Register fakta skenario contoh yang **sudah diverifikasi** di repository, beserta konflik yang belum diselesaikan.

Status: **parsial** (2026-11-23). Ini register kerja untuk agent, bukan artikel publik dan bukan otoritas tunggal. Selama konflik di bawah belum diselesaikan, jangan menambah versi ketiga.

## Fakta Terverifikasi

| Fakta | Nilai | Sumber |
|---|---|---|
| Entitas pembeli | PT Maju Bersama | `content/04-purchasing/procure-to-pay-integration.md:109` |
| Pemasok contoh | PT Sumber Teknologi (PKP) | `content/04-purchasing/procure-to-pay-integration.md:109` |
| Mata uang default | IDR | seluruh contoh |
| Harga PO contoh | Rp700.000/unit | `content/04-purchasing/goods-receipt-and-service-receipt.md:93` |
| Landed cost contoh | Rp750.000/unit setelah freight Rp500.000 untuk 10 unit | `content/04-purchasing/procure-to-pay-integration.md:146` |
| Format nomor dokumen | `<JENIS>-<TAHUN>-<URUT>` mis. `PO-2026-00042` | `content/04-purchasing/procure-to-pay-integration.md:121` |

## Konflik Belum Selesai

| # | Objek | Nilai A | Nilai B | Dampak |
|---|---|---|---|---|
| 1 | Nomor PO | `PO-2026-00042` (`procure-to-pay-integration.md:121`) | `PO-2026-09-0081` (`goods-receipt-and-service-receipt.md:116`), `PO-2026-0042` | Rantai dokumen tidak dapat ditelusuri |
| 2 | Nomor PR | `PR-2026-00042` | `PR-2026-09-0041` | Awal P2P berbeda antar artikel |
| 3 | Nilai retur | Rp700.000 | Rp750.000 (nilai perolehan termasuk landed cost) | Persediaan overstated Rp50.000 |
| 4 | PPN | 12% statutory dengan DPP 11/12 (`11-tax/vat-fundamentals.md:116`) | 11% "efektif sejak 1 April 2022" (`03-sales/sales-tax.md:86`) | Regulasi yang diajarkan sudah usang |

Konflik #4 bukan berarti `11-tax` salah: artikel itu sudah menjelaskan beban efektif 11% dari tarif 12%. Yang salah adalah artikel sales/purchasing yang menyatakan 11% sebagai tarif statutori dengan tanggal berlaku lama.

## Cara Memakai Register

1. Sebelum menulis angka atau nomor dokumen, cek register ini.
2. Jika nilai sudah ada, pakai nilai yang sama.
3. Jika nilai berbeda dengan artikel yang sedang diubah, **laporkan konflik** di laporan tugas.
4. Jangan menambahkan nilai baru ke artikel; perbaiki register ini lebih dulu.
5. Setelah konflik diselesaikan, pindahkan baris dari "Konflik" ke "Fakta Terverifikasi" dan catat tanggalnya.

## Batas

- Register ini tidak menggantikan artikel publik.
- Angka di sini hanya berlaku untuk skenario contoh, bukan tarif atau standar.
- Verifikasi ulang jika artikel sumber berubah.
