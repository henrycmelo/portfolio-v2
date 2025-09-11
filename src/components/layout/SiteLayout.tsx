"use client";

import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./SideBar";
import SiteHeader from "./Header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex h="100vh" >
      <Sidebar />

      <Box flex="1" display="flex" flexDirection="column" >
        <SiteHeader />

        <Box flex="1" overflow="auto" bg={"brand.bg"}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
