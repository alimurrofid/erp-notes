# ERP Notes — Comprehensive Audit Report

**Audit date:** 23 November 2026
**Scope:** `github.com/alimurrofid/erp-notes` (commit `417f82a`), live site `erpnotes.rofid.my.id`
**Mode:** read-only. No repository file was modified. The only files created are in `/audit/`.
**Method:** full or section-level read of all 200 Markdown files; programmatic verification of journal footing, wiki links, anchors, external URLs, Mermaid syntax, frontmatter, build, and live HTML; standards/regulatory spot-checks against primary sources.

> [!warning]
> **Addendum (23 November 2026).** Temuan **ACC-04** ("25% CIT") tidak valid: angka `25.000.000` pada `content/02-accounting/tax-accounting.md:109` adalah nominal beban, bukan tarif 25%. Temuan lain dalam laporan ini belum diverifikasi ulang dan tidak boleh diperlakukan sebagai aturan. Laporan ini bersifat historis; lihat `audit/README.md`.

---

## A. Executive Summary

ERP Notes is a **broad, well-structured, and unusually deep draft** of an ERP knowledge base — 200 files, ~272.000 words, 332 diagrams, 15 domain sections — but it is **not yet a trustworthy reference**.

Its strongest asset is the domain-first framing: concepts are separated from software behaviour, a single canonical company scenario runs through many modules, and most journal tables foot correctly (all 22 checked in 07/08, all 30 in 09/10, all 24 in 03/04, all in 05/06).

Its weakest asset is **cross-article truth**. The same transaction is valued at Rp700.000 and Rp750.000; revenue is recognised at delivery in one article and at invoice in four others; PPN is 12%/11-12 in the tax section and “11% statutory” in sales/purchasing; the same machine has two different 2028 carrying amounts.

The **software implementation layer is effectively empty** (four stub pages, 63 words total), and **Naventra exists only as 130 trailing design blocks** with no requirements, functional design, or implementation notes.

The learning layer is also absent: no learning path, prerequisites, objectives, exercises, glossary, or capstone.

Overall score: **6.1 / 10 — Needs Improvement**. The project can plausibly reach 8+ within one structured remediation cycle, because the hard part (domain breadth and writing discipline) is already done.

---

## B. Inventory and Audit Coverage

### B.1 Section inventory

| Section | Files | Words | Ref. sections | Frontmatter | Naventra block | Files with journals | Status | Access |
|---|---:|---:|---:|---:|---:|---:|---|---|
| `00-fundamentals` | 8 | 7.404 | 7 | 8 | 7 | 3 | Complete | Read 8/8 |
| `01-business-processes` | 6 | 7.781 | 5 | 6 | 0 | 5 | Complete | Read 6/6 |
| `02-accounting` | 18 | 17.453 | 17 | 18 | 0 | 13 | Complete | Read 18/18 |
| `03-sales` | 18 | 18.242 | 17 | 18 | 0 | 6 | Complete | Read 18/18 |
| `04-purchasing` | 18 | 21.099 | 17 | 18 | 4 | 7 | Complete | Read 18/18 |
| `05-inventory` | 18 | 23.673 | 17 | 18 | 17 | 7 | Complete | Read 18/18 |
| `06-manufacturing` | 18 | 25.099 | 17 | 18 | 17 | 7 | Complete | Read 18/18 |
| `07-finance` | 17 | 27.234 | 16 | 3 | 16 | 6 | Complete, metadata broken | Read 17/17 |
| `08-assets` | 17 | 29.233 | 16 | 1 | 16 | 12 | Complete, metadata broken | Read 17/17 |
| `09-project` | 18 | 29.798 | 17 | 1 | 17 | 5 | Complete, metadata broken | Read 18/18 |
| `10-hr` | 19 | 32.473 | 18 | 1 | 18 | 2 | Complete, metadata broken | Read 19/19 |
| `11-tax` | 19 | 32.507 | 18 | 19 | 18 | 15 | Complete | Read 19/19 |
| `20-software` | 4 | **63** | 0 | 4 | 0 | 0 | **Stub** | Read 4/4 |
| `30-naventra` | 1 | **19** | 0 | 1 | 0 | 0 | **Stub** | Read 1/1 |
| Root `index.md` | 1 | 118 | 0 | 1 | 0 | 0 | Thin | Read 1/1 |

**Totals:** 200 files; 182 non-index articles; 272.196 words; 182 references sections; 135 files with frontmatter; 130 with “Naventra Consideration”; 18 index pages.

### B.2 What was actually read

All 200 files were opened and assessed. Sections 00–02 were read in full by the lead auditor; `11-tax` was read in full for 14 articles and in targeted sections for the 5 longest (index, tax-reporting, tax-controls, tax-integration, tax-payment); sections 03–10 were read end-to-end by delegated readers. Every numeric quote in this report was re-verified by grep against the source. No file was unreadable.

### B.3 Knowledge Map claim vs reality

| Claim | Reality |
|---|---|
| Homepage map: Fundamentals → Business Processes → Accounting → Sales/Purchasing → Inventory → Manufacturing → Finance → Software → Naventra | Omits `08-assets`, `09-project`, `10-hr`, `11-tax` although all four exist and are listed below the map (`content/index.md:12-25`). |
| README “Learning Progress” marks every 00–11 article `[x]` | Software and Naventra are unchecked — honest — but the published site does not communicate that gap. |
| “ERP Software Implementation” is a stage of the map | The stage contains 63 words across three product pages. |

---

## C. Project Structure Audit

### C.1 Current structure

The numbered folders are logical and the reading order is defensible. Each section index is a curated, annotated list rather than a bare directory, and all 182 articles are reachable (no orphans found). Internal wiki links resolve to files in 808 of 815 cases; 7 links are broken and 1 anchor is broken.

The main structural problems are **not** in the directory names but in what the directories contain:

1. **The two terminal stages are empty.** `20-software` (4 files, 63 words) and `30-naventra` (1 file, 19 words) are placeholders. The project’s stated differentiator — “concept must remain valid in Odoo, ERPNext, Dynamics 365, SAP, Naventra” — is asserted but not demonstrated at article level.
2. **Naventra content is misplaced.** 130 general articles end with a “Naventra Consideration” block, 28 of them containing `CREATE TABLE` schemas. There is no consolidated requirements, functional design, or implementation note. The learning reader must read product design decisions to finish a concept article.
3. **Duplicated concepts across phases.** Four pairs claim a clean “Phase 3 vs Phase 7” boundary but repeat each other: `02-accounting/bank-reconciliation` ↔ `07-finance/bank-reconciliation`; `02-accounting/period-end-closing` ↔ `07-finance/financial-closing`; `02-accounting/financial-statements` ↔ `07-finance/financial-reporting`; `09-project/timesheet-and-effort-tracking` ↔ `10-hr/employee-timesheet-and-labor-cost`.
4. **Phase numbering is undefined.** Articles refer to “Phase 3 (Accounting)”, “Phase 4 (Sales)”, “Phase 5 (Purchasing)”, “Phase 12 (Tax)”, but no document defines the phase map, and folder numbers are one lower (02 = Phase 3). A reader cannot resolve the reference.
5. **Taxonomy drift in file naming.** Labels generally match titles, but 20 H1s differ from frontmatter titles (e.g. `journal-entry` title “Journal Entry” vs H1 “Journal Entry & The Posting Process”), and 65 files have no title at all.

### C.2 Structural recommendations

- Keep the numbered domain folders (they work) but add a `00-orientation` layer for learning path, glossary, and study guide.
- Move Naventra prose out of concept articles into `30-naventra/{requirements,functional-design,technical-design,implementation}`; leave a one-line cross-reference in the concept article.
- Demote `07-finance` overlap to “advanced/operational” articles that explicitly link back to the Phase 3 canonical explanation, or merge the duplicated ones.
- Publish a phase map (`00-orientation/phase-map.md`) if “Phase N” terminology is retained; otherwise remove phase numbers and use folder names.
- Add `40-reference/` for glossary, standards index, and regulation register.

---

## D. Content Audit Matrix

Severity: **P0** = misleading concept/accounting/regulation or broken site; **P1** = fundamental gap, contradiction, stale reference; **P2** = consistency, learning, metadata, UX; **P3** = polish.
Jenis: **F** = Fakta, **D** = Dugaan, **S** = Saran.

### D.0 Section summaries

| Section | Strengths | Main problems | Status |
|---|---|---|---|
| **00 Fundamentals** | Clear definitions, hierarchy, data taxonomy, document/event layers, ripple-effect example. | Revenue-at-invoice example; Odoo “branch” mapping; PSAK absent; no multi-currency/period fundamentals. | Good draft |
| **01 Business Processes** | Five end-to-end articles follow the required trigger→impact→next pattern; strong exception notes. | Only five processes; revenue timing wrong in O2C; no intercompany/returns process. | Good draft |
| **02 Accounting** | Correct double-entry, COA, GL/subledger, AR/AP, FX, closing, statements; most journals foot. | 25% CIT, IAS 37 misuse, posting-date cut-off, advance VAT, LIFO rationale, duplicate bank recon. | Needs correction |
| **03 Sales** | Rich lifecycle, pricing, credit, commission, backorder, returns, revenue-recognition article. | Revenue at invoice in 3 articles; stale PPN/Coretax; conflicting stock baselines; approval threshold clash. | Needs correction |
| **04 Purchasing** | Strong PR→RFQ→PO→GR→match→bill→pay chain; GR/IR well explained; landed cost. | Stale PPN/Coretax; document IDs differ per article; return at 700k after 750k valuation; Incoterms/title confusion. | Needs correction |
| **05 Inventory** | Best costing chapter (FIFO/AVCO/standard), landed cost, reservation, traceability, count. | Raw-material account naming, availability double count, NRV reversal missing, ROP formula, return valuation. | Good draft |
| **06 Manufacturing** | MRP, BOM, routing, shop floor, WIP, subcontracting, OEE math. | Same MO has 3 cost structures; scrap decomposition; planning grids contradict rules; yield defined 3 ways. | Needs correction |
| **07 Finance** | Real treasury, cash, working capital, CCC math, closing governance. | 30/34 no frontmatter; bank recon error; planning sign error; duplicate with 02; statutory date swap. | Needs metadata + fixes |
| **08 Assets** | IAS 16 done properly (componentization, revaluation, disposal, FY5), fiscal groups correct. | 2028 schedule conflict across 3 articles; COA mismatch; maintenance ratio; reversal/CGU missing. | Needs correction |
| **09 Project** | Strong WBS/EVM/cost/billing arc; IFRS 15 concepts; 300M milestone scenario. | Labour table sums to 91,6M not 90M; 3 labour postings; 4 WBS dialects; billing vs revenue at milestone. | Needs correction |
| **10 HR** | Payroll lifecycle, PP 58/2023 + PMK 168/2023, BPJS table, SoD matrix, J1–J5 chain. | No labour statute; BPJS split mismatch; overtime hybrid; placeholder hash; duplicate timesheet. | Needs correction |
| **11 Tax** | Best section: PMK 131/2024, PMK 11/2025, Coretax, 3-month credit, CIT 22%/31E, KAP/KJS. | No PPh 21/22 depth; gross-up unverified; e-Faktur deadline nuance; disconnected from sales/purchase. | Strong draft |
| **20 Software** | Comparison tables in 100+ articles. | 63 words total; no product articles; versions only for Odoo 17; dead vendor links. | Stub |
| **30 Naventra** | 130 design blocks with useful schemas. | 19-word section; no requirements/functional/technical/implementation docs; no traceability. | Stub |

