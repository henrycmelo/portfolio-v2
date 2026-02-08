'use client';

import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { Text, Input, Textarea, Button, FadeIn, MagneticButton } from '@/design-system/atoms';
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from '@/design-system/foundations';
import { contactAPI } from '@/api/contactAPI';
import { toaster } from '@/components/ui/toaster';
import { IoSend, IoCheckmarkCircle } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useScrollAnimation';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Reset success state when user starts typing again
    if (isSuccess) setIsSuccess(false);
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

      setIsSuccess(true);
      toaster.create({
        title: 'Success',
        description: 'Your message has been sent successfully! I\'ll get back to you soon.',
        type: 'success',
        duration: 5000,
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setIsSuccess(false);
      }, 2000);
    } catch {
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

  // Button content with animation
  const buttonContent = () => {
    if (isSuccess) {
      return (
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <IoCheckmarkCircle size={20} />
          <span>Message Sent!</span>
        </motion.div>
      );
    }

    if (isSubmitting) {
      return (
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <IoSend size={18} />
          </motion.div>
          <span>Sending...</span>
        </motion.div>
      );
    }

    return (
      <Box display="flex" alignItems="center" gap={SPACING.scale.xs}>
        <IoSend />
        <span>Send Message</span>
      </Box>
    );
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
      <Box
        w="full"
        p={{
          base: SPACING.container.padding.base,
          md: SPACING.container.padding.md,
          lg: SPACING.container.padding.lg
        }}
      >
        {/* Section Title */}
        <FadeIn direction="up" delay={0} duration={0.5}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes['3xl'],
              md: TYPOGRAPHY.sizes['4xl'],
              lg: TYPOGRAPHY.sizes['5xl']
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.primary}
            mb={SPACING.scale.xl}
          >
            Get In Touch
          </Text>
        </FadeIn>

        {/* Description */}
        <FadeIn direction="up" delay={0.1} duration={0.5}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.sm,
              md: TYPOGRAPHY.sizes.md
            }}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
            mb={SPACING.scale['2xl']}
          >
            Have a project in mind or just want to chat? Feel free to reach out!
          </Text>
        </FadeIn>

        {/* Contact Form */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          w="full"
        >
          <VStack gap={SPACING.scale.lg} align="stretch" w="full">
            {/* Name Field */}
            <FadeIn direction="up" delay={0.15} duration={0.5}>
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
                  w="full"
                />
              </Box>
            </FadeIn>

            {/* Email Field */}
            <FadeIn direction="up" delay={0.2} duration={0.5}>
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
                  w="full"
                />
              </Box>
            </FadeIn>

            {/* Message Field */}
            <FadeIn direction="up" delay={0.25} duration={0.5}>
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
                  w="full"
                />
              </Box>
            </FadeIn>

            {/* Submit Button with animation */}
            <FadeIn direction="up" delay={0.3} duration={0.5}>
              <Box pt={SPACING.scale.md} w="full">
                <MagneticButton distance={4}>
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    style={{ width: '100%' }}
                  >
                    <Button
                      type="submit"
                      variant={isSuccess ? 'secondary' : 'primary'}
                      size="lg"
                      disabled={isSubmitting || isSuccess}
                      width="full"
                      css={isSuccess ? {
                        background: COLORS.brand.accent,
                        color: COLORS.brand.textButton,
                        borderColor: COLORS.brand.accent,
                      } : undefined}
                    >
                      <AnimatePresence mode="wait">
                        {buttonContent()}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </MagneticButton>
              </Box>
            </FadeIn>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
