/**
 * ADMIN PAGE TEMPLATE
 *
 * A reusable template for admin pages with consistent layout.
 *
 * Atomic Design Level: TEMPLATE (page layout)
 *
 * Organisms/Molecules/Atoms used:
 * - Box (container)
 * - PageHeader (optional)
 *
 * Usage:
 *   <AdminPageTemplate>
 *     <YourContent />
 *   </AdminPageTemplate>
 */

import { Box } from '@chakra-ui/react';
import { COLORS, BORDERS, SHADOWS, SPACING, SIZES } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AdminPageTemplateProps {
  /**
   * Page content
   */
  children: React.ReactNode;

  /**
   * Maximum width of the container
   */
  maxWidth?: keyof typeof SIZES.container;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const AdminPageTemplate = ({
  children,
  maxWidth = '5xl',
}: AdminPageTemplateProps) => {
  return (
    <Box
      maxW={SIZES.container[maxWidth]}
      w="full"
      bg={COLORS.ui.containerBg}
      borderRadius={BORDERS.radius.md}
      boxShadow={SHADOWS.box.container}
      overflow="hidden"
      border="1px solid"
      borderColor={COLORS.ui.containerBorder}
      mx="auto"
    >
      <Box p={{ base: SPACING.container.padding.base, md: SPACING.container.padding.md, lg: SPACING.container.padding.lg }}>
        {children}
      </Box>
    </Box>
  );
};
