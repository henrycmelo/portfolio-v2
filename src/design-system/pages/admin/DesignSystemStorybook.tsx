/**
 * DESIGN SYSTEM STORYBOOK
 *
 * A comprehensive showcase of all design system components,
 * foundations, and patterns for documentation and testing.
 */

'use client';

import { useState } from "react";
import { Box, VStack, HStack, Grid, Image } from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import { Button } from "@/design-system/atoms/Button/Button";
import { Badge } from "@/design-system/atoms/Badge/Badge";
import { Input } from "@/design-system/atoms/Input/Input";
import { Textarea } from "@/design-system/atoms/Textarea/Textarea";
import { FormField } from "@/design-system/molecules/FormField/FormField";
import SectionWrapper from "@/design-system/molecules/SectionWrapper/SectionWrapper";
import ProjectShowcaseCard from "@/design-system/organisms/ProjectCard/ProjectCard";
import ReviewCard from "@/design-system/organisms/ReviewCard/ReviewCard";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDERS,
  SHADOWS,
  SIZES
} from "@/design-system/foundations";
import {
  IoAdd,
  IoTrash,
  IoSave,
  IoArrowForward,
  IoHeart,
  IoSettings,
  IoChatbubble
} from "react-icons/io5";

// ============================================================================
// SECTION COMPONENT
// ============================================================================

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Section = ({ title, description, children }: SectionProps) => (
  <Box
    mb={SPACING.scale['2xl']}
    pb={SPACING.scale['2xl']}
    borderBottom="1px solid"
    borderColor={COLORS.ui.containerBorder}
  >
    <VStack align="flex-start" gap={SPACING.scale.md} mb={SPACING.scale.lg}>
      <Text
        fontSize={TYPOGRAPHY.sizes['2xl']}
        fontWeight={TYPOGRAPHY.weights.bold}
        color={COLORS.brand.primary}
      >
        {title}
      </Text>
      {description && (
        <Text
          fontSize={TYPOGRAPHY.sizes.sm}
          color={COLORS.brand.textMuted}
          lineHeight={TYPOGRAPHY.lineHeights.relaxed}
        >
          {description}
        </Text>
      )}
    </VStack>
    {children}
  </Box>
);

// ============================================================================
// COLOR SWATCH COMPONENT
// ============================================================================

interface ColorSwatchProps {
  name: string;
  value: string;
}

const ColorSwatch = ({ name, value }: ColorSwatchProps) => (
  <VStack gap={SPACING.scale.xs} align="flex-start">
    <Box
      w="100%"
      h="80px"
      bg={value}
      borderRadius={BORDERS.radius.md}
      border="1px solid"
      borderColor={COLORS.ui.containerBorder}
      boxShadow={SHADOWS.box.sm}
    />
    <Text fontSize={TYPOGRAPHY.sizes.xs} fontWeight={TYPOGRAPHY.weights.medium}>
      {name}
    </Text>
    <Text fontSize={TYPOGRAPHY.sizes.xs} color={COLORS.brand.textMuted}>
      {value}
    </Text>
  </VStack>
);

// ============================================================================
// CODE BLOCK COMPONENT
// ============================================================================

interface CodeBlockProps {
  code: string;
  title?: string;
}

