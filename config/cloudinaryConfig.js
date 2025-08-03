import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

console.log("Evns: ",process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    resource_type: "video",  // for video uploads
    folder: "youtube_uploads", // folder in Cloudinary
    format: async () => "mp4", // force mp4 format
    public_id: (req, file) =>
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
  },
});

export { cloudinary };
