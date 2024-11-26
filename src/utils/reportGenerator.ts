import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Store, Sale, Seller } from '../types';

interface ReportOptions {
  type: 'store' | 'sales' | 'inventory' | 'sellers';
  dateRange?: {
    start: Date;
    end: Date;
  };
  storeId?: number;
  sellerId?: number;
}

export const generateReport = (
  data: {
    stores?: Store[];
    sales?: Sale[];
    sellers?: Seller[];
  },
  options: ReportOptions
) => {
  const doc = new jsPDF();
  const now = new Date();
  
  // Add header
  doc.setFontSize(20);
  doc.text('PhoneStore Manager Report', 14, 22);
  
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 14, 30);

  if (options.dateRange) {
    doc.text(
      `Period: ${options.dateRange.start.toLocaleDateString()} - ${options.dateRange.end.toLocaleDateString()}`,
      14,
      38
    );
  }

  switch (options.type) {
    case 'store':
      generateStoreReport(doc, data.stores!, options);
      break;
    case 'sales':
      generateSalesReport(doc, data.sales!, options);
      break;
    case 'sellers':
      generateSellersReport(doc, data.sellers!, options);
      break;
    case 'inventory':
      generateInventoryReport(doc, data.stores!, options);
      break;
  }

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  return doc;
};

const generateStoreReport = (doc: jsPDF, stores: Store[], options: ReportOptions) => {
  const tableData = stores.map(store => [
    store.name,
    store.location,
    store.status,
    store.phoneModels,
    store.inventory,
    `$${store.monthlySales}k`
  ]);

  autoTable(doc, {
    startY: 45,
    head: [['Store Name', 'Location', 'Status', 'Models', 'Inventory', 'Monthly Sales']],
    body: tableData,
    headStyles: { fillColor: [79, 70, 229] },
  });
};

const generateSalesReport = (doc: jsPDF, sales: Sale[], options: ReportOptions) => {
  const tableData = sales.map(sale => [
    new Date(sale.date).toLocaleDateString(),
    sale.type,
    sale.phoneModel,
    `$${sale.price}`,
    sale.tradeInDetails ? `$${sale.tradeInDetails.value}` : '-',
    `$${sale.price - (sale.tradeInDetails?.value || 0)}`
  ]);

  const totalSales = sales.reduce((sum, sale) => sum + sale.price, 0);
  const totalTradeIns = sales.reduce((sum, sale) => sum + (sale.tradeInDetails?.value || 0), 0);
  const netRevenue = totalSales - totalTradeIns;

  autoTable(doc, {
    startY: 45,
    head: [['Date', 'Type', 'Model', 'Price', 'Trade-in Value', 'Net Amount']],
    body: tableData,
    headStyles: { fillColor: [79, 70, 229] },
    foot: [['Total', '', '', `$${totalSales}`, `$${totalTradeIns}`, `$${netRevenue}`]],
    footStyles: { fillColor: [243, 244, 246], textColor: [0, 0, 0], fontStyle: 'bold' },
  });
};

const generateSellersReport = (doc: jsPDF, sellers: Seller[], options: ReportOptions) => {
  const tableData = sellers.map(seller => [
    seller.name,
    seller.email,
    seller.role,
    seller.salesCount,
    `${seller.performance}%`,
    seller.status
  ]);

  autoTable(doc, {
    startY: 45,
    head: [['Name', 'Email', 'Role', 'Sales', 'Performance', 'Status']],
    body: tableData,
    headStyles: { fillColor: [79, 70, 229] },
  });
};

const generateInventoryReport = (doc: jsPDF, stores: Store[], options: ReportOptions) => {
  let store: Store | undefined;
  if (options.storeId) {
    store = stores.find(s => s.id === options.storeId);
  }

  const tableData = [
    ['Total Stores', stores.length],
    ['Total Inventory', stores.reduce((sum, store) => sum + store.inventory, 0)],
    ['Total Phone Models', stores.reduce((sum, store) => sum + store.phoneModels, 0)],
    ['Active Stores', stores.filter(store => store.status === 'active').length],
    ['Average Inventory per Store', Math.round(stores.reduce((sum, store) => sum + store.inventory, 0) / stores.length)]
  ];

  if (store) {
    tableData.push(
      ['Store Name', store.name],
      ['Store Location', store.location],
      ['Store Status', store.status],
      ['Store Inventory', store.inventory],
      ['Store Phone Models', store.phoneModels]
    );
  }

  autoTable(doc, {
    startY: 45,
    body: tableData,
    theme: 'plain',
    styles: { cellPadding: 5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 80 },
      1: { cellWidth: 100 }
    }
  });
};

export const downloadReport = (doc: jsPDF, filename: string) => {
  doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
};