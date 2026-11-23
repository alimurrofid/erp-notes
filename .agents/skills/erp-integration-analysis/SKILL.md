---
name: erp-integration-analysis
description: Menganalisis alur integrasi lintas modul ERP (O2C, P2P, inventory ke GL, manufacturing ke GL, project, payroll) dan memetakan dokumen, titik posting, akun, serta waktu pengakuan. Gunakan saat menulis atau mereview artikel integrasi, memeriksa konsistensi antar modul, atau menjawab pertanyaan bagaimana satu transaksi mengalir ke jurnal.
---

# ERP Integration Analysis

Tujuan: memetakan satu alur lintas modul sehingga dokumen, posting, dan akunnya dapat ditelusuri.

## Input

| Input | Contoh |
|---|---|
| Alur | O2C, P2P, inventory→GL, manufacturing→GL, project→GL, payroll→GL |
| Titik awal | sales order, purchase requisition, material issue |
| Titik akhir | jurnal, laporan keuangan, pembayaran |
| Entitas dan periode | PT Maju Bersama, September 2026 |

## Preconditions

`.agents/rules/domain.md` dan `.agents/rules/accounting.md`.
Angka dari `.agents/references/scenario-register.md`.

## Langkah

1. **Gambar rantai dokumen.** Setiap dokumen: pembuat, pemicu, status, dan dokumen berikutnya.
2. **Tandai titik posting.** Di dokumen mana jurnal dibuat, dan apa pemicunya (validasi, receipt, delivery, invoice).
3. **Petakan akun.** Untuk setiap titik: debit, kredit, dan akun kontrol/clearing.
4. **Tentukan waktu.** Bedakan tanggal dokumen, tanggal posting, dan periode.
5. **Cek modul yang tidak terlibat.** Integrasi sering salah karena modul yang seharusnya menerima posting tidak disebut.
6. **Cari jalur gagal.** Retur, pembatalan, selisih, kekurangan stok, dan reversal.
7. **Tulis matriks** dengan format di bawah.

## Format Output

```markdown
| # | Event | Dokumen | Modul | Posting | Debit | Kredit | Periode |
|---|---|---|---|---|---|---|---|
| 1 | ... | ... | ... | Ya/Tidak | ... | ... | ... |
```

Tambahan wajib:

- **Titik kontrol:** akun clearing, GR/IR, WIP, atau suspense yang dipakai.
- **Risiko:** apa yang salah jika langkah dilewati.
- **Tautan:** artikel kanonik untuk setiap modul.

## Kriteria Selesai

- [ ] Setiap dokumen punya pemicu dan penerus.
- [ ] Setiap posting punya debit, kredit, dan akun.
- [ ] Tidak ada lompatan modul tanpa penjelasan.
- [ ] Minimal satu jalur gagal/retur dijelaskan.
- [ ] Angka konsisten dengan register.
- [ ] Semua tautan valid.

## Jika Gagal

| Kondisi | Tindakan |
|---|---|
| Dua artikel memposting transaksi sama ke akun berbeda | Laporkan konflik, jangan pilih salah satu |
| Titik posting tidak jelas | Tandai sebagai pertanyaan terbuka |
| Alur terlalu besar | Pecah per sub-alur (mis. P2P: requisition→PO, PO→GR, GR→bill) |
