"use client";

import { Box, VStack, Text, Icon, HStack, Image, Flex,Avatar } from "@chakra-ui/react";

import { Tooltip } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoBriefcase, IoChatbox, IoFolder, IoHome, IoMail, IoPerson } from "react-icons/io5";
import {menuItems} from "@/data/navigation";
import socialsData from "@/data/socials";



export default function Sidebar() {
  const pathname = usePathname();
  

  return (
    <Box
      w={{ base: "60px", md: "300px" }}
      h="100vh"
      bg="white"
      borderRight="1px solid"
      borderColor="brand.divider"
      position="relative"
    >
     <Flex
  px={{ base: 2, md: 6 }}
  py={{ base: 4, md: 6 }}
  borderBottom="1px solid"
  borderColor="brand.divider"
  gap={3}
  
>
  <Avatar.Root size='md' >
    <Avatar.Fallback name="Segun Adebayo" />
    <Avatar.Image src="https://bit.ly/sage-adebayo" />
  </Avatar.Root>
  <Box display={{ base: "none", md: "block" }}>
    <Text color='brand.primary' fontSize="sm">
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
        bg={isActive ? "brand.primary" : "transparent"}
        _hover={{ bg: isActive ? "brand.selected" : "brand.selected" }}
      >
        <HStack
          px={{ base: 2, md: 6 }}
          py={{ base: 4, md: 3 }}
          color={isActive ? "brand.links" : "brand.secondary"}
          cursor="pointer"
          gap={3}
          justify={{ base: "center", md: "flex-start" }}
          
        >
          <Icon fontSize="20px">
            <item.icon />
          </Icon>
          <Text 
            fontSize="sm" 
            fontWeight={isActive ? "500" : "400"}
            display={{ base: "none", md: "block" }}
            
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
              <Box display={{ base: "none", md: "block" }}>
                {menuButton}
              </Box>
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
        <HStack gap={5} justify={{ base: "center", md: "center" }}>
          {socialsData.map((social) => {
      const Icon = social.icon;
      return (
        <Tooltip key={social.id} showArrow content={social.label}>
          <Link
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Box
              color={'brand.secondary'}
              _hover={{ color: "brand.primary" }}
              transition="color 0.2s"
              fontSize="20px"
              display="flex"
              alignItems="center"
              p={2}
            >
              <Icon />
            </Box>
          </Link>
        </Tooltip>
      );
    })}
        </HStack>
      </Box>
    </Box>
  );
}