/**
 * TYPOGRAPHY FOUNDATION
 *
 * Base typography tokens for the design system.
 * These are the building blocks for all text styling.
 *
 * Atomic Design Level: FOUNDATION (primitive tokens)
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================
export const FONT_FAMILIES = {
  body: 'system-ui, -apple-system, sans-serif',
  heading: 'system-ui, -apple-system, sans-serif',
  mono: 'Menlo, Monaco, Consolas, monospace',
} as const;

// ============================================================================
// FONT SIZES
// Chakra uses numbers that map to rem values
// ============================================================================
export const FONT_SIZES = {
  xs: 'xs',    // 0.75rem (12px)
  sm: 'sm',    // 0.875rem (14px)
  md: 'md',    // 1rem (16px)
  lg: 'lg',    // 1.125rem (18px)
  xl: 'xl',    // 1.25rem (20px)
  '2xl': '2xl', // 1.5rem (24px)
  '3xl': '3xl', // 1.875rem (30px)
  '4xl': '4xl', // 2.25rem (36px)
  '5xl': '5xl', // 3rem (48px)
  '6xl': '6xl', // 3.75rem (60px)
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================
export const FONT_WEIGHTS = {
  normal: 'normal',      // 400
  medium: 'medium',      // 500
  semibold: 'semibold',  // 600
  bold: 'bold',          // 700
} as const;

// ============================================================================
// LINE HEIGHTS
// ============================================================================
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

// ============================================================================
// LETTER SPACING
// ============================================================================
export const LETTER_SPACING = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// ============================================================================
// SEMANTIC TYPOGRAPHY (meaningful combinations)
// Use these for specific UI elements
// ============================================================================
export const TEXT_STYLES = {
  // Headings
  h1: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  h2: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  h3: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  // Body text
  body: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.normal,
  },
  bodySmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.normal,
  },
  // UI elements
  button: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.normal,
  },
  caption: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.normal,
  },
} as const;

// ============================================================================
// MAIN EXPORT
// ============================================================================
export const TYPOGRAPHY = {
  families: FONT_FAMILIES,
  sizes: FONT_SIZES,
  weights: FONT_WEIGHTS,
  lineHeights: LINE_HEIGHTS,
  letterSpacing: LETTER_SPACING,
  styles: TEXT_STYLES,
} as const;
