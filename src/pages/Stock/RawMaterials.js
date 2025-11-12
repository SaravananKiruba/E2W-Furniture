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
  FormControl,
  FormLabel,
  Divider,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiEdit, FiPackage, FiAlertTriangle } from 'react-icons/fi';
import { rawMaterials as initialRawMaterials } from '../../data/mockData';

const RawMaterials = () => {
  const [rawMaterials] = useState(initialRawMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState(initialRawMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockStatusFilter, setStockStatusFilter] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = rawMaterials;

    if (searchTerm) {
      filtered = filtered.filter(
        (material) =>
          material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((material) => material.category === categoryFilter);
    }

    if (stockStatusFilter !== 'All') {
      if (stockStatusFilter === 'Low Stock') {
        filtered = filtered.filter((material) => material.currentStock <= material.minStock);
      } else if (stockStatusFilter === 'In Stock') {
        filtered = filtered.filter((material) => material.currentStock > material.minStock);
      }
    }

    setFilteredMaterials(filtered);
  }, [searchTerm, categoryFilter, stockStatusFilter, rawMaterials]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleView = (material) => {
    setSelectedMaterial(material);
    onViewOpen();
  };

  const getStockStatus = (material) => {
    if (material.currentStock === 0) {
      return { label: 'Out of Stock', color: 'red' };
    } else if (material.currentStock <= material.minStock) {
      return { label: 'Low Stock', color: 'orange' };
    } else if (material.currentStock > material.minStock * 2) {
      return { label: 'Sufficient', color: 'green' };
    } else {
      return { label: 'Normal', color: 'blue' };
    }
  };

  const categories = ['All', 'Wood', 'Fabric', 'Hardware', 'Foam', 'Leather', 'Paint & Finish', 'Accessories'];

  const totalValue = filteredMaterials.reduce(
    (sum, material) => sum + material.currentStock * material.unitPrice,
    0
  );

  const lowStockItems = rawMaterials.filter(
    (material) => material.currentStock <= material.minStock
  ).length;

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg" color="brand.primary">
          Raw Materials & Spares
        </Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onAddOpen}>
          Add Material
        </Button>
      </HStack>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <Card>
          <CardBody>
            <HStack justify="space-between">
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color="gray.600">
                  Total Materials
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {rawMaterials.length}
                </Text>
              </VStack>
              <FiPackage size={32} color="var(--chakra-colors-blue-500)" />
            </HStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <HStack justify="space-between">
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color="gray.600">
                  Low Stock Alerts
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                  {lowStockItems}
                </Text>
              </VStack>
              <FiAlertTriangle size={32} color="var(--chakra-colors-orange-500)" />
            </HStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Total Stock Value
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                {formatCurrency(totalValue)}
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.600">
                Categories
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {categories.length - 1}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Filters */}
      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4} flexWrap="wrap">
            <Input
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="300px"
            />
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              maxW="200px"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Select
              value={stockStatusFilter}
              onChange={(e) => setStockStatusFilter(e.target.value)}
              maxW="200px"
            >
              <option value="All">All Stock Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
            </Select>
          </HStack>

          {/* Materials Table */}
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Material Name</Th>
                  <Th>Category</Th>
                  <Th>Current Stock</Th>
                  <Th>Min Stock</Th>
                  <Th>Unit</Th>
                  <Th>Unit Price</Th>
                  <Th>Stock Value</Th>
                  <Th>Status</Th>
                  <Th>Supplier</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredMaterials.map((material) => {
                  const status = getStockStatus(material);
                  return (
                    <Tr key={material.id}>
                      <Td fontWeight="medium">{material.code}</Td>
                      <Td>{material.name}</Td>
                      <Td>{material.category}</Td>
                      <Td>
                        <Text
                          fontWeight="bold"
                          color={
                            material.currentStock <= material.minStock
                              ? 'red.500'
                              : 'green.600'
                          }
                        >
                          {material.currentStock}
                        </Text>
                      </Td>
                      <Td>{material.minStock}</Td>
                      <Td>{material.unit}</Td>
                      <Td>{formatCurrency(material.unitPrice)}</Td>
                      <Td fontWeight="medium">
                        {formatCurrency(material.currentStock * material.unitPrice)}
                      </Td>
                      <Td>
                        <Badge colorScheme={status.color}>{status.label}</Badge>
                      </Td>
                      <Td>{material.supplier}</Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            icon={<FiEye />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => handleView(material)}
                          />
                          <IconButton
                            icon={<FiEdit />}
                            size="sm"
                            variant="ghost"
                            colorScheme="green"
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* View Material Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Material Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedMaterial && (
              <VStack align="stretch" spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Material Code
                    </Text>
                    <Text fontWeight="bold">{selectedMaterial.code}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Category
                    </Text>
                    <Text fontWeight="bold">{selectedMaterial.category}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Material Name
                    </Text>
                    <Text fontWeight="bold">{selectedMaterial.name}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Unit
                    </Text>
                    <Text fontWeight="bold">{selectedMaterial.unit}</Text>
                  </Box>
                </SimpleGrid>

                <Divider />

                <SimpleGrid columns={3} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Current Stock
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="green.600">
                      {selectedMaterial.currentStock} {selectedMaterial.unit}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Minimum Stock
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                      {selectedMaterial.minStock} {selectedMaterial.unit}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Status
                    </Text>
                    <Badge colorScheme={getStockStatus(selectedMaterial).color} fontSize="md">
                      {getStockStatus(selectedMaterial).label}
                    </Badge>
                  </Box>
                </SimpleGrid>

                <Divider />

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Unit Price
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      {formatCurrency(selectedMaterial.unitPrice)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Total Stock Value
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="green.600">
                      {formatCurrency(
                        selectedMaterial.currentStock * selectedMaterial.unitPrice
                      )}
                    </Text>
                  </Box>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Text fontSize="sm" color="gray.600">
                    Supplier
                  </Text>
                  <Text fontWeight="bold">{selectedMaterial.supplier}</Text>
                </Box>

                {selectedMaterial.location && (
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Storage Location
                    </Text>
                    <Text fontWeight="bold">{selectedMaterial.location}</Text>
                  </Box>
                )}

                {selectedMaterial.lastPurchaseDate && (
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Last Purchase Date
                    </Text>
                    <Text fontWeight="bold">{selectedMaterial.lastPurchaseDate}</Text>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onViewClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Material Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Material Code</FormLabel>
                  <Input placeholder="e.g., RM-WOOD-001" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select placeholder="Select category">
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Material Name</FormLabel>
                <Input placeholder="e.g., Teak Wood Plank" />
              </FormControl>

              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Unit</FormLabel>
                  <Select placeholder="Select unit">
                    <option value="Sq Ft">Sq Ft</option>
                    <option value="Meter">Meter</option>
                    <option value="Kg">Kg</option>
                    <option value="Piece">Piece</option>
                    <option value="Liter">Liter</option>
                    <option value="Box">Box</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Unit Price (₹)</FormLabel>
                  <Input type="number" placeholder="0.00" />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>Current Stock</FormLabel>
                  <Input type="number" placeholder="0" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Minimum Stock Level</FormLabel>
                  <Input type="number" placeholder="0" />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Supplier</FormLabel>
                <Input placeholder="Supplier name" />
              </FormControl>

              <FormControl>
                <FormLabel>Storage Location</FormLabel>
                <Input placeholder="e.g., Warehouse A, Rack 12" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save Material</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RawMaterials;
