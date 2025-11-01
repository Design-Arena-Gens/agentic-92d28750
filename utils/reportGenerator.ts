import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

export const generateInventoryReport = async (products: any[]) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text("INVENTORY REPORT", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy HH:mm")}`, 105, 28, { align: "center" });

  // Summary
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Summary", 14, 40);
  doc.setFontSize(10);
  doc.text(`Total Products: ${products.length}`, 14, 48);
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  doc.text(`Total Inventory Value: $${totalValue.toFixed(2)}`, 14, 55);
  const lowStock = products.filter(p => p.quantity <= p.reorderLevel).length;
  doc.text(`Low Stock Items: ${lowStock}`, 14, 62);

  // Table
  autoTable(doc, {
    startY: 70,
    head: [["SKU", "Product Name", "Category", "Quantity", "Price", "Total Value", "Status"]],
    body: products.map(p => [
      p.sku,
      p.name,
      p.category,
      p.quantity.toString(),
      `$${p.price.toFixed(2)}`,
      `$${(p.quantity * p.price).toFixed(2)}`,
      p.quantity <= p.reorderLevel ? "Low Stock" : "In Stock"
    ]),
    headStyles: { fillColor: [37, 99, 235] },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });

  doc.save(`inventory-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

export const generateSalesReport = async (orders: any[]) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text("SALES REPORT", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy HH:mm")}`, 105, 28, { align: "center" });

  // Summary
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Summary", 14, 40);
  doc.setFontSize(10);
  doc.text(`Total Orders: ${orders.length}`, 14, 48);
  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  doc.text(`Total Sales Value: $${totalSales.toFixed(2)}`, 14, 55);
  const pending = orders.filter(o => o.status === "pending").length;
  doc.text(`Pending Orders: ${pending}`, 14, 62);
  const completed = orders.filter(o => o.status === "completed").length;
  doc.text(`Completed Orders: ${completed}`, 14, 69);

  // Table
  autoTable(doc, {
    startY: 77,
    head: [["Order #", "Vendor", "Date", "Items", "Amount", "Status"]],
    body: orders.map(o => [
      o.orderNumber,
      o.vendorName,
      format(new Date(o.date), "MMM dd, yyyy"),
      o.items.length.toString(),
      `$${o.totalAmount.toFixed(2)}`,
      o.status.charAt(0).toUpperCase() + o.status.slice(1)
    ]),
    headStyles: { fillColor: [37, 99, 235] },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });

  doc.save(`sales-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

export const generateVendorReport = async (vendors: any[]) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text("VENDOR REPORT", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy HH:mm")}`, 105, 28, { align: "center" });

  // Summary
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Summary", 14, 40);
  doc.setFontSize(10);
  doc.text(`Total Vendors: ${vendors.length}`, 14, 48);

  // Table
  autoTable(doc, {
    startY: 57,
    head: [["Vendor Name", "Category", "Email", "Phone", "Payment Terms"]],
    body: vendors.map(v => [
      v.name,
      v.category,
      v.email,
      v.phone,
      v.paymentTerms
    ]),
    headStyles: { fillColor: [37, 99, 235] },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });

  doc.save(`vendor-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

export const generateLowStockReport = async (products: any[]) => {
  const lowStockProducts = products.filter(p => p.quantity <= p.reorderLevel);
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(220, 38, 38);
  doc.text("LOW STOCK ALERT REPORT", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy HH:mm")}`, 105, 28, { align: "center" });

  // Summary
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Summary", 14, 40);
  doc.setFontSize(10);
  doc.text(`Items Requiring Reorder: ${lowStockProducts.length}`, 14, 48);

  if (lowStockProducts.length === 0) {
    doc.setFontSize(12);
    doc.text("No items require reordering at this time.", 14, 60);
  } else {
    // Table
    autoTable(doc, {
      startY: 57,
      head: [["SKU", "Product Name", "Category", "Current Stock", "Reorder Level", "Recommended Order"]],
      body: lowStockProducts.map(p => [
        p.sku,
        p.name,
        p.category,
        p.quantity.toString(),
        p.reorderLevel.toString(),
        (p.reorderLevel * 2 - p.quantity).toString()
      ]),
      headStyles: { fillColor: [220, 38, 38] },
      alternateRowStyles: { fillColor: [254, 242, 242] },
    });
  }

  doc.save(`low-stock-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};
