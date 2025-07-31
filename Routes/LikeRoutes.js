import express from "express";
import { getAllLikedVideo, handleLike } from "../Controllers/LikeController.js";

const routes = express.Router()

routes.get('/:userId', getAllLikedVideo)
routes.post('/:videoId', handleLike)

export default routes;