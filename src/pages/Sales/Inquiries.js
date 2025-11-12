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
  Textarea,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiEdit, FiSearch } from 'react-icons/fi';
import { inquiries as initialInquiries, customers } from '../../data/mockData';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [filteredInquiries, setFilteredInquiries] = useState(initialInquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    items: '',
    remarks: '',
    assignedTo: 'Ramesh',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  // Filter logic
  React.useEffect(() => {
    let filtered = inquiries;

    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.items.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter);
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, statusFilter, inquiries]);

  const handleSubmit = () => {
    const newInquiry = {
      id: inquiries.length + 1,
      customerId: customers.length + 1,
      customerName: formData.customerName,
      date: new Date().toISOString().split('T')[0],
      items: formData.items,
      status: 'New',
      remarks: formData.remarks,
      assignedTo: formData.assignedTo,
    };
    setInquiries([...inquiries, newInquiry]);
    setFormData({
      customerName: '',
      phone: '',
      items: '',
      remarks: '',
      assignedTo: 'Ramesh',
    });
    onClose();
  };

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    onViewOpen();
  };

  const getStatusColor = (status) => {
    const colors = {
      'New': 'blue',
      'Quoted': 'purple',
      'Follow-up': 'orange',
      'Converted': 'green',
      'Lost': 'red',
    };
    return colors[status] || 'gray';
  };

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Customer Inquiries
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4}>
            <Input
              placeholder="Search by customer or items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<FiSearch />}
              maxW="400px"
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              maxW="200px"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Quoted">Quoted</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              onClick={onOpen}
              ml="auto"
            >
              New Inquiry
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>ID</Th>
                  <Th>Date</Th>
                  <Th>Customer Name</Th>
                  <Th>Contact</Th>
                  <Th>Items of Interest</Th>
                  <Th>Status</Th>
                  <Th>Assigned To</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredInquiries.map((inquiry) => (
                  <Tr key={inquiry.id}>
                    <Td fontWeight="600">#{inquiry.id}</Td>
                    <Td>{inquiry.date}</Td>
                    <Td>{inquiry.customerName}</Td>
                    <Td>
                      <Text fontSize="sm" fontWeight="500">{inquiry.phone || '-'}</Text>
                    </Td>
                    <Td>{inquiry.items}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(inquiry.status)}>
                        {inquiry.status}
                      </Badge>
                    </Td>
                    <Td>{inquiry.assignedTo}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(inquiry)}
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

      {/* New Inquiry Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Customer Inquiry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </FormControl>
            </SimpleGrid>
            <FormControl mt={4} isRequired>
              <FormLabel>Items of Interest</FormLabel>
              <Input
                value={formData.items}
                onChange={(e) =>
                  setFormData({ ...formData, items: e.target.value })
                }
                placeholder="e.g., Sofa, Dining Table"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Remarks</FormLabel>
              <Textarea
                value={formData.remarks}
                onChange={(e) =>
                  setFormData({ ...formData, remarks: e.target.value })
                }
                rows={3}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Assign To</FormLabel>
              <Select
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
              >
                <option value="Ramesh">Ramesh</option>
                <option value="Suresh">Suresh</option>
                <option value="Mahesh">Mahesh</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleSubmit}>
              Save Inquiry
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Inquiry Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inquiry Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedInquiry && (
              <Box>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Inquiry ID
                    </Text>
                    <Text fontWeight="600">#{selectedInquiry.id}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Date
                    </Text>
                    <Text fontWeight="600">{selectedInquiry.date}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Customer Name
                    </Text>
                    <Text fontWeight="600">{selectedInquiry.customerName}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Contact
                    </Text>
                    <Text fontWeight="600">{selectedInquiry.phone || 'Not provided'}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Status
                    </Text>
                    <Badge colorScheme={getStatusColor(selectedInquiry.status)}>
                      {selectedInquiry.status}
                    </Badge>
                  </Box>
                  <Box gridColumn="span 2">
                    <Text fontSize="sm" color="gray.600">
                      Items of Interest
                    </Text>
                    <Text fontWeight="600">{selectedInquiry.items}</Text>
                  </Box>
                  <Box gridColumn="span 2">
                    <Text fontSize="sm" color="gray.600">
                      Remarks
                    </Text>
                    <Text>{selectedInquiry.remarks}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Assigned To
                    </Text>
                    <Text fontWeight="600">{selectedInquiry.assignedTo}</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onViewClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Inquiries;
