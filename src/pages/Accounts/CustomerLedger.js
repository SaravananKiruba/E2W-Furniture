import React, { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardBody,
  HStack,
  Input,
  IconButton,
  Badge,
  Text,
} from '@chakra-ui/react';
import { FiEye, FiDownload } from 'react-icons/fi';
import { customerLedger as initialLedger } from '../../data/mockData';

const CustomerLedger = () => {
  const [ledger] = useState(initialLedger);
  const [filteredLedger, setFilteredLedger] = useState(initialLedger);
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    if (searchTerm) {
      const filtered = ledger.filter((entry) =>
        entry.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLedger(filtered);
    } else {
      setFilteredLedger(ledger);
    }
  }, [searchTerm, ledger]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalOrders = filteredLedger.reduce((sum, entry) => sum + entry.totalOrders, 0);
  const totalPaid = filteredLedger.reduce((sum, entry) => sum + entry.totalPaid, 0);
  const totalBalance = filteredLedger.reduce((sum, entry) => sum + entry.balance, 0);

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Customer Ledger
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4} justify="space-between">
            <Input
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="400px"
            />
            <HStack spacing={6} bg="gray.50" px={6} py={3} borderRadius="md">
              <Box textAlign="center">
                <Text fontSize="xs" color="gray.600">Total Orders</Text>
                <Text fontSize="lg" fontWeight="bold" color="brand.primary">
                  {formatCurrency(totalOrders)}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="xs" color="gray.600">Total Received</Text>
                <Text fontSize="lg" fontWeight="bold" color="green.600">
                  {formatCurrency(totalPaid)}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="xs" color="gray.600">Outstanding</Text>
                <Text fontSize="lg" fontWeight="bold" color="orange.600">
                  {formatCurrency(totalBalance)}
                </Text>
              </Box>
            </HStack>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Customer ID</Th>
                  <Th>Customer Name</Th>
                  <Th isNumeric>Total Orders</Th>
                  <Th isNumeric>Total Paid</Th>
                  <Th isNumeric>Balance</Th>
                  <Th>Last Payment</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredLedger.map((entry) => (
                  <Tr key={entry.customerId}>
                    <Td fontWeight="600">#{entry.customerId}</Td>
                    <Td>{entry.customerName}</Td>
                    <Td isNumeric fontWeight="600">{formatCurrency(entry.totalOrders)}</Td>
                    <Td isNumeric color="green.600">{formatCurrency(entry.totalPaid)}</Td>
                    <Td isNumeric fontWeight="600" color={entry.balance > 0 ? 'orange.600' : 'green.600'}>
                      {formatCurrency(entry.balance)}
                    </Td>
                    <Td>{entry.lastPayment}</Td>
                    <Td>
                      <Badge colorScheme={entry.balance === 0 ? 'green' : entry.balance > 50000 ? 'red' : 'orange'}>
                        {entry.balance === 0 ? 'Settled' : entry.balance > 50000 ? 'High Outstanding' : 'Pending'}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          aria-label="View Details"
                        />
                        <IconButton
                          icon={<FiDownload />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Download Statement"
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
    </Box>
  );
};

export default CustomerLedger;