### D.1 Structure, navigation, metadata

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| STR-01 | Struktur | P1 | F | `content/20-software/*` | “Catatan implementasi, modul, konfigurasi, dan alur kerja spesifik pada Odoo.” | Entire software pillar is 63 words; project promise unmet. | Write per-product articles or explicitly label section “coming soon” and remove from map. | L |
| STR-02 | Struktur | P1 | F | `content/30-naventra/index.md:5` | “Keputusan desain (design decisions), requirement mapping, dan implementasi custom ERP Naventra” | 19-word page, zero requirements/design/implementation docs. | Build 4 sub-sections: requirements, functional design, technical design, implementation notes. | L |
| STR-03 | Struktur | P1 | F | 130 files, e.g. `05-inventory/inventory-costing.md:171` | “CREATE TABLE inventory_cost_layers” | Product schema mixed into learning articles; no consolidated design. | Move to `30-naventra/technical-design`; keep a link only. | L |
| STR-04 | Struktur | P2 | F | `02-accounting/bank-reconciliation.md` ↔ `07-finance/bank-reconciliation.md` | Both explain MT940/CAMT.053 matching and clearing journals. | Duplicate canonical explanation; drift risk. | Merge or make 07 a delta with explicit “see Phase 3 for model”. | M |
| STR-05 | Struktur | P2 | F | `02-accounting/period-end-closing.md` ↔ `07-finance/financial-closing.md` | Both give a sequential close checklist ending in period lock. | Two “source of truth” closing procedures. | Keep one checklist; 07 covers governance/calendar only. | M |
| STR-06 | Struktur | P2 | F | `09-project/timesheet-and-effort-tracking.md` ↔ `10-hr/employee-timesheet-and-labor-cost.md` | Same timesheet, rates and labour postings; different journals. | Reader cannot tell which posting is authoritative. | Define one owner (HR captures time, Project consumes cost) and cross-link. | M |
| STR-07 | Struktur | P2 | F | `content/index.md:12-25` | Map ends at Finance → Software → Naventra. | Assets, Project, HR, Tax invisible in the main mental model. | Redraw map with all 14 sections and dependency arrows. | S |
| STR-08 | Struktur | P3 | F | `05-inventory/index.md:9`, `09-project/index.md` | “Phase 5 (Purchasing / P2P)”; “Phase 10” | Phase numbers undefined and offset from folder numbers. | Publish phase map or drop phase numbers. | S |
| STR-09 | Struktur | P3 | F | 20 files, e.g. `02-accounting/journal-entry.md:5` | H1 “Journal Entry & The Posting Process” ≠ title “Journal Entry”. | Inconsistent page title vs browser/sidebar title. | Align title and H1; one canonical label. | S |

### D.2 Accounting and reporting

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| ACC-01 | Accounting | **P0** | F | `03-sales/sales-fundamentals.md:71`, `03-sales/sales-reporting-and-analytics.md:52`, `03-sales/order-to-cash-integration.md:30`, `01-business-processes/order-to-cash.md:108` | “pengakuan Pendapatan (Revenue) saat penagihan” vs “BUKAN semata-mata saat faktur dicetak” | Four articles recognise revenue at invoice/collection; one states IFRS 15 correctly. Reader learns the wrong rule. | Make control transfer the single rule; rewrite O2C, sales fundamentals, reporting, integration. | M |
| ACC-02 | Accounting | **P0** | F | `03-sales/sales-tax.md:86`, `04-purchasing/purchase-tax.md:79` | “Ditetapkan sebesar 11% (efektif sejak 1 April 2022)” | States 11% as statutory rate in 2026; contradicts `11-tax/vat-fundamentals.md:116` (12% + DPP 11/12). | Add dated 12%/11-12 note everywhere; align with PMK 131/2024 and PMK 11/2025. | M |
| ACC-03 | Accounting | P1 | F | `02-accounting/journal-entry.md:55` | “posting date dicatat 5 September agar masuk ke periode pembukuan September” | Endorses posting an August expense in September; violates cut-off/accrual. | Accrue in August (Dr expense/inventory, Cr accrued/GR-IR); clear in September. | S |
| ACC-04 | Accounting | P1 | F | `02-accounting/tax-accounting.md:109` | “Beban Pajak Penghasilan Badan … 25.000.000” | 25% CIT contradicts 22% in `11-tax/corporate-income-tax-calculation.md:47`. | Use 22% or label the 25% as a non-Indonesian jurisdiction. | S |
| ACC-05 | Accounting | P1 | F | `09-project/project-billing-and-revenue.md:87` | “Kredit: Contract Liability / Deferred Revenue Rp60.000.000” | Milestone already achieved (BAST) yet revenue deferred; contradicts IFRS 15. | Recognise revenue at performance; use contract liability only when billing precedes performance. | M |
| ACC-06 | Accounting | P1 | F | `08-assets/depreciation-management.md:149` vs `08-assets/asset-revaluation.md:116` | “Akumulasi Penyusutan … Rp60.000.000” vs 33-month schedule (Rp55.000.000) | Same asset, same date, different accumulated depreciation/residual/life. | One versioned asset schedule driving depreciation, revaluation, impairment, disposal. | M |
| ACC-07 | Accounting | P1 | F | `09-project/timesheet-and-effort-tracking.md:154` | “920 Jam … Rp90.000.000” | Line items sum to Rp91.600.000; corrupts margin 39,67% and variance +Rp19 jt. | Correct table or change rates; recompute AC 182,6 M, margin 39,13%, variance 17,4 M. | S |
| ACC-08 | Accounting | P1 | F | `04-purchasing/procure-to-pay-integration.md:164` | “Persediaan Barang Dagang: Rp700.000” | Return relieved at 700k after inventory valued at 750k; 50k stranded. | Relieve 750k; expense the non-recoverable freight 50k. | S |
| ACC-09 | Accounting | P1 | F | `03-sales/sales-order.md:136` vs `04-purchasing/prepayment-and-down-payment.md:112` | “Uang Muka Penjualan … Deferred Revenue” with no PPN line | Sales advance ignores output VAT; purchase advance computes but does not post it. | One advance-VAT policy; split DPP/VAT in both directions. | M |
| ACC-10 | Accounting | P1 | F | `06-manufacturing/production-costing-and-wip.md:118` | “Biaya 5 Unit Scrap Rp437.500” | Scrap at 87,5k/unit vs standard 75k; 62,5k is unabsorbed WIP conversion. | Scrap 375k; labour variance 187,5k; overhead variance 75k. | S |
| ACC-11 | Accounting | P1 | F | `09-project/project-cost-management.md:103` vs `09-project/project-material-and-inventory.md:85` | Material 28 M posted to expense in one, WIP in the other. | Same project material, two accounts. | Single WIP→COGS policy per revenue method. | M |
| ACC-12 | Accounting | P1 | F | `10-hr/index.md:146` | “Employer BPJS Rp800.000” on Rp12 M wages | Own rate table implies ~1,2 M employer and 480k employee, not 800k/600k. | Recompute from JKK/JKM/JHT/JP/Kesehatan rates and caps. | S |
| ACC-13 | Accounting | P2 | F | `07-finance/bank-reconciliation.md:131` | “Saldo Akhir: Rp65.475.000” | 45 + 25 + 15 + 0,5 − 0,025 = 85,475 M, not 65,475 M. | Correct to Rp85.475.000; recompute matched %. | S |
| ACC-14 | Accounting | P2 | D | `02-accounting/accounts-payable.md:36` | “Unbilled Receipt Liability / IAS 37” | GR/IR accrual is a trade payable, not an IAS 37 provision. | Cite IFRS 9/Conceptual Framework or IAS 37.2 exclusion. | S |
| ACC-15 | Accounting | P2 | F | `01-business-processes/inventory-process.md:129` | “Pendapatan Selisih Lebih Persediaan (Inventory Gain)” | Count gain credited to revenue; IFRS 15 does not apply. | Credit inventory adjustment/COGS, not revenue. | S |
| ACC-16 | Accounting | P2 | F | `05-inventory/stock-quantity-and-availability.md:83-90` | “On-Hand − Reserved − Allocated … = 35” and “85 − 50 = 35” | Allocated is claimed to be part of reserved but subtracted twice. | Define one quantity taxonomy; remove double subtraction. | S |
| ACC-17 | Accounting | P2 | F | `06-manufacturing/mrp-material-requirement-planning.md:93-96` | Week 4 shows “10” and “60” for the same balance. | Wrong ending balance copied by readers. | Correct to 60 in both rows. | S |
| ACC-18 | Accounting | P2 | F | `06-manufacturing/production-planning.md:103` | Projected stock 2, below safety stock 10, no MPS receipt. | Grid violates its own trigger rule. | Trigger MPS in week 1 or explain safety-stock policy. | S |
| ACC-19 | Accounting | P2 | D | `02-accounting/accounts-payable.md:107` and `03-sales/accounts-receivable.md:70` | 2% discount applied to VAT-inclusive total | Indonesian VAT base normally reduced by the discount; input/output VAT left overstated. | State assumption; if DPP reduced, adjust VAT and cash. | M |
| ACC-20 | Accounting | P2 | F | `03-sales/sales-commission.md:95` | “Beban Komisi Penjualan (Commissions Expense)” | IFRS 15.91 requires capitalising incremental contract-acquisition costs if recoverable. | Add capitalise/amortise rule and practical expedient. | M |
| ACC-21 | Accounting | P2 | F | `05-inventory/inventory-costing.md:19` | “nilai terendah antara Biaya Perolehan … dan NRV” | NRV write-down and IAS 2.33 reversal never demonstrated. | Add write-down and reversal examples. | M |
| ACC-22 | Accounting | P2 | F | `05-inventory/inventory-costing.md` (no §) | No allocation of fixed overhead at normal capacity. | IAS 2.13 unallocated overhead absent across 18 inventory articles. | Add normal-capacity rule and idle-capacity expense. | M |
| ACC-23 | Accounting | P2 | D | `11-tax/withholding-tax-management.md:67` | “gross-up dapat diakui sebagai biaya fiskal yang dapat dikurangkan” | PPh 23 borne by payer is commonly non-deductible; unsourced. | Verify with tax counsel; add citation or warning. | M |
| ACC-24 | Accounting | P3 | F | `02-accounting/period-end-closing.md:90` | “dicatat pada periode berjalan dengan … Retrospective Restatement” | Contradictory: restatement adjusts opening balances/comparatives. | Reword per IAS 8.42. | S |
| ACC-25 | Accounting | P3 | F | `05-inventory/inventory-accounting.md:52` | LIFO banned “karena tidak mencerminkan aliran fisik” | Wrong rationale; article itself says physical flow ≠ cost flow. | Cite IAS 2.25 measurement reliability. | S |
| ACC-26 | Accounting | P2 | F | `02-accounting/financial-statements.md:124` vs `11-tax/tax-integration.md:115` | “Laba Sebelum Pajak Rp 15.350.000” vs “EBT: Rp100.000.000” | Same company has two incompatible annual results and tax charges. | Reconcile the tax scenario to the financial statements or label separate cases. | S |

