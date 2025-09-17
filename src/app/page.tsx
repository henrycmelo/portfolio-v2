import Image from "next/image";
import styles from "./page.module.css";
import SiteLayout from "@/components/layout/SiteLayout";
import { Box } from "@chakra-ui/react";
import SectionWrapper from "@/components/common/SectionWrapper";
import LandingSection from "./sections/LandingSection";
import ProjectShowcaseCard from "../components/common/ProjectShowcaseCard";
import { Text } from "@chakra-ui/react";
import Projects from "./sections/Projects";
import SwiperComponent from "./sections/SwiperComponent";
import ReviewCard from "@/components/common/ReviewCard";


export default function Home() {
  return (
    <Box>
      <SectionWrapper id="home">
        <LandingSection />
      </SectionWrapper>
      <SectionWrapper id="projects">
        <Text fontSize="5xl" fontWeight="bold" mb={4} color={
          'brand.primary'}>
          Projects
        </Text>
        <Projects />
      </SectionWrapper>
      <SectionWrapper id="projects">
        <Text fontSize="5xl" fontWeight="bold" mb={4} color={
          'brand.primary'}>
          What People Say About Me
        </Text>
        <SwiperComponent />
    
       
      </SectionWrapper>
      <SectionWrapper id="projects">
        <Text fontSize="5xl" fontWeight="bold" mb={4} color={
          'brand.primary'}>
          Career Timeline
        </Text>
       
      </SectionWrapper>
      <SectionWrapper id="projects">
        <Text fontSize="5xl" fontWeight="bold" mb={4} color={
          'brand.primary'}>
          About Me
        </Text>
       
      </SectionWrapper>
      <SectionWrapper id="projects">
        <Text fontSize="5xl" fontWeight="bold" mb={4} color={
          'brand.primary'}>
          Contact Me
        </Text>
       
      </SectionWrapper>
    </Box>
  );
}
