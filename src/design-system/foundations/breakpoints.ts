/**
 * BREAKPOINTS FOUNDATION
 *
 * Responsive breakpoint tokens.
 * These match Chakra UI's default breakpoints.
 *
 * Atomic Design Level: FOUNDATION (primitive tokens)
 */

// ============================================================================
// BREAKPOINTS
// ============================================================================
export const BREAKPOINTS = {
  base: '0px',      // Mobile first (default)
  sm: '30em',       // 480px
  md: '48em',       // 768px
  lg: '62em',       // 992px
  xl: '80em',       // 1280px
  '2xl': '96em',    // 1536px
} as const;

// ============================================================================
// RESPONSIVE ARRAYS
// Helper for responsive prop values [base, sm, md, lg, xl]
// ============================================================================
export const RESPONSIVE_HELPERS = {
  // Example: [mobile, tablet, desktop]
  mobileTabletDesktop: ['base', 'md', 'lg'],
  // Example: [mobile, desktop]
  mobileDesktop: ['base', 'lg'],
} as const;

// ============================================================================
// MAIN EXPORT
// ============================================================================
export const BREAKPOINTS_CONFIG = {
  breakpoints: BREAKPOINTS,
  helpers: RESPONSIVE_HELPERS,
} as const;
