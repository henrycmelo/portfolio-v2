/**
 * SPACING SYSTEM
 *
 * How to use this file:
 * 1. Look at your components and find repeated spacing values (px, py, gap, margin, etc.)
 * 2. Add them to the appropriate category below
 * 3. Import in your components: import { SPACING } from '@/design-system'
 * 4. Use like: padding={SPACING.container.base}
 *
 * Why organize this way?
 * - Easy to maintain: Change once, updates everywhere
 * - Consistency: Everyone uses the same spacing values
 * - Type safety: TypeScript autocomplete helps you find the right value
 */

// ============================================================================
// BASE SCALE (T-shirt sizing: xs, sm, md, lg, xl)
// These are your fundamental spacing units
// ============================================================================
export const SPACING_SCALE = {
  xs: 2,    // 8px (2 * 4px)
  sm: 3,    // 12px (3 * 4px)
  md: 4,    // 16px (4 * 4px)
  lg: 6,    // 24px (6 * 4px)
  xl: 8,    // 32px (8 * 4px)
  '2xl': 12, // 48px (12 * 4px)
  '3xl': 16, // 64px (16 * 4px)
} as const;

// ============================================================================
// CONTAINER SPACING
// Padding/margin for major container elements
// ============================================================================
export const CONTAINER = {
  // Responsive padding for main containers
  padding: {
    base: 8,   // Mobile: 32px
    md: 12,    // Tablet: 48px
    lg: 16,    // Desktop: 64px
  },
  // Section spacing
  section: {
    marginBottom: 16,
    paddingY: 20,
  },
} as const;

// ============================================================================
// COMPONENT SPACING
// Common spacing for UI components
// ============================================================================
export const COMPONENT = {
  // Gaps between elements
  gap: {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 6,
  },
  // Padding for buttons, cards, etc.
  padding: {
    button: { x: 6, y: 3 },
    card: { x: 6, y: 4 },
    input: { x: 4, y: 2 },
  },
  // Margins
  margin: {
    headerBottom: 6,
    sectionTop: 10,
    elementBottom: 4,
  },
} as const;

// ============================================================================
// TABLE SPACING
// Specific spacing for tables
// ============================================================================
export const TABLE = {
  cell: {
    paddingY: 4,
    paddingX: 3,
  },
  header: {
    paddingY: 4,
    paddingX: 3,
  },
} as const;

// ============================================================================
// FORM SPACING
// Spacing for form elements
// ============================================================================
export const FORM = {
  fieldGap: 4,
  labelMarginBottom: 2,
  footerGap: 3,
  footerPaddingTop: 4,
} as const;

// ============================================================================
// EXPORT ALL (for convenience)
// ============================================================================
export const SPACING = {
  scale: SPACING_SCALE,
  container: CONTAINER,
  component: COMPONENT,
  table: TABLE,
  form: FORM,
} as const;
