import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inquiries from './pages/Sales/Inquiries';
import Quotations from './pages/Sales/Quotations';
import ProformaInvoice from './pages/Sales/ProformaInvoice';
import SalesOrders from './pages/Sales/SalesOrders';
import Invoices from './pages/Sales/Invoices';
import Payments from './pages/Accounts/Payments';
import CustomerLedger from './pages/Accounts/CustomerLedger';
import Reports from './pages/Accounts/Reports';
import Products from './pages/Stock/Products';
import RawMaterials from './pages/Stock/RawMaterials';
import DeliveryNotes from './pages/Delivery/DeliveryNotes';
import CustomerDelivery from './pages/Delivery/CustomerDelivery';
import ShowroomDelivery from './pages/Delivery/ShowroomDelivery';
import Customers from './pages/Customers';
import Vendors from './pages/Vendors';
import PurchaseOrders from './pages/Purchases/PurchaseOrders';
import Expenses from './pages/Purchases/Expenses';

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            
            {/* Sales Module */}
            <Route path="/sales/inquiries" element={<Inquiries />} />
            <Route path="/sales/quotations" element={<Quotations />} />
            <Route path="/sales/proforma-invoice" element={<ProformaInvoice />} />
            <Route path="/sales/orders" element={<SalesOrders />} />
            <Route path="/sales/invoices" element={<Invoices />} />
            
            {/* Accounts Module */}
            <Route path="/accounts/payments" element={<Payments />} />
            <Route path="/accounts/ledger" element={<CustomerLedger />} />
            <Route path="/accounts/reports" element={<Reports />} />
            
            {/* Stock Module */}
            <Route path="/stock/products" element={<Products />} />
            <Route path="/stock/raw-materials" element={<RawMaterials />} />
            
            {/* Purchases & Expenses Module */}
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/purchases/orders" element={<PurchaseOrders />} />
            <Route path="/purchases/expenses" element={<Expenses />} />
            
            {/* Delivery Module */}
            <Route path="/delivery/notes" element={<DeliveryNotes />} />
            <Route path="/delivery/customer" element={<CustomerDelivery />} />
            <Route path="/delivery/showroom" element={<ShowroomDelivery />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
