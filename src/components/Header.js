import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';

const Header = ({ onToggle }) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={{ base: 3, md: 6 }}
      py={3}
      bg="rgba(255, 255, 255, 0.95)"
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor="rgba(184, 71, 23, 0.1)"
      boxShadow="lg"
      h="16"
    >
      <HStack spacing={{ base: 2, md: 4 }}>
        <IconButton
          icon={<FiMenu />}
          variant="ghost"
          onClick={onToggle}
          aria-label="Toggle Navigation"
          color="brand.primary"
          _hover={{ bg: 'rgba(184, 71, 23, 0.1)' }}
        />
        <Text 
          fontSize={{ base: 'sm', md: 'lg' }} 
          fontWeight="700" 
          color="brand.primary"
          display={{ base: 'none', sm: 'block' }}
          letterSpacing="tight"
        >
          Saakaar Furniture
        </Text>
        <Text 
          fontSize="sm" 
          fontWeight="700" 
          color="brand.primary"
          display={{ base: 'block', sm: 'none' }}
          letterSpacing="tight"
        >
          Saakaar
        </Text>
      </HStack>

      <HStack spacing={{ base: 2, md: 4 }}>
        {/* Notifications */}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiBell />}
            variant="ghost"
            position="relative"
          >
            <Badge
              colorScheme="red"
              position="absolute"
              top="0"
              right="0"
              fontSize="xs"
              borderRadius="full"
            >
              3
            </Badge>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Box>
                <Text fontWeight="600" fontSize="sm">
                  New Inquiry
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Ananya Das - Wardrobe inquiry
                </Text>
              </Box>
            </MenuItem>
            <MenuItem>
              <Box>
                <Text fontWeight="600" fontSize="sm">
                  Payment Received
                </Text>
                <Text fontSize="xs" color="gray.600">
                  ₹68,000 from Rajesh Kumar
                </Text>
              </Box>
            </MenuItem>
            <MenuItem>
              <Box>
                <Text fontWeight="600" fontSize="sm">
                  Delivery Scheduled
                </Text>
                <Text fontSize="xs" color="gray.600">
                  DN-2025-003 for tomorrow
                </Text>
              </Box>
            </MenuItem>
          </MenuList>
        </Menu>

        {/* User Menu */}
        <Menu>
          <MenuButton>
            <HStack spacing={2}>
              <Avatar size={{ base: 'sm', md: 'sm' }} name="Admin User" bg="brand.primary" />
              <Box textAlign="left" display={{ base: 'none', md: 'block' }}>
                <Text fontSize="sm" fontWeight="600">
                  Admin User
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Administrator
                </Text>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser />}>Profile</MenuItem>
            <MenuItem icon={<FiSettings />}>Settings</MenuItem>
            <MenuItem icon={<FiLogOut />} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
