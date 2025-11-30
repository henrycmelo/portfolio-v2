import { supabase } from '@/lib/supabase';

/**
 * Uploads an image to Supabase Storage
 * Creates the folder if it doesn't exist (folders are created automatically in Supabase)
 *
 * @param file - The image file to upload
 * @param companyName - The company name (used for folder organization)
 * @param imageType - Type of image: 'logo' | 'mockup'
 * @returns The public URL of the uploaded image
 */
export async function uploadImageToSupabase(
  file: File,
  companyName: string,
  imageType: 'logo' | 'mockup'
): Promise<string> {
  try {
    // Sanitize company name for use in file path
    const sanitizedCompanyName = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 9);
    const fileName = `${sanitizedCompanyName}_${imageType}_${timestamp}_${randomString}.${fileExt}`;

    // Create file path with company folder
    const filePath = `${sanitizedCompanyName}/${imageType}s/${fileName}`;
    

    // Try lowercase bucket name first (Supabase typically uses lowercase)
    const bucketName = 'project-assets';

    // Upload file to Supabase storage
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);

      // Provide helpful error message
      if (error.message?.includes('Bucket not found')) {
        throw new Error(
          `Bucket "${bucketName}" does not exist. Please create it in Supabase Dashboard:\n` +
          `1. Go to Storage in Supabase Dashboard\n` +
          `2. Create a new bucket named "${bucketName}" (case-sensitive)\n` +
          `3. Make it public if you want direct URL access`
        );
      }

      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrl;

  } catch (error: any) {
    console.error('Error uploading image to Supabase:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
}

/**
 * Deletes an image from Supabase Storage
 *
 * @param imageUrl - The public URL of the image to delete
 */
export async function deleteImageFromSupabase(imageUrl: string): Promise<void> {
  try {
    if (!imageUrl) return;

    const bucketName = 'project-assets';

    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');

    // Find the bucket name in the path and get everything after it
    const bucketIndex = pathParts.indexOf(bucketName);
    if (bucketIndex === -1) {
      throw new Error('Invalid image URL - bucket not found in path');
    }

    const filePath = pathParts.slice(bucketIndex + 1).join('/');

    // Delete from Supabase storage
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      throw error;
    }

  } catch (error: any) {
    console.error('Error deleting image from Supabase:', error);
    throw new Error(error.message || 'Failed to delete image');
  }
}
