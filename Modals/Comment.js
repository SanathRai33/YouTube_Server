import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video",
      required: true,
    },
    commentedon: {
      type: Date,
      default: Date.now,
    },
    commentbody: { type: String, required: true },
    usercommented: { type: String, required: true },
    // userimage: { type: String, required: true },
    // likes: { type: Array, default: [] },
    // dislikes: { type: Array, default: [] },
    // replies: { type: Array, default: [] },
    // replycount: { type: Number, default: 0 },
    // likecount: { type: Number, default: 0 },
    // dislikecount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comment", commentSchema);
