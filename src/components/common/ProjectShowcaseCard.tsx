import {
  Box,
  Text,
  HStack,
  VStack,
  Image,
  Grid,
} from "@chakra-ui/react";

interface ProjectShowcaseProps {
  company_name: string;
  company_logo_url: string;
  title: string;
  highlight: string;
  mockup_url: string;
  problem: string;
  solution: string;
  benefit: string;
  role: string;
}

export default function ProjectShowcaseCard({
  company_name,
  company_logo_url,
  title,
  highlight,
  mockup_url,
  problem,
  solution,
  benefit,
  role,
}: ProjectShowcaseProps) {
  return (
    <Box
      maxW="5xl"
      w="full"
      bg="brand.white"
      borderRadius="md"
      boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      border="1px solid"
      borderColor="brand.divider"
      mx="auto"
      p={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Header */}

      <Image src={company_logo_url} alt={`${company_name} logo`} />

      {/* Title */}
      <VStack align="flex-start" gap={6} mb={12}>
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          lineHeight="1.1"
          color="brand.primary"
        >
          {title}
          <br />
          <Text as="span" color="brand.accent">
            {highlight}
          </Text>
        </Text>
      </VStack>

      <HStack gap={6} justify="center" flexWrap="wrap">
        {/* Mockup Image */}
        <Box mb={12} textAlign="center">
          <Image
            src={mockup_url}
            alt={`${company_name} mockup`}
            maxW="full"
            h="auto"
            borderRadius="lg"
            boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          />
        </Box>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={8}
          mt={12}
        >
          <VStack align="flex-start" gap={3}>
            <Text fontSize="lg" fontWeight="700" color="brand.accent">
              Problem
            </Text>
            <Text fontSize="md" color="brand.textMuted" lineHeight="1.6">
              {problem}
            </Text>
          </VStack>

          <VStack align="flex-start" gap={3}>
            <Text fontSize="lg" fontWeight="700" color="brand.accent">
              Solution
            </Text>
            <Text fontSize="md" color="brand.textMuted" lineHeight="1.6">
              {solution}
            </Text>
          </VStack>

          <VStack align="flex-start" gap={3}>
            <Text fontSize="lg" fontWeight="700" color="brand.accent">
              Benefit
            </Text>
            <Text fontSize="md" color="brand.textMuted" lineHeight="1.6">
              {benefit}
            </Text>
          </VStack>

          <VStack align="flex-start" gap={3}>
            <Text fontSize="lg" fontWeight="700" color="brand.accent">
              Role
            </Text>
            <Text fontSize="md" color="brand.textMuted" lineHeight="1.6">
              {role}
            </Text>
          </VStack>
        </Grid>
      </HStack>
    </Box>
  );
}