### D.3 Business process, sales, purchasing

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| BIZ-01 | Business Process | P1 | F | all content | Only 21 files contain “Trigger”; only 5 “Next Process”. | 160+ articles do not follow the required process pattern. | Add Trigger/Validation/Exception/Next to core process articles. | L |
| BIZ-02 | Business Process | P2 | F | `03-sales/sales-order.md:88-96` | No `Confirmed → Cancelled`; enum omits Cancelled/Partially Delivered. | Cancellation after confirmation is unmodelled. | Complete state machine. | S |
| BIZ-03 | Business Process | P2 | F | `04-purchasing/purchase-order.md:42` | “Draft/Approved/Issued/Received/Invoiced/Closed” | No Cancelled state despite a whole cancellation article. | Add Cancelled/Closed-for-shortage. | S |
| BIZ-04 | Business Process | P2 | F | `06-manufacturing/manufacturing-order.md:42-45` | Cancel only from Draft/Planned/Scheduled/Released. | MO with consumed material has no exit path. | Add Hold/Cancel/Scrap-WIP transitions. | M |
| BIZ-05 | Business Process | P2 | F | `09-project/project-management-fundamentals.md:82-91` | No Cancelled/Lost branch. | Rejected bid or terminated contract unmodelled. | Add Lost/Cancelled/Terminated. | S |
| BIZ-06 | Business Process | P2 | F | `03-sales/sales-order.md:156` vs `03-sales/order-fulfillment.md:109` | ATS “50 → 40” vs “35 → 25” for same SO. | Same order, different stock baseline. | One stock ledger per scenario. | S |
| BIZ-07 | Business Process | P2 | F | `04-purchasing/procure-to-pay-integration.md:120` vs other 04 files | PR-2026-00042 vs PR-2026-09-0041; PO/GR/Bill all differ. | “Canonical” P2P chain is not traceable. | Single document-ID table referenced by all articles. | S |
| BIZ-08 | Business Process | P2 | F | `03-sales/sales-quotation.md:50` vs `:83-85` | Approval at “diskon > 10%” vs matrix 5%/15%. | Two approval thresholds. | Align or label one as example. | S |
| BIZ-09 | Business Process | P2 | F | `04-purchasing/goods-receipt-and-service-receipt.md:45` | “Belum masuk stok aktif; menunggu inspeksi.” | Presented as universal; Odoo/ERPNext post stock at receipt. | Mark as QM configuration, not default. | S |
| BIZ-10 | Business Process | P2 | F | `03-sales/sales-return-and-credit-note.md:96` | “Kredit: Beban Pokok Penjualan (COGS Reversal)” for scrap | Inventory bypassed; COGS/scrap presentation wrong. | Dr Scrap Expense / Cr Inventory. | S |
| BIZ-11 | Business Process | P2 | F | `05-inventory/inventory-picking-and-delivery.md:96` | “(4) Financial Invoice (Vendor Bill / Customer Invoice)” | Vendor Bill in an outbound flow. | Remove vendor bill. | S |
| BIZ-12 | Business Process | P2 | F | `04-purchasing/purchasing-pricing-and-terms.md:23` | Incoterms “menentukan … perpindahan risiko kepemilikan” | Incoterms do not transfer title. | Separate risk, cost, title. | S |
| BIZ-13 | Business Process | P2 | F | `05-inventory/inventory-return-and-reversal.md:86` | “Rp700.000 (harga pokok perolehan DPP)” | Same root cause as ACC-08, second location: 50k stays in inventory. | Relieve 750k and expense freight. | S |
| BIZ-14 | Business Process | P2 | F | `06-manufacturing/production-output-and-by-product.md:60` vs `:68` | Yield = good/planned and scrap = scrap/input. | Same 100 used as planned output and input. | Define yield = good/input. | S |
| BIZ-15 | Business Process | P2 | F | `06-manufacturing/manufacturing-fundamentals.md:128` | “DRAFT → PLANNED → CONFIRMED → RELEASED” | Contradicts SCHEDULED chain in `manufacturing-order.md`. | One state model. | S |
| BIZ-16 | Business Process | P3 | F | `03-sales/accounts-receivable-integration.md:53` vs `04-purchasing/accounts-payable-integration.md:55` | Due date from posting date vs document date. | AR/AP ageing diverge. | Standardise on document date + terms. | S |
| BIZ-17 | Business Process | P3 | F | `03-sales/sales-tax.md:45` | Beras/daging/jasa medis labelled “dibebaskan” | Exempt vs not-object changes input VAT credit. | Align with `11-tax/vat-fundamentals.md:53`. | S |

### D.4 Inventory and manufacturing

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| INV-01 | Inventory | P1 | F | `05-inventory/inventory-integration.md:80,88` | “Persediaan Barang Dagang” then “Persediaan Bahan Baku” for same components | Raw material account inconsistent; 15 occurrences of merchandise account. | Standardise raw material vs merchandise accounts. | S |
| INV-02 | Inventory | P1 | F | `05-inventory/inventory-integration.md:88-89` | WIP→FG moves material only, no labour/overhead. | Integration article produces WIP that never accumulates conversion. | Add conversion absorption to WIP flow. | M |
| INV-03 | Inventory | P2 | F | `05-inventory/replenishment-and-stock-planning.md:94` | “Order Qty = Max − Current Stock” | Ignores on-order/reserved; double ordering. | Max − inventory position. | S |
| INV-04 | Inventory | P2 | F | `05-inventory/inventory-fundamentals.md:72-78` | Five ownership nodes, zero edges. | Core diagram renders as disconnected boxes. | Connect nodes. | S |
| INV-05 | Inventory | P2 | F | `05-inventory/inventory-uom-and-conversion.md:34,63` | Pack = 6 units vs Pack = 4 pcs. | Same UOM, two factors. | One conversion table. | S |
| INV-06 | Inventory | P2 | D | `05-inventory/physical-inventory-count.md:140` | “Annual Inventory Day and Month pada level lokasi” (Odoo) | Likely SAP field, not Odoo location. | Verify against Odoo 17 docs or remove. | S |
| INV-07 | Inventory | P2 | D | `06-manufacturing/capacity-planning-and-scheduling.md:137-138` | Odoo “finite capacity” shifting orders | Odoo shows overload; does not finite-schedule by default. | Re-verify; state configuration-dependent. | S |
| INV-08 | Manufacturing | P1 | F | `06-manufacturing/manufacturing-integration.md:126` vs `production-costing-and-wip.md:64` | Same MO-2026-0042, component 700k/750k vs 50k. | Canonical MO has ~10× different material cost. | One manufacturing cost sheet. | M |
| INV-09 | Manufacturing | P2 | F | `06-manufacturing/material-consumption-and-backflush.md:104` vs `production-variance-and-performance.md:66` | 102 sets vs 103 sets for same MO. | MUV 1 M vs 1,5 M. | Align waste quantity. | S |
| INV-10 | Manufacturing | P2 | F | `06-manufacturing/production-variance-and-performance.md:114` | Total variance 3,82 M excludes overhead. | “Total” is incomplete. | Include OSEV/OVEV or rename. | S |
| INV-11 | Manufacturing | P2 | D | `06-manufacturing/production-costing-and-wip.md:151` | Odoo EUP “dihitung otomatis berdasarkan persentase penyelesaian” | Odoo has no equivalent-unit calculation. | Remove or mark as custom. | S |
| INV-12 | Manufacturing | P2 | D | `05-inventory/inventory-adjustment.md:120`, `06-.../production-output-and-by-product.md:112` | “Scrap Journal” in D365 | No such standard journal type. | Use inventory adjustment/movement. | S |
| INV-13 | Manufacturing | P2 | F | `06-manufacturing/routing-and-work-center.md:100-101` | Capacity = hours × machines × efficiency × utilisation | Utilisation is an outcome; formula double-counts. | Capacity = available hours × efficiency; utilisation = load/capacity. | S |
| INV-14 | Manufacturing | P3 | F | `06-manufacturing/shop-floor-execution.md:144` | “MES Integration API berbasis pesan mikrofonik” | Non-existent term; likely “microservice”. | Correct. | S |
| INV-15 | Manufacturing | P3 | F | `05-inventory/lot-and-serial-number-tracking.md` | No valuation consequence for expired/quarantined stock. | Traceability article has no accounting leaf. | Add NRV/write-off treatment. | M |

### D.5 Finance, assets, project, HR

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| FIN-02 | Finance | P2 | F | `07-finance/financial-planning.md:153` | “+23.000.000 (Efisiensi unit turun)” | COGS fell 23 M; sign and label inverted. | −23.000.000; explain volume effect. | S |
| FIN-03 | Finance | P2 | F | `08-assets/asset-maintenance-integration.md:126` | “18.500.000 / 20.000.000 = 92,5%” | NBV at end-2029 is ~45 M, ratio ~41%. | Recompute on correct NBV. | S |
| FIN-04 | Finance | P2 | F | `08-assets/asset-transfer-and-location.md:130` | “Akumulasi Penyusutan: Rp30.000.000” at Jul 2027 | 16 months = 26,7 M on own schedule. | Correct to 26,7 M / NBV 93,3 M. | S |
| FIN-05 | Finance | P2 | F | `07-finance/cash-flow-planning.md:96` | “PPh 21 tanggal 15, BPJS Ketenagakerjaan tanggal 10” | Dates appear swapped (PPh 21 = 10th; BPJS = 15th). | Verify and correct. | S |
| FIN-06 | Finance | P2 | D | `10-hr/overtime-and-time-management.md:65` | “kelebihan jam kerja dianggap tanggung jawab manajerial” | Imports US FLSA exempt concept into Indonesian statutory overtime. | Remove or cite narrow statutory exclusion. | M |
| FIN-07 | Finance | P2 | D | `10-hr/overtime-and-time-management.md:36` | “7-8 Jam Pertama: Pengali 2,0x” | Hybrid of 5-day (8h) and 6-day (7h) schemes; company is 5-day. | Use 8h for 5-day week. | S |
| FIN-08 | Finance | P2 | F | `10-hr/leave-management.md:17` | Legal basis asserted without any Indonesian statute. | 12-day leave, maternity 3 months, sick-pay scale uncited. | Add UU 13/2003, UU 4/2024, PP 35/2021 citations. | M |
| FIN-09 | Finance | P2 | F | `09-project/project-completion-and-closing.md:100` | All cost in WIP while revenue recognised progressively. | Revenue without matching cost for six months. | Accrue COGS periodically under over-time method. | M |
| FIN-10 | Finance | P2 | F | `08-assets/asset-revaluation.md:121` vs `asset-impairment.md:133` | Fair value 80 M vs recoverable 42 M, same date/asset. | Two truths for one asset. | One valuation case per period. | M |
| FIN-11 | Finance | P2 | F | `08-assets/asset-master-data.md:123` vs `asset-classification.md:114` | 151100/151190/610400 vs 153000/153090/610420. | Two charts of accounts for one machine. | Single COA mapping table. | S |
| FIN-12 | Finance | P2 | F | `10-hr/hr-controls-and-governance.md:85` | “Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4” | Empty-string SHA-256 truncated; fake audit hash. | Replace with illustrative but labelled hash. | S |
| FIN-13 | Finance | P3 | F | `08-assets/physical-asset-verification.md:126` | Found asset credited to “Pendapatan Lain-Lain” | Prior-period error should adjust opening equity, not income. | Apply IAS 8.41-42 or state policy. | S |
| FIN-14 | Finance | P3 | F | `08-assets/asset-componentization.md:39` | “≥ 15–20% dari total harga paket aset” | Invented threshold presented as IAS 16 test. | Remove number or label as policy heuristic. | S |
| FIN-15 | Finance | P3 | F | `07-finance/financial-controls.md:7` | “COSO … tiga lini pertahanan” | Three Lines Model is IIA, not COSO. | Separate the frameworks. | S |

