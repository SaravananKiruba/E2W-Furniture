import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      primary: '#5F3277',    // Purple - Primary brand color
      secondary: '#E58B2E',  // Orange - Secondary/Accent
      white: '#FFFFFF',      // White
      brown: '#A87C49',      // Brown - Tertiary
      50: '#F5F0F8',
      100: '#E6D9EE',
      200: '#D7C2E3',
      300: '#C8ABD9',
      400: '#9468A8',
      500: '#5F3277',
      600: '#4D2860',
      700: '#3A1E48',
      800: '#271430',
      900: '#140A18',
    },
    accent: {
      50: '#FDF5E9',
      100: '#FAE6C8',
      200: '#F6D6A6',
      300: '#F3C785',
      400: '#EFA757',
      500: '#E58B2E',
      600: '#C47425',
      700: '#92571B',
      800: '#613A12',
      900: '#311D09',
    }
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
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
          },
        },
        outline: {
          borderColor: 'brand.primary',
          color: 'brand.primary',
          _hover: {
            bg: 'brand.50',
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
  },
});

export default theme;
