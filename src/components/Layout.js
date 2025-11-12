import React from 'react';
import { Box, Flex, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  // On desktop, sidebar is open by default. On mobile, it's closed by default.
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onToggle, onClose } = useDisclosure({ 
    defaultIsOpen: !isMobile 
  });

  return (
    <Flex 
      h="100vh" 
      overflow="hidden"
      bg="#FFFFFF"
    >
      <Sidebar isOpen={isOpen} onToggle={onToggle} onClose={onClose} isMobile={isMobile} />
      <Flex direction="column" flex="1" overflow="hidden">
        <Header onToggle={onToggle} />
        <Box 
          flex="1" 
          overflow="auto" 
          bg="transparent"
          p={{ base: 3, md: 6 }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