### D.6 Tax and compliance

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| TAX-01 | Tax | **P0** | F | `03-sales/sales-tax.md:87`, `04-purchasing/purchase-tax.md:80` | “Nomor Seri Faktur Pajak (NSFP) … dialokasikan oleh DJP” | Pre-Coretax invoice model taught as current; numbers are system-generated today. Rate issue is ACC-02. | Rewrite with Coretax, pre-population, and system-generated numbers. | M |
| TAX-02 | Tax | P1 | F | `04-purchasing/purchase-tax.md:79-80` | “Dikenakan sebesar 11%” + QR scanner | No Coretax, no date, no DPP mechanism. | Rewrite to match `11-tax/input-vat-and-output-vat.md`. | M |
| TAX-03 | Tax | P2 | F | `02-accounting/tax-accounting.md:88` | “PPh Pasal 23 - Tarif 2%” | Correct rate but no NPWP 4% rule, no e-Bupot. | Add withholding matrix. | S |
| TAX-04 | Tax | P2 | F | `02-accounting/index.md:53` | Index promises PPh 21, 23 and 4(2). | Article covers only PPh 23 and CIT. | Fix index or add sections. | S |
| TAX-05 | Tax | P2 | F | `04-purchasing/index.md:50` | Index promises PPh 22 and 4(2). | `purchase-tax.md` covers only PPh 23. | Fix index or add sections. | S |
| TAX-06 | Tax | P2 | F | `10-hr/payroll-tax-and-statutory-compliance.md:62-64` | “Terdapat plafon … diperbarui berkala” | No cap values or dates; cannot configure BPJS. | Add dated caps (Kesehatan, JP) with source. | S |
| TAX-07 | Tax | P2 | D | `10-hr/payroll-benefits-and-reimbursements.md:126` | Reimbursements “tidak dikenakan pemotongan pajak” | Only genuine receipted reimbursements are exempt; fixed allowances taxable. | Qualify the rule; cite PMK 168/2023. | S |
| TAX-08 | Tax | P2 | F | `11-tax/withholding-tax-management.md:67` | Gross-up “dapat diakui sebagai biaya fiskal” | Contentious and unsourced; may teach non-deductible as deductible. | Verify with tax counsel; add warning. | M |
| TAX-09 | Tax | P3 | D | `11-tax/tax-closing-and-period-end.md:70` | “Validasi Batas Unggah e-Faktur (Maksimal Tgl 15)” | Not a general statutory issuance deadline. | Clarify operational cut-off vs legal deadline. | S |
| TAX-10 | Tax | P3 | F | 03/04/05/06/08 files | PPN 11% unqualified in 2026-dated examples | Propagation of ACC-02 across examples. | Global note “effective 11%” or update numbers. | M |

### D.7 Learning experience

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| LRN-01 | Learning | P1 | F | all content | 0 files contain “Learning Path”, “Prasyarat”, or “Learning Objective”. | No route from beginner to advanced. | Publish 4 learning paths with prerequisites. | M |
| LRN-02 | Learning | P1 | F | all content | 0 files contain “Latihan”, “Studi Kasus”, or “Glosarium”. | No practice, no capstone, no glossary. | Add exercises per section + 1 end-to-end capstone. | L |
| LRN-03 | Learning | P2 | F | section indexes | Indexes summarise articles but not outcomes. | Reader cannot self-assess. | Add “After this section you can …”. | S |
| LRN-04 | Learning | P2 | F | 18 files | “Skenario Kanonikal: PT Maju Bersama” exists but diverges. | Strong device undermined by inconsistent numbers. | Single canonical dataset sheet linked everywhere. | M |

### D.8 UX/UI and technical

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| UX-01 | UX/UI | P1 | F | 65 pages, e.g. live `/07-finance/bank-account-management` | Page title and H1 show “bank-account-management”. | One third of the site looks broken/unfinished. | Add `title:` frontmatter to all 65. | S |
| UX-02 | UX/UI | P1 | F | 12 diagrams, e.g. `04-purchasing/goods-receipt-and-service-receipt.md:63` | Edge label “Lolos Uji Mutu (100%)” | Mermaid 11.4 parse error; diagram does not render. | Quote labels or remove parentheses. | S |
| UX-03 | UX/UI | P2 | F | `10-hr/index.md:27-60` and 4 other indexes | Wiki-link syntax inside Mermaid node labels | Literal double-bracket text shown in diagram. | Remove wiki links from diagram labels. | S |
| UX-04 | UX/UI | P2 | F | every article, e.g. live `/00-fundamentals/erp-architecture` | Two `<h1>` elements per page. | Accessibility/SEO heading hierarchy broken. | Remove content H1 or disable ArticleTitle H1. | S |
| UX-05 | UX/UI | P2 | F | `public/index.html` | `<html lang="en">` for Indonesian content. | Screen readers/SEO language mismatch. | Set `locale: "id-ID"` and html lang. | S |
| UX-06 | UX/UI | **P0** | F | `07-finance/*` (7 links) | `[[06-manufacturing/bill-of-materials]]` → 404 | Seven internal links lead to 404 pages. | Point to `product-structure-and-bom.md`, etc. | S |
| UX-07 | UX/UI | P2 | F | `02-accounting/journal-entry.md:56` | `#INV-2026-0042` in prose | Creates a public tag page `/tags/INV-2026-0042`. | Escape `#` or write “No. INV-2026-0042”. | S |
| UX-08 | UX/UI | P3 | F | layout | No prev/next article, no “edit this page”. | Weak sequential reading. | Add prev/next + edit link. | M |
| TECH-01 | Technical | P1 | F | `quartz.config.ts:21` | `baseUrl: "erpnotes.rofid.me"` vs live `.my.id` | Sitemap, RSS, OG and Twitter URLs point to wrong domain. | Change to `erpnotes.rofid.my.id` and rebuild. | S |
| TECH-02 | Technical | P2 | F | live `/robots.txt` | Returns 404. | Sitemap discovery not advertised. | Add `robots.txt` with sitemap URL. | S |
| TECH-03 | Technical | P2 | F | live HTML | No `<link rel="canonical">`. | Duplicate/indexation risk, especially with two domains. | Enable canonical URL output. | M |
| TECH-04 | Technical | P1 | F | reference URLs | 44 of 136 unique reference URLs return 404. | A quarter of cited sources cannot be checked. | Replace dead URLs; add CI link check. | M |
| TECH-05 | Technical | P1 | F | 928 reference lines | Only 194 (21%) contain a URL; 05–11 have 0. | Most references are unverifiable titles. | Require URL/DOI/regulation number per reference. | L |
| TECH-06 | Technical | P2 | F | `npm audit` | 18 vulnerabilities: 12 high, 2 moderate, 4 low. | Supply-chain risk in build tooling. | Update dependencies; run audit in CI. | M |
| TECH-07 | Technical | P2 | F | `.github/workflows/deploy.yml` | Build + deploy only; no lint/link/Mermaid checks. | Defects reach production (as they did). | Add markdownlint, link check, mermaid parse, build. | M |
| TECH-08 | Technical | P3 | F | live homepage | Page title reads “ERP Notes — ERP Notes” | Duplicated suffix. | Skip suffix on home page. | S |

### D.9 Maintainability and Naventra

| ID | Kategori | Severity | Jenis | Lokasi | Bukti (≤15 kata) | Dampak | Saran perbaikan | Effort |
|---|---|---|---|---|---|---|---|---|
| MNT-01 | Maintainability | P1 | F | repository root | No `CONTRIBUTING.md`, no linter config, no link checker. | Regressions are inevitable and invisible. | Add contributing guide, template, CI checks. | M |
| MNT-02 | Maintainability | P2 | F | all frontmatter | No `date`, `version`, `status`, `reviewed`, `sources`. | Cannot tell draft from reviewed or which software version. | Define frontmatter schema and enforce it. | M |
| MNT-03 | Maintainability | P2 | F | headings | “References” 164 vs “Referensi” 18; “Purpose” 68 vs “Tujuan Bisnis” 18. | Two article dialects; automation harder. | Pick one language per heading; migrate. | M |
| MNT-04 | Maintainability | P2 | F | 05–11 | References have no URLs/dates. | Content rot undetectable. | Add review cadence and dated sources. | L |
| MNT-05 | Maintainability | P3 | F | git history | One bulk content commit for 190 files. | No provenance per article. | Commit per section/article going forward. | S |
| NAV-01 | Naventra | P1 | F | 130 articles | Median 126-word design block appended to concept article. | Learning flow interrupted; no design baseline. | Extract to `30-naventra` with traceability IDs. | L |
| NAV-02 | Naventra | P1 | F | `30-naventra/index.md` | 19 words, no requirements/design/implementation. | Cannot evaluate Naventra implementation at all. | Write requirements → functional → technical → implementation. | L |
| NAV-03 | Naventra | P3 | F | `09-project/project-billing-and-revenue.md:111` | “Example: Implementasi ERP Naventra” used for generic example | Mislabels general content as product-specific. | Rename to “Example” and link Naventra separately. | S |
| SW-01 | Software | P1 | F | `20-software/*/index.md` | 14–15 words per product. | No implementation knowledge beyond comparison tables. | Add per-product articles with menus, models, versions, screenshots. | L |
| SW-02 | Software | P2 | F | `03-sales/revenue-recognition.md:124` | D365 “Revenue Recognition Workspace” | Microsoft deprecated it January 2024; subscription billing is current. | Update to current capability. | S |
| SW-03 | Software | P2 | D | 05/06 comparison tables | Odoo finite capacity, Odoo EUP, D365 Scrap Journal | Several product claims likely wrong for cited versions. | Verify each against vendor docs; add version tags. | M |

---

## E. Accounting Accuracy Findings (deep audit)

### E.1 Revenue recognition timing — the central error

**Finding ACC-01.** The knowledge base contains four mutually incompatible statements:

| Location | Statement | IFRS 15 status |
|---|---|---|
| `03-sales/revenue-recognition.md:13` | Revenue at transfer of control, “BUKAN … saat faktur dicetak” | Correct |
| `03-sales/sales-fundamentals.md:71` | Revenue at “penagihan” | Wrong (collection ≠ performance) |
| `03-sales/sales-reporting-and-analytics.md:52` | “telah benar-benar diserahkan dan difakturkan” | Wrong (adds invoicing condition) |
| `03-sales/order-to-cash-integration.md:30` | Invoice step labelled “Pengakuan Pendapatan” | Wrong |
| `01-business-processes/order-to-cash.md:108` | Revenue recognised at invoice, citing IFRS 15 | Wrong |

**Why it matters:** a learner implementing O2C will recognise revenue when the invoice is printed. That misstates revenue, receivables, contract assets/liabilities, and VAT timing whenever delivery and invoicing fall in different periods.

**Correct model (IFRS 15.31–38, PSAK 72):**

1. **Control transfers at delivery, invoice later**
   - Delivery: Dr Contract asset (or AR if right is unconditional) / Cr Revenue.
   - Invoice: Dr AR / Cr Contract asset; Dr AR / Cr VAT payable when tax invoice issued.
2. **Invoice before delivery (advance)**
   - Invoice/cash: Dr AR/Bank / Cr Contract liability; Cr VAT payable (tax point earlier of payment/delivery).
   - Delivery: Dr Contract liability / Cr Revenue.
3. **Delivery and invoice simultaneous**
   - Dr AR / Cr Revenue; Cr VAT payable.

**Reconstruction for the canonical Rp10.000.000 sale (COGS Rp7.000.000, PPN effective 11% = 12% × 11/12):**

| Event | Account | Debit | Credit |
|---|---|---:|---:|
| Delivery | Contract asset / AR | 11.100.000 | – |
| | Revenue | – | 10.000.000 |
| | VAT output | – | 1.100.000 |
| | COGS | 7.000.000 | – |
| | Inventory | – | 7.000.000 |
| Invoice (if later) | AR | 11.100.000 | – |
| | Contract asset | – | 11.100.000 |

If the entity treats the right as unconditional at delivery, AR is used directly and the invoice entry is only a presentation/document event.

### E.2 Posting date and cut-off

**Finding ACC-03.** `journal-entry.md:55` teaches that an invoice dated 28 August but received 5 September is posted on 5 September “agar masuk ke periode pembukuan September”. That is a cut-off error.

**Correct treatment (IAS 1.27–28 accrual basis):**
- Goods/services received in August: accrue in August — Dr expense/inventory, Cr accrued liability or GR/IR.
- September: reverse the accrual or clear GR/IR when the invoice is booked; the invoice date does not move the expense to September.
- Document date vs posting date may differ, but the posting period must reflect the period the transaction affects, not the date the paper arrived.

### E.3 Corporate income tax rate

