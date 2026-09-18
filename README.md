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
Fixed Assets
       ↓
Project Management
       ↓
Human Resources
       ↓
Tax Management
       ↓
ERP Software Implementation
       ↓
Naventra
```

## Learning Progress

### Fundamentals

- [x] [[00-fundamentals/erp-fundamentals|ERP Fundamentals]]
- [x] [[00-fundamentals/erp-architecture|ERP Architecture / Mental Model]]
- [x] [[00-fundamentals/master-data-vs-transaction-data|Master Data vs Transaction Data]]
- [x] [[00-fundamentals/organizational-structure|Organizational Structure]]
- [x] [[00-fundamentals/documents-transactions-events|Documents, Transactions, and Business Events]]
- [x] [[00-fundamentals/erp-modules|ERP Modules]]
- [x] [[00-fundamentals/cross-module-integration|Cross-Module Integration]]

### Business Processes

- [x] [[01-business-processes/order-to-cash|Order to Cash (O2C)]]
- [x] [[01-business-processes/procure-to-pay|Procure to Pay (P2P)]]
- [x] [[01-business-processes/record-to-report|Record to Report (R2R)]]
- [x] [[01-business-processes/inventory-process|Inventory Process]]
- [x] [[01-business-processes/manufacturing-process|Manufacturing Process]]

### Accounting

- [x] [[02-accounting/accounting-fundamentals|Accounting Fundamentals]]
- [x] [[02-accounting/debit-credit-and-double-entry|Debit, Credit, and Double-Entry]]
- [x] [[02-accounting/chart-of-accounts|Chart of Accounts]]
- [x] [[02-accounting/journal-entry|Journal Entry]]
- [x] [[02-accounting/general-ledger-and-subledger|General Ledger & Subledger]]
- [x] [[02-accounting/accounts-receivable|Accounts Receivable]]
- [x] [[02-accounting/accounts-payable|Accounts Payable]]
- [x] [[02-accounting/revenue-and-expense|Revenue & Expense Recognition]]
- [x] [[02-accounting/inventory-accounting|Inventory Accounting & COGS]]
- [x] [[02-accounting/fixed-asset-accounting|Fixed Asset Accounting]]
- [x] [[02-accounting/tax-accounting|Tax Accounting]]
- [x] [[02-accounting/bank-reconciliation|Bank Reconciliation]]
- [x] [[02-accounting/accrual-and-adjusting-entries|Accrual & Adjusting Entries]]
- [x] [[02-accounting/depreciation-and-amortization|Depreciation & Amortization]]
- [x] [[02-accounting/foreign-currency-accounting|Foreign Currency Accounting]]
- [x] [[02-accounting/period-end-closing|Period-End Closing]]
- [x] [[02-accounting/financial-statements|Financial Statements]]

### Sales

- [x] [[03-sales/sales-fundamentals|Sales Fundamentals in ERP]]
- [x] [[03-sales/customer-and-sales-master-data|Customer & Sales Master Data]]
- [x] [[03-sales/sales-quotation|Sales Quotation]]
- [x] [[03-sales/sales-order|Sales Order]]
- [x] [[03-sales/pricing-and-discount|Pricing & Discount Architecture]]
- [x] [[03-sales/sales-tax|Sales Tax]]
- [x] [[03-sales/order-fulfillment|Order Fulfillment]]
- [x] [[03-sales/delivery-and-shipping|Delivery & Shipping]]
- [x] [[03-sales/revenue-recognition|Revenue Recognition (IFRS 15)]]
- [x] [[03-sales/accounts-receivable-integration|Accounts Receivable Integration]]
- [x] [[03-sales/sales-return-and-credit-note|Sales Return & Credit Note]]
- [x] [[03-sales/customer-credit-management|Customer Credit Management]]
- [x] [[03-sales/sales-commission|Sales Commission]]
- [x] [[03-sales/backorder-and-partial-fulfillment|Backorder & Partial Fulfillment]]
- [x] [[03-sales/sales-cancellation-and-amendment|Sales Cancellation & Amendment]]
- [x] [[03-sales/sales-reporting-and-analytics|Sales Reporting & Analytics]]
- [x] [[03-sales/order-to-cash-integration|Order to Cash Integration]]

### Purchasing

- [x] [[04-purchasing/purchasing-fundamentals|Purchasing Fundamentals]]
- [x] [[04-purchasing/supplier-and-purchasing-master-data|Supplier & Purchasing Master Data]]
- [x] [[04-purchasing/purchase-requisition|Purchase Requisition]]
- [x] [[04-purchasing/request-for-quotation|Request for Quotation (RFQ)]]
- [x] [[04-purchasing/supplier-selection-and-evaluation|Supplier Selection & Evaluation]]
- [x] [[04-purchasing/purchase-order|Purchase Order]]
- [x] [[04-purchasing/purchasing-pricing-and-terms|Purchasing Pricing & Terms]]
- [x] [[04-purchasing/purchase-tax|Purchase Tax]]
- [x] [[04-purchasing/goods-receipt-and-service-receipt|Goods Receipt & Service Receipt]]
- [x] [[04-purchasing/accounts-payable-integration|Accounts Payable Integration]]
- [x] [[04-purchasing/three-way-match|Three-Way Match]]
- [x] [[04-purchasing/purchase-return-and-debit-note|Purchase Return & Debit Note]]
- [x] [[04-purchasing/prepayment-and-down-payment|Prepayment & Down Payment]]
- [x] [[04-purchasing/purchase-cancellation-and-amendment|Purchase Cancellation & Amendment]]
- [x] [[04-purchasing/procurement-contract-and-agreement|Procurement Contract & Agreement]]
- [x] [[04-purchasing/purchasing-reporting-and-analytics|Purchasing Reporting & Analytics]]
- [x] [[04-purchasing/procure-to-pay-integration|Procure to Pay Integration]]

### Inventory

- [x] [[05-inventory/inventory-fundamentals|Inventory Fundamentals]]
- [x] [[05-inventory/product-and-inventory-master-data|Product & Inventory Master Data]]
- [x] [[05-inventory/warehouse-and-location|Warehouse & Location Topology]]
- [x] [[05-inventory/stock-quantity-and-availability|Stock Quantity & Availability (ATP)]]
- [x] [[05-inventory/inventory-uom-and-conversion|Inventory UOM & Conversion]]
- [x] [[05-inventory/inventory-receiving|Inventory Receiving & Putaway]]
- [x] [[05-inventory/inventory-picking-and-delivery|Inventory Picking, Packing & Delivery]]
- [x] [[05-inventory/internal-stock-transfer|Internal Stock Transfer]]
- [x] [[05-inventory/inventory-reservation-and-allocation|Inventory Reservation & Allocation]]
- [x] [[05-inventory/inventory-costing|Inventory Costing & Valuation]]
- [x] [[05-inventory/landed-cost|Landed Cost & Capitalization]]
- [x] [[05-inventory/lot-and-serial-number-tracking|Lot & Serial Number Tracking]]
- [x] [[05-inventory/inventory-adjustment|Inventory Adjustment & Write-Off]]
- [x] [[05-inventory/physical-inventory-count|Physical Inventory Count (Stock Opname)]]
- [x] [[05-inventory/inventory-return-and-reversal|Inventory Return & Quarantine]]
- [x] [[05-inventory/replenishment-and-stock-planning|Replenishment & Stock Planning]]
- [x] [[05-inventory/inventory-integration|Inventory & Warehouse Integration]]

### Manufacturing

- [x] [[06-manufacturing/manufacturing-fundamentals|Manufacturing Fundamentals]]
- [x] [[06-manufacturing/product-structure-and-bom|Product Structure & BOM]]
- [x] [[06-manufacturing/routing-and-work-center|Routing & Work Center]]
- [x] [[06-manufacturing/manufacturing-order|Manufacturing Order Lifecycle]]
- [x] [[06-manufacturing/production-planning|Production Planning & MPS]]
- [x] [[06-manufacturing/mrp-material-requirement-planning|Material Requirements Planning (MRP)]]
- [x] [[06-manufacturing/material-availability-and-reservation|Material Availability & Reservation]]
- [x] [[06-manufacturing/shop-floor-execution|Shop Floor Control & Execution]]
- [x] [[06-manufacturing/material-consumption-and-backflush|Material Consumption & Backflushing]]
- [x] [[06-manufacturing/production-output-and-by-product|Production Output, Co-Products & By-Products]]
- [x] [[06-manufacturing/production-costing-and-wip|Production Costing & WIP]]
- [x] [[06-manufacturing/capacity-planning-and-scheduling|Capacity Planning & Scheduling]]
- [x] [[06-manufacturing/production-variance-and-performance|Production Variance & Performance]]
- [x] [[06-manufacturing/subcontracting-and-external-processing|Subcontracting & External Processing]]
- [x] [[06-manufacturing/production-quality-and-rework|Quality Control & Rework]]
- [x] [[06-manufacturing/manufacturing-reporting-and-analytics|Manufacturing Reporting & Analytics]]
- [x] [[06-manufacturing/manufacturing-integration|Manufacturing Integration Architecture]]

### Finance

- [x] [[07-finance/finance-fundamentals|Finance Fundamentals]]
- [x] [[07-finance/finance-master-data|Finance Master Data]]
- [x] [[07-finance/cash-management|Cash Management]]
- [x] [[07-finance/bank-account-management|Bank Account Management]]
- [x] [[07-finance/bank-reconciliation|Operational Bank Reconciliation]]
- [x] [[07-finance/payment-and-cash-disbursement|Payment & Cash Disbursement]]
- [x] [[07-finance/budget-management|Budget Management & Control]]
- [x] [[07-finance/financial-planning|Financial Planning & Forecasting]]
- [x] [[07-finance/cash-flow-planning|Cash Flow Planning & Forecasting]]
- [x] [[07-finance/liquidity-management|Liquidity Management]]
- [x] [[07-finance/working-capital-management|Working Capital Management]]
- [x] [[07-finance/financial-closing|Financial & Management Closing]]
- [x] [[07-finance/financial-reporting|Management Financial Reporting & Dashboards]]
- [x] [[07-finance/financial-analysis|Financial Analysis & Performance Evaluation]]
- [x] [[07-finance/financial-controls|Financial Controls & Governance]]
- [x] [[07-finance/finance-integration|Cross-Module Finance Integration]]

### Fixed Assets

- [x] [[08-assets/fixed-assets-fundamentals|Fixed Assets Fundamentals]]
- [x] [[08-assets/asset-master-data|Asset Master Data]]
- [x] [[08-assets/asset-classification|Asset Classification & Hierarchy]]
- [x] [[08-assets/asset-acquisition-and-capitalization|Asset Acquisition & Capitalization]]
- [x] [[08-assets/asset-componentization|Asset Componentization]]
- [x] [[08-assets/depreciation-management|Depreciation Schedule & Management]]
- [x] [[08-assets/asset-transfer-and-location|Asset Transfer & Location Tracking]]
- [x] [[08-assets/asset-revaluation|Asset Revaluation]]
- [x] [[08-assets/asset-impairment|Asset Impairment Management]]
- [x] [[08-assets/capex-vs-opex|CAPEX vs OPEX in Asset Lifecycle]]
- [x] [[08-assets/asset-maintenance-integration|Asset Maintenance Integration]]
- [x] [[08-assets/physical-asset-verification|Physical Asset Verification & Tagging]]
- [x] [[08-assets/asset-disposal-and-retirement|Asset Disposal & Retirement]]
- [x] [[08-assets/asset-reporting-and-analytics|Asset Reporting & Analytics]]
- [x] [[08-assets/asset-controls-and-governance|Asset Controls & Governance]]
- [x] [[08-assets/fixed-assets-integration|Cross-Module Fixed Assets Integration]]

### Project Management

- [x] [[09-project/project-management-fundamentals|Project Management Fundamentals]]
- [x] [[09-project/project-master-data|Project Master Data]]
- [x] [[09-project/project-structure-and-work-breakdown|Project Structure & WBS]]
- [x] [[09-project/project-planning-and-scheduling|Project Planning & Scheduling]]
- [x] [[09-project/project-task-and-milestone|Project Tasks & Milestones]]
- [x] [[09-project/project-resource-management|Project Resource Management]]
- [x] [[09-project/timesheet-and-effort-tracking|Timesheet & Effort Tracking]]
- [x] [[09-project/project-cost-management|Project Cost Management]]
- [x] [[09-project/project-budget-and-cost-control|Project Budget & Cost Control]]
- [x] [[09-project/project-procurement|Project Procurement]]
- [x] [[09-project/project-material-and-inventory|Project Material & Inventory]]
- [x] [[09-project/project-billing-and-revenue|Project Billing & Revenue]]
- [x] [[09-project/project-profitability|Project Profitability]]
- [x] [[09-project/project-change-risk-and-issue-management|Change, Risk & Issue Management]]
- [x] [[09-project/project-completion-and-closing|Project Completion & Closing]]
- [x] [[09-project/project-reporting-and-analytics|Project Reporting & Analytics]]
- [x] [[09-project/project-integration|Cross-Module Project Integration]]

### Human Resources

- [x] [[10-hr/hr-management-fundamentals|HR Management Fundamentals]]
- [x] [[10-hr/employee-master-data|Employee Master Data]]
- [x] [[10-hr/organization-and-position-structure|Organization & Position Structure]]
- [x] [[10-hr/employment-lifecycle|Employment Lifecycle]]
- [x] [[10-hr/recruitment-and-onboarding|Recruitment & Onboarding]]
- [x] [[10-hr/attendance-and-work-schedule|Attendance & Work Schedule]]
- [x] [[10-hr/leave-management|Leave Management]]
- [x] [[10-hr/overtime-and-time-management|Overtime & Time Management]]
- [x] [[10-hr/employee-timesheet-and-labor-cost|Employee Timesheet & Labor Cost]]
- [x] [[10-hr/payroll-fundamentals|Payroll Fundamentals]]
- [x] [[10-hr/payroll-earnings-and-deductions|Payroll Earnings & Deductions]]
- [x] [[10-hr/payroll-benefits-and-reimbursements|Payroll Benefits & Reimbursements]]
- [x] [[10-hr/payroll-tax-and-statutory-compliance|Payroll Tax & Statutory Compliance]]
- [x] [[10-hr/payroll-accounting-and-finance-integration|Payroll Accounting & Finance Integration]]
- [x] [[10-hr/performance-and-employee-management|Performance & Employee Management]]
- [x] [[10-hr/workforce-planning-and-hr-analytics|Workforce Planning & HR Analytics]]
- [x] [[10-hr/hr-controls-and-governance|HR Controls & Governance]]
- [x] [[10-hr/hr-integration|Cross-Module HR Integration]]

### Tax Management

- [x] [[11-tax/tax-management-fundamentals|Tax Management Fundamentals]]
- [x] [[11-tax/tax-master-data-and-tax-code|Tax Master Data & Tax Code]]
- [x] [[11-tax/tax-determination-and-tax-rules|Tax Determination & Tax Rules]]
- [x] [[11-tax/taxable-base-and-tax-calculation|Taxable Base & Tax Calculation]]
- [x] [[11-tax/vat-fundamentals|VAT Fundamentals]]
- [x] [[11-tax/input-vat-and-output-vat|Input VAT & Output VAT]]
- [x] [[11-tax/vat-transaction-and-tax-invoice|VAT Transaction & Tax Invoice (e-Faktur)]]
- [x] [[11-tax/vat-return-and-reconciliation|VAT Return & Reconciliation (SPT Masa)]]
- [x] [[11-tax/withholding-tax-management|Withholding Tax Management (e-Bupot)]]
- [x] [[11-tax/corporate-income-tax-fundamentals|Corporate Income Tax Fundamentals]]
- [x] [[11-tax/taxable-income-and-fiscal-reconciliation|Taxable Income & Fiscal Reconciliation]]
- [x] [[11-tax/corporate-income-tax-calculation|Corporate Income Tax Calculation (Pasal 31E)]]
- [x] [[11-tax/corporate-tax-installment-and-prepayment|Corporate Tax Installments & Prepayments (PPh 25/29)]]
- [x] [[11-tax/tax-payment-and-tax-return|Tax Payment & Tax Return (Billing/NTPN/BPE)]]
- [x] [[11-tax/tax-closing-and-period-end|Tax Closing & Period-End Procedures]]
- [x] [[11-tax/tax-reporting-and-tax-analytics|Tax Reporting, Equalization & Analytics]]
- [x] [[11-tax/tax-controls-audit-and-compliance|Tax Controls, Audit & Compliance (SP2DK)]]
- [x] [[11-tax/tax-integration|Cross-Module Tax Integration]]

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

## Development & Deployment (Quartz v4)

Knowledge base ini dipublikasikan menggunakan [Quartz v4](https://quartz.jzhao.xyz/) yang kompatibel dengan Obsidian dan dideploy secara otomatis ke GitHub Pages.

### Menjalankan Secara Lokal

```bash
# Install dependencies
npm install

# Jalankan local development server dengan live preview
npx quartz build --serve
# atau: npm run serve
```

Buka `http://localhost:8080` pada browser.

### Menjalankan Build

```bash
npx quartz build
# atau: npm run build
```

Hasil build statis akan disimpan di folder `public/`.

### Deployment ke GitHub Pages

Deployment dijalankan otomatis melalui GitHub Actions workflow (`.github/workflows/deploy.yml`) setiap ada `push` ke branch `main`.

Pengaturan awal di repository GitHub:
1. Buka tab **Settings** > **Pages**.
2. Pada bagian **Build and deployment** > **Source**, pilih **GitHub Actions**.

## Status

Repository ini adalah **living knowledge base**. Informasi dapat diperbarui ketika sumber resmi, software version, accounting standards, atau regulatory requirements berubah.
