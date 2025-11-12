import React from 'react';
import { Box, Flex, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';
import backgroundImage from '../assets/Backround.png';

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
      position="relative"
      _before={{
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: -1,
        opacity: 0.3,
      }}
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
