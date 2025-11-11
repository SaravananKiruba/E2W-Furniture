import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Select,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
} from '@chakra-ui/react';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { salesOrders, invoices, payments } from '../../data/mockData';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateFilter, setDateFilter] = useState('today');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate summary statistics
  const totalSales = salesOrders.reduce((sum, order) => sum + order.total, 0);
  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalGST = invoices.reduce((sum, invoice) => sum + invoice.gst, 0);
  const totalTCS = invoices.reduce((sum, invoice) => sum + invoice.tcs, 0);
  const outstanding = totalSales - totalPayments;

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Reports & Analytics
      </Heading>

      {/* Report Filters */}
      <Card mb={6}>
        <CardBody>
          <HStack spacing={4}>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              maxW="250px"
            >
              <option value="daily">Daily Sales Register</option>
              <option value="monthly">Monthly Sales Report</option>
              <option value="tax">GST & TCS Summary</option>
              <option value="customer">Customer Balance Sheet</option>
              <option value="product">Product-wise Sales</option>
            </Select>
            <Select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              maxW="200px"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </Select>
            <Button leftIcon={<FiDownload />} colorScheme="brand" ml="auto">
              Export to Excel
            </Button>
            <Button leftIcon={<FiPrinter />} variant="outline">
              Print Report
            </Button>
          </HStack>
        </CardBody>
      </Card>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6} mb={6}>
        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.600" mb={1}>Total Sales</Text>
            <Text fontSize="2xl" fontWeight="bold" color="brand.primary">
              {formatCurrency(totalSales)}
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.600" mb={1}>Payments Received</Text>
            <Text fontSize="2xl" fontWeight="bold" color="green.600">
              {formatCurrency(totalPayments)}
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.600" mb={1}>Outstanding</Text>
            <Text fontSize="2xl" fontWeight="bold" color="orange.600">
              {formatCurrency(outstanding)}
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.600" mb={1}>GST Collected</Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
              {formatCurrency(totalGST)}
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.600" mb={1}>TCS Collected</Text>
            <Text fontSize="2xl" fontWeight="bold" color="purple.600">
              {formatCurrency(totalTCS)}
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Sales Register Table */}
      <Card mb={6}>
        <CardHeader>
          <Heading size="md" color="brand.primary">
            Daily Sales Register
          </Heading>
        </CardHeader>
        <CardBody>
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Date</Th>
                  <Th>Invoice No</Th>
                  <Th>Customer</Th>
                  <Th isNumeric>Taxable Amount</Th>
                  <Th isNumeric>GST</Th>
                  <Th isNumeric>TCS</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoices.map((invoice) => (
                  <Tr key={invoice.id}>
                    <Td>{invoice.invoiceDate}</Td>
                    <Td fontWeight="600">{invoice.invoiceNo}</Td>
                    <Td>{invoice.customerName}</Td>
                    <Td isNumeric>{formatCurrency(invoice.subtotal - invoice.discount)}</Td>
                    <Td isNumeric>{formatCurrency(invoice.gst)}</Td>
                    <Td isNumeric>{formatCurrency(invoice.tcs)}</Td>
                    <Td isNumeric fontWeight="600">{formatCurrency(invoice.total)}</Td>
                  </Tr>
                ))}
                <Tr bg="gray.50" fontWeight="bold">
                  <Td colSpan={3}>Total</Td>
                  <Td isNumeric>
                    {formatCurrency(
                      invoices.reduce((sum, inv) => sum + inv.subtotal - inv.discount, 0)
                    )}
                  </Td>
                  <Td isNumeric>{formatCurrency(totalGST)}</Td>
                  <Td isNumeric>{formatCurrency(totalTCS)}</Td>
                  <Td isNumeric>
                    {formatCurrency(invoices.reduce((sum, inv) => sum + inv.total, 0))}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <Heading size="md" color="brand.primary">
            Payment Summary by Mode
          </Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {['Cash', 'Card', 'UPI', 'Bank Transfer', 'Cheque'].map((mode) => {
              const modePayments = payments.filter((p) => p.mode === mode);
              const total = modePayments.reduce((sum, p) => sum + p.amount, 0);
              const count = modePayments.length;

              return (
                <Card key={mode} variant="outline">
                  <CardBody>
                    <VStack align="stretch" spacing={2}>
                      <Text fontWeight="600" color="gray.700">{mode}</Text>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.primary">
                        {formatCurrency(total)}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {count} transaction{count !== 1 ? 's' : ''}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              );
            })}
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Reports;
