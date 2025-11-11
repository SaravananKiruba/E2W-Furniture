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
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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

const NavItem = ({ icon, children, to, isSubmenu = false, onClick }) => {
  return (
    <Box
      as={NavLink}
      to={to}
      onClick={onClick}
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

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const sidebarContent = (
    <>
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
        <NavItem icon={FiHome} to="/" onClick={isMobile ? onClose : undefined}>
          Dashboard
        </NavItem>

        {/* Customers */}
        <NavItem icon={FiUsers} to="/customers" onClick={isMobile ? onClose : undefined}>
          Customers
        </NavItem>

        <Divider my={2} />

        {/* Sales Module */}
        <NavGroup icon={FiShoppingCart} label="Sales">
          <NavItem icon={FiClipboard} to="/sales/inquiries" isSubmenu onClick={isMobile ? onClose : undefined}>
            Inquiries
          </NavItem>
          <NavItem icon={FiFileText} to="/sales/quotations" isSubmenu onClick={isMobile ? onClose : undefined}>
            Quotations
          </NavItem>
          <NavItem icon={FiFile} to="/sales/orders" isSubmenu onClick={isMobile ? onClose : undefined}>
            Sales Orders
          </NavItem>
          <NavItem icon={FiFile} to="/sales/invoices" isSubmenu onClick={isMobile ? onClose : undefined}>
            Invoices
          </NavItem>
        </NavGroup>

        {/* Accounts Module */}
        <NavGroup icon={FiDollarSign} label="Accounts">
          <NavItem icon={FiCreditCard} to="/accounts/payments" isSubmenu onClick={isMobile ? onClose : undefined}>
            Payments
          </NavItem>
          <NavItem icon={FiBook} to="/accounts/ledger" isSubmenu onClick={isMobile ? onClose : undefined}>
            Customer Ledger
          </NavItem>
          <NavItem icon={FiBarChart2} to="/accounts/reports" isSubmenu onClick={isMobile ? onClose : undefined}>
            Reports
          </NavItem>
        </NavGroup>

        {/* Stock Module */}
        <NavGroup icon={FiPackage} label="Stock">
          <NavItem icon={FiBox} to="/stock/products" isSubmenu onClick={isMobile ? onClose : undefined}>
            Products
          </NavItem>
        </NavGroup>

        {/* Delivery Module */}
        <NavGroup icon={FiTruck} label="Delivery">
          <NavItem icon={FiFileText} to="/delivery/notes" isSubmenu onClick={isMobile ? onClose : undefined}>
            Delivery Notes
          </NavItem>
        </NavGroup>
      </VStack>
    </>
  );

  // Mobile: Render as Drawer
  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerBody p={0} overflowY="auto">
            {sidebarContent}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Render as fixed sidebar
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
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
