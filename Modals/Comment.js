import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    videoid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video",
      require: true,
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
