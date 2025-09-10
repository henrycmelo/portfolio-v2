import Image from "next/image";
import styles from "./page.module.css";
import SiteLayout from "@/components/layout/SiteLayout";
import { Box } from "@chakra-ui/react";
import SectionWrapper from "@/components/common/SectionWrapper";
import LandingSection from "./sections/LandingSection";

export default function Home() {
  return (
    <Box>
      <SectionWrapper id="home">
        <LandingSection />
      </SectionWrapper>
    </Box>
  );
}
