---
title: Sales
---

# Sales & Order-to-Cash (O2C) in ERP

Bagian ini membahas arsitektur, proses bisnis, aturan validasi, dan integrasi finansial dari domain **Sales (Penjualan)** dan siklus **Order to Cash (O2C)** dalam sistem ERP enterprise secara universal dan *vendor-agnostic*.

Modul Penjualan berfungsi sebagai **motor penggerak komersial entitas**, menghubungkan interaksi pelanggan di garis depan dengan operasi pergudangan di lini tengah dan pencatatan piutang serta pengakuan pendapatan di lini akuntansi.

Materi disusun mengikuti mental model terpadu:
$$\text{Customer} \to \text{Quotation} \to \text{Sales Order} \to \text{Pricing \& Tax} \to \text{Fulfillment} \to \text{Delivery} \to \text{Invoice} \to \text{Accounts Receivable} \to \text{Payment} \to \text{Settlement} \to \text{Financial Reporting}$$

---

## Daftar Materi Pembelajaran Sales

### 1. Fondasi & Master Data Penjualan

1. [[03-sales/sales-fundamentals|Sales Fundamentals in ERP]]  
   Konsep dasar penjualan dalam ERP, perbedaan fungsi komersial vs aliran transaksi finansial, interaksi *customer-facing* vs *back-office*, dan prinsip krusial $\text{Sales Order} \neq \text{Invoice} \neq \text{Revenue} \neq \text{Cash}$.

2. [[03-sales/customer-and-sales-master-data|Customer and Sales Master Data]]  
   Struktur data induk pelanggan (*legal name, multi-address billing/shipping, tax ID, payment terms, credit limit*), master produk sisi penjualan (*UOM conversion, tax category, income account mapping*), dan prinsip pembekuan nilai historis (*snapshotting*).

---

### 2. Siklus Pemesanan Komersial & Kebijakan Harga

3. [[03-sales/sales-quotation|Sales Quotation]]  
   Proposal komersial berbatas waktu (*validity period*), alur persetujuan diskon, penanganan revisi, ketiadaan dampak akuntansi/persediaan, dan konversi ke pesanan resmi.

4. [[03-sales/sales-order|Sales Order]]  
   Pusat komando operasional pesanan mengikat secara hukum (*legally binding contract*), struktur header dan line item, reservasi stok komitmen (*stock reservation*), dan variasi pemrosesan (MTS, MTO, Drop-shipping).

5. [[03-sales/pricing-and-discount|Pricing and Discount Architecture]]  
   Mesin aturan penetapan harga bertingkat (*base price, price lists, volume/tier pricing, contract price*), taksonomi diskon komersial (*trade, line, document, cash discounts*), aturan prioritas (*precedence rules*), dan resolusi konflik harga.

6. [[03-sales/sales-tax|Sales Tax in ERP]]  
   Mesin kalkulasi pajak penjualan otomatis, barang kena pajak vs bebas pajak, penetapan harga inklusif vs eksklusif, aturan pembulatan, utang PPN Keluaran (*Output Tax*), dan studi kasus regulasi Indonesia (UU HPP No. 7 Tahun 2021 & WAPU).

---

### 3. Eksekusi Logistik, Pemenuhan & Pengiriman

7. [[03-sales/order-fulfillment|Order Fulfillment]]  
   Logika ketersediaan persediaan (*On-Hand, Reserved, Available-to-Promise / ATP*), enam status kuantitas kritis ERP (*Ordered, Reserved, Picked, Delivered, Invoiced, Returned*), metode pengambilan gudang (*picking & packing*), dan penanganan kekurangan stok.

8. [[03-sales/delivery-and-shipping|Delivery and Shipping]]  
   Dokumen Surat Jalan (*Delivery Order / Goods Issue*), variasi urutan (*Delivery before Invoice* vs *Invoice before Delivery* vs *Service Sales*), bukti tanda terima (*Proof of Delivery / POD*), dan penjurnalan otomatis pembebanan COGS serta pengurangan persediaan perpetual.

---

### 4. Integrasi Finansial, Pendapatan & Piutang

9. [[03-sales/revenue-recognition|Revenue Recognition in Sales (IFRS 15)]]  
   Penerapan model 5-langkah IFRS 15 pada transaksi penjualan, pemisahan waktu penagihan faktur vs pengakuan pendapatan, penyerahan titik waktu (*Point in Time*) vs sepanjang waktu (*Over Time*), alokasi harga jual paket berdiri sendiri (*SSP*), dan jadwal amortisasi pendapatan tangguhan (*deferred revenue schedule*).

10. [[03-sales/accounts-receivable-integration|Accounts Receivable Integration]]  
    Transisi penjualan ke piutang usaha, penerbitan faktur komersial (*Customer Invoice*), sinkronisasi buku pembantu AR dan akun kontrol GL, alokasi pembayaran kas/bank (*open-item clearing*), dan pemulihan plafon kredit.

11. [[03-sales/sales-return-and-credit-note|Sales Return and Credit Note]]  
    Tata kelola otorisasi retur barang (*RMA*), pembedaan retur fisik vs penyesuaian finansial, inspeksi karantina mutu (*restock vs scrap*), penerbitan Nota Kredit (*Credit Note*), akun kontra retur penjualan, dan penyesuaian HPP.

12. [[03-sales/customer-credit-management|Customer Credit Management]]  
    Pengendalian risiko kredit preventif di gerbang penjualan vs pencadangan kerugian akuntansi (*IFRS 9 ECL*), formula paparan kredit total (*Credit Exposure*), aturan pemblokiran otomatis (*credit hold*), dan alur persetujuan pelepasan pesanan.

---

### 5. Tata Kelola Transaksi, Insentif & Analitik

13. [[03-sales/sales-commission|Sales Commission]]  
    Struktur rencana komisi perwakilan penjualan, dasar kalkulasi (*Revenue-based vs Margin-based vs Cash-collected*), akselerator berjenjang, bagi hasil tim (*split commission*), penarikan kembali (*clawback* atas retur), dan penjurnalan beban komisi operasional.

14. [[03-sales/backorder-and-partial-fulfillment|Backorder and Partial Fulfillment]]  
    Penanganan pesanan parsial saat defisit stok gudang, persamaan kuantitas terkirim dan tertunda (*backorder*), penagihan bertahap (*incremental invoicing*), kebijakan pengiriman (*Ship Complete vs Partial Allowed*), dan rekonsiliasi akhir.

15. [[03-sales/sales-cancellation-and-amendment|Sales Cancellation and Amendment]]  
    Tata kelola perubahan transaksi pasca-persetujuan, aturan perubahan berdasarkan tahapan siklus hidup (*Draft, Confirmed, Delivered, Invoiced*), prinsip kekekalan (*immutability*), larangan penghapusan fisik, dan pencatatan jejak audit (*audit trail*).

16. [[03-sales/sales-reporting-and-analytics|Sales Reporting and Analytics]]  
    Pemisahan metrik operasional pergudangan (*Order Volume, AOV, Fill Rate, OTIF*) dari metrik finansial buku besar (*Gross Sales, Net Revenue, Gross Margin, DSO*), identifikasi sumber kebenaran data (*Single Source of Truth*), dan pemotongan analitik multidimensi.

17. [[03-sales/order-to-cash-integration|Order to Cash Integration Architecture]]  
    Sintesis arsitektur terpadu hulu-ke-hilir, matriks aliran data lintas domain, 5 variasi model bisnis (MTS, MTO, Drop-shipping, Service/Subscription, POS Cash & Carry), dan pelacakan transaksi acuan kanonikal dari penawaran hingga laporan keuangan.
