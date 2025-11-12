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
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiEdit, FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { expenses as initialExpenses } from '../../data/mockData';

const Expenses = () => {
  const [expenses] = useState(initialExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedExpense, setSelectedExpense] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = expenses;

    if (searchTerm) {
      filtered = filtered.filter(
        (expense) =>
          expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.expenseNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((expense) => expense.category === categoryFilter);
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((expense) => expense.status === statusFilter);
    }

    setFilteredExpenses(filtered);
  }, [searchTerm, categoryFilter, statusFilter, expenses]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleView = (expense) => {
    setSelectedExpense(expense);
    onViewOpen();
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'orange',
      Approved: 'green',
      Paid: 'blue',
      Rejected: 'red',
    };
    return colors[status] || 'gray';
  };

  const categories = [
    'All',
    'Raw Materials',
    'Labor',
    'Utilities',
    'Rent',
    'Transportation',
    'Maintenance',
    'Office Supplies',
    'Marketing',
    'Salaries',
    'Other',
  ];

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpenses = expenses.filter((exp) => exp.status === 'Pending').length;
  const paidExpenses = expenses.filter((exp) => exp.status === 'Paid');
  const totalPaid = paidExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Group by category
  const expensesByCategory = categories.slice(1).reduce((acc, category) => {
    acc[category] = expenses
      .filter((exp) => exp.category === category && exp.status === 'Paid')
      .reduce((sum, exp) => sum + exp.amount, 0);
    return acc;
  }, {});

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg" color="brand.primary">
          Expenses
        </Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onAddOpen}>
          Add Expense
        </Button>
      </HStack>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <Card>
          <CardBody>
            <HStack justify="space-between">
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color="gray.600">
                  Total Expenses (Filtered)
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="red.500">
                  {formatCurrency(totalExpenses)}
                </Text>
              </VStack>
              <FiTrendingDown size={32} color="var(--chakra-colors-red-500)" />
            </HStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <HStack justify="space-between">
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color="gray.600">
                  Paid Expenses
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                  {formatCurrency(totalPaid)}
                </Text>
              </VStack>
              <FiDollarSign size={32} color="var(--chakra-colors-blue-600)" />
            </HStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Pending Approval
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                {pendingExpenses}
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Categories
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {categories.length - 1}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Category-wise Breakdown */}
      <Card mb={6}>
        <CardBody>
          <Heading size="sm" mb={4} color="brand.primary">
            Category-wise Expenses (Paid)
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4}>
            {Object.entries(expensesByCategory)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([category, amount]) => (
                <Box key={category} p={3} bg="gray.50" borderRadius="md">
                  <Text fontSize="xs" color="gray.600" mb={1}>
                    {category}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="red.600">
                    {formatCurrency(amount)}
                  </Text>
                </Box>
              ))}
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Filters and Table */}
      <Card>
        <CardBody>
          <HStack spacing={4} mb={4} flexWrap="wrap">
            <Input
              placeholder="Search by description or expense no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="350px"
            />
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              maxW="200px"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              maxW="180px"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
              <option value="Rejected">Rejected</option>
            </Select>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Expense No</Th>
                  <Th>Expense Date</Th>
                  <Th>Category</Th>
                  <Th>Description</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Payment Mode</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredExpenses.map((expense) => (
                  <Tr key={expense.id}>
                    <Td fontWeight="600">{expense.expenseNo}</Td>
                    <Td>{expense.expenseDate}</Td>
                    <Td>
                      <Badge colorScheme="purple">{expense.category}</Badge>
                    </Td>
                    <Td maxW="250px" isTruncated>
                      {expense.description}
                    </Td>
                    <Td isNumeric fontWeight="600" color="red.600">
                      {formatCurrency(expense.amount)}
                    </Td>
                    <Td>{expense.paymentMode}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(expense.status)}>
                        {expense.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => handleView(expense)}
                        />
                        <IconButton
                          icon={<FiEdit />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
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

      {/* View Expense Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Expense Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedExpense && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Expense Number
                    </Text>
                    <Text fontWeight="bold">{selectedExpense.expenseNo}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Expense Date
                    </Text>
                    <Text fontWeight="bold">{selectedExpense.expenseDate}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Category
                    </Text>
                    <Badge colorScheme="purple" fontSize="md">
                      {selectedExpense.category}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Status
                    </Text>
                    <Badge colorScheme={getStatusColor(selectedExpense.status)} fontSize="md">
                      {selectedExpense.status}
                    </Badge>
                  </Box>
                </SimpleGrid>

                <Box>
                  <Text fontSize="sm" color="gray.600">
                    Description
                  </Text>
                  <Text fontWeight="bold">{selectedExpense.description}</Text>
                </Box>

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Amount
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="red.600">
                      {formatCurrency(selectedExpense.amount)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Payment Mode
                    </Text>
                    <Text fontWeight="bold">{selectedExpense.paymentMode}</Text>
                  </Box>
                </SimpleGrid>

                {selectedExpense.vendorName && (
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Vendor/Payee
                    </Text>
                    <Text fontWeight="bold">{selectedExpense.vendorName}</Text>
                  </Box>
                )}

                {selectedExpense.transactionRef && (
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Transaction Reference
                    </Text>
                    <Text fontWeight="bold">{selectedExpense.transactionRef}</Text>
                  </Box>
                )}

                {selectedExpense.remarks && (
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Remarks
                    </Text>
                    <Text>{selectedExpense.remarks}</Text>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button colorScheme="blue">Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Expense Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input type="date" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select placeholder="Select category">
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Enter expense description" />
              </FormControl>

              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Amount (₹)</FormLabel>
                  <Input type="number" placeholder="0.00" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Payment Mode</FormLabel>
                  <Select placeholder="Select mode">
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Card">Card</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>Vendor/Payee</FormLabel>
                <Input placeholder="Enter vendor or payee name" />
              </FormControl>

              <FormControl>
                <FormLabel>Transaction Reference</FormLabel>
                <Input placeholder="Transaction ID, Cheque No, etc." />
              </FormControl>

              <FormControl>
                <FormLabel>Remarks</FormLabel>
                <Textarea placeholder="Additional notes" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save Expense</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Expenses;
