/**
 * SECTION WRAPPER
 *
 * Wrapper component for page sections with consistent spacing.
 * Uses design system foundation tokens for responsive padding.
 * Dark theme with primary (#0D0B09) or alternate (#151310) backgrounds.
 */

import { Box } from "@chakra-ui/react";
import { SPACING, COLORS } from "@/design-system/foundations";

export interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  minHeight?: string;
  /**
   * Use alternate (slightly lighter) dark background
   * - false (default): Primary dark background (#0D0B09)
   * - true: Alternate/secondary dark background (#151310)
   */
  alternate?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  minHeight = 'auto',
  alternate = false
}: SectionWrapperProps) {
  return (
    <Box
      id={id}
      minH={minHeight}
      w="full"
      bg={alternate ? COLORS.brand.bgSecondary : COLORS.brand.bg}
      px={{
        base: SPACING.scale.md,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}
      py={{
        base: SPACING.scale.lg,
        md: SPACING.scale.xl,
        lg: SPACING.scale['2xl']
      }}
    >
      {children}
    </Box>
  )
}