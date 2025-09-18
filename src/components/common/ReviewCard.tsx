"use client";

import {
  Box,
  Text,
  VStack,
  Card,
  Link,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import { IoMdQuote } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { useState } from "react";

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
      <Box p={6} textAlign="center">
        <Text color="brand.secondary">No review data available</Text>
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
      p={6}
      boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      border="1px solid"
      borderColor="brand.divider"
      borderRadius="md"
      overflow="hidden"
      position="relative"
>
      <Card.Body>
        {/* Quote icon */}
        <Box
          position="absolute"
          top={4}
          right={4}
          color="brand.bgAccent"
          fontSize="2xl"
        >
          <IoMdQuote />
        </Box>

        <VStack align="start" gap={4}  justify="space-between">
          {/* Review content */}
          <Box flex="1" overflow="hidden">
            <Text fontSize="md" color="brand.textMuted" lineHeight="1.6" mb={2}>
              "{displayContent || "No content available"}"
            </Text>
            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                color="brand.accent"
                fontWeight="500"
                p={0}
                h="auto"
                minH="auto"
                _hover={{ color: "brand.primary" }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </Button>
            )}
          </Box>

          {/* Reviewer info and LinkedIn link */}
          <VStack align="start" gap={1} w="full" mt="auto">
            <Text fontSize="lg" fontWeight="700" color="brand.accent">
              {review.name}
            </Text>

            <Text fontSize="sm" color="brand.secondary">
              {review.role}
            </Text>

            <Text fontSize="sm" color="brand.secondary" mb={2}>
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
                color="brand.secondary"
                _hover={{ color: "brand.accent" }}
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
