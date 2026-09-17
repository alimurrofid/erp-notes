# AGENTS.md

## Project Overview

`erp-notes` adalah personal knowledge base (KB) untuk mempelajari dan mendokumentasikan ERP, business processes, accounting, finance, supply chain, inventory, procurement, sales, manufacturing, dan ERP implementation.

Tujuan utama repository ini adalah membangun **domain knowledge ERP yang tahan terhadap perubahan software**, bukan menjadi dokumentasi satu produk ERP.

Knowledge harus tetap relevan ketika dibandingkan dengan Odoo, ERPNext, Microsoft Dynamics 365, SAP, atau custom ERP seperti Naventra.

---

## Core Principles

### 1. Domain Knowledge Comes First

Selalu bedakan:

1. General ERP Concept
2. Business Process
3. Business Rules
4. Accounting / Business Impact
5. Software-specific Implementation
6. Project-specific Implementation

Alur yang diutamakan:

```text
ERP Concept
    ↓
Business Process
    ↓
Business Rules
    ↓
Accounting / Business Impact
    ↓
Software Implementation
    ↓
Project Implementation
```

Hindari pola:

```text
Odoo Feature → "ERP Concept"
```

Jika suatu konsep hanya berlaku pada software tertentu, nyatakan secara eksplisit.

### 2. Source of Truth Hierarchy

Gunakan sumber sesuai jenis informasi.

#### Accounting

Prioritas:

1. IFRS / IASB dan accounting standards yang relevan
2. Regulator resmi
3. Reputable accounting references
4. Official ERP documentation
5. Secondary sources

ERP software tidak boleh dijadikan sumber utama untuk mendefinisikan prinsip accounting umum.

#### Business Processes

Gunakan kombinasi:

- Microsoft Dynamics 365 Business Processes
- ERPNext documentation
- Odoo documentation
- Reputable ERP/business process references

Bandingkan implementasi jika terdapat perbedaan.

#### Inventory

Gunakan:

- ERP/accounting principles
- ERPNext documentation
- Odoo documentation
- Dynamics 365 documentation

Perhatikan hubungan antara inventory transaction, stock valuation, COGS, dan accounting entries.

#### Manufacturing

Gunakan:

- Manufacturing/business process references
- Dynamics 365 documentation
- ERPNext documentation
- Odoo documentation

Perhatikan BOM, routing, work order, material consumption, WIP, finished goods, costing, dan variance.

#### Software-specific Behavior

Untuk perilaku software tertentu, **official documentation software tersebut adalah sumber utama**.

Jangan menggeneralisasikan perilaku Odoo/ERPNext/Dynamics menjadi konsep ERP universal.

---

## Source Priority

Secara umum:

```text
Accounting / Regulatory Standard
        ↓
Official ERP Documentation
        ↓
Official Product Documentation
        ↓
Reputable Books / Educational Resources
        ↓
Community Documentation
        ↓
Blogs / Articles
        ↓
Forums / Social Media
```

Untuk software behavior, official product documentation mengalahkan sumber sekunder.

Untuk accounting principles atau regulatory requirements, sumber standar/regulator mengalahkan dokumentasi software.

---

## Research Rules

- Prioritaskan sumber resmi.
- Verifikasi versi ketika membahas perilaku software.
- Jangan menganggap behavior versi lama masih berlaku pada versi baru.
- Jika sumber berbeda, dokumentasikan perbedaannya.
- Jangan menyembunyikan ketidakpastian.
- Jangan membuat klaim berdasarkan ingatan jika dapat diverifikasi.
- Untuk informasi yang dapat berubah, gunakan sumber yang masih relevan.
- Simpan referensi pada setiap dokumen substantif.

Jika informasi belum terverifikasi, gunakan:

```markdown
> [!warning]
> Informasi ini belum diverifikasi terhadap sumber resmi.
```

---

## Writing Style