**Finding ACC-04.** `tax-accounting.md:109` uses 25%, while `corporate-income-tax-calculation.md:47` correctly states 22% effective from tax year 2022 (UU HPP).

**Reconstruction:** 22% × Rp105.000.000 = **Rp23.100.000**; PPh 29 = 23.100.000 − 7.000.000 = **Rp16.100.000**. If 25% is intended as a non-Indonesian illustration, the jurisdiction must be stated.

### E.4 GR/IR accrual is not an IAS 37 provision

**Finding ACC-14.** `accounts-payable.md:36` labels the unbilled receipt liability “IAS 37”. IAS 37.2 excludes items covered by other standards, and a GR/IR accrual is a trade payable/accrual under the Conceptual Framework/IFRS 9, not a provision with uncertain timing or amount.

**Reconstruction (unchanged amounts, correct citation):** Dr Inventory 7.000.000 / Cr Trade accrual (GR/IR) 7.000.000; on invoice Dr GR/IR 7.000.000, Dr VAT input 770.000 / Cr AP 7.770.000.

### E.5 Milestone billing vs revenue

**Finding ACC-05.** `project-billing-and-revenue.md:83-87` credits Contract Liability when Milestone 1 (BAST-signed) is billed. If the milestone is a satisfied performance obligation, revenue must be recognised then; a contract liability arises only if billing precedes satisfaction.

**Reconstruction at BAST:**
- Dr AR 66.600.000 / Cr Revenue 60.000.000 / Cr VAT output 6.600.000.
- If billing precedes BAST: Dr AR / Cr Contract liability + VAT; at BAST Dr Contract liability / Cr Revenue.

The article’s subsequent “revenue recognition” entry is then unnecessary for this milestone; it should instead demonstrate a period where cumulative revenue ≠ cumulative billing.

### E.6 Landed cost and returns

**Finding ACC-08 / BIZ-13.** After capitalising Rp500.000 freight on 10 units (unit cost Rp750.000), the return of one unit relieves only Rp700.000. Rp50.000 of freight remains stranded in the remaining 9 units, overstating inventory.

**Correct entry for one returned unit (vendor credit Rp700.000 + VAT Rp77.000):**

| Account | Debit | Credit |
|---|---:|---:|
| Accounts payable | 777.000 | – |
| Freight/landed-cost loss (non-recoverable) | 50.000 | – |
| Inventory | – | 750.000 |
| VAT input (correction) | – | 77.000 |

If the vendor also credits the freight, the loss line disappears and AP/VAT increase accordingly.

### E.7 Inventory count gain

**Finding ACC-15.** `inventory-process.md:129` credits a count gain to “Pendapatan Selisih Lebih Persediaan (Revenue/Other Income)”. IFRS 15 does not apply to inventory count differences; the gain reverses prior shrinkage/write-down or adjusts COGS.

**Reconstruction:** Dr Inventory 1.400.000 / Cr Inventory adjustment (contra expense) or COGS 1.400.000. If the gain reverses an earlier IAS 2 write-down, credit the write-down expense (IAS 2.33).

### E.8 Production variance and scrap

**Finding ACC-10.** The Rp437.500 scrap figure in `production-costing-and-wip.md:118` is a plug: 5 scrap units at standard cost 75.000 = **375.000**; the remaining **62.500** is the conversion cost of the 5 ending-WIP units (5 × 50% × 25.000), already included in ending WIP.

**Correct decomposition of the Rp837.500 total variance:**

| Component (scrap assumed fully converted) | Calculation | Amount |
|---|---|---:|
| Material spending variance | 5.200.000 − 5.000.000 | 200.000 |
| Labour variance (EUP basis) | 1.650.000 − (97,5 × 15.000) | 187.500 |
| Overhead variance (EUP basis) | 1.050.000 − (97,5 × 10.000) | 75.000 |
| Normal scrap at standard | 5 × 75.000 | 375.000 |
| **Total** | | **837.500** |

The article’s “150.000 labour + 50.000 overhead + 437.500 scrap” sums correctly but mislabels the components.

### E.9 Project labour cost

**Finding ACC-07.** `timesheet-and-effort-tracking.md:150-154`: 27.000.000 + 33.600.000 + 27.000.000 + 4.000.000 = **91.600.000**, not 90.000.000.

**Downstream corrections:**
- Actual cost = 91.600.000 + 55.000.000 + 28.000.000 + 8.000.000 = **182.600.000**.
- Gross margin = 300.000.000 − 182.600.000 = **117.400.000** (**39,13%**, not 39,67%).
- Cost variance vs 200.000.000 = **17.400.000** (8,7%), not 19.000.000 / 10%.

If the intended labour total is 90.000.000, the PM line must be 26.400.000 (176 hours at 150.000) or another line/rate must change; hours and cost must reconcile in the same table.

### E.10 Fixed asset schedule 2028

**Finding ACC-06.** The machine `AST-MAC-2026-0001` is capitalised at 120.000.000 on 1 April 2026, residual 10.000.000, 60 months.

| Measure at 31 Dec 2028 | Correct (33 months) | Used in revaluation/impairment |
|---|---:|---:|
| Accumulated depreciation | 55.000.000 | 60.000.000 |
| Carrying amount | 65.000.000 | 60.000.000 |
| Residual value | 10.000.000 | 0 |
| Remaining life | 27 months | 24 months |

Revaluation surplus should therefore be based on 65.000.000, and impairment testing should use the same carrying amount. The 80.000.000 fair value in `asset-revaluation.md:121` and the 42.000.000 recoverable amount in `asset-impairment.md:133` cannot both describe the same asset at the same date.

### E.11 Bank reconciliation arithmetic

**Finding ACC-13.** 45.000.000 + 25.000.000 + 15.000.000 + 500.000 − 25.000 = **85.475.000**. The article states 65.475.000 (Rp20.000.000 error) and then reports 50% of nominal auto-matched; correct is 25.525.000 / 40.525.000 ≈ **63%**.

### E.12 Payroll statutory split

**Finding ACC-12.** On Rp12.000.000 wages, the article’s own rates imply:
- Employee: JHT 2% + JP 1% + Kesehatan 1% = **4% = 480.000** (not 600.000).
- Employer: JKK 0,24% + JKM 0,30% + JHT 3,70% + JP 2% + Kesehatan 4% ≈ **10,24% ≈ 1.228.800** before the JP cap (not 800.000).

Either the rate table or the example must change; the capped JP base should be stated with its year.

### E.13 Journals that are correct

To avoid an unbalanced picture: all journal tables checked foot to the rupiah — 24 tables in 03/04, 22 in 07/08, 30 in 09/10, all blocks in 05/06, and the accounting section’s tables. The errors above are classification, timing, derivation, or cross-document consistency — not debit/credit balancing. Two examples (bank reconciliation and project labour total) do contain plain arithmetic errors.

### E.14 Two annual scenarios for the same company

**Finding ACC-26.** `02-accounting/financial-statements.md` presents EBT Rp15.350.000, tax Rp2.987.000 and net profit Rp12.363.000. `11-tax/tax-integration.md:115` and the corporate-tax articles use EBT Rp100.000.000, PKP Rp105.000.000 and tax Rp23.100.000 for the same `PT Maju Bersama`.

Both are internally consistent; they are simply different scenarios presented as one. A reader cannot connect the tax computation to the financial statements.

**Fix:** either (a) make the tax scenario the same year as the financial statements (EBT 15.350.000, with fiscal corrections producing PKP and CIT to match), or (b) label them explicitly as “Scenario A: trading company” and “Scenario B: tax illustration” and cross-reference. Option (a) is preferred for a learning platform built on one canonical case.

---

## F. Business Process Findings

### F.1 The required process pattern is applied to only a minority of articles

AGENTS.md requires: Trigger → Business Event → Document → Validation → Transaction → Operational Impact → Accounting Impact → Next Process.

Measured across 182 articles:
- “Trigger”: 21 files.
- “Validation”: 26 files.
- “Next Process”: 5 files (only the five articles in `01-business-processes`).
- “Exception”: 22 files.
- “Business Process” heading: 28 files.
- “Business Rules” heading: 61 files.

The five end-to-end articles are excellent examples of the pattern. The remaining ~160 articles are concept/implementation notes, not process documentation. That is acceptable for concept articles but not for the 90+ articles that describe operational modules (sales, purchasing, inventory, manufacturing, project, HR).

### F.2 Happy-path bias

| Process | Missing exception | Evidence |
|---|---|---|
| Sales order | Cancel after confirmation; partial delivery close | `sales-order.md:88-96` |
| Purchase order | Vendor declines/cannot supply; cancel after receipt | `purchase-order.md:91-99` |
| Goods receipt | Rejected quantity accounting; over-receipt | `inventory-receiving.md:49-56` |
| Manufacturing order | Cancel/hold after material issue | `manufacturing-order.md:42-45` |
| Project | Lost bid / terminated contract | `project-management-fundamentals.md:82-91` |
| Subcontracting | Loss at vendor; unused component return | `subcontracting-and-external-processing.md` (happy path only) |
| Physical count | Cut-off rules (GR/IR, in-transit, POD pending) | `physical-inventory-count.md` |

### F.3 Document lifecycle and traceability

- Document IDs differ for the same canonical P2P transaction: `PR-2026-00042` vs `PR-2026-09-0041`; `PO-2026-00042` vs `PO-2026-09-0081`; `INV-ST-9942` vs `INV/ST/2026/0882`. The reader cannot follow the chain across articles.
- Sales IDs are consistent (SQ-2026-09-0042 → SO-2026-09-0101 → DO-2026-09-0071 → INV-2026-09-0101), which proves the standard is achievable.
- AR calculates due date from posting date; AP from document date. Mirror processes should not differ.

### F.4 Status semantics

Several statuses are named but never defined or reachable (`Ready for Shipping`, `Closed (Partially Fulfilled)`, `Partially Ordered`), while states used by other articles are absent from the state machine. This is a documentation-governance problem: each article invents its own enum.

**Recommendation:** publish a `00-orientation/document-lifecycle.md` with canonical state machines for SO, PO, GR, invoice, payment, MO, project, and asset; all articles reference it.

---

## G. Cross-Module Integration Matrix

Legend: ✅ explained and consistent; ⚠️ explained but problematic; ❌ not explained/absent; — not applicable.

| From → To | Sales | Purchasing | Inventory | Manufacturing | Accounting/GL | Finance/Treasury | Assets | Project | HR/Payroll | Tax |
|---|---|---|---|---|---|---|---|---|---|---|
| **Sales** | — | ❌ | ✅ reservation/delivery | ❌ | ⚠️ revenue timing | ✅ collection | ❌ | ⚠️ billing/revenue | ❌ | ⚠️ 11%/Coretax |
| **Purchasing** | ❌ | — | ✅ GR/GR-IR | ✅ subcontract | ✅ AP/GR-IR | ✅ payment | ✅ capex purchase | ✅ project procurement | ❌ | ⚠️ 11%/PPh |
| **Inventory** | ✅ delivery | ✅ receipt/return | — | ✅ issue/FG | ⚠️ NRV/conversion | ❌ | ✅ asset receipt | ✅ project material | ❌ | ⚠️ scrap/samples |
| **Manufacturing** | ✅ MTO demand | ✅ MRP requisition | ⚠️ WIP conversion | — | ⚠️ variance/scrap | ❌ | ❌ | ✅ project production | ⚠️ labor absorption | ⚠️ subcontract WHT |
| **Accounting/GL** | ✅ AR control | ✅ AP control | ✅ stock control | ✅ WIP | — | ✅ bank/cash | ✅ asset register | ✅ project cost | ✅ payroll journal | ✅ tax accounts |
| **Finance/Treasury** | ✅ receipts | ✅ disbursement | ❌ | ❌ | ✅ settlement | — | ❌ | ❌ | ✅ payroll payment | ✅ tax payment |
| **Assets** | ❌ | ✅ acquisition | ✅ capitalization | ✅ machine | ⚠️ schedule conflict | ❌ | — | ✅ project asset | ❌ | ⚠️ fiscal vs commercial |
| **Project** | ⚠️ billing/revenue | ✅ procurement | ⚠️ material WIP | ✅ production | ⚠️ WIP/COGS | ❌ | ✅ capex | — | ⚠️ labor cost | ⚠️ PPN only |
| **HR/Payroll** | ❌ | ❌ | ❌ | ⚠️ direct labor | ⚠️ BPJS split | ✅ payment | ❌ | ⚠️ timesheet | — | ✅ PPh 21/BPJS |
| **Tax** | ⚠️ outdated | ⚠️ outdated | ❌ | ⚠️ WHT | ✅ tax accounts | ✅ settlement | ⚠️ deferred tax | ⚠️ PPN | ✅ payroll tax | — |

