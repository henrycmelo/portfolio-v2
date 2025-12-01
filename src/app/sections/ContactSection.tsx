'use client';

import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { Text, Input, Textarea, Button } from '@/design-system/atoms';
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from '@/design-system/foundations';
import { contactAPI } from '@/api/contactAPI';
import { toaster } from '@/components/ui/toaster';
import { IoSend } from 'react-icons/io5';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toaster.create({
        title: 'Validation Error',
        description: 'Please enter your name',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      toaster.create({
        title: 'Validation Error',
        description: 'Please enter a valid email address',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    if (!formData.message.trim()) {
      toaster.create({
        title: 'Validation Error',
        description: 'Please enter a message',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await contactAPI.submitMessage(formData);

      toaster.create({
        title: 'Success',
        description: 'Your message has been sent successfully! I\'ll get back to you soon.',
        type: 'success',
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'Failed to send your message. Please try again later.',
        type: 'error',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      maxW={SIZES.container['5xl']}
      w="full"
      bg={COLORS.ui.containerBg}
      borderRadius={BORDERS.radius.md}
      boxShadow={SHADOWS.box.container}
      overflow="hidden"
      border={BORDERS.widths.thin}
      borderColor={COLORS.ui.containerBorder}
      mx="auto"
    >
      {/* Content Area */}
      <Box p={{
        base: SPACING.container.padding.base,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}>
        {/* Section Title */}
        <Text
          fontSize={{
            base: TYPOGRAPHY.sizes['2xl'],
            md: TYPOGRAPHY.sizes['3xl'],
            lg: TYPOGRAPHY.sizes['4xl']
          }}
          fontWeight={TYPOGRAPHY.weights.bold}
          color={COLORS.brand.primary}
          mb={SPACING.scale.xl}
        >
          Get In Touch
        </Text>

        {/* Description */}
        <Text
          fontSize={{
            base: TYPOGRAPHY.sizes.md,
            md: TYPOGRAPHY.sizes.lg
          }}
          color={COLORS.brand.textMuted}
          lineHeight={TYPOGRAPHY.lineHeights.relaxed}
          mb={SPACING.scale['2xl']}
        >
          Have a project in mind or just want to chat? Feel free to reach out!
        </Text>

        {/* Contact Form */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          maxW={SIZES.container.lg}
        >
          <VStack gap={SPACING.scale.lg} align="stretch">
            {/* Name Field */}
            <Box>
              <Text
                fontSize={TYPOGRAPHY.sizes.sm}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.text}
                mb={SPACING.scale.xs}
              >
                Name
              </Text>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your name"
                required
                disabled={isSubmitting}
              />
            </Box>

            {/* Email Field */}
            <Box>
              <Text
                fontSize={TYPOGRAPHY.sizes.sm}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.text}
                mb={SPACING.scale.xs}
              >
                Email
              </Text>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
              />
            </Box>

            {/* Message Field */}
            <Box>
              <Text
                fontSize={TYPOGRAPHY.sizes.sm}
                fontWeight={TYPOGRAPHY.weights.medium}
                color={COLORS.brand.text}
                mb={SPACING.scale.xs}
              >
                Message
              </Text>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell me about your project or just say hello..."
                rows={6}
                required
                disabled={isSubmitting}
              />
            </Box>

            {/* Submit Button */}
            <Box pt={SPACING.scale.md} w="full">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                width="full"
              >
                <Box display="flex" alignItems="center" gap={SPACING.scale.xs}>
                  <IoSend />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </Box>
              </Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
