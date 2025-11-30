/**
 * PAGE HEADER ORGANISM
 *
 * A reusable page header with title and action button.
 *
 * Atomic Design Level: ORGANISM (complex UI section)
 *
 * Molecules/Atoms used:
 * - Text (title)
 * - Button (action)
 * - HStack (layout)
 *
 * Usage:
 *   <PageHeader
 *     title="Project Management"
 *     actionLabel="Add New"
 *     onAction={() => handleAdd()}
 *   />
 */

import { HStack } from '@chakra-ui/react';
import { Text } from '../../atoms/Text';
import { Button, ButtonProps } from '../../atoms/Button';
import { COLORS, SPACING } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface PageHeaderProps {
  /**
   * Page title
   */
  title: string;

  /**
   * Action button label
   */
  actionLabel?: string;

  /**
   * Action button click handler
   */
  onAction?: () => void;

  /**
   * Action button icon (optional)
   */
  actionIcon?: React.ReactNode;

  /**
   * Action button variant
   */
  actionVariant?: ButtonProps['variant'];
}

// ============================================================================
// COMPONENT
// ============================================================================

export const PageHeader = ({
  title,
  actionLabel,
  onAction,
  actionIcon,
  actionVariant = 'primary',
}: PageHeaderProps) => {
  return (
    <HStack
      justify="space-between"
      mb={SPACING.component.margin.headerBottom}
      align="center"
    >
      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="bold"
        color={COLORS.brand.primary}
      >
        {title}
      </Text>

      {actionLabel && onAction && (
        <Button variant={actionVariant} onClick={onAction}>
          {actionIcon}
          {actionLabel}
        </Button>
      )}
    </HStack>
  );
};
