/**
 * INPUT ATOM
 *
 * A text input with design system styling.
 *
 * Atomic Design Level: ATOM (cannot be broken down further)
 *
 * Usage:
 *   <Input placeholder="Enter text" />
 */

import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { COLORS, BORDERS, SPACING } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface InputProps extends ChakraInputProps {
  /**
   * Input size
   */
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Input = ({
  size = 'md',
  ...rest
}: InputProps) => {
  return (
    <ChakraInput
      borderColor={COLORS.ui.inputBorder}
      borderRadius={BORDERS.radius.md}
      _focus={{
        borderColor: COLORS.ui.inputFocus,
        boxShadow: `0 0 0 1px ${COLORS.ui.inputFocus}`,
      }}
      _hover={{
        borderColor: COLORS.brand.border,
      }}
      px={SPACING.component.padding.input.x}
      py={SPACING.component.padding.input.y}
      {...rest}
    />
  );
};
