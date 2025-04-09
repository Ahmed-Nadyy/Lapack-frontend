import axios from 'axios';

// Hardcode Cloudinary configuration for direct upload
// These values are already in the .env file and are safe to use directly in client code
// as they are meant to be public for direct upload functionality
const CLOUD_NAME = 'dohgnmc7x';
const UPLOAD_PRESET = 'laptop-store';

// Function to upload a single file to Cloudinary
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET); // Using a preset named 'laptops' to match server config
  formData.append('cloud_name', CLOUD_NAME);

  try {
    console.log('Uploading to Cloudinary with cloud name:', CLOUD_NAME);
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('File uploaded successfully:', response.data);
    return response.data; // Returns the uploaded file data
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error.response ? error.response.data : error.message);
    throw new Error('Failed to upload image to Cloudinary. Please check console for details.');
  }
};

// Function to upload multiple files to Cloudinary
const uploadMultipleFiles = async (files) => {
  try {
    const uploadPromises = files.map((file) => uploadFile(file)); // Upload each file individually
    const results = await Promise.all(uploadPromises); // Wait for all uploads to complete

    // Extract just the URLs from the Cloudinary response
    const imageUrls = results.map(result => result.secure_url);
    
    console.log('Multiple images uploaded successfully:', imageUrls);
    return imageUrls; // Return just the array of secure URLs
  } catch (error) {
    console.error('Error uploading multiple files to Cloudinary:', error);
    throw new Error('Failed to upload multiple images to Cloudinary. Please try again.');
  }
};

// Function to handle file upload from the frontend
const handleFileUpload = async (file) => {
  try {
    const result = await uploadFile(file);
    return result;  // Return the uploaded file details
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export { handleFileUpload, uploadFile, uploadMultipleFiles };