**Strongest integrations:** Purchasing→Inventory→AP (GR/IR), Manufacturing→Inventory (issue/FG), Tax→GL (settlement), Finance→AR/AP (payment clearing).

**Weakest integrations:** Sales→Accounting revenue timing; HR→Manufacturing/Project labor absorption; Tax→Inventory (scrap, samples, own use); Assets→Tax (deferred tax on revaluation); any domain→multi-company/intercompany.

---

## H. Indonesian Tax and Compliance Findings

### H.1 What is correct and current

The `11-tax` section is the strongest part of the repository:

- Statutory PPN 12% with DPP Nilai Lain 11/12, citing **PMK 131/PMK.03/2024** and **PMK 11/2025** (`vat-fundamentals.md:116`, `taxable-base-and-tax-calculation.md:16`); PMK 11/2025 was verified via DJP’s press release.
- Coretax as the current tax invoice environment, with e-Faktur/e-Nofa correctly framed as historical (`vat-transaction-and-tax-invoice.md:12-13`).
- Input VAT crediting window and “3 months after the end of the tax period” rule (`input-vat-and-output-vat.md:67-75`).
- PPh 23 2% and 4% without NPWP (`withholding-tax-management.md:12,77`) — still valid under current rules.
- PPh 4(2) construction 1.75%–4%, rental 10% (`withholding-tax-management.md:14`).
- CIT 22%, Pasal 31E facility and proportional formula (`corporate-income-tax-calculation.md:47-60`).
- PPh 25 due 15th of following month; SPT Tahunan due 30 April; KAP/KJS codes (`tax-payment-and-tax-return.md:64-72`).
- PPh 21 TER under **PP 58/2023** and **PMK 168/2023** (`payroll-tax-and-statutory-compliance.md:138`).
- BPJS contribution percentages (1%/4% Kesehatan, 2%/3.7% JHT, 1%/2% JP, 0.24–1.74% JKK, 0.3% JKM) are correct.

### H.2 What is outdated, contradictory, or unverified

| ID | Issue | Evidence | Status |
|---|---|---|---|
| ACC-02 | 11% presented as the statutory PPN rate | `sales-tax.md:86` | **Outdated.** Since 1 Jan 2025 the statutory rate is 12%, with 11/12 DPP for non-luxury. |
| TAX-02 | Pre-Coretax NSFP/QR workflow | `sales-tax.md:87`, `purchase-tax.md:80` | **Outdated.** Coretax issues numbers; input VAT is pre-populated. |
| TAX-08 | PPh 23 gross-up deductible | `withholding-tax-management.md:67` | **Unverified/dugaan.** Confirm with tax counsel before teaching. |
| TAX-06 | BPJS caps undated | `payroll-tax-and-statutory-compliance.md:62-64` | **Incomplete.** Kesehatan and JP caps must be dated. |
| FIN-08 | Leave/maternity/sick-pay uncited | `leave-management.md:17` | **Unverified.** UU 13/2003, UU 4/2024, PP 35/2021 absent. |
| FIN-07 | Overtime “7–8 first hours” | `overtime-and-time-management.md:36` | **Wrong for a 5-day week.** PP 35/2021: 8 hours at 2×. |
| FIN-06 | “Exempt” managerial overtime | `overtime-and-time-management.md:65` | **US concept.** Indonesian overtime is statutory. |
| TAX-09 | “e-Faktur upload max 15th” | `tax-closing-and-period-end.md:70` | **Operational, not statutory.** Clarify. |
| TAX-04/05 | Index promises PPh 21/22/4(2) coverage | `02-accounting/index.md:53`, `04-purchasing/index.md:50` | **Overclaim.** Articles do not cover them. |

### H.3 Dates and versions that must be recorded

Every tax statement should carry an “as of” date. At minimum:
- PPN rate regime: 1 January 2025 onward (12% / 11-12 DPP).
- CIT 22%: tax year 2022 onward.
- TER PPh 21: January 2024 onward.
- Coretax: 2025 rollout; legacy e-Faktur references labelled historical.
- BPJS caps: annual, with the year stated.

---

## I. Learning Experience Findings

### I.1 Current state

- **No learning path**: 0 files contain “learning path” or “prerequisite”.
- **No objectives**: 0 files contain “learning objective”.
- **No practice**: 0 files contain “exercise”, “case study”, or “quiz”.
- **No glossary**: 0 files contain “glossary”; the internal `.agents/terminology.md` is not published.
- **No summaries**: 0 files contain “summary” or “key takeaways”.
- **Ordering is logical**: 00 → 01 → 02 → 03/04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 20 → 30 is a defensible curriculum.
- **Canonical scenario** is a genuine learning device, used in 18 tax articles and the P2P integration article, but broken by inconsistent numbers (see E).

### I.2 Recommended learning paths

**Beginner (8–12 hours)**
1. ERP Fundamentals → ERP Architecture → Master vs Transaction Data → Organizational Structure.
2. Business Processes: O2C overview, P2P overview.
3. Accounting: Debit/Credit → Journal Entry → COA → GL/Subledger.
4. Checkpoint: draw the journal for a credit sale and a goods receipt.

**Intermediate (20–30 hours)**
1. O2C deep dive: quotation → order → delivery → invoice → payment → return.
2. P2P deep dive: PR → RFQ → PO → GR → 3-way match → bill → payment → return.
3. Inventory: master data → receiving → reservation → picking → costing → count.
4. Sales/Purchasing tax basics.
5. Checkpoint: trace one order and one PO through all documents and journals.

**Advanced (30–40 hours)**
1. Manufacturing: BOM → routing → MRP → MO → consumption → output → variance.
2. Costing: FIFO/AVCO/standard, WIP, overhead, NRV.
3. Financial closing, FX, consolidation, fixed assets.
4. Project accounting and revenue recognition.
5. Checkpoint: close a month from subledgers to financial statements.

**Expert (40+ hours)**
1. Cross-module integration and posting architecture.
2. Multi-company, multi-currency, intercompany.
3. ERP implementation: requirements, fit-gap, data migration, UAT, cutover.
4. Software-specific tracks (Odoo/ERPNext/D365/SAP) and Naventra design.
5. Capstone: design and defend an ERP solution for a case company.

### I.3 Learning assets to add

| Asset | Location | Why |
|---|---|---|
| `learning-path.md` | `00-orientation` | Navigation and prerequisites. |
| `glossary.md` | `00-orientation` | Terms used before definition (e.g. ATP, GR/IR, WIP, ECL). |
| 10–15 exercises | End of each section | Recall + application. |
| 1 capstone case | `00-orientation/capstone` | PO → production → sale → close. |
| Answer keys | Separate page | Avoid spoilers. |
| Self-check questions | Each article | Retrieval practice. |

---

## J. UX/UI Findings

### J.1 Strengths

- Quartz layout is clean: left navigation, right graph/TOC/backlinks, search, dark mode, reader mode.
- Section indexes are annotated, not bare lists.
- Search (FlexSearch) and graph view work; RSS and sitemap are generated.
- Typography and code blocks are readable; KaTeX renders formulas.
- Mobile layout is responsive by default (Explorer collapses; search remains).

### J.2 Defects

| Issue | Scope | Evidence | Fix |
|---|---|---|---|
| Raw slug as page title | 65 pages | `/07-finance/bank-account-management` shows “bank-account-management” | Add `title` frontmatter. |
| Mermaid parse failure | 12 diagrams | `debit-credit-and-double-entry.md:144` etc. | Quote labels / remove parentheses. |
| Wiki links inside Mermaid | 5 index diagrams, 85 links | `10-hr/index.md:27` | Remove `[[...]]` from labels. |
| Duplicate H1 | all articles | live HTML has 2 `<h1>` | Remove content H1 or layout title. |
| Wrong `lang` | all pages | `<html lang="en">` | Set `id-ID`. |
| 404 internal links | 7 links / 5 targets | `07-finance/financial-closing.md:7` | Correct slugs. |
| False tag pages | 2 tags | `/tags/INV-2026-0042`, `/tags/LPT-001` | Escape `#` in prose. |
| Dangling Mermaid nodes | 5+ diagrams | `07-finance/financial-reporting.md:25` | Connect or remove nodes. |
| Homepage title duplication | 1 page | “ERP Notes \| ERP Notes” | Skip suffix on home. |
| No prev/next or edit link | all pages | layout | Add components. |

**Accessibility note:** there are no images, so alt-text is not an issue; diagrams are SVG generated client-side, and their text is not available to screen readers until rendered. Consider providing a text summary or `<figcaption>` for key diagrams.

---

## K. Technical Findings

### K.1 Build and deployment

- `npx quartz build` in a temporary copy: **success**, 200 files → 372 outputs in ~20 s; only “couldn’t find git repository” warnings (an artefact of the temp copy), no Markdown parse errors.
- CI `.github/workflows/deploy.yml`: Node 22, `npm ci`, build, upload, deploy to GitHub Pages. Works; the live site is current and reachable (HTTP 200).
- No lint, link check, Mermaid validation, HTML validation, or accessibility check in CI.

### K.2 Configuration defects

| Item | Evidence | Impact |
|---|---|---|
| `baseUrl` wrong | `quartz.config.ts:21` → `erpnotes.rofid.me` | Sitemap, RSS, OG/Twitter URLs, absolute links all use the wrong host. |
| No canonical | live HTML | Duplicate content/indexation risk across the two domains. |
| No `robots.txt` | `/robots.txt` → 404 | Sitemap not advertised. |
| `locale: "en-US"` | `quartz.config.ts:17` | Date format/language metadata for Indonesian content. |
| No analytics | `analytics: null` | Not a defect; noted for completeness. |
| No `robots`/sitemap ping | — | Manual Search Console submission needed. |

### K.3 Link and reference health

- Internal wiki links: 815 instances; **7 broken** (5 missing targets) plus **1 broken anchor**.
- External reference URLs: 136 unique; **91 × 200, 44 × 404, 1 × 403**.
- 47 files contain at least one dead reference URL.
- 928 reference lines; only **194 (21%)** include a URL. Sections 05–11 have **zero** URLs.
- 21% of references that do have URLs are dead — a signal that URLs were composed rather than copied.

### K.4 Dependencies and security

`npm audit`: **18 vulnerabilities — 12 high, 2 moderate, 4 low, 0 critical** across 596 dependencies. No runtime user data is at risk on a static site, but build-tool vulnerabilities can affect CI integrity. Update and add `npm audit` to CI.

### K.5 Mermaid

332 diagrams. Parsed with **mermaid 11.4.0**, the exact version loaded by the site’s client script. **12 fail**:

