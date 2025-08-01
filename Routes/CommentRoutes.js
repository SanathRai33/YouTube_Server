import express from "express";
import { deleteComment, editComment, getAllComment, postComment } from "../Controllers/CommentController.js";

const routes = express.Router()

routes.get('/:videoid', getAllComment)
routes.post('/postComment', postComment)
routes.delete('/deleteComment/:id', deleteComment)
routes.post('/updateComment/:id', editComment)

export default routes;