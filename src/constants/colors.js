// Centralized color constants for the application
// Using this ensures consistency across the app and prevents deployment color issues

export const BRAND_COLORS = {
  primary: '#b84717',      // Burnt Orange - Primary brand color
  secondary: '#d65a2e',    // Lighter Orange - Secondary/Accent
  white: '#FFFFFF',        // White
  brown: '#8b3a0e',        // Dark Brown - Tertiary
  primaryHover: '#9a3c13', // Primary color hover state
  primaryLight: 'rgba(184, 71, 23, 0.1)', // Light background
  primaryLighter: 'rgba(184, 71, 23, 0.05)', // Lighter background
  primaryHoverBg: 'rgba(184, 71, 23, 0.03)', // Hover background
  primaryBorder: 'rgba(184, 71, 23, 0.1)', // Border color
  primaryScrollbar: 'rgba(184, 71, 23, 0.5)', // Scrollbar color
  primaryScrollbarHover: 'rgba(184, 71, 23, 0.7)', // Scrollbar hover color
  primaryAlpha08: 'rgba(184, 71, 23, 0.08)', // For category buttons
};

export const GLASS_EFFECT = {
  cardBg: '#FFFFFF',
  modalBg: '#FFFFFF',
  scrollbarTrack: '#F7FAFC',
};

// CSS Custom Properties mapping
export const CSS_VARIABLES = {
  '--brand-primary': BRAND_COLORS.primary,
  '--brand-secondary': BRAND_COLORS.secondary,
  '--brand-white': BRAND_COLORS.white,
  '--brand-brown': BRAND_COLORS.brown,
  '--brand-primary-hover': BRAND_COLORS.primaryHover,
  '--brand-primary-light': BRAND_COLORS.primaryLight,
  '--brand-primary-lighter': BRAND_COLORS.primaryLighter,
  '--brand-primary-hover-bg': BRAND_COLORS.primaryHoverBg,
  '--brand-primary-border': BRAND_COLORS.primaryBorder,
  '--brand-primary-scrollbar': BRAND_COLORS.primaryScrollbar,
  '--brand-primary-scrollbar-hover': BRAND_COLORS.primaryScrollbarHover,
  '--brand-primary-alpha-08': BRAND_COLORS.primaryAlpha08,
  '--glass-card-bg': GLASS_EFFECT.cardBg,
  '--glass-modal-bg': GLASS_EFFECT.modalBg,
  '--glass-scrollbar-track': GLASS_EFFECT.scrollbarTrack,
};

// Function to apply CSS variables to the document
export const applyCSSVariables = () => {
  const root = document.documentElement;
  Object.entries(CSS_VARIABLES).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
