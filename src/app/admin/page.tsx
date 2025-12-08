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
  LandingPageManagement,
  SidebarManagement,
  AboutMeManagement,
  ContactMessagesManagement,
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
        bg="gray.50"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="brand.primary" />
          <Text color="brand.secondary">Loading...</Text>
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
        bg="gray.50"
      >
        <Box
          bg="brand.white"
          p={8}
          borderRadius="md"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
          borderColor="brand.divider"
          w="full"
          maxW="md"
        >
          <VStack gap={6}>
            <Text fontSize="2xl" fontWeight="bold" color="brand.primary">
              Admin Dashboard
            </Text>

            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <VStack gap={4} w="full" color={"brand.secondary"}>
                <Field.Root required>
                  <Field.Label>
                    Email <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    p={2}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label>
                    Password <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    p={2}
                  />
                </Field.Root>

                {error && (
                  <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Title>{error}</Alert.Title>
                  </Alert.Root>
                )}

                <Button type="submit" w="full" disabled={isLoggingIn}>
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
