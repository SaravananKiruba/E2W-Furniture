import { extendTheme } from '@chakra-ui/react';
import { BRAND_COLORS, GLASS_EFFECT } from './constants/colors';

const theme = extendTheme({
  colors: {
    brand: {
      primary: BRAND_COLORS.primary,    // Burnt Orange - Primary brand color
      secondary: BRAND_COLORS.secondary,  // Lighter Orange - Secondary/Accent
      white: BRAND_COLORS.white,      // White
      brown: BRAND_COLORS.brown,      // Dark Brown - Tertiary
      50: '#fef5f1',
      100: '#fde4d9',
      200: '#fbc9b3',
      300: '#f9ae8d',
      400: '#d97e47',
      500: BRAND_COLORS.primary,
      600: BRAND_COLORS.primaryHover,
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
      500: BRAND_COLORS.secondary,
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
        bg: '#FFFFFF',
        color: 'gray.800',
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
          bg: GLASS_EFFECT.cardBg,
          borderRadius: 'lg',
          boxShadow: 'md',
          border: '1px solid',
          borderColor: BRAND_COLORS.primaryBorder,
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: GLASS_EFFECT.modalBg,
        },
      },
    },
  },
});

export default theme;
