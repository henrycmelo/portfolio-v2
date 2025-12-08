import {
  Box,
  VStack,
  Image,
  Grid,
} from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY } from "@/design-system/foundations";

interface ProjectShowcaseProps {
  company_name: string;
  company_logo_url: string;
  title: string;
  mockup_url: string;
  problem: string;
  solution: string;
  benefit: string;
  role: string;
}

export default function ProjectShowcaseCard({
  company_name,
  company_logo_url,
  title,
  mockup_url,
  problem,
  solution,
  benefit,
  role,
}: ProjectShowcaseProps) {
  return (
    <Box
      w="100%"
      maxW="100%"
      p={{
        base: SPACING.scale.md,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}
      bg={COLORS.brand.white}
      borderRadius={BORDERS.radius.lg}
      border={BORDERS.default.thin}
      borderColor={COLORS.ui.containerBorder}
      boxShadow={SHADOWS.box.container}
      transition="all 0.2s ease-in-out"
      overflow="hidden"
    >
      {/* Company Logo */}
      <Box mb={SPACING.scale.lg}>
        <Image
          src={company_logo_url}
          alt={`${company_name} logo`}
          maxW={{
            base: "120px",
            md: "150px"
          }}
          h="auto"
        />
      </Box>

      {/* Title */}
      <VStack align="flex-start" gap={SPACING.component.gap.md} mb={SPACING.scale.xl} w="full">
        <Text
          fontSize={{
            base: TYPOGRAPHY.sizes['2xl'],
            md: TYPOGRAPHY.sizes['3xl'],
            lg: TYPOGRAPHY.sizes['4xl']
          }}
          fontWeight={TYPOGRAPHY.weights.bold}
          lineHeight={TYPOGRAPHY.lineHeights.tight}
          color={COLORS.brand.primary}
          w="full"
          wordBreak="break-word"
          overflowWrap="break-word"
        >
          {title}
        </Text>
      </VStack>

      {/* Mockup Image */}
      <Box mb={SPACING.scale.xl} w="full">
        <Image
          src={mockup_url}
          alt={`${company_name} mockup`}
          w="full"
          h="auto"
          borderRadius={BORDERS.radius.lg}
          boxShadow={SHADOWS.box.xl}
        />
      </Box>

      {/* Details Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{
          base: SPACING.scale.lg,
          md: SPACING.scale.xl
        }}
      >
        <VStack align="flex-start" gap={SPACING.scale.sm}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.md,
              md: TYPOGRAPHY.sizes.lg
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.accent}
          >
            Problem
          </Text>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.sm,
              md: TYPOGRAPHY.sizes.md
            }}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
          >
            {problem}
          </Text>
        </VStack>

        <VStack align="flex-start" gap={SPACING.scale.sm}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.md,
              md: TYPOGRAPHY.sizes.lg
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.accent}
          >
            Solution
          </Text>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.sm,
              md: TYPOGRAPHY.sizes.md
            }}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
          >
            {solution}
          </Text>
        </VStack>

        <VStack align="flex-start" gap={SPACING.scale.sm}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.md,
              md: TYPOGRAPHY.sizes.lg
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.accent}
          >
            Benefit
          </Text>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.sm,
              md: TYPOGRAPHY.sizes.md
            }}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
          >
            {benefit}
          </Text>
        </VStack>

        <VStack align="flex-start" gap={SPACING.scale.sm}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.md,
              md: TYPOGRAPHY.sizes.lg
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.accent}
          >
            Role
          </Text>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.sm,
              md: TYPOGRAPHY.sizes.md
            }}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
          >
            {role}
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
}
