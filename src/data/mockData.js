// Mock Data for E2W Furniture Application

// Customers
export const customers = [
  { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh.kumar@email.com', address: '123, MG Road, Bangalore', gstin: '29ABCDE1234F1Z5', type: 'Retail', birthday: '1985-03-15' },
  { id: 2, name: 'Priya Sharma', phone: '+91 98765 43211', email: 'priya.sharma@email.com', address: '456, Brigade Road, Bangalore', gstin: '29FGHIJ5678K2L6', type: 'Retail', birthday: '1990-07-22' },
  { id: 3, name: 'Arjun Patel', phone: '+91 98765 43212', email: 'arjun.patel@email.com', address: '789, Koramangala, Bangalore', gstin: '', type: 'Retail', birthday: '1988-11-30' },
  { id: 4, name: 'Lakshmi Iyer', phone: '+91 98765 43213', email: 'lakshmi.iyer@email.com', address: '321, Indiranagar, Bangalore', gstin: '29MNOPQ9012R3S7', type: 'Retail', birthday: '1992-05-10' },
  { id: 5, name: 'Vikram Reddy', phone: '+91 98765 43214', email: 'vikram.reddy@email.com', address: '654, Whitefield, Bangalore', gstin: '29TUVWX3456Y4Z8', type: 'Corporate', birthday: '1987-09-18' },
  { id: 6, name: 'Ananya Das', phone: '+91 98765 43215', email: 'ananya.das@email.com', address: '987, JP Nagar, Bangalore', gstin: '', type: 'Retail', birthday: '1995-01-25' },
  { id: 7, name: 'Rohan Mehta', phone: '+91 98765 43216', email: 'rohan.mehta@email.com', address: '147, HSR Layout, Bangalore', gstin: '29ABCXY7890Z5A9', type: 'Retail', birthday: '1989-12-08' },
  { id: 8, name: 'Sneha Gupta', phone: '+91 98765 43217', email: 'sneha.gupta@email.com', address: '258, Malleshwaram, Bangalore', gstin: '', type: 'Retail', birthday: '1993-04-14' },
];

// Products
export const products = [
  { 
    id: 1, sku: 'SF-SOF-001', name: 'Premium Leather Sofa 3-Seater', category: 'Sofa', price: 85000, stock: 5, status: 'Ready', location: 'Showroom A', image: 'https://via.placeholder.com/300x200?text=Leather+Sofa',
    bom: [
      { materialCode: 'RM-WOOD-001', materialName: 'Teak Wood Plank', quantity: 35, unit: 'Sq Ft', unitCost: 350 },
      { materialCode: 'RM-FAB-001', materialName: 'Premium Leather (Brown)', quantity: 45, unit: 'Sq Ft', unitCost: 450 },
      { materialCode: 'RM-FOAM-001', materialName: 'High Density Foam 4 inch', quantity: 3, unit: 'Piece', unitCost: 850 },
      { materialCode: 'RM-HW-003', materialName: 'Screws - Assorted Pack', quantity: 1, unit: 'Box', unitCost: 120 },
      { materialCode: 'RM-PNT-001', materialName: 'Wood Varnish - Teak', quantity: 2, unit: 'Liter', unitCost: 650 },
    ]
  },
  { 
    id: 2, sku: 'SF-BED-001', name: 'King Size Teak Wood Bed', category: 'Bed', price: 65000, stock: 3, status: 'Ready', location: 'Showroom B', image: 'https://via.placeholder.com/300x200?text=Teak+Bed',
    bom: [
      { materialCode: 'RM-WOOD-001', materialName: 'Teak Wood Plank', quantity: 65, unit: 'Sq Ft', unitCost: 350 },
      { materialCode: 'RM-HW-001', materialName: 'Hinges - Heavy Duty', quantity: 4, unit: 'Piece', unitCost: 45 },
      { materialCode: 'RM-HW-003', materialName: 'Screws - Assorted Pack', quantity: 2, unit: 'Box', unitCost: 120 },
      { materialCode: 'RM-PNT-002', materialName: 'Wood Stain - Walnut', quantity: 3, unit: 'Liter', unitCost: 550 },
    ]
  },
  { 
    id: 3, sku: 'SF-DIN-001', name: '6-Seater Dining Table Set', category: 'Dining', price: 95000, stock: 2, status: 'On Display', location: 'Showroom A', image: 'https://via.placeholder.com/300x200?text=Dining+Table',
    bom: [
      { materialCode: 'RM-WOOD-002', materialName: 'Sheesham Wood Plank', quantity: 85, unit: 'Sq Ft', unitCost: 280 },
      { materialCode: 'RM-HW-003', materialName: 'Screws - Assorted Pack', quantity: 3, unit: 'Box', unitCost: 120 },
      { materialCode: 'RM-PNT-001', materialName: 'Wood Varnish - Teak', quantity: 4, unit: 'Liter', unitCost: 650 },
      { materialCode: 'RM-ACC-002', materialName: 'Furniture Legs - Metal', quantity: 24, unit: 'Piece', unitCost: 220 },
    ]
  },
  { 
    id: 4, sku: 'SF-WAR-001', name: '4-Door Sliding Wardrobe', category: 'Wardrobe', price: 75000, stock: 4, status: 'Ready', location: 'Warehouse', image: 'https://via.placeholder.com/300x200?text=Wardrobe',
    bom: [
      { materialCode: 'RM-WOOD-001', materialName: 'Teak Wood Plank', quantity: 120, unit: 'Sq Ft', unitCost: 350 },
      { materialCode: 'RM-HW-002', materialName: 'Sliding Rails 6ft', quantity: 2, unit: 'Piece', unitCost: 850 },
      { materialCode: 'RM-HW-003', materialName: 'Screws - Assorted Pack', quantity: 3, unit: 'Box', unitCost: 120 },
      { materialCode: 'RM-ACC-001', materialName: 'Decorative Handles - Gold', quantity: 8, unit: 'Piece', unitCost: 85 },
      { materialCode: 'RM-PNT-002', materialName: 'Wood Stain - Walnut', quantity: 5, unit: 'Liter', unitCost: 550 },
    ]
  },
  { 
    id: 5, sku: 'SF-CHR-001', name: 'Executive Office Chair', category: 'Chair', price: 25000, stock: 8, status: 'Ready', location: 'Showroom B', image: 'https://via.placeholder.com/300x200?text=Office+Chair',
    bom: [
      { materialCode: 'RM-WOOD-002', materialName: 'Sheesham Wood Plank', quantity: 12, unit: 'Sq Ft', unitCost: 280 },
      { materialCode: 'RM-FAB-001', materialName: 'Premium Leather (Brown)', quantity: 8, unit: 'Sq Ft', unitCost: 450 },
      { materialCode: 'RM-FOAM-001', materialName: 'High Density Foam 4 inch', quantity: 1, unit: 'Piece', unitCost: 850 },
      { materialCode: 'RM-HW-003', materialName: 'Screws - Assorted Pack', quantity: 1, unit: 'Box', unitCost: 120 },
    ]
  },
  { id: 6, sku: 'SF-TAB-001', name: 'Coffee Table - Marble Top', category: 'Table', price: 18000, stock: 6, status: 'Ready', location: 'Showroom A', image: 'https://via.placeholder.com/300x200?text=Coffee+Table' },
  { id: 7, sku: 'SF-SOF-002', name: 'L-Shape Sectional Sofa', category: 'Sofa', price: 120000, stock: 2, status: 'Reserved', location: 'Showroom A', image: 'https://via.placeholder.com/300x200?text=L-Shape+Sofa' },
  { id: 8, sku: 'SF-BED-002', name: 'Queen Size Storage Bed', category: 'Bed', price: 55000, stock: 5, status: 'Ready', location: 'Warehouse', image: 'https://via.placeholder.com/300x200?text=Storage+Bed' },
  { id: 9, sku: 'SF-DIN-002', name: '4-Seater Dining Table', category: 'Dining', price: 45000, stock: 4, status: 'Ready', location: 'Showroom B', image: 'https://via.placeholder.com/300x200?text=4-Seater+Dining' },
  { id: 10, sku: 'SF-REC-001', name: 'Recliner Chair - Brown Leather', category: 'Chair', price: 42000, stock: 3, status: 'On Display', location: 'Showroom A', image: 'https://via.placeholder.com/300x200?text=Recliner' },
];

// Inquiries
export const inquiries = [
  { id: 1, customerId: 1, customerName: 'Rajesh Kumar', inquiryDate: '2025-11-01', items: 'Sofa, Coffee Table', status: 'Quoted', remarks: 'Interested in premium leather sofa', assignedTo: 'Ramesh' },
  { id: 2, customerId: 3, customerName: 'Arjun Patel', inquiryDate: '2025-11-03', items: 'Dining Table Set', status: 'New', remarks: 'Looking for 6-seater dining set', assignedTo: 'Suresh' },
  { id: 3, customerId: 6, customerName: 'Ananya Das', inquiryDate: '2025-11-05', items: 'Wardrobe', status: 'Quoted', remarks: 'Need customization', assignedTo: 'Ramesh' },
  { id: 4, customerId: 8, customerName: 'Sneha Gupta', inquiryDate: '2025-11-07', items: 'Bed, Wardrobe', status: 'Follow-up', remarks: 'Budget discussion needed', assignedTo: 'Suresh' },
  { id: 5, customerId: 2, customerName: 'Priya Sharma', inquiryDate: '2025-11-08', items: 'Office Chair', status: 'New', remarks: 'Corporate order inquiry', assignedTo: 'Ramesh' },
];

// Quotations
export const quotations = [
  { id: 1, quotationNo: 'QT-2025-001', revision: 0, customerId: 1, customerName: 'Rajesh Kumar', quotationDate: '2025-11-02', validUntil: '2025-11-16', items: [{ productId: 1, productName: 'Premium Leather Sofa 3-Seater', quantity: 1, price: 85000 }, { productId: 6, productName: 'Coffee Table - Marble Top', quantity: 1, price: 18000 }], subtotal: 103000, discount: 3000, tax: 18000, total: 118000, status: 'Sent', revisionHistory: [] },
  { id: 2, quotationNo: 'QT-2025-002', revision: 1, customerId: 3, customerName: 'Arjun Patel', quotationDate: '2025-11-04', validUntil: '2025-11-18', items: [{ productId: 3, productName: '6-Seater Dining Table Set', quantity: 1, price: 95000 }], subtotal: 95000, discount: 5000, tax: 16200, total: 106200, status: 'Accepted', revisionHistory: [{ revisionNo: 0, quotationDate: '2025-11-04', total: 111200, remarks: 'Initial quote' }] },
  { id: 3, quotationNo: 'QT-2025-003', revision: 0, customerId: 6, customerName: 'Ananya Das', quotationDate: '2025-11-06', validUntil: '2025-11-20', items: [{ productId: 4, productName: '4-Door Sliding Wardrobe', quantity: 1, price: 75000 }], subtotal: 75000, discount: 2000, tax: 13140, total: 86140, status: 'Draft', revisionHistory: [] },
  { id: 4, quotationNo: 'QT-2025-004', revision: 2, customerId: 4, customerName: 'Lakshmi Iyer', quotationDate: '2025-11-09', validUntil: '2025-11-23', items: [{ productId: 10, productName: 'Recliner Chair - Brown Leather', quantity: 2, price: 42000 }], subtotal: 84000, discount: 4000, tax: 14400, total: 94400, status: 'Sent', revisionHistory: [{ revisionNo: 0, quotationDate: '2025-11-09', total: 98400, remarks: 'Initial quote' }, { revisionNo: 1, quotationDate: '2025-11-10', total: 96400, remarks: 'Discount increased' }] },
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
  { id: 1, paymentNo: 'PAY-2025-001', invoiceId: 1, invoiceNo: 'INV-2025-001', customerId: 1, customerName: 'Rajesh Kumar', amount: 50000, mode: 'UPI', paymentDate: '2025-11-03', transactionRef: 'UPI2025110301', remarks: 'Advance payment' },
  { id: 2, paymentNo: 'PAY-2025-002', invoiceId: 1, invoiceNo: 'INV-2025-001', customerId: 1, customerName: 'Rajesh Kumar', amount: 68000, mode: 'Bank Transfer', paymentDate: '2025-11-10', transactionRef: 'NEFT2025111001', remarks: 'Balance payment on delivery' },
  { id: 3, paymentNo: 'PAY-2025-003', invoiceId: 2, invoiceNo: 'INV-2025-002', customerId: 3, customerName: 'Arjun Patel', amount: 60000, mode: 'Card', paymentDate: '2025-11-05', transactionRef: 'CARD2025110501', remarks: 'Advance payment' },
  { id: 4, paymentNo: 'PAY-2025-004', invoiceId: null, invoiceNo: 'SO-2025-004', customerId: 7, customerName: 'Rohan Mehta', amount: 75000, mode: 'Cheque', paymentDate: '2025-11-09', transactionRef: 'CHQ456789', remarks: 'Advance - Cheque cleared' },
  { id: 5, paymentNo: 'PAY-2025-005', invoiceId: 2, invoiceNo: 'INV-2025-002', customerId: 3, customerName: 'Arjun Patel', amount: 25000, mode: 'Cash', paymentDate: '2025-11-11', transactionRef: '', remarks: 'Partial cash payment' },
];

// Customer Delivery (Showroom to Customer)
export const customerDeliveries = [
  { id: 1, deliveryNo: 'CD-2025-001', salesOrderId: 1, orderNo: 'SO-2025-001', customerId: 1, customerName: 'Rajesh Kumar', deliveryDate: '2025-11-15', items: [{ productId: 1, productName: 'Premium Leather Sofa 3-Seater', quantity: 1 }, { productId: 6, productName: 'Coffee Table - Marble Top', quantity: 1 }], fromLocation: 'Showroom A - MG Road', toAddress: '123, MG Road, Bangalore', vehicleNo: 'KA-01-AB-1234', driverName: 'Kumar', driverPhone: '+91 98765 00001', status: 'Delivered', departureTime: '2025-11-15T09:00:00', deliveredTime: '2025-11-15T14:30:00', receivedBy: 'Rajesh Kumar', remarks: 'Delivered successfully' },
  { id: 2, deliveryNo: 'CD-2025-002', salesOrderId: 2, orderNo: 'SO-2025-002', customerId: 3, customerName: 'Arjun Patel', deliveryDate: '2025-11-18', items: [{ productId: 3, productName: '6-Seater Dining Table Set', quantity: 1 }], fromLocation: 'Showroom A - MG Road', toAddress: '789, Koramangala, Bangalore', vehicleNo: 'KA-01-CD-5678', driverName: 'Ravi', driverPhone: '+91 98765 00002', status: 'In Transit', departureTime: '2025-11-18T08:00:00', deliveredTime: null, receivedBy: '', remarks: 'Expected delivery by evening' },
  { id: 3, deliveryNo: 'CD-2025-003', salesOrderId: 4, orderNo: 'SO-2025-004', customerId: 7, customerName: 'Rohan Mehta', deliveryDate: '2025-11-20', items: [{ productId: 8, productName: 'Queen Size Storage Bed', quantity: 1 }, { productId: 4, productName: '4-Door Sliding Wardrobe', quantity: 1 }], fromLocation: 'Showroom B - Indiranagar', toAddress: '147, HSR Layout, Bangalore', vehicleNo: 'KA-01-EF-9012', driverName: 'Prakash', driverPhone: '+91 98765 00003', status: 'Scheduled', departureTime: null, deliveredTime: null, receivedBy: '', remarks: 'Delivery scheduled for morning' },
];

// Showroom Delivery (Factory to Showroom)
export const showroomDeliveries = [
  { id: 1, deliveryNo: 'SD-2025-001', productionOrderNo: 'PRD-2025-001', deliveryDate: '2025-11-10', items: [{ productId: 1, productName: 'Premium Leather Sofa 3-Seater', quantity: 2 }, { productId: 6, productName: 'Coffee Table - Marble Top', quantity: 3 }], fromLocation: 'Factory - Bommasandra', toLocation: 'Showroom A - MG Road', vehicleNo: 'KA-01-XY-4567', driverName: 'Suresh', driverPhone: '+91 98765 00010', status: 'Delivered', departureTime: '2025-11-10T06:00:00', arrivedTime: '2025-11-10T09:30:00', receivedBy: 'Showroom Manager - Ramesh', remarks: 'Stock replenishment completed' },
  { id: 2, deliveryNo: 'SD-2025-002', productionOrderNo: 'PRD-2025-002', deliveryDate: '2025-11-12', items: [{ productId: 3, productName: '6-Seater Dining Table Set', quantity: 1 }, { productId: 9, productName: '4-Seater Dining Table', quantity: 2 }], fromLocation: 'Factory - Bommasandra', toLocation: 'Showroom B - Indiranagar', vehicleNo: 'KA-01-YZ-7890', driverName: 'Mahesh', driverPhone: '+91 98765 00011', status: 'In Transit', departureTime: '2025-11-12T07:00:00', arrivedTime: null, receivedBy: '', remarks: 'Expected arrival by 10:00 AM' },
  { id: 3, deliveryNo: 'SD-2025-003', productionOrderNo: 'PRD-2025-003', deliveryDate: '2025-11-14', items: [{ productId: 4, productName: '4-Door Sliding Wardrobe', quantity: 2 }], fromLocation: 'Factory - Bommasandra', toLocation: 'Showroom A - MG Road', vehicleNo: 'KA-01-AB-1234', driverName: 'Kumar', driverPhone: '+91 98765 00001', status: 'Scheduled', departureTime: null, arrivedTime: null, receivedBy: '', remarks: 'Scheduled for early morning delivery' },
];

// Legacy delivery notes (for backward compatibility)
export const deliveryNotes = customerDeliveries;

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

// Raw Materials
export const rawMaterials = [
  { id: 1, code: 'RM-WOOD-001', name: 'Teak Wood Plank', category: 'Wood', currentStock: 450, minStock: 200, unit: 'Sq Ft', unitPrice: 350, supplier: 'Karnataka Wood Suppliers', location: 'Warehouse A - Rack 1', lastPurchaseDate: '2025-11-05' },
  { id: 2, code: 'RM-WOOD-002', name: 'Sheesham Wood Plank', category: 'Wood', currentStock: 320, minStock: 150, unit: 'Sq Ft', unitPrice: 280, supplier: 'Karnataka Wood Suppliers', location: 'Warehouse A - Rack 2', lastPurchaseDate: '2025-11-01' },
  { id: 3, code: 'RM-FAB-001', name: 'Premium Leather (Brown)', category: 'Leather', currentStock: 85, minStock: 100, unit: 'Sq Ft', unitPrice: 450, supplier: 'Leather House Bangalore', location: 'Warehouse B - Section 1', lastPurchaseDate: '2025-10-28' },
  { id: 4, code: 'RM-FAB-002', name: 'Velvet Fabric (Blue)', category: 'Fabric', currentStock: 180, minStock: 80, unit: 'Meter', unitPrice: 180, supplier: 'Fabric World', location: 'Warehouse B - Section 2', lastPurchaseDate: '2025-11-08' },
  { id: 5, code: 'RM-FOAM-001', name: 'High Density Foam 4 inch', category: 'Foam', currentStock: 45, minStock: 50, unit: 'Piece', unitPrice: 850, supplier: 'Comfort Foam Industries', location: 'Warehouse B - Section 3', lastPurchaseDate: '2025-10-25' },
  { id: 6, code: 'RM-HW-001', name: 'Hinges - Heavy Duty', category: 'Hardware', currentStock: 320, minStock: 200, unit: 'Piece', unitPrice: 45, supplier: 'Modern Hardware Store', location: 'Warehouse C - Bin 12', lastPurchaseDate: '2025-11-02' },
  { id: 7, code: 'RM-HW-002', name: 'Sliding Rails 6ft', category: 'Hardware', currentStock: 65, minStock: 50, unit: 'Piece', unitPrice: 850, supplier: 'Modern Hardware Store', location: 'Warehouse C - Bin 15', lastPurchaseDate: '2025-11-07' },
  { id: 8, code: 'RM-HW-003', name: 'Screws - Assorted Pack', category: 'Hardware', currentStock: 150, minStock: 100, unit: 'Box', unitPrice: 120, supplier: 'Modern Hardware Store', location: 'Warehouse C - Bin 8', lastPurchaseDate: '2025-11-10' },
  { id: 9, code: 'RM-PNT-001', name: 'Wood Varnish - Teak', category: 'Paint & Finish', currentStock: 28, minStock: 30, unit: 'Liter', unitPrice: 650, supplier: 'Asian Paints', location: 'Warehouse C - Shelf 5', lastPurchaseDate: '2025-10-30' },
  { id: 10, code: 'RM-PNT-002', name: 'Wood Stain - Walnut', category: 'Paint & Finish', currentStock: 42, minStock: 25, unit: 'Liter', unitPrice: 550, supplier: 'Asian Paints', location: 'Warehouse C - Shelf 5', lastPurchaseDate: '2025-11-06' },
  { id: 11, code: 'RM-ACC-001', name: 'Decorative Handles - Gold', category: 'Accessories', currentStock: 180, minStock: 100, unit: 'Piece', unitPrice: 85, supplier: 'Designer Hardware', location: 'Warehouse C - Bin 20', lastPurchaseDate: '2025-11-03' },
  { id: 12, code: 'RM-ACC-002', name: 'Furniture Legs - Metal', category: 'Accessories', currentStock: 95, minStock: 80, unit: 'Piece', unitPrice: 220, supplier: 'Modern Hardware Store', location: 'Warehouse C - Bin 18', lastPurchaseDate: '2025-11-09' },
];

// Vendors
export const vendors = [
  { id: 1, name: 'Karnataka Wood Suppliers', category: 'Wood Supplier', phone: '+91 98765 55001', email: 'info@karnatakawood.com', address: '45, Industrial Area, Peenya, Bangalore', gstin: '29AABCK5678M1Z2', paymentTerms: 'Net 30', creditDays: 30, totalPurchases: 1850000, outstandingAmount: 125000, status: 'Active', lastPurchaseDate: '2025-11-05', dueDate: '2025-12-05' },
  { id: 2, name: 'Leather House Bangalore', category: 'Leather Supplier', phone: '+91 98765 55002', email: 'sales@leatherhouse.in', address: '78, KR Market, Bangalore', gstin: '29BBCDE1234F2Z3', paymentTerms: 'Net 15', creditDays: 15, totalPurchases: 980000, outstandingAmount: 45000, status: 'Active', lastPurchaseDate: '2025-10-28', dueDate: '2025-11-12' },
  { id: 3, name: 'Fabric World', category: 'Fabric Supplier', phone: '+91 98765 55003', email: 'orders@fabricworld.com', address: '123, Commercial Street, Bangalore', gstin: '29CCDDE5678G3Z4', paymentTerms: 'Net 30', creditDays: 30, totalPurchases: 650000, outstandingAmount: 0, status: 'Active', lastPurchaseDate: '2025-11-08', dueDate: null },
  { id: 4, name: 'Comfort Foam Industries', category: 'Foam Supplier', phone: '+91 98765 55004', email: 'contact@comfortfoam.in', address: '56, Bommasandra Industrial Area, Bangalore', gstin: '29DDEEF9012H4Z5', paymentTerms: 'Net 7', creditDays: 7, totalPurchases: 420000, outstandingAmount: 38000, status: 'Active', lastPurchaseDate: '2025-10-25', dueDate: '2025-11-01' },
  { id: 5, name: 'Modern Hardware Store', category: 'Hardware Supplier', phone: '+91 98765 55005', email: 'sales@modernhardware.com', address: '234, KR Puram, Bangalore', gstin: '29EEFFG3456I5Z6', paymentTerms: 'Cash', creditDays: 0, totalPurchases: 850000, outstandingAmount: 0, status: 'Active', lastPurchaseDate: '2025-11-10', dueDate: null },
  { id: 6, name: 'Asian Paints', category: 'Paint & Finish', phone: '+91 98765 55006', email: 'bangalore@asianpaints.com', address: '89, Whitefield Road, Bangalore', gstin: '29FFGGH7890J6Z7', paymentTerms: 'Net 15', creditDays: 15, totalPurchases: 280000, outstandingAmount: 0, status: 'Active', lastPurchaseDate: '2025-11-06', dueDate: null },
  { id: 7, name: 'Designer Hardware', category: 'Accessories', phone: '+91 98765 55007', email: 'info@designerhardware.in', address: '67, Indiranagar, Bangalore', gstin: '29GGHHI1234K7Z8', paymentTerms: 'Net 30', creditDays: 30, totalPurchases: 320000, outstandingAmount: 28000, status: 'Active', lastPurchaseDate: '2025-11-03', dueDate: '2025-12-03' },
  { id: 8, name: 'Quick Transport Services', category: 'Logistics', phone: '+91 98765 55008', email: 'bookings@quicktransport.com', address: '12, Transport Nagar, Bangalore', gstin: '29HHIII5678L8Z9', paymentTerms: 'Net 7', creditDays: 7, totalPurchases: 180000, outstandingAmount: 12000, status: 'Active', lastPurchaseDate: '2025-11-09', dueDate: '2025-11-16' },
];

// Purchase Orders
export const purchaseOrders = [
  { id: 1, poNo: 'PO-2025-001', vendorId: 1, vendorName: 'Karnataka Wood Suppliers', orderDate: '2025-11-01', expectedDelivery: '2025-11-15', paymentTerms: 'Net 30', items: [{ materialCode: 'RM-WOOD-001', materialName: 'Teak Wood Plank', quantity: 200, unit: 'Sq Ft', rate: 350 }, { materialCode: 'RM-WOOD-002', materialName: 'Sheesham Wood Plank', quantity: 150, unit: 'Sq Ft', rate: 280 }], subtotal: 112000, gstPercent: 18, gst: 20160, total: 132160, status: 'Completed', paymentStatus: 'Paid', remarks: 'Monthly wood stock replenishment' },
  { id: 2, poNo: 'PO-2025-002', vendorId: 2, vendorName: 'Leather House Bangalore', orderDate: '2025-10-28', expectedDelivery: '2025-11-10', paymentTerms: 'Net 15', items: [{ materialCode: 'RM-FAB-001', materialName: 'Premium Leather (Brown)', quantity: 100, unit: 'Sq Ft', rate: 450 }], subtotal: 45000, gstPercent: 18, gst: 8100, total: 53100, status: 'In Progress', paymentStatus: 'Pending', remarks: 'For premium sofa collection' },
  { id: 3, poNo: 'PO-2025-003', vendorId: 4, vendorName: 'Comfort Foam Industries', orderDate: '2025-11-05', expectedDelivery: '2025-11-18', paymentTerms: 'Net 7', items: [{ materialCode: 'RM-FOAM-001', materialName: 'High Density Foam 4 inch', quantity: 50, unit: 'Piece', rate: 850 }], subtotal: 42500, gstPercent: 18, gst: 7650, total: 50150, status: 'Approved', paymentStatus: 'Pending', remarks: 'Urgent requirement for sofa orders' },
  { id: 4, poNo: 'PO-2025-004', vendorId: 5, vendorName: 'Modern Hardware Store', orderDate: '2025-11-10', expectedDelivery: '2025-11-12', paymentTerms: 'Cash', items: [{ materialCode: 'RM-HW-001', materialName: 'Hinges - Heavy Duty', quantity: 200, unit: 'Piece', rate: 45 }, { materialCode: 'RM-HW-003', materialName: 'Screws - Assorted Pack', quantity: 50, unit: 'Box', rate: 120 }], subtotal: 15000, gstPercent: 18, gst: 2700, total: 17700, status: 'Sent', paymentStatus: 'Paid', remarks: 'Regular hardware replenishment' },
  { id: 5, poNo: 'PO-2025-005', vendorId: 3, vendorName: 'Fabric World', orderDate: '2025-11-08', expectedDelivery: '2025-11-20', paymentTerms: 'Net 30', items: [{ materialCode: 'RM-FAB-002', materialName: 'Velvet Fabric (Blue)', quantity: 100, unit: 'Meter', rate: 180 }], subtotal: 18000, gstPercent: 18, gst: 3240, total: 21240, status: 'Draft', paymentStatus: 'Not Applicable', remarks: 'For upcoming custom orders' },
];

// Expenses
export const expenses = [
  { id: 1, expenseNo: 'EXP-2025-001', expenseDate: '2025-11-01', category: 'Utilities', description: 'Electricity Bill - October', amount: 28500, paymentMode: 'Bank Transfer', status: 'Paid', transactionRef: 'NEFT2025110101', remarks: 'Paid on time' },
  { id: 2, expenseNo: 'EXP-2025-002', expenseDate: '2025-11-02', category: 'Labor', description: 'Carpenter wages for October', amount: 45000, paymentMode: 'Cash', status: 'Paid', transactionRef: '', remarks: '3 carpenters - monthly wages' },
  { id: 3, expenseNo: 'EXP-2025-003', expenseDate: '2025-11-03', category: 'Rent', description: 'Showroom Rent - November', amount: 85000, paymentMode: 'Cheque', status: 'Paid', transactionRef: 'CHQ789012', remarks: 'MG Road showroom' },
  { id: 4, expenseNo: 'EXP-2025-004', expenseDate: '2025-11-04', category: 'Transportation', description: 'Delivery vehicle fuel and maintenance', amount: 12500, paymentMode: 'UPI', status: 'Paid', transactionRef: 'UPI2025110401', remarks: 'Weekly expense' },
  { id: 5, expenseNo: 'EXP-2025-005', expenseDate: '2025-11-05', category: 'Raw Materials', description: 'Teak Wood Purchase - PO-2025-001', amount: 132160, paymentMode: 'Bank Transfer', vendorName: 'Karnataka Wood Suppliers', status: 'Paid', transactionRef: 'NEFT2025110502', remarks: 'Linked to PO-2025-001' },
  { id: 6, expenseNo: 'EXP-2025-006', expenseDate: '2025-11-06', category: 'Maintenance', description: 'Factory machinery servicing', amount: 18000, paymentMode: 'Cash', status: 'Paid', transactionRef: '', remarks: 'Quarterly maintenance' },
  { id: 7, expenseNo: 'EXP-2025-007', expenseDate: '2025-11-07', category: 'Office Supplies', description: 'Stationery and printing materials', amount: 3500, paymentMode: 'Card', status: 'Paid', transactionRef: 'CARD2025110701', remarks: '' },
  { id: 8, expenseNo: 'EXP-2025-008', expenseDate: '2025-11-08', category: 'Marketing', description: 'Facebook and Google Ads - October', amount: 25000, paymentMode: 'Card', status: 'Paid', transactionRef: 'CARD2025110801', remarks: 'Digital marketing campaign' },
  { id: 9, expenseNo: 'EXP-2025-009', expenseDate: '2025-11-09', category: 'Salaries', description: 'Staff salaries - October', amount: 185000, paymentMode: 'Bank Transfer', status: 'Approved', transactionRef: '', remarks: 'Pending disbursement on 15th' },
  { id: 10, expenseNo: 'EXP-2025-010', expenseDate: '2025-11-10', category: 'Raw Materials', description: 'Hardware items - PO-2025-004', amount: 17700, paymentMode: 'Cash', vendorName: 'Modern Hardware Store', status: 'Paid', transactionRef: '', remarks: 'Cash payment on delivery' },
  { id: 11, expenseNo: 'EXP-2025-011', expenseDate: '2025-11-11', category: 'Transportation', description: 'Goods carrier charges for delivery', amount: 8500, paymentMode: 'UPI', vendorName: 'Quick Transport Services', status: 'Pending', transactionRef: '', remarks: 'Awaiting delivery confirmation' },
  { id: 12, expenseNo: 'EXP-2025-012', expenseDate: '2025-11-11', category: 'Other', description: 'Miscellaneous factory expenses', amount: 5200, paymentMode: 'Cash', status: 'Pending', transactionRef: '', remarks: 'Small purchases and repairs' },
];
