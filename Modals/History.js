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
  },
  {
    timestamps: true,
  }
);

historySchema.index({ viewer: 1, videoid: 1 }, { unique: true });

export default mongoose.model("history", historySchema);
