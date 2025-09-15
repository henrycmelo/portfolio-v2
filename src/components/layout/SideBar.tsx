"use client";

import {
  Box,
  VStack,
  Text,
  Icon,
  HStack,
  Flex,
  Avatar,
  IconButton,
  Stack
} from "@chakra-ui/react";
import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuItems } from "@/data/navigation";
import socialsData from "@/data/socials";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const shouldShowSidebar = isCollapsed;

  return (
    <Box
      w={{ base: "60px", md: shouldShowSidebar ? "60px" : "300px" }}
      h="100vh"
      bg="brand.white"
      borderRight="1px solid"
      borderColor="brand.divider"
      position="relative"
    >
      <Box
        display={{base:'none', md:'block'}}
        position="absolute"
        top={16}
        right={-4}
        zIndex={10}
        >
          <IconButton variant='outline' size={'sm'} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={()=>setIsCollapsed(!isCollapsed)} >
            {isCollapsed ? <IoChevronForward /> : <IoChevronBack  />}
          </IconButton>
        </Box>
    

      <Flex
        px={{ base: 2, md: shouldShowSidebar? 2: 6 }}
        py={{ base: 4, md: shouldShowSidebar? 4 : 6 }}
        gap={3}
      >
        <Avatar.Root size="md">
          <Avatar.Fallback name="Segun Adebayo" />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
        <Box display={{ base: "none", md: shouldShowSidebar ? "none" : "block" }}>
          <Text color="brand.primary" fontSize="sm">
            Henry C. Melo
          </Text>
          <Text fontSize="xs" color="brand.textMuted">
            Product Designer | M.S HCI & UX
          </Text>
        </Box>
      </Flex>

      {/* Menu Items */}
      <VStack align="stretch" gap={1} px={0}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          const menuButton = (
            <Box
              borderRadius="md"
              bg={isActive ? "brand.accent" : "transparent"}
              _hover={{ bg: isActive ? "brand.selected" : "brand.divider" }}
            >
              <HStack
                px={{ base: 2, md: 6 }}
                py={{ base: 4, md: 3 }}
                color={isActive ? "brand.white" : "brand.secondary"}
                cursor="pointer"
                gap={3}
                justify={{ base: "center", md: shouldShowSidebar? "center":"flex-start" }}
              >
                <Icon fontSize="20px">
                  <item.icon />
                </Icon>
                <Text
                  fontSize="sm"
                  fontWeight={isActive ? "500" : "400"}
                  display={{ base: "none", md: shouldShowSidebar? "none":"block" }}
                >
                  {item.label}
                </Text>
              </HStack>
            </Box>
          );
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <Box display={{ base: "block", md: "none" }}>
                <Tooltip showArrow content={item.label}>
                  {menuButton}
                </Tooltip>
              </Box>
              <Box display={{ base: "none", md: "block" }}>{menuButton}</Box>
            </Link>
          );
        })}
      </VStack>

      {/* User Profile */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        borderTop="1px solid"
        borderColor="brand.divider"
        p={{ base: 2, md: 3 }}
      >
        <Stack direction={{ base: "column", md: shouldShowSidebar ? "column" : "row" }} gap={5} justify={{ base: "center", md: "center" }} p={2}>
          {socialsData.map((social) => {
            const IconComponent = social.icon;
            return (
              <Tooltip key={social.id} showArrow content={social.label}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
              
                  
                >
                  <Icon size={"md"} color="brand.secondary" _hover={{color: "brand.accent"}}>
                    <IconComponent />
                  </Icon>
                </Link>
              </Tooltip>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
