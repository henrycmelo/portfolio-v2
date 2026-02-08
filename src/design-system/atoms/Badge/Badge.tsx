/**
 * BADGE ATOM
 *
 * A badge component for displaying status, labels, or categories.
 *
 * Atomic Design Level: ATOM (cannot be broken down further)
 *
 * Usage:
 *   <Badge variant="primary">New</Badge>
 *   <Badge variant="success">Active</Badge>
 */

import { Box } from '@chakra-ui/react';
import { COLORS, BORDERS, TYPOGRAPHY } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BadgeProps {
  /**
   * Visual style variant
   * - gold: Gold accent badge for premium/featured items
   * - primary: Primary brand badge
   * - success: Success status badge
   * - warning: Warning status badge
   * - error: Error status badge
   * - neutral: Neutral/muted badge
   */
  variant?: 'gold' | 'primary' | 'success' | 'warning' | 'error' | 'neutral';

  /**
   * Badge content
   */
  children: React.ReactNode;

  /**
   * Size variant
   */
  size?: 'sm' | 'md';
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Badge = ({
  variant = 'primary',
  size = 'sm',
  children,
}: BadgeProps) => {
  // Variant styles - Dark theme with gold accents
  const variantStyles = {
    gold: {
      bg: COLORS.brand.accent,           // Gold background (#D4AF37)
      color: '#0D0B09',                  // Dark text on gold
    },
    primary: {
      bg: COLORS.brand.bgTertiary,       // Dark elevated background
      color: COLORS.brand.accent,        // Gold text
    },
    success: {
      bg: 'rgba(74, 222, 128, 0.15)',    // Semi-transparent success
      color: COLORS.brand.success,       // Success green
    },
    warning: {
      bg: 'rgba(251, 191, 36, 0.15)',    // Semi-transparent warning
      color: COLORS.brand.warning,       // Warning yellow
    },
    error: {
      bg: 'rgba(248, 113, 113, 0.15)',   // Semi-transparent error
      color: COLORS.brand.error,         // Error red
    },
    neutral: {
      bg: COLORS.brand.bgSecondary,      // Dark secondary background
      color: COLORS.brand.textSecondary, // Muted light text
    },
  };

  const sizeStyles = {
    sm: {
      fontSize: TYPOGRAPHY.sizes.xs,
      px: 2,
      py: 1,
    },
    md: {
      fontSize: TYPOGRAPHY.sizes.sm,
      px: 3,
      py: 1,
    },
  };

  return (
    <Box
      display="inline-block"
      borderRadius={BORDERS.radius.sm}
      fontWeight={TYPOGRAPHY.weights.medium}
      textTransform="capitalize"
      {...variantStyles[variant]}
      {...sizeStyles[size]}
    >
      {children}
    </Box>
  );
};