- Gunakan Bahasa Indonesia yang jelas dan ringkas.
- Technical terms boleh tetap dalam English jika lebih umum.
- Hindari kalimat marketing.
- Hindari penjelasan yang terlalu panjang jika tidak menambah pemahaman.
- Gunakan diagram Mermaid bila flow lebih mudah dipahami secara visual.
- Gunakan tabel untuk comparison atau glossary.
- Utamakan contoh transaksi yang realistis.

---

## Terminology

Gunakan istilah secara konsisten.

| Term | Meaning |
|---|---|
| ERP | Enterprise Resource Planning |
| COA | Chart of Accounts |
| GL | General Ledger |
| JE | Journal Entry |
| AR | Accounts Receivable |
| AP | Accounts Payable |
| COGS | Cost of Goods Sold |
| BOM | Bill of Materials |
| MRP | Material Requirements Planning |
| O2C | Order to Cash |
| P2P | Procure to Pay |
| R2R | Record to Report |
| RFQ | Request for Quotation |
| PO | Purchase Order |
| SO | Sales Order |
| GR | Goods Receipt |
| WIP | Work in Progress |

Untuk istilah baru, tambahkan ke `.agents/terminology.md` jika istilah tersebut digunakan lintas dokumen.

---

## Standard Document Structure

Gunakan struktur berikut sebagai default:

```markdown
# Title

## Definition

## Purpose

## Business Process

## Business Rules

## Accounting Impact

## Example

## ERP Implementation

## Odoo Implementation

## ERPNext Implementation

## Dynamics 365 Implementation

## Naventra Consideration

## References
```

Tidak semua section wajib digunakan.

Hapus section yang tidak relevan daripada mengisinya dengan informasi generik.

---

## Concept vs Implementation

### Concept

Menjelaskan bagaimana proses atau konsep ERP bekerja secara umum.

Contoh:

- Accounts Payable
- Purchase-to-Pay
- Inventory Valuation
- Manufacturing Order
- Bank Reconciliation

### Implementation

Menjelaskan bagaimana konsep tersebut diterapkan pada software tertentu.

Contoh:

- Odoo Vendor Bill
- ERPNext Purchase Receipt
- Dynamics 365 Product Receipt
- Naventra Purchase Module

Jangan mencampur keduanya tanpa penanda yang jelas.

---

## Business Process Documentation

Untuk setiap proses penting, jelaskan:

1. Initiator
2. Business document
3. Business event
4. Data yang berubah
5. Accounting impact
6. Inventory impact jika ada
7. Next process

Contoh pola:

```text
Business Event
    ↓
Document
    ↓
Validation
    ↓
Transaction
    ↓
Accounting / Inventory Impact
    ↓
Next Process
```

---

## Accounting Impact

Jika sebuah proses mempunyai accounting impact:

- Jelaskan akun yang terpengaruh.
- Jelaskan debit/kredit jika relevan.
- Gunakan contoh angka yang konsisten.
- Bedakan accounting treatment dengan tax treatment.
- Jangan mengarang journal entry.
- Verifikasi prinsip accounting dari sumber yang sesuai.

---

## Examples

Contoh harus:

- realistis,
- konsisten secara angka,
- konsisten dengan business process,
- jelas asumsi yang digunakan.

Jika contoh disederhanakan untuk pembelajaran, nyatakan asumsi tersebut.

---

## Software Comparison

Comparison harus bersifat deskriptif.

Jangan gunakan:

- best
- worst
- superior
- inferior
- winner
- loser
- ranking
- score

Bandingkan berdasarkan karakteristik yang dapat diverifikasi.

Jika behavior bergantung pada konfigurasi atau versi, nyatakan:

- configuration-dependent
- version-dependent
- documented behavior
- implementation-specific
- interpretation

---

## Naventra

Naventra adalah **project implementation**, bukan source of truth untuk konsep ERP.

Gunakan alur:

```text
ERP Knowledge
    ↓
Business Requirements
    ↓
Naventra Design
    ↓
Naventra Implementation
```

Jangan mengubah konsep ERP umum hanya agar sesuai dengan implementasi Naventra.

Jika Naventra sengaja berbeda dari praktik umum, dokumentasikan:

```markdown
## Naventra Design Decision
```

dan jelaskan alasan serta trade-off-nya.

