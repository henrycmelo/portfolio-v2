/**
 * TEXTAREA ATOM
 *
 * A textarea input with design system styling.
 *
 * Atomic Design Level: ATOM (cannot be broken down further)
 *
 * Usage:
 *   <Textarea placeholder="Enter description" rows={4} />
 */

import { Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';
import { COLORS, BORDERS, SPACING } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TextareaProps extends ChakraTextareaProps {}

// ============================================================================
// COMPONENT
// ============================================================================

export const Textarea = ({
  ...rest
}: TextareaProps) => {
  return (
    <ChakraTextarea
      borderColor={COLORS.ui.inputBorder}
      borderRadius={BORDERS.radius.md}
      _placeholder={{
        color: COLORS.ui.placeholderText,
      }}
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
