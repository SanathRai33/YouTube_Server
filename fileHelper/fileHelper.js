import multer from "multer";
import { videoStorage } from "../utils/cloudinary.js";

const upload = multer({ storage: videoStorage });

export default upload;
