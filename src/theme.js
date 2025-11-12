import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      primary: '#b84717',    // Burnt Orange - Primary brand color
      secondary: '#d65a2e',  // Lighter Orange - Secondary/Accent
      white: '#FFFFFF',      // White
      brown: '#8b3a0e',      // Dark Brown - Tertiary
      50: '#fef5f1',
      100: '#fde4d9',
      200: '#fbc9b3',
      300: '#f9ae8d',
      400: '#d97e47',
      500: '#b84717',
      600: '#9a3c13',
      700: '#7c300f',
      800: '#5e240b',
      900: '#401807',
    },
    accent: {
      50: '#fff8f1',
      100: '#ffead4',
      200: '#ffd6aa',
      300: '#ffc280',
      400: '#ff9f42',
      500: '#d65a2e',
      600: '#b84a26',
      700: '#9a3a1e',
      800: '#7c2a16',
      900: '#5e1a0e',
    }
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  breakpoints: {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },
  styles: {
    global: {
      body: {
        bg: 'transparent',
        color: 'gray.100',
        backgroundImage: 'url(/src/assets/Backround.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      },
      '*': {
        boxSizing: 'border-box',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        },
        outline: {
          borderColor: 'brand.primary',
          color: 'brand.primary',
          _hover: {
            bg: 'brand.primary',
            color: 'white',
          },
        },
        secondary: {
          bg: 'accent.500',
          color: 'white',
          _hover: {
            bg: 'accent.600',
          },
        },
      },
    },
    Badge: {
      variants: {
        primary: {
          bg: 'brand.primary',
          color: 'white',
        },
        secondary: {
          bg: 'accent.500',
          color: 'white',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'lg',
          boxShadow: 'xl',
          border: '1px solid',
          borderColor: 'rgba(184, 71, 23, 0.1)',
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

export default theme;
