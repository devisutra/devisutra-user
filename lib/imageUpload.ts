/**
 * Image Upload Service
 * Handles secure image uploads to Cloudinary
 * All credentials are taken from environment variables
 */

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
}

interface UploadError {
  error: {
    message: string;
  };
}

/**
 * Upload image to Cloudinary
 * @param file - Image file to upload
 * @param folder - Optional folder name in Cloudinary
 * @returns Secure URL of uploaded image
 */
export const uploadImageToCloudinary = async (
  file: File,
  folder: string = 'reviews'
): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary configuration missing. Please check environment variables.'
    );
  }

  // Validate file
  validateImageFile(file);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_name', cloudName);
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData: UploadError = await response.json();
      const errorMessage =
        errorData?.error?.message || `Upload failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    const data: CloudinaryResponse = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of image files
 * @param folder - Optional folder name
 * @returns Array of secure URLs
 */
export const uploadImagesToCloudinary = async (
  files: File[],
  folder: string = 'reviews'
): Promise<string[]> => {
  if (files.length === 0) {
    return [];
  }

  // Limit to 5 images
  if (files.length > 5) {
    throw new Error('Maximum 5 images allowed');
  }

  try {
    const uploadPromises = files.map((file) =>
      uploadImageToCloudinary(file, folder)
    );
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
};

/**
 * Validate image file
 * @param file - File to validate
 */
const validateImageFile = (file: File): void => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (file.size > MAX_SIZE) {
    throw new Error('Image size must be less than 5MB');
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only JPEG, PNG, WebP, and GIF images are allowed');
  }
};
