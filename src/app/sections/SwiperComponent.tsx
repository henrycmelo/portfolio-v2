"use client";

import { Box } from "@chakra-ui/react";
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ReviewCard from "@/components/common/ReviewCard";
import "@splidejs/react-splide/css";
// Sample review data
const reviewsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Product Manager",
    company: "TechCorp",
    avatar: "https://bit.ly/sage-adebayo",
    content:
      "This service completely transformed our workflow. The team's expertise and dedication to quality is unmatched. I've never experienced such seamless collaboration.",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "StartupHub",
    avatar: "https://bit.ly/ryan-florence",
    content:
      "Outstanding results! The technical implementation was flawless and delivered ahead of schedule. Their innovative approach solved problems we didn't even know we had.",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthCo",
    avatar: "https://bit.ly/prosper-baba",
    content:
      "The ROI we've seen is incredible. Their strategic insights and execution have driven our revenue up by 40% in just 6 months. Highly recommend!",
    linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: 4,
    name: "David Park",
    role: "Founder & CEO",
    company: "InnovateLabs",
    avatar: "https://bit.ly/kent-c-dodds",
    content:
      "Working with this team was a game-changer for our startup. Their expertise in scaling businesses is evident in every interaction. Professional and results-driven.",
    linkedinUrl: "https://linkedin.com/in/davidpark",
  },
];
const SwiperComponent = () => {
  return (
    <Box p={6}>
    <Splide aria-label="Customer Reviews" options={{ perPage: 2}}>
      {reviewsData.map((review) => (
        <SplideSlide key={review.id}>
          <ReviewCard review={review} />
        </SplideSlide>
      ))}
    </Splide>
    </Box>
  );
};

export default SwiperComponent;
