import React, { useState } from 'react';
import { uploadMultipleFiles } from '../utils/cloudinaryUploader';

const ImageUploader = ({ onImagesUploaded, maxImages = 5, initialImages = [] }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Check if total images exceeds the maximum allowed
    if (files.length + previewUrls.length > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images`);
      return;
    }
    
    setError('');
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    
    // Create preview URLs for the selected files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image');
      return;
    }
    
    setUploading(true);
    setError('');
    setProgress(0);
    
    try {
      // Upload files to Cloudinary
      const uploadedUrls = await uploadMultipleFiles(selectedFiles);
      
      // Call the callback with the uploaded URLs
      onImagesUploaded(uploadedUrls);
      
      setProgress(100);
      setSelectedFiles([]);
      // Keep the preview URLs to show the uploaded images
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    // Remove from preview
    setPreviewUrls(prevUrls => {
      const newUrls = [...prevUrls];
      newUrls.splice(index, 1);
      return newUrls;
    });
    
    // Remove from selected files if it's a new file
    if (index >= initialImages.length) {
      const adjustedIndex = index - initialImages.length;
      setSelectedFiles(prevFiles => {
        const newFiles = [...prevFiles];
        newFiles.splice(adjustedIndex, 1);
        return newFiles;
      });
    } else {
      // If it's an initial image, notify parent component
      const removedUrl = initialImages[index];
      if (onImagesUploaded) {
        const remainingUrls = initialImages.filter(url => url !== removedUrl);
        onImagesUploaded(remainingUrls);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Images
      </label>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
            <img 
              src={url} 
              alt={`Preview ${index}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
        
        {previewUrls.length < maxImages && (
          <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50">
            <span className="text-3xl text-gray-400">+</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>
      
      {selectedFiles.length > 0 && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
      )}
      
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default ImageUploader;