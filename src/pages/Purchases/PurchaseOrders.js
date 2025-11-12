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
import { FiPlus, FiEye, FiEdit, FiPackage, FiCheck, FiX } from 'react-icons/fi';
import { purchaseOrders as initialPurchaseOrders } from '../../data/mockData';

const PurchaseOrders = () => {
  const [purchaseOrders] = useState(initialPurchaseOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [vendorFilter, setVendorFilter] = useState('All');
  const [selectedPO, setSelectedPO] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = purchaseOrders;

    if (searchTerm) {
      filtered = filtered.filter(
        (po) =>
          po.poNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          po.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((po) => po.status === statusFilter);
    }

    if (vendorFilter !== 'All') {
      filtered = filtered.filter((po) => po.vendorName === vendorFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, vendorFilter, purchaseOrders]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleView = (po) => {
    setSelectedPO(po);
    onViewOpen();
  };

  const getStatusColor = (status) => {
    const colors = {
      Draft: 'gray',
      Sent: 'blue',
      Confirmed: 'green',
      'Partially Received': 'orange',
      Received: 'purple',
      Cancelled: 'red',
    };
    return colors[status] || 'gray';
  };

  const uniqueVendors = ['All', ...new Set(purchaseOrders.map((po) => po.vendorName))];

  const totalPOValue = filteredOrders.reduce((sum, po) => sum + po.total, 0);
  const pendingPOs = purchaseOrders.filter(
    (po) => po.status === 'Sent' || po.status === 'Confirmed'
  ).length;

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg" color="brand.primary">
          Purchase Orders
        </Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          Create Purchase Order
        </Button>
      </HStack>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Total POs
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {purchaseOrders.length}
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Pending POs
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                {pendingPOs}
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Filtered PO Value
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                {formatCurrency(totalPOValue)}
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
              <Text fontSize="2xl" fontWeight="bold">
                {uniqueVendors.length - 1}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Filters and Table */}
      <Card>
        <CardBody>
          <HStack spacing={4} mb={4} flexWrap="wrap">
            <Input
              placeholder="Search by PO number or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="300px"
            />
            <Select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              maxW="200px"
            >
              {uniqueVendors.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </Select>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              maxW="180px"
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Partially Received">Partially Received</option>
              <option value="Received">Received</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>PO Number</Th>
                  <Th>Date</Th>
                  <Th>Vendor</Th>
                  <Th>Items</Th>
                  <Th isNumeric>Total Amount</Th>
                  <Th>Expected Delivery</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredOrders.map((po) => (
                  <Tr key={po.id}>
                    <Td fontWeight="600">{po.poNo}</Td>
                    <Td>{po.date}</Td>
                    <Td>{po.vendorName}</Td>
                    <Td>
                      <Badge colorScheme="blue">{po.items.length} items</Badge>
                    </Td>
                    <Td isNumeric fontWeight="600" color="brand.primary">
                      {formatCurrency(po.total)}
                    </Td>
                    <Td>{po.expectedDelivery}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(po.status)}>{po.status}</Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => handleView(po)}
                        />
                        <IconButton
                          icon={<FiEdit />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                        />
                        {po.status === 'Confirmed' && (
                          <IconButton
                            icon={<FiPackage />}
                            size="sm"
                            variant="ghost"
                            colorScheme="purple"
                            title="Mark as Received"
                          />
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* View PO Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Purchase Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPO && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      PO Number
                    </Text>
                    <Text fontWeight="bold" fontSize="lg">
                      {selectedPO.poNo}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Status
                    </Text>
                    <Badge colorScheme={getStatusColor(selectedPO.status)} fontSize="md">
                      {selectedPO.status}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Date
                    </Text>
                    <Text fontWeight="bold">{selectedPO.date}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Expected Delivery
                    </Text>
                    <Text fontWeight="bold">{selectedPO.expectedDelivery}</Text>
                  </Box>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Text fontSize="sm" color="gray.600">
                    Vendor
                  </Text>
                  <Text fontWeight="bold" fontSize="lg">
                    {selectedPO.vendorName}
                  </Text>
                </Box>

                <Divider />

                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Items
                  </Text>
                  <Table size="sm" variant="simple">
                    <Thead bg="gray.50">
                      <Tr>
                        <Th>Material</Th>
                        <Th isNumeric>Quantity</Th>
                        <Th>Unit</Th>
                        <Th isNumeric>Rate</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedPO.items.map((item, index) => (
                        <Tr key={index}>
                          <Td>{item.materialName}</Td>
                          <Td isNumeric fontWeight="600">
                            {item.quantity}
                          </Td>
                          <Td>{item.unit}</Td>
                          <Td isNumeric>{formatCurrency(item.rate)}</Td>
                          <Td isNumeric fontWeight="600">
                            {formatCurrency(item.quantity * item.rate)}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>

                <Divider />

                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text>Subtotal:</Text>
                    <Text fontWeight="600">{formatCurrency(selectedPO.subtotal)}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>GST ({selectedPO.gstPercent}%):</Text>
                    <Text fontWeight="600">{formatCurrency(selectedPO.gst)}</Text>
                  </HStack>
                  <HStack justify="space-between" fontSize="lg">
                    <Text fontWeight="bold">Total:</Text>
                    <Text fontWeight="bold" color="brand.primary">
                      {formatCurrency(selectedPO.total)}
                    </Text>
                  </HStack>
                </VStack>

                {selectedPO.remarks && (
                  <>
                    <Divider />
                    <Box>
                      <Text fontSize="sm" color="gray.600">
                        Remarks
                      </Text>
                      <Text>{selectedPO.remarks}</Text>
                    </Box>
                  </>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button colorScheme="blue">Edit PO</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PurchaseOrders;
