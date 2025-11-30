/**
 * TEXT ATOM
 *
 * A text component with consistent typography from the design system.
 *
 * Atomic Design Level: ATOM (cannot be broken down further)
 *
 * Usage:
 *   <Text variant="h1">Heading</Text>
 *   <Text variant="body">Body text</Text>
 */

import { Text as ChakraText, TextProps as ChakraTextProps } from '@chakra-ui/react';
import { COLORS, TYPOGRAPHY } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TextProps extends Omit<ChakraTextProps, 'variant'> {
  /**
   * Typography variant from design system
   */
  variant?: keyof typeof TYPOGRAPHY.styles;

  /**
   * Text color (defaults to brand.text)
   */
  color?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Text = ({
  variant = 'body',
  color = COLORS.brand.text,
  children,
  ...rest
}: TextProps) => {
  const variantStyles = TYPOGRAPHY.styles[variant];

  return (
    <ChakraText
      color={color}
      {...variantStyles}
      {...rest}
    >
      {children}
    </ChakraText>
  );
};
