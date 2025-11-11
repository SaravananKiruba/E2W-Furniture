import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar isOpen={isOpen} onToggle={onToggle} />
      <Flex direction="column" flex="1" overflow="hidden">
        <Header onToggle={onToggle} />
        <Box flex="1" overflow="auto" bg="gray.50" p={6}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
