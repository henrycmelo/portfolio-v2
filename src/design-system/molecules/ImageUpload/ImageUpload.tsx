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

    } catch (error: unknown) {
      console.error('Error selecting image:', error);
      const message = error instanceof Error ? error.message : 'Failed to select image';
      alert(message);
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
        <label
          htmlFor={inputId}
          style={{
            cursor: 'pointer',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: 'var(--chakra-colors-brand-white, #fff)',
            color: 'var(--chakra-colors-brand-secondary, #666)',
            border: '1px solid var(--chakra-colors-brand-border, #3A3632)',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
        >
          {previewUrl ? <IoRefresh /> : <IoCloudUpload />}
          {previewUrl ? 'Replace Image' : label}
        </label>
      </Box>

      <Text fontSize={TYPOGRAPHY.sizes.xs} color={COLORS.gray[500]}>
        Supported formats: JPG, PNG, WebP. Max size: 5MB
      </Text>
    </VStack>
  );
}
