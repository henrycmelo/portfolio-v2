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
      width="100%"
      bg={COLORS.brand.bgSecondary}        // Dark background (#151310)
      borderColor={COLORS.brand.border}
      borderRadius={BORDERS.radius.md}
      color={COLORS.brand.text}            // Light text for readability
      _placeholder={{
        color: COLORS.brand.textMuted,     // Visible but muted placeholder
      }}
      _focus={{
        borderColor: COLORS.brand.accent,  // Gold border on focus
        boxShadow: `0 0 0 1px ${COLORS.brand.accent}`, // Gold glow
      }}
      _hover={{
        borderColor: COLORS.brand.accentDark, // Darker gold on hover
      }}
      px={SPACING.component.padding.input.x}
      py={SPACING.component.padding.input.y}
      {...rest}
    />
  );
};
