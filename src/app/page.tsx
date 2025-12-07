import Image from "next/image";
import styles from "./page.module.css";
import SiteLayout from "@/design-system/templates/SiteLayout";
import { Box } from "@chakra-ui/react";
import SectionWrapper from "@/design-system/molecules/SectionWrapper";
import LandingSection from "./sections/LandingSection";
import ProjectShowcaseCard from "../components/common/ProjectShowcaseCard";
import { Text } from "@chakra-ui/react";
import Projects from "./sections/Projects";
import SwiperComponent from "./sections/SwiperComponent";
import CareerTimeline from "./sections/CareerTimeline";
import AboutMeSection from "./sections/AboutMeSection";
import ContactSection from "./sections/ContactSection";


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
        <CareerTimeline />
       
      </SectionWrapper>
      <SectionWrapper id="projects">
        <Text fontSize="5xl" fontWeight="bold" mb={4} color={
          'brand.primary'}>
          About Me
        </Text>
        <AboutMeSection />
       
      </SectionWrapper>
      <SectionWrapper id="contact">
        <Text fontSize="5xl" fontWeight="bold" mb={4} color={
          'brand.primary'}>
          Contact Me
        </Text>
        <ContactSection />
      </SectionWrapper>
    </Box>
  );
}
