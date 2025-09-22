'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Image,
  Text,
  Progress,
  IconButton,
} from '@chakra-ui/react';
import { IoCloudUpload, IoImage, IoTrash, IoRefresh } from 'react-icons/io5';
import { supabase } from '@/lib/supabase';
import { toaster } from '@/components/ui/toaster';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageDelete?: () => void;
  bucketName?: string;
  folder?: string;
  label?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUpload,
  onImageDelete,
  bucketName = 'portfolio-images',
  folder = 'mockups',
  label = 'Upload Image'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload');
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

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Simulate progress for user feedback
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      onImageUpload(publicUrl);

      toaster.create({
        title: 'Success',
        description: 'Image uploaded successfully',
        type: 'success',
        duration: 3000,
      });

    } catch (error: any) {
      console.error('Error uploading image:', error);
      toaster.create({
        title: 'Upload Error',
        description: error.message || 'Failed to upload image',
        type: 'error',
        duration: 5000,
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const deleteImage = async () => {
    if (!currentImageUrl) return;

    try {
      setDeleting(true);

      // Extract file path from URL
      const url = new URL(currentImageUrl);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-2).join('/'); // Get last two parts (folder/filename)

      // Delete from Supabase storage
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        throw error;
      }

      // Call the delete callback
      if (onImageDelete) {
        onImageDelete();
      }

      toaster.create({
        title: 'Success',
        description: 'Image deleted successfully',
        type: 'success',
        duration: 3000,
      });

    } catch (error: any) {
      console.error('Error deleting image:', error);
      toaster.create({
        title: 'Delete Error',
        description: error.message || 'Failed to delete image',
        type: 'error',
        duration: 5000,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <VStack gap={4} align="stretch">
      {currentImageUrl && (
        <Box>
          <HStack justify="space-between" align="center" mb={2}>
            <Text fontSize="sm" color="gray.600">
              Current Image:
            </Text>
            <HStack gap={1}>
              <IconButton
                aria-label="Delete image"
                size="sm"
                variant="outline"
                colorPalette="red"
                onClick={deleteImage}
                disabled={deleting || uploading}
              >
                <IoTrash />
              </IconButton>
            </HStack>
          </HStack>
          <Image
            src={currentImageUrl}
            alt="Current image"
            maxH="200px"
            maxW="300px"
            objectFit="contain"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
          />
        </Box>
      )}

      <Box>
        <Input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
          display="none"
          id="image-upload"
        />
        <Button
          as="label"
          htmlFor="image-upload"
          cursor="pointer"
          disabled={uploading || deleting}
          w="full"
          variant="outline"
        >
          {currentImageUrl ? <IoRefresh /> : <IoCloudUpload />}
          {uploading
            ? 'Uploading...'
            : currentImageUrl
              ? 'Replace Image'
              : label
          }
        </Button>
      </Box>

      {(uploading || deleting) && (
        <Box>
          {uploading && <Progress value={uploadProgress} size="sm" />}
          <Text fontSize="xs" color="gray.600" mt={1}>
            {uploading && `Uploading... ${uploadProgress}%`}
            {deleting && 'Deleting image...'}
          </Text>
        </Box>
      )}

      <Text fontSize="xs" color="gray.500">
        Supported formats: JPG, PNG, WebP. Max size: 5MB
      </Text>
    </VStack>
  );
}