import {
  Box,
  HStack,
  Text,
  Avatar,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";

import { IoChevronDownCircleOutline, IoDownload, IoPin } from "react-icons/io5";
import { use, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePathname } from "next/navigation";
import FlexibleButton from "../button/FlexibleButton";
import { log } from "console";

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
      bg="brand.white"
      px={{ base: 2, md: 6 }}
      borderBottom="1px solid"
      borderColor="brand.divider"
      alignContent={"center"}
      justifyItems="stretch"
    >
      <Flex justify="space-between" align="center" py={2}>
        {isAdminRoute && isAuthenticated && (
          <Text fontSize='xl' fontWeight='bold' color='brand.primary'>
            Portfolio Admin Dashboard
          </Text>
        )}
        <HStack gap={3} color="brand.textMuted" fontSize="md">
          <HStack gap={1}>
            <Icon>
              <IoPin />
            </Icon>
            <Text>New York, NY</Text>
          </HStack>
          
          <Text >
            {currentTime.toLocaleString('en-US', {
              timeZone: 'America/New_York',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
        
          </Text>
          
          <Text fontSize="md">
            Eastern Time
          </Text>

          {isAdminRoute && isAuthenticated && (
            <FlexibleButton variant='ghost' onClick={logout} color={"brand.error"}>
              Logout
            </FlexibleButton>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}