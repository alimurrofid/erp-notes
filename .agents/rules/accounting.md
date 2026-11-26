# Accounting Rules

Aturan untuk setiap konten yang menyentuh jurnal, valuasi, pendapatan, biaya, atau pajak.

## Jurnal

- Debit harus sama dengan kredit. Periksa angkanya, jangan hanya formatnya.
- Jangan mengarang journal entry. Setiap jurnal harus berasal dari standar, praktik yang dapat dijelaskan, atau contoh yang asumsinya dinyatakan.
- Sebutkan nama akun dan posisinya (aset, liabilitas, ekuitas, pendapatan, beban).
- Bedakan **document date**, **posting date**, dan **period**. Beban periode Agustus tidak boleh dipindahkan ke September hanya karena faktur diterima September; gunakan accrual atau GR/IR.
- Tandai asumsi: mata uang, tarif, kuantitas, metode biaya, dan titik pengakuan.

## Pengakuan Pendapatan

- Pendapatan diakui saat **kewajiban pelaksanaan terpenuhi / kontrol berpindah** (IFRS 15 / PSAK 72), bukan saat faktur dicetak dan bukan saat kas ditagih.
- Jika penagihan dan penyerahan terjadi pada periode berbeda, jelaskan perlakuan contract asset / contract liability.
- Jangan memberi label "Pengakuan Pendapatan" pada langkah invoicing.
- Untuk proyek: bedakan billing, revenue, dan cost. Milestone yang sudah diselesaikan tidak boleh ditangguhkan hanya karena belum ditagih.

## Sitasi Standar

Format minimum:

```text
IFRS 15.31 · IAS 2.9 · IAS 16.55 · PSAK 72
```

- Sebutkan paragraf bila klaim bersifat spesifik.
- Bedakan **accounting treatment** dan **tax treatment**.
- Software ERP tidak boleh dijadikan sumber prinsip akuntansi.

## Fakta yang Berubah

Tarif, ambang batas, tanggal jatuh tempo, dan batas kontribusi **wajib** memakai format:

```text
Berlaku sejak <tanggal/periode> · Sumber: <regulasi/standar> · <URL atau nomor regulasi>
```

Jika sumber belum ditemukan:

```markdown
> [!warning]
> Informasi ini belum diverifikasi terhadap sumber resmi.
```

dan **jangan** mencantumkan angka pasti.

## Pajak Indonesia

- Sumber kanonik PPN ada di `content/12-tax/` (`vat-fundamentals.md`, `taxable-base-and-tax-calculation.md`).
- Artikel sales/purchasing **tidak** mengulang tarif; tautkan ke artikel kanonik.
- Jika tarif berubah, ubah di `12-tax` dan perbarui tanggal berlaku di sana.
- Prioritaskan DJP, Kementerian Keuangan, dan peraturan resmi. Jangan menganggap aturan lama masih berlaku.
- Sebutkan periode dan nomor regulasi (mis. PMK) untuk setiap klaim tarif.

## Pemeriksaan Sebelum Selesai

- [ ] Debit = kredit pada setiap tabel jurnal.
- [ ] Setiap angka muncul konsisten di narasi, tabel, dan kesimpulan.
- [ ] Setiap klaim standar punya sitasi.
- [ ] Setiap tarif/tanggal punya periode berlaku dan sumber.
- [ ] Accounting treatment dan tax treatment dipisahkan.
- [ ] Contoh memakai skenario dan nomor dokumen yang sama dengan artikel terkait.

## Human Gate

Perubahan pada hal berikut **wajib** ditandai untuk review manusia dan tidak boleh dinyatakan final oleh agent:

- tarif pajak atau dasar pengenaan;
- kebijakan pengakuan pendapatan;
- perlakuan akuntansi yang bertentangan dengan artikel lain;
- angka yang mengubah laporan keuangan contoh.
