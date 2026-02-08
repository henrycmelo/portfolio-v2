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
   * Color variant for semantic coloring
   * - primary: Light cream for main text (#F5F5F0)
   * - secondary: Muted light for secondary text (#C9C5B9)
   * - accent: Gold for emphasis (#D4AF37)
   * - muted: For less important text
   */
  colorVariant?: 'primary' | 'secondary' | 'accent' | 'muted';

  /**
   * Custom text color (overrides colorVariant)
   */
  color?: string;

  /**
   * Number of lines to truncate to
   */
  noOfLines?: number;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Text = ({
  variant = 'body',
  colorVariant = 'primary',
  color,
  noOfLines,
  children,
  ...rest
}: TextProps) => {
  const variantStyles = TYPOGRAPHY.styles[variant];

  // Color variant mappings for dark theme
  const colorVariantMap = {
    primary: COLORS.brand.text,          // Light cream (#F5F5F0)
    secondary: COLORS.brand.textSecondary, // Muted light (#C9C5B9)
    accent: COLORS.brand.accent,         // Gold (#D4AF37)
    muted: COLORS.brand.textMuted,       // Muted text
  };

  // Use custom color if provided, otherwise use colorVariant
  const textColor = color || colorVariantMap[colorVariant];

  // Line clamp styles for truncation
  const lineClampStyles = noOfLines ? {
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    display: '-webkit-box' as const,
    WebkitLineClamp: noOfLines,
    WebkitBoxOrient: 'vertical' as const,
  } : {};

  return (
    <ChakraText
      color={textColor}
      {...variantStyles}
      {...lineClampStyles}
      {...rest}
    >
      {children}
    </ChakraText>
  );
};