---

## File Organization

```text
erp-notes/
├── AGENTS.md
├── README.md
├── .agents/
│   ├── sources.md
│   ├── terminology.md
│   └── document-template.md
└── content/
    ├── 00-fundamentals/
    ├── 01-business-processes/
    ├── 02-accounting/
    ├── 03-sales/
    ├── 04-purchasing/
    ├── 05-inventory/
    ├── 06-manufacturing/
    ├── 07-finance/
    ├── 08-assets/
    ├── 09-project/
    ├── 10-hr/
    ├── 11-tax/
    ├── 20-software/
    │   ├── odoo/
    │   ├── erpnext/
    │   └── dynamics365/
    └── 30-naventra/
```

Gunakan lowercase kebab-case untuk nama file dan folder.

---

## Links

Gunakan relative Markdown links atau Obsidian wiki links yang tetap kompatibel dengan Quartz.

Contoh:

```markdown
[Inventory Valuation](../inventory/inventory-valuation.md)
```

atau:

```markdown
[[Inventory Valuation]]
```

Jangan membuat link ke file yang tidak ada.

---

## References

Setiap dokumen substantif harus memiliki:

```markdown
## References
```

Prioritaskan official sources.

Jangan menambahkan URL yang belum diverifikasi.

---

## Indonesian Tax

Untuk tax:

- prioritaskan DJP, Kementerian Keuangan, dan peraturan resmi;
- bedakan accounting treatment dan tax treatment;
- sertakan periode/version regulation bila relevan;
- jangan menganggap aturan pajak lama masih berlaku.

---

## Updating Documents

Ketika memperbarui dokumen:

1. Pertahankan informasi yang masih benar.
2. Verifikasi klaim yang sudah outdated.
3. Update references.
4. Perbaiki broken links.
5. Hindari rewrite besar jika tidak diperlukan.
6. Pertahankan struktur dan terminology yang sudah konsisten.
7. Jangan menghapus informasi valid hanya karena tidak dibutuhkan oleh perubahan kecil.

---

## Avoid Hallucination

Jangan mengarang:

- ERP features
- accounting rules
- tax rules
- business processes
- API behavior
- database behavior
- software configuration
- regulatory requirements
- product limitations

Jika tidak yakin, cari sumber atau tandai sebagai belum terverifikasi.

---

## AI Agent Behavior

Sebelum membuat atau mengubah dokumen:

1. Inspect repository structure.
2. Read `AGENTS.md`.
3. Read relevant `.agents/*` guidance.
4. Search existing notes to avoid duplicates.
5. Identify whether the topic is:
   - Fundamentals
   - Business Process
   - Accounting
   - Sales
   - Purchasing
   - Inventory
   - Manufacturing
   - Finance
   - Assets
   - HR
   - Tax
   - Software-specific
   - Naventra-specific
6. Prefer primary/official sources.
7. Separate general concept from software implementation.
8. Add references.
9. Preserve internal links.
10. Keep Markdown compatible with Obsidian and Quartz.

Do not create duplicate concepts in multiple files unless the second file is explicitly a cross-reference or software-specific implementation.

---

## Quality Checklist

Before considering a document complete, verify:

- [ ] Definition is clear.
- [ ] Business purpose is explained.
- [ ] Business process is clear.
- [ ] Business rules are identified where relevant.
- [ ] Accounting impact is explained where relevant.
- [ ] Examples are internally consistent.
- [ ] General concept is separated from software implementation.
- [ ] Software version is identified where relevant.
- [ ] References are included.
- [ ] Links are valid.
- [ ] No unsupported claims.
- [ ] Terminology is consistent.
- [ ] Markdown is readable.

---

## Definition of Done

```text
Correct Source
    ↓
Correct Concept
    ↓
Clear Business Process
    ↓
Clear Business Rules
    ↓
Clear Accounting Impact
    ↓
Software Implementation Separated
    ↓
References Added
    ↓
Internal Links Valid
    ↓
Markdown Consistent
```

Primary objective:

> Build accurate, durable ERP domain knowledge.

Bukan jumlah dokumen.