| File | Approx. line | Cause |
|---|---:|---|
| `02-accounting/debit-credit-and-double-entry.md` | 144 | Parentheses in edge label |
| `03-sales/customer-credit-management.md` | 57 | Parentheses in edge label |
| `03-sales/pricing-and-discount.md` | 79 | Parentheses/colon in edge label |
| `03-sales/sales-return-and-credit-note.md` | 40 | Parentheses in edge label |
| `04-purchasing/goods-receipt-and-service-receipt.md` | 63 | Parentheses in edge label |
| `04-purchasing/supplier-selection-and-evaluation.md` | 36 | Parentheses in edge label |
| `05-inventory/inventory-receiving.md` | 30 | Parentheses in rhombus label |
| `05-inventory/physical-inventory-count.md` | 63 | Parentheses in rhombus label |
| `05-inventory/replenishment-and-stock-planning.md` | 31 | Parentheses + KaTeX in rhombus label |
| `06-manufacturing/material-availability-and-reservation.md` | 66 | Parentheses + KaTeX in rhombus label |
| `07-finance/finance-integration.md` | 97 | Parentheses in sequence message |
| `09-project/timesheet-and-effort-tracking.md` | 66 | Parentheses in state transition label |

The fix is mechanical: quote every label (`A["text (x)"]`) or remove parentheses from labels.

### K.6 SEO/metadata

- OG/OG image/Twitter all point to `erpnotes.rofid.me` (wrong domain).
- Sitemap contains 200 URLs, all on the wrong domain.
- RSS link is absolute to the wrong domain.
- No canonical tags.
- Page titles for 65 pages are slugs.
- `robots.txt` missing.
- Description meta is auto-generated from the first paragraph; works, but 65 pages lack a curated description.

---

## L. Status of Initial Hypotheses

| # | Hypothesis | Status | Evidence |
|---|---|---|---|
| 1 | Open Graph uses `rofid.me` while site is `rofid.my.id` | **Terkonfirmasi** | `quartz.config.ts:21`; live OG/sitemap/RSS all `.me`. |
| 2 | `INV-2026-0042` appears as a tag in Journal Entry | **Terkonfirmasi** | `journal-entry.md:56` uses `#INV-2026-0042`; live `/tags/INV-2026-0042` exists. Same for `#LPT-001`. |
| 3 | Label “Mental Model” points to `erp-architecture` | **Dibantah (sebagian)** | Label is “ERP Architecture / Mental Model”, matching the title; only 20 benign title/H1 mismatches exist. |
| 4 | “Naventra Consideration” in every article mixes learning with product design | **Sebagian** | 130/200 articles, not all; the blocks average 126 words and 28 contain SQL DDL. |
| 5 | All articles dated 17–19 Sep 2026, no draft/reviewed marker | **Terkonfirmasi (dengan koreksi)** | No dates in frontmatter; git dates 18–19 Sep 2026; no status markers. |
| 6 | No learning path, prerequisites, levels, exercises, end-to-end case | **Terkonfirmasi** | 0 matches for all six terms; canonical scenario exists but is not a teaching case. |
| 7 | Mermaid may not render correctly | **Terkonfirmasi** | 12/332 parse failures with the site’s mermaid 11.4.0; 85 wiki links inside labels. |
| 8 | Software Implementation too brief, no screenshots/menu names | **Sebagian** | Comparison tables name menus/models (e.g. ERPNext “Connections”), but `20-software` is 63 words and there are no screenshots or step-by-step config. |

**Additional issues found beyond the hypotheses:** wrong baseUrl effects (not just OG), 44 dead reference URLs, 79% of references without URLs, 65 missing frontmatter titles, 7 broken internal links, 1 broken anchor, duplicate H1, `lang="en"`, false tag pages, duplicate accounting concepts, canonical-number conflicts, revenue timing error, 25% CIT, IAS 37 misuse, asset schedule conflict, project labour arithmetic, bank reconciliation arithmetic, BPJS split mismatch, and unverified software claims.

---

## M. Scores

Scoring rule: only categories actually read are scored. All 15 were read. Counts are files read in that category.

| # | Category | Score | Files read | Reasons |
|---|---|---:|---:|---|
| 1 | ERP Fundamentals | **7,5** | 8/8 | Clear definitions, architecture, data taxonomy, document layers. Loses points for revenue-at-invoice example, vendor-mapping inaccuracies, sparse PSAK, and no multi-currency/period fundamentals. |
| 2 | Business Process Knowledge | **7,0** | 149 (all of 01 and 03–10) | Broad, realistic process coverage, strong O2C/P2P, good exception handling in places. Only 5 articles follow the full trigger→next pattern; several state machines and document chains are incomplete or contradictory. |
| 3 | Accounting Accuracy | **5,5** | 90+ (all 02, 08, 11 + journal-bearing articles in 03–10) | Most journals foot and standards are cited, but there are material errors: revenue timing (4 places), 25% CIT, IAS 37 misuse, posting-date cut-off, contract liability at milestone, asset schedule conflict, landed-cost return, scrap decomposition, project labour cost. |
| 4 | Sales and Purchasing | **7,0** | 36/36 | Comprehensive lifecycle, pricing, credit, returns, 3-way match, prepayments, contracts. Undermined by outdated PPN/Coretax, conflicting canonical numbers, and AR/AP due-date mismatch. |
| 5 | Inventory Management | **7,5** | 18/18 | Excellent costing, landed cost, reservation, traceability, count, transfer. Weak: NRV reversal, normal-capacity overhead, raw-material account naming, availability double count, replenishment formula. |
| 6 | Manufacturing | **7,0** | 18/18 | Strong MRP, BOM, routing, shop floor, costing, subcontracting. Weak: canonical cost contradictions, scrap variance, planning grid errors, KPI definitions, unverified software claims. |
| 7 | Financial Management | **7,0** | 17/17 | Real treasury/cash/working-capital content with correct CCC math; but 30/34 files lack frontmatter, bank recon error, planning sign error, duplication with 02, and some statutory dates. |
| 8 | Cross-Module Integration | **6,5** | 10 integration articles + cross-module references in 03–11 | O2C/P2P/inventory/manufacturing/tax integration flows are explained. No single integration matrix; revenue/COGS and HR labour postings conflict; intercompany and multi-company are thin. |
| 9 | Software Implementation Knowledge | **4,0** | 200 (all mention), 4 product pages | Comparison tables are useful but shallow; product section is 63 words; versions pinned only for Odoo 17; several claims likely wrong; 44 dead vendor URLs; no screenshots/menu walkthroughs. |
| 10 | Indonesian Tax and Compliance | **6,5** | 19 (11-tax) + 19 (payroll) | The tax section is strong and current (PMK 131/2024, PMK 11/2025, Coretax, TER). But sales/purchasing teach stale 11% and pre-Coretax, payroll lacks dated caps and cites no labour statute, and one gross-up claim is unverified. |
| 11 | Learning Experience | **4,0** | 200/200 | Logical order and canonical scenario, but no path, prerequisites, objectives, exercises, glossary, summaries, or capstone. |
| 12 | Documentation UX/UI | **5,5** | 200 pages live | Good Quartz shell (search, graph, TOC, dark mode, mobile). Broken by slug titles on 65 pages, 7 dead links, 12 broken diagrams, duplicate H1, wrong lang. |
| 13 | Content Quality | **6,5** | 200/200 | Deep, consistent tone, strong cross-references, no stubs in 00–11. Held back by contradictions, arithmetic errors, unsourced references, typos, and duplicated topics. |
| 14 | Technical Architecture | **6,0** | config + build + live site | Quartz config is sound and build is clean; CI works. baseUrl bug poisons SEO feeds, no canonical/robots, no link/Mermaid checks, 18 dependency vulnerabilities. |
| 15 | Maintainability | **3,5** | repo + 200 files | No CONTRIBUTING, template enforcement, linter, link checker, review dates, version metadata, or changelog; 79% of references unverifiable; one bulk commit. |

**Overall (simple average): 6,1 / 10 — Needs Improvement.**

The score is dragged down by missing software/Naventra, missing learning layer, and accounting inconsistencies — not by lack of content.

---

## N. Improvement Roadmap

### N.1 Quick wins (≤1 day each, high impact)

| Task ID | Area | Problem | Solution | Files | Priority | Expected outcome | Dependency | Effort |
|---|---|---|---|---|---|---|---|---|
| QW-01 | Technical | Wrong base URL | Set `baseUrl: "erpnotes.rofid.my.id"`, rebuild | `quartz.config.ts:21` | P1 | Correct OG, sitemap, RSS | — | S |
| QW-02 | Links | 7 broken internal links + 1 anchor | Fix slugs (`period-end-closing`, `three-way-match`, `warehouse-and-location`, `product-structure-and-bom`) | 07-finance files; `purchase-cancellation...:91` | P0 | Zero 404 internal links | — | S |
| QW-03 | Mermaid | 12 parse failures | Quote labels/remove parentheses | 12 files (see K.5) | P1 | All diagrams render | — | S |
| QW-04 | Metadata | 65 raw-slug titles | Add `title:` to all files in 07–10 | 65 files | P1 | Readable titles, better SEO | — | S |
| QW-05 | Tags | False `#INV-…`/`#LPT-…` tags | Escape `#` or write “No. …” | `journal-entry.md:56`, `inventory-reservation...:70` | P2 | Clean tag pages | — | S |
| QW-06 | Tax | 11% stated as statutory | Add dated 12%/11-12 note; align with 11-tax | `sales-tax.md:86`, `purchase-tax.md:79` | P0 | Correct regulatory statement | — | S |
| QW-07 | Accounting | 25% CIT | Change to 22% or label jurisdiction | `tax-accounting.md:109` | P1 | Consistency with 11-tax | — | S |
| QW-08 | Accounting | Bank recon closing balance | 65.475 → 85.475; matched 50% → 63% | `07-finance/bank-reconciliation.md:131,139` | P2 | Correct example | — | S |
| QW-09 | Accounting | Project labour total | 90 → 91,6; recompute margin/variance | `09-project/timesheet...:154` and 6 files | P1 | Correct canonical numbers | Canonical sheet | S |
| QW-10 | Accounting | Scrap decomposition | 437,5 → 375; labour 187,5; overhead 75 | `production-costing-and-wip.md:118` | P1 | Correct variance teaching | — | S |
| QW-11 | Accounting | Landed-cost return | Relieve 750k; expense 50k freight | `procure-to-pay-integration.md:164` | P1 | Inventory no longer overstated | — | S |
| QW-12 | UX | Duplicate H1 | Remove content H1 or layout title | all articles | P2 | Valid heading structure | — | S |
| QW-13 | UX | `lang="en"` | Set `id-ID` | `quartz.config.ts:17` | P2 | Correct language metadata | — | S |
| QW-14 | Accounting | IAS 37 citation | Cite trade payable/IFRS 9 | `accounts-payable.md:36` | P2 | Correct standard | — | S |
| QW-15 | Content | Company name mismatch | “PT Maju Sejahtera Bersama” → “PT Maju Bersama” | `financial-statements.md:98,135` | P3 | Consistent scenario | — | S |

### N.2 Phase 1 — Restore a single accounting truth (P0/P1)

