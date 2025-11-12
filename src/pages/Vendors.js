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
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tooltip,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiEdit, FiPhone, FiMail, FiMapPin, FiAlertCircle, FiClock } from 'react-icons/fi';
import { vendors as initialVendors } from '../data/mockData';

const Vendors = () => {
  const [vendors] = useState(initialVendors);
  const [filteredVendors, setFilteredVendors] = useState(initialVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = vendors;

    if (searchTerm) {
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((vendor) => vendor.category === categoryFilter);
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((vendor) => vendor.status === statusFilter);
    }

    setFilteredVendors(filtered);
  }, [searchTerm, categoryFilter, statusFilter, vendors]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleView = (vendor) => {
    setSelectedVendor(vendor);
    onViewOpen();
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: 'green',
      Inactive: 'gray',
      Suspended: 'red',
    };
    return colors[status] || 'gray';
  };

  const categories = [
    'All',
    'Wood Supplier',
    'Fabric Supplier',
    'Hardware Supplier',
    'Foam Supplier',
    'Leather Supplier',
    'Paint & Finish',
    'Logistics',
    'Other',
  ];

  const totalOutstanding = vendors.reduce((sum, vendor) => sum + vendor.outstandingAmount, 0);
  const activeVendors = vendors.filter((v) => v.status === 'Active').length;

  // Calculate overdue payments
  const today = new Date();
  const overdueVendors = vendors.filter((v) => {
    if (!v.dueDate || v.outstandingAmount === 0) return false;
    const dueDate = new Date(v.dueDate);
    return dueDate < today;
  });

  const dueSoonVendors = vendors.filter((v) => {
    if (!v.dueDate || v.outstandingAmount === 0) return false;
    const dueDate = new Date(v.dueDate);
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return daysDiff >= 0 && daysDiff <= 3;
  });

  const getPaymentStatus = (vendor) => {
    if (!vendor.dueDate || vendor.outstandingAmount === 0) return null;
    const dueDate = new Date(vendor.dueDate);
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return { status: 'overdue', days: Math.abs(daysDiff), color: 'red' };
    if (daysDiff <= 3) return { status: 'due-soon', days: daysDiff, color: 'orange' };
    return { status: 'ok', days: daysDiff, color: 'green' };
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg" color="brand.primary">
          Vendors & Suppliers
        </Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onAddOpen}>
          Add Vendor
        </Button>
      </HStack>

      {/* Payment Alerts */}
      {(overdueVendors.length > 0 || dueSoonVendors.length > 0) && (
        <VStack spacing={3} mb={6}>
          {overdueVendors.length > 0 && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Overdue Payments!</AlertTitle>
                <AlertDescription>
                  {overdueVendors.length} vendor payment(s) overdue: {overdueVendors.map(v => v.name).join(', ')}
                </AlertDescription>
              </Box>
            </Alert>
          )}
          {dueSoonVendors.length > 0 && (
            <Alert status="warning" borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Payments Due Soon</AlertTitle>
                <AlertDescription>
                  {dueSoonVendors.length} payment(s) due within 3 days: {dueSoonVendors.map(v => v.name).join(', ')}
                </AlertDescription>
              </Box>
            </Alert>
          )}
        </VStack>
      )}

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Total Vendors
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {vendors.length}
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Active Vendors
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {activeVendors}
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Total Outstanding
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="red.500">
                {formatCurrency(totalOutstanding)}
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

      {/* Filters and Table */}
      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4} flexWrap="wrap">
            <Input
              placeholder="Search by name, phone, or email..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </Select>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Vendor Name</Th>
                  <Th>Category</Th>
                  <Th>Contact</Th>
                  <Th>Email</Th>
                  <Th>Payment Terms</Th>
                  <Th>Due Date</Th>
                  <Th isNumeric>Outstanding</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredVendors.map((vendor) => {
                  const paymentStatus = getPaymentStatus(vendor);
                  return (
                    <Tr key={vendor.id} bg={paymentStatus?.status === 'overdue' ? 'red.50' : paymentStatus?.status === 'due-soon' ? 'orange.50' : 'transparent'}>
                      <Td fontWeight="600">{vendor.name}</Td>
                      <Td>
                        <Badge colorScheme="purple">{vendor.category}</Badge>
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          <FiPhone size={14} />
                          <Text fontSize="sm">{vendor.phone}</Text>
                        </HStack>
                      </Td>
                      <Td fontSize="sm">{vendor.email}</Td>
                      <Td>
                        <HStack>
                          <FiClock size={14} />
                          <Text fontSize="sm" fontWeight="500">{vendor.paymentTerms}</Text>
                        </HStack>
                      </Td>
                      <Td>
                        {vendor.dueDate && vendor.outstandingAmount > 0 ? (
                          <HStack>
                            {paymentStatus?.status === 'overdue' && (
                              <Tooltip label={`Overdue by ${paymentStatus.days} days`}>
                                <Badge colorScheme="red" display="flex" alignItems="center">
                                  <FiAlertCircle style={{ marginRight: '4px' }} />
                                  {vendor.dueDate}
                                </Badge>
                              </Tooltip>
                            )}
                            {paymentStatus?.status === 'due-soon' && (
                              <Tooltip label={`Due in ${paymentStatus.days} days`}>
                                <Badge colorScheme="orange" display="flex" alignItems="center">
                                  <FiAlertCircle style={{ marginRight: '4px' }} />
                                  {vendor.dueDate}
                                </Badge>
                              </Tooltip>
                            )}
                            {paymentStatus?.status === 'ok' && (
                              <Text fontSize="sm">{vendor.dueDate}</Text>
                            )}
                          </HStack>
                        ) : (
                          <Text fontSize="sm" color="gray.400">-</Text>
                        )}
                      </Td>
                      <Td isNumeric fontWeight="600" color={vendor.outstandingAmount > 0 ? 'red.500' : 'green.600'}>
                        {formatCurrency(vendor.outstandingAmount)}
                      </Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(vendor.status)}>
                          {vendor.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            icon={<FiEye />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => handleView(vendor)}
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
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* View Vendor Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vendor Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedVendor && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Vendor Name
                    </Text>
                    <Text fontWeight="bold" fontSize="lg">
                      {selectedVendor.name}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Category
                    </Text>
                    <Badge colorScheme="purple" fontSize="md">
                      {selectedVendor.category}
                    </Badge>
                  </Box>
                </SimpleGrid>

                <Divider />

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <HStack mb={1}>
                      <FiPhone />
                      <Text fontSize="sm" color="gray.600">
                        Phone
                      </Text>
                    </HStack>
                    <Text fontWeight="bold">{selectedVendor.phone}</Text>
                  </Box>
                  <Box>
                    <HStack mb={1}>
                      <FiMail />
                      <Text fontSize="sm" color="gray.600">
                        Email
                      </Text>
                    </HStack>
                    <Text fontWeight="bold">{selectedVendor.email}</Text>
                  </Box>
                </SimpleGrid>

                <Box>
                  <HStack mb={1}>
                    <FiMapPin />
                    <Text fontSize="sm" color="gray.600">
                      Address
                    </Text>
                  </HStack>
                  <Text fontWeight="bold">{selectedVendor.address}</Text>
                </Box>

                <Divider />

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      GSTIN
                    </Text>
                    <Text fontWeight="bold">{selectedVendor.gstin || 'Not Provided'}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Payment Terms
                    </Text>
                    <HStack>
                      <FiClock />
                      <Text fontWeight="bold">{selectedVendor.paymentTerms}</Text>
                      <Badge colorScheme="blue">{selectedVendor.creditDays} days</Badge>
                    </HStack>
                  </Box>
                  {selectedVendor.dueDate && selectedVendor.outstandingAmount > 0 && (
                    <Box gridColumn="span 2">
                      <Text fontSize="sm" color="gray.600">Payment Due Date</Text>
                      {(() => {
                        const paymentStatus = getPaymentStatus(selectedVendor);
                        return (
                          <HStack>
                            <Text fontWeight="bold">{selectedVendor.dueDate}</Text>
                            {paymentStatus?.status === 'overdue' && (
                              <Badge colorScheme="red">Overdue by {paymentStatus.days} days</Badge>
                            )}
                            {paymentStatus?.status === 'due-soon' && (
                              <Badge colorScheme="orange">Due in {paymentStatus.days} days</Badge>
                            )}
                          </HStack>
                        );
                      })()}
                    </Box>
                  )}
                </SimpleGrid>

                <Divider />

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Total Purchases
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="green.600">
                      {formatCurrency(selectedVendor.totalPurchases)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Outstanding Amount
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="red.500">
                      {formatCurrency(selectedVendor.outstandingAmount)}
                    </Text>
                  </Box>
                </SimpleGrid>

                <Box>
                  <Text fontSize="sm" color="gray.600">
                    Status
                  </Text>
                  <Badge colorScheme={getStatusColor(selectedVendor.status)} fontSize="lg">
                    {selectedVendor.status}
                  </Badge>
                </Box>

                {selectedVendor.lastPurchaseDate && (
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Last Purchase Date
                    </Text>
                    <Text fontWeight="bold">{selectedVendor.lastPurchaseDate}</Text>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onViewClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Vendor Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Vendor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Vendor Name</FormLabel>
                <Input placeholder="Enter vendor name" />
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

              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input placeholder="+91 XXXXX XXXXX" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="vendor@email.com" />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input placeholder="Full address" />
              </FormControl>

              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl>
                  <FormLabel>GSTIN</FormLabel>
                  <Input placeholder="29XXXXXXXXXXXXX" />
                </FormControl>
                <FormControl>
                  <FormLabel>Payment Terms</FormLabel>
                  <Select>
                    <option value="Cash">Cash</option>
                    <option value="Net 7">Net 7 Days</option>
                    <option value="Net 15">Net 15 Days</option>
                    <option value="Net 30">Net 30 Days</option>
                    <option value="Net 45">Net 45 Days</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select defaultValue="Active">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save Vendor</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Vendors;
