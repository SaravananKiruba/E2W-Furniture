import React from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  Collapse,
  useDisclosure,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiTruck,
  FiFileText,
  FiClipboard,
  FiFile,
  FiCreditCard,
  FiBook,
  FiBarChart2,
  FiBox,
  FiChevronDown,
  FiChevronRight,
} from 'react-icons/fi';

const NavItem = ({ icon, children, to, isSubmenu = false }) => {
  return (
    <Box
      as={NavLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _activeLink={{
        bg: 'brand.primary',
        color: 'white',
      }}
    >
      {({ isActive }) => (
        <Flex
          align="center"
          px={isSubmenu ? 8 : 4}
          py={3}
          cursor="pointer"
          color={isActive ? 'white' : 'gray.600'}
          bg={isActive ? 'brand.primary' : 'transparent'}
          _hover={{
            bg: isActive ? 'brand.600' : 'gray.100',
            color: isActive ? 'white' : 'brand.primary',
          }}
          role="group"
          transition="all 0.2s"
          borderRadius="md"
          mx={2}
        >
          <Icon as={icon} mr={3} fontSize="18px" />
          <Text fontSize="sm" fontWeight="500">
            {children}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

const NavGroup = ({ icon, label, children }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box>
      <Flex
        align="center"
        px={4}
        py={3}
        cursor="pointer"
        color="gray.700"
        _hover={{ bg: 'gray.100' }}
        onClick={onToggle}
        borderRadius="md"
        mx={2}
        fontWeight="600"
      >
        <Icon as={icon} mr={3} fontSize="18px" />
        <Text fontSize="sm" flex="1">
          {label}
        </Text>
        <Icon as={isOpen ? FiChevronDown : FiChevronRight} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="stretch" spacing={0} mt={1}>
          {children}
        </VStack>
      </Collapse>
    </Box>
  );
};

const Sidebar = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <Box
      w="280px"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      overflowY="auto"
      boxShadow="sm"
    >
      {/* Logo */}
      <Flex
        h="16"
        alignItems="center"
        justifyContent="center"
        bg="brand.primary"
        color="white"
      >
        <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
          Saakar Furniture
        </Text>
      </Flex>

      <VStack align="stretch" spacing={1} py={4}>
        {/* Dashboard */}
        <NavItem icon={FiHome} to="/">
          Dashboard
        </NavItem>

        {/* Customers */}
        <NavItem icon={FiUsers} to="/customers">
          Customers
        </NavItem>

        <Divider my={2} />

        {/* Sales Module */}
        <NavGroup icon={FiShoppingCart} label="Sales">
          <NavItem icon={FiClipboard} to="/sales/inquiries" isSubmenu>
            Inquiries
          </NavItem>
          <NavItem icon={FiFileText} to="/sales/quotations" isSubmenu>
            Quotations
          </NavItem>
          <NavItem icon={FiFile} to="/sales/orders" isSubmenu>
            Sales Orders
          </NavItem>
          <NavItem icon={FiFile} to="/sales/invoices" isSubmenu>
            Invoices
          </NavItem>
        </NavGroup>

        {/* Accounts Module */}
        <NavGroup icon={FiDollarSign} label="Accounts">
          <NavItem icon={FiCreditCard} to="/accounts/payments" isSubmenu>
            Payments
          </NavItem>
          <NavItem icon={FiBook} to="/accounts/ledger" isSubmenu>
            Customer Ledger
          </NavItem>
          <NavItem icon={FiBarChart2} to="/accounts/reports" isSubmenu>
            Reports
          </NavItem>
        </NavGroup>

        {/* Stock Module */}
        <NavGroup icon={FiPackage} label="Stock">
          <NavItem icon={FiBox} to="/stock/products" isSubmenu>
            Products
          </NavItem>
        </NavGroup>

        {/* Delivery Module */}
        <NavGroup icon={FiTruck} label="Delivery">
          <NavItem icon={FiFileText} to="/delivery/notes" isSubmenu>
            Delivery Notes
          </NavItem>
        </NavGroup>
      </VStack>
    </Box>
  );
};

export default Sidebar;
