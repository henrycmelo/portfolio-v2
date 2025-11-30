/**
 * COLORS FOUNDATION
 *
 * Color tokens that reference your Chakra theme.
 * These are semantic color names that map to your brand colors.
 *
 * Atomic Design Level: FOUNDATION (primitive tokens)
 *
 * NOTE: Actual color values are defined in src/theme/theme.ts
 * This file provides easy-to-use references.
 */

// ============================================================================
// BRAND COLORS (from theme)
// ============================================================================
export const BRAND_COLORS = {
  // Primary colors
  primary: 'brand.primary',
  secondary: 'brand.secondary',

  // Backgrounds
  bg: 'brand.bg',
  bgSecondary: 'brand.bgSecondary',
  bgTertiary: 'brand.bgTertiary',
  bgButton: 'brand.bgButton',
  bgAccent: 'brand.bgAccent',

  // Text colors
  text: 'brand.text',
  textSecondary: 'brand.textSecondary',
  textMuted: 'brand.textMuted',
  textButton: 'brand.textButton',
  textHover: 'brand.textHover',
  textOnDark: 'brand.textOnDark',

  // Borders & dividers
  border: 'brand.border',
  divider: 'brand.divider',

  // Accent colors
  accent: 'brand.accent',
  accentDark: 'brand.accentDark',
  accentLight: 'brand.accentLight',
  accentMedium: 'brand.accentMedium',

  // Status colors
  success: 'brand.success',
  warning: 'brand.warning',
  error: 'brand.error',

  // Interactive states
  hover: 'brand.hover',
  active: 'brand.active',
  focus: 'brand.focus',

  // Utility
  white: 'brand.white',
} as const;

// ============================================================================
// GRAY SCALE (from theme)
// ============================================================================
export const GRAY_COLORS = {
  50: 'gray.50',
  100: 'gray.100',
  200: 'gray.200',
  300: 'gray.300',
  400: 'gray.400',
  500: 'gray.500',
  600: 'gray.600',
  700: 'gray.700',
  800: 'gray.800',
  900: 'gray.900',
} as const;

// ============================================================================
// SEMANTIC UI COLORS
// Meaningful names for specific UI elements
// ============================================================================
export const UI_COLORS = {
  // Containers
  containerBg: BRAND_COLORS.white,
  containerBorder: BRAND_COLORS.divider,

  // Tables
  tableHeaderBg: BRAND_COLORS.bg,
  tableRowHoverBg: BRAND_COLORS.divider,

  // Forms
  inputBorder: BRAND_COLORS.border,
  inputFocus: BRAND_COLORS.focus,

  // Placeholders
  placeholderBg: GRAY_COLORS[100],
  placeholderText: GRAY_COLORS[500],
  placeholderBorder: GRAY_COLORS[200],

  // Alerts
  infoBg: BRAND_COLORS.accentLight,
  infoText: BRAND_COLORS.accent,
} as const;

// ============================================================================
// MAIN EXPORT
// ============================================================================
export const COLORS = {
  brand: BRAND_COLORS,
  gray: GRAY_COLORS,
  ui: UI_COLORS,
} as const;
