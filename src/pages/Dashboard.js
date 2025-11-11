import React from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatArrow,
  Icon,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';
import {
  FiShoppingCart,
  FiDollarSign,
  FiTruck,
  FiAlertCircle,
} from 'react-icons/fi';
import { dashboardStats, salesOrders, deliveryNotes } from '../data/mockData';

const StatCard = ({ title, value, icon, change, changeType = 'increase', color }) => {
  return (
    <Card>
      <CardBody>
        <Flex justify="space-between">
          <Box>
            <Text fontSize="sm" color="gray.600" mb={1}>
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color={color}>
              {value}
            </Text>
            {change && (
              <Stat>
                <Flex align="center" mt={2}>
                  <StatArrow type={changeType} />
                  <Text fontSize="sm" color={changeType === 'increase' ? 'green.500' : 'red.500'}>
                    {change}
                  </Text>
                </Flex>
              </Stat>
            )}
          </Box>
          <Flex
            align="center"
            justify="center"
            w="50px"
            h="50px"
            borderRadius="lg"
            bg={`${color}.50`}
          >
            <Icon as={icon} fontSize="24px" color={color} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

const Dashboard = () => {
  const recentOrders = salesOrders.slice(0, 5);
  const recentDeliveries = deliveryNotes.slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'green',
      'Approved': 'blue',
      'Pending Approval': 'orange',
      'Delivered': 'green',
      'In Transit': 'blue',
      'Scheduled': 'purple',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Dashboard
      </Heading>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          title="Total Sales (This Month)"
          value={formatCurrency(dashboardStats.totalSales)}
          icon={FiDollarSign}
          change="12% vs last month"
          changeType="increase"
          color="brand.primary"
        />
        <StatCard
          title="Active Orders"
          value={dashboardStats.totalOrders}
          icon={FiShoppingCart}
          change="3 new today"
          changeType="increase"
          color="accent.500"
        />
        <StatCard
          title="Pending Deliveries"
          value={dashboardStats.pendingDeliveries}
          icon={FiTruck}
          color="blue.500"
        />
        <StatCard
          title="Outstanding Amount"
          value={formatCurrency(dashboardStats.outstandingAmount)}
          icon={FiAlertCircle}
          change="2 overdue"
          changeType="decrease"
          color="orange.500"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <Heading size="md" color="brand.primary">
              Recent Sales Orders
            </Heading>
          </CardHeader>
          <CardBody>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Order No</Th>
                    <Th>Customer</Th>
                    <Th isNumeric>Amount</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentOrders.map((order) => (
                    <Tr key={order.id}>
                      <Td fontWeight="600">{order.orderNo}</Td>
                      <Td>{order.customerName}</Td>
                      <Td isNumeric>{formatCurrency(order.total)}</Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </Card>

        {/* Recent Deliveries */}
        <Card>
          <CardHeader>
            <Heading size="md" color="brand.primary">
              Delivery Status
            </Heading>
          </CardHeader>
          <CardBody>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Delivery No</Th>
                    <Th>Customer</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentDeliveries.map((delivery) => (
                    <Tr key={delivery.id}>
                      <Td fontWeight="600">{delivery.deliveryNo}</Td>
                      <Td>{delivery.customerName}</Td>
                      <Td>{new Date(delivery.deliveryDate).toLocaleDateString('en-IN')}</Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
