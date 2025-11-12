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
  Tooltip,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiDownload, FiCopy, FiClock } from 'react-icons/fi';
import { quotations as initialQuotations } from '../../data/mockData';

const Quotations = () => {
  const [quotations, setQuotations] = useState(initialQuotations);
  const [filteredQuotations, setFilteredQuotations] = useState(initialQuotations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isRevisionOpen, onOpen: onRevisionOpen, onClose: onRevisionClose } = useDisclosure();
  const toast = useToast();

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

  const handleViewRevisions = (quotation) => {
    setSelectedQuotation(quotation);
    onRevisionOpen();
  };

  const handleCreateRevision = (quotation) => {
    const newRevision = {
      ...quotation,
      revision: quotation.revision + 1,
      quotationNo: `${quotation.quotationNo.split('-Rev')[0]}-Rev${quotation.revision + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
      revisionHistory: [
        ...quotation.revisionHistory,
        {
          revisionNo: quotation.revision,
          date: quotation.date,
          total: quotation.total,
          remarks: `Revision ${quotation.revision}`,
        },
      ],
    };

    const updatedQuotations = quotations.map((q) =>
      q.id === quotation.id ? newRevision : q
    );
    setQuotations(updatedQuotations);
    setFilteredQuotations(updatedQuotations);

    toast({
      title: 'Revision created!',
      description: `Created revision ${newRevision.revision} for ${quotation.quotationNo}`,
      status: 'success',
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
                  <Th>Revision</Th>
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
                    <Td fontWeight="600">{quotation.quotationNo.split('-Rev')[0]}</Td>
                    <Td>
                      <HStack>
                        <Badge colorScheme={quotation.revision > 0 ? 'orange' : 'gray'}>
                          Rev {quotation.revision}
                        </Badge>
                        {quotation.revisionHistory.length > 0 && (
                          <Tooltip label="View revision history">
                            <IconButton
                              icon={<FiClock />}
                              size="xs"
                              variant="ghost"
                              onClick={() => handleViewRevisions(quotation)}
                              aria-label="Revision History"
                            />
                          </Tooltip>
                        )}
                      </HStack>
                    </Td>
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
                        <Tooltip label="Create Revision">
                          <IconButton
                            icon={<FiCopy />}
                            size="sm"
                            variant="ghost"
                            colorScheme="orange"
                            onClick={() => handleCreateRevision(quotation)}
                            aria-label="Create Revision"
                          />
                        </Tooltip>
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

      {/* Revision History Modal */}
      <Modal isOpen={isRevisionOpen} onClose={onRevisionClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Revision History - {selectedQuotation?.quotationNo.split('-Rev')[0]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedQuotation && (
              <VStack align="stretch" spacing={4}>
                <Box p={4} bg="blue.50" borderRadius="md">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="bold" color="blue.700">
                      Current Version - Rev {selectedQuotation.revision}
                    </Text>
                    <Badge colorScheme="blue" fontSize="md">Active</Badge>
                  </HStack>
                  <SimpleGrid columns={2} spacing={2}>
                    <Text fontSize="sm">Date: {selectedQuotation.date}</Text>
                    <Text fontSize="sm" textAlign="right">
                      Total: {formatCurrency(selectedQuotation.total)}
                    </Text>
                  </SimpleGrid>
                </Box>

                {selectedQuotation.revisionHistory.length > 0 && (
                  <>
                    <Divider />
                    <Heading size="sm">Previous Revisions</Heading>
                    {selectedQuotation.revisionHistory.map((rev, index) => (
                      <Box
                        key={index}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        bg="gray.50"
                      >
                        <HStack justify="space-between" mb={2}>
                          <Text fontWeight="600">Rev {rev.revisionNo}</Text>
                          <Badge colorScheme="gray">Historical</Badge>
                        </HStack>
                        <SimpleGrid columns={2} spacing={2}>
                          <Text fontSize="sm">Date: {rev.date}</Text>
                          <Text fontSize="sm" textAlign="right">
                            Total: {formatCurrency(rev.total)}
                          </Text>
                        </SimpleGrid>
                        {rev.remarks && (
                          <Text fontSize="sm" color="gray.600" mt={2}>
                            Remarks: {rev.remarks}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onRevisionClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Quotations;
