/**
 * BUTTON ATOM
 *
 * A button component that wraps Chakra's Button with design system tokens.
 *
 * Atomic Design Level: ATOM (cannot be broken down further)
 *
 * Usage:
 *   <Button variant="primary" size="md">Click me</Button>
 *   <Button variant="primary" icon={IoAdd} iconPosition="left">Add Item</Button>
 */

import React from 'react';
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

  /**
   * Icon component to display in the button
   */
  icon?: React.ComponentType;

  /**
   * Position of the icon
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Button = ({
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  iconPosition = 'left',
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

  // Size styles - responsive
  const sizeStyles = {
    sm: {
      fontSize: { base: TYPOGRAPHY.sizes.xs, md: TYPOGRAPHY.sizes.sm },
      px: { base: SPACING.component.padding.button.x - 2, md: SPACING.component.padding.button.x },
      py: { base: SPACING.component.padding.button.y - 1, md: SPACING.component.padding.button.y - 1 },
    },
    md: {
      fontSize: { base: TYPOGRAPHY.sizes.sm, md: TYPOGRAPHY.sizes.md },
      px: { base: SPACING.component.padding.button.x - 1, md: SPACING.component.padding.button.x },
      py: { base: SPACING.component.padding.button.y - 0.5, md: SPACING.component.padding.button.y },
    },
    lg: {
      fontSize: { base: TYPOGRAPHY.sizes.md, md: TYPOGRAPHY.sizes.lg },
      px: { base: SPACING.component.padding.button.x, md: SPACING.component.padding.button.x + 2 },
      py: { base: SPACING.component.padding.button.y, md: SPACING.component.padding.button.y + 1 },
    },
  };

  return (
    <ChakraButton
      borderRadius={BORDERS.radius.md}
      fontWeight={TYPOGRAPHY.weights.medium}
      transition="all 0.2s"
      gap={IconComponent ? '8px' : 0}
      {...variantStyles[variant]}
      {...sizeStyles[size]}
      {...rest}
    >
      {IconComponent && iconPosition === 'left' && <IconComponent />}
      {children}
      {IconComponent && iconPosition === 'right' && <IconComponent />}
    </ChakraButton>
  );
};
