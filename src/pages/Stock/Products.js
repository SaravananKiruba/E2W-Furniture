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
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiEdit, FiPackage } from 'react-icons/fi';
import { products as initialProducts } from '../../data/mockData';

const Products = () => {
  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

  React.useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, statusFilter, products]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    onViewOpen();
  };

  const getStatusColor = (status) => {
    const colors = {
      'Ready': 'green',
      'On Display': 'blue',
      'Reserved': 'orange',
      'Sold': 'red',
      'Out of Stock': 'gray',
    };
    return colors[status] || 'gray';
  };

  const categories = ['All', 'Sofa', 'Bed', 'Dining', 'Wardrobe', 'Chair', 'Table'];

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.primary">
        Product Catalog & Stock
      </Heading>

      <Card mb={6}>
        <CardBody>
          <HStack spacing={4} mb={4} flexWrap="wrap">
            <Input
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="350px"
            />
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              maxW="180px"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </Select>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              maxW="180px"
            >
              <option value="All">All Status</option>
              <option value="Ready">Ready</option>
              <option value="On Display">On Display</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
              <option value="Out of Stock">Out of Stock</option>
            </Select>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              ml="auto"
            >
              Add Product
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>SKU</Th>
                  <Th>Product Name</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Stock</Th>
                  <Th>Location</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredProducts.map((product) => (
                  <Tr key={product.id}>
                    <Td fontWeight="600" fontSize="sm">{product.sku}</Td>
                    <Td>{product.name}</Td>
                    <Td>
                      <Badge colorScheme="purple">{product.category}</Badge>
                    </Td>
                    <Td isNumeric fontWeight="600">{formatCurrency(product.price)}</Td>
                    <Td isNumeric>
                      <Badge 
                        colorScheme={product.stock > 5 ? 'green' : product.stock > 2 ? 'orange' : 'red'}
                      >
                        {product.stock}
                      </Badge>
                    </Td>
                    <Td fontSize="sm">{product.location}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEye />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(product)}
                          aria-label="View"
                        />
                        <IconButton
                          icon={<FiEdit />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Edit"
                        />
                        <IconButton
                          icon={<FiPackage />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                          aria-label="Update Stock"
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

      {/* View Product Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProduct && (
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.600">SKU</Text>
                  <Text fontWeight="600">{selectedProduct.sku}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Category</Text>
                  <Badge colorScheme="purple">{selectedProduct.category}</Badge>
                </Box>
                <Box gridColumn="span 2">
                  <Text fontSize="sm" color="gray.600">Product Name</Text>
                  <Text fontWeight="600" fontSize="lg">{selectedProduct.name}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Price</Text>
                  <Text fontWeight="600" fontSize="xl" color="brand.primary">
                    {formatCurrency(selectedProduct.price)}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Stock Quantity</Text>
                  <Text fontWeight="600" fontSize="xl" 
                    color={selectedProduct.stock > 5 ? 'green.600' : selectedProduct.stock > 2 ? 'orange.600' : 'red.600'}
                  >
                    {selectedProduct.stock} units
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Location</Text>
                  <Text fontWeight="600">{selectedProduct.location}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.600">Status</Text>
                  <Badge colorScheme={getStatusColor(selectedProduct.status)} fontSize="md">
                    {selectedProduct.status}
                  </Badge>
                </Box>
              </SimpleGrid>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onViewClose}>
              Close
            </Button>
            <Button colorScheme="brand">Edit Product</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Products;
