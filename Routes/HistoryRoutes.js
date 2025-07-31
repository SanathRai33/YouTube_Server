import express from "express";
import { getAllHistorydVideo, handleHistory, handleView } from "../Controllers/HistoryController.js";

const routes = express.Router()

routes.get('/:userId', getAllHistorydVideo)
routes.post('/views/:videoId', handleView)
routes.post('/:videoId', handleHistory)

export default routes;