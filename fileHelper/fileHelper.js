import multer from "multer";
import { videoStorage } from "../config/cloudinaryConfig.js";
import { bannerStorage } from "../config/cloudinaryConfig.js";

const upload = multer({ storage: videoStorage });
const bannerUpload = multer({ storage: bannerStorage });

export { upload, bannerUpload };
