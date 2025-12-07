"use client";

import { Box, Flex } from "@chakra-ui/react";
import { COLORS } from "@/design-system/foundations";
import { usePathname } from "next/navigation";
import Sidebar from "@/design-system/organisms/Sidebar";
import SiteHeader from "@/design-system/organisms/SiteHeader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Admin routes now use AdminLayout which includes header and sidebar
    return (
      <Box h="100vh" bg={COLORS.brand.bg}>
        {children}
      </Box>
    );
  }

  return (
    <Flex h="100vh">
      <Sidebar />

      <Box flex="1" display="flex" flexDirection="column">
        <SiteHeader />

        <Box flex="1" overflow="auto" bg={COLORS.brand.bg}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
