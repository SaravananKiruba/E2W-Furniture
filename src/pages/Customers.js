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
  Textarea,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiEdit, FiPhone, FiMail, FiGift, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { customers as initialCustomers } from '../data/mockData';

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    gstin: '',
    type: 'Retail',
    birthday: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const toast = useToast();

  React.useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'All') {
      filtered = filtered.filter((customer) => customer.type === typeFilter);
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, typeFilter, customers]);

  const handleSubmit = () => {
    const newCustomer = {
      id: customers.length + 1,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      gstin: formData.gstin,
      type: formData.type,
      birthday: formData.birthday,
    };
    setCustomers([...customers, newCustomer]);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      gstin: '',
      type: 'Retail',
      birthday: '',
    });
    onClose();
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    onViewOpen();
  };

  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSendBirthdayWish = () => {
    const selectedCustomersList = customers.filter((c) =>
      selectedCustomers.includes(c.id)
    );
    
    if (selectedCustomersList.length === 0) {
      toast({
        title: 'No customers selected',
        description: 'Please select at least one customer',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulate WhatsApp message sending
    selectedCustomersList.forEach((customer) => {
      const message = `Dear ${customer.name}, Wishing you a very Happy Birthday! 🎉 May this special day bring you joy and happiness. - E2W Furniture Team`;
      const whatsappUrl = `https://wa.me/${customer.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });

    toast({
      title: 'Birthday wishes sent!',
      description: `Sent WhatsApp wishes to ${selectedCustomersList.length} customer(s)`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    setSelectedCustomers([]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <Box>
      <Heading size={{ base: 'md', md: 'lg' }} mb={{ base: 4, md: 6 }} color="brand.primary">
        Customer Management
      </Heading>

      <Card mb={{ base: 4, md: 6 }}>
        <CardBody>
          <HStack 
            spacing={{ base: 2, md: 4 }} 
            mb={4}
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
          >
            <Input
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW={{ base: '100%', md: '400px' }}
              flex={{ base: '1 1 100%', md: '0 1 auto' }}
            />
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              maxW={{ base: '100%', md: '200px' }}
              flex={{ base: '1 1 100%', md: '0 1 auto' }}
            >
              <option value="All">All Types</option>
              <option value="Retail">Retail</option>
              <option value="Corporate">Corporate</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              onClick={onOpen}
              ml={{ base: 0, md: 'auto' }}
              width={{ base: '100%', md: 'auto' }}
              size={{ base: 'md', md: 'md' }}
            >
              Add Customer
            </Button>
          </HStack>

          {selectedCustomers.length > 0 && (
            <HStack spacing={2} mb={4} p={3} bg="blue.50" borderRadius="md">
              <Text fontSize="sm" fontWeight="600">
                {selectedCustomers.length} customer(s) selected
              </Text>
              <Button
                leftIcon={<FiSend />}
                size="sm"
                colorScheme="green"
                onClick={handleSendBirthdayWish}
              >
                Send Birthday Wish via WhatsApp
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedCustomers([])}
              >
                Clear Selection
              </Button>
            </HStack>
          )}

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Select</Th>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Phone Number</Th>
                  <Th>Email</Th>
                  <Th>Birthday</Th>
                  <Th>GSTIN</Th>
                  <Th>Type</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCustomers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td>
                      <Checkbox
                        isChecked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleCheckboxChange(customer.id)}
                        colorScheme="brand"
                      />
                    </Td>
                    <Td fontWeight="600">#{customer.id}</Td>
                    <Td fontWeight="600">{customer.name}</Td>
                    <Td>
                      <Text>{customer.phone}</Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm">{customer.email}</Text>
                    </Td>
                    <Td>
                      <HStack>
                        <FiGift size="14" color="#FF6B6B" />
                        <Text fontSize="sm">{formatDate(customer.birthday)}</Text>
                      </HStack>
                    </Td>
                    <Td fontSize="sm">{customer.gstin || '-'}</Td>
                    <Td>
                      <Badge colorScheme={customer.type === 'Corporate' ? 'purple' : 'blue'}>
                        {customer.type}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={1}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(customer)}
                          aria-label="View"
                        />
                        <IconButton
                          icon={<FaWhatsapp />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                          onClick={() => window.open(`https://wa.me/${customer.phone.replace(/\s/g, '')}`, '_blank')}
                          aria-label="WhatsApp"
                        />
                        <IconButton
                          icon={<FiMail />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => window.open(`mailto:${customer.email}`, '_blank')}
                          aria-label="Email"
                        />
                        <IconButton
                          icon={<FiEdit />}
                          size="sm"
                          variant="ghost"
                          colorScheme="orange"
                          aria-label="Edit"
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

      {/* Add Customer Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: 'xl' }}>
        <ModalOverlay />
        <ModalContent mx={{ base: 0, md: 4 }}>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 XXXXX XXXXX"
                />
              </FormControl>
              <FormControl isRequired gridColumn="span 2">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl gridColumn="span 2">
                <FormLabel>Address</FormLabel>
                <Textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Birthday</FormLabel>
                <Input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>GSTIN (Optional)</FormLabel>
                <Input
                  value={formData.gstin}
                  onChange={(e) =>
                    setFormData({ ...formData, gstin: e.target.value })
                  }
                  placeholder="29XXXXXXXXXXXXX"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Customer Type</FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="Retail">Retail</option>
                  <option value="Corporate">Corporate</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleSubmit}>
              Save Customer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Customer Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size={{ base: 'full', md: 'lg' }}>
        <ModalOverlay />
        <ModalContent mx={{ base: 0, md: 4 }}>
          <ModalHeader>Customer Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCustomer && (
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.600">Customer ID</Text>
                  <Text fontWeight="600">#{selectedCustomer.id}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Type</Text>
                  <Badge colorScheme={selectedCustomer.type === 'Corporate' ? 'purple' : 'blue'}>
                    {selectedCustomer.type}
                  </Badge>
                </Box>
                <Box gridColumn="span 2">
                  <Text fontSize="sm" color="gray.600">Name</Text>
                  <Text fontWeight="600" fontSize="lg">{selectedCustomer.name}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Phone Number</Text>
                  <HStack spacing={2}>
                    <Text fontWeight="600">{selectedCustomer.phone}</Text>
                    <IconButton
                      icon={<FaWhatsapp />}
                      size="xs"
                      colorScheme="green"
                      variant="ghost"
                      aria-label="WhatsApp"
                      onClick={() => window.open(`https://wa.me/${selectedCustomer.phone.replace(/\s/g, '')}`, '_blank')}
                    />
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Email</Text>
                  <HStack spacing={2}>
                    <Text fontWeight="600" fontSize="sm">{selectedCustomer.email}</Text>
                    <IconButton
                      icon={<FiMail />}
                      size="xs"
                      colorScheme="blue"
                      variant="ghost"
                      aria-label="Send Email"
                      onClick={() => window.open(`mailto:${selectedCustomer.email}`, '_blank')}
                    />
                  </HStack>
                </Box>
                <Box gridColumn="span 2">
                  <Text fontSize="sm" color="gray.600">Address</Text>
                  <Text>{selectedCustomer.address}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Birthday</Text>
                  <HStack>
                    <FiGift color="#FF6B6B" />
                    <Text fontWeight="600">{formatDate(selectedCustomer.birthday)}</Text>
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">GSTIN</Text>
                  <Text fontWeight="600">{selectedCustomer.gstin || 'Not provided'}</Text>
                </Box>
              </SimpleGrid>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button 
              leftIcon={<FiSend />} 
              colorScheme="green" 
              mr={3}
              onClick={() => {
                const message = `Dear ${selectedCustomer.name}, Wishing you a very Happy Birthday! 🎉 - E2W Furniture Team`;
                const whatsappUrl = `https://wa.me/${selectedCustomer.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Send Birthday Wish
            </Button>
            <Button colorScheme="brand">Edit Details</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Customers;
