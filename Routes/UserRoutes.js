import express from "express";
import { login } from "../Controlles/UserController.js";

const routes = express.Router()

routes.post('/login', login)

export default routes;