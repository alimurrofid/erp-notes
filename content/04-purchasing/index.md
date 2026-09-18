---
title: Purchasing
---

# Purchasing & Procure-to-Pay (P2P) in ERP

Bagian ini membahas arsitektur, proses bisnis, aturan validasi, pengendalian internal, dan integrasi finansial dari domain **Purchasing (Pengadaan)** dan siklus **Procure to Pay (P2P)** dalam sistem ERP enterprise secara universal dan *vendor-agnostic*.

Modul Pengadaan berfungsi sebagai **pengendali komitmen pengeluaran modal dan operasional entitas**, menghubungkan kebutuhan unit bisnis internal dengan pasar pemasok eksternal, penerimaan logistik di gudang, verifikasi kewajiban di bagian utang usaha (*Accounts Payable*), hingga penyelesaian pembayaran perbankan dan pencatatan buku besar (*General Ledger*).

Materi disusun mengikuti alur rantai nilai pengadaan terpadu:
$$\text{Requisition} \to \text{Sourcing \& RFQ} \to \text{Supplier Evaluation} \to \text{Purchase Order} \to \text{Pricing \& Tax} \to \text{Receipt (GR)} \to \text{3-Way Match} \to \text{Vendor Bill} \to \text{Accounts Payable} \to \text{Disbursement} \to \text{Reporting}$$

---

## Daftar Materi Pembelajaran Purchasing

### 1. Fondasi & Master Data Pengadaan

1. [[04-purchasing/purchasing-fundamentals|Purchasing Fundamentals in ERP]]  
   Konsep dasar pengadaan dalam ERP, perbedaan fungsi komersial vs aliran transaksi finansial, pengadaan barang (*Direct/Indirect*) vs pengadaan jasa, pemisahan tugas (*Segregation of Duties*), batas kewenangan (*Delegation of Authority / DOA*), dan pemisahan prinsip krusial $\text{PR} \neq \text{PO} \neq \text{GR} \neq \text{Bill} \neq \text{AP} \neq \text{Cash Payment}$.

2. [[04-purchasing/supplier-and-purchasing-master-data|Supplier and Purchasing Master Data]]  
   Struktur data induk pemasok (*legal name, multi-address ordering/remittance, tax ID/NPWP, payment terms, currency, bank accounts*), master data produk sisi pengadaan (*purchasing UOM, purchase price, lead time, supplier part number*), dan prinsip *snapshotting* nilai historis transaksi.

---

### 2. Sourcing, Permintaan & Seleksi Pemasok

3. [[04-purchasing/purchase-requisition|Purchase Requisition]]  
   Dokumen permintaan internal tanpa dampak hukum atau akuntansi, perbedaan PR operasional vs PR inventaris otomatis (ROP/MRP), alur persetujuan berbasis anggaran (*budget check & encumbrance*), dan konsolidasi beberapa PR menjadi satu PO.

4. [[04-purchasing/request-for-quotation|Request for Quotation (RFQ)]]  
   Proses *sourcing* formal untuk membandingkan penawaran vendor, struktur RFQ, masa berlaku penawaran (*validity period*), pengiriman multi-vendor, pemasukan data penawaran (*vendor quotation entry*), dan ketiadaan dampak akuntansi/persediaan.

5. [[04-purchasing/supplier-selection-and-evaluation|Supplier Selection and Evaluation]]  
   Logika evaluasi penawaran (harga, kualitas, *lead time*, term pembayaran), matriks komparasi penawaran, penentuan pemenang (*bid awarding*), serta metrik evaluasi kinerja berkelanjutan (*On-Time In-Full / OTIF*, tingkat cacat mutu, dan *Scorecard Vendor*).

---

### 3. Pemesanan Komersial, Harga & Pajak

6. [[04-purchasing/purchase-order|Purchase Order]]  
   Kontrak komersial berkekuatan hukum (*legally binding contract*), struktur header dan baris item, tanggal janji kirim (*promised date*), komitmen anggaran (*budget encumbrance*), status siklus hidup PO, dan variasi pemrosesan (Standard, Service, Blanket, Drop-ship).

7. [[04-purchasing/purchasing-pricing-and-terms|Purchasing Pricing and Terms]]  
   Mekanisme penentuan harga beli (*price lists, quantity breaks, contract pricing*), Incoterms 2020 (FOB, CIF, DDP), penanganan *Landed Cost* (ongkos angkut freight, bea masuk, asuransi) yang dikapitalisasi ke nilai persediaan (IAS 2), serta syarat pembayaran (*Net Terms* vs *Early Payment Discounts*).

