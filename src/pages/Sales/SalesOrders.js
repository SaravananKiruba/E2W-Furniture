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
import { FiPlus, FiEye, FiCheck, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { salesOrders as initialOrders, customers } from '../../data/mockData';

const SalesOrders = () => {
  const [orders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    onViewOpen();
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending Approval': 'orange',
      'Confirmed': 'green',
      'Approved': 'blue',
      'Invoiced': 'purple',
      'Completed': 'green',
      'Cancelled': 'red',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box>
      <Heading size={{ base: 'md', md: 'lg' }} mb={{ base: 4, md: 6 }} color="brand.primary">
        Sales Orders
      </Heading>

      <Card mb={{ base: 4, md: 6 }}>
        <CardBody>
          <HStack 
            spacing={{ base: 2, md: 4 }} 
            mb={4}
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
          >
            <Input
              placeholder="Search by order no or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW={{ base: '100%', md: '400px' }}
              flex={{ base: '1 1 100%', md: '0 1 auto' }}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
              flex={{ base: '1 1 100%', md: '0 1 auto' }}
            >
              <option value="All">All Status</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Approved">Approved</option>
              <option value="Invoiced">Invoiced</option>
              <option value="Completed">Completed</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              ml={{ base: 0, md: 'auto' }}
              width={{ base: '100%', md: 'auto' }}
              size={{ base: 'md', md: 'md' }}
            >
              New Order
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Order No</Th>
                  <Th>Order Date</Th>
                  <Th>Customer</Th>
                  <Th>Delivery Date</Th>
                  <Th isNumeric>Total Amount</Th>
                  <Th isNumeric>Advance Paid</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredOrders.map((order) => (
                  <Tr key={order.id}>
                    <Td fontWeight="600">{order.orderNo}</Td>
                    <Td>{order.orderDate}</Td>
                    <Td>{order.customerName}</Td>
                    <Td>{order.deliveryDate}</Td>
                    <Td isNumeric fontWeight="600">{formatCurrency(order.total)}</Td>
                    <Td isNumeric color="green.600">{formatCurrency(order.advancePaid)}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={1}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(order)}
                          aria-label="View"
                        />
                        <IconButton
                          icon={<FaWhatsapp />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                          onClick={() => {
                            const customer = customers.find(c => c.id === order.customerId);
                            if (customer) {
                              const message = `Hello ${customer.name}, your order ${order.orderNo} for ₹${order.total.toLocaleString('en-IN')} is confirmed! Delivery scheduled for ${order.deliveryDate}. Thank you for your order!`;
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
                            const customer = customers.find(c => c.id === order.customerId);
                            if (customer) {
                              window.open(`mailto:${customer.email}?subject=Order Confirmation - ${order.orderNo}&body=Dear ${customer.name},%0D%0A%0D%0AYour order ${order.orderNo} for ₹${order.total.toLocaleString('en-IN')} is confirmed!%0D%0ADelivery Date: ${order.deliveryDate}%0D%0A%0D%0AThank you for your order!`);
                            }
                          }}
                          aria-label="Send Email"
                        />
                        {order.status === 'Pending Approval' && (
                          <IconButton
                            icon={<FiCheck />}
                            size="sm"
                            variant="ghost"
                            colorScheme="orange"
                            aria-label="Approve"
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

      {/* View Order Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sales Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Order No</Text>
                    <Text fontWeight="600">{selectedOrder.orderNo}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Order Date</Text>
                    <Text fontWeight="600">{selectedOrder.orderDate}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Customer</Text>
                    <Text fontWeight="600">{selectedOrder.customerName}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Delivery Date</Text>
                    <Text fontWeight="600">{selectedOrder.deliveryDate}</Text>
                  </Box>
                  <Box gridColumn="span 2">
                    <Text fontSize="sm" color="gray.600">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </Box>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Text fontWeight="600" mb={2}>Order Items</Text>
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
                      {selectedOrder.items.map((item, idx) => (
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
                  <Text textAlign="right" fontWeight="600">{formatCurrency(selectedOrder.subtotal)}</Text>
                  <Text>Discount:</Text>
                  <Text textAlign="right" color="red.500">- {formatCurrency(selectedOrder.discount)}</Text>
                  <Text>GST (18%):</Text>
                  <Text textAlign="right">{formatCurrency(selectedOrder.tax)}</Text>
                  <Text fontSize="lg" fontWeight="bold">Total:</Text>
                  <Text textAlign="right" fontSize="lg" fontWeight="bold" color="brand.primary">
                    {formatCurrency(selectedOrder.total)}
                  </Text>
                  <Text fontWeight="600" color="green.600">Advance Paid:</Text>
                  <Text textAlign="right" fontWeight="600" color="green.600">
                    {formatCurrency(selectedOrder.advancePaid)}
                  </Text>
                  <Text fontWeight="600" color="orange.600">Balance Due:</Text>
                  <Text textAlign="right" fontWeight="600" color="orange.600">
                    {formatCurrency(selectedOrder.total - selectedOrder.advancePaid)}
                  </Text>
                </SimpleGrid>

                {selectedOrder.remarks && (
                  <>
                    <Divider />
                    <Box>
                      <Text fontSize="sm" color="gray.600">Remarks</Text>
                      <Text>{selectedOrder.remarks}</Text>
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
            <Button colorScheme="brand">Generate Invoice</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SalesOrders;
