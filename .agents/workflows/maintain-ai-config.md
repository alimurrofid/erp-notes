# Workflow: Maintain AI Config

Menjaga aturan, skill, dan pemeriksaan tetap benar dan tetap kecil.

## Entry Conditions

- Review berkala (disarankan tiap kuartal).
- Kesalahan yang sama terjadi dua kali.
- Tool baru ditambahkan, atau perilaku tool berubah.
- Sebuah aturan tidak lagi dapat diverifikasi.

## Scope

`.agents/`, `AGENTS.md`, `.github/workflows/validate.yml`, dan script npm. Bukan isi artikel.

## Sequence

1. **Ukur dulu.**
   ```bash
   npm run check:content
   ```
   Catat error dan warning.
2. **Cari aturan yang tidak dipakai.** Bandingkan isi rule dengan kesalahan yang benar-benar terjadi.
3. **Cari duplikasi.** Satu instruksi hanya boleh punya satu rumah.
4. **Uji aturan baru.** Jalankan pada satu artikel; jika tidak mengubah perilaku, jangan tambahkan.
5. **Perbarui CHANGELOG** dengan tanggal, aturan yang berubah, dan alasannya.
6. **Jalankan ulang validasi dan build.**

## Aturan Perubahan

| Boleh | Tidak boleh |
|---|---|
| Menambah aturan yang punya kriteria uji | Menambah aturan yang hanya berisi semangat |
| Menghapus aturan yang sudah tidak relevan | Menghapus aturan karena sedang tidak nyaman |
| Memindahkan detail dari `AGENTS.md` ke rule | Menambah detail baru ke `AGENTS.md` |
| Menambah script untuk masalah deterministik | Menambah instruksi untuk masalah yang bisa dicek |

## Decision Gates

| Kondisi | Aksi |
|---|---|
| Aturan baru menambah >20 baris `AGENTS.md` | Pindahkan ke rule, bukan ke `AGENTS.md` |
| Skill baru tumpang tindih dengan skill lama | Gabungkan |
| Pemeriksaan baru akan gagal pada 50+ file | Jadikan warning + backlog, bukan blocking |
| Perubahan mengubah perilaku tool | Catat versi tool di CHANGELOG |

## Completion Criteria

- [ ] `AGENTS.md` tetap ≤120 baris.
- [ ] Setiap rule punya satu rumah; tidak ada duplikasi.
- [ ] `npm run check:content` → 0 error.
- [ ] `npx quartz build` berhasil.
- [ ] `.agents/CHANGELOG.md` diperbarui.
