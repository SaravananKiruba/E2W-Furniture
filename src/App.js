import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inquiries from './pages/Sales/Inquiries';
import Quotations from './pages/Sales/Quotations';
import SalesOrders from './pages/Sales/SalesOrders';
import Invoices from './pages/Sales/Invoices';
import Payments from './pages/Accounts/Payments';
import CustomerLedger from './pages/Accounts/CustomerLedger';
import Reports from './pages/Accounts/Reports';
import Products from './pages/Stock/Products';
import DeliveryNotes from './pages/Delivery/DeliveryNotes';
import Customers from './pages/Customers';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            
            {/* Sales Module */}
            <Route path="/sales/inquiries" element={<Inquiries />} />
            <Route path="/sales/quotations" element={<Quotations />} />
            <Route path="/sales/orders" element={<SalesOrders />} />
            <Route path="/sales/invoices" element={<Invoices />} />
            
            {/* Accounts Module */}
            <Route path="/accounts/payments" element={<Payments />} />
            <Route path="/accounts/ledger" element={<CustomerLedger />} />
            <Route path="/accounts/reports" element={<Reports />} />
            
            {/* Stock Module */}
            <Route path="/stock/products" element={<Products />} />
            
            {/* Delivery Module */}
            <Route path="/delivery/notes" element={<DeliveryNotes />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
