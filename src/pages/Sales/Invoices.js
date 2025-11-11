import React, { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Card,
  CardBody,
  HStack,
  Input,
  Select,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  SimpleGrid,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { FiDownload, FiEye, FiSend } from 'react-icons/fi';
import { invoices as initialInvoices } from '../../data/mockData';

const Invoices = () => {
  const [invoices] = useState(initialInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter(
        (inv) =>
          inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((inv) => inv.status === statusFilter);
    }

    setFilteredInvoices(filtered);
  }, [searchTerm, statusFilter, invoices]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    onViewOpen();
  };

  const getStatusColor = (status) => {
    const colors = {
      'Paid': 'green',
      'Partial': 'orange',
      'Due': 'red',
      'Overdue': 'red',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Invoices
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Search by invoice no or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="400px"
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              maxW="200px"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Due">Due</option>
              <option value="Overdue">Overdue</option>
            </Select>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Invoice No</Th>
                  <Th>Invoice Date</Th>
                  <Th>Customer</Th>
                  <Th>Order No</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Due Date</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredInvoices.map((invoice) => (
                  <Tr key={invoice.id}>
                    <Td fontWeight="600">{invoice.invoiceNo}</Td>
                    <Td>{invoice.invoiceDate}</Td>
                    <Td>{invoice.customerName}</Td>
                    <Td>{invoice.orderNo}</Td>
                    <Td isNumeric fontWeight="600">{formatCurrency(invoice.total)}</Td>
                    <Td>{invoice.dueDate}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(invoice)}
                          aria-label="View"
                        />
                        <IconButton
                          icon={<FiDownload />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Download"
                        />
                        <IconButton
                          icon={<FiSend />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                          aria-label="Send"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* View Invoice Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="brand.primary" color="white" borderTopRadius="md">
            Tax Invoice
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            {selectedInvoice && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Invoice No</Text>
                    <Text fontWeight="600" fontSize="lg">{selectedInvoice.invoiceNo}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">Invoice Date</Text>
                    <Text fontWeight="600">{selectedInvoice.invoiceDate}</Text>
                  </Box>
                </SimpleGrid>

                <Divider />

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>Bill To:</Text>
                    <Text fontWeight="600">{selectedInvoice.customerName}</Text>
                    <Text fontSize="sm">Customer ID: #{selectedInvoice.customerId}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">Sales Order</Text>
                    <Text fontWeight="600">{selectedInvoice.orderNo}</Text>
                    <Text fontSize="sm" color="gray.600" mt={2}>Due Date</Text>
                    <Text fontWeight="600">{selectedInvoice.dueDate}</Text>
                  </Box>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Table size="sm" variant="simple">
                    <Thead bg="gray.50">
                      <Tr>
                        <Th>Product</Th>
                        <Th isNumeric>Qty</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedInvoice.items.map((item, idx) => (
                        <Tr key={idx}>
                          <Td>{item.productName}</Td>
                          <Td isNumeric>{item.quantity}</Td>
                          <Td isNumeric>{formatCurrency(item.price)}</Td>
                          <Td isNumeric fontWeight="600">
                            {formatCurrency(item.price * item.quantity)}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>

                <Divider />

                <Box>
                  <SimpleGrid columns={2} spacing={2} maxW="300px" ml="auto">
                    <Text>Subtotal:</Text>
                    <Text textAlign="right" fontWeight="600">{formatCurrency(selectedInvoice.subtotal)}</Text>
                    <Text>Discount:</Text>
                    <Text textAlign="right" color="red.500">- {formatCurrency(selectedInvoice.discount)}</Text>
                    <Text>GST (18%):</Text>
                    <Text textAlign="right">{formatCurrency(selectedInvoice.gst)}</Text>
                    {selectedInvoice.tcs > 0 && (
                      <>
                        <Text>TCS:</Text>
                        <Text textAlign="right">{formatCurrency(selectedInvoice.tcs)}</Text>
                      </>
                    )}
                    <Divider gridColumn="span 2" />
                    <Text fontSize="lg" fontWeight="bold">Total Amount:</Text>
                    <Text textAlign="right" fontSize="lg" fontWeight="bold" color="brand.primary">
                      {formatCurrency(selectedInvoice.total)}
                    </Text>
                  </SimpleGrid>
                </Box>

                <Box bg="gray.50" p={4} borderRadius="md">
                  <HStack justify="space-between">
                    <Text fontWeight="600">Payment Status:</Text>
                    <Badge colorScheme={getStatusColor(selectedInvoice.status)} fontSize="md" px={3} py={1}>
                      {selectedInvoice.status}
                    </Badge>
                  </HStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button leftIcon={<FiDownload />} colorScheme="brand" mr={2}>
              Download PDF
            </Button>
            <Button leftIcon={<FiSend />} colorScheme="green">
              Send Email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Invoices;
