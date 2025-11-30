/**
 * SIZES FOUNDATION
 *
 * Size tokens for containers, components, and layout elements.
 *
 * Atomic Design Level: FOUNDATION (primitive tokens)
 */

// ============================================================================
// CONTAINER SIZES
// ============================================================================
export const CONTAINER_SIZES = {
  sm: 'sm',      // 640px
  md: 'md',      // 768px
  lg: 'lg',      // 1024px
  xl: 'xl',      // 1280px
  '2xl': '2xl',  // 1536px
  '3xl': '3xl',  // 1920px
  '4xl': '4xl',  // 2560px
  '5xl': '5xl',  // ~1400px (custom)
  full: 'full',
} as const;

// ============================================================================
// COMPONENT SIZES
// ============================================================================
export const COMPONENT_SIZES = {
  // Image/Icon sizes
  icon: {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '32px',
    xl: '40px',
  },
  // Avatar/Logo sizes
  avatar: {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '60px',
    xl: '80px',
  },
  // Input/Button heights
  input: {
    sm: '32px',
    md: '40px',
    lg: '48px',
  },
  // Spinner sizes
  spinner: {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  },
} as const;

// ============================================================================
// MAIN EXPORT
// ============================================================================
export const SIZES = {
  container: CONTAINER_SIZES,
  component: COMPONENT_SIZES,
} as const;