8. [[04-purchasing/purchase-tax|Purchase Tax in ERP]]  
   Mesin kalkulasi pajak pengadaan otomatis, pajak masukan yang dapat dikreditkan vs tidak dapat dikreditkan (*recoverable vs non-recoverable VAT*), pemotongan pajak penghasilan (*Withholding Tax / PPh 23, PPh 22, PPh 4 ayat 2*), Faktur Pajak Masukan (e-Faktur), dan penjurnalan akuntansi perpajakan di Indonesia.

---

### 4. Penerimaan Logistik, Verifikasi & Utang Usaha

9. [[04-purchasing/goods-receipt-and-service-receipt|Goods Receipt and Service Receipt]]  
   Penerimaan fisik barang (*Goods Receipt / Delivery Slip*) vs tanda terima jasa (*Service Entry Sheet*), inspeksi mutu (*Quality Inspection & Quarantine*), dampak mutasi persediaan perpetual, dan akrual kewajiban interim (*GR/IR Clearing Account*).

10. [[04-purchasing/three-way-match|Three-Way Match]]  
    Pilar pengendalian internal tertinggi pengadaan: pencocokan otomatis antara Purchase Order (harga dan term), Goods Receipt (kuantitas aktual diterima), dan Vendor Bill (nilai penagihan vendor). Batas toleransi (*tolerances*), penanganan *discrepancy / price & quantity variance*, dan pelepasan blokir faktur.

11. [[04-purchasing/accounts-payable-integration|Accounts Payable Integration]]  
    Transisi pengadaan ke utang usaha resmi, penerbitan *Vendor Bill*, sinkronisasi buku pembantu AP (*AP Subledger*) dan akun kontrol GL, penjurnalan eliminasi GR/IR, verifikasi Faktur Pajak, penjadwalan pembayaran (*Aging Schedule*), dan pelunasan kas/bank (*settlement*).

12. [[04-purchasing/purchase-return-and-debit-note|Purchase Return and Debit Note]]  
    Tata kelola pengembalian barang ke pemasok (*Return to Vendor / RTV*), penanganan retur sebelum penagihan (*pre-bill*) vs pasca-penagihan (*post-bill*), penerbitan Nota Debet (*Debit Note*), pemotongan saldo utang usaha, penyesuaian nilai persediaan, dan pembatalan Pajak Masukan.

13. [[04-purchasing/prepayment-and-down-payment|Prepayment and Down Payment]]  
    Pembayaran uang muka pembelian (*supplier advance*), pemisahan uang muka sebagai aset lancar vs pengurang utang usaha, penerbitan Faktur Pajak atas uang muka, dan alur kompensasi/penyelesaian (*reconciliation*) terhadap tagihan final vendor.

---

### 5. Tata Kelola, Kontrak, Analitik & Integrasi Sistem

14. [[04-purchasing/purchase-cancellation-and-amendment|Purchase Cancellation and Amendment]]  
    Tata kelola pembatalan dan amandemen pesanan berdasarkan tahapan siklus hidup (*Draft, Approved, Partially Received, Invoiced*), prinsip kekekalan data (*immutability*), larangan penghapusan fisik, manajemen revisi (*version control*), dan prosedur *short-closing* baris pesanan.

15. [[04-purchasing/procurement-contract-and-agreement|Procurement Contract and Agreement]]  
    Perjanjian jangka panjang (*Blanket Purchase Order, Framework Agreement, Rate Contract*), komitmen kuantitas vs komitmen nilai belanja, mekanisme pelepasan pesanan bertahap (*Call-off / Release Orders*), dan pemantauan batas penyerapan kontrak (*contract fulfillment tracking*).

16. [[04-purchasing/purchasing-reporting-and-analytics|Purchasing Reporting and Analytics]]  
    Metrik operasional (*PO cycle time, open backlog, touchless rate*), metrik kinerja vendor (*OTD, OTIF, return rate*), metrik finansial (*Spend Analysis, Purchase Price Variance / PPV, DPO*), hierarki dashboard taktis vs strategis, dan peran ERP sebagai *Single Source of Truth*.

17. [[04-purchasing/procure-to-pay-integration|Procure to Pay Integration Architecture]]  
    Sintesis arsitektur terpadu siklus P2P lintas domain (Inventory, Warehouse, Quality, AP, GL, Treasury, Tax, Manufacturing, Sales), matriks perbandingan simetris P2P vs O2C, dan penelusuran transaksi acuan kanonikal PT Sumber Teknologi secara menyeluruh dari PR hingga pelunasan bank.
