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
  useToast,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiDownload, FiSend, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { customers } from '../../data/mockData';

const ProformaInvoice = () => {
  const [proformaInvoices, setProformaInvoices] = useState([
    { 
      id: 1, 
      piNo: 'PI-2025-001', 
      customerId: 1, 
      customerName: 'Rajesh Kumar', 
      date: '2025-11-12', 
      validUntil: '2025-11-26',
      items: [
        { productId: 1, productName: 'Premium Leather Sofa 3-Seater', quantity: 1, price: 85000 }
      ], 
      subtotal: 85000, 
      discount: 2000, 
      tax: 14940, 
      total: 97940, 
      status: 'Draft',
      remarks: 'Advance payment required before production'
    },
    { 
      id: 2, 
      piNo: 'PI-2025-002', 
      customerId: 3, 
      customerName: 'Arjun Patel', 
      date: '2025-11-11', 
      validUntil: '2025-11-25',
      items: [
        { productId: 3, productName: '6-Seater Dining Table Set', quantity: 1, price: 95000 }
      ], 
      subtotal: 95000, 
      discount: 5000, 
      tax: 16200, 
      total: 106200, 
      status: 'Sent',
      remarks: 'Custom color finish'
    },
  ]);
  const [filteredInvoices, setFilteredInvoices] = useState(proformaInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const toast = useToast();

  React.useEffect(() => {
    let filtered = proformaInvoices;

    if (searchTerm) {
      filtered = filtered.filter(
        (pi) =>
          pi.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pi.piNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((pi) => pi.status === statusFilter);
    }

    setFilteredInvoices(filtered);
  }, [searchTerm, statusFilter, proformaInvoices]);

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

  const handleSendEmail = (invoice) => {
    toast({
      title: 'Email Sent',
      description: `Proforma Invoice ${invoice.piNo} sent to ${invoice.customerName}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleConvertToInvoice = (invoice) => {
    toast({
      title: 'Converting to Invoice',
      description: `Creating invoice from ${invoice.piNo}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'gray',
      'Sent': 'blue',
      'Accepted': 'green',
      'Rejected': 'red',
      'Converted': 'purple',
      'Expired': 'orange',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Proforma Invoices
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Search by PI no or customer..."
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
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Converted">Converted</option>
              <option value="Expired">Expired</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              ml="auto"
            >
              New Proforma Invoice
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>PI No</Th>
                  <Th>Date</Th>
                  <Th>Customer</Th>
                  <Th>Valid Until</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredInvoices.map((invoice) => (
                  <Tr key={invoice.id}>
                    <Td fontWeight="600">{invoice.piNo}</Td>
                    <Td>{invoice.date}</Td>
                    <Td>{invoice.customerName}</Td>
                    <Td>{invoice.validUntil}</Td>
                    <Td isNumeric fontWeight="600">{formatCurrency(invoice.total)}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={1}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(invoice)}
                          aria-label="View"
                        />
                        <IconButton
                          icon={<FaWhatsapp />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                          onClick={() => {
                            const customer = customers.find(c => c.id === invoice.customerId);
                            if (customer) {
                              const message = `Hello ${customer.name}, your proforma invoice ${invoice.piNo} for ₹${invoice.total.toLocaleString('en-IN')} is ready. Valid until ${invoice.validUntil}. Please review!`;
                              window.open(`https://wa.me/${customer.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`);
                            }
                          }}
                          aria-label="Send WhatsApp"
                        />
                        <IconButton
                          icon={<FiMail />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => {
                            const customer = customers.find(c => c.id === invoice.customerId);
                            if (customer) {
                              window.open(`mailto:${customer.email}?subject=Proforma Invoice - ${invoice.piNo}&body=Dear ${customer.name},%0D%0A%0D%0APlease find your proforma invoice ${invoice.piNo} for ₹${invoice.total.toLocaleString('en-IN')}.%0D%0AValid Until: ${invoice.validUntil}%0D%0A%0D%0APlease review and confirm!`);
                            }
                          }}
                          aria-label="Send Email"
                        />
                        <IconButton
                          icon={<FiDownload />}
                          size="sm"
                          variant="ghost"
                          colorScheme="orange"
                          aria-label="Download"
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

      {/* View Proforma Invoice Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="brand.primary" color="white">
            Proforma Invoice Details
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            {selectedInvoice && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">PI Number</Text>
                    <Text fontWeight="600" fontSize="lg">{selectedInvoice.piNo}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Date</Text>
                    <Text fontWeight="600">{selectedInvoice.date}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Customer</Text>
                    <Text fontWeight="600">{selectedInvoice.customerName}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Valid Until</Text>
                    <Text fontWeight="600">{selectedInvoice.validUntil}</Text>
                  </Box>
                  <Box gridColumn="span 2">
                    <Text fontSize="sm" color="gray.600">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedInvoice.status)} fontSize="md">
                      {selectedInvoice.status}
                    </Badge>
                  </Box>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Text fontWeight="600" mb={2}>Items</Text>
                  <Table size="sm" variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Product</Th>
                        <Th isNumeric>Qty</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric>Total</Th>
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

                <SimpleGrid columns={2} spacing={2}>
                  <Text>Subtotal:</Text>
                  <Text textAlign="right" fontWeight="600">{formatCurrency(selectedInvoice.subtotal)}</Text>
                  <Text>Discount:</Text>
                  <Text textAlign="right" color="red.500">- {formatCurrency(selectedInvoice.discount)}</Text>
                  <Text>GST (18%):</Text>
                  <Text textAlign="right">{formatCurrency(selectedInvoice.tax)}</Text>
                  <Text fontSize="lg" fontWeight="bold">Total Amount:</Text>
                  <Text textAlign="right" fontSize="lg" fontWeight="bold" color="brand.primary">
                    {formatCurrency(selectedInvoice.total)}
                  </Text>
                </SimpleGrid>

                {selectedInvoice.remarks && (
                  <>
                    <Divider />
                    <Box>
                      <Text fontSize="sm" color="gray.600" mb={1}>Remarks</Text>
                      <Text fontSize="sm">{selectedInvoice.remarks}</Text>
                    </Box>
                  </>
                )}

                <Box bg="blue.50" p={3} borderRadius="md">
                  <Text fontSize="xs" color="blue.700">
                    <strong>Note:</strong> This is a Proforma Invoice and not a tax invoice. Payment terms and conditions apply as per agreement.
                  </Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button 
              leftIcon={<FiSend />} 
              colorScheme="blue" 
              mr={3}
              onClick={() => handleSendEmail(selectedInvoice)}
            >
              Send Email
            </Button>
            <Button 
              colorScheme="brand"
              onClick={() => handleConvertToInvoice(selectedInvoice)}
            >
              Convert to Invoice
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProformaInvoice;
