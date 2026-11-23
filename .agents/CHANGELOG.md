# AI Config Changelog

Perubahan pada aturan, skill, workflow, dan validasi. Bukan changelog konten.

## 2026-11-23 — v1.0

### Added

- `.agents/rules/` — `domain.md`, `accounting.md`, `tax-id.md`, `content-format.md`, `writing-style.md`.
- `.agents/skills/` — `erp-article`, `erp-review` (+ `references/checklist.md`), `accounting-validation`, `research-citation`, `erp-integration-analysis`.
- `.agents/workflows/` — `create-article.md`, `revise-article.md`, `verify-article.md`, `maintain-ai-config.md`.
- `.agents/references/scenario-register.md` — fakta contoh yang terverifikasi dan konflik yang belum selesai.
- `.agents/scripts/` — `check-links.mjs`, `check-frontmatter.mjs`, `check-mermaid.mjs`, `check-structure.mjs`, `check-references.mjs`.
- `.github/workflows/validate.yml` — link, frontmatter, Mermaid, struktur, laporan referensi, build.

### Changed

- `AGENTS.md`: 560 → 98 baris. Isi menjadi non-negotiables, routing, budget konteks, definition of done berbasis bukti.
- `.agents/document-template.md`: selaras dengan korpus (`ERP Implementation Comparison`, `Related Concepts`); heading bagian bahasa Inggris.
- `.agents/sources.md`: hierarki otoritas, PSAK/IAI, SAP, tabel sumber per domain.
- `README.md`: bagian AI Agent menjadi pointer, bukan sumber aturan kedua.
- 65 artikel: frontmatter `title` ditambahkan dari H1.
- 7 tautan rusak diperbaiki; 1 anchor ke heading yang tidak ada dihapus.
- 85 label Mermaid yang memuat wiki link diganti teks; 17 label edge dikutip.
- 126 heading kanonik dimigrasikan di 25 file (`Referensi` → `References`, dan seterusnya).

### Decided

- Heading bagian bahasa Inggris; prosa Bahasa Indonesia.
- Tidak memakai MCP, hooks, atau multi-agent untuk repository ini.
- Aturan spesifik domain tinggal di rule, bukan di `AGENTS.md`.
- `check-references` bersifat laporan sampai backfill URL selesai; mode `--strict` tersedia.

### Deferred

- Migrasi 130 blok Naventra dari artikel konsep ke `content/30-naventra/`.
- Backfill URL pada 649 entri referensi.
- Backfill `status`/`reviewed` — menunggu review nyata, bukan diisi otomatis.

### Known Warnings

- `check-structure`: 130 artikel konsep masih memuat blok Naventra.
- `check-references`: 123 file tanpa URL referensi.
