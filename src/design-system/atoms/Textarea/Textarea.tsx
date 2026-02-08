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

export type TextareaProps = ChakraTextareaProps;

// ============================================================================
// COMPONENT
// ============================================================================

export const Textarea = ({
  ...rest
}: TextareaProps) => {
  return (
    <ChakraTextarea
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
