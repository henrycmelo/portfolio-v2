"use client";

import { useState } from "react";
import {
  Box,
  Input,
  VStack,
  Text,
  Alert,
  Field,
  Spinner,
} from "@chakra-ui/react";
import {
  ProjectManagement,
  CareerTimelineManagement,
  CaseStudiesManagement,
  LandingPageManagement,
  SidebarManagement,
  AboutMeManagement,
  ContactMessagesManagement,
  ReviewsManagement,
  DesignSystemStorybook
} from "@/design-system/pages/admin";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/components/contexts/AuthContext";
import { SectionWrapper } from "@/design-system/molecules";
import { AdminLayout } from "@/design-system/templates";
import { Button } from "@/design-system/atoms/Button/Button";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentSection, setCurrentSection] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminSection') || 'landing';
    }
    return 'landing';
  });
  const { isAuthenticated, login, isLoggingIn, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
      setPassword("");
      toaster.create({
        title: "Access Denied",
        description: "Invalid email or password",
        type: "error",
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="brand.bg"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="brand.accent" />
          <Text color="brand.textSecondary">Loading...</Text>
        </VStack>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="brand.bg"
      >
        <Box
          bg="brand.bgSecondary"
          p={8}
          borderRadius="lg"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          border="1px solid"
          borderColor="brand.border"
          w="full"
          maxW="md"
        >
          <VStack gap={6}>
            <VStack gap={2}>
              <Text fontSize="2xl" fontWeight="bold" color="brand.accent">
                Admin Dashboard
              </Text>
              <Text fontSize="sm" color="brand.textSecondary">
                Sign in to manage your portfolio
              </Text>
            </VStack>

            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <VStack gap={4} w="full">
                <Field.Root required>
                  <Field.Label color="brand.text">
                    Email <Field.RequiredIndicator color="brand.error" />
                  </Field.Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    p={2}
                    bg="brand.bgTertiary"
                    border="1px solid"
                    borderColor="brand.border"
                    color="brand.text"
                    _placeholder={{ color: "brand.textMuted" }}
                    _focus={{
                      borderColor: "brand.accent",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-accent)",
                    }}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label color="brand.text">
                    Password <Field.RequiredIndicator color="brand.error" />
                  </Field.Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    p={2}
                    bg="brand.bgTertiary"
                    border="1px solid"
                    borderColor="brand.border"
                    color="brand.text"
                    _placeholder={{ color: "brand.textMuted" }}
                    _focus={{
                      borderColor: "brand.accent",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-accent)",
                    }}
                  />
                </Field.Root>

                {error && (
                  <Alert.Root status="error" bg="brand.error" color="white" borderRadius="md">
                    <Alert.Indicator />
                    <Alert.Title>{error}</Alert.Title>
                  </Alert.Root>
                )}

                <Button
                  type="submit"
                  w="full"
                  disabled={isLoggingIn}
                  bg="brand.accent"
                  color="brand.textButton"
                  _hover={{ bg: "brand.accentDark" }}
                >
                  {isLoggingIn ? (
                    <>
                      <Spinner size={"sm"} /> Logging in
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>
    );
  }

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminSection', section);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'landing':
        return (
          <SectionWrapper id="admin-landing-page">
            <LandingPageManagement />
          </SectionWrapper>
        );
      case 'sidebar':
        return (
          <SectionWrapper id="admin-sidebar">
            <SidebarManagement />
          </SectionWrapper>
        );
      case 'about':
        return (
          <SectionWrapper id="admin-about-me">
            <AboutMeManagement />
          </SectionWrapper>
        );
      case 'projects':
        return (
          <SectionWrapper id="admin-dashboard">
            <ProjectManagement />
          </SectionWrapper>
        );
      case 'career':
        return (
          <SectionWrapper id="admin-career">
            <CareerTimelineManagement />
          </SectionWrapper>
        );
      case 'casestudies':
        return (
          <SectionWrapper id="admin-case-studies">
            <CaseStudiesManagement />
          </SectionWrapper>
        );
      case 'reviews':
        return (
          <SectionWrapper id="admin-reviews">
            <ReviewsManagement />
          </SectionWrapper>
        );
      case 'messages':
        return (
          <SectionWrapper id="admin-contact-messages">
            <ContactMessagesManagement />
          </SectionWrapper>
        );
      case 'storybook':
        return (
          <SectionWrapper id="admin-storybook">
            <DesignSystemStorybook />
          </SectionWrapper>
        );
      default:
        return (
          <SectionWrapper id="admin-landing-page">
            <LandingPageManagement />
          </SectionWrapper>
        );
    }
  };

  return (
    <AdminLayout
      currentSection={currentSection}
      onSectionChange={handleSectionChange}
    >
      {renderSection()}
    </AdminLayout>
  );
}
