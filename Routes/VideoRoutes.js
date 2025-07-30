import express from "express";
import { getAllVideos, uploadVideo } from "../Controlles/VideoController.js";
import upload from "../fileHelper/fileHelper.js";

const routes = express.Router();

routes.post("/upload", upload.single("file"), uploadVideo);
routes.get("/getAll", getAllVideos); 

export default routes;
