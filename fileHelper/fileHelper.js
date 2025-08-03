import multer from "multer";
import { videoStorage } from "../config/cloudinaryConfig.js";

const upload = multer({ storage: videoStorage });

export default upload;
