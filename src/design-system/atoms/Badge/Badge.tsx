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
   */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';

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
  // Variant styles
  const variantStyles = {
    primary: {
      bg: '#dbeafe', // blue.100
      color: '#1e40af', // blue.800
    },
    success: {
      bg: '#d1fae5', // green.100
      color: '#065f46', // green.800
    },
    warning: {
      bg: '#fef3c7', // yellow.100
      color: '#92400e', // yellow.800
    },
    error: {
      bg: '#fee2e2', // red.100
      color: '#991b1b', // red.800
    },
    neutral: {
      bg: '#f3f4f6', // gray.100
      color: '#1f2937', // gray.800
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