const CodeBlock = ({ code, title }: CodeBlockProps) => (
  <Box w="100%">
    {title && (
      <Text
        fontSize={TYPOGRAPHY.sizes.xs}
        fontWeight={TYPOGRAPHY.weights.medium}
        color={COLORS.brand.secondary}
        mb={SPACING.scale.xs}
      >
        {title}
      </Text>
    )}
    <Box
      as="pre"
      p={SPACING.scale.md}
      bg={COLORS.gray[900]}
      borderRadius={BORDERS.radius.md}
      overflow="auto"
      border="1px solid"
      borderColor={COLORS.gray[700]}
    >
      <Box
        as="code"
        fontSize={TYPOGRAPHY.sizes.xs}
        color={COLORS.gray[100]}
        fontFamily="monospace"
        whiteSpace="pre"
      >
        {code}
      </Box>
    </Box>
  </Box>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DesignSystemStorybook() {
  return (
    <Box w="100%" maxW={SIZES.container['5xl']} mx="auto">
      <VStack align="flex-start" gap={SPACING.scale.xl} w="100%">
        {/* Header */}
        <Box mb={SPACING.scale.lg}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes['3xl'],
              md: TYPOGRAPHY.sizes['4xl']
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.primary}
            mb={SPACING.scale.sm}
          >
            Design System Storybook
          </Text>
          <Text
            fontSize={TYPOGRAPHY.sizes.md}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
          >
            A comprehensive showcase of all design tokens, components, and patterns
          </Text>
        </Box>

        {/* ================================================================ */}
        {/* FOUNDATIONS */}
        {/* ================================================================ */}

        <Section
          title="1. Foundations"
          description="Core design tokens that form the basis of the design system"
        >
          {/* Colors */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Colors
            </Text>

            {/* Brand Colors */}
            <Box mb={SPACING.scale.lg}>
              <Text
                fontSize={TYPOGRAPHY.sizes.md}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.secondary}
                mb={SPACING.scale.sm}
              >
                Brand Colors
              </Text>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(6, 1fr)"
                }}
                gap={SPACING.scale.md}
              >
                <ColorSwatch name="Primary" value={COLORS.brand.primary} />
                <ColorSwatch name="Secondary" value={COLORS.brand.secondary} />
                <ColorSwatch name="Accent" value={COLORS.brand.accent} />
                <ColorSwatch name="Background" value={COLORS.brand.bg} />
                <ColorSwatch name="White" value={COLORS.brand.white} />
                <ColorSwatch name="Text Muted" value={COLORS.brand.textMuted} />
              </Grid>
            </Box>

            {/* Gray Scale */}
            <Box mb={SPACING.scale.lg}>
              <Text
                fontSize={TYPOGRAPHY.sizes.md}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.secondary}
                mb={SPACING.scale.sm}
              >
                Gray Scale
              </Text>
              <Grid
                templateColumns={{
                  base: "repeat(3, 1fr)",
                  md: "repeat(5, 1fr)",
                  lg: "repeat(10, 1fr)"
                }}
                gap={SPACING.scale.sm}
              >
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <ColorSwatch
                    key={shade}
                    name={`Gray ${shade}`}
                    value={COLORS.gray[shade as keyof typeof COLORS.gray]}
                  />
                ))}
              </Grid>
            </Box>

            {/* Code Example */}
            <CodeBlock
              title="Usage"
              code={`import { COLORS } from '@/design-system/foundations';

// Brand Colors
<Box bg={COLORS.brand.primary}>Primary Background</Box>
<Text color={COLORS.brand.secondary}>Secondary Text</Text>
<Box borderColor={COLORS.brand.accent}>Accent Border</Box>

// Text Colors
<Text color={COLORS.brand.text}>Default Text</Text>
<Text color={COLORS.brand.textMuted}>Muted Text</Text>

// Gray Scale
<Box bg={COLORS.gray[50]}>Lightest Gray</Box>
<Box bg={COLORS.gray[900]}>Darkest Gray</Box>

// UI Colors
<Box bg={COLORS.ui.containerBg}>Container Background</Box>
<Box borderColor={COLORS.ui.containerBorder}>Container Border</Box>`}
            />
          </Box>

          {/* Typography */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Typography
            </Text>

            <VStack align="flex-start" gap={SPACING.scale.md}>
              <Box>
                <Text fontSize={TYPOGRAPHY.sizes.xs} fontWeight={TYPOGRAPHY.weights.bold}>
                  Font Sizes
                </Text>
                <VStack align="flex-start" gap={SPACING.scale.xs} mt={SPACING.scale.sm}>
                  <Text fontSize={TYPOGRAPHY.sizes.xs}>Extra Small (xs)</Text>
                  <Text fontSize={TYPOGRAPHY.sizes.sm}>Small (sm)</Text>
                  <Text fontSize={TYPOGRAPHY.sizes.md}>Medium (md)</Text>
                  <Text fontSize={TYPOGRAPHY.sizes.lg}>Large (lg)</Text>
                  <Text fontSize={TYPOGRAPHY.sizes.xl}>Extra Large (xl)</Text>
                  <Text fontSize={TYPOGRAPHY.sizes['2xl']}>2XL</Text>
                  <Text fontSize={TYPOGRAPHY.sizes['3xl']}>3XL</Text>
                  <Text fontSize={TYPOGRAPHY.sizes['4xl']}>4XL</Text>
                </VStack>
              </Box>

              <Box>
                <Text fontSize={TYPOGRAPHY.sizes.xs} fontWeight={TYPOGRAPHY.weights.bold}>
                  Font Weights
                </Text>
                <VStack align="flex-start" gap={SPACING.scale.xs} mt={SPACING.scale.sm}>
                  <Text fontWeight={TYPOGRAPHY.weights.normal}>Normal (400)</Text>
                  <Text fontWeight={TYPOGRAPHY.weights.medium}>Medium (500)</Text>
                  <Text fontWeight={TYPOGRAPHY.weights.semibold}>Semibold (600)</Text>
                  <Text fontWeight={TYPOGRAPHY.weights.bold}>Bold (700)</Text>
                </VStack>
              </Box>
            </VStack>

            {/* Code Example */}
            <CodeBlock
              title="Usage"
              code={`import { TYPOGRAPHY } from '@/design-system/foundations';

// Font Sizes
<Text fontSize={TYPOGRAPHY.sizes.xs}>Extra Small</Text>
<Text fontSize={TYPOGRAPHY.sizes.sm}>Small</Text>
<Text fontSize={TYPOGRAPHY.sizes.md}>Medium</Text>
<Text fontSize={TYPOGRAPHY.sizes.lg}>Large</Text>
<Text fontSize={TYPOGRAPHY.sizes.xl}>Extra Large</Text>
<Text fontSize={TYPOGRAPHY.sizes['2xl']}>2XL</Text>
<Text fontSize={TYPOGRAPHY.sizes['3xl']}>3XL</Text>
<Text fontSize={TYPOGRAPHY.sizes['4xl']}>4XL</Text>

// Font Weights
<Text fontWeight={TYPOGRAPHY.weights.normal}>Normal (400)</Text>
<Text fontWeight={TYPOGRAPHY.weights.medium}>Medium (500)</Text>
<Text fontWeight={TYPOGRAPHY.weights.semibold}>Semibold (600)</Text>
<Text fontWeight={TYPOGRAPHY.weights.bold}>Bold (700)</Text>

// Line Heights
<Text lineHeight={TYPOGRAPHY.lineHeights.tight}>Tight</Text>
<Text lineHeight={TYPOGRAPHY.lineHeights.normal}>Normal</Text>
<Text lineHeight={TYPOGRAPHY.lineHeights.relaxed}>Relaxed</Text>

// Combining Typography Tokens
<Text
  fontSize={TYPOGRAPHY.sizes.xl}
  fontWeight={TYPOGRAPHY.weights.bold}
  lineHeight={TYPOGRAPHY.lineHeights.tight}
>
  Heading Text
</Text>`}
            />
          </Box>

          {/* Spacing */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Spacing Scale
            </Text>
            <VStack align="flex-start" gap={SPACING.scale.sm}>
              {Object.entries(SPACING.scale).map(([key, value]) => (
                <HStack key={key} gap={SPACING.scale.md}>
                  <Text fontSize={TYPOGRAPHY.sizes.sm} minW="60px">
                    {key}:
                  </Text>
                  <Box
                    h="20px"
                    w={value}
                    bg={COLORS.brand.accent}
                    borderRadius={BORDERS.radius.sm}
                  />
                  <Text fontSize={TYPOGRAPHY.sizes.xs} color={COLORS.brand.textMuted}>
                    {value}
                  </Text>
                </HStack>
              ))}
            </VStack>

            {/* Code Example */}
            <CodeBlock
              title="Usage"
              code={`import { SPACING } from '@/design-system/foundations';

// Scale - General purpose spacing
<Box p={SPACING.scale.xs}>Extra Small Padding</Box>
<Box p={SPACING.scale.sm}>Small Padding</Box>
<Box p={SPACING.scale.md}>Medium Padding</Box>
<Box p={SPACING.scale.lg}>Large Padding</Box>
<Box p={SPACING.scale.xl}>Extra Large Padding</Box>
<Box p={SPACING.scale['2xl']}>2XL Padding</Box>

// Component-specific spacing
<VStack gap={SPACING.component.gap.sm}>Small Gap</VStack>
<VStack gap={SPACING.component.gap.md}>Medium Gap</VStack>
<VStack gap={SPACING.component.gap.lg}>Large Gap</VStack>

// Container padding
<Box p={{
  base: SPACING.container.padding.base,
  md: SPACING.container.padding.md,
  lg: SPACING.container.padding.lg
}}>
  Responsive Container Padding
</Box>

// Margins
<Box m={SPACING.scale.md}>Margin</Box>
<Box mx={SPACING.scale.lg}>Horizontal Margin</Box>
<Box my={SPACING.scale.lg}>Vertical Margin</Box>`}
            />
          </Box>

          {/* Borders */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Border Radius
            </Text>
            <HStack gap={SPACING.scale.md} flexWrap="wrap">
              {Object.entries(BORDERS.radius).map(([key, value]) => (
                <VStack key={key} gap={SPACING.scale.xs}>
                  <Box
                    w="80px"
                    h="80px"
                    bg={COLORS.brand.accent}
                    borderRadius={value}
                    border="2px solid"
                    borderColor={COLORS.brand.primary}
                  />
                  <Text fontSize={TYPOGRAPHY.sizes.xs}>{key}</Text>
                  <Text fontSize={TYPOGRAPHY.sizes.xs} color={COLORS.brand.textMuted}>
                    {value}
                  </Text>
                </VStack>
              ))}
            </HStack>

            {/* Code Example */}
            <CodeBlock
              title="Usage"
              code={`import { BORDERS } from '@/design-system/foundations';

// Border Radius
<Box borderRadius={BORDERS.radius.none}>No Radius</Box>
<Box borderRadius={BORDERS.radius.sm}>Small Radius</Box>
<Box borderRadius={BORDERS.radius.md}>Medium Radius</Box>
<Box borderRadius={BORDERS.radius.lg}>Large Radius</Box>
<Box borderRadius={BORDERS.radius.xl}>Extra Large Radius</Box>
<Box borderRadius={BORDERS.radius.full}>Full Radius (Circle)</Box>

// Border Widths
<Box border={BORDERS.widths.thin}>Thin Border</Box>
<Box border={BORDERS.widths.medium}>Medium Border</Box>
<Box border={BORDERS.widths.thick}>Thick Border</Box>

// Combining Borders
<Box
  border={BORDERS.default.thin}
  borderRadius={BORDERS.radius.md}
>
  Card with Border and Radius
</Box>`}
            />
          </Box>

          {/* Shadows */}
          <Box>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Box Shadows
            </Text>
            <HStack gap={SPACING.scale.md} flexWrap="wrap">
              {Object.entries(SHADOWS.box).map(([key, value]) => (
                <VStack key={key} gap={SPACING.scale.xs}>
                  <Box
                    w="100px"
                    h="100px"
                    bg={COLORS.brand.white}
                    borderRadius={BORDERS.radius.md}
                    boxShadow={value}
                  />
                  <Text fontSize={TYPOGRAPHY.sizes.xs}>{key}</Text>
                </VStack>
              ))}
            </HStack>

            {/* Code Example */}
            <CodeBlock
              title="Usage"
              code={`import { SHADOWS } from '@/design-system/foundations';

// Box Shadows
<Box boxShadow={SHADOWS.box.none}>No Shadow</Box>
<Box boxShadow={SHADOWS.box.xs}>Extra Small Shadow</Box>
<Box boxShadow={SHADOWS.box.sm}>Small Shadow</Box>
<Box boxShadow={SHADOWS.box.md}>Medium Shadow</Box>
<Box boxShadow={SHADOWS.box.lg}>Large Shadow</Box>
<Box boxShadow={SHADOWS.box.xl}>Extra Large Shadow</Box>
<Box boxShadow={SHADOWS.box['2xl']}>2XL Shadow</Box>
<Box boxShadow={SHADOWS.box.container}>Container Shadow</Box>

// Combining with other tokens
<Box
  bg={COLORS.brand.white}
  borderRadius={BORDERS.radius.lg}
  boxShadow={SHADOWS.box.container}
  p={SPACING.scale.lg}
>
  Complete Card Example
</Box>`}
            />
          </Box>
        </Section>

        {/* ================================================================ */}
        {/* ATOMS */}
        {/* ================================================================ */}

        <Section
          title="2. Atoms"
          description="Basic building blocks that cannot be broken down further"
        >
          {/* Buttons */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Buttons
            </Text>

            {/* Button Variants */}
            <Box mb={SPACING.scale.md}>
              <Text
                fontSize={TYPOGRAPHY.sizes.sm}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.secondary}
                mb={SPACING.scale.sm}
              >
                Variants
              </Text>
              <HStack gap={SPACING.scale.md} flexWrap="wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </HStack>
            </Box>

            {/* Button Sizes */}
            <Box mb={SPACING.scale.md}>
              <Text
                fontSize={TYPOGRAPHY.sizes.sm}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.secondary}
                mb={SPACING.scale.sm}
              >
                Sizes
              </Text>
              <HStack gap={SPACING.scale.md} flexWrap="wrap" alignItems="center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </HStack>
            </Box>

            {/* Button with Icons */}
            <Box>
              <Text
                fontSize={TYPOGRAPHY.sizes.sm}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.secondary}
                mb={SPACING.scale.sm}
              >
                With Icons
              </Text>
              <HStack gap={SPACING.scale.md} flexWrap="wrap">
                <Button variant="primary" icon={IoAdd} iconPosition="left">
                  Add Item
                </Button>
                <Button variant="secondary" icon={IoArrowForward} iconPosition="right">
                  Next
                </Button>
                <Button variant="outline" icon={IoSave}>
                  Save
                </Button>
                <Button variant="ghost" icon={IoTrash}>
                  Delete
                </Button>
              </HStack>
            </Box>
          </Box>

          {/* Badges */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Badges
            </Text>

            {/* Badge Variants */}
            <Box mb={SPACING.scale.md}>
              <Text
                fontSize={TYPOGRAPHY.sizes.sm}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.secondary}
                mb={SPACING.scale.sm}
              >
                Variants
              </Text>
              <HStack gap={SPACING.scale.md} flexWrap="wrap">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </HStack>
            </Box>

            {/* Badge Sizes */}
            <Box>
              <Text
                fontSize={TYPOGRAPHY.sizes.sm}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.secondary}
                mb={SPACING.scale.sm}
              >
                Sizes
              </Text>
              <HStack gap={SPACING.scale.md} flexWrap="wrap" alignItems="center">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
              </HStack>
            </Box>
          </Box>

          {/* Text */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Text
            </Text>
            <VStack align="flex-start" gap={SPACING.scale.sm}>
              <Text fontSize="xs">Extra Small Text</Text>
              <Text fontSize="sm">Small Text</Text>
              <Text fontSize="md">Medium Text (Default)</Text>
              <Text fontSize="lg">Large Text</Text>
              <Text fontSize="xl">Extra Large Text</Text>
              <Text fontSize="2xl" fontWeight="bold">2XL Bold Text</Text>
              <Text color={COLORS.brand.textMuted}>Muted Text Color</Text>
              <Text color={COLORS.brand.accent}>Accent Text Color</Text>
            </VStack>
          </Box>

          {/* Input */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Input
            </Text>
            <VStack align="flex-start" gap={SPACING.scale.md} maxW="400px">
              <Input placeholder="Default input" />
              <Input placeholder="Small input" size="sm" />
              <Input placeholder="Medium input" size="md" />
              <Input placeholder="Large input" size="lg" />
              <Input placeholder="Disabled input" disabled />
            </VStack>
          </Box>

          {/* Textarea */}
          <Box>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Textarea
            </Text>
            <VStack align="flex-start" gap={SPACING.scale.md} maxW="400px">
              <Textarea placeholder="Default textarea" />
              <Textarea placeholder="Small textarea" size="sm" rows={3} />
              <Textarea placeholder="Medium textarea" size="md" rows={4} />
              <Textarea placeholder="Large textarea" size="lg" rows={5} />
            </VStack>
          </Box>
        </Section>

        {/* ================================================================ */}
        {/* MOLECULES */}
        {/* ================================================================ */}

        <Section
          title="3. Molecules"
          description="Combinations of atoms that work together as a unit"
        >
          {/* FormField */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              FormField
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.sm}
              color={COLORS.brand.textMuted}
              mb={SPACING.scale.md}
            >
              Combines label, input/textarea, and error message into a reusable form field
            </Text>

            <VStack align="flex-start" gap={SPACING.scale.lg} maxW="500px">
              {/* Visual Example */}
              <Box w="100%">
                <FormField
                  label="Email Address"
                  type="email"
                  value=""
                  onChange={() => {}}
                  placeholder="Enter your email"
                  required
                />
              </Box>
              <Box w="100%">
                <FormField
                  label="Message"
                  type="textarea"
                  value=""
                  onChange={() => {}}
                  placeholder="Enter your message"
                  rows={4}
                />
              </Box>

              {/* Code Example */}
              <CodeBlock
                title="Usage"
                code={`import { FormField } from '@/design-system/molecules/FormField';

<FormField
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  required
  error={emailError}
/>`}
              />
            </VStack>
          </Box>

          {/* SectionWrapper */}
          <Box>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              SectionWrapper
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.sm}
              color={COLORS.brand.textMuted}
              mb={SPACING.scale.md}
            >
              Wrapper component for page sections with consistent spacing
            </Text>

            <VStack align="flex-start" gap={SPACING.scale.lg} w="100%">
              {/* Code Example */}
              <CodeBlock
                title="Usage"
                code={`import SectionWrapper from '@/design-system/molecules/SectionWrapper';

<SectionWrapper id="hero" minHeight="100vh">
  <YourContent />
</SectionWrapper>`}
              />
            </VStack>
          </Box>
        </Section>

        {/* ================================================================ */}
        {/* ORGANISMS */}
        {/* ================================================================ */}

        <Section
          title="4. Organisms"
          description="Complex UI components built from molecules and atoms"
        >
          {/* ProjectShowcaseCard */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              ProjectShowcaseCard
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.sm}
              color={COLORS.brand.textMuted}
              mb={SPACING.scale.md}
            >
              Displays project information with company logo, mockup, and details grid
            </Text>

            <VStack align="flex-start" gap={SPACING.scale.lg} w="100%">
              {/* Visual Example */}
              <Box w="100%" maxW="800px">
                <ProjectShowcaseCard
                  company_name="Sample Company"
                  company_logo_url="https://via.placeholder.com/150x50"
                  title="Revolutionary Product Design"
                  mockup_url="https://via.placeholder.com/800x400"
                  problem="Users struggled with complex navigation"
                  solution="Simplified UX with intuitive patterns"
                  benefit="40% increase in user engagement"
                  role="Lead Product Designer"
                />
              </Box>

              {/* Code Example */}
              <CodeBlock
                title="Usage"
                code={`import ProjectShowcaseCard from '@/design-system/organisms/ProjectCard';

<ProjectShowcaseCard
  company_name="Sample Company"
  company_logo_url="/path/to/logo.png"
  title="Revolutionary Product Design"
  mockup_url="/path/to/mockup.png"
  problem="Users struggled with complex navigation"
  solution="Simplified UX with intuitive patterns"
  benefit="40% increase in user engagement"
  role="Lead Product Designer"
/>`}
              />
            </VStack>
          </Box>

          {/* ReviewCard */}
          <Box>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              ReviewCard
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.sm}
              color={COLORS.brand.textMuted}
              mb={SPACING.scale.md}
            >
              Displays testimonials with expandable content and LinkedIn link
            </Text>

            <VStack align="flex-start" gap={SPACING.scale.lg} w="100%">
              {/* Visual Example */}
              <Box w="100%" maxW="600px">
                <ReviewCard
                  review={{
                    name: "John Doe",
                    content: "Working with this designer was an absolute pleasure. Their attention to detail and ability to understand complex requirements resulted in an outstanding product that exceeded our expectations.",
                    role: "Senior Product Manager",
                    company: "Tech Corp",
                    linkedinUrl: "https://linkedin.com"
                  }}
                />
              </Box>

              {/* Code Example */}
              <CodeBlock
                title="Usage"
                code={`import ReviewCard from '@/design-system/organisms/ReviewCard';

<ReviewCard
  review={{
    name: "John Doe",
    content: "Working with this designer was excellent...",
    role: "Senior Product Manager",
    company: "Tech Corp",
    linkedinUrl: "https://linkedin.com/in/johndoe"
  }}
/>`}
              />
            </VStack>
          </Box>
        </Section>

        {/* ================================================================ */}
        {/* USAGE EXAMPLES */}
        {/* ================================================================ */}

        <Section
          title="5. Real Page Examples"
          description="How components are used together in actual pages"
        >
          {/* Landing Section Example */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Landing Section Pattern
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.sm}
              color={COLORS.brand.textMuted}
              mb={SPACING.scale.md}
            >
              From src/app/sections/LandingSection.tsx - Hero section with responsive typography and CTAs
            </Text>

            <VStack align="flex-start" gap={SPACING.scale.lg} w="100%">
              {/* Visual Example */}
              <Box
                w="100%"
                bg={COLORS.ui.containerBg}
                borderRadius={BORDERS.radius.md}
                boxShadow={SHADOWS.box.container}
                overflow="hidden"
                border={BORDERS.widths.thin}
                borderColor={COLORS.ui.containerBorder}
                p={{
                  base: SPACING.scale.md,
                  md: SPACING.container.padding.md
                }}
              >
                <VStack gap={SPACING.scale.md} align="flex-start" w="100%">
                  <Text
                    fontSize={{
                      base: TYPOGRAPHY.sizes.md,
                      md: TYPOGRAPHY.sizes['xl']
                    }}
                    color={COLORS.brand.secondary}
                    fontWeight={TYPOGRAPHY.weights.normal}
                  >
                    Hello, I&apos;m
                  </Text>
                  <Text
                    fontSize={{
                      base: TYPOGRAPHY.sizes['3xl'],
                      md: TYPOGRAPHY.sizes['5xl']
                    }}
                    fontWeight={TYPOGRAPHY.weights.bold}
                    lineHeight={TYPOGRAPHY.lineHeights.tight}
                    color={COLORS.brand.primary}
                  >
                    Your Name
                  </Text>
                  <Text
                    fontSize={{
                      base: TYPOGRAPHY.sizes.sm,
                      md: TYPOGRAPHY.sizes.md
                    }}
                    color={COLORS.brand.textMuted}
                    lineHeight={TYPOGRAPHY.lineHeights.relaxed}
                  >
                    A brief description of what you do and your expertise.
                  </Text>
                  <HStack gap={SPACING.component.gap.md} flexWrap="wrap">
                    <Button variant="primary" icon={IoArrowForward}>
                      See my work
                    </Button>
                    <Button variant="outline" icon={IoChatbubble}>
                      Let&apos;s talk
                    </Button>
                  </HStack>
                </VStack>
              </Box>

              {/* Code Example */}
              <CodeBlock
                title="Code from LandingSection.tsx"
                code={`<Box
  maxW={SIZES.container['5xl']}
  w="100%"
  bg={COLORS.ui.containerBg}
  borderRadius={BORDERS.radius.md}
  boxShadow={SHADOWS.box.container}
  p={{
    base: SPACING.scale.md,
    md: SPACING.container.padding.md,
    lg: SPACING.container.padding.lg
  }}
>
  <VStack gap={{ base: SPACING.scale.md, md: SPACING.component.gap.lg }}>
    <Text
      fontSize={{ base: TYPOGRAPHY.sizes.md, md: TYPOGRAPHY.sizes['xl'] }}
      color={COLORS.brand.secondary}
    >
      {landingData.hero_subtitle}
    </Text>

    <Text
      fontSize={{ base: TYPOGRAPHY.sizes['3xl'], md: TYPOGRAPHY.sizes['5xl'] }}
      fontWeight={TYPOGRAPHY.weights.bold}
      color={COLORS.brand.primary}
    >
      {landingData.hero_title}
    </Text>

    <HStack gap={SPACING.component.gap.md}>
      <Button variant="primary" icon={IoArrowForward}>
        See my work
      </Button>
      <Button variant="outline" icon={IoChatbubble}>
        Let's talk
      </Button>
    </HStack>
  </VStack>
</Box>`}
              />
            </VStack>
          </Box>

          {/* Projects Section Pattern */}
          <Box mb={SPACING.scale.xl}>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Projects List Pattern
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.sm}
              color={COLORS.brand.textMuted}
              mb={SPACING.scale.md}
            >
              From src/app/sections/Projects.tsx - Mapping data to ProjectShowcaseCard components
            </Text>

            <CodeBlock
              title="Code from Projects.tsx"
              code={`import ProjectShowcaseCard from '@/design-system/organisms/ProjectCard';
import { projectsAPI } from '@/api/projectsAPI';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await projectsAPI.getAllProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <Box maxW={SIZES.container['5xl']} w="100%" mx="auto">
      <Text
        fontSize={{ base: TYPOGRAPHY.sizes['2xl'], md: TYPOGRAPHY.sizes['3xl'] }}
        fontWeight={TYPOGRAPHY.weights.bold}
        color={COLORS.brand.primary}
      >
        Projects
      </Text>

      <VStack gap={{ base: SPACING.scale.xl, md: SPACING.scale['2xl'] }}>
        {projects.map((project) => (
          <ProjectShowcaseCard
            key={project.id}
            company_name={project.company_name}
            company_logo_url={project.company_logo_url}
            title={project.title}
            mockup_url={project.mockup_url}
            problem={project.problem}
            solution={project.solution}
            benefit={project.benefit}
            role={project.role}
          />
        ))}
      </VStack>
    </Box>
  );
}`}
            />
          </Box>

          {/* Responsive Design Pattern */}
          <Box>
            <Text
              fontSize={TYPOGRAPHY.sizes.xl}
              fontWeight={TYPOGRAPHY.weights.semibold}
              color={COLORS.brand.primary}
              mb={SPACING.scale.md}
            >
              Responsive Design Pattern
            </Text>
            <Text
              fontSize={TYPOGRAPHY.sizes.sm}
              color={COLORS.brand.textMuted}
              mb={SPACING.scale.md}
            >
              Using design tokens for responsive breakpoints across the application
            </Text>

            <CodeBlock
              title="Responsive Patterns"
              code={`// Font sizes with responsive breakpoints
fontSize={{
  base: TYPOGRAPHY.sizes.md,      // Mobile
  md: TYPOGRAPHY.sizes.xl,        // Tablet
  lg: TYPOGRAPHY.sizes['2xl']     // Desktop
}}

// Spacing with responsive breakpoints
gap={{
  base: SPACING.scale.md,         // Mobile
  md: SPACING.scale.lg,           // Tablet
  lg: SPACING.scale.xl            // Desktop
}}

// Padding with responsive breakpoints
p={{
  base: SPACING.scale.md,
  md: SPACING.container.padding.md,
  lg: SPACING.container.padding.lg
}}

// Grid columns with responsive breakpoints
templateColumns={{
  base: "1fr",                    // Mobile: 1 column
  md: "repeat(2, 1fr)",          // Tablet: 2 columns
  lg: "repeat(4, 1fr)"           // Desktop: 4 columns
}}`}
            />
          </Box>
        </Section>
      </VStack>
    </Box>
  );
}
