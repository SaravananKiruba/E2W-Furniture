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
  useToast,
  Tooltip,
  Button,
} from '@chakra-ui/react';
import { FiEye, FiDownload, FiSend, FiFileText, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { customerLedger as initialLedger, customers } from '../../data/mockData';

const CustomerLedger = () => {
  const [ledger] = useState(initialLedger);
  const [filteredLedger, setFilteredLedger] = useState(initialLedger);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

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

  const handleDownloadPDF = (entry) => {
    // Simulate PDF generation
    toast({
      title: 'Downloading Statement',
      description: `Generating PDF statement for ${entry.customerName}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    
    setTimeout(() => {
      toast({
        title: 'Download Complete',
        description: 'Statement PDF downloaded successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }, 1500);
  };

  const handleSendPaymentFollowup = (entry) => {
    const customer = customers.find((c) => c.id === entry.customerId);
    if (!customer) {
      toast({
        title: 'Error',
        description: 'Customer contact not found',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const message = `Dear ${entry.customerName},\n\nThis is a payment reminder from E2W Furniture.\n\nOutstanding Amount: ${formatCurrency(entry.balance)}\nTotal Orders: ${formatCurrency(entry.totalOrders)}\nAmount Paid: ${formatCurrency(entry.totalPaid)}\n\nKindly make the payment at your earliest convenience.\n\nThank you!\nE2W Furniture Team`;
    
    const whatsappUrl = `https://wa.me/${customer.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: 'Payment Followup Sent',
      description: `WhatsApp followup sent to ${entry.customerName}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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
                      <HStack spacing={1}>
                        <Tooltip label="View Details">
                          <IconButton
                            icon={<FiEye />}
                            size="sm"
                            variant="ghost"
                            aria-label="View Details"
                          />
                        </Tooltip>
                        <Tooltip label="Send via WhatsApp">
                          <IconButton
                            icon={<FaWhatsapp />}
                            size="sm"
                            variant="ghost"
                            colorScheme="green"
                            onClick={() => {
                              const customer = customers.find(c => c.id === entry.customerId);
                              if (customer) {
                                const message = `Hello ${customer.name}, this is a payment reminder. Your outstanding balance is ₹${entry.balance.toLocaleString('en-IN')}. Please clear the dues at the earliest. Thank you!`;
                                window.open(`https://wa.me/${customer.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`);
                              }
                            }}
                            aria-label="Send WhatsApp"
                          />
                        </Tooltip>
                        <Tooltip label="Send Email">
                          <IconButton
                            icon={<FiMail />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => {
                              const customer = customers.find(c => c.id === entry.customerId);
                              if (customer) {
                                window.open(`mailto:${customer.email}?subject=Payment Reminder&body=Dear ${customer.name},%0D%0A%0D%0AThis is a reminder about your outstanding balance of ₹${entry.balance.toLocaleString('en-IN')}. Please clear the dues at the earliest.%0D%0A%0D%0AThank you!`);
                              }
                            }}
                            aria-label="Send Email"
                          />
                        </Tooltip>
                        <Tooltip label="Download PDF Statement">
                          <IconButton
                            icon={<FiDownload />}
                            size="sm"
                            variant="ghost"
                            colorScheme="orange"
                            onClick={() => handleDownloadPDF(entry)}
                            aria-label="Download Statement"
                          />
                        </Tooltip>
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
