/**
 * BORDERS FOUNDATION
 *
 * Border tokens for radius and widths.
 *
 * Atomic Design Level: FOUNDATION (primitive tokens)
 */

// ============================================================================
// BORDER RADIUS
// ============================================================================
export const BORDER_RADIUS = {
  none: '0',
  sm: 'sm',    // 0.125rem (2px)
  md: 'md',    // 0.25rem (4px)
  lg: 'lg',    // 0.5rem (8px)
  xl: 'xl',    // 0.75rem (12px)
  '2xl': '2xl', // 1rem (16px)
  full: 'full', // 9999px (circle)
} as const;

// ============================================================================
// BORDER WIDTHS
// ============================================================================
export const BORDER_WIDTHS = {
  none: '0',
  thin: '1px',
  medium: '2px',
  thick: '4px',
} as const;

// ============================================================================
// BORDER STYLES
// ============================================================================
export const BORDER_STYLES = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const;

// ============================================================================
// COMBINED BORDERS (width + style)
// ============================================================================
export const BORDER_COMBINED = {
  none: '0',
  thin: '1px solid',
  medium: '2px solid',
  thick: '4px solid',
  thinDashed: '1px dashed',
  mediumDashed: '2px dashed',
} as const;

// ============================================================================
// MAIN EXPORT
// ============================================================================
export const BORDERS = {
  radius: BORDER_RADIUS,
  widths: BORDER_WIDTHS,
  styles: BORDER_STYLES,
  default: BORDER_COMBINED,
} as const;
