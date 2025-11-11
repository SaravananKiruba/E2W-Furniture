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
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiEdit, FiPhone, FiMail } from 'react-icons/fi';
import { customers as initialCustomers } from '../data/mockData';

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    gstin: '',
    type: 'Retail',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

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
    };
    setCustomers([...customers, newCustomer]);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      gstin: '',
      type: 'Retail',
    });
    onClose();
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    onViewOpen();
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Customer Management
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="400px"
            />
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              maxW="200px"
            >
              <option value="All">All Types</option>
              <option value="Retail">Retail</option>
              <option value="Corporate">Corporate</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              onClick={onOpen}
              ml="auto"
            >
              Add Customer
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>Email</Th>
                  <Th>GSTIN</Th>
                  <Th>Type</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCustomers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td fontWeight="600">#{customer.id}</Td>
                    <Td fontWeight="600">{customer.name}</Td>
                    <Td>
                      <HStack>
                        <FiPhone size="14" />
                        <Text>{customer.phone}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack>
                        <FiMail size="14" />
                        <Text fontSize="sm">{customer.email}</Text>
                      </HStack>
                    </Td>
                    <Td fontSize="sm">{customer.gstin || '-'}</Td>
                    <Td>
                      <Badge colorScheme={customer.type === 'Corporate' ? 'purple' : 'blue'}>
                        {customer.type}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(customer)}
                          aria-label="View"
                        />
                        <IconButton
                          icon={<FiEdit />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={4}>
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
      <Modal isOpen={isViewOpen} onClose={onViewClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCustomer && (
              <SimpleGrid columns={2} spacing={4}>
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
                  <Text fontSize="sm" color="gray.600">Phone</Text>
                  <HStack>
                    <FiPhone />
                    <Text fontWeight="600">{selectedCustomer.phone}</Text>
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Email</Text>
                  <HStack>
                    <FiMail />
                    <Text fontWeight="600" fontSize="sm">{selectedCustomer.email}</Text>
                  </HStack>
                </Box>
                <Box gridColumn="span 2">
                  <Text fontSize="sm" color="gray.600">Address</Text>
                  <Text>{selectedCustomer.address}</Text>
                </Box>
                <Box gridColumn="span 2">
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
            <Button colorScheme="brand">Edit Details</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Customers;
