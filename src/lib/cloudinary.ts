export const cloudinaryConfig = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
};

// Helper to construct Cloudinary image URLs if needed directly
export const getCloudinaryUrl = (publicId: string) => {
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${publicId}`;
};
