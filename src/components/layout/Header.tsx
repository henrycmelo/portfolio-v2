import { Box, HStack, Text, Avatar, Flex, Icon, Button } from "@chakra-ui/react";
import Link from "next/link";
import { Tooltip } from "@/components/ui/tooltip";
import socialsData from "@/data/socials";
import FlexibleButton from "../button/FlexibleButton";
import { IoChevronDownCircleOutline, IoDownload } from "react-icons/io5";

export default function SiteHeader() {
  return (
    <Box
      bg="brand.white"
      px={{ base: 2, md: 6 }}
      py={{ base: 4, md: 6 }}
      borderBottom="1px solid"
      borderColor="brand.divider"
      minH="90px"
      alignContent={"center"}
      justifyItems="right"
    >
      <Flex justify="space-between" align="center" gap={3}>
          
        {/* Social Links */}
        <HStack gap={3} display={{ base: "none", md: "flex" }}>
           <Box w={2} h={2} bg="brand.textMuted" borderRadius="full" />
          <Text fontSize="md" color="brand.textMuted">
            Based in New York City
          </Text>
        </HStack>
        <FlexibleButton variant="ghost" icon={IoDownload}> Download My Resume</FlexibleButton>
      </Flex>
    </Box>
  );
}
