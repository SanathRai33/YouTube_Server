import express from "express";
import { deleteComment, editComment, getAllComment, postComment, likeComment, dislikeComment, replyToComment } from "../Controllers/CommentController.js";

const routes = express.Router()

routes.get('/:videoid', getAllComment)
routes.post('/postComment', postComment)
routes.delete('/deleteComment/:id', deleteComment)
routes.put('/updateComment/:id', editComment)
routes.put("/like/:id", likeComment);
routes.put("/dislike/:id", dislikeComment);
routes.post("/reply/:id", replyToComment);
// routes.post('/translate', translateComment); 

export default routes;