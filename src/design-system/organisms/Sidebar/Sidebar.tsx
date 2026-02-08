"use client";

import {
  Box,
  VStack,
  Icon,
  HStack,
  Flex,
  Avatar,
  IconButton,
  Stack
} from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from "@/design-system/foundations";
import { useState, useEffect, useRef } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuItems } from "@/data/navigation";
import socialsData from "@/data/socials";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { sidebarAPI, SidebarData } from "@/api/sidebarAPI";

interface SidebarProps {
  menuItems?: Array<{ icon: React.ComponentType; label: string; href: string }>;
  showProfile?: boolean;
  showSocials?: boolean;
  currentSection?: string;
  onSectionChange?: (section: string) => void;
  isAdminMode?: boolean;
}

export default function Sidebar({
  menuItems: customMenuItems,
  showProfile = true,
  showSocials = true,
  currentSection,
  onSectionChange,
  isAdminMode = false,
}: SidebarProps = {}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarData, setSidebarData] = useState<SidebarData | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const activeMenuItems = customMenuItems || menuItems;
  const sections = activeMenuItems.map(item => ({ id: item.href.replace('#', '') }));

  useEffect(() => {
    if (showProfile) {
      const fetchSidebarData = async () => {
        try {
          const data = await sidebarAPI.getSidebarData();
          if (data && data.length > 0) {
            setSidebarData(data[0]);
          }
        } catch (error) {
          console.error('Error fetching sidebar data:', error);
        }
      };

      fetchSidebarData();
    }
  }, [showProfile]);

  const shouldShowSidebar = isCollapsed;

  useEffect(()=>{
    contentRef.current = document.querySelector('[data-scroll-container="true"]')
  })

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    sectionElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(()=>{
    const container = contentRef.current;

    const handleScroll = () => {
      if(!container) return;

      let currentSection="";
      const containerRect = container.getBoundingClientRect();
      const triggerPoint = containerRect.top + containerRect.height / 3;

      sections?.forEach((section) =>{
        const element = document.getElementById(section.id)
        if(element){
          const rect= element.getBoundingClientRect();

          if(rect.top <= triggerPoint && rect.bottom >= triggerPoint){
            currentSection = section.id;
        }
      }
    });
     setActiveSection(currentSection);
    };

    if (container) {
      // Add scroll listener to the container
      container.addEventListener("scroll", handleScroll); // Without this, we wouldn't detect when someone scrolls inside the right content area

      handleScroll(); //It ensures that the correct section is highlighted right when the page loads

      window.addEventListener("scroll", handleScroll); //It's a safety net to catch all possible scroll scenarios
    }

    // Cleanup
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sections]);





  return (
    <Box
      w={{ base: "60px", md: shouldShowSidebar ? "60px" : "300px" }}
      h="100vh"
      bg={COLORS.brand.bgSecondary}
      borderRight={BORDERS.widths.thin}
      borderRightStyle={BORDERS.styles.solid}
      borderColor={COLORS.brand.border}
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
    

      {showProfile && (
        <Flex
          px={{ base: SPACING.scale.xs, md: shouldShowSidebar? SPACING.scale.xs: SPACING.component.gap.lg }}
          py={{ base: SPACING.component.gap.md, md: shouldShowSidebar? SPACING.component.gap.md : SPACING.component.gap.lg }}
          gap={SPACING.scale.sm}
        >
          {sidebarData && (
            <>
              <Avatar.Root size="md">
                <Avatar.Fallback name={sidebarData.name} />
                <Avatar.Image src={sidebarData.avatar_url} />
              </Avatar.Root>
              <Box display={{ base: "none", md: shouldShowSidebar ? "none" : "block" }}>
                <Text color={COLORS.brand.text} fontSize={TYPOGRAPHY.sizes.sm}>
                  {sidebarData.name}
                </Text>
                <Text fontSize={TYPOGRAPHY.sizes.xs} color={COLORS.brand.textSecondary}>
                  {sidebarData.subtitle}
                </Text>
              </Box>
            </>
          )}
        </Flex>
      )}

      {/* Menu Items */}
      <VStack align="stretch" gap={1} px={0}>
        {activeMenuItems.map((item) => {
          const sectionId = item.href.replace('#', '');
          const isActive = isAdminMode
            ? currentSection === sectionId
            : activeSection === sectionId;

          const handleClick = (e: React.MouseEvent) => {
            if (isAdminMode && onSectionChange) {
              onSectionChange(sectionId);
            } else {
              e.preventDefault();
              scrollToSection(sectionId);
            }
          };

          const menuButton = (
            <Box
              position="relative"
              borderRadius={BORDERS.radius.md}
              overflow="hidden"
              onClick={handleClick}
              cursor="pointer"
              transition="all 0.3s ease"
              bg={isActive ? `${COLORS.brand.accent}20` : "transparent"}
              _hover={{
                bg: isActive ? `${COLORS.brand.accent}30` : COLORS.brand.hover,
                transform: "translateX(4px)",
              }}
            >
              {/* Gold Indicator Bar */}
              <Box
                position="absolute"
                left={0}
                top="10%"
                bottom="10%"
                width="3px"
                bg={isActive ? COLORS.brand.accent : "transparent"}
                borderRadius="0 4px 4px 0"
                boxShadow={isActive ? `0 0 8px ${COLORS.brand.accent}` : "none"}
                transition="all 0.3s ease"
              />

              <HStack
                position="relative"
                zIndex={1}
                px={{ base: SPACING.scale.xs, md: SPACING.component.gap.lg }}
                py={{ base: SPACING.component.gap.md, md: SPACING.scale.sm }}
                gap={SPACING.scale.sm}
                justify={{ base: "center", md: shouldShowSidebar? "center":"flex-start" }}
              >
                <Icon
                  fontSize="20px"
                  color={isActive ? COLORS.brand.accent : COLORS.brand.textSecondary}
                  transition="color 0.3s ease"
                >
                  <item.icon />
                </Icon>
                <Text
                  fontSize={TYPOGRAPHY.sizes.sm}
                  fontWeight={isActive ? TYPOGRAPHY.weights.semibold : TYPOGRAPHY.weights.normal}
                  display={{ base: "none", md: shouldShowSidebar? "none":"block" }}
                  color={isActive ? COLORS.brand.accent : COLORS.brand.textSecondary}
                  transition="all 0.3s ease"
                  css={isActive ? {
                    textShadow: `0 0 10px ${COLORS.brand.accent}40`,
                  } : undefined}
                >
                  {item.label}
                </Text>
              </HStack>
            </Box>
          );

          // If in admin mode, render button directly without Link
          if (isAdminMode) {
            return (
              <Box key={item.label}>
                <Box display={{ base: "block", md: "none" }}>
                  <Tooltip showArrow content={item.label}>
                    {menuButton}
                  </Tooltip>
                </Box>
                <Box display={{ base: "none", md: "block" }}>{menuButton}</Box>
              </Box>
            );
          }

          // Regular mode - render without Link since we handle click
          return (
            <Box key={item.label}>
              <Box display={{ base: "block", md: "none" }}>
                <Tooltip showArrow content={item.label}>
                  {menuButton}
                </Tooltip>
              </Box>
              <Box display={{ base: "none", md: "block" }}>{menuButton}</Box>
            </Box>
          );
        })}
      </VStack>

      {/* User Profile */}
      {showSocials && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          borderTop={BORDERS.widths.thin}
          borderTopStyle={BORDERS.styles.solid}
          borderColor={COLORS.brand.border}
          p={{ base: SPACING.scale.xs, md: SPACING.scale.sm }}
        >
          <Stack
            direction={{ base: "column", md: shouldShowSidebar ? "column" : "row" }}
            gap={SPACING.component.gap.md + 1}
            justify={{ base: "center", md: "center" }}
            p={SPACING.scale.xs}
          >
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
                    <Icon
                      size={"md"}
                      color={COLORS.brand.textSecondary}
                      transition="all 0.3s ease"
                      _hover={{
                        color: COLORS.brand.accent,
                        transform: "scale(1.2) translateY(-2px)",
                        filter: `drop-shadow(0 0 6px ${COLORS.brand.accent})`,
                      }}
                    >
                      <IconComponent />
                    </Icon>
                  </Link>
                </Tooltip>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
