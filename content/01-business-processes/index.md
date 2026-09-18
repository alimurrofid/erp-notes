---
title: Business Processes
---

# End-to-End Business Processes

Bagian ini membahas proses bisnis inti perusahaan dari hulu ke hilir (*end-to-end business processes*) yang melintasi berbagai modul operasional dan akuntansi dalam sistem ERP.

Setiap proses diuraikan mengikuti alur terstandarisasi:
$$\text{Trigger} \to \text{Business Event} \to \text{Document} \to \text{Validation} \to \text{Transaction} \to \text{Operational Impact} \to \text{Accounting Impact} \to \text{Next Process}$$

## Daftar Proses Bisnis

1. [[01-business-processes/order-to-cash|Order to Cash (O2C)]]  
   Siklus hilir komersial: penawaran harga (*quotation*), pesanan penjualan (*sales order*), pemeriksaan kredit, pengiriman barang (*goods issue*), faktur penjualan (*customer invoice* - IFRS 15), hingga penerimaan pembayaran dan rekonsiliasi kas.

2. [[01-business-processes/procure-to-pay|Procure to Pay (P2P)]]  
   Siklus hulu pengadaan: permintaan pembelian (*purchase requisition*), penawaran pemasok (*RFQ*), pesanan pembelian (*purchase order*), penerimaan barang fisik (*goods receipt*), pencocokan 3-arah (*3-way matching*), faktur tagihan (*vendor bill*), dan akun kliring *GR/IR*.

3. [[01-business-processes/record-to-report|Record to Report (R2R)]]  
   Siklus akuntansi dan pelaporan: posting buku pembantu (*subledger to GL*), jurnal penyesuaian akrual dan amortisasi (IAS 1), rekonsiliasi kas bank, penyesuaian selisih kurs valuta asing (IAS 21), penguncian periode buku, serta penyusunan laporan keuangan resmi.

4. [[01-business-processes/inventory-process|Inventory Process]]  
   Siklus manajemen persediaan: penerimaan barang (*receipt*), mutasi internal antar-gudang (*transfer*), pemakaian internal (*issue/consumption*), penghitungan fisik (*stock opname*), penyesuaian selisih (*adjustment*), pemusnahan barang rusak (*scrap*), dan evaluasi nilai pasar (IAS 2 LCNRV).

5. [[01-business-processes/manufacturing-process|Manufacturing Process]]  
   Siklus manufaktur dan produksi: perencanaan kebutuhan bahan (*MRP*), penerbitan perintah kerja (*work order*), pengeluaran bahan baku ke lantai pabrik (*WIP*), pencatatan tenaga kerja dan pembebanan overhead pabrik, penerimaan barang jadi, dan penyelesaian varians biaya (*standard costing*).
