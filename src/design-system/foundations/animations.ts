/**
 * ANIMATIONS FOUNDATION
 *
 * Animation and transition tokens.
 *
 * Atomic Design Level: FOUNDATION (primitive tokens)
 */

// ============================================================================
// TRANSITION DURATIONS
// ============================================================================
export const DURATIONS = {
  instant: '50ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '800ms',
  slowest: '1200ms',
  stagger: '100ms',
} as const;

// ============================================================================
// EASING FUNCTIONS
// ============================================================================
export const EASINGS = {
  // Standard easings
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Expressive easings for award-winning animations
  expressive: 'cubic-bezier(0.19, 1, 0.22, 1)',
  anticipate: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

// ============================================================================
// SPRING CONFIGURATIONS (for Framer Motion)
// ============================================================================
export const SPRINGS = {
  snappy: { stiffness: 300, damping: 30 },
  smooth: { stiffness: 100, damping: 20 },
  bouncy: { stiffness: 200, damping: 10 },
} as const;

// ============================================================================
// COMMON TRANSITIONS
// ============================================================================
export const TRANSITIONS = {
  background: `background ${DURATIONS.normal} ${EASINGS.easeInOut}`,
  color: `color ${DURATIONS.normal} ${EASINGS.easeInOut}`,
  transform: `transform ${DURATIONS.normal} ${EASINGS.easeOut}`,
  opacity: `opacity ${DURATIONS.fast} ${EASINGS.easeInOut}`,
  all: `all ${DURATIONS.normal} ${EASINGS.easeInOut}`,
} as const;

// ============================================================================
// MAIN EXPORT
// ============================================================================
export const ANIMATIONS = {
  durations: DURATIONS,
  easings: EASINGS,
  transitions: TRANSITIONS,
  springs: SPRINGS,
} as const;
