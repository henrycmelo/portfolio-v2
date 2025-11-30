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
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

// ============================================================================
// EASING FUNCTIONS
// ============================================================================
export const EASINGS = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
} as const;
