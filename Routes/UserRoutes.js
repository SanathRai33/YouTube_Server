import express from "express";
import { login, updateProfile, updateBanner } from "../Controllers/UserController.js";
import { bannerUpload } from "../fileHelper/fileHelper.js";

const routes = express.Router()

routes.post('/login', login)
routes.patch('/update/:id', updateProfile)
routes.patch("/banner/:userId", bannerUpload.single("banner"), updateBanner);

export default routes;