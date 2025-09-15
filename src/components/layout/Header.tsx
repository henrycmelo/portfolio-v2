import {
  Box,
  HStack,
  Text,
  Avatar,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { Tooltip } from "@/components/ui/tooltip";
import socialsData from "@/data/socials";
import FlexibleButton from "../button/FlexibleButton";
import { IoChevronDownCircleOutline, IoDownload, IoPin } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [currentTime, setCurrentTime] = useState(new Date())

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
      justifyItems="right"
    >
      <Flex justify="flex-end" align="center" py={2}>
        <HStack gap={3} color="brand.textMuted" fontSize="md">
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
          
          <Text fontSize="md">
            Eastern Time
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
}