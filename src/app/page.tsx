import Image from "next/image";
import styles from "./page.module.css";
import SiteLayout from "@/design-system/templates/SiteLayout";
import { Box } from "@chakra-ui/react";
import SectionWrapper from "@/design-system/molecules/SectionWrapper";
import LandingSection from "./sections/LandingSection";

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
        <Projects />
      </SectionWrapper>
      <SectionWrapper id="reviews">
        <SwiperComponent />
      </SectionWrapper>
      <SectionWrapper id="career">
        <CareerTimeline />
      </SectionWrapper>
      <SectionWrapper id="about">
        <AboutMeSection />
      </SectionWrapper>
      <SectionWrapper id="contact">
        <ContactSection />
      </SectionWrapper>
    </Box>
  );
}
