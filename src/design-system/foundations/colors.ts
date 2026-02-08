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

  // Gold-specific tokens
  goldPrimary: 'brand.accent',      // #D4AF37 - primary gold
  goldLight: 'brand.accentLight',   // #F4E5B8 - light gold
  goldDark: 'brand.accentDark',     // #B8960C - dark gold

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
// GOLD GRADIENTS
// ============================================================================
export const GOLD_GRADIENTS = {
  // Gold shimmer effect - subtle gradient for premium feel
  shimmer: 'linear-gradient(135deg, #D4AF37 0%, #F4E5B8 50%, #D4AF37 100%)',
  // Gold shimmer for text/icons
  shimmerText: 'linear-gradient(90deg, #D4AF37 0%, #F4E5B8 50%, #D4AF37 100%)',
  // Subtle gold glow
  glow: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
  // Gold border gradient
  border: 'linear-gradient(135deg, #B8960C 0%, #D4AF37 50%, #F4E5B8 100%)',
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
// Meaningful names for specific UI elements (Dark + Gold theme)
// ============================================================================
export const UI_COLORS = {
  // Page backgrounds (dark theme)
  background: BRAND_COLORS.bg,
  backgroundSecondary: BRAND_COLORS.bgSecondary,

  // Containers (dark backgrounds)
  containerBg: BRAND_COLORS.bgSecondary,
  containerBorder: BRAND_COLORS.border,

  // Tables (dark theme)
  tableHeaderBg: BRAND_COLORS.bgTertiary,
  tableRowHoverBg: BRAND_COLORS.hover,

  // Forms (dark theme)
  inputBorder: BRAND_COLORS.border,
  inputFocus: BRAND_COLORS.accent,
  inputBg: BRAND_COLORS.bgTertiary,

  // Placeholders (dark theme)
  placeholderBg: BRAND_COLORS.bgTertiary,
  placeholderText: BRAND_COLORS.textMuted,
  placeholderBorder: BRAND_COLORS.border,

  // Alerts
  infoBg: BRAND_COLORS.bgAccent,
  infoText: BRAND_COLORS.accent,
} as const;

// ============================================================================
// MAIN EXPORT
// ============================================================================
export const COLORS = {
  brand: BRAND_COLORS,
  gray: GRAY_COLORS,
  ui: UI_COLORS,
  gradients: GOLD_GRADIENTS,
} as const;
