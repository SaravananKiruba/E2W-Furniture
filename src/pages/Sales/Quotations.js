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
import { FiPlus, FiEye, FiDownload } from 'react-icons/fi';
import { quotations as initialQuotations } from '../../data/mockData';

const Quotations = () => {
  const [quotations] = useState(initialQuotations);
  const [filteredQuotations, setFilteredQuotations] = useState(initialQuotations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = quotations;

    if (searchTerm) {
      filtered = filtered.filter(
        (quot) =>
          quot.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quot.quotationNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((quot) => quot.status === statusFilter);
    }

    setFilteredQuotations(filtered);
  }, [searchTerm, statusFilter, quotations]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleView = (quotation) => {
    setSelectedQuotation(quotation);
    onViewOpen();
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'gray',
      'Sent': 'blue',
      'Accepted': 'green',
      'Rejected': 'red',
      'Expired': 'orange',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Quotations
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Search by quotation no or customer..."
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
              <option value="Expired">Expired</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              ml="auto"
            >
              New Quotation
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Quotation No</Th>
                  <Th>Date</Th>
                  <Th>Customer</Th>
                  <Th>Valid Until</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredQuotations.map((quotation) => (
                  <Tr key={quotation.id}>
                    <Td fontWeight="600">{quotation.quotationNo}</Td>
                    <Td>{quotation.date}</Td>
                    <Td>{quotation.customerName}</Td>
                    <Td>{quotation.validUntil}</Td>
                    <Td isNumeric fontWeight="600">{formatCurrency(quotation.total)}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(quotation.status)}>
                        {quotation.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(quotation)}
                          aria-label="View"
                        />
                        <IconButton
                          icon={<FiDownload />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
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

      {/* View Quotation Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quotation Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedQuotation && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Quotation No</Text>
                    <Text fontWeight="600">{selectedQuotation.quotationNo}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Date</Text>
                    <Text fontWeight="600">{selectedQuotation.date}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Customer</Text>
                    <Text fontWeight="600">{selectedQuotation.customerName}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Valid Until</Text>
                    <Text fontWeight="600">{selectedQuotation.validUntil}</Text>
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
                      {selectedQuotation.items.map((item, idx) => (
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
                  <Text textAlign="right" fontWeight="600">{formatCurrency(selectedQuotation.subtotal)}</Text>
                  <Text>Discount:</Text>
                  <Text textAlign="right" color="red.500">- {formatCurrency(selectedQuotation.discount)}</Text>
                  <Text>GST (18%):</Text>
                  <Text textAlign="right">{formatCurrency(selectedQuotation.tax)}</Text>
                  <Text fontSize="lg" fontWeight="bold">Total:</Text>
                  <Text textAlign="right" fontSize="lg" fontWeight="bold" color="brand.primary">
                    {formatCurrency(selectedQuotation.total)}
                  </Text>
                </SimpleGrid>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button colorScheme="brand">Convert to Order</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Quotations;
