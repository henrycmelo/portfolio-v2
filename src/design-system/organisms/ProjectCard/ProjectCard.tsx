import {
  Box,
  HStack,
  VStack,
  Image,
  Grid,
} from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";

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
      maxW={SIZES.container['5xl']}
      w="full"
      bg={COLORS.ui.containerBg}
      borderRadius={BORDERS.radius.md}
      boxShadow={SHADOWS.box.container}
      overflow="hidden"
      border="1px solid"
      borderColor={COLORS.ui.containerBorder}
      mx="auto"
      p={{
        base: SPACING.container.padding.base,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}
    >
      {/* Header */}

      <Image src={company_logo_url} alt={`${company_name} logo`} />

      {/* Title */}
      <VStack align="flex-start" gap={SPACING.component.gap.lg} mb={12}>
        <Text
          fontSize={{ base: TYPOGRAPHY.sizes['3xl'], md: TYPOGRAPHY.sizes['4xl'], lg: '5xl' }}
          fontWeight={TYPOGRAPHY.weights.bold}
          lineHeight={TYPOGRAPHY.lineHeights.tight}
          color={COLORS.brand.primary}
        >
          {title}
        </Text>
      </VStack>

      <HStack gap={SPACING.component.gap.lg} justify="center" flexWrap="wrap">
        {/* Mockup Image */}
        <Box mb={12} textAlign="center">
          <Image
            src={mockup_url}
            alt={`${company_name} mockup`}
            maxW="full"
            h="auto"
            borderRadius={BORDERS.radius.lg}
            boxShadow={SHADOWS.box.xl}
          />
        </Box>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={SPACING.scale.xl}
          mt={12}
        >
          <VStack align="flex-start" gap={SPACING.scale.sm}>
            <Text
              fontSize={TYPOGRAPHY.sizes.lg}
              fontWeight={TYPOGRAPHY.weights.bold}
              color={COLORS.brand.accent}
            >
              Problem
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.md}
              color={COLORS.brand.textMuted}
              lineHeight={TYPOGRAPHY.lineHeights.relaxed}
            >
              {problem}
            </Text>
          </VStack>

          <VStack align="flex-start" gap={SPACING.scale.sm}>
            <Text
              fontSize={TYPOGRAPHY.sizes.lg}
              fontWeight={TYPOGRAPHY.weights.bold}
              color={COLORS.brand.accent}
            >
              Solution
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.md}
              color={COLORS.brand.textMuted}
              lineHeight={TYPOGRAPHY.lineHeights.relaxed}
            >
              {solution}
            </Text>
          </VStack>

          <VStack align="flex-start" gap={SPACING.scale.sm}>
            <Text
              fontSize={TYPOGRAPHY.sizes.lg}
              fontWeight={TYPOGRAPHY.weights.bold}
              color={COLORS.brand.accent}
            >
              Benefit
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.md}
              color={COLORS.brand.textMuted}
              lineHeight={TYPOGRAPHY.lineHeights.relaxed}
            >
              {benefit}
            </Text>
          </VStack>

          <VStack align="flex-start" gap={SPACING.scale.sm}>
            <Text
              fontSize={TYPOGRAPHY.sizes.lg}
              fontWeight={TYPOGRAPHY.weights.bold}
              color={COLORS.brand.accent}
            >
              Role
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.md}
              color={COLORS.brand.textMuted}
              lineHeight={TYPOGRAPHY.lineHeights.relaxed}
            >
              {role}
            </Text>
          </VStack>
        </Grid>
      </HStack>
    </Box>
  );
}
