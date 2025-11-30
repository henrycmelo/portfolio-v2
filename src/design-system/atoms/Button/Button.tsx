/**
 * BUTTON ATOM
 *
 * A button component that wraps Chakra's Button with design system tokens.
 *
 * Atomic Design Level: ATOM (cannot be broken down further)
 *
 * Usage:
 *   <Button variant="primary" size="md">Click me</Button>
 */

import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ButtonProps extends Omit<ChakraButtonProps, 'variant' | 'size'> {
  /**
   * Visual style variant
   * - primary: Main brand button
   * - secondary: Secondary action
   * - outline: Outlined button
   * - ghost: Minimal button
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';

  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  ...rest
}: ButtonProps) => {
  // Variant styles
  const variantStyles = {
    primary: {
      bg: COLORS.brand.bgButton,
      color: COLORS.brand.white,
      _hover: { bg: COLORS.brand.secondary },
    },
    secondary: {
      bg: COLORS.brand.bg,
      color: COLORS.brand.primary,
      border: '1px solid',
      borderColor: COLORS.brand.divider,
      _hover: { bg: COLORS.brand.hover },
    },
    outline: {
      bg: 'transparent',
      color: COLORS.brand.primary,
      border: '1px solid',
      borderColor: COLORS.brand.border,
      _hover: { bg: COLORS.brand.hover },
    },
    ghost: {
      bg: 'transparent',
      color: COLORS.brand.primary,
      _hover: { bg: COLORS.brand.hover },
    },
  };

  // Size styles
  const sizeStyles = {
    sm: {
      fontSize: TYPOGRAPHY.sizes.sm,
      px: SPACING.component.padding.button.x,
      py: SPACING.component.padding.button.y - 1,
    },
    md: {
      fontSize: TYPOGRAPHY.sizes.md,
      px: SPACING.component.padding.button.x,
      py: SPACING.component.padding.button.y,
    },
    lg: {
      fontSize: TYPOGRAPHY.sizes.lg,
      px: SPACING.component.padding.button.x + 2,
      py: SPACING.component.padding.button.y + 1,
    },
  };

  return (
    <ChakraButton
      borderRadius={BORDERS.radius.md}
      fontWeight={TYPOGRAPHY.weights.medium}
      transition="all 0.2s"
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};
