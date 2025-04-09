# Cloudinary Image Upload Configuration

## Overview
This project uses Cloudinary for image storage and management instead of Firebase. Cloudinary provides a comprehensive cloud-based image and video management solution.

## Configuration Details

The following Cloudinary credentials are configured in the application:

- **Cloud Name**: dohgnmc7x
- **API Key**: 386376813466175
- **API Secret**: cVH5TejH6WHgiuUzYhVHZYQOwM4

## Implementation

### Client-side

1. The application uses `cloudinary-react` for React components and direct upload functionality.
2. Image uploads are handled through the `cloudinaryUploader.js` utility which manages:
   - Single file uploads
   - Multiple file uploads
   - Proper error handling

### Server-side

1. The server uses the `cloudinary` Node.js SDK for backend operations.
2. Image upload middleware is configured to handle file uploads directly to Cloudinary.

## Benefits of Using Cloudinary

- No CORS issues (unlike Firebase Storage)
- Built-in image transformation and optimization
- Better performance and reliability
- Simplified image management

## Testing

The image upload functionality can be tested through the Product Management interface where administrators can add new laptop images.