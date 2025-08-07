import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    resource_type: "video", 
    folder: "youtube_uploads", 
    format: async () => "mp4",
    public_id: (req, file) =>
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
  },
});

export const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    resource_type: "image",
    folder: "youtube_banners",
    format: async (req, file) => "jpg",
    public_id: (req, file) =>
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
  },
});

export { cloudinary };
