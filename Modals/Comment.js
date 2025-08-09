import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    replybody: { type: String, required: true },
    userreplied: { type: String, required: true },
    userimage: { type: String, required: true },
    repliedon: { type: Date, default: Date.now },
  },
  { _id: true }
);

const commentSchema = new mongoose.Schema(
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
    commentedon: { type: Date, default: Date.now },
    commentbody: { type: String, required: true },
    usercommented: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    replies: [replySchema],
  },
  { timestamps: true }
);

export default mongoose.model("comment", commentSchema);
