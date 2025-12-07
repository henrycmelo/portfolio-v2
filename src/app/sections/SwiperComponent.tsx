"use client";

import { Box, Text, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ReviewCard from "@/design-system/organisms/ReviewCard";
import "@splidejs/react-splide/css";
import { reviewsAPI, type DatabaseReview } from "@/api/reviewsAPI";

const SwiperComponent = () => {
  const [reviews, setReviews] = useState<DatabaseReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
   if (isLoading) return (
          <Box textAlign={"center"} py={10} px={6} color={'brand.secondary'}>
              <Spinner size="xl" />
              <Text mt={4} >Loading reviews...</Text>
          </Box>
      );
      if (error) return (
          <Box textAlign={"center"} py={10} px={6}>
              <Text color="red.500" fontSize="lg">{error}</Text>
          </Box>
      )
  return (
    <Box p={6} minH="400px" display="flex" alignItems="center">
      <Splide
        aria-label="Customer Reviews"
        options={{
          perPage: 1,
          rewind: true,
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          pauseOnFocus: true,
          arrows: true,
          pagination: true,
          gap: '1rem',
          breakpoints: {
            768: {
              perPage: 1,
              arrows: false
            }
          }
        }}
      >
        {reviews.map((review) => (
          <SplideSlide key={review.id}>
            <Box px={4} py={2} display="flex" justifyContent="center" alignItems="center" minH="350px">
              <ReviewCard
                review={{
                  name: review.reviewer_name,
                  content: review.content,
                  role: review.reviewer_role,
                  company: review.company,
                  linkedinUrl: review.linkedin_url,
                }}
              />
            </Box>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default SwiperComponent;
