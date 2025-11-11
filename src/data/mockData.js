// Mock Data for Saakar Furniture Application

// Customers
export const customers = [
  { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh.kumar@email.com', address: '123, MG Road, Bangalore', gstin: '29ABCDE1234F1Z5', type: 'Retail' },
  { id: 2, name: 'Priya Sharma', phone: '+91 98765 43211', email: 'priya.sharma@email.com', address: '456, Brigade Road, Bangalore', gstin: '29FGHIJ5678K2L6', type: 'Retail' },
  { id: 3, name: 'Arjun Patel', phone: '+91 98765 43212', email: 'arjun.patel@email.com', address: '789, Koramangala, Bangalore', gstin: '', type: 'Retail' },
  { id: 4, name: 'Lakshmi Iyer', phone: '+91 98765 43213', email: 'lakshmi.iyer@email.com', address: '321, Indiranagar, Bangalore', gstin: '29MNOPQ9012R3S7', type: 'Retail' },
  { id: 5, name: 'Vikram Reddy', phone: '+91 98765 43214', email: 'vikram.reddy@email.com', address: '654, Whitefield, Bangalore', gstin: '29TUVWX3456Y4Z8', type: 'Corporate' },
  { id: 6, name: 'Ananya Das', phone: '+91 98765 43215', email: 'ananya.das@email.com', address: '987, JP Nagar, Bangalore', gstin: '', type: 'Retail' },
  { id: 7, name: 'Rohan Mehta', phone: '+91 98765 43216', email: 'rohan.mehta@email.com', address: '147, HSR Layout, Bangalore', gstin: '29ABCXY7890Z5A9', type: 'Retail' },
  { id: 8, name: 'Sneha Gupta', phone: '+91 98765 43217', email: 'sneha.gupta@email.com', address: '258, Malleshwaram, Bangalore', gstin: '', type: 'Retail' },
];

// Products
export const products = [
  { id: 1, sku: 'SF-SOF-001', name: 'Premium Leather Sofa 3-Seater', category: 'Sofa', price: 85000, stock: 5, status: 'Ready', location: 'Showroom A' },
  { id: 2, sku: 'SF-BED-001', name: 'King Size Teak Wood Bed', category: 'Bed', price: 65000, stock: 3, status: 'Ready', location: 'Showroom B' },
  { id: 3, sku: 'SF-DIN-001', name: '6-Seater Dining Table Set', category: 'Dining', price: 95000, stock: 2, status: 'On Display', location: 'Showroom A' },
  { id: 4, sku: 'SF-WAR-001', name: '4-Door Sliding Wardrobe', category: 'Wardrobe', price: 75000, stock: 4, status: 'Ready', location: 'Warehouse' },
  { id: 5, sku: 'SF-CHR-001', name: 'Executive Office Chair', category: 'Chair', price: 25000, stock: 8, status: 'Ready', location: 'Showroom B' },
  { id: 6, sku: 'SF-TAB-001', name: 'Coffee Table - Marble Top', category: 'Table', price: 18000, stock: 6, status: 'Ready', location: 'Showroom A' },
  { id: 7, sku: 'SF-SOF-002', name: 'L-Shape Sectional Sofa', category: 'Sofa', price: 120000, stock: 2, status: 'Reserved', location: 'Showroom A' },
  { id: 8, sku: 'SF-BED-002', name: 'Queen Size Storage Bed', category: 'Bed', price: 55000, stock: 5, status: 'Ready', location: 'Warehouse' },
  { id: 9, sku: 'SF-DIN-002', name: '4-Seater Dining Table', category: 'Dining', price: 45000, stock: 4, status: 'Ready', location: 'Showroom B' },
  { id: 10, sku: 'SF-REC-001', name: 'Recliner Chair - Brown Leather', category: 'Chair', price: 42000, stock: 3, status: 'On Display', location: 'Showroom A' },
];

// Inquiries
export const inquiries = [
  { id: 1, customerId: 1, customerName: 'Rajesh Kumar', date: '2025-11-01', items: 'Sofa, Coffee Table', status: 'Quoted', remarks: 'Interested in premium leather sofa', assignedTo: 'Ramesh' },
  { id: 2, customerId: 3, customerName: 'Arjun Patel', date: '2025-11-03', items: 'Dining Table Set', status: 'New', remarks: 'Looking for 6-seater dining set', assignedTo: 'Suresh' },
  { id: 3, customerId: 6, customerName: 'Ananya Das', date: '2025-11-05', items: 'Wardrobe', status: 'Quoted', remarks: 'Need customization', assignedTo: 'Ramesh' },
  { id: 4, customerId: 8, customerName: 'Sneha Gupta', date: '2025-11-07', items: 'Bed, Wardrobe', status: 'Follow-up', remarks: 'Budget discussion needed', assignedTo: 'Suresh' },
  { id: 5, customerId: 2, customerName: 'Priya Sharma', date: '2025-11-08', items: 'Office Chair', status: 'New', remarks: 'Corporate order inquiry', assignedTo: 'Ramesh' },
];

// Quotations
export const quotations = [
  { id: 1, quotationNo: 'QT-2025-001', customerId: 1, customerName: 'Rajesh Kumar', date: '2025-11-02', validUntil: '2025-11-16', items: [{ productId: 1, productName: 'Premium Leather Sofa 3-Seater', quantity: 1, price: 85000 }, { productId: 6, productName: 'Coffee Table - Marble Top', quantity: 1, price: 18000 }], subtotal: 103000, discount: 3000, tax: 18000, total: 118000, status: 'Sent' },
  { id: 2, quotationNo: 'QT-2025-002', customerId: 3, customerName: 'Arjun Patel', date: '2025-11-04', validUntil: '2025-11-18', items: [{ productId: 3, productName: '6-Seater Dining Table Set', quantity: 1, price: 95000 }], subtotal: 95000, discount: 5000, tax: 16200, total: 106200, status: 'Accepted' },
  { id: 3, quotationNo: 'QT-2025-003', customerId: 6, customerName: 'Ananya Das', date: '2025-11-06', validUntil: '2025-11-20', items: [{ productId: 4, productName: '4-Door Sliding Wardrobe', quantity: 1, price: 75000 }], subtotal: 75000, discount: 2000, tax: 13140, total: 86140, status: 'Draft' },
  { id: 4, quotationNo: 'QT-2025-004', customerId: 4, customerName: 'Lakshmi Iyer', date: '2025-11-09', validUntil: '2025-11-23', items: [{ productId: 10, productName: 'Recliner Chair - Brown Leather', quantity: 2, price: 42000 }], subtotal: 84000, discount: 4000, tax: 14400, total: 94400, status: 'Sent' },
];

// Sales Orders
export const salesOrders = [
  { id: 1, orderNo: 'SO-2025-001', customerId: 1, customerName: 'Rajesh Kumar', quotationId: 1, orderDate: '2025-11-03', items: [{ productId: 1, productName: 'Premium Leather Sofa 3-Seater', quantity: 1, price: 85000 }, { productId: 6, productName: 'Coffee Table - Marble Top', quantity: 1, price: 18000 }], subtotal: 103000, discount: 3000, tax: 18000, total: 118000, advancePaid: 50000, status: 'Confirmed', deliveryDate: '2025-11-15', remarks: 'Delivery to MG Road address' },
  { id: 2, orderNo: 'SO-2025-002', customerId: 3, customerName: 'Arjun Patel', quotationId: 2, orderDate: '2025-11-05', items: [{ productId: 3, productName: '6-Seater Dining Table Set', quantity: 1, price: 95000 }], subtotal: 95000, discount: 5000, tax: 16200, total: 106200, advancePaid: 60000, status: 'Approved', deliveryDate: '2025-11-18', remarks: '' },
  { id: 3, orderNo: 'SO-2025-003', customerId: 5, customerName: 'Vikram Reddy', quotationId: null, orderDate: '2025-11-08', items: [{ productId: 7, productName: 'L-Shape Sectional Sofa', quantity: 1, price: 120000 }], subtotal: 120000, discount: 10000, tax: 19800, total: 129800, advancePaid: 65000, status: 'Pending Approval', deliveryDate: '2025-11-22', remarks: 'High-value order - need approval' },
  { id: 4, orderNo: 'SO-2025-004', customerId: 7, customerName: 'Rohan Mehta', quotationId: null, orderDate: '2025-11-09', items: [{ productId: 8, productName: 'Queen Size Storage Bed', quantity: 1, price: 55000 }, { productId: 4, productName: '4-Door Sliding Wardrobe', quantity: 1, price: 75000 }], subtotal: 130000, discount: 5000, tax: 22500, total: 147500, advancePaid: 75000, status: 'Confirmed', deliveryDate: '2025-11-20', remarks: '' },
];

// Invoices
export const invoices = [
  { id: 1, invoiceNo: 'INV-2025-001', salesOrderId: 1, orderNo: 'SO-2025-001', customerId: 1, customerName: 'Rajesh Kumar', invoiceDate: '2025-11-10', items: [{ productId: 1, productName: 'Premium Leather Sofa 3-Seater', quantity: 1, price: 85000 }, { productId: 6, productName: 'Coffee Table - Marble Top', quantity: 1, price: 18000 }], subtotal: 103000, discount: 3000, gst: 18000, tcs: 0, total: 118000, status: 'Paid', dueDate: '2025-11-17' },
  { id: 2, invoiceNo: 'INV-2025-002', salesOrderId: 2, orderNo: 'SO-2025-002', customerId: 3, customerName: 'Arjun Patel', invoiceDate: '2025-11-11', items: [{ productId: 3, productName: '6-Seater Dining Table Set', quantity: 1, price: 95000 }], subtotal: 95000, discount: 5000, gst: 16200, tcs: 0, total: 106200, status: 'Partial', dueDate: '2025-11-18' },
  { id: 3, invoiceNo: 'INV-2025-003', salesOrderId: 4, orderNo: 'SO-2025-004', customerId: 7, customerName: 'Rohan Mehta', invoiceDate: '2025-11-11', items: [{ productId: 8, productName: 'Queen Size Storage Bed', quantity: 1, price: 55000 }, { productId: 4, productName: '4-Door Sliding Wardrobe', quantity: 1, price: 75000 }], subtotal: 130000, discount: 5000, gst: 22500, tcs: 0, total: 147500, status: 'Due', dueDate: '2025-11-25' },
];

// Payments
export const payments = [
  { id: 1, paymentNo: 'PAY-2025-001', invoiceId: 1, invoiceNo: 'INV-2025-001', customerId: 1, customerName: 'Rajesh Kumar', amount: 50000, mode: 'UPI', date: '2025-11-03', transactionRef: 'UPI2025110301', remarks: 'Advance payment' },
  { id: 2, paymentNo: 'PAY-2025-002', invoiceId: 1, invoiceNo: 'INV-2025-001', customerId: 1, customerName: 'Rajesh Kumar', amount: 68000, mode: 'Bank Transfer', date: '2025-11-10', transactionRef: 'NEFT2025111001', remarks: 'Balance payment on delivery' },
  { id: 3, paymentNo: 'PAY-2025-003', invoiceId: 2, invoiceNo: 'INV-2025-002', customerId: 3, customerName: 'Arjun Patel', amount: 60000, mode: 'Card', date: '2025-11-05', transactionRef: 'CARD2025110501', remarks: 'Advance payment' },
  { id: 4, paymentNo: 'PAY-2025-004', invoiceId: null, invoiceNo: 'SO-2025-004', customerId: 7, customerName: 'Rohan Mehta', amount: 75000, mode: 'Cheque', date: '2025-11-09', transactionRef: 'CHQ456789', remarks: 'Advance - Cheque cleared' },
];

// Delivery Notes
export const deliveryNotes = [
  { id: 1, deliveryNo: 'DN-2025-001', salesOrderId: 1, orderNo: 'SO-2025-001', customerId: 1, customerName: 'Rajesh Kumar', deliveryDate: '2025-11-15', items: [{ productId: 1, productName: 'Premium Leather Sofa 3-Seater', quantity: 1 }, { productId: 6, productName: 'Coffee Table - Marble Top', quantity: 1 }], address: '123, MG Road, Bangalore', vehicleNo: 'KA-01-AB-1234', driverName: 'Kumar', driverPhone: '+91 98765 00001', status: 'Delivered', gateOutTime: '2025-11-15T09:00:00', deliveredTime: '2025-11-15T14:30:00', receivedBy: 'Rajesh Kumar', remarks: 'Delivered successfully' },
  { id: 2, deliveryNo: 'DN-2025-002', salesOrderId: 2, orderNo: 'SO-2025-002', customerId: 3, customerName: 'Arjun Patel', deliveryDate: '2025-11-18', items: [{ productId: 3, productName: '6-Seater Dining Table Set', quantity: 1 }], address: '789, Koramangala, Bangalore', vehicleNo: 'KA-01-CD-5678', driverName: 'Ravi', driverPhone: '+91 98765 00002', status: 'In Transit', gateOutTime: '2025-11-18T08:00:00', deliveredTime: null, receivedBy: '', remarks: 'Expected delivery by evening' },
  { id: 3, deliveryNo: 'DN-2025-003', salesOrderId: 4, orderNo: 'SO-2025-004', customerId: 7, customerName: 'Rohan Mehta', deliveryDate: '2025-11-20', items: [{ productId: 8, productName: 'Queen Size Storage Bed', quantity: 1 }, { productId: 4, productName: '4-Door Sliding Wardrobe', quantity: 1 }], address: '147, HSR Layout, Bangalore', vehicleNo: 'KA-01-EF-9012', driverName: 'Prakash', driverPhone: '+91 98765 00003', status: 'Scheduled', gateOutTime: null, deliveredTime: null, receivedBy: '', remarks: 'Delivery scheduled for morning' },
];

// Customer Ledger (Aggregated view)
export const customerLedger = [
  { customerId: 1, customerName: 'Rajesh Kumar', totalOrders: 118000, totalPaid: 118000, balance: 0, lastPayment: '2025-11-10' },
  { customerId: 3, customerName: 'Arjun Patel', totalOrders: 106200, totalPaid: 60000, balance: 46200, lastPayment: '2025-11-05' },
  { customerId: 7, customerName: 'Rohan Mehta', totalOrders: 147500, totalPaid: 75000, balance: 72500, lastPayment: '2025-11-09' },
  { customerId: 5, customerName: 'Vikram Reddy', totalOrders: 129800, totalPaid: 65000, balance: 64800, lastPayment: '2025-11-08' },
  { customerId: 2, customerName: 'Priya Sharma', totalOrders: 0, totalPaid: 0, balance: 0, lastPayment: '-' },
  { customerId: 4, customerName: 'Lakshmi Iyer', totalOrders: 0, totalPaid: 0, balance: 0, lastPayment: '-' },
];

// Dashboard Stats
export const dashboardStats = {
  totalSales: 501500,
  totalOrders: 4,
  pendingDeliveries: 2,
  outstandingAmount: 183500,
  todayInquiries: 2,
  monthlyRevenue: 501500,
  topSellingCategory: 'Sofa',
  averageOrderValue: 125375,
};
