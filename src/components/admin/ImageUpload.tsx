'use client';

import { useState, useEffect, useId } from 'react';
import {
  Box,
  VStack,
  HStack,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { Input, Text } from '@/design-system/atoms';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '@/design-system/foundations';
import { IoCloudUpload, IoTrash, IoRefresh } from 'react-icons/io5';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageSelect: (file: File | null, previewUrl: string) => void;
  onImageDelete?: () => void;
  label?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onImageSelect,
  onImageDelete,
  label = 'Upload Image'
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl || '');
  const inputId = useId(); // Generate unique ID for this instance

  // Update preview when currentImageUrl changes from parent
  useEffect(() => {
    setPreviewUrl(currentImageUrl || '');
  }, [currentImageUrl]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size must be less than 5MB');
      }

      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Pass file and preview URL to parent
      onImageSelect(file, objectUrl);

    } catch (error: any) {
      console.error('Error selecting image:', error);
      alert(error.message || 'Failed to select image');
    } finally {
      // Reset input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleDelete = () => {
    // Revoke preview URL to free memory
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');

    if (onImageDelete) {
      onImageDelete();
    }
  };

  return (
    <VStack gap={SPACING.component.gap.md} align="stretch">
      {previewUrl && (
        <Box>
          <HStack justify="space-between" align="center" mb={SPACING.scale.xs}>
            <Text fontSize={TYPOGRAPHY.sizes.sm} color={COLORS.gray[600]}>
              {previewUrl.startsWith('blob:') ? 'Selected Image:' : 'Current Image:'}
            </Text>
            <IconButton
              aria-label="Delete image"
              size="sm"
              variant="outline"
              colorPalette="red"
              onClick={handleDelete}
            >
              <IoTrash />
            </IconButton>
          </HStack>
          <Image
            src={previewUrl}
            alt="Preview"
            maxH="200px"
            maxW="300px"
            objectFit="contain"
            border={BORDERS.widths.thin}
            borderColor={COLORS.ui.placeholderBorder}
            borderRadius={BORDERS.radius.md}
          />
        </Box>
      )}

      <Box>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          display="none"
          id={inputId}
        />
        <Box
          as="label"
          htmlFor={inputId}
          cursor="pointer"
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={SPACING.scale.xs}
          px={SPACING.scale.md}
          py={SPACING.scale.sm}
          bg={COLORS.brand.white}
          color={COLORS.brand.secondary}
          border={BORDERS.widths.thin}
          borderColor={COLORS.ui.containerBorder}
          borderRadius={BORDERS.radius.md}
          fontSize={TYPOGRAPHY.sizes.sm}
          fontWeight={TYPOGRAPHY.weights.medium}
          transition="all 0.2s"
          _hover={{
            bg: COLORS.ui.tableRowHoverBg,
            borderColor: COLORS.brand.accent,
          }}
        >
          {previewUrl ? <IoRefresh /> : <IoCloudUpload />}
          {previewUrl ? 'Replace Image' : label}
        </Box>
      </Box>

      <Text fontSize={TYPOGRAPHY.sizes.xs} color={COLORS.gray[500]}>
        Supported formats: JPG, PNG, WebP. Max size: 5MB
      </Text>
    </VStack>
  );
}
