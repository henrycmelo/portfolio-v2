import {
  Box,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from "@/design-system/foundations";
import { IoChevronDownCircleOutline, IoDownload, IoPin } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/contexts/AuthContext";
import { usePathname } from "next/navigation";
import {Button} from "@/design-system/atoms/Button/Button";

export default function SiteHeader() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const { isAuthenticated, logout } = useAuth();


  

  useEffect(()=>{
    const timer = setInterval(()=> setCurrentTime(new Date()), 1000)
    return ()=> clearInterval(timer)
  }, [])
  
  return (
    <Box
      bg={COLORS.brand.white}
      px={{ base: SPACING.scale.xs, md: SPACING.component.gap.lg }}
      borderBottom={BORDERS.widths.thin}
      borderBottomStyle={BORDERS.styles.solid}
      borderColor={COLORS.ui.containerBorder}
      alignContent={"center"}
      justifyItems="stretch"
    >
      <Flex justify="space-between" align="center" py={SPACING.scale.xs}>
        {isAdminRoute && isAuthenticated && (
          <Text
            fontSize={TYPOGRAPHY.sizes.xl}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.primary}
          >
            Portfolio Admin Dashboard
          </Text>
        )}
        <HStack gap={SPACING.scale.sm} color={COLORS.brand.textMuted} fontSize={TYPOGRAPHY.sizes.md}>
          <HStack gap={1}>
            <Icon>
              <IoPin />
            </Icon>
            <Text>New York, NY</Text>
          </HStack>

          <Text>
            {currentTime.toLocaleString('en-US', {
              timeZone: 'America/New_York',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </Text>

          <Text fontSize={TYPOGRAPHY.sizes.md}>
            Eastern Time
          </Text>

          {isAdminRoute && isAuthenticated && (
            <Button variant='ghost' onClick={logout} color={COLORS.brand.error}>
              Logout
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}