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
import { FiPlus, FiEye, FiTruck, FiMapPin, FiCheckCircle, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { showroomDeliveries as initialDeliveries } from '../../data/mockData';

const ShowroomDelivery = () => {
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
          delivery.deliveryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          delivery.productionOrderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          delivery.toLocation.toLowerCase().includes(searchTerm.toLowerCase())
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

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '-';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Showroom Delivery (Factory to Showroom)
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4} flexWrap="wrap">
            <Input
              placeholder="Search by delivery no, production order, showroom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="350px"
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              maxW="180px"
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
            <Button leftIcon={<FiPlus />} colorScheme="brand" ml="auto">
              Create Transfer Note
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Delivery No</Th>
                  <Th>Production Order</Th>
                  <Th>Delivery Date</Th>
                  <Th>From Factory</Th>
                  <Th>To Showroom</Th>
                  <Th>Driver</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredDeliveries.map((delivery) => (
                  <Tr key={delivery.id}>
                    <Td fontWeight="600">{delivery.deliveryNo}</Td>
                    <Td>{delivery.productionOrderNo}</Td>
                    <Td>{new Date(delivery.deliveryDate).toLocaleDateString('en-IN')}</Td>
                    <Td fontSize="sm">{delivery.fromLocation}</Td>
                    <Td fontSize="sm" fontWeight="500">{delivery.toLocation}</Td>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="500">{delivery.driverName}</Text>
                        <HStack spacing={1}>
                          <Text fontSize="xs" color="gray.600">{delivery.driverPhone}</Text>
                          <IconButton
                            icon={<FaWhatsapp />}
                            size="xs"
                            colorScheme="green"
                            variant="ghost"
                            aria-label="WhatsApp Driver"
                            onClick={() => window.open(`https://wa.me/${delivery.driverPhone.replace(/\s/g, '')}`, '_blank')}
                          />
                        </HStack>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(delivery.status)}>
                        {delivery.status}
                      </Badge>
                      <Progress
                        value={getStatusProgress(delivery.status)}
                        size="xs"
                        colorScheme={getStatusColor(delivery.status)}
                        mt={1}
                      />
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
                        <IconButton
                          icon={<FiTruck />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Track"
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

      {/* View Delivery Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Showroom Delivery Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDelivery && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Delivery Number</Text>
                    <Text fontWeight="600">{selectedDelivery.deliveryNo}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Production Order</Text>
                    <Text fontWeight="600">{selectedDelivery.productionOrderNo}</Text>
                  </Box>
                  <Box gridColumn="span 2">
                    <Text fontSize="sm" color="gray.600">Delivery Date</Text>
                    <Text fontWeight="600">{new Date(selectedDelivery.deliveryDate).toLocaleDateString('en-IN')}</Text>
                  </Box>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>Transfer Route</Text>
                  <HStack spacing={2} align="center">
                    <Badge colorScheme="orange">{selectedDelivery.fromLocation}</Badge>
                    <FiMapPin />
                    <Text fontSize="sm">→</Text>
                    <Badge colorScheme="green">{selectedDelivery.toLocation}</Badge>
                  </HStack>
                </Box>

                <Divider />

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Driver Name</Text>
                    <Text fontWeight="600">{selectedDelivery.driverName}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Driver Phone Number</Text>
                    <HStack spacing={2}>
                      <Text fontWeight="600">{selectedDelivery.driverPhone}</Text>
                      <IconButton
                        icon={<FaWhatsapp />}
                        size="xs"
                        colorScheme="green"
                        variant="ghost"
                        aria-label="WhatsApp Driver"
                        onClick={() => window.open(`https://wa.me/${selectedDelivery.driverPhone.replace(/\s/g, '')}`, '_blank')}
                      />
                    </HStack>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Vehicle Number</Text>
                    <Text fontWeight="600">{selectedDelivery.vehicleNo}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedDelivery.status)}>
                      {selectedDelivery.status}
                    </Badge>
                  </Box>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>Items Being Transferred</Text>
                  <VStack align="stretch" spacing={2}>
                    {selectedDelivery.items.map((item, idx) => (
                      <HStack key={idx} justify="space-between" p={2} bg="gray.50" borderRadius="md">
                        <Text fontSize="sm">{item.productName}</Text>
                        <Badge>Qty: {item.quantity}</Badge>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Departure Time</Text>
                    <Text fontWeight="600">{formatDateTime(selectedDelivery.departureTime)}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Arrived Time</Text>
                    <Text fontWeight="600">{formatDateTime(selectedDelivery.arrivedTime)}</Text>
                  </Box>
                  {selectedDelivery.receivedBy && (
                    <Box gridColumn="span 2">
                      <Text fontSize="sm" color="gray.600">Received By</Text>
                      <Text fontWeight="600">{selectedDelivery.receivedBy}</Text>
                    </Box>
                  )}
                </SimpleGrid>

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
            <Button colorScheme="brand" leftIcon={<FiCheckCircle />}>
              Update Status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ShowroomDelivery;
