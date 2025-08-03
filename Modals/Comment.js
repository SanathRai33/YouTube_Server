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
    commentbody:{
        type: String,
    },
    usercommented:{
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comment", commentSchema);
