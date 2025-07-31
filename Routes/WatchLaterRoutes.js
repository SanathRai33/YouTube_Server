import express from "express";
import { getAllWatchLater, handleWatchLater } from "../Controllers/WatchLaterController.js";

const routes = express.Router()

routes.get('/:userId', getAllWatchLater)
routes.post('/:videoId', handleWatchLater)

export default routes;