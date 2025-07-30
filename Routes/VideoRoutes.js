import express from "express";
import { uploadVideo } from "../Controlles/VideoController.js";
import upload from "../fileHelper/fileHelper.js";

const routes = express.Router();

routes.post("/upload", upload.single("file"), uploadVideo);

export default routes;
