# Scenario Register

Register fakta skenario contoh yang **sudah diverifikasi** di repository, beserta konflik yang belum diselesaikan.

Status: **parsial** (2026-11-24). Keputusan Fase 1 sudah dikunci; konflik nomor dokumen diselesaikan lewat D-5. Ini register kerja untuk agent, bukan artikel publik dan bukan otoritas tunggal. Selama konflik di bawah belum diselesaikan, jangan menambah versi ketiga.

## Fakta Terverifikasi

| Fakta | Nilai | Sumber |
|---|---|---|
| Entitas pembeli | PT Maju Bersama | `content/04-purchasing/procure-to-pay-integration.md:109` |
| Pemasok contoh | PT Sumber Teknologi (PKP) | `content/04-purchasing/procure-to-pay-integration.md:109` |
| Mata uang default | IDR | seluruh contoh |
| Harga PO contoh | Rp700.000/unit | `content/04-purchasing/goods-receipt-and-service-receipt.md:93` |
| Landed cost contoh | Rp750.000/unit setelah freight Rp500.000 untuk 10 unit | `content/04-purchasing/procure-to-pay-integration.md:146` |
| Format nomor dokumen | `<JENIS>-<TAHUN>-<BULAN>-<URUT>` mis. `SQ-2026-09-0042` | Keputusan Fase 1 (2026-11-24); pola penjualan di `content/03-sales/sales-order.md` |

## Keputusan Kanonik Fase 1 (2026-11-24)

Keputusan berikut disetujui pemilik proyek dan menjadi basis Fase 2. Angka yang belum ada di sini tidak boleh dikarang; diturunkan saat batch Fase 2 berjalan.

| # | Objek | Keputusan kanonik |
|---|---|---|
| D-1 | Aset `AST-MAC-2026-0001` | Cost model + skedul 33 bulan (akumulasi 55 jt, nilai buku 65 jt, residu 10 jt). Artikel revaluasi memakai aset berbeda `AST-MAC-2026-0002` (revaluation model). |
| D-2 | Material proyek | Proyek fixed-price: WIP→COGS diakru per progres. Time-material/cost-reimbursable: langsung ke beban. |
| D-3 | Skenario tahunan | EBT 100 jt menjadi kanonik. Skenario EBT 15,35 jt diberi label tahun pembanding, bukan skenario kedua. |
| D-4 | Chart of accounts | `content/02-accounting/chart-of-accounts.md` kanonik; `08-assets` menyesuaikan. |
| D-5 | Nomor dokumen P2P | Pola 4 segmen. Nilai terverifikasi: `PR-2026-09-0041`, `PO-2026-09-0081`. `MO-2026-0042` dikecualikan karena merupakan ID cost sheet (D-7), bukan nomor dokumen transaksi. |
| D-6 | Konversi UOM | 1 Pack = 6 Unit. Artikel yang memakai faktor "4" dikoreksi. |
| D-7 | Cost sheet produksi | `content/06-manufacturing/production-costing-and-wip.md` pemilik tunggal; artikel lain merujuk. |
| D-8 | Index `02-accounting` dan `04-purchasing` | Hapus janji cakupan PPh 21/22/4(2) yang tidak ada di artikel tujuan (temuan TAX-04/05). Perluasan materi PPh 21/22 masuk Fase 5. |

## Konflik Belum Selesai

| # | Objek | Nilai A | Nilai B | Dampak |
|---|---|---|---|---|
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
