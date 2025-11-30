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
      px={{
        base: SPACING.container.padding.base - 2,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}
      py={{
        base: SPACING.container.padding.base,
        md: SPACING.container.padding.md
      }}
    >
      {children}
    </Box>
  )
}