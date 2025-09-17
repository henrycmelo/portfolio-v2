"use client";

import {
  Box,
  Text,
  VStack,
  Card,
  Link,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { IoMdQuote } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";

type Review = {
  name: string;
  content: string;
  role: string;
  company: string;
  linkedinUrl: string;
};

const ReviewCard = ({ review }: { review: Review }) => {
  if (!review) {
    return (
      <Box p={6} textAlign="center">
        <Text color="brand.secondary">No review data available</Text>
      </Box>
    );
  }
  return (
    <Card.Root
      maxW="lg"
      mx="auto"
      w={"full"}
      p={6}
      boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      border="1px solid"
      borderColor="brand.divider"
      borderRadius="md"
      overflow="hidden"
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

        <VStack align="start">
          {/* Review content */}
          <Text fontSize="md" color="brand.textMuted" lineHeight="1.6">
            "{review.content || "No content available"}"
          </Text>

          {/* Reviewer info */}

          <VStack align="start" flex={1} gap={0}>
            <Text fontSize="lg" fontWeight="700" color="brand.accent">
              {review.name}
            </Text>

            <Text fontSize="sm" color="brand.secondary">
              {review.role}
            </Text>

            <Text fontSize="sm" color="brand.secondary">
              {review.company}
            </Text>
          </VStack>

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
      </Card.Body>
    </Card.Root>
  );
};

export default ReviewCard;
