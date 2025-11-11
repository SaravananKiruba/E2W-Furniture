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
  Progress,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiTruck, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { deliveryNotes as initialDeliveries } from '../../data/mockData';

const DeliveryNotes = () => {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [filteredDeliveries, setFilteredDeliveries] = useState(initialDeliveries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = deliveries;

    if (searchTerm) {
      filtered = filtered.filter(
        (delivery) =>
          delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          delivery.deliveryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          delivery.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((delivery) => delivery.status === statusFilter);
    }

    setFilteredDeliveries(filtered);
  }, [searchTerm, statusFilter, deliveries]);

  const handleView = (delivery) => {
    setSelectedDelivery(delivery);
    onViewOpen();
  };

  const handleUpdateStatus = (deliveryId, newStatus) => {
    setDeliveries(
      deliveries.map((d) =>
        d.id === deliveryId ? { ...d, status: newStatus } : d
      )
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      'Scheduled': 'purple',
      'In Transit': 'blue',
      'Delivered': 'green',
      'Cancelled': 'red',
    };
    return colors[status] || 'gray';
  };

  const getStatusProgress = (status) => {
    const progress = {
      'Scheduled': 25,
      'In Transit': 60,
      'Delivered': 100,
      'Cancelled': 0,
    };
    return progress[status] || 0;
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Delivery Management
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Search by delivery no, order or customer..."
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
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              ml="auto"
            >
              Schedule Delivery
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Delivery No</Th>
                  <Th>Order No</Th>
                  <Th>Customer</Th>
                  <Th>Delivery Date</Th>
                  <Th>Vehicle</Th>
                  <Th>Driver</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredDeliveries.map((delivery) => (
                  <Tr key={delivery.id}>
                    <Td fontWeight="600">{delivery.deliveryNo}</Td>
                    <Td>{delivery.orderNo}</Td>
                    <Td>{delivery.customerName}</Td>
                    <Td>{new Date(delivery.deliveryDate).toLocaleDateString('en-IN')}</Td>
                    <Td fontSize="sm">{delivery.vehicleNo}</Td>
                    <Td fontSize="sm">{delivery.driverName}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(delivery.status)}>
                        {delivery.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(delivery)}
                          aria-label="View"
                        />
                        {delivery.status === 'Scheduled' && (
                          <IconButton
                            icon={<FiTruck />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => handleUpdateStatus(delivery.id, 'In Transit')}
                            aria-label="Mark In Transit"
                          />
                        )}
                        {delivery.status === 'In Transit' && (
                          <IconButton
                            icon={<FiCheckCircle />}
                            size="sm"
                            variant="ghost"
                            colorScheme="green"
                            onClick={() => handleUpdateStatus(delivery.id, 'Delivered')}
                            aria-label="Mark Delivered"
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

      {/* View Delivery Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="blue.500" color="white">
            Delivery Note Details
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            {selectedDelivery && (
              <VStack align="stretch" spacing={4}>
                {/* Status Progress */}
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="600">Delivery Status</Text>
                    <Badge colorScheme={getStatusColor(selectedDelivery.status)} fontSize="md">
                      {selectedDelivery.status}
                    </Badge>
                  </HStack>
                  <Progress
                    value={getStatusProgress(selectedDelivery.status)}
                    colorScheme={getStatusColor(selectedDelivery.status)}
                    size="sm"
                    borderRadius="full"
                  />
                </Box>

                <Divider />

                {/* Delivery Info */}
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Delivery No</Text>
                    <Text fontWeight="600">{selectedDelivery.deliveryNo}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Order No</Text>
                    <Text fontWeight="600">{selectedDelivery.orderNo}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Customer</Text>
                    <Text fontWeight="600">{selectedDelivery.customerName}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Delivery Date</Text>
                    <Text fontWeight="600">
                      {new Date(selectedDelivery.deliveryDate).toLocaleDateString('en-IN')}
                    </Text>
                  </Box>
                </SimpleGrid>

                <Divider />

                {/* Delivery Address */}
                <Box>
                  <HStack mb={2}>
                    <FiMapPin />
                    <Text fontWeight="600">Delivery Address</Text>
                  </HStack>
                  <Text pl={6}>{selectedDelivery.address}</Text>
                </Box>

                <Divider />

                {/* Items */}
                <Box>
                  <Text fontWeight="600" mb={2}>Items to Deliver</Text>
                  <Table size="sm" variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Product</Th>
                        <Th isNumeric>Quantity</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedDelivery.items.map((item, idx) => (
                        <Tr key={idx}>
                          <Td>{item.productName}</Td>
                          <Td isNumeric>{item.quantity}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>

                <Divider />

                {/* Vehicle & Driver Info */}
                <Box bg="blue.50" p={4} borderRadius="md">
                  <SimpleGrid columns={2} spacing={4}>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Vehicle No</Text>
                      <Text fontWeight="600">{selectedDelivery.vehicleNo}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Driver Name</Text>
                      <Text fontWeight="600">{selectedDelivery.driverName}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">Driver Phone</Text>
                      <Text fontWeight="600">{selectedDelivery.driverPhone}</Text>
                    </Box>
                    {selectedDelivery.gateOutTime && (
                      <Box>
                        <Text fontSize="sm" color="gray.600">Gate Out Time</Text>
                        <Text fontWeight="600">
                          {new Date(selectedDelivery.gateOutTime).toLocaleString('en-IN')}
                        </Text>
                      </Box>
                    )}
                  </SimpleGrid>
                </Box>

                {/* Delivery Confirmation */}
                {selectedDelivery.status === 'Delivered' && (
                  <Box bg="green.50" p={4} borderRadius="md">
                    <HStack mb={2}>
                      <FiCheckCircle color="green" />
                      <Text fontWeight="600" color="green.700">Delivery Confirmed</Text>
                    </HStack>
                    <SimpleGrid columns={2} spacing={2}>
                      <Box>
                        <Text fontSize="sm" color="gray.600">Delivered Time</Text>
                        <Text fontWeight="600">
                          {new Date(selectedDelivery.deliveredTime).toLocaleString('en-IN')}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.600">Received By</Text>
                        <Text fontWeight="600">{selectedDelivery.receivedBy}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                )}

                {/* Remarks */}
                {selectedDelivery.remarks && (
                  <>
                    <Divider />
                    <Box>
                      <Text fontSize="sm" color="gray.600">Remarks</Text>
                      <Text>{selectedDelivery.remarks}</Text>
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
            {selectedDelivery && selectedDelivery.status !== 'Delivered' && (
              <Button colorScheme="blue">Update Status</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeliveryNotes;
