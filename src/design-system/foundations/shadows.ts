/**
 * SHADOWS FOUNDATION
 *
 * Box shadow tokens for depth and elevation.
 *
 * Atomic Design Level: FOUNDATION (primitive tokens)
 */

// ============================================================================
// BOX SHADOWS
// ============================================================================
export const BOX_SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Custom project shadow
  container: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',

  // Inner shadow
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// ============================================================================
// MAIN EXPORT
// ============================================================================
export const SHADOWS = {
  box: BOX_SHADOWS,
} as const;
