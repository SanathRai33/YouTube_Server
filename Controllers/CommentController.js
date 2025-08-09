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

export const likeComment = async (req, res) => {
  const { id } = req.params; // comment id
  const { userid } = req.body;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Remove from dislikes if present
    comment.dislikes = comment.dislikes.filter((u) => u.toString() !== userid);

    // Toggle like
    if (comment.likes.includes(userid)) {
      comment.likes = comment.likes.filter((u) => u.toString() !== userid);
    } else {
      comment.likes.push(userid);
    }

    await comment.save();
    res.status(200).json({ comment });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const dislikeComment = async (req, res) => {
  const { id } = req.params;
  const { userid } = req.body;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Remove from likes if present
    comment.likes = comment.likes.filter((u) => u.toString() !== userid);

    // Toggle dislike
    if (comment.dislikes.includes(userid)) {
      comment.dislikes = comment.dislikes.filter(
        (u) => u.toString() !== userid
      );
    } else {
      comment.dislikes.push(userid);
    }

    await comment.save();
    res.status(200).json({ comment });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const replyToComment = async (req, res) => {
  const { id } = req.params; // comment id
  const { userid, replybody, userreplied, userimage } = req.body;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({
      userid,
      replybody,
      userreplied,
      userimage, // add here
    });

    await comment.save();
    res.status(200).json({ comment });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const translateComment = async (req, res) => {
//   const { text, targetLang } = req.body;
//   if (!text || !targetLang) {
//     return res.status(400).json({ message: "text and targetLang are required" });
//   }

//   try {
//     const libreUrl = process.env.LIBRETRANSLATE_URL || "https://libretranslate.com/translate";
//     const apiKey = process.env.LIBRETRANSLATE_API_KEY; // optional

//     const payload = {
//       q: text,
//       source: "auto",     // auto detect
//       target: en, // e.g. 'en', 'hi'
//       format: "text"
//     };

//     const headers = { "Content-Type": "application/json" };
//     if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

//     const response = await axios.post(libreUrl, payload, { headers });

//     // LibreTranslate returns { translatedText: "..." }
//     const translatedText = response.data.translatedText || response.data.translated_text || response.data.translated;

//     return res.status(200).json({ translatedText });
//   } catch (error) {
//     console.error("Translation error:", error?.response?.data || error.message || error);
//     return res.status(500).json({ message: "Translation failed" });
//   }
// };
