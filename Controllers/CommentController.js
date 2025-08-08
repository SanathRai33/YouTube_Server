import Comment from "../Modals/Comment.js";
import mongoose from "mongoose";

export const postComment = async (req, res) => {
  const commentdata = req.body;
  const postComment = new Comment(commentdata);

  try {
    await postComment.save();
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllComment = async (req, res) => {
  const { videoid } = req.params;
  try {
    const commentVideo = await Comment.find({ videoid: videoid });
    return res.status(200).json(commentVideo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }
  try {
    const deletedComment = await Comment.findByIdAndDelete(_id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentbody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      _id,
      { $set: { commentbody } },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json({ comment: updatedComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

