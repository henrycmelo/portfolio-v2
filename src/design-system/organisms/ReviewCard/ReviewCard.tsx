"use client";

import {
  Box,
  VStack,
  Card,
  Link,
  Icon,
  Button,
} from "@chakra-ui/react";
import { IoMdQuote } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { useState } from "react";
import { Text } from "@/design-system/atoms";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY } from "@/design-system/foundations";

type Review = {
  name: string;
  content: string;
  role: string;
  company: string;
  linkedinUrl: string;
};

const ReviewCard = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200; // Maximum characters to show before truncating
  const shouldTruncate = review?.content && review.content.length > maxLength;

  if (!review) {
    return (
      <Box p={SPACING.component.padding.card.y} textAlign="center">
        <Text color={COLORS.brand.secondary}>No review data available</Text>
      </Box>
    );
  }

  const displayContent = shouldTruncate && !isExpanded
    ? review.content.substring(0, maxLength) + "..."
    : review.content;

  return (
    <Card.Root
      maxW="lg"
      mx="auto"
      w={"full"}
      h="auto"
      py={SPACING.component.padding.card.y}
      px={SPACING.component.padding.card.x}
      bg={COLORS.brand.white}
      
      border="1px solid"
      borderColor={COLORS.ui.containerBorder}
      borderRadius={BORDERS.radius.md}
      overflow="hidden"
      position="relative"
>
      <Card.Body>
        {/* Quote icon */}
        <Box
          position="absolute"
          top={SPACING.component.gap.md}
          right={SPACING.component.gap.md}
          color={COLORS.brand.bgAccent}
          fontSize={TYPOGRAPHY.sizes['2xl']}
        >
          <IoMdQuote />
        </Box>

        <VStack align="start" gap={SPACING.component.gap.md} justify="space-between">
          {/* Review content */}
          <Box flex="1" overflow="hidden">
            <Text
              fontSize={TYPOGRAPHY.sizes.md}
              color={COLORS.brand.textMuted}
              lineHeight={TYPOGRAPHY.lineHeights.relaxed}
              mb={SPACING.scale.xs}
            >
              "{displayContent || "No content available"}"
            </Text>
            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                color={COLORS.brand.accent}
                fontWeight={TYPOGRAPHY.weights.medium}
                p={0}
                h="auto"
                minH="auto"
                _hover={{ color: COLORS.brand.primary }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </Button>
            )}
          </Box>

          {/* Reviewer info and LinkedIn link */}
          <VStack align="start" gap={1} w="full" mt="auto">
            <Text
              fontSize={TYPOGRAPHY.sizes.lg}
              fontWeight={TYPOGRAPHY.weights.bold}
              color={COLORS.brand.accent}
            >
              {review.name}
            </Text>

            <Text fontSize={TYPOGRAPHY.sizes.sm} color={COLORS.brand.secondary}>
              {review.role}
            </Text>

            <Text
              fontSize={TYPOGRAPHY.sizes.sm}
              color={COLORS.brand.secondary}
              mb={SPACING.scale.xs}
            >
              {review.company}
            </Text>

            {/* LinkedIn link */}
            <Link
              href={review.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Icon
                size={"md"}
                color={COLORS.brand.secondary}
                _hover={{ color: COLORS.brand.accent }}
              >
                <IoLogoLinkedin />
              </Icon>
            </Link>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default ReviewCard;
