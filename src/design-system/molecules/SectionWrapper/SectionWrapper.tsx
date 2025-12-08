/**
 * SECTION WRAPPER
 *
 * Wrapper component for page sections with consistent spacing.
 * Uses design system foundation tokens for responsive padding.
 */

import { Box } from "@chakra-ui/react";
import { SPACING } from "@/design-system/foundations";

export default function SectionWrapper({
  id,
  children,
  minHeight = 'auto'
}: {
  id: string
  children: React.ReactNode
  minHeight?: string
}) {
  return (
    <Box
      id={id}
      minH={minHeight}
      w="full"
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