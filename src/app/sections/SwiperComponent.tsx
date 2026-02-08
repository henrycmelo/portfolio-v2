"use client";

import { Box, Spinner, HStack, IconButton } from "@chakra-ui/react";
import { Text, FadeIn } from "@/design-system/atoms";
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import ReviewCard from "@/design-system/organisms/ReviewCard";
import { reviewsAPI, type DatabaseReview } from "@/api/reviewsAPI";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { usePrefersReducedMotion } from "@/hooks/useScrollAnimation";

const SwiperComponent = () => {
  const [reviews, setReviews] = useState<DatabaseReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reviewsAPI.getAllReviews();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (reviews.length === 0 || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length, prefersReducedMotion]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };

  if (isLoading) return (
    <Box textAlign="center" py={10} px={6} color="brand.secondary">
      <Spinner size="xl" />
      <Text mt={4}>Loading reviews...</Text>
    </Box>
  );

  if (error) return (
    <Box textAlign="center" py={10} px={6}>
      <Text color="red.500" fontSize="lg">{error}</Text>
    </Box>
  );

  // Animation variants for card transitions
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(4px)',
    }),
  };

  return (
    <Box
      maxW={SIZES.container['5xl']}
      w="full"
      bg={COLORS.brand.bgSecondary}
      borderRadius={BORDERS.radius.lg}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
      overflow="hidden"
      border="1px solid"
      borderColor={COLORS.brand.border}
      mx="auto"
    >
      {/* Content Area */}
      <Box p={{
        base: SPACING.container.padding.base,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}>
        {/* Section Title */}
        <FadeIn direction="up" delay={0} duration={0.5}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes['3xl'],
              md: TYPOGRAPHY.sizes['4xl'],
              lg: TYPOGRAPHY.sizes['5xl']
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.text}
            mb={SPACING.scale.xl}
          >
            What People Say About Me
          </Text>
        </FadeIn>

        {/* Reviews Carousel */}
        <Box
          position="relative"
          minH="400px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Navigation Arrows */}
          <IconButton
            aria-label="Previous review"
            position="absolute"
            left={{ base: 0, md: 4 }}
            zIndex={10}
            onClick={prevSlide}
            variant="ghost"
            color={COLORS.brand.accent}
            _hover={{ bg: COLORS.brand.hover }}
            display={{ base: 'none', md: 'flex' }}
          >
            <IoChevronBack size={24} />
          </IconButton>

          <IconButton
            aria-label="Next review"
            position="absolute"
            right={{ base: 0, md: 4 }}
            zIndex={10}
            onClick={nextSlide}
            variant="ghost"
            color={COLORS.brand.accent}
            _hover={{ bg: COLORS.brand.hover }}
            display={{ base: 'none', md: 'flex' }}
          >
            <IoChevronForward size={24} />
          </IconButton>

          {/* Carousel Content */}
          <Box
            w="full"
            maxW="800px"
            overflow="hidden"
            position="relative"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={prefersReducedMotion ? undefined : cardVariants}
                initial={prefersReducedMotion ? false : "enter"}
                animate="center"
                exit={prefersReducedMotion ? undefined : "exit"}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  filter: { duration: 0.3 },
                }}
                drag={prefersReducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1rem',
                  cursor: prefersReducedMotion ? 'default' : 'grab',
                }}
              >
                {reviews[activeIndex] && (
                  <ReviewCard
                    review={{
                      name: reviews[activeIndex].reviewer_name,
                      content: reviews[activeIndex].content,
                      role: reviews[activeIndex].reviewer_role,
                      company: reviews[activeIndex].company,
                      linkedinUrl: reviews[activeIndex].linkedin_url,
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>

        {/* Pagination Dots */}
        <HStack justify="center" gap={2} mt={6}>
          {reviews.map((_, index) => (
            <Box
              key={index}
              as="button"
              w={index === activeIndex ? "24px" : "8px"}
              h="8px"
              borderRadius="full"
              bg={index === activeIndex ? COLORS.brand.accent : COLORS.brand.border}
              transition="all 0.3s ease-in-out"
              cursor="pointer"
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              _hover={{
                bg: index === activeIndex ? COLORS.brand.accent : COLORS.brand.accentDark,
              }}
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default SwiperComponent;
