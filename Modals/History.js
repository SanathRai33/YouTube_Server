import mongoose from "mongoose";

const historySchema = mongoose.Schema(
  {
    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video",
      required: true,
    },
    likedon: {
      type: Date,
      default: Date.now,
    },
    filetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("history", historySchema);
