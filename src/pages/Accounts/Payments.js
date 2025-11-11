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
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiDownload } from 'react-icons/fi';
import { payments as initialPayments } from '../../data/mockData';

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [filteredPayments, setFilteredPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    invoiceNo: '',
    amount: '',
    mode: 'UPI',
    transactionRef: '',
    remarks: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.paymentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (modeFilter !== 'All') {
      filtered = filtered.filter((payment) => payment.mode === modeFilter);
    }

    setFilteredPayments(filtered);
  }, [searchTerm, modeFilter, payments]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = () => {
    const newPayment = {
      id: payments.length + 1,
      paymentNo: `PAY-2025-${String(payments.length + 1).padStart(3, '0')}`,
      invoiceNo: formData.invoiceNo,
      customerName: formData.customerName,
      amount: parseFloat(formData.amount),
      mode: formData.mode,
      date: new Date().toISOString().split('T')[0],
      transactionRef: formData.transactionRef,
      remarks: formData.remarks,
    };
    setPayments([...payments, newPayment]);
    setFormData({
      customerName: '',
      invoiceNo: '',
      amount: '',
      mode: 'UPI',
      transactionRef: '',
      remarks: '',
    });
    onClose();
  };

  const handleView = (payment) => {
    setSelectedPayment(payment);
    onViewOpen();
  };

  const getModeColor = (mode) => {
    const colors = {
      'Cash': 'green',
      'Card': 'blue',
      'UPI': 'purple',
      'Bank Transfer': 'orange',
      'Cheque': 'yellow',
    };
    return colors[mode] || 'gray';
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Payment Collection
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Search by payment no, invoice or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="400px"
            />
            <Select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              maxW="200px"
            >
              <option value="All">All Modes</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cheque">Cheque</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              onClick={onOpen}
              ml="auto"
            >
              Record Payment
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Payment No</Th>
                  <Th>Date</Th>
                  <Th>Customer</Th>
                  <Th>Invoice No</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Mode</Th>
                  <Th>Transaction Ref</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredPayments.map((payment) => (
                  <Tr key={payment.id}>
                    <Td fontWeight="600">{payment.paymentNo}</Td>
                    <Td>{payment.date}</Td>
                    <Td>{payment.customerName}</Td>
                    <Td>{payment.invoiceNo}</Td>
                    <Td isNumeric fontWeight="600" color="green.600">
                      {formatCurrency(payment.amount)}
                    </Td>
                    <Td>
                      <Badge colorScheme={getModeColor(payment.mode)}>
                        {payment.mode}
                      </Badge>
                    </Td>
                    <Td fontSize="sm">{payment.transactionRef}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(payment)}
                          aria-label="View"
                        />
                        <IconButton
                          icon={<FiDownload />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Download Receipt"
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

      {/* Record Payment Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Record New Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Customer Name</FormLabel>
                  <Input
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Invoice No</FormLabel>
                  <Input
                    value={formData.invoiceNo}
                    onChange={(e) =>
                      setFormData({ ...formData, invoiceNo: e.target.value })
                    }
                    placeholder="INV-2025-XXX"
                  />
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Payment Mode</FormLabel>
                  <Select
                    value={formData.mode}
                    onChange={(e) =>
                      setFormData({ ...formData, mode: e.target.value })
                    }
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
              <FormControl>
                <FormLabel>Transaction Reference</FormLabel>
                <Input
                  value={formData.transactionRef}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionRef: e.target.value })
                  }
                  placeholder="UPI ID / Cheque No / Transaction ID"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Remarks</FormLabel>
                <Input
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleSubmit}>
              Record Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Payment Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="green.500" color="white">
            Payment Receipt
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            {selectedPayment && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Payment No</Text>
                    <Text fontWeight="600">{selectedPayment.paymentNo}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">Date</Text>
                    <Text fontWeight="600">{selectedPayment.date}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Customer Name</Text>
                    <Text fontWeight="600">{selectedPayment.customerName}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">Invoice No</Text>
                    <Text fontWeight="600">{selectedPayment.invoiceNo}</Text>
                  </Box>
                </SimpleGrid>
                <Box bg="green.50" p={4} borderRadius="md" textAlign="center">
                  <Text fontSize="sm" color="gray.600" mb={1}>Amount Received</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="green.600">
                    {formatCurrency(selectedPayment.amount)}
                  </Text>
                </Box>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Payment Mode</Text>
                    <Badge colorScheme={getModeColor(selectedPayment.mode)} fontSize="md">
                      {selectedPayment.mode}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Transaction Ref</Text>
                    <Text fontWeight="600">{selectedPayment.transactionRef}</Text>
                  </Box>
                </SimpleGrid>
                {selectedPayment.remarks && (
                  <Box>
                    <Text fontSize="sm" color="gray.600">Remarks</Text>
                    <Text>{selectedPayment.remarks}</Text>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button leftIcon={<FiDownload />} colorScheme="brand">
              Download Receipt
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Payments;