| Task ID | Area | Problem | Solution | Priority | Expected outcome | Dependency | Effort |
|---|---|---|---|---|---|---|---|
| AC-01 | Accounting | Revenue recognised at invoice in 4 places | Publish one IFRS 15 policy page; rewrite O2C, sales fundamentals, reporting, integration | P0 | One revenue rule; correct AR/contract asset | QW-06 | M |
| AC-02 | Accounting | PPN/Coretax split across sections | Make `11-tax` the canonical source; sales/purchase link and summarise; update 11% examples | P0 | Consistent tax treatment | AC-01 | M |
| AC-03 | Accounting | Posting-date cut-off error | Rewrite journal-entry example with accrual in August, clear in September | P1 | Correct cut-off teaching | — | S |
| AC-04 | Accounting | Contract liability at achieved milestone | Rewrite project billing journal; add a period with revenue ≠ billing | P1 | Correct IFRS 15 project model | AC-01 | M |
| AC-05 | Accounting | Asset 2028 schedule conflict | Build one asset schedule sheet; update revaluation, impairment, disposal, maintenance | P1 | One carrying amount per date | AC-09 | M |
| AC-06 | Accounting | Project labour postings (expense vs WIP vs clearing) | Choose WIP model; update 09/10 articles and clearing entries | P1 | Consistent project cost flow | AC-09 | M |
| AC-07 | Accounting | Inventory valuation gaps (NRV reversal, normal capacity) | Add sections/examples to inventory-costing and production-costing | P2 | Complete IAS 2 treatment | — | M |
| AC-08 | Accounting | HR statutory gaps | Add UU 13/2003, UU 4/2024, PP 35/2021, Permenaker 6/2016, dated BPJS caps | P2 | Credible Indonesian compliance | AC-10 | M |
| AC-09 | Scenario | Canonical numbers diverge | Create `canonical-dataset.md`: entity, chart of accounts, unit costs, stock, document IDs, EBT/PKP | P1 | All examples reconcile | — | M |
| AC-10 | Tax | Unverified gross-up and PPh 21/22 coverage | Verify with tax counsel; add warnings; extend or fix index claims | P2 | No unsupported tax claims | AC-08 | M |

### N.3 Phase 2 — Build the missing pillars (P1)

| Task ID | Area | Problem | Solution | Priority | Expected outcome | Dependency | Effort |
|---|---|---|---|---|---|---|---|
| SW-01 | Software | `20-software` empty | Write 4–6 articles per product: master data, document flow, posting, inventory, tax localisation, reporting; pin versions | P1 | Software implementation track usable | AC-09 | L |
| SW-02 | Software | Unverified product claims | Audit each claim against vendor docs; tag version; remove or qualify | P2 | Trustworthy comparisons | SW-01 | L |
| NAV-01 | Naventra | 130 scattered blocks | Extract to `30-naventra`; create requirements/functional/technical/implementation docs with traceability IDs | P1 | Naventra design baseline | AC-09 | L |
| NAV-02 | Naventra | No concept→product mapping | Build matrix: ERP concept → Naventra requirement → design decision → status | P1 | Traceable implementation | NAV-01 | M |
| LRN-01 | Learning | No path/prerequisites | Publish 4 learning paths with estimated hours and checkpoints | P1 | Guided learning | — | M |
| LRN-02 | Learning | No exercises/glossary/capstone | Add 10–15 exercises, glossary, capstone case with answer key | P1 | Active learning | LRN-01, AC-09 | L |
| PROC-01 | Process | Incomplete state machines | Publish canonical lifecycle page for SO/PO/GR/invoice/payment/MO/project/asset | P2 | Consistent statuses | AC-09 | M |
| PROC-02 | Process | Happy-path bias | Add exception sections to 90+ operational articles | P2 | Real-world readiness | PROC-01 | L |

### N.4 Phase 3 — Governance and sustainability (P2)

| Task ID | Area | Problem | Solution | Priority | Expected outcome | Dependency | Effort |
|---|---|---|---|---|---|---|---|
| GOV-01 | Maintenance | No contributing guide | Add `CONTRIBUTING.md`, article template, frontmatter schema | P2 | Consistent contributions | — | S |
| GOV-02 | Maintenance | No CI checks | Add markdownlint, link checker, Mermaid parser, build check | P2 | Defects blocked pre-merge | QW-02/03 | M |
| GOV-03 | References | 79% without URL; 44 dead | Require URL/DOI/regulation number; add “last verified” date | P1 | Verifiable sources | GOV-02 | L |
| GOV-04 | Metadata | No dates/status/version | Add `date`, `updated`, `status`, `software_version`, `reviewed_by` | P2 | Content-rot tracking | GOV-01 | M |
| GOV-05 | Technical | No canonical/robots | Enable canonical URLs; add `robots.txt` | P2 | SEO hygiene | QW-01 | S |
| GOV-06 | Technical | 18 npm vulnerabilities | Update dependencies; add audit to CI | P2 | Secure build | — | M |
| GOV-07 | Editorial | Heading dialect split | Standardise on English headings or Indonesian; migrate gradually | P3 | Machine-readable consistency | GOV-01 | M |

### N.5 Recommended execution order

1. **Week 1 (truth + site integrity):** QW-01…QW-15; AC-09 (canonical dataset); AC-03.
2. **Week 2–3 (accounting policy):** AC-01, AC-02, AC-04, AC-05, AC-06; re-run all examples against the dataset.
3. **Week 3–4 (compliance):** AC-08, AC-10, TAX items; human review by accountant/tax consultant.
4. **Month 2 (software + Naventra):** SW-01, NAV-01, NAV-02.
5. **Month 2–3 (learning):** LRN-01, LRN-02, PROC-01/02.
6. **Ongoing:** GOV-01…GOV-07.

**Dependency rationale:** numbers cannot be fixed before a canonical dataset exists; revenue policy must precede sales/project rewrites; tax policy must precede all PPN examples; frontmatter and links must be fixed before SEO/tag work; CI checks must exist before large-scale edits to prevent regression.

---

## O. Recommended Information Architecture

### O.1 Minimal-disruption target (recommended)

This preserves every existing slug, so 800+ wiki links keep working. New folders are numbered `000-` and `900-` so they sort first/last without renaming anything.

```text
erp-notes/
├── content/
│   ├── 000-orientation/          ← NEW
│   │   ├── index.md
│   │   ├── learning-paths.md
│   │   ├── glossary.md
│   │   ├── phase-map.md
│   │   ├── canonical-dataset.md
│   │   └── capstone-case.md
│   ├── 00-fundamentals/          (unchanged)
│   ├── 01-business-processes/    (unchanged)
│   ├── 02-accounting/            (unchanged; remove duplicates only after redirects)
│   ├── 03-sales/                 (unchanged)
│   ├── 04-purchasing/            (unchanged)
│   ├── 05-inventory/             (unchanged)
│   ├── 06-manufacturing/         (unchanged)
│   ├── 07-finance/               (unchanged)
│   ├── 08-assets/                (unchanged)
│   ├── 09-project/               (unchanged)
│   ├── 10-hr/                    (unchanged)
│   ├── 11-tax/                   (unchanged)
│   ├── 20-software/
│   │   ├── odoo/
│   │   ├── erpnext/
│   │   ├── dynamics365/
│   │   └── sap/                  ← NEW
│   ├── 30-naventra/
│   │   ├── requirements/         ← NEW
│   │   ├── functional-design/    ← NEW
│   │   ├── technical-design/     ← NEW
│   │   └── implementation-notes/ ← NEW
│   └── 900-reference/            ← NEW
│       ├── standards-index.md
│       ├── regulation-register.md
│       └── source-registry.md
├── audit/
└── .github/workflows/
```

**Explorer labels:** keep `quartz.layout.ts` `mapFn` and add `"000-orientation": "Start Here"`, `"900-reference": "Reference"`, `"sap": "SAP"`.

### O.2 Long-term clean structure (optional)

If a full renumber is desired later, use the taxonomy below **with per-file aliases/redirects** (Quartz `AliasRedirects`) and a one-release deprecation period:

```text
00-orientation / 01-fundamentals / 02-business-processes / 03-accounting
04-sales-o2c / 05-purchasing-p2p / 06-inventory-wms / 07-manufacturing
08-finance-treasury / 09-fixed-assets / 10-projects / 11-hr-payroll / 12-tax
20-software / 30-naventra / 40-reference
```

Do **not** rename folders until every inbound link is mapped; the current link graph is 815 instances and 65 pages already show raw slugs as titles.

**Positioning of Naventra:** concept articles keep a one-line “Naventra mapping” link. All requirements, design decisions, schemas, and implementation notes live in `30-naventra`, each with an ID (`NAV-REQ-001`, `NAV-FD-001`, `NAV-TD-001`) and a backlink to the concept article. This preserves vendor-neutral learning while making the product track usable.


---

## P. Audit Limitations

1. **Mermaid validation** used mermaid 11.4.0 (the version loaded by the site) in Node/jsdom, not a real browser. Parse failures are reliable; visual layout quality was not assessed.
2. **No browser-based accessibility audit** (Lighthouse/axe) or real-device mobile test. The duplicate H1, `lang`, and diagram issues are code-level findings.
3. **External URL checks** were performed once on 23 November 2026; statuses can change. 44 × 404 and 1 × 403 are recorded with that timestamp.
4. **Accounting standards** were checked against the IFRS Foundation framework and standard texts at principle level; not every paragraph number cited in the KB was re-opened. Findings labelled **Dugaan** require an accountant’s confirmation.
5. **Tax findings** were checked against DJP/Kemenkeu material where possible (PMK 131/2024, PMK 11/2025, PP 58/2023, PMK 168/2023). They are not a substitute for a licensed tax consultant’s review, especially gross-up deductibility and BPJS caps.
6. **PSAK** texts were not fetched in full; the KB cites PSAK 16/24/46/48/72 in places. Paragraph-level PSAK verification remains for a human reviewer.
7. **Software claims** were spot-checked against Microsoft Learn and official docs; several are marked **Dugaan** because the cited version is not stated. No Odoo/ERPNext instance was run to test behaviour.
8. **Naventra** cannot be audited against a specification because no specification exists in the repository. All Naventra findings concern the absence/structure of material, not product correctness.
9. **Delegated reading:** sections 03–10 were read by delegated readers; every numeric/quote finding included here was spot-checked by grep against the source. Residual risk of a missed non-numeric nuance remains.
10. **Build** was run in a temporary copy outside the repository (junctions to `content`, `quartz`, `node_modules`); the repository and its `public/` output were not modified.

---

## Q. Final Verdict

**1. Is ERP Notes already suitable as an ERP learning reference?**
**Not yet.** It is suitable as a *structured draft* and as a source of well-written explanations for an experienced practitioner. A beginner cannot rely on it: revenue timing, PPN rate, cost flows, and project/asset numbers contradict each other, and there is no learning path or practice.

**2. What is the most serious weakness?**
**The absence of a single accounting truth.** The KB teaches four different revenue-recognition points, two different PPN regimes, two different 2028 asset carrying amounts, and three different labour-cost postings. A reader who follows different articles will produce different financial statements from the same facts.

**3. What must be fixed first?**
1. Create one canonical dataset (entity, COA, unit costs, stock, document IDs, EBT/PKP).
2. Fix revenue recognition and PPN/Coretax across sales and purchasing.
3. Fix the seven broken links, twelve Mermaid failures, sixty-five slug titles, and the wrong `baseUrl`.
These are cheap, high-impact, and unblock everything else.

**4. What is not yet available?**
- Software implementation knowledge (Odoo/ERPNext/Dynamics/SAP articles, menus, models, versions, screenshots).
- Naventra requirements, functional design, technical design, implementation notes.
- Learning path, prerequisites, objectives, exercises, glossary, capstone.
- A consolidated integration matrix and canonical document lifecycle.
- A source/regulation register with dates and verification status.

**5. What would make it a high-quality ERP reference?**
- **One canonical case** that every article reuses and reconciles.
- **A clear concept → process → rules → accounting → software → product chain**, with Naventra quarantined in its own track.
- **Verified, dated sources** for every accounting/tax/software claim.
- **A learning layer** that tells the reader what to read next and lets them practise.
- **Automated guards** (link check, Mermaid parse, build, frontmatter lint) so the quality achieved is not lost.
- **Product depth** in the software section, with version-pinned behaviour and real menus/models.

If those things are delivered, ERP Notes can credibly become what it aims to be: a comprehensive, accurate, practical, and platform-independent ERP learning platform. The domain writing is already strong enough to support that ambition; the missing pieces are discipline, consistency, and the last two stages.
