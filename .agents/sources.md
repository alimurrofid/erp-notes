# Source Registry

Registry sumber utama untuk penelitian `erp-notes`.

> Prinsip: gunakan sumber sesuai domainnya. Tidak ada satu software ERP yang menjadi source of truth untuk seluruh konsep ERP.

## Hierarki Otoritas

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

- Untuk **perilaku software**, dokumentasi resmi produk mengalahkan sumber sekunder.
- Untuk **prinsip akuntansi** atau **persyaratan regulasi**, standar/regulator mengalahkan dokumentasi software.
- Jika dua sumber berbeda, dokumentasikan perbedaannya; jangan memilih salah satu tanpa alasan.

## Accounting & Standards

### IFRS Foundation

**Use for:**
- IFRS Standards
- IAS Standards
- accounting principles
- financial reporting concepts

**Authority:** Primary / standards body

**Official site:** https://www.ifrs.org/

### PSAK / IAI

**Use for:**
- standar akuntansi Indonesia (PSAK, SAK)
- interpretasi standar untuk entitas Indonesia

**Authority:** Primary / standard setter Indonesia (DSAK IAI)

**Official site:** https://www.iaiglobal.or.id/

Gunakan PSAK ketika artikel menyatakan perlakuan akuntansi untuk entitas Indonesia. Jangan menganggap IFRS dan PSAK selalu identik; sebutkan nomor standarnya.

### Indonesian Tax / Regulation

**Use for:**
- Indonesian tax rules
- tax administration
- official tax guidance

**Authority:** Primary / regulator

**Official site:** https://www.pajak.go.id/

Untuk peraturan tertentu, cari dokumen/regulasi resmi yang berlaku pada periode yang sedang dibahas, dan catat nomor serta tanggal berlakunya.

---

## ERP & Business Process

### Microsoft Learn / Dynamics 365

**Use for:**
- end-to-end business processes
- finance
- supply chain
- sales
- procurement
- manufacturing
- enterprise process terminology

**Authority:** Primary / official product documentation

**Official site:** https://learn.microsoft.com/

### ERPNext Documentation

**Use for:**
- ERP business processes
- accounting
- buying
- selling
- stock
- manufacturing
- implementation examples

**Authority:** Primary for ERPNext behavior; secondary for general ERP concepts

**Official site:** https://docs.frappe.io/erpnext/

### Odoo Documentation

**Use for:**
- Odoo-specific behavior
- module implementation
- configuration
- workflows
- accounting
- inventory
- sales
- purchase
- manufacturing

**Authority:** Primary for Odoo behavior; secondary for general ERP concepts

**Official site:** https://www.odoo.com/documentation/

### SAP Help Portal

**Use for:**
- SAP-specific behavior and terminology
- module and process documentation

**Authority:** Primary for SAP behavior; secondary for general ERP concepts

**Official site:** https://help.sap.com/

---

## Domain Sources

Gunakan daftar ini saat menentukan sumber untuk domain tertentu.

| Domain | Sumber utama | Perhatikan |
|---|---|---|
| Accounting | IFRS Foundation, PSAK/IAI, regulator | standar + paragraf, bukan software |
| Business process | Microsoft Learn, ERPNext, Odoo | bandingkan implementasi jika berbeda |
| Inventory | Prinsip akuntansi + ERPNext + Odoo + Dynamics 365 | hubungan transaksi stok, valuasi, COGS, jurnal |
| Manufacturing | Referensi manufacturing/APICS-ASCM + Dynamics 365 + ERPNext + Odoo | BOM, routing, work order, konsumsi, WIP, FG, costing, variance |
| Indonesian tax | DJP, Kementerian Keuangan | nomor regulasi + tanggal berlaku |
| Software behavior | Dokumentasi resmi produk tersebut | versi + configuration-dependent |

---

## Research Rules

1. Prefer the source that has authority over the subject.
2. For software behavior, prefer the official documentation for the exact version.
3. For accounting standards, prefer IFRS/PSAK/regulatory sources.
4. For Indonesian tax, prefer DJP and official regulations.
5. Do not cite a secondary article when the primary source is available.
6. Record version/date when the information is version-sensitive.
7. Never invent a reference URL.
8. If multiple sources disagree, document the disagreement and investigate the reason.

## Source Selection Examples

| Question | Preferred Source |
|---|---|
| What is an IFRS accounting requirement? | IFRS Foundation / relevant standard |
| What is the PSAK treatment? | PSAK / IAI |
| What is Indonesian tax treatment? | DJP / official regulation |
| How does Odoo handle a transaction? | Odoo Documentation |
| How does ERPNext handle stock valuation? | ERPNext Documentation |
| How does Dynamics handle a business process? | Microsoft Learn |
| How does SAP handle a process? | SAP Help Portal |
| What is a general ERP process? | Cross-reference multiple ERP/business process sources |
