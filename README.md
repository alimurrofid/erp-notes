# ERP Notes

Personal knowledge base untuk mempelajari **Enterprise Resource Planning (ERP)** dari sisi domain, business process, accounting, dan software implementation.

Repository ini tidak ditujukan untuk menjadi dokumentasi satu produk ERP. Konsep harus tetap dapat dipahami ketika diterapkan pada Odoo, ERPNext, Microsoft Dynamics 365, SAP, atau custom ERP seperti Naventra.

## Knowledge Map

```text
ERP Fundamentals
       ↓
Business Processes
       ↓
Accounting
       ↓
Sales / Purchasing
       ↓
Inventory
       ↓
Manufacturing
       ↓
Finance
       ↓
ERP Software Implementation
       ↓
Naventra
```

## Learning Progress

### Fundamentals

- [ ] ERP Fundamentals
- [ ] Master Data vs Transaction Data
- [ ] Organizational Structure
- [ ] Documents and Transactions
- [ ] Modules and Cross-Module Integration

### Business Processes

- [ ] Order to Cash (O2C)
- [ ] Procure to Pay (P2P)
- [ ] Record to Report (R2R)
- [ ] Inventory Flow
- [ ] Manufacturing Flow

### Accounting

- [ ] Chart of Accounts
- [ ] General Ledger
- [ ] Journal Entry
- [ ] Accounts Receivable
- [ ] Accounts Payable
- [ ] Revenue Recognition Basics
- [ ] Expense Recognition
- [ ] COGS
- [ ] Period Closing
- [ ] Financial Statements
- [ ] Bank Reconciliation

### Sales

- [ ] Quotation
- [ ] Sales Order
- [Delivery
- [ ] Customer Invoice
- [ ] Customer Payment
- [ ] Sales Return

### Purchasing

- [ ] Purchase Requisition
- [ ] RFQ
- [ ] Purchase Order
- [ ] Goods Receipt
- [ ] Vendor Bill
- [ ] Vendor Payment
- [ ] Purchase Return

### Inventory

- [ ] Stock Movement
- [ ] Warehouse
- [ ] Stock Adjustment
- [ ] Inventory Valuation
- [ ] Costing Methods
- [ ] COGS
- [ ] Lot / Serial Number
- [ ] Reordering

### Manufacturing

- [ ] BOM
- [ ] Routing
- [ ] Work Center
- [ ] Manufacturing Order
- [ ] Material Consumption
- [ ] WIP
- [ ] Finished Goods
- [ ] Manufacturing Cost
- [ ] Variance

### Finance

- [ ] Cash Management
- [ ] Bank Management
- [ ] Budgeting
- [ ] Fixed Assets
- [ ] Depreciation
- [ ] Financial Closing
- [ ] Financial Reporting

### Software

- [ ] Odoo
- [ ] ERPNext
- [ ] Dynamics 365
- [ ] Cross-ERP comparison

### Naventra

- [ ] Accounting requirements
- [ ] Sales requirements
- [ ] Purchasing requirements
- [ ] Inventory requirements
- [ ] Manufacturing requirements
- [ ] Finance requirements
- [ ] Design decisions
- [ ] ERP concept → Naventra mapping

## Repository Structure

```text
content/
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

## Documentation Philosophy

Gunakan urutan:

```text
Concept
→ Process
→ Business Rules
→ Accounting Impact
→ Software Implementation
→ Naventra Implementation
```

Jangan memulai pembelajaran dari menu software. Pahami proses bisnis dan dampaknya terlebih dahulu.

## AI Agent

Repository ini menggunakan `AGENTS.md` sebagai aturan utama untuk AI agent.

Panduan tambahan berada di:

- `.agents/sources.md`
- `.agents/terminology.md`
- `.agents/document-template.md`

AI agent harus memeriksa dokumen yang sudah ada sebelum membuat dokumen baru untuk menghindari duplikasi.

## Status

Repository ini adalah **living knowledge base**. Informasi dapat diperbarui ketika sumber resmi, software version, accounting standards, atau regulatory requirements berubah.
