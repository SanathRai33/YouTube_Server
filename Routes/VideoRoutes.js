import express from "express";
import { getAllVideos, uploadVideo, getMyChannelVideos } from "../Controllers/VideoController.js";
import upload from "../fileHelper/fileHelper.js";

const routes = express.Router();

routes.post("/upload", upload.single("file"), uploadVideo);
routes.get("/getAll", getAllVideos); 
routes.get("/channel/:userId", getMyChannelVideos);

export default routes;
